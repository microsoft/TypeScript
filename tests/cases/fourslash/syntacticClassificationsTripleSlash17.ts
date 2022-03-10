/// <reference path="fourslash.ts"/>

//// /// <summary>Text</summary>

const c = classification("original");
verify.syntacticClassificationsAre(
    c.comment("/// <summary>Text</summary>"));
