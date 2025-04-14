//// [tests/cases/conformance/es6/destructuring/destructuringWithLiteralInitializers.ts] ////

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
function f2(_a) {
    var x = _a.x, _b = _a.y, y = _b === void 0 ? 0 : _b;
}
f2({ x: 1 });
f2({ x: 1, y: 1 });
// (arg: { x?: number, y?: number }) => void
function f3(_a) {
    var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
}
f3({});
f3({ x: 1 });
f3({ y: 1 });
f3({ x: 1, y: 1 });
// (arg?: { x: number, y: number }) => void
function f4(_a) {
    var _b = _a === void 0 ? { x: 0, y: 0 } : _a, x = _b.x, y = _b.y;
}
f4();
f4({ x: 1, y: 1 });
// (arg?: { x: number, y?: number }) => void
function f5(_a) {
    var _b = _a === void 0 ? { x: 0 } : _a, x = _b.x, _c = _b.y, y = _c === void 0 ? 0 : _c;
}
f5();
f5({ x: 1 });
f5({ x: 1, y: 1 });
// (arg?: { x?: number, y?: number }) => void
function f6(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? 0 : _c, _d = _b.y, y = _d === void 0 ? 0 : _d;
}
f6();
f6({});
f6({ x: 1 });
f6({ y: 1 });
f6({ x: 1, y: 1 });
// (arg?: { a: { x?: number, y?: number } }) => void
function f7(_a) {
    var _b = _a === void 0 ? { a: {} } : _a, _c = _b.a, _d = _c.x, x = _d === void 0 ? 0 : _d, _e = _c.y, y = _e === void 0 ? 0 : _e;
}
f7();
f7({ a: {} });
f7({ a: { x: 1 } });
f7({ a: { y: 1 } });
f7({ a: { x: 1, y: 1 } });
// (arg: [any, any]) => void
function g1(_a) {
    var x = _a[0], y = _a[1];
}
g1([1, 1]);
// (arg: [number, number]) => void
function g2(_a) {
    var _b = _a[0], x = _b === void 0 ? 0 : _b, _c = _a[1], y = _c === void 0 ? 0 : _c;
}
g2([1, 1]);
// (arg?: [number, number]) => void
function g3(_a) {
    var _b = _a === void 0 ? [0, 0] : _a, x = _b[0], y = _b[1];
}
g3();
g3([1, 1]);
// (arg?: [number, number]) => void
function g4(_a) {
    var _b = _a === void 0 ? [0] : _a, x = _b[0], _c = _b[1], y = _c === void 0 ? 0 : _c;
}
g4();
g4([1, 1]);
// (arg?: [number, number]) => void
function g5(_a) {
    var _b = _a === void 0 ? [] : _a, _c = _b[0], x = _c === void 0 ? 0 : _c, _d = _b[1], y = _d === void 0 ? 0 : _d;
}
g5();
g5([1, 1]);
