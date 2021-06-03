/// <reference path="fourslash.ts" />

//// const z = [1, 2, 3];
//// z
////     .map(function (e) { return Number(e) });

const markers = test.markers();
verify.getInlayHints([], undefined, {
    includeInlayCallChainsHints: true,
});
