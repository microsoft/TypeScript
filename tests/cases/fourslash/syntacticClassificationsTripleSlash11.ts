/// <reference path="fourslash.ts"/>

//// /// <reference path="./module.ts" /

var c = classification;
verify.syntacticClassificationsAre(
    c.comment("/// "),
    c.punctuation("<"),
    c.jsxSelfClosingTagName("reference"),
    c.comment(" "),
    c.jsxAttribute("path"),
    c.operator("="),
    c.jsxAttributeStringLiteralValue("\"./module.ts\""),
    c.comment(" "),
    c.comment("/"));