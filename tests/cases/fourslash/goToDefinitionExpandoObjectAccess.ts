/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: index.js
////const A = {};
////A./*Destination*/B = class Foo { }
////new A./*1*/B();
////A.B.prototype.C = null;

verify.baselineGoToDefinition("1");
