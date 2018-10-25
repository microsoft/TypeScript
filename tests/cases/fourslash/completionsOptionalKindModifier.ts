/// <reference path="fourslash.ts" />

////interface A { a?: number; method?(): number; };
////function f(x: A) {
////x./*a*/;
////}

verify.completions({
    marker: "a",
    exact: [
        { name: "a", kind: "property", kindModifiers: "optional" },
        { name: "method", kind: "method", kindModifiers: "optional" },
    ],
});
