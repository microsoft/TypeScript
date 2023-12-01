import * as fakes from "./_namespaces/fakes";
import * as FourSlashInterface from "./_namespaces/FourSlashInterface";
import * as Harness from "./_namespaces/Harness";
import * as ts from "./_namespaces/ts";
import * as Utils from "./_namespaces/Utils";
import * as vfs from "./_namespaces/vfs";
import * as vpath from "./_namespaces/vpath";
import {
    LoggerWithInMemoryLogs,
} from "./tsserverLogger";

import ArrayOrSingle = FourSlashInterface.ArrayOrSingle;

export const enum FourSlashTestType {
    Native,
    Server,
}

// Represents a parsed source file with metadata
interface FourSlashFile {
    // The contents of the file (with markers, etc stripped out)
    content: string;
    fileName: string;
    symlinks?: string[];
    version: number;
    // File-specific options (name/value pairs)
    fileOptions: Harness.TestCaseParser.CompilerSettings;
}

// Represents a set of parsed source files and options
interface FourSlashData {
    // Global options (name/value pairs)
    globalOptions: Harness.TestCaseParser.CompilerSettings;

    files: FourSlashFile[];

    symlinks: vfs.FileSet | undefined;

    // A mapping from marker names to name/position pairs
    markerPositions: Map<string, Marker>;

    markers: Marker[];

    /**
     * Inserted in source files by surrounding desired text
     * in a range with `[|` and `|]`. For example,
     *
     * [|text in range|]
     *
     * is a range with `text in range` "selected".
     */
    ranges: Range[];
    rangesByText?: ts.MultiMap<string, Range>;
}

export interface Marker {
    fileName: string;
    position: number;
    data?: {};
}

export interface Range extends ts.TextRange {
    fileName: string;
    marker?: Marker;
}

export type MarkerOrNameOrRange = string | Marker | Range;

interface LocationInformation {
    position: number;
    sourcePosition: number;
    sourceLine: number;
    sourceColumn: number;
}

interface RangeLocationInformation extends LocationInformation {
    marker?: Marker;
}

export interface TextSpan {
    start: number;
    end: number;
}

// Name of testcase metadata including ts.CompilerOptions properties that will be used by globalOptions
// To add additional option, add property into the testOptMetadataNames, refer the property in either globalMetadataNames or fileMetadataNames
// Add cases into convertGlobalOptionsToCompilationsSettings function for the compiler to acknowledge such option from meta data
const enum MetadataOptionNames {
    baselineFile = "baselinefile",
    emitThisFile = "emitthisfile", // This flag is used for testing getEmitOutput feature. It allows test-cases to indicate what file to be output in multiple files project
    fileName = "filename",
    resolveReference = "resolvereference", // This flag is used to specify entry file for resolve file references. The flag is only allow once per test file
    symlink = "symlink",
}

// List of allowed metadata names
const fileMetadataNames = [MetadataOptionNames.fileName, MetadataOptionNames.emitThisFile, MetadataOptionNames.resolveReference, MetadataOptionNames.symlink];

function convertGlobalOptionsToCompilerOptions(globalOptions: Harness.TestCaseParser.CompilerSettings): ts.CompilerOptions {
    const settings: ts.CompilerOptions = { target: ts.ScriptTarget.ES5, newLine: ts.NewLineKind.CarriageReturnLineFeed };
    Harness.Compiler.setCompilerOptionsFromHarnessSetting(globalOptions, settings);
    return settings;
}

function isMarker(x: Marker | Range): x is Marker {
    return (x as Marker).position !== undefined;
}

function convertDocumentSpanToString<T extends ts.DocumentSpan>(span: T, prefix?: string, ignoredProperties?: readonly string[]) {
    let text = prefix || "";
    for (const p in span) {
        if (p === "textSpan" || p === "fileName" || p === "contextSpan") continue;
        if (ts.contains(ignoredProperties, p)) continue;
        if (ts.hasProperty(span, p) && !!span[p]) { // Serialize truthy properties
            const propText = `${p}: ${JSON.stringify(span[p])}`;
            if (text) text += `, ${propText}`;
            else text = propText;
        }
    }
    return text;
}

function readableJsoncBaseline(content: string) {
    return content.split(/\r?\n/).map(l => "// " + l).join("\n");
}

function indentJsonBaseline(content: string) {
    return content.split(/\r?\n/).map(l => l ? "  " + l : "").join("\n");
}

interface MarkerAndNameForBaseline {
    markerOrRange: MarkerOrNameOrRange;
    markerName: string;
}
interface BaselineDocumentSpansWithFileContentsOptions<T extends ts.DocumentSpan> {
    markerInfo: MarkerAndNameForBaseline | undefined;
    documentSpanId?: (span: T) => string;
    skipDocumentSpanDetails?: boolean;
    skipDocumentContainingOnlyMarker?: boolean;
    endMarker?: string;
    startMarkerPrefix?: (span: T) => string | undefined;
    endMarkerSuffix?: (span: T) => string | undefined;
    ignoredDocumentSpanProperties?: readonly string[];
    additionalSpan?: ts.DocumentSpan;
}

export class TestCancellationToken implements ts.HostCancellationToken {
    // 0 - cancelled
    // >0 - not cancelled
    // <0 - not cancelled and value denotes number of isCancellationRequested after which token become cancelled
    private static readonly notCanceled = -1;
    private numberOfCallsBeforeCancellation = TestCancellationToken.notCanceled;

    public isCancellationRequested(): boolean {
        if (this.numberOfCallsBeforeCancellation < 0) {
            return false;
        }

        if (this.numberOfCallsBeforeCancellation > 0) {
            this.numberOfCallsBeforeCancellation--;
            return false;
        }

        return true;
    }

    public setCancelled(numberOfCalls = 0): void {
        ts.Debug.assert(numberOfCalls >= 0);
        this.numberOfCallsBeforeCancellation = numberOfCalls;
    }

    public resetCancelled(): void {
        this.numberOfCallsBeforeCancellation = TestCancellationToken.notCanceled;
    }
}

export function verifyOperationIsCancelled(f: () => void) {
    try {
        f();
    }
    catch (e) {
        if (e instanceof ts.OperationCanceledException) {
            return;
        }
    }

    throw new Error("Operation should be cancelled");
}

export function ignoreInterpolations(diagnostic: string | ts.DiagnosticMessage): FourSlashInterface.DiagnosticIgnoredInterpolations {
    return { template: typeof diagnostic === "string" ? diagnostic : diagnostic.message };
}

// This function creates IScriptSnapshot object for testing getPreProcessedFileInfo
// Return object may lack some functionalities for other purposes.
function createScriptSnapShot(sourceText: string): ts.IScriptSnapshot {
    return ts.ScriptSnapshot.fromString(sourceText);
}

const enum CallHierarchyItemDirection {
    Root,
    Incoming,
    Outgoing,
}

interface RealizedDiagnostic {
    message: string;
    start: number;
    length: number;
    category: string;
    code: number;
    reportsUnnecessary?: {};
    reportsDeprecated?: {};
}

function realizeDiagnostics(diagnostics: readonly ts.Diagnostic[], newLine: string): RealizedDiagnostic[] {
    return diagnostics.map(d => realizeDiagnostic(d, newLine));
}

function realizeDiagnostic(diagnostic: ts.Diagnostic, newLine: string): RealizedDiagnostic {
    return {
        message: ts.flattenDiagnosticMessageText(diagnostic.messageText, newLine),
        start: diagnostic.start!, // TODO: GH#18217
        length: diagnostic.length!, // TODO: GH#18217
        category: ts.diagnosticCategoryName(diagnostic),
        code: diagnostic.code,
        reportsUnnecessary: diagnostic.reportsUnnecessary,
        reportsDeprecated: diagnostic.reportsDeprecated,
    };
}

interface BaselineTest {
    command: string;
    actual: string;
    ext: string | undefined;
}

export class TestState {
    // Language service instance
    private languageServiceAdapterHost: Harness.LanguageService.LanguageServiceAdapterHost;
    private languageService: ts.LanguageService;
    private cancellationToken: TestCancellationToken;
    private assertTextConsistent: ((fileName: string) => void) | undefined;

    // The current caret position in the active file
    public currentCaretPosition = 0;
    // The position of the end of the current selection, or -1 if nothing is selected
    public selectionEnd = -1;

    public lastKnownMarker: string | undefined;

    // The file that's currently 'opened'
    public activeFile!: FourSlashFile;

    // Whether or not we should format on keystrokes
    public enableFormatting = true;

    public formatCodeSettings: ts.FormatCodeSettings;

    private inputFiles = new Map<string, string>(); // Map between inputFile's fileName and its content for easily looking up when resolving references

    private logger: LoggerWithInMemoryLogs | undefined;

    private static getDisplayPartsJson(displayParts: ts.SymbolDisplayPart[] | undefined) {
        let result = "";
        ts.forEach(displayParts, part => {
            if (result) {
                result += ",\n    ";
            }
            else {
                result = "[\n    ";
            }
            result += JSON.stringify(part);
        });
        if (result) {
            result += "\n]";
        }

        return result;
    }

    // Add input file which has matched file name with the given reference-file path.
    // This is necessary when resolveReference flag is specified
    private addMatchedInputFile(referenceFilePath: string, extensions: readonly string[] | undefined) {
        const inputFiles = this.inputFiles;
        const languageServiceAdapterHost = this.languageServiceAdapterHost;
        const didAdd = tryAdd(referenceFilePath);
        if (extensions && !didAdd) {
            ts.forEach(extensions, ext => tryAdd(referenceFilePath + ext));
        }

        function tryAdd(path: string) {
            const inputFile = inputFiles.get(path);
            if (inputFile && !Harness.isDefaultLibraryFile(path)) {
                languageServiceAdapterHost.addScript(path, inputFile, /*isRootFile*/ true);
                return true;
            }
        }
    }

    private getLanguageServiceAdapter(testType: FourSlashTestType, cancellationToken: TestCancellationToken, compilationOptions: ts.CompilerOptions): Harness.LanguageService.LanguageServiceAdapter {
        switch (testType) {
            case FourSlashTestType.Native:
                return new Harness.LanguageService.NativeLanguageServiceAdapter(cancellationToken, compilationOptions);
            case FourSlashTestType.Server:
                return new Harness.LanguageService.ServerLanguageServiceAdapter(cancellationToken, compilationOptions);
            default:
                throw new Error("Unknown FourSlash test type: ");
        }
    }

    constructor(private originalInputFileName: string, private basePath: string, private testType: FourSlashTestType, public testData: FourSlashData) {
        // Create a new Services Adapter
        this.cancellationToken = new TestCancellationToken();
        let compilationOptions = convertGlobalOptionsToCompilerOptions(this.testData.globalOptions);
        compilationOptions.skipDefaultLibCheck = true;

        // Initialize the language service with all the scripts
        let startResolveFileRef: FourSlashFile | undefined;

        let configFileName: string | undefined;
        for (const file of testData.files) {
            // Create map between fileName and its content for easily looking up when resolveReference flag is specified
            this.inputFiles.set(file.fileName, file.content);
            if (isConfig(file)) {
                const configJson = ts.parseConfigFileTextToJson(file.fileName, file.content);
                if (configJson.config === undefined) {
                    throw new Error(`Failed to parse test ${file.fileName}: ${configJson.error!.messageText}`);
                }

                // Extend our existing compiler options so that we can also support tsconfig only options
                if (configJson.config.compilerOptions) {
                    const baseDirectory = ts.normalizePath(ts.getDirectoryPath(file.fileName));
                    const tsConfig = ts.convertCompilerOptionsFromJson(configJson.config.compilerOptions, baseDirectory, file.fileName);

                    if (!tsConfig.errors || !tsConfig.errors.length) {
                        compilationOptions = ts.extend(tsConfig.options, compilationOptions);
                    }
                }
                configFileName = file.fileName;
            }

            if (!startResolveFileRef && file.fileOptions[MetadataOptionNames.resolveReference] === "true") {
                startResolveFileRef = file;
            }
            else if (startResolveFileRef) {
                // If entry point for resolving file references is already specified, report duplication error
                throw new Error("There exists a Fourslash file which has resolveReference flag specified; remove duplicated resolveReference flag");
            }
        }

        let configParseResult: ts.ParsedCommandLine | undefined;
        if (configFileName) {
            const baseDir = ts.normalizePath(ts.getDirectoryPath(configFileName));
            const files: vfs.FileSet = { [baseDir]: {} };
            this.inputFiles.forEach((data, path) => {
                const scriptInfo = new Harness.LanguageService.ScriptInfo(path, undefined!, /*isRootFile*/ false); // TODO: GH#18217
                files[path] = new vfs.File(data, { meta: { scriptInfo } });
            });
            const fs = new vfs.FileSystem(/*ignoreCase*/ true, { cwd: baseDir, files });
            const host = new fakes.ParseConfigHost(fs);
            const jsonSourceFile = ts.parseJsonText(configFileName, this.inputFiles.get(configFileName)!);
            configParseResult = ts.parseJsonSourceFileConfigFileContent(jsonSourceFile, host, baseDir, compilationOptions, configFileName);
            compilationOptions = configParseResult.options;
        }

        if (compilationOptions.typeRoots) {
            compilationOptions.typeRoots = compilationOptions.typeRoots.map(p => ts.getNormalizedAbsolutePath(p, this.basePath));
        }

        const languageServiceAdapter = this.getLanguageServiceAdapter(testType, this.cancellationToken, compilationOptions);
        this.logger = languageServiceAdapter.getLogger();
        this.languageServiceAdapterHost = languageServiceAdapter.getHost();
        this.languageService = memoWrap(languageServiceAdapter.getLanguageService(), this); // Wrap the LS to cache some expensive operations certain tests call repeatedly
        if (this.testType === FourSlashTestType.Server) {
            this.assertTextConsistent = fileName => (languageServiceAdapter as Harness.LanguageService.ServerLanguageServiceAdapter).assertTextConsistent(fileName);
        }

        if (startResolveFileRef) {
            // Add the entry-point file itself into the languageServiceShimHost
            this.languageServiceAdapterHost.addScript(startResolveFileRef.fileName, startResolveFileRef.content, /*isRootFile*/ true);

            const resolvedResult = languageServiceAdapter.getPreProcessedFileInfo(startResolveFileRef.fileName, startResolveFileRef.content);
            const referencedFiles: ts.FileReference[] = resolvedResult.referencedFiles;
            const importedFiles: ts.FileReference[] = resolvedResult.importedFiles;

            // Add triple reference files into language-service host
            ts.forEach(referencedFiles, referenceFile => {
                // Fourslash insert tests/cases/fourslash into inputFile.unitName so we will properly append the same base directory to refFile path
                const referenceFilePath = this.basePath + "/" + referenceFile.fileName;
                this.addMatchedInputFile(referenceFilePath, /*extensions*/ undefined);
            });

            const exts = ts.flatten(ts.getSupportedExtensions(compilationOptions));
            // Add import files into language-service host
            ts.forEach(importedFiles, importedFile => {
                // Fourslash insert tests/cases/fourslash into inputFile.unitName and import statement doesn't require ".ts"
                // so convert them before making appropriate comparison
                const importedFilePath = this.basePath + "/" + importedFile.fileName;
                this.addMatchedInputFile(importedFilePath, exts);
            });

            // Check if no-default-lib flag is false and if so add default library
            if (!resolvedResult.isLibFile) {
                this.languageServiceAdapterHost.addScript(Harness.Compiler.defaultLibFileName, Harness.Compiler.getDefaultLibrarySourceFile()!.text, /*isRootFile*/ false);

                compilationOptions.lib?.forEach(fileName => {
                    const libFile = Harness.Compiler.getDefaultLibrarySourceFile(fileName);
                    ts.Debug.assertIsDefined(libFile, `Could not find lib file '${fileName}'`);
                    if (libFile) {
                        this.languageServiceAdapterHost.addScript(fileName, libFile.text, /*isRootFile*/ false);
                    }
                });
            }
        }
        else {
            // resolveReference file-option is not specified then do not resolve any files and include all inputFiles
            this.inputFiles.forEach((file, fileName) => {
                if (!Harness.isDefaultLibraryFile(fileName)) {
                    // all files if config file not specified, otherwise root files from the config and typings cache files are root files
                    const isRootFile = !configParseResult ||
                        ts.contains(configParseResult.fileNames, fileName) ||
                        (ts.isDeclarationFileName(fileName) && ts.containsPath("/Library/Caches/typescript", fileName));
                    this.languageServiceAdapterHost.addScript(fileName, file, isRootFile);
                }
            });

            if (!compilationOptions.noLib) {
                const seen = new Set<string>();
                const addSourceFile = (fileName: string) => {
                    if (seen.has(fileName)) return;
                    seen.add(fileName);
                    const libFile = Harness.Compiler.getDefaultLibrarySourceFile(fileName);
                    ts.Debug.assertIsDefined(libFile, `Could not find lib file '${fileName}'`);
                    this.languageServiceAdapterHost.addScript(fileName, libFile.text, /*isRootFile*/ false);
                    if (!ts.some(libFile.libReferenceDirectives)) return;
                    for (const directive of libFile.libReferenceDirectives) {
                        addSourceFile(`lib.${directive.fileName}.d.ts`);
                    }
                };

                addSourceFile(Harness.Compiler.defaultLibFileName);
                compilationOptions.lib?.forEach(addSourceFile);
            }
        }

        for (const file of testData.files) {
            ts.forEach(file.symlinks, link => {
                this.languageServiceAdapterHost.vfs.mkdirpSync(vpath.dirname(link));
                this.languageServiceAdapterHost.vfs.symlinkSync(file.fileName, link);
            });
        }

        if (testData.symlinks) {
            this.languageServiceAdapterHost.vfs.apply(testData.symlinks);
        }

        this.formatCodeSettings = ts.testFormatSettings;

        if (this.logger?.loggingEnabled()) {
            const patch = this.languageServiceAdapterHost.vfs.diff();
            this.logger.log(vfs.formatPatch(patch) || "");
        }

        // Open the first file by default
        this.openFile(0);

        function memoWrap(ls: ts.LanguageService, target: TestState): ts.LanguageService {
            const cacheableMembers: (keyof typeof ls)[] = [
                "getCompletionEntryDetails",
                "getCompletionEntrySymbol",
                "getQuickInfoAtPosition",
                "getReferencesAtPosition",
                "getDocumentHighlights",
            ];
            const proxy = {} as ts.LanguageService;
            const keys = ts.getAllKeys(ls);
            for (const k of keys) {
                const key = k as keyof typeof ls;
                if (!cacheableMembers.includes(key)) {
                    proxy[key] = (...args: any[]) => (ls[key] as (...args: any[]) => any)(...args);
                    continue;
                }
                const memo = Utils.memoize(
                    (_version: number, _active: string, _caret: number, _selectEnd: number, _marker: string | undefined, ...args: any[]) => (ls[key] as (...args: any[]) => any)(...args),
                    (...args) => args.map(a => a && typeof a === "object" ? JSON.stringify(a) : a).join("|,|"),
                );
                proxy[key] = (...args: any[]) =>
                    memo(
                        target.languageServiceAdapterHost.getScriptInfo(target.activeFile.fileName)!.version,
                        target.activeFile.fileName,
                        target.currentCaretPosition,
                        target.selectionEnd,
                        target.lastKnownMarker,
                        ...args,
                    );
            }
            return proxy;
        }
    }

    private baselineFromTest: BaselineTest[] | undefined;

    private baseline(command: string, actual: string, ext?: string) {
        if (!this.baselineFromTest) this.baselineFromTest = [{ command, actual, ext }];
        else this.baselineFromTest.push({ command, actual, ext });
    }

    baselineTest() {
        if (this.baselineFromTest) {
            Harness.Baseline.runBaseline(
                this.getBaselineFileNameForContainingTestFile(this.baselineFromTest[0].ext),
                this.baselineFromTest.map(({ command, actual }) => `// === ${command} ===\n${actual}`).join("\n\n\n\n"),
            );
        }
    }

    baselineTsserverLog() {
        if (this.logger) {
            Harness.Baseline.runBaseline(
                `tsserver/fourslashServer/${ts.getBaseFileName(this.originalInputFileName).replace(".ts", ".js")}`,
                this.logger.logs.join("\n"),
            );
        }
    }

    private getFileContent(fileName: string): string {
        return ts.Debug.checkDefined(this.tryGetFileContent(fileName));
    }
    private tryGetFileContent(fileName: string): string | undefined {
        const script = this.languageServiceAdapterHost.getScriptInfo(fileName);
        return script && script.content;
    }

    // Entry points from fourslash.ts
    public goToMarker(name: string | Marker = "") {
        const marker = ts.isString(name) ? this.getMarkerByName(name) : name;
        if (this.activeFile.fileName !== marker.fileName) {
            this.openFile(marker.fileName);
        }

        const content = this.getFileContent(marker.fileName);
        if (marker.position === -1 || marker.position > content.length) {
            throw new Error(`Marker "${name}" has been invalidated by unrecoverable edits to the file.`);
        }
        const mName = ts.isString(name) ? name : this.markerName(marker);
        this.lastKnownMarker = mName;
        this.goToPosition(marker.position);
    }

    private goToMarkerOrNameOrRange(markerOrRange: MarkerOrNameOrRange) {
        return ts.isString(markerOrRange) || isMarker(markerOrRange) ?
            this.goToMarker(markerOrRange) :
            this.goToRangeStart(markerOrRange);
    }

    public goToEachMarker(markers: readonly Marker[], action: (marker: Marker, index: number) => void) {
        assert(markers.length);
        for (let i = 0; i < markers.length; i++) {
            this.goToMarker(markers[i]);
            action(markers[i], i);
        }
    }

    public goToEachRange(action: (range: Range) => void) {
        const ranges = this.getRanges();
        assert(ranges.length);
        for (const range of ranges) {
            this.selectRange(range);
            action(range);
        }
    }

    public markerName(m: Marker): string {
        return ts.forEachEntry(this.testData.markerPositions, (marker, name) => {
            if (marker === m) {
                return name;
            }
        })!;
    }

    public goToPosition(positionOrLineAndCharacter: number | ts.LineAndCharacter) {
        const pos = typeof positionOrLineAndCharacter === "number"
            ? positionOrLineAndCharacter
            : this.languageServiceAdapterHost.lineAndCharacterToPosition(this.activeFile.fileName, positionOrLineAndCharacter);
        this.currentCaretPosition = pos;
        this.selectionEnd = -1;
    }

    public select(startMarker: string, endMarker: string) {
        const start = this.getMarkerByName(startMarker), end = this.getMarkerByName(endMarker);
        ts.Debug.assert(start.fileName === end.fileName);
        if (this.activeFile.fileName !== start.fileName) {
            this.openFile(start.fileName);
        }
        this.goToPosition(start.position);
        this.selectionEnd = end.position;
    }

    public selectAllInFile(fileName: string) {
        this.openFile(fileName);
        this.goToPosition(0);
        this.selectionEnd = this.activeFile.content.length;
    }

    public selectRange(range: Range): void {
        this.goToRangeStart(range);
        this.selectionEnd = range.end;
    }

    public selectLine(index: number) {
        const lineStart = this.languageServiceAdapterHost.lineAndCharacterToPosition(this.activeFile.fileName, { line: index, character: 0 });
        const lineEnd = lineStart + this.getLineContent(index).length;
        this.selectRange({ fileName: this.activeFile.fileName, pos: lineStart, end: lineEnd });
    }

    public moveCaretRight(count = 1) {
        this.currentCaretPosition += count;
        this.currentCaretPosition = Math.min(this.currentCaretPosition, this.getFileContent(this.activeFile.fileName).length);
        this.selectionEnd = -1;
    }

    // Opens a file given its 0-based index or fileName
    public openFile(indexOrName: number | string, content?: string, scriptKindName?: string): void {
        const fileToOpen: FourSlashFile = this.findFile(indexOrName);
        fileToOpen.fileName = ts.normalizeSlashes(fileToOpen.fileName);
        this.activeFile = fileToOpen;
        // Let the host know that this file is now open
        this.languageServiceAdapterHost.openFile(fileToOpen.fileName, content, scriptKindName);
    }

    public verifyErrorExistsBetweenMarkers(startMarkerName: string, endMarkerName: string, shouldExist: boolean) {
        const startMarker = this.getMarkerByName(startMarkerName);
        const endMarker = this.getMarkerByName(endMarkerName);
        const predicate = (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number | undefined) => ((errorMinChar === startPos) && (errorLimChar === endPos)) ? true : false;

        const exists = this.anyErrorInRange(predicate, startMarker, endMarker);

        if (exists !== shouldExist) {
            this.printErrorLog(shouldExist, this.getAllDiagnostics());
            throw new Error(`${shouldExist ? "Expected" : "Did not expect"} failure between markers: '${startMarkerName}', '${endMarkerName}'`);
        }
    }

    public verifyOrganizeImports(newContent: string, mode?: ts.OrganizeImportsMode, preferences?: ts.UserPreferences) {
        const changes = this.languageService.organizeImports({ fileName: this.activeFile.fileName, type: "file", mode }, this.formatCodeSettings, preferences);
        this.applyChanges(changes);
        this.verifyFileContent(this.activeFile.fileName, newContent);
    }

    private raiseError(message: string): never {
        throw new Error(this.messageAtLastKnownMarker(message));
    }

    private messageAtLastKnownMarker(message: string) {
        const locationDescription = this.lastKnownMarker !== undefined ? this.lastKnownMarker : this.getLineColStringAtPosition(this.currentCaretPosition);
        return `At marker '${locationDescription}': ${message}`;
    }

    private assertionMessageAtLastKnownMarker(msg: string) {
        return "\nMarker: " + this.lastKnownMarker + "\nChecking: " + msg + "\n\n";
    }

    private getDiagnostics(fileName: string, includeSuggestions = false): ts.Diagnostic[] {
        return [
            ...this.languageService.getSyntacticDiagnostics(fileName),
            ...this.languageService.getSemanticDiagnostics(fileName),
            ...(includeSuggestions ? this.languageService.getSuggestionDiagnostics(fileName) : ts.emptyArray),
        ];
    }

    private getAllDiagnostics(): readonly ts.Diagnostic[] {
        return ts.flatMap(this.languageServiceAdapterHost.getFilenames(), fileName => {
            if (!ts.isAnySupportedFileExtension(fileName)) {
                return [];
            }

            const baseName = ts.getBaseFileName(fileName);
            if (baseName === "package.json" || baseName === "tsconfig.json" || baseName === "jsconfig.json") {
                return [];
            }
            return this.getDiagnostics(fileName);
        });
    }

