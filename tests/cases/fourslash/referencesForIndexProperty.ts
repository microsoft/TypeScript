/// <reference path='fourslash.ts'/>

// References a class property using string index access

////class Foo {
////    [|{| "isDefinition": true |}property|]: number;
////    [|{| "isWriteAccess": true, "isDefinition": true |}method|](): void { }
////}
////
////var f: Foo;
////f["[|property|]"];
////f["[|method|]"];

const ranges = test.rangesByText();
verify.singleReferenceGroup("(property) Foo.property: number", ranges.get("property"));
verify.singleReferenceGroup("(method) Foo.method(): void", ranges.get("method"));
