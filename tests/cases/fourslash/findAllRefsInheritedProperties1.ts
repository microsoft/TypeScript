/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}doStuff|]() { }|]
////    [|[|{| "isDefinition": true, "contextRangeIndex": 2 |}propName|]: string;|]
//// }
////
//// var v: class1;
//// v.[|doStuff|]();
//// v.[|propName|];

const [r0Def, r0, r1Def, r1, r2, r3] = test.ranges();
verify.singleReferenceGroup("(method) class1.doStuff(): void", [r0, r2]);
verify.singleReferenceGroup("(property) class1.propName: string", [r1, r3]);
