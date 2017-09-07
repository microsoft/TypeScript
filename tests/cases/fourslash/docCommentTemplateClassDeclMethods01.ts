/// <reference path='fourslash.ts' />

const enum Indentation {
    Standard = 8,
    Indented = 12,
}


////class C {
/////*0*/    /*1*/
////    foo();
////    /*2*/foo(a);
////    /*3*/foo(a, b);
////    /*4*/ foo(a, {x: string}, [c]);
////    /*5*/foo(a?, b?, ...args) {
////    }
////}

verify.docCommentTemplateAt("0", Indentation.Standard,
`/**
 * 
 */`);


verify.docCommentTemplateAt("1", Indentation.Indented,
   `/**
     * 
     */`);


verify.docCommentTemplateAt("2", Indentation.Indented,
   `/**
     * 
     * @param a
     */
    `);

verify.docCommentTemplateAt("3", Indentation.Indented,
   `/**
     * 
     * @param a
     * @param b
     */
    `);

verify.docCommentTemplateAt("4", Indentation.Indented,
   `/**
     * 
     * @param a
     * @param param1
     * @param param2
     */`);

verify.docCommentTemplateAt("5", Indentation.Indented, 
    `/**
     * 
     * @param a
     * @param b
     * @param args
     */
    `);
