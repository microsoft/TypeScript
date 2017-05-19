/// <reference path="fourslash.ts"/>

////<<<<<<< HEAD
////class C { }
////=======
////class D { }
////>>>>>>> Branch - a

var c = classification;
verify.syntacticClassificationsAre(
    c.comment("<<<<<<< HEAD"),
    c.keyword("class"), c.className("C"), c.punctuation("{"), c.punctuation("}"),
    c.comment("======="),
    c.keyword("class"), c.identifier("D"), c.punctuation("{"), c.punctuation("}"),
    c.comment(">>>>>>> Branch - a"));