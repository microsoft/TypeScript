/// <reference path="fourslash.ts" />

//// const a/*a*/ = 123;

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': 123',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayVariableTypeHints: true
});
