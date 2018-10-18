/// <reference path="fourslash.ts"/>

////<<<<<<< HEAD
////class C { }
////||||||| merged common ancestors
////class E { }
////=======
////class D { }
////>>>>>>> Branch - a

const c = classification;
verify.syntacticClassificationsAre(
    c.comment("<<<<<<< HEAD"),
    c.keyword("class"), c.className("C"), c.punctuation("{"), c.punctuation("}"),
    c.comment("||||||| merged common ancestors"),
    c.keyword("class"), c.identifier("E"), c.punctuation("{"), c.punctuation("}"),
    c.comment("======="),
    c.keyword("class"), c.identifier("D"), c.punctuation("{"), c.punctuation("}"),
    c.comment(">>>>>>> Branch - a"));