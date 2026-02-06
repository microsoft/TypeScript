/// <reference path="fourslash.ts" />

////const /*a*/x/*b*/ = "`";
////export const y = `${x}`;

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "export const y = `\\``;"
});