/// <reference path='fourslash.ts'/>

// class and uninstantiated module

////[|class /*class*/[|testClass|] {
////    static staticMethod() { }
////    method() { }
////}|]
////
////[|module /*module*/[|testClass|] {
////    export interface Bar {
////
////    }
////}|]
////
////var c1: [|testClass|];
////var c2: [|testClass|].Bar;
////[|testClass|].staticMethod();
////[|testClass|].prototype.method();
////[|testClass|].bind(this);
////new [|testClass|]();

verify.baselineFindAllReferences('module', 'class')
