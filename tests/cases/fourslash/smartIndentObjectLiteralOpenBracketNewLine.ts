/// <reference path='fourslash.ts'/>

//// var a =
////     {/*1*/}
////
//// var b = {
////     outer:
////            {/*2*/}
//// }

function verifyIndentationAfterNewLine(marker: string, indentation: number): void {
    goTo.marker(marker);
    edit.insert("\n");
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 0);
verifyIndentationAfterNewLine("2", 4);