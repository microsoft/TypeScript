/// <reference path="fourslash.ts" />

////function foo(a: number, b: number, c: number, d: number) {}
////foo(1, +1, -1, +"1");

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
