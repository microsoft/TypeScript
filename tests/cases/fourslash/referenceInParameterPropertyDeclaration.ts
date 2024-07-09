/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class Foo {
////     constructor(private /*1*/privateParam: number,
////         public /*2*/publicParam: string,
////         protected /*3*/protectedParam: boolean) {
////
////         let localPrivate = privateParam;
////         this.privateParam += 10;
////
////         let localPublic = publicParam;
////         this.publicParam += " Hello!";
////
////         let localProtected = protectedParam;
////         this.protectedParam = false;
////     }
//// }

verify.baselineFindAllReferences('1', '2', '3')
