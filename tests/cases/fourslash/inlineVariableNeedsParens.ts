/// <reference path="fourslash.ts" />

////const x/**/ = 1 + 2;
////const y = x * 3;

goTo.marker("");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "const y = (1 + 2) * 3;"
});