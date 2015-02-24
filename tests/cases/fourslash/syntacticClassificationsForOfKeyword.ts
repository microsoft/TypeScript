/// <reference path="fourslash.ts"/>

//// for (var of of of) { }

var c = classification;
verify.syntacticClassificationsAre(
    c.keyword("for"),
    c.punctuation("("),
    c.keyword("var"),
    c.text("of"),
    c.keyword("of"),
    c.text("of"),
    c.punctuation(")"),
    c.punctuation("{"),
    c.punctuation("}")
    );