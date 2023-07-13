/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(a, 2);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
    includeInlayParameterNameHintsWhenArgumentMatchesName: false,
});
