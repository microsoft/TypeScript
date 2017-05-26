//// [0.js]
// @ts-check
/**
 * @typedef {Object} Opts
 * @property {string} x
 * @property {string=} y
 * @property {string} [z]
 * @property {string} [w="hi"]
 * 
 * @param {Opts} opts
 */
function foo(opts) {}

foo({x: 'abc'});

//// [0.js]
// @ts-check
/**
 * @typedef {Object} Opts
 * @property {string} x
 * @property {string=} y
 * @property {string} [z]
 * @property {string} [w="hi"]
 *
 * @param {Opts} opts
 */
function foo(opts) { }
foo({ x: 'abc' });
