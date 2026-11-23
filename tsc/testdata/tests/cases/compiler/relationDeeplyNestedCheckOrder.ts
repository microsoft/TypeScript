// @strict: true
// @noEmit: true

// Relating 'B<{ a: string }>' to 'B<{ a: "lit" }>' eventually relates 'string'
// to '"lit"' through 'm0.m1.a.m0.m1', but only after measuring the variances
// of 'A', which gives up on deeply nested types. TypeScript reports an error
// for the 'B' assignment only when it is checked before the 'A' assignment;
// the result must not depend on which is checked first.

type A<T> = { m0: (x: B<T>) => void; m1: { [K in keyof T]: B<T[K]> } };
type B<T> = { m0: A<T> };

declare let a1: A<{ a: string }>, a2: A<{ a: "lit" }>;
declare let b1: B<{ a: string }>, b2: B<{ a: "lit" }>;

a2 = a1;
b2 = b1;
