// @strictNullChecks: true
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
