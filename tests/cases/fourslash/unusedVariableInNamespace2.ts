/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    let a = "dummy entry"/*0*/, b/*1*/, c = 0;
////    export function function1() {
////        a = "dummy";
////        c++;
////    }
////}

verify.codeFixAtPosition(`
namespace greeter {
    let a = "dummy entry", c = 0;
    export function function1() {
        a = "dummy";
        c++;
    }
}`);
