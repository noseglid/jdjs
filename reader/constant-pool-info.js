'use strict';

function utf8(reader) {
  const len = reader.read(2);
  const buf = reader.readBuffer(len);

  return {
    type: 'Utf8',
    value: buf.toString('utf8')
  };
}

function integer(reader) {
  return {
    type: 'Integer',
    value: reader.read(4)
  };
}

function float(reader) {
  return {
    type: 'Float',
    bytes: reader.read(4)
  };
}

function longDouble(type, reader) {
  return {
    type: type,
    highBytes: reader.read(4),
    lowBytes: reader.read(4)
  };
}

function klass(reader) {
  return {
    type: 'Class',
    nameIndex: reader.read(2)
  };
}

function string(reader) {
  return {
    type: 'String',
    stringIndex: reader.read(2)
  };
}
/**
 * Used for FieldRef, MethodRef and InterfaceMethodRef
 */
function ref(type, reader) {
  return {
    type: type,
    classIndex: reader.read(2),
    nameAndTypeIndex: reader.read(2)
  };
}

function nameAndType(reader) {
  return {
    type: 'NameAndType',
    nameIndex: reader.read(2),
    descriptorIndex: reader.read(2)
  };
}

function invokeDynamic(reader) {
  return {
    type: 'InvokeDynamic',
    bootstrapMethodAttrIndex: reader.read(2),
    nameAndTypeIndex: reader.read(2)
  };
}

function methodHandle(reader) {
  return {
    type: 'MethodHandle',
    referenceKind: reader.read(1),
    referenceIndex: reader.read(2)
  };
}

function methodType(reader) {
  return {
    type: 'MethodType',
    descriptorIndex: reader.read(2)
  };
}

module.exports = function (reader) {
  const tag = reader.read(1);

  switch (tag) {
    case 1: return utf8(reader);
    case 3: return integer(reader);
    case 4: return float(reader);
    case 5: return longDouble('Long', reader);
    case 6: return longDouble('Double', reader);
    case 7: return klass(reader);
    case 8: return string(reader);
    case 9: return ref('FieldRef', reader);
    case 10: return ref('MethodRef', reader);
    case 11: return ref('InterfaceMethodRef', reader);
    case 12: return nameAndType(reader);
    case 15: return methodHandle(reader);
    case 16: return methodType(reader);
    case 18: return invokeDynamic(reader);
    default: throw new Error('Invalid constant pool info tag: <' + tag + '>');
  }
};
