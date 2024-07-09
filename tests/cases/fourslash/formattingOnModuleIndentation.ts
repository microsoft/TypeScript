/// <reference path='fourslash.ts' />

////   module     Foo    {
////     export    module    A  .   B  .   C     {      }/**/
////                }

format.document();
goTo.bof();
verify.currentLineContentIs("module Foo {");
goTo.marker();
verify.currentLineContentIs("    export module A.B.C { }");
goTo.eof();
verify.currentLineContentIs("}");