/// <reference path='fourslash.ts'/>

//// var a =/*1*/
////     {/*2*/}
////
//// var b = {
////     outer:/*3*/
////            {/*4*/}
//// }

function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 0);
verifyIndentationAfterNewLine("2", 4);
verifyIndentationAfterNewLine("3", 4);
verifyIndentationAfterNewLine("4", 8);
