/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// class C1 {
////    [|f1<T extends number, U>(a: U)|] {a;}
//// }

verify.codeFix({
    description: "Remove declaration for: 'T'",
    newRangeContent: "f1<U>(a: U)",
});
