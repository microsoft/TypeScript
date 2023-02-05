/// <reference path='fourslash.ts' />

/////*0*/
////function f1() {}

/////*1*/
////function f2() {
////    return 1;
////}

/////*2*/
////const f3 = () => 1;

/////*3*/
////const f3 = () => {
////    return 1;
////}

////class Foo {
////    /*4*/
////    m1() {}
////
////    /*5*/
////    m2() {
////       return 1;
////    }
////}

verify.docCommentTemplateAt("0", 3, "/** */");

verify.docCommentTemplateAt("1", 7,
   `/**
 * 
 * @returns
 */`);

verify.docCommentTemplateAt("2", 7,
   `/**
 * 
 * @returns
 */`);

verify.docCommentTemplateAt("3", 7,
   `/**
 * 
 * @returns
 */`);

verify.docCommentTemplateAt("4", 3, "/** */");


verify.docCommentTemplateAt("5", 11,
   `/**
     * 
     * @returns
     */`);
