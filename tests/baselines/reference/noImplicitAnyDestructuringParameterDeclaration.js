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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function f1(_a, _b, c, d) {
    var _c = __read(_a, 1), a = _c[0];
    var b = _b.b;
}
function f2(_a, _b, c, d) {
    var _c = __read(_a, 1), _d = _c[0], a = _d === void 0 ? undefined : _d;
    var _e = _b.b, b = _e === void 0 ? null : _e;
    if (c === void 0) { c = undefined; }
    if (d === void 0) { d = null; }
}
function f3(_a, _b, c, d) {
    var _c = __read(_a, 1), a = _c[0];
    var b = _b.b;
}
function f4(_a, x) {
    var b = _a.b;
}
function f5(_a, _b, c1, d1) {
    var _c = __read(_a === void 0 ? [undefined] : _a, 1), a1 = _c[0];
    var b1 = (_b === void 0 ? { b1: null } : _b).b1;
    if (c1 === void 0) { c1 = undefined; }
    if (d1 === void 0) { d1 = null; }
}
