/// <reference path="fourslash.ts" />

//// type F = (a: {
////     a: number
////     b: string
//// }) => void
//// const f: F = (/*a*/a/*b*/) => { }

const markers = test.markers();
verify.getInlineHints([
    {
        text: '{ a: number; b: string; }',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
