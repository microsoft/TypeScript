/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(/*a*/a, /*b*/2);

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'a:',
        rangeOrPosition: markers[0].position,
        whitespaceAfter: true
    },
    {
        text: 'b:',
        rangeOrPosition: markers[1].position,
        whitespaceAfter: true
    },
], undefined, {
    includeInlineParameterNameHints: true,
    includeInlineNonLiteralParameterNameHints: true,
    includeInlineDuplicatedParameterNameHints: true,
});
