/// <reference path="fourslash.ts"/>
////var x = `sadasdasdasdasfegsfd
/////*1*/rasdesgeryt35t35y35 e4 ergt er 35t 3535 `;
////var y = `1${2}/*2*/3`;
////
/////*formatStart*/
////let z=    `foo`;/*3*/
////let w=  `bar${3}`;/*4*/
////String.raw
//// `template`;/*5*/
////String.raw`foo`;/*6*/
////String.raw  `bar${3}`;/*7*/
////`Write ${   JSON.stringify("")   } and ${    (765)   } and ${   346  }`;/*spaceInside*/
/////*formatEnd*/


goTo.marker("1");
edit.insert("\r\n"); // edit will trigger formatting - should succeeed

goTo.marker("2");
edit.insert("\r\n");
verify.indentationIs(0);
verify.currentLineContentIs("3`;")

format.selection("formatStart", "formatEnd");

goTo.marker("3");
verify.currentLineContentIs("let z = `foo`;");
goTo.marker("4");
verify.currentLineContentIs("let w = `bar${3}`;");

goTo.marker("5");
verify.currentLineContentIs("    `template`;");
goTo.marker("6");
verify.currentLineContentIs("String.raw`foo`;");
goTo.marker("7");
verify.currentLineContentIs("String.raw`bar${3}`;");

goTo.marker("spaceInside");
verify.currentLineContentIs('`Write ${JSON.stringify("")} and ${(765)} and ${346}`;');