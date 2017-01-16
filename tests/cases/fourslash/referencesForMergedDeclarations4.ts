/// <reference path='fourslash.ts'/>

// class and instanciated module

////class [|testClass|] {
////    static staticMethod() { }
////    method() { }
////}
////
////module [|testClass|] {
////    export interface Bar {
////
////    }
////    export var s = 0;
////}
////
////var c1: [|testClass|];
////var c2: [|testClass|].Bar;
////[|testClass|].staticMethod();
////[|testClass|].prototype.method();
////[|testClass|].bind(this);
////[|testClass|].s;
////new [|testClass|]();

verify.rangesReferenceEachOther();
