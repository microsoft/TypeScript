/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
////var foo = /*1*/function /*2*/foo(a = /*3*/foo(), b = () => /*4*/foo) {
////    /*5*/foo(/*6*/foo, /*7*/foo);
////}

// @Filename: file2.ts
/////// <reference path="file1.ts" />
////foo();

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7');
