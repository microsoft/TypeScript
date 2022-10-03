/// <reference path='fourslash.ts' />

////function foo(this: void, /*a*/t: string, s: string/*b*/) {
////    return s;
////}
////foo("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function foo(this: void, { t, s }: { t: string; s: string; }) {
    return s;
}
foo({ t: "a", s: "b" });`
});