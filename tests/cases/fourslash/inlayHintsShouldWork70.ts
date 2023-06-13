/// <reference path="fourslash.ts" />

////function foo(a: unknown, b: unknown, c: unknown) { }
////function bar(...x: [number, number]) {
////    foo(/*a*/...x, /*c*/3);
////}

const [a, c] = test.markers();

verify.getInlayHints([
    {
        text: 'a:',
        position: a.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'c:',
        position: c.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "all"
});
