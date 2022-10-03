/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(private /*1*/privateParam: number) {
////         let localPrivate = privateParam;
////         this.privateParam += 10;
////     }
//// }

verify.baselineFindAllReferences('1')
