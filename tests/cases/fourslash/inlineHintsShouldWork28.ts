/// <reference path="fourslash.ts" />

//// type F = (a: string, b: number) => void
//// const f: F = (a/*a*/, b: number) => { }

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':string',
        position: markers[0].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
