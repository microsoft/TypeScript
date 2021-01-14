/// <reference path="fourslash.ts" />

//// function foo(a: (b: number) => number) {
////     return a(/*a*/1) + 2
//// }

//// foo(/*b*/(c: number) => c + 1);

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'b',
        rangeOrPosition: markers[0].position,
        triggerPosition: markers[0].position,
        postfix: ':',
        whitespaceAfter: true
    },
    {
        text: 'a',
        rangeOrPosition: markers[1].position,
        triggerPosition: markers[1].position,
        postfix: ':',
        whitespaceAfter: true
    },
], undefined, {
    includeInlineParameterNameHints: true
});
