/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|{| "isWriteAccess": true, "isDefinition": true |}__bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|__bar|];

verify.singleReferenceGroup("(method) Foo.__bar(): number");
