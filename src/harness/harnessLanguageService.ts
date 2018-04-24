/// <reference path="..\services\services.ts" />
/// <reference path="..\services\shims.ts" />
/// <reference path="..\server\client.ts" />
/// <reference path="harness.ts" />

namespace Harness.LanguageService {
    export class ScriptInfo {
        public version = 1;
        public editRanges: { length: number; textChangeRange: ts.TextChangeRange; }[] = [];
        private lineMap: number[] = undefined;

        constructor(public fileName: string, public content: string, public isRootFile: boolean) {
            this.setContent(content);
        }

        private setContent(content: string): void {
            this.content = content;
            this.lineMap = undefined;
        }

        public getLineMap(): number[] {
            return this.lineMap || (this.lineMap = ts.computeLineStarts(this.content));
        }

        public updateContent(content: string): void {
            this.editRanges = [];
            this.setContent(content);
            this.version++;
        }

        public editContent(start: number, end: number, newText: string): void {
            // Apply edits
            const prefix = this.content.substring(0, start);
            const middle = newText;
            const suffix = this.content.substring(end);
            this.setContent(prefix + middle + suffix);

            // Store edit range + new length of script
            this.editRanges.push({
                length: this.content.length,
                textChangeRange: ts.createTextChangeRange(
                    ts.createTextSpanFromBounds(start, end), newText.length)
            });

            // Update version #
            this.version++;
        }

