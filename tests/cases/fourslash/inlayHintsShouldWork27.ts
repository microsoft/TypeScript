/// <reference path="fourslash.ts" />

//// function foo (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void) {}
//// foo(/*a*/a/*b*//*c*/ => {
////     a(/*d*/d/*e*//*f*/ => {})
//// })

const markers = test.markers();
verify.getInlayHints([
    {
        text: '(',
        position: markers[0].position,
        kind: ts.InlayHintKind.Other
    },
    {
        text: ': (c: (d: 2 | 3) => void) => ...',
        position: markers[1].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ')',
        position: markers[2].position,
        kind: ts.InlayHintKind.Other
    },
    {
        text: '(',
        position: markers[3].position,
        kind: ts.InlayHintKind.Other
    },
    {
        text: ': 2 | 3',
        position: markers[4].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ')',
        position: markers[5].position,
        kind: ts.InlayHintKind.Other
    }
], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
