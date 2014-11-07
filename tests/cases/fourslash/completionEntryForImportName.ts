///<reference path="fourslash.ts" />

////import /*1*/ /*2*/

goTo.marker('1');
verify.completionListIsEmpty();
edit.insert('q');
verify.completionListIsEmpty();
verifyIncompleteImportName();

goTo.marker('2');
edit.insert(" = ");
verifyIncompleteImportName();

goTo.marker("2");
edit.moveRight(" = ".length);
edit.insert("a.");
verifyIncompleteImportName();

function verifyIncompleteImportName() {
    goTo.marker('1');
    verify.completionListIsEmpty();
    verify.quickInfoIs("import q");
}