/// <reference path="fourslash.ts" />

//// const a/*a*/ = { a: 123 };

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':{ a: number; }',
        position: markers[0].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlineVariableType: true
});
