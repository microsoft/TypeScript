/// <reference path="fourslash.ts" />

////const /*a1*/foo/*b1*/ = "foo";
////console.log(foo.length);
////const /*a2*/notTrue/*b2*/ = false;
////notTrue.valueOf();

goTo.select("a1", "b1");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `console.log("foo".length);
const notTrue = false;
notTrue.valueOf();`
});

goTo.select("a2", "b2");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `console.log("foo".length);
false.valueOf();`
});
