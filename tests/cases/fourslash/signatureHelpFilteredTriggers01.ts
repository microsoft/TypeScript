/// <reference path="fourslash.ts" />

////function foo<T>(x: T): T {
////  throw null;
////}
////
////foo("/*1*/");
////foo('/*2*/');
////foo(` ${100}/*3*/`);
////foo(/* /*4*/ */);
////foo(
////    ///*5*/
////);

for (const marker of test.markers()) {
    goTo.marker(marker);
    for (const triggerCharacter of ["<", "(", ","]) {
        edit.insert(triggerCharacter);
        verify.noSignatureHelpForTriggerReason({
            kind: "characterTyped",
            triggerCharacter,
        });
        verify.signatureHelpPresentForTriggerReason({
            kind: "retrigger",
            triggerCharacter,
        });
        edit.backspace();
    }
    verify.signatureHelpPresentForTriggerReason(/*triggerReason*/ undefined);
    verify.signatureHelpPresentForTriggerReason({ kind: "invoked" });
}
