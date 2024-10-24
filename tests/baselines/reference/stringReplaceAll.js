//// [tests/cases/conformance/es2021/stringReplaceAll.ts] ////

//// [stringReplaceAll.ts]
// The signatures of String.prototype.{replace,replaceAll} should be identical
let { replace, replaceAll } = "";
replace = replaceAll;
replaceAll = replace;


//// [stringReplaceAll.js]
"use strict";
// The signatures of String.prototype.{replace,replaceAll} should be identical
let { replace, replaceAll } = "";
replace = replaceAll;
replaceAll = replace;
