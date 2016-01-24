/// <reference path="fourslash.ts" />

////module M {
////}
////module N {
////}

var c = classification;
cancellation.setCancelled(1);
verifyOperationIsCancelled(() => verify.semanticClassificationsAre());
cancellation.resetCancelled();

verify.semanticClassificationsAre(
    c.moduleName("M"),
    c.moduleName("N"));
