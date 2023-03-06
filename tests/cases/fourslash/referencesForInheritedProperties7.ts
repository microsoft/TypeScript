/// <reference path='fourslash.ts'/>

//// class class1 extends class1 {
////    /*0*/doStuff() { }
////    /*1*/propName: string;
//// }
//// interface interface1 extends interface1 {
////    /*2*/doStuff(): void;
////    /*3*/propName: string;
//// }
//// class class2 extends class1 implements interface1 {
////    /*4*/doStuff() { }
////    /*5*/propName: string;
//// }
////
//// var v: class2;
//// v.doStuff();
//// v.propName;

verify.baselineFindAllReferences('0', '1', '2', '3', '4', '5')
