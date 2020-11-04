/// <reference path="./fourslash.ts" />

////interface IFoo {
////    [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}a|]: string;|]
////}
////class C<T extends IFoo> {
////    method() {
////        var x: T = {
////            [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}a|]: ""|]
////        };
////        x.[|a|];
////    }
////}
////
////
////var x: IFoo = {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}a|]: "ss"|]
////};

verify.singleReferenceGroup("(property) IFoo.a: string", "a");
