//// [declarationEmitDestructuring2.ts]
function f({x = 10, y: [a, b, c, d] = [1, 2, 3, 4]} = { x: 10, y: [2, 4, 6, 8] }) { }
function g([a, b, c, d] = [1, 2, 3, 4]) { }
function h([a, [b], [[c]], {x = 10, y: [a, b, c], z: {a1, b1}}]){ }
function h1([a, [b], [[c]], {x = 10, y = [1, 2, 3], z: {a1, b1}}]){ }

//// [declarationEmitDestructuring2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function f(_a) {
    var _b = _a === void 0 ? { x: 10, y: [2, 4, 6, 8] } : _a, _c = _b.x, x = _c === void 0 ? 10 : _c, _d = _b.y, _e = __read(_d === void 0 ? [1, 2, 3, 4] : _d, 4), a = _e[0], b = _e[1], c = _e[2], d = _e[3];
}
function g(_a) {
    var _b = __read(_a === void 0 ? [1, 2, 3, 4] : _a, 4), a = _b[0], b = _b[1], c = _b[2], d = _b[3];
}
function h(_a) {
    var _b = __read(_a, 4), a = _b[0], _c = __read(_b[1], 1), b = _c[0], _d = __read(_b[2], 1), _e = __read(_d[0], 1), c = _e[0], _f = _b[3], _g = _f.x, x = _g === void 0 ? 10 : _g, _h = __read(_f.y, 3), a = _h[0], b = _h[1], c = _h[2], _j = _f.z, a1 = _j.a1, b1 = _j.b1;
}
function h1(_a) {
    var _b = __read(_a, 4), a = _b[0], _c = __read(_b[1], 1), b = _c[0], _d = __read(_b[2], 1), _e = __read(_d[0], 1), c = _e[0], _f = _b[3], _g = _f.x, x = _g === void 0 ? 10 : _g, _h = _f.y, y = _h === void 0 ? [1, 2, 3] : _h, _j = _f.z, a1 = _j.a1, b1 = _j.b1;
}


//// [declarationEmitDestructuring2.d.ts]
declare function f({x, y: [a, b, c, d]}?: {
    x?: number;
    y?: [number, number, number, number];
}): void;
declare function g([a, b, c, d]?: [number, number, number, number]): void;
declare function h([a, [b], [[c]], {x, y: [a, b, c], z: {a1, b1}}]: [any, [any], [[any]], {
    x?: number;
    y: [any, any, any];
    z: {
        a1: any;
        b1: any;
    };
}]): void;
declare function h1([a, [b], [[c]], {x, y, z: {a1, b1}}]: [any, [any], [[any]], {
    x?: number;
    y?: number[];
    z: {
        a1: any;
        b1: any;
    };
}]): void;
