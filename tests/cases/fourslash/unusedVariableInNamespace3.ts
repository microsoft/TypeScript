/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [|let a = "dummy entry", b, c = 0;|]
////    export function function1() {
////        use(a, b);
////    }
////}

verify.rangeAfterCodeFix(`let a = "dummy entry", b;`);
