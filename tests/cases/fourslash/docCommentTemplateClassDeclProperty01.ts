/// <reference path='fourslash.ts' />

const singleLineOffset = 3;
const multiLineOffset = 11;


////class C {
////    /** /*0*/  */
////    foo = (p0) => {
////        return p0;
////    };
////    /*1*/
////    bar = (p1) => {
////        return p1;
////    }
////    /*2*/
////    baz = function (p2, p3) {
////        return p2;
////    }
////}

verify.docCommentTemplateAt("0", multiLineOffset,
   `/**
     * 
     * @param p0
     * @returns
     */`);
verify.docCommentTemplateAt("1", multiLineOffset,
   `/**
     * 
     * @param p1
     * @returns
     */`);
verify.docCommentTemplateAt("2", multiLineOffset,
   `/**
     * 
     * @param p2
     * @param p3
     * @returns
     */`);
