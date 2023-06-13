//// [tests/cases/conformance/es6/for-ofStatements/for-of46.ts] ////

//// [for-of46.ts]
var k: string, v: boolean;
var map = new Map([["", true]]);
for ([k = false, v = ""] of map) {
    k;
    v;
}

//// [for-of46.js]
var k, v;
var map = new Map([["", true]]);
for ([k = false, v = ""] of map) {
    k;
    v;
}
