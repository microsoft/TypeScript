/// <reference path="fourslash.ts" />

////declare function foo(...args);
////
////foo(() => {/*1*/}/*2*/)

goTo.marker("1");
verify.signatureHelpPresentForTriggerReason({
    kind: "invoked",
});

goTo.marker("2");
verify.signatureHelpPresentForTriggerReason({
    kind: "invoked",
});