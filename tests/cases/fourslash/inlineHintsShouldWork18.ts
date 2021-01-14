/// <reference path="fourslash.ts" />

//// class Class {}
//// const /*a*/a/*b*/ = new Class();

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'Class',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        whitespaceBefore: true,
        prefix: ':'
    },
], undefined, {
    includeInlineVariableTypeHints: true
});
