//// [tests/cases/conformance/es6/for-ofStatements/for-of42.ts] ////

//// [for-of42.ts]
var array = [{ x: "", y: 0 }]
for (var {x: a, y: b} of array) {
    a;
    b;
}

//// [for-of42.js]
"use strict";
var array = [{ x: "", y: 0 }];
for (var { x: a, y: b } of array) {
    a;
    b;
}
