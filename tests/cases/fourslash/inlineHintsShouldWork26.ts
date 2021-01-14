/// <reference path="fourslash.ts" />

//// function foo (cb: (a: Exclude<1 | 2 | 3, 1>) => void) {}
//// foo((/*a*/a/*b*/) => { })

const markers = test.markers();
verify.getInlineHints([
    {
        text: '2 | 3',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
