/// <reference path="fourslash.ts" />

//// declare const unknownCall: any;
//// unknownCall();

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
