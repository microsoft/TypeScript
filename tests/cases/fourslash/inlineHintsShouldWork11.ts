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
    includeInlineParameterNameHints: true
});
