// @allowJS: true
// @suppressOutputPathCheck: true

// @filename: 0.js
// @ts-check
/**
 * @typedef {Object} Opts
 * @property {string} x
 * @property {string=} y
 * 
 * @param {Opts} opts
 */
function foo(opts) {}

foo({x: 'abc'});