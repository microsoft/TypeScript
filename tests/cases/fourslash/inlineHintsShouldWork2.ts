/// <reference path="fourslash.ts" />

//// function foo (a: number, { c }: any) {}
//// foo(/*a*/1, { c: 1});

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'a:',
        position: markers[0].position,
        whitespaceAfter: true
    }
], undefined, {
    includeInlineParameterName: true
});
