'use strict';

module.exports = function (reader) {
  const attribute = {
    attributeNameIndex: reader.read(2),
    attributeLength: reader.read(4)
  };

  attribute.info = reader.readBuffer(attribute.attributeLength);
  return attribute;
};
