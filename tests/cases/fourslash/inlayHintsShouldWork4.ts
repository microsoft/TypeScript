/// <reference path="fourslash.ts" />

//// declare function foo(w: number): void
//// declare function foo(a: number, b: number): void;
//// declare function foo(a: number | undefined, b: number | undefined): void;

//// foo(1)
//// foo(1, 2)

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
