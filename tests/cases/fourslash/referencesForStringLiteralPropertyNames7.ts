/// <reference path='fourslash.ts'/>
// @Filename: foo.js
// @noEmit: true
// @allowJs: true
// @checkJs: true

////var x = { "/*1*/someProperty": 0 }
////x["/*2*/someProperty"] = 3;
////x.someProperty = 5;

verify.baselineFindAllReferences('1', '2')
