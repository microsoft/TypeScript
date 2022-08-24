//// [tests/cases/conformance/pragma/alwaysStrict/alwaysStrictPragma1.ts] ////

//// [file1.ts]
// @ts-alwaysStrict
let private = {};
//// [file2.ts]
// @ts-alwaysStrict true
let protected = {};
//// [file3.ts]
// @ts-alwaysStrict false
let public = {};
//// [file4.ts]
let static = {};


//// [file1.js]
"use strict";
// @ts-alwaysStrict
var private = {};
//// [file2.js]
"use strict";
// @ts-alwaysStrict true
var protected = {};
//// [file3.js]
// @ts-alwaysStrict false
var public = {};
//// [file4.js]
var static = {};
