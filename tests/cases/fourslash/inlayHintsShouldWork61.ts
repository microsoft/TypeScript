/// <reference path="fourslash.ts" />

////class Foo {
////    set foo(value: number) {}
////}

verify.baselineInlayHints(undefined, {
    includeInlayFunctionLikeReturnTypeHints: true
});
