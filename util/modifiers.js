'use strict';

module.exports = (accessFlags, list) => Object.keys(list)
    .filter(flag => (accessFlags & list[flag].mask && list[flag].string))
    .map(flag => list[flag].string);
