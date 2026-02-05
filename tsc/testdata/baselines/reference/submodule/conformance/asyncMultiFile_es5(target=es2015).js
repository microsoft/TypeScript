//// [tests/cases/conformance/async/es5/asyncMultiFile_es5.ts] ////

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
