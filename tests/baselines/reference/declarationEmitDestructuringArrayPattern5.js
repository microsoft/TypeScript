//// [declarationEmitDestructuringArrayPattern5.ts]
var [, , z] = [1, 2, 4];
var [, a, , ] = [3, 4, 5];
var [, , [, b, ]] = [3,5,[0, 1]];

//// [declarationEmitDestructuringArrayPattern5.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var _a = [1, 2, 4], z = _a[2];
var _b = [3, 4, 5], a = _b[1];
var _c = [3, 5, [0, 1]], _d = __read(_c[2], 2), b = _d[1];


//// [declarationEmitDestructuringArrayPattern5.d.ts]
declare var z: number;
declare var a: number;
declare var b: number;
