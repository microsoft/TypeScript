/// <reference path='fourslash.ts'/>

////class class1 extends class1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////}
////class class2 extends class1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////}
////
////var v: class2;
////v.[|doStuff|]();

const ranges = test.ranges();
const [m0, m1, m2] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(method) class1.doStuff(): void", ranges: [m0] },
    { definition: "(method) class2.doStuff(): void", ranges: [m1, m2] }
]);
