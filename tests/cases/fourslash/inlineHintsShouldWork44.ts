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
        position: markers[0].position,
        whitespaceBefore: true
    },
    {
        text: '= 1',
        position: markers[1].position,
        whitespaceBefore: true
    },
    {
        text: '= 11',
        position: markers[2].position,
        whitespaceBefore: true
    },
], undefined, {
    includeInlineEnumMemberValue: true,
});
