/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    /*1*/doStuff(): void;
////    /*2*/propName: string;
//// }
////
//// var v: interface1;
//// v./*3*/propName;
//// v./*4*/doStuff();

verify.baselineFindAllReferences('1', '2', '3', '4');
