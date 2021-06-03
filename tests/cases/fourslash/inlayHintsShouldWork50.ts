/// <reference path="fourslash.ts" />

//// const z = [1, 2, 3];
//// z
////     .map(function (e) { return String(e) })/*a*/
////     ["map"](function (e) { return Number(e) })/*b*/
////     .map(function (e) { return String(e) })/*c*/
////     ["map"](function (e) { return Number(e) });

const markers = test.markers();
verify.getInlayHints([
    {
        text: ':string[]',
        position: markers[0].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ':number[]',
        position: markers[1].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    },
    {
        text: ':string[]',
        position: markers[2].position,
        kind: ts.InlayHintKind.Type,
        whitespaceBefore: true
    }
], undefined, {
    includeInlayCallChainsHints: true,
});
