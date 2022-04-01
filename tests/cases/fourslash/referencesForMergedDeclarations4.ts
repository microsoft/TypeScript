/// <reference path='fourslash.ts'/>

// class and instantiated module

/////*1*/class /*2*/testClass {
////    static staticMethod() { }
////    method() { }
////}
////
/////*3*/module /*4*/testClass {
////    export interface Bar {
////
////    }
////    export var s = 0;
////}
////
////var c1: /*5*/testClass;
////var c2: /*6*/testClass.Bar;
/////*7*/testClass.staticMethod();
/////*8*/testClass.prototype.method();
/////*9*/testClass.bind(this);
/////*10*/testClass.s;
////new /*11*/testClass();

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11');
