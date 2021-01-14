/// <reference path="fourslash.ts" />

//// function f<T>(v: T, a: (v: T) => void) {}
//// f(1, /*a*/a/*b*/ => { })

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'number',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
