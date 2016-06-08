/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    let a = "dummy entry", b/*0*/, c = 0/*1*/;
////    export function function1() {
////        a = "dummy";
////        b = 0;
////    }
////}

verify.codeFixAtPosition({ span: { start: 0, end: 0 }, newText: "" });
