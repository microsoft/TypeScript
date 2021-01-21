/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (a/*a*/, b/*b*/) => { }

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':string',
        rangeOrPosition: markers[0].position,
        whitespaceBefore: true
    },
    {
        text: ':number',
        rangeOrPosition: markers[1].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
