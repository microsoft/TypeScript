//// [tests/cases/conformance/types/negated/negatedFreshTreatedAsClosedSet.ts] ////

//// [negatedFreshTreatedAsClosedSet.ts]
// from https://github.com/Microsoft/TypeScript/issues/4183
type Distinct<A, B> = (A | B) & not (A & B);
declare var o1: {x: any};
declare var o2: {y: any};

declare function f1(x: Distinct<typeof o1, typeof o2>): void;

f1({x: 0}); // OK
f1({y: 0}); // OK
f1({x: 0, y: 0}); // Should error

type A = { kind: "a" };
type B = { kind: "b" };
declare const ab: "a" | "b";

const aOrB: A | B = { kind: ab }; // OK
const notAOrB: not (A | B) = { kind: ab }; // Should error

type KindNotAOrB = { kind: not ("a" | "b") };
type KindNotAAndNotB = { kind: not "a" } & { kind: not "b" };
declare let kindNotAOrB: KindNotAOrB;
declare let kindNotAAndNotB: KindNotAAndNotB;

kindNotAOrB = kindNotAAndNotB; // OK
kindNotAAndNotB = kindNotAOrB; // OK

declare const stringOrNumber: string | number;

const notNumberProperty: not { value: number } = { value: "x" }; // OK
const overlappingNumberProperty: not { value: number } = { value: stringOrNumber }; // Should error

type NumberIndex = { [key: string]: number };

const notNumberIndex: not NumberIndex = { value: "x" }; // OK
const overlappingNumberIndex: not NumberIndex = { value: stringOrNumber }; // Should error

declare const dynamicKey: string;

const notComputedNumberProperty: not { value: number } = { [dynamicKey]: "x" }; // OK
const overlappingComputedNumberProperty: not { value: number } = { [dynamicKey]: stringOrNumber }; // Should error

interface RecursiveA {
	next: RecursiveA;
	kind: "a";
}
interface RecursiveB {
	next: RecursiveB;
	kind: "b";
}
interface RecursiveAB {
	next: RecursiveAB;
	kind: "a" | "b";
}
declare const recursiveAB: RecursiveAB;

const notRecursiveAOrB: not (RecursiveA | RecursiveB) = { ...recursiveAB }; // Should error


//// [negatedFreshTreatedAsClosedSet.js]
"use strict";
f1({ x: 0 }); // OK
f1({ y: 0 }); // OK
f1({ x: 0, y: 0 }); // Should error
const aOrB = { kind: ab }; // OK
const notAOrB = { kind: ab }; // Should error
kindNotAOrB = kindNotAAndNotB; // OK
kindNotAAndNotB = kindNotAOrB; // OK
const notNumberProperty = { value: "x" }; // OK
const overlappingNumberProperty = { value: stringOrNumber }; // Should error
const notNumberIndex = { value: "x" }; // OK
const overlappingNumberIndex = { value: stringOrNumber }; // Should error
const notComputedNumberProperty = { [dynamicKey]: "x" }; // OK
const overlappingComputedNumberProperty = { [dynamicKey]: stringOrNumber }; // Should error
const notRecursiveAOrB = { ...recursiveAB }; // Should error
