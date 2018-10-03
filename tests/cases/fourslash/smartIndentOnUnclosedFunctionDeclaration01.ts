/// <reference path='fourslash.ts' />

////function /*1*/f/*2*/


function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 4);
verifyIndentationAfterNewLine("2", 4);