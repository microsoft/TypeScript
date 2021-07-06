/// <reference path="fourslash.ts" />

//// const a/*a*/ = "I'm very very very very very very very very very long";

const markers = test.markers();
verify.getInlayHints([
    {
        text: `: "I'm very very very very ve...`,
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
], undefined, {
    includeInlayVariableTypeHints: true
});
