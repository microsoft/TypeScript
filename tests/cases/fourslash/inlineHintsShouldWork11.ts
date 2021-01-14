/// <reference path="fourslash.ts" />

//// function foo(a: number) {
////     return (b: number) => {
////         return a + b
////     }
//// }
//// foo(/*a*/1)(/*b*/2);

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
        text: 'b',
        rangeOrPosition: markers[1].position,
        triggerPosition: markers[1].position,
        postfix: ':',
        whitespaceAfter: true
    },
], undefined, {
    includeInlineParameterNameHints: true
});
