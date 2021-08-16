/// <reference path="fourslash.ts" />

//// function foo (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void) {}
//// foo(/*a*//*b*/a/*c*/ => {
////     a(/*d*//*e*/d/*f*/ => {})
//// })

const markers = test.markers();
verify.getInlayHints([
    {
        text: 'a:',
        position: markers[0].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: '(',
        position: markers[1].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': (c: (d: 2 | 3) => void) => ...)',
        position: markers[2].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: 'c:',
        position: markers[3].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: '(',
        position: markers[4].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ': 2 | 3)',
        position: markers[5].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayParameterNameHints: "literals",
    includeInlayFunctionParameterTypeHints: true
});
