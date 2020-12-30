/// <reference path="fourslash.ts" />

//// declare const unknownCall: any;
//// unknownCall();

const markers = test.markers();
verify.getInlineHints([], undefined, {
    includeInlineParameterNameHints: true
});
