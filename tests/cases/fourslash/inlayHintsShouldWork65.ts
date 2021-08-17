/// <reference path="fourslash.ts" />

////function foo(
////    a: number,
////    b: number,
////    c: number,
////    d: number,
////    e: number,
////    f: number,
////    g: number,
////    h: number,
////    i: number
////) {}
////
////foo(
////    /*a*/+"",
////    /*b*/+``,
////    /*c*/+{},
////    /*d*/+[],
////    /*e*/+/a/,
////    /*f*/+Infinity,
////    /*g*/+NaN,
////    /*h*/+function() {},
////    /*i*/+(() => {}),
////);

const [a, b, c, d, e, f, g, h, i] = test.markers();
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
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
