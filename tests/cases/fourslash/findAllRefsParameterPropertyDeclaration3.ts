/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected /*0*/protectedParam: number) {
////         let localProtected = /*1*/protectedParam;
////         this./*2*/protectedParam += 10;
////     }
//// }

verify.baselineFindAllReferences('0', '1', '2')
