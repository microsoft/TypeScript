/// <reference path='fourslash.ts'/>

////class Foo {
////    [|"[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}blah|]"() { return 0; }|]
////}
////
////var x: Foo;
////x.[|blah|];

verify.singleReferenceGroup('(method) Foo["blah"](): number', test.rangesByText().get("blah"));
