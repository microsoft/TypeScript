/// <reference path="fourslash.ts"/>

////[] as tuple;

const c1 = classification("original");
verify.syntacticClassificationsAre(
    c1.punctuation("["),
    c1.punctuation("]"),
    c1.keyword("as"),
    c1.keyword("tuple"),
    c1.punctuation(";")
);


const c2 = classification("2020");
verify.syntacticClassificationsAre(
    c2.semanticToken("punctuation", "["),
    c2.semanticToken("punctuation", "]"),
    c2.semanticToken("keyword", "as"),
    c2.semanticToken("keyword", "tuple"),
    c2.semanticToken("punctuation", ";")
);
