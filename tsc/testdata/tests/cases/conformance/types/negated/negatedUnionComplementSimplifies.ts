// @strict: true
// @noEmit: true

// The union converse of the intersection complement simplification: a type unioned with its
// complement covers every value, so `T | not T` reduces to `unknown`.

// Basic law of excluded middle.
type A = string | not string;
declare const a: A;
a; // unknown

// A literal unioned with the negation of its base is also unknown, because the base covers the literal.
type B = string | not "w";
declare const b: B;
b; // unknown

// An object type and its complement.
interface Point {
    x: number;
    y: number;
}
type C = Point | not Point;
declare const c: C;
c; // unknown

// Type parameter form.
function f<T>(x: T | not T) {
    x; // unknown
}

// Not saturated: `"w" | not string` is NOT unknown, because `string` is not a subtype of `"w"`.
type D = "w" | not string;
declare const d: D;
d; // "w" | not string

// Extra non-negated members still saturate when their union covers the negated base.
type E = "w" | string | not string;
declare const e: E;
e; // unknown
