/// <reference path="fourslash.ts" />

////namespace M {
////}
////namespace N {
////}

const c = classification("original");
cancellation.setCancelled(1);
verifyOperationIsCancelled(() => verify.syntacticClassificationsAre());
cancellation.resetCancelled();

verify.syntacticClassificationsAre(
    c.keyword("namespace"),
    c.moduleName("M"),
    c.punctuation("{"),
    c.punctuation("}"),
    c.keyword("namespace"),
    c.moduleName("N"),
    c.punctuation("{"),
    c.punctuation("}"));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("namespace.declaration", "M"), 
    c2.semanticToken("namespace.declaration", "N"), 
);
