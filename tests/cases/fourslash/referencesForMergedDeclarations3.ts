/// <reference path='fourslash.ts'/>

// class and uninstanciated module

////class testClass {
////    static staticMethod() { }
////    method() { }
////}
////
////module testClass {
////    export interface Bar {
////
////    }
////}
////
////var c1: /*class1*/testClass;
////var c2: /*module*/testClass.Bar;
/////*class2*/testClass.staticMethod();
/////*class3*/testClass.prototype.method();
/////*class4*/testClass.bind(this);
////new /*class5*/testClass();

goTo.marker("module");
verify.referencesCountIs(2);

goTo.marker("class1");
verify.referencesCountIs(6);

goTo.marker("class2");
verify.referencesCountIs(6);

goTo.marker("class3");
verify.referencesCountIs(6);

goTo.marker("class4");
verify.referencesCountIs(6);

goTo.marker("class5");
verify.referencesCountIs(6);