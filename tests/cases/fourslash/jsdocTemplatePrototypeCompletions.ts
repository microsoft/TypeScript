/// <reference path="fourslash.ts" />

// @checkJs: true
// @filename: index.js

//// https://github.com/microsoft/TypeScript/issues/11492

//// /** @constructor */
//// function Foo() {}
//// /**
////  * @template T
////  * @param {T} bar
////  * @returns {T}
////  */
//// Foo.prototype.foo = function (bar) {};
//// new Foo().foo({ id: 1234 })./**/

verify.completions({ marker: "", exact: ["id"] });
