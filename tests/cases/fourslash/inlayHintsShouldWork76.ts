/// <reference path="fourslash.ts" />

////function foo({ a, b }: { a: unknown, b: unknown }, c: unknown, d: unknown) { }
////function bar(...x: [{ a: unknown, b: unknown }, number]) {
////    foo(...x, /*d*/1);
////}

const [d] = test.markers();

verify.getInlayHints([
    {
        text: 'd:',
        position: d.position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "all"
});
