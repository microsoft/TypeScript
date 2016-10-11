/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true

//// [| namespace Validation {
////    class c1 {
////
////    }
////
////    export class c2 {
////
////    }
//// } |]

verify.codeFixAtPosition(`namespace Validation {
    export class c2 {
    }
}`);
