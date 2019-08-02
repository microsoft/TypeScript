/// <reference path="fourslash.ts"/>

//// /// <reference path="./module.ts" /> trailing

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
    c.punctuation("/>"),
    c.comment(" trailing"));