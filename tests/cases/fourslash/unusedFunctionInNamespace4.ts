/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true
//// [| namespace Validation {
////    var function1 = function() {
////    }
////} |]

verify.rangeAfterCodeFix(`namespace Validation {
}`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);
