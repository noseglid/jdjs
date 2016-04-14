'use strict';

const JavaClassPrinter = require('./JavaClassPrinter');

module.exports = (opts, refined) => {
  if (opts.json) {
    process.stdout.write(JSON.stringify(refined));
    return;
  }

  const printer = new JavaClassPrinter();
  printer.build(refined);
  printer.output();
};
