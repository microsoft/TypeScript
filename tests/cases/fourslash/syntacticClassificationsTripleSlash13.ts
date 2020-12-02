/// <reference path="fourslash.ts"/>

//// /// <reference path="./module.ts" /> trailing

const c = classification("original");
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
