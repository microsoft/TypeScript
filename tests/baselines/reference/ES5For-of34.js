//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of34.ts] ////

//// [ES5For-of34.ts]
function foo() {
    return { x: 0 };
}
for (foo().x of ['a', 'b', 'c']) {
    var p = foo().x;
}

//// [ES5For-of34.js]
function foo() {
    return { x: 0 };
}
for (foo().x of ['a', 'b', 'c']) {
    var p = foo().x;
}
//# sourceMappingURL=ES5For-of34.js.map