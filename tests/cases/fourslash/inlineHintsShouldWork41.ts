/// <reference path="fourslash.ts" />

//// const a = ()/*a*/ => 1

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':number',
        rangeOrPosition: markers[0].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlineFunctionLikeReturnTypeHints: true,
});
