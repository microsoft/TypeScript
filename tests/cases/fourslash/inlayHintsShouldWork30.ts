/// <reference path="fourslash.ts" />

//// function f<T>(v: T, a: (v: T) => void) {}
//// f(1, a/*a*/ => { })

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': number',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
