/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
//// class A<T> {
////    public x: T;
//// }
//// [|var y: new <T,U>(a:T)=>void;|]

verify.codeFix({
    index: 0,
    description: "Remove declaration for: 'U'",
    newRangeContent: "var y: new <T>(a:T)=>void;",
});
