/// <reference path='fourslash.ts' />

/////*interfaceFoo*/
////interface Foo {
////    /*propertybar*/
////    bar: any;
////
////    /*methodbaz*/
////    baz(message: any): void;
////
////    /*methodUnit*/
////    unit(): void;
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
////
/////*aliasBar*/
////type Bar = Foo & any;

verify.docCommentTemplateAt("interfaceFoo", /*expectedOffset*/ 3,
  "/** */");

verify.docCommentTemplateAt("propertybar", /*expectedOffset*/ 3,
  "/** */");

verify.docCommentTemplateAt("methodbaz", /*expectedOffset*/ 11,
   `/**
     * 
     * @param message
     */`);

verify.docCommentTemplateAt("methodUnit", /*expectedOffset*/ 3,
  "/** */");

verify.docCommentTemplateAt("enumStatus", /*expectedOffset*/ 3,
  "/** */");

verify.docCommentTemplateAt("memberOpen", /*expectedOffset*/ 3,
  "/** */");

verify.docCommentTemplateAt("memberClosed", /*expectedOffset*/ 3,
  "/** */");
