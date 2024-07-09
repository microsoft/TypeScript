/// <reference path='fourslash.ts'/>

/////*1*/var /*2*/x = 10;
////var y = `${ /*3*/x } ${ /*4*/x }`

verify.baselineFindAllReferences('1', '2', '3', '4');
