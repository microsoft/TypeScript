/// <reference path='fourslash.ts'/>

// References a class property using string index access

////class Foo {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}property|]: number;|]
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}method|](): void { }|]
////}
////
////var f: Foo;
////f["[|property|]"];
////f["[|method|]"];

verify.singleReferenceGroup("(property) Foo.property: number", "property");
verify.singleReferenceGroup("(method) Foo.method(): void", "method");
