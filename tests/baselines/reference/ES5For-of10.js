//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of10.ts] ////

//// [ES5For-of10.ts]
function foo() {
    return { x: 0 };
}
for (foo().x of []) {
    for (foo().x of [])
        var p = foo().x;
}

//// [ES5For-of10.js]
function foo() {
    return { x: 0 };
}
for (foo().x of []) {
    for (foo().x of [])
        var p = foo().x;
}
