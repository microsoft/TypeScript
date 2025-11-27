import * as ts from "../../_namespaces/ts.js";

describe("unittests:: services:: DocumentRegistry", () => {
    it("documents are shared between projects", () => {
        const documentRegistry = ts.createDocumentRegistry();
        const defaultCompilerOptions = ts.getDefaultCompilerOptions();

        const f1 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");
        const f2 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f1 === f2, "DocumentRegistry should return the same document for the same name");
    });

    it("documents are refreshed when settings in compilation settings affect syntax", () => {
        const documentRegistry = ts.createDocumentRegistry();
        const compilerOptions: ts.CompilerOptions = { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.AMD };

        // change compilation setting that doesn't affect parsing - should have the same document
        compilerOptions.declaration = true;
        const f1 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");
        compilerOptions.declaration = false;
        const f2 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f1 === f2, "Expected to have the same document instance");

        // change value of compilation setting that is used during production of AST - new document is required
        compilerOptions.target = ts.ScriptTarget.ESNext;
        const f3 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f1 !== f3, "Changed target: Expected to have different instances of document");

        compilerOptions.preserveConstEnums = true;
        const f4 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f3 === f4, "Changed preserveConstEnums: Expected to have the same instance of the document");

        compilerOptions.module = ts.ModuleKind.System;
        const f5 = documentRegistry.acquireDocument("file1.ts", compilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        assert(f4 !== f5, "Changed module: Expected to have different instances of the document");
    });

    it("Acquiring document gets correct version 1", () => {
        const documentRegistry = ts.createDocumentRegistry();
        const defaultCompilerOptions = ts.getDefaultCompilerOptions();

        // Simulate one LS getting the document.
        documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "1");

        // Simulate another LS getting the document at another version.
        const f2 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, ts.ScriptSnapshot.fromString("var x = 1;"), /* version */ "2");

        assert(f2.version === "2");
    });

    it("Acquiring document gets correct version 2", () => {
        const documentRegistry = ts.createDocumentRegistry();
        const defaultCompilerOptions = ts.getDefaultCompilerOptions();

        const contents = "var x = 1;";
        const snapshot = ts.ScriptSnapshot.fromString(contents);

        // Always treat any change as a full change.
        snapshot.getChangeRange = () => ts.createTextChangeRange(ts.createTextSpan(0, contents.length), contents.length);

        // Simulate one LS getting the document.
        documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, snapshot, /* version */ "1");

        // Simulate another LS getting that document.
        documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, snapshot, /* version */ "1");

        // Now LS1 updates their document.
        documentRegistry.updateDocument("file1.ts", defaultCompilerOptions, snapshot, /* version */ "2");

        // Now LS2 tries to update their document.
        documentRegistry.updateDocument("file1.ts", defaultCompilerOptions, snapshot, /* version */ "3");
    });
});
