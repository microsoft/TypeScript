// @target: es2015
// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63019

type ReadA = <R>() => [false, R] | [true, R | undefined];
type ReadB = <R>() => [false, R] | [true, R | undefined];
const test = (_: ReadA): ReadB => _;

type ReadObjA = <R>() => { done: false; value: R } | { done: true; value: R | undefined };
type ReadObjB = <R>() => { done: false; value: R } | { done: true; value: R | undefined };
const testObj = (_: ReadObjA): ReadObjB => _;

// Constituents are matched by their discriminants when inferring to a union.

declare function pairs<T, U>(x: [false, T] | [true, U]): [T, U];
declare const tuples: [false, string] | [true, number];
const fromTuples = pairs(tuples); // [string, number]

declare function objects<T, U>(x: { kind: "a"; value: T } | { kind: "b"; value: U }): [T, U];
declare const objs: { kind: "a"; value: string } | { kind: "b"; value: number };
const fromObjects = objects(objs); // [string, number]

declare function enums<T, U>(x: { kind: E.A; value: T } | { kind: E.B; value: U }): [T, U];
declare const enumObjs: { kind: E.A; value: string } | { kind: E.B; value: number };
const fromEnums = enums(enumObjs); // [string, number]
enum E { A, B }

// Constituents with conflicting discriminants are not matched, even when another discriminant agrees.

declare function multi<T, U>(x: { a: 1; b: 1; value: T } | { a: 1; b: 2; value: U }): [T, U];
declare const multiObjs: { a: 1; b: 1; value: string } | { a: 1; b: 2; value: number };
const fromMulti = multi(multiObjs); // [string, number]

// Optional tuple elements and non-unit types are not discriminants, so inference is unchanged.

declare function optional<T, U>(x: [false?, T?] | [true?, U?]): [T, U];
declare const optionals: [false?, string?] | [true?, number?];
const fromOptionals = optional(optionals);

declare function nonUnit<T, U>(x: [string, T] | [number, U]): [T, U];
declare const nonUnits: [string, boolean] | [number, bigint];
const fromNonUnits = nonUnit(nonUnits);
