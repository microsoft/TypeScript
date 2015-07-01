/// <reference path="fourslash.ts"/>

//// for (var of in of) { }

var c = classification;
verify.syntacticClassificationsAre(
    c.keyword("for"),
    c.punctuation("("),
    c.keyword("var"),
    c.text("of"),
    c.keyword("in"),
    c.text("of"),
    c.punctuation(")"),
    c.punctuation("{"),
    c.punctuation("}")
    );