/// <reference path='fourslash.ts' />

////function foo<T, S>(/*a*/t: T, s: S/*b*/) {
////    return s;
////}
////foo("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `function foo<T, S>({ t, s }: { t: T; s: S; }) {
    return s;
}
foo({ t: "a", s: "b" });`
});