// @allowJS: true
// @suppressOutputPathCheck: true

// @filename: 0.js
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
function foo(opts) {
    opts.x;
}

foo({x: 'abc'});

/**
 * @typedef {object} Opts1
 * @property {string} x
 * @property {string=} y
 * @property {string} [z]
 * @property {string} [w="hi"]
 *
 * @param {Opts1} opts
 */
function foo1(opts) {
    opts.x;
}
foo1({x: 'abc'});
