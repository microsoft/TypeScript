//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of35.ts] ////

//// [ES5For-of35.ts]
for (const {x: a = 0, y: b = 1} of [2, 3]) {
    a;
    b;
}

//// [ES5For-of35.js]
for (const { x: a = 0, y: b = 1 } of [2, 3]) {
    a;
    b;
}
//# sourceMappingURL=ES5For-of35.js.map