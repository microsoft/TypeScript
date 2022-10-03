/// <reference path='fourslash.ts' />

/////** This comment should appear for foo*/
////function foo() {
////}
////foo/*3*/();
/////** This is comment for function signature*/
////function fooWithParameters(/** this is comment about a*/a: string,
////    /** this is comment for b*/
////    b: number) {
////    var d = /*7*/a;
////}
////fooWithParameters/*9*/("a",10);

// ambient declaration
/////**
////* Does something
////* @param a a string
////*/
////declare function fn(a: string);
////fn("hello");

verify.baselineCompletions()
