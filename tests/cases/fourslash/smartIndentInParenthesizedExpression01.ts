/// <reference path="fourslash.ts"/>

////var x = (/*1*/1/*2*/)/*3*/

function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\r\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 4);
verifyIndentationAfterNewLine("2", 4);
verifyIndentationAfterNewLine("3", 0);