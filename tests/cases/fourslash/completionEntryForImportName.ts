///<reference path="fourslash.ts" />

////import /*1*/ /*2*/

verify.completions({ marker: "1", exact: undefined });
edit.insert('q');
verify.completions({ exact: undefined });
verifyIncompleteImportName();

goTo.marker('2');
edit.insert(" = ");
verifyIncompleteImportName();

goTo.marker("2");
edit.moveRight(" = ".length);
edit.insert("a.");
verifyIncompleteImportName();

function verifyIncompleteImportName() {
    verify.completions({ marker: "1", exact: undefined });
    verify.quickInfoIs("import q");
}