/// <reference path="fourslash.ts" />

//// type F = (a: {
////     a: number
////     b: string
//// }) => void
//// const f: F = (a) => { }

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
