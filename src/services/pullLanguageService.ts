/// <reference path='typescriptServices.ts' />

/// <reference path="..\compiler\types.ts"/>
/// <reference path="..\compiler\core.ts"/>
/// <reference path="..\compiler\scanner.ts"/>
/// <reference path="..\compiler\parser.ts"/>
/// <reference path="..\compiler\checker.ts"/>

module TypeScript.Services {
    // Information about a specific host file.
    class HostFileInformation {
        private _sourceText: TypeScript.IScriptSnapshot;

        constructor(
            public filename: string,
            private host: ILanguageServiceHost,
            public version: number,
            public isOpen: boolean,
            public byteOrderMark: TypeScript.ByteOrderMark) {
            this._sourceText = null;
        }

        public getScriptSnapshot(): TypeScript.IScriptSnapshot {
            if (this._sourceText === null) {
                this._sourceText = this.host.getScriptSnapshot(this.filename);
            }

            return this._sourceText;
        }
    }

    export function getDefaultCompilerOptions(): ts.CompilerOptions {
        // Set "ES5" target by default for language service
        return { target: ts.ScriptTarget.ES5 };
    }

    // Cache host information about scripts. Should be refreshed 
    // at each language service public entry point, since we don't know when 
    // set of scripts handled by the host changes.
    class HostCache {
        private _filenameToEntry: TypeScript.StringHashTable<HostFileInformation>;
        private _compilationSettings: ts.CompilerOptions;

        constructor(host: ILanguageServiceHost) {
            // script id => script index
            this._filenameToEntry = new TypeScript.StringHashTable<HostFileInformation>();

            var filenames = host.getScriptFileNames();
            for (var i = 0, n = filenames.length; i < n; i++) {
                var filename = filenames[i];
                this._filenameToEntry.add(TypeScript.switchToForwardSlashes(filename), new HostFileInformation(
                    filename, host, host.getScriptVersion(filename), host.getScriptIsOpen(filename), host.getScriptByteOrderMark(filename)));
            }

            this._compilationSettings = host.getCompilationSettings() || getDefaultCompilerOptions();
        }

        public compilationSettings() {
            return this._compilationSettings;
        }

        public contains(filename: string): boolean {
            return this._filenameToEntry.lookup(TypeScript.switchToForwardSlashes(filename)) !== null;
        }

        public getHostfilename(filename: string) {
            var hostCacheEntry = this._filenameToEntry.lookup(TypeScript.switchToForwardSlashes(filename));
            if (hostCacheEntry) {
                return hostCacheEntry.filename;
            }
            return filename;
        }

        public getfilenames(): string[] {
            return this._filenameToEntry.getAllKeys();
        }

        public getVersion(filename: string): number {
            return this._filenameToEntry.lookup(TypeScript.switchToForwardSlashes(filename)).version;
        }

        public isOpen(filename: string): boolean {
            return this._filenameToEntry.lookup(TypeScript.switchToForwardSlashes(filename)).isOpen;
        }

        public getByteOrderMark(filename: string): TypeScript.ByteOrderMark {
            return this._filenameToEntry.lookup(TypeScript.switchToForwardSlashes(filename)).byteOrderMark;
        }

        public getScriptSnapshot(filename: string): TypeScript.IScriptSnapshot {
            return this._filenameToEntry.lookup(TypeScript.switchToForwardSlashes(filename)).getScriptSnapshot();
        }

        public getScriptTextChangeRangeSinceVersion(filename: string, lastKnownVersion: number): TypeScript.TextChangeRange {
            var currentVersion = this.getVersion(filename);
            if (lastKnownVersion === currentVersion) {
                return TypeScript.TextChangeRange.unchanged; // "No changes"
            }

            var scriptSnapshot = this.getScriptSnapshot(filename);
            return scriptSnapshot.getTextChangeRangeSinceVersion(lastKnownVersion);
        }
    }

    export class SyntaxTreeCache {
        private _hostCache: HostCache;

        // For our syntactic only features, we also keep a cache of the syntax tree for the 
        // currently edited file.  
        private _currentfilename: string = "";
        private _currentFileVersion: number = -1;
        private _currentFileSyntaxTree: TypeScript.SyntaxTree = null;
        private _currentFileScriptSnapshot: TypeScript.IScriptSnapshot = null;

