'use strict';

const reader = require('./reader');
const refiner = require('./refiner');

module.exports = (cl) => reader(cl).then(refiner);
module.exports.raw = (cl) => reader(cl);