    public verifyErrorExistsAfterMarker(markerName: string, shouldExist: boolean, after: boolean) {
        const marker: Marker = this.getMarkerByName(markerName);
        let predicate: (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number | undefined) => boolean;

        if (after) {
            predicate = (errorMinChar: number, errorLimChar: number, startPos: number) => ((errorMinChar >= startPos) && (errorLimChar >= startPos)) ? true : false;
        }
        else {
            predicate = (errorMinChar: number, errorLimChar: number, startPos: number) => ((errorMinChar <= startPos) && (errorLimChar <= startPos)) ? true : false;
        }

        const exists = this.anyErrorInRange(predicate, marker);
        const diagnostics = this.getAllDiagnostics();

        if (exists !== shouldExist) {
            this.printErrorLog(shouldExist, diagnostics);
            throw new Error(`${shouldExist ? "Expected" : "Did not expect"} failure at marker '${markerName}'`);
        }
    }

    private anyErrorInRange(predicate: (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number | undefined) => boolean, startMarker: Marker, endMarker?: Marker): boolean {
        return this.getDiagnostics(startMarker.fileName).some(({ start, length }) => predicate(start!, start! + length!, startMarker.position, endMarker === undefined ? undefined : endMarker.position)); // TODO: GH#18217
    }

    private printErrorLog(expectErrors: boolean, errors: readonly ts.Diagnostic[]): void {
        if (expectErrors) {
            Harness.IO.log("Expected error not found.  Error list is:");
        }
        else {
            Harness.IO.log("Unexpected error(s) found.  Error list is:");
        }

        for (const { start, length, messageText, file } of errors) {
            Harness.IO.log(
                "  " + this.formatRange(file, start!, length!) + // TODO: GH#18217
                    ", message: " + ts.flattenDiagnosticMessageText(messageText, Harness.IO.newLine()) + "\n",
            );
        }
    }

    private formatRange(file: ts.SourceFile | undefined, start: number, length: number) {
        if (file) {
            return `from: ${this.formatLineAndCharacterOfPosition(file, start)}, to: ${this.formatLineAndCharacterOfPosition(file, start + length)}`;
        }
        return "global";
    }

    private formatLineAndCharacterOfPosition(file: ts.SourceFile, pos: number) {
        if (file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(file, pos);
            return `${line}:${character}`;
        }
        return "global";
    }

    private formatPosition(file: ts.SourceFile, pos: number) {
        if (file) {
            return file.fileName + "@" + pos;
        }
        return "global";
    }

    public verifyNoErrors() {
        ts.forEachKey(this.inputFiles, fileName => {
            if (
                !ts.isAnySupportedFileExtension(fileName)
                || Harness.getConfigNameFromFileName(fileName)
                // Can't get a Program in Server tests
                || this.testType !== FourSlashTestType.Server && !ts.getAllowJSCompilerOption(this.getProgram().getCompilerOptions()) && !ts.resolutionExtensionIsTSOrJson(ts.extensionFromPath(fileName))
                || ts.getBaseFileName(fileName) === "package.json"
            ) return;
            const errors = this.getDiagnostics(fileName).filter(e => e.category !== ts.DiagnosticCategory.Suggestion);
            if (errors.length) {
                this.printErrorLog(/*expectErrors*/ false, errors);
                const error = errors[0];
                const message = typeof error.messageText === "string" ? error.messageText : error.messageText.messageText;
                this.raiseError(`Found an error: ${this.formatPosition(error.file!, error.start!)}: ${message}`);
            }
        });
    }

    public verifyErrorExistsAtRange(range: Range, code: number, expectedMessage?: string) {
        const span = ts.createTextSpanFromRange(range);
        const hasMatchingError = ts.some(
            this.getDiagnostics(range.fileName),
            ({ code, messageText, start, length }) =>
                code === code &&
                (!expectedMessage || expectedMessage === messageText) &&
                ts.isNumber(start) && ts.isNumber(length) &&
                ts.textSpansEqual(span, { start, length }),
        );

        if (!hasMatchingError) {
            this.raiseError(`No error with code ${code} found at provided range.`);
        }
    }

    public verifyNumberOfErrorsInCurrentFile(expected: number) {
        const errors = this.getDiagnostics(this.activeFile.fileName);
        const actual = errors.length;

        if (actual !== expected) {
            this.printErrorLog(/*expectErrors*/ false, errors);
            const errorMsg = "Actual number of errors (" + actual + ") does not match expected number (" + expected + ")";
            Harness.IO.log(errorMsg);
            this.raiseError(errorMsg);
        }
    }

    public verifyEval(expr: string, value: any) {
        const emit = this.languageService.getEmitOutput(this.activeFile.fileName);
        if (emit.outputFiles.length !== 1) {
            throw new Error("Expected exactly one output from emit of " + this.activeFile.fileName);
        }

        const evaluation = new Function(`${emit.outputFiles[0].text};\r\nreturn (${expr});`)(); // eslint-disable-line no-new-func
        if (evaluation !== value) {
            this.raiseError(`Expected evaluation of expression "${expr}" to equal "${value}", but got "${evaluation}"`);
        }
    }

