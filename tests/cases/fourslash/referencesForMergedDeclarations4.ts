/// <reference path='fourslash.ts'/>

// class and instanciated module

////class testClass {
////    static staticMethod() { }
////    method() { }
////}
////
////module testClass {
////    export interface Bar {
////
////    }
////    export var s = 0;
////}
////
////var c1: /*1*/testClass;
////var c2: /*2*/testClass.Bar;
/////*3*/testClass.staticMethod();
/////*4*/testClass.prototype.method();
/////*5*/testClass.bind(this);
/////*6*/testClass.s;
////new /*7*/testClass();

// Instanciated Module and class intersect in the value space, so we consider them all one group
test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(9);
});
