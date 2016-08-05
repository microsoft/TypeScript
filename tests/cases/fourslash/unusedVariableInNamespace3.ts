/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [|let a = "dummy entry", b, c = 0;|]
////    export function function1() {
////        a = "dummy";
////        b = 0;
////    }
////}

verify.codeFixAtPosition(`let a = "dummy entry", b;`);
