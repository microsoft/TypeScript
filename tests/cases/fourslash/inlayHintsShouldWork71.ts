/// <reference path="fourslash.ts" />

////function foo(a: unknown, b: unknown, c: unknown, d: unknown) { }
////function bar(...x: [number, number, number]) {
////    foo(/*a*/...x, /*d*/3);
////}

const [a, d] = test.markers();

verify.getInlayHints([
    {
        text: 'a:',
        position: a.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'd:',
        position: d.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "all"
});
