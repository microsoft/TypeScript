/// <reference path="fourslash.ts"/>

////class C {
////<<<<<<< HEAD
////    v = 1;
////||||||| merged common ancestors
////    v = 3;
////=======
////    v = 2;
////>>>>>>> Branch - a
////}

const c = classification("original");
verify.syntacticClassificationsAre(
    c.keyword("class"), c.className("C"), c.punctuation("{"),
    c.comment("<<<<<<< HEAD"),
    c.identifier("v"), c.operator("="), c.numericLiteral("1"), c.punctuation(";"),
    c.comment("||||||| merged common ancestors"),
    c.identifier("v"), c.punctuation("="), c.numericLiteral("3"), c.punctuation(";"),
    c.comment("======="),
    c.identifier("v"), c.punctuation("="), c.numericLiteral("2"), c.punctuation(";"),
    c.comment(">>>>>>> Branch - a"),
    c.punctuation("}"));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("class.declaration", "C"), 
    c2.semanticToken("property.declaration", "v"), 
);
