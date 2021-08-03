/// <reference path="fourslash.ts" />

////class Foo {
////    get foo()/**/ { return 1; }
////}

const [marker] = test.markers();

verify.getInlayHints([
    {
        text: ': number',
        position: marker.position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayFunctionLikeReturnTypeHints: true
});
