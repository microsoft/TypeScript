//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of9.ts] ////

//// [ES5For-of9.ts]
function foo() {
    return { x: 0 };
}
for (foo().x of []) {
    for (foo().x of []) {
        var p = foo().x;
    }
}

//// [ES5For-of9.js]
function foo() {
    return { x: 0 };
}
for (foo().x of []) {
    for (foo().x of []) {
        var p = foo().x;
    }
}
