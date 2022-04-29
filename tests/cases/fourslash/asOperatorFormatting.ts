/// <reference path="fourslash.ts" />

//// /**/var x = 3   as  number;

goTo.marker();
format.document();
verify.currentLineContentIs("var x = 3 as number;");
