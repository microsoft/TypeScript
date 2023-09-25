// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55847

type A<S> = Lowercase<S & string> extends "foo" ? 1 : 0;
let x1: A<"foo"> = 1; // ok

type B<S> = Lowercase<S & string> extends `f${string}` ? 1 : 0;
let x2: B<"foo"> = 1; // ok
