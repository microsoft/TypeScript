/// <reference path="fourslash.ts" />

//// function foo (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void) {}
//// foo(a/*a*/ => {
////     a(d/*b*/ => {})
//// })

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':(c: (d: Exclude<1 | 2 | 3, ...',
        position: markers[0].position,
        whitespaceBefore: true
    },
    {
        text: ':Exclude<1 | 2 | 3, 1>',
        position: markers[1].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterType: true
});
