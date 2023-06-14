/// <reference path="fourslash.ts" />

////const /*a*/x/*b*/ = 0;
////const y = x + 1;

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "const y = 0 + 1;"
});