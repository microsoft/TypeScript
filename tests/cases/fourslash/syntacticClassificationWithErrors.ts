/// <reference path='fourslash.ts'/>

////class A {
////    a:
////}
////c =

let c = classification
verify.syntacticClassificationsAre(
    c.keyword("class"), c.className("A"), c.punctuation("{"),
    c.identifier("a"), c.punctuation(":"),
    c.punctuation("}"),
    c.identifier("c"), c.operator("=")
    );