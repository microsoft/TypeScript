//// [noImplicitAnyDestructuringParameterDeclaration.ts]
function f1([a], {b}, c, d) { // error
}
function f2([a = undefined], {b = null}, c = undefined, d = null) { // error
}
function f3([a]: [any], {b}: { b: any }, c: any, d: any) {
}
function f4({b}: { b }, x: { b }) { // error in type instead
}
function f5([a1] = [undefined], {b1} = { b1: null }, c1 = undefined, d1 = null) { // error
}

//// [noImplicitAnyDestructuringParameterDeclaration.js]
function f1(_a, _b, c, d) {
    var a = _a[0];
    var b = _b.b;
}
function f2(_c, _d, c, d) {
    var _e = _c[0], a = _e === void 0 ? undefined : _e;
    var _f = _d.b, b = _f === void 0 ? null : _f;
    if (c === void 0) { c = undefined; }
    if (d === void 0) { d = null; }
}
function f3(_g, _h, c, d) {
    var a = _g[0];
    var b = _h.b;
}
function f4(_j, x) {
    var b = _j.b;
}
function f5(_k, _l, c1, d1) {
    var a1 = (_k === void 0 ? [undefined] : _k)[0];
    var b1 = (_l === void 0 ? { b1: null } : _l).b1;
    if (c1 === void 0) { c1 = undefined; }
    if (d1 === void 0) { d1 = null; }
}
