/// <reference path='fourslash.ts'/>

////class Foo {
////    [|public [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}__bar|]() { return 0; }|]
////}
////
////var x: Foo;
////x.[|__bar|];

verify.singleReferenceGroup("(method) Foo.__bar(): number", test.rangesByText().get("__bar"));
