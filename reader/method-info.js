'use strict';

const attributeInfo = require('./attribute-info');

module.exports = function (reader) {
  const method = {
    accessFlags: reader.read(2),
    nameIndex: reader.read(2),
    descriptorIndex: reader.read(2),
    attributesCount: reader.read(2),
    attributes: []
  };

  for (let i = 0; i < method.attributesCount; ++i) {
    method.attributes.push(attributeInfo(reader));
  }

  return method;
};
