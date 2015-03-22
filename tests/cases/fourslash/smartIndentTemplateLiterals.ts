/// <reference path="fourslash.ts"/>
////var x0 = `sadasdasdasdas/*1*/fegsfdrasdesgeryt35t35y35 e4 ergt er 35t 3535 `;
////var x1 = `sadasdasdasdas/*2*/fegsfdr${0}asdesgeryt35t35y35 e4 ergt er 35t 3535 `;
////var x2 = `sadasdasdasdasfegsfdra${0}sdesge/*3*/ryt35t35y35 e4 ergt er 35t 3535 `;
////var x3 = `sadasdasdasdasfegsfdra${0}sdesge/*4*/ryt35${1}t35y35 e4 ergt er 35t 3535 `;
////var x2 = `sadasdasdasdasfegsfdra${0}sdesge${1}sf/*5*/ryt35t35y35 e4 ergt er 35t 3535 `;

function verifyIndentation(marker: string): void {
	goTo.marker(marker);
	edit.insert("\r\n");
	verify.indentationIs(0);
}
verifyIndentation("1");
verifyIndentation("2");
verifyIndentation("3");
verifyIndentation("4");
verifyIndentation("5");
