/// <reference path="fourslash.ts"/>

//// /** @type {number} */
//// var v;

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/** "),
    c.punctuation("@"),
    c.docCommentTagName("type"),
    c.punctuation("{"),
    c.keyword("number"),
    c.punctuation("}"),
    c.comment(" */"),
    c.keyword("var"),
    c.identifier("v"),
    c.punctuation(";"));


const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration", "v"), 
);
