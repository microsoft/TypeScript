/// <reference path='fourslash.ts' />

////class Foo<T> {
////    /*a*/bar/*b*/(t: T, s: T) {
////        return s;
////    }
////}
////var foo = new Foo();
////foo.bar("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `class Foo<T> {
    bar({ t, s }: { t: T; s: T; }) {
        return s;
    }
}
var foo = new Foo();
foo.bar({ t: "a", s: "b" });`
});