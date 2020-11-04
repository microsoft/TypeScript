/// <reference path="fourslash.ts"/>

//// ///<reference path = "./module.ts"/>

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("///"),
    c.punctuation("<"),
    c.jsxSelfClosingTagName("reference"),
    c.comment(" "),
    c.jsxAttribute("path"),
    c.comment(" "),
    c.operator("="),
    c.comment(" "),
    c.jsxAttributeStringLiteralValue("\"./module.ts\""),
    c.punctuation("/>"));


