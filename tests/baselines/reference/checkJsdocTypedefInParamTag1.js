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

/**
 * @typedef {Object} AnotherOpts
 * @property anotherX {string}
 * @property anotherY {string=}
 * 
 * @param {AnotherOpts} opts
 */
function foo1(opts) {}

foo1({anotherX: "world"});

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
/**
 * @typedef {Object} AnotherOpts
 * @property anotherX {string}
 * @property anotherY {string=}
 *
 * @param {AnotherOpts} opts
 */
function foo1(opts) { }
foo1({ anotherX: "world" });
