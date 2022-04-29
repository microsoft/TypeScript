/// <reference path="fourslash.ts" />

////switch (undefined)[| {
//// case 0:[|
////   console.log(1)
////   console.log(2)
////   break;
////   console.log(3);|]
//// case 1:[|
////   break;|]
//// case 2:[|
////   break;
////   console.log(3);|]
//// case 3:[|
////   console.log(4);|]
//// 
//// case 4:
//// case 5:
//// case 6:[|
////
////
////   console.log(5);|]
//// 
//// case 7:[| console.log(6);|]
////
//// case 8:[| [|{
////   console.log(8);
////   break;
//// }|]
//// console.log(8);|]
////
//// default:[|
////   console.log(7);
////   console.log(8);|]
////}|]

verify.outliningSpansInCurrentFile(test.ranges(), "code");
