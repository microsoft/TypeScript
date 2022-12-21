// @allowJS: true
// @checkJs: true
// @noEmit: true

// @filename: a.js
/**
 * @type {function(boolean, string, ...*):void}
 */
const foo = function (a, b, ...r) { };

// @filename: b.ts
foo(false, '');
