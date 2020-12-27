/// <reference path="fourslash.ts" />

//// function foo(a: (b: number) => number) {
////     return a(/*a*/1) + 2
//// }

//// foo(/*b*/(c: number) => c + 1);

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'b:',
        position: markers[0].position,
        whitespaceAfter: true
    },
    {
        text: 'a:',
        position: markers[1].position,
        whitespaceAfter: true
    },
], undefined, {
    includeInlineParameterName: true
});
