/// <reference path="fourslash.ts" />

////function foo(a: number, b: number, c: number, d: number) {}
////foo(/*a*/1, /*b*/+1, /*c*/-1, /*d*/+"1");

const [a, b, c, d] = test.markers();
verify.getInlayHints([
    {
        text: "a:",
        position: a.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: "b:",
        position: b.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: "c:",
        position: c.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: "d:",
        position: d.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
