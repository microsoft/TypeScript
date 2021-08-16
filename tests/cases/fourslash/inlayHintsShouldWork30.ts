/// <reference path="fourslash.ts" />

//// function f<T>(v: T, a: (v: T) => void) {}
//// f(1, /*a*/a/*b*//*c*/ => { })

const markers = test.markers();
verify.getInlayHints([
    {
        text: '(',
        position: markers[0].position,
        kind: ts.InlayHintKind.Other
    },
    {
        text: ': number',
        position: markers[1].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ')',
        position: markers[2].position,
        kind: ts.InlayHintKind.Other
    }
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
