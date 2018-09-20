/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|{| "isWriteAccess": true, "isDefinition": true |}doStuff|]() { }
////    [|{| "isDefinition": true |}propName|]: string;
//// }
////
//// var c: class1;
//// c.[|doStuff|]();
//// c.[|propName|];

const ranges = test.rangesByText();
const [r0, r1] = ranges.get("doStuff");
verify.singleReferenceGroup("(method) class1.doStuff(): void", ranges.get("doStuff"));
verify.singleReferenceGroup("(property) class1.propName: string", ranges.get("propName"));
