import * as collections from "./_namespaces/collections";
import * as fakes from "./_namespaces/fakes";
import {
    Compiler,
    mockHash,
    virtualFileSystemRoot,
} from "./_namespaces/Harness";
import * as ts from "./_namespaces/ts";
import { getNewLineCharacter } from "./_namespaces/ts";
import * as vfs from "./_namespaces/vfs";
import * as vpath from "./_namespaces/vpath";
import { incrementalVerifier } from "./incrementalUtils";
import {
    createLoggerWithInMemoryLogs,
    HarnessLSCouldNotResolveModule,
    Logger,
} from "./tsserverLogger";

export function makeDefaultProxy(info: ts.server.PluginCreateInfo): ts.LanguageService {
    const proxy = Object.create(/*o*/ null); // eslint-disable-line no-null/no-null
    const langSvc: any = info.languageService;
    for (const k of Object.keys(langSvc)) {
        // eslint-disable-next-line local/only-arrow-functions
        proxy[k] = function () {
            return langSvc[k].apply(langSvc, arguments);
        };
    }
    return proxy;
}

export class ScriptInfo {
    public version = 1;
    public editRanges: { length: number; textChangeRange: ts.TextChangeRange; }[] = [];
    private lineMap: number[] | undefined;

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
        const oldShim = oldScript as ScriptSnapshot;
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

    public getChangeRange(oldScript: ts.ScriptSnapshotShim): string | undefined {
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
    getLogger(): Logger | undefined;
}

export abstract class LanguageServiceAdapterHost {
    public readonly sys = new fakes.System(new vfs.FileSystem(/*ignoreCase*/ true, { cwd: virtualFileSystemRoot }));
    public typesRegistry: Map<string, void> | undefined;
    private scriptInfos: collections.SortedMap<string, ScriptInfo>;

    constructor(protected cancellationToken = DefaultHostCancellationToken.instance,
        protected settings = ts.getDefaultCompilerOptions()) {
        this.scriptInfos = new collections.SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
    }

    public get vfs() {
        return this.sys.vfs;
    }

