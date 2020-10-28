// @strict: true

// The type below should be invariant in T but is measured as covariant because
// we don't analyze recursive references.

interface Foo1<T> {
  x: T;
  y: Foo1<(arg: T) => void>;
}

declare const f10: Foo1<string>;
const f11: Foo1<'a'> = f10;
const f12: Foo1<unknown> = f10;

// The type below is invariant in T and is measured as such.

interface Foo2<T> {
  x: T;
  y: { x: (arg: T) => void, y: Foo2<(arg: T) => void>; }
}

declare const f20: Foo2<string>;
const f21: Foo2<'a'> = f20;
const f22: Foo2<unknown> = f20;

// The type below should be invariant in T but is measured as covariant because
// we don't analyze recursive references.

type Foo3<T> = {
  x: T;
  y: Foo3<(arg: T) => void>;
}

declare const f30: Foo3<string>;
const f31: Foo3<'a'> = f30;
const f32: Foo3<unknown> = f30;

// The type below is invariant in T and is measured as such.

type Foo4<T> = {
  x: T;
  y: { x: (arg: T) => void, y: Foo4<(arg: T) => void>; }
}

declare const f40: Foo4<string>;
const f41: Foo4<'a'> = f40;
const f42: Foo4<unknown> = f40;

// Repro from #3580

interface Fn<A, B> {
  (a: A): B;
  then<C>(next: Fn<B, C>): Fn<A, C>;
}

declare const fn: Fn<string, number>;

// Contravariant in A
const fn1: Fn<unknown, number> = fn;  // Error
const fn2: Fn<'a', number> = fn;

// Covariant in B
const fn3: Fn<string, unknown> = fn;
const fn4: Fn<string, 0> = fn;  // Error

// Repro from #39947

interface I<Dummy, V> {
  c: C<Dummy, V>;
}

class C<Dummy, V> {
  declare sub: I<Dummy, V>;
  declare covariance: V;
}

const c1: C<unknown, string> = new C<unknown, number>();  // Error
