/// <reference path="fourslash.ts" />

//// function foo (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void)/*a*/ {}
//// foo(/*b*//*c*/a/*d*//*e*//*f*/ => {
////     a(/*g*//*h*/d/*i*//*j*//*k*/ => {})
//// })

const markers = test.markers();
verify.getInlayHints([
    {
        text: ': void',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: 'a:',
        position: markers[1].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: '(',
        position: markers[2].position,
        kind: ts.InlayHintKind.Other
    },
    {
        text: ': (c: (d: 2 | 3) => void) => ...',
        position: markers[3].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ')',
        position: markers[4].position,
        kind: ts.InlayHintKind.Other
    },
    {
        text: ': void',
        position: markers[5].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: 'c:',
        position: markers[6].position,
        kind: ts.InlayHintKind.Parameter,
        whitespaceAfter: true
    },
    {
        text: '(',
        position: markers[7].position,
        kind: ts.InlayHintKind.Other
    },
    {
        text: ': 2 | 3',
        position: markers[8].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ')',
        position: markers[9].position,
        kind: ts.InlayHintKind.Other
    },
    {
        text: ': void',
        position: markers[10].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayFunctionLikeReturnTypeHints: true,
    includeInlayParameterNameHints: "literals",
    includeInlayFunctionParameterTypeHints: true
});
