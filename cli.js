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
  .option('-i, --input [input]', 'The input file to decompile. Must be a .class or .jar file.')
  .option('--json', 'Output JSON rather than human readable')
  .parse(process.argv);

if (!program.input) {
  program.outputHelp();
  process.exit(1);
}

statAsync(program.input)
  .then(() => reader(program.input))
  .then(results => results.map(refiner))
  .then(refined => printer(refined, { json: program.json }))
  .catch(err => {
    console.error(`Unable to process class file. ${err.message}`); // eslint-disable-line no-console
    console.error(err.stack); // eslint-disable-line no-console
  });
