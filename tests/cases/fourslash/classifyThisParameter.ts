/// <reference path="fourslash.ts"/>

////function f(this){}

const c = classification("original");
verify.syntacticClassificationsAre(
    c.keyword("function"),
    c.identifier("f"),
    c.punctuation("("),
    c.keyword("this"),
    c.punctuation(")"),
    c.punctuation("{"),
    c.punctuation("}"));
