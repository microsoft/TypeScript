//// [tests/cases/compiler/duplicateIdentifierBindingElementInParameterDeclaration2.ts] ////

//// [duplicateIdentifierBindingElementInParameterDeclaration2.ts]
"use strict"
function f0(a, [a, [b]], {b}) { }
function f1([a, a]) { }
function f2({b}, {b}) { }
function f3([c, [c], [[c]]]) { }
function f4({d, d: {d}}) { }
function f5({e, e: {e}}, {e}, [d, e, [[e]]], ...e) { }
function f6([f, ...f]) { }
function f7(a, func = (a) => { return 1 }){ }  // not error

//// [duplicateIdentifierBindingElementInParameterDeclaration2.js]
"use strict";
function f0(a, _a, _b) {
    var a = _a[0], b = _a[1][0];
    var b = _b.b;
}
function f1(_a) {
    var a = _a[0], a = _a[1];
}
function f2(_a, _b) {
    var b = _a.b;
    var b = _b.b;
}
function f3(_a) {
    var c = _a[0], c = _a[1][0], c = _a[2][0][0];
}
function f4(_a) {
    var d = _a.d, d = _a.d.d;
}
function f5(_a, _b, _c) {
    var e = _a.e, e = _a.e.e;
    var e = _b.e;
    var d = _c[0], e = _c[1], e = _c[2][0][0];
    var e = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        e[_i - 3] = arguments[_i];
    }
}
function f6(_a) {
    var f = _a[0], f = _a.slice(1);
}
function f7(a, func) {
    if (func === void 0) { func = function (a) { return 1; }; }
} // not error
