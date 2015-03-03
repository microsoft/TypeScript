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
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    foo().x = _a[_i];
    for (var _i_1 = 0, _a_1 = []; _i_1 < _a_1.length; _i_1++) {
        foo().x = _a_1[_i_1];
        var p = foo().x;
    }
}
