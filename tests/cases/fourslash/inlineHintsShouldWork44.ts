/// <reference path="fourslash.ts" />

//// enum E {
////     /*a*/A/*b*/,
////     /*c*/AA/*d*/,
////     B = 10,
////     /*e*/BB/*f*/,
////     C = 'C',
//// }

const markers = test.markers();
verify.getInlineHints([
    {
        text: '0',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: '= ',
        whitespaceBefore: true
    },
    {
        text: '1',
        triggerPosition: markers[2].position,
        rangeOrPosition: markers[3].position,
        prefix: '= ',
        whitespaceBefore: true
    },
    {
        text: '11',
        triggerPosition: markers[4].position,
        rangeOrPosition: markers[5].position,
        prefix: '= ',
        whitespaceBefore: true
    },
], undefined, {
    includeInlineEnumMemberValueHints: true,
});
