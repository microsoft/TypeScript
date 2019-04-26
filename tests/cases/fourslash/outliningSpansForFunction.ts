/// <reference path="fourslash.ts"/>

////function f(x: number, y: number)[| {
////    return x + y;
////}|]
////
////function g[|(
////    x: number,
////    y: number,
////): number {
////    return x + y;
////}|]

verify.outliningSpansInCurrentFile(test.ranges());
