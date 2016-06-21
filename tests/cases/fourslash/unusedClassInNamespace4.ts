/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true

////namespace Validation {/*0*/
////    class c1 {
////
////    }/*1*/
////
////    export class c2 {
////
////    }
////}

verify.codeFixAtPosition(`
namespace Validation {
    export class c2 {
    }
}`);
