/// <reference path="fourslash.ts" />

////function foo(): number | undefined { return Math.random() > 0.5 ? 1 : undefined; }
////const x/**/ = foo();
////const y = x?.toString();

goTo.marker("");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `function foo(): number | undefined { return Math.random() > 0.5 ? 1 : undefined; }
const y = (foo())?.toString();`
});