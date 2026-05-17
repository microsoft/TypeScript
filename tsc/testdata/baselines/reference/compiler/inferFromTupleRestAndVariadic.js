//// [tests/cases/compiler/inferFromTupleRestAndVariadic.ts] ////

//// [inferFromTupleRestAndVariadic.ts]
// Crash when inferring from tuple types with rest and variadic elements
// where the variadic element's constraint consumes all source tuple elements.
// The pattern [...rest, ...T] where T is constrained by a fixed-size tuple
// calls getElementTypeOfSliceOfTupleType which can return nil when the
// source tuple is entirely consumed by T's implied arity.

type SubTup<T> = T extends [
    ...(infer C)[],
    ...infer B extends [any, any]
] ? B : never;
type Trigger = SubTup<[1, 2]>;

// Also test the [...T, ...rest] pattern
type SubTup2<T> = T extends [
    ...infer A extends [any, any],
    ...(infer D)[],
] ? A : never;
type Trigger2 = SubTup2<[1, 2]>;

// Test with more elements than implied arity (should work fine)
type Trigger3 = SubTup<[1, 2, 3, 4]>;
type Trigger4 = SubTup2<[1, 2, 3, 4]>;


//// [inferFromTupleRestAndVariadic.js]
"use strict";
// Crash when inferring from tuple types with rest and variadic elements
// where the variadic element's constraint consumes all source tuple elements.
// The pattern [...rest, ...T] where T is constrained by a fixed-size tuple
// calls getElementTypeOfSliceOfTupleType which can return nil when the
// source tuple is entirely consumed by T's implied arity.
