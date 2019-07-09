/// <reference path='fourslash.ts'/>

////class class1 extends class1 {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}doStuff|]() { }|]
////}
////class class2 extends class1 {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}doStuff|]() { }|]
////}
////
////var v: class2;
////v.[|doStuff|]();

const [m0Def, m0, m1Def, m1, m2] = test.ranges();
verify.referenceGroups([m0, m1, m2], [
    { definition: "(method) class1.doStuff(): void", ranges: [m0] },
    { definition: "(method) class2.doStuff(): void", ranges: [m1, m2] }
]);
