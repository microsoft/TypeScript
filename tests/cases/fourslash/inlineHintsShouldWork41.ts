/// <reference path="fourslash.ts" />

//// const a = ()/*a*/ => 1

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':number',
        position: markers[0].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlineFunctionLikeReturnType: true,
});
