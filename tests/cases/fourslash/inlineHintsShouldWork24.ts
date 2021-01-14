/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (/*a*/a/*b*/, /*c*/b/*d*/) => { }

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'string',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    },
    {
        text: 'number',
        triggerPosition: markers[2].position,
        rangeOrPosition: markers[3].position,
        prefix: ':',
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
