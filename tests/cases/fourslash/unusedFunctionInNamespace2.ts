/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////    export function function2() {
////    }
////    function function1() {
////    }
////} |]

verify.rangeAfterCodeFix(`namespace greeter {
    export function function2() {
    }
}`);
