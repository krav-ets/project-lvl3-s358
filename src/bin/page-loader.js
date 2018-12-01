#!/usr/bin/env node

import program from 'commander';
import { version } from '../../package.json';
import pageLoader from '..';
import errorHandler from '../errorHandler';

program
  .version(version)
  .description('Program for downloading the specified address from the network')
  .option('-o, --output [pathToFolder]', 'Folder for downloaded files')
  .arguments('<address>')
  .action((address, options) => {
    pageLoader(address, options.output)
      .then(() => process.exit())
      .catch((err) => {
        console.error(errorHandler(err));
        process.exitCode = 1;
      });
  })
  .parse(process.argv);
