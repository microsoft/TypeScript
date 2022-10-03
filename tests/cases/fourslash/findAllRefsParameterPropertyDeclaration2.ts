/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(public /*0*/publicParam: number) {
////         let localPublic = /*1*/publicParam;
////         this./*2*/publicParam += 10;
////     }
//// }

verify.baselineFindAllReferences('0', '1', '2')
