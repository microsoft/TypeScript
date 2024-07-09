/// <reference path='fourslash.ts'/>

/////*1*/function /*2*/f(...rest: any[]) { }
/////*3*/f `${ /*4*/f } ${ /*5*/f }`

verify.baselineFindAllReferences('1', '2', '3', '4', '5');
