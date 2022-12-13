//// [arrayContextualTyping.ts]
// Setup
declare class MyCustomArray extends Array<number> {
    isCustom: true;
}

// MVP: An empty array contextually typed by an array type gets that array's type
const m1 = [] satisfies number[];
m1.push(0); // Should be OK
m1.push(""); // Should error

// Works in object fields?
const m2 = { a: [] satisfies string[] };
m2.a.push(""); // Should be OK
m2.a.push(0); // Should error

// If the contextual type is a union, keep the array-supertyping parts of the union
const m3 = [] satisfies number[] | ArrayLike<string>;
const m3t: number[] | string[] = m3;

// Keep only the array parts
const m4 = [] satisfies MyCustomArray | string[];
const m4t: string[] = m4;

// Should OK
const m5: string[] | number[] = [] satisfies string[] | number[];
// Should OK
type Obj = { a: string[] } | { a: number[] };
const m6: Obj = { a: [] } satisfies Obj;

// Should all OK
type DiscrObj = { a: string[], kind: "strings" } | { a: number[], kind: "numbers" };
const m7: DiscrObj = { a: [], kind: "numbers"};
const m8: DiscrObj = { a: [], kind: "numbers"} satisfies DiscrObj;
const m9: DiscrObj = { a: [], kind: "strings"} satisfies DiscrObj;


//// [arrayContextualTyping.js]
"use strict";
// MVP: An empty array contextually typed by an array type gets that array's type
var m1 = [];
m1.push(0); // Should be OK
m1.push(""); // Should error
// Works in object fields?
var m2 = { a: [] };
m2.a.push(""); // Should be OK
m2.a.push(0); // Should error
// If the contextual type is a union, keep the array-supertyping parts of the union
var m3 = [];
var m3t = m3;
// Keep only the array parts
var m4 = [];
var m4t = m4;
// Should OK
var m5 = [];
var m6 = { a: [] };
var m7 = { a: [], kind: "numbers" };
var m8 = { a: [], kind: "numbers" };
var m9 = { a: [], kind: "strings" };
