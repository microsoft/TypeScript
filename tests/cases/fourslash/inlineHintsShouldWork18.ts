/// <reference path="fourslash.ts" />

//// class Class {}
//// const a/*a*/ = new Class();

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':Class',
        rangeOrPosition: markers[0].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlineVariableTypeHints: true
});
