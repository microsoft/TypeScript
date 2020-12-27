/// <reference path="fourslash.ts" />

//// function foo (cb: (a: Exclude<1 | 2 | 3, 1>) => void) {}
//// foo((a/*a*/) => { })

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':Exclude<1 | 2 | 3, 1>',
        position: markers[0].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterType: true
});
