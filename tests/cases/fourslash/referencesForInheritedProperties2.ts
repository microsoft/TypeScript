/// <reference path='fourslash.ts'/>

// extends statement in a diffrent declaration

////interface interface1 {
////    [|{| "isDefinition": true |}doStuff|](): void;
////}
////
////interface interface2 {
////    [|{| "isDefinition": true |}doStuff|](): void;
////}
////
////interface interface2 extends interface1 {
////}
////
////class class1 implements interface2 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() {
////
////    }
////}
////
////class class2 extends class1 {
////
////}
////
////var v: class2;
////v.[|doStuff|]();

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(ranges, [
    { definition: "(method) interface1.doStuff(): void", ranges: [r0] },
    { definition: "(method) interface2.doStuff(): void", ranges: [r1] },
    { definition: "(method) class1.doStuff(): void", ranges: [r2, r3] }
]);
