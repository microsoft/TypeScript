/// <reference path="fourslash.ts" />

//// class Class {
////     constructor(a: number);
////     constructor(b: number, c: number);
////     constructor(b: number, c?: number) { }
//// }
//// new Class(/*a*/1)
//// new Class(/*b*/1, /*c*/2)

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
    {
        text: 'c:',
        position: markers[2].position,
        whitespaceAfter: true
    }
], undefined, {
    includeInlineParameterNameHints: true
});
