/// <reference path='fourslash.ts' />

////class Foo {
////    /*a*/bar/*b*/(t: string, s: string): string {
////        return s + t;
////    }
////}
////var foo = new Foo();
////foo['bar']("a", "b");
////foo.bar("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `class Foo {
    bar({ t, s }: { t: string; s: string; }): string {
        return s + t;
    }
}
var foo = new Foo();
foo['bar']({ t: "a", s: "b" });
foo.bar({ t: "a", s: "b" });`
});