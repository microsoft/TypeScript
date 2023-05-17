/// <reference path="fourslash.ts" />

////let x/**/;
////const y = x + 1;

goTo.marker("");
verify.not.refactorAvailable("Inline variable");