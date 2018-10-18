/// <reference path='fourslash.ts'/>

////class Foo {
////    public [|{| "isWriteAccess": true, "isDefinition": true |}_bar|]() { return 0; }
////}
////
////var x: Foo;
////x.[|_bar|];

verify.singleReferenceGroup("(method) Foo._bar(): number");
