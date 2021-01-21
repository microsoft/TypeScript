/// <reference path="fourslash.ts" />

//// function foo (cb: (a: string) => void) {}
//// foo((a/*a*/) => { })

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':string',
        rangeOrPosition: markers[0].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
