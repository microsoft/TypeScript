/// <reference path='fourslash.ts' />

////        export class A {
////
////        }

format.document();
goTo.bof();
verify.currentLineContentIs("export class A {");
goTo.eof();
verify.currentLineContentIs("}");