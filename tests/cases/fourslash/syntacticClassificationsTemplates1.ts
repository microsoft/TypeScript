/// <reference path="fourslash.ts"/>

////var v = 10e0;
////var x = {
////    p1: `hello world`,
////    p2: `goodbye ${0} cruel ${0} world`,
////};

var c = classification;
verify.syntacticClassificationsAre(
    c.keyword("var"), c.text("v"), c.operator("="), c.numericLiteral("10e0"), c.punctuation(";"),
    c.keyword("var"), c.text("x"), c.operator("="), c.punctuation("{"),
    c.text("p1"), c.punctuation(":"), c.stringLiteral("`hello world`"), c.punctuation(","),
    c.text("p2"), c.punctuation(":"), c.stringLiteral("`goodbye ${"), c.numericLiteral("0"), c.stringLiteral("} cruel ${"), c.numericLiteral("0"), c.stringLiteral("} world`"), c.punctuation(","),
    c.punctuation("}"), c.punctuation(";"));