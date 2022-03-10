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
function f2(_a, _b, c, d) {
    var _c = _a[0], a = _c === void 0 ? undefined : _c;
    var _d = _b.b, b = _d === void 0 ? null : _d;
    if (c === void 0) { c = undefined; }
    if (d === void 0) { d = null; }
}
function f3(_a, _b, c, d) {
    var a = _a[0];
    var b = _b.b;
}
function f4(_a, x) {
    var b = _a.b;
}
function f5(_a, _b, c1, d1) {
    var _c = _a === void 0 ? [undefined] : _a, a1 = _c[0];
    var _d = _b === void 0 ? { b1: null } : _b, b1 = _d.b1;
    if (c1 === void 0) { c1 = undefined; }
    if (d1 === void 0) { d1 = null; }
}
