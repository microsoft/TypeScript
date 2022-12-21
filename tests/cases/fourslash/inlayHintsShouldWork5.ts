/// <reference path="fourslash.ts" />

//// type Args = [a: number, b: number]
//// declare function foo(c: number, ...args: Args);
//// foo(/*a*/1, /*b*/2, /*c*/3)

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'c:',
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
    {
        text: 'b:',
        position: markers[2].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
