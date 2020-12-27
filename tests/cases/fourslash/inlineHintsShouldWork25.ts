/// <reference path="fourslash.ts" />

//// function foo (cb: (a: string) => void) {}
//// foo((a/*a*/) => { })

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':string',
        position: markers[0].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterType: true
});
