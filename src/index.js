import axios from 'axios';
import path from 'path';
import fs from 'fs';

const fsPromises = fs.promises;


const genFileName = (url) => {
  const fileName = url.replace(/^https?[:][/][/]/i, '').replace(/[^0-9a-z]+/ig, '-');
  const result = `${fileName}.html`;
  return result;
};


const pageLoader = (address, pathToFolder) => {
  const fileName = genFileName(address);
  const fullPathToFile = path.join(pathToFolder, fileName);
  return axios.get(address)
    .then(response => fsPromises.writeFile(fullPathToFile, response.data, 'utf8'))
    .catch((error) => {
      throw new Error(error);
    });
};

export default pageLoader;
