/// <reference path="fourslash.ts" />

//// function foo ()/*a*/ {
////     return 1
//// }

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': number',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
});
