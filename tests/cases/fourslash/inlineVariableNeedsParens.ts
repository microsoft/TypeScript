/// <reference path="fourslash.ts" />

////const /*a1*/x/*b1*/ = 1 + 2;
////const y = x * 3;
////const /*a2*/f/*b2*/ = () => { };
////f();

goTo.select("a1", "b1");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `const y = (1 + 2) * 3;
const f = () => { };
f();`
});

goTo.select("a2", "b2");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `const y = (1 + 2) * 3;
(() => { })();`
});