    private getGoToDefinition(): readonly ts.DefinitionInfo[] {
        return this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition)!;
    }

    private getGoToDefinitionAndBoundSpan(): ts.DefinitionInfoAndBoundSpan {
        return this.languageService.getDefinitionAndBoundSpan(this.activeFile.fileName, this.currentCaretPosition)!;
    }

    private renderMarkers(markers: { text: string; fileName: string; position: number; }[], useTerminalBoldSequence = true) {
        const filesToDisplay = ts.deduplicate(markers.map(m => m.fileName), ts.equateValues);
        return filesToDisplay.map(fileName => {
            const markersToRender = markers.filter(m => m.fileName === fileName).sort((a, b) => b.position - a.position);
            let fileContent = this.tryGetFileContent(fileName) || "";
            for (const marker of markersToRender) {
                fileContent = fileContent.slice(0, marker.position) + bold(`/*${marker.text}*/`) + fileContent.slice(marker.position);
            }
            return `// @Filename: ${fileName}\n${fileContent}`;
        }).join("\n\n");

        function bold(text: string) {
            return useTerminalBoldSequence ? `\x1b[1;4m${text}\x1b[0;31m` : text;
        }
    }

    private baselineGoToDefs(
        markerName: string,
        markerOrRange: MarkerOrNameOrRange,
        getDefs: () => readonly ts.DefinitionInfo[] | readonly ts.ImplementationLocation[] | ts.DefinitionInfoAndBoundSpan | undefined,
    ) {
        this.goToMarkerOrNameOrRange(markerOrRange);
        const defs = getDefs();
        const defIdMap = new Map<ts.DefinitionInfo | ts.ImplementationLocation, number>();
        const definitions = defs ? ts.isArray(defs) ? defs : defs.definitions : undefined;
        if (definitions?.length! > 1) {
            definitions!.forEach((def, index) => defIdMap.set(def, index));
        }
        let baseline = this.getBaselineForDocumentSpansWithFileContents<ts.DefinitionInfo | ts.ImplementationLocation>(
            definitions,
            {
                markerInfo: { markerOrRange, markerName },
                documentSpanId: defIdMap.size ? def => `defId: ${defIdMap.get(def)}` : undefined,
                skipDocumentSpanDetails: true,
                additionalSpan: defs && !ts.isArray(defs) ? { fileName: this.activeFile.fileName, textSpan: defs.textSpan } : undefined,
            },
        );
        if (definitions?.length) {
            baseline += "\n\n";
            baseline += indentJsonBaseline(
                "// === Details ===\n" +
                    JSON.stringify(
                        definitions.map(def => ({
                            defId: defIdMap.get(def),
                            ...def,
                            fileName: undefined,
                            textSpan: undefined,
                            contextSpan: undefined,
                        })),
                        undefined,
                        " ",
                    ),
            );
        }
        return baseline;
    }

    public baselineGoToDefinition(
        markerOrRange: MarkerOrNameOrRange[] | undefined,
        rangeText: string[] | undefined,
    ) {
        this.baselineEachMarkerOrRange("goToDefinition", markerOrRange, rangeText, markerOrRange =>
            this.baselineGoToDefs(
                "/*GOTO DEF*/",
                markerOrRange,
                () => this.getGoToDefinitionAndBoundSpan(),
            ));
    }

    public baselineGetDefinitionAtPosition(
        markerOrRange: MarkerOrNameOrRange[] | undefined,
        rangeText: string[] | undefined,
    ) {
        this.baselineEachMarkerOrRange("getDefinitionAtPosition", markerOrRange, rangeText, markerOrRange =>
            this.baselineGoToDefs(
                "/*GOTO DEF POS*/",
                markerOrRange,
                () => this.getGoToDefinition(),
            ));
    }

    public baselineGoToSourceDefinition(
        markerOrRange: MarkerOrNameOrRange[] | undefined,
        rangeText: string[] | undefined,
    ) {
        if (this.testType !== FourSlashTestType.Server) {
            this.raiseError("goToSourceDefinition may only be used in fourslash/server tests.");
        }
        this.baselineEachMarkerOrRange("goToSourceDefinition", markerOrRange, rangeText, markerOrRange =>
            this.baselineGoToDefs(
                "/*GOTO SOURCE DEF*/",
                markerOrRange,
                () =>
                    (this.languageService as ts.server.SessionClient)
                        .getSourceDefinitionAndBoundSpan(this.activeFile.fileName, this.currentCaretPosition),
            ));
    }

    public baselineGoToType(
        markerOrRange: MarkerOrNameOrRange[] | undefined,
        rangeText: string[] | undefined,
    ) {
        this.baselineEachMarkerOrRange("goToType", markerOrRange, rangeText, markerOrRange =>
            this.baselineGoToDefs(
                "/*GOTO TYPE*/",
                markerOrRange,
                () => this.languageService.getTypeDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition),
            ));
    }

    public baselineGoToImplementation(
        markerOrRange: MarkerOrNameOrRange[] | undefined,
        rangeText: string[] | undefined,
    ) {
        this.baselineEachMarkerOrRange("goToImplementation", markerOrRange, rangeText, markerOrRange =>
            this.baselineGoToDefs(
                "/*GOTO IMPL*/",
                markerOrRange,
                () => this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition),
            ));
    }

    public verifyGetEmitOutputForCurrentFile(expected: string): void {
        const emit = this.languageService.getEmitOutput(this.activeFile.fileName);
        if (emit.outputFiles.length !== 1) {
            throw new Error("Expected exactly one output from emit of " + this.activeFile.fileName);
        }
        const actual = emit.outputFiles[0].text;
        if (actual !== expected) {
            this.raiseError(`Expected emit output to be "${expected}", but got "${actual}"`);
        }
    }

    public verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void {
        const emit = this.languageService.getEmitOutput(this.activeFile.fileName);
        assert.equal(emit.outputFiles.length, expected.length, "Number of emit output files");
        ts.zipWith(emit.outputFiles, expected, (outputFile, expected) => {
            assert.equal(outputFile.name, expected.name, "FileName");
            assert.equal(outputFile.text, expected.text, "Content");
        });
    }

    public baselineInlayHints(span: ts.TextSpan = { start: 0, length: this.activeFile.content.length }, preferences?: ts.UserPreferences): void {
        interface HasPosition {
            position: number;
        }
        const sortHints = (a: HasPosition, b: HasPosition) => {
            return a.position - b.position;
        };

        const fileName = this.activeFile.fileName;
        const hints = this.languageService.provideInlayHints(fileName, span, preferences);
        const annotations = ts.map(hints.sort(sortHints), hint => {
            if (hint.displayParts) {
                hint.displayParts = ts.map(hint.displayParts, part => {
                    if (part.file && /lib(?:.*)\.d\.ts$/.test(part.file)) {
                        part.span!.start = -1;
                    }
                    return part;
                });
            }

            const span = { start: hint.position, length: hint.text.length };
            const { character, line } = this.languageServiceAdapterHost.positionToLineAndCharacter(fileName, span.start);
            const underline = " ".repeat(character) + "^";
            let annotation = this.getFileContent(fileName).split(/\r?\n/)[line];
            annotation += "\n" + underline + "\n" + JSON.stringify(hint, undefined, "  ");
            return annotation;
        });

        if (annotations.length === 0) {
            annotations.push("=== No inlay hints ===");
        }

        this.baseline("Inlay Hints", annotations.join("\n\n"));
    }

    public verifyCompletions(options: FourSlashInterface.VerifyCompletionsOptions) {
        if (options.marker === undefined) {
            return this.verifyCompletionsWorker(options);
        }
        else {
            if (ts.isArray(options.marker)) {
                for (const marker of options.marker) {
                    this.goToMarker(marker);
                    this.verifyCompletionsWorker({ ...options, marker });
                }
                return {
                    andApplyCodeAction: () => {
                        this.raiseError(`Cannot apply code action when multiple markers are specified.`);
                    },
                };
            }
            this.goToMarker(options.marker);
            return this.verifyCompletionsWorker({ ...options, marker: options.marker });
        }
    }

    private verifyCompletionsWorker(options: FourSlashInterface.VerifyCompletionsOptions) {
        const preferences = options.preferences;
        const actualCompletions = this.getCompletionListAtCaret({ ...preferences, triggerCharacter: options.triggerCharacter })!;
        if (!actualCompletions) {
            if (ts.hasProperty(options, "exact") && (options.exact === undefined || ts.isArray(options.exact) && !options.exact.length)) {
                return;
            }
            this.raiseError(`No completions at position '${this.currentCaretPosition}'.`);
        }

        if (actualCompletions.isNewIdentifierLocation !== (options.isNewIdentifierLocation || false)) {
            this.raiseError(`Expected 'isNewIdentifierLocation' to be ${options.isNewIdentifierLocation || false}, got ${actualCompletions.isNewIdentifierLocation}`);
        }

        if (ts.hasProperty(options, "isGlobalCompletion") && actualCompletions.isGlobalCompletion !== options.isGlobalCompletion) {
            this.raiseError(`Expected 'isGlobalCompletion to be ${options.isGlobalCompletion}, got ${actualCompletions.isGlobalCompletion}`);
        }

        if (ts.hasProperty(options, "optionalReplacementSpan")) {
            assert.deepEqual(
                actualCompletions.optionalReplacementSpan && actualCompletions.optionalReplacementSpan,
                options.optionalReplacementSpan && ts.createTextSpanFromRange(options.optionalReplacementSpan),
                "Expected 'optionalReplacementSpan' properties to match",
            );
        }

        const nameToEntries = new Map<string, ts.CompletionEntry[]>();
        const nameAndSourceToData = new Map<string, ts.CompletionEntryData | false>();
        for (const entry of actualCompletions.entries) {
            const entries = nameToEntries.get(entry.name);
            if (!entries) {
                nameToEntries.set(entry.name, [entry]);
            }
            else {
                if (
                    entries.some(e =>
                        e.source === entry.source &&
                        e.data?.exportName === entry.data?.exportName &&
                        e.data?.fileName === entry.data?.fileName &&
                        e.data?.moduleSpecifier === entry.data?.moduleSpecifier &&
                        e.data?.ambientModuleName === entry.data?.ambientModuleName
                    )
                ) {
                    this.raiseError(`Duplicate completions for ${entry.name}`);
                }
                entries.push(entry);
            }
            if (entry.data && entry.source) {
                const key = `${entry.name}|${entry.source}`;
                if (nameAndSourceToData.has(key)) {
                    nameAndSourceToData.set(key, false);
                }
                else {
                    nameAndSourceToData.set(key, entry.data);
                }
            }
        }

        if (ts.hasProperty(options, "exact")) {
            ts.Debug.assert(!ts.hasProperty(options, "includes") && !ts.hasProperty(options, "excludes") && !ts.hasProperty(options, "unsorted"));
            if (options.exact === undefined) throw this.raiseError("Expected no completions");
            this.verifyCompletionsAreExactly(actualCompletions.entries, options.exact, options.marker);
        }
        else if (options.unsorted) {
            ts.Debug.assert(!ts.hasProperty(options, "includes") && !ts.hasProperty(options, "excludes"));
            for (const expectedEntry of options.unsorted) {
                const name = typeof expectedEntry === "string" ? expectedEntry : expectedEntry.name;
                const found = nameToEntries.get(name);
                if (!found) throw this.raiseError(`Unsorted: completion '${name}' not found.`);
                if (!found.length) throw this.raiseError(`Unsorted: no completions with name '${name}' remain unmatched.`);
                this.verifyCompletionEntry(found.shift()!, expectedEntry);
            }
            if (actualCompletions.entries.length !== options.unsorted.length) {
                const unmatched: string[] = [];
                nameToEntries.forEach(entries => {
                    unmatched.push(...entries.map(e => e.name));
                });
                this.raiseError(`Additional completions found not included in 'unsorted': ${unmatched.join("\n")}`);
            }
        }
        else {
            if (options.includes) {
                for (const include of toArray(options.includes)) {
                    const name = typeof include === "string" ? include : include.name;
                    const found = nameToEntries.get(name);
                    if (!found) throw this.raiseError(`Includes: completion '${name}' not found.`);
                    if (!found.length) throw this.raiseError(`Includes: no completions with name '${name}' remain unmatched.`);
                    this.verifyCompletionEntry(found.shift()!, include);
                }
            }
            if (options.excludes) {
                for (const exclude of toArray(options.excludes)) {
                    assert(typeof exclude === "string");
                    if (nameToEntries.has(exclude)) {
                        this.raiseError(`Excludes: unexpected completion '${exclude}' found.`);
                    }
                }
            }
        }

        return {
            andApplyCodeAction: (options: {
                name: string;
                source: string;
                description: string;
                newFileContent?: string;
                newRangeContent?: string;
            }) => {
                const { name, source, description, newFileContent, newRangeContent } = options;
                const data = nameAndSourceToData.get(`${options.name}|${options.source}`);
                if (data === false) {
                    this.raiseError(`Multiple completion entries found for '${options.name}' from '${options.source}'. This API cannot be used. Use 'verify.applyCodeActionFromCompletion' instead.`);
                }
                if (data === undefined) {
                    this.raiseError(`No completion entry found for '${options.name}' from '${options.source}'`);
                }
                this.applyCodeActionFromCompletion(/*markerName*/ undefined, { name, source, data, description, newFileContent, newRangeContent, preferences });
            },
        };
    }

    private verifyCompletionEntry(actual: ts.CompletionEntry, expected: FourSlashInterface.ExpectedCompletionEntry) {
        expected = typeof expected === "string" ? { name: expected } : expected;

        if (actual.insertText !== expected.insertText) {
            this.raiseError(`At entry ${actual.name}: Completion insert text did not match: ${showTextDiff(expected.insertText || "", actual.insertText || "")}`);
        }

        const convertedReplacementSpan = expected.replacementSpan && ts.createTextSpanFromRange(expected.replacementSpan);
        if (convertedReplacementSpan) {
            try {
                assert.deepEqual(actual.replacementSpan, convertedReplacementSpan);
            }
            catch {
                this.raiseError(`At entry ${actual.name}: Expected completion replacementSpan to be ${stringify(convertedReplacementSpan)}, got ${stringify(actual.replacementSpan)}`);
            }
        }
        else if (ts.hasProperty(expected, "replacementSpan")) { // Expected `replacementSpan` is explicitly set as `undefined`.
            assert.equal(actual.replacementSpan, undefined, `At entry ${actual.name}: Expected 'replacementSpan' properties to match`);
        }

        if (expected.kind !== undefined || expected.kindModifiers !== undefined) {
            assert.equal(actual.kind, expected.kind, `At entry ${actual.name}: Expected 'kind' for ${actual.name} to match`);
            assert.equal(actual.kindModifiers, expected.kindModifiers || "", `At entry ${actual.name}:  Expected 'kindModifiers' for ${actual.name} to match`);
        }
        if (expected.isFromUncheckedFile !== undefined) {
            assert.equal<boolean | undefined>(actual.isFromUncheckedFile, expected.isFromUncheckedFile, `At entry ${actual.name}: Expected 'isFromUncheckedFile' properties to match`);
        }
        if (expected.isPackageJsonImport !== undefined) {
            assert.equal<boolean | undefined>(actual.isPackageJsonImport, expected.isPackageJsonImport, `At entry ${actual.name}: Expected 'isPackageJsonImport' properties to match`);
        }

        assert.equal(
            actual.filterText,
            expected.filterText,
            `At entry ${actual.name}: Completion 'filterText' not match: ${showTextDiff(expected.filterText || "", actual.filterText || "")}`,
        );
        assert.equal(
            actual.labelDetails?.description,
            expected.labelDetails?.description,
            `At entry ${actual.name}: Completion 'labelDetails.description' did not match: ${showTextDiff(expected.labelDetails?.description || "", actual.labelDetails?.description || "")}`,
        );
        assert.equal(
            actual.labelDetails?.detail,
            expected.labelDetails?.detail,
            `At entry ${actual.name}: Completion 'labelDetails.detail' did not match: ${showTextDiff(expected.labelDetails?.detail || "", actual.labelDetails?.detail || "")}`,
        );
        assert.equal(actual.hasAction, expected.hasAction, `At entry ${actual.name}: Expected 'hasAction' properties to match`);
        assert.equal(actual.isRecommended, expected.isRecommended, `At entry ${actual.name}: Expected 'isRecommended' properties to match'`);
        assert.equal(actual.isSnippet, expected.isSnippet, `At entry ${actual.name}: Expected 'isSnippet' properties to match`);
        assert.equal(actual.source, expected.source, `At entry ${actual.name}: Expected 'source' values to match`);
        assert.equal(actual.sortText, expected.sortText || ts.Completions.SortText.LocationPriority, `At entry ${actual.name}: Expected 'sortText' properties to match`);
        if (expected.sourceDisplay && actual.sourceDisplay) {
            assert.equal(ts.displayPartsToString(actual.sourceDisplay), expected.sourceDisplay, `At entry ${actual.name}: Expected 'sourceDisplay' properties to match`);
        }

        if (expected.text !== undefined) {
            const actualDetails = ts.Debug.checkDefined(this.getCompletionEntryDetails(actual.name, actual.source, actual.data), `No completion details available for name '${actual.name}' and source '${actual.source}'`);
            assert.equal(ts.displayPartsToString(actualDetails.displayParts), expected.text, "Expected 'text' property to match 'displayParts' string");
            assert.equal(ts.displayPartsToString(actualDetails.documentation), expected.documentation || "", "Expected 'documentation' property to match 'documentation' display parts string");
            // TODO: GH#23587
            // assert.equal(actualDetails.kind, actual.kind);
            assert.equal(actualDetails.kindModifiers, actual.kindModifiers, "Expected 'kindModifiers' properties to match");
            assert.equal(actualDetails.source && ts.displayPartsToString(actualDetails.source), expected.sourceDisplay, "Expected 'sourceDisplay' property to match 'source' display parts string");
            if (!actual.sourceDisplay) {
                assert.equal(actualDetails.sourceDisplay && ts.displayPartsToString(actualDetails.sourceDisplay), expected.sourceDisplay, "Expected 'sourceDisplay' property to match 'sourceDisplay' display parts string");
            }
            assert.deepEqual(actualDetails.tags, expected.tags);
        }
        else {
            assert(expected.documentation === undefined && expected.tags === undefined, "If specifying completion details, should specify 'text'");
        }
    }

    private verifyCompletionsAreExactly(actual: readonly ts.CompletionEntry[], expected: ArrayOrSingle<FourSlashInterface.ExpectedCompletionEntry> | FourSlashInterface.ExpectedExactCompletionsPlus, marker?: ArrayOrSingle<string | Marker>) {
        if (!ts.isArray(expected)) {
            expected = [expected];
        }

        // First pass: test that names are right. Then we'll test details.
        assert.deepEqual(actual.map(a => a.name), expected.map(e => typeof e === "string" ? e : e.name), marker ? "At marker " + JSON.stringify(marker) : undefined);

        ts.zipWith(actual, expected, (completion, expectedCompletion, index) => {
            const name = typeof expectedCompletion === "string" ? expectedCompletion : expectedCompletion.name;
            if (completion.name !== name) {
                this.raiseError(`${marker ? JSON.stringify(marker) : ""} Expected completion at index ${index} to be ${name}, got ${completion.name}`);
            }
            this.verifyCompletionEntry(completion, expectedCompletion);
        });

        // All completions were correct in the sort order given. If that order was produced by a function
        // like `completion.globalsPlus`, ensure the "plus" array was sorted in the same way.
        const { plusArgument, plusFunctionName } = expected as FourSlashInterface.ExpectedExactCompletionsPlus;
        if (plusArgument) {
            assert.deepEqual(
                plusArgument,
                expected.filter(entry => plusArgument.includes(entry)),
                `At marker ${JSON.stringify(marker)}: Argument to '${plusFunctionName}' was incorrectly sorted.`,
            );
        }
    }

    /** Use `getProgram` instead of accessing this directly. */
    private _program: ts.Program | undefined | "missing";
    /** Use `getChecker` instead of accessing this directly. */
    private _checker: ts.TypeChecker | undefined;

    private getProgram(): ts.Program {
        if (!this._program) this._program = this.languageService.getProgram() || "missing";
        if (this._program === "missing") ts.Debug.fail("Could not retrieve program from language service");
        return this._program;
    }

    private getChecker() {
        return this._checker || (this._checker = this.getProgram().getTypeChecker());
    }

    private getSourceFile(): ts.SourceFile {
        const { fileName } = this.activeFile;
        const result = this.getProgram().getSourceFile(fileName);
        if (!result) {
            throw new Error(`Could not get source file ${fileName}`);
        }
        return result;
    }

    private getNode(): ts.Node {
        return ts.getTouchingPropertyName(this.getSourceFile(), this.currentCaretPosition);
    }

    private goToAndGetNode(range: Range): ts.Node {
        this.goToRangeStart(range);
        const node = this.getNode();
        this.verifyRange("touching property name", range, node);
        return node;
    }

    private verifyRange(desc: string, expected: ts.TextRange, actual: ts.Node) {
        const actualStart = actual.getStart();
        const actualEnd = actual.getEnd();
        if (actualStart !== expected.pos || actualEnd !== expected.end) {
            this.raiseError(`${desc} should be ${expected.pos}-${expected.end}, got ${actualStart}-${actualEnd}`);
        }
    }

    private verifySymbol(symbol: ts.Symbol, declarationRanges: Range[]) {
        const { declarations } = symbol;
        if (declarations?.length !== declarationRanges.length) {
            this.raiseError(`Expected to get ${declarationRanges.length} declarations, got ${declarations?.length}`);
        }

        ts.zipWith(declarations, declarationRanges, (decl, range) => {
            this.verifyRange("symbol declaration", range, decl);
        });
    }

    public verifySymbolAtLocation(startRange: Range, declarationRanges: Range[]): void {
        const node = this.goToAndGetNode(startRange);
        const symbol = this.getChecker().getSymbolAtLocation(node)!;
        if (!symbol) {
            this.raiseError("Could not get symbol at location");
        }
        this.verifySymbol(symbol, declarationRanges);
    }

    public symbolsInScope(range: Range): ts.Symbol[] {
        const node = this.goToAndGetNode(range);
        return this.getChecker().getSymbolsInScope(node, ts.SymbolFlags.Value | ts.SymbolFlags.Type | ts.SymbolFlags.Namespace);
    }

    public setTypesRegistry(map: ts.MapLike<void>): void {
        this.languageServiceAdapterHost.typesRegistry = new Map(Object.entries(map));
    }

    public verifyTypeOfSymbolAtLocation(range: Range, symbol: ts.Symbol, expected: string): void {
        const node = this.goToAndGetNode(range);
        const checker = this.getChecker();
        const type = checker.getTypeOfSymbolAtLocation(symbol, node);

        const actual = checker.typeToString(type);
        if (actual !== expected) {
            this.raiseError(displayExpectedAndActualString(expected, actual));
        }
    }

    public verifyTypeAtLocation(range: Range, expected: string): void {
        const node = this.goToAndGetNode(range);
        const checker = this.getChecker();
        const type = checker.getTypeAtLocation(node);

        const actual = checker.typeToString(type);
        if (actual !== expected) {
            this.raiseError(displayExpectedAndActualString(expected, actual));
        }
    }

    private baselineEachMarkerOrRangeArrayOrSingle(
        command: string,
        markerOrRange: ArrayOrSingle<MarkerOrNameOrRange> | undefined,
        rangeText: ArrayOrSingle<string> | undefined,
        worker: (markerORange: MarkerOrNameOrRange) => string,
    ) {
        return this.baselineEachMarkerOrRange(
            command,
            markerOrRange !== undefined ? toArray(markerOrRange) : undefined,
            rangeText !== undefined ? toArray(rangeText) : undefined,
            worker,
        );
    }

    private baselineEachMarkerOrRange(
        command: string,
        markerOrRange: readonly MarkerOrNameOrRange[] | undefined,
        rangeText: readonly string[] | undefined,
        worker: (markerORange: MarkerOrNameOrRange) => string,
    ) {
        let done = false;
        if (markerOrRange !== undefined) {
            done = this.baselineArray(command, markerOrRange, worker);
        }
        if (rangeText !== undefined) {
            toArray(rangeText).forEach(text => done = this.baselineArray(command, this.rangesByText().get(text)!, worker) || done);
        }
        if (!done) this.baselineArray(command, this.getRanges(), worker);
    }

    private baselineArray<T>(
        command: string,
        array: readonly T[],
        worker: (single: T) => string,
    ) {
        array.forEach(single => this.baseline(command, worker(single), ".baseline.jsonc"));
        return !!array.length;
    }

    public baselineFindAllReferences(
        markerOrRange: MarkerOrNameOrRange[] | undefined,
        rangeText: string[] | undefined,
    ) {
        this.baselineEachMarkerOrRange("findAllReferences", markerOrRange, rangeText, markerOrRange => {
            this.goToMarkerOrNameOrRange(markerOrRange);
            const references = this.findReferencesAtCaret();
            const defIdMap = new Map<ts.ReferencedSymbolDefinitionInfo | ts.ReferencedSymbolEntry, number>();
            const markerInfo = { markerOrRange, markerName: "/*FIND ALL REFS*/" };
            let baseline = this.getBaselineForDocumentSpansWithFileContents(
                ts.flatMap(references, (r, def) => {
                    if (references!.length > 1) {
                        defIdMap.set(r.definition, def);
                        r.references.forEach(r => defIdMap.set(r, def));
                    }
                    return r.references;
                }),
                {
                    markerInfo,
                    documentSpanId: defIdMap.size ? ref => `defId: ${defIdMap.get(ref)}` : undefined,
                },
            );
            if (references?.length) {
                baseline += "\n\n";
                baseline += indentJsonBaseline(
                    "// === Definitions ===\n" +
                        this.getBaselineForDocumentSpansWithFileContents(
                            references.map(r => r.definition),
                            {
                                markerInfo,
                                documentSpanId: defIdMap.size ? def => `defId: ${defIdMap.get(def)}` : undefined,
                                skipDocumentSpanDetails: true,
                                skipDocumentContainingOnlyMarker: true,
                            },
                        ) +
                        "\n\n// === Details ===\n" +
                        JSON.stringify(
                            references.map(r => ({
                                defId: defIdMap.get(r.definition),
                                ...r.definition,
                                fileName: undefined,
                                textSpan: undefined,
                                contextSpan: undefined,
                            })),
                            undefined,
                            " ",
                        ),
                );
            }
            return baseline;
        });
    }

    public baselineGetFileReferences(fileNames: string[]) {
        this.baselineArray("getFileReferences", fileNames, fileName => {
            const references = this.languageService.getFileReferences(fileName);
            return `// fileName: ${fileName}\n\n` + this.getBaselineForDocumentSpansWithFileContents(
                references,
                { markerInfo: undefined },
            );
        });
    }

    private getBaselineForDocumentSpansWithFileContents<T extends ts.DocumentSpan>(
        spans: readonly T[] | undefined,
        options: BaselineDocumentSpansWithFileContentsOptions<T>,
    ): string {
        // Write input files
        return this.getBaselineForGroupedDocumentSpansWithFileContents(
            spans ? ts.group(spans, span => span.fileName) : ts.emptyArray,
            options,
        );
    }

    private getBaselineForGroupedDocumentSpansWithFileContents<T extends ts.DocumentSpan>(
        spansByFile: readonly (readonly T[])[],
        options: BaselineDocumentSpansWithFileContentsOptions<T>,
    ) {
        const {
            markerInfo,
            documentSpanId,
            skipDocumentSpanDetails,
            skipDocumentContainingOnlyMarker,
            additionalSpan,
        } = options;
        const marker: Marker | undefined = markerInfo !== undefined ?
            ts.isString(markerInfo.markerOrRange) ?
                this.getMarkerByName(markerInfo.markerOrRange) :
                isMarker(markerInfo.markerOrRange) ?
                markerInfo.markerOrRange :
                { fileName: markerInfo.markerOrRange.fileName, position: markerInfo.markerOrRange.pos } :
            undefined;
        const fileBaselines: string[] = [];
        let foundMarker = false;
        let foundAdditionalSpan = false;
        const spanToContextId = new Map<T, number>();
        for (const group of spansByFile) {
            if (group.length) {
                const contentOfFile = this.tryGetFileContent(group[0].fileName);
                if (contentOfFile !== undefined) {
                    fileBaselines.push(this.getBaselineContentForFile(
                        group[0].fileName,
                        contentOfFile,
                        group,
                        marker,
                        options,
                        spanToContextId,
                    ));
                    foundMarker ||= group[0].fileName === marker?.fileName;
                    foundAdditionalSpan ||= !!additionalSpan && additionalSpan.fileName === group[0].fileName;
                }
                else {
                    let baseline = `// === ${group[0].fileName} ===\n// Unavailable file content:\n`;
                    for (const span of group) {
                        baseline += `// textSpan: ${JSON.stringify(span.textSpan)}${span.contextSpan ? `, contextSpan: ${JSON.stringify(span.contextSpan)}` : ""}`;
                        const text = !skipDocumentSpanDetails ?
                            convertDocumentSpanToString(span, documentSpanId?.(span)) :
                            documentSpanId?.(span);
                        if (text) baseline += ` ${text}`;
                        baseline += "\n";
                    }
                    fileBaselines.push(baseline);
                }
            }
        }
        if (additionalSpan && !foundAdditionalSpan) {
            fileBaselines.push(this.getBaselineContentForFile(
                additionalSpan.fileName,
                this.getFileContent(additionalSpan.fileName),
                [additionalSpan],
                marker,
                { markerInfo },
                spanToContextId,
            ));
            foundMarker ||= additionalSpan.fileName === marker?.fileName;
        }
        if (!skipDocumentContainingOnlyMarker && !foundMarker && marker?.fileName) {
            fileBaselines.push(this.getBaselineContentForFile(
                marker.fileName,
                this.getFileContent(marker.fileName),
                ts.emptyArray,
                marker,
                { markerInfo },
                spanToContextId,
            ));
        }
        return fileBaselines.join("\n\n");
    }

    private static readonly nLinesContext = 4;

    private getBaselineContentForFile<T extends ts.DocumentSpan>(
        fileName: string,
        content: string,
        group: readonly T[],
        marker: Marker | undefined,
        {
            markerInfo,
            documentSpanId,
            skipDocumentSpanDetails,
            endMarker,
            startMarkerPrefix,
            endMarkerSuffix,
            ignoredDocumentSpanProperties,
            additionalSpan,
        }: BaselineDocumentSpansWithFileContentsOptions<T>,
        spanToContextId: Map<T, number>,
    ) {
        const isLibFile = /lib(?:.*)\.d\.ts$/.test(fileName);
        let readableContents = `// === ${fileName} ===`;
        let newContent = "";
        interface Detail {
            location: number;
            locationMarker: string;
            span?: T;
            type?: "textStart" | "textEnd" | "contextStart" | "contextEnd";
        }
        const detailPrefixes = new Map<Detail, string>();
        const detailSuffixes = new Map<Detail, string>();
        const details: Detail[] = [];
        let groupedSpanForAdditionalSpan: T | undefined;
        if (fileName === marker?.fileName) details.push({ location: marker.position, locationMarker: markerInfo!.markerName });
        let canDetermineContextIdInline = true;
        for (const span of group) {
            const contextSpanIndex = details.length;
            if (span.contextSpan) {
                details.push({ location: span.contextSpan.start, locationMarker: "<|", span, type: "contextStart" });
                if (canDetermineContextIdInline && span.contextSpan.start > span.textSpan.start) {
                    // Need to do explicit pass to determine contextId since contextId starts after textStart
                    canDetermineContextIdInline = false;
                }
            }
            const textSpanIndex = details.length;
            const textSpanEnd = ts.textSpanEnd(span.textSpan);
            details.push(
                { location: span.textSpan.start, locationMarker: "[|", span, type: "textStart" },
                { location: textSpanEnd, locationMarker: endMarker || "|]", span, type: "textEnd" },
            );
            let contextSpanEnd: number | undefined;
            if (span.contextSpan) {
                contextSpanEnd = ts.textSpanEnd(span.contextSpan);
                details.push({ location: contextSpanEnd, locationMarker: "|>", span, type: "contextEnd" });
            }

            if (additionalSpan && ts.documentSpansEqual(additionalSpan, span, this.languageServiceAdapterHost.useCaseSensitiveFileNames())) {
                // This span is same as text span
                groupedSpanForAdditionalSpan = span;
            }

            const startPrefix = startMarkerPrefix?.(span);
            if (startPrefix) {
                if (fileName === marker?.fileName && span.textSpan.start === marker?.position) {
                    ts.Debug.assert(!detailPrefixes.has(details[0]), "Expected only single prefix at marker location");
                    detailPrefixes.set(details[0], startPrefix);
                }
                else if (span.contextSpan?.start === span.textSpan.start) {
                    // Write it at contextSpan instead of textSpan
                    detailPrefixes.set(details[contextSpanIndex], startPrefix);
                }
                else {
                    // At textSpan
                    detailPrefixes.set(details[textSpanIndex], startPrefix);
                }
            }

            const endSuffix = endMarkerSuffix?.(span);
            if (endSuffix) {
                if (fileName === marker?.fileName && textSpanEnd === marker?.position) {
                    ts.Debug.assert(!detailSuffixes.has(details[0]), "Expected only single suffix at marker location");
                    detailSuffixes.set(details[0], endSuffix);
                }
                else if (contextSpanEnd === textSpanEnd) {
                    // Write it at contextSpan instead of textSpan
                    detailSuffixes.set(details[textSpanIndex + 2], endSuffix);
                }
                else {
                    // At textSpan
                    detailSuffixes.set(details[textSpanIndex + 1], endSuffix);
                }
            }
        }
        let pos = 0;
        const sortedDetails = ts.stableSort(details, (a, b) => ts.compareValues(a.location, b.location));
        if (!canDetermineContextIdInline) {
            // Assign contextIds
            sortedDetails.forEach(({ span, type }) => {
                if (type === "contextStart") {
                    spanToContextId.set(span!, spanToContextId.size);
                }
            });
        }
        const lineStarts = ts.computeLineStarts(content);
        let posLineInfo: { pos: number; line: number; } | undefined;
        // Our preferred way to write marker is
        // /*MARKER*/[| some text |]
        // [| some /*MARKER*/ text |]
        // [| some text |]/*MARKER*/
        // Stable sort should handle first two cases but with that marker will be before rangeEnd if locations match
        // So we will defer writing marker in this case by checking and finding index of rangeEnd if same
        let deferredMarkerIndex: number | undefined;
        sortedDetails.forEach((detail, index) => {
            const { location, locationMarker, span, type } = detail;
            if (!span && deferredMarkerIndex === undefined) {
                // If this is marker position and its same as textEnd and/or contextEnd we want to write marker after those
                for (let matchingEndPosIndex = index + 1; matchingEndPosIndex < sortedDetails.length; matchingEndPosIndex++) {
                    // Defer after the location if its same as rangeEnd
                    if (
                        sortedDetails[matchingEndPosIndex].location === location &&
                        sortedDetails[matchingEndPosIndex].type!.endsWith("End")
                    ) {
                        deferredMarkerIndex = matchingEndPosIndex;
                    }
                    // Dont defer further than already determined
                    break;
                }
                // Defer writing marker position to deffered marker index
                if (deferredMarkerIndex !== undefined) return;
            }
            textWithContext(location, type);
            pos = location;
            // Prefix
            const prefix = detailPrefixes.get(detail);
            if (prefix) newContent += prefix;
            newContent += locationMarker;
            if (span) {
                switch (type) {
                    case "textStart":
                        let text = !skipDocumentSpanDetails ?
                            convertDocumentSpanToString(span, documentSpanId?.(span), ignoredDocumentSpanProperties) :
                            documentSpanId?.(span);
                        if (span === groupedSpanForAdditionalSpan) {
                            text = `textSpan: true` + (text ? `, ${text}` : "");
                        }
                        const contextId = spanToContextId.get(span);
                        if (contextId !== undefined) {
                            let isAfterContextStart = false;
                            for (let textStartIndex = index - 1; textStartIndex >= 0; textStartIndex--) {
                                const textStartDetail = sortedDetails[textStartIndex];
                                if (textStartDetail.type === "contextStart" && textStartDetail.span === span) {
                                    isAfterContextStart = true;
                                    break;
                                }
                                // Marker is ok to skip over
                                if (textStartDetail.span) break;
                            }
                            // Skip contextId on span thats surrounded by context span immediately
                            if (!isAfterContextStart) {
                                text = `contextId: ${contextId}` + (text ? `, ${text}` : "");
                            }
                        }
                        if (text) newContent += `{| ${text} |}`;
                        break;
                    case "contextStart":
                        if (canDetermineContextIdInline) {
                            spanToContextId.set(span, spanToContextId.size);
                        }
                        break;
                }
                if (deferredMarkerIndex === index) {
                    // Write the marker
                    newContent += markerInfo!.markerName;
                    deferredMarkerIndex = undefined;
                    detail = details[0]; // Marker detail
                }
            }
            const suffix = detailSuffixes.get(detail);
            if (suffix) newContent += suffix;
        });
        textWithContext(/*location*/ undefined, /*type*/ undefined);
        return readableContents + (newContent ? "\n" + readableJsoncBaseline(newContent) : "");

        function textWithContext(location: number | undefined, type: Detail["type"]) {
            if (!newContent && location === undefined) ts.Debug.fail("Unsupported");
            if (type !== "textEnd" && type !== "contextEnd") {
                // Calculate pos to location number of lines
                const posLine = posLineInfo?.pos === pos ? posLineInfo.line : ts.computeLineOfPosition(lineStarts, pos, posLineInfo?.line);
                const locationLine = location !== undefined ? ts.computeLineOfPosition(lineStarts, location, posLine) : lineStarts.length - 1;
                if (location !== undefined) posLineInfo = { pos: location, line: locationLine };
                let nLines = 0;
                if (newContent) nLines += TestState.nLinesContext + 1;
                if (location !== undefined) nLines += TestState.nLinesContext + 1;
                // first nLinesContext and last nLinesContext
                if (locationLine - posLine > nLines) {
                    if (newContent) {
                        readableContents = readableContents + "\n" + readableJsoncBaseline(
                            newContent + content.slice(pos, lineStarts[posLine + TestState.nLinesContext]) +
                                `--- (line: ${isLibFile ? "--" : posLine + TestState.nLinesContext + 1}) skipped ---`,
                        );
                        if (location !== undefined) readableContents += "\n";
                        newContent = "";
                    }
                    if (location !== undefined) {
                        newContent += `--- (line: ${isLibFile ? "--" : locationLine - TestState.nLinesContext + 1}) skipped ---\n` +
                            content.slice(lineStarts[locationLine - TestState.nLinesContext + 1], location);
                    }
                    return;
                }
            }
            newContent += content.slice(pos, location);
        }
    }

    private assertObjectsEqual<T>(fullActual: T, fullExpected: T, msgPrefix = ""): void {
        const recur = <U>(actual: U, expected: U, path: string) => {
            const fail = (msg: string) => {
                this.raiseError(`${msgPrefix} At ${path}: ${msg} ${displayExpectedAndActualString(stringify(fullExpected), stringify(fullActual))}`);
            };

            if ((actual === undefined) !== (expected === undefined)) {
                fail(`Expected ${stringify(expected)}, got ${stringify(actual)}`);
            }

            for (const key in actual) {
                if (ts.hasProperty(actual as any, key)) {
                    const ak = actual[key], ek = expected[key];
                    if (typeof ak === "object" && typeof ek === "object") {
                        recur(ak, ek, path ? path + "." + key : key);
                    }
                    else if (ak !== ek) {
                        fail(`Expected '${key}' to be '${stringify(ek)}', got '${stringify(ak)}'`);
                    }
                }
            }

            for (const key in expected) {
                if (ts.hasProperty(expected as any, key)) {
                    if (!ts.hasProperty(actual as any, key)) {
                        fail(`${msgPrefix}Missing property '${key}'`);
                    }
                }
            }
        };

        if (fullActual === undefined || fullExpected === undefined) {
            if (fullActual === fullExpected) {
                return;
            }
            this.raiseError(`${msgPrefix} ${displayExpectedAndActualString(stringify(fullExpected), stringify(fullActual))}`);
        }
        recur(fullActual, fullExpected, "");
    }

    private configure(preferences: ts.UserPreferences) {
        if (this.testType === FourSlashTestType.Server) {
            (this.languageService as ts.server.SessionClient).configure(preferences);
        }
    }

    private getCompletionListAtCaret(options?: ts.GetCompletionsAtPositionOptions): ts.CompletionInfo | undefined {
        if (options) {
            this.configure(options);
        }
        return this.languageService.getCompletionsAtPosition(
            this.activeFile.fileName,
            this.currentCaretPosition,
            options,
            this.formatCodeSettings,
        );
    }

    private getCompletionEntryDetails(entryName: string, source: string | undefined, data: ts.CompletionEntryData | undefined, preferences?: ts.UserPreferences): ts.CompletionEntryDetails | undefined {
        if (preferences) {
            this.configure(preferences);
        }
        return this.languageService.getCompletionEntryDetails(this.activeFile.fileName, this.currentCaretPosition, entryName, this.formatCodeSettings, source, preferences, data);
    }

    private findReferencesAtCaret() {
        return this.languageService.findReferences(this.activeFile.fileName, this.currentCaretPosition);
    }

    public getSyntacticDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]) {
        const diagnostics = this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
        this.testDiagnostics(expected, diagnostics, "error");
    }

    public getSemanticDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]) {
        const diagnostics = this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
        this.testDiagnostics(expected, diagnostics, "error");
    }

    public getSuggestionDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]): void {
        this.testDiagnostics(expected, this.languageService.getSuggestionDiagnostics(this.activeFile.fileName), "suggestion");
    }

    private testDiagnostics(expected: readonly FourSlashInterface.Diagnostic[], diagnostics: readonly ts.Diagnostic[], category: string) {
        assert.deepEqual(
            realizeDiagnostics(diagnostics, "\n"),
            expected.map((e): RealizedDiagnostic => {
                const range = e.range || this.getRangesInFile()[0];
                if (!range) {
                    this.raiseError("Must provide a range for each expected diagnostic, or have one range in the fourslash source.");
                }
                return {
                    message: e.message,
                    category,
                    code: e.code,
                    ...ts.createTextSpanFromRange(range),
                    reportsUnnecessary: e.reportsUnnecessary,
                    reportsDeprecated: e.reportsDeprecated,
                };
            }),
        );
    }

    public verifyQuickInfoAt(markerName: string | Range, expectedText: string, expectedDocumentation?: string, expectedTags?: { name: string; text: string; }[]) {
        if (typeof markerName === "string") this.goToMarker(markerName);
        else this.goToRangeStart(markerName);

        this.verifyQuickInfoString(expectedText, expectedDocumentation, expectedTags);
    }

    public verifyQuickInfos(namesAndTexts: { [name: string]: string | [string, string]; }) {
        for (const name in namesAndTexts) {
            if (ts.hasProperty(namesAndTexts, name)) {
                const text = namesAndTexts[name];
                if (ts.isArray(text)) {
                    assert(text.length === 2);
                    const [expectedText, expectedDocumentation] = text;
                    this.verifyQuickInfoAt(name, expectedText, expectedDocumentation);
                }
                else {
                    this.verifyQuickInfoAt(name, text);
                }
            }
        }
    }

    public verifyQuickInfoString(expectedText: string, expectedDocumentation?: string, expectedTags?: { name: string; text: string; }[]) {
        if (expectedDocumentation === "") {
            throw new Error("Use 'undefined' instead of empty string for `expectedDocumentation`");
        }
        const actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        const actualQuickInfoText = ts.displayPartsToString(actualQuickInfo?.displayParts);
        const actualQuickInfoDocumentation = ts.displayPartsToString(actualQuickInfo?.documentation);
        const actualQuickInfoTags = actualQuickInfo?.tags?.map(tag => ({ name: tag.name, text: ts.displayPartsToString(tag.text) }));

        assert.equal(actualQuickInfoText, expectedText, this.messageAtLastKnownMarker("quick info text"));
        assert.equal(actualQuickInfoDocumentation, expectedDocumentation || "", this.assertionMessageAtLastKnownMarker("quick info doc"));
        if (!expectedTags) {
            // Skip if `expectedTags` is not given
        }
        else if (!actualQuickInfoTags) {
            assert.equal(actualQuickInfoTags, expectedTags, this.messageAtLastKnownMarker("QuickInfo tags"));
        }
        else {
            ts.zipWith(expectedTags, actualQuickInfoTags, (expectedTag, actualTag) => {
                assert.equal(expectedTag.name, actualTag.name);
                assert.equal(expectedTag.text, actualTag.text, this.messageAtLastKnownMarker("QuickInfo tag " + actualTag.name));
            });
        }
    }

    public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: TextSpan, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[] | undefined) {
        const actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition)!;
        assert.equal(actualQuickInfo.kind, kind, this.messageAtLastKnownMarker("QuickInfo kind"));
        assert.equal(actualQuickInfo.kindModifiers, kindModifiers, this.messageAtLastKnownMarker("QuickInfo kindModifiers"));
        assert.equal(JSON.stringify(actualQuickInfo.textSpan), JSON.stringify(textSpan), this.messageAtLastKnownMarker("QuickInfo textSpan"));
        assert.equal(TestState.getDisplayPartsJson(actualQuickInfo.displayParts), TestState.getDisplayPartsJson(displayParts), this.messageAtLastKnownMarker("QuickInfo displayParts"));
        assert.equal(TestState.getDisplayPartsJson(actualQuickInfo.documentation), TestState.getDisplayPartsJson(documentation), this.messageAtLastKnownMarker("QuickInfo documentation"));
        if (!actualQuickInfo.tags || !tags) {
            assert.equal(actualQuickInfo.tags, tags, this.messageAtLastKnownMarker("QuickInfo tags"));
        }
        else {
            assert.equal(actualQuickInfo.tags.length, tags.length, this.messageAtLastKnownMarker("QuickInfo tags"));
            ts.zipWith(tags, actualQuickInfo.tags, (expectedTag, actualTag) => {
                assert.equal(expectedTag.name, actualTag.name);
                assert.equal(expectedTag.text, actualTag.text, this.messageAtLastKnownMarker("QuickInfo tag " + actualTag.name));
            });
        }
    }

    public baselineRename(
        markerOrRange: ArrayOrSingle<MarkerOrNameOrRange> | undefined,
        rangeText: ArrayOrSingle<string> | undefined,
        options: FourSlashInterface.RenameOptions | undefined,
    ) {
        this.baselineEachMarkerOrRangeArrayOrSingle("findRenameLocations", markerOrRange, rangeText, markerOrRange => {
            const { fileName, position } = ts.isString(markerOrRange) ?
                this.getMarkerByName(markerOrRange) :
                isMarker(markerOrRange) ?
                markerOrRange :
                { fileName: markerOrRange.fileName, position: markerOrRange.pos };
            const {
                findInStrings = false,
                findInComments = false,
                providePrefixAndSuffixTextForRename = true,
                quotePreference = "double",
            } = options || {};
            const locations = this.languageService.findRenameLocations(
                fileName,
                position,
                findInStrings,
                findInComments,
                { providePrefixAndSuffixTextForRename, quotePreference },
            );

            if (!locations) {
                this.raiseError(`baselineRename failed. Could not rename at the provided position.`);
            }

            const renameOptions = options ?
                (options.findInStrings !== undefined ? `// @findInStrings: ${findInStrings}\n` : "") +
                (options.findInComments !== undefined ? `// @findInComments: ${findInComments}\n` : "") +
                (options.providePrefixAndSuffixTextForRename !== undefined ? `// @providePrefixAndSuffixTextForRename: ${providePrefixAndSuffixTextForRename}\n` : "") +
                (options.quotePreference !== undefined ? `// @quotePreference: ${quotePreference}\n` : "") :
                "";

            return renameOptions + (renameOptions ? "\n" : "") + this.getBaselineForDocumentSpansWithFileContents(
                locations,
                {
                    markerInfo: { markerOrRange, markerName: "/*RENAME*/" },
                    endMarker: "RENAME|]",
                    startMarkerPrefix: span => span.prefixText ? `/*START PREFIX*/${span.prefixText}` : "",
                    endMarkerSuffix: span => span.suffixText ? `${span.suffixText}/*END SUFFIX*/` : "",
                    ignoredDocumentSpanProperties: ["prefixText", "suffixText"],
                },
            );
        });
    }

    public verifyQuickInfoExists(negative: boolean) {
        const actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        if (negative) {
            if (actualQuickInfo) {
                this.raiseError("verifyQuickInfoExists failed. Expected quick info NOT to exist");
            }
        }
        else {
            if (!actualQuickInfo) {
                this.raiseError("verifyQuickInfoExists failed. Expected quick info to exist");
            }
        }
    }

    public verifySignatureHelpPresence(expectPresent: boolean, triggerReason: ts.SignatureHelpTriggerReason | undefined, markers: readonly (string | Marker)[]) {
        if (markers.length) {
            for (const marker of markers) {
                this.goToMarker(marker);
                this.verifySignatureHelpPresence(expectPresent, triggerReason, ts.emptyArray);
            }
            return;
        }
        const actual = this.getSignatureHelp({ triggerReason });
        if (expectPresent !== !!actual) {
            if (actual) {
                this.raiseError(`Expected no signature help, but got "${stringify(actual)}"`);
            }
            else {
                this.raiseError("Expected signature help, but none was returned.");
            }
        }
    }

    public verifySignatureHelp(optionses: readonly FourSlashInterface.VerifySignatureHelpOptions[]) {
        for (const options of optionses) {
            if (options.marker === undefined) {
                this.verifySignatureHelpWorker(options);
            }
            else {
                for (const marker of toArray(options.marker)) {
                    this.goToMarker(marker);
                    this.verifySignatureHelpWorker(options);
                }
            }
        }
    }

    private verifySignatureHelpWorker(options: FourSlashInterface.VerifySignatureHelpOptions) {
        const help = this.getSignatureHelp({ triggerReason: options.triggerReason })!;
        if (!help) {
            this.raiseError("Could not get a help signature");
        }

        const selectedItem = help.items[options.overrideSelectedItemIndex ?? help.selectedItemIndex];
        // Argument index may exceed number of parameters
        const currentParameter = selectedItem.parameters[help.argumentIndex] as ts.SignatureHelpParameter | undefined;

        assert.equal(help.items.length, options.overloadsCount || 1, this.assertionMessageAtLastKnownMarker("signature help overloads count"));

        assert.equal(ts.displayPartsToString(selectedItem.documentation), options.docComment || "", this.assertionMessageAtLastKnownMarker("current signature help doc comment"));

        if (options.text !== undefined) {
            assert.equal(
                ts.displayPartsToString(selectedItem.prefixDisplayParts) +
                    selectedItem.parameters.map(p => ts.displayPartsToString(p.displayParts)).join(ts.displayPartsToString(selectedItem.separatorDisplayParts)) +
                    ts.displayPartsToString(selectedItem.suffixDisplayParts),
                options.text,
            );
        }
        if (options.parameterName !== undefined) {
            assert.equal(currentParameter!.name, options.parameterName);
        }
        if (options.parameterSpan !== undefined) {
            assert.equal(ts.displayPartsToString(currentParameter!.displayParts), options.parameterSpan);
        }
        if (currentParameter) {
            assert.equal(ts.displayPartsToString(currentParameter.documentation), options.parameterDocComment || "", this.assertionMessageAtLastKnownMarker("current parameter Help DocComment"));
        }
        if (options.parameterCount !== undefined) {
            assert.equal(selectedItem.parameters.length, options.parameterCount);
        }
        if (options.argumentCount !== undefined) {
            assert.equal(help.argumentCount, options.argumentCount);
        }

        assert.equal(selectedItem.isVariadic, !!options.isVariadic);

        const actualTags = selectedItem.tags;
        assert.equal(actualTags.length, (options.tags || ts.emptyArray).length, this.assertionMessageAtLastKnownMarker("signature help tags"));
        ts.zipWith(options.tags || ts.emptyArray, actualTags, (expectedTag, actualTag) => {
            assert.equal(actualTag.name, expectedTag.name);
            assert.deepEqual(actualTag.text, expectedTag.text, this.assertionMessageAtLastKnownMarker("signature help tag " + actualTag.name));
        });

        const allKeys: readonly (keyof FourSlashInterface.VerifySignatureHelpOptions)[] = [
            "marker",
            "triggerReason",
            "overloadsCount",
            "docComment",
            "text",
            "parameterName",
            "parameterSpan",
            "parameterDocComment",
            "parameterCount",
            "isVariadic",
            "tags",
            "argumentCount",
            "overrideSelectedItemIndex",
        ];
        for (const key in options) {
            if (!ts.contains(allKeys, key)) {
                ts.Debug.fail("Unexpected key " + key);
            }
        }
    }

    private validate(name: string, expected: string | undefined, actual: string | undefined) {
        if (expected && expected !== actual) {
            this.raiseError("Expected " + name + " '" + expected + "'.  Got '" + actual + "' instead.");
        }
    }

    public verifyRenameInfoSucceeded(
        displayName: string | undefined,
        fullDisplayName: string | undefined,
        kind: string | undefined,
        kindModifiers: string | undefined,
        fileToRename: string | undefined,
        expectedRange: Range | undefined,
        preferences: ts.UserPreferences | undefined,
    ): void {
        const renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition, preferences || { allowRenameOfImportPath: true });
        if (!renameInfo.canRename) {
            throw this.raiseError("Rename did not succeed");
        }

        this.validate("displayName", displayName, renameInfo.displayName);
        this.validate("fullDisplayName", fullDisplayName, renameInfo.fullDisplayName);
        this.validate("kind", kind, renameInfo.kind);
        this.validate("kindModifiers", kindModifiers, renameInfo.kindModifiers);
        this.validate("fileToRename", fileToRename, renameInfo.fileToRename);

        if (!expectedRange) {
            if (this.getRanges().length !== 1) {
                this.raiseError("Expected a single range to be selected in the test file.");
            }
            expectedRange = this.getRanges()[0];
        }

        if (
            renameInfo.triggerSpan.start !== expectedRange.pos ||
            ts.textSpanEnd(renameInfo.triggerSpan) !== expectedRange.end
        ) {
            this.raiseError(
                "Expected triggerSpan [" + expectedRange.pos + "," + expectedRange.end + ").  Got [" +
                    renameInfo.triggerSpan.start + "," + ts.textSpanEnd(renameInfo.triggerSpan) + ") instead.",
            );
        }
    }

    public verifyRenameInfoFailed(message?: string, preferences?: ts.UserPreferences) {
        const allowRenameOfImportPath = preferences?.allowRenameOfImportPath === undefined ? true : preferences.allowRenameOfImportPath;
        const renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition, { ...preferences, allowRenameOfImportPath });
        if (renameInfo.canRename) {
            throw this.raiseError("Rename was expected to fail");
        }
        this.validate("error", message, renameInfo.localizedErrorMessage);
    }

    private alignmentForExtraInfo = 50;

    private spanLines(file: FourSlashFile, spanInfo: ts.TextSpan, { selection = false, fullLines = false, lineNumbers = false } = {}) {
        if (selection) {
            fullLines = true;
        }

        let contextStartPos = spanInfo.start;
        let contextEndPos = contextStartPos + spanInfo.length;
        if (fullLines) {
            if (contextStartPos > 0) {
                while (contextStartPos > 1) {
                    const ch = file.content.charCodeAt(contextStartPos - 1);
                    if (ch === ts.CharacterCodes.lineFeed || ch === ts.CharacterCodes.carriageReturn) {
                        break;
                    }
                    contextStartPos--;
                }
            }
            if (contextEndPos < file.content.length) {
                while (contextEndPos < file.content.length - 1) {
                    const ch = file.content.charCodeAt(contextEndPos);
                    if (ch === ts.CharacterCodes.lineFeed || ch === ts.CharacterCodes.carriageReturn) {
                        break;
                    }
                    contextEndPos++;
                }
            }
        }

        let contextString: string;
        let contextLineMap: number[];
        let contextStart: ts.LineAndCharacter;
        let contextEnd: ts.LineAndCharacter;
        let selectionStart: ts.LineAndCharacter;
        let selectionEnd: ts.LineAndCharacter;
        let lineNumberPrefixLength: number;
        if (lineNumbers) {
            contextString = file.content;
            contextLineMap = ts.computeLineStarts(contextString);
            contextStart = ts.computeLineAndCharacterOfPosition(contextLineMap, contextStartPos);
            contextEnd = ts.computeLineAndCharacterOfPosition(contextLineMap, contextEndPos);
            selectionStart = ts.computeLineAndCharacterOfPosition(contextLineMap, spanInfo.start);
            selectionEnd = ts.computeLineAndCharacterOfPosition(contextLineMap, ts.textSpanEnd(spanInfo));
            lineNumberPrefixLength = (contextEnd.line + 1).toString().length + 2;
        }
        else {
            contextString = file.content.substring(contextStartPos, contextEndPos);
            contextLineMap = ts.computeLineStarts(contextString);
            contextStart = { line: 0, character: 0 };
            contextEnd = { line: contextLineMap.length - 1, character: 0 };
            selectionStart = selection ? ts.computeLineAndCharacterOfPosition(contextLineMap, spanInfo.start - contextStartPos) : contextStart;
            selectionEnd = selection ? ts.computeLineAndCharacterOfPosition(contextLineMap, ts.textSpanEnd(spanInfo) - contextStartPos) : contextEnd;
            lineNumberPrefixLength = 0;
        }

        const output: string[] = [];
        for (let lineNumber = contextStart.line; lineNumber <= contextEnd.line; lineNumber++) {
            const spanLine = contextString.substring(contextLineMap[lineNumber], contextLineMap[lineNumber + 1]);
            output.push(lineNumbers ? `${`${lineNumber + 1}: `.padStart(lineNumberPrefixLength)}${spanLine}` : spanLine);
            if (selection) {
                if (lineNumber < selectionStart.line || lineNumber > selectionEnd.line) {
                    continue;
                }

                const isEmpty = selectionStart.line === selectionEnd.line && selectionStart.character === selectionEnd.character;
                const selectionPadLength = lineNumber === selectionStart.line ? selectionStart.character : 0;
                const selectionPad = " ".repeat(selectionPadLength + lineNumberPrefixLength);
                const selectionLength = isEmpty ? 0 : Math.max(lineNumber < selectionEnd.line ? spanLine.trimRight().length - selectionPadLength : selectionEnd.character - selectionPadLength, 1);
                const selectionLine = isEmpty ? "<" : "^".repeat(selectionLength);
                output.push(`${selectionPad}${selectionLine}`);
            }
        }
        return output;
    }

    private spanInfoToString(spanInfo: ts.TextSpan, prefixString: string, file: FourSlashFile = this.activeFile) {
        let resultString = "SpanInfo: " + JSON.stringify(spanInfo);
        if (spanInfo) {
            const spanLines = this.spanLines(file, spanInfo);
            for (let i = 0; i < spanLines.length; i++) {
                if (!i) {
                    resultString += "\n";
                }
                resultString += prefixString + spanLines[i];
            }
            resultString += "\n" + prefixString + ":=> (" + this.getLineColStringAtPosition(spanInfo.start, file) + ") to (" + this.getLineColStringAtPosition(ts.textSpanEnd(spanInfo), file) + ")";
        }

        return resultString;
    }

    private baselineCurrentFileLocations(getSpanAtPos: (pos: number) => ts.TextSpan): string {
        const fileLineMap = ts.computeLineStarts(this.activeFile.content);
        let nextLine = 0;
        let resultString = "";
        let currentLine: string;
        let previousSpanInfo: string | undefined;
        let startColumn: number | undefined;
        let length: number | undefined;
        const prefixString = "    >";

        let pos = 0;
        const addSpanInfoString = () => {
            if (previousSpanInfo) {
                resultString += currentLine;
                let thisLineMarker = ts.repeatString(" ", startColumn!) + ts.repeatString("~", length!);
                thisLineMarker += ts.repeatString(" ", this.alignmentForExtraInfo - thisLineMarker.length - prefixString.length + 1);
                resultString += thisLineMarker;
                resultString += "=> Pos: (" + (pos - length!) + " to " + (pos - 1) + ") ";
                resultString += " " + previousSpanInfo;
                previousSpanInfo = undefined;
            }
        };

        for (; pos < this.activeFile.content.length; pos++) {
            if (pos === 0 || pos === fileLineMap[nextLine]) {
                nextLine++;
                addSpanInfoString();
                if (resultString.length) {
                    resultString += "\n--------------------------------";
                }
                currentLine = "\n" + nextLine.toString() + ts.repeatString(" ", 3 - nextLine.toString().length) + ">" + this.activeFile.content.substring(pos, fileLineMap[nextLine]) + "\n    ";
                startColumn = 0;
                length = 0;
            }
            const spanInfo = this.spanInfoToString(getSpanAtPos(pos), prefixString);
            if (previousSpanInfo && previousSpanInfo !== spanInfo) {
                addSpanInfoString();
                previousSpanInfo = spanInfo;
                startColumn = startColumn! + length!;
                length = 1;
            }
            else {
                previousSpanInfo = spanInfo;
                length!++;
            }
        }
        addSpanInfoString();
        return resultString;
    }

    public getBreakpointStatementLocation(pos: number) {
        return this.languageService.getBreakpointStatementAtPosition(this.activeFile.fileName, pos);
    }

    public baselineCurrentFileBreakpointLocations() {
        this.baseline("breakpoints", this.baselineCurrentFileLocations(pos => this.getBreakpointStatementLocation(pos)!));
    }

    private getEmitFiles(): readonly FourSlashFile[] {
        // Find file to be emitted
        const emitFiles: FourSlashFile[] = []; // List of FourSlashFile that has emitThisFile flag on

        const allFourSlashFiles = this.testData.files;
        for (const file of allFourSlashFiles) {
            if (file.fileOptions[MetadataOptionNames.emitThisFile] === "true") {
                // Find a file with the flag emitThisFile turned on
                emitFiles.push(file);
            }
        }

        // If there is not emiThisFile flag specified in the test file, throw an error
        if (emitFiles.length === 0) {
            this.raiseError("No emitThisFile is specified in the test file");
        }

        return emitFiles;
    }

    public verifyGetEmitOutput(expectedOutputFiles: readonly string[]): void {
        const outputFiles = ts.flatMap(this.getEmitFiles(), e => this.languageService.getEmitOutput(e.fileName).outputFiles);

        assert.deepEqual(outputFiles.map(f => f.name), expectedOutputFiles);

        for (const { name, text } of outputFiles) {
            const fromTestFile = this.getFileContent(name);
            if (fromTestFile !== text) {
                this.raiseError(`Emit output for ${name} is not as expected: ${showTextDiff(fromTestFile, text)}`);
            }
        }
    }

    public baselineGetEmitOutput(): void {
        let resultString = "";
        // Loop through all the emittedFiles and emit them one by one
        for (const emitFile of this.getEmitFiles()) {
            const emitOutput = this.languageService.getEmitOutput(emitFile.fileName);
            // Print emitOutputStatus in readable format
            resultString += "EmitSkipped: " + emitOutput.emitSkipped + Harness.IO.newLine();

            if (emitOutput.emitSkipped) {
                resultString += "Diagnostics:" + Harness.IO.newLine();
                const diagnostics = ts.getPreEmitDiagnostics(this.languageService.getProgram()!); // TODO: GH#18217
                for (const diagnostic of diagnostics) {
                    if (!ts.isString(diagnostic.messageText)) {
                        resultString += this.flattenChainedMessage(diagnostic.messageText);
                    }
                    else {
                        resultString += "  " + diagnostic.messageText + Harness.IO.newLine();
                    }
                }
            }

            for (const outputFile of emitOutput.outputFiles) {
                const fileName = "FileName : " + outputFile.name + Harness.IO.newLine();
                resultString = resultString + Harness.IO.newLine() + fileName + outputFile.text;
            }
            resultString += Harness.IO.newLine();
        }

        this.baseline("EmitOutput", resultString);
    }

    private flattenChainedMessage(diag: ts.DiagnosticMessageChain, indent = " ") {
        let result = "";
        result += indent + diag.messageText + Harness.IO.newLine();
        if (diag.next) {
            for (const kid of diag.next) {
                result += this.flattenChainedMessage(kid, indent + " ");
            }
        }
        return result;
    }

    public baselineSyntacticDiagnostics() {
        const files = this.getCompilerTestFiles();
        const result = this.getSyntacticDiagnosticBaselineText(files);
        this.baseline("Syntax Diagnostics", result);
    }

    private getCompilerTestFiles() {
        return ts.map(this.testData.files, ({ content, fileName }) => ({
            content,
            unitName: fileName,
        }));
    }

    public baselineSyntacticAndSemanticDiagnostics() {
        const files = ts.filter(this.getCompilerTestFiles(), f => !ts.endsWith(f.unitName, ".json"));
        const result = this.getSyntacticDiagnosticBaselineText(files)
            + Harness.IO.newLine()
            + Harness.IO.newLine()
            + this.getSemanticDiagnosticBaselineText(files);
        this.baseline("Syntax and Semantic Diagnostics", result);
    }

    private getSyntacticDiagnosticBaselineText(files: Harness.Compiler.TestFile[]) {
        const diagnostics = ts.flatMap(files, file => this.languageService.getSyntacticDiagnostics(file.unitName));
        const result = `Syntactic Diagnostics for file '${this.originalInputFileName}':`
            + Harness.IO.newLine()
            + Harness.Compiler.getErrorBaseline(files, diagnostics, /*pretty*/ false);
        return result;
    }

    private getSemanticDiagnosticBaselineText(files: Harness.Compiler.TestFile[]) {
        const diagnostics = ts.flatMap(files, file => this.languageService.getSemanticDiagnostics(file.unitName));
        const result = `Semantic Diagnostics for file '${this.originalInputFileName}':`
            + Harness.IO.newLine()
            + Harness.Compiler.getErrorBaseline(files, diagnostics, /*pretty*/ false);
        return result;
    }

    public baselineQuickInfo() {
        const result = ts.arrayFrom(this.testData.markerPositions.entries(), ([name, marker]) => ({
            marker: { ...marker, name },
            item: this.languageService.getQuickInfoAtPosition(marker.fileName, marker.position),
        }));
        const annotations = this.annotateContentWithTooltips(
            result,
            "quickinfo",
            item => item.textSpan,
            ({ displayParts, documentation, tags }) => [
                ...(displayParts ? displayParts.map(p => p.text).join("").split("\n") : []),
                ...(documentation?.length ? documentation.map(p => p.text).join("").split("\n") : []),
                ...(tags?.length ? tags.map(p => `@${p.name} ${p.text?.map(dp => dp.text).join("") ?? ""}`).join("\n").split("\n") : []),
            ],
        );
        this.baseline("QuickInfo", annotations + "\n\n" + stringify(result));
    }

    public baselineSignatureHelp() {
        const result = ts.arrayFrom(this.testData.markerPositions.entries(), ([name, marker]) => ({
            marker: { ...marker, name },
            item: this.languageService.getSignatureHelpItems(marker.fileName, marker.position, /*options*/ undefined),
        }));
        const annotations = this.annotateContentWithTooltips(
            result,
            "signature help",
            () => undefined, // use default: marker.position
            (item, previous) => {
                const { documentation, tags, prefixDisplayParts, suffixDisplayParts, separatorDisplayParts, parameters } = item.items[item.selectedItemIndex];
                const tooltip = [];
                let signature = "";
                if (prefixDisplayParts.length) signature += prefixDisplayParts.map(p => p.text).join("");
                const separator = separatorDisplayParts.map(p => p.text).join("");
                signature += parameters.map((p, i) => {
                    const text = p.displayParts.map(dp => dp.text).join("");
                    return i === item.argumentIndex ? "**" + text + "**" : text;
                }).join(separator);
                if (suffixDisplayParts.length) signature += suffixDisplayParts.map(p => p.text).join("");
                tooltip.push(signature);
                // only display signature documentation on the last argument when multiple arguments are marked
                if (previous?.applicableSpan.start !== item.applicableSpan.start) {
                    if (documentation?.length) tooltip.push(...documentation.map(p => p.text).join("").split("\n"));
                    if (tags?.length) {
                        tooltip.push(...tags.map(p => `@${p.name} ${p.text?.map(dp => dp.text).join("") ?? ""}`).join("\n").split("\n"));
                    }
                }
                return tooltip;
            },
        );
        this.baseline("SignatureHelp", annotations + "\n\n" + stringify(result));
    }

    public baselineCompletions(preferences?: ts.UserPreferences) {
        const result = ts.arrayFrom(this.testData.markerPositions.entries(), ([name, marker]) => {
            this.goToMarker(marker);
            const completions = this.getCompletionListAtCaret(preferences);
            return {
                marker: { ...marker, name },
                item: {
                    ...completions,
                    entries: completions?.entries.map(entry => ({
                        ...entry,
                        ...this.getCompletionEntryDetails(entry.name, entry.source, entry.data, preferences),
                    })),
                },
            };
        });
        const annotations = this.annotateContentWithTooltips(
            result,
            "completions",
            item => item.optionalReplacementSpan,
            item =>
                item.entries?.flatMap(
                    entry =>
                        entry.displayParts
                            ? entry.displayParts.map(p => p.text).join("").split("\n")
                            : [`(${entry.kindModifiers}${entry.kind}) ${entry.name}`],
                ),
        );
        for (const r of result) {
            for (const entry of r.item.entries ?? ts.emptyArray) {
                for (const tag of entry.tags ?? ts.emptyArray) {
                    for (const part of tag.text ?? ts.emptyArray) {
                        if (part.kind === "linkName") {
                            const link = part as ts.JSDocLinkDisplayPart;
                            if (/lib(?:.*)\.d\.ts$/.test(link.target.fileName)) {
                                // The object literal isn't a complete TextSpan, but we're only going to
                                // use these results in the baseline for diffing, so just overwrite.
                                (link.target.textSpan as any) = { start: "--", length: "--" };
                            }
                        }
                    }
                }
            }
        }
        this.baseline(
            "Completions",
            annotations + "\n\n" + stringify(result, (key, value) => {
                return key === "exportMapKey"
                    ? value.replace(/ \d+ /g, " * ")
                    : value;
            }),
        );
    }

    private annotateContentWithTooltips<
        T extends ts.QuickInfo | ts.SignatureHelpItems | {
            optionalReplacementSpan?: ts.TextSpan;
            entries?: {
                name: string;
                kind: string;
                kindModifiers?: string;
                displayParts?: unknown;
            }[];
        },
    >(
        items: ({
            marker: Marker & { name: string; };
            item: T | undefined;
        })[],
        opName: "completions" | "quickinfo" | "signature help",
        getSpan: (t: T) => ts.TextSpan | undefined,
        getToolTipContents: (t: T, prev: T | undefined) => string[] | undefined,
    ): string {
        const bar = "-".repeat(70);
        const sorted = items.slice();
        // sort by file, then *backwards* by position in the file so I can insert multiple times on a line without counting
        sorted.sort((q1, q2) =>
            q1.marker.fileName === q1.marker.fileName
                ? (q1.marker.position > q2.marker.position ? -1 : 1)
                : (q1.marker.fileName > q1.marker.fileName ? 1 : -1)
        );
        const files = new Map<string, string[]>();
        let previous: T | undefined;
        for (const { marker, item } of sorted) {
            const span = (item ? getSpan(item) : undefined) ?? { start: marker.position, length: 1 };
            const startLc = this.languageServiceAdapterHost.positionToLineAndCharacter(marker.fileName, span.start);
            const underline = " ".repeat(startLc.character) + "^".repeat(span.length);
            let tooltip = [
                bar,
                ...(item ? getToolTipContents(item, previous) : undefined) ?? [`No ${opName} at /*${marker.name}*/.`],
                bar,
            ];
            tooltip = tooltip.map(l => "| " + l);
            const lines = files.get(marker.fileName) ?? this.getFileContent(marker.fileName).split(/\r?\n/);
            lines.splice(startLc.line + 1, 0, underline, ...tooltip);
            files.set(marker.fileName, lines);
            previous = item;
        }
        return Array.from(files.entries(), ([fileName, lines]) => `=== ${fileName} ===\n` + lines.map(l => "// " + l).join("\n"))
            .join("\n\n");
    }

    public baselineSmartSelection() {
        const n = "\n";
        const markers = this.getMarkers();
        const fileContent = this.activeFile.content;
        const text = markers.map(marker => {
            const baselineContent = [fileContent.slice(0, marker.position) + "/**/" + fileContent.slice(marker.position) + n];
            let selectionRange: ts.SelectionRange | undefined = this.languageService.getSmartSelectionRange(this.activeFile.fileName, marker.position);
            while (selectionRange) {
                const { textSpan } = selectionRange;
                let masked = ts.arrayFrom(fileContent).map((char, index) => {
                    const charCode = char.charCodeAt(0);
                    if (index >= textSpan.start && index < ts.textSpanEnd(textSpan)) {
                        return char === " " ? "•" : ts.isLineBreak(charCode) ? `↲${n}` : char;
                    }
                    return ts.isLineBreak(charCode) ? char : " ";
                }).join("");
                masked = masked.replace(/^\s*$\r?\n?/gm, ""); // Remove blank lines
                const isRealCharacter = (char: string) => char !== "•" && char !== "↲" && !ts.isWhiteSpaceLike(char.charCodeAt(0));
                const leadingWidth = ts.arrayFrom(masked).findIndex(isRealCharacter);
                const trailingWidth = ts.findLastIndex(ts.arrayFrom(masked), isRealCharacter);
                masked = masked.slice(0, leadingWidth)
                    + masked.slice(leadingWidth, trailingWidth).replace(/•/g, " ").replace(/↲/g, "")
                    + masked.slice(trailingWidth);
                baselineContent.push(masked);
                selectionRange = selectionRange.parent;
            }
            return baselineContent.join(fileContent.includes("\n") ? n + n : n);
        }).join(n.repeat(2) + "=".repeat(80) + n.repeat(2));

        this.baseline("Smart Selection", text);
    }

    public printBreakpointLocation(pos: number) {
        Harness.IO.log("\n**Pos: " + pos + " " + this.spanInfoToString(this.getBreakpointStatementLocation(pos)!, "  "));
    }

    public printBreakpointAtCurrentLocation() {
        this.printBreakpointLocation(this.currentCaretPosition);
    }

    public printCurrentParameterHelp() {
        const help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition, /*options*/ undefined);
        Harness.IO.log(stringify(help));
    }

    public printCurrentQuickInfo() {
        const quickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition)!;
        Harness.IO.log("Quick Info: " + quickInfo.displayParts!.map(part => part.text).join(""));
    }

    public printErrorList() {
        const syntacticErrors = this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
        const semanticErrors = this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
        const errorList = ts.concatenate(syntacticErrors, semanticErrors);
        Harness.IO.log(`Error list (${errorList.length} errors)`);

        if (errorList.length) {
            errorList.forEach(err => {
                Harness.IO.log(
                    "start: " + err.start +
                        ", length: " + err.length +
                        ", message: " + ts.flattenDiagnosticMessageText(err.messageText, Harness.IO.newLine()),
                );
            });
        }
    }

    public printCurrentFileState(showWhitespace: boolean, makeCaretVisible: boolean) {
        for (const file of this.testData.files) {
            const active = this.activeFile === file;
            Harness.IO.log(`=== Script (${file.fileName}) ${(active ? "(active, cursor at |)" : "")} ===`);
            let content = this.getFileContent(file.fileName);
            if (active) {
                content = content.substr(0, this.currentCaretPosition) + (makeCaretVisible ? "|" : "") + content.substr(this.currentCaretPosition);
            }
            if (showWhitespace) {
                content = makeWhitespaceVisible(content);
            }
            Harness.IO.log(content);
        }
    }

    public printCurrentSignatureHelp() {
        const help = this.getSignatureHelp(ts.emptyOptions)!;
        Harness.IO.log(stringify(help.items[help.selectedItemIndex]));
    }

    private getBaselineFileNameForContainingTestFile(ext = ".baseline") {
        return this.testData.globalOptions[MetadataOptionNames.baselineFile] ||
            ts.getBaseFileName(this.originalInputFileName).replace(ts.Extension.Ts, ext);
    }

    private getSignatureHelp({ triggerReason }: FourSlashInterface.VerifySignatureHelpOptions): ts.SignatureHelpItems | undefined {
        return this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition, {
            triggerReason,
        });
    }

    public printCompletionListMembers(preferences: ts.UserPreferences | undefined) {
        const completions = this.getCompletionListAtCaret(preferences);
        this.printMembersOrCompletions(completions);
    }

    private printMembersOrCompletions(info: ts.CompletionInfo | undefined) {
        if (info === undefined) return "No completion info.";
        const { entries } = info;

        function pad(s: string, length: number) {
            return s + new Array(length - s.length + 1).join(" ");
        }
        function max<T>(arr: T[], selector: (x: T) => number): number {
            return arr.reduce((prev, x) => Math.max(prev, selector(x)), 0);
        }
        const longestNameLength = max(entries, m => m.name.length);
        const longestKindLength = max(entries, m => m.kind.length);
        entries.sort((m, n) => m.sortText > n.sortText ? 1 : m.sortText < n.sortText ? -1 : m.name > n.name ? 1 : m.name < n.name ? -1 : 0);
        const membersString = entries.map(m => `${pad(m.name, longestNameLength)} ${pad(m.kind, longestKindLength)} ${m.kindModifiers} ${m.isRecommended ? "recommended " : ""}${m.source === undefined ? "" : m.source}`).join("\n");
        Harness.IO.log(membersString);
    }

    public printContext() {
        ts.forEach(this.languageServiceAdapterHost.getFilenames(), Harness.IO.log);
    }

    public deleteChar(count = 1) {
        let offset = this.currentCaretPosition;
        const ch = "";

        const checkCadence = (count >> 2) + 1;

        for (let i = 0; i < count; i++) {
            this.editScriptAndUpdateMarkers(this.activeFile.fileName, offset, offset + 1, ch);

            if (i % checkCadence === 0) {
                this.checkPostEditInvariants();
            }

            // Handle post-keystroke formatting
            if (this.enableFormatting) {
                const edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeSettings);
                if (edits.length) {
                    offset += this.applyEdits(this.activeFile.fileName, edits);
                }
            }
        }

        this.checkPostEditInvariants();
    }

    public replace(start: number, length: number, text: string) {
        this.editScriptAndUpdateMarkers(this.activeFile.fileName, start, start + length, text);
        this.checkPostEditInvariants();
    }

    public deleteLineRange(startIndex: number, endIndexInclusive: number) {
        const startPos = this.languageServiceAdapterHost.lineAndCharacterToPosition(this.activeFile.fileName, { line: startIndex, character: 0 });
        const endPos = this.languageServiceAdapterHost.lineAndCharacterToPosition(this.activeFile.fileName, { line: endIndexInclusive + 1, character: 0 });
        this.replace(startPos, endPos - startPos, "");
    }

    public caretPosition(): Marker {
        return { fileName: this.activeFile.fileName, position: this.currentCaretPosition };
    }

    public deleteCharBehindMarker(count = 1) {
        let offset = this.currentCaretPosition;
        const ch = "";
        const checkCadence = (count >> 2) + 1;

        for (let i = 0; i < count; i++) {
            this.currentCaretPosition--;
            offset--;
            this.editScriptAndUpdateMarkers(this.activeFile.fileName, offset, offset + 1, ch);

            if (i % checkCadence === 0) {
                this.checkPostEditInvariants();
            }

            // Don't need to examine formatting because there are no formatting changes on backspace.
        }

        this.checkPostEditInvariants();
    }

    // Enters lines of text at the current caret position
    public type(text: string, highFidelity = false) {
        let offset = this.currentCaretPosition;
        const prevChar = " ";
        const checkCadence = (text.length >> 2) + 1;
        const selection = this.getSelection();
        this.replace(selection.pos, selection.end - selection.pos, "");

        for (let i = 0; i < text.length; i++) {
            const ch = text.charAt(i);
            this.editScriptAndUpdateMarkers(this.activeFile.fileName, offset, offset, ch);
            if (highFidelity) {
                this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, offset);
            }

            this.currentCaretPosition++;
            offset++;

            if (highFidelity) {
                if (ch === "(" || ch === "," || ch === "<") {
                    /* Signature help*/
                    this.languageService.getSignatureHelpItems(this.activeFile.fileName, offset, {
                        triggerReason: {
                            kind: "characterTyped",
                            triggerCharacter: ch,
                        },
                    });
                }
                else if (prevChar === " " && /A-Za-z_/.test(ch)) {
                    /* Completions */
                    this.languageService.getCompletionsAtPosition(this.activeFile.fileName, offset, ts.emptyOptions);
                }

                if (i % checkCadence === 0) {
                    this.checkPostEditInvariants();
                }
            }

            // Handle post-keystroke formatting
            if (this.enableFormatting) {
                const edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeSettings);
                if (edits.length) {
                    offset += this.applyEdits(this.activeFile.fileName, edits);
                }
            }
        }

        this.checkPostEditInvariants();
    }

    // Enters text as if the user had pasted it
    public paste(text: string) {
        const start = this.currentCaretPosition;
        this.editScriptAndUpdateMarkers(this.activeFile.fileName, this.currentCaretPosition, this.currentCaretPosition, text);
        this.checkPostEditInvariants();
        const offset = this.currentCaretPosition += text.length;

        // Handle formatting
        if (this.enableFormatting) {
            const edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, offset, this.formatCodeSettings);
            if (edits.length) {
                this.applyEdits(this.activeFile.fileName, edits);
            }
        }

        this.checkPostEditInvariants();
    }

    private checkPostEditInvariants() {
        if (this.testType !== FourSlashTestType.Native) {
            // getSourcefile() results can not be serialized. Only perform these verifications
            // if running against a native LS object.
            return;
        }

        const incrementalSourceFile = this.languageService.getNonBoundSourceFile(this.activeFile.fileName);
        Utils.assertInvariants(incrementalSourceFile, /*parent:*/ undefined);

        const incrementalSyntaxDiagnostics = incrementalSourceFile.parseDiagnostics;

        // Check syntactic structure
        const content = this.getFileContent(this.activeFile.fileName);

        const options: ts.CreateSourceFileOptions = {
            languageVersion: ts.ScriptTarget.Latest,
            impliedNodeFormat: ts.getImpliedNodeFormatForFile(
                ts.toPath(this.activeFile.fileName, this.languageServiceAdapterHost.sys.getCurrentDirectory(), ts.hostGetCanonicalFileName(this.languageServiceAdapterHost)),
                /*packageJsonInfoCache*/ undefined,
                this.languageServiceAdapterHost,
                this.languageService.getProgram()?.getCompilerOptions() || {},
            ),
            setExternalModuleIndicator: ts.getSetExternalModuleIndicator(this.languageService.getProgram()?.getCompilerOptions() || {}),
            jsDocParsingMode: this.languageServiceAdapterHost.jsDocParsingMode,
        };
        const referenceSourceFile = ts.createLanguageServiceSourceFile(
            this.activeFile.fileName,
            createScriptSnapShot(content),
            options,
            /*version:*/ "0",
            /*setNodeParents*/ false,
        );
        const referenceSyntaxDiagnostics = referenceSourceFile.parseDiagnostics;

        Utils.assertDiagnosticsEquals(incrementalSyntaxDiagnostics, referenceSyntaxDiagnostics);
        Utils.assertStructuralEquals(incrementalSourceFile, referenceSourceFile);
    }

    /**
     * @returns The number of characters added to the file as a result of the edits.
     * May be negative.
     */
    private applyEdits(fileName: string, edits: readonly ts.TextChange[]): number {
        let runningOffset = 0;

        forEachTextChange(edits, edit => {
            const offsetStart = edit.span.start;
            const offsetEnd = offsetStart + edit.span.length;
            this.editScriptAndUpdateMarkers(fileName, offsetStart, offsetEnd, edit.newText);
            const editDelta = edit.newText.length - edit.span.length;
            if (offsetStart <= this.currentCaretPosition) {
                if (offsetEnd <= this.currentCaretPosition) {
                    // The entirety of the edit span falls before the caret position, shift the caret accordingly
                    this.currentCaretPosition += editDelta;
                }
                else {
                    // The span being replaced includes the caret position, place the caret at the beginning of the span
                    this.currentCaretPosition = offsetStart;
                }
            }
            runningOffset += editDelta;
        });

        return runningOffset;
    }

    public copyFormatOptions(): ts.FormatCodeSettings {
        return ts.clone(this.formatCodeSettings);
    }

    public setFormatOptions(formatCodeOptions: ts.FormatCodeOptions | ts.FormatCodeSettings): ts.FormatCodeSettings {
        const oldFormatCodeOptions = this.formatCodeSettings;
        this.formatCodeSettings = ts.toEditorSettings(formatCodeOptions);
        if (this.testType === FourSlashTestType.Server) {
            (this.languageService as ts.server.SessionClient).setFormattingOptions(this.formatCodeSettings);
        }
        return oldFormatCodeOptions;
    }

    public formatDocument() {
        const edits = this.languageService.getFormattingEditsForDocument(this.activeFile.fileName, this.formatCodeSettings);
        this.applyEdits(this.activeFile.fileName, edits);
    }

    public formatSelection(start: number, end: number) {
        const edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, end, this.formatCodeSettings);
        this.applyEdits(this.activeFile.fileName, edits);
    }

    public formatOnType(pos: number, key: string) {
        const edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, pos, key, this.formatCodeSettings);
        this.applyEdits(this.activeFile.fileName, edits);
    }

    private editScriptAndUpdateMarkers(fileName: string, editStart: number, editEnd: number, newText: string) {
        this.languageServiceAdapterHost.editScript(fileName, editStart, editEnd, newText);
        if (this.assertTextConsistent) {
            this.assertTextConsistent(fileName);
        }
        for (const marker of this.testData.markers) {
            if (marker.fileName === fileName) {
                marker.position = updatePosition(marker.position, editStart, editEnd, newText);
            }
        }

        for (const range of this.testData.ranges) {
            if (range.fileName === fileName) {
                range.pos = updatePosition(range.pos, editStart, editEnd, newText);
                range.end = updatePosition(range.end, editStart, editEnd, newText);
            }
        }
        this.testData.rangesByText = undefined;
    }

    private removeWhitespace(text: string): string {
        return text.replace(/\s/g, "");
    }

    public goToBOF() {
        this.goToPosition(0);
    }

    public goToEOF() {
        const len = this.getFileContent(this.activeFile.fileName).length;
        this.goToPosition(len);
    }

    public goToRangeStart({ fileName, pos }: Range) {
        this.openFile(fileName);
        this.goToPosition(pos);
    }

    public getMarkers(): Marker[] {
        //  Return a copy of the list
        return this.testData.markers.slice(0);
    }

    public getMarkerNames(): string[] {
        return ts.arrayFrom(this.testData.markerPositions.keys());
    }

    public getRanges(): Range[] {
        return this.testData.ranges;
    }

    public getRangesInFile(fileName = this.activeFile.fileName) {
        return this.getRanges().filter(r => r.fileName === fileName);
    }

    public rangesByText(): Map<string, Range[]> {
        if (this.testData.rangesByText) return this.testData.rangesByText;
        const result = ts.createMultiMap<string, Range>();
        this.testData.rangesByText = result;
        for (const range of this.getRanges()) {
            const text = this.rangeText(range);
            result.add(text, range);
        }
        return result;
    }

    private rangeText({ fileName, pos, end }: Range): string {
        return this.getFileContent(fileName).slice(pos, end);
    }

    public verifyCaretAtMarker(markerName = "") {
        const pos = this.getMarkerByName(markerName);
        if (pos.fileName !== this.activeFile.fileName) {
            throw new Error(`verifyCaretAtMarker failed - expected to be in file "${pos.fileName}", but was in file "${this.activeFile.fileName}"`);
        }
        if (pos.position !== this.currentCaretPosition) {
            throw new Error(`verifyCaretAtMarker failed - expected to be at marker "/*${markerName}*/, but was at position ${this.currentCaretPosition}(${this.getLineColStringAtPosition(this.currentCaretPosition)})`);
        }
    }

    private getIndentation(fileName: string, position: number, indentStyle: ts.IndentStyle, baseIndentSize: number): number {
        const formatOptions = ts.clone(this.formatCodeSettings);
        formatOptions.indentStyle = indentStyle;
        formatOptions.baseIndentSize = baseIndentSize;
        return this.languageService.getIndentationAtPosition(fileName, position, formatOptions);
    }

    public verifyIndentationAtCurrentPosition(numberOfSpaces: number, indentStyle: ts.IndentStyle = ts.IndentStyle.Smart, baseIndentSize = 0) {
        const actual = this.getIndentation(this.activeFile.fileName, this.currentCaretPosition, indentStyle, baseIndentSize);
        const lineCol = this.getLineColStringAtPosition(this.currentCaretPosition);
        if (actual !== numberOfSpaces) {
            this.raiseError(`verifyIndentationAtCurrentPosition failed at ${lineCol} - expected: ${numberOfSpaces}, actual: ${actual}`);
        }
    }

    public verifyIndentationAtPosition(fileName: string, position: number, numberOfSpaces: number, indentStyle: ts.IndentStyle = ts.IndentStyle.Smart, baseIndentSize = 0) {
        const actual = this.getIndentation(fileName, position, indentStyle, baseIndentSize);
        const lineCol = this.getLineColStringAtPosition(position);
        if (actual !== numberOfSpaces) {
            this.raiseError(`verifyIndentationAtPosition failed at ${lineCol} - expected: ${numberOfSpaces}, actual: ${actual}`);
        }
    }

    public verifyCurrentLineContent(text: string) {
        const actual = this.getCurrentLineContent();
        if (actual !== text) {
            throw new Error("verifyCurrentLineContent\n" + displayExpectedAndActualString(text, actual, /*quoted*/ true));
        }
    }

    public verifyCurrentFileContent(text: string) {
        this.verifyFileContent(this.activeFile.fileName, text);
    }

    private verifyFileContent(fileName: string, text: string) {
        const actual = this.getFileContent(fileName);
        if (actual !== text) {
            throw new Error(`verifyFileContent failed:\n${showTextDiff(text, actual)}`);
        }
    }

    public verifyFormatDocumentChangesNothing(): void {
        const { fileName } = this.activeFile;
        const before = this.getFileContent(fileName);
        this.formatDocument();
        this.verifyFileContent(fileName, before);
    }

    public verifyTextAtCaretIs(text: string) {
        const actual = this.getFileContent(this.activeFile.fileName).substring(this.currentCaretPosition, this.currentCaretPosition + text.length);
        if (actual !== text) {
            throw new Error("verifyTextAtCaretIs\n" + displayExpectedAndActualString(text, actual, /*quoted*/ true));
        }
    }

    public verifyCurrentNameOrDottedNameSpanText(text: string) {
        const span = this.languageService.getNameOrDottedNameSpan(this.activeFile.fileName, this.currentCaretPosition, this.currentCaretPosition);
        if (!span) {
            return this.raiseError("verifyCurrentNameOrDottedNameSpanText\n" + displayExpectedAndActualString('"' + text + '"', "undefined"));
        }

        const actual = this.getFileContent(this.activeFile.fileName).substring(span.start, ts.textSpanEnd(span));
        if (actual !== text) {
            this.raiseError("verifyCurrentNameOrDottedNameSpanText\n" + displayExpectedAndActualString(text, actual, /*quoted*/ true));
        }
    }

    private getNameOrDottedNameSpan(pos: number) {
        return this.languageService.getNameOrDottedNameSpan(this.activeFile.fileName, pos, pos);
    }

    public baselineCurrentFileNameOrDottedNameSpans() {
        this.baseline(
            "NameOrDottedNameSpans",
            this.baselineCurrentFileLocations(pos => this.getNameOrDottedNameSpan(pos)!),
        );
    }

    public printNameOrDottedNameSpans(pos: number) {
        Harness.IO.log(this.spanInfoToString(this.getNameOrDottedNameSpan(pos)!, "**"));
    }

    private classificationToIdentifier(classification: number) {
        const tokenTypes: string[] = [];
        tokenTypes[ts.classifier.v2020.TokenType.class] = "class";
        tokenTypes[ts.classifier.v2020.TokenType.enum] = "enum";
        tokenTypes[ts.classifier.v2020.TokenType.interface] = "interface";
        tokenTypes[ts.classifier.v2020.TokenType.namespace] = "namespace";
        tokenTypes[ts.classifier.v2020.TokenType.typeParameter] = "typeParameter";
        tokenTypes[ts.classifier.v2020.TokenType.type] = "type";
        tokenTypes[ts.classifier.v2020.TokenType.parameter] = "parameter";
        tokenTypes[ts.classifier.v2020.TokenType.variable] = "variable";
        tokenTypes[ts.classifier.v2020.TokenType.enumMember] = "enumMember";
        tokenTypes[ts.classifier.v2020.TokenType.property] = "property";
        tokenTypes[ts.classifier.v2020.TokenType.function] = "function";
        tokenTypes[ts.classifier.v2020.TokenType.member] = "member";

        const tokenModifiers: string[] = [];
        tokenModifiers[ts.classifier.v2020.TokenModifier.async] = "async";
        tokenModifiers[ts.classifier.v2020.TokenModifier.declaration] = "declaration";
        tokenModifiers[ts.classifier.v2020.TokenModifier.readonly] = "readonly";
        tokenModifiers[ts.classifier.v2020.TokenModifier.static] = "static";
        tokenModifiers[ts.classifier.v2020.TokenModifier.local] = "local";
        tokenModifiers[ts.classifier.v2020.TokenModifier.defaultLibrary] = "defaultLibrary";

        function getTokenTypeFromClassification(tsClassification: number): number | undefined {
            if (tsClassification > ts.classifier.v2020.TokenEncodingConsts.modifierMask) {
                return (tsClassification >> ts.classifier.v2020.TokenEncodingConsts.typeOffset) - 1;
            }
            return undefined;
        }

        function getTokenModifierFromClassification(tsClassification: number) {
            return tsClassification & ts.classifier.v2020.TokenEncodingConsts.modifierMask;
        }

        const typeIdx = getTokenTypeFromClassification(classification) || 0;
        const modSet = getTokenModifierFromClassification(classification);

        return [tokenTypes[typeIdx], ...tokenModifiers.filter((_, i) => modSet & 1 << i)].join(".");
    }

    private verifyClassifications(expected: { classificationType: string | number; text?: string; textSpan?: TextSpan; }[], actual: (ts.ClassifiedSpan | ts.ClassifiedSpan2020)[], sourceFileText: string) {
        if (actual.length !== expected.length) {
            this.raiseError(
                "verifyClassifications failed - expected total classifications to be " + expected.length +
                    ", but was " + actual.length +
                    jsonMismatchString(),
            );
        }

        ts.zipWith(expected, actual, (expectedClassification, actualClassification) => {
            const expectedType = expectedClassification.classificationType;
            const actualType = typeof actualClassification.classificationType === "number" ? this.classificationToIdentifier(actualClassification.classificationType) : actualClassification.classificationType;

            if (expectedType !== actualType) {
                this.raiseError(
                    "verifyClassifications failed - expected classifications type to be " +
                        expectedType + ", but was " +
                        actualType +
                        jsonMismatchString(),
                );
            }

            const expectedSpan = expectedClassification.textSpan;
            const actualSpan = actualClassification.textSpan;

            if (expectedSpan) {
                const expectedLength = expectedSpan.end - expectedSpan.start;

                if (expectedSpan.start !== actualSpan.start || expectedLength !== actualSpan.length) {
                    this.raiseError(
                        "verifyClassifications failed - expected span of text to be " +
                            "{start=" + expectedSpan.start + ", length=" + expectedLength + "}, but was " +
                            "{start=" + actualSpan.start + ", length=" + actualSpan.length + "}" +
                            jsonMismatchString(),
                    );
                }
            }

            const actualText = this.activeFile.content.substr(actualSpan.start, actualSpan.length);
            if (expectedClassification.text !== actualText) {
                this.raiseError(
                    "verifyClassifications failed - expected classified text to be " +
                        expectedClassification.text + ", but was " +
                        actualText +
                        jsonMismatchString(),
                );
            }
        });

        function jsonMismatchString() {
            const showActual = actual.map(({ classificationType, textSpan }) => ({ classificationType, text: sourceFileText.slice(textSpan.start, textSpan.start + textSpan.length) }));
            return Harness.IO.newLine() +
                "expected: '" + Harness.IO.newLine() + stringify(expected) + "'" + Harness.IO.newLine() +
                "actual:   '" + Harness.IO.newLine() + stringify(showActual) + "'";
        }
    }

    public verifyProjectInfo(expected: string[]) {
        if (this.testType === FourSlashTestType.Server) {
            const actual = (this.languageService as ts.server.SessionClient).getProjectInfo(
                this.activeFile.fileName,
                /*needFileNameList*/ true,
            );
            assert.equal(
                expected.join(","),
                actual.fileNames!.map(file => {
                    return file.replace(this.basePath + "/", "");
                }).join(","),
            );
        }
    }

    public replaceWithSemanticClassifications(format: ts.SemanticClassificationFormat.TwentyTwenty) {
        const actual = this.languageService.getSemanticClassifications(this.activeFile.fileName, ts.createTextSpan(0, this.activeFile.content.length), format);
        const replacement = [`const c2 = classification("2020");`, `verify.semanticClassificationsAre("2020",`];
        for (const a of actual) {
            const identifier = this.classificationToIdentifier(a.classificationType as number);
            const text = this.activeFile.content.slice(a.textSpan.start, a.textSpan.start + a.textSpan.length);
            replacement.push(`    c2.semanticToken("${identifier}", "${text}"), `);
        }
        replacement.push(");");

        throw new Error("You need to change the source code of fourslash test to use replaceWithSemanticClassifications");

        // const fs = require("fs");
        // const testfilePath = this.originalInputFileName.slice(1);
        // const testfile = fs.readFileSync(testfilePath, "utf8");
        // const newfile = testfile.replace("verify.replaceWithSemanticClassifications(\"2020\")", replacement.join("\n"));
        // fs.writeFileSync(testfilePath, newfile);
    }

    public verifyEncodedSyntacticClassificationsLength(expected: number) {
        const actual = this.languageService.getEncodedSyntacticClassifications(this.activeFile.fileName, ts.createTextSpan(0, this.activeFile.content.length));
        if (actual.spans.length !== expected) {
            this.raiseError(`encodedSyntacticClassificationsLength failed - expected total spans to be ${expected} got ${actual.spans.length}`);
        }
    }

    public verifyEncodedSemanticClassificationsLength(format: ts.SemanticClassificationFormat, expected: number) {
        const actual = this.languageService.getEncodedSemanticClassifications(this.activeFile.fileName, ts.createTextSpan(0, this.activeFile.content.length), format);
        if (actual.spans.length !== expected) {
            this.raiseError(`encodedSemanticClassificationsLength failed - expected total spans to be ${expected} got ${actual.spans.length}`);
        }
    }

    public verifySemanticClassifications(format: ts.SemanticClassificationFormat, expected: { classificationType: string | number; text?: string; }[]) {
        const actual = this.languageService.getSemanticClassifications(this.activeFile.fileName, ts.createTextSpan(0, this.activeFile.content.length), format);
        this.verifyClassifications(expected, actual, this.activeFile.content);
    }

    public verifySyntacticClassifications(expected: { classificationType: string; text: string; }[]) {
        const actual = this.languageService.getSyntacticClassifications(this.activeFile.fileName, ts.createTextSpan(0, this.activeFile.content.length));

        this.verifyClassifications(expected, actual, this.activeFile.content);
    }

    public printOutliningSpans() {
        const spans = this.languageService.getOutliningSpans(this.activeFile.fileName);
        Harness.IO.log(`Outlining spans (${spans.length} items)\nResults:`);
        Harness.IO.log(stringify(spans));
        this.printOutliningSpansInline(spans);
    }

    private printOutliningSpansInline(spans: ts.OutliningSpan[]) {
        const allSpanInsets = [] as { text: string; pos: number; }[];
        let annotated = this.activeFile.content;
        ts.forEach(spans, span => {
            allSpanInsets.push({ text: "[|", pos: span.textSpan.start });
            allSpanInsets.push({ text: "|]", pos: span.textSpan.start + span.textSpan.length });
        });

        const reverseSpans = allSpanInsets.sort((l, r) => r.pos - l.pos);
        ts.forEach(reverseSpans, span => {
            annotated = annotated.slice(0, span.pos) + span.text + annotated.slice(span.pos);
        });
        Harness.IO.log(`\nMockup:\n${annotated}`);
    }

    public verifyOutliningSpans(spans: Range[], kind?: "comment" | "region" | "code" | "imports") {
        const actual = this.languageService.getOutliningSpans(this.activeFile.fileName);

        const filterActual = ts.filter(actual, f => kind === undefined ? true : f.kind === kind);
        if (filterActual.length !== spans.length) {
            this.raiseError(`verifyOutliningSpans failed - expected total spans to be ${spans.length}, but was ${actual.length}\n\nFound Spans:\n\n${this.printOutliningSpansInline(actual)}`);
        }

        ts.zipWith(spans, filterActual, (expectedSpan, actualSpan, i) => {
            if (expectedSpan.pos !== actualSpan.textSpan.start || expectedSpan.end !== ts.textSpanEnd(actualSpan.textSpan)) {
                return this.raiseError(`verifyOutliningSpans failed - span ${(i + 1)} expected: (${expectedSpan.pos},${expectedSpan.end}),  actual: (${actualSpan.textSpan.start},${ts.textSpanEnd(actualSpan.textSpan)})`);
            }
            if (kind !== undefined && actualSpan.kind !== kind) {
                return this.raiseError(`verifyOutliningSpans failed - span ${(i + 1)} expected kind: ('${kind}'),  actual: ('${actualSpan.kind}')`);
            }
        });
    }

    public verifyOutliningHintSpans(spans: Range[]) {
        const actual = this.languageService.getOutliningSpans(this.activeFile.fileName);

        if (actual.length !== spans.length) {
            this.raiseError(`verifyOutliningHintSpans failed - expected total spans to be ${spans.length}, but was ${actual.length}`);
        }

        ts.zipWith(spans, actual, (expectedSpan, actualSpan, i) => {
            if (expectedSpan.pos !== actualSpan.hintSpan.start || expectedSpan.end !== ts.textSpanEnd(actualSpan.hintSpan)) {
                return this.raiseError(`verifyOutliningSpans failed - span ${(i + 1)} expected: (${expectedSpan.pos},${expectedSpan.end}),  actual: (${actualSpan.hintSpan.start},${ts.textSpanEnd(actualSpan.hintSpan)})`);
            }
        });
    }

    public verifyTodoComments(descriptors: string[], spans: Range[]) {
        const actual = this.languageService.getTodoComments(this.activeFile.fileName, descriptors.map(d => ({ text: d, priority: 0 })));

        if (actual.length !== spans.length) {
            this.raiseError(`verifyTodoComments failed - expected total spans to be ${spans.length}, but was ${actual.length}`);
        }

        ts.zipWith(spans, actual, (expectedSpan, actualComment, i) => {
            const actualCommentSpan = ts.createTextSpan(actualComment.position, actualComment.message.length);

            if (expectedSpan.pos !== actualCommentSpan.start || expectedSpan.end !== ts.textSpanEnd(actualCommentSpan)) {
                this.raiseError(`verifyOutliningSpans failed - span ${(i + 1)} expected: (${expectedSpan.pos},${expectedSpan.end}),  actual: (${actualCommentSpan.start},${ts.textSpanEnd(actualCommentSpan)})`);
            }
        });
    }

    /**
     * Finds and applies a code action corresponding to the supplied parameters.
     * If index is undefined, applies the unique code action available.
     * @param errorCode The error code that generated the code action.
     * @param index The nth (0-index-based) codeaction available generated by errorCode.
     */
    public getAndApplyCodeActions(errorCode?: number, index?: number) {
        const fileName = this.activeFile.fileName;
        const fixes = this.getCodeFixes(fileName, errorCode);
        if (index === undefined) {
            if (!(fixes && fixes.length === 1)) {
                this.raiseError(`Should find exactly one codefix, but ${fixes ? fixes.length : "none"} found. ${fixes ? fixes.map(a => `${Harness.IO.newLine()} "${a.description}"`) : ""}`);
            }
            index = 0;
        }
        else {
            if (!(fixes && fixes.length >= index + 1)) {
                this.raiseError(`Should find at least ${index + 1} codefix(es), but ${fixes ? fixes.length : "none"} found.`);
            }
        }

        this.applyChanges(fixes[index].changes);
    }

    public applyCodeActionFromCompletion(markerName: string | undefined, options: FourSlashInterface.VerifyCompletionActionOptions) {
        if (markerName !== undefined) {
            this.goToMarker(markerName);
        }

        const details = this.getCompletionEntryDetails(options.name, options.source, options.data, options.preferences);
        if (!details) {
            const completions = this.getCompletionListAtCaret(options.preferences)?.entries;
            const matchingName = completions?.filter(e => e.name === options.name);
            const detailMessage = matchingName?.length
                ? `\n  Found ${matchingName.length} with name '${options.name}' from source(s) ${matchingName.map(e => `'${e.source}'`).join(", ")}.`
                : ` (In fact, there were no completions with name '${options.name}' at all.)`;
            return this.raiseError(`No completions were found for the given name, source/data, and preferences.` + detailMessage);
        }
        const codeActions = details.codeActions;
        if (codeActions?.length !== 1) {
            this.raiseError(`Expected one code action, got ${codeActions?.length ?? 0}`);
        }
        const codeAction = ts.first(codeActions);

        if (codeAction.description !== options.description) {
            this.raiseError(`Expected description to be:\n${options.description}\ngot:\n${codeActions[0].description}`);
        }
        this.applyChanges(codeAction.changes);

        this.verifyNewContentAfterChange(options, ts.flatMap(codeActions, a => a.changes.map(c => c.fileName)));
    }

    public verifyRangeIs(expectedText: string, includeWhiteSpace?: boolean) {
        this.verifyTextMatches(this.rangeText(this.getOnlyRange()), !!includeWhiteSpace, expectedText);
    }

    private getOnlyRange() {
        const ranges = this.getRanges();
        if (ranges.length !== 1) {
            this.raiseError("Exactly one range should be specified in the testfile.");
        }
        return ts.first(ranges);
    }

    private verifyTextMatches(actualText: string, includeWhitespace: boolean, expectedText: string) {
        const removeWhitespace = (s: string): string => includeWhitespace ? s : this.removeWhitespace(s);
        if (removeWhitespace(actualText) !== removeWhitespace(expectedText)) {
            this.raiseError(`Actual range text doesn't match expected text.\n${showTextDiff(expectedText, actualText)}`);
        }
    }

    /**
     * Compares expected text to the text that would be in the sole range
     * (ie: [|...|]) in the file after applying the codefix sole codefix
     * in the source file.
     */
    public verifyRangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number) {
        this.getAndApplyCodeActions(errorCode, index);
        this.verifyRangeIs(expectedText, includeWhiteSpace);
    }

    public verifyCodeFixAll({ fixId, fixAllDescription, newFileContent, commands: expectedCommands, preferences }: FourSlashInterface.VerifyCodeFixAllOptions): void {
        if (this.testType === FourSlashTestType.Server && preferences) {
            this.configure(preferences);
        }

        const fixWithId = ts.find(this.getCodeFixes(this.activeFile.fileName, /*errorCode*/ undefined, preferences), a => a.fixId === fixId);
        ts.Debug.assert(fixWithId !== undefined, "No available code fix has the expected id. Fix All is not available if there is only one potentially fixable diagnostic present.", () => `Expected '${fixId}'. Available actions:\n${ts.mapDefined(this.getCodeFixes(this.activeFile.fileName), a => `${a.fixName} (${a.fixId || "no fix id"})`).join("\n")}`);
        ts.Debug.assertEqual(fixWithId.fixAllDescription, fixAllDescription);

        const { changes, commands } = this.languageService.getCombinedCodeFix({ type: "file", fileName: this.activeFile.fileName }, fixId, this.formatCodeSettings, preferences || ts.emptyOptions);
        assert.deepEqual<readonly {}[] | undefined>(commands, expectedCommands);
        this.verifyNewContent({ newFileContent }, changes);
    }

    public verifyCodeFix(options: FourSlashInterface.VerifyCodeFixOptions) {
        const fileName = this.activeFile.fileName;
        const actions = this.getCodeFixes(fileName, options.errorCode, options.preferences);
        let index = options.index;
        if (index === undefined) {
            if (!(actions && actions.length === 1)) {
                this.raiseError(`Should find exactly one codefix, but ${actions ? actions.length : "none"} found. ${actions ? actions.map(a => `${Harness.IO.newLine()} "${a.description}"`) : ""}`);
            }
            index = 0;
        }
        else {
            if (!(actions && actions.length >= index + 1)) {
                this.raiseError(`Should find at least ${index + 1} codefix(es), but ${actions ? actions.length : "none"} found.`);
            }
        }

        const action = actions[index];

        if (typeof options.description === "string") {
            assert.equal(action.description, options.description);
        }
        else if (Array.isArray(options.description)) {
            const description = ts.formatStringFromArgs(options.description[0], options.description.slice(1));
            assert.equal(action.description, description);
        }
        else {
            assert.match(action.description, templateToRegExp(options.description.template));
        }
        assert.deepEqual(action.commands, options.commands);

        if (options.applyChanges) {
            for (const change of action.changes) {
                this.applyEdits(change.fileName, change.textChanges);
            }
            this.verifyNewContentAfterChange(options, action.changes.map(c => c.fileName));
        }
        else {
            this.verifyNewContent(options, action.changes);
        }
    }

    private verifyNewContent({ newFileContent, newRangeContent }: FourSlashInterface.NewContentOptions, changes: readonly ts.FileTextChanges[]): void {
        if (newRangeContent !== undefined) {
            assert(newFileContent === undefined);
            assert(changes.length === 1, "Affected 0 or more than 1 file, must use 'newFileContent' instead of 'newRangeContent'");
            const change = ts.first(changes);
            assert(change.fileName = this.activeFile.fileName);
            const newText = ts.textChanges.applyChanges(this.getFileContent(this.activeFile.fileName), change.textChanges);
            const newRange = updateTextRangeForTextChanges(this.getOnlyRange(), change.textChanges);
            const actualText = newText.slice(newRange.pos, newRange.end);
            this.verifyTextMatches(actualText, /*includeWhitespace*/ true, newRangeContent);
        }
        else {
            if (newFileContent === undefined) throw ts.Debug.fail();
            if (typeof newFileContent !== "object") newFileContent = { [this.activeFile.fileName]: newFileContent };
            for (const change of changes) {
                const expectedNewContent = newFileContent[change.fileName];
                if (expectedNewContent === undefined) {
                    ts.Debug.fail(`Did not expect a change in ${change.fileName}`);
                }
                const oldText = this.tryGetFileContent(change.fileName);
                const newContent = change.isNewFile ? ts.first(change.textChanges).newText : ts.textChanges.applyChanges(oldText!, change.textChanges);
                this.verifyTextMatches(newContent, /*includeWhitespace*/ true, expectedNewContent);
            }
            for (const newFileName in newFileContent) {
                ts.Debug.assert(changes.some(c => c.fileName === newFileName), "No change in file", () => newFileName);
            }
        }
    }

    private verifyNewContentAfterChange({ newFileContent, newRangeContent }: FourSlashInterface.NewContentOptions, changedFiles: readonly string[]) {
        const assertedChangedFiles = !newFileContent || typeof newFileContent === "string"
            ? [this.activeFile.fileName]
            : ts.getOwnKeys(newFileContent);
        assert.deepEqual(assertedChangedFiles, changedFiles);

        if (newFileContent !== undefined) {
            assert(!newRangeContent);
            if (typeof newFileContent === "string") {
                this.verifyCurrentFileContent(newFileContent);
            }
            else {
                for (const fileName in newFileContent) {
                    this.verifyFileContent(fileName, newFileContent[fileName]);
                }
            }
        }
        else {
            this.verifyRangeIs(newRangeContent!, /*includeWhiteSpace*/ true);
        }
    }

    /**
     * Rerieves a codefix satisfying the parameters, or undefined if no such codefix is found.
     * @param fileName Path to file where error should be retrieved from.
     */
    private getCodeFixes(fileName: string, errorCode?: number, preferences: ts.UserPreferences = ts.emptyOptions, position?: number): readonly ts.CodeFixAction[] {
        if (this.testType === FourSlashTestType.Server) {
            this.configure(preferences);
        }

        const diagnosticsForCodeFix = this.getDiagnostics(fileName, /*includeSuggestions*/ true).map(diagnostic => ({
            start: diagnostic.start,
            length: diagnostic.length,
            code: diagnostic.code,
        }));

        return ts.flatMap(ts.deduplicate(diagnosticsForCodeFix, ts.equalOwnProperties), diagnostic => {
            if (errorCode !== undefined && errorCode !== diagnostic.code) {
                return;
            }
            if (position !== undefined && diagnostic.start !== undefined && diagnostic.length !== undefined) {
                const span = ts.createTextRangeFromSpan({ start: diagnostic.start, length: diagnostic.length });
                if (!ts.textRangeContainsPositionInclusive(span, position)) {
                    return;
                }
            }
            return this.languageService.getCodeFixesAtPosition(fileName, diagnostic.start!, diagnostic.start! + diagnostic.length!, [diagnostic.code], this.formatCodeSettings, preferences);
        });
    }

    private applyChanges(changes: readonly ts.FileTextChanges[]): void {
        for (const change of changes) {
            this.applyEdits(change.fileName, change.textChanges);
        }
    }

    public verifyImportFixAtPosition(expectedTextArray: string[], errorCode: number | undefined, preferences: ts.UserPreferences | undefined) {
        const { fileName } = this.activeFile;
        const ranges = this.getRanges().filter(r => r.fileName === fileName);
        if (ranges.length > 1) {
            this.raiseError("Exactly one range should be specified in the testfile.");
        }
        const range = ts.firstOrUndefined(ranges);

        if (preferences) {
            this.configure(preferences);
        }

        const codeFixes = this.getCodeFixes(fileName, errorCode, preferences).filter(f => f.fixName === ts.codefix.importFixName);

        if (codeFixes.length === 0) {
            if (expectedTextArray.length !== 0) {
                this.raiseError("No codefixes returned.");
            }
            return;
        }

        const actualTextArray: string[] = [];
        const scriptInfo = this.languageServiceAdapterHost.getScriptInfo(fileName)!;
        const originalContent = scriptInfo.content;
        for (const codeFix of codeFixes) {
            ts.Debug.assert(codeFix.changes.length === 1);
            const change = ts.first(codeFix.changes);
            ts.Debug.assert(change.fileName === fileName);
            this.applyEdits(change.fileName, change.textChanges);
            const text = range ? this.rangeText(range) : this.getFileContent(fileName);
            actualTextArray.push(text);

            // Undo changes to perform next fix
            const span = change.textChanges[0].span;
            const deletedText = originalContent.substr(span.start, change.textChanges[0].span.length);
            const insertedText = change.textChanges[0].newText;
            this.editScriptAndUpdateMarkers(fileName, span.start, span.start + insertedText.length, deletedText);
        }
        if (expectedTextArray.length !== actualTextArray.length) {
            this.raiseError(`Expected ${expectedTextArray.length} import fixes, got ${actualTextArray.length}:\n\n${actualTextArray.join("\n\n" + "-".repeat(20) + "\n\n")}`);
        }
        ts.zipWith(expectedTextArray, actualTextArray, (expected, actual, index) => {
            if (expected !== actual) {
                this.raiseError(`Import fix at index ${index} doesn't match.\n${showTextDiff(expected, actual)}`);
            }
        });
    }

    public verifyImportFixModuleSpecifiers(markerName: string, moduleSpecifiers: string[], preferences?: ts.UserPreferences) {
        const marker = this.getMarkerByName(markerName);
        const codeFixes = this.getCodeFixes(marker.fileName, ts.Diagnostics.Cannot_find_name_0.code, {
            includeCompletionsForModuleExports: true,
            includeCompletionsWithInsertText: true,
            ...preferences,
        }, marker.position).filter(f => f.fixName === ts.codefix.importFixName);

        const actualModuleSpecifiers = ts.mapDefined(codeFixes, fix => {
            return ts.forEach(ts.flatMap(fix.changes, c => c.textChanges), c => {
                const match = /(?:from |require\()(['"])((?:(?!\1).)*)\1/.exec(c.newText);
                return match?.[2];
            });
        });

        assert.deepEqual(actualModuleSpecifiers, moduleSpecifiers);
    }

    public verifyDocCommentTemplate(expected: ts.TextInsertion | undefined, options?: ts.DocCommentTemplateOptions) {
        const name = "verifyDocCommentTemplate";
        const actual = this.languageService.getDocCommentTemplateAtPosition(this.activeFile.fileName, this.currentCaretPosition, options || { generateReturnInDocTemplate: true }, this.formatCodeSettings)!;

        if (expected === undefined) {
            if (actual) {
                this.raiseError(`${name} failed - expected no template but got {newText: "${actual.newText}", caretOffset: ${actual.caretOffset}}`);
            }

            return;
        }
        else {
            if (actual === undefined) {
                this.raiseError(`${name} failed - expected the template {newText: "${expected.newText}", caretOffset: "${expected.caretOffset}"} but got nothing instead`);
            }

            if (actual.newText !== expected.newText) {
                this.raiseError(`${name} failed for expected insertion.\n${showTextDiff(expected.newText, actual.newText)}`);
            }

            if (actual.caretOffset !== expected.caretOffset) {
                this.raiseError(`${name} failed - expected caretOffset: ${expected.caretOffset}\nactual caretOffset:${actual.caretOffset}`);
            }
        }
    }

    public verifyBraceCompletionAtPosition(negative: boolean, openingBrace: string) {
        const openBraceMap = new Map(Object.entries<ts.CharacterCodes>({
            "(": ts.CharacterCodes.openParen,
            "{": ts.CharacterCodes.openBrace,
            "[": ts.CharacterCodes.openBracket,
            "'": ts.CharacterCodes.singleQuote,
            '"': ts.CharacterCodes.doubleQuote,
            "`": ts.CharacterCodes.backtick,
            "<": ts.CharacterCodes.lessThan,
        }));

        const charCode = openBraceMap.get(openingBrace);

        if (!charCode) {
            throw this.raiseError(`Invalid openingBrace '${openingBrace}' specified.`);
        }

        const position = this.currentCaretPosition;

        const validBraceCompletion = this.languageService.isValidBraceCompletionAtPosition(this.activeFile.fileName, position, charCode);

        if (!negative && !validBraceCompletion) {
            this.raiseError(`${position} is not a valid brace completion position for ${openingBrace}`);
        }
        if (negative && validBraceCompletion) {
            this.raiseError(`${position} is a valid brace completion position for ${openingBrace}`);
        }
    }

    public baselineAutoImports(markerName: string, fullNamesForCodeFix?: string[], preferences?: ts.UserPreferences) {
        const marker = this.getMarkerByName(markerName);
        const completionPreferences = {
            includeCompletionsForModuleExports: true,
            includeCompletionsWithInsertText: true,
            allowIncompleteCompletions: true,
            includeCompletionsWithSnippetText: true,
            ...preferences,
        };

        this.goToMarker(marker);
        this.configure(completionPreferences);
        const fileName = this.activeFile.fileName;
        const ext = ts.getAnyExtensionFromPath(fileName).slice(1);
        const lang = ["mts", "cts"].includes(ext) ? "ts" : ext;
        let baselineText = codeFence(this.renderMarkers([{ text: "|", fileName: marker.fileName, position: marker.position }], /*useTerminalBoldSequence*/ false), lang) + "\n\n";

        const completions = this.getCompletionListAtCaret(completionPreferences)!;

        const autoImportCompletions = completions.entries.filter(c => c.hasAction && c.source && c.sortText === ts.Completions.SortText.AutoImportSuggestions);
        if (autoImportCompletions.length) {
            baselineText += `## From completions\n\n${autoImportCompletions.map(c => `- \`${c.name}\` from \`"${c.source}"\``).join("\n")}\n\n`;
            autoImportCompletions.forEach(c => {
                const details = this.getCompletionEntryDetails(c.name, c.source, c.data, completionPreferences);
                assert(details?.codeActions, `Entry '${c.name}' from "${c.source}" returned no code actions from completion details request`);
                assert(details.codeActions.length === 1, `Entry '${c.name}' from "${c.source}" returned more than one code action`);
                assert(details.codeActions[0].changes.length === 1, `Entry '${c.name}' from "${c.source}" returned a code action changing more than one file`);
                assert(details.codeActions[0].changes[0].fileName === this.activeFile.fileName, `Entry '${c.name}' from "${c.source}" returned a code action changing a different file`);
                const changes = details.codeActions[0].changes[0].textChanges;
                const completionChange: ts.TextChange = { newText: c.insertText || c.name, span: c.replacementSpan || completions.optionalReplacementSpan || { start: marker.position, length: 0 } };
                const sortedChanges = [...changes, completionChange].sort((a, b) => a.span.start - b.span.start);
                let newFileContent = this.activeFile.content;
                for (let i = sortedChanges.length - 1; i >= 0; i--) {
                    newFileContent = newFileContent.substring(0, sortedChanges[i].span.start) + sortedChanges[i].newText + newFileContent.substring(sortedChanges[i].span.start + sortedChanges[i].span.length);
                }
                baselineText += codeFence(newFileContent, lang) + "\n\n";
            });
        }

        if (fullNamesForCodeFix) {
            const scriptInfo = this.languageServiceAdapterHost.getScriptInfo(fileName)!;
            const originalContent = scriptInfo.content;
            const range = this.getRangesInFile()[0]
                || getRangeOfIdentifierTouchingPosition(this.activeFile.content, marker.position)
                || { pos: marker.position, end: marker.position };

            baselineText += `## From codefixes\n\n`;
            for (const fullNameForCodeFix of fullNamesForCodeFix) {
                this.applyEdits(fileName, [{ span: { start: 0, length: this.getFileContent(fileName).length }, newText: originalContent }]);
                this.applyEdits(fileName, [{ span: ts.createTextSpanFromRange(range), newText: fullNameForCodeFix }]);
                baselineText += `### When marker text is \`${fullNameForCodeFix}\`\n\n`;

                const codeFixes = this.getCodeFixes(fileName, /*errorCode*/ undefined, completionPreferences)
                    .filter(f => f.fixName === ts.codefix.importFixName);
                for (const fix of codeFixes) {
                    baselineText += fix.description + "\n";
                    if (fix.fixAllDescription) {
                        baselineText += `Fix all available: ${fix.fixAllDescription}\n`;
                    }
                    ts.Debug.assert(fix.changes.length === 1);
                    const change = ts.first(fix.changes);
                    ts.Debug.assert(change.fileName === fileName);
                    this.applyEdits(change.fileName, change.textChanges);
                    const text = this.getFileContent(fileName);
                    baselineText += "\n" + codeFence(text, lang) + "\n\n";
                }
            }
        }

        this.baseline("Auto Imports", baselineText, `.baseline.md`);
    }

    public verifyJsxClosingTag(map: { [markerName: string]: ts.JsxClosingTagInfo | undefined; }): void {
        for (const markerName in map) {
            this.goToMarker(markerName);
            const actual = this.languageService.getJsxClosingTagAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            assert.deepEqual(actual, map[markerName], markerName);
        }
    }

    public verifyLinkedEditingRange(map: { [markerName: string]: ts.LinkedEditingInfo | undefined; }): void {
        for (const markerName in map) {
            this.goToMarker(markerName);
            const actual = this.languageService.getLinkedEditingRangeAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            assert.deepEqual(actual, map[markerName], markerName);
        }
    }

    public baselineLinkedEditing(): void {
        const files = this.testData.files;

        let baselineContent = "";
        let offset = 0;
        for (const f of files) {
            const result = getLinkedEditingBaselineWorker(f, offset, this.languageService);
            baselineContent += result.baselineContent + `\n\n\n`;
            offset = result.offset;
        }

        this.baseline("Linked Editing", baselineContent, ".linkedEditing.txt");

        function getLinkedEditingBaselineWorker(activeFile: FourSlashFile, offset: number, languageService: ts.LanguageService) {
            const fileName = activeFile.fileName;
            let baselineContent = `=== ${fileName} ===\n`;

            // get linkedEdit at every position in the file, then group positions by their linkedEdit
            const linkedEditsInFile = new Map<string, number[]>();
            for (let pos = 0; pos < activeFile.content.length; pos++) {
                const linkedEditAtPosition = languageService.getLinkedEditingRangeAtPosition(fileName, pos);
                if (!linkedEditAtPosition) continue;

                const linkedEditString = JSON.stringify(linkedEditAtPosition);
                const existingPositions = linkedEditsInFile.get(linkedEditString) ?? [];
                linkedEditsInFile.set(linkedEditString, [...existingPositions, pos]);
            }

            const linkedEditsByRange = [...linkedEditsInFile.entries()].sort((a, b) => a[1][0] - b[1][0]);
            if (linkedEditsByRange.length === 0) {
                return { baselineContent: baselineContent + activeFile.content + `\n\n--No linked edits found--`, offset };
            }

            let inlineLinkedEditBaselines: { start: number; end: number; index: number; }[] = [];
            let linkedEditInfoBaseline = "";
            for (const edit of linkedEditsByRange) {
                const [linkedEdit, positions] = edit;
                let rangeStart = 0;
                for (let j = 0; j < positions.length - 1; j++) {
                    // for each distinct range in the list of positions, add an entry to the list of places that need to be annotated in the baseline
                    if (positions[j] + 1 !== positions[j + 1]) {
                        inlineLinkedEditBaselines.push({ start: positions[rangeStart], end: positions[j], index: offset });
                        rangeStart = j + 1;
                    }
                }
                inlineLinkedEditBaselines.push({ start: positions[rangeStart], end: positions[positions.length - 1], index: offset });

                // add the LinkedEditInfo with its index to the baseline
                linkedEditInfoBaseline += `\n\n=== ${offset} ===\n` + linkedEdit;
                offset++;
            }

            inlineLinkedEditBaselines = inlineLinkedEditBaselines.sort((a, b) => a.start - b.start);
            const fileText = activeFile.content;
            baselineContent += fileText.slice(0, inlineLinkedEditBaselines[0].start);
            for (let i = 0; i < inlineLinkedEditBaselines.length; i++) {
                const e = inlineLinkedEditBaselines[i];
                const sliceEnd = inlineLinkedEditBaselines[i + 1]?.start;
                baselineContent += `[|/*${e.index}*/` + fileText.slice(e.start, e.end) + `|]` + fileText.slice(e.end, sliceEnd);
            }

            baselineContent += linkedEditInfoBaseline;
            return { baselineContent, offset };
        }
    }

    public verifyMatchingBracePosition(bracePosition: number, expectedMatchPosition: number) {
        const actual = this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, bracePosition);

        if (actual.length !== 2) {
            this.raiseError(`verifyMatchingBracePosition failed - expected result to contain 2 spans, but it had ${actual.length}`);
        }

        let actualMatchPosition = -1;
        if (bracePosition === actual[0].start) {
            actualMatchPosition = actual[1].start;
        }
        else if (bracePosition === actual[1].start) {
            actualMatchPosition = actual[0].start;
        }
        else {
            this.raiseError(`verifyMatchingBracePosition failed - could not find the brace position: ${bracePosition} in the returned list: (${actual[0].start},${ts.textSpanEnd(actual[0])}) and (${actual[1].start},${ts.textSpanEnd(actual[1])})`);
        }

        if (actualMatchPosition !== expectedMatchPosition) {
            this.raiseError(`verifyMatchingBracePosition failed - expected: ${actualMatchPosition},  actual: ${expectedMatchPosition}`);
        }
    }

    public verifyNoMatchingBracePosition(bracePosition: number) {
        const actual = this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, bracePosition);

        if (actual.length !== 0) {
            this.raiseError("verifyNoMatchingBracePosition failed - expected: 0 spans, actual: " + actual.length);
        }
    }

    public verifySpanOfEnclosingComment(negative: boolean, onlyMultiLineDiverges?: boolean) {
        const expected = !negative;
        const position = this.currentCaretPosition;
        const fileName = this.activeFile.fileName;
        const actual = !!this.languageService.getSpanOfEnclosingComment(fileName, position, /*onlyMultiLine*/ false);
        const actualOnlyMultiLine = !!this.languageService.getSpanOfEnclosingComment(fileName, position, /*onlyMultiLine*/ true);
        if (expected !== actual || onlyMultiLineDiverges === (actual === actualOnlyMultiLine)) {
            this.raiseError(`verifySpanOfEnclosingComment failed:
                position: '${position}'
                fileName: '${fileName}'
                onlyMultiLineDiverges: '${onlyMultiLineDiverges}'
                actual: '${actual}'
                actualOnlyMultiLine: '${actualOnlyMultiLine}'
                expected: '${expected}'.`);
        }
    }

    public verifyNavigateTo(options: readonly FourSlashInterface.VerifyNavigateToOptions[]): void {
        for (const { pattern, expected, fileName, excludeLibFiles } of options) {
            const file = fileName && this.findFile(fileName).fileName;
            const items = this.languageService.getNavigateToItems(pattern, /*maxResultCount*/ undefined, file, /*excludeDtsFiles*/ undefined, excludeLibFiles);
            this.assertObjectsEqual(
                items,
                expected.map((e): ts.NavigateToItem => ({
                    name: e.name,
                    kind: e.kind,
                    kindModifiers: e.kindModifiers || "",
                    matchKind: e.matchKind || "exact",
                    isCaseSensitive: e.isCaseSensitive === undefined ? true : e.isCaseSensitive,
                    fileName: e.range.fileName,
                    textSpan: ts.createTextSpanFromRange(e.range),
                    containerName: e.containerName || "",
                    containerKind: e.containerKind || ts.ScriptElementKind.unknown,
                })),
            );
        }
    }

    public verifyNavigationBar(json: any, options: { checkSpans?: boolean; } | undefined) {
        this.verifyNavigationTreeOrBar(json, this.languageService.getNavigationBarItems(this.activeFile.fileName), "Bar", options);
    }

    public verifyNavigationTree(json: any, options: { checkSpans?: boolean; } | undefined) {
        this.verifyNavigationTreeOrBar(json, this.languageService.getNavigationTree(this.activeFile.fileName), "Tree", options);
    }

    private verifyNavigationTreeOrBar(json: any, tree: any, name: "Tree" | "Bar", options: { checkSpans?: boolean; } | undefined) {
        if (JSON.stringify(tree, replacer) !== JSON.stringify(json)) {
            this.raiseError(`verifyNavigation${name} failed - \n${showTextDiff(stringify(json), stringify(tree, replacer))}`);
        }

        function replacer(key: string, value: any) {
            switch (key) {
                case "spans":
                case "nameSpan":
                    return options && options.checkSpans ? value : undefined;
                case "start":
                case "length":
                    // Never omit the values in a span, even if they are 0.
                    return value;
                case "childItems":
                    return !value || value.length === 0 ? undefined : value;
                default:
                    // Omit falsy values, those are presumed to be the default.
                    return value || undefined;
            }
        }
    }

    public printNavigationItems(searchValue: string) {
        const items = this.languageService.getNavigateToItems(searchValue);
        Harness.IO.log(`NavigationItems list (${items.length} items)`);
        for (const item of items) {
            Harness.IO.log(`name: ${item.name}, kind: ${item.kind}, parentName: ${item.containerName}, fileName: ${item.fileName}`);
        }
    }

    public printNavigationBar() {
        const items = this.languageService.getNavigationBarItems(this.activeFile.fileName);
        Harness.IO.log(`Navigation bar (${items.length} items)`);
        for (const item of items) {
            Harness.IO.log(`${ts.repeatString(" ", item.indent)}name: ${item.text}, kind: ${item.kind}, childItems: ${item.childItems.map(child => child.text)}`);
        }
    }

    private getDocumentHighlightsAtCurrentPosition(fileNamesToSearch: readonly string[]) {
        const filesToSearch = fileNamesToSearch.map(name => ts.combinePaths(this.basePath, name));
        return this.languageService.getDocumentHighlights(this.activeFile.fileName, this.currentCaretPosition, filesToSearch);
    }

    public baselineDocumentHighlights(
        markerOrRange: ArrayOrSingle<MarkerOrNameOrRange> | undefined,
        rangeText: ArrayOrSingle<string> | undefined,
        options: FourSlashInterface.VerifyDocumentHighlightsOptions | undefined,
    ) {
        this.baselineEachMarkerOrRangeArrayOrSingle(
            "documentHighlights",
            markerOrRange,
            rangeText,
            markerOrRange => {
                this.goToMarkerOrNameOrRange(markerOrRange);
                const highlights = this.getDocumentHighlightsAtCurrentPosition(ts.map(options?.filesToSearch, ts.normalizePath) || [this.activeFile.fileName]);

                // Write input files
                const filesToSearch = options ? "// filesToSearch:\n" +
                    options.filesToSearch.map(f => "//   " + f).join("\n") + "\n\n" :
                    "";
                const baselineContent = this.getBaselineForGroupedDocumentSpansWithFileContents(
                    highlights?.map(h => h.highlightSpans.map(s => s.fileName ? s as ts.DocumentSpan : { ...s, fileName: h.fileName })) || ts.emptyArray,
                    { markerInfo: { markerOrRange, markerName: "/*HIGHLIGHTS*/" } },
                );
                return filesToSearch + baselineContent;
            },
        );
    }

    public verifyCodeFixAvailable(negative: boolean, expected: FourSlashInterface.VerifyCodeFixAvailableOptions[] | string | undefined): void {
        const codeFixes = this.getCodeFixes(this.activeFile.fileName);
        if (negative) {
            if (typeof expected === "undefined") {
                this.assertObjectsEqual(codeFixes, ts.emptyArray);
            }
            else if (typeof expected === "string") {
                if (codeFixes.some(fix => fix.fixName === expected)) {
                    this.raiseError(`Expected not to find a fix with the name '${expected}', but one exists.`);
                }
            }
            else {
                assert(typeof expected === "undefined" || typeof expected === "string", "With a negated assertion, 'expected' must be undefined or a string value of a codefix name.");
            }
        }
        else if (typeof expected === "string") {
            this.assertObjectsEqual(codeFixes.map(fix => fix.fixName), [expected]);
        }
        else {
            const actuals = codeFixes.map((fix): FourSlashInterface.VerifyCodeFixAvailableOptions => ({ description: fix.description, commands: fix.commands }));
            this.assertObjectsEqual(actuals, negative ? ts.emptyArray : expected);
        }
    }

    public verifyCodeFixAllAvailable(negative: boolean, fixName: string) {
        const availableFixes = this.getCodeFixes(this.activeFile.fileName);
        const hasFix = availableFixes.some(fix => fix.fixName === fixName && fix.fixId);
        if (negative && hasFix) {
            this.raiseError(`Expected not to find a fix with the name '${fixName}', but one exists.`);
        }
        else if (!negative && !hasFix) {
            if (availableFixes.some(fix => fix.fixName === fixName)) {
                this.raiseError(`Found a fix with the name '${fixName}', but fix-all is not available.`);
            }

            this.raiseError(
                `Expected to find a fix with the name '${fixName}', but none exists.` +
                    availableFixes.length
                    ? ` Available fixes: ${availableFixes.map(fix => `${fix.fixName} (${fix.fixId ? "with" : "without"} fix-all)`).join(", ")}`
                    : "",
            );
        }
    }

    public verifyApplicableRefactorAvailableAtMarker(negative: boolean, markerName: string) {
        const isAvailable = this.getApplicableRefactors(this.getMarkerByName(markerName)).length > 0;
        if (negative && isAvailable) {
            this.raiseError(`verifyApplicableRefactorAvailableAtMarker failed - expected no refactor at marker ${markerName} but found some.`);
        }
        if (!negative && !isAvailable) {
            this.raiseError(`verifyApplicableRefactorAvailableAtMarker failed - expected a refactor at marker ${markerName} but found none.`);
        }
    }

    private getSelection(): ts.TextRange {
        return {
            pos: this.currentCaretPosition,
            end: this.selectionEnd === -1 ? this.currentCaretPosition : this.selectionEnd,
        };
    }

    public verifyRefactorAvailable(negative: boolean, triggerReason: ts.RefactorTriggerReason, name: string, actionName?: string, actionDescription?: string) {
        let refactors = this.getApplicableRefactorsAtSelection(triggerReason);
        refactors = refactors.filter(r => r.name === name);

        if (actionName !== undefined) {
            refactors.forEach(r => r.actions = r.actions.filter(a => a.name === actionName));
        }

        if (actionDescription !== undefined) {
            refactors.forEach(r => r.actions = r.actions.filter(a => a.description === actionDescription));
        }

        refactors = refactors.filter(r => r.actions.length > 0);

        const isAvailable = refactors.length > 0;

        if (negative) {
            if (isAvailable) {
                this.raiseError(`verifyApplicableRefactorAvailableForRange failed - expected no refactor but found: ${refactors.map(r => r.name).join(", ")}`);
            }
        }
        else {
            if (!isAvailable) {
                this.raiseError(`verifyApplicableRefactorAvailableForRange failed - expected a refactor but found none.`);
            }
            if (refactors.length > 1) {
                this.raiseError(`${refactors.length} available refactors both have name ${name} and action ${actionName}`);
            }
        }
    }

    public verifyRefactorKindsAvailable(kind: string, expected: string[], preferences = ts.emptyOptions) {
        const refactors = this.getApplicableRefactorsAtSelection("invoked", kind, preferences);
        const availableKinds = ts.flatMap(refactors, refactor => refactor.actions).map(action => action.kind);
        assert.deepEqual(availableKinds.sort(), expected.sort(), `Expected kinds to be equal`);
    }

    public verifyRefactorsAvailable(names: readonly string[]): void {
        assert.deepEqual(unique(this.getApplicableRefactorsAtSelection(), r => r.name), names);
    }

    public verifyApplicableRefactorAvailableForRange(negative: boolean) {
        const ranges = this.getRanges();
        if (!(ranges && ranges.length === 1)) {
            throw new Error("Exactly one refactor range is allowed per test.");
        }

        const isAvailable = this.getApplicableRefactors(ts.first(ranges)).length > 0;
        if (negative && isAvailable) {
            this.raiseError(`verifyApplicableRefactorAvailableForRange failed - expected no refactor but found some.`);
        }
        if (!negative && !isAvailable) {
            this.raiseError(`verifyApplicableRefactorAvailableForRange failed - expected a refactor but found none.`);
        }
    }

    public applyRefactor({ refactorName, actionName, actionDescription, newContent: newContentWithRenameMarker, triggerReason }: FourSlashInterface.ApplyRefactorOptions) {
        const range = this.getSelection();
        const refactors = this.getApplicableRefactorsAtSelection(triggerReason);
        const refactorsWithName = refactors.filter(r => r.name === refactorName);
        if (refactorsWithName.length === 0) {
            this.raiseError(`The expected refactor: ${refactorName} is not available at the marker location.\nAvailable refactors: ${refactors.map(r => r.name)}`);
        }

        const action = ts.firstDefined(refactorsWithName, refactor => refactor.actions.find(a => a.name === actionName));
        if (!action) {
            throw this.raiseError(`The expected action: ${actionName} is not included in: ${ts.flatMap(refactorsWithName, r => r.actions.map(a => a.name))}`);
        }
        if (action.description !== actionDescription) {
            this.raiseError(`Expected action description to be ${JSON.stringify(actionDescription)}, got: ${JSON.stringify(action.description)}`);
        }

        const editInfo = this.languageService.getEditsForRefactor(this.activeFile.fileName, this.formatCodeSettings, range, refactorName, actionName, ts.emptyOptions)!;
        for (const edit of editInfo.edits) {
            this.applyEdits(edit.fileName, edit.textChanges);
        }

        let renameFilename: string | undefined;
        let renamePosition: number | undefined;

        const newFileContents = typeof newContentWithRenameMarker === "string" ? { [this.activeFile.fileName]: newContentWithRenameMarker } : newContentWithRenameMarker;
        for (const fileName in newFileContents) {
            const { renamePosition: rp, newContent } = TestState.parseNewContent(newFileContents[fileName]);
            if (renamePosition === undefined) {
                renameFilename = fileName;
                renamePosition = rp;
            }
            else {
                ts.Debug.assert(rp === undefined);
            }
            this.verifyFileContent(fileName, newContent);
        }

        if (renamePosition === undefined) {
            if (editInfo.renameLocation !== undefined) {
                this.raiseError(`Did not expect a rename location, got ${editInfo.renameLocation}`);
            }
        }
        else {
            this.assertObjectsEqual(editInfo.renameFilename, renameFilename);
            if (renamePosition !== editInfo.renameLocation) {
                this.raiseError(`Expected rename position of ${renamePosition}, but got ${editInfo.renameLocation}`);
            }
        }
    }

    private static parseNewContent(newContentWithRenameMarker: string): { readonly renamePosition: number | undefined; readonly newContent: string; } {
        const renamePosition = newContentWithRenameMarker.indexOf("/*RENAME*/");
        if (renamePosition === -1) {
            return { renamePosition: undefined, newContent: newContentWithRenameMarker };
        }
        else {
            const newContent = newContentWithRenameMarker.slice(0, renamePosition) + newContentWithRenameMarker.slice(renamePosition + "/*RENAME*/".length);
            return { renamePosition, newContent };
        }
    }

    public noMoveToNewFile() {
        const ranges = this.getRanges();
        assert(ranges.length);
        for (const range of ranges) {
            for (const refactor of this.getApplicableRefactors(range, { allowTextChangesInNewFiles: true })) {
                if (refactor.name === "Move to a new file") {
                    ts.Debug.fail("Did not expect to get 'move to a new file' refactor");
                }
            }
        }
    }

    public moveToNewFile(options: FourSlashInterface.MoveToNewFileOptions): void {
        assert(this.getRanges().length === 1, "Must have exactly one fourslash range (source enclosed between '[|' and '|]' delimiters) in the source file");
        const range = this.getRanges()[0];
        const refactor = ts.find(this.getApplicableRefactors(range, { allowTextChangesInNewFiles: true }), r => r.name === "Move to a new file")!;
        assert(refactor.actions.length === 1);
        const action = ts.first(refactor.actions);
        assert(action.name === "Move to a new file" && action.description === "Move to a new file");

        const editInfo = this.languageService.getEditsForRefactor(range.fileName, this.formatCodeSettings, range, refactor.name, action.name, options.preferences || ts.emptyOptions)!;
        this.verifyNewContent({ newFileContent: options.newFileContents }, editInfo.edits);
    }

    public moveToFile(options: FourSlashInterface.MoveToFileOptions): void {
        assert(this.getRanges().length === 1, "Must have exactly one fourslash range (source enclosed between '[|' and '|]' delimiters) in the source file");
        const range = this.getRanges()[0];
        const refactor = ts.find(this.getApplicableRefactors(range, { allowTextChangesInNewFiles: true }, /*triggerReason*/ undefined, /*kind*/ undefined, /*includeInteractiveActions*/ true), r => r.name === "Move to file")!;
        assert(refactor.actions.length === 1);
        const action = ts.first(refactor.actions);
        assert(action.name === "Move to file" && action.description === "Move to file");

        const editInfo = this.languageService.getEditsForRefactor(range.fileName, this.formatCodeSettings, range, refactor.name, action.name, options.preferences || ts.emptyOptions, options.interactiveRefactorArguments)!;
        this.verifyNewContent({ newFileContent: options.newFileContents }, editInfo.edits);
    }

    private testNewFileContents(edits: readonly ts.FileTextChanges[], newFileContents: { [fileName: string]: string; }, description: string): void {
        for (const { fileName, textChanges } of edits) {
            const newContent = newFileContents[fileName];
            if (newContent === undefined) {
                this.raiseError(`${description} - There was an edit in ${fileName} but new content was not specified.`);
            }

            const fileContent = this.tryGetFileContent(fileName);
            if (fileContent !== undefined) {
                const actualNewContent = ts.textChanges.applyChanges(fileContent, textChanges);
                assert.equal(actualNewContent, newContent, `new content for ${fileName}`);
            }
            else {
                // Creates a new file.
                assert(textChanges.length === 1);
                const change = ts.first(textChanges);
                assert.deepEqual(change.span, ts.createTextSpan(0, 0));
                assert.equal(change.newText, newContent, `${description} - Content for ${fileName}`);
            }
        }

        for (const fileName in newFileContents) {
            if (!edits.some(e => e.fileName === fileName)) {
                ts.Debug.fail(`${description} - Asserted new contents of ${fileName} but there were no edits`);
            }
        }
    }

    public verifyFileAfterApplyingRefactorAtMarker(
        markerName: string,
        expectedContent: string,
        refactorNameToApply: string,
        actionName: string,
        formattingOptions?: ts.FormatCodeSettings,
    ) {
        formattingOptions = formattingOptions || this.formatCodeSettings;
        const marker = this.getMarkerByName(markerName);

        const applicableRefactors = this.languageService.getApplicableRefactors(this.activeFile.fileName, marker.position, ts.emptyOptions);
        const applicableRefactorToApply = ts.find(applicableRefactors, refactor => refactor.name === refactorNameToApply);

        if (!applicableRefactorToApply) {
            this.raiseError(`The expected refactor: ${refactorNameToApply} is not available at the marker location.`);
        }

        const editInfo = this.languageService.getEditsForRefactor(marker.fileName, formattingOptions, marker.position, refactorNameToApply, actionName, ts.emptyOptions)!;

        for (const edit of editInfo.edits) {
            this.applyEdits(edit.fileName, edit.textChanges);
        }
        const actualContent = this.getFileContent(marker.fileName);

        if (actualContent !== expectedContent) {
            this.raiseError(`verifyFileAfterApplyingRefactors failed:\n${showTextDiff(expectedContent, actualContent)}`);
        }
    }

    public printAvailableCodeFixes() {
        const codeFixes = this.getCodeFixes(this.activeFile.fileName);
        Harness.IO.log(stringify(codeFixes));
    }

    private formatCallHierarchyItemSpan(file: FourSlashFile, span: ts.TextSpan, prefix: string, trailingPrefix = prefix) {
        const startLc = this.languageServiceAdapterHost.positionToLineAndCharacter(file.fileName, span.start);
        const endLc = this.languageServiceAdapterHost.positionToLineAndCharacter(file.fileName, ts.textSpanEnd(span));
        const lines = this.spanLines(file, span, { fullLines: true, lineNumbers: true, selection: true });
        let text = "";
        text += `${prefix}╭ ${file.fileName}:${startLc.line + 1}:${startLc.character + 1}-${endLc.line + 1}:${endLc.character + 1}\n`;
        for (const line of lines) {
            text += `${prefix}│ ${line.trimRight()}\n`;
        }
        text += `${trailingPrefix}╰\n`;
        return text;
    }

    private formatCallHierarchyItemSpans(file: FourSlashFile, spans: ts.TextSpan[], prefix: string, trailingPrefix = prefix) {
        let text = "";
        for (let i = 0; i < spans.length; i++) {
            text += this.formatCallHierarchyItemSpan(file, spans[i], prefix, i < spans.length - 1 ? prefix : trailingPrefix);
        }
        return text;
    }

    private formatCallHierarchyItem(file: FourSlashFile, callHierarchyItem: ts.CallHierarchyItem, direction: CallHierarchyItemDirection, seen: Map<string, boolean>, prefix: string, trailingPrefix: string = prefix) {
        const key = `${callHierarchyItem.file}|${JSON.stringify(callHierarchyItem.span)}|${direction}`;
        const alreadySeen = seen.has(key);
        seen.set(key, true);

        const incomingCalls = direction === CallHierarchyItemDirection.Outgoing ? { result: "skip" } as const :
            alreadySeen ? { result: "seen" } as const :
            { result: "show", values: this.languageService.provideCallHierarchyIncomingCalls(callHierarchyItem.file, callHierarchyItem.selectionSpan.start) } as const;

        const outgoingCalls = direction === CallHierarchyItemDirection.Incoming ? { result: "skip" } as const :
            alreadySeen ? { result: "seen" } as const :
            { result: "show", values: this.languageService.provideCallHierarchyOutgoingCalls(callHierarchyItem.file, callHierarchyItem.selectionSpan.start) } as const;

        let text = "";
        text += `${prefix}╭ name: ${callHierarchyItem.name}\n`;
        text += `${prefix}├ kind: ${callHierarchyItem.kind}\n`;
        if (callHierarchyItem.containerName) {
            text += `${prefix}├ containerName: ${callHierarchyItem.containerName}\n`;
        }
        text += `${prefix}├ file: ${callHierarchyItem.file}\n`;
        text += `${prefix}├ span:\n`;
        text += this.formatCallHierarchyItemSpan(file, callHierarchyItem.span, `${prefix}│ `);
        text += `${prefix}├ selectionSpan:\n`;
        text += this.formatCallHierarchyItemSpan(
            file,
            callHierarchyItem.selectionSpan,
            `${prefix}│ `,
            incomingCalls.result !== "skip" || outgoingCalls.result !== "skip" ? `${prefix}│ ` :
                `${trailingPrefix}╰ `,
        );

        if (incomingCalls.result === "seen") {
            if (outgoingCalls.result === "skip") {
                text += `${trailingPrefix}╰ incoming: ...\n`;
            }
            else {
                text += `${prefix}├ incoming: ...\n`;
            }
        }
        else if (incomingCalls.result === "show") {
            if (!ts.some(incomingCalls.values)) {
                if (outgoingCalls.result === "skip") {
                    text += `${trailingPrefix}╰ incoming: none\n`;
                }
                else {
                    text += `${prefix}├ incoming: none\n`;
                }
            }
            else {
                text += `${prefix}├ incoming:\n`;
                for (let i = 0; i < incomingCalls.values.length; i++) {
                    const incomingCall = incomingCalls.values[i];
                    const file = this.findFile(incomingCall.from.file);
                    text += `${prefix}│ ╭ from:\n`;
                    text += this.formatCallHierarchyItem(file, incomingCall.from, CallHierarchyItemDirection.Incoming, seen, `${prefix}│ │ `);
                    text += `${prefix}│ ├ fromSpans:\n`;
                    text += this.formatCallHierarchyItemSpans(
                        file,
                        incomingCall.fromSpans,
                        `${prefix}│ │ `,
                        i < incomingCalls.values.length - 1 ? `${prefix}│ ╰ ` :
                            outgoingCalls.result !== "skip" ? `${prefix}│ ╰ ` :
                            `${trailingPrefix}╰ ╰ `,
                    );
                }
            }
        }

        if (outgoingCalls.result === "seen") {
            text += `${trailingPrefix}╰ outgoing: ...\n`;
        }
        else if (outgoingCalls.result === "show") {
            if (!ts.some(outgoingCalls.values)) {
                text += `${trailingPrefix}╰ outgoing: none\n`;
            }
            else {
                text += `${prefix}├ outgoing:\n`;
                for (let i = 0; i < outgoingCalls.values.length; i++) {
                    const outgoingCall = outgoingCalls.values[i];
                    text += `${prefix}│ ╭ to:\n`;
                    text += this.formatCallHierarchyItem(this.findFile(outgoingCall.to.file), outgoingCall.to, CallHierarchyItemDirection.Outgoing, seen, `${prefix}│ │ `);
                    text += `${prefix}│ ├ fromSpans:\n`;
                    text += this.formatCallHierarchyItemSpans(
                        file,
                        outgoingCall.fromSpans,
                        `${prefix}│ │ `,
                        i < outgoingCalls.values.length - 1 ? `${prefix}│ ╰ ` :
                            `${trailingPrefix}╰ ╰ `,
                    );
                }
            }
        }
        return text;
    }

    private formatCallHierarchy(callHierarchyItem: ts.CallHierarchyItem | undefined) {
        let text = "";
        if (callHierarchyItem) {
            const file = this.findFile(callHierarchyItem.file);
            text += this.formatCallHierarchyItem(file, callHierarchyItem, CallHierarchyItemDirection.Root, new Map(), "");
        }
        return text;
    }

    public baselineCallHierarchy() {
        const callHierarchyItem = this.languageService.prepareCallHierarchy(this.activeFile.fileName, this.currentCaretPosition);
        const text = callHierarchyItem ? ts.mapOneOrMany(callHierarchyItem, item => this.formatCallHierarchy(item), result => result.join("")) : "none";
        this.baseline("Call Hierarchy", text, ".callHierarchy.txt");
    }

    private getLineContent(index: number) {
        const text = this.getFileContent(this.activeFile.fileName);
        const pos = this.languageServiceAdapterHost.lineAndCharacterToPosition(this.activeFile.fileName, { line: index, character: 0 });
        let startPos = pos, endPos = pos;

        while (startPos > 0) {
            const ch = text.charCodeAt(startPos - 1);
            if (ch === ts.CharacterCodes.carriageReturn || ch === ts.CharacterCodes.lineFeed) {
                break;
            }

            startPos--;
        }

        while (endPos < text.length) {
            const ch = text.charCodeAt(endPos);

            if (ch === ts.CharacterCodes.carriageReturn || ch === ts.CharacterCodes.lineFeed) {
                break;
            }

            endPos++;
        }

        return text.substring(startPos, endPos);
    }

    // Get the text of the entire line the caret is currently at
    private getCurrentLineContent() {
        return this.getLineContent(
            this.languageServiceAdapterHost.positionToLineAndCharacter(
                this.activeFile.fileName,
                this.currentCaretPosition,
            ).line,
        );
    }

    private findFile(indexOrName: string | number): FourSlashFile {
        if (typeof indexOrName === "number") {
            const index = indexOrName;
            if (index >= this.testData.files.length) {
                throw new Error(`File index (${index}) in openFile was out of range. There are only ${this.testData.files.length} files in this test.`);
            }
            else {
                return this.testData.files[index];
            }
        }
        else if (ts.isString(indexOrName)) {
            const { file, availableNames } = this.tryFindFileWorker(indexOrName);
            if (!file) {
                throw new Error(`No test file named "${indexOrName}" exists. Available file names are: ${availableNames.join(", ")}`);
            }
            return file;
        }
        else {
            return ts.Debug.assertNever(indexOrName);
        }
    }

    private tryFindFileWorker(name: string): { readonly file: FourSlashFile | undefined; readonly availableNames: readonly string[]; } {
        name = ts.normalizePath(name);
        // names are stored in the compiler with this relative path, this allows people to use goTo.file on just the fileName
        name = name.includes("/") ? name : (this.basePath + "/" + name);

        const availableNames: string[] = [];
        const file = ts.forEach(this.testData.files, file => {
            const fn = ts.normalizePath(file.fileName);
            if (fn) {
                if (fn === name) {
                    return file;
                }
                availableNames.push(fn);
            }
        });
        return { file, availableNames };
    }

    private hasFile(name: string): boolean {
        return this.tryFindFileWorker(name).file !== undefined;
    }

    private getLineColStringAtPosition(position: number, file: FourSlashFile = this.activeFile) {
        const pos = this.languageServiceAdapterHost.positionToLineAndCharacter(file.fileName, position);
        return `line ${(pos.line + 1)}, col ${pos.character}`;
    }

    public getMarkerByName(markerName: string) {
        const markerPos = this.testData.markerPositions.get(markerName);
        if (markerPos === undefined) {
            throw new Error(`Unknown marker "${markerName}" Available markers: ${this.getMarkerNames().map(m => '"' + m + '"').join(", ")}`);
        }
        else {
            return markerPos;
        }
    }

    public setCancelled(numberOfCalls: number): void {
        this.cancellationToken.setCancelled(numberOfCalls);
    }

    public resetCancelled(): void {
        this.cancellationToken.resetCancelled();
    }

    public getEditsForFileRename({ oldPath, newPath, newFileContents, preferences }: FourSlashInterface.GetEditsForFileRenameOptions): void {
        const test = (fileContents: { readonly [fileName: string]: string; }, description: string): void => {
            const changes = this.languageService.getEditsForFileRename(oldPath, newPath, this.formatCodeSettings, preferences);
            this.testNewFileContents(changes, fileContents, description);
        };

        ts.Debug.assert(!this.hasFile(newPath), "initially, newPath should not exist");

        test(newFileContents, "with file not yet moved");

        this.languageServiceAdapterHost.renameFileOrDirectory(oldPath, newPath);
        this.languageService.cleanupSemanticCache();
        const pathUpdater = ts.getPathUpdater(oldPath, newPath, ts.createGetCanonicalFileName(/*useCaseSensitiveFileNames*/ false), /*sourceMapper*/ undefined);
        test(renameKeys(newFileContents, key => pathUpdater(key) || key), "with file moved");
    }

    private getApplicableRefactorsAtSelection(triggerReason: ts.RefactorTriggerReason = "implicit", kind?: string, preferences = ts.emptyOptions) {
        return this.getApplicableRefactorsWorker(this.getSelection(), this.activeFile.fileName, preferences, triggerReason, kind);
    }
    private getApplicableRefactors(rangeOrMarker: Range | Marker, preferences = ts.emptyOptions, triggerReason: ts.RefactorTriggerReason = "implicit", kind?: string, includeInteractiveActions?: boolean): readonly ts.ApplicableRefactorInfo[] {
        return this.getApplicableRefactorsWorker("position" in rangeOrMarker ? rangeOrMarker.position : rangeOrMarker, rangeOrMarker.fileName, preferences, triggerReason, kind, includeInteractiveActions); // eslint-disable-line local/no-in-operator
    }
    private getApplicableRefactorsWorker(positionOrRange: number | ts.TextRange, fileName: string, preferences = ts.emptyOptions, triggerReason: ts.RefactorTriggerReason, kind?: string, includeInteractiveActions?: boolean): readonly ts.ApplicableRefactorInfo[] {
        return this.languageService.getApplicableRefactors(fileName, positionOrRange, preferences, triggerReason, kind, includeInteractiveActions) || ts.emptyArray;
    }

    public configurePlugin(pluginName: string, configuration: any): void {
        (this.languageService as ts.server.SessionClient).configurePlugin(pluginName, configuration);
    }

    public setCompilerOptionsForInferredProjects(options: ts.server.protocol.CompilerOptions) {
        ts.Debug.assert(this.testType === FourSlashTestType.Server);
        (this.languageService as ts.server.SessionClient).setCompilerOptionsForInferredProjects(options);
    }

    public toggleLineComment(newFileContent: string): void {
        const changes: ts.TextChange[] = [];
        for (const range of this.getRanges()) {
            changes.push(...this.languageService.toggleLineComment(this.activeFile.fileName, range));
        }

        this.applyEdits(this.activeFile.fileName, changes);

        this.verifyCurrentFileContent(newFileContent);
    }

    public toggleMultilineComment(newFileContent: string): void {
        const changes: ts.TextChange[] = [];
        for (const range of this.getRanges()) {
            changes.push(...this.languageService.toggleMultilineComment(this.activeFile.fileName, range));
        }

        this.applyEdits(this.activeFile.fileName, changes);

        this.verifyCurrentFileContent(newFileContent);
    }

    public commentSelection(newFileContent: string): void {
        const changes: ts.TextChange[] = [];
        for (const range of this.getRanges()) {
            changes.push(...this.languageService.commentSelection(this.activeFile.fileName, range));
        }

        this.applyEdits(this.activeFile.fileName, changes);

        this.verifyCurrentFileContent(newFileContent);
    }

    public uncommentSelection(newFileContent: string): void {
        const changes: ts.TextChange[] = [];
        for (const range of this.getRanges()) {
            changes.push(...this.languageService.uncommentSelection(this.activeFile.fileName, range));
        }

        this.applyEdits(this.activeFile.fileName, changes);

        this.verifyCurrentFileContent(newFileContent);
    }
}

