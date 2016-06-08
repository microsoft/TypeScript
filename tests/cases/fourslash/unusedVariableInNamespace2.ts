/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    let a = "dummy entry"/*0*/, b/*1*/, c = 0;
////    export function function1() {
////        a = "dummy";
////        c++;
////    }
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
