/// <reference path="fourslash.ts" />

//// type Args = [number, number]
//// declare function foo(c: number, ...args: Args);
//// foo(/*a*/1, 2, 3)

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'c:',
        position: markers[0].position,
        whitespaceAfter: true
    }
], undefined, {
    includeInlineParameterName: true
});
