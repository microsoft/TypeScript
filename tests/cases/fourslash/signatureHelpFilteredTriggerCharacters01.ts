/// <reference path="fourslash.ts" />

////function foo<T>(x: T): T {
////  throw null;
////}
////
////foo("/**/")

goTo.marker();
for (const triggerCharacter of ["<", "(", ","]) {
    edit.insert(triggerCharacter);
    verify.noSignatureHelpForTriggerCharacter(triggerCharacter);
    edit.backspace();
}
verify.signatureHelp({ triggerCharacter: undefined });