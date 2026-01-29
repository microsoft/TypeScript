//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of24.ts] ////

//// [ES5For-of24.ts]
var a = [1, 2, 3];
for (var v of a) {
    let a = 0;
}

//// [ES5For-of24.js]
var a = [1, 2, 3];
for (var v of a) {
    let a = 0;
}
