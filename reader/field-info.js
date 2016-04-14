'use strict';

const attributeInfo = require('./attribute-info');

module.exports = function (reader) {
  const field = {
    accessFlags: reader.read(2),
    nameIndex: reader.read(2),
    descriptorIndex: reader.read(2),
    attributesCount: reader.read(2),
    attributes: []
  };

  for (let i = 0; i < field.attributesCount; ++i) {
    field.attributes.push(attributeInfo(reader));
  }

  return field;
};
