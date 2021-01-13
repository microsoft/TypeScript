/// <reference path="fourslash.ts" />

//// interface Call {
////     (a: number): void
////     (b: number, c: number): void
//// }
//// declare const call: Call;
//// call(/*a*/1);
//// call(/*b*/1, /*c*/2);

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
    {
        text: 'c:',
        rangeOrPosition: markers[2].position,
        whitespaceAfter: true
    }
], undefined, {
    includeInlineParameterNameHints: true
});
