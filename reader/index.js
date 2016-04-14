'use strict';

const JavaClassReader = require('./JavaClassReader');

function processClassFile(reader) {
  const cl = {};
  cl.magic = reader.magic();
  cl.version = reader.version();
  cl.constantPoolCount = reader.constantPoolCount();
  cl.constantPool = [];
  for (let i = 0; i < cl.constantPoolCount - 1; ++i) {
    const info = reader.constantPoolInfo();
    cl.constantPool.push(info);
    switch (info.type) {
      case 'Double':
      case 'Long':
        // Double and Long takes 2 entries for unknown reasons. Push a dummy here.
        cl.constantPool.push({ type: 'Dummy', value: info.type });
        ++i;
    }
  }
  cl.accessFlags = reader.accessFlags();
  cl.thisClass = reader.thisClass();
  cl.superClass = reader.superClass();
  cl.interfacesCount = reader.interfaceCount();
  cl.interfaces = [];
  for (let i = 0; i < cl.interfacesCount; ++i) {
    cl.interfaces.push(reader.interface());
  }
  cl.fieldsCount = reader.fieldsCount();
  cl.fields = [];
  for (let i = 0; i < cl.fieldsCount; ++i) {
    cl.fields.push(reader.fieldInfo());
  }
  cl.methodsCount = reader.methodsCount();
  cl.methods = [];
  for (let i = 0; i < cl.methodsCount; ++i) {
    cl.methods.push(reader.methodInfo());
  }
  cl.attributesCount = reader.attributesCount();
  cl.attributes = [];
  for (let i = 0; i < cl.attributesCount; ++i) {
    cl.attributes.push(reader.attributeInfo());
  }
  reader.finalize();

  return cl;
}

module.exports = function (classFile) {
  const reader = new JavaClassReader(classFile);
  return reader.open().then(processClassFile.bind(null, reader));
};
