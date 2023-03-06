/// <reference path="fourslash.ts" />

////function foo(
////    a: string,
////    b: undefined,
////    c: null,
////    d: boolean,
////    e: boolean,
////    f: number,
////    g: number,
////    h: number,
////    i: RegExp,
////    j: bigint,
////) {
////}
////
////foo(
////    /*a*/"hello",
////    /*b*/undefined,
////    /*c*/null,
////    /*d*/true,
////    /*e*/false,
////    /*f*/Infinity,
////    /*g*/-Infinity,
////    /*h*/NaN,
////    /*i*//hello/g,
////    /*j*/123n,
////);

const [a, b, c, d, e, f, g, h, i, j] = test.markers();
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
    },
    {
        text: "e:",
        position: e.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: "f:",
        position: f.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: "g:",
        position: g.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: "h:",
        position: h.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: "i:",
        position: i.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: "j:",
        position: j.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
