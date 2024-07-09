/// <reference path='fourslash.ts'/>

//// if /*1*/(true) { }
////
//// if (true) /*2*/ { /*3*/
//// } /*4*/
////
//// if (1 === /*5*/ 2) { }

function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 4);
verifyIndentationAfterNewLine("2", 0);
verifyIndentationAfterNewLine("3", 4);
verifyIndentationAfterNewLine("4", 0);
verifyIndentationAfterNewLine("5", 4);