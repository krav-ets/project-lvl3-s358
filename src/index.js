import axios from 'axios';
import path from 'path';
import { promises as fsPromises, createWriteStream } from 'fs';
import _ from 'lodash';
import cheerio from 'cheerio';
import url from 'url';
import debug from 'debug';
import Listr from 'listr';

const log = debug('page-loader');

const genLocalResName = (uri) => {
  const link = path.parse(uri);
  const fileName = path.join(link.dir, link.name).replace(/\W/g, '-');
  const trimFileName = _.trim(fileName, '-');
  const fullName = `${trimFileName}${link.ext}`;
  return fullName;
};

const genName = (uri, extension) => {
  const { host, pathname } = url.parse(uri);

  if (!host) {
    return genLocalResName(pathname);
  }

  const fileName = `${host}${pathname}`.replace(/\W/g, '-');
  const trimFileName = _.trim(fileName, '-');
  const fullName = `${trimFileName}${extension}`;
  return fullName;
};

const resources = {
  link: 'href',
  script: 'src',
  img: 'src',
};

const isLocal = (link) => {
  const { host } = url.parse(link);
  return !host;
};

const getLinks = ($) => {
  const allLinks = Object.keys(resources).reduce((acc, tag) => {
    const links = $(tag).map((i, el) => $(el).attr(resources[tag])).get();
    return [...acc, ...links];
  }, []);
  return allLinks.filter(l => isLocal(l));
};

const replaceLinks = ($, folderName) => Object.keys(resources)
  .forEach((tag) => {
    const new$ = $(tag).each((i, el) => {
      const link = $(el).attr(resources[tag]);
      const editLink = genName(link);
      const newLink = path.join(folderName, editLink);
      $(el).attr(resources[tag], newLink);
    });
    return new$;
  });

const saveLink = (uri, fullPath) => axios({
  method: 'get',
  url: uri,
  responseType: 'stream',
})
  .then(response => response.data.pipe(createWriteStream(fullPath)))
  .then(() => log(`'${uri}' was downloaded to '${fullPath}'`));

const makeListr = (links, pathToResources, address) => {
  const tasks = links.reduce((acc, link) => {
    const fileName = genName(link);
    const fullPath = path.join(pathToResources, fileName);
    const uri = url.resolve(address, link);
    const newTask = {
      title: `${uri}`,
      task: () => saveLink(uri, fullPath),
    };
    return [...acc, newTask];
  }, []);
  return new Listr(tasks, { concurrent: true });
};

// const saveAllLinks = (links, pathToResources, address) => Promise
// .all(links.map(link => saveLink(link, pathToResources, address)));

const pageLoader = (address, pathToFolder) => {
  const htmlFileName = genName(address, '.html');
  const folderForResources = genName(address, '_files');
  const fullPathToFolder = path.join(pathToFolder, folderForResources);
  const pageLinks = [];
  const fullPathToHtml = path.join(pathToFolder, htmlFileName);
  return axios.get(address)
    .then((response) => {
      log(`'${address}' page is being downloaded`);
      const $ = cheerio.load(response.data);
      pageLinks.push(...getLinks($));
      log(`Сreated an array of links to local page resources: \n${pageLinks}`);
      replaceLinks($, folderForResources);
      const newHtml = $.html();
      return fsPromises.writeFile(fullPathToHtml, newHtml, 'utf8');
    })
    .then(() => log(`'${htmlFileName}' saved to directory ${pathToFolder}`))
    .then(() => fsPromises.mkdir(fullPathToFolder))
    .then(() => log(`Directory ${fullPathToFolder} was created`))
    .then(() => makeListr(pageLinks, fullPathToFolder, address))
    .then(list => list.run())
    .then(() => {
      log('Page loaded');
      return `Page was downloaded as '${htmlFileName}'`;
    });
};

export default pageLoader;
