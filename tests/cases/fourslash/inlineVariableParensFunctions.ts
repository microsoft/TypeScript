/// <reference path="fourslash.ts" />

////const /*a*/f/*b*/ = () => { };
////f();

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "(() => { })();"
});