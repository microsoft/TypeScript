/// <reference path="./fourslash.ts" />

////interface IFoo {
////    [|a|]: string;
////}
////class C<T extends IFoo> {
////    method() {
////        var x: T = {
////            [|a|]: ""
////        };
////        x.[|a|];
////    }
////}
////
////
////var x: IFoo = {
////    [|a|]: "ss"
////};

verify.rangesReferenceEachOther();
