/// <reference path='fourslash.ts' />

////class Foo {
////    t: string;
////    s: string;
////    /*a*/constructor/*b*/(t: string, s: string) {
////        this.t = t;
////        this.s = s;
////    }
////}
////var foo = new Foo("a", "b");

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `class Foo {
    t: string;
    s: string;
    constructor({ t, s }: { t: string; s: string; }) {
        this.t = t;
        this.s = s;
    }
}
var foo = new Foo({ t: "a", s: "b" });`
});