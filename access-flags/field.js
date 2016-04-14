'use strict';

module.exports = {
  ACC_PUBLIC: { mask: 0x0001, string: 'public' },
  ACC_PRIVATE: { mask: 0x0002, string: 'private' },
  ACC_PROTECTED: { mask: 0x0004, string: 'protected' },
  ACC_STATIC: { mask: 0x0008, string: 'static' },
  ACC_FINAL: { mask: 0x0010, string: 'final' },
  ACC_VOLATILE: { mask: 0x0040, string: 'volatile' },
  ACC_TRANSIENT: { mask: 0x0080, string: 'transient' },
  ACC_SYNTHETIC: { mask: 0x1000 },
  ACC_ENUM: { mask: 0x4000, string: 'enum' }
};
