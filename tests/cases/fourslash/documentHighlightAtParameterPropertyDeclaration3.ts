/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
//// class Foo {
////     constructor(private [/*0*/privateParam]: number,
////         public [/*1*/publicParam]: string,
////         protected [/*2*/protectedParam]: boolean) {
//// 
////         let localPrivate = /*3*/privateParam;
////         this.privateParam += 10;  // this is not valid syntax
//// 
////         let localPublic = /*4*/publicParam;
////         this.publicParam += " Hello!";  // this is not valid syntax
//// 
////         let localProtected = /*5*/protectedParam;
////         this.protectedParam = false;  // this is not valid syntax
////     }
//// }

let markers = test.markers()
for (let marker of markers) {
    goTo.position(marker.position);
    verify.documentHighlightsAtPositionCount(2, ["file1.ts"]);
}