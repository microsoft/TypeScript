/// <reference path="fourslash.ts"/>

//// /// <reference>Text</reference>

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/// <reference>Text</reference>"));
