/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (a/*a*/, b = 1) => { }

const [a] = test.markers();
verify.getInlayHints([
    {
        text: ': string',
        position: a.position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
