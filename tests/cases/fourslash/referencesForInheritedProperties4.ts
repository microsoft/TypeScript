/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    /*1*/doStuff() { }
////    /*2*/propName: string;
//// }
////
//// var c: class1;
//// c./*3*/doStuff();
//// c./*4*/propName;

verify.baselineFindAllReferences('1', '2', '3', '4');
