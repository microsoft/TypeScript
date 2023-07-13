/// <reference path="fourslash.ts" />

//// const a = function () { return 1}

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
});
