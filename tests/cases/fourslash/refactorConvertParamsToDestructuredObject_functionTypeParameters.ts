/// <reference path='fourslash.ts' />

////function foo<T, S>(/*a*/t: T, s: S/*b*/) {
////    return s;
////}
////foo("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `function foo<T, S>({ t, s }: { t: T; s: S; }) {
    return s;
}
foo({ t: "a", s: "b" });`
});