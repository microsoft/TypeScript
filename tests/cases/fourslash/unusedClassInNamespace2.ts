/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    export class class2 {
////    }/*0*/
////    class class1 {
////    }/*1*/
////}

verify.codeFixAtPosition(`
namespace greeter {
    export class class2 {
    }
}`);

