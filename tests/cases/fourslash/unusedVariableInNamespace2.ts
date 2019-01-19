/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [|let a = "dummy entry", b, c = 0;|]
////    export function function1() {
////        use(a, c);
////    }
////}

verify.codeFix({
    description: "Remove declaration for: 'b'",
    index: 0,
    newRangeContent: 'let a = "dummy entry", c = 0;',
});
