'use strict';

const reader = require('./reader');
const refiner = require('./refiner');

module.exports = (input) => reader(input)
  .then(results => results.map(refiner));
