/// <reference path="fourslash.ts" />

////interface I {
////    /**/
////    foo: (a: number, b: string) => void;
////}

verify.docCommentTemplateAt("", 11,
   `/**
     * 
     * @param a
     * @param b
     * @returns
     */`);

verify.docCommentTemplateAt("", 11,
   `/**
     * 
     * @param a
     * @param b
     */`, { generateReturnInDocTemplate: false });
