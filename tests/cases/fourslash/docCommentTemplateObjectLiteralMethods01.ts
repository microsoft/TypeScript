/// <reference path='fourslash.ts' />

const enum Indentation {
    Indented = 12,
}

////var x = {
////    /*0*/
////    foo() {
////        return undefined;
////    }
////    /*1*/
////    [1 + 2 + 3 + Math.rand()](x: number, y: string, z = true) { }
////}

verify.docCommentTemplateAt("0", Indentation.Indented,
   `/**
     * 
     */`);

verify.docCommentTemplateAt("1", Indentation.Indented,
   `/**
     * 
     * @param x
     * @param y
     * @param z
     */`);