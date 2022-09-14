/// <reference path='fourslash.ts' />

////1+ 2 .toString() +3/*1*/
////1+ 2. .toString() +3/*2*/
////1+ 2.0 .toString() +3/*3*/
////1+ (2) .toString() +3/*4*/
////1+ 2_000 .toString() +3/*5*/

format.document();

goTo.marker("1");
verify.currentLineContentIs("1 + 2 .toString() + 3");

goTo.marker("2");
verify.currentLineContentIs("1 + 2..toString() + 3");

goTo.marker("3");
verify.currentLineContentIs("1 + 2.0.toString() + 3");

goTo.marker("4");
verify.currentLineContentIs("1 + (2).toString() + 3");

goTo.marker("5");
verify.currentLineContentIs("1 + 2_000 .toString() + 3");
