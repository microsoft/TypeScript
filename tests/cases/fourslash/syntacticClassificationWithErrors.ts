/// <reference path='fourslash.ts'/>

////class A {
////    a:
////}
////c =

const c = classification("original")

verify.syntacticClassificationsAre(
    c.keyword("class"), c.className("A"), c.punctuation("{"),
    c.identifier("a"), c.punctuation(":"),
    c.punctuation("}"),
    c.identifier("c"), c.operator("=")
    );

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("class.declaration", "A"), 
    c2.semanticToken("property.declaration", "a"), 
);
