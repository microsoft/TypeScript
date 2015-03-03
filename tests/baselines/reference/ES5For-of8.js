//// [ES5For-of8.ts]
function foo() {
    return { x: 0 };
}
for (foo().x of []) {
    var p = foo().x;
}

//// [ES5For-of8.js]
function foo() {
    return { x: 0 };
}
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    foo().x = _a[_i];
    var p = foo().x;
}
