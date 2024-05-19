/// <reference path="fourslash.ts" />

////const a1: "'" = "'";
////const b1: "\\" = "\\";
////export function fn(a = a1, b = b1) {}

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true,
    interactiveInlayHints: true,
    quotePreference: "single"
});
