/// <reference path="fourslash.ts"/>

//// /// nonElement

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/// nonElement"));
