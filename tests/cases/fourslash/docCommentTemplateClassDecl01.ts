/// <reference path='fourslash.ts' />

/////*decl*/class C {
////    private p;
////    constructor(a, b, c, d);
////    constructor(public a, private b, protected c, d, e?) {
////    }
////
////    foo();
////    foo(a?, b?, ...args) {
////    }
////}

verify.docCommentTemplateAt("decl", /*newTextOffset*/ 3,
"/** */");
