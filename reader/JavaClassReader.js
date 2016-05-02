'use strict';

const constantPoolInfo = require('./constant-pool-info');
const fieldInfo = require('./field-info');
const attributeInfo = require('./attribute-info');
const methodInfo = require('./method-info');

module.exports = class JavaClassReader {

  constructor(stream) {
    this.stream = stream;
    this.buffer = null;
    this.pos = -1;
  }

  initialize() {
    const buffers = [];
    return new Promise((resolve, reject) => {
      this.stream.on('data', buffer => buffers.push(buffer));
      this.stream.on('error', reject);
      this.stream.on('end', () => {
        this.buffer = Buffer.concat(buffers);
        this.pos = 0;
        resolve(this);
      });
    });
  }

  magic() {
    return this.read(4);
  }

  version() {
    return {
      minor: this.read(2),
      major: this.read(2)
    };
  }

  constantPoolCount() {
    return this.read(2);
  }

  constantPoolInfo() {
    return constantPoolInfo(this);
  }

  accessFlags() {
    return this.read(2);
  }

  thisClass() {
    return this.read(2);
  }

  superClass() {
    return this.read(2);
  }

  interfaceCount() {
    return this.read(2);
  }

  interface() {
    return this.read(2);
  }

  fieldsCount() {
    return this.read(2);
  }

  fieldInfo() {
    return fieldInfo(this);
  }

  methodsCount() {
    return this.read(2);
  }

  methodInfo() {
    return methodInfo(this);
  }

  attributesCount() {
    return this.read(2);
  }

  attributeInfo() {
    return attributeInfo(this);
  }

  read(n) {
    let ret;
    switch (n) {
      case 1: ret = this.buffer.readUInt8(this.pos); break;
      case 2: ret = this.buffer.readUInt16BE(this.pos); break;
      case 4: ret = this.buffer.readUInt32BE(this.pos); break;
      default: throw new Error(`Can not read ${n} bytes.`);
    }
    this.pos += n;
    return ret;
  }

  readBuffer(n) {
    const buf = new Buffer(n);
    this.buffer.copy(buf, 0, this.pos, this.pos + n);
    this.pos += n;
    return buf;
  }

  finalize() {
    if (this.pos !== this.buffer.length) {
      throw new Error('Invalid .class file: not fully consumed');
    }
  }

};
