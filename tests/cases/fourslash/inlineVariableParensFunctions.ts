/// <reference path="fourslash.ts" />

////const /*a1*/foo/*b1*/ = () => { };
////foo();
////const /*a2*/bar/*b2*/ = function() { };
////bar.call(null);

goTo.select("a1", "b1");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `(() => { })();
const bar = function() { };
bar.call(null);`
});

goTo.select("a2", "b2");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `(() => { })();
(function() { }).call(null);`
});