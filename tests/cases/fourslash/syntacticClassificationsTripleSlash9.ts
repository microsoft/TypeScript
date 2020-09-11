/// <reference path="fourslash.ts"/>

//// /// <reference path="./module.ts

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/// "),
    c.punctuation("<"),
    c.jsxSelfClosingTagName("reference"),
    c.comment(" path=\"./module.ts"));


