// @strictNullChecks: true
// @exactOptionalPropertyTypes: true
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: a.js

/**
 * @typedef Foo
 * @property {number} [foo]
 */

const x = /** @type {Foo} */ ({});
x.foo; // number | undefined

const y = /** @type {Required<Foo>} */ ({});
y.foo; // number
