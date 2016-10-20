/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    [|doStuff|]() { }
////    [|propName|]: string;
//// }
//// interface interface1 extends interface1 {
////    [|doStuff|](): void;
////    [|propName|]: string;
//// }
//// class class2 extends class1 implements interface1 {
////    [|doStuff|]() { }
////    [|propName|]: string;
//// }
////
//// var v: class2;
//// v.[|propName|];
//// v.[|doStuff|]();

const [r0, r1, r2, r3, r4, r5, r6, r7] = test.ranges();
verify.referencesOf(r0, [r0, r4, r7]);
verify.referencesOf(r1, [r1, r5, r6]);
verify.referencesOf(r2, [r2, r4, r7]);
verify.referencesOf(r3, [r3, r5, r6]);
const allDoStuff = [r0, r2, r4, r7];
verify.referencesOf(r4, allDoStuff);
const allPropName = [r1, r3, r5, r6];
verify.referencesOf(r5, allPropName);
verify.referencesOf(r6, allPropName);
verify.referencesOf(r7, allDoStuff);
