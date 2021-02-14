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
    { description: "Implement required members of interface 'I1'" },
    { description: "Implement required members of interface 'I2'" },
    { description: "Implement all members of interface 'I1'" },
    { description: "Implement all members of interface 'I2'" }
]);
