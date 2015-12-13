/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class Foo {
////     constructor(private /*0*/privateParam: number,
////         public /*1*/publicParam: string,
////         protected /*2*/protectedParam: boolean) {
//// 
////         let localPrivate = /*3*/privateParam;
////         this./*4*/privateParam += 10;
//// 
////         let localPublic = /*5*/publicParam;
////         this./*6*/publicParam += " Hello!";
//// 
////         let localProtected = /*7*/protectedParam;
////         this./*8*/protectedParam = false;
////     }
//// }

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);
    verify.documentHighlightsAtPositionCount(3, ["file1.ts"]);
}