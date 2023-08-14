/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (a, b) => { }

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
