//// [tests/cases/conformance/es6/for-ofStatements/for-of9.ts] ////

//// [for-of9.ts]
var v: string;
for (v of ["hello"]) { }
for (v of "hello") { }

//// [for-of9.js]
var v;
for (v of ["hello"]) { }
for (v of "hello") { }
