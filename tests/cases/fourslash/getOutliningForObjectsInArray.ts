/// <reference path="fourslash.ts"/>

////// objects in x should generate outlining spans that do not render in VS
//// const x =[| [
////     [|{ a: 0 }|],
////     [|{ b: 1 }|],
////     [|{ c: 2 }|]
//// ]|];
////
////// objects in y should generate outlining spans that render as expected
//// const y =[| [
////     [|{
////         a: 0
////     }|],
////     [|{
////         b: 1
////     }|],
////     [|{
////         c: 2
////     }|]
//// ]|];
////
////// same behavior for nested arrays
//// const w =[| [
////     [|[ a: 0 ]|],
////     [|[ b: 1 ]|],
////     [|[ c: 2 ]|]
//// ]|];
////
//// const z =[| [
////     [|[
////         a: 0
////     ]|],
////     [|[
////         b: 1
////     ]|],
////     [|[
////         c: 2
////     ]|]
//// ]|];

verify.outliningSpansInCurrentFile(test.ranges());