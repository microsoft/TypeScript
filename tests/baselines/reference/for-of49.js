//// [tests/cases/conformance/es6/for-ofStatements/for-of49.ts] ////

//// [for-of49.ts]
var k: string, v: boolean;
var map = new Map([["", true]]);
for ([k, ...[v]] of map) {
    k;
    v;
}

//// [for-of49.js]
var k, v;
var map = new Map([["", true]]);
for ([k, ...[v]] of map) {
    k;
    v;
}
