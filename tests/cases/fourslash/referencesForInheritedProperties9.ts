/// <reference path='fourslash.ts'/>

//// class D extends C {
////     [|prop1|]: string;
//// }
//// 
//// class C extends D {
////     [|prop1|]: string;
//// }
//// 
//// var c: C;
//// c.[|prop1|];

const [r0, r1, r2] = test.ranges();
verify.referencesOf(r0, [r0]);
verify.rangesReferenceEachOther([r1, r2]);
