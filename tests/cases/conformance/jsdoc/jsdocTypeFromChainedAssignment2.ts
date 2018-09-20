// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: mod.js

/** @param {number} n */
exports.f = exports.g = function fg(n) {
    return n + 1
}
/** @param {string} mom */
module.exports.h = module.exports.i = function hi(mom) {
    return `hi, ${mom}!`;
}

// @Filename: use.js
var mod = require('./mod');
mod.f('no')
mod.g('also no')
mod.h(0)
mod.i(1)
