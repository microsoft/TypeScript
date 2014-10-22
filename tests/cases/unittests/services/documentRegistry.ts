///<reference path='..\..\..\..\src\harness\harness.ts' />

describe("DocumentRegistry", () => {
    it("documents are shared between projects", () => {
        var documentRegistry = ts.createDocumentRegistry();
        var defaultCompilerOptions = ts.getDefaultCompilerOptions();

        var f1 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, TypeScript.ScriptSnapshot.fromString("var x = 1;"), "1", false);
        var f2 = documentRegistry.acquireDocument("file1.ts", defaultCompilerOptions, TypeScript.ScriptSnapshot.fromString("var x = 1;"), "1", false);

        assert(f1 === f2, "DocumentRegistry should return the same document for the same name");
    });

    it("documents are refreshed when settings in compilation settings affect syntax", () => {
        var documentRegistry = ts.createDocumentRegistry();
        var compilerOptions: ts.CompilerOptions = { target: ts.ScriptTarget.ES5, module: ts.ModuleKind.AMD };

        // change compilation setting that doesn't affect parsing - should have the same document
        compilerOptions.declaration = true;
        var f1 = documentRegistry.acquireDocument("file1.ts", compilerOptions, TypeScript.ScriptSnapshot.fromString("var x = 1;"), "1", false);
        compilerOptions.declaration = false;
        var f2 = documentRegistry.acquireDocument("file1.ts", compilerOptions, TypeScript.ScriptSnapshot.fromString("var x = 1;"), "1", false);

        assert(f1 === f2, "Expected to have the same document instance");


        // change value of compilation setting that is used during production of AST - new document is required
        compilerOptions.target = ts.ScriptTarget.ES3;
        var f3 = documentRegistry.acquireDocument("file1.ts", compilerOptions, TypeScript.ScriptSnapshot.fromString("var x = 1;"), "1", false);

        assert(f1 !== f3, "Changed target: Expected to have different instances of document");

        compilerOptions.module = ts.ModuleKind.CommonJS;
        var f4 = documentRegistry.acquireDocument("file1.ts", compilerOptions, TypeScript.ScriptSnapshot.fromString("var x = 1;"), "1", false);

        assert(f1 !== f4, "Changed module: Expected to have different instances of document");
    });
});