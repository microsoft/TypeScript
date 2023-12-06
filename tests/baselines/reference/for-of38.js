//// [tests/cases/conformance/es6/for-ofStatements/for-of38.ts] ////

//// [for-of38.ts]
var map = new Map([["", true]]);
for (var [k, v] of map) {
    k;
    v;
}

//// [for-of38.js]
var map = new Map([["", true]]);
for (var [k, v] of map) {
    k;
    v;
}
