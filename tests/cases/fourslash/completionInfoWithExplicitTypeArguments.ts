/// <reference path='fourslash.ts'/>

// Note: Giving the functions two parameters means that the checker cannot resolve their signatures normally,
// so it makes a best guess.

////interface I { x: number; y: number; }
////
////declare function f<T>(x: T, y: number): void;
////f<I>({ /*f*/ });
////
////declare function g<T>(x: keyof T, y: number): void;
////g<I>("[|/*g*/|]");

verify.completions({ marker: "f", exact: [
    { name: "x" },
    { name: "y" },
] });

verify.completions({ marker: "g", exact: [
    { name: "x", replacementSpan: test.ranges()[0] },
    { name: "y", replacementSpan: test.ranges()[0] },
] });