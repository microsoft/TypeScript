/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(a, /*b*/2);
//// declare const v: any;
//// foo(v.a, /*c*/v.a);
//// foo(/*d*/v.b, v.b);
//// foo(/*e*/v.c, /*f*/v.c);

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'b:',
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
    {
        text: 'a:',
        position: markers[2].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'a:',
        position: markers[3].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'b:',
        position: markers[4].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "all",
    includeInlayParameterNameHintsWhenArgumentMatchesName: false,
});
