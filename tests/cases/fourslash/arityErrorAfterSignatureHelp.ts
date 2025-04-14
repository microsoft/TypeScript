///<reference path="fourslash.ts"/>
// @strict: true
////
//// declare function f(x: string, y: number): any;
////
//// /*1*/f/*2*/(/*3*/)

goTo.marker("3");
verify.signatureHelp({
    triggerReason: {
        kind: "invoked"
    }
})
edit.insert(`"`)
edit.insert(`"`)
verify.signatureHelp({
    triggerReason: {
        kind: "retrigger"
    }
})
verify.not.codeFixAvailable(); // trigger typecheck
verify.errorExistsBetweenMarkers("1", "2");
