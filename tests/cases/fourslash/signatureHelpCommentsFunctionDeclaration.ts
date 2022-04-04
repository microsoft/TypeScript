/// <reference path='fourslash.ts' />

/////** This comment should appear for foo*/
////function foo() {
////}
////foo(/*4*/);
/////** This is comment for function signature*/
////function fooWithParameters(/** this is comment about a*/a: string,
////    /** this is comment for b*/
////    b: number) {
////    var d = a;
////}
////fooWithParameters(/*10*/"a",/*11*/10);

// ambient declaration
/////**
////* Does something
////* @param a a string
////*/
////declare function fn(a: string);
////fn(/*12*/"hello");

verify.baselineSignatureHelp()
