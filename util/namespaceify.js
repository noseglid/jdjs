'use strict';

module.exports = function namespaceify(path) {
  return path.replace(/\//g, '.');
};
