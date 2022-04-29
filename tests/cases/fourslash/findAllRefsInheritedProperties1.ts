/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    /*1*/doStuff() { }
////    /*2*/propName: string;
//// }
////
//// var v: class1;
//// v./*3*/doStuff();
//// v./*4*/propName;

verify.baselineFindAllReferences('1', '2', '3', '4');
