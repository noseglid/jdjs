'use strict';

const os = require('os');

module.exports = class JavaClassPrinter {
  constructor() {
    this.decompiled = '';
    this.indentLevel = 0;
    this.rowIndented = false;
  }

  build(refined) {
    this.declaration(refined);
    this.newLine();
    this.indent();

    this.fields(refined);

    this.outdent();
    this.finalize();
  }

  declaration(refined) {
    const parts = refined.modifiers.concat([
      'class',
      refined.name,
      'extends',
      refined.super,
      '{'
    ]);
    this.append(parts.join(' '));
  }

  fields(refined) {
    refined.fields.forEach((field) => {
      const parts = field.modifiers.concat([
        field.type,
        field.name
      ]);

      this.append(parts.join(' '));
      this.append(';');
      this.newLine();
    });
  }

  finalize() {
    this.append('}');
    this.newLine();
  }

  append(string) {
    const indent = this.indented ? '' : ' '.repeat(this.indentLevel * 2);
    this.indented = true;
    this.decompiled += indent + string;
  }

  indent() {
    this.indentLevel++;
  }

  outdent() {
    this.indentLevel = Math.max(0, this.indentLevel - 1);
  }

  newLine(n) {
    this.append(os.EOL.repeat(n || 1));
    this.indented = false;
  }

  output() {
    process.stdout.write(this.decompiled);
  }
};
