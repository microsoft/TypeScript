/// <reference path="fourslash.ts" />


////class A {
////    [|[|{| "contextRangeIndex": 0 |}constructor|](s: string) {}|]
////}
////class B extends A {
////    [|[|{| "contextRangeIndex": 2 |}constructor|]() { [|super|](""); }|]
////}
////class C extends B {
////    [|[|{| "contextRangeIndex": 5 |}constructor|]() {
////        [|super|]();
////    }|]
////}
////class D extends B { }
////const a = new [|A|]("a");
////const b = new [|B|]();
////const c = new [|C|]();
////const d = new [|D|]();

verify.noErrors();
const [aCtrDef, aCtr, bCtrDef, bCtr, bSuper, cCtrDef, cCtr, cSuper, aNew, bNew, cNew, dNew] = test.ranges();
verify.referenceGroups(aCtr, [{ definition: "class A", ranges: [aCtr, bSuper, aNew] }]);
verify.referenceGroups(bCtr, [{ definition: "class B", ranges: [bCtr, cSuper, bNew]}, { definition: "class D", ranges: [dNew]}]);
verify.referenceGroups(cCtr, [{ definition: "class C", ranges: [cCtr, cNew]}]);