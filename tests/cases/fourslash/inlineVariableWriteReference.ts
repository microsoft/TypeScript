/// <reference path="fourslash.ts" />

////const x/**/ = 0;
////const y = x++ + 1;

goTo.marker("");
verify.not.refactorAvailable("Inline variable");