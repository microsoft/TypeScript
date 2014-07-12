/// <reference path='fourslash.ts' />

/////*1*/x= [];
////y = [
/////*2*/           1,
/////*3*/  2
/////*4*/ ];
////
////z = [[
/////*5*/  1,
/////*6*/             2
/////*7*/      ]  ];

format.document();
goTo.marker('1');
verify.currentLineContentIs("x = [];");
goTo.marker('2');
verify.currentLineContentIs("    1,");
goTo.marker('3');
verify.currentLineContentIs("    2");
goTo.marker('4');
verify.currentLineContentIs("];");
goTo.marker('5');
verify.currentLineContentIs("    1,");
goTo.marker('6');
verify.currentLineContentIs("    2");
goTo.marker('7');
verify.currentLineContentIs("]];");