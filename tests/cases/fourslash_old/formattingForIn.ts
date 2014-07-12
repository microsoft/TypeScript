///<reference path="fourslash.ts"/>

/////**/for (var i    in[]   )  {}

format.document();
goTo.marker();
verify.currentLineContentIs("for (var i in []) { }");