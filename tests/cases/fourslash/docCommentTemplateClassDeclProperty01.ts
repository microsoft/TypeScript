/// <reference path='fourslash.ts' />

const singleLineOffset = 3;
const multiLineOffset = 12;


////class C {
////    /** /*0*/  */
////    foo = (p0) => {
////        return p0;
////    };
////    /*1*/
////    bar = (p1) => {
////        return p1;
////    }
////}

verify.docCommentTemplateAt("0", multiLineOffset,
   `/**
     * 
     * @param p0
     */`);
verify.docCommentTemplateAt("1", multiLineOffset,
   `/**
     * 
     * @param p1
     */`);

