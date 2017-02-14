/// <reference path='fourslash.ts'/>

////class Foo {
////    public _bar;
////    public [|{| "isWriteAccess": true, "isDefinition": true |}__bar|];
////    public ___bar;
////    public ____bar;
////}
////
////var x: Foo;
////x._bar;
////x.[|__bar|];
////x.___bar;
////x.____bar;

verify.singleReferenceGroup("(property) Foo.__bar: any");
