/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (a/*a*/, b/*b*/) => { }

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':string',
        position: markers[0].position,
        whitespaceBefore: true
    },
    {
        text: ':number',
        position: markers[1].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
