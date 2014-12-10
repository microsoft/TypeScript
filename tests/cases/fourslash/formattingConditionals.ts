/// <reference path='fourslash.ts' />


////var v =
/////*0*/a === b
/////*1*/? c
/////*2*/: d;

////var v = a === b
/////*3*/? c
/////*4*/: d;

function verifyLine(marker: string, content: string) {
    goTo.marker(marker);
    verify.currentLineContentIs(content);
}

format.document();
verifyLine("0", "    a === b");
verifyLine("1", "        ? c");
verifyLine("2", "        : d;");
verifyLine("3", "    ? c");
verifyLine("4", "    : d;");
