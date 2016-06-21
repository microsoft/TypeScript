/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    export interface interface2 {
////    }/*0*/
////    interface interface1 {
////    }/*1*/
////}

verify.codeFixAtPosition(`
namespace greeter {
    export interface interface2 {
    }
}`);
