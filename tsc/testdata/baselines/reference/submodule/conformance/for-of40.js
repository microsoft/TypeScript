//// [tests/cases/conformance/es6/for-ofStatements/for-of40.ts] ////

//// [for-of40.ts]
var map = new Map([["", true]]);
for (var [k = "", v = false] of map) {
    k;
    v;
}

//// [for-of40.js]
var map = new Map([["", true]]);
for (var [k = "", v = false] of map) {
    k;
    v;
}
