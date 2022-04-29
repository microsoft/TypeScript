/// <reference path='fourslash.ts' />

////if (true)
////if (true)/*parentOutsideBlock*/
////if (true) {
////if (true)/*directParent*/
////var x = 0/*innermost*/
////}


goTo.marker("innermost");
edit.insert(";");

// Adding semicolon should format the innermost statement
verify.currentLineContentIs('        var x = 0;');

// Also should format any parent statement that is terminated by the semicolon
goTo.marker("directParent");
verify.currentLineContentIs('    if (true)');

// But not parents that are not terminated by it
goTo.marker("parentOutsideBlock");
verify.currentLineContentIs('if (true)');
