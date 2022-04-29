/// <reference path='fourslash.ts' />

////import {/*0*/
////    numbers as bn,/*1*/
////    list/*2*/
////} from '@bykov/basics';/*3*/

format.document();
goTo.marker("0"); verify.currentLineContentIs("import {");
goTo.marker("1"); verify.currentLineContentIs("    numbers as bn,");
goTo.marker("2"); verify.currentLineContentIs("    list");
goTo.marker("3"); verify.currentLineContentIs("} from '@bykov/basics';");