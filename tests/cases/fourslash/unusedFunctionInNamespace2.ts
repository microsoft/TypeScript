/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    export function function2() {
////    }/*0*/
////    function function1() {
////    }/*1*/
////}

verify.codeFixAtPosition(`
namespace greeter {
    export function function2() {
    }
}`);
