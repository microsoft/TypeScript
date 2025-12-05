/// <reference path='fourslash.ts' />

////   namespace     Foo    {
////     export    namespace    A  .   B  .   C     {      }/**/
////                }

format.document();
goTo.bof();
verify.currentLineContentIs("namespace Foo {");
goTo.marker();
verify.currentLineContentIs("    export namespace A.B.C { }");
goTo.eof();
verify.currentLineContentIs("}");