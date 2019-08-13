/// <reference path='fourslash.ts'/>

////class Foo {
////    [|public [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}___bar|]() { return 0; }|]
////}
////
////var x: Foo;
////x.[|___bar|];

verify.singleReferenceGroup("(method) Foo.___bar(): number", "___bar");
