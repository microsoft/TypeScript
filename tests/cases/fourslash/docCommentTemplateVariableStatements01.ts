/// <reference path='fourslash.ts' />

/////*a*/
////var a = 10;
////
/////*b*/
////let b = "";
////
/////*c*/
////const c = 30;
////
/////*d*/
////let d = {
////    foo: 10,
////    bar: "20"
////};
////
/////*e*/
////let e = function e(x, y, z) {
////    return +(x + y + z);
////};
////
/////*f*/
////let f = class F {
////    constructor(a, b, c) {
////        this.a = a;
////        this.b = b || (this.c = c);
////    }
////}

for (const varName of ["a", "b", "c", "d"]) {
    verify.docCommentTemplateAt(varName, /*newTextOffset*/ 3,
        "/** */");
}

verify.docCommentTemplateAt("e", /*newTextOffset*/ 7,
`/**
 * 
 * @param x
 * @param y
 * @param z
 * @returns
 */`);

verify.docCommentTemplateAt("f", /*newTextOffset*/ 7,
`/**
 * 
 * @param a
 * @param b
 * @param c
 */`);