        constructor(private _host: ILanguageServiceHost) {
            this._hostCache = new HostCache(_host);
        }

        public getCurrentFileSyntaxTree(filename: string): TypeScript.SyntaxTree {
            this._hostCache = new HostCache(this._host);

            var version = this._hostCache.getVersion(filename);
            var syntaxTree: TypeScript.SyntaxTree = null;

            if (this._currentFileSyntaxTree === null || this._currentfilename !== filename) {
                var scriptSnapshot = this._hostCache.getScriptSnapshot(filename);
                syntaxTree = this.createSyntaxTree(filename, scriptSnapshot);
            }
            else if (this._currentFileVersion !== version) {
                var scriptSnapshot = this._hostCache.getScriptSnapshot(filename);
                syntaxTree = this.updateSyntaxTree(filename, scriptSnapshot, this._currentFileSyntaxTree, this._currentFileVersion);
            }

            if (syntaxTree !== null) {
                // All done, ensure state is up to date
                this._currentFileScriptSnapshot = scriptSnapshot;
                this._currentFileVersion = version;
                this._currentfilename = filename;
                this._currentFileSyntaxTree = syntaxTree;
            }

            return this._currentFileSyntaxTree;
        }

        public getCurrentScriptSnapshot(filename: string): IScriptSnapshot {
            // update _currentFileScriptSnapshot as a part of 'getCurrentFileSyntaxTree' call
            this.getCurrentFileSyntaxTree(filename);
            return this._currentFileScriptSnapshot;
        }

        private createSyntaxTree(filename: string, scriptSnapshot: TypeScript.IScriptSnapshot): TypeScript.SyntaxTree {
            var text = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);

            // For the purposes of features that use this syntax tree, we can just use the default
            // compilation settings.  The features only use the syntax (and not the diagnostics),
            // and the syntax isn't affected by the compilation settings.
            var syntaxTree = TypeScript.Parser.parse(filename, text, getDefaultCompilerOptions().target, TypeScript.isDTSFile(filename));

            return syntaxTree;
        }

        private updateSyntaxTree(filename: string, scriptSnapshot: TypeScript.IScriptSnapshot, previousSyntaxTree: TypeScript.SyntaxTree, previousFileVersion: number): TypeScript.SyntaxTree {
            var editRange = this._hostCache.getScriptTextChangeRangeSinceVersion(filename, previousFileVersion);

            // Debug.assert(newLength >= 0);

            // The host considers the entire buffer changed.  So parse a completely new tree.
            if (editRange === null) {
                return this.createSyntaxTree(filename, scriptSnapshot);
            }

            var nextSyntaxTree = IncrementalParser.parse(
                previousSyntaxTree, editRange, SimpleText.fromScriptSnapshot(scriptSnapshot));

            this.ensureInvariants(filename, editRange, nextSyntaxTree, this._currentFileScriptSnapshot, scriptSnapshot);

            return nextSyntaxTree;
        }

