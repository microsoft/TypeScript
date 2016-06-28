/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|doStuff|]() { }
////    [|propName|]: string;
//// }
////
//// var v: class1;
//// v.[|doStuff|]();
//// v.[|propName|];

const [r0, r1, r2, r3] = test.ranges();
verify.referencesOf(r0, [r0, r2]);
verify.referencesOf(r1, [r1, r3]);
verify.referencesOf(r2, [r0, r2]);
verify.referencesOf(r3, [r1, r3]);
