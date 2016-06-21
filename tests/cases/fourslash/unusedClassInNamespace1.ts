/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {/*0*/
////   class class1 {
////   }/*1*/
////}

verify.codeFixAtPosition(`
namespace greeter {
}`);
