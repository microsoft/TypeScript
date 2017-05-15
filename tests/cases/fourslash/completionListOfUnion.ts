/// <reference path='fourslash.ts' />

// @strictNullChecks: true

// Non-objects should be skipped, so `| number | null` should have no effect on completions.
////const x: { a: number, b: number } | { a: string, c: string } | { b: boolean } | number | null = { /*x*/ };

////interface I { a: number; }
////function f(...args: Array<I | I[]>) {}
////f({ /*f*/ });

goTo.marker("x");
verify.completionListContains("a", "(property) a: string | number");
verify.completionListContains("b", "(property) b: number | boolean");
verify.completionListContains("c", "(property) c: string");

goTo.marker("f");
verify.completionListContains("a", "(property) a: number");
