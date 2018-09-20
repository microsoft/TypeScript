/// <reference path="./fourslash.ts" />

////interface IFoo {
////    [|{| "isDefinition": true |}a|]: string;
////}
////class C<T extends IFoo> {
////    method() {
////        var x: T = {
////            [|{| "isWriteAccess": true, "isDefinition": true |}a|]: ""
////        };
////        x.[|a|];
////    }
////}
////
////
////var x: IFoo = {
////    [|{| "isWriteAccess": true, "isDefinition": true |}a|]: "ss"
////};

verify.singleReferenceGroup("(property) IFoo.a: string");
