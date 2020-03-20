//// [optionalParameterInDestructuringWithInitializer.ts]
// https://github.com/Microsoft/TypeScript/issues/17080

declare function f(a:number,b:number): void;

function func1( {a, b}: {a: number, b?: number} = {a: 1, b: 2} ) {
  f(a, b)
  // error
}

function func2( {a, b = 3}: {a: number, b?:number} = {a: 1,b: 2} ) {
  f(a, b)
  // no error
}

function func3( {a, b}: {a: number, b?: number} = {a: 1} ) {
  f(a,b)
  // error
}

function func4( {a: {b, c}, d}: {a: {b: number,c?: number},d: number} = {a: {b: 1,c: 2},d: 3} ) {
  f(b,c)
  // error
}

function func5({a: {b, c = 4}, d}: {a: {b: number,c?: number},d: number} = {a: {b: 1,c: 2},d: 3} ) {
  f(b, c)
  // no error
}

function func6( {a: {b, c} = {b: 4, c: 5}, d}: {a: {b: number, c?: number}, d: number} = {a: {b: 1,c: 2}, d: 3} ) {
  f(b, c)
  // error
}

function func7( {a: {b, c = 6} = {b: 4, c: 5}, d}: {a: {b: number, c?: number}, d: number} = {a: {b: 1, c: 2}, d: 3} ) {
  f(b, c)
  // no error
}

interface Foo {
  readonly bar?: number;
}

function performFoo({ bar }: Foo = {}) {
  useBar(bar);
}

declare function useBar(bar: number): void;

performFoo();

function performFoo2({ bar = null }: Foo = {}) {
  useBar2(bar);
}

declare function useBar2(bar: number | undefined): void;

performFoo2();


//// [optionalParameterInDestructuringWithInitializer.js]
// https://github.com/Microsoft/TypeScript/issues/17080
function func1(_a) {
    var _b = _a === void 0 ? { a: 1, b: 2 } : _a, a = _b.a, b = _b.b;
    f(a, b);
    // error
}
function func2(_c) {
    var _d = _c === void 0 ? { a: 1, b: 2 } : _c, a = _d.a, _e = _d.b, b = _e === void 0 ? 3 : _e;
    f(a, b);
    // no error
}
function func3(_f) {
    var _g = _f === void 0 ? { a: 1 } : _f, a = _g.a, b = _g.b;
    f(a, b);
    // error
}
function func4(_h) {
    var _j = _h === void 0 ? { a: { b: 1, c: 2 }, d: 3 } : _h, _k = _j.a, b = _k.b, c = _k.c, d = _j.d;
    f(b, c);
    // error
}
function func5(_l) {
    var _m = _l === void 0 ? { a: { b: 1, c: 2 }, d: 3 } : _l, _o = _m.a, b = _o.b, _p = _o.c, c = _p === void 0 ? 4 : _p, d = _m.d;
    f(b, c);
    // no error
}
function func6(_q) {
    var _r = _q === void 0 ? { a: { b: 1, c: 2 }, d: 3 } : _q, _s = _r.a, _t = _s === void 0 ? { b: 4, c: 5 } : _s, b = _t.b, c = _t.c, d = _r.d;
    f(b, c);
    // error
}
function func7(_u) {
    var _v = _u === void 0 ? { a: { b: 1, c: 2 }, d: 3 } : _u, _w = _v.a, _x = _w === void 0 ? { b: 4, c: 5 } : _w, b = _x.b, _y = _x.c, c = _y === void 0 ? 6 : _y, d = _v.d;
    f(b, c);
    // no error
}
function performFoo(_z) {
    var bar = (_z === void 0 ? {} : _z).bar;
    useBar(bar);
}
performFoo();
function performFoo2(_0) {
    var _1 = (_0 === void 0 ? {} : _0).bar, bar = _1 === void 0 ? null : _1;
    useBar2(bar);
}
performFoo2();
