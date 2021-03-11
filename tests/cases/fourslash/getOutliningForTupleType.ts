/// <reference path="fourslash.ts"/>

////type A =[| [
////    number,
////    number,
////    number
////]|]
////
////type B =[| [
////    [|[
////        [|[
////            number,
////            number,
////            number
////        ]|]
////    ]|]
////]|]

verify.outliningSpansInCurrentFile(test.ranges(), "code");
