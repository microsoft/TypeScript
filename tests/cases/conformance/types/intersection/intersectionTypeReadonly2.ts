// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61344

type A = { k: number };
type B = { readonly k: number };

(({}) as A & B).k = 0; // ok
(({}) as B & A).k = 0; // ok

type MakeWritable<T> = { -readonly [K in keyof T]: T[K] };

type C = MakeWritable<B>;
(({}) as C).k = 0; // ok
(({}) as C & B).k = 0; // ok
(({}) as B & C).k = 0; // ok
