/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true

//// [| namespace Validation {
////    function function1() {
////    }
////} |]

verify.rangeAfterCodeFix(`namespace Validation {
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
