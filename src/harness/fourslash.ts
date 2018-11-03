namespace FourSlash {
    ts.disableIncrementalParsing = false;

    import ArrayOrSingle = FourSlashInterface.ArrayOrSingle;

    export const enum FourSlashTestType {
        Native,
        Shims,
        ShimsWithPreprocess,
        Server
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

        // A mapping from marker names to name/position pairs
        markerPositions: ts.Map<Marker>;

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

    interface LocationInformation {
        position: number;
        sourcePosition: number;
        sourceLine: number;
        sourceColumn: number;
    }

    interface RangeLocationInformation extends LocationInformation {
        marker?: Marker;
    }

    interface ImplementationLocationInformation extends ts.ImplementationLocation {
        matched?: boolean;
    }

    export interface TextSpan {
        start: number;
        end: number;
    }

    // Name of testcase metadata including ts.CompilerOptions properties that will be used by globalOptions
    // To add additional option, add property into the testOptMetadataNames, refer the property in either globalMetadataNames or fileMetadataNames
    // Add cases into convertGlobalOptionsToCompilationsSettings function for the compiler to acknowledge such option from meta data
    const enum MetadataOptionNames {
        baselineFile = "BaselineFile",
        emitThisFile = "emitThisFile",  // This flag is used for testing getEmitOutput feature. It allows test-cases to indicate what file to be output in multiple files project
        fileName = "Filename",
        resolveReference = "ResolveReference",  // This flag is used to specify entry file for resolve file references. The flag is only allow once per test file
        symlink = "Symlink",
    }

    // List of allowed metadata names
    const fileMetadataNames = [MetadataOptionNames.fileName, MetadataOptionNames.emitThisFile, MetadataOptionNames.resolveReference, MetadataOptionNames.symlink];

    function convertGlobalOptionsToCompilerOptions(globalOptions: Harness.TestCaseParser.CompilerSettings): ts.CompilerOptions {
        const settings: ts.CompilerOptions = { target: ts.ScriptTarget.ES5 };
        Harness.Compiler.setCompilerOptionsFromHarnessSetting(globalOptions, settings);
        return settings;
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

    // This function creates IScriptSnapshot object for testing getPreProcessedFileInfo
    // Return object may lack some functionalities for other purposes.
    function createScriptSnapShot(sourceText: string): ts.IScriptSnapshot {
        return ts.ScriptSnapshot.fromString(sourceText);
    }

    export class TestState {
        // Language service instance
        private languageServiceAdapterHost: Harness.LanguageService.LanguageServiceAdapterHost;
        private languageService: ts.LanguageService;
        private cancellationToken: TestCancellationToken;

        // The current caret position in the active file
        public currentCaretPosition = 0;
        // The position of the end of the current selection, or -1 if nothing is selected
        public selectionEnd = -1;

        public lastKnownMarker = "";

        // The file that's currently 'opened'
        public activeFile: FourSlashFile;

        // Whether or not we should format on keystrokes
        public enableFormatting = true;

        public formatCodeSettings: ts.FormatCodeSettings;

        private inputFiles = ts.createMap<string>();  // Map between inputFile's fileName and its content for easily looking up when resolving references

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
        private addMatchedInputFile(referenceFilePath: string, extensions: ReadonlyArray<string> | undefined) {
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
                case FourSlashTestType.Shims:
                    return new Harness.LanguageService.ShimLanguageServiceAdapter(/*preprocessToResolve*/ false, cancellationToken, compilationOptions);
                case FourSlashTestType.ShimsWithPreprocess:
                    return new Harness.LanguageService.ShimLanguageServiceAdapter(/*preprocessToResolve*/ true, cancellationToken, compilationOptions);
                case FourSlashTestType.Server:
                    return new Harness.LanguageService.ServerLanguageServiceAdapter(cancellationToken, compilationOptions);
                default:
                    throw new Error("Unknown FourSlash test type: ");
            }
        }

        constructor(private basePath: string, private testType: FourSlashTestType, public testData: FourSlashData) {
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
                            compilationOptions = ts.extend(compilationOptions, tsConfig.options);
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
                compilationOptions = ts.parseJsonSourceFileConfigFileContent(jsonSourceFile, host, baseDir, compilationOptions, configFileName).options;
            }

            if (compilationOptions.typeRoots) {
                compilationOptions.typeRoots = compilationOptions.typeRoots.map(p => ts.getNormalizedAbsolutePath(p, this.basePath));
            }

            const languageServiceAdapter = this.getLanguageServiceAdapter(testType, this.cancellationToken, compilationOptions);
            this.languageServiceAdapterHost = languageServiceAdapter.getHost();
            this.languageService = memoWrap(languageServiceAdapter.getLanguageService(), this); // Wrap the LS to cache some expensive operations certain tests call repeatedly

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
                    this.addMatchedInputFile(referenceFilePath, /* extensions */ undefined);
                });

                // Add import files into language-service host
                ts.forEach(importedFiles, importedFile => {
                    // Fourslash insert tests/cases/fourslash into inputFile.unitName and import statement doesn't require ".ts"
                    // so convert them before making appropriate comparison
                    const importedFilePath = this.basePath + "/" + importedFile.fileName;
                    this.addMatchedInputFile(importedFilePath, ts.getSupportedExtensions(compilationOptions));
                });

                // Check if no-default-lib flag is false and if so add default library
                if (!resolvedResult.isLibFile) {
                    this.languageServiceAdapterHost.addScript(Harness.Compiler.defaultLibFileName,
                        Harness.Compiler.getDefaultLibrarySourceFile()!.text, /*isRootFile*/ false);
                }
            }
            else {
                // resolveReference file-option is not specified then do not resolve any files and include all inputFiles
                this.inputFiles.forEach((file, fileName) => {
                    if (!Harness.isDefaultLibraryFile(fileName)) {
                        this.languageServiceAdapterHost.addScript(fileName, file, /*isRootFile*/ true);
                    }
                });
                if (!compilationOptions.noLib) {
                    this.languageServiceAdapterHost.addScript(Harness.Compiler.defaultLibFileName,
                        Harness.Compiler.getDefaultLibrarySourceFile()!.text, /*isRootFile*/ false);
                }
            }

            for (const file of testData.files) {
                ts.forEach(file.symlinks, link => {
                    this.languageServiceAdapterHost.vfs.mkdirpSync(vpath.dirname(link));
                    this.languageServiceAdapterHost.vfs.symlinkSync(file.fileName, link);
                });
            }

            this.formatCodeSettings = ts.testFormatSettings;

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
                for (const k in ls) {
                    const key = k as keyof typeof ls;
                    if (cacheableMembers.indexOf(key) === -1) {
                        proxy[key] = (...args: any[]) => (ls[key] as Function)(...args);
                        continue;
                    }
                    const memo = Utils.memoize(
                        (_version: number, _active: string, _caret: number, _selectEnd: number, _marker: string, ...args: any[]) => (ls[key] as Function)(...args),
                        (...args) => args.join("|,|")
                    );
                    proxy[key] = (...args: any[]) => memo(
                        target.languageServiceAdapterHost.getScriptInfo(target.activeFile.fileName)!.version,
                        target.activeFile.fileName,
                        target.currentCaretPosition,
                        target.selectionEnd,
                        target.lastKnownMarker,
                        ...args
                    );
                }
                return proxy;
            }
        }

        private getFileContent(fileName: string): string {
            return ts.Debug.assertDefined(this.tryGetFileContent(fileName));
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

        public goToEachMarker(markers: ReadonlyArray<Marker>, action: (marker: Marker, index: number) => void) {
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

        public goToPosition(pos: number) {
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
            const predicate = (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) =>
                ((errorMinChar === startPos) && (errorLimChar === endPos)) ? true : false;

            const exists = this.anyErrorInRange(predicate, startMarker, endMarker);

            if (exists !== shouldExist) {
                this.printErrorLog(shouldExist, this.getAllDiagnostics());
                throw new Error(`${shouldExist ? "Expected" : "Did not expect"} failure between markers: '${startMarkerName}', '${endMarkerName}'`);
            }
        }

        private raiseError(message: string): never {
            throw new Error(this.messageAtLastKnownMarker(message));
        }

        private messageAtLastKnownMarker(message: string) {
            const locationDescription = this.lastKnownMarker ? this.lastKnownMarker : this.getLineColStringAtPosition(this.currentCaretPosition);
            return `At ${locationDescription}: ${message}`;
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

        private getAllDiagnostics(): ReadonlyArray<ts.Diagnostic> {
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
            let predicate: (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) => boolean;

            if (after) {
                predicate = (errorMinChar: number, errorLimChar: number, startPos: number) =>
                    ((errorMinChar >= startPos) && (errorLimChar >= startPos)) ? true : false;
            }
            else {
                predicate = (errorMinChar: number, errorLimChar: number, startPos: number) =>
                    ((errorMinChar <= startPos) && (errorLimChar <= startPos)) ? true : false;
            }

            const exists = this.anyErrorInRange(predicate, marker);
            const diagnostics = this.getAllDiagnostics();

            if (exists !== shouldExist) {
                this.printErrorLog(shouldExist, diagnostics);
                throw new Error(`${shouldExist ? "Expected" : "Did not expect"} failure at marker '${markerName}'`);
            }
        }

        private anyErrorInRange(predicate: (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number | undefined) => boolean, startMarker: Marker, endMarker?: Marker): boolean {
            return this.getDiagnostics(startMarker.fileName).some(({ start, length }) =>
                predicate(start!, start! + length!, startMarker.position, endMarker === undefined ? undefined : endMarker.position)); // TODO: GH#18217
        }

        private printErrorLog(expectErrors: boolean, errors: ReadonlyArray<ts.Diagnostic>): void {
            if (expectErrors) {
                Harness.IO.log("Expected error not found.  Error list is:");
            }
            else {
                Harness.IO.log("Unexpected error(s) found.  Error list is:");
            }

            for (const { start, length, messageText, file } of errors) {
                Harness.IO.log("  " + this.formatRange(file, start!, length!) + // TODO: GH#18217
                    ", message: " + ts.flattenDiagnosticMessageText(messageText, Harness.IO.newLine()) + "\n");
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
                if (!ts.isAnySupportedFileExtension(fileName)
                    || !this.getProgram().getCompilerOptions().allowJs && !ts.extensionIsTS(ts.extensionFromPath(fileName))) return;
                const errors = this.getDiagnostics(fileName).filter(e => e.category !== ts.DiagnosticCategory.Suggestion);
                if (errors.length) {
                    this.printErrorLog(/*expectErrors*/ false, errors);
                    const error = errors[0];
                    this.raiseError(`Found an error: ${this.formatPosition(error.file!, error.start!)}: ${error.messageText}`);
                }
            });
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

            const evaluation = new Function(`${emit.outputFiles[0].text};\r\nreturn (${expr});`)();
            if (evaluation !== value) {
                this.raiseError(`Expected evaluation of expression "${expr}" to equal "${value}", but got "${evaluation}"`);
            }
        }

        public verifyGoToDefinitionIs(endMarker: ArrayOrSingle<string>) {
            this.verifyGoToXWorker(toArray(endMarker), () => this.getGoToDefinition());
        }

        public verifyGoToDefinition(arg0: any, endMarkerNames?: ArrayOrSingle<string>) {
            this.verifyGoToX(arg0, endMarkerNames, () => this.getGoToDefinitionAndBoundSpan());
        }

        private getGoToDefinition(): ReadonlyArray<ts.DefinitionInfo> {
            return this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition)!;
        }

        private getGoToDefinitionAndBoundSpan(): ts.DefinitionInfoAndBoundSpan {
            return this.languageService.getDefinitionAndBoundSpan(this.activeFile.fileName, this.currentCaretPosition)!;
        }

        public verifyGoToType(arg0: any, endMarkerNames?: ArrayOrSingle<string>) {
            this.verifyGoToX(arg0, endMarkerNames, () =>
                this.languageService.getTypeDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition));
        }

        private verifyGoToX(arg0: any, endMarkerNames: ArrayOrSingle<string> | undefined, getDefs: () => ReadonlyArray<ts.DefinitionInfo> | ts.DefinitionInfoAndBoundSpan | undefined) {
            if (endMarkerNames) {
                this.verifyGoToXPlain(arg0, endMarkerNames, getDefs);
            }
            else if (ts.isArray(arg0)) {
                const pairs = arg0 as ReadonlyArray<[ArrayOrSingle<string>, ArrayOrSingle<string>]>;
                for (const [start, end] of pairs) {
                    this.verifyGoToXPlain(start, end, getDefs);
                }
            }
            else {
                const obj: { [startMarkerName: string]: ArrayOrSingle<string> } = arg0;
                for (const startMarkerName in obj) {
                    if (ts.hasProperty(obj, startMarkerName)) {
                        this.verifyGoToXPlain(startMarkerName, obj[startMarkerName], getDefs);
                    }
                }
            }
        }

        private verifyGoToXPlain(startMarkerNames: ArrayOrSingle<string>, endMarkerNames: ArrayOrSingle<string>, getDefs: () => ReadonlyArray<ts.DefinitionInfo> | ts.DefinitionInfoAndBoundSpan | undefined) {
            for (const start of toArray(startMarkerNames)) {
                this.verifyGoToXSingle(start, endMarkerNames, getDefs);
            }
        }

        public verifyGoToDefinitionForMarkers(markerNames: string[]) {
            for (const markerName of markerNames) {
                this.verifyGoToXSingle(`${markerName}Reference`, `${markerName}Definition`, () => this.getGoToDefinition());
            }
        }

        private verifyGoToXSingle(startMarkerName: string, endMarkerNames: ArrayOrSingle<string>, getDefs: () => ReadonlyArray<ts.DefinitionInfo> | ts.DefinitionInfoAndBoundSpan | undefined) {
            this.goToMarker(startMarkerName);
            this.verifyGoToXWorker(toArray(endMarkerNames), getDefs, startMarkerName);
        }

        private verifyGoToXWorker(endMarkers: ReadonlyArray<string>, getDefs: () => ReadonlyArray<ts.DefinitionInfo> | ts.DefinitionInfoAndBoundSpan | undefined, startMarkerName?: string) {
            const defs = getDefs();
            let definitions: ReadonlyArray<ts.DefinitionInfo>;
            let testName: string;

            if (!defs || ts.isArray(defs)) {
                definitions = defs as ts.DefinitionInfo[] || [];
                testName = "goToDefinitions";
            }
            else {
                this.verifyDefinitionTextSpan(defs, startMarkerName!);

                definitions = defs.definitions!; // TODO: GH#18217
                testName = "goToDefinitionsAndBoundSpan";
            }

            if (endMarkers.length !== definitions.length) {
                this.raiseError(`${testName} failed - expected to find ${endMarkers.length} definitions but got ${definitions.length}`);
            }

            ts.zipWith(endMarkers, definitions, (endMarker, definition, i) => {
                const marker = this.getMarkerByName(endMarker);
                if (ts.comparePaths(marker.fileName, definition.fileName, /*ignoreCase*/ true) !== ts.Comparison.EqualTo || marker.position !== definition.textSpan.start) {
                    this.raiseError(`${testName} failed for definition ${endMarker} (${i}): expected ${marker.fileName} at ${marker.position}, got ${definition.fileName} at ${definition.textSpan.start}`);
                }
            });
        }

        private verifyDefinitionTextSpan(defs: ts.DefinitionInfoAndBoundSpan, startMarkerName: string) {
            const range = this.testData.ranges.find(range => this.markerName(range.marker!) === startMarkerName);

            if (!range && !defs.textSpan) {
                return;
            }

            if (!range) {
                this.raiseError(`goToDefinitionsAndBoundSpan failed - found a TextSpan ${JSON.stringify(defs.textSpan)} when it wasn't expected.`);
            }
            else if (defs.textSpan.start !== range.pos || defs.textSpan.length !== range.end - range.pos) {
                const expected: ts.TextSpan = {
                    start: range.pos, length: range.end - range.pos
                };
                this.raiseError(`goToDefinitionsAndBoundSpan failed - expected to find TextSpan ${JSON.stringify(expected)} but got ${JSON.stringify(defs.textSpan)}`);
            }
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

        public verifyCompletions(options: FourSlashInterface.VerifyCompletionsOptions) {
            if (options.marker === undefined) {
                this.verifyCompletionsWorker(options);
            }
            else {
                for (const marker of toArray(options.marker)) {
                    this.goToMarker(marker);
                    this.verifyCompletionsWorker(options);
                }
            }
        }

        private verifyCompletionsWorker(options: FourSlashInterface.VerifyCompletionsOptions): void {
            const actualCompletions = this.getCompletionListAtCaret({ ...options.preferences, triggerCharacter: options.triggerCharacter })!;
            if (!actualCompletions) {
                if ("exact" in options && options.exact === undefined) return;
                this.raiseError(`No completions at position '${this.currentCaretPosition}'.`);
            }

            if (actualCompletions.isNewIdentifierLocation !== (options.isNewIdentifierLocation || false)) {
                this.raiseError(`Expected 'isNewIdentifierLocation' to be ${options.isNewIdentifierLocation || false}, got ${actualCompletions.isNewIdentifierLocation}`);
            }

            if ("isGlobalCompletion" in options && actualCompletions.isGlobalCompletion !== options.isGlobalCompletion) {
                this.raiseError(`Expected 'isGlobalCompletion to be ${options.isGlobalCompletion}, got ${actualCompletions.isGlobalCompletion}`);
            }

            const nameToEntries = ts.createMap<ts.CompletionEntry[]>();
            for (const entry of actualCompletions.entries) {
                const entries = nameToEntries.get(entry.name);
                if (!entries) {
                    nameToEntries.set(entry.name, [entry]);
                }
                else {
                    if (entries.some(e => e.source === entry.source)) {
                        this.raiseError(`Duplicate completions for ${entry.name}`);
                    }
                    entries.push(entry);
                }
            }

            if ("exact" in options) {
                ts.Debug.assert(!("includes" in options) && !("excludes" in options));
                if (options.exact === undefined) throw this.raiseError("Expected no completions");
                this.verifyCompletionsAreExactly(actualCompletions.entries, toArray(options.exact));
            }
            else {
                if (options.includes) {
                    for (const include of toArray(options.includes)) {
                        const name = typeof include === "string" ? include : include.name;
                        const found = nameToEntries.get(name);
                        if (!found) throw this.raiseError(`No completion ${name} found`);
                        assert(found.length === 1); // Must use 'exact' for multiple completions with same name
                        this.verifyCompletionEntry(ts.first(found), include);
                    }
                }
                if (options.excludes) {
                    for (const exclude of toArray(options.excludes)) {
                        if (nameToEntries.has(exclude)) {
                            this.raiseError(`Did not expect to get a completion named ${exclude}`);
                        }
                    }
                }
            }
        }

        private verifyCompletionEntry(actual: ts.CompletionEntry, expected: FourSlashInterface.ExpectedCompletionEntry) {
            const { insertText, replacementSpan, hasAction, isRecommended, kind, kindModifiers, text, documentation, tags, source, sourceDisplay } = typeof expected === "string"
                ? { insertText: undefined, replacementSpan: undefined, hasAction: undefined, isRecommended: undefined, kind: undefined, kindModifiers: undefined, text: undefined, documentation: undefined, tags: undefined, source: undefined, sourceDisplay: undefined }
                : expected;

            if (actual.insertText !== insertText) {
                this.raiseError(`Expected completion insert text to be ${insertText}, got ${actual.insertText}`);
            }
            const convertedReplacementSpan = replacementSpan && ts.createTextSpanFromRange(replacementSpan);
            try {
                assert.deepEqual(actual.replacementSpan, convertedReplacementSpan);
            }
            catch {
                this.raiseError(`Expected completion replacementSpan to be ${stringify(convertedReplacementSpan)}, got ${stringify(actual.replacementSpan)}`);
            }

            if (kind !== undefined || kindModifiers !== undefined) {
                assert.equal(actual.kind, kind);
                if (actual.kindModifiers !== (kindModifiers || "")) {
                    this.raiseError(`Bad kind modifiers for ${actual.name}: Expected ${kindModifiers || ""}, actual ${actual.kindModifiers}`);
                }
            }

            assert.equal(actual.hasAction, hasAction);
            assert.equal(actual.isRecommended, isRecommended);
            assert.equal(actual.source, source);

            if (text !== undefined) {
                const actualDetails = this.getCompletionEntryDetails(actual.name, actual.source)!;
                assert.equal(ts.displayPartsToString(actualDetails.displayParts), text);
                assert.equal(ts.displayPartsToString(actualDetails.documentation), documentation || "");
                // TODO: GH#23587
                // assert.equal(actualDetails.kind, actual.kind);
                assert.equal(actualDetails.kindModifiers, actual.kindModifiers);
                assert.equal(actualDetails.source && ts.displayPartsToString(actualDetails.source), sourceDisplay);
                assert.deepEqual(actualDetails.tags, tags);
            }
            else {
                assert(documentation === undefined && tags === undefined && sourceDisplay === undefined, "If specifying completion details, should specify 'text'");
            }
        }

        private verifyCompletionsAreExactly(actual: ReadonlyArray<ts.CompletionEntry>, expected: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry>) {
            // First pass: test that names are right. Then we'll test details.
            assert.deepEqual(actual.map(a => a.name), expected.map(e => typeof e === "string" ? e : e.name));

            ts.zipWith(actual, expected, (completion, expectedCompletion, index) => {
                const name = typeof expectedCompletion === "string" ? expectedCompletion : expectedCompletion.name;
                if (completion.name !== name) {
                    this.raiseError(`Expected completion at index ${index} to be ${name}, got ${completion.name}`);
                }
                this.verifyCompletionEntry(completion, expectedCompletion);
            });
        }

        /** Use `getProgram` instead of accessing this directly. */
        private _program: ts.Program;
        /** Use `getChecker` instead of accessing this directly. */
        private _checker: ts.TypeChecker;

        private getProgram(): ts.Program {
            return this._program || (this._program = this.languageService.getProgram()!); // TODO: GH#18217
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
            if (declarations.length !== declarationRanges.length) {
                this.raiseError(`Expected to get ${declarationRanges.length} declarations, got ${declarations.length}`);
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
            this.languageServiceAdapterHost.typesRegistry = ts.createMapFromTemplate(map);
        }

        public verifyTypeOfSymbolAtLocation(range: Range, symbol: ts.Symbol, expected: string): void {
            const node = this.goToAndGetNode(range);
            const checker = this.getChecker();
            const type = checker.getTypeOfSymbolAtLocation(symbol, node);

            const actual = checker.typeToString(type);
            if (actual !== expected) {
                this.raiseError(`Expected: '${expected}', actual: '${actual}'`);
            }
        }

        private verifyDocumentHighlightsRespectFilesList(files: ReadonlyArray<string>): void {
            const startFile = this.activeFile.fileName;
            for (const fileName of files) {
                const searchFileNames = startFile === fileName ? [startFile] : [startFile, fileName];
                const highlights = this.getDocumentHighlightsAtCurrentPosition(searchFileNames)!;
                if (!highlights.every(dh => ts.contains(searchFileNames, dh.fileName))) {
                    this.raiseError(`When asking for document highlights only in files ${searchFileNames}, got document highlights in ${unique(highlights, dh => dh.fileName)}`);
                }
            }
        }

        public verifyReferenceGroups(starts: ArrayOrSingle<string> | ArrayOrSingle<Range>, parts: ReadonlyArray<FourSlashInterface.ReferenceGroup>): void {
            interface ReferenceGroupJson {
                definition: string | { text: string, range: ts.TextSpan };
                references: ts.ReferenceEntry[];
            }
            const fullExpected = ts.map<FourSlashInterface.ReferenceGroup, ReferenceGroupJson>(parts, ({ definition, ranges }) => ({
                definition: typeof definition === "string" ? definition : { ...definition, range: ts.createTextSpanFromRange(definition.range) },
                references: ranges.map<ts.ReferenceEntry>(r => {
                    const { isWriteAccess = false, isDefinition = false, isInString } = (r.marker && r.marker.data || {}) as { isWriteAccess?: boolean, isDefinition?: boolean, isInString?: true };
                    return {
                        fileName: r.fileName,
                        textSpan: ts.createTextSpanFromRange(r),
                        isWriteAccess,
                        isDefinition,
                        ...(isInString ? { isInString: true } : undefined),
                    };
                }),
            }));

            for (const start of toArray<string | Range>(starts)) {
                this.goToMarkerOrRange(start);
                const fullActual = ts.map<ts.ReferencedSymbol, ReferenceGroupJson>(this.findReferencesAtCaret(), ({ definition, references }, i) => {
                    const text = definition.displayParts.map(d => d.text).join("");
                    return {
                        definition: fullExpected.length > i && typeof fullExpected[i].definition === "string" ? text : { text, range: definition.textSpan },
                        references,
                    };
                });
                this.assertObjectsEqual(fullActual, fullExpected);

                if (parts) {
                    this.verifyDocumentHighlightsRespectFilesList(unique(ts.flatMap(parts, p => p.ranges), r => r.fileName));
                }
            }
        }

        public verifyNoReferences(markerNameOrRange?: string | Range) {
            if (markerNameOrRange) this.goToMarkerOrRange(markerNameOrRange);
            const refs = this.getReferencesAtCaret();
            if (refs && refs.length) {
                this.raiseError(`Expected getReferences to fail, but saw references: ${stringify(refs)}`);
            }
        }

        // Necessary to have this function since `findReferences` isn't implemented in `client.ts`
        public verifyGetReferencesForServerTest(expected: ReadonlyArray<ts.ReferenceEntry>): void {
            const refs = this.getReferencesAtCaret();
            assert.deepEqual<ReadonlyArray<ts.ReferenceEntry> | undefined>(refs, expected);
        }

        public verifySingleReferenceGroup(definition: FourSlashInterface.ReferenceGroupDefinition, ranges?: Range[]) {
            ranges = ranges || this.getRanges();
            this.verifyReferenceGroups(ranges, [{ definition, ranges }]);
        }

        private assertObjectsEqual<T>(fullActual: T, fullExpected: T, msgPrefix = ""): void {
            const recur = <U>(actual: U, expected: U, path: string) => {
                const fail = (msg: string) => {
                    this.raiseError(`${msgPrefix} At ${path}: ${msg}
Expected: ${stringify(fullExpected)}
Actual: ${stringify(fullActual)}`);
                };

                if ((actual === undefined) !== (expected === undefined)) {
                    fail(`Expected ${expected}, got ${actual}`);
                }

                for (const key in actual) {
                    if (ts.hasProperty(actual as any, key)) {
                        const ak = actual[key], ek = expected[key];
                        if (typeof ak === "object" && typeof ek === "object") {
                            recur(ak, ek, path ? path + "." + key : key);
                        }
                        else if (ak !== ek) {
                            fail(`Expected '${key}' to be '${ek}', got '${ak}'`);
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
                this.raiseError(`${msgPrefix}
Expected: ${stringify(fullExpected)}
Actual: ${stringify(fullActual)}`);
            }
            recur(fullActual, fullExpected, "");

        }

        public verifyDisplayPartsOfReferencedSymbol(expected: ts.SymbolDisplayPart[]) {
            const referencedSymbols = this.findReferencesAtCaret()!;

            if (referencedSymbols.length === 0) {
                this.raiseError("No referenced symbols found at current caret position");
            }
            else if (referencedSymbols.length > 1) {
                this.raiseError("More than one referenced symbol found");
            }

            assert.equal(TestState.getDisplayPartsJson(referencedSymbols[0].definition.displayParts),
                TestState.getDisplayPartsJson(expected), this.messageAtLastKnownMarker("referenced symbol definition display parts"));
        }

        private getCompletionListAtCaret(options?: ts.GetCompletionsAtPositionOptions): ts.CompletionInfo | undefined {
            return this.languageService.getCompletionsAtPosition(this.activeFile.fileName, this.currentCaretPosition, options);
        }

        private getCompletionEntryDetails(entryName: string, source?: string, preferences?: ts.UserPreferences): ts.CompletionEntryDetails | undefined {
            return this.languageService.getCompletionEntryDetails(this.activeFile.fileName, this.currentCaretPosition, entryName, this.formatCodeSettings, source, preferences);
        }

        private getReferencesAtCaret() {
            return this.languageService.getReferencesAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        }

        private findReferencesAtCaret() {
            return this.languageService.findReferences(this.activeFile.fileName, this.currentCaretPosition);
        }

        public getSyntacticDiagnostics(expected: ReadonlyArray<FourSlashInterface.Diagnostic>) {
            const diagnostics = this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
            this.testDiagnostics(expected, diagnostics, "error");
        }

        public getSemanticDiagnostics(expected: ReadonlyArray<FourSlashInterface.Diagnostic>) {
            const diagnostics = this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
            this.testDiagnostics(expected, diagnostics, "error");
        }

        public getSuggestionDiagnostics(expected: ReadonlyArray<FourSlashInterface.Diagnostic>): void {
            this.testDiagnostics(expected, this.languageService.getSuggestionDiagnostics(this.activeFile.fileName), "suggestion");
        }

        private testDiagnostics(expected: ReadonlyArray<FourSlashInterface.Diagnostic>, diagnostics: ReadonlyArray<ts.Diagnostic>, category: string) {
            assert.deepEqual(ts.realizeDiagnostics(diagnostics, "\n"), expected.map((e): ts.RealizedDiagnostic => ({
                message: e.message,
                category,
                code: e.code,
                ...ts.createTextSpanFromRange(e.range || this.getRanges()[0]),
                reportsUnnecessary: e.reportsUnnecessary,
            })));
        }

        public verifyQuickInfoAt(markerName: string | Range, expectedText: string, expectedDocumentation?: string) {
            if (typeof markerName === "string") this.goToMarker(markerName);
            else this.goToRangeStart(markerName);

            this.verifyQuickInfoString(expectedText, expectedDocumentation);
        }

        public verifyQuickInfos(namesAndTexts: { [name: string]: string | [string, string] }) {
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

        public verifyQuickInfoString(expectedText: string, expectedDocumentation?: string) {
            if (expectedDocumentation === "") {
                throw new Error("Use 'undefined' instead");
            }
            const actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            const actualQuickInfoText = actualQuickInfo ? ts.displayPartsToString(actualQuickInfo.displayParts) : "";
            const actualQuickInfoDocumentation = actualQuickInfo ? ts.displayPartsToString(actualQuickInfo.documentation) : "";

            assert.equal(actualQuickInfoText, expectedText, this.messageAtLastKnownMarker("quick info text"));
            assert.equal(actualQuickInfoDocumentation, expectedDocumentation || "", this.assertionMessageAtLastKnownMarker("quick info doc"));
        }

        public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: TextSpan,
            displayParts: ts.SymbolDisplayPart[],
            documentation: ts.SymbolDisplayPart[],
            tags: ts.JSDocTagInfo[] | undefined
        ) {

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

        public verifyRangesAreRenameLocations(options?: Range[] | { findInStrings?: boolean, findInComments?: boolean, ranges?: Range[] }) {
            if (ts.isArray(options)) {
                this.verifyRenameLocations(options, options);
            }
            else {
                const ranges = options && options.ranges || this.getRanges();
                this.verifyRenameLocations(ranges, { ranges, ...options });
            }
        }

        public verifyRenameLocations(startRanges: ArrayOrSingle<Range>, options: FourSlashInterface.RenameLocationsOptions) {
            const { findInStrings = false, findInComments = false, ranges = this.getRanges() } = ts.isArray(options) ? { findInStrings: false, findInComments: false, ranges: options } : options;

            for (const startRange of toArray(startRanges)) {
                this.goToRangeStart(startRange);

                const renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
                if (!renameInfo.canRename) {
                    this.raiseError("Expected rename to succeed, but it actually failed.");
                    break;
                }

                const references = this.languageService.findRenameLocations(
                    this.activeFile.fileName, this.currentCaretPosition, findInStrings, findInComments);

                const sort = (locations: ReadonlyArray<ts.RenameLocation> | undefined) =>
                    locations && ts.sort(locations, (r1, r2) => ts.compareStringsCaseSensitive(r1.fileName, r2.fileName) || r1.textSpan.start - r2.textSpan.start);
                assert.deepEqual(sort(references), sort(ranges.map((rangeOrOptions): ts.RenameLocation => {
                    const { range, ...prefixSuffixText } = "range" in rangeOrOptions ? rangeOrOptions : { range: rangeOrOptions };
                    return { fileName: range.fileName, textSpan: ts.createTextSpanFromRange(range), ...prefixSuffixText };
                })));
            }
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

        public verifySignatureHelpPresence(expectPresent: boolean, triggerReason: ts.SignatureHelpTriggerReason | undefined, markers: ReadonlyArray<string>) {
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

        public verifySignatureHelp(optionses: ReadonlyArray<FourSlashInterface.VerifySignatureHelpOptions>) {
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
            const selectedItem = help.items[help.selectedItemIndex];
            // Argument index may exceed number of parameters
            const currentParameter = selectedItem.parameters[help.argumentIndex] as ts.SignatureHelpParameter | undefined;

            assert.equal(help.items.length, options.overloadsCount || 1, this.assertionMessageAtLastKnownMarker("signature help overloads count"));

            assert.equal(ts.displayPartsToString(selectedItem.documentation), options.docComment || "", this.assertionMessageAtLastKnownMarker("current signature help doc comment"));

            if (options.text !== undefined) {
                assert.equal(
                    ts.displayPartsToString(selectedItem.prefixDisplayParts) +
                    selectedItem.parameters.map(p => ts.displayPartsToString(p.displayParts)).join(ts.displayPartsToString(selectedItem.separatorDisplayParts)) +
                    ts.displayPartsToString(selectedItem.suffixDisplayParts), options.text);
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
            ts.zipWith((options.tags || ts.emptyArray), actualTags, (expectedTag, actualTag) => {
                assert.equal(actualTag.name, expectedTag.name);
                assert.equal(actualTag.text, expectedTag.text, this.assertionMessageAtLastKnownMarker("signature help tag " + actualTag.name));
            });

            const allKeys: ReadonlyArray<keyof FourSlashInterface.VerifySignatureHelpOptions> = [
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

        public verifyRenameInfoSucceeded(displayName: string | undefined, fullDisplayName: string | undefined, kind: string | undefined, kindModifiers: string | undefined, fileToRename: string | undefined, expectedRange: Range | undefined): void {
            const renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
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

            if (renameInfo.triggerSpan.start !== expectedRange.pos ||
                ts.textSpanEnd(renameInfo.triggerSpan) !== expectedRange.end) {
                this.raiseError("Expected triggerSpan [" + expectedRange.pos + "," + expectedRange.end + ").  Got [" +
                    renameInfo.triggerSpan.start + "," + ts.textSpanEnd(renameInfo.triggerSpan) + ") instead.");
            }
        }

        public verifyRenameInfoFailed(message?: string) {
            const renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
            if (renameInfo.canRename) {
                throw this.raiseError("Rename was expected to fail");
            }
            this.validate("error", message, renameInfo.localizedErrorMessage);
        }

        private alignmentForExtraInfo = 50;

        private spanInfoToString(spanInfo: ts.TextSpan, prefixString: string) {
            let resultString = "SpanInfo: " + JSON.stringify(spanInfo);
            if (spanInfo) {
                const spanString = this.activeFile.content.substr(spanInfo.start, spanInfo.length);
                const spanLineMap = ts.computeLineStarts(spanString);
                for (let i = 0; i < spanLineMap.length; i++) {
                    if (!i) {
                        resultString += "\n";
                    }
                    resultString += prefixString + spanString.substring(spanLineMap[i], spanLineMap[i + 1]);
                }
                resultString += "\n" + prefixString + ":=> (" + this.getLineColStringAtPosition(spanInfo.start) + ") to (" + this.getLineColStringAtPosition(ts.textSpanEnd(spanInfo)) + ")";
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
            let baselineFile = this.testData.globalOptions[MetadataOptionNames.baselineFile];
            if (!baselineFile) {
                baselineFile = this.activeFile.fileName.replace(this.basePath + "/breakpointValidation", "bpSpan");
                baselineFile = baselineFile.replace(ts.Extension.Ts, ".baseline");

            }
            Harness.Baseline.runBaseline(baselineFile, this.baselineCurrentFileLocations(pos => this.getBreakpointStatementLocation(pos)!));
        }

        private getEmitFiles(): ReadonlyArray<FourSlashFile> {
            // Find file to be emitted
            const emitFiles: FourSlashFile[] = [];  // List of FourSlashFile that has emitThisFile flag on

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

        public verifyGetEmitOutput(expectedOutputFiles: ReadonlyArray<string>): void {
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
                            let chainedMessage: ts.DiagnosticMessageChain | undefined = diagnostic.messageText;
                            let indentation = " ";
                            while (chainedMessage) {
                                resultString += indentation + chainedMessage.messageText + Harness.IO.newLine();
                                chainedMessage = chainedMessage.next;
                                indentation = indentation + " ";
                            }
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

            Harness.Baseline.runBaseline(ts.Debug.assertDefined(this.testData.globalOptions[MetadataOptionNames.baselineFile]), resultString);
        }

        public baselineQuickInfo() {
            const baselineFile = this.testData.globalOptions[MetadataOptionNames.baselineFile] ||
                ts.getBaseFileName(this.activeFile.fileName).replace(ts.Extension.Ts, ".baseline");
            Harness.Baseline.runBaseline(
                baselineFile,
                stringify(
                    this.testData.markers.map(marker => ({
                        marker,
                        quickInfo: this.languageService.getQuickInfoAtPosition(marker.fileName, marker.position)
                    }))));
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
                        ", message: " + ts.flattenDiagnosticMessageText(err.messageText, Harness.IO.newLine()));
                });
            }
        }

        public printCurrentFileState(showWhitespace: boolean, makeCaretVisible: boolean) {
            for (const file of this.testData.files) {
                const active = (this.activeFile === file);
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

        private getSignatureHelp({ triggerReason }: FourSlashInterface.VerifySignatureHelpOptions): ts.SignatureHelpItems | undefined {
            return this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition, {
                triggerReason
            });
        }

        public printCompletionListMembers(preferences: ts.UserPreferences | undefined) {
            const completions = this.getCompletionListAtCaret(preferences);
            this.printMembersOrCompletions(completions);
        }

        private printMembersOrCompletions(info: ts.CompletionInfo | undefined) {
            if (info === undefined) { return "No completion info."; }
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
                        offset += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
                    }
                }
            }

            this.checkPostEditInvariants();
        }

        public replace(start: number, length: number, text: string) {
            this.editScriptAndUpdateMarkers(this.activeFile.fileName, start, start + length, text);
            this.checkPostEditInvariants();
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
                                triggerCharacter: ch
                            }
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
                        offset += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
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
                    this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
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

            const referenceSourceFile = ts.createLanguageServiceSourceFile(
                this.activeFile.fileName, createScriptSnapShot(content), ts.ScriptTarget.Latest, /*version:*/ "0", /*setNodeParents:*/ false);
            const referenceSyntaxDiagnostics = referenceSourceFile.parseDiagnostics;

            Utils.assertDiagnosticsEquals(incrementalSyntaxDiagnostics, referenceSyntaxDiagnostics);
            Utils.assertStructuralEquals(incrementalSourceFile, referenceSourceFile);
        }

        /**
         * @returns The number of characters added to the file as a result of the edits.
         * May be negative.
         */
        private applyEdits(fileName: string, edits: ReadonlyArray<ts.TextChange>, isFormattingEdit: boolean): number {
            // Get a snapshot of the content of the file so we can make sure any formatting edits didn't destroy non-whitespace characters
            const oldContent = this.getFileContent(fileName);
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

            if (isFormattingEdit) {
                const newContent = this.getFileContent(fileName);

                if (this.removeWhitespace(newContent) !== this.removeWhitespace(oldContent)) {
                    this.raiseError("Formatting operation destroyed non-whitespace content");
                }
            }

            return runningOffset;
        }

        public copyFormatOptions(): ts.FormatCodeSettings {
            return ts.clone(this.formatCodeSettings);
        }

        public setFormatOptions(formatCodeOptions: ts.FormatCodeOptions | ts.FormatCodeSettings): ts.FormatCodeSettings {
            const oldFormatCodeOptions = this.formatCodeSettings;
            this.formatCodeSettings = ts.toEditorSettings(formatCodeOptions);
            return oldFormatCodeOptions;
        }

        public formatDocument() {
            const edits = this.languageService.getFormattingEditsForDocument(this.activeFile.fileName, this.formatCodeSettings);
            this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
        }

        public formatSelection(start: number, end: number) {
            const edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, end, this.formatCodeSettings);
            this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
        }

        public formatOnType(pos: number, key: string) {
            const edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, pos, key, this.formatCodeSettings);
            this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
        }

        private editScriptAndUpdateMarkers(fileName: string, editStart: number, editEnd: number, newText: string) {
            this.languageServiceAdapterHost.editScript(fileName, editStart, editEnd, newText);
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

        private goToMarkerOrRange(markerOrRange: string | Range) {
            if (typeof markerOrRange === "string") {
                this.goToMarker(markerOrRange);
            }
            else {
                this.goToRangeStart(markerOrRange);
            }
        }

        public goToRangeStart({ fileName, pos }: Range) {
            this.openFile(fileName);
            this.goToPosition(pos);
        }

        public goToTypeDefinition(definitionIndex: number) {
            const definitions = this.languageService.getTypeDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition)!;
            if (!definitions || !definitions.length) {
                this.raiseError("goToTypeDefinition failed - expected to find at least one definition location but got 0");
            }

            if (definitionIndex >= definitions.length) {
                this.raiseError(`goToTypeDefinition failed - definitionIndex value (${definitionIndex}) exceeds definition list size (${definitions.length})`);
            }

            const definition = definitions[definitionIndex];
            this.openFile(definition.fileName);
            this.currentCaretPosition = definition.textSpan.start;
        }

        public verifyTypeDefinitionsCount(negative: boolean, expectedCount: number) {
            const assertFn = negative ? assert.notEqual : assert.equal;

            const definitions = this.languageService.getTypeDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            const actualCount = definitions && definitions.length || 0;

            assertFn(actualCount, expectedCount, this.messageAtLastKnownMarker("Type definitions Count"));
        }

        public verifyImplementationListIsEmpty(negative: boolean) {
            const implementations = this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition);

            if (negative) {
                assert.isTrue(implementations && implementations.length > 0, "Expected at least one implementation but got 0");
            }
            else {
                assert.isUndefined(implementations, "Expected implementation list to be empty but implementations returned");
            }
        }

        public verifyGoToDefinitionName(expectedName: string, expectedContainerName: string) {
            const definitions = this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            const actualDefinitionName = definitions && definitions.length ? definitions[0].name : "";
            const actualDefinitionContainerName = definitions && definitions.length ? definitions[0].containerName : "";
            assert.equal(actualDefinitionName, expectedName, this.messageAtLastKnownMarker("Definition Info Name"));
            assert.equal(actualDefinitionContainerName, expectedContainerName, this.messageAtLastKnownMarker("Definition Info Container Name"));
        }

        public goToImplementation() {
            const implementations = this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition)!;
            if (!implementations || !implementations.length) {
                this.raiseError("goToImplementation failed - expected to find at least one implementation location but got 0");
            }
            if (implementations.length > 1) {
                this.raiseError(`goToImplementation failed - more than 1 implementation returned (${implementations.length})`);
            }

            const implementation = implementations[0];
            this.openFile(implementation.fileName);
            this.currentCaretPosition = implementation.textSpan.start;
        }

        public verifyRangesInImplementationList(markerName: string) {
            this.goToMarker(markerName);
            const implementations: ReadonlyArray<ImplementationLocationInformation> = this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition)!;
            if (!implementations || !implementations.length) {
                this.raiseError("verifyRangesInImplementationList failed - expected to find at least one implementation location but got 0");
            }

            const duplicate = findDuplicatedElement(implementations, ts.documentSpansEqual);
            if (duplicate) {
                const { textSpan, fileName } = duplicate;
                this.raiseError(`Duplicate implementations returned for range (${textSpan.start}, ${ts.textSpanEnd(textSpan)}) in ${fileName}`);
            }

            const ranges = this.getRanges();

            if (!ranges || !ranges.length) {
                this.raiseError("verifyRangesInImplementationList failed - expected to find at least one range in test source");
            }

            const unsatisfiedRanges: Range[] = [];

            const delayedErrors: string[] = [];
            for (const range of ranges) {
                const length = range.end - range.pos;
                const matchingImpl = ts.find(implementations, impl =>
                    range.fileName === impl.fileName && range.pos === impl.textSpan.start && length === impl.textSpan.length);
                if (matchingImpl) {
                    if (range.marker && range.marker.data) {
                        const expected = <{ displayParts?: ts.SymbolDisplayPart[], parts: string[], kind?: string }>range.marker.data;
                        if (expected.displayParts) {
                            if (!ts.arrayIsEqualTo(expected.displayParts, matchingImpl.displayParts, displayPartIsEqualTo)) {
                                delayedErrors.push(`Mismatched display parts: expected ${JSON.stringify(expected.displayParts)}, actual ${JSON.stringify(matchingImpl.displayParts)}`);
                            }
                        }
                        else if (expected.parts) {
                            const actualParts = matchingImpl.displayParts.map(p => p.text);
                            if (!ts.arrayIsEqualTo(expected.parts, actualParts)) {
                                delayedErrors.push(`Mismatched non-tagged display parts: expected ${JSON.stringify(expected.parts)}, actual ${JSON.stringify(actualParts)}`);
                            }
                        }
                        if (expected.kind !== undefined) {
                            if (expected.kind !== matchingImpl.kind) {
                                delayedErrors.push(`Mismatched kind: expected ${JSON.stringify(expected.kind)}, actual ${JSON.stringify(matchingImpl.kind)}`);
                            }
                        }
                    }

                    matchingImpl.matched = true;
                }
                else {
                    unsatisfiedRanges.push(range);
                }
            }
            if (delayedErrors.length) {
                this.raiseError(delayedErrors.join("\n"));
            }

            const unmatchedImplementations = implementations.filter(impl => !impl.matched);
            if (unmatchedImplementations.length || unsatisfiedRanges.length) {
                let error = "Not all ranges or implementations are satisfied";
                if (unsatisfiedRanges.length) {
                    error += "\nUnsatisfied ranges:";
                    for (const range of unsatisfiedRanges) {
                        error += `\n    (${range.pos}, ${range.end}) in ${range.fileName}: ${this.rangeText(range)}`;
                    }
                }

                if (unmatchedImplementations.length) {
                    error += "\nUnmatched implementations:";
                    for (const impl of unmatchedImplementations) {
                        const end = impl.textSpan.start + impl.textSpan.length;
                        error += `\n    (${impl.textSpan.start}, ${end}) in ${impl.fileName}: ${this.getFileContent(impl.fileName).slice(impl.textSpan.start, end)}`;
                    }
                }
                this.raiseError(error);
            }

            function displayPartIsEqualTo(a: ts.SymbolDisplayPart, b: ts.SymbolDisplayPart): boolean {
                return a.kind === b.kind && a.text === b.text;
            }
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

        public rangesByText(): ts.Map<Range[]> {
            const result = ts.createMultiMap<Range>();
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
                throw new Error("verifyCurrentLineContent\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: \"" + actual + "\"");
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
            const after = this.getFileContent(fileName);
            this.assertObjectsEqual(after, before);
        }

        public verifyTextAtCaretIs(text: string) {
            const actual = this.getFileContent(this.activeFile.fileName).substring(this.currentCaretPosition, this.currentCaretPosition + text.length);
            if (actual !== text) {
                throw new Error("verifyTextAtCaretIs\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: \"" + actual + "\"");
            }
        }

        public verifyCurrentNameOrDottedNameSpanText(text: string) {
            const span = this.languageService.getNameOrDottedNameSpan(this.activeFile.fileName, this.currentCaretPosition, this.currentCaretPosition);
            if (!span) {
                return this.raiseError("verifyCurrentNameOrDottedNameSpanText\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: undefined");
            }

            const actual = this.getFileContent(this.activeFile.fileName).substring(span.start, ts.textSpanEnd(span));
            if (actual !== text) {
                this.raiseError("verifyCurrentNameOrDottedNameSpanText\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: \"" + actual + "\"");
            }
        }

        private getNameOrDottedNameSpan(pos: number) {
            return this.languageService.getNameOrDottedNameSpan(this.activeFile.fileName, pos, pos);
        }

        public baselineCurrentFileNameOrDottedNameSpans() {
            Harness.Baseline.runBaseline(
                this.testData.globalOptions[MetadataOptionNames.baselineFile],
                this.baselineCurrentFileLocations(pos => this.getNameOrDottedNameSpan(pos)!));
        }

        public printNameOrDottedNameSpans(pos: number) {
            Harness.IO.log(this.spanInfoToString(this.getNameOrDottedNameSpan(pos)!, "**"));
        }

        private verifyClassifications(expected: { classificationType: string; text: string; textSpan?: TextSpan }[], actual: ts.ClassifiedSpan[], sourceFileText: string) {
            if (actual.length !== expected.length) {
                this.raiseError("verifyClassifications failed - expected total classifications to be " + expected.length +
                    ", but was " + actual.length +
                    jsonMismatchString());
            }

            ts.zipWith(expected, actual, (expectedClassification, actualClassification) => {
                const expectedType = expectedClassification.classificationType;
                if (expectedType !== actualClassification.classificationType) {
                    this.raiseError("verifyClassifications failed - expected classifications type to be " +
                        expectedType + ", but was " +
                        actualClassification.classificationType +
                        jsonMismatchString());
                }

                const expectedSpan = expectedClassification.textSpan;
                const actualSpan = actualClassification.textSpan;

                if (expectedSpan) {
                    const expectedLength = expectedSpan.end - expectedSpan.start;

                    if (expectedSpan.start !== actualSpan.start || expectedLength !== actualSpan.length) {
                        this.raiseError("verifyClassifications failed - expected span of text to be " +
                            "{start=" + expectedSpan.start + ", length=" + expectedLength + "}, but was " +
                            "{start=" + actualSpan.start + ", length=" + actualSpan.length + "}" +
                            jsonMismatchString());
                    }
                }

                const actualText = this.activeFile.content.substr(actualSpan.start, actualSpan.length);
                if (expectedClassification.text !== actualText) {
                    this.raiseError("verifyClassifications failed - expected classified text to be " +
                        expectedClassification.text + ", but was " +
                        actualText +
                        jsonMismatchString());
                }
            });

            function jsonMismatchString() {
                const showActual = actual.map(({ classificationType, textSpan }) =>
                    ({ classificationType, text: sourceFileText.slice(textSpan.start, textSpan.start + textSpan.length) }));
                return Harness.IO.newLine() +
                    "expected: '" + Harness.IO.newLine() + stringify(expected) + "'" + Harness.IO.newLine() +
                    "actual:   '" + Harness.IO.newLine() + stringify(showActual) + "'";
            }
        }

        public verifyProjectInfo(expected: string[]) {
            if (this.testType === FourSlashTestType.Server) {
                const actual = (<ts.server.SessionClient>this.languageService).getProjectInfo(
                    this.activeFile.fileName,
                    /* needFileNameList */ true
                );
                assert.equal(
                    expected.join(","),
                    actual.fileNames!.map(file => {
                        return file.replace(this.basePath + "/", "");
                    }).join(",")
                );
            }
        }

        public verifySemanticClassifications(expected: { classificationType: string; text: string }[]) {
            const actual = this.languageService.getSemanticClassifications(this.activeFile.fileName,
                ts.createTextSpan(0, this.activeFile.content.length));

            this.verifyClassifications(expected, actual, this.activeFile.content);
        }

        public verifySyntacticClassifications(expected: { classificationType: string; text: string }[]) {
            const actual = this.languageService.getSyntacticClassifications(this.activeFile.fileName,
                ts.createTextSpan(0, this.activeFile.content.length));

            this.verifyClassifications(expected, actual, this.activeFile.content);
        }

        public printOutliningSpans() {
            const spans = this.languageService.getOutliningSpans(this.activeFile.fileName);
            Harness.IO.log(`Outlining spans (${spans.length} items)`);
            Harness.IO.log(stringify(spans));
        }

        public verifyOutliningSpans(spans: Range[], kind?: "comment" | "region" | "code" | "imports") {
            const actual = this.languageService.getOutliningSpans(this.activeFile.fileName);

            if (actual.length !== spans.length) {
                this.raiseError(`verifyOutliningSpans failed - expected total spans to be ${spans.length}, but was ${actual.length}`);
            }

            ts.zipWith(spans, actual, (expectedSpan, actualSpan, i) => {
                if (expectedSpan.pos !== actualSpan.textSpan.start || expectedSpan.end !== ts.textSpanEnd(actualSpan.textSpan)) {
                    return this.raiseError(`verifyOutliningSpans failed - span ${(i + 1)} expected: (${expectedSpan.pos},${expectedSpan.end}),  actual: (${actualSpan.textSpan.start},${ts.textSpanEnd(actualSpan.textSpan)})`);
                }
                if (kind !== undefined && actualSpan.kind !== kind) {
                    return this.raiseError(`verifyOutliningSpans failed - span ${(i + 1)} expected kind: ('${kind}'),  actual: ('${actualSpan.kind}')`);
                }
            });
        }

        public verifyTodoComments(descriptors: string[], spans: Range[]) {
            const actual = this.languageService.getTodoComments(this.activeFile.fileName,
                descriptors.map(d => { return { text: d, priority: 0 }; }));

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

        public applyCodeActionFromCompletion(markerName: string, options: FourSlashInterface.VerifyCompletionActionOptions) {
            this.goToMarker(markerName);

            const details = this.getCompletionEntryDetails(options.name, options.source, options.preferences)!;
            const codeActions = details.codeActions!;
            if (codeActions.length !== 1) {
                this.raiseError(`Expected one code action, got ${codeActions.length}`);
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

        public verifyCodeFixAll({ fixId, fixAllDescription, newFileContent, commands: expectedCommands }: FourSlashInterface.VerifyCodeFixAllOptions): void {
            const fixWithId = ts.find(this.getCodeFixes(this.activeFile.fileName), a => a.fixId === fixId);
            ts.Debug.assert(fixWithId !== undefined, "No available code fix has that group id.", () =>
                `Expected '${fixId}'. Available action ids: ${ts.mapDefined(this.getCodeFixes(this.activeFile.fileName), a => a.fixId)}`);
            ts.Debug.assertEqual(fixWithId!.fixAllDescription, fixAllDescription);

            const { changes, commands } = this.languageService.getCombinedCodeFix({ type: "file", fileName: this.activeFile.fileName }, fixId, this.formatCodeSettings, ts.emptyOptions);
            assert.deepEqual<ReadonlyArray<{}> | undefined>(commands, expectedCommands);
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

            assert.equal(action.description, options.description);
            assert.deepEqual(action.commands, options.commands);

            if (options.applyChanges) {
                for (const change of action.changes) {
                    this.applyEdits(change.fileName, change.textChanges, /*isFormattingEdit*/ false);
                }
                this.verifyNewContentAfterChange(options, action.changes.map(c => c.fileName));
            }
            else {
                this.verifyNewContent(options, action.changes);
            }
        }

        private verifyNewContent({ newFileContent, newRangeContent }: FourSlashInterface.NewContentOptions, changes: ReadonlyArray<ts.FileTextChanges>): void {
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
                    ts.Debug.assert(!!change.isNewFile === (oldText === undefined));
                    const newContent = change.isNewFile ? ts.first(change.textChanges).newText : ts.textChanges.applyChanges(oldText!, change.textChanges);
                    assert.equal(newContent, expectedNewContent);
                }
                for (const newFileName in newFileContent) {
                    ts.Debug.assert(changes.some(c => c.fileName === newFileName), "No change in file", () => newFileName);
                }
            }
        }

        private verifyNewContentAfterChange({ newFileContent, newRangeContent }: FourSlashInterface.NewContentOptions, changedFiles: ReadonlyArray<string>) {
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
                this.verifyRangeIs(newRangeContent!, /*includeWhitespace*/ true);
            }
        }

        /**
         * Rerieves a codefix satisfying the parameters, or undefined if no such codefix is found.
         * @param fileName Path to file where error should be retrieved from.
         */
        private getCodeFixes(fileName: string, errorCode?: number, preferences: ts.UserPreferences = ts.emptyOptions): ReadonlyArray<ts.CodeFixAction> {
            const diagnosticsForCodeFix = this.getDiagnostics(fileName, /*includeSuggestions*/ true).map(diagnostic => ({
                start: diagnostic.start,
                length: diagnostic.length,
                code: diagnostic.code
            }));

            return ts.flatMap(ts.deduplicate(diagnosticsForCodeFix, ts.equalOwnProperties), diagnostic => {
                if (errorCode !== undefined && errorCode !== diagnostic.code) {
                    return;
                }

                return this.languageService.getCodeFixesAtPosition(fileName, diagnostic.start!, diagnostic.start! + diagnostic.length!, [diagnostic.code], this.formatCodeSettings, preferences);
            });
        }

        private applyChanges(changes: ReadonlyArray<ts.FileTextChanges>): void {
            for (const change of changes) {
                this.applyEdits(change.fileName, change.textChanges, /*isFormattingEdit*/ false);
            }
        }

        public verifyImportFixAtPosition(expectedTextArray: string[], errorCode: number | undefined, preferences: ts.UserPreferences | undefined) {
            const { fileName } = this.activeFile;
            const ranges = this.getRanges().filter(r => r.fileName === fileName);
            if (ranges.length > 1) {
                this.raiseError("Exactly one range should be specified in the testfile.");
            }
            const range = ts.firstOrUndefined(ranges);

            const codeFixes = this.getCodeFixes(fileName, errorCode, preferences).filter(f => f.fixId === ts.codefix.importFixId);

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
                this.applyEdits(change.fileName, change.textChanges, /*isFormattingEdit*/ false);
                const text = range ? this.rangeText(range) : this.getFileContent(this.activeFile.fileName);
                actualTextArray.push(text);
                scriptInfo.updateContent(originalContent);
            }
            if (expectedTextArray.length !== actualTextArray.length) {
                this.raiseError(`Expected ${expectedTextArray.length} import fixes, got ${actualTextArray.length}`);
            }
            ts.zipWith(expectedTextArray, actualTextArray, (expected, actual, index) => {
                if (expected !== actual) {
                    this.raiseError(`Import fix at index ${index} doesn't match.\n${showTextDiff(expected, actual)}`);
                }
            });
        }

        public verifyDocCommentTemplate(expected: ts.TextInsertion | undefined) {
            const name = "verifyDocCommentTemplate";
            const actual = this.languageService.getDocCommentTemplateAtPosition(this.activeFile.fileName, this.currentCaretPosition)!;

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

            const openBraceMap = ts.createMapFromTemplate<ts.CharacterCodes>({
                "(": ts.CharacterCodes.openParen,
                "{": ts.CharacterCodes.openBrace,
                "[": ts.CharacterCodes.openBracket,
                "'": ts.CharacterCodes.singleQuote,
                '"': ts.CharacterCodes.doubleQuote,
                "`": ts.CharacterCodes.backtick,
                "<": ts.CharacterCodes.lessThan
            });

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

        public verifyJsxClosingTag(map: { [markerName: string]: ts.JsxClosingTagInfo | undefined }): void {
            for (const markerName in map) {
                this.goToMarker(markerName);
                const actual = this.languageService.getJsxClosingTagAtPosition(this.activeFile.fileName, this.currentCaretPosition);
                assert.deepEqual(actual, map[markerName]);
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

        public verifyNavigateTo(options: ReadonlyArray<FourSlashInterface.VerifyNavigateToOptions>): void {
            for (const { pattern, expected, fileName } of options) {
                const items = this.languageService.getNavigateToItems(pattern, /*maxResultCount*/ undefined, fileName);
                this.assertObjectsEqual(items, expected.map((e): ts.NavigateToItem => ({
                    name: e.name,
                    kind: e.kind,
                    kindModifiers: e.kindModifiers || "",
                    matchKind: e.matchKind || "exact",
                    isCaseSensitive: e.isCaseSensitive === undefined ? true : e.isCaseSensitive,
                    fileName: e.range.fileName,
                    textSpan: ts.createTextSpanFromRange(e.range),
                    containerName: e.containerName || "",
                    containerKind: e.containerKind || ts.ScriptElementKind.unknown,
                })));
            }
        }

        public verifyNavigationBar(json: any, options: { checkSpans?: boolean } | undefined) {
            this.verifyNavigationTreeOrBar(json, this.languageService.getNavigationBarItems(this.activeFile.fileName), "Bar", options);
        }

        public verifyNavigationTree(json: any, options: { checkSpans?: boolean } | undefined) {
            this.verifyNavigationTreeOrBar(json, this.languageService.getNavigationTree(this.activeFile.fileName), "Tree", options);
        }

        private verifyNavigationTreeOrBar(json: any, tree: any, name: "Tree" | "Bar", options: { checkSpans?: boolean } | undefined) {
            if (JSON.stringify(tree, replacer) !== JSON.stringify(json)) {
                this.raiseError(`verifyNavigation${name} failed - expected: ${stringify(json)}, got: ${stringify(tree, replacer)}`);
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

        private getOccurrencesAtCurrentPosition() {
            return this.languageService.getOccurrencesAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        }

        public verifyOccurrencesAtPositionListContains(fileName: string, start: number, end: number, isWriteAccess?: boolean) {
            const occurrences = this.getOccurrencesAtCurrentPosition();

            if (!occurrences || occurrences.length === 0) {
                return this.raiseError("verifyOccurrencesAtPositionListContains failed - found 0 references, expected at least one.");
            }

            for (const occurrence of occurrences) {
                if (occurrence && occurrence.fileName === fileName && occurrence.textSpan.start === start && ts.textSpanEnd(occurrence.textSpan) === end) {
                    if (typeof isWriteAccess !== "undefined" && occurrence.isWriteAccess !== isWriteAccess) {
                        this.raiseError(`verifyOccurrencesAtPositionListContains failed - item isWriteAccess value does not match, actual: ${occurrence.isWriteAccess}, expected: ${isWriteAccess}.`);
                    }
                    return;
                }
            }

            const missingItem = { fileName, start, end, isWriteAccess };
            this.raiseError(`verifyOccurrencesAtPositionListContains failed - could not find the item: ${stringify(missingItem)} in the returned list: (${stringify(occurrences)})`);
        }

        public verifyOccurrencesAtPositionListCount(expectedCount: number) {
            const occurrences = this.getOccurrencesAtCurrentPosition();
            const actualCount = occurrences ? occurrences.length : 0;
            if (expectedCount !== actualCount) {
                this.raiseError(`verifyOccurrencesAtPositionListCount failed - actual: ${actualCount}, expected:${expectedCount}`);
            }
        }

        private getDocumentHighlightsAtCurrentPosition(fileNamesToSearch: ReadonlyArray<string>) {
            const filesToSearch = fileNamesToSearch.map(name => ts.combinePaths(this.basePath, name));
            return this.languageService.getDocumentHighlights(this.activeFile.fileName, this.currentCaretPosition, filesToSearch);
        }

        public verifyRangesAreOccurrences(isWriteAccess?: boolean) {
            const ranges = this.getRanges();
            for (const r of ranges) {
                this.goToRangeStart(r);
                this.verifyOccurrencesAtPositionListCount(ranges.length);
                for (const range of ranges) {
                    this.verifyOccurrencesAtPositionListContains(range.fileName, range.pos, range.end, isWriteAccess);
                }
            }
        }

        public verifyRangesWithSameTextAreRenameLocations() {
            this.rangesByText().forEach(ranges => this.verifyRangesAreRenameLocations(ranges));
        }

        public verifyRangesWithSameTextAreDocumentHighlights() {
            this.rangesByText().forEach(ranges => this.verifyRangesAreDocumentHighlights(ranges, /*options*/ undefined));
        }

        public verifyDocumentHighlightsOf(startRange: Range, ranges: Range[], options: FourSlashInterface.VerifyDocumentHighlightsOptions | undefined) {
            const fileNames = options && options.filesToSearch || unique(ranges, range => range.fileName);
            this.goToRangeStart(startRange);
            this.verifyDocumentHighlights(ranges, fileNames);
        }

        public verifyRangesAreDocumentHighlights(ranges: Range[] | undefined, options: FourSlashInterface.VerifyDocumentHighlightsOptions | undefined) {
            ranges = ranges || this.getRanges();
            const fileNames = options && options.filesToSearch || unique(ranges, range => range.fileName);
            for (const range of ranges) {
                this.goToRangeStart(range);
                this.verifyDocumentHighlights(ranges, fileNames);
            }
        }

        public verifyNoDocumentHighlights(startRange: Range) {
            this.goToRangeStart(startRange);
            const documentHighlights = this.getDocumentHighlightsAtCurrentPosition([this.activeFile.fileName]);
            const numHighlights = ts.length(documentHighlights);
            if (numHighlights > 0) {
                this.raiseError(`verifyNoDocumentHighlights failed - unexpectedly got ${numHighlights} highlights`);
            }
        }

        private verifyDocumentHighlights(expectedRanges: Range[], fileNames: ReadonlyArray<string> = [this.activeFile.fileName]) {
            fileNames = ts.map(fileNames, ts.normalizePath);
            const documentHighlights = this.getDocumentHighlightsAtCurrentPosition(fileNames) || [];

            for (const dh of documentHighlights) {
                if (fileNames.indexOf(dh.fileName) === -1) {
                    this.raiseError(`verifyDocumentHighlights failed - got highlights in unexpected file name ${dh.fileName}`);
                }
            }

            for (const fileName of fileNames) {
                const expectedRangesInFile = expectedRanges.filter(r => ts.normalizePath(r.fileName) === fileName);
                const highlights = ts.find(documentHighlights, dh => dh.fileName === fileName);
                const spansInFile = highlights ? highlights.highlightSpans.sort((s1, s2) => s1.textSpan.start - s2.textSpan.start) : [];

                if (expectedRangesInFile.length !== spansInFile.length) {
                    this.raiseError(`verifyDocumentHighlights failed - In ${fileName}, expected ${expectedRangesInFile.length} highlights, got ${spansInFile.length}`);
                }

                ts.zipWith(expectedRangesInFile, spansInFile, (expectedRange, span) => {
                    if (span.textSpan.start !== expectedRange.pos || ts.textSpanEnd(span.textSpan) !== expectedRange.end) {
                        this.raiseError(`verifyDocumentHighlights failed - span does not match, actual: ${stringify(span.textSpan)}, expected: ${expectedRange.pos}--${expectedRange.end}`);
                    }
                });
            }
        }

        public verifyCodeFixAvailable(negative: boolean, expected: FourSlashInterface.VerifyCodeFixAvailableOptions[] | undefined): void {
            assert(!negative || !expected);
            const codeFixes = this.getCodeFixes(this.activeFile.fileName);
            const actuals = codeFixes.map((fix): FourSlashInterface.VerifyCodeFixAvailableOptions => ({ description: fix.description, commands: fix.commands }));
            this.assertObjectsEqual(actuals, negative ? ts.emptyArray : expected);
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
                end: this.selectionEnd === -1 ? this.currentCaretPosition : this.selectionEnd
            };
        }

        public verifyRefactorAvailable(negative: boolean, name: string, actionName?: string) {
            let refactors = this.getApplicableRefactorsAtSelection();
            refactors = refactors.filter(r => r.name === name && (actionName === undefined || r.actions.some(a => a.name === actionName)));
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

        public verifyRefactorsAvailable(names: ReadonlyArray<string>): void {
            assert.deepEqual(unique(this.getApplicableRefactorsAtSelection(), r => r.name), names);
        }

        public verifyRefactor({ name, actionName, refactors }: FourSlashInterface.VerifyRefactorOptions) {
            const actualRefactors = this.getApplicableRefactorsAtSelection().filter(r => r.name === name && r.actions.some(a => a.name === actionName));
            this.assertObjectsEqual(actualRefactors, refactors);
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

        public applyRefactor({ refactorName, actionName, actionDescription, newContent: newContentWithRenameMarker }: FourSlashInterface.ApplyRefactorOptions) {
            const range = this.getSelection();
            const refactors = this.getApplicableRefactorsAtSelection();
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
                this.applyEdits(edit.fileName, edit.textChanges, /*isFormattingEdit*/ false);
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

        private static parseNewContent(newContentWithRenameMarker: string): { readonly renamePosition: number | undefined, readonly newContent: string } {
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
            for (const range of this.getRanges()) {
                for (const refactor of this.getApplicableRefactors(range, { allowTextChangesInNewFiles: true })) {
                    if (refactor.name === "Move to a new file") {
                        ts.Debug.fail("Did not expect to get 'move to a new file' refactor");
                    }
                }
            }
        }

        public moveToNewFile(options: FourSlashInterface.MoveToNewFileOptions): void {
            assert(this.getRanges().length === 1);
            const range = this.getRanges()[0];
            const refactor = ts.find(this.getApplicableRefactors(range, { allowTextChangesInNewFiles: true }), r => r.name === "Move to a new file")!;
            assert(refactor.actions.length === 1);
            const action = ts.first(refactor.actions);
            assert(action.name === "Move to a new file" && action.description === "Move to a new file");

            const editInfo = this.languageService.getEditsForRefactor(range.fileName, this.formatCodeSettings, range, refactor.name, action.name, options.preferences || ts.emptyOptions)!;
            this.verifyNewContent({ newFileContent: options.newFileContents }, editInfo.edits);
        }

        private testNewFileContents(edits: ReadonlyArray<ts.FileTextChanges>, newFileContents: { [fileName: string]: string }, description: string): void {
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
            formattingOptions?: ts.FormatCodeSettings) {

            formattingOptions = formattingOptions || this.formatCodeSettings;
            const marker = this.getMarkerByName(markerName);

            const applicableRefactors = this.languageService.getApplicableRefactors(this.activeFile.fileName, marker.position, ts.emptyOptions);
            const applicableRefactorToApply = ts.find(applicableRefactors, refactor => refactor.name === refactorNameToApply);

            if (!applicableRefactorToApply) {
                this.raiseError(`The expected refactor: ${refactorNameToApply} is not available at the marker location.`);
            }

            const editInfo = this.languageService.getEditsForRefactor(marker.fileName, formattingOptions, marker.position, refactorNameToApply, actionName, ts.emptyOptions)!;

            for (const edit of editInfo.edits) {
                this.applyEdits(edit.fileName, edit.textChanges, /*isFormattingEdit*/ false);
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

        // Get the text of the entire line the caret is currently at
        private getCurrentLineContent() {
            const text = this.getFileContent(this.activeFile.fileName);

            const pos = this.currentCaretPosition;
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

        private tryFindFileWorker(name: string): { readonly file: FourSlashFile | undefined; readonly availableNames: ReadonlyArray<string>; } {
            name = ts.normalizePath(name);
            // names are stored in the compiler with this relative path, this allows people to use goTo.file on just the fileName
            name = name.indexOf("/") === -1 ? (this.basePath + "/" + name) : name;

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

        private getLineColStringAtPosition(position: number) {
            const pos = this.languageServiceAdapterHost.positionToLineAndCharacter(this.activeFile.fileName, position);
            return `line ${(pos.line + 1)}, col ${pos.character}`;
        }

        public getMarkerByName(markerName: string) {
            const markerPos = this.testData.markerPositions.get(markerName);
            if (markerPos === undefined) {
                throw new Error(`Unknown marker "${markerName}" Available markers: ${this.getMarkerNames().map(m => "\"" + m + "\"").join(", ")}`);
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
            const test = (fileContents: { readonly [fileName: string]: string }, description: string): void => {
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

        private getApplicableRefactorsAtSelection() {
            return this.getApplicableRefactorsWorker(this.getSelection(), this.activeFile.fileName);
        }
        private getApplicableRefactors(rangeOrMarker: Range | Marker, preferences = ts.emptyOptions): ReadonlyArray<ts.ApplicableRefactorInfo> {
            return this.getApplicableRefactorsWorker("position" in rangeOrMarker ? rangeOrMarker.position : rangeOrMarker, rangeOrMarker.fileName, preferences);
        }
        private getApplicableRefactorsWorker(positionOrRange: number | ts.TextRange, fileName: string, preferences = ts.emptyOptions): ReadonlyArray<ts.ApplicableRefactorInfo> {
            return this.languageService.getApplicableRefactors(fileName, positionOrRange, preferences) || ts.emptyArray;
        }

        public generateTypes(examples: ReadonlyArray<FourSlashInterface.GenerateTypesOptions>): void {
            for (const { name = "example", value, global, output, outputBaseline } of examples) {
                const actual = (global ? ts.generateTypesForGlobal : ts.generateTypesForModule)(name, value, this.formatCodeSettings);
                if (outputBaseline) {
                    if (actual === undefined) throw ts.Debug.fail();
                    Harness.Baseline.runBaseline(ts.combinePaths("generateTypes", outputBaseline + ts.Extension.Dts), actual);
                }
                else {
                    assert.equal(actual, output, `generateTypes output for ${name} does not match`);
                }
            }
        }

        public configurePlugin(pluginName: string, configuration: any): void {
            (<ts.server.SessionClient>this.languageService).configurePlugin(pluginName, configuration);
        }
    }

    function updateTextRangeForTextChanges({ pos, end }: ts.TextRange, textChanges: ReadonlyArray<ts.TextChange>): ts.TextRange {
        forEachTextChange(textChanges, change => {
            const update = (p: number): number => updatePosition(p, change.span.start, ts.textSpanEnd(change.span), change.newText);
            pos = update(pos);
            end = update(end);
        });
        return { pos, end };
    }

    /** Apply each textChange in order, updating future changes to account for the text offset of previous changes. */
    function forEachTextChange(changes: ReadonlyArray<ts.TextChange>, cb: (change: ts.TextChange) => void): void {
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
        return position <= editStart ? position : position < editEnd ? -1 : position + length - + (editEnd - editStart);
    }

    function renameKeys<T>(obj: { readonly [key: string]: T }, renameKey: (key: string) => string): { readonly [key: string]: T } {
        const res: { [key: string]: T } = {};
        for (const key in obj) {
            res[renameKey(key)] = obj[key];
        }
        return res;
    }

    export function runFourSlashTest(basePath: string, testType: FourSlashTestType, fileName: string) {
        const content = Harness.IO.readFile(fileName)!;
        runFourSlashTestContent(basePath, testType, content, fileName);
    }

    export function runFourSlashTestContent(basePath: string, testType: FourSlashTestType, content: string, fileName: string): void {
        // Give file paths an absolute path for the virtual file system
        const absoluteBasePath = ts.combinePaths(Harness.virtualFileSystemRoot, basePath);
        const absoluteFileName = ts.combinePaths(Harness.virtualFileSystemRoot, fileName);

        // Parse out the files and their metadata
        const testData = parseTestData(absoluteBasePath, content, absoluteFileName);
        const state = new TestState(absoluteBasePath, testType, testData);
        const output = ts.transpileModule(content, { reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2015 } });
        if (output.diagnostics!.length > 0) {
            throw new Error(`Syntax error in ${absoluteBasePath}: ${output.diagnostics![0].messageText}`);
        }
        runCode(output.outputText, state);
    }

    function runCode(code: string, state: TestState): void {
        // Compile and execute the test
        const wrappedCode =
            `(function(test, goTo, plugins, verify, edit, debug, format, cancellation, classification, completion, verifyOperationIsCancelled) {
${code}
})`;
        try {
            const test = new FourSlashInterface.Test(state);
            const goTo = new FourSlashInterface.GoTo(state);
            const plugins = new FourSlashInterface.Plugins(state);
            const verify = new FourSlashInterface.Verify(state);
            const edit = new FourSlashInterface.Edit(state);
            const debug = new FourSlashInterface.Debug(state);
            const format = new FourSlashInterface.Format(state);
            const cancellation = new FourSlashInterface.Cancellation(state);
            const f = eval(wrappedCode);
            f(test, goTo, plugins, verify, edit, debug, format, cancellation, FourSlashInterface.Classification, FourSlashInterface.Completion, verifyOperationIsCancelled);
        }
        catch (err) {
            throw err;
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
        const optionRegex = /^\s*@(\w+): (.*)\s*/;

        // List of all the subfiles we've parsed out
        const files: FourSlashFile[] = [];
        // Global options
        const globalOptions: { [s: string]: string; } = {};
        // Marker positions

        // Split up the input file by line
        // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
        // we have to string-based splitting instead and try to figure out the delimiting chars
        const lines = contents.split("\n");

        const markerPositions = ts.createMap<Marker>();
        const markers: Marker[] = [];
        const ranges: Range[] = [];

        // Stuff related to the subfile we're parsing
        let currentFileContent: string | undefined;
        let currentFileName = fileName;
        let currentFileSymlinks: string[] | undefined;
        let currentFileOptions: { [s: string]: string } = {};

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
            if (line.length > 0 && line.charAt(line.length - 1) === "\r") {
                line = line.substr(0, line.length - 1);
            }

            if (line.substr(0, 4) === "////") {
                const text = line.substr(4);
                currentFileContent = currentFileContent === undefined ? text : currentFileContent + "\n" + text;
            }
            else if (line.substr(0, 2) === "//") {
                // Comment line, check for global/file @options and record them
                const match = optionRegex.exec(line.substr(2));
                if (match) {
                    const [key, value] = match.slice(1);
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
            ranges
        };
    }

    function isConfig(file: FourSlashFile): boolean {
        return Harness.getConfigNameFromFileName(file.fileName) !== undefined;
    }

    function getNonFileNameOptionInFileList(files: FourSlashFile[]): string | undefined {
        return ts.forEach(files, f => getNonFileNameOptionInObject(f.fileOptions));
    }

    function getNonFileNameOptionInObject(optionObject: { [s: string]: string }): string | undefined {
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
        inObjectMarker
    }

    function reportError(fileName: string, line: number, col: number, message: string) {
        const errorMessage = fileName + "(" + line + "," + col + "): " + message;
        throw new Error(errorMessage);
    }

    function recordObjectMarker(fileName: string, location: LocationInformation, text: string, markerMap: ts.Map<Marker>, markers: Marker[]): Marker | undefined {
        let markerValue: any;
        try {
            // Attempt to parse the marker value as JSON
            markerValue = JSON.parse("{ " + text + " }");
        }
        catch (e) {
            reportError(fileName, location.sourceLine, location.sourceColumn, "Unable to parse marker text " + e.message);
        }

        if (markerValue === undefined) {
            reportError(fileName, location.sourceLine, location.sourceColumn, "Object markers can not be empty");
            return undefined;
        }

        const marker: Marker = {
            fileName,
            position: location.position,
            data: markerValue
        };

        // Object markers can be anonymous
        if (markerValue.name) {
            markerMap.set(markerValue.name, marker);
        }

        markers.push(marker);

        return marker;
    }

    function recordMarker(fileName: string, location: LocationInformation, name: string, markerMap: ts.Map<Marker>, markers: Marker[]): Marker | undefined {
        const marker: Marker = {
            fileName,
            position: location.position
        };

        // Verify markers for uniqueness
        if (markerMap.has(name)) {
            const message = "Marker '" + name + "' is duplicated in the source file contents.";
            reportError(marker.fileName, location.sourceLine, location.sourceColumn, message);
            return undefined;
        }
        else {
            markerMap.set(name, marker);
            markers.push(marker);
            return marker;
        }
    }

    function parseFileContent(content: string, fileName: string, markerMap: ts.Map<Marker>, markers: Marker[], ranges: Range[]): FourSlashFile {
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
                                throw reportError(fileName, line, column, "Found range end with no matching start.");
                            }

                            const range: Range = {
                                fileName,
                                pos: rangeStart.position,
                                end: (i - 1) - difference,
                                marker: rangeStart.marker
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
                        else if (validMarkerChars.indexOf(currentChar) < 0) {
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
        localRanges.forEach((r) => { ranges.push(r); });

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
    function unique<T>(inputs: ReadonlyArray<T>, getOutput: (t: T) => string): string[] {
        const set = ts.createMap<true>();
        for (const input of inputs) {
            const out = getOutput(input);
            set.set(out, true);
        }
        return ts.arrayFrom(set.keys());
    }

    function toArray<T>(x: ArrayOrSingle<T>): ReadonlyArray<T> {
        return ts.isArray(x) ? x : [x];
    }

    function makeWhitespaceVisible(text: string) {
        return text.replace(/ /g, "\u00B7").replace(/\r/g, "\u00B6").replace(/\n/g, "\u2193\n").replace(/\t/g, "\u2192\   ");
    }

    function showTextDiff(expected: string, actual: string): string {
        // Only show whitespace if the difference is whitespace-only.
        if (differOnlyByWhitespace(expected, actual)) {
            expected = makeWhitespaceVisible(expected);
            actual = makeWhitespaceVisible(actual);
        }
        return `Expected:\n${expected}\nActual:\n${actual}`;
    }

    function differOnlyByWhitespace(a: string, b: string) {
        return stripWhitespace(a) === stripWhitespace(b);
    }

    function stripWhitespace(s: string): string {
        return s.replace(/\s/g, "");
    }

    function findDuplicatedElement<T>(a: ReadonlyArray<T>, equal: (a: T, b: T) => boolean): T | undefined {
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (equal(a[i], a[j])) {
                    return a[i];
                }
            }
        }
    }
}

namespace FourSlashInterface {
    export class Test {
        constructor(private state: FourSlash.TestState) {
        }

        public markers(): FourSlash.Marker[] {
            return this.state.getMarkers();
        }

        public markerNames(): string[] {
            return this.state.getMarkerNames();
        }

        public marker(name: string): FourSlash.Marker {
            return this.state.getMarkerByName(name);
        }

        public markerName(m: FourSlash.Marker) {
            return this.state.markerName(m);
        }

        public ranges(): FourSlash.Range[] {
            return this.state.getRanges();
        }

        public spans(): ts.TextSpan[] {
            return this.ranges().map(r => ts.createTextSpan(r.pos, r.end - r.pos));
        }

        public rangesByText(): ts.Map<FourSlash.Range[]> {
            return this.state.rangesByText();
        }

        public markerByName(s: string): FourSlash.Marker {
            return this.state.getMarkerByName(s);
        }

        public symbolsInScope(range: FourSlash.Range): ts.Symbol[] {
            return this.state.symbolsInScope(range);
        }

        public setTypesRegistry(map: ts.MapLike<void>): void {
            this.state.setTypesRegistry(map);
        }
    }

    export class Plugins {
        constructor (private state: FourSlash.TestState) {
        }

        public configurePlugin(pluginName: string, configuration: any): void {
            this.state.configurePlugin(pluginName, configuration);
        }
    }

    export class GoTo {
        constructor(private state: FourSlash.TestState) {
        }
        // Moves the caret to the specified marker,
        // or the anonymous marker ('/**/') if no name
        // is given
        public marker(name?: string | FourSlash.Marker) {
            this.state.goToMarker(name);
        }

        public eachMarker(markers: ReadonlyArray<string>, action: (marker: FourSlash.Marker, index: number) => void): void;
        public eachMarker(action: (marker: FourSlash.Marker, index: number) => void): void;
        public eachMarker(a: ReadonlyArray<string> | ((marker: FourSlash.Marker, index: number) => void), b?: (marker: FourSlash.Marker, index: number) => void): void {
            const markers = typeof a === "function" ? this.state.getMarkers() : a.map(m => this.state.getMarkerByName(m));
            this.state.goToEachMarker(markers, typeof a === "function" ? a : b!);
        }


        public rangeStart(range: FourSlash.Range) {
            this.state.goToRangeStart(range);
        }

        public eachRange(action: (range: FourSlash.Range) => void) {
            this.state.goToEachRange(action);
        }

        public bof() {
            this.state.goToBOF();
        }

        public eof() {
            this.state.goToEOF();
        }

        public implementation() {
            this.state.goToImplementation();
        }

        public position(position: number, fileNameOrIndex?: string | number): void {
            if (fileNameOrIndex !== undefined) {
                this.file(fileNameOrIndex);
            }
            this.state.goToPosition(position);
        }

        // Opens a file, given either its index as it
        // appears in the test source, or its filename
        // as specified in the test metadata
        public file(indexOrName: number | string, content?: string, scriptKindName?: string): void {
            this.state.openFile(indexOrName, content, scriptKindName);
        }

        public select(startMarker: string, endMarker: string) {
            this.state.select(startMarker, endMarker);
        }

        public selectAllInFile(fileName: string) {
            this.state.selectAllInFile(fileName);
        }

        public selectRange(range: FourSlash.Range): void {
            this.state.selectRange(range);
        }
    }

    export class VerifyNegatable {
        public not: VerifyNegatable;

        constructor(protected state: FourSlash.TestState, private negative = false) {
            if (!negative) {
                this.not = new VerifyNegatable(state, true);
            }
        }

        public assertHasRanges(ranges: FourSlash.Range[]) {
            assert(ranges.length !== 0, "Array of ranges is expected to be non-empty");
        }

        public noSignatureHelp(...markers: string[]): void {
            this.state.verifySignatureHelpPresence(/*expectPresent*/ false, /*triggerReason*/ undefined, markers);
        }

        public noSignatureHelpForTriggerReason(reason: ts.SignatureHelpTriggerReason, ...markers: string[]): void {
            this.state.verifySignatureHelpPresence(/*expectPresent*/ false, reason, markers);
        }

        public signatureHelpPresentForTriggerReason(reason: ts.SignatureHelpTriggerReason, ...markers: string[]): void {
            this.state.verifySignatureHelpPresence(/*expectPresent*/ true, reason, markers);
        }

        public signatureHelp(...options: VerifySignatureHelpOptions[]): void {
            this.state.verifySignatureHelp(options);
        }

        public errorExistsBetweenMarkers(startMarker: string, endMarker: string) {
            this.state.verifyErrorExistsBetweenMarkers(startMarker, endMarker, !this.negative);
        }

        public errorExistsAfterMarker(markerName = "") {
            this.state.verifyErrorExistsAfterMarker(markerName, !this.negative, /*after*/ true);
        }

        public errorExistsBeforeMarker(markerName = "") {
            this.state.verifyErrorExistsAfterMarker(markerName, !this.negative, /*after*/ false);
        }

        public quickInfoExists() {
            this.state.verifyQuickInfoExists(this.negative);
        }

        public typeDefinitionCountIs(expectedCount: number) {
            this.state.verifyTypeDefinitionsCount(this.negative, expectedCount);
        }

        public implementationListIsEmpty() {
            this.state.verifyImplementationListIsEmpty(this.negative);
        }

        public isValidBraceCompletionAtPosition(openingBrace: string) {
            this.state.verifyBraceCompletionAtPosition(this.negative, openingBrace);
        }

        public jsxClosingTag(map: { [markerName: string]: ts.JsxClosingTagInfo | undefined }): void {
            this.state.verifyJsxClosingTag(map);
        }

        public isInCommentAtPosition(onlyMultiLineDiverges?: boolean) {
            this.state.verifySpanOfEnclosingComment(this.negative, onlyMultiLineDiverges);
        }

        public codeFix(options: VerifyCodeFixOptions) {
            this.state.verifyCodeFix(options);
        }

        public codeFixAvailable(options?: VerifyCodeFixAvailableOptions[]) {
            this.state.verifyCodeFixAvailable(this.negative, options);
        }

        public applicableRefactorAvailableAtMarker(markerName: string) {
            this.state.verifyApplicableRefactorAvailableAtMarker(this.negative, markerName);
        }

        public applicableRefactorAvailableForRange() {
            this.state.verifyApplicableRefactorAvailableForRange(this.negative);
        }

        public refactorsAvailable(names: ReadonlyArray<string>): void {
            this.state.verifyRefactorsAvailable(names);
        }

        public refactor(options: VerifyRefactorOptions) {
            this.state.verifyRefactor(options);
        }

        public refactorAvailable(name: string, actionName?: string) {
            this.state.verifyRefactorAvailable(this.negative, name, actionName);
        }
    }

    export class Verify extends VerifyNegatable {
        constructor(state: FourSlash.TestState) {
            super(state);
        }

        public completions(...optionsArray: VerifyCompletionsOptions[]) {
            for (const options of optionsArray) {
                this.state.verifyCompletions(options);
            }
        }

        public quickInfoIs(expectedText: string, expectedDocumentation?: string) {
            this.state.verifyQuickInfoString(expectedText, expectedDocumentation);
        }

        public quickInfoAt(markerName: string | FourSlash.Range, expectedText: string, expectedDocumentation?: string) {
            this.state.verifyQuickInfoAt(markerName, expectedText, expectedDocumentation);
        }

        public quickInfos(namesAndTexts: { [name: string]: string }) {
            this.state.verifyQuickInfos(namesAndTexts);
        }

        public caretAtMarker(markerName?: string) {
            this.state.verifyCaretAtMarker(markerName);
        }

        public indentationIs(numberOfSpaces: number) {
            this.state.verifyIndentationAtCurrentPosition(numberOfSpaces);
        }

        public indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle = ts.IndentStyle.Smart, baseIndentSize = 0) {
            this.state.verifyIndentationAtPosition(fileName, position, numberOfSpaces, indentStyle, baseIndentSize);
        }

        public textAtCaretIs(text: string) {
            this.state.verifyTextAtCaretIs(text);
        }

        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        public eval(expr: string, value: any) {
            this.state.verifyEval(expr, value);
        }

        public currentLineContentIs(text: string) {
            this.state.verifyCurrentLineContent(text);
        }

        public currentFileContentIs(text: string) {
            this.state.verifyCurrentFileContent(text);
        }

        public formatDocumentChangesNothing(): void {
            this.state.verifyFormatDocumentChangesNothing();
        }

        public goToDefinitionIs(endMarkers: ArrayOrSingle<string>) {
            this.state.verifyGoToDefinitionIs(endMarkers);
        }

        public goToDefinition(startMarkerName: ArrayOrSingle<string>, endMarkerName: ArrayOrSingle<string>, range?: FourSlash.Range): void;
        public goToDefinition(startsAndEnds: [ArrayOrSingle<string>, ArrayOrSingle<string>][] | { [startMarkerName: string]: ArrayOrSingle<string> }): void;
        public goToDefinition(arg0: any, endMarkerName?: ArrayOrSingle<string>) {
            this.state.verifyGoToDefinition(arg0, endMarkerName);
        }

        public goToType(startMarkerName: ArrayOrSingle<string>, endMarkerName: ArrayOrSingle<string>): void;
        public goToType(startsAndEnds: [ArrayOrSingle<string>, ArrayOrSingle<string>][] | { [startMarkerName: string]: ArrayOrSingle<string> }): void;
        public goToType(arg0: any, endMarkerName?: ArrayOrSingle<string>) {
            this.state.verifyGoToType(arg0, endMarkerName);
        }

        public goToDefinitionForMarkers(...markerNames: string[]) {
            this.state.verifyGoToDefinitionForMarkers(markerNames);
        }

        public goToDefinitionName(name: string, containerName: string) {
            this.state.verifyGoToDefinitionName(name, containerName);
        }

        public verifyGetEmitOutputForCurrentFile(expected: string): void {
            this.state.verifyGetEmitOutputForCurrentFile(expected);
        }

        public verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void {
            this.state.verifyGetEmitOutputContentsForCurrentFile(expected);
        }

        public symbolAtLocation(startRange: FourSlash.Range, ...declarationRanges: FourSlash.Range[]) {
            this.state.verifySymbolAtLocation(startRange, declarationRanges);
        }

        public typeOfSymbolAtLocation(range: FourSlash.Range, symbol: ts.Symbol, expected: string) {
            this.state.verifyTypeOfSymbolAtLocation(range, symbol, expected);
        }

        public referenceGroups(starts: ArrayOrSingle<string> | ArrayOrSingle<FourSlash.Range>, parts: ReferenceGroup[]) {
            this.state.verifyReferenceGroups(starts, parts);
        }

        public noReferences(markerNameOrRange?: string | FourSlash.Range) {
            this.state.verifyNoReferences(markerNameOrRange);
        }

        public getReferencesForServerTest(expected: ReadonlyArray<ts.ReferenceEntry>) {
            this.state.verifyGetReferencesForServerTest(expected);
        }

        public singleReferenceGroup(definition: ReferenceGroupDefinition, ranges?: FourSlash.Range[]) {
            this.state.verifySingleReferenceGroup(definition, ranges);
        }

        public findReferencesDefinitionDisplayPartsAtCaretAre(expected: ts.SymbolDisplayPart[]) {
            this.state.verifyDisplayPartsOfReferencedSymbol(expected);
        }

        public noErrors() {
            this.state.verifyNoErrors();
        }

        public numberOfErrorsInCurrentFile(expected: number) {
            this.state.verifyNumberOfErrorsInCurrentFile(expected);
        }

        public baselineCurrentFileBreakpointLocations() {
            this.state.baselineCurrentFileBreakpointLocations();
        }

        public baselineCurrentFileNameOrDottedNameSpans() {
            this.state.baselineCurrentFileNameOrDottedNameSpans();
        }

        public getEmitOutput(expectedOutputFiles: ReadonlyArray<string>): void {
            this.state.verifyGetEmitOutput(expectedOutputFiles);
        }

        public baselineGetEmitOutput() {
            this.state.baselineGetEmitOutput();
        }

        public baselineQuickInfo() {
            this.state.baselineQuickInfo();
        }

        public nameOrDottedNameSpanTextIs(text: string) {
            this.state.verifyCurrentNameOrDottedNameSpanText(text);
        }

        public outliningSpansInCurrentFile(spans: FourSlash.Range[], kind?: "comment" | "region" | "code" | "imports") {
            this.state.verifyOutliningSpans(spans, kind);
        }

        public todoCommentsInCurrentFile(descriptors: string[]) {
            this.state.verifyTodoComments(descriptors, this.state.getRanges());
        }

        public matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number) {
            this.state.verifyMatchingBracePosition(bracePosition, expectedMatchPosition);
        }

        public noMatchingBracePositionInCurrentFile(bracePosition: number) {
            this.state.verifyNoMatchingBracePosition(bracePosition);
        }

        public docCommentTemplateAt(marker: string | FourSlash.Marker, expectedOffset: number, expectedText: string) {
            this.state.goToMarker(marker);
            this.state.verifyDocCommentTemplate({ newText: expectedText.replace(/\r?\n/g, "\r\n"), caretOffset: expectedOffset });
        }

        public noDocCommentTemplateAt(marker: string | FourSlash.Marker) {
            this.state.goToMarker(marker);
            this.state.verifyDocCommentTemplate(/*expected*/ undefined);
        }

        public rangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void {
            this.state.verifyRangeAfterCodeFix(expectedText, includeWhiteSpace, errorCode, index);
        }

        public codeFixAll(options: VerifyCodeFixAllOptions): void {
            this.state.verifyCodeFixAll(options);
        }

        public fileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, actionName: string, formattingOptions?: ts.FormatCodeSettings): void {
            this.state.verifyFileAfterApplyingRefactorAtMarker(markerName, expectedContent, refactorNameToApply, actionName, formattingOptions);
        }

        public rangeIs(expectedText: string, includeWhiteSpace?: boolean): void {
            this.state.verifyRangeIs(expectedText, includeWhiteSpace);
        }

        public getAndApplyCodeFix(errorCode?: number, index?: number): void {
            this.state.getAndApplyCodeActions(errorCode, index);
        }

        public applyCodeActionFromCompletion(markerName: string, options: VerifyCompletionActionOptions): void {
            this.state.applyCodeActionFromCompletion(markerName, options);
        }

        public importFixAtPosition(expectedTextArray: string[], errorCode?: number, preferences?: ts.UserPreferences): void {
            this.state.verifyImportFixAtPosition(expectedTextArray, errorCode, preferences);
        }

        public navigationBar(json: any, options?: { checkSpans?: boolean }) {
            this.state.verifyNavigationBar(json, options);
        }

        public navigationTree(json: any, options?: { checkSpans?: boolean }) {
            this.state.verifyNavigationTree(json, options);
        }

        public navigateTo(...options: VerifyNavigateToOptions[]): void {
            this.state.verifyNavigateTo(options);
        }

        public occurrencesAtPositionContains(range: FourSlash.Range, isWriteAccess?: boolean) {
            this.state.verifyOccurrencesAtPositionListContains(range.fileName, range.pos, range.end, isWriteAccess);
        }

        public occurrencesAtPositionCount(expectedCount: number) {
            this.state.verifyOccurrencesAtPositionListCount(expectedCount);
        }

        public rangesAreOccurrences(isWriteAccess?: boolean) {
            this.state.verifyRangesAreOccurrences(isWriteAccess);
        }

        public rangesWithSameTextAreRenameLocations() {
            this.state.verifyRangesWithSameTextAreRenameLocations();
        }

        public rangesAreRenameLocations(options?: FourSlash.Range[] | { findInStrings?: boolean, findInComments?: boolean, ranges?: FourSlash.Range[] }) {
            this.state.verifyRangesAreRenameLocations(options);
        }

        public rangesAreDocumentHighlights(ranges?: FourSlash.Range[], options?: VerifyDocumentHighlightsOptions) {
            this.state.verifyRangesAreDocumentHighlights(ranges, options);
        }

        public rangesWithSameTextAreDocumentHighlights() {
            this.state.verifyRangesWithSameTextAreDocumentHighlights();
        }

        public documentHighlightsOf(startRange: FourSlash.Range, ranges: FourSlash.Range[], options?: VerifyDocumentHighlightsOptions) {
            this.state.verifyDocumentHighlightsOf(startRange, ranges, options);
        }

        public noDocumentHighlights(startRange: FourSlash.Range) {
            this.state.verifyNoDocumentHighlights(startRange);
        }

        /**
         * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
         */
        public syntacticClassificationsAre(...classifications: { classificationType: string; text: string }[]) {
            this.state.verifySyntacticClassifications(classifications);
        }

        /**
         * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
         */
        public semanticClassificationsAre(...classifications: Classification[]) {
            this.state.verifySemanticClassifications(classifications);
        }

        public renameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string, fileToRename?: string, expectedRange?: FourSlash.Range) {
            this.state.verifyRenameInfoSucceeded(displayName, fullDisplayName, kind, kindModifiers, fileToRename, expectedRange);
        }

        public renameInfoFailed(message?: string) {
            this.state.verifyRenameInfoFailed(message);
        }

        public renameLocations(startRanges: ArrayOrSingle<FourSlash.Range>, options: RenameLocationsOptions) {
            this.state.verifyRenameLocations(startRanges, options);
        }

        public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: FourSlash.TextSpan,
            displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]) {
            this.state.verifyQuickInfoDisplayParts(kind, kindModifiers, textSpan, displayParts, documentation, tags);
        }

        public getSyntacticDiagnostics(expected: ReadonlyArray<Diagnostic>) {
            this.state.getSyntacticDiagnostics(expected);
        }

        public getSemanticDiagnostics(expected: ReadonlyArray<Diagnostic>) {
            this.state.getSemanticDiagnostics(expected);
        }

        public getSuggestionDiagnostics(expected: ReadonlyArray<Diagnostic>) {
            this.state.getSuggestionDiagnostics(expected);
        }

        public ProjectInfo(expected: string[]) {
            this.state.verifyProjectInfo(expected);
        }

        public allRangesAppearInImplementationList(markerName: string) {
            this.state.verifyRangesInImplementationList(markerName);
        }

        public getEditsForFileRename(options: GetEditsForFileRenameOptions) {
            this.state.getEditsForFileRename(options);
        }

        public moveToNewFile(options: MoveToNewFileOptions): void {
            this.state.moveToNewFile(options);
        }
        public noMoveToNewFile(): void {
            this.state.noMoveToNewFile();
        }

        public generateTypes(...options: GenerateTypesOptions[]): void {
            this.state.generateTypes(options);
        }
    }

    export interface GenerateTypesOptions {
        readonly name?: string;
        readonly value: unknown;
        readonly global?: boolean;
        // Exactly one of these should be set:
        readonly output?: string;
        readonly outputBaseline?: string;
    }

    export class Edit {
        constructor(private state: FourSlash.TestState) {
        }
        public backspace(count?: number) {
            this.state.deleteCharBehindMarker(count);
        }

        public deleteAtCaret(times?: number) {
            this.state.deleteChar(times);
        }

        public replace(start: number, length: number, text: string) {
            this.state.replace(start, length, text);
        }

        public paste(text: string) {
            this.state.paste(text);
        }

        public insert(text: string) {
            this.insertLines(text);
        }

        public insertLine(text: string) {
            this.insertLines(text + "\n");
        }

        public insertLines(...lines: string[]) {
            this.state.type(lines.join("\n"));
        }

        public moveRight(count?: number) {
            this.state.moveCaretRight(count);
        }

        public moveLeft(count?: number) {
            if (typeof count === "undefined") {
                count = 1;
            }
            this.state.moveCaretRight(count * -1);
        }

        public enableFormatting() {
            this.state.enableFormatting = true;
        }

        public disableFormatting() {
            this.state.enableFormatting = false;
        }

        public applyRefactor(options: ApplyRefactorOptions) {
            this.state.applyRefactor(options);
        }
    }

    export class Debug {
        constructor(private state: FourSlash.TestState) {
        }

        public printCurrentParameterHelp() {
            this.state.printCurrentParameterHelp();
        }

        public printCurrentFileState() {
            this.state.printCurrentFileState(/*showWhitespace*/ false, /*makeCaretVisible*/ true);
        }

        public printCurrentFileStateWithWhitespace() {
            this.state.printCurrentFileState(/*showWhitespace*/ true, /*makeCaretVisible*/ true);
        }

        public printCurrentFileStateWithoutCaret() {
            this.state.printCurrentFileState(/*showWhitespace*/ false, /*makeCaretVisible*/ false);
        }

        public printCurrentQuickInfo() {
            this.state.printCurrentQuickInfo();
        }

        public printCurrentSignatureHelp() {
            this.state.printCurrentSignatureHelp();
        }

        public printCompletionListMembers(options: ts.UserPreferences | undefined) {
            this.state.printCompletionListMembers(options);
        }

        public printAvailableCodeFixes() {
            this.state.printAvailableCodeFixes();
        }

        public printBreakpointLocation(pos: number) {
            this.state.printBreakpointLocation(pos);
        }
        public printBreakpointAtCurrentLocation() {
            this.state.printBreakpointAtCurrentLocation();
        }

        public printNameOrDottedNameSpans(pos: number) {
            this.state.printNameOrDottedNameSpans(pos);
        }

        public printErrorList() {
            this.state.printErrorList();
        }

        public printNavigationItems(searchValue = ".*") {
            this.state.printNavigationItems(searchValue);
        }

        public printNavigationBar() {
            this.state.printNavigationBar();
        }

        public printContext() {
            this.state.printContext();
        }

        public printOutliningSpans() {
            this.state.printOutliningSpans();
        }
    }

    export class Format {
        constructor(private state: FourSlash.TestState) {
        }

        public document() {
            this.state.formatDocument();
        }

        public copyFormatOptions(): ts.FormatCodeSettings {
            return this.state.copyFormatOptions();
        }

        public setFormatOptions(options: ts.FormatCodeOptions) {
            return this.state.setFormatOptions(options);
        }

        public selection(startMarker: string, endMarker: string) {
            this.state.formatSelection(this.state.getMarkerByName(startMarker).position, this.state.getMarkerByName(endMarker).position);
        }

        public onType(posMarker: string, key: string) {
            this.state.formatOnType(this.state.getMarkerByName(posMarker).position, key);
        }

        public setOption(name: keyof ts.FormatCodeSettings, value: number | string | boolean): void {
            this.state.formatCodeSettings = { ...this.state.formatCodeSettings, [name]: value };
        }
    }

    export class Cancellation {
        constructor(private state: FourSlash.TestState) {
        }

        public resetCancelled() {
            this.state.resetCancelled();
        }

        public setCancelled(numberOfCalls = 0) {
            this.state.setCancelled(numberOfCalls);
        }
    }

    interface Classification {
        classificationType: ts.ClassificationTypeNames;
        text: string;
        textSpan?: FourSlash.TextSpan;
    }
    export namespace Classification {
        export function comment(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.comment, text, position);
        }

        export function identifier(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.identifier, text, position);
        }

        export function keyword(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.keyword, text, position);
        }

        export function numericLiteral(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.numericLiteral, text, position);
        }

        export function operator(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.operator, text, position);
        }

        export function stringLiteral(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.stringLiteral, text, position);
        }

        export function whiteSpace(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.whiteSpace, text, position);
        }

        export function text(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.text, text, position);
        }

        export function punctuation(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.punctuation, text, position);
        }

        export function docCommentTagName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.docCommentTagName, text, position);
        }

        export function className(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.className, text, position);
        }

        export function enumName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.enumName, text, position);
        }

        export function interfaceName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.interfaceName, text, position);
        }

        export function moduleName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.moduleName, text, position);
        }

        export function typeParameterName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.typeParameterName, text, position);
        }

        export function parameterName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.parameterName, text, position);
        }

        export function typeAliasName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.typeAliasName, text, position);
        }

        export function jsxOpenTagName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxOpenTagName, text, position);
        }

        export function jsxCloseTagName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxCloseTagName, text, position);
        }

        export function jsxSelfClosingTagName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxSelfClosingTagName, text, position);
        }

        export function jsxAttribute(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxAttribute, text, position);
        }

        export function jsxText(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxText, text, position);
        }

        export function jsxAttributeStringLiteralValue(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxAttributeStringLiteralValue, text, position);
        }

        function getClassification(classificationType: ts.ClassificationTypeNames, text: string, position?: number): Classification {
            const textSpan = position === undefined ? undefined : { start: position, end: position + text.length };
            return { classificationType, text, textSpan };
        }
    }
    export namespace Completion {
        const res: string[] = [];
        for (let i = ts.SyntaxKind.FirstKeyword; i <= ts.SyntaxKind.LastKeyword; i++) {
            res.push(ts.Debug.assertDefined(ts.tokenToString(i)));
        }
        export const keywordsWithUndefined: ReadonlyArray<string> = res;
        export const keywords: ReadonlyArray<string> = keywordsWithUndefined.filter(k => k !== "undefined");

        export const typeKeywords: ReadonlyArray<string> =
            ["false", "null", "true", "void", "any", "boolean", "keyof", "never", "number", "object", "string", "symbol", "undefined", "unique", "unknown"];

        const globalTypeDecls = [
            "Symbol",
            "PropertyKey",
            "PropertyDescriptor",
            "PropertyDescriptorMap",
            "Object",
            "ObjectConstructor",
            "Function",
            "FunctionConstructor",
            "CallableFunction",
            "NewableFunction",
            "IArguments",
            "String",
            "StringConstructor",
            "Boolean",
            "BooleanConstructor",
            "Number",
            "NumberConstructor",
            "TemplateStringsArray",
            "ImportMeta",
            "Math",
            "Date",
            "DateConstructor",
            "RegExpMatchArray",
            "RegExpExecArray",
            "RegExp",
            "RegExpConstructor",
            "Error",
            "ErrorConstructor",
            "EvalError",
            "EvalErrorConstructor",
            "RangeError",
            "RangeErrorConstructor",
            "ReferenceError",
            "ReferenceErrorConstructor",
            "SyntaxError",
            "SyntaxErrorConstructor",
            "TypeError",
            "TypeErrorConstructor",
            "URIError",
            "URIErrorConstructor",
            "JSON",
            "ReadonlyArray",
            "ConcatArray",
            "Array",
            "ArrayConstructor",
            "TypedPropertyDescriptor",
            "ClassDecorator",
            "PropertyDecorator",
            "MethodDecorator",
            "ParameterDecorator",
            "PromiseConstructorLike",
            "PromiseLike",
            "Promise",
            "ArrayLike",
            "Partial",
            "Required",
            "Readonly",
            "Pick",
            "Record",
            "Exclude",
            "Extract",
            "NonNullable",
            "Parameters",
            "ConstructorParameters",
            "ReturnType",
            "InstanceType",
            "ThisType",
            "ArrayBuffer",
            "ArrayBufferTypes",
            "ArrayBufferLike",
            "ArrayBufferConstructor",
            "ArrayBufferView",
            "DataView",
            "DataViewConstructor",
            "Int8Array",
            "Int8ArrayConstructor",
            "Uint8Array",
            "Uint8ArrayConstructor",
            "Uint8ClampedArray",
            "Uint8ClampedArrayConstructor",
            "Int16Array",
            "Int16ArrayConstructor",
            "Uint16Array",
            "Uint16ArrayConstructor",
            "Int32Array",
            "Int32ArrayConstructor",
            "Uint32Array",
            "Uint32ArrayConstructor",
            "Float32Array",
            "Float32ArrayConstructor",
            "Float64Array",
            "Float64ArrayConstructor",
            "Intl",
        ];

        export const globalTypes = globalTypesPlus([]);

        export function globalTypesPlus(plus: ReadonlyArray<ExpectedCompletionEntry>): ReadonlyArray<ExpectedCompletionEntry> {
            return [
                ...globalTypeDecls,
                ...plus,
                ...typeKeywords,
            ];
        }

        export const classElementKeywords: ReadonlyArray<string> =
            ["private", "protected", "public", "static", "abstract", "async", "constructor", "get", "readonly", "set"];

        export const constructorParameterKeywords: ReadonlyArray<ExpectedCompletionEntry> =
            ["private", "protected", "public", "readonly"].map((name): ExpectedCompletionEntry => ({ name, kind: "keyword" }));

        export const functionMembers: ReadonlyArray<ExpectedCompletionEntry> = [
            "apply",
            "call",
            "bind",
            "toString",
            "length",
            { name: "arguments", text: "(property) Function.arguments: any" },
            "caller"
        ];

        export const stringMembers: ReadonlyArray<ExpectedCompletionEntry> = [
            "toString",
            "charAt",
            "charCodeAt",
            "concat",
            "indexOf",
            "lastIndexOf",
            "localeCompare",
            "match",
            "replace",
            "search",
            "slice",
            "split",
            "substring",
            "toLowerCase",
            "toLocaleLowerCase",
            "toUpperCase",
            "toLocaleUpperCase",
            "trim",
            "length",
            "substr",
            "valueOf",
        ];

        export const functionMembersWithPrototype: ReadonlyArray<ExpectedCompletionEntry> = [
            ...functionMembers.slice(0, 4),
            "prototype",
            ...functionMembers.slice(4),
        ];

        // TODO: Shouldn't propose type keywords in statement position
        export const statementKeywordsWithTypes: ReadonlyArray<string> = [
            "break",
            "case",
            "catch",
            "class",
            "const",
            "continue",
            "debugger",
            "default",
            "delete",
            "do",
            "else",
            "enum",
            "export",
            "extends",
            "false",
            "finally",
            "for",
            "function",
            "if",
            "import",
            "in",
            "instanceof",
            "new",
            "null",
            "return",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "while",
            "with",
            "implements",
            "interface",
            "let",
            "package",
            "private",
            "protected",
            "public",
            "static",
            "yield",
            "abstract",
            "as",
            "any",
            "async",
            "await",
            "boolean",
            "constructor",
            "declare",
            "get",
            "infer",
            "is",
            "keyof",
            "module",
            "namespace",
            "never",
            "readonly",
            "require",
            "number",
            "object",
            "set",
            "string",
            "symbol",
            "type",
            "unique",
            "unknown",
            "from",
            "global",
            "of",
        ];

        export const statementKeywords: ReadonlyArray<string> = statementKeywordsWithTypes.filter(k =>
            k === "false" || k === "true" || k === "null" || k === "void" || !ts.contains(typeKeywords, k) && k !== "declare" && k !== "module");

        export const globalsVars: ReadonlyArray<string> = [
            "eval",
            "parseInt",
            "parseFloat",
            "isNaN",
            "isFinite",
            "decodeURI",
            "decodeURIComponent",
            "encodeURI",
            "encodeURIComponent",
            "escape",
            "unescape",
            "NaN",
            "Infinity",
            "Object",
            "Function",
            "String",
            "Boolean",
            "Number",
            "Math",
            "Date",
            "RegExp",
            "Error",
            "EvalError",
            "RangeError",
            "ReferenceError",
            "SyntaxError",
            "TypeError",
            "URIError",
            "JSON",
            "Array",
            "ArrayBuffer",
            "DataView",
            "Int8Array",
            "Uint8Array",
            "Uint8ClampedArray",
            "Int16Array",
            "Uint16Array",
            "Int32Array",
            "Uint32Array",
            "Float32Array",
            "Float64Array",
            "Intl",
        ];

        // TODO: many of these are inappropriate to always provide
        export const globalsInsideFunction = (plus: ReadonlyArray<ExpectedCompletionEntry>): ReadonlyArray<ExpectedCompletionEntry> => [
            "arguments",
            ...plus,
            ...globalsVars,
            "undefined",
            "break",
            "case",
            "catch",
            "class",
            "const",
            "continue",
            "debugger",
            "default",
            "delete",
            "do",
            "else",
            "enum",
            "export",
            "extends",
            "false",
            "finally",
            "for",
            "function",
            "if",
            "import",
            "in",
            "instanceof",
            "new",
            "null",
            "return",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "while",
            "with",
            "implements",
            "interface",
            "let",
            "package",
            "yield",
            "async",
        ];

        // TODO: many of these are inappropriate to always provide
        export const globalKeywords: ReadonlyArray<string> = [
            "break",
            "case",
            "catch",
            "class",
            "const",
            "continue",
            "debugger",
            "default",
            "delete",
            "do",
            "else",
            "enum",
            "export",
            "extends",
            "false",
            "finally",
            "for",
            "function",
            "if",
            "import",
            "in",
            "instanceof",
            "new",
            "null",
            "return",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "while",
            "with",
            "implements",
            "interface",
            "let",
            "package",
            "private",
            "protected",
            "public",
            "static",
            "yield",
            "abstract",
            "as",
            "any",
            "async",
            "await",
            "boolean",
            "constructor",
            "declare",
            "get",
            "infer",
            "is",
            "keyof",
            "module",
            "namespace",
            "never",
            "readonly",
            "require",
            "number",
            "object",
            "set",
            "string",
            "symbol",
            "type",
            "unique",
            "unknown",
            "from",
            "global",
            "of",
        ];

        export const insideMethodKeywords: ReadonlyArray<string> = [
            "break",
            "case",
            "catch",
            "class",
            "const",
            "continue",
            "debugger",
            "default",
            "delete",
            "do",
            "else",
            "enum",
            "export",
            "extends",
            "false",
            "finally",
            "for",
            "function",
            "if",
            "import",
            "in",
            "instanceof",
            "new",
            "null",
            "return",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "while",
            "with",
            "implements",
            "interface",
            "let",
            "package",
            "yield",
            "async",
        ];

        export const globalKeywordsPlusUndefined: ReadonlyArray<string> = (() => {
            const i = globalKeywords.indexOf("unique");
            return [...globalKeywords.slice(0, i), "undefined", ...globalKeywords.slice(i)];
        })();

        export const globals: ReadonlyArray<string> = [...globalsVars, "undefined", ...globalKeywords];

        export function globalsPlus(plus: ReadonlyArray<ExpectedCompletionEntry>): ReadonlyArray<ExpectedCompletionEntry> {
            return [...globalsVars, ...plus, "undefined", ...globalKeywords];
        }
    }

    export interface ReferenceGroup {
        definition: ReferenceGroupDefinition;
        ranges: FourSlash.Range[];
    }

    export type ReferenceGroupDefinition = string | { text: string, range: FourSlash.Range };

    export interface ApplyRefactorOptions {
        refactorName: string;
        actionName: string;
        actionDescription: string;
        newContent: NewFileContent;
    }

    export type ExpectedCompletionEntry = string | {
        readonly name: string,
        readonly source?: string,
        readonly insertText?: string,
        readonly replacementSpan?: FourSlash.Range,
        readonly hasAction?: boolean, // If not specified, will assert that this is false.
        readonly isRecommended?: boolean; // If not specified, will assert that this is false.
        readonly kind?: string, // If not specified, won't assert about this
        readonly kindModifiers?: string, // Must be paired with 'kind'
        readonly text?: string;
        readonly documentation?: string;
        readonly sourceDisplay?: string;
        readonly tags?: ReadonlyArray<ts.JSDocTagInfo>;
    };

    export interface VerifyCompletionsOptions {
        readonly marker?: ArrayOrSingle<string | FourSlash.Marker>;
        readonly isNewIdentifierLocation?: boolean; // Always tested
        readonly isGlobalCompletion?: boolean; // Only tested if set
        readonly exact?: ArrayOrSingle<ExpectedCompletionEntry>;
        readonly includes?: ArrayOrSingle<ExpectedCompletionEntry>;
        readonly excludes?: ArrayOrSingle<string>;
        readonly preferences?: ts.UserPreferences;
        readonly triggerCharacter?: ts.CompletionsTriggerCharacter;
    }

    export interface VerifySignatureHelpOptions {
        readonly marker?: ArrayOrSingle<string>;
        /** @default 1 */
        readonly overloadsCount?: number;
        /** @default undefined */
        readonly docComment?: string;
        readonly text?: string;
        readonly parameterName?: string;
        readonly parameterSpan?: string;
        /** @default undefined */
        readonly parameterDocComment?: string;
        readonly parameterCount?: number;
        readonly argumentCount?: number;
        /** @default false */
        readonly isVariadic?: boolean;
        /** @default ts.emptyArray */
        readonly tags?: ReadonlyArray<ts.JSDocTagInfo>;
        readonly triggerReason?: ts.SignatureHelpTriggerReason;
    }

    export interface VerifyNavigateToOptions {
        readonly pattern: string;
        readonly fileName?: string;
        readonly expected: ReadonlyArray<ExpectedNavigateToItem>;
    }

    export interface ExpectedNavigateToItem {
        readonly name: string;
        readonly kind: ts.ScriptElementKind;
        readonly kindModifiers?: string;
        readonly matchKind?: keyof typeof ts.PatternMatchKind;
        readonly isCaseSensitive?: boolean;
        readonly range: FourSlash.Range;
        readonly containerName?: string;
        readonly containerKind?: ts.ScriptElementKind;
    }

    export type ArrayOrSingle<T> = T | ReadonlyArray<T>;

    export interface VerifyCompletionListContainsOptions extends ts.UserPreferences {
        triggerCharacter?: ts.CompletionsTriggerCharacter;
        sourceDisplay: string;
        isRecommended?: true;
        insertText?: string;
        replacementSpan?: FourSlash.Range;
    }

    export interface VerifyDocumentHighlightsOptions {
        filesToSearch?: ReadonlyArray<string>;
    }

    export type NewFileContent = string | { readonly [filename: string]: string };

    export interface NewContentOptions {
        // Exactly one of these should be defined.
        newFileContent?: NewFileContent;
        newRangeContent?: string;
    }

    export interface VerifyCodeFixOptions extends NewContentOptions {
        readonly description: string;
        readonly errorCode?: number;
        readonly index?: number;
        readonly preferences?: ts.UserPreferences;
        readonly applyChanges?: boolean;
        readonly commands?: ReadonlyArray<ts.CodeActionCommand>;
    }

    export interface VerifyCodeFixAvailableOptions {
        description: string;
        commands?: ts.CodeActionCommand[];
    }

    export interface VerifyCodeFixAllOptions {
        fixId: string;
        fixAllDescription: string;
        newFileContent: NewFileContent;
        commands: ReadonlyArray<{}>;
    }

    export interface VerifyRefactorOptions {
        name: string;
        actionName: string;
        refactors: ReadonlyArray<ts.ApplicableRefactorInfo>;
    }

    export interface VerifyCompletionActionOptions extends NewContentOptions {
        name: string;
        source?: string;
        description: string;
        preferences?: ts.UserPreferences;
    }

    export interface Diagnostic {
        message: string;
        range?: FourSlash.Range;
        code: number;
        reportsUnnecessary?: true;
    }

    export interface GetEditsForFileRenameOptions {
        readonly oldPath: string;
        readonly newPath: string;
        readonly newFileContents: { readonly [fileName: string]: string };
        readonly preferences?: ts.UserPreferences;
    }

    export interface MoveToNewFileOptions {
        readonly newFileContents: { readonly [fileName: string]: string };
        readonly preferences?: ts.UserPreferences;
    }

    export type RenameLocationsOptions = ReadonlyArray<RenameLocationOptions> | {
        readonly findInStrings?: boolean;
        readonly findInComments?: boolean;
        readonly ranges: ReadonlyArray<RenameLocationOptions>;
    };
    export type RenameLocationOptions = FourSlash.Range | { readonly range: FourSlash.Range, readonly prefixText?: string, readonly suffixText?: string };
}