function updateTextRangeForTextChanges({ pos, end }: ts.TextRange, textChanges: readonly ts.TextChange[]): ts.TextRange {
    forEachTextChange(textChanges, change => {
        const update = (p: number): number => updatePosition(p, change.span.start, ts.textSpanEnd(change.span), change.newText);
        pos = update(pos);
        end = update(end);
    });
    return { pos, end };
}

/** Apply each textChange in order, updating future changes to account for the text offset of previous changes. */
function forEachTextChange(changes: readonly ts.TextChange[], cb: (change: ts.TextChange) => void): void {
    // Copy this so we don't ruin someone else's copy
    changes = JSON.parse(JSON.stringify(changes));
    for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        cb(change);
        const changeDelta = change.newText.length - change.span.length;
        for (let j = i + 1; j < changes.length; j++) {
            if (changes[j].span.start >= change.span.start) {
                changes[j].span.start += changeDelta;
            }
        }
    }
}

function updatePosition(position: number, editStart: number, editEnd: number, { length }: string): number {
    // If inside the edit, return -1 to mark as invalid
    return position <= editStart ? position : position < editEnd ? -1 : position + length - +(editEnd - editStart);
}

function renameKeys<T>(obj: { readonly [key: string]: T; }, renameKey: (key: string) => string): { readonly [key: string]: T; } {
    const res: { [key: string]: T; } = {};
    for (const key in obj) {
        res[renameKey(key)] = obj[key];
    }
    return res;
}

