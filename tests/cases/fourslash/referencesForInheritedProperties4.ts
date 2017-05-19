/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////    [|{| "isWriteAccess": true, "isDefinition": true |}propName|]: string;
//// }
////
//// var c: class1;
//// c.[|doStuff|]();
//// c.[|propName|];

const ranges = test.rangesByText();
const [r0, r1] = ranges.get("doStuff");
verify.referenceGroups(r0, [
    { definition: "(method) class1.doStuff(): void", ranges: [r0, r1] },
]);
verify.referenceGroups(r1, [
    { definition: "(method) class1.doStuff(): void", ranges: [r0] },
    { definition: "(method) class1.doStuff(): void", ranges: [r1] },
]);
verify.singleReferenceGroup("(property) class1.propName: string", ranges.get("propName"));
