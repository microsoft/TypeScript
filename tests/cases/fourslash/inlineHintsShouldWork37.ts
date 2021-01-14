/// <reference path="fourslash.ts" />

//// class C {
////     /*a*/a/*b*/ = 1
////     b: number = 2
////     c;
//// }

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
    includeInlinePropertyDeclarationTypeHints: true,
});
