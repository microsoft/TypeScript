/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}doStuff|]() { }|]
////    [|[|{| "isDefinition": true, "contextRangeIndex": 2 |}propName|]: string;|]
//// }
////
//// var c: class1;
//// c.[|doStuff|]();
//// c.[|propName|];

verify.singleReferenceGroup("(method) class1.doStuff(): void", "doStuff");
verify.singleReferenceGroup("(property) class1.propName: string", "propName");
