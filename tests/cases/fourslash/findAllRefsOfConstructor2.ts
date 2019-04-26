/// <reference path="fourslash.ts" />


////class A {
////    [|constructor|](s: string) {}
////}
////class B extends A {
////    [|constructor|]() { [|super|](""); }
////}
////class C extends B {
////    [|constructor|]() {
////        [|super|]();
////    }
////}
////class D extends B { }
////const a = new [|A|]("a");
////const b = new [|B|]();
////const c = new [|C|]();
////const d = new [|D|]();

verify.noErrors();
const [aCtr, bCtr, bSuper, cCtr, cSuper, aNew, bNew, cNew, dNew] = test.ranges();
verify.referenceGroups(aCtr, [{ definition: "class A", ranges: [aCtr, bSuper, aNew] }]);
verify.referenceGroups(bCtr, [{ definition: "class B", ranges: [bCtr, cSuper, bNew]}, { definition: "class D", ranges: [dNew]}]);
verify.referenceGroups(cCtr, [{ definition: "class C", ranges: [cCtr, cNew]}]);