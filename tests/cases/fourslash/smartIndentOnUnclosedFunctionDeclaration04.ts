/// <reference path='fourslash.ts' />

////function f<A,B,C>/*1*/(/*2*/a: A, /*3*/b:/*4*/B, c/*5*/, d: C/*6*/


function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 4);
verifyIndentationAfterNewLine("2", 4);
verifyIndentationAfterNewLine("3", 4);
verifyIndentationAfterNewLine("4", 8);
verifyIndentationAfterNewLine("5", 4);
verifyIndentationAfterNewLine("6", 4);