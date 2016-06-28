/// <reference path="fourslash.ts" />

////module M {
////}
////module N {
////}

var c = classification;
cancellation.setCancelled(1);
verifyOperationIsCancelled(() => verify.syntacticClassificationsAre());
cancellation.resetCancelled();

verify.syntacticClassificationsAre(
    c.keyword("module"),
    c.moduleName("M"),
    c.punctuation("{"),
    c.punctuation("}"),
    c.keyword("module"),
    c.moduleName("N"),
    c.punctuation("{"),
    c.punctuation("}"));
