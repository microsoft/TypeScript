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
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `class Foo<T> {
    bar({ t, s }: { t: T; s: T; }) {
        return s;
    }
}
var foo = new Foo();
foo.bar({ t: "a", s: "b" });`
});