/// <reference path='fourslash.ts' />

/////** This comment should appear for foo*/
////function f/*1*/oo() {
////}
////f/*2*/oo();
/////** This is comment for function signature*/
////function fo/*5*/oWithParameters(/** this is comment about a*/a: string,
////    /** this is comment for b*/
////    b: number) {
////    var /*6*/d = a;
////}
////fooWithParam/*8*/eters("a",10);

// ambient declaration
/////**
////* Does something
////* @param a a string
////*/
////declare function fn(a: string);
////fn("hello");

verify.baselineQuickInfo()
