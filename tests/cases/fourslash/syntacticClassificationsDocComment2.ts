/// <reference path="fourslash.ts"/>

//// /** @param foo { function(x): string } */
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
    c.keyword("function"),
    c.punctuation("("),
    c.identifier("x"),
    c.punctuation(")"),
    c.punctuation(":"),
    c.keyword("string"),
    c.punctuation("}"),
    c.comment(" */"),
    c.keyword("var"),
    c.identifier("v"),
    c.punctuation(";"));
