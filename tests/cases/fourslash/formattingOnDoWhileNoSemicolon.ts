/// <reference path='fourslash.ts' />

/////*2*/do {
/////*3*/    for (var i = 0; i < 10; i++)
/////*4*/        i -= 2
/////*5*/        }/*1*/while (1 !== 1)
goTo.marker("1");
edit.insert("\n");
verify.currentLineContentIs("while (1 !== 1)");
goTo.marker("2");
verify.currentLineContentIs("do {");
goTo.marker("3");
verify.currentLineContentIs("    for (var i = 0; i < 10; i++)");
goTo.marker("4");
verify.currentLineContentIs("        i -= 2");
goTo.marker("5");
//bug 718362 expected result : "}" , actual result : "        }"
//verify.currentLineContentIs("}");
verify.currentLineContentIs("}");