/// <reference path='fourslash.ts'/>

// extends statement in a diffrent declaration

////interface interface1 {
////    /*1*/doStuff(): void;
////}
////
////interface interface2 {
////    /*2*/doStuff(): void;
////}
////
////interface interface2 extends interface1 {
////}
////
////class class1 implements interface2 {
////    /*3*/doStuff() {
////
////    }
////}
////
////class class2 extends class1 {
////
////}
////
////var v: class2;
////v./*4*/doStuff();

test.markers().forEach(m=> {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(4);
});
