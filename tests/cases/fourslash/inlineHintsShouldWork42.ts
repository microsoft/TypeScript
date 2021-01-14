/// <reference path="fourslash.ts" />

//// const a = /*a*/function ()/*b*/ { return 1}

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'number',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    },
], undefined, {
    includeInlineFunctionLikeReturnTypeHints: true,
});
