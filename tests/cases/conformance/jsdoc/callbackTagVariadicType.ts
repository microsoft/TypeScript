// @declaration: true
// @outDir: bin/
// @checkJs: true
// @Filename: callbackTagVariadicType.js

/**
 * @callback Foo
 * @param {...string} args
 * @returns {number}
 */

/** @type {Foo} */
export const x = () => 1
var res = x('a', 'b')
