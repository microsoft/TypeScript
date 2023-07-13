/// <reference path="fourslash.ts" />

////const x = 0;
////const y = /*a*/x/*b*/ + 1;

goTo.select("a", "b");
verify.not.refactorAvailableForTriggerReason("implicit", "Inline variable");
verify.refactorAvailableForTriggerReason("invoked", "Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "const y = 0 + 1;",
    triggerReason: "invoked"
});