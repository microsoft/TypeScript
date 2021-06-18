/// <reference path="fourslash.ts" />

//// const a = (b)/*a*/ => 1
//// const aa = b => 1

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
