/// <reference path="fourslash.ts" />

//// const z = [1, 2, 3];
//// /*a*/z
////     .map(function (e) { return String(e) })/*b*/
////     .map(function (e) { return Number(e) });

const markers = test.markers();
verify.getInlineHints([
    {
        text: 'string[]',
        triggerPosition: markers[0].position,
        rangeOrPosition: markers[1].position,
        prefix: ':',
        whitespaceBefore: true
    }
], undefined, {
    includeInlineCallChainsHints: true,
});
