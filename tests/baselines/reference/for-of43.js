//// [tests/cases/conformance/es6/for-ofStatements/for-of43.ts] ////

//// [for-of43.ts]
var array = [{ x: "", y: 0 }]
for (var {x: a = "", y: b = true} of array) {
    a;
    b;
}

//// [for-of43.js]
var array = [{ x: "", y: 0 }];
for (var { x: a = "", y: b = true } of array) {
    a;
    b;
}
