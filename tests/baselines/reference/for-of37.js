//// [tests/cases/conformance/es6/for-ofStatements/for-of37.ts] ////

//// [for-of37.ts]
var map = new Map([["", true]]);
for (var v of map) {
    v;
}

//// [for-of37.js]
"use strict";
var map = new Map([["", true]]);
for (var v of map) {
    v;
}
