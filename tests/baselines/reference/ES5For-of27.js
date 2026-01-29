//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of27.ts] ////

//// [ES5For-of27.ts]
for (var {x: a = 0, y: b = 1} of [2, 3]) {
    a;
    b;
}

//// [ES5For-of27.js]
for (var { x: a = 0, y: b = 1 } of [2, 3]) {
    a;
    b;
}
