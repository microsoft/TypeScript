/// <reference path="fourslash.ts" />

//// class Class {}
//// const a/*a*/ = new Class();

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': Class',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayVariableTypeHints: true
});
