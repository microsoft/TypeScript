/// <reference path='fourslash.ts' />

////class C {
////    private p;
////    /*0*/
////    constructor(a, b, c, d);
////    /*1*/
////    constructor(public a, private b, protected c, d, e?) {
////    }
////
////    foo();
////    foo(a?, b?, ...args) {
////    }
////}

const newTextOffset = 11;
verify.docCommentTemplateAt("0", /*newTextOffset*/ newTextOffset,
   `/**
     * 
     * @param a
     * @param b
     * @param c
     * @param d
     */`);

verify.docCommentTemplateAt("1", /*newTextOffset*/ newTextOffset,
   `/**
     * 
     * @param a
     * @param b
     * @param c
     * @param d
     * @param e
     */`);
