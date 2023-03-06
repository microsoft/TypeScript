/// <reference path='fourslash.ts'/>

// Function overloads should be highlighted together.

/////*1*/function /*2*/foo(x: string);
/////*3*/function /*4*/foo(x: string, y: number) {
////    /*5*/foo('', 43);
////}

verify.baselineFindAllReferences('1', '2', '3', '4', '5');
