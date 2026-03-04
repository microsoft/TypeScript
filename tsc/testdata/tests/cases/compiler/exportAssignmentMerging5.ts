// @module: commonjs
// @declaration: true
// @checkJs: true
// @outDir: ./out
// @filename: a.js
/**
 * @typedef {{x: string}} Foo
 */
module.exports = { a: 1, b: "hello" };
// @filename: b.js
const a = require("./a");
const c1 = a.a;
const c2 = a.b;
/** @type {a.Foo} */
let v1 = { x: "test" };
