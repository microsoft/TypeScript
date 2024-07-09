/// <reference path='fourslash.ts' />

////class Foo {
////    /*a*/bar/*b*/(t: string, s: string): string {
////        return s + t;
////    }
////}
////class Bar extends Foo { }
////var bar = new Bar();
////bar.bar("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `class Foo {
    bar({ t, s }: { t: string; s: string; }): string {
        return s + t;
    }
}
class Bar extends Foo { }
var bar = new Bar();
bar.bar({ t: "a", s: "b" });`
});