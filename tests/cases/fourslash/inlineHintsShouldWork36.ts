/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(/*a*/a, /*b*/2);

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'a:',
        position: markers[0].position,
        whitespaceAfter: true
    },
    {
        text: 'b:',
        position: markers[1].position,
        whitespaceAfter: true
    },
], undefined, {
    includeInlineParameterNameHints: true,
    includeInlineNonLiteralParameterNameHints: true,
    includeInlineDuplicatedParameterNameHints: true,
});
