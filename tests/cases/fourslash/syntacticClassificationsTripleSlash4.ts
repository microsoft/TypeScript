/// <reference path="fourslash.ts"/>

//// /// <

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/// <")); // Don't classify until we recognize the element name

    
