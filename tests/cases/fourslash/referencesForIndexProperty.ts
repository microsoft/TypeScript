/// <reference path='fourslash.ts'/>

// References a class property using string index access

////class Foo {
////    [|property|]: number;
////    [|method|](): void { }
////}
////
////var f: Foo;
////f["[|property|]"];
////f["[|method|]"];

verify.rangesWithSameTextReferenceEachOther();
