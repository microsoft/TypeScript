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
function func2(_a) {
    var _b = _a === void 0 ? { a: 1, b: 2 } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 3 : _c;
    f(a, b);
    // no error
}
function func3(_a) {
    var _b = _a === void 0 ? { a: 1 } : _a, a = _b.a, b = _b.b;
    f(a, b);
    // error
}
function func4(_a) {
    var _b = _a === void 0 ? { a: { b: 1, c: 2 }, d: 3 } : _a, _c = _b.a, b = _c.b, c = _c.c, d = _b.d;
    f(b, c);
    // error
}
function func5(_a) {
    var _b = _a === void 0 ? { a: { b: 1, c: 2 }, d: 3 } : _a, _c = _b.a, b = _c.b, _d = _c.c, c = _d === void 0 ? 4 : _d, d = _b.d;
    f(b, c);
    // no error
}
function func6(_a) {
    var _b = _a === void 0 ? { a: { b: 1, c: 2 }, d: 3 } : _a, _c = _b.a, _d = _c === void 0 ? { b: 4, c: 5 } : _c, b = _d.b, c = _d.c, d = _b.d;
    f(b, c);
    // error
}
function func7(_a) {
    var _b = _a === void 0 ? { a: { b: 1, c: 2 }, d: 3 } : _a, _c = _b.a, _d = _c === void 0 ? { b: 4, c: 5 } : _c, b = _d.b, _e = _d.c, c = _e === void 0 ? 6 : _e, d = _b.d;
    f(b, c);
    // no error
}
function performFoo(_a) {
    var _b = _a === void 0 ? {} : _a, bar = _b.bar;
    useBar(bar);
}
performFoo();
function performFoo2(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.bar, bar = _c === void 0 ? null : _c;
    useBar2(bar);
}
performFoo2();
