/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
// @noUnusedParameters:true

////namespace Validation {
////    class c1 {
////
////    }
////
////    export class c2 {
////
////    }/*0*/
////
////    class c3 extends c1 {
////
////    }/*1*/
////}

verify.codeFixAtPosition(`
namespace Validation {
    class c1 {
    }

    export class c2 {
    }
}`);
