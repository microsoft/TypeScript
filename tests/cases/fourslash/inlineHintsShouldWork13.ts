/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(a, /*b*/2);

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'b:',
        rangeOrPosition: markers[0].position,
        whitespaceAfter: true
    },
], undefined, {
    includeInlineParameterNameHints: true,
    includeInlineNonLiteralParameterNameHints: true,
    includeInlineDuplicatedParameterNameHints: false,
});
