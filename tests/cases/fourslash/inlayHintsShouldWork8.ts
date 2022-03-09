/// <reference path="fourslash.ts" />

//// class Class {
////     constructor(a: number);
////     constructor(b: number, c: number);
////     constructor(b: number, c?: number) { }
//// }
//// new Class(/*a*/1)
//// new Class(/*b*/1, /*c*/2)

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
