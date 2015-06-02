/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: a.js
//// /**
////  * @type {number}
////  * @type {string}
////  */
////  var v;

verify.getSyntacticDiagnostics(`[
  {
    "message": "\'type\' tag already specified.",
    "start": 26,
    "length": 4,
    "category": "error",
    "code": 1223
  }
]`);