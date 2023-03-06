/// <reference path="fourslash.ts" />

//// function foo (cb: (a: string) => void) {}
//// foo((a/*a*/) => { })

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': string',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
