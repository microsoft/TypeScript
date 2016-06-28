/// <reference path='fourslash.ts'/>

//// class C extends D {
////     [|prop0|]: string;  // r0
////     [|prop1|]: number;  // r1
//// }
////
//// class D extends C {
////     [|prop0|]: string;  // r2
//// }
////
//// var d: D;
//// d.[|prop0|];  // r3
//// d.[|prop1|];  // r4

const [r0, r1, r2, r3, r4] = test.ranges();
verify.referencesOf(r0, [r0]);
verify.referencesOf(r1, [r1]);
verify.referencesOf(r2, [r2, r3]);
verify.referencesOf(r3, [r2, r3]);
verify.referencesOf(r4, []);
