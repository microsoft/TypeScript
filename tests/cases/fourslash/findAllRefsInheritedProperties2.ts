/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    [|doStuff|](): void;   // r0
////    [|propName|]: string;  // r1
//// }
////
//// var v: interface1;
//// v.[|doStuff|]();  // r2
//// v.[|propName|];   // r3

const [r0, r1, r2, r3] = test.ranges();
verify.referencesOf(r0, [r0, r2]);
verify.referencesOf(r1, [r1, r3]);
verify.referencesOf(r2, [r0, r2]);
verify.referencesOf(r3, [r1, r3]);
