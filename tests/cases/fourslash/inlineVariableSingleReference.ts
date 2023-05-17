/// <reference path="fourslash.ts" />

////const x/**/ = 0;
////const y = x + 1;

goTo.marker("");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "const y = 0 + 1;"
});