/// <reference path="fourslash.ts"/>
////var x = `sadasdasdasdasfegsfd
/////*1*/rasdesgeryt35t35y35 e4 ergt er 35t 3535 `;
////var y = `1${2}/*2*/3`;
////let z=    `foo`/*3*/
////let w=  `bar${3}`/*4*/
////String.raw
//// `template`/*5*/
////String.raw`foo`/*6*/
////String.raw  `bar${3}`/*7*/


goTo.marker("1");
edit.insert("\r\n"); // edit will trigger formatting - should succeeed

goTo.marker("2");
edit.insert("\r\n");
verify.indentationIs(0);
verify.currentLineContentIs("3`;")

goTo.marker("3");
edit.insert(";");
verify.currentLineContentIs("let z = `foo`;");
goTo.marker("4");
edit.insert(";");
verify.currentLineContentIs("let w = `bar${3}`;");

goTo.marker("5");
edit.insert(";");
verify.currentLineContentIs("    `template`;");
goTo.marker("6");
edit.insert(";");
verify.currentLineContentIs("String.raw `foo`;");
goTo.marker("7");
edit.insert(";");
verify.currentLineContentIs("String.raw `bar${3}`;");