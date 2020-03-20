//// [declarationEmitDestructuring2.ts]
function f({x = 10, y: [a, b, c, d] = [1, 2, 3, 4]} = { x: 10, y: [2, 4, 6, 8] }) { }
function g([a, b, c, d] = [1, 2, 3, 4]) { }
function h([a, [b], [[c]], {x = 10, y: [a, b, c], z: {a1, b1}}]){ }
function h1([a, [b], [[c]], {x = 10, y = [1, 2, 3], z: {a1, b1}}]){ }

//// [declarationEmitDestructuring2.js]
function f(_a) {
    var _b = _a === void 0 ? { x: 10, y: [2, 4, 6, 8] } : _a, _c = _b.x, x = _c === void 0 ? 10 : _c, _d = _b.y, _e = _d === void 0 ? [1, 2, 3, 4] : _d, a = _e[0], b = _e[1], c = _e[2], d = _e[3];
}
function g(_f) {
    var _g = _f === void 0 ? [1, 2, 3, 4] : _f, a = _g[0], b = _g[1], c = _g[2], d = _g[3];
}
function h(_h) {
    var a = _h[0], b = _h[1][0], c = _h[2][0][0], _j = _h[3], _k = _j.x, x = _k === void 0 ? 10 : _k, _l = _j.y, a = _l[0], b = _l[1], c = _l[2], _m = _j.z, a1 = _m.a1, b1 = _m.b1;
}
function h1(_o) {
    var a = _o[0], b = _o[1][0], c = _o[2][0][0], _p = _o[3], _q = _p.x, x = _q === void 0 ? 10 : _q, _r = _p.y, y = _r === void 0 ? [1, 2, 3] : _r, _s = _p.z, a1 = _s.a1, b1 = _s.b1;
}


//// [declarationEmitDestructuring2.d.ts]
declare function f({ x, y: [a, b, c, d] }?: {
    x?: number;
    y?: [number, number, number, number];
}): void;
declare function g([a, b, c, d]?: [number, number, number, number]): void;
declare function h([a, [b], [[c]], { x, y: [a, b, c], z: { a1, b1 } }]: [any, [any], [[any]], {
    x?: number;
    y: [any, any, any];
    z: {
        a1: any;
        b1: any;
    };
}]): void;
declare function h1([a, [b], [[c]], { x, y, z: { a1, b1 } }]: [any, [any], [[any]], {
    x?: number;
    y?: number[];
    z: {
        a1: any;
        b1: any;
    };
}]): void;
