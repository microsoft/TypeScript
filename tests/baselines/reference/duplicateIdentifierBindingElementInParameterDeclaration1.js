//// [duplicateIdentifierBindingElementInParameterDeclaration1.ts]
function f0(a, [a, [b]], {b}) { }
function f1([a, a]) { }
function f2({b}, {b}) { }
function f3([c,[c],[[c]]]) { }
function f4({d, d:{d}}) { }
function f5({e, e: {e}}, {e}, [d,e, [[e]]], ...e) { }
function f6([f, ...f]) { }
function f7(a, func = (a) => { return 1 }) { }  // not error

//// [duplicateIdentifierBindingElementInParameterDeclaration1.js]
function f0(a, _a, _b) {
    var a = _a[0], b = _a[1][0];
    var b = _b.b;
}
function f1(_c) {
    var a = _c[0], a = _c[1];
}
function f2(_d, _e) {
    var b = _d.b;
    var b = _e.b;
}
function f3(_f) {
    var c = _f[0], c = _f[1][0], c = _f[2][0][0];
}
function f4(_g) {
    var d = _g.d, d = _g.d.d;
}
function f5(_h, _j, _k) {
    var e = _h.e, e = _h.e.e;
    var e = _j.e;
    var d = _k[0], e = _k[1], e = _k[2][0][0];
    var e = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        e[_i - 3] = arguments[_i];
    }
}
function f6(_l) {
    var f = _l[0], f = _l.slice(1);
}
function f7(a, func) {
    if (func === void 0) { func = function (a) { return 1; }; }
} // not error
