/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(/*a*/a, /*b*/2);

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'a',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[0].position,
        postfix: ':',
        whitespaceAfter: true
    },
    {
        text: 'b',
        triggerPosition: markers[1].position,
        rangeOrPosition: markers[1].position,
        postfix: ':',
        whitespaceAfter: true
    },
], undefined, {
    includeInlineParameterNameHints: true,
    includeInlineNonLiteralParameterNameHints: true,
    includeInlineDuplicatedParameterNameHints: true,
});
