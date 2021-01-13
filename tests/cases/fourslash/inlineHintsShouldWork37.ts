/// <reference path="fourslash.ts" />

//// class C {
////     a/*a*/ = 1
////     b: number = 2
////     c;
//// }

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':number',
        rangeOrPosition: markers[0].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlinePropertyDeclarationTypeHints: true,
});
