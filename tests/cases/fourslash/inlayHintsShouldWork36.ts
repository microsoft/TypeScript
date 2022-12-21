/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(/*a*/a, /*b*/2);

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'a:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'b:',
        position: markers[1].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "all",
    includeInlayParameterNameHintsWhenArgumentMatchesName: true,
});
