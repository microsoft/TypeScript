/// <reference path="fourslash.ts" />

//// type Args = [number, number]
//// declare function foo(c: number, ...args: Args);
//// foo(/*a*/1, 2, 3)

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'c:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals"
});
