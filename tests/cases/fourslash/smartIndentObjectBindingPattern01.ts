/// <reference path="fourslash.ts"/>

////var /*1*/{/*2*/a,/*3*/b:/*4*/k,/*5*/

function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\r\n");
    verify.indentationIs(indentation);
}

// TODO (arozga): fix this.
// verifyIndentationAfterNewLine("1", 4);
verifyIndentationAfterNewLine("1", 0);
verifyIndentationAfterNewLine("2", 8);
verifyIndentationAfterNewLine("3", 8);
verifyIndentationAfterNewLine("4", 8);
verifyIndentationAfterNewLine("5", 8);