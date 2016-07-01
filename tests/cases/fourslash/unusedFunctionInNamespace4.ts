/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true
////namespace Validation {/*0*/
////    var function1 = function() {
////    }/*1*/
////}

verify.codeFixAtPosition(`
namespace Validation {
}`);