export interface FourSlashServerLogBaseliner {
    baseline?: () => void;
}

export function runFourSlashTest(basePath: string, testType: FourSlashTestType, fileName: string, serverLogBaseliner?: FourSlashServerLogBaseliner) {
    const content = Harness.IO.readFile(fileName)!;
    runFourSlashTestContent(basePath, testType, content, fileName, serverLogBaseliner);
}

export function runFourSlashTestContent(basePath: string, testType: FourSlashTestType, content: string, fileName: string, serverLogBaseliner?: FourSlashServerLogBaseliner): void {
    // Give file paths an absolute path for the virtual file system
    const absoluteBasePath = ts.combinePaths(Harness.virtualFileSystemRoot, basePath);
    const absoluteFileName = ts.combinePaths(Harness.virtualFileSystemRoot, fileName);

    // Parse out the files and their metadata
    const testData = parseTestData(absoluteBasePath, content, absoluteFileName);
    const state = new TestState(absoluteFileName, absoluteBasePath, testType, testData);
    if (serverLogBaseliner) serverLogBaseliner.baseline = () => state.baselineTsserverLog();
    const actualFileName = Harness.IO.resolvePath(fileName) || absoluteFileName;
    const output = ts.transpileModule(content, { reportDiagnostics: true, fileName: actualFileName, compilerOptions: { target: ts.ScriptTarget.ES2015, inlineSourceMap: true, inlineSources: true } });
    if (output.diagnostics!.length > 0) {
        throw new Error(`Syntax error in ${absoluteBasePath}: ${output.diagnostics![0].messageText}`);
    }
    runCode(output.outputText, state, actualFileName);
    state.baselineTest();
}

