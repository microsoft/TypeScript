/// <reference path="fourslash.ts" />

//// const /*a*/a/*b*/ = 123;

const markers = test.markers();
verify.getInlineHints([
    {
        text: '123',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        whitespaceBefore: true,
        prefix: ':'
    },
], undefined, {
    includeInlineVariableTypeHints: true
});
