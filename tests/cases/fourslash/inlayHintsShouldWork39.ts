/// <reference path="fourslash.ts" />

//// function foo (): number {
////     return 1
//// }

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
});
