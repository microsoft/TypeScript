/// <reference path="fourslash.ts" />

//// class C {
////     foo()/*a*/ {
////         return 1
////     }
//// }

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':number',
        position: markers[0].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlineFunctionLikeReturnTypeHints: true,
});
