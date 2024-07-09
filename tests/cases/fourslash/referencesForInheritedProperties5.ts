/// <reference path='fourslash.ts'/>

//// interface interface1 extends interface1 {
////    /*1*/doStuff(): void;
////    /*2*/propName: string;
//// }
//// interface interface2 extends interface1 {
////    doStuff(): void;
////    propName: string;
//// }
////
//// var v: interface1;
//// v.propName;
//// v.doStuff();

verify.baselineFindAllReferences('1', '2')
