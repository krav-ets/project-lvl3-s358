import axios from 'axios';
import path from 'path';
import { promises as fsPromises } from 'fs';
import _ from 'lodash';

const genFileName = (url) => {
  const { host, pathname } = new URL(url);
  const fileName = `${host}${pathname}`.replace(/\W/g, '-');
  const trimFileName = _.trim(fileName, '-');
  const result = `${trimFileName}.html`;
  return result;
};


const pageLoader = (address, pathToFolder) => {
  const fileName = genFileName(address);
  const fullPathToFile = path.join(pathToFolder, fileName);
  return axios.get(address)
    .then(response => fsPromises.writeFile(fullPathToFile, response.data, 'utf8'));
};

export default pageLoader;
