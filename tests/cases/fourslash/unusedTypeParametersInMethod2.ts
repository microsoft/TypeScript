/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// class C1 {
////    [|f1<T extends number, U>(a: U)|] {a;}
//// }

verify.codeFix({
    index: 0,
    description: "Remove declaration for: 'T'",
    newRangeContent: "f1<U>(a: U)",
});
