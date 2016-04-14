'use strict';

module.exports = {
  ACC_PUBLIC: { mask: 0x0001, string: 'public' },
  ACC_PRIVATE: { mask: 0x0002, string: 'private' },
  ACC_PROTECTED: { mask: 0x0004, string: 'protected' },
  ACC_STATIC: { mask: 0x0008, string: 'static' },
  ACC_FINAL: { mask: 0x0010, string: 'final' },
  ACC_SYNCHRONIZED: { mask: 0x0020, string: 'synchronized' },
  ACC_BRIDGE: { mask: 0x0040 },
  ACC_VARARGS: { mask: 0x0080 },
  ACC_NATIVE: { mask: 0x0100, string: 'native' },
  ACC_ABSTRACT: { mask: 0x0400, string: 'abstract' },
  ACC_STRICT: { mask: 0x0800 },
  ACC_SYNTHETIC: { mask: 0x100 }
};
