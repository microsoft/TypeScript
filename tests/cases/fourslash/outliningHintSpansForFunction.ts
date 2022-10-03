/// <reference path="fourslash.ts"/>

////[|namespace NS {
////    [|function f(x: number, y: number) {
////        return x + y;
////    }|]
////
////    [|function g(
////        x: number,
////        y: number,
////    ): number {
////        return x + y;
////    }|]
////}|]

verify.outliningHintSpansInCurrentFile(test.ranges());
