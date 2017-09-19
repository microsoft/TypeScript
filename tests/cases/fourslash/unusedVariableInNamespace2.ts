/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [|let a = "dummy entry", b, c = 0;|]
////    export function function1() {
////        use(a, c);
////    }
////}

verify.rangeAfterCodeFix(`let a = "dummy entry", c = 0;`);
