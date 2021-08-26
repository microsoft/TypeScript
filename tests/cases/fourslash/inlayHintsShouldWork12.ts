/// <reference path="fourslash.ts" />

//// function foo(a: (b: number) => number) {
////     return a(/*a*/1) + 2
//// }

//// foo(/*b*/(c: number) => c + 1);

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'b:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'a:',
        position: markers[1].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "all"
});
