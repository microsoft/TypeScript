/// <reference path="fourslash.ts"/>

////class C {
////<<<<<<< HEAD
////    v = 1;
////=======
////    v = 2;
////>>>>>>> Branch - a
////}

var c = classification;
verify.syntacticClassificationsAre(
    c.keyword("class"), c.className("C"), c.punctuation("{"),
    c.comment("<<<<<<< HEAD"),
    c.identifier("v"), c.operator("="), c.numericLiteral("1"), c.punctuation(";"),
    c.comment("======="),
    c.identifier("v"), c.punctuation("="), c.numericLiteral("2"), c.punctuation(";"),
    c.comment(">>>>>>> Branch - a"),
    c.punctuation("}"));