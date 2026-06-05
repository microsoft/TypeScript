// @strict: true
// @noEmit: true

// Template literal type inference should pull off whole code points (runes)
// rather than splitting surrogate pairs (e.g. emoji) into lone surrogates.
// https://github.com/microsoft/TypeScript/issues/63533

type Heads<S> = S extends `${infer C}${infer R}` ? [C, R] : never;

type A = Heads<"😀abc">;
declare let a: A;
const chk: ["😀", "abc"] = a;

// Multiple surrogate-pair characters in a row
type B = Heads<"😀😁">;
declare let b: B;
const chk2: ["😀", "😁"] = b;

// Surrogate pair followed by a BMP character
type Pair<S> = S extends `${infer C1}${infer C2}` ? [C1, C2] : never;
type C = Pair<"😀x">;
declare let c: C;
const chk3: ["😀", "x"] = c;

// A leading BMP character then a surrogate pair
type D = Pair<"x😀">;
declare let d: D;
const chk4: ["x", "😀"] = d;
