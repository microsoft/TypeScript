/// <reference path="fourslash.ts" />

////interface A { a?: number; method?(): number; };
////function f(x: A) {
////x./*a*/;
////}

verify.completions({
    marker: "a",
    exact: [
        { name: "a", kindModifiers: "optional" },
        { name: "method", kindModifiers: "optional" },
    ],
});
