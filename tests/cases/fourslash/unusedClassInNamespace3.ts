/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true
////namespace Validation {/*0*/
////    class c1 {
////
////   }/*1*/
////}

verify.codeFixAtPosition(`
namespace Validation {
}`);