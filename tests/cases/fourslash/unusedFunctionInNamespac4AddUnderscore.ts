/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true
//// [| namespace Validation {
////    var function1 = function() {
////    }
////} |]

verify.rangeAfterCodeFix(`namespace Validation {
   var _function1 = function() {
   }
} `, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);
