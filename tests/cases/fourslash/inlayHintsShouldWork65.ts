/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (a, b = 1) => { }

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
