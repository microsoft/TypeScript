/// <reference path="fourslash.ts" />

//// function f<T>(v: T, a: (v: T) => void) {}
//// f(1, a/*a*/ => { })

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':number',
        rangeOrPosition: markers[0].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineFunctionParameterTypeHints: true
});
