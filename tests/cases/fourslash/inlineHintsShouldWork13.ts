/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(a, /*b*/2);

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'b:',
        position: markers[0].position,
        whitespaceAfter: true
    },
], undefined, {
    includeInlineParameterName: true
});
