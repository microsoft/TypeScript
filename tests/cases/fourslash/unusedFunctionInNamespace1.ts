/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   // some legit comments
////   function function1() {
////   }/*1*/
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
