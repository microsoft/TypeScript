/// <reference path='fourslash.ts' />

////function f<A,B,C>/*1*/


function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 4);