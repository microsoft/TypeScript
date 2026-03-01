/// <reference path="fourslash.ts" />

////const foo = 1;
////const bar = { /*a*/foo/*b*/ };

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: "const bar = { foo: 1 };",
    triggerReason: "invoked",
});
