/// <reference path="fourslash.ts" />

//// type F = (a: {
////     a: number
////     b: string
//// }) => void
//// const f: F = (a/*a*/) => { }

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': { a: number; b: string; }',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
