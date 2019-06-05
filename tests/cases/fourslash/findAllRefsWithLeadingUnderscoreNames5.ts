/// <reference path='fourslash.ts'/>

////class Foo {
////    public _bar;
////    public __bar;
////    [|public [|{| "isDefinition": true, "declarationRangeIndex": 0 |}___bar|];|]
////    public ____bar;
////}
////
////var x: Foo;
////x._bar;
////x.__bar;
////x.[|___bar|];
////x.____bar;

verify.singleReferenceGroup("(property) Foo.___bar: any", "___bar");
