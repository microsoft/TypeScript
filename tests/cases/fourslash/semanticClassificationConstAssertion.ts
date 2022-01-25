/// <reference path="fourslash.ts"/>

////1 as const;

const c1 = classification("original");
verify.syntacticClassificationsAre(
    c1.numericLiteral("1"),
    c1.keyword("as"),
    c1.keyword("const"),
    c1.punctuation(";")
);


const c2 = classification("2020");
verify.syntacticClassificationsAre(
    c2.semanticToken("number", "1"),
    c2.semanticToken("keyword", "as"),
    c2.semanticToken("keyword", "const"),
    c2.semanticToken("punctuation", ";")
);
