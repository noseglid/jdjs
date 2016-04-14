#!/usr/bin/env node

'use strict';

const bluebird = require('bluebird');
const program = require('commander');
const reader = require('./reader');
const refiner = require('./refiner');
const printer = require('./printer');
const pkg = require('./package.json');
const statAsync = bluebird.promisify(require('fs').stat);

program
  .version(pkg.version)
  .option('-c, --class [class]', 'The class file to decompile')
  .option('--json', 'Output JSON rather than human readable')
  .parse(process.argv);

if (!program.class) {
  program.outputHelp();
  process.exit(1);
}

statAsync(program.class)
  .then(reader.bind(null, program.class))
  .then(refiner)
  .then(printer.bind(null, { json: program.json }))
  .catch(err => {
    console.error(`Unable to process class file. ${err.message}`); // eslint-disable-line no-console
    console.error(err.stack); // eslint-disable-line no-console
  });
