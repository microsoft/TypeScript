/// <reference path='fourslash.ts' />

////function f<A,B,C>/*1*/(/*2*/a: A, /*3*/b:/*4*/B, c/*5*/, d: C/*6*/


function verifyIndentationAfterNewLine(marker: string, indentation: number, positionWorkaround: number, expectedText: string): void {
    goTo.marker(marker);
    edit.insert("\n");
    // The next two lines are to workaround #13433
    goTo.position(positionWorkaround);
    verify.textAtCaretIs(expectedText);
    verify.indentationIs(indentation);
}

verifyIndentationAfterNewLine("1", 4, 24, '(');
verifyIndentationAfterNewLine("2", 8, 34, 'a');
verifyIndentationAfterNewLine("3", 8, 48, 'b');
verifyIndentationAfterNewLine("4", 12, 63, 'B');
verifyIndentationAfterNewLine("5", 8, 76, ',');
verifyIndentationAfterNewLine("6", 8, 83, '');
