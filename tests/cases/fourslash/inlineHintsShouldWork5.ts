/// <reference path="fourslash.ts" />

//// type Args = [a: number, b: number]
//// declare function foo(c: number, ...args: Args);
//// foo(/*a*/1, /*b*/2, /*c*/3)

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'c:',
        rangeOrPosition: markers[0].position,
        whitespaceAfter: true
    },
    {
        text: 'a:',
        rangeOrPosition: markers[1].position,
        whitespaceAfter: true
    },
    {
        text: 'b:',
        rangeOrPosition: markers[2].position,
        whitespaceAfter: true
    }
], undefined, {
    includeInlineParameterNameHints: true
});
