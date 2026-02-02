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
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    foo().x = _a[_i];
    for (var _b = 0, _c = []; _b < _c.length; _b++) {
        foo().x = _c[_b];
        var p = foo().x;
    }
}
