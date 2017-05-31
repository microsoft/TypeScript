///<reference path="fourslash.ts" />

//// var x = class myClass {
////    getClassName (){
////        m/*0*/
////    }
////    /*1*/
//// }

goTo.marker("0");
verify.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");

goTo.marker("1");
verify.not.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");