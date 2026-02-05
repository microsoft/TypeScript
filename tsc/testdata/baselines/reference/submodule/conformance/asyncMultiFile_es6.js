//// [tests/cases/conformance/async/es6/asyncMultiFile_es6.ts] ////

//// [a.ts]
async function f() {}
//// [b.ts]
function g() { }

//// [a.js]
"use strict";
async function f() { }
//// [b.js]
"use strict";
function g() { }
