/// <reference path='fourslash.ts'/>

////class Foo {
////    [|public [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}____bar|]() { return 0; }|]
////}
////
////var x: Foo;
////x.[|____bar|];

verify.singleReferenceGroup("(method) Foo.____bar(): number", "____bar");
