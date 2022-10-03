/// <reference path="fourslash.ts"/>

//// /// <reference path="./module1.ts" />
//// /// <reference path="./module2.ts" />

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/// "),
    c.punctuation("<"),
    c.jsxSelfClosingTagName("reference"),
    c.comment(" "),
    c.jsxAttribute("path"),
    c.operator("="),
    c.jsxAttributeStringLiteralValue("\"./module1.ts\""),
    c.comment(" "),
    c.punctuation("/>"),
    c.comment("/// "),
    c.punctuation("<"),
    c.jsxSelfClosingTagName("reference"),
    c.comment(" "),
    c.jsxAttribute("path"),
    c.operator("="),
    c.jsxAttributeStringLiteralValue("\"./module2.ts\""),
    c.comment(" "),
    c.punctuation("/>"));
