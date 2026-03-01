/// <reference path="fourslash.ts" />

// https://github.com/microsoft/TypeScript/issues/61845

//// declare const STATE_SIGNAL: unique symbol;
////
//// declare function test(
////   cb: (state: { [STATE_SIGNAL]: unknown }) => void,
//// ): unknown;
////
//// test((state) => {});

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true,
    interactiveInlayHints: true,
});
