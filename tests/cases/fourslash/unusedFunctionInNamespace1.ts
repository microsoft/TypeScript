/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {/*0*/
////   function function1() {
////   }/*1*/
////}

verify.codeFixAtPosition(`
namespace greeter {
}`);
