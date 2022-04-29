/// <reference path='fourslash.ts' />

////function f</*1*/A/*2*/,B/*3*/


function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 4);
verifyIndentationAfterNewLine("2", 4);
verifyIndentationAfterNewLine("3", 4);