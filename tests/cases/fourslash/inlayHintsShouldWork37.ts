/// <reference path="fourslash.ts" />

//// class C {
////     a/*a*/ = 1
////     b: number = 2
////     c;
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
    includeInlayPropertyDeclarationTypeHints: true,
});
