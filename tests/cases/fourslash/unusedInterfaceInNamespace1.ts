/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {/*0*/
////    interface interface1 {
////    }/*1*/
////}

verify.codeFixAtPosition(`
namespace greeter {
}`);
