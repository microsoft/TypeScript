/// <reference path='fourslash.ts' />

const multiLineOffset = 11;

////var x = {
////    /*0*/
////    foo() {
////        return undefined;
////    }
////
////    /*1*/
////    [1 + 2 + 3 + Math.rand()](x: number, y: string, z = true) { }
////
////    /*2*/
////    m1: function(a) {}
////
////    /*3*/
////    m2: (a: string, b: string) => {}
////}

verify.docCommentTemplateAt("0", multiLineOffset,
  `/**
     * 
     * @returns
     */`);

verify.docCommentTemplateAt("1", multiLineOffset,
   `/**
     * 
     * @param x
     * @param y
     * @param z
     */`);

verify.docCommentTemplateAt("2", multiLineOffset,
   `/**
     * 
     * @param a
     */`);

verify.docCommentTemplateAt("3", multiLineOffset,
   `/**
     * 
     * @param a
     * @param b
     */`);
