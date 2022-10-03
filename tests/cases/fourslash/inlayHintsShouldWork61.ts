/// <reference path="fourslash.ts" />

////class Foo {
////    set foo(value: number)/**/ {}
////}

verify.getInlayHints([], undefined, {
    includeInlayFunctionLikeReturnTypeHints: true
});
