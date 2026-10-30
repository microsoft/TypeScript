// @strict: true
// @noEmit: true

// Foo and Bar are both invariant: Foo<T> through x and the contravariant
// use of Foo<T> in Bar, and Bar<U> through f and the invariant Foo<Bar<U>>.
// Their variances should not depend on which is measured first.

// @filename: fooFirst.ts
export {};

interface Foo<T> { x: T; b: Bar<Foo<T>> }
interface Bar<U> { f: (u: U) => void; foo: Foo<Bar<U>> }

declare let fs: Foo<string>, fl: Foo<"lit">;
declare let bs: Bar<string>, bl: Bar<"lit">;
fl = fs; // Error
fs = fl; // Error
bl = bs; // Error
bs = bl; // Error

// @filename: barFirst.ts
export {};

interface Foo<T> { x: T; b: Bar<Foo<T>> }
interface Bar<U> { f: (u: U) => void; foo: Foo<Bar<U>> }

declare let fs: Foo<string>, fl: Foo<"lit">;
declare let bs: Bar<string>, bl: Bar<"lit">;
bl = bs; // Error
bs = bl; // Error
fl = fs; // Error
fs = fl; // Error
