/// <reference path="fourslash.ts" />

//// function foo (cb: (a: string) => void) {}
//// foo((a) => { })

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
