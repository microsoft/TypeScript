/// <reference path="fourslash.ts" />

//// function foo (a: number, ...b: number[]) {}
//// foo(1, 1, 1, 1);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true,
});
