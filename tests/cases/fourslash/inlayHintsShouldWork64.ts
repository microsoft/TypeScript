/// <reference path="fourslash.ts" />

////function foo(
////    a: string,
////    b: undefined,
////    c: null,
////    d: boolean,
////    e: boolean,
////    f: number,
////    g: number,
////    h: number,
////    i: RegExp,
////    j: bigint,
////) {
////}
////
////foo(
////    "hello",
////    undefined,
////    null,
////    true,
////    false,
////    Infinity,
////    -Infinity,
////    NaN,
////    /hello/g,
////    123n,
////);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
