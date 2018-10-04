/// <reference path='fourslash.ts' />

//// interface I1 {
////     x: number;
//// }
//// interface I2 {
////     y: "𣋝ઢȴ¬⏊";
//// }
////
//// class C implements I1,I2 {[|
////     |]x: number;
//// }

verify.rangeAfterCodeFix(`
y: "𣋝ઢȴ¬⏊";
`);

verify.not.codeFixAvailable();
