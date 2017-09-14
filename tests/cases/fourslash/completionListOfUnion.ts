/// <reference path='fourslash.ts' />

// @strictNullChecks: true

// Primitives should be skipped, so `| number | null | undefined` should have no effect on completions.
////const x: { a: number, b: number } | { a: string, c: string } | { b: boolean } | number | null | undefined = { /*x*/ };

////interface I { a: number; }
////function f(...args: Array<I | I[]>) {}
////f({ /*f*/ });

goTo.marker("x");
verify.completionListCount(3);
verify.completionListContains("a", "(property) a: string | number");
verify.completionListContains("b", "(property) b: number | boolean");
verify.completionListContains("c", "(property) c: string");

goTo.marker("f");
verify.completionListContains("a", "(property) a: number");
// Also contains array members
