/// <reference path="fourslash.ts" />

////function inc(x: number) { return x + 1; }
////const /*a*/y/*b*/ = inc(1);
////const z = y + 1;
////const w = inc(y);

goTo.select("a", "b");
verify.refactorAvailable("Inline variable");
edit.applyRefactor({
    refactorName: "Inline variable",
    actionName: "Inline variable",
    actionDescription: "Inline variable",
    newContent: `function inc(x: number) { return x + 1; }
const z = inc(1) + 1;
const w = inc(inc(1));`
});