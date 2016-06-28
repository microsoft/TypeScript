/// <reference path="fourslash.ts"/>

////type Foo = {
////    (
////      call: any/*callAutoformat*/
/////*callIndent*/
////    ): void;
////    new (
////    constr: any/*constrAutoformat*/
/////*constrIndent*/
////    ): void;
////    method(
////       whatever: any/*methodAutoformat*/
/////*methodIndent*/
////    ): void;
////};

format.document();

goTo.marker("callAutoformat");
verify.currentLineContentIs("        call: any");
goTo.marker("callIndent");
verify.indentationIs(8);
goTo.marker("constrAutoformat");
verify.currentLineContentIs("        constr: any");
goTo.marker("constrIndent");
verify.indentationIs(8);
goTo.marker("methodAutoformat");
verify.currentLineContentIs("        whatever: any");
goTo.marker("methodIndent");
verify.indentationIs(8);