/// <reference path="fourslash.ts" />

//// function foo (cb: (a: Exclude<1 | 2 | 3, 1>) => void) {}
//// foo((a/*a*/) => { })

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': 2 | 3',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
