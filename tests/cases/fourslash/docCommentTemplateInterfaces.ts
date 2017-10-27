/// <reference path='fourslash.ts' />

/////*interfaceFoo*/
////interface Foo {
////    /*propertybar*/
////    bar: any;
////
////    /*methodbaz*/
////    baz(message: any): void;
////}

verify.docCommentTemplateAt("interfaceFoo", /*expectedOffset*/ 8,
`/**
 * 
 */`);

verify.emptyDocCommentTemplateAt("propertybar");

verify.docCommentTemplateAt("methodbaz", /*expectedOffset*/ 12,
   `/**
     * 
     * @param message
     */`);