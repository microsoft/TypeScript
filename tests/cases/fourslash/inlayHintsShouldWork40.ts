/// <reference path="fourslash.ts" />

//// class C {
////     foo() {
////         return 1
////     }
//// }

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
});
