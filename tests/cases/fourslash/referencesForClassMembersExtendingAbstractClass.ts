/// <reference path='fourslash.ts'/>

////abstract class Base {
////    abstract [|a|]: number;
////    abstract [|method|](): void;
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
