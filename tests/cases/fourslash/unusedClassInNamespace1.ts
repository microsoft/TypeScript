/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////   class class1 {
////   }
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
