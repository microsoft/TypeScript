/// <reference path='fourslash.ts' />

////class Foo {
////    static /*a*/bar/*b*/(t: string, s: string): string {
////        return s + t;
////    }
////}
////Foo.bar("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `class Foo {
    static bar({ t, s }: { t: string; s: string; }): string {
        return s + t;
    }
}
Foo.bar({ t: "a", s: "b" });`
});