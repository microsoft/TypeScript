/// <reference path="fourslash.ts" />

////const foo: 1n = 1n;
////export function fn(b = foo) {}

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true,
    interactiveInlayHints: true
});