        public getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): ts.TextChangeRange {
            if (startVersion === endVersion) {
                // No edits!
                return ts.unchangedTextChangeRange;
            }

            const initialEditRangeIndex = this.editRanges.length - (this.version - startVersion);
            const lastEditRangeIndex = this.editRanges.length - (this.version - endVersion);

            const entries = this.editRanges.slice(initialEditRangeIndex, lastEditRangeIndex);
            return ts.collapseTextChangeRangesAcrossMultipleVersions(entries.map(e => e.textChangeRange));
        }
    }

    class ScriptSnapshot implements ts.IScriptSnapshot {
        public textSnapshot: string;
        public version: number;

        constructor(public scriptInfo: ScriptInfo) {
            this.textSnapshot = scriptInfo.content;
            this.version = scriptInfo.version;
        }

        public getText(start: number, end: number): string {
            return this.textSnapshot.substring(start, end);
        }

        public getLength(): number {
            return this.textSnapshot.length;
        }

        public getChangeRange(oldScript: ts.IScriptSnapshot): ts.TextChangeRange {
            const oldShim = <ScriptSnapshot>oldScript;
            return this.scriptInfo.getTextChangeRangeBetweenVersions(oldShim.version, this.version);
        }
    }

    class ScriptSnapshotProxy implements ts.ScriptSnapshotShim {
        constructor(private readonly scriptSnapshot: ts.IScriptSnapshot) {
        }

        public getText(start: number, end: number): string {
            return this.scriptSnapshot.getText(start, end);
        }

        public getLength(): number {
            return this.scriptSnapshot.getLength();
        }

        public getChangeRange(oldScript: ts.ScriptSnapshotShim): string {
            const range = this.scriptSnapshot.getChangeRange((oldScript as ScriptSnapshotProxy).scriptSnapshot);
            return range && JSON.stringify(range);
        }
    }

    class DefaultHostCancellationToken implements ts.HostCancellationToken {
        public static readonly instance = new DefaultHostCancellationToken();

        public isCancellationRequested() {
            return false;
        }
    }

    export interface LanguageServiceAdapter {
        getHost(): LanguageServiceAdapterHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    }

    export abstract class LanguageServiceAdapterHost {
        public readonly sys = new fakes.System(new vfs.FileSystem(/*ignoreCase*/ true, { cwd: virtualFileSystemRoot }));
        public typesRegistry: ts.Map<void> | undefined;
        private scriptInfos: collections.SortedMap<string, ScriptInfo>;

        constructor(protected cancellationToken = DefaultHostCancellationToken.instance,
            protected settings = ts.getDefaultCompilerOptions()) {
            this.scriptInfos = new collections.SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
        }

        public get vfs() {
            return this.sys.vfs;
        }

        public getNewLine(): string {
            return harnessNewLine;
        }

        public getFilenames(): string[] {
            const fileNames: string[] = [];
            this.scriptInfos.forEach(scriptInfo => {
                if (scriptInfo.isRootFile) {
                    // only include root files here
                    // usually it means that we won't include lib.d.ts in the list of root files so it won't mess the computation of compilation root dir.
                    fileNames.push(scriptInfo.fileName);
                }
            });
            return fileNames;
        }

        public getScriptInfo(fileName: string): ScriptInfo {
            return this.scriptInfos.get(vpath.resolve(this.vfs.cwd(), fileName));
        }

        public addScript(fileName: string, content: string, isRootFile: boolean): void {
            this.vfs.mkdirpSync(vpath.dirname(fileName));
            this.vfs.writeFileSync(fileName, content);
            this.scriptInfos.set(vpath.resolve(this.vfs.cwd(), fileName), new ScriptInfo(fileName, content, isRootFile));
        }

        public editScript(fileName: string, start: number, end: number, newText: string) {
            const script = this.getScriptInfo(fileName);
            if (script) {
                script.editContent(start, end, newText);
                this.vfs.mkdirpSync(vpath.dirname(fileName));
                this.vfs.writeFileSync(fileName, script.content);
                return;
            }

            throw new Error("No script with name '" + fileName + "'");
        }

        public openFile(_fileName: string, _content?: string, _scriptKindName?: string): void { /*overridden*/ }

        /**
         * @param line 0 based index
         * @param col 0 based index
         */
        public positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter {
            const script: ScriptInfo = this.getScriptInfo(fileName);
            assert.isOk(script);

            return ts.computeLineAndCharacterOfPosition(script.getLineMap(), position);
        }
    }

    /// Native adapter
    class NativeLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceHost, LanguageServiceAdapterHost {
        isKnownTypesPackageName(name: string): boolean {
            return this.typesRegistry && this.typesRegistry.has(name);
        }

        installPackage = ts.notImplemented;

        getCompilationSettings() { return this.settings; }

        getCancellationToken() { return this.cancellationToken; }

        getDirectories(path: string): string[] {
            return this.sys.getDirectories(path);
        }

        getCurrentDirectory(): string { return virtualFileSystemRoot; }

        getDefaultLibFileName(): string { return Compiler.defaultLibFileName; }

        getScriptFileNames(): string[] {
            return this.getFilenames().filter(ts.isAnySupportedFileExtension);
        }

        getScriptSnapshot(fileName: string): ts.IScriptSnapshot {
            const script = this.getScriptInfo(fileName);
            return script ? new ScriptSnapshot(script) : undefined;
        }

        getScriptKind(): ts.ScriptKind { return ts.ScriptKind.Unknown; }

        getScriptVersion(fileName: string): string {
            const script = this.getScriptInfo(fileName);
            return script ? script.version.toString() : undefined;
        }

        directoryExists(dirName: string): boolean {
            return this.sys.directoryExists(dirName);
        }

        fileExists(fileName: string): boolean {
            return this.sys.fileExists(fileName);
        }

        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return this.sys.readDirectory(path, extensions, exclude, include, depth);
        }

        readFile(path: string): string | undefined {
            return this.sys.readFile(path);
        }

        realpath(path: string): string {
            return this.sys.realpath(path);
        }

        getTypeRootsVersion() {
            return 0;
        }


        log = ts.noop;
        trace = ts.noop;
        error = ts.noop;
    }

    export class NativeLanguageServiceAdapter implements LanguageServiceAdapter {
        private host: NativeLanguageServiceHost;
        constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
            this.host = new NativeLanguageServiceHost(cancellationToken, options);
        }
        getHost(): LanguageServiceAdapterHost { return this.host; }
        getLanguageService(): ts.LanguageService { return ts.createLanguageService(this.host); }
        getClassifier(): ts.Classifier { return ts.createClassifier(); }
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo { return ts.preProcessFile(fileContents, /* readImportFiles */ true, ts.hasJavaScriptFileExtension(fileName)); }
    }

    /// Shim adapter
    class ShimLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceShimHost, ts.CoreServicesShimHost {
        private nativeHost: NativeLanguageServiceHost;

        public getModuleResolutionsForFile: (fileName: string) => string;
        public getTypeReferenceDirectiveResolutionsForFile: (fileName: string) => string;

        constructor(preprocessToResolve: boolean, cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
            super(cancellationToken, options);
            this.nativeHost = new NativeLanguageServiceHost(cancellationToken, options);

            if (preprocessToResolve) {
                const compilerOptions = this.nativeHost.getCompilationSettings();
                const moduleResolutionHost: ts.ModuleResolutionHost = {
                    fileExists: fileName => this.getScriptInfo(fileName) !== undefined,
                    readFile: fileName => {
                        const scriptInfo = this.getScriptInfo(fileName);
                        return scriptInfo && scriptInfo.content;
                    }
                };
                this.getModuleResolutionsForFile = (fileName) => {
                    const scriptInfo = this.getScriptInfo(fileName);
                    const preprocessInfo = ts.preProcessFile(scriptInfo.content, /*readImportFiles*/ true);
                    const imports: ts.MapLike<string> = {};
                    for (const module of preprocessInfo.importedFiles) {
                        const resolutionInfo = ts.resolveModuleName(module.fileName, fileName, compilerOptions, moduleResolutionHost);
                        if (resolutionInfo.resolvedModule) {
                            imports[module.fileName] = resolutionInfo.resolvedModule.resolvedFileName;
                        }
                    }
                    return JSON.stringify(imports);
                };
                this.getTypeReferenceDirectiveResolutionsForFile = (fileName) => {
                    const scriptInfo = this.getScriptInfo(fileName);
                    if (scriptInfo) {
                        const preprocessInfo = ts.preProcessFile(scriptInfo.content, /*readImportFiles*/ false);
                        const resolutions: ts.MapLike<ts.ResolvedTypeReferenceDirective> = {};
                        const settings = this.nativeHost.getCompilationSettings();
                        for (const typeReferenceDirective of preprocessInfo.typeReferenceDirectives) {
                            const resolutionInfo = ts.resolveTypeReferenceDirective(typeReferenceDirective.fileName, fileName, settings, moduleResolutionHost);
                            if (resolutionInfo.resolvedTypeReferenceDirective.resolvedFileName) {
                                resolutions[typeReferenceDirective.fileName] = resolutionInfo.resolvedTypeReferenceDirective;
                            }
                        }
                        return JSON.stringify(resolutions);
                    }
                    else {
                        return "[]";
                    }
                };
            }
        }

        getFilenames(): string[] { return this.nativeHost.getFilenames(); }
        getScriptInfo(fileName: string): ScriptInfo { return this.nativeHost.getScriptInfo(fileName); }
        addScript(fileName: string, content: string, isRootFile: boolean): void { this.nativeHost.addScript(fileName, content, isRootFile); }
        editScript(fileName: string, start: number, end: number, newText: string): void { this.nativeHost.editScript(fileName, start, end, newText); }
        positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter { return this.nativeHost.positionToLineAndCharacter(fileName, position); }

        getCompilationSettings(): string { return JSON.stringify(this.nativeHost.getCompilationSettings()); }
        getCancellationToken(): ts.HostCancellationToken { return this.nativeHost.getCancellationToken(); }
        getCurrentDirectory(): string { return this.nativeHost.getCurrentDirectory(); }
        getDirectories(path: string): string { return JSON.stringify(this.nativeHost.getDirectories(path)); }
        getDefaultLibFileName(): string { return this.nativeHost.getDefaultLibFileName(); }
        getScriptFileNames(): string { return JSON.stringify(this.nativeHost.getScriptFileNames()); }
        getScriptSnapshot(fileName: string): ts.ScriptSnapshotShim {
            const nativeScriptSnapshot = this.nativeHost.getScriptSnapshot(fileName);
            return nativeScriptSnapshot && new ScriptSnapshotProxy(nativeScriptSnapshot);
        }
        getScriptKind(): ts.ScriptKind { return this.nativeHost.getScriptKind(); }
        getScriptVersion(fileName: string): string { return this.nativeHost.getScriptVersion(fileName); }
        getLocalizedDiagnosticMessages(): string { return JSON.stringify({}); }

        readDirectory = ts.notImplemented;
        readDirectoryNames = ts.notImplemented;
        readFileNames = ts.notImplemented;
        fileExists(fileName: string) { return this.getScriptInfo(fileName) !== undefined; }
        readFile(fileName: string) {
            const snapshot = this.nativeHost.getScriptSnapshot(fileName);
            return snapshot && ts.getSnapshotText(snapshot);
        }
        log(s: string): void { this.nativeHost.log(s); }
        trace(s: string): void { this.nativeHost.trace(s); }
        error(s: string): void { this.nativeHost.error(s); }
        directoryExists(): boolean {
            // for tests pessimistically assume that directory always exists
            return true;
        }
    }

    class ClassifierShimProxy implements ts.Classifier {
        constructor(private shim: ts.ClassifierShim) {
        }
        getEncodedLexicalClassifications(_text: string, _lexState: ts.EndOfLineState, _classifyKeywordsInGenerics?: boolean): ts.Classifications {
            return ts.notImplemented();
        }
        getClassificationsForLine(text: string, lexState: ts.EndOfLineState, classifyKeywordsInGenerics?: boolean): ts.ClassificationResult {
            const result = this.shim.getClassificationsForLine(text, lexState, classifyKeywordsInGenerics).split("\n");
            const entries: ts.ClassificationInfo[] = [];
            let i = 0;
            let position = 0;

            for (; i < result.length - 1; i += 2) {
                const t = entries[i / 2] = {
                    length: parseInt(result[i]),
                    classification: parseInt(result[i + 1])
                };

                assert.isTrue(t.length > 0, "Result length should be greater than 0, got :" + t.length);
                position += t.length;
            }
            const finalLexState = parseInt(result[result.length - 1]);

            assert.equal(position, text.length, "Expected cumulative length of all entries to match the length of the source. expected: " + text.length + ", but got: " + position);

            return {
                finalLexState,
                entries
            };
        }
    }

    function unwrapJSONCallResult(result: string): any {
        const parsedResult = JSON.parse(result);
        if (parsedResult.error) {
            throw new Error("Language Service Shim Error: " + JSON.stringify(parsedResult.error));
        }
        else if (parsedResult.canceled) {
            throw new ts.OperationCanceledException();
        }
        return parsedResult.result;
    }

    class LanguageServiceShimProxy implements ts.LanguageService {
        constructor(private shim: ts.LanguageServiceShim) {
        }
        cleanupSemanticCache(): void {
            this.shim.cleanupSemanticCache();
        }
        getSyntacticDiagnostics(fileName: string): ts.Diagnostic[] {
            return unwrapJSONCallResult(this.shim.getSyntacticDiagnostics(fileName));
        }
        getSemanticDiagnostics(fileName: string): ts.Diagnostic[] {
            return unwrapJSONCallResult(this.shim.getSemanticDiagnostics(fileName));
        }
        getSuggestionDiagnostics(fileName: string): ts.Diagnostic[] {
            return unwrapJSONCallResult(this.shim.getSuggestionDiagnostics(fileName));
        }
        getCompilerOptionsDiagnostics(): ts.Diagnostic[] {
            return unwrapJSONCallResult(this.shim.getCompilerOptionsDiagnostics());
        }
        getSyntacticClassifications(fileName: string, span: ts.TextSpan): ts.ClassifiedSpan[] {
            return unwrapJSONCallResult(this.shim.getSyntacticClassifications(fileName, span.start, span.length));
        }
        getSemanticClassifications(fileName: string, span: ts.TextSpan): ts.ClassifiedSpan[] {
            return unwrapJSONCallResult(this.shim.getSemanticClassifications(fileName, span.start, span.length));
        }
        getEncodedSyntacticClassifications(fileName: string, span: ts.TextSpan): ts.Classifications {
            return unwrapJSONCallResult(this.shim.getEncodedSyntacticClassifications(fileName, span.start, span.length));
        }
        getEncodedSemanticClassifications(fileName: string, span: ts.TextSpan): ts.Classifications {
            return unwrapJSONCallResult(this.shim.getEncodedSemanticClassifications(fileName, span.start, span.length));
        }
        getCompletionsAtPosition(fileName: string, position: number, preferences: ts.UserPreferences | undefined): ts.CompletionInfo {
            return unwrapJSONCallResult(this.shim.getCompletionsAtPosition(fileName, position, preferences));
        }
        getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: ts.FormatCodeOptions | undefined, source: string | undefined, preferences: ts.UserPreferences | undefined): ts.CompletionEntryDetails {
            return unwrapJSONCallResult(this.shim.getCompletionEntryDetails(fileName, position, entryName, JSON.stringify(formatOptions), source, preferences));
        }
        getCompletionEntrySymbol(): ts.Symbol {
            throw new Error("getCompletionEntrySymbol not implemented across the shim layer.");
        }
        getQuickInfoAtPosition(fileName: string, position: number): ts.QuickInfo {
            return unwrapJSONCallResult(this.shim.getQuickInfoAtPosition(fileName, position));
        }
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): ts.TextSpan {
            return unwrapJSONCallResult(this.shim.getNameOrDottedNameSpan(fileName, startPos, endPos));
        }
        getBreakpointStatementAtPosition(fileName: string, position: number): ts.TextSpan {
            return unwrapJSONCallResult(this.shim.getBreakpointStatementAtPosition(fileName, position));
        }
        getSignatureHelpItems(fileName: string, position: number): ts.SignatureHelpItems {
            return unwrapJSONCallResult(this.shim.getSignatureHelpItems(fileName, position));
        }
        getRenameInfo(fileName: string, position: number): ts.RenameInfo {
            return unwrapJSONCallResult(this.shim.getRenameInfo(fileName, position));
        }
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): ts.RenameLocation[] {
            return unwrapJSONCallResult(this.shim.findRenameLocations(fileName, position, findInStrings, findInComments));
        }
        getDefinitionAtPosition(fileName: string, position: number): ts.DefinitionInfo[] {
            return unwrapJSONCallResult(this.shim.getDefinitionAtPosition(fileName, position));
        }
        getDefinitionAndBoundSpan(fileName: string, position: number): ts.DefinitionInfoAndBoundSpan {
            return unwrapJSONCallResult(this.shim.getDefinitionAndBoundSpan(fileName, position));
        }
        getTypeDefinitionAtPosition(fileName: string, position: number): ts.DefinitionInfo[] {
            return unwrapJSONCallResult(this.shim.getTypeDefinitionAtPosition(fileName, position));
        }
        getImplementationAtPosition(fileName: string, position: number): ts.ImplementationLocation[] {
            return unwrapJSONCallResult(this.shim.getImplementationAtPosition(fileName, position));
        }
        getReferencesAtPosition(fileName: string, position: number): ts.ReferenceEntry[] {
            return unwrapJSONCallResult(this.shim.getReferencesAtPosition(fileName, position));
        }
        findReferences(fileName: string, position: number): ts.ReferencedSymbol[] {
            return unwrapJSONCallResult(this.shim.findReferences(fileName, position));
        }
        getOccurrencesAtPosition(fileName: string, position: number): ts.ReferenceEntry[] {
            return unwrapJSONCallResult(this.shim.getOccurrencesAtPosition(fileName, position));
        }
        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): ts.DocumentHighlights[] {
            return unwrapJSONCallResult(this.shim.getDocumentHighlights(fileName, position, JSON.stringify(filesToSearch)));
        }
        getNavigateToItems(searchValue: string): ts.NavigateToItem[] {
            return unwrapJSONCallResult(this.shim.getNavigateToItems(searchValue));
        }
        getNavigationBarItems(fileName: string): ts.NavigationBarItem[] {
            return unwrapJSONCallResult(this.shim.getNavigationBarItems(fileName));
        }
        getNavigationTree(fileName: string): ts.NavigationTree {
            return unwrapJSONCallResult(this.shim.getNavigationTree(fileName));
        }

        getOutliningSpans(fileName: string): ts.OutliningSpan[] {
            return unwrapJSONCallResult(this.shim.getOutliningSpans(fileName));
        }
        getTodoComments(fileName: string, descriptors: ts.TodoCommentDescriptor[]): ts.TodoComment[] {
            return unwrapJSONCallResult(this.shim.getTodoComments(fileName, JSON.stringify(descriptors)));
        }
        getBraceMatchingAtPosition(fileName: string, position: number): ts.TextSpan[] {
            return unwrapJSONCallResult(this.shim.getBraceMatchingAtPosition(fileName, position));
        }
        getIndentationAtPosition(fileName: string, position: number, options: ts.EditorOptions): number {
            return unwrapJSONCallResult(this.shim.getIndentationAtPosition(fileName, position, JSON.stringify(options)));
        }
        getFormattingEditsForRange(fileName: string, start: number, end: number, options: ts.FormatCodeOptions): ts.TextChange[] {
            return unwrapJSONCallResult(this.shim.getFormattingEditsForRange(fileName, start, end, JSON.stringify(options)));
        }
        getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): ts.TextChange[] {
            return unwrapJSONCallResult(this.shim.getFormattingEditsForDocument(fileName, JSON.stringify(options)));
        }
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: ts.FormatCodeOptions): ts.TextChange[] {
            return unwrapJSONCallResult(this.shim.getFormattingEditsAfterKeystroke(fileName, position, key, JSON.stringify(options)));
        }
        getDocCommentTemplateAtPosition(fileName: string, position: number): ts.TextInsertion | undefined {
            return unwrapJSONCallResult(this.shim.getDocCommentTemplateAtPosition(fileName, position));
        }
        isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean {
            return unwrapJSONCallResult(this.shim.isValidBraceCompletionAtPosition(fileName, position, openingBrace));
        }
        getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): ts.TextSpan {
            return unwrapJSONCallResult(this.shim.getSpanOfEnclosingComment(fileName, position, onlyMultiLine));
        }
        getCodeFixesAtPosition(): never {
            throw new Error("Not supported on the shim.");
        }
        getCombinedCodeFix = ts.notImplemented;
        applyCodeActionCommand = ts.notImplemented;
        getCodeFixDiagnostics(): ts.Diagnostic[] {
            throw new Error("Not supported on the shim.");
        }
        getEditsForRefactor(): ts.RefactorEditInfo {
            throw new Error("Not supported on the shim.");
        }
        getApplicableRefactors(): ts.ApplicableRefactorInfo[] {
            throw new Error("Not supported on the shim.");
        }
        organizeImports(_scope: ts.OrganizeImportsScope, _formatOptions: ts.FormatCodeSettings): ReadonlyArray<ts.FileTextChanges> {
            throw new Error("Not supported on the shim.");
        }
        getEditsForFileRename(): ReadonlyArray<ts.FileTextChanges> {
            throw new Error("Not supported on the shim.");
        }
        getEmitOutput(fileName: string): ts.EmitOutput {
            return unwrapJSONCallResult(this.shim.getEmitOutput(fileName));
        }
        getProgram(): ts.Program {
            throw new Error("Program can not be marshaled across the shim layer.");
        }
        getNonBoundSourceFile(): ts.SourceFile {
            throw new Error("SourceFile can not be marshaled across the shim layer.");
        }
        getSourceFile(): ts.SourceFile {
            throw new Error("SourceFile can not be marshaled across the shim layer.");
        }
        dispose(): void { this.shim.dispose({}); }
    }

    export class ShimLanguageServiceAdapter implements LanguageServiceAdapter {
        private host: ShimLanguageServiceHost;
        private factory: ts.TypeScriptServicesFactory;
        constructor(preprocessToResolve: boolean, cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
            this.host = new ShimLanguageServiceHost(preprocessToResolve, cancellationToken, options);
            this.factory = new TypeScript.Services.TypeScriptServicesFactory();
        }
        getHost() { return this.host; }
        getLanguageService(): ts.LanguageService { return new LanguageServiceShimProxy(this.factory.createLanguageServiceShim(this.host)); }
        getClassifier(): ts.Classifier { return new ClassifierShimProxy(this.factory.createClassifierShim(this.host)); }
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo {
            let shimResult: {
                referencedFiles: ts.ShimsFileReference[];
                typeReferenceDirectives: ts.ShimsFileReference[];
                importedFiles: ts.ShimsFileReference[];
                isLibFile: boolean;
            };

            const coreServicesShim = this.factory.createCoreServicesShim(this.host);
            shimResult = unwrapJSONCallResult(coreServicesShim.getPreProcessedFileInfo(fileName, ts.ScriptSnapshot.fromString(fileContents)));

            const convertResult: ts.PreProcessedFileInfo = {
                referencedFiles: [],
                importedFiles: [],
                ambientExternalModules: [],
                isLibFile: shimResult.isLibFile,
                typeReferenceDirectives: []
            };

            ts.forEach(shimResult.referencedFiles, refFile => {
                convertResult.referencedFiles.push({
                    fileName: refFile.path,
                    pos: refFile.position,
                    end: refFile.position + refFile.length
                });
            });

            ts.forEach(shimResult.importedFiles, importedFile => {
                convertResult.importedFiles.push({
                    fileName: importedFile.path,
                    pos: importedFile.position,
                    end: importedFile.position + importedFile.length
                });
            });

            ts.forEach(shimResult.typeReferenceDirectives, typeRefDirective => {
                convertResult.importedFiles.push({
                    fileName: typeRefDirective.path,
                    pos: typeRefDirective.position,
                    end: typeRefDirective.position + typeRefDirective.length
                });
            });
            return convertResult;
        }
    }

    // Server adapter
    class SessionClientHost extends NativeLanguageServiceHost implements ts.server.SessionClientHost {
        private client: ts.server.SessionClient;

        constructor(cancellationToken: ts.HostCancellationToken, settings: ts.CompilerOptions) {
            super(cancellationToken, settings);
        }

        onMessage = ts.noop;
        writeMessage = ts.noop;

        setClient(client: ts.server.SessionClient) {
            this.client = client;
        }

        openFile(fileName: string, content?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void {
            super.openFile(fileName, content, scriptKindName);
            this.client.openFile(fileName, content, scriptKindName);
        }

        editScript(fileName: string, start: number, end: number, newText: string) {
            super.editScript(fileName, start, end, newText);
            this.client.changeFile(fileName, start, end, newText);
        }
    }

    class SessionServerHost implements ts.server.ServerHost, ts.server.Logger {
        args: string[] = [];
        newLine: string;
        useCaseSensitiveFileNames = false;

        constructor(private host: NativeLanguageServiceHost) {
            this.newLine = this.host.getNewLine();
        }

        onMessage = ts.noop;
        writeMessage = ts.noop; // overridden
        write(message: string): void {
            this.writeMessage(message);
        }

        readFile(fileName: string): string | undefined {
            if (ts.stringContains(fileName, Compiler.defaultLibFileName)) {
                fileName = Compiler.defaultLibFileName;
            }

            const snapshot = this.host.getScriptSnapshot(fileName);
            return snapshot && ts.getSnapshotText(snapshot);
        }

        writeFile = ts.noop;

        resolvePath(path: string): string {
            return path;
        }

        fileExists(path: string): boolean {
            return !!this.host.getScriptSnapshot(path);
        }

        directoryExists(): boolean {
            // for tests assume that directory exists
            return true;
        }

        getExecutingFilePath(): string {
            return "";
        }

        exit = ts.noop;

        createDirectory(_directoryName: string): void {
            return ts.notImplemented();
        }

        getCurrentDirectory(): string {
            return this.host.getCurrentDirectory();
        }

        getDirectories(): string[] {
            return [];
        }

        getEnvironmentVariable(name: string): string {
            return ts.sys.getEnvironmentVariable(name);
        }

        readDirectory() { return ts.notImplemented(); }

        watchFile(): ts.FileWatcher {
            return { close: ts.noop };
        }

        watchDirectory(): ts.FileWatcher {
            return { close: ts.noop };
        }

        close = ts.noop;

        info(message: string): void {
            this.host.log(message);
        }

        msg(message: string): void {
            this.host.log(message);
        }

        loggingEnabled() {
            return true;
        }

        getLogFileName(): string {
            return undefined;
        }

        hasLevel() {
            return false;
        }

        startGroup() { throw ts.notImplemented(); }
        endGroup() { throw ts.notImplemented(); }

        perftrc(message: string): void {
            return this.host.log(message);
        }

        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any {
            return setTimeout(callback, ms, args);
        }

        clearTimeout(timeoutId: any): void {
            clearTimeout(timeoutId);
        }

        setImmediate(callback: (...args: any[]) => void, _ms: number, ...args: any[]): any {
            return setImmediate(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            clearImmediate(timeoutId);
        }

        createHash(s: string) {
            return mockHash(s);
        }

        require(_initialDir: string, _moduleName: string): ts.server.RequireResult {
            switch (_moduleName) {
                // Adds to the Quick Info a fixed string and a string from the config file
                // and replaces the first display part
                case "quickinfo-augmeneter":
                    return {
                        module: () => ({
                            create(info: ts.server.PluginCreateInfo) {
                                const proxy = makeDefaultProxy(info);
                                const langSvc: any = info.languageService;
                                // tslint:disable-next-line only-arrow-functions
                                proxy.getQuickInfoAtPosition = function () {
                                    const parts = langSvc.getQuickInfoAtPosition.apply(langSvc, arguments);
                                    if (parts.displayParts.length > 0) {
                                        parts.displayParts[0].text = "Proxied";
                                    }
                                    parts.displayParts.push({ text: info.config.message, kind: "punctuation" });
                                    return parts;
                                };

                                return proxy;
                            }
                        }),
                        error: undefined
                    };

                // Throws during initialization
                case "create-thrower":
                    return {
                        module: () => ({
                            create() {
                                throw new Error("I am not a well-behaved plugin");
                            }
                        }),
                        error: undefined
                    };

                // Adds another diagnostic
                case "diagnostic-adder":
                    return {
                        module: () => ({
                            create(info: ts.server.PluginCreateInfo) {
                                const proxy = makeDefaultProxy(info);
                                proxy.getSemanticDiagnostics = filename => {
                                    const prev = info.languageService.getSemanticDiagnostics(filename);
                                    const sourceFile: ts.SourceFile = info.languageService.getSourceFile(filename);
                                    prev.push({
                                        category: ts.DiagnosticCategory.Warning,
                                        file: sourceFile,
                                        code: 9999,
                                        length: 3,
                                        messageText: `Plugin diagnostic`,
                                        start: 0
                                    });
                                    return prev;
                                };
                                return proxy;
                            }
                        }),
                        error: undefined
                    };

                default:
                    return {
                        module: undefined,
                        error: new Error("Could not resolve module")
                    };
            }

            function makeDefaultProxy(info: ts.server.PluginCreateInfo): ts.LanguageService {
                // tslint:disable-next-line:no-null-keyword
                const proxy = Object.create(/*prototype*/ null);
                const langSvc: any = info.languageService;
                for (const k of Object.keys(langSvc)) {
                    // tslint:disable-next-line only-arrow-functions
                    proxy[k] = function () {
                        return langSvc[k].apply(langSvc, arguments);
                    };
                }
                return proxy;
            }
        }
    }

    export class ServerLanguageServiceAdapter implements LanguageServiceAdapter {
        private host: SessionClientHost;
        private client: ts.server.SessionClient;
        constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
            // This is the main host that tests use to direct tests
            const clientHost = new SessionClientHost(cancellationToken, options);
            const client = new ts.server.SessionClient(clientHost);

            // This host is just a proxy for the clientHost, it uses the client
            // host to answer server queries about files on disk
            const serverHost = new SessionServerHost(clientHost);
            const opts: ts.server.SessionOptions = {
                host: serverHost,
                cancellationToken: ts.server.nullCancellationToken,
                useSingleInferredProject: false,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller: undefined,
                byteLength: Utils.byteLength,
                hrtime: process.hrtime,
                logger: serverHost,
                canUseEvents: true
            };
            const server = new ts.server.Session(opts);

            // Fake the connection between the client and the server
            serverHost.writeMessage = client.onMessage.bind(client);
            clientHost.writeMessage = server.onMessage.bind(server);

            // Wire the client to the host to get notifications when a file is open
            // or edited.
            clientHost.setClient(client);

            // Set the properties
            this.client = client;
            this.host = clientHost;
        }
        getHost() { return this.host; }
        getLanguageService(): ts.LanguageService { return this.client; }
        getClassifier(): ts.Classifier { throw new Error("getClassifier is not available using the server interface."); }
        getPreProcessedFileInfo(): ts.PreProcessedFileInfo { throw new Error("getPreProcessedFileInfo is not available using the server interface."); }
    }
}
