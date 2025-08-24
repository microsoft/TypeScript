//// [tests/cases/conformance/intl/collatorCompareBoundFunction.ts] ////

//// [collatorCompareBoundFunction.ts]
const collator = new Intl.Collator();

// Should be usable as a function with no dynamic `this`
const cmp: (a: string, b: string) => number = collator.compare;

// Function expecting a `this: void` bound compare function
function useCompare(fn: (this: void, a: string, b: string) => number): number {
    return fn("a", "b");
}

useCompare(collator.compare);

// Should work with Array.prototype.sort
const sorted = ["z", "ä", "a"].sort(collator.compare);


//// [collatorCompareBoundFunction.js]
"use strict";
const collator = new Intl.Collator();
// Should be usable as a function with no dynamic `this`
const cmp = collator.compare;
// Function expecting a `this: void` bound compare function
function useCompare(fn) {
    return fn("a", "b");
}
useCompare(collator.compare);
// Should work with Array.prototype.sort
const sorted = ["z", "ä", "a"].sort(collator.compare);
