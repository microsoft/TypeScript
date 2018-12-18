/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [|let a = "dummy entry", b, c = 0;|]
////    export function function1() {
////        use(a, b);
////    }
////}

verify.codeFix({
    description: "Remove declaration for: 'c'",
    index: 0,
    newRangeContent: 'let a = "dummy entry", b;',
});
