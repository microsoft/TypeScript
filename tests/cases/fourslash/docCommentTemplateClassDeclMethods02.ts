/// <reference path='fourslash.ts' />

const enum Indentation {
    Standard = 3,
    Indented = 12,
}

////class C {
////    /*0*/
////    [Symbol.iterator]() {
////        return undefined;
////    }
////    /*1*/
////    [1 + 2 + 3 + Math.rand()](x: number, y: string, z = true) { }
////}

verify.docCommentTemplateAt("0", Indentation.Standard,
"/** */");

verify.docCommentTemplateAt("1", Indentation.Indented,
   `/**
     * 
     * @param x
     * @param y
     * @param z
     */`);