function runCode(code: string, state: TestState, fileName: string): void {
    // Compile and execute the test
    const generatedFile = ts.changeExtension(fileName, ".js");
    const wrappedCode = `(function(ts, test, goTo, config, verify, edit, debug, format, cancellation, classification, completion, verifyOperationIsCancelled, ignoreInterpolations) {${code}\n//# sourceURL=${ts.getBaseFileName(generatedFile)}\n})`;

    type SourceMapSupportModule = typeof import("source-map-support") & {
        // TODO(rbuckton): This is missing from the DT definitions and needs to be added.
        resetRetrieveHandlers(): void;
    };

    // Provide the content of the current test to 'source-map-support' so that it can give us the correct source positions
    // for test failures.
    let sourceMapSupportModule: SourceMapSupportModule | undefined;
    try {
        sourceMapSupportModule = require("source-map-support");
    }
    catch {
        // do nothing
    }

    sourceMapSupportModule?.install({
        retrieveFile: path => {
            return path === generatedFile ? wrappedCode :
                undefined!;
        },
    });

    try {
        const test = new FourSlashInterface.Test(state);
        const goTo = new FourSlashInterface.GoTo(state);
        const config = new FourSlashInterface.Config(state);
        const verify = new FourSlashInterface.Verify(state);
        const edit = new FourSlashInterface.Edit(state);
        const debug = new FourSlashInterface.Debug(state);
        const format = new FourSlashInterface.Format(state);
        const cancellation = new FourSlashInterface.Cancellation(state);
        // eslint-disable-next-line no-eval
        const f = (0, eval)(wrappedCode);
        f(ts, test, goTo, config, verify, edit, debug, format, cancellation, FourSlashInterface.classification, FourSlashInterface.Completion, verifyOperationIsCancelled, ignoreInterpolations);
    }
    catch (err) {
        // ensure 'source-map-support' is triggered while we still have the handler attached by accessing `error.stack`.
        err.stack?.toString();
        throw err;
    }
    finally {
        sourceMapSupportModule?.resetRetrieveHandlers();
    }
}

