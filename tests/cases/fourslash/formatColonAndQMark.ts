/// <reference path='fourslash.ts' />

////class foo {/*1*/
////    constructor (n?: number, m = 5, o?: string) { }/*2*/
////    x:number = 1?2:3;/*3*/
////}/*4*/

format.document();
goTo.marker("1");
verify.currentLineContentIs("class foo {");
goTo.marker("2");
verify.currentLineContentIs("    constructor(n?: number, m = 5, o?: string) { }");
goTo.marker("3");
verify.currentLineContentIs("    x: number = 1 ? 2 : 3;");
goTo.marker("4");
verify.currentLineContentIs("}");