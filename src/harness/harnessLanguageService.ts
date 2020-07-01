import { LanguageService, IScriptSnapshot, HostCancellationToken, Classifier, PreProcessedFileInfo, LanguageServiceHost, EndOfLineState, Classifications, ClassificationResult, ClassificationInfo, ClassifiedSpan, CompletionInfo, FormatCodeOptions, CompletionEntryDetails, QuickInfo, SignatureHelpItemsOptions, SignatureHelpItems, RenameInfoOptions, RenameInfo, SelectionRange, RenameLocation, DefinitionInfo, DefinitionInfoAndBoundSpan, ImplementationLocation, ReferenceEntry, ReferencedSymbol, NavigateToItem, NavigationBarItem, NavigationTree, OutliningSpan, TodoCommentDescriptor, TodoComment, EditorOptions, TextChange, TextInsertion, RefactorEditInfo, ApplicableRefactorInfo, OrganizeImportsScope, FormatCodeSettings, FileTextChanges } from "../services/types";
import { TextChangeRange, LineAndCharacter, ScriptKind, CompilerOptions, ModuleResolutionHost, ResolvedTypeReferenceDirective, OperationCanceledException, DiagnosticWithLocation, Diagnostic, TextSpan, UserPreferences, Program, SourceFile, RequireResult, DiagnosticCategory } from "../compiler/types";
import { computeLineStarts, computeLineAndCharacterOfPosition, computePositionOfLineAndCharacter } from "../compiler/scanner";
import { createTextChangeRange, createTextSpanFromBounds, unchangedTextChangeRange, collapseTextChangeRangesAcrossMultipleVersions, resolveModuleName, resolveTypeReferenceDirective, EmitOutput } from "../../built/local/compiler";
import { ScriptSnapshotShim, LanguageServiceShimHost, CoreServicesShimHost, ClassifierShim, LanguageServiceShim, TypeScriptServicesFactory, ShimsFileReference } from "../services/shims";
import { virtualFileSystemRoot, harnessNewLine, Compiler, mockHash } from "./harnessIO";
import { getDefaultCompilerOptions, createLanguageService } from "../services/services";
import { getDirectoryPath, toPath } from "../compiler/path";
import { getPathUpdater, DocumentHighlights } from "../../built/local/services";
import { createGetCanonicalFileName, notImplemented, noop, forEach, stringContains } from "../compiler/core";
import { assert } from "console";
import { isAnySupportedFileExtension, hasJSFileExtension } from "../compiler/utilities";
import { createClassifier } from "../services/classifier";
import { preProcessFile } from "../services/preProcess";
import { MapLike } from "../compiler/corePublic";
import { getSnapshotText } from "../services/utilities";
import { sys, FileWatcher } from "../compiler/sys";
import { Debug } from "../compiler/debug";


    export function makeDefaultProxy(info: server.PluginCreateInfo): LanguageService {
        const proxy = Object.create(/*prototype*/ null); // eslint-disable-line no-null/no-null
        const langSvc: any = info.languageService;
        for (const k of Object.keys(langSvc)) {
            // eslint-disable-next-line only-arrow-functions
            proxy[k] = function () {
                return langSvc[k].apply(langSvc, arguments);
            };
        }
        return proxy;
    }

    export class ScriptInfo {
        public version = 1;
        public editRanges: { length: number; textChangeRange: TextChangeRange; }[] = [];
        private lineMap: number[] | undefined;

        constructor(public fileName: string, public content: string, public isRootFile: boolean) {
            this.setContent(content);
        }

        private setContent(content: string): void {
            this.content = content;
            this.lineMap = undefined;
        }

        public getLineMap(): number[] {
            return this.lineMap || (this.lineMap = computeLineStarts(this.content));
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
                textChangeRange: createTextChangeRange(
                    createTextSpanFromBounds(start, end), newText.length)
            });

            // Update version #
            this.version++;
        }

        public getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): TextChangeRange {
            if (startVersion === endVersion) {
                // No edits!
                return unchangedTextChangeRange;
            }

            const initialEditRangeIndex = this.editRanges.length - (this.version - startVersion);
            const lastEditRangeIndex = this.editRanges.length - (this.version - endVersion);

            const entries = this.editRanges.slice(initialEditRangeIndex, lastEditRangeIndex);
            return collapseTextChangeRangesAcrossMultipleVersions(entries.map(e => e.textChangeRange));
        }
    }

    class ScriptSnapshot implements IScriptSnapshot {
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

        public getChangeRange(oldScript: IScriptSnapshot): TextChangeRange {
            const oldShim = <ScriptSnapshot>oldScript;
            return this.scriptInfo.getTextChangeRangeBetweenVersions(oldShim.version, this.version);
        }
    }

    class ScriptSnapshotProxy implements ScriptSnapshotShim {
        constructor(private readonly scriptSnapshot: IScriptSnapshot) {
        }

        public getText(start: number, end: number): string {
            return this.scriptSnapshot.getText(start, end);
        }

        public getLength(): number {
            return this.scriptSnapshot.getLength();
        }

        public getChangeRange(oldScript: ScriptSnapshotShim): string | undefined {
            const range = this.scriptSnapshot.getChangeRange((oldScript as ScriptSnapshotProxy).scriptSnapshot);
            return range && JSON.stringify(range);
        }
    }

    class DefaultHostCancellationToken implements HostCancellationToken {
        public static readonly instance = new DefaultHostCancellationToken();

        public isCancellationRequested() {
            return false;
        }
    }

    export interface LanguageServiceAdapter {
        getHost(): LanguageServiceAdapterHost;
        getLanguageService(): LanguageService;
        getClassifier(): Classifier;
        getPreProcessedFileInfo(fileName: string, fileContents: string): PreProcessedFileInfo;
    }

    export abstract class LanguageServiceAdapterHost {
        public readonly sys = new fakes.System(new vfs.FileSystem(/*ignoreCase*/ true, { cwd: virtualFileSystemRoot }));
        public typesRegistry: Map<string, void> | undefined;
        private scriptInfos: SortedMap<string, ScriptInfo>;

        constructor(protected cancellationToken = DefaultHostCancellationToken.instance,
            protected settings = getDefaultCompilerOptions()) {
            this.scriptInfos = new SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
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

        public getScriptInfo(fileName: string): ScriptInfo | undefined {
            return this.scriptInfos.get(vpath.resolve(this.vfs.cwd(), fileName));
        }

        public addScript(fileName: string, content: string, isRootFile: boolean): void {
            this.vfs.mkdirpSync(vpath.dirname(fileName));
            this.vfs.writeFileSync(fileName, content);
            this.scriptInfos.set(vpath.resolve(this.vfs.cwd(), fileName), new ScriptInfo(fileName, content, isRootFile));
        }

        public renameFileOrDirectory(oldPath: string, newPath: string): void {
            this.vfs.mkdirpSync(getDirectoryPath(newPath));
            this.vfs.renameSync(oldPath, newPath);

            const updater = getPathUpdater(oldPath, newPath, createGetCanonicalFileName(this.useCaseSensitiveFileNames()), /*sourceMapper*/ undefined);
            this.scriptInfos.forEach((scriptInfo, key) => {
                const newFileName = updater(key);
                if (newFileName !== undefined) {
                    this.scriptInfos.delete(key);
                    this.scriptInfos.set(newFileName, scriptInfo);
                    scriptInfo.fileName = newFileName;
                }
            });
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
        public positionToLineAndCharacter(fileName: string, position: number): LineAndCharacter {
            const script: ScriptInfo = this.getScriptInfo(fileName)!;
            assert.isOk(script);
            return computeLineAndCharacterOfPosition(script.getLineMap(), position);
        }

        public lineAndCharacterToPosition(fileName: string, lineAndCharacter: LineAndCharacter): number {
            const script: ScriptInfo = this.getScriptInfo(fileName)!;
            assert.isOk(script);
            return computePositionOfLineAndCharacter(script.getLineMap(), lineAndCharacter.line, lineAndCharacter.character);
        }

        useCaseSensitiveFileNames() {
            return !this.vfs.ignoreCase;
        }
    }

    /// Native adapter
    class NativeLanguageServiceHost extends LanguageServiceAdapterHost implements LanguageServiceHost, LanguageServiceAdapterHost {
        isKnownTypesPackageName(name: string): boolean {
            return !!this.typesRegistry && this.typesRegistry.has(name);
        }

        getGlobalTypingsCacheLocation() {
            return "/Library/Caches/typescript";
        }

        installPackage = notImplemented;

        getCompilationSettings() { return this.settings; }

        getCancellationToken() { return this.cancellationToken; }

        getDirectories(path: string): string[] {
            return this.sys.getDirectories(path);
        }

        getCurrentDirectory(): string { return virtualFileSystemRoot; }

        getDefaultLibFileName(): string { return Compiler.defaultLibFileName; }

        getScriptFileNames(): string[] {
            return this.getFilenames().filter(isAnySupportedFileExtension);
        }

        getScriptSnapshot(fileName: string): IScriptSnapshot | undefined {
            const script = this.getScriptInfo(fileName);
            return script ? new ScriptSnapshot(script) : undefined;
        }

        getScriptKind(): ScriptKind { return ScriptKind.Unknown; }

        getScriptVersion(fileName: string): string {
            const script = this.getScriptInfo(fileName);
            return script ? script.version.toString() : undefined!; // TODO: GH#18217
        }

        directoryExists(dirName: string): boolean {
            return this.sys.directoryExists(dirName);
        }

        fileExists(fileName: string): boolean {
            return this.sys.fileExists(fileName);
        }

        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
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

        log = noop;
        trace = noop;
        error = noop;
    }

    export class NativeLanguageServiceAdapter implements LanguageServiceAdapter {
        private host: NativeLanguageServiceHost;
        constructor(cancellationToken?: HostCancellationToken, options?: CompilerOptions) {
            this.host = new NativeLanguageServiceHost(cancellationToken, options);
        }
        getHost(): LanguageServiceAdapterHost { return this.host; }
        getLanguageService(): LanguageService { return createLanguageService(this.host); }
        getClassifier(): Classifier { return createClassifier(); }
        getPreProcessedFileInfo(fileName: string, fileContents: string): PreProcessedFileInfo { return preProcessFile(fileContents, /* readImportFiles */ true, hasJSFileExtension(fileName)); }
    }

    /// Shim adapter
    class ShimLanguageServiceHost extends LanguageServiceAdapterHost implements LanguageServiceShimHost, CoreServicesShimHost {
        private nativeHost: NativeLanguageServiceHost;

        public getModuleResolutionsForFile: ((fileName: string) => string) | undefined;
        public getTypeReferenceDirectiveResolutionsForFile: ((fileName: string) => string) | undefined;

        constructor(preprocessToResolve: boolean, cancellationToken?: HostCancellationToken, options?: CompilerOptions) {
            super(cancellationToken, options);
            this.nativeHost = new NativeLanguageServiceHost(cancellationToken, options);

            if (preprocessToResolve) {
                const compilerOptions = this.nativeHost.getCompilationSettings();
                const moduleResolutionHost: ModuleResolutionHost = {
                    fileExists: fileName => this.getScriptInfo(fileName) !== undefined,
                    readFile: fileName => {
                        const scriptInfo = this.getScriptInfo(fileName);
                        return scriptInfo && scriptInfo.content;
                    }
                };
                this.getModuleResolutionsForFile = (fileName) => {
                    const scriptInfo = this.getScriptInfo(fileName)!;
                    const preprocessInfo = preProcessFile(scriptInfo.content, /*readImportFiles*/ true);
                    const imports: MapLike<string> = {};
                    for (const module of preprocessInfo.importedFiles) {
                        const resolutionInfo = resolveModuleName(module.fileName, fileName, compilerOptions, moduleResolutionHost);
                        if (resolutionInfo.resolvedModule) {
                            imports[module.fileName] = resolutionInfo.resolvedModule.resolvedFileName;
                        }
                    }
                    return JSON.stringify(imports);
                };
                this.getTypeReferenceDirectiveResolutionsForFile = (fileName) => {
                    const scriptInfo = this.getScriptInfo(fileName);
                    if (scriptInfo) {
                        const preprocessInfo = preProcessFile(scriptInfo.content, /*readImportFiles*/ false);
                        const resolutions: MapLike<ResolvedTypeReferenceDirective> = {};
                        const settings = this.nativeHost.getCompilationSettings();
                        for (const typeReferenceDirective of preprocessInfo.typeReferenceDirectives) {
                            const resolutionInfo = resolveTypeReferenceDirective(typeReferenceDirective.fileName, fileName, settings, moduleResolutionHost);
                            if (resolutionInfo.resolvedTypeReferenceDirective!.resolvedFileName) {
                                resolutions[typeReferenceDirective.fileName] = resolutionInfo.resolvedTypeReferenceDirective!;
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
        getScriptInfo(fileName: string): ScriptInfo | undefined { return this.nativeHost.getScriptInfo(fileName); }
        addScript(fileName: string, content: string, isRootFile: boolean): void { this.nativeHost.addScript(fileName, content, isRootFile); }
        editScript(fileName: string, start: number, end: number, newText: string): void { this.nativeHost.editScript(fileName, start, end, newText); }
        positionToLineAndCharacter(fileName: string, position: number): LineAndCharacter { return this.nativeHost.positionToLineAndCharacter(fileName, position); }

        getCompilationSettings(): string { return JSON.stringify(this.nativeHost.getCompilationSettings()); }
        getCancellationToken(): HostCancellationToken { return this.nativeHost.getCancellationToken(); }
        getCurrentDirectory(): string { return this.nativeHost.getCurrentDirectory(); }
        getDirectories(path: string): string { return JSON.stringify(this.nativeHost.getDirectories(path)); }
        getDefaultLibFileName(): string { return this.nativeHost.getDefaultLibFileName(); }
        getScriptFileNames(): string { return JSON.stringify(this.nativeHost.getScriptFileNames()); }
        getScriptSnapshot(fileName: string): ScriptSnapshotShim {
            const nativeScriptSnapshot = this.nativeHost.getScriptSnapshot(fileName)!; // TODO: GH#18217
            return nativeScriptSnapshot && new ScriptSnapshotProxy(nativeScriptSnapshot);
        }
        getScriptKind(): ScriptKind { return this.nativeHost.getScriptKind(); }
        getScriptVersion(fileName: string): string { return this.nativeHost.getScriptVersion(fileName); }
        getLocalizedDiagnosticMessages(): string { return JSON.stringify({}); }

        readDirectory = notImplemented;
        readDirectoryNames = notImplemented;
        readFileNames = notImplemented;
        fileExists(fileName: string) { return this.getScriptInfo(fileName) !== undefined; }
        readFile(fileName: string) {
            const snapshot = this.nativeHost.getScriptSnapshot(fileName);
            return snapshot && getSnapshotText(snapshot);
        }
        log(s: string): void { this.nativeHost.log(s); }
        trace(s: string): void { this.nativeHost.trace(s); }
        error(s: string): void { this.nativeHost.error(s); }
        directoryExists(): boolean {
            // for tests pessimistically assume that directory always exists
            return true;
        }
    }

    class ClassifierShimProxy implements Classifier {
        constructor(private shim: ClassifierShim) {
        }
        getEncodedLexicalClassifications(_text: string, _lexState: EndOfLineState, _classifyKeywordsInGenerics?: boolean): Classifications {
            return notImplemented();
        }
        getClassificationsForLine(text: string, lexState: EndOfLineState, classifyKeywordsInGenerics?: boolean): ClassificationResult {
            const result = this.shim.getClassificationsForLine(text, lexState, classifyKeywordsInGenerics).split("\n");
            const entries: ClassificationInfo[] = [];
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
            throw new OperationCanceledException();
        }
        return parsedResult.result;
    }

    class LanguageServiceShimProxy implements LanguageService {
        constructor(private shim: LanguageServiceShim) {
        }
        cleanupSemanticCache(): void {
            this.shim.cleanupSemanticCache();
        }
        getSyntacticDiagnostics(fileName: string): DiagnosticWithLocation[] {
            return unwrapJSONCallResult(this.shim.getSyntacticDiagnostics(fileName));
        }
        getSemanticDiagnostics(fileName: string): DiagnosticWithLocation[] {
            return unwrapJSONCallResult(this.shim.getSemanticDiagnostics(fileName));
        }
        getSuggestionDiagnostics(fileName: string): DiagnosticWithLocation[] {
            return unwrapJSONCallResult(this.shim.getSuggestionDiagnostics(fileName));
        }
        getCompilerOptionsDiagnostics(): Diagnostic[] {
            return unwrapJSONCallResult(this.shim.getCompilerOptionsDiagnostics());
        }
        getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
            return unwrapJSONCallResult(this.shim.getSyntacticClassifications(fileName, span.start, span.length));
        }
        getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
            return unwrapJSONCallResult(this.shim.getSemanticClassifications(fileName, span.start, span.length));
        }
        getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Classifications {
            return unwrapJSONCallResult(this.shim.getEncodedSyntacticClassifications(fileName, span.start, span.length));
        }
        getEncodedSemanticClassifications(fileName: string, span: TextSpan): Classifications {
            return unwrapJSONCallResult(this.shim.getEncodedSemanticClassifications(fileName, span.start, span.length));
        }
        getCompletionsAtPosition(fileName: string, position: number, preferences: UserPreferences | undefined): CompletionInfo {
            return unwrapJSONCallResult(this.shim.getCompletionsAtPosition(fileName, position, preferences));
        }
        getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: FormatCodeOptions | undefined, source: string | undefined, preferences: UserPreferences | undefined): CompletionEntryDetails {
            return unwrapJSONCallResult(this.shim.getCompletionEntryDetails(fileName, position, entryName, JSON.stringify(formatOptions), source, preferences));
        }
        getCompletionEntrySymbol(): Symbol {
            throw new Error("getCompletionEntrySymbol not implemented across the shim layer.");
        }
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo {
            return unwrapJSONCallResult(this.shim.getQuickInfoAtPosition(fileName, position));
        }
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan {
            return unwrapJSONCallResult(this.shim.getNameOrDottedNameSpan(fileName, startPos, endPos));
        }
        getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan {
            return unwrapJSONCallResult(this.shim.getBreakpointStatementAtPosition(fileName, position));
        }
        getSignatureHelpItems(fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): SignatureHelpItems {
            return unwrapJSONCallResult(this.shim.getSignatureHelpItems(fileName, position, options));
        }
        getRenameInfo(fileName: string, position: number, options?: RenameInfoOptions): RenameInfo {
            return unwrapJSONCallResult(this.shim.getRenameInfo(fileName, position, options));
        }
        getSmartSelectionRange(fileName: string, position: number): SelectionRange {
            return unwrapJSONCallResult(this.shim.getSmartSelectionRange(fileName, position));
        }
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): RenameLocation[] {
            return unwrapJSONCallResult(this.shim.findRenameLocations(fileName, position, findInStrings, findInComments, providePrefixAndSuffixTextForRename));
        }
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            return unwrapJSONCallResult(this.shim.getDefinitionAtPosition(fileName, position));
        }
        getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan {
            return unwrapJSONCallResult(this.shim.getDefinitionAndBoundSpan(fileName, position));
        }
        getTypeDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            return unwrapJSONCallResult(this.shim.getTypeDefinitionAtPosition(fileName, position));
        }
        getImplementationAtPosition(fileName: string, position: number): ImplementationLocation[] {
            return unwrapJSONCallResult(this.shim.getImplementationAtPosition(fileName, position));
        }
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            return unwrapJSONCallResult(this.shim.getReferencesAtPosition(fileName, position));
        }
        findReferences(fileName: string, position: number): ReferencedSymbol[] {
            return unwrapJSONCallResult(this.shim.findReferences(fileName, position));
        }
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            return unwrapJSONCallResult(this.shim.getOccurrencesAtPosition(fileName, position));
        }
        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] {
            return unwrapJSONCallResult(this.shim.getDocumentHighlights(fileName, position, JSON.stringify(filesToSearch)));
        }
        getNavigateToItems(searchValue: string): NavigateToItem[] {
            return unwrapJSONCallResult(this.shim.getNavigateToItems(searchValue));
        }
        getNavigationBarItems(fileName: string): NavigationBarItem[] {
            return unwrapJSONCallResult(this.shim.getNavigationBarItems(fileName));
        }
        getNavigationTree(fileName: string): NavigationTree {
            return unwrapJSONCallResult(this.shim.getNavigationTree(fileName));
        }
        getOutliningSpans(fileName: string): OutliningSpan[] {
            return unwrapJSONCallResult(this.shim.getOutliningSpans(fileName));
        }
        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
            return unwrapJSONCallResult(this.shim.getTodoComments(fileName, JSON.stringify(descriptors)));
        }
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[] {
            return unwrapJSONCallResult(this.shim.getBraceMatchingAtPosition(fileName, position));
        }
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number {
            return unwrapJSONCallResult(this.shim.getIndentationAtPosition(fileName, position, JSON.stringify(options)));
        }
        getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions): TextChange[] {
            return unwrapJSONCallResult(this.shim.getFormattingEditsForRange(fileName, start, end, JSON.stringify(options)));
        }
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[] {
            return unwrapJSONCallResult(this.shim.getFormattingEditsForDocument(fileName, JSON.stringify(options)));
        }
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): TextChange[] {
            return unwrapJSONCallResult(this.shim.getFormattingEditsAfterKeystroke(fileName, position, key, JSON.stringify(options)));
        }
        getDocCommentTemplateAtPosition(fileName: string, position: number): TextInsertion {
            return unwrapJSONCallResult(this.shim.getDocCommentTemplateAtPosition(fileName, position));
        }
        isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean {
            return unwrapJSONCallResult(this.shim.isValidBraceCompletionAtPosition(fileName, position, openingBrace));
        }
        getJsxClosingTagAtPosition(): never {
            throw new Error("Not supported on the shim.");
        }
        getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): TextSpan {
            return unwrapJSONCallResult(this.shim.getSpanOfEnclosingComment(fileName, position, onlyMultiLine));
        }
        getCodeFixesAtPosition(): never {
            throw new Error("Not supported on the shim.");
        }
        getCombinedCodeFix = notImplemented;
        applyCodeActionCommand = notImplemented;
        getCodeFixDiagnostics(): Diagnostic[] {
            throw new Error("Not supported on the shim.");
        }
        getEditsForRefactor(): RefactorEditInfo {
            throw new Error("Not supported on the shim.");
        }
        getApplicableRefactors(): ApplicableRefactorInfo[] {
            throw new Error("Not supported on the shim.");
        }
        organizeImports(_scope: OrganizeImportsScope, _formatOptions: FormatCodeSettings): readonly FileTextChanges[] {
            throw new Error("Not supported on the shim.");
        }
        getEditsForFileRename(): readonly FileTextChanges[] {
            throw new Error("Not supported on the shim.");
        }
        prepareCallHierarchy(fileName: string, position: number) {
            return unwrapJSONCallResult(this.shim.prepareCallHierarchy(fileName, position));
        }
        provideCallHierarchyIncomingCalls(fileName: string, position: number) {
            return unwrapJSONCallResult(this.shim.provideCallHierarchyIncomingCalls(fileName, position));
        }
        provideCallHierarchyOutgoingCalls(fileName: string, position: number) {
            return unwrapJSONCallResult(this.shim.provideCallHierarchyOutgoingCalls(fileName, position));
        }
        getEmitOutput(fileName: string): EmitOutput {
            return unwrapJSONCallResult(this.shim.getEmitOutput(fileName));
        }
        getProgram(): Program {
            throw new Error("Program can not be marshaled across the shim layer.");
        }
        getAutoImportProvider(): Program | undefined {
            throw new Error("Program can not be marshaled across the shim layer.");
        }
        getNonBoundSourceFile(): SourceFile {
            throw new Error("SourceFile can not be marshaled across the shim layer.");
        }
        getSourceFile(): SourceFile {
            throw new Error("SourceFile can not be marshaled across the shim layer.");
        }
        getSourceMapper(): never {
            return notImplemented();
        }
        clearSourceMapperCache(): never {
            return notImplemented();
        }
        dispose(): void { this.shim.dispose({}); }
    }

    export class ShimLanguageServiceAdapter implements LanguageServiceAdapter {
        private host: ShimLanguageServiceHost;
        private factory: TypeScriptServicesFactory;
        constructor(preprocessToResolve: boolean, cancellationToken?: HostCancellationToken, options?: CompilerOptions) {
            this.host = new ShimLanguageServiceHost(preprocessToResolve, cancellationToken, options);
            this.factory = new TypeScriptServicesFactory();
        }
        getHost() { return this.host; }
        getLanguageService(): LanguageService { return new LanguageServiceShimProxy(this.factory.createLanguageServiceShim(this.host)); }
        getClassifier(): Classifier { return new ClassifierShimProxy(this.factory.createClassifierShim(this.host)); }
        getPreProcessedFileInfo(fileName: string, fileContents: string): PreProcessedFileInfo {
            const coreServicesShim = this.factory.createCoreServicesShim(this.host);
            const shimResult: {
                referencedFiles: ShimsFileReference[];
                typeReferenceDirectives: ShimsFileReference[];
                importedFiles: ShimsFileReference[];
                isLibFile: boolean;
            } = unwrapJSONCallResult(coreServicesShim.getPreProcessedFileInfo(fileName, ScriptSnapshot.fromString(fileContents)));

            const convertResult: PreProcessedFileInfo = {
                referencedFiles: [],
                importedFiles: [],
                ambientExternalModules: [],
                isLibFile: shimResult.isLibFile,
                typeReferenceDirectives: [],
                libReferenceDirectives: []
            };

            forEach(shimResult.referencedFiles, refFile => {
                convertResult.referencedFiles.push({
                    fileName: refFile.path,
                    pos: refFile.position,
                    end: refFile.position + refFile.length
                });
            });

            forEach(shimResult.importedFiles, importedFile => {
                convertResult.importedFiles.push({
                    fileName: importedFile.path,
                    pos: importedFile.position,
                    end: importedFile.position + importedFile.length
                });
            });

            forEach(shimResult.typeReferenceDirectives, typeRefDirective => {
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
    class SessionClientHost extends NativeLanguageServiceHost implements server.SessionClientHost {
        private client!: server.SessionClient;

        constructor(cancellationToken: HostCancellationToken | undefined, settings: CompilerOptions | undefined) {
            super(cancellationToken, settings);
        }

        onMessage = noop;
        writeMessage = noop;

        setClient(client: server.SessionClient) {
            this.client = client;
        }

        openFile(fileName: string, content?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void {
            super.openFile(fileName, content, scriptKindName);
            this.client.openFile(fileName, content, scriptKindName);
        }

        editScript(fileName: string, start: number, end: number, newText: string) {
            const changeArgs = this.client.createChangeFileRequestArgs(fileName, start, end, newText);
            super.editScript(fileName, start, end, newText);
            this.client.changeFile(fileName, changeArgs);
        }
    }

    class SessionServerHost implements server.ServerHost, server.Logger {
        args: string[] = [];
        newLine: string;
        useCaseSensitiveFileNames = false;

        constructor(private host: NativeLanguageServiceHost) {
            this.newLine = this.host.getNewLine();
        }

        onMessage = noop;
        writeMessage = noop; // overridden
        write(message: string): void {
            this.writeMessage(message);
        }

        readFile(fileName: string): string | undefined {
            if (stringContains(fileName, Compiler.defaultLibFileName)) {
                fileName = Compiler.defaultLibFileName;
            }

            const snapshot = this.host.getScriptSnapshot(fileName);
            return snapshot && getSnapshotText(snapshot);
        }

        writeFile = noop;

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

        exit = noop;

        createDirectory(_directoryName: string): void {
            return notImplemented();
        }

        getCurrentDirectory(): string {
            return this.host.getCurrentDirectory();
        }

        getDirectories(path: string): string[] {
            return this.host.getDirectories(path);
        }

        getEnvironmentVariable(name: string): string {
            return sys.getEnvironmentVariable(name);
        }

        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
            return this.host.readDirectory(path, extensions, exclude, include, depth);
        }

        watchFile(): FileWatcher {
            return { close: noop };
        }

        watchDirectory(): FileWatcher {
            return { close: noop };
        }

        close = noop;

        info(message: string): void {
            this.host.log(message);
        }

        msg(message: string): void {
            this.host.log(message);
        }

        loggingEnabled() {
            return true;
        }

        getLogFileName(): string | undefined {
            return undefined;
        }

        hasLevel() {
            return false;
        }

        startGroup() { throw notImplemented(); }
        endGroup() { throw notImplemented(); }

        perftrc(message: string): void {
            return this.host.log(message);
        }

        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any {
            // eslint-disable-next-line no-restricted-globals
            return setTimeout(callback, ms, args);
        }

        clearTimeout(timeoutId: any): void {
            // eslint-disable-next-line no-restricted-globals
            clearTimeout(timeoutId);
        }

        setImmediate(callback: (...args: any[]) => void, _ms: number, ...args: any[]): any {
            // eslint-disable-next-line no-restricted-globals
            return setImmediate(callback, args);
        }

        clearImmediate(timeoutId: any): void {
            // eslint-disable-next-line no-restricted-globals
            clearImmediate(timeoutId);
        }

        createHash(s: string) {
            return mockHash(s);
        }

        require(_initialDir: string, _moduleName: string): RequireResult {
            switch (_moduleName) {
                // Adds to the Quick Info a fixed string and a string from the config file
                // and replaces the first display part
                case "quickinfo-augmeneter":
                    return {
                        module: () => ({
                            create(info: server.PluginCreateInfo) {
                                const proxy = makeDefaultProxy(info);
                                const langSvc: any = info.languageService;
                                // eslint-disable-next-line only-arrow-functions
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
                            create(info: server.PluginCreateInfo) {
                                const proxy = makeDefaultProxy(info);
                                proxy.getSemanticDiagnostics = filename => {
                                    const prev = info.languageService.getSemanticDiagnostics(filename);
                                    const sourceFile: SourceFile = info.project.getSourceFile(toPath(filename, /*basePath*/ undefined, createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)))!;
                                    prev.push({
                                        category: DiagnosticCategory.Warning,
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

                // Accepts configurations
                case "configurable-diagnostic-adder":
                    let customMessage = "default message";
                    return {
                        module: () => ({
                            create(info: server.PluginCreateInfo) {
                                customMessage = info.config.message;
                                const proxy = makeDefaultProxy(info);
                                proxy.getSemanticDiagnostics = filename => {
                                    const prev = info.languageService.getSemanticDiagnostics(filename);
                                    const sourceFile: SourceFile = info.project.getSourceFile(toPath(filename, /*basePath*/ undefined, createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)))!;
                                    prev.push({
                                        category: DiagnosticCategory.Error,
                                        file: sourceFile,
                                        code: 9999,
                                        length: 3,
                                        messageText: customMessage,
                                        start: 0
                                    });
                                    return prev;
                                };
                                return proxy;
                            },
                            onConfigurationChanged(config: any) {
                                customMessage = config.message;
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
        }
    }

    class FourslashSession extends server.Session {
        getText(fileName: string) {
            return getSnapshotText(this.projectService.getDefaultProjectForFile(server.toNormalizedPath(fileName), /*ensureProject*/ true)!.getScriptSnapshot(fileName)!);
        }
    }

    export class ServerLanguageServiceAdapter implements LanguageServiceAdapter {
        private host: SessionClientHost;
        private client: server.SessionClient;
        private server: FourslashSession;
        constructor(cancellationToken?: HostCancellationToken, options?: CompilerOptions) {
            // This is the main host that tests use to direct tests
            const clientHost = new SessionClientHost(cancellationToken, options);
            const client = new server.SessionClient(clientHost);

            // This host is just a proxy for the clientHost, it uses the client
            // host to answer server queries about files on disk
            const serverHost = new SessionServerHost(clientHost);
            const opts: server.SessionOptions = {
                host: serverHost,
                cancellationToken: server.nullCancellationToken,
                useSingleInferredProject: false,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller: undefined!, // TODO: GH#18217
                byteLength: Utils.byteLength,
                hrtime: process.hrtime,
                logger: serverHost,
                canUseEvents: true
            };
            this.server = new FourslashSession(opts);


            // Fake the connection between the client and the server
            serverHost.writeMessage = client.onMessage.bind(client);
            clientHost.writeMessage = this.server.onMessage.bind(this.server);

            // Wire the client to the host to get notifications when a file is open
            // or edited.
            clientHost.setClient(client);

            // Set the properties
            this.client = client;
            this.host = clientHost;
        }
        getHost() { return this.host; }
        getLanguageService(): LanguageService { return this.client; }
        getClassifier(): Classifier { throw new Error("getClassifier is not available using the server interface."); }
        getPreProcessedFileInfo(): PreProcessedFileInfo { throw new Error("getPreProcessedFileInfo is not available using the server interface."); }
        assertTextConsistent(fileName: string) {
            const serverText = this.server.getText(fileName);
            const clientText = this.host.readFile(fileName);
            Debug.assert(serverText === clientText, [
                "Server and client text are inconsistent.",
                "",
                "\x1b[1mServer\x1b[0m\x1b[31m:",
                serverText,
                "",
                "\x1b[1mClient\x1b[0m\x1b[31m:",
                clientText,
                "",
                "This probably means something is wrong with the fourslash infrastructure, not with the test."
            ].join(sys.newLine));
        }
    }

