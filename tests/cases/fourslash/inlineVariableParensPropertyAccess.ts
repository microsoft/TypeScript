/// <reference path="fourslash.ts" />

////const /*a1*/foo/*b1*/ = {};
////foo.toString();
////const /*a2*/bar/*b2*/ = 0;
////bar.toFixed().toString();

goTo.select("a1", "b1");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `({}).toString();
const bar = 0;
bar.toFixed().toString();`
});

goTo.select("a2", "b2");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `({}).toString();
(0).toFixed().toString();`
});