function chompLeadingSpace(content: string) {
    const lines = content.split("\n");
    for (const line of lines) {
        if ((line.length !== 0) && (line.charAt(0) !== " ")) {
            return content;
        }
    }

    return lines.map(s => s.substr(1)).join("\n");
}

function parseTestData(basePath: string, contents: string, fileName: string): FourSlashData {
    // Regex for parsing options in the format "@Alpha: Value of any sort"
    const optionRegex = /^\s*@(\w+):\s*(.*)\s*/;

    // List of all the subfiles we've parsed out
    const files: FourSlashFile[] = [];
    // Global options
    const globalOptions: { [s: string]: string; } = {};
    let symlinks: vfs.FileSet | undefined;
    // Marker positions

    // Split up the input file by line
    // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
    // we have to string-based splitting instead and try to figure out the delimiting chars
    const lines = contents.split("\n");
    let i = 0;

    const markerPositions = new Map<string, Marker>();
    const markers: Marker[] = [];
    const ranges: Range[] = [];

    // Stuff related to the subfile we're parsing
    let currentFileContent: string | undefined;
    let currentFileName = fileName;
    let currentFileSymlinks: string[] | undefined;
    let currentFileOptions: { [s: string]: string; } = {};

    function nextFile() {
        if (currentFileContent === undefined) return;

        const file = parseFileContent(currentFileContent, currentFileName, markerPositions, markers, ranges);
        file.fileOptions = currentFileOptions;
        file.symlinks = currentFileSymlinks;

        // Store result file
        files.push(file);

        currentFileContent = undefined;
        currentFileOptions = {};
        currentFileName = fileName;
        currentFileSymlinks = undefined;
    }

    for (let line of lines) {
        i++;
        if (line.length > 0 && line.charAt(line.length - 1) === "\r") {
            line = line.substr(0, line.length - 1);
        }

        if (line.substr(0, 4) === "////") {
            const text = line.substr(4);
            currentFileContent = currentFileContent === undefined ? text : currentFileContent + "\n" + text;
        }
        else if (line.substr(0, 3) === "///" && currentFileContent !== undefined) {
            throw new Error("Three-slash line in the middle of four-slash region at line " + i);
        }
        else if (line.substr(0, 2) === "//") {
            const possiblySymlinks = Harness.TestCaseParser.parseSymlinkFromTest(line, symlinks);
            if (possiblySymlinks) {
                symlinks = possiblySymlinks;
            }
            else {
                // Comment line, check for global/file @options and record them
                const match = optionRegex.exec(line.substr(2));
                if (match) {
                    const key = match[1].toLowerCase();
                    const value = match[2];
                    if (!ts.contains(fileMetadataNames, key)) {
                        // Check if the match is already existed in the global options
                        if (globalOptions[key] !== undefined) {
                            throw new Error(`Global option '${key}' already exists`);
                        }
                        globalOptions[key] = value;
                    }
                    else {
                        switch (key) {
                            case MetadataOptionNames.fileName:
                                // Found an @FileName directive, if this is not the first then create a new subfile
                                nextFile();
                                currentFileName = ts.isRootedDiskPath(value) ? value : basePath + "/" + value;
                                currentFileOptions[key] = value;
                                break;
                            case MetadataOptionNames.symlink:
                                currentFileSymlinks = ts.append(currentFileSymlinks, value);
                                break;
                            default:
                                // Add other fileMetadata flag
                                currentFileOptions[key] = value;
                        }
                    }
                }
            }
        }
        // Previously blank lines between fourslash content caused it to be considered as 2 files,
        // Remove this behavior since it just causes errors now
        else if (line !== "") {
            // Code line, terminate current subfile if there is one
            nextFile();
        }
    }

    // @Filename is the only directive that can be used in a test that contains tsconfig.json file.
    const config = ts.find(files, isConfig);
    if (config) {
        let directive = getNonFileNameOptionInFileList(files);
        if (!directive) {
            directive = getNonFileNameOptionInObject(globalOptions);
        }
        if (directive) {
            throw Error(`It is not allowed to use ${config.fileName} along with directive '${directive}'`);
        }
    }

    return {
        markerPositions,
        markers,
        globalOptions,
        files,
        symlinks,
        ranges,
    };
}

