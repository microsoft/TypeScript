/// <reference path='fourslash.ts' />

const multiLineOffset = 11;

////class C {
////    /*0*/
////    [Symbol.iterator]() {
////        return undefined;
////    }
////    /*1*/
////    [1 + 2 + 3 + Math.rand()](x: number, y: string, z = true) { }
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
