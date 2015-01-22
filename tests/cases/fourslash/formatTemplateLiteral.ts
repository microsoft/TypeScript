/// <reference path="fourslash.ts"/>
////var x = `sadasdasdasdasfegsfd
/////*1*/rasdesgeryt35t35y35 e4 ergt er 35t 3535 `;
////var y = `1${2}/*2*/3`;


goTo.marker("1");
edit.insert("\r\n"); // edit will trigger formatting - should succeeed

goTo.marker("2");
edit.insert("\r\n");
verify.indentationIs(0);
verify.currentLineContentIs("3`;")