/// <reference path="fourslash.ts" />

//// const /*a*/a/*b*/ = "I'm very very very very very very very very very long";

const markers = test.markers();
verify.getInlineHints([
    {
        text: `"I'm very very very very ve...`,
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    },
], undefined, {
    includeInlineVariableTypeHints: true
});
