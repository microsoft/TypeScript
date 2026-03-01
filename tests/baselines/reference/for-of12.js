//// [tests/cases/conformance/es6/for-ofStatements/for-of12.ts] ////

//// [for-of12.ts]
var v: string;
for (v of [0, ""].values()) { }

//// [for-of12.js]
"use strict";
var v;
for (v of [0, ""].values()) { }
