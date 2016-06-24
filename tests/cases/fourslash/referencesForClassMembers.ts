/// <reference path='fourslash.ts'/>

////class Base {
////    [|a|]: number;
////    [|method|](): void { }
////}
////class MyClass extends Base {
////    [|a|];
////    [|method|]() { }
////}
////
////var c: MyClass;
////c.[|a|];
////c.[|method|]();

verify.rangesWithSameTextReferenceEachOther();
