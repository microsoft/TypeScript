/// <reference path="fourslash.ts" />

//// const z = [1, 2, 3];
//// z
////     .map(function (e) { return String(e) })/*a*/
////     ["map"](function (e) { return Number(e) })/*b*/
////     .map(function (e) { return String(e) })/*c*/
////     ["map"](function (e) { return Number(e) });

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':string[]',
        rangeOrPosition: markers[0].position,
        whitespaceBefore: true
    },
    {
        text: ':number[]',
        rangeOrPosition: markers[1].position,
        whitespaceBefore: true
    },
    {
        text: ':string[]',
        rangeOrPosition: markers[2].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineCallChainsHints: true,
});
