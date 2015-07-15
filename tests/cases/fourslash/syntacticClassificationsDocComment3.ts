/// <reference path="fourslash.ts"/>

//// /** @param foo { number /* } */
//// var v;

var c = classification;
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
