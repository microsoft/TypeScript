/// <reference path="fourslash.ts" />

////const foo/**/ = () => foo();

goTo.marker("");
verify.not.refactorAvailable("Inline variable");