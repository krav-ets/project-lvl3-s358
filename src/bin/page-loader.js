#!/usr/bin/env node

import program from 'commander';
import debug from 'debug';
import { version } from '../../package.json';
import pageLoader from '..';
import errorHandler from '../errorHandler';

const log = debug('page-loader');

program
  .version(version)
  .description('Program for downloading the specified address from the network')
  .option('-o, --output [pathToFolder]', 'Folder for downloaded files')
  .arguments('<address>')
  .action((address, options) => {
    pageLoader(address, options.output)
      .then((msg) => {
        console.log('\n', msg);
        process.exit(0);
      })
      .catch((err) => {
        log(`ERROR ${err}`);
        console.error(errorHandler(err));
        process.exitCode = 1;
      });
  })
  .parse(process.argv);
