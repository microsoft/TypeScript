/// <reference path="fourslash.ts"/>

//// /** @type {number} */
//// var v;

var c = classification;
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
