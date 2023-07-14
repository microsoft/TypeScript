/// <reference path="fourslash.ts" />

//// function foo (cb: (a: Exclude<1 | 2 | 3, 1>) => void) {}
//// foo((a) => { })

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
