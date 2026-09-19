// @strict: true
// @noEmit: true

// Demonstrates why inference through the `not` operator must be contravariant.
//
// `T` appears only in `not T` positions and receives one candidate from each argument:
// `{ a: number }` and `{ a: number; b: number }`. Note the second is a *subtype* of the
// first.
//
// For the call to be well-typed, both `Box<not A>` and `Box<not B>` must be assignable to
// `Box<not T>`. Since `not` reverses subtyping, `not A <: not T` requires `T <: A`, and
// likewise `T <: B`. So `T` must be a common *subtype* of the two operands, i.e. the more
// specific `{ a: number; b: number }`. Contravariant inference produces exactly this by
// combining candidates with `getCommonSubtype`.
//
// Covariant inference would instead combine them with `getCommonSupertype`, yielding the
// wider `{ a: number }`. That `T` is not assignable back into the `Box<not { a; b }>`
// parameter (it would require `{ a } <: { a; b }`, which is false), so the call would fail
// and `r.b` would be inaccessible.

interface Box<T> { value: T; }

declare function combine<T>(x: Box<not T>, y: Box<not T>): T;

declare const boxNotA: Box<not { a: number }>;
declare const boxNotAB: Box<not { a: number; b: number }>;

// Contravariant inference: T = { a: number; b: number } (the common subtype).
const r = combine(boxNotA, boxNotAB);

r.a; // ok
r.b; // ok only because contravariant inference chose the subtype; covariant would pick { a } and error here

// The same effect with plain (non-wrapped) negated parameters.
declare function combineBare<T>(x: not T, y: not T): T;
declare const notA: not { a: number };
declare const notAB: not { a: number; b: number };

const r2 = combineBare(notA, notAB); // T = { a: number; b: number }

r2.a; // ok
r2.b; // ok only with contravariant inference
