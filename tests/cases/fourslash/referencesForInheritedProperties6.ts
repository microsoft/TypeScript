/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////    [|{| "isWriteAccess": true, "isDefinition": true |}propName|]: string;
//// }
//// class class2 extends class1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////    [|{| "isWriteAccess": true, "isDefinition": true |}propName|]: string;
//// }
////
//// var v: class2;
//// v.[|propName|];
//// v.[|doStuff|]();

const ranges = test.rangesByText();
const [m0, m1, m2] = ranges.get("doStuff");
verify.referenceGroups(m0, [{ definition: "(method) class1.doStuff(): void", ranges: [m0, m1, m2] }]);
verify.referenceGroups(m1, [
    { definition: "(method) class1.doStuff(): void", ranges: [m0] },
    { definition: "(method) class2.doStuff(): void", ranges: [m1, m2] }
]);
verify.referenceGroups(m2, [
    { definition: "(method) class1.doStuff(): void", ranges: [m0] },
    { definition: "(method) class2.doStuff(): void", ranges: [m1] },
    { definition: "(method) class2.doStuff(): void", ranges: [m2] }
]);