        private ensureInvariants(filename: string, editRange: TypeScript.TextChangeRange, incrementalTree: TypeScript.SyntaxTree, oldScriptSnapshot: TypeScript.IScriptSnapshot, newScriptSnapshot: TypeScript.IScriptSnapshot) {
            // First, verify that the edit range and the script snapshots make sense.

            // If this fires, then the edit range is completely bogus.  Somehow the lengths of the
            // old snapshot, the change range and the new snapshot aren't in sync.  This is very
            // bad.
            var expectedNewLength = oldScriptSnapshot.getLength() - editRange.span().length() + editRange.newLength();
            var actualNewLength = newScriptSnapshot.getLength();

            function provideMoreDebugInfo() {

                var debugInformation = ["expected length:", expectedNewLength, "and actual length:", actualNewLength, "are not equal\r\n"];

                var oldSpan = editRange.span();

                function prettyPrintString(s: string): string {
                    return '"' + s.replace(/\r/g, '\\r').replace(/\n/g, '\\n') + '"';
                }

                debugInformation.push('Edit range (old text) (start: ' + oldSpan.start() + ', end: ' + oldSpan.end() + ') \r\n');
                debugInformation.push('Old text edit range contents: ' + prettyPrintString(oldScriptSnapshot.getText(oldSpan.start(), oldSpan.end())));

                var newSpan = editRange.newSpan();

                debugInformation.push('Edit range (new text) (start: ' + newSpan.start() + ', end: ' + newSpan.end() + ') \r\n');
                debugInformation.push('New text edit range contents: ' + prettyPrintString(newScriptSnapshot.getText(newSpan.start(), newSpan.end())));

                return debugInformation.join(' ');
            }

            Debug.assert(
                expectedNewLength === actualNewLength,
                "Expected length is different from actual!",
                provideMoreDebugInfo);

            if (Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
                // If this fires, the text change range is bogus.  It says the change starts at point 
                // 'X', but we can see a text difference *before* that point.
                var oldPrefixText = oldScriptSnapshot.getText(0, editRange.span().start());
                var newPrefixText = newScriptSnapshot.getText(0, editRange.span().start());
                Debug.assert(oldPrefixText === newPrefixText, 'Expected equal prefix texts!');

                // If this fires, the text change range is bogus.  It says the change goes only up to
                // point 'X', but we can see a text difference *after* that point.
                var oldSuffixText = oldScriptSnapshot.getText(editRange.span().end(), oldScriptSnapshot.getLength());
                var newSuffixText = newScriptSnapshot.getText(editRange.newSpan().end(), newScriptSnapshot.getLength());
                Debug.assert(oldSuffixText === newSuffixText, 'Expected equal suffix texts!');

                // Ok, text change range and script snapshots look ok.  Let's verify that our 
                // incremental parsing worked properly.
                //var normalTree = this.createSyntaxTree(filename, newScriptSnapshot);
                //Debug.assert(normalTree.structuralEquals(incrementalTree), 'Expected equal incremental and normal trees');

                // Ok, the trees looked good.  So at least our incremental parser agrees with the 
                // normal parser.  Now, verify that the incremental tree matches the contents of the 
                // script snapshot.
                var incrementalTreeText = fullText(incrementalTree.sourceUnit());
                var actualSnapshotText = newScriptSnapshot.getText(0, newScriptSnapshot.getLength());
                Debug.assert(incrementalTreeText === actualSnapshotText, 'Expected full texts to be equal');
            }
        }
    }

    class FormattingOptions {
        constructor(public useTabs: boolean,
            public spacesPerTab: number,
            public indentSpaces: number,
            public newLineCharacter: string) {
        }

        public static defaultOptions = new FormattingOptions(/*useTabs:*/ false, /*spacesPerTab:*/ 4, /*indentSpaces:*/ 4, /*newLineCharacter*/ "\r\n");
    }

    class DocumentRegistryEntry {
        public refCount: number = 0;
        public owners: string[] = [];
        constructor(public document: Document) {
        }
    }

    export interface IDocumentRegistry {
        acquireDocument(
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            byteOrderMark: ByteOrderMark,
            version: number,
            isOpen: boolean,
            referencedFiles: string[]): TypeScript.Document;

        updateDocument(
            document: Document,
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: number,
            isOpen: boolean,
            textChangeRange: TextChangeRange
            ): TypeScript.Document;

        releaseDocument(filename: string, compilationSettings: ts.CompilerOptions): void
    }

    export class NonCachingDocumentRegistry implements IDocumentRegistry {

        public static Instance: IDocumentRegistry = new NonCachingDocumentRegistry();

        public acquireDocument(
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            byteOrderMark: ByteOrderMark,
            version: number,
            isOpen: boolean,
            referencedFiles: string[]= []): TypeScript.Document {
            return Document.create(compilationSettings, filename, scriptSnapshot, byteOrderMark, version, isOpen, referencedFiles);
        }

        public updateDocument(
            document: Document,
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: number,
            isOpen: boolean,
            textChangeRange: TextChangeRange
            ): TypeScript.Document {
            return document.update(scriptSnapshot, version, isOpen, textChangeRange);
        }

        public releaseDocument(filename: string, compilationSettings: ts.CompilerOptions): void {
            // no op since this class doesn't cache anything
        }
    }

    export class DocumentRegistry implements IDocumentRegistry {
        private buckets: IIndexable<StringHashTable<DocumentRegistryEntry>> = {};

        private getKeyFromCompilationSettings(settings: ts.CompilerOptions): string {
            return "_" + ts.ScriptTarget[settings.target]; //  + "|" + settings.propagateEnumConstants.toString()
        }

        private getBucketForCompilationSettings(settings: ts.CompilerOptions, createIfMissing: boolean): StringHashTable<DocumentRegistryEntry> {
            var key = this.getKeyFromCompilationSettings(settings);
            var bucket = this.buckets[key];
            if (!bucket && createIfMissing) {
                this.buckets[key] = bucket = new StringHashTable<DocumentRegistryEntry>();
            }
            return bucket;
        }

        public reportStats() {
            var bucketInfoArray = Object.keys(this.buckets).filter(name => name && name.charAt(0) === '_').map(name => {
                var entries = this.buckets[name];
                var documents = entries.getAllKeys().map((name) => {
                    var entry = entries.lookup(name);
                    return {
                        name: name,
                        refCount: entry.refCount,
                        references: entry.owners.slice(0)
                    };
                });
                documents.sort((x, y) => y.refCount - x.refCount);
                return { bucket: name, documents: documents }
            });
            return JSON.stringify(bucketInfoArray, null, 2);
        }

        public acquireDocument(
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            byteOrderMark: ByteOrderMark,
            version: number,
            isOpen: boolean,
            referencedFiles: string[]= []): TypeScript.Document {

            var bucket = this.getBucketForCompilationSettings(compilationSettings, /*createIfMissing*/ true);
            var entry = bucket.lookup(filename);
            if (!entry) {
                var document = Document.create(compilationSettings, filename, scriptSnapshot, byteOrderMark, version, isOpen, referencedFiles);

                entry = new DocumentRegistryEntry(document);
                bucket.add(filename, entry);
            }
            entry.refCount++;

            return entry.document;
        }

        public updateDocument(
            document: Document,
            filename: string,
            compilationSettings: ts.CompilerOptions,
            scriptSnapshot: IScriptSnapshot,
            version: number,
            isOpen: boolean,
            textChangeRange: TextChangeRange
            ): TypeScript.Document {

            var bucket = this.getBucketForCompilationSettings(compilationSettings, /*createIfMissing*/ false);
            Debug.assert(bucket);
            var entry = bucket.lookup(filename);
            Debug.assert(entry);

            if (entry.document.isOpen === isOpen && entry.document.version === version) {
                return entry.document;
            }

            entry.document = entry.document.update(scriptSnapshot, version, isOpen, textChangeRange);
            return entry.document;
        }

        public releaseDocument(filename: string, compilationSettings: ts.CompilerOptions): void {
            var bucket = this.getBucketForCompilationSettings(compilationSettings, false);
            Debug.assert(bucket);

            var entry = bucket.lookup(filename);
            entry.refCount--;

            Debug.assert(entry.refCount >= 0);
            if (entry.refCount === 0) {
                bucket.remove(filename);
            }
        }
    }

    export class LanguageService implements ILanguageService {
        private logger: TypeScript.ILogger;
        private _syntaxTreeCache: SyntaxTreeCache;
        private formattingRulesProvider: Formatting.RulesProvider;

        // A cache of all the information about the files on the host side.
        private hostCache: HostCache = null;
        private program: ts.Program;
        private typeChecker: ts.TypeChecker;
        private useCaseSensitivefilenames = false;
        private documentsByName: ts.Map<Document> = {};
        private documentRegistry: IDocumentRegistry
        private cancellationToken: CancellationToken;

        constructor(public host: ILanguageServiceHost, documentRegistry: IDocumentRegistry) {
            this.logger = this.host;
            this.cancellationToken = new CancellationToken(this.host.getCancellationToken());
            this.documentRegistry = documentRegistry;
            this._syntaxTreeCache = new SyntaxTreeCache(this.host);

            // Check if the localized messages json is set, otherwise query the host for it
            if (!TypeScript.LocalizedDiagnosticMessages) {
                TypeScript.LocalizedDiagnosticMessages = this.host.getLocalizedDiagnosticMessages();
            }
        }

        private createCompilerHost(): ts.CompilerHost {
            return {
                getSourceFile: (filename, languageVersion) => {
                    var document = this.documentsByName[filename];

                    Debug.assert(!!document, "document can not be undefined");

                    return document.sourceFile();
                },
                getCancellationToken: () => this.cancellationToken,
                getCanonicalFileName: (filename) => this.useCaseSensitivefilenames ? filename : filename.toLowerCase(),
                useCaseSensitiveFileNames: () => this.useCaseSensitivefilenames,
                // Need something that doesn't depend on sys.ts here
                getDefaultLibFilename: (): string => {
                    throw Error("TOD:: getDefaultLibfilename");
                },
                writeFile: (filename, data) => {
                    throw Error("TODO: write file");
                },
                getCurrentDirectory: (): string => {
                    throw Error("TODO: getCurrentDirectory");
                }
            };
        }

        private synchronizeHostData(): void {
            // Reset the cache at start of every refresh
            this.hostCache = new HostCache(this.host);

            var compilationSettings = this.hostCache.compilationSettings();

            // TODO: check if we need to create a new compiler to start with
            //       1. files are identical
            //       2. compilation settings are identical

            // Now, remove any files from the compiler that are no longer in the host.
            var oldDocumentsByName = this.documentsByName;
            this.documentsByName = {};

            var oldProgram = this.program;
            if (oldProgram) {
                var oldSettings = this.program.getCompilerOptions();
                var changesInCompilationSettingsAffectSyntax =
                    oldSettings && compilationSettings && !compareDataObjects(oldSettings, compilationSettings) && settingsChangeAffectsSyntax(oldSettings, compilationSettings);
                var oldSourceFiles = this.program.getSourceFiles();

                for (var i = 0, n = oldSourceFiles.length; i < n; i++) {
                    this.cancellationToken.throwIfCancellationRequested();
                    var filename = oldSourceFiles[i].filename;
                    if (!this.hostCache.contains(filename) || changesInCompilationSettingsAffectSyntax) {
                        this.documentRegistry.releaseDocument(filename, oldSettings);
                    }
                }
            }

            // Now, for every file the host knows about, either add the file (if the compiler
            // doesn't know about it.).  Or notify the compiler about any changes (if it does
            // know about it.)
            var hostfilenames = this.hostCache.getfilenames();

            for (var i = 0, n = hostfilenames.length; i < n; i++) {
                var filename = hostfilenames[i];

                var version = this.hostCache.getVersion(filename);
                var isOpen = this.hostCache.isOpen(filename);
                var scriptSnapshot = this.hostCache.getScriptSnapshot(filename);

                var document: Document = oldDocumentsByName[filename];
                if (document) {
                    //
                    // If the document is the same, assume no update
                    //
                    if (document.version === version && document.isOpen === isOpen) {
                        continue;
                    }

                    // Only perform incremental parsing on open files that are being edited.  If a file was
                    // open, but is now closed, we want to reparse entirely so we don't have any tokens that
                    // are holding onto expensive script snapshot instances on the host.  Similarly, if a 
                    // file was closed, then we always want to reparse.  This is so our tree doesn't keep 
                    // the old buffer alive that represented the file on disk (as the host has moved to a 
                    // new text buffer).
                    var textChangeRange: TextChangeRange = null;
                    if (document.isOpen && isOpen) {
                        textChangeRange = this.hostCache.getScriptTextChangeRangeSinceVersion(filename, document.version);
                    }

                    document = this.documentRegistry.updateDocument(document, filename, compilationSettings, scriptSnapshot, version, isOpen, textChangeRange);
                }
                else {
                    document = this.documentRegistry.acquireDocument(filename, compilationSettings, scriptSnapshot, this.hostCache.getByteOrderMark(filename), version, isOpen, []);
                }

                // Remeber the new document
                this.documentsByName[filename] = document;
            }

            // Now create a new compiler
            this.program = ts.createProgram(hostfilenames, compilationSettings, this.createCompilerHost());
            this.typeChecker = this.program.getTypeChecker();
        }

        dispose(): void {
            if (this.program) {
                ts.forEach(this.program.getSourceFiles(),
                    (f) => this.documentRegistry.releaseDocument(f.filename, this.program.getCompilerOptions()));
            }
        }

        refresh() {
            // No-op.  Only kept around for compatability with the interface we shipped.
        }
        cleanupSemanticCache() { }

        getSyntacticDiagnostics(filename: string) {
            this.synchronizeHostData();
            return this.program.getDiagnostics(this.program.getSourceFile(filename));
        }
        getSemanticDiagnostics(filename: string) {
            this.synchronizeHostData();
            return this.typeChecker.getDiagnostics(this.program.getSourceFile(filename));
        }
        getCompilerOptionsDiagnostics() {
            this.synchronizeHostData();
            return this.program.getGlobalDiagnostics();
        }
        getCompletionsAtPosition(filename: string, position: number, isMemberCompletion: boolean) {
            return undefined;
        }
        getCompletionEntryDetails(filename: string, position: number, entryName: string) {
            return undefined;
        }
        getTypeAtPosition(filename: string, position: number) {
            return undefined;
        }
        getSignatureAtPosition(filename: string, position: number) {
            return undefined;
        }
        getDefinitionAtPosition(filename: string, position: number) {
            return [];
        }
        getReferencesAtPosition(filename: string, position: number) {
            return [];
        }
        getOccurrencesAtPosition(filename: string, position: number) {
            return [];
        }
        getImplementorsAtPosition(filename: string, position: number) {
            return [];
        }
        getNavigateToItems(searchValue: string) {
            return [];
        }
        getEmitOutput(filename: string) {
            return undefined;
        }


        private getTypeInfoEligiblePath(filename: string, position: number, isConstructorValidPosition: boolean) {
            var sourceUnit = this._syntaxTreeCache.getCurrentFileSyntaxTree(filename).sourceUnit();

            var ast = TypeScript.ASTHelpers.getAstAtPosition(sourceUnit, position, /*useTrailingTriviaAsLimChar*/ false, /*forceInclusive*/ true);
            if (ast === null) {
                return null;
            }

            if (ast.kind() === SyntaxKind.ParameterList && ast.parent.kind() === SyntaxKind.CallSignature && ast.parent.parent.kind() === SyntaxKind.ConstructorDeclaration) {
                ast = ast.parent.parent;
            }

            switch (ast.kind()) {
                default:
                    return null;
                case TypeScript.SyntaxKind.ConstructorDeclaration:
                    var constructorAST = <TypeScript.ConstructorDeclarationSyntax>ast;
                    if (!isConstructorValidPosition || !(position >= start(constructorAST) && position <= start(constructorAST) + "constructor".length)) {
                        return null;
                    }
                    else {
                        return ast;
                    }
                case TypeScript.SyntaxKind.FunctionDeclaration:
                    return null;
                case TypeScript.SyntaxKind.MemberAccessExpression:
                case TypeScript.SyntaxKind.QualifiedName:
                case TypeScript.SyntaxKind.SuperKeyword:
                case TypeScript.SyntaxKind.StringLiteral:
                case TypeScript.SyntaxKind.ThisKeyword:
                case TypeScript.SyntaxKind.IdentifierName:
                    return ast;
            }
        }
        getNameOrDottedNameSpan(filename: string, startPos: number, endPos: number) {
            filename = TypeScript.switchToForwardSlashes(filename);

            var node = this.getTypeInfoEligiblePath(filename, startPos, false);
            if (!node)  return null;

            while (node) {
                if (TypeScript.ASTHelpers.isNameOfMemberAccessExpression(node) ||
                    TypeScript.ASTHelpers.isRightSideOfQualifiedName(node)) {
                    node = node.parent;
                }
                else {
                    break;
                }
            }

            var spanInfo = new SpanInfo(start(node), end(node));
            return spanInfo;
        }
        getBreakpointStatementAtPosition(filename: string, position: number) {
            // doesn't use compiler - no need to synchronize with host
            filename = TypeScript.switchToForwardSlashes(filename);

            var syntaxtree = this.getSyntaxTree(filename);
            return TypeScript.Services.Breakpoints.getBreakpointLocation(syntaxtree, position);
        }
        getScriptLexicalStructure(filename: string) {
            filename = TypeScript.switchToForwardSlashes(filename);
            var syntaxTree = this.getSyntaxTree(filename);
            var items: NavigateToItem[] = [];
            GetScriptLexicalStructureWalker.getListsOfAllScriptLexicalStructure(items, filename, syntaxTree.sourceUnit());
            return items;
        }
        getOutliningRegions(filename: string) {
            // doesn't use compiler - no need to synchronize with host
            filename = TypeScript.switchToForwardSlashes(filename);
            var syntaxTree = this.getSyntaxTree(filename);
            return OutliningElementsCollector.collectElements(syntaxTree.sourceUnit());
        }
        getBraceMatchingAtPosition(filename: string, position: number) {
            filename = TypeScript.switchToForwardSlashes(filename);
            var syntaxTree = this.getSyntaxTree(filename);
            return BraceMatcher.getMatchSpans(syntaxTree, position);
        }
        getIndentationAtPosition(filename: string, position: number, editorOptions: EditorOptions) {
            filename = TypeScript.switchToForwardSlashes(filename);

            var syntaxTree = this.getSyntaxTree(filename);

            var scriptSnapshot = this._syntaxTreeCache.getCurrentScriptSnapshot(filename);
            var scriptText = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);
            var textSnapshot = new TypeScript.Services.Formatting.TextSnapshot(scriptText);
            var options = new FormattingOptions(!editorOptions.ConvertTabsToSpaces, editorOptions.TabSize, editorOptions.IndentSize, editorOptions.NewLineCharacter)

            return TypeScript.Services.Formatting.SingleTokenIndenter.getIndentationAmount(position, syntaxTree.sourceUnit(), textSnapshot, options);
        }
        getFormattingEditsForRange(filename: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var manager = this.getFormattingManager(filename, options);
            return manager.formatSelection(minChar, limChar);
        }
        getFormattingEditsForDocument(filename: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var manager = this.getFormattingManager(filename, options);
            return manager.formatDocument(minChar, limChar);
        }
        getFormattingEditsOnPaste(filename: string, minChar: number, limChar: number, options: FormatCodeOptions): TextEdit[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var manager = this.getFormattingManager(filename, options);
            return manager.formatOnPaste(minChar, limChar);
        }
        getFormattingEditsAfterKeystroke(filename: string, position: number, key: string, options: FormatCodeOptions): TextEdit[] {
            filename = TypeScript.switchToForwardSlashes(filename);

            var manager = this.getFormattingManager(filename, options);
            if (key === "}")  return manager.formatOnClosingCurlyBrace(position);
            else if (key === ";")  return manager.formatOnSemicolon(position);
            else if (key === "\n") return manager.formatOnEnter(position);
            else return [];
        }
        private getFormattingManager(filename: string, options: FormatCodeOptions) {
            // Ensure rules are initialized and up to date wrt to formatting options
            if (this.formattingRulesProvider == null) {
                this.formattingRulesProvider = new TypeScript.Services.Formatting.RulesProvider(this.logger);
            }

            this.formattingRulesProvider.ensureUpToDate(options);

            // Get the Syntax Tree
            var syntaxTree = this.getSyntaxTree(filename);

            // Convert IScriptSnapshot to ITextSnapshot
            var scriptSnapshot = this._syntaxTreeCache.getCurrentScriptSnapshot(filename);
            var scriptText = TypeScript.SimpleText.fromScriptSnapshot(scriptSnapshot);
            var textSnapshot = new TypeScript.Services.Formatting.TextSnapshot(scriptText);

            var manager = new TypeScript.Services.Formatting.FormattingManager(syntaxTree, textSnapshot, this.formattingRulesProvider, options);

            return manager;
        }
        getSyntaxTree(filename: string): TypeScript.SyntaxTree {
            filename = TypeScript.switchToForwardSlashes(filename);
            return this._syntaxTreeCache.getCurrentFileSyntaxTree(filename);
        }
    }
}