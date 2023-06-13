//// [tests/cases/conformance/es6/for-ofStatements/for-of36.ts] ////

//// [for-of36.ts]
var tuple: [string, boolean] = ["", true];
for (var v of tuple) {
    v;
}

//// [for-of36.js]
var tuple = ["", true];
for (var v of tuple) {
    v;
}
