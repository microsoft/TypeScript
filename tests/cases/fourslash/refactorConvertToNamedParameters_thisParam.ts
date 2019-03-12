/// <reference path='fourslash.ts' />

////function foo(this: void, /*a*/t: string, s: string/*b*/) {
////    return s;
////}
////foo("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function foo(this: void, { t, s }: { t: string; s: string; }) {
    return s;
}
foo({ t: "a", s: "b" });`
});