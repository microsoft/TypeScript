/// <reference path='fourslash.ts' />

////const c = class C {
////    static a: number = 2;
////    /*a*/constructor/*b*/(a: number, b: number) { }
////}
////const a = new c(0, 1);
////const b = c.a;
////c["a"] = 3;

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `const c = class C {
    static a: number = 2;
    constructor({ a, b }: { a: number; b: number; }) { }
}
const a = new c({ a: 0, b: 1 });
const b = c.a;
c["a"] = 3;`
});