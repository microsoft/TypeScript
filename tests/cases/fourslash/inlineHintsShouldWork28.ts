/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (/*a*/a/*b*/, b: number) => { }

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'string',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
