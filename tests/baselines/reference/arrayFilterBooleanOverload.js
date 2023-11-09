//// [tests/cases/compiler/arrayFilterBooleanOverload.ts] ////

//// [arrayFilterBooleanOverload.ts]
const nullableValues = ['a', 'b', null]; // expect (string | null)[]

const values1 = nullableValues.filter(Boolean); // expect string[]

// @ts-expect-error
const values2 = nullableValues.filter(new Boolean);

const arr = [0, 1, "", "foo", null] as const;

const arr2 = arr.filter(Boolean); // expect ("foo" | 1)[]



//// [arrayFilterBooleanOverload.js]
"use strict";
const nullableValues = ['a', 'b', null]; // expect (string | null)[]
const values1 = nullableValues.filter(Boolean); // expect string[]
// @ts-expect-error
const values2 = nullableValues.filter(new Boolean);
const arr = [0, 1, "", "foo", null];
const arr2 = arr.filter(Boolean); // expect ("foo" | 1)[]


//// [arrayFilterBooleanOverload.d.ts]
declare const nullableValues: (string | null)[];
declare const values1: (string | null)[];
declare const values2: (string | null)[];
declare const arr: readonly [0, 1, "", "foo", null];
declare const arr2: ("" | 0 | 1 | "foo" | null)[];
