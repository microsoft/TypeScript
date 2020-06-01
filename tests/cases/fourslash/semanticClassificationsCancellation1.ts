/// <reference path="fourslash.ts" />

////module M {
////}
////module N {
////}

var c = classification;
cancellation.setCancelled(1);
verifyOperationIsCancelled(() => verify.semanticClassificationsAre("original", ));
cancellation.resetCancelled();

verify.semanticClassificationsAre("original", 
    c.moduleName("M"),
    c.moduleName("N"));
