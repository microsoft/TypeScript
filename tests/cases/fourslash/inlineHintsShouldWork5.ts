/// <reference path="fourslash.ts" />

//// type Args = [a: number, b: number]
//// declare function foo(c: number, ...args: Args);
//// foo(/*a*/1, /*b*/2, /*c*/3)

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'c:',
        position: markers[0].position,
        whitespaceAfter: true
    },
    {
        text: 'a:',
        position: markers[1].position,
        whitespaceAfter: true
    },
    {
        text: 'b:',
        position: markers[2].position,
        whitespaceAfter: true
    }
], undefined, {
    includeInlineParameterNameHints: true
});
