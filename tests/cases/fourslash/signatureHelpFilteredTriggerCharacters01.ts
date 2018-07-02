/// <reference path="fourslash.ts" />

////function foo<T>(x: T): T {
////  throw null;
////}
////
////foo("/**/")

goTo.marker();
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