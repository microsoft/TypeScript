/// <reference path="fourslash.ts" />

// @strict: true
// @checkJs: true
// @filename: index.js

//// const x = {};
////
//// Object.defineProperty(x, "foo", {
////   /** @param {number} v */
////   set(v) {},
//// });
////
//// x.foo/**/ = 1;

verify.quickInfoAt("", "(property) x.foo: number");
