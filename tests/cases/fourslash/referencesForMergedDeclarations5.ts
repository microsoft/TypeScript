/// <reference path='fourslash.ts'/>

////interface /*1*/Foo { }
////module /*2*/Foo { export interface Bar { } }
////function /*3*/Foo() { }
////
////export = /*4*/Foo;

verify.baselineFindAllReferences('1', '2', '3', '4')
