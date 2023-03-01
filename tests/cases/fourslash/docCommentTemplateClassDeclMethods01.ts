/// <reference path='fourslash.ts' />

const singleLineOffset = 3;
const multiLineOffset = 11;


////class C {
/////*0*/    /*1*/
////    foo();
////    /*2*/foo(a);
////    /*3*/foo(a, b);
////    /*4*/foo(a, {x: string}, [c]);
////    /*5*/foo(a?, b?, ...args) {
////    }
////}

verify.docCommentTemplateAt("0", singleLineOffset,
"/** */");


verify.docCommentTemplateAt("1", singleLineOffset,
"/** */");


verify.docCommentTemplateAt("2", multiLineOffset,
   `/**
     * 
     * @param a
     */
    `);

verify.docCommentTemplateAt("3", multiLineOffset,
   `/**
     * 
     * @param a
     * @param b
     */
    `);

verify.docCommentTemplateAt("4", multiLineOffset,
   `/**
     * 
     * @param a
     * @param param1
     * @param param2
     */
    `);

verify.docCommentTemplateAt("5", multiLineOffset,
    `/**
     * 
     * @param a
     * @param b
     * @param args
     */
    `);
