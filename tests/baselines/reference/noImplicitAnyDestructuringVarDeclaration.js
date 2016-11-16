//// [noImplicitAnyDestructuringVarDeclaration.ts]
var [a], {b}, c, d; // error

var [a1 = undefined], {b1 = null}, c1 = undefined, d1 = null; // error

var [a2]: [any], {b2}: { b2: any }, c2: any, d2: any;

var {b3}: { b3 }, c3: { b3 }; // error in type instead

var [a4] = [undefined], {b4} = { b4: null }, c4 = undefined, d4 = null; // error

var [a5 = undefined] = []; // error

//// [noImplicitAnyDestructuringVarDeclaration.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var _a = __read(void 0, 1), a = _a[0], b = (void 0).b, c, d; // error
var _b = __read(void 0, 1), _c = _b[0], a1 = _c === void 0 ? undefined : _c, _d = (void 0).b1, b1 = _d === void 0 ? null : _d, c1 = undefined, d1 = null; // error
var _e = __read(void 0, 1), a2 = _e[0], b2 = (void 0).b2, c2, d2;
var b3 = (void 0).b3, c3; // error in type instead
var a4 = [undefined][0], b4 = { b4: null }.b4, c4 = undefined, d4 = null; // error
var _f = [][0], a5 = _f === void 0 ? undefined : _f; // error
