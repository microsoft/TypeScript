/// <reference path="fourslash.ts" />

//// function foo (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void) {}
//// foo(/*a*/a/*b*/ => {
////     a(/*c*/d/*d*/ => {})
//// })

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'a:',
        position: markers[0].position,
        whitespaceAfter: true
    },
    {
        text: ':(c: (d: 2 | 3) => void) => ...',
        position: markers[1].position,
        whitespaceBefore: true
    },
    {
        text: 'c:',
        position: markers[2].position,
        whitespaceAfter: true
    },
    {
        text: ':2 | 3',
        position: markers[3].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineParameterName: true,
    includeInlineFunctionParameterType: true
});
