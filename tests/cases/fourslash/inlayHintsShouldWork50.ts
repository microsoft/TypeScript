/// <reference path="fourslash.ts" />

//// type T = [a: string, b: boolean, ...c: number[]]
//// declare function foo(f: number, ...args: T):void
//// declare function foo1(f1: number, ...args: string[]): void
//// foo(/*f*/1, /*a*/'', /*b*/false, /*c*/1, 2)
//// foo1(/*f1*/1, /*args*/"", "")

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'f:',
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
    },
    {
        text: '...c:',
        position: markers[3].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: 'f1:',
        position: markers[4].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: '...args:',
        position: markers[5].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
], undefined, {
    includeInlayParameterNameHints: "literals"
});
