/// <reference path="fourslash.ts" />

////interface Thing {}
////let x: Thing = {};
////let y = x;
////function f(callback: (thing: Thing) => void) {}
////f(p => {})

verify.baselineInlayHints(undefined, {
    interactiveInlayHints: true,
    includeInlayVariableTypeHints: true,
    includeInlayFunctionParameterTypeHints: true
})