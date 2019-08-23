/// <reference path='fourslash.ts'/>

////class Foo {
////    [|"[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}blah|]"() { return 0; }|]
////}
////
////var x: Foo;
////x.[|blah|];

verify.singleReferenceGroup('(method) Foo["blah"](): number', "blah");
