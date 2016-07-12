/// <reference path='fourslash.ts'/>

// class and uninstanciated module

////class [|testClass|] {
////    static staticMethod() { }
////    method() { }
////}
////
////module [|testClass|] {
////    export interface Bar {
////
////    }
////}
////
////var c1: [|testClass|];
////var c2: [|testClass|].Bar;
////[|testClass|].staticMethod();
////[|testClass|].prototype.method();
////[|testClass|].bind(this);
////new [|testClass|]();

const [class0, module0, class1, module1, class2, class3, class4, class5] = test.ranges();
verify.rangesReferenceEachOther([module0, module1]);
verify.rangesReferenceEachOther([class0, class1, class2, class3, class4, class5]);
