/// <reference path="fourslash.ts" />


////class A {
////    [|constructor|](s: string) {}
////}
////class B extends A { }
////class C extends B {
////    [|constructor|]() {
////        [|super|]("");
////    }
////}
////class D extends B { }
////class E implements A { }
////const a = new [|A|]("a");
////const b = new [|B|]("b");
////const c = new [|C|]();
////const d = new [|D|]("d");
////const e = new E();

verify.noErrors();
const [aCtr, cCtr, cSuper, aNew, bNew, cNew, dNew] = test.ranges();
verify.referenceGroups(aCtr, [
    { definition: "class A", ranges: [aCtr, aNew] },
    { definition: "class B", ranges: [cSuper, bNew]},
    { definition: "class D", ranges: [dNew]}]);
verify.referenceGroups(cCtr, [{ definition: "class C", ranges: [cCtr, cNew]}]);