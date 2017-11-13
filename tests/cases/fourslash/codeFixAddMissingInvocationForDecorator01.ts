/// <reference path='fourslash.ts' />

////declare function foo(): (...args: any[]) => void;
////class C {
////    [|@foo|]
////    bar() {
////
////    }
////}

verify.codeFix({
    description: "Call decorator expression.",
    newRangeContent: `@foo()`
});
