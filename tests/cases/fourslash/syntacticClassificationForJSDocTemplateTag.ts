/// <reference path="fourslash.ts"/>

/////** @template T */
////function ident<T>: T {
////}

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/** "),
    c.punctuation("@"),
    c.docCommentTagName("template"),
    c.typeParameterName("T"),
    c.comment(" */"),
    c.keyword("function"),
    c.identifier("ident"),
    c.punctuation("<"),
    c.typeParameterName("T"),
    c.punctuation(">"),
    c.punctuation(":"),
    c.identifier("T"),
    c.punctuation("{"),
    c.punctuation("}"));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("function.declaration", "ident"), 
    c2.semanticToken("typeParameter.declaration", "T"), 
    c2.semanticToken("typeParameter", "T"), 
);
