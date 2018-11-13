/// <reference path="fourslash.ts"/>

// objects in x should generate outlining spans that do not render in VS
//// const x =[| [
////     [|{ a: 0 }|],
////     [|{ b: 1 }|],
////     [|{ c: 2 }|]
//// ]|];
////
// objects in y should generate outlining spans that render as expected
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
// same behavior for nested arrays
//// const w =[| [
////     [|[ 0 ]|],
////     [|[ 1 ]|],
////     [|[ 2 ]|]
//// ]|];
////
//// const z =[| [
////     [|[
////         0
////     ]|],
////     [|[
////         1
////     ]|],
////     [|[
////         2
////     ]|]
//// ]|];
////
// multiple levels of nesting work as expected
//// const z =[| [
////     [|[
////         [|{ hello: 0 }|]
////     ]|],
////     [|[
////         [|{ hello: 3 }|]
////     ]|],
////     [|[
////         [|{ hello: 5 }|],
////         [|{ hello: 7 }|]
////     ]|]
//// ]|];

verify.outliningSpansInCurrentFile(test.ranges(), "code");