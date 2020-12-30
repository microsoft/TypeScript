/// <reference path="fourslash.ts" />

//// const z = [1, 2, 3];
//// z
////     .map(function (e) { return String(e) })/*a*/
////     .map(function (e) { return Number(e) });

const markers = test.markers();
verify.getInlineHints([
    {
        text: ':string[]',
        position: markers[0].position,
        whitespaceBefore: true
    }
], undefined, {
    includeInlineCallChainsHints: true,
});
