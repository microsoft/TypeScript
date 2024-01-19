// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55847

type A<S> = Lowercase<S & string> extends "foo" ? 1 : 0;
let x1: A<"foo"> = 1; // ok

type B<S> = Lowercase<S & string> extends `f${string}` ? 1 : 0;
let x2: B<"foo"> = 1; // ok

type C<S> = Capitalize<Lowercase<S & string>> extends "Foo" ? 1 : 0;
let x3: C<"foo"> = 1; // ok

type D<S extends string> = Capitalize<Lowercase<S>> extends "Foo" ? 1 : 0;
let x4: D<"foo"> = 1; // ok

type E<S> = Lowercase<`f${S & string}` & `${S & string}f`>;
type F = E<""> extends "f" ? 1 : 0; // 1
type G<S> = E<S> extends "f" ? 1 : 0; 
let x5: G<""> = 1; // ok
