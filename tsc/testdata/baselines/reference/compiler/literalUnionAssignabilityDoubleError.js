//// [tests/cases/compiler/literalUnionAssignabilityDoubleError.ts] ////

//// [literalUnionAssignabilityDoubleError.ts]
declare const x: "a" | "b";
const y: number = x;

function foo(param: number) {}
foo(x);

function bar(): number {
    return x;
}

declare const nums: 1 | 2;
const s: string = nums;

declare const bigints: 0n | 1n;
const sym: symbol = bigints;


//// [literalUnionAssignabilityDoubleError.js]
"use strict";
const y = x;
function foo(param) { }
foo(x);
function bar() {
    return x;
}
const s = nums;
const sym = bigints;
