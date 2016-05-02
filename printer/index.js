'use strict';

const JavaClassPrinter = require('./JavaClassPrinter');

module.exports = (refined, opts) => {
  if (opts.json) {
    process.stdout.write(JSON.stringify(refined));
    return;
  }

  refined.forEach(ref => {
    const printer = new JavaClassPrinter();
    printer.build(ref);
    printer.output();
  });
};
