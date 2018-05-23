/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     x: string;
//// }
////
//// class C implements I1,I2 {[| |]}

verify.codeFixAvailable([
    { description: "Implement interface 'I1'" },
    { description: "Implement interface 'I2'" },
]);
