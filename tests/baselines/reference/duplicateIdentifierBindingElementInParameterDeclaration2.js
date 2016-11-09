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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function f0(a, _a, _b) {
    var _c = __read(_a, 2), a = _c[0], _d = __read(_c[1], 1), b = _d[0];
    var b = _b.b;
}
function f1(_a) {
    var _b = __read(_a, 2), a = _b[0], a = _b[1];
}
function f2(_a, _b) {
    var b = _a.b;
    var b = _b.b;
}
function f3(_a) {
    var _b = __read(_a, 3), c = _b[0], _c = __read(_b[1], 1), c = _c[0], _d = __read(_b[2], 1), _e = __read(_d[0], 1), c = _e[0];
}
function f4(_a) {
    var d = _a.d, d = _a.d.d;
}
function f5(_a, _b, _c) {
    var e = _a.e, e = _a.e.e;
    var e = _b.e;
    var _d = __read(_c, 3), d = _d[0], e = _d[1], _e = __read(_d[2], 1), _f = __read(_e[0], 1), e = _f[0];
    var e = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        e[_i - 3] = arguments[_i];
    }
}
function f6(_a) {
    var _b = __read(_a), f = _b[0], f = _b.slice(1);
}
function f7(a, func) {
    if (func === void 0) { func = function (a) { return 1; }; }
} // not error
