/// <reference path="fourslash.ts"/>

//// /** @param foo { number /* } */
//// var v;

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/** "),
    c.punctuation("@"),
    c.docCommentTagName("param"),
    c.comment(" "),
    c.parameterName("foo"),
    c.comment(" "),
    c.punctuation("{"),
    c.keyword("number"),
    c.comment(" /* } */"),
    c.keyword("var"),
    c.identifier("v"),
    c.punctuation(";"));


const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration", "v"), 
);
