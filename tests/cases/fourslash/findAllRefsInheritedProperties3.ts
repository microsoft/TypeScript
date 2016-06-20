/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////     [|doStuff|]() { }     // r0
////     [|propName|]: string; // r1
//// }
//// interface interface1 extends interface1 {
////     [|doStuff|](): void;   // r2
////     [|propName|]: string;  // r3
//// }
//// class class2 extends class1 implements interface1 {
////     [|doStuff|]() { }      // r4
////     [|propName|]: string;  // r5
//// }
//// 
//// var v: class2;
//// v.[|propName|];   // r6
//// v.[|doStuff|]();  // r7

const [r0, r1, r2, r3, r4, r5, r6, r7] = test.ranges();
verify.referencesOf(r0, [r0, r4, r7]);
verify.referencesOf(r1, [r1, r5, r6]);
verify.referencesOf(r2, [r2, r4, r7]);
verify.referencesOf(r3, [r3, r5, r6]);
verify.referencesOf(r4, [r0, r2, r4, r7]);
verify.referencesOf(r5, [r1, r3, r5, r6]);
verify.referencesOf(r6, [r1, r3, r5, r6]);
verify.referencesOf(r7, [r0, r2, r4, r7]);
