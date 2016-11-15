/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// class A<T> {
////    public x: T;
//// }
//// [|var y: new <T,U>(a:T)=>void;|]

verify.rangeAfterCodeFix("var y: new <T>(a:T)=>void;");