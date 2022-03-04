/// <reference path="fourslash.ts" />

//// interface Call {
////     (a: number): void
////     (b: number, c: number): void
//// }
//// declare const call: Call;
//// call(/*a*/1);
//// call(/*b*/1, /*c*/2);

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
    {
        text: 'c:',
        position: markers[2].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
