//// [tests/cases/conformance/es6/for-ofStatements/for-of50.ts] ////

//// [for-of50.ts]
var map = new Map([["", true]]);
for (const [k, v] of map) {
    k;
    v;
}

//// [for-of50.js]
var map = new Map([["", true]]);
for (const [k, v] of map) {
    k;
    v;
}
