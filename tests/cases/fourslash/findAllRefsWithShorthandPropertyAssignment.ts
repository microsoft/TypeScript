/// <reference path='fourslash.ts'/>

//// var /*0*/name = "Foo";
////
//// var obj = { /*1*/name };
//// var obj1 = { /*2*/name: /*3*/name };
//// obj./*4*/name;

verify.baselineFindAllReferences('0', '3', '1', '2', '4')
