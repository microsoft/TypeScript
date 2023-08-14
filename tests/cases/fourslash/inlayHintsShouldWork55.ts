/// <reference path="fourslash.ts" />

////class Foo {
////    get foo() { return 1; }
////}

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true
});
