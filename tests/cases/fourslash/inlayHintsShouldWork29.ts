/// <reference path="fourslash.ts" />

//// function foo (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void) {}
//// foo(a => {
////     a(d => {})
//// })

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
    includeInlayFunctionParameterTypeHints: true
});