function isConfig(file: FourSlashFile): boolean {
    return Harness.getConfigNameFromFileName(file.fileName) !== undefined;
}

function getNonFileNameOptionInFileList(files: FourSlashFile[]): string | undefined {
    return ts.forEach(files, f => getNonFileNameOptionInObject(f.fileOptions));
}

function getNonFileNameOptionInObject(optionObject: { [s: string]: string; }): string | undefined {
    for (const option in optionObject) {
        switch (option) {
            case MetadataOptionNames.fileName:
            case MetadataOptionNames.baselineFile:
            case MetadataOptionNames.emitThisFile:
                break;
            default:
                return option;
        }
    }
    return undefined;
}

const enum State {
    none,
    inSlashStarMarker,
    inObjectMarker,
}

function reportError(fileName: string, line: number, col: number, message: string): never {
    const errorMessage = fileName + "(" + line + "," + col + "): " + message;
    throw new Error(errorMessage);
}

function recordObjectMarker(fileName: string, location: LocationInformation, text: string, markerMap: Map<string, Marker>, markers: Marker[]): Marker | undefined {
    let markerValue;
    try {
        // Attempt to parse the marker value as JSON
        markerValue = JSON.parse("{ " + text + " }") as { name?: unknown; };
    }
    catch (e) {
        reportError(fileName, location.sourceLine, location.sourceColumn, "Unable to parse marker text " + e.message);
    }

    if (markerValue === undefined) {
        reportError(fileName, location.sourceLine, location.sourceColumn, "Object markers can not be empty");
    }

    const marker: Marker = {
        fileName,
        position: location.position,
        data: markerValue,
    };

    // Object markers can be anonymous
    if (typeof markerValue.name === "string") {
        markerMap.set(markerValue.name, marker);
    }

    markers.push(marker);

    return marker;
}

function recordMarker(fileName: string, location: LocationInformation, name: string, markerMap: Map<string, Marker>, markers: Marker[]): Marker | undefined {
    const marker: Marker = {
        fileName,
        position: location.position,
    };

    // Verify markers for uniqueness
    if (markerMap.has(name)) {
        const message = "Marker '" + name + "' is duplicated in the source file contents.";
        reportError(marker.fileName, location.sourceLine, location.sourceColumn, message);
    }
    else {
        markerMap.set(name, marker);
        markers.push(marker);
        return marker;
    }
}

function parseFileContent(content: string, fileName: string, markerMap: Map<string, Marker>, markers: Marker[], ranges: Range[]): FourSlashFile {
    content = chompLeadingSpace(content);

    // Any slash-star comment with a character not in this string is not a marker.
    const validMarkerChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$1234567890_";

    /// The file content (minus metacharacters) so far
    let output = "";

    /// The current marker (or maybe multi-line comment?) we're parsing, possibly
    let openMarker: LocationInformation | undefined;

    /// A stack of the open range markers that are still unclosed
    const openRanges: RangeLocationInformation[] = [];

    /// A list of ranges we've collected so far */
    let localRanges: Range[] = [];

    /// The latest position of the start of an unflushed plain text area
    let lastNormalCharPosition = 0;

    /// The total number of metacharacters removed from the file (so far)
    let difference = 0;

    /// The fourslash file state object we are generating
    let state: State = State.none;

    /// Current position data
    let line = 1;
    let column = 1;

    const flush = (lastSafeCharIndex: number | undefined) => {
        output = output + content.substr(lastNormalCharPosition, lastSafeCharIndex === undefined ? undefined : lastSafeCharIndex - lastNormalCharPosition);
    };

    if (content.length > 0) {
        let previousChar = content.charAt(0);
        for (let i = 1; i < content.length; i++) {
            const currentChar = content.charAt(i);
            switch (state) {
                case State.none:
                    if (previousChar === "[" && currentChar === "|") {
                        // found a range start
                        openRanges.push({
                            position: (i - 1) - difference,
                            sourcePosition: i - 1,
                            sourceLine: line,
                            sourceColumn: column,
                        });
                        // copy all text up to marker position
                        flush(i - 1);
                        lastNormalCharPosition = i + 1;
                        difference += 2;
                    }
                    else if (previousChar === "|" && currentChar === "]") {
                        // found a range end
                        const rangeStart = openRanges.pop();
                        if (!rangeStart) {
                            reportError(fileName, line, column, "Found range end with no matching start.");
                        }

                        const range: Range = {
                            fileName,
                            pos: rangeStart.position,
                            end: (i - 1) - difference,
                            marker: rangeStart.marker,
                        };
                        localRanges.push(range);

                        // copy all text up to range marker position
                        flush(i - 1);
                        lastNormalCharPosition = i + 1;
                        difference += 2;
                    }
                    else if (previousChar === "/" && currentChar === "*") {
                        // found a possible marker start
                        state = State.inSlashStarMarker;
                        openMarker = {
                            position: (i - 1) - difference,
                            sourcePosition: i - 1,
                            sourceLine: line,
                            sourceColumn: column,
                        };
                    }
                    else if (previousChar === "{" && currentChar === "|") {
                        // found an object marker start
                        state = State.inObjectMarker;
                        openMarker = {
                            position: (i - 1) - difference,
                            sourcePosition: i - 1,
                            sourceLine: line,
                            sourceColumn: column,
                        };
                        flush(i - 1);
                    }
                    break;

                case State.inObjectMarker:
                    // Object markers are only ever terminated by |} and have no content restrictions
                    if (previousChar === "|" && currentChar === "}") {
                        // Record the marker
                        const objectMarkerNameText = content.substring(openMarker!.sourcePosition + 2, i - 1).trim();
                        const marker = recordObjectMarker(fileName, openMarker!, objectMarkerNameText, markerMap, markers);

                        if (openRanges.length > 0) {
                            openRanges[openRanges.length - 1].marker = marker;
                        }

                        // Set the current start to point to the end of the current marker to ignore its text
                        lastNormalCharPosition = i + 1;
                        difference += i + 1 - openMarker!.sourcePosition;

                        // Reset the state
                        openMarker = undefined;
                        state = State.none;
                    }
                    break;

                case State.inSlashStarMarker:
                    if (previousChar === "*" && currentChar === "/") {
                        // Record the marker
                        // start + 2 to ignore the */, -1 on the end to ignore the * (/ is next)
                        const markerNameText = content.substring(openMarker!.sourcePosition + 2, i - 1).trim();
                        const marker = recordMarker(fileName, openMarker!, markerNameText, markerMap, markers);

                        if (openRanges.length > 0) {
                            openRanges[openRanges.length - 1].marker = marker;
                        }

                        // Set the current start to point to the end of the current marker to ignore its text
                        flush(openMarker!.sourcePosition);
                        lastNormalCharPosition = i + 1;
                        difference += i + 1 - openMarker!.sourcePosition;

                        // Reset the state
                        openMarker = undefined;
                        state = State.none;
                    }
                    else if (!validMarkerChars.includes(currentChar)) {
                        if (currentChar === "*" && i < content.length - 1 && content.charAt(i + 1) === "/") {
                            // The marker is about to be closed, ignore the 'invalid' char
                        }
                        else {
                            // We've hit a non-valid marker character, so we were actually in a block comment
                            // Bail out the text we've gathered so far back into the output
                            flush(i);
                            lastNormalCharPosition = i;
                            openMarker = undefined;

                            state = State.none;
                        }
                    }
                    break;
            }

            if (currentChar === "\n" && previousChar === "\r") {
                // Ignore trailing \n after a \r
                continue;
            }
            else if (currentChar === "\n" || currentChar === "\r") {
                line++;
                column = 1;
                continue;
            }

            column++;
            previousChar = currentChar;
        }
    }

    // Add the remaining text
    flush(/*lastSafeCharIndex*/ undefined);

    if (openRanges.length > 0) {
        const openRange = openRanges[0];
        reportError(fileName, openRange.sourceLine, openRange.sourceColumn, "Unterminated range.");
    }

    if (openMarker) {
        reportError(fileName, openMarker.sourceLine, openMarker.sourceColumn, "Unterminated marker.");
    }

    // put ranges in the correct order
    localRanges = localRanges.sort((a, b) => a.pos < b.pos ? -1 : a.pos === b.pos && a.end > b.end ? -1 : 1);
    localRanges.forEach(r => ranges.push(r));

    return {
        content: output,
        fileOptions: {},
        version: 0,
        fileName,
    };
}

function stringify(data: any, replacer?: (key: string, value: any) => any): string {
    return JSON.stringify(data, replacer, 2);
}

/** Collects an array of unique outputs. */
function unique<T>(inputs: readonly T[], getOutput: (t: T) => string): string[] {
    const set = new Map<string, true>();
    for (const input of inputs) {
        const out = getOutput(input);
        set.set(out, true);
    }
    return ts.arrayFrom(set.keys());
}

function toArray<T>(x: ArrayOrSingle<T>): readonly T[] {
    return ts.isArray(x) ? x : [x];
}

function makeWhitespaceVisible(text: string) {
    return text.replace(/ /g, "\u00B7").replace(/\r/g, "\u00B6").replace(/\n/g, "\u2193\n").replace(/\t/g, "\u2192   ");
}

function showTextDiff(expected: string, actual: string): string {
    // Only show whitespace if the difference is whitespace-only.
    if (differOnlyByWhitespace(expected, actual)) {
        expected = makeWhitespaceVisible(expected);
        actual = makeWhitespaceVisible(actual);
    }
    return displayExpectedAndActualString(expected, actual);
}

function differOnlyByWhitespace(a: string, b: string) {
    return stripWhitespace(a) === stripWhitespace(b);
}

function stripWhitespace(s: string): string {
    return s.replace(/\s/g, "");
}

function displayExpectedAndActualString(expected: string, actual: string, quoted = false) {
    const expectMsg = "\x1b[1mExpected\x1b[0m\x1b[31m";
    const actualMsg = "\x1b[1mActual\x1b[0m\x1b[31m";
    const expectedString = quoted ? '"' + expected + '"' : expected;
    const actualString = quoted ? '"' + actual + '"' : actual;
    return `\n${expectMsg}:\n${expectedString}\n\n${actualMsg}:\n${highlightDifferenceBetweenStrings(expected, actualString)}`;
}

function templateToRegExp(template: string) {
    return new RegExp(`^${ts.regExpEscape(template).replace(/\\\{\d+\\\}/g, ".*?")}$`);
}

function rangesOfDiffBetweenTwoStrings(source: string, target: string) {
    const ranges = [] as { start: number; length: number; }[];

    const addToIndex = (index: number) => {
        const closestIndex = ranges[ranges.length - 1];
        if (closestIndex) {
            const doesAddToIndex = closestIndex.start + closestIndex.length === index - 1;
            if (doesAddToIndex) {
                closestIndex.length = closestIndex.length + 1;
            }
            else {
                ranges.push({ start: index - 1, length: 1 });
            }
        }
        else {
            ranges.push({ start: index - 1, length: 1 });
        }
    };

    for (let index = 0; index < Math.max(source.length, target.length); index++) {
        const srcChar = source[index];
        const targetChar = target[index];
        if (srcChar !== targetChar) addToIndex(index);
    }

    return ranges;
}

// Adds an _ when the source string and the target string have a whitespace difference
function highlightDifferenceBetweenStrings(source: string, target: string) {
    const ranges = rangesOfDiffBetweenTwoStrings(source, target);
    let emTarget = target;
    ranges.forEach((range, index) => {
        const lhs = `\x1b[4m`;
        const rhs = `\x1b[0m\x1b[31m`;
        const additionalOffset = index * lhs.length + index * rhs.length;
        const before = emTarget.slice(0, range.start + 1 + additionalOffset);
        const between = emTarget.slice(
            range.start + 1 + additionalOffset,
            range.start + range.length + 1 + additionalOffset,
        );
        const after = emTarget.slice(range.start + range.length + 1 + additionalOffset, emTarget.length);
        emTarget = before + lhs + between + rhs + after;
    });
    return emTarget;
}

function codeFence(code: string, lang?: string) {
    return `\`\`\`${lang || ""}\n${code}\n\`\`\``;
}

function getRangeOfIdentifierTouchingPosition(content: string, position: number): ts.TextRange | undefined {
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ true, ts.LanguageVariant.Standard, content);
    while (scanner.scan() !== ts.SyntaxKind.EndOfFileToken) {
        const tokenFullStart = scanner.getTokenFullStart();
        if (scanner.getToken() === ts.SyntaxKind.Identifier && tokenFullStart <= position && scanner.getTokenEnd() >= position) {
            return { pos: tokenFullStart, end: scanner.getTokenEnd() };
        }
        if (tokenFullStart > position) {
            break;
        }
    }
}
