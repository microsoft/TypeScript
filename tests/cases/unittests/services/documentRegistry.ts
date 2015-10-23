///<reference path='..\..\..\..\src\harness\harness.ts' />

describe("DocumentRegistry", () => {
    it("documents are shared between projects", () => {
        var documentRegistry = ts.createDocumentRegistry();
        var defaultCompilerOptions = ts.getDefaultCompilerOptions();

        var f1 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");
        var f2 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f1 === f2, "DocumentRegistry should return the same document for the same name");
    });

    it("documents are refreshed when settings in compilation settings affect syntax", () => {
        var documentRegistry = ts.createDocumentRegistry();
        var compilerOptions: ts.CompilerOptions = { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.AMD };

        // change compilation setting that doesn't affect parsing - should have the same document
        compilerOptions.declaration = true;
        var f1 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");
        compilerOptions.declaration = false;
        var f2 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f1 === f2, "Expected to have the same document instance");


        // change value of compilation setting that is used during production of AST - new document is required
        compilerOptions.target = ts.ScriptTarget.ES3;
        var f3 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f1 !== f3, "Changed target: Expected to have different instances of document");

        compilerOptions.preserveConstEnums = true;
        var f4 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f3 === f4, "Changed preserveConstEnums: Expected to have the same instance of the document");

        compilerOptions.module = ts.ModuleKind.System;
        var f5 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f4 !== f5, "Changed module: Expected to have different instances of the document");
    });

    it("Acquiring document gets correct version 1", () => {
        var documentRegistry = ts.createDocumentRegistry();
        var defaultCompilerOptions = ts.getDefaultCompilerOptions();

        // Simulate one LS getting the document.
        var f1 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        // Simulate another LS getting the document at another version.
        var f2 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "2");

        assert(f2.version === "2");
    });

    it("Acquiring document gets correct version 2", () => {
        var documentRegistry = ts.createDocumentRegistry();
        var defaultCompilerOptions = ts.getDefaultCompilerOptions();

        var contents = "var x = 1;"
        var snapshot = ts.ScriptSnapshot.fromString(contents);

        // Always treat any change as a full change.
        snapshot.getChangeRange = old => ts.createTextChangeRange(ts.createTextSpan(0, contents.length), contents.length);

        // Simulate one LS getting the document.
        var f1 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, snapshot, /* version */ "1");

        // Simulate another LS getting that document.
        var f2 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, snapshot, /* version */ "1");

        // Now LS1 updates their document.
        var f3 = documentRegistry.updateDocument("file1.ts", defaultCompilerOptions, snapshot, /* version */ "2");

        // Now LS2 tries to update their document.  
        var f4 = documentRegistry.updateDocument("file1.ts", defaultCompilerOptions, snapshot, /* version */ "3");
    });
});