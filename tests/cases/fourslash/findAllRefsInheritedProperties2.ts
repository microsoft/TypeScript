/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    /*1*/doStuff(): void;   // r0
////    /*2*/propName: string;  // r1
//// }
////
//// var v: interface1;
//// v./*3*/doStuff();  // r2
//// v./*4*/propName;   // r3

verify.baselineFindAllReferences('1', '2', '3', '4');
