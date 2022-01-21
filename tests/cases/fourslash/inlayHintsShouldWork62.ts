/// <reference path="fourslash.ts" />

////function trace(message: string) {}
////trace(/*a*/`${1}`);
////trace(/*b*/``);

const [a, b] = test.markers();
verify.getInlayHints([
    {
        text: 'message:',
        position: a.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'message:',
        position: b.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
