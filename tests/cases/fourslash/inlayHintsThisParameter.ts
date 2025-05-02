/// <reference path="fourslash.ts" />

////interface I {
////    a: number;
////}
////
////declare function fn(
////    callback: (a: number, b: string) => void
////): void;
////
////
////fn(function (this, a, b) { });
////fn(function (this: I, a, b) { });

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true,
});
