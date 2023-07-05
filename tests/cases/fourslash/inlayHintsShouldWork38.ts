/// <reference path="fourslash.ts" />

//// function foo () {
////     return 1
//// }

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
});
