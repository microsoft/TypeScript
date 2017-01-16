/// <reference path="fourslash.ts"/>

/////** @template T */
////function ident<T>: T {
////}

var c = classification;
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
