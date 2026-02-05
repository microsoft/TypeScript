//// [tests/cases/conformance/es6/for-ofStatements/for-of13.ts] ////

//// [for-of13.ts]
var v: string;
for (v of [""].values()) { }

//// [for-of13.js]
"use strict";
var v;
for (v of [""].values()) { }
