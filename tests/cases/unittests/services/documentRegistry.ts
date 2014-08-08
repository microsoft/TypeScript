///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />
///<reference path='..\..\..\..\src\services\typescriptServices.ts' />

class TestSourceFile {
    constructor(
        public fileName: string,
        public version: number,
        public scriptSnapshot: TypeScript.IScriptSnapshot,
        public isOpen: boolean,
        public byteOrderMark: TypeScript.ByteOrderMark = TypeScript.ByteOrderMark.Utf8) {
    }
}

class TestHostSettings {
    constructor(
        public files: TypeScript.StringHashTable<TestSourceFile>,
        public compilationSettings: TypeScript.CompilationSettings = TypeScript.ImmutableCompilationSettings.defaultSettings().toCompilationSettings()) {
    }
}

describe("testDocumentRetrievalAndUpdate", () => {
    function getHost(settings: TestHostSettings): TypeScript.Services.ILanguageServiceHost {
        return {
            getCompilationSettings(): TypeScript.CompilationSettings {
                return settings.compilationSettings;
            },

            getScriptFileNames(): string[]{
                return settings.files.getAllKeys();
            },

            getScriptVersion(fileName: string): number {
                return settings.files.lookup(fileName).version;
            },

            getScriptIsOpen(fileName: string): boolean {
                return settings.files.lookup(fileName).isOpen;
            },

            getScriptByteOrderMark(fileName: string): TypeScript.ByteOrderMark {
                return settings.files.lookup(fileName).byteOrderMark;
            },

            getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot {
                return settings.files.lookup(fileName).scriptSnapshot;
            },

            getDiagnosticsObject(): TypeScript.Services.ILanguageServicesDiagnostics {
                throw TypeScript.Errors.notYetImplemented();
            },

            getLocalizedDiagnosticMessages(): any {
                return null;
            },

            information(): boolean {
                return false;
            },

            debug(): boolean {
                return false;
            },

            warning(): boolean {
                return false;
            },

            error(): boolean {
                return false;
            },

            fatal(): boolean {
                return false;
            },

            log(s: string): void {
            },

            resolveRelativePath(path: string, directory: string): string {
                throw TypeScript.Errors.notYetImplemented();
            },
            fileExists(path: string): boolean {
                throw TypeScript.Errors.notYetImplemented();
            },
            directoryExists(path: string): boolean {
                throw TypeScript.Errors.notYetImplemented();
            },
            getParentDirectory(path: string): string {
                throw TypeScript.Errors.notYetImplemented();
            },
            getCancellationToken(): TypeScript.ICancellationToken {
                return TypeScript.CancellationToken.None;
            }
        }
    }

    function getLanguageServiceCompiler(ls: TypeScript.Services.ILanguageService): TypeScript.Services.LanguageServiceCompiler {
        return <TypeScript.Services.LanguageServiceCompiler>(<any>ls).compiler
    }

    it("documents are shared between projects", () => {
        function ensureDocumentIsShared(prefix: string, ls1: TypeScript.Services.ILanguageService, ls2: TypeScript.Services.ILanguageService, fileName: string): void {
            var c1 = getLanguageServiceCompiler(ls1);
            var c2 = getLanguageServiceCompiler(ls2);
            // getDocument synchronized its internal state with host
            var doc1 = c1.getDocument(fileName);
            var doc2 = c2.getDocument(fileName);
            if (doc1 !== doc2) {
                throw new Error(prefix + ":document should be shared between language services");
            }
        }
        var files = new TypeScript.StringHashTable<TestSourceFile>();
        var f1 = new TestSourceFile("file1.ts", 1, TypeScript.ScriptSnapshot.fromString("var x = 1;"), false);
        files.add(f1.fileName, f1);
        var factory = new TypeScript.Services.TypeScriptServicesFactory();

        var hostSettings = new TestHostSettings(files);
        var ls1 = factory.createPullLanguageService(getHost(hostSettings));
        var ls2 = factory.createPullLanguageService(getHost(hostSettings));

        ensureDocumentIsShared("==1==", ls1, ls2, f1.fileName);

        f1.version = 2;
        f1.scriptSnapshot = TypeScript.ScriptSnapshot.fromString("var x = 2;");

        ensureDocumentIsShared("==2==", ls1, ls2, f1.fileName);
    });

    it("documents are refreshed when settings in compilation settings affect syntax", () => {
        var files = new TypeScript.StringHashTable<TestSourceFile>();
        var f1 = new TestSourceFile("file1.ts", 1, TypeScript.ScriptSnapshot.fromString("var x = 1;"), false);
        files.add(f1.fileName, f1);
        var factory = new TypeScript.Services.TypeScriptServicesFactory();

        var hostSettings = new TestHostSettings(files);

        var factory = new TypeScript.Services.TypeScriptServicesFactory();
        var ls = factory.createPullLanguageService(getHost(hostSettings));
        var compiler = getLanguageServiceCompiler(ls);

        var d1 = compiler.getDocument(f1.fileName);

        // change compilation setting that doesn't affect parsing - should have the same document
        hostSettings.compilationSettings.generateDeclarationFiles = !hostSettings.compilationSettings.generateDeclarationFiles;
        var d2 = compiler.getDocument(f1.fileName);

        if (d1 !== d2) {
            throw new Error("Expected to have the same document instance");
        }

        // change value of compilation setting that is used during production of AST - new document is required
        hostSettings.compilationSettings.codeGenTarget = TypeScript.LanguageVersion.EcmaScript5;
        var d3 = compiler.getDocument(f1.fileName);
        if (d2 === d3) {
            throw new Error("Changed codeGenTarget: Expected to have different instances of document");
        }

        hostSettings.compilationSettings.propagateEnumConstants = !hostSettings.compilationSettings.propagateEnumConstants;
        var d4 = compiler.getDocument(f1.fileName);
        if (d3 === d4) {
            throw new Error("Changed propagateEnumConstants: Expected to have different instances of document");
        }

        hostSettings.compilationSettings.allowAutomaticSemicolonInsertion = !hostSettings.compilationSettings.allowAutomaticSemicolonInsertion;
        var d5 = compiler.getDocument(f1.fileName);
        if (d4 === d5) {
            throw new Error("Changed allowAutomaticSemicolonInsertion: Expected to have different instances of document");
        }

    });
});