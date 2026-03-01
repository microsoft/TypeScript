/// <reference path='fourslash.ts' />

/////*0*/
////function f1(x: number, y: number) {
////    return 1;
////}

verify.docCommentTemplateAt("0", 7,
   `/**
 * 
 * @param x
 * @param y
 * @returns
 */`, { generateReturnInDocTemplate: true });

verify.docCommentTemplateAt("0", 7,
   `/**
 * 
 * @param x
 * @param y
 */`, { generateReturnInDocTemplate: false });
