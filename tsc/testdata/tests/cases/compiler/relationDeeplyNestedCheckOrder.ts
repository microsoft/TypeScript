// @strict: true
// @noEmit: true

// Relating 'B<{ a: string }>' to 'B<{ a: "lit" }>' eventually relates 'string'
// to '"lit"' through 'm0.m1.a.m0.m1'. Relating the 'A' instantiations first
// reaches the same comparison only after giving up on deeply nested types,
// which must not make relating the 'B' instantiations succeed afterwards.

type A<T> = { m0: (x: B<T>) => void; m1: { [K in keyof T]: B<T[K]> } };
type B<T> = { m0: A<T> };

declare let a1: A<{ a: string }>, a2: A<{ a: "lit" }>;
declare let b1: B<{ a: string }>, b2: B<{ a: "lit" }>;

a2 = a1;
b2 = b1; // Error
