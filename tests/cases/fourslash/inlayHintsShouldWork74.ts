/// <reference path="fourslash.ts" />

////function foo(a: unknown, b: unknown, c: unknown) { }
////function bar(...x: [number, number | undefined]) {
////    foo(/*a*/...x, /*c*/3);
////}

const [a, b] = test.markers();

verify.getInlayHints([
    {
        text: 'a:',
        position: a.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'c:',
        position: b.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "all"
});
