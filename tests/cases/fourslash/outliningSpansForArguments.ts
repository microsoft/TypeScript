/// <reference path="fourslash.ts"/>

//// console.log(123, 456)l;
//// console.log(
//// );
//// console.log[|(
////     123, 456
//// )|];
//// console.log[|(
////     123,
////     456
//// )|];
//// () =>[| console.log[|(
////     123,
////     456
//// )|]|];

verify.outliningSpansInCurrentFile(test.ranges());
