'use strict';

const util = require('../util');

module.exports = class ConstantPool {
  constructor(pool) {
    this.pool = pool;
  }

  get(index) {
    return this.pool[index - 1];
  }

  extractValue(index) {
    const entry = this.get(index);
    switch (entry.type) {
      case 'Class': return util.namespaceify(this.extractValue(entry.nameIndex));
      case 'Utf8': return entry.value;
      case 'Integer': return entry.value;
      case 'String': return this.get(entry.stringIndex).value;
      case 'Long':
        // TODO: This will loose precision with numbers greater than 2^53
        return entry.highBytes << 32 + entry.lowBytes;
      default: throw new Error('Invalid value type: ' + entry.type);
    }
  }

  parseFieldType(desc) {
    const ret = [];
    let arrayRepeat = 0;

    function pushType(type) {
      ret.push(type + '[]'.repeat(arrayRepeat));
      arrayRepeat = 0;
    }

    for (let i = 0; i < desc.length; ++i) {
      switch (desc[i]) {
        case 'B': pushType('byte'); break;
        case 'C': pushType('char'); break;
        case 'D': pushType('double'); break;
        case 'F': pushType('float'); break;
        case 'I': pushType('int'); break;
        case 'J': pushType('long'); break;
        case 'S': pushType('short'); break;
        case 'V': pushType('void'); break;
        case 'Z': pushType('boolean'); break;
        case 'L':
          const type = desc.slice(i + 1, desc.indexOf(';', i));
          i += type.length + 1; // Also skip the semi-colon
          pushType(util.namespaceify(type));
          break;

        case '[': arrayRepeat++; break;
        default: throw new Error(`Invalid field type: ${desc[i]} (in ${desc}, pos: ${i})`);
      }
    }

    return ret;
  }

  extractFieldType(index) {
    const type = this.extractValue(index);
    return this.parseFieldType(type)[0]; // Always exactly one type of a field
  }

  extractMethodDescriptor(index) {
    const description = this.extractValue(index);
    const splut = /\(([^\)]*)\)(.+)/.exec(description);
    return {
      arguments: this.parseFieldType(splut[1]),
      returnValue: this.parseFieldType(splut[2])[0] // Always exactly one return value
    };
  }
};
