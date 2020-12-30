/// <reference path="fourslash.ts" />

//// function foo (cb: (a: Exclude<1 | 2 | 3, 1>) => void) {}
//// foo((a/*a*/) => { })

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':2 | 3',
        position: markers[0].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
