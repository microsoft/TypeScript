/// <reference path="fourslash.ts" />

//// enum E {
////     A/*a*/,
////     AA/*b*/,
////     B = 10,
////     BB/*c*/,
////     C = 'C',
//// }

const markers = test.markers();
verify.getInlineHints([
    {
        text: '= 0',
        rangeOrPosition: markers[0].position,
        whitespaceBefore: true
    },
    {
        text: '= 1',
        rangeOrPosition: markers[1].position,
        whitespaceBefore: true
    },
    {
        text: '= 11',
        rangeOrPosition: markers[2].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlineEnumMemberValueHints: true,
});
