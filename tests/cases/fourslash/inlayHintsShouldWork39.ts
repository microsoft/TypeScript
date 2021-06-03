/// <reference path="fourslash.ts" />

//// function foo (): number {
////     return 1
//// }

const markers = test.markers();
verify.getInlayHints([], undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
});
