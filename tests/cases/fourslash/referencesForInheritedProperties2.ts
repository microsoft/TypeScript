/// <reference path='fourslash.ts'/>

// extends statement in a diffrent declaration

////interface interface1 {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}doStuff|](): void;|]
////}
////
////interface interface2 {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 2 |}doStuff|](): void;|]
////}
////
////interface interface2 extends interface1 {
////}
////
////class class1 implements interface2 {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}doStuff|]() {
////
////    }|]
////}
////
////class class2 extends class1 {
////
////}
////
////var v: class2;
////v.[|doStuff|]();

const [r0Def, r0, r1Def, r1, r2Def, r2, r3] = test.ranges();
verify.referenceGroups([r0, r1, r2, r3], [
    { definition: "(method) interface1.doStuff(): void", ranges: [r0] },
    { definition: "(method) interface2.doStuff(): void", ranges: [r1] },
    { definition: "(method) class1.doStuff(): void", ranges: [r2, r3] }
]);
