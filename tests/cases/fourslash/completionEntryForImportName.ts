///<reference path="fourslash.ts" />

////import /*1*/q = /*2*/

verifyIncompleteImport();
goTo.marker('2');
edit.insert("a.");
verifyIncompleteImport();

function verifyIncompleteImport() {
    goTo.marker('1');
    verify.completionListIsEmpty();
    verify.quickInfoIs("import q");
}