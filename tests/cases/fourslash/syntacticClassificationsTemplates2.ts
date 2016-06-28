/// <reference path="fourslash.ts"/>

////var tiredOfCanonicalExamples =
////`goodbye "${ `hello world` }" 
////and ${ `good${ " " }riddance` }`;

var c = classification;
verify.syntacticClassificationsAre(
    c.keyword("var"), c.identifier("tiredOfCanonicalExamples"), c.operator("="),
    c.stringLiteral("`goodbye \"${"), c.stringLiteral("`hello world`"),
    c.stringLiteral("}\" \nand ${"), c.stringLiteral("`good${"), c.stringLiteral("\" \""), c.stringLiteral("}riddance`"), c.stringLiteral("}`"), c.punctuation(";"));