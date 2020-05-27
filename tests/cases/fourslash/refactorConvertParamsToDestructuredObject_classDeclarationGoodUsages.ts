/// <reference path='fourslash.ts' />

////class C {
////    static a: number = 2;
////    /*a*/constructor/*b*/(a: number, b: number) { }
////}
////const newC = new C(1, 2);
////const b = C.a;
////C["a"] = 3;
////let c: C;
////function f(c: C) { }
////class B extends C { }
////class A implements C { }

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert parameters to destructured object",
    actionName: "Convert parameters to destructured object",
    actionDescription: "Convert parameters to destructured object",
    newContent: `class C {
    static a: number = 2;
    constructor({ a, b }: { a: number; b: number; }) { }
}
const newC = new C({ a: 1, b: 2 });
const b = C.a;
C["a"] = 3;
let c: C;
function f(c: C) { }
class B extends C { }
class A implements C { }`
});