/// <reference path='fourslash.ts' />

/////*a*/
////var a1 = 10, a2 = 20;
////
/////*b*/
////let b1 = "", b2 = true;
////
/////*c*/
////const c1 = 30, c2 = 40;
////
/////*d*/
////let d1 = function d(x, y, z) {
////    return +(x + y + z);
////}, d2 = 50;
////
/////*e*/
////let e1 = class E {
////    constructor(a, b, c) {
////        this.a = a;
////        this.b = b || (this.c = c);
////    }
////}, e2 = () => 100;
////
/////*f*/
////let f1 = {
////    foo: 10,
////    bar: "20"
////}, f2 = null;

for (const varName of ["a", "b", "c", "d", "e", "f"]) {
    verify.docCommentTemplateAt(varName, /*newTextOffset*/ 3,
        "/** */");
}
