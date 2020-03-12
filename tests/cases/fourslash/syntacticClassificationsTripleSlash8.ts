/// <reference path="fourslash.ts"/>

//// /// <reference path="

var c = classification;
verify.syntacticClassificationsAre(
    c.comment("/// "),
    c.punctuation("<"),
    c.jsxSelfClosingTagName("reference"),
    c.comment(" path=\""));