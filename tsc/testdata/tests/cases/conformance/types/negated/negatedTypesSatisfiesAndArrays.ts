// @strict: true
// @noEmit: true

// Negated types with the `satisfies` operator and with array/tuple element types.

// satisfies against a negated type.
declare const n: number;
const s1 = n satisfies not string; // should be ok (number is not a string)

declare const str: string;
const s2 = str satisfies not string; // should error (string is a string)

const s3 = 42 satisfies not "reserved"; // ok
const s4 = "reserved" satisfies not "reserved"; // should error

// Array of a negated element type.
type NotStringArray = (not string)[];
declare let arr: NotStringArray;
arr = [1, 2, 3];       // ok
arr = [{}, true, 0];   // ok: a fresh `{}` literal is treated as a closed empty object, disjoint from `string`
arr = ["a"];           // should error (element is a string)
arr = [1, "a"];        // should error (one element is a string)

// Tuple with a negated element type.
type Pair = [not string, string];
declare let pair: Pair;
pair = [1, "ok"];      // ok
pair = ["no", "ok"];   // should error (first element is a string)

// Readonly array of negated element type, element access.
declare const ra: readonly (not number)[];
const elem = ra[0]; // element type probe

// Spread / iteration of a negated element array.
function sum(...args: (not string)[]) {}
sum(1, 2, {}); // ok: a fresh `{}` literal is treated as a closed empty object, disjoint from `string`
sum(1, "x");   // should error
