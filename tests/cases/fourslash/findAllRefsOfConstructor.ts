/// <reference path="fourslash.ts" />

////class A {
////    [|constructor|]() {}
////}
////class B extends A { }  
////var b = new [|B|]();
////var x = new [|A|]();

const [aCtr, bNew, aNew] = test.ranges();
verify.referenceGroups(aCtr, [{ definition: "class A", ranges: [aCtr, aNew] }, { definition: "class B", ranges: [bNew]}]);
