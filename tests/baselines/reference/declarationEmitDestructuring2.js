//// [tests/cases/compiler/declarationEmitDestructuring2.ts] ////

//// [declarationEmitDestructuring2.ts]
function f({x = 10, y: [a, b, c, d] = [1, 2, 3, 4]} = { x: 10, y: [2, 4, 6, 8] }) { }
function g([a, b, c, d] = [1, 2, 3, 4]) { }
function h([a, [b], [[c]], {x = 10, y: [a, b, c], z: {a1, b1}}]){ }
function h1([a, [b], [[c]], {x = 10, y = [1, 2, 3], z: {a1, b1}}]){ }

//// [declarationEmitDestructuring2.js]
function f(_a) {
    var _b = _a === void 0 ? { x: 10, y: [2, 4, 6, 8] } : _a, _c = _b.x, x = _c === void 0 ? 10 : _c, _d = _b.y, _e = _d === void 0 ? [1, 2, 3, 4] : _d, a = _e[0], b = _e[1], c = _e[2], d = _e[3];
}
function g(_a) {
    var _b = _a === void 0 ? [1, 2, 3, 4] : _a, a = _b[0], b = _b[1], c = _b[2], d = _b[3];
}
function h(_a) {
    var a = _a[0], b = _a[1][0], c = _a[2][0][0], _b = _a[3], _c = _b.x, x = _c === void 0 ? 10 : _c, _d = _b.y, a = _d[0], b = _d[1], c = _d[2], _e = _b.z, a1 = _e.a1, b1 = _e.b1;
}
function h1(_a) {
    var a = _a[0], b = _a[1][0], c = _a[2][0][0], _b = _a[3], _c = _b.x, x = _c === void 0 ? 10 : _c, _d = _b.y, y = _d === void 0 ? [1, 2, 3] : _d, _e = _b.z, a1 = _e.a1, b1 = _e.b1;
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
