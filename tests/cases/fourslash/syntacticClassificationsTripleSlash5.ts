/// <reference path="fourslash.ts"/>

//// /// <reference

var c = classification;
verify.syntacticClassificationsAre(
    c.comment("/// "),
    c.punctuation("<"),
    c.jsxSelfClosingTagName("reference"));