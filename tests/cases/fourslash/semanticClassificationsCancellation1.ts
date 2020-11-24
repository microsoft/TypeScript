/// <reference path="fourslash.ts" />

////module M {
////}
////module N {
////}

const c = classification("original");
cancellation.setCancelled(1);
verifyOperationIsCancelled(() => verify.semanticClassificationsAre("original", ));
cancellation.resetCancelled();

verify.semanticClassificationsAre("original", 
    c.moduleName("M"),
    c.moduleName("N"));


const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("namespace.declaration", "M"), 
    c2.semanticToken("namespace.declaration", "N"), 
);

    