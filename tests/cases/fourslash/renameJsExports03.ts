/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////class /*1*/A {
////    /*2*/constructor() { }
////}
////module.exports = A;

// @Filename: b.js
////const /*3*/A = require("./a");
////new /*4*/A;

verify.baselineFindAllReferences('1', '2', '3', '4')
