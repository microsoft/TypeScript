///<reference path="fourslash.ts" />

//// var x = class myClass {
////    getClassName (){
////        m/*1*/
////        my/*2*/
////        myClass/*3*/
////    }
//// }

goTo.marker("1");
verify.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");

goTo.marker("2");
verify.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");

goTo.marker("3");
verify.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");