/// <reference path="fourslash.ts"/>

////var v = 10e0;
////var x = {
////    p1: 1,
////    p2: 2,
////    any: 3,
////    function: 4,
////    var: 5,
////    void: void 0,
////    v: v += v,
////};

const c = classification("original");
verify.syntacticClassificationsAre(
    c.keyword("var"), c.identifier("v"), c.operator("="), c.numericLiteral("10e0"), c.punctuation(";"),
    c.keyword("var"), c.identifier("x"), c.operator("="), c.punctuation("{"),
    c.identifier("p1"), c.punctuation(":"), c.numericLiteral("1"), c.punctuation(","),
    c.identifier("p2"), c.punctuation(":"), c.numericLiteral("2"), c.punctuation(","),
    c.identifier("any"), c.punctuation(":"), c.numericLiteral("3"), c.punctuation(","),
    c.identifier("function"), c.punctuation(":"), c.numericLiteral("4"), c.punctuation(","),
    c.identifier("var"), c.punctuation(":"), c.numericLiteral("5"), c.punctuation(","),
    c.identifier("void"), c.punctuation(":"), c.keyword("void"), c.numericLiteral("0"), c.punctuation(","),
    c.identifier("v"), c.punctuation(":"), c.identifier("v"), c.operator("+="), c.identifier("v"), c.punctuation(","),
    c.punctuation("}"), c.punctuation(";"));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration", "v"), 
    c2.semanticToken("variable.declaration", "x"), 
    c2.semanticToken("property.declaration", "p1"), 
    c2.semanticToken("property.declaration", "p2"), 
    c2.semanticToken("property.declaration", "any"), 
    c2.semanticToken("property.declaration", "function"), 
    c2.semanticToken("property.declaration", "var"), 
    c2.semanticToken("property.declaration", "void"), 
    c2.semanticToken("property.declaration", "v"), 
    c2.semanticToken("variable", "v"), 
    c2.semanticToken("variable", "v"), 
);
