/// <reference path='fourslash.ts'/>

////class Foo {
////    public "[|ss|]": any;
////}
////
////var x: Foo;
////x.[|ss|];
////x["[|ss|]"];
////x = { "[|ss|]": 0 };
////x = { [|ss|]: 0 };

verify.rangesReferenceEachOther();
