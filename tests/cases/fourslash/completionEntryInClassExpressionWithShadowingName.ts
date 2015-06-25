///<reference path="fourslash.ts" />

//// class myClass { /*0*/ }
//// /*1*/
//// var x = class myClass {
////    getClassName (){
////        m/*2*/
////    }
////    /*3*/
//// }

goTo.marker("0");
verify.completionListContains("myClass", "class myClass", /*documentation*/ undefined, "class");

goTo.marker("1");
verify.completionListContains("myClass", "class myClass", /*documentation*/ undefined, "class");

goTo.marker("2");
verify.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");

goTo.marker("3");
verify.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");
