/// <reference path="fourslash.ts" />

//// function foo (a: (b: (c: (d: Exclude<1 | 2 | 3, 1>) => void) => void) => void) {}
//// foo(/*a*/a/*b*/ => {
////     a(/*c*/d/*d*/ => {})
//// })

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'a',
        rangeOrPosition: markers[0].position,
        triggerPosition: markers[0].position,
        postfix: ':',
        whitespaceAfter: true
    },
    {
        text: '(c: (d: 2 | 3) => void) => ...',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    },
    {
        text: 'c',
        triggerPosition: markers[2].position,
        rangeOrPosition: markers[2].position,
        postfix: ':',
        whitespaceAfter: true
    },
    {
        text: '2 | 3',
        triggerPosition: markers[2].position,
        rangeOrPosition: markers[3].position,
        prefix: ':',
        whitespaceBefore: true
    }
], undefined, {
    includeInlineParameterNameHints: true,
    includeInlineFunctionParameterTypeHints: true
});
