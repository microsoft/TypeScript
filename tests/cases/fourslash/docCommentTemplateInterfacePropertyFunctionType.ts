/// <reference path="fourslash.ts" />

////interface I {
////    /**/
////    foo: (a: number, b: string) => void;
////}

verify.docCommentTemplateAt("", 12,
   `/**
     * 
     * @param a
     * @param b
     * @returns
     */`);

verify.docCommentTemplateAt("", 12,
   `/**
     * 
     * @param a
     * @param b
     */`, { generateReturnInDocTemplate: false });
