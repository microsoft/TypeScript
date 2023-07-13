/// <reference path="fourslash.ts" />

//// function f<T>(v: T, a: (v: T) => void) {}
//// f(1, a => { })

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
