/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (a/*a*/, b: number) => { }

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
