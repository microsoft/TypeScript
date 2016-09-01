/// <reference path="fourslash.ts"/>

//// /** @param {number} p1 */
//// function foo(p1) {}

var c = classification;
verify.syntacticClassificationsAre(
    c.comment("/** "),
    c.punctuation("@"),
    c.docCommentTagName("param"),
    c.comment(" "),
    c.punctuation("{"),
    c.keyword("number"),
    c.punctuation("}"),
    c.comment(" "),
    c.parameterName("p1"),
    c.comment(" */"),
    c.keyword("function"),
    c.identifier("foo"),
    c.punctuation("("),
    c.parameterName("p1"),
    c.punctuation(")"),
    c.punctuation("{"),
    c.punctuation("}"));
