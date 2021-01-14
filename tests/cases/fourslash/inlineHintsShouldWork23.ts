/// <reference path="fourslash.ts" />

//// function foo (Im_very_very_very_very_very_very_very_long: number) {}
//// foo(/*a*/1);

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'Im_very_very_very_very_very...',
        rangeOrPosition: markers[0].position,
        triggerPosition: markers[0].position,
        postfix: ':',
        whitespaceAfter: true
    }
], undefined, {
    includeInlineParameterNameHints: true
});
