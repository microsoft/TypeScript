/// <reference path="fourslash.ts" />

//// function foo(a: number) {
////     return (b: number) => {
////         return a + b
////     }
//// }
//// foo(/*a*/1)(/*b*/2);

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'a:',
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
], undefined, {
    includeInlayParameterNameHints: "literals"
});
