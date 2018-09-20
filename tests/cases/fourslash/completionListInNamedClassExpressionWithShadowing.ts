///<reference path="fourslash.ts" />

//// class myClass { /*0*/ }
//// /*1*/
//// var x = class myClass {
////    getClassName (){
////        m/*2*/
////    }
////    /*3*/
//// }
//// var y = class {
////    getSomeName() {
////        /*4*/
////    }
////    /*5*/
//// }

goTo.marker("0");
verify.not.completionListContains("myClass", "class myClass", /*documentation*/ undefined, "class");
verify.not.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");

goTo.marker("1");
verify.completionListContains("myClass", "class myClass", /*documentation*/ undefined, "class");
verify.not.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");

goTo.marker("2");
verify.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");
verify.not.completionListContains("myClass", "class myClass", /*documentation*/ undefined, "class");

goTo.marker("3");
verify.not.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");
verify.not.completionListContains("myClass", "class myClass", /*documentation*/ undefined, "class");

goTo.marker("4");
verify.completionListContains("myClass", "class myClass", /*documentation*/ undefined, "class");
verify.not.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");

goTo.marker("5");
verify.not.completionListContains("myClass", "class myClass", /*documentation*/ undefined, "class");
verify.not.completionListContains("myClass", "(local class) myClass", /*documentation*/ undefined, "local class");
