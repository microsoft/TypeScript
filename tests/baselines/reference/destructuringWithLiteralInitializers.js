//// [destructuringWithLiteralInitializers.ts]
// (arg: { x: any, y: any }) => void
function f1({ x, y }) { }
f1({ x: 1, y: 1 });

// (arg: { x: any, y?: number }) => void
function f2({ x, y = 0 }) { }
f2({ x: 1 });
f2({ x: 1, y: 1 });

// (arg: { x?: number, y?: number }) => void
function f3({ x = 0, y = 0 }) { }
f3({});
f3({ x: 1 });
f3({ y: 1 });
f3({ x: 1, y: 1 });

// (arg?: { x: number, y: number }) => void
function f4({ x, y } = { x: 0, y: 0 }) { }
f4();
f4({ x: 1, y: 1 });

// (arg?: { x: number, y?: number }) => void
function f5({ x, y = 0 } = { x: 0 }) { }
f5();
f5({ x: 1 });
f5({ x: 1, y: 1 });

// (arg?: { x?: number, y?: number }) => void
function f6({ x = 0, y = 0 } = {}) { }
f6();
f6({});
f6({ x: 1 });
f6({ y: 1 });
f6({ x: 1, y: 1 });

// (arg?: { a: { x?: number, y?: number } }) => void
function f7({ a: { x = 0, y = 0 } } = { a: {} }) { }
f7();
f7({ a: {} });
f7({ a: { x: 1 } });
f7({ a: { y: 1 } });
f7({ a: { x: 1, y: 1 } });

// (arg: [any, any]) => void
function g1([x, y]) { }
g1([1, 1]);

// (arg: [number, number]) => void
function g2([x = 0, y = 0]) { }
g2([1, 1]);

// (arg?: [number, number]) => void
function g3([x, y] = [0, 0]) { }
g3();
g3([1, 1]);

// (arg?: [number, number]) => void
function g4([x, y = 0] = [0]) { }
g4();
g4([1, 1]);

// (arg?: [number, number]) => void
function g5([x = 0, y = 0] = []) { }
g5();
g5([1, 1]);


//// [destructuringWithLiteralInitializers.js]
// (arg: { x: any, y: any }) => void
function f1(_a) {
    var x = _a.x, y = _a.y;
}
f1({ x: 1, y: 1 });
// (arg: { x: any, y?: number }) => void
function f2(_b) {
    var x = _b.x, _c = _b.y, y = _c === void 0 ? 0 : _c;
}
f2({ x: 1 });
f2({ x: 1, y: 1 });
// (arg: { x?: number, y?: number }) => void
function f3(_d) {
    var _e = _d.x, x = _e === void 0 ? 0 : _e, _f = _d.y, y = _f === void 0 ? 0 : _f;
}
f3({});
f3({ x: 1 });
f3({ y: 1 });
f3({ x: 1, y: 1 });
// (arg?: { x: number, y: number }) => void
function f4(_g) {
    var _h = _g === void 0 ? { x: 0, y: 0 } : _g, x = _h.x, y = _h.y;
}
f4();
f4({ x: 1, y: 1 });
// (arg?: { x: number, y?: number }) => void
function f5(_j) {
    var _k = _j === void 0 ? { x: 0 } : _j, x = _k.x, _l = _k.y, y = _l === void 0 ? 0 : _l;
}
f5();
f5({ x: 1 });
f5({ x: 1, y: 1 });
// (arg?: { x?: number, y?: number }) => void
function f6(_m) {
    var _o = _m === void 0 ? {} : _m, _p = _o.x, x = _p === void 0 ? 0 : _p, _q = _o.y, y = _q === void 0 ? 0 : _q;
}
f6();
f6({});
f6({ x: 1 });
f6({ y: 1 });
f6({ x: 1, y: 1 });
// (arg?: { a: { x?: number, y?: number } }) => void
function f7(_r) {
    var _s = (_r === void 0 ? { a: {} } : _r).a, _t = _s.x, x = _t === void 0 ? 0 : _t, _u = _s.y, y = _u === void 0 ? 0 : _u;
}
f7();
f7({ a: {} });
f7({ a: { x: 1 } });
f7({ a: { y: 1 } });
f7({ a: { x: 1, y: 1 } });
// (arg: [any, any]) => void
function g1(_v) {
    var x = _v[0], y = _v[1];
}
g1([1, 1]);
// (arg: [number, number]) => void
function g2(_w) {
    var _x = _w[0], x = _x === void 0 ? 0 : _x, _y = _w[1], y = _y === void 0 ? 0 : _y;
}
g2([1, 1]);
// (arg?: [number, number]) => void
function g3(_z) {
    var _0 = _z === void 0 ? [0, 0] : _z, x = _0[0], y = _0[1];
}
g3();
g3([1, 1]);
// (arg?: [number, number]) => void
function g4(_1) {
    var _2 = _1 === void 0 ? [0] : _1, x = _2[0], _3 = _2[1], y = _3 === void 0 ? 0 : _3;
}
g4();
g4([1, 1]);
// (arg?: [number, number]) => void
function g5(_4) {
    var _5 = _4 === void 0 ? [] : _4, _6 = _5[0], x = _6 === void 0 ? 0 : _6, _7 = _5[1], y = _7 === void 0 ? 0 : _7;
}
g5();
g5([1, 1]);
