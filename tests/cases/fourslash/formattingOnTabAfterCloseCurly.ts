/// <reference path='fourslash.ts' />

////module Tools {/*1*/
////    export enum NodeType {/*2*/
////        Error,/*3*/
////        Comment,/*4*/
////    }   /*5*/
////    export enum foob/*6*/
////    {
////        Blah=1, Bleah=2/*7*/
////    }/*8*/
////}/*9*/

format.document();
goTo.marker("1");
verify.currentLineContentIs("module Tools {");
goTo.marker("2");
verify.currentLineContentIs("    export enum NodeType {");
goTo.marker("3");
verify.currentLineContentIs("        Error,");
goTo.marker("4");
verify.currentLineContentIs("        Comment,");
goTo.marker("5");
verify.currentLineContentIs("    }");
goTo.marker("6");
verify.currentLineContentIs("    export enum foob {");
goTo.marker("7");
verify.currentLineContentIs("        Blah = 1, Bleah = 2");
goTo.marker("8");
verify.currentLineContentIs("    }");
goTo.marker("9");
verify.currentLineContentIs("}");