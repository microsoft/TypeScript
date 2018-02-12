/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
/////*a*/const/*b*/ alias;
////require("x");

goTo.select("a", "b");
verify.not.refactorAvailable("Convert to ES6 module");

