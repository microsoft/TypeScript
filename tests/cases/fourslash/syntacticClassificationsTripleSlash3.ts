/// <reference path="fourslash.ts"/>

//// /// <reference path="./module.ts" types="node" />

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
    c.jsxAttribute("types"),
    c.operator("="),
    c.jsxAttributeStringLiteralValue("\"node\""),
    c.comment(" "),
    c.punctuation("/>"));