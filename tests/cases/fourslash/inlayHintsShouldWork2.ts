/// <reference path="fourslash.ts" />

//// function foo (a: number, { c }: any) {}
//// foo(/*a*/1, { c: 1});

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'a:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
