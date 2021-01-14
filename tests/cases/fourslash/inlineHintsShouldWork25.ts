/// <reference path="fourslash.ts" />

//// function foo (cb: (a: string) => void) {}
//// foo((/*a*/a/*b*/) => { })

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
