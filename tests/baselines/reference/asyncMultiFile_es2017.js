//// [tests/cases/conformance/async/es2017/asyncMultiFile_es2017.ts] ////

//// [a.ts]
async function f() {}
//// [b.ts]
function g() { }

//// [a.js]
async function f() { }
//// [b.js]
function g() { }
