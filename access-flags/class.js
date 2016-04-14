'use strict';

module.exports = {
  ACC_PUBLIC: { mask: 0x0001, string: 'public' },
  ACC_FINAL: { mask: 0x0010, string: 'final' },
  ACC_SUPER: { mask: 0x0020 },
  ACC_INTERFACE: { mask: 0x0200, string: 'interface' },
  ACC_ABSTRACT: { mask: 0x0400, string: 'abstract' },
  ACC_SYNTHETIC: { mask: 0x1000 },
  ACC_ANNOTATION: { mask: 0x2000 },
  ACC_ENUM: { mask: 0x4000 }
};
