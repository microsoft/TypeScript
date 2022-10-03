/// <reference path="fourslash.ts"/>

//// for (var of of of) { }

const c = classification("original");
verify.syntacticClassificationsAre(
    c.keyword("for"),
    c.punctuation("("),
    c.keyword("var"),
    c.identifier("of"),
    c.keyword("of"),
    c.identifier("of"),
    c.punctuation(")"),
    c.punctuation("{"),
    c.punctuation("}")
    );

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration", "of"), 
    c2.semanticToken("variable", "of"), 
);
