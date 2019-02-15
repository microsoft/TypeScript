/// <reference path='fourslash.ts' />

////class Foo {
////    static /*a*/bar/*b*/(t: string, s: string): string {
////        return s + t;
////    }
////}
////Foo.bar("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert to named parameters",
    actionName: "Convert to named parameters",
    actionDescription: "Convert to named parameters",
    newContent: `class Foo {
    static bar({ t, s }: { t: string; s: string; }): string {
        return s + t;
    }
}
Foo.bar({ t: "a", s: "b" });`
});