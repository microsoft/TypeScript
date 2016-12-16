/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true

//// [| namespace Validation {
////    function function1() {
////    }
////} |]

verify.codeFixAtPosition(`namespace Validation {
}`);
