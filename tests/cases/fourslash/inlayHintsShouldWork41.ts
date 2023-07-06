/// <reference path="fourslash.ts" />

//// const a = () => 1

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
});
