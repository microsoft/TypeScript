/// <reference path="fourslash.ts" />

// @strict: true
// @allowJs: true
// @checkJs: true

// @filename: index.js

//// const Core = {}
////
//// Core.Test = class {
////   constructor() { }
//// }
////
//// Core.Test.prototype.foo = 10
////
//// new Core.Tes/*1*/t()

verify.baselineGoToDefinition("1");
