/// <reference path="fourslash.ts"/>

////var tiredOfCanonicalExamples =
////`goodbye "${ `hello world` }" 
////and ${ `good${ " " }riddance` }`;

const c = classification("original");
verify.syntacticClassificationsAre(
    c.keyword("var"), c.identifier("tiredOfCanonicalExamples"), c.operator("="),
    c.stringLiteral("`goodbye \"${"), c.stringLiteral("`hello world`"),
    c.stringLiteral("}\" \nand ${"), c.stringLiteral("`good${"), c.stringLiteral("\" \""), c.stringLiteral("}riddance`"), c.stringLiteral("}`"), c.punctuation(";"));

const c2 = classification("2020");
verify.semanticClassificationsAre("2020",
    c2.semanticToken("variable.declaration", "tiredOfCanonicalExamples"), 
);
