/// <reference path='fourslash.ts'/>
//// do /*1*/ {
//// } while (true)
////
//// do { /*2*/
//// } /*3*/while (true)/*4*/

function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\r\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 0);
verifyIndentationAfterNewLine("2", 4);
verifyIndentationAfterNewLine("3", 0);
verifyIndentationAfterNewLine("4", 0);