    public getNewLine(): string {
        return getNewLineCharacter(this.settings);
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

    public realpath(path: string): string {
        try {
            return this.vfs.realpathSync(path);
        }
        catch {
            return path;
        }
    }

    public fileExists(path: string): boolean {
        try {
            return this.vfs.existsSync(path);
        }
        catch {
            return false;
        }
    }

    public readFile(path: string): string | undefined {
        try {
            return this.vfs.readFileSync(path).toString();
        }
        catch {
            return undefined;
        }
    }

    public directoryExists(path: string) {
        return this.vfs.statSync(path).isDirectory();
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
        this.vfs.mkdirpSync(ts.getDirectoryPath(newPath));
        this.vfs.renameSync(oldPath, newPath);

        const updater = ts.getPathUpdater(oldPath, newPath, ts.createGetCanonicalFileName(this.useCaseSensitiveFileNames()), /*sourceMapper*/ undefined);
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
    public positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter {
        const script: ScriptInfo = this.getScriptInfo(fileName)!;
        assert.isOk(script);
        return ts.computeLineAndCharacterOfPosition(script.getLineMap(), position);
    }

    public lineAndCharacterToPosition(fileName: string, lineAndCharacter: ts.LineAndCharacter): number {
        const script: ScriptInfo = this.getScriptInfo(fileName)!;
        assert.isOk(script);
        return ts.computePositionOfLineAndCharacter(script.getLineMap(), lineAndCharacter.line, lineAndCharacter.character);
    }

    useCaseSensitiveFileNames() {
        return !this.vfs.ignoreCase;
    }
}

/// Native adapter
class NativeLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceHost, LanguageServiceAdapterHost {
    isKnownTypesPackageName(name: string): boolean {
        return !!this.typesRegistry && this.typesRegistry.has(name);
    }

    getGlobalTypingsCacheLocation() {
        return "/Library/Caches/typescript";
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

    getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined {
        const script = this.getScriptInfo(fileName);
        return script ? new ScriptSnapshot(script) : undefined;
    }

    getScriptKind(): ts.ScriptKind { return ts.ScriptKind.Unknown; }

    getScriptVersion(fileName: string): string {
        const script = this.getScriptInfo(fileName);
        return script ? script.version.toString() : undefined!; // TODO: GH#18217
    }

    override directoryExists(dirName: string): boolean {
        return this.sys.directoryExists(dirName);
    }

    override fileExists(fileName: string): boolean {
        return this.sys.fileExists(fileName);
    }

    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return this.sys.readDirectory(path, extensions, exclude, include, depth);
    }

    override readFile(path: string): string | undefined {
        return this.sys.readFile(path);
    }

    override realpath(path: string): string {
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
    getLogger = ts.returnUndefined;
    constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
        this.host = new NativeLanguageServiceHost(cancellationToken, options);
    }
    getHost(): LanguageServiceAdapterHost { return this.host; }
    getLanguageService(): ts.LanguageService { return ts.createLanguageService(this.host); }
    getClassifier(): ts.Classifier { return ts.createClassifier(); }
    getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo { return ts.preProcessFile(fileContents, /*readImportFiles*/ true, ts.hasJSFileExtension(fileName)); }
}

/// Shim adapter
class ShimLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceShimHost, ts.CoreServicesShimHost {
    private nativeHost: NativeLanguageServiceHost;

    public getModuleResolutionsForFile: ((fileName: string) => string) | undefined;
    public getTypeReferenceDirectiveResolutionsForFile: ((fileName: string) => string) | undefined;

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
                },
                useCaseSensitiveFileNames: this.useCaseSensitiveFileNames()
            };
            this.getModuleResolutionsForFile = (fileName) => {
                const scriptInfo = this.getScriptInfo(fileName)!;
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

    override getFilenames(): string[] { return this.nativeHost.getFilenames(); }
    override getScriptInfo(fileName: string): ScriptInfo | undefined { return this.nativeHost.getScriptInfo(fileName); }
    override addScript(fileName: string, content: string, isRootFile: boolean): void { this.nativeHost.addScript(fileName, content, isRootFile); }
    override editScript(fileName: string, start: number, end: number, newText: string): void { this.nativeHost.editScript(fileName, start, end, newText); }
    override positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter { return this.nativeHost.positionToLineAndCharacter(fileName, position); }

    getCompilationSettings(): string { return JSON.stringify(this.nativeHost.getCompilationSettings()); }
    getCancellationToken(): ts.HostCancellationToken { return this.nativeHost.getCancellationToken(); }
    getCurrentDirectory(): string { return this.nativeHost.getCurrentDirectory(); }
    getDirectories(path: string): string { return JSON.stringify(this.nativeHost.getDirectories(path)); }
    getDefaultLibFileName(): string { return this.nativeHost.getDefaultLibFileName(); }
    getScriptFileNames(): string { return JSON.stringify(this.nativeHost.getScriptFileNames()); }
    getScriptSnapshot(fileName: string): ts.ScriptSnapshotShim {
        const nativeScriptSnapshot = this.nativeHost.getScriptSnapshot(fileName)!; // TODO: GH#18217
        return nativeScriptSnapshot && new ScriptSnapshotProxy(nativeScriptSnapshot);
    }
    getScriptKind(): ts.ScriptKind { return this.nativeHost.getScriptKind(); }
    getScriptVersion(fileName: string): string { return this.nativeHost.getScriptVersion(fileName); }
    getLocalizedDiagnosticMessages(): string { return JSON.stringify({}); }

    readDirectory = ts.notImplemented;
    readDirectoryNames = ts.notImplemented;
    readFileNames = ts.notImplemented;
    override fileExists(fileName: string) { return this.getScriptInfo(fileName) !== undefined; }
    override readFile(fileName: string) {
        const snapshot = this.nativeHost.getScriptSnapshot(fileName);
        return snapshot && ts.getSnapshotText(snapshot);
    }
    log(s: string): void { this.nativeHost.log(s); }
    trace(s: string): void { this.nativeHost.trace(s); }
    error(s: string): void { this.nativeHost.error(s); }
    override directoryExists(): boolean {
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
    getSyntacticDiagnostics(fileName: string): ts.DiagnosticWithLocation[] {
        return unwrapJSONCallResult(this.shim.getSyntacticDiagnostics(fileName));
    }
    getSemanticDiagnostics(fileName: string): ts.DiagnosticWithLocation[] {
        return unwrapJSONCallResult(this.shim.getSemanticDiagnostics(fileName));
    }
    getSuggestionDiagnostics(fileName: string): ts.DiagnosticWithLocation[] {
        return unwrapJSONCallResult(this.shim.getSuggestionDiagnostics(fileName));
    }
    getCompilerOptionsDiagnostics(): ts.Diagnostic[] {
        return unwrapJSONCallResult(this.shim.getCompilerOptionsDiagnostics());
    }
    getSyntacticClassifications(fileName: string, span: ts.TextSpan): ts.ClassifiedSpan[] {
        return unwrapJSONCallResult(this.shim.getSyntacticClassifications(fileName, span.start, span.length));
    }
    getSemanticClassifications(fileName: string, span: ts.TextSpan, format?: ts.SemanticClassificationFormat): ts.ClassifiedSpan[] {
        return unwrapJSONCallResult(this.shim.getSemanticClassifications(fileName, span.start, span.length, format));
    }
    getEncodedSyntacticClassifications(fileName: string, span: ts.TextSpan): ts.Classifications {
        return unwrapJSONCallResult(this.shim.getEncodedSyntacticClassifications(fileName, span.start, span.length));
    }
    getEncodedSemanticClassifications(fileName: string, span: ts.TextSpan, format?: ts.SemanticClassificationFormat): ts.Classifications {
        const responseFormat = format || ts.SemanticClassificationFormat.Original;
        return unwrapJSONCallResult(this.shim.getEncodedSemanticClassifications(fileName, span.start, span.length, responseFormat));
    }
    getCompletionsAtPosition(fileName: string, position: number, preferences: ts.UserPreferences | undefined, formattingSettings: ts.FormatCodeSettings | undefined): ts.CompletionInfo {
        return unwrapJSONCallResult(this.shim.getCompletionsAtPosition(fileName, position, preferences, formattingSettings));
    }
    getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: ts.FormatCodeOptions | undefined, source: string | undefined, preferences: ts.UserPreferences | undefined, data: ts.CompletionEntryData | undefined): ts.CompletionEntryDetails {
        return unwrapJSONCallResult(this.shim.getCompletionEntryDetails(fileName, position, entryName, JSON.stringify(formatOptions), source, preferences, data));
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
    getSignatureHelpItems(fileName: string, position: number, options: ts.SignatureHelpItemsOptions | undefined): ts.SignatureHelpItems {
        return unwrapJSONCallResult(this.shim.getSignatureHelpItems(fileName, position, options));
    }
    getRenameInfo(fileName: string, position: number, preferences: ts.UserPreferences): ts.RenameInfo {
        return unwrapJSONCallResult(this.shim.getRenameInfo(fileName, position, preferences));
    }
    getSmartSelectionRange(fileName: string, position: number): ts.SelectionRange {
        return unwrapJSONCallResult(this.shim.getSmartSelectionRange(fileName, position));
    }
    findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, preferences?: ts.UserPreferences | boolean): ts.RenameLocation[] {
        return unwrapJSONCallResult(this.shim.findRenameLocations(fileName, position, findInStrings, findInComments, preferences));
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
    getFileReferences(fileName: string): ts.ReferenceEntry[] {
        return unwrapJSONCallResult(this.shim.getFileReferences(fileName));
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
    getDocCommentTemplateAtPosition(fileName: string, position: number, options?: ts.DocCommentTemplateOptions, formatOptions?: ts.FormatCodeSettings): ts.TextInsertion {
        return unwrapJSONCallResult(this.shim.getDocCommentTemplateAtPosition(fileName, position, options, formatOptions));
    }
    isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean {
        return unwrapJSONCallResult(this.shim.isValidBraceCompletionAtPosition(fileName, position, openingBrace));
    }
    getJsxClosingTagAtPosition(): never {
        throw new Error("Not supported on the shim.");
    }
    getLinkedEditingRangeAtPosition(): never {
        throw new Error("Not supported on the shim.");
    }
    getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): ts.TextSpan {
        return unwrapJSONCallResult(this.shim.getSpanOfEnclosingComment(fileName, position, onlyMultiLine));
    }
    getSupportedCodeFixes(): never {
        throw new Error("Not supported on the shim.");
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
    getMoveToRefactoringFileSuggestions(): { newFileName: string, files: string[] } {
        throw new Error("Not supported on the shim.");
    }
    organizeImports(_args: ts.OrganizeImportsArgs, _formatOptions: ts.FormatCodeSettings): readonly ts.FileTextChanges[] {
        throw new Error("Not supported on the shim.");
    }
    getEditsForFileRename(): readonly ts.FileTextChanges[] {
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
    provideInlayHints(fileName: string, span: ts.TextSpan, preference: ts.UserPreferences) {
        return unwrapJSONCallResult(this.shim.provideInlayHints(fileName, span, preference));
    }
    getEmitOutput(fileName: string): ts.EmitOutput {
        return unwrapJSONCallResult(this.shim.getEmitOutput(fileName));
    }
    getProgram(): ts.Program {
        throw new Error("Program can not be marshaled across the shim layer.");
    }
    getCurrentProgram(): ts.Program | undefined {
        throw new Error("Program can not be marshaled across the shim layer.");
    }
    getAutoImportProvider(): ts.Program | undefined {
        throw new Error("Program can not be marshaled across the shim layer.");
    }
    updateIsDefinitionOfReferencedSymbols(_referencedSymbols: readonly ts.ReferencedSymbol[], _knownSymbolSpans: Set<ts.DocumentSpan>): boolean {
        return ts.notImplemented();
    }
    getNonBoundSourceFile(): ts.SourceFile {
        throw new Error("SourceFile can not be marshaled across the shim layer.");
    }
    getSourceFile(): ts.SourceFile {
        throw new Error("SourceFile can not be marshaled across the shim layer.");
    }
    getSourceMapper(): never {
        return ts.notImplemented();
    }
    clearSourceMapperCache(): never {
        return ts.notImplemented();
    }
    toggleLineComment(fileName: string, textRange: ts.TextRange): ts.TextChange[] {
        return unwrapJSONCallResult(this.shim.toggleLineComment(fileName, textRange));
    }
    toggleMultilineComment(fileName: string, textRange: ts.TextRange): ts.TextChange[] {
        return unwrapJSONCallResult(this.shim.toggleMultilineComment(fileName, textRange));
    }
    commentSelection(fileName: string, textRange: ts.TextRange): ts.TextChange[] {
        return unwrapJSONCallResult(this.shim.commentSelection(fileName, textRange));
    }
    uncommentSelection(fileName: string, textRange: ts.TextRange): ts.TextChange[] {
        return unwrapJSONCallResult(this.shim.uncommentSelection(fileName, textRange));
    }
    dispose(): void { this.shim.dispose({}); }
}

export class ShimLanguageServiceAdapter implements LanguageServiceAdapter {
    private host: ShimLanguageServiceHost;
    private factory: ts.TypeScriptServicesFactory;
    getLogger = ts.returnUndefined;
    constructor(preprocessToResolve: boolean, cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
        this.host = new ShimLanguageServiceHost(preprocessToResolve, cancellationToken, options);
        this.factory = new ts.TypeScriptServicesFactory();
    }
    getHost() { return this.host; }
    getLanguageService(): ts.LanguageService { return new LanguageServiceShimProxy(this.factory.createLanguageServiceShim(this.host)); }
    getClassifier(): ts.Classifier { return new ClassifierShimProxy(this.factory.createClassifierShim(this.host)); }
    getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo {
        const coreServicesShim = this.factory.createCoreServicesShim(this.host);
        const shimResult: {
            referencedFiles: ts.ShimsFileReference[];
            typeReferenceDirectives: ts.ShimsFileReference[];
            importedFiles: ts.ShimsFileReference[];
            isLibFile: boolean;
        } = unwrapJSONCallResult(coreServicesShim.getPreProcessedFileInfo(fileName, ts.ScriptSnapshot.fromString(fileContents)));

        const convertResult: ts.PreProcessedFileInfo = {
            referencedFiles: [],
            importedFiles: [],
            ambientExternalModules: [],
            isLibFile: shimResult.isLibFile,
            typeReferenceDirectives: [],
            libReferenceDirectives: []
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
    private client!: ts.server.SessionClient;

    constructor(cancellationToken: ts.HostCancellationToken | undefined, settings: ts.CompilerOptions | undefined) {
        super(cancellationToken, settings);
    }

    onMessage = ts.noop;
    writeMessage = ts.noop;

    setClient(client: ts.server.SessionClient) {
        this.client = client;
    }

    override openFile(fileName: string, content?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void {
        super.openFile(fileName, content, scriptKindName);
        this.client.openFile(fileName, content, scriptKindName);
    }

    override editScript(fileName: string, start: number, end: number, newText: string) {
        const changeArgs = this.client.createChangeFileRequestArgs(fileName, start, end, newText);
        super.editScript(fileName, start, end, newText);
        this.client.changeFile(fileName, changeArgs);
    }
}

class SessionServerHost implements ts.server.ServerHost {
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

        // System FS would follow symlinks, even though snapshots are stored by original file name
        const snapshot = this.host.getScriptSnapshot(fileName) || this.host.getScriptSnapshot(this.realpath(fileName));
        return snapshot && ts.getSnapshotText(snapshot);
    }

    realpath(path: string) {
        return this.host.realpath(path);
    }

    writeFile = ts.noop;

    resolvePath(path: string): string {
        return path;
    }

    fileExists(path: string): boolean {
        return this.host.fileExists(path);
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

    getDirectories(path: string): string[] {
        return this.host.getDirectories(path);
    }

    getEnvironmentVariable(name: string): string {
        return ts.sys.getEnvironmentVariable(name);
    }

    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return this.host.readDirectory(path, extensions, exclude, include, depth);
    }

    watchFile(): ts.FileWatcher {
        return { close: ts.noop };
    }

    watchDirectory(): ts.FileWatcher {
        return { close: ts.noop };
    }

    setTimeout(_callback: (...args: any[]) => void, _ms: number, ..._args: any[]): any {
        // Currently none of the tests use this and we would want something thats deterministic like unittests where we tell which callbacks to invoke
    }

    clearTimeout(_timeoutId: any): void {
        // Currently none of the tests use this and we would want something thats deterministic like unittests where we tell which callbacks to invoke
    }

    setImmediate(_callback: (...args: any[]) => void, ..._args: any[]): any {
        // Currently none of the tests use this and we would want something thats deterministic like unittests where we tell which callbacks to invoke
    }

    clearImmediate(_timeoutId: any): void {
        // Currently none of the tests use this and we would want something thats deterministic like unittests where we tell which callbacks to invoke
    }

    createHash(s: string) {
        return mockHash(s);
    }

    require(_initialDir: string, _moduleName: string): ts.ModuleImportResult {
        switch (_moduleName) {
            // Adds to the Quick Info a fixed string and a string from the config file
            // and replaces the first display part
            case "quickinfo-augmeneter":
                return {
                    module: () => ({
                        create(info: ts.server.PluginCreateInfo) {
                            const proxy = makeDefaultProxy(info);
                            const langSvc: any = info.languageService;
                            // eslint-disable-next-line local/only-arrow-functions
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
                                const sourceFile: ts.SourceFile = info.project.getSourceFile(ts.toPath(filename, /*basePath*/ undefined, ts.createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)))!;
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

            // Accepts configurations
            case "configurable-diagnostic-adder":
                let customMessage = "default message";
                return {
                    module: () => ({
                        create(info: ts.server.PluginCreateInfo) {
                            customMessage = info.config.message;
                            const proxy = makeDefaultProxy(info);
                            proxy.getSemanticDiagnostics = filename => {
                                const prev = info.languageService.getSemanticDiagnostics(filename);
                                const sourceFile: ts.SourceFile = info.project.getSourceFile(ts.toPath(filename, /*basePath*/ undefined, ts.createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)))!;
                                prev.push({
                                    category: ts.DiagnosticCategory.Error,
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
                    error: new Error(HarnessLSCouldNotResolveModule)
                };
        }
    }
}

class FourslashSession extends ts.server.Session {
    getText(fileName: string) {
        return ts.getSnapshotText(this.projectService.getDefaultProjectForFile(ts.server.toNormalizedPath(fileName), /*ensureProject*/ true)!.getScriptSnapshot(fileName)!);
    }
}

// if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
//     this.testhost.baselineHost("Before request");
//     this.logger.info(`request:${ts.server.indent(JSON.stringify(request, undefined, 2))}`);
// }
// const response = super.executeCommand(request);
// if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
//     this.logger.info(`response:${ts.server.indent(JSON.stringify(response.response === ts.getSupportedCodeFixes() ? { ...response, response: "ts.getSupportedCodeFixes()" } : response, undefined, 2))}`);
//     this.testhost.baselineHost("After request");
// }
// return response;
export class ServerLanguageServiceAdapter implements LanguageServiceAdapter {
    private host: SessionClientHost;
    private client: ts.server.SessionClient;
    private server: FourslashSession;
    logger: Logger;
    constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
        // This is the main host that tests use to direct tests
        const clientHost = new SessionClientHost(cancellationToken, options);
        const client = new ts.server.SessionClient(clientHost);

        // This host is just a proxy for the clientHost, it uses the client
        // host to answer server queries about files on disk
        const serverHost = new SessionServerHost(clientHost);
        this.logger = createLoggerWithInMemoryLogs(serverHost, /*sanitizeLibs*/ true);
        const opts: ts.server.SessionOptions = {
            host: serverHost,
            cancellationToken: ts.server.nullCancellationToken,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            typingsInstaller: { ...ts.server.nullTypingsInstaller, globalTypingsCacheLocation: "/Library/Caches/typescript" },
            byteLength: Buffer.byteLength,
            hrtime: process.hrtime,
            logger: this.logger,
            canUseEvents: true,
            incrementalVerifier,
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
    getLogger() { return this.logger; }
    getHost() { return this.host; }
    getLanguageService(): ts.LanguageService { return this.client; }
    getClassifier(): ts.Classifier { throw new Error("getClassifier is not available using the server interface."); }
    getPreProcessedFileInfo(): ts.PreProcessedFileInfo { throw new Error("getPreProcessedFileInfo is not available using the server interface."); }
    assertTextConsistent(fileName: string) {
        const serverText = this.server.getText(fileName);
        const clientText = this.host.readFile(fileName);
        ts.Debug.assert(serverText === clientText, [
            "Server and client text are inconsistent.",
            "",
            "\x1b[1mServer\x1b[0m\x1b[31m:",
            serverText,
            "",
            "\x1b[1mClient\x1b[0m\x1b[31m:",
            clientText,
            "",
            "This probably means something is wrong with the fourslash infrastructure, not with the test."
        ].join(ts.sys.newLine));
    }
}
