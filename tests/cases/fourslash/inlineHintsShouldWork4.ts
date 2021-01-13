/// <reference path="fourslash.ts" />

//// declare function foo(w: number): void
//// declare function foo(a: number, b: number): void;
//// declare function foo(a: number | undefined, b: number | undefined): void;

//// foo(/*a*/1)
//// foo(/*b*/1, /*c*/2)

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'w:',
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
