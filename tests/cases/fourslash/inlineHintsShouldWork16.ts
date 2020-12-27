/// <reference path="fourslash.ts" />

//// const a/*a*/ = 123;

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':123',
        position: markers[0].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlineVariableType: true
});
