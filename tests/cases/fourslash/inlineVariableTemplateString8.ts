/// <reference path="fourslash.ts" />

////const /*a*/message/*b*/ = "Hello, World!";
////await $`echo ${message}`;

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: 'await $`echo ${"Hello, World!"}`;',
});