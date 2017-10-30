/// <reference path='fourslash.ts' />

/////*interfaceFoo*/
////interface Foo {
////    /*propertybar*/
////    bar: any;
////
////    /*methodbaz*/
////    baz(message: any): void;
////}
////
/////*enumStatus*/
////const enum Status {
////    /*memberOpen*/
////    Open,
////
////    /*memberClosed*/
////    Closed
////}

verify.docCommentTemplateAt("interfaceFoo", /*expectedOffset*/ 8,
`/**
 * 
 */`);

verify.docCommentTemplateAt("propertybar", /*expectedOffset*/ 12,
   `/**
     * 
     */`);

verify.docCommentTemplateAt("methodbaz", /*expectedOffset*/ 12,
   `/**
     * 
     * @param message
     */`);

verify.docCommentTemplateAt("enumStatus", /*expectedOffset*/ 8,
`/**
 * 
 */`);

verify.docCommentTemplateAt("memberOpen", /*expectedOffset*/ 12,
   `/**
     * 
     */`);

verify.docCommentTemplateAt("memberClosed", /*expectedOffset*/ 12,
   `/**
     * 
     */`);