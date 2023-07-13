/// <reference path="fourslash.ts" />

//// const a = (b) => 1
//// const aa = b => 1

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
});
