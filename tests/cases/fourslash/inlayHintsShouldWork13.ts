/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(a, /*b*/2);

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'b:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "all",
    includeInlayParameterNameHintsWhenArgumentMatchesName: false,
});
