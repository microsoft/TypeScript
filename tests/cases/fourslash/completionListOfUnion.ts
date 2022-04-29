/// <reference path='fourslash.ts' />

// @strictNullChecks: true

// Primitives should be skipped, so `| number | null | undefined` should have no effect on completions.
////const x: { a: number, b: number } | { a: string, c: string } | { b: boolean } | number | null | undefined = { /*x*/ };

////interface I { a: number; }
////function f(...args: Array<I | I[]>) {}
////f({ /*f*/ });

verify.completions(
    {
        marker: "x",
        exact: [
            { name: "a", text: "(property) a: string | number" },
            { name: "b", text: "(property) b: number | boolean" },
            { name: "c", text: "(property) c: string"} ,
        ],
    },
    { marker: "f", includes: [{ name: "a", text: "(property) I.a: number" }] }, // Also contains array members
);
