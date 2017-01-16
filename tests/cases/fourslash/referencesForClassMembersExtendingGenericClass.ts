/// <reference path='fourslash.ts'/>

////class Base<T> {
////    [|a|]: this;
////    [|method|]<U>(a?:T, b?:U): this { }
////}
////class MyClass extends Base<number> {
////    [|a|];
////    [|method|]() { }
////}
////
////var c: MyClass;
////c.[|a|];
////c.[|method|]();

verify.rangesWithSameTextReferenceEachOther();
