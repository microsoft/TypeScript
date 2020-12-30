/// <reference path="fourslash.ts" />

//// function foo (): number {
////     return 1
//// }

const markers = test.markers();
verify.getInlineHints([], undefined, {
    includeInlineFunctionLikeReturnTypeHints: true,
});
