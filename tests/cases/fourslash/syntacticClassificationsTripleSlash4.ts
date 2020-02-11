/// <reference path="fourslash.ts"/>

//// /// <

var c = classification;
verify.syntacticClassificationsAre(
    c.comment("/// <")); // Don't classify until we recognize the element name