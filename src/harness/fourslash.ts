//
// Copyright (c) Microsoft Corporation.  All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/// <reference path="..\services\services.ts" />
/// <reference path="..\services\shims.ts" />
/// <reference path="harnessLanguageService.ts" />
/// <reference path="harness.ts" />
/// <reference path="fourslashRunner.ts" />

namespace FourSlash {
    ts.disableIncrementalParsing = false;

    function normalizeNewLines(s: string) {
        return s.replace(/\r\n/g, "\n");
    }

    // Represents a parsed source file with metadata
    export interface FourSlashFile {
        // The contents of the file (with markers, etc stripped out)
        content: string;
        fileName: string;
        version: number;
        // File-specific options (name/value pairs)
        fileOptions: Harness.TestCaseParser.CompilerSettings;
    }

    // Represents a set of parsed source files and options
    export interface FourSlashData {
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
        data?: any;
    }

    export interface Range {
        fileName: string;
        start: number;
        end: number;
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

    export import IndentStyle = ts.IndentStyle;

    const entityMap = ts.createMapFromTemplate({
        "&": "&amp;",
        "\"": "&quot;",
        "'": "&#39;",
        "/": "&#47;",
        "<": "&lt;",
        ">": "&gt;"
    });

    export function escapeXmlAttributeValue(s: string) {
        return s.replace(/[&<>"'\/]/g, ch => entityMap.get(ch));
    }

    // Name of testcase metadata including ts.CompilerOptions properties that will be used by globalOptions
    // To add additional option, add property into the testOptMetadataNames, refer the property in either globalMetadataNames or fileMetadataNames
    // Add cases into convertGlobalOptionsToCompilationsSettings function for the compiler to acknowledge such option from meta data
    const metadataOptionNames = {
        baselineFile: "BaselineFile",
        emitThisFile: "emitThisFile",  // This flag is used for testing getEmitOutput feature. It allows test-cases to indicate what file to be output in multiple files project
        fileName: "Filename",
        resolveReference: "ResolveReference",  // This flag is used to specify entry file for resolve file references. The flag is only allow once per test file
    };

    // List of allowed metadata names
    const fileMetadataNames = [metadataOptionNames.fileName, metadataOptionNames.emitThisFile, metadataOptionNames.resolveReference];

    function convertGlobalOptionsToCompilerOptions(globalOptions: Harness.TestCaseParser.CompilerSettings): ts.CompilerOptions {
        const settings: ts.CompilerOptions = { target: ts.ScriptTarget.ES5 };
        Harness.Compiler.setCompilerOptionsFromHarnessSetting(globalOptions, settings);
        return settings;
    }

    export class TestCancellationToken implements ts.HostCancellationToken {
        // 0 - cancelled
        // >0 - not cancelled
        // <0 - not cancelled and value denotes number of isCancellationRequested after which token become cancelled
        private static NotCanceled: number = -1;
        private numberOfCallsBeforeCancellation: number = TestCancellationToken.NotCanceled;

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
            this.numberOfCallsBeforeCancellation = TestCancellationToken.NotCanceled;
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
        return {
            getText: (start: number, end: number) => sourceText.substr(start, end - start),
            getLength: () => sourceText.length,
            getChangeRange: () => undefined
        };
    }

    export class TestState {
        // Language service instance
        private languageServiceAdapterHost: Harness.LanguageService.LanguageServiceAdapterHost;
        private languageService: ts.LanguageService;
        private cancellationToken: TestCancellationToken;

        // The current caret position in the active file
        public currentCaretPosition = 0;
        public lastKnownMarker = "";

        // The file that's currently 'opened'
        public activeFile: FourSlashFile;

        // Whether or not we should format on keystrokes
        public enableFormatting = true;

        public formatCodeSettings: ts.FormatCodeSettings;

        private inputFiles = ts.createMap<string>();  // Map between inputFile's fileName and its content for easily looking up when resolving references

        private static getDisplayPartsJson(displayParts: ts.SymbolDisplayPart[]) {
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
        private addMatchedInputFile(referenceFilePath: string, extensions: string[]) {
            const inputFiles = this.inputFiles;
            const languageServiceAdapterHost = this.languageServiceAdapterHost;
            if (!extensions) {
                tryAdd(referenceFilePath);
            }
            else {
                tryAdd(referenceFilePath) || ts.forEach(extensions, ext => tryAdd(referenceFilePath + ext));
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
            let startResolveFileRef: FourSlashFile;

            let configFileName: string;
            ts.forEach(testData.files, file => {
                // Create map between fileName and its content for easily looking up when resolveReference flag is specified
                this.inputFiles.set(file.fileName, file.content);
                if (ts.getBaseFileName(file.fileName).toLowerCase() === "tsconfig.json") {
                    const configJson = ts.parseConfigFileTextToJson(file.fileName, file.content);
                    if (configJson.config === undefined) {
                        throw new Error(`Failed to parse test tsconfig.json: ${configJson.error.messageText}`);
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

                if (!startResolveFileRef && file.fileOptions[metadataOptionNames.resolveReference] === "true") {
                    startResolveFileRef = file;
                }
                else if (startResolveFileRef) {
                    // If entry point for resolving file references is already specified, report duplication error
                    throw new Error("There exists a Fourslash file which has resolveReference flag specified; remove duplicated resolveReference flag");
                }
            });

            if (configFileName) {
                const baseDir = ts.normalizePath(ts.getDirectoryPath(configFileName));
                const host = new Utils.MockParseConfigHost(baseDir, /*ignoreCase*/ false, this.inputFiles);

                const configJsonObj = ts.parseConfigFileTextToJson(configFileName, this.inputFiles.get(configFileName));
                assert.isTrue(configJsonObj.config !== undefined);

                const { options, errors } = ts.parseJsonConfigFileContent(configJsonObj.config, host, baseDir);

                // Extend our existing compiler options so that we can also support tsconfig only options
                if (!errors || errors.length === 0) {
                    compilationOptions = ts.extend(compilationOptions, options);
                }
            }


            if (compilationOptions.typeRoots) {
                compilationOptions.typeRoots = compilationOptions.typeRoots.map(p => ts.getNormalizedAbsolutePath(p, this.basePath));
            }

            const languageServiceAdapter = this.getLanguageServiceAdapter(testType, this.cancellationToken, compilationOptions);
            this.languageServiceAdapterHost = languageServiceAdapter.getHost();
            this.languageService = languageServiceAdapter.getLanguageService();

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
                        Harness.Compiler.getDefaultLibrarySourceFile().text, /*isRootFile*/ false);
                }
            }
            else {
                // resolveReference file-option is not specified then do not resolve any files and include all inputFiles
                this.inputFiles.forEach((file, fileName) => {
                    if (!Harness.isDefaultLibraryFile(fileName)) {
                        this.languageServiceAdapterHost.addScript(fileName, file, /*isRootFile*/ true);
                    }
                });
                this.languageServiceAdapterHost.addScript(Harness.Compiler.defaultLibFileName,
                    Harness.Compiler.getDefaultLibrarySourceFile().text, /*isRootFile*/ false);
            }

            this.formatCodeSettings = {
                baseIndentSize: 0,
                indentSize: 4,
                tabSize: 4,
                newLineCharacter: Harness.IO.newLine(),
                convertTabsToSpaces: true,
                indentStyle: ts.IndentStyle.Smart,
                insertSpaceAfterCommaDelimiter: true,
                insertSpaceAfterSemicolonInForStatements: true,
                insertSpaceBeforeAndAfterBinaryOperators: true,
                insertSpaceAfterConstructor: false,
                insertSpaceAfterKeywordsInControlFlowStatements: true,
                insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
                insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
                insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
                insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
                insertSpaceAfterTypeAssertion: false,
                placeOpenBraceOnNewLineForFunctions: false,
                placeOpenBraceOnNewLineForControlBlocks: false,
            };

            // Open the first file by default
            this.openFile(0);
        }

        private getFileContent(fileName: string): string {
            const script = this.languageServiceAdapterHost.getScriptInfo(fileName);
            return script.content;
        }

        // Entry points from fourslash.ts
        public goToMarker(name: string | Marker = "") {
            const marker = typeof name === "string" ? this.getMarkerByName(name) : name;
            if (this.activeFile.fileName !== marker.fileName) {
                this.openFile(marker.fileName);
            }

            const content = this.getFileContent(marker.fileName);
            if (marker.position === -1 || marker.position > content.length) {
                throw new Error(`Marker "${name}" has been invalidated by unrecoverable edits to the file.`);
            }
            const mName = typeof name === "string" ? name : this.markerName(marker);
            this.lastKnownMarker = mName;
            this.goToPosition(marker.position);
        }

        public goToEachMarker(action: () => void) {
            const markers = this.getMarkers();
            assert(markers.length);
            for (const marker of markers) {
                this.goToMarker(marker);
                action();
            }
        }

        public goToEachRange(action: () => void) {
            const ranges = this.getRanges();
            assert(ranges.length);
            for (const range of ranges) {
                this.goToRangeStart(range);
                action();
            }
        }

        private markerName(m: Marker): string {
            return ts.forEachEntry(this.testData.markerPositions, (marker, name) => {
                if (marker === m) {
                    return name;
                }
            })!;
        }

        public goToPosition(pos: number) {
            this.currentCaretPosition = pos;
        }

        public moveCaretRight(count = 1) {
            this.currentCaretPosition += count;
            this.currentCaretPosition = Math.min(this.currentCaretPosition, this.getFileContent(this.activeFile.fileName).length);
        }

        // Opens a file given its 0-based index or fileName
        public openFile(index: number, content?: string, scriptKindName?: string): void;
        public openFile(name: string, content?: string, scriptKindName?: string): void;
        public openFile(indexOrName: any, content?: string, scriptKindName?: string) {
            const fileToOpen: FourSlashFile = this.findFile(indexOrName);
            fileToOpen.fileName = ts.normalizeSlashes(fileToOpen.fileName);
            this.activeFile = fileToOpen;
            // Let the host know that this file is now open
            this.languageServiceAdapterHost.openFile(fileToOpen.fileName, content, scriptKindName);
        }

        public verifyErrorExistsBetweenMarkers(startMarkerName: string, endMarkerName: string, negative: boolean) {
            const startMarker = this.getMarkerByName(startMarkerName);
            const endMarker = this.getMarkerByName(endMarkerName);
            const predicate = (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) =>
                ((errorMinChar === startPos) && (errorLimChar === endPos)) ? true : false;

            const exists = this.anyErrorInRange(predicate, startMarker, endMarker);

            if (exists !== negative) {
                this.printErrorLog(negative, this.getAllDiagnostics());
                throw new Error(`Failure between markers: '${startMarkerName}', '${endMarkerName}'`);
            }
        }

        private raiseError(message: string) {
            throw new Error(this.messageAtLastKnownMarker(message));
        }

        private messageAtLastKnownMarker(message: string) {
            const locationDescription = this.lastKnownMarker ? this.lastKnownMarker : this.getLineColStringAtPosition(this.currentCaretPosition);
            return `At ${locationDescription}: ${message}`;
        }

        private assertionMessageAtLastKnownMarker(msg: string) {
            return "\nMarker: " + this.lastKnownMarker + "\nChecking: " + msg + "\n\n";
        }

        private getDiagnostics(fileName: string): ts.Diagnostic[] {
            return this.languageService.getSyntacticDiagnostics(fileName).concat(this.languageService.getSemanticDiagnostics(fileName));
        }

        private getAllDiagnostics(): ts.Diagnostic[] {
            return ts.flatMap(this.languageServiceAdapterHost.getFilenames(), fileName => this.getDiagnostics(fileName));
        }

        public verifyErrorExistsAfterMarker(markerName: string, negative: boolean, after: boolean) {
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

            if (exists !== negative) {
                this.printErrorLog(negative, diagnostics);
                throw new Error("Failure at marker: " + markerName);
            }
        }

        private anyErrorInRange(predicate: (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) => boolean, startMarker: Marker, endMarker?: Marker) {

            const errors = this.getDiagnostics(startMarker.fileName);
            let exists = false;

            const startPos = startMarker.position;
            let endPos: number = undefined;
            if (endMarker !== undefined) {
                endPos = endMarker.position;
            }

            errors.forEach(function (error: ts.Diagnostic) {
                if (predicate(error.start, error.start + error.length, startPos, endPos)) {
                    exists = true;
                }
            });

            return exists;
        }

        private printErrorLog(expectErrors: boolean, errors: ts.Diagnostic[]) {
            if (expectErrors) {
                Harness.IO.log("Expected error not found.  Error list is:");
            }
            else {
                Harness.IO.log("Unexpected error(s) found.  Error list is:");
            }

            for (const { start, length, messageText, file } of errors) {
                Harness.IO.log("  from: " + showPosition(file, start) +
                    ", to: " + showPosition(file, start + length) +
                    ", message: " + ts.flattenDiagnosticMessageText(messageText, Harness.IO.newLine()) + "\n");
            }

            function showPosition(file: ts.SourceFile, pos: number) {
                const { line, character } = ts.getLineAndCharacterOfPosition(file, pos);
                return `${line}:${character}`;
            }
        }

        public verifyNoErrors() {
            ts.forEachKey(this.inputFiles, fileName => {
                const errors = this.getDiagnostics(fileName);
                if (errors.length) {
                    this.printErrorLog(/*expectErrors*/ false, errors);
                    const error = errors[0];
                    this.raiseError(`Found an error: ${error.file.fileName}@${error.start}: ${error.messageText}`);
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

        public verifyGoToDefinitionIs(endMarker: string | string[]) {
            this.verifyGoToXWorker(toArray(endMarker), () => this.getGoToDefinition());
        }

        public verifyGoToDefinition(arg0: any, endMarkerNames?: string | string[]) {
            this.verifyGoToX(arg0, endMarkerNames, () => this.getGoToDefinition());
        }

        private getGoToDefinition(): ts.DefinitionInfo[] {
            return this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        }

        public verifyGoToType(arg0: any, endMarkerNames?: string | string[]) {
            this.verifyGoToX(arg0, endMarkerNames, () =>
                this.languageService.getTypeDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition));
        }

        private verifyGoToX(arg0: any, endMarkerNames: string | string[] | undefined, getDefs: () => ts.DefinitionInfo[] | undefined) {
            if (endMarkerNames) {
                this.verifyGoToXPlain(arg0, endMarkerNames, getDefs);
            }
            else if (ts.isArray(arg0)) {
                const pairs: [string | string[], string | string[]][] = arg0;
                for (const [start, end] of pairs) {
                    this.verifyGoToXPlain(start, end, getDefs);
                }
            }
            else {
                const obj: { [startMarkerName: string]: string | string[] } = arg0;
                for (const startMarkerName in obj) {
                    if (ts.hasProperty(obj, startMarkerName)) {
                        this.verifyGoToXPlain(startMarkerName, obj[startMarkerName], getDefs);
                    }
                }
            }
        }

        private verifyGoToXPlain(startMarkerNames: string | string[], endMarkerNames: string | string[], getDefs: () => ts.DefinitionInfo[] | undefined) {
            for (const start of toArray(startMarkerNames)) {
                this.verifyGoToXSingle(start, endMarkerNames, getDefs);
            }
        }

        public verifyGoToDefinitionForMarkers(markerNames: string[]) {
            for (const markerName of markerNames) {
                this.verifyGoToXSingle(`${markerName}Reference`, `${markerName}Definition`, () => this.getGoToDefinition());
            }
        }

        private verifyGoToXSingle(startMarkerName: string, endMarkerNames: string | string[], getDefs: () => ts.DefinitionInfo[] | undefined) {
            this.goToMarker(startMarkerName);
            this.verifyGoToXWorker(toArray(endMarkerNames), getDefs);
        }

        private verifyGoToXWorker(endMarkers: string[], getDefs: () => ts.DefinitionInfo[] | undefined) {
            const definitions = getDefs() || [];

            if (endMarkers.length !== definitions.length) {
                this.raiseError(`goToDefinitions failed - expected to find ${endMarkers.length} definitions but got ${definitions.length}`);
            }

            ts.zipWith(endMarkers, definitions, (endMarker, definition, i) => {
                const marker = this.getMarkerByName(endMarker);
                if (marker.fileName !== definition.fileName || marker.position !== definition.textSpan.start) {
                    this.raiseError(`goToDefinition failed for definition ${endMarker} (${i}): expected ${marker.fileName} at ${marker.position}, got ${definition.fileName} at ${definition.textSpan.start}`);
                }
            });
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

        public verifyCompletionListCount(expectedCount: number, negative: boolean) {
            if (expectedCount === 0 && negative) {
                this.verifyCompletionListIsEmpty(/*negative*/ false);
                return;
            }

            const members = this.getCompletionListAtCaret();

            if (members) {
                const match = members.entries.length === expectedCount;

                if ((!match && !negative) || (match && negative)) {
                    this.raiseError("Member list count was " + members.entries.length + ". Expected " + expectedCount);
                }
            }
            else if (expectedCount) {
                this.raiseError("Member list count was 0. Expected " + expectedCount);
            }
        }

        public verifyCompletionListItemsCountIsGreaterThan(count: number, negative: boolean) {
            const completions = this.getCompletionListAtCaret();
            const itemsCount = completions ? completions.entries.length : 0;

            if (negative) {
                if (itemsCount > count) {
                    this.raiseError(`Expected completion list items count to not be greater than ${count}, but is actually ${itemsCount}`);
                }
            }
            else {
                if (itemsCount <= count) {
                    this.raiseError(`Expected completion list items count to be greater than ${count}, but is actually ${itemsCount}`);
                }
            }
        }

        public verifyCompletionListStartsWithItemsInOrder(items: string[]): void {
            if (items.length === 0) {
                return;
            }

            const entries = this.getCompletionListAtCaret().entries;
            assert.isTrue(items.length <= entries.length, `Amount of expected items in completion list [ ${items.length} ] is greater than actual number of items in list [ ${entries.length} ]`);
            ts.zipWith(entries, items, (entry, item) => {
                assert.equal(entry.name, item, `Unexpected item in completion list`);
            });
        }

        public noItemsWithSameNameButDifferentKind(): void {
            const completions = this.getCompletionListAtCaret();
            const uniqueItems = ts.createMap<string>();
            for (const item of completions.entries) {
                const uniqueItem = uniqueItems.get(item.name);
                if (!uniqueItem) {
                    uniqueItems.set(item.name, item.kind);
                }
                else {
                    assert.equal(item.kind, uniqueItem, `Items should have the same kind, got ${item.kind} and ${uniqueItem}`);
                }
            }
        }

        public verifyCompletionListIsEmpty(negative: boolean) {
            const completions = this.getCompletionListAtCaret();
            if ((!completions || completions.entries.length === 0) && negative) {
                this.raiseError("Completion list is empty at caret at position " + this.activeFile.fileName + " " + this.currentCaretPosition);
            }
            else if (completions && completions.entries.length !== 0 && !negative) {
                this.raiseError(`Completion list is not empty at caret at position ${this.activeFile.fileName} ${this.currentCaretPosition}\n` +
                    `Completion List contains: ${stringify(completions.entries.map(e => e.name))}`);
            }
        }

        public verifyCompletionListAllowsNewIdentifier(negative: boolean) {
            const completions = this.getCompletionListAtCaret();

            if ((completions && !completions.isNewIdentifierLocation) && !negative) {
                this.raiseError("Expected builder completion entry");
            }
            else if ((completions && completions.isNewIdentifierLocation) && negative) {
                this.raiseError("Un-expected builder completion entry");
            }
        }

        public verifyCompletionListIsGlobal(expected: boolean) {
            const completions = this.getCompletionListAtCaret();
            if (completions && completions.isGlobalCompletion !== expected) {
                this.raiseError(`verifyCompletionListIsGlobal failed - expected result to be ${completions.isGlobalCompletion}`);
            }
        }

        public verifyCompletionsAt(markerName: string, expected: string[]) {
            this.goToMarker(markerName);

            const actualCompletions = this.getCompletionListAtCaret();
            if (!actualCompletions) {
                this.raiseError(`No completions at position '${this.currentCaretPosition}'.`);
            }

            const actual = actualCompletions.entries;

            if (actual.length !== expected.length) {
                this.raiseError(`Expected ${expected.length} completions, got ${actual.map(a => a.name)}.`);
            }

            ts.zipWith(actual, expected, (completion, expectedCompletion, index) => {
                if (completion.name !== expectedCompletion) {
                    this.raiseError(`Expected completion at index ${index} to be ${expectedCompletion}, got ${completion.name}`);
                }
            });
        }

        public verifyCompletionListContains(symbol: string, text?: string, documentation?: string, kind?: string, spanIndex?: number) {
            const completions = this.getCompletionListAtCaret();
            if (completions) {
                this.assertItemInCompletionList(completions.entries, symbol, text, documentation, kind, spanIndex);
            }
            else {
                this.raiseError(`No completions at position '${this.currentCaretPosition}' when looking for '${symbol}'.`);
            }
        }

        /**
         * Verify that the completion list does NOT contain the given symbol.
         * The symbol is considered matched with the symbol in the list if and only if all given parameters must matched.
         * When any parameter is omitted, the parameter is ignored during comparison and assumed that the parameter with
         * that property of the symbol in the list.
         * @param symbol the name of symbol
         * @param expectedText the text associated with the symbol
         * @param expectedDocumentation the documentation text associated with the symbol
         * @param expectedKind the kind of symbol (see ScriptElementKind)
         * @param spanIndex the index of the range that the completion item's replacement text span should match
         */
        public verifyCompletionListDoesNotContain(symbol: string, expectedText?: string, expectedDocumentation?: string, expectedKind?: string, spanIndex?: number) {
            const that = this;
            let replacementSpan: ts.TextSpan;
            if (spanIndex !== undefined) {
                replacementSpan = this.getTextSpanForRangeAtIndex(spanIndex);
            }

            function filterByTextOrDocumentation(entry: ts.CompletionEntry) {
                const details = that.getCompletionEntryDetails(entry.name);
                const documentation = details && ts.displayPartsToString(details.documentation);
                const text = details && ts.displayPartsToString(details.displayParts);

                // If any of the expected values are undefined, assume that users don't
                // care about them.
                if (replacementSpan && !TestState.textSpansEqual(replacementSpan, entry.replacementSpan)) {
                    return false;
                }
                else if (expectedText && text !== expectedText) {
                    return false;
                }
                else if (expectedDocumentation && documentation !== expectedDocumentation) {
                    return false;
                }

                return true;
            }

            const completions = this.getCompletionListAtCaret();
            if (completions) {
                let filterCompletions = completions.entries.filter(e => e.name === symbol);
                filterCompletions = expectedKind ? filterCompletions.filter(e => e.kind === expectedKind) : filterCompletions;
                filterCompletions = filterCompletions.filter(filterByTextOrDocumentation);
                if (filterCompletions.length !== 0) {
                    // After filtered using all present criterion, if there are still symbol left in the list
                    // then these symbols must meet the criterion for Not supposed to be in the list. So we
                    // raise an error
                    let error = "Completion list did contain \'" + symbol + "\'.";
                    const details = this.getCompletionEntryDetails(filterCompletions[0].name);
                    if (expectedText) {
                        error += "Expected text: " + expectedText + " to equal: " + ts.displayPartsToString(details.displayParts) + ".";
                    }
                    if (expectedDocumentation) {
                        error += "Expected documentation: " + expectedDocumentation + " to equal: " + ts.displayPartsToString(details.documentation) + ".";
                    }
                    if (expectedKind) {
                        error += "Expected kind: " + expectedKind + " to equal: " + filterCompletions[0].kind + ".";
                    }
                    else {
                        error += "kind: " + filterCompletions[0].kind + ".";
                    }
                    if (replacementSpan) {
                        const spanText = filterCompletions[0].replacementSpan ? stringify(filterCompletions[0].replacementSpan) : undefined;
                        error += "Expected replacement span: " + stringify(replacementSpan) + " to equal: " + spanText + ".";
                    }
                    this.raiseError(error);
                }
            }
        }

        public verifyCompletionEntryDetails(entryName: string, expectedText: string, expectedDocumentation?: string, kind?: string, tags?: ts.JSDocTagInfo[]) {
            const details = this.getCompletionEntryDetails(entryName);

            assert(details, "no completion entry available");

            assert.equal(ts.displayPartsToString(details.displayParts), expectedText, this.assertionMessageAtLastKnownMarker("completion entry details text"));

            if (expectedDocumentation !== undefined) {
                assert.equal(ts.displayPartsToString(details.documentation), expectedDocumentation, this.assertionMessageAtLastKnownMarker("completion entry documentation"));
            }

            if (kind !== undefined) {
                assert.equal(details.kind, kind, this.assertionMessageAtLastKnownMarker("completion entry kind"));
            }

            if (tags !== undefined) {
                assert.equal(details.tags.length, tags.length, this.messageAtLastKnownMarker("QuickInfo tags"));
                ts.zipWith(tags, details.tags, (expectedTag, actualTag) => {
                    assert.equal(expectedTag.name, actualTag.name);
                    assert.equal(expectedTag.text, actualTag.text, this.messageAtLastKnownMarker("QuickInfo tag " + actualTag.name));
                });
            }
        }

        /** Use `getProgram` instead of accessing this directly. */
        private _program: ts.Program;
        /** Use `getChecker` instead of accessing this directly. */
        private _checker: ts.TypeChecker;

        private getProgram(): ts.Program {
            return this._program || (this._program = this.languageService.getProgram());
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
            return ts.getTouchingPropertyName(this.getSourceFile(), this.currentCaretPosition, /*includeJsDocComment*/ false);
        }

        private goToAndGetNode(range: Range): ts.Node {
            this.goToRangeStart(range);
            const node = this.getNode();
            this.verifyRange("touching property name", range, node);
            return node;
        }

        private verifyRange(desc: string, expected: Range, actual: ts.Node) {
            const actualStart = actual.getStart();
            const actualEnd = actual.getEnd();
            if (actualStart !== expected.start || actualEnd !== expected.end) {
                this.raiseError(`${desc} should be ${expected.start}-${expected.end}, got ${actualStart}-${actualEnd}`);
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
            const symbol = this.getChecker().getSymbolAtLocation(node);
            if (!symbol) {
                this.raiseError("Could not get symbol at location");
            }
            this.verifySymbol(symbol, declarationRanges);
        }

        private verifyReferencesAre(expectedReferences: Range[]) {
            const actualReferences = this.getReferencesAtCaret() || [];

            if (actualReferences.length > expectedReferences.length) {
                // Find the unaccounted-for reference.
                for (const actual of actualReferences) {
                    if (!ts.forEach(expectedReferences, r => r.start === actual.textSpan.start)) {
                        this.raiseError(`A reference ${stringify(actual)} is unaccounted for.`);
                    }
                }
                // Probably will never reach here.
                this.raiseError(`There are ${actualReferences.length} references but only ${expectedReferences.length} were expected.`);
            }

            for (const reference of expectedReferences) {
                const {fileName, start, end} = reference;
                if (reference.marker && reference.marker.data) {
                    const {isWriteAccess, isDefinition} = reference.marker.data;
                    this.verifyReferencesWorker(actualReferences, fileName, start, end, isWriteAccess, isDefinition);
                }
                else {
                    this.verifyReferencesWorker(actualReferences, fileName, start, end);
                }
            }
        }

        public verifyReferencesOf(range: Range, references: Range[]) {
            this.goToRangeStart(range);
            this.verifyReferencesAre(references);
        }

        public verifyRangesReferenceEachOther(ranges?: Range[]) {
            ranges = ranges || this.getRanges();
            assert(ranges.length);
            for (const range of ranges) {
                this.verifyReferencesOf(range, ranges);
            }
        }

        public verifyReferenceGroups(startRanges: Range | Range[], parts: Array<{ definition: string, ranges: Range[] }>): void {
            const fullExpected = ts.map(parts, ({ definition, ranges }) => ({ definition, ranges: ranges.map(rangeToReferenceEntry) }));

            for (const startRange of toArray(startRanges)) {
                this.goToRangeStart(startRange);
                const fullActual = ts.map(this.findReferencesAtCaret(), ({ definition, references }) => ({
                    definition: definition.displayParts.map(d => d.text).join(""),
                    ranges: references
                }));
                this.assertObjectsEqual(fullActual, fullExpected);
            }

            function rangeToReferenceEntry(r: Range): ts.ReferenceEntry {
                const { isWriteAccess, isDefinition, isInString } = (r.marker && r.marker.data) || { isWriteAccess: false, isDefinition: false, isInString: undefined };
                const result: ts.ReferenceEntry = { fileName: r.fileName, textSpan: { start: r.start, length: r.end - r.start }, isWriteAccess: !!isWriteAccess, isDefinition: !!isDefinition };
                if (isInString !== undefined) {
                    result.isInString = isInString;
                }
                return result;
            }
        }

        public verifyNoReferences(markerNameOrRange?: string | Range) {
            if (markerNameOrRange) {
                if (typeof markerNameOrRange === "string") {
                    this.goToMarker(markerNameOrRange);
                }
                else {
                    this.goToRangeStart(markerNameOrRange);
                }
            }

            const refs = this.getReferencesAtCaret();
            if (refs && refs.length) {
                console.log(refs);
                this.raiseError("Expected getReferences to fail");
            }
        }

        public verifySingleReferenceGroup(definition: string, ranges?: Range[]) {
            ranges = ranges || this.getRanges();
            this.verifyReferenceGroups(ranges, [{ definition, ranges }]);
        }

        private assertObjectsEqual<T>(fullActual: T, fullExpected: T, msgPrefix = ""): void {
            const recur = <U>(actual: U, expected: U, path: string) => {
                const fail = (msg: string) => {
                    console.log("Expected:", stringify(fullExpected));
                    console.log("Actual: ", stringify(fullActual));
                    this.raiseError(`${msgPrefix}At ${path}: ${msg}`);
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
                console.log("Expected:", stringify(fullExpected));
                console.log("Actual: ", stringify(fullActual));
                this.raiseError(msgPrefix);
            }
            recur(fullActual, fullExpected, "");

        }

        public verifyDisplayPartsOfReferencedSymbol(expected: ts.SymbolDisplayPart[]) {
            const referencedSymbols = this.findReferencesAtCaret();

            if (referencedSymbols.length === 0) {
                this.raiseError("No referenced symbols found at current caret position");
            }
            else if (referencedSymbols.length > 1) {
                this.raiseError("More than one referenced symbol found");
            }

            assert.equal(TestState.getDisplayPartsJson(referencedSymbols[0].definition.displayParts),
                TestState.getDisplayPartsJson(expected), this.messageAtLastKnownMarker("referenced symbol definition display parts"));
        }

        private verifyReferencesWorker(references: ts.ReferenceEntry[], fileName: string, start: number, end: number, isWriteAccess?: boolean, isDefinition?: boolean) {
            for (const reference of references) {
                if (reference && reference.fileName === fileName && reference.textSpan.start === start && ts.textSpanEnd(reference.textSpan) === end) {
                    if (typeof isWriteAccess !== "undefined" && reference.isWriteAccess !== isWriteAccess) {
                        this.raiseError(`verifyReferencesAtPositionListContains failed - item isWriteAccess value does not match, actual: ${reference.isWriteAccess}, expected: ${isWriteAccess}.`);
                    }
                    if (typeof isDefinition !== "undefined" && reference.isDefinition !== isDefinition) {
                        this.raiseError(`verifyReferencesAtPositionListContains failed - item isDefinition value does not match, actual: ${reference.isDefinition}, expected: ${isDefinition}.`);
                    }
                    return;
                }
            }

            const missingItem = { fileName, start, end, isWriteAccess, isDefinition };
            this.raiseError(`verifyReferencesAtPositionListContains failed - could not find the item: ${stringify(missingItem)} in the returned list: (${stringify(references)})`);
        }

        private getCompletionListAtCaret() {
            return this.languageService.getCompletionsAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        }

        private getCompletionEntryDetails(entryName: string) {
            return this.languageService.getCompletionEntryDetails(this.activeFile.fileName, this.currentCaretPosition, entryName);
        }

        private getReferencesAtCaret() {
            return this.languageService.getReferencesAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        }

        private findReferencesAtCaret() {
            return this.languageService.findReferences(this.activeFile.fileName, this.currentCaretPosition);
        }

        public getSyntacticDiagnostics(expected: string) {
            const diagnostics = this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
            this.testDiagnostics(expected, diagnostics);
        }

        public getSemanticDiagnostics(expected: string) {
            const diagnostics = this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
            this.testDiagnostics(expected, diagnostics);
        }

        private testDiagnostics(expected: string, diagnostics: ts.Diagnostic[]) {
            const realized = ts.realizeDiagnostics(diagnostics, "\r\n");
            const actual = stringify(realized);
            assert.equal(actual, expected);
        }

        public verifyQuickInfoAt(markerName: string, expectedText: string, expectedDocumentation?: string) {
            this.goToMarker(markerName);
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

        public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: { start: number; length: number; },
            displayParts: ts.SymbolDisplayPart[],
            documentation: ts.SymbolDisplayPart[],
            tags: ts.JSDocTagInfo[]
            ) {

            const actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            assert.equal(actualQuickInfo.kind, kind, this.messageAtLastKnownMarker("QuickInfo kind"));
            assert.equal(actualQuickInfo.kindModifiers, kindModifiers, this.messageAtLastKnownMarker("QuickInfo kindModifiers"));
            assert.equal(JSON.stringify(actualQuickInfo.textSpan), JSON.stringify(textSpan), this.messageAtLastKnownMarker("QuickInfo textSpan"));
            assert.equal(TestState.getDisplayPartsJson(actualQuickInfo.displayParts), TestState.getDisplayPartsJson(displayParts), this.messageAtLastKnownMarker("QuickInfo displayParts"));
            assert.equal(TestState.getDisplayPartsJson(actualQuickInfo.documentation), TestState.getDisplayPartsJson(documentation), this.messageAtLastKnownMarker("QuickInfo documentation"));
            assert.equal(actualQuickInfo.tags.length, tags.length, this.messageAtLastKnownMarker("QuickInfo tags"));
            ts.zipWith(tags, actualQuickInfo.tags, (expectedTag, actualTag) => {
                assert.equal(expectedTag.name, actualTag.name);
                assert.equal(expectedTag.text, actualTag.text, this.messageAtLastKnownMarker("QuickInfo tag " + actualTag.name));
            });
        }

        public verifyRangesAreRenameLocations(options?: Range[] | { findInStrings?: boolean, findInComments?: boolean, ranges?: Range[] }) {
            const ranges = ts.isArray(options) ? options : options && options.ranges || this.getRanges();
            this.verifyRenameLocations(ranges, { ranges, ...options });
        }

        public verifyRenameLocations(startRanges: Range | Range[], options: Range[] | { findInStrings?: boolean, findInComments?: boolean, ranges: Range[] }) {
            let findInStrings: boolean, findInComments: boolean, ranges: Range[];
            if (ts.isArray(options)) {
                findInStrings = findInComments = false;
                ranges = options;
            }
            else {
                findInStrings = !!options.findInStrings;
                findInComments = !!options.findInComments;
                ranges = options.ranges;
            }

            for (const startRange of toArray(startRanges)) {
                this.goToRangeStart(startRange);

                const renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
                if (!renameInfo.canRename) {
                    this.raiseError("Expected rename to succeed, but it actually failed.");
                    break;
                }

                let references = this.languageService.findRenameLocations(
                    this.activeFile.fileName, this.currentCaretPosition, findInStrings, findInComments);

                ranges = ranges || this.getRanges();

                if (!references) {
                    if (ranges.length !== 0) {
                        this.raiseError(`Expected ${ranges.length} rename locations; got none.`);
                    }
                    return;
                }

                if (ranges.length !== references.length) {
                    this.raiseError("Rename location count does not match result.\n\nExpected: " + stringify(ranges) + "\n\nActual:" + stringify(references));
                }

                ranges = ranges.sort((r1, r2) => r1.start - r2.start);
                references = references.sort((r1, r2) => r1.textSpan.start - r2.textSpan.start);

                ts.zipWith(references, ranges, (reference, range) => {
                    if (reference.textSpan.start !== range.start || ts.textSpanEnd(reference.textSpan) !== range.end) {
                        this.raiseError("Rename location results do not match.\n\nExpected: " + stringify(ranges) + "\n\nActual:" + stringify(references));
                    }
                });
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

        public verifyCurrentSignatureHelpIs(expected: string) {
            const help = this.getActiveSignatureHelpItem();
            assert.equal(
                ts.displayPartsToString(help.prefixDisplayParts) +
                help.parameters.map(p => ts.displayPartsToString(p.displayParts)).join(ts.displayPartsToString(help.separatorDisplayParts)) +
                ts.displayPartsToString(help.suffixDisplayParts), expected);
        }

        public verifyCurrentParameterIsVariable(isVariable: boolean) {
            const signature = this.getActiveSignatureHelpItem();
            assert.isOk(signature);
            assert.equal(isVariable, signature.isVariadic);
        }

        public verifyCurrentParameterHelpName(name: string) {
            const activeParameter = this.getActiveParameter();
            const activeParameterName = activeParameter.name;
            assert.equal(activeParameterName, name);
        }

        public verifyCurrentParameterSpanIs(parameter: string) {
            const activeParameter = this.getActiveParameter();
            assert.equal(ts.displayPartsToString(activeParameter.displayParts), parameter);
        }

        public verifyCurrentParameterHelpDocComment(docComment: string) {
            const activeParameter = this.getActiveParameter();
            const activeParameterDocComment = activeParameter.documentation;
            assert.equal(ts.displayPartsToString(activeParameterDocComment), docComment, this.assertionMessageAtLastKnownMarker("current parameter Help DocComment"));
        }

        public verifyCurrentSignatureHelpParameterCount(expectedCount: number) {
            assert.equal(this.getActiveSignatureHelpItem().parameters.length, expectedCount);
        }

        public verifyCurrentSignatureHelpIsVariadic(expected: boolean) {
            assert.equal(this.getActiveSignatureHelpItem().isVariadic, expected);
        }

        public verifyCurrentSignatureHelpDocComment(docComment: string) {
            const actualDocComment = this.getActiveSignatureHelpItem().documentation;
            assert.equal(ts.displayPartsToString(actualDocComment), docComment, this.assertionMessageAtLastKnownMarker("current signature help doc comment"));
        }

        public verifyCurrentSignatureHelpTags(tags: ts.JSDocTagInfo[]) {
            const actualTags = this.getActiveSignatureHelpItem().tags;

            assert.equal(actualTags.length, tags.length, this.assertionMessageAtLastKnownMarker("signature help tags"));
            ts.zipWith(tags, actualTags, (expectedTag, actualTag) => {
                assert.equal(expectedTag.name, actualTag.name);
                assert.equal(expectedTag.text, actualTag.text, this.assertionMessageAtLastKnownMarker("signature help tag " + actualTag.name));
            });
        }

        public verifySignatureHelpCount(expected: number) {
            const help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            const actual = help && help.items ? help.items.length : 0;
            assert.equal(actual, expected);
        }

        public verifySignatureHelpArgumentCount(expected: number) {
            const signatureHelpItems = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            const actual = signatureHelpItems.argumentCount;
            assert.equal(actual, expected);
        }

        public verifySignatureHelpPresent(shouldBePresent = true) {
            const actual = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            if (shouldBePresent) {
                if (!actual) {
                    this.raiseError("Expected signature help to be present, but it wasn't");
                }
            }
            else {
                if (actual) {
                    this.raiseError(`Expected no signature help, but got "${stringify(actual)}"`);
                }
            }
        }

        private validate(name: string, expected: string, actual: string) {
            if (expected && expected !== actual) {
                this.raiseError("Expected " + name + " '" + expected + "'.  Got '" + actual + "' instead.");
            }
        }

        public verifyRenameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string) {
            const renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
            if (!renameInfo.canRename) {
                this.raiseError("Rename did not succeed");
            }

            this.validate("displayName", displayName, renameInfo.displayName);
            this.validate("fullDisplayName", fullDisplayName, renameInfo.fullDisplayName);
            this.validate("kind", kind, renameInfo.kind);
            this.validate("kindModifiers", kindModifiers, renameInfo.kindModifiers);

            if (this.getRanges().length !== 1) {
                this.raiseError("Expected a single range to be selected in the test file.");
            }

            const expectedRange = this.getRanges()[0];
            if (renameInfo.triggerSpan.start !== expectedRange.start ||
                ts.textSpanEnd(renameInfo.triggerSpan) !== expectedRange.end) {
                this.raiseError("Expected triggerSpan [" + expectedRange.start + "," + expectedRange.end + ").  Got [" +
                    renameInfo.triggerSpan.start + "," + ts.textSpanEnd(renameInfo.triggerSpan) + ") instead.");
            }
        }

        public verifyRenameInfoFailed(message?: string) {
            const renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
            if (renameInfo.canRename) {
                this.raiseError("Rename was expected to fail");
            }

            this.validate("error", message, renameInfo.localizedErrorMessage);
        }

        private getActiveSignatureHelpItem() {
            const help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            const index = help.selectedItemIndex;
            return help.items[index];
        }

        private getActiveParameter(): ts.SignatureHelpParameter {
            const help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            const item = help.items[help.selectedItemIndex];
            const currentParam = help.argumentIndex;
            return item.parameters[currentParam];
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
            let previousSpanInfo: string;
            let startColumn: number;
            let length: number;
            const prefixString = "    >";

            let pos = 0;
            const addSpanInfoString = () => {
                if (previousSpanInfo) {
                    resultString += currentLine;
                    let thisLineMarker = repeatString(startColumn, " ") + repeatString(length, "~");
                    thisLineMarker += repeatString(this.alignmentForExtraInfo - thisLineMarker.length - prefixString.length + 1, " ");
                    resultString += thisLineMarker;
                    resultString += "=> Pos: (" + (pos - length) + " to " + (pos - 1) + ") ";
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
                    currentLine = "\n" + nextLine.toString() + repeatString(3 - nextLine.toString().length, " ") + ">" + this.activeFile.content.substring(pos, fileLineMap[nextLine]) + "\n    ";
                    startColumn = 0;
                    length = 0;
                }
                const spanInfo = this.spanInfoToString(getSpanAtPos(pos), prefixString);
                if (previousSpanInfo && previousSpanInfo !== spanInfo) {
                    addSpanInfoString();
                    previousSpanInfo = spanInfo;
                    startColumn = startColumn + length;
                    length = 1;
                }
                else {
                    previousSpanInfo = spanInfo;
                    length++;
                }
            }
            addSpanInfoString();
            return resultString;
        }

        public getBreakpointStatementLocation(pos: number) {
            return this.languageService.getBreakpointStatementAtPosition(this.activeFile.fileName, pos);
        }

        public baselineCurrentFileBreakpointLocations() {
            let baselineFile = this.testData.globalOptions[metadataOptionNames.baselineFile];
            if (!baselineFile) {
                baselineFile = this.activeFile.fileName.replace(this.basePath + "/breakpointValidation", "bpSpan");
                baselineFile = baselineFile.replace(ts.Extension.Ts, ".baseline");

            }
            Harness.Baseline.runBaseline(
                baselineFile,
                () => {
                    return this.baselineCurrentFileLocations(pos => this.getBreakpointStatementLocation(pos));
                });
        }

        public baselineGetEmitOutput() {
            // Find file to be emitted
            const emitFiles: FourSlashFile[] = [];  // List of FourSlashFile that has emitThisFile flag on

            const allFourSlashFiles = this.testData.files;
            for (const file of allFourSlashFiles) {
                if (file.fileOptions[metadataOptionNames.emitThisFile] === "true") {
                    // Find a file with the flag emitThisFile turned on
                    emitFiles.push(file);
                }
            }

            // If there is not emiThisFile flag specified in the test file, throw an error
            if (emitFiles.length === 0) {
                this.raiseError("No emitThisFile is specified in the test file");
            }

            Harness.Baseline.runBaseline(
                this.testData.globalOptions[metadataOptionNames.baselineFile],
                () => {
                    let resultString = "";
                    // Loop through all the emittedFiles and emit them one by one
                    emitFiles.forEach(emitFile => {
                        const emitOutput = this.languageService.getEmitOutput(emitFile.fileName);
                        // Print emitOutputStatus in readable format
                        resultString += "EmitSkipped: " + emitOutput.emitSkipped + Harness.IO.newLine();

                        if (emitOutput.emitSkipped) {
                            resultString += "Diagnostics:" + Harness.IO.newLine();
                            const diagnostics = ts.getPreEmitDiagnostics(this.languageService.getProgram());
                            for (const diagnostic of diagnostics) {
                                if (typeof diagnostic.messageText !== "string") {
                                    let chainedMessage = <ts.DiagnosticMessageChain>diagnostic.messageText;
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
                            resultString = resultString + fileName + outputFile.text;
                        }
                        resultString += Harness.IO.newLine();
                    });

                    return resultString;
                });
        }

        public baselineQuickInfo() {
            let baselineFile = this.testData.globalOptions[metadataOptionNames.baselineFile];
            if (!baselineFile) {
                baselineFile = ts.getBaseFileName(this.activeFile.fileName).replace(ts.Extension.Ts, ".baseline");
            }

            Harness.Baseline.runBaseline(
                baselineFile,
                () => stringify(
                    this.testData.markers.map(marker => ({
                        marker,
                        quickInfo: this.languageService.getQuickInfoAtPosition(marker.fileName, marker.position)
                    }))
                ));
        }

        public printBreakpointLocation(pos: number) {
            Harness.IO.log("\n**Pos: " + pos + " " + this.spanInfoToString(this.getBreakpointStatementLocation(pos), "  "));
        }

        public printBreakpointAtCurrentLocation() {
            this.printBreakpointLocation(this.currentCaretPosition);
        }

        public printCurrentParameterHelp() {
            const help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            Harness.IO.log(stringify(help));
        }

        public printCurrentQuickInfo() {
            const quickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            Harness.IO.log("Quick Info: " + quickInfo.displayParts.map(part => part.text).join(""));
        }

        public printErrorList() {
            const syntacticErrors = this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
            const semanticErrors = this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
            const errorList = syntacticErrors.concat(semanticErrors);
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

        public printCurrentFileState(makeWhitespaceVisible = false, makeCaretVisible = true) {
            for (const file of this.testData.files) {
                const active = (this.activeFile === file);
                Harness.IO.log(`=== Script (${file.fileName}) ${(active ? "(active, cursor at |)" : "")} ===`);
                let content = this.getFileContent(file.fileName);
                if (active) {
                    content = content.substr(0, this.currentCaretPosition) + (makeCaretVisible ? "|" : "") + content.substr(this.currentCaretPosition);
                }
                if (makeWhitespaceVisible) {
                    content = TestState.makeWhitespaceVisible(content);
                }
                Harness.IO.log(content);
            }
        }

        public printCurrentSignatureHelp() {
            const sigHelp = this.getActiveSignatureHelpItem();
            Harness.IO.log(stringify(sigHelp));
        }

        public printCompletionListMembers() {
            const completions = this.getCompletionListAtCaret();
            this.printMembersOrCompletions(completions);
        }

        private printMembersOrCompletions(info: ts.CompletionInfo) {
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
            const membersString = entries.map(m => `${pad(m.name, longestNameLength)} ${pad(m.kind, longestKindLength)} ${m.kindModifiers}`).join("\n");
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
                // Make the edit
                this.languageServiceAdapterHost.editScript(this.activeFile.fileName, offset, offset + 1, ch);
                this.updateMarkersForEdit(this.activeFile.fileName, offset, offset + 1, ch);

                if (i % checkCadence === 0) {
                    this.checkPostEditInvariants();
                }

                // Handle post-keystroke formatting
                if (this.enableFormatting) {
                    const edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeSettings);
                    if (edits.length) {
                        offset += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
                        // this.checkPostEditInvariants();
                    }
                }
            }

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;

            this.fixCaretPosition();
            this.checkPostEditInvariants();
        }

        public replace(start: number, length: number, text: string) {
            this.languageServiceAdapterHost.editScript(this.activeFile.fileName, start, start + length, text);
            this.updateMarkersForEdit(this.activeFile.fileName, start, start + length, text);
            this.checkPostEditInvariants();
        }

        public deleteCharBehindMarker(count = 1) {
            let offset = this.currentCaretPosition;
            const ch = "";
            const checkCadence = (count >> 2) + 1;

            for (let i = 0; i < count; i++) {
                offset--;
                // Make the edit
                this.languageServiceAdapterHost.editScript(this.activeFile.fileName, offset, offset + 1, ch);
                this.updateMarkersForEdit(this.activeFile.fileName, offset, offset + 1, ch);

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

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;

            this.fixCaretPosition();
            this.checkPostEditInvariants();
        }

        // Enters lines of text at the current caret position
        public type(text: string, highFidelity = false) {
            let offset = this.currentCaretPosition;
            const prevChar = " ";
            const checkCadence = (text.length >> 2) + 1;

            for (let i = 0; i < text.length; i++) {
                // Make the edit
                const ch = text.charAt(i);
                this.languageServiceAdapterHost.editScript(this.activeFile.fileName, offset, offset, ch);
                if (highFidelity) {
                    this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, offset);
                }

                this.updateMarkersForEdit(this.activeFile.fileName, offset, offset, ch);
                offset++;

                if (highFidelity) {
                    if (ch === "(" || ch === ",") {
                        /* Signature help*/
                        this.languageService.getSignatureHelpItems(this.activeFile.fileName, offset);
                    }
                    else if (prevChar === " " && /A-Za-z_/.test(ch)) {
                        /* Completions */
                        this.languageService.getCompletionsAtPosition(this.activeFile.fileName, offset);
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

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;
            this.fixCaretPosition();
            this.checkPostEditInvariants();
        }

        // Enters text as if the user had pasted it
        public paste(text: string) {
            const start = this.currentCaretPosition;
            let offset = this.currentCaretPosition;
            this.languageServiceAdapterHost.editScript(this.activeFile.fileName, offset, offset, text);
            this.updateMarkersForEdit(this.activeFile.fileName, offset, offset, text);
            this.checkPostEditInvariants();
            offset += text.length;

            // Handle formatting
            if (this.enableFormatting) {
                const edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, offset, this.formatCodeSettings);
                if (edits.length) {
                    offset += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
                }
            }

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;
            this.fixCaretPosition();

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

        private fixCaretPosition() {
            // The caret can potentially end up between the \r and \n, which is confusing. If
            // that happens, move it back one character
            if (this.currentCaretPosition > 0) {
                const ch = this.getFileContent(this.activeFile.fileName).substring(this.currentCaretPosition - 1, this.currentCaretPosition);
                if (ch === "\r") {
                    this.currentCaretPosition--;
                }
            }
        }

        private applyEdits(fileName: string, edits: ts.TextChange[], isFormattingEdit = false): number {
            // We get back a set of edits, but langSvc.editScript only accepts one at a time. Use this to keep track
            // of the incremental offset from each edit to the next. Assumption is that these edit ranges don't overlap
            let runningOffset = 0;
            edits = edits.sort((a, b) => a.span.start - b.span.start);
            // Get a snapshot of the content of the file so we can make sure any formatting edits didn't destroy non-whitespace characters
            const oldContent = this.getFileContent(fileName);

            for (const edit of edits) {
                this.languageServiceAdapterHost.editScript(fileName, edit.span.start + runningOffset, ts.textSpanEnd(edit.span) + runningOffset, edit.newText);
                this.updateMarkersForEdit(fileName, edit.span.start + runningOffset, ts.textSpanEnd(edit.span) + runningOffset, edit.newText);
                const change = (edit.span.start - ts.textSpanEnd(edit.span)) + edit.newText.length;
                runningOffset += change;
                // TODO: Consider doing this at least some of the time for higher fidelity. Currently causes a failure (bug 707150)
                // this.languageService.getScriptLexicalStructure(fileName);
            }

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
            this.currentCaretPosition += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
            this.fixCaretPosition();
        }

        public formatSelection(start: number, end: number) {
            const edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, end, this.formatCodeSettings);
            this.currentCaretPosition += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
            this.fixCaretPosition();
        }

        public formatOnType(pos: number, key: string) {
            const edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, pos, key, this.formatCodeSettings);
            this.currentCaretPosition += this.applyEdits(this.activeFile.fileName, edits, /*isFormattingEdit*/ true);
            this.fixCaretPosition();
        }

        private updateMarkersForEdit(fileName: string, minChar: number, limChar: number, text: string) {
            for (const marker of this.testData.markers) {
                if (marker.fileName === fileName) {
                    marker.position = updatePosition(marker.position);
                }
            }

            for (const range of this.testData.ranges) {
                if (range.fileName === fileName) {
                    range.start = updatePosition(range.start);
                    range.end = updatePosition(range.end);
                }
            }

            function updatePosition(position: number) {
                if (position > minChar) {
                    if (position < limChar) {
                        // Inside the edit - mark it as invalidated (?)
                        return -1;
                    }
                    else {
                        // Move marker back/forward by the appropriate amount
                        return position + (minChar - limChar) + text.length;
                    }
                }
                else {
                    return position;
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

        public goToRangeStart({fileName, start}: Range) {
            this.openFile(fileName);
            this.goToPosition(start);
        }

        public goToTypeDefinition(definitionIndex: number) {
            const definitions = this.languageService.getTypeDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
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
            const implementations = this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition);
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
            const implementations: ImplementationLocationInformation[] = this.languageService.getImplementationAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (!implementations || !implementations.length) {
                this.raiseError("verifyRangesInImplementationList failed - expected to find at least one implementation location but got 0");
            }

            for (let i = 0; i < implementations.length; i++) {
                for (let j = 0; j < implementations.length; j++) {
                    if (i !== j && implementationsAreEqual(implementations[i], implementations[j])) {
                        const { textSpan, fileName } = implementations[i];
                        const end = textSpan.start + textSpan.length;
                        this.raiseError(`Duplicate implementations returned for range (${textSpan.start}, ${end}) in ${fileName}`);
                    }
                }
            }

            const ranges = this.getRanges();

            if (!ranges || !ranges.length) {
                this.raiseError("verifyRangesInImplementationList failed - expected to find at least one range in test source");
            }

            const unsatisfiedRanges: Range[] = [];

            const delayedErrors: string[] = [];
            for (const range of ranges) {
                const length = range.end - range.start;
                const matchingImpl = ts.find(implementations, impl =>
                    range.fileName === impl.fileName && range.start === impl.textSpan.start && length === impl.textSpan.length);
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
                        error += `\n    (${range.start}, ${range.end}) in ${range.fileName}: ${this.rangeText(range)}`;
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

            function implementationsAreEqual(a: ImplementationLocationInformation, b: ImplementationLocationInformation) {
                return a.fileName === b.fileName && TestState.textSpansEqual(a.textSpan, b.textSpan);
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

        private rangeText({fileName, start, end}: Range): string {
            return this.getFileContent(fileName).slice(start, end);
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
            const actual = this.getFileContent(this.activeFile.fileName);
            if (normalizeNewLines(actual) !== normalizeNewLines(text)) {
                throw new Error("verifyCurrentFileContent\n" +
                    "\tExpected: \"" + text + "\"\n" +
                    "\t  Actual: \"" + actual + "\"");
            }
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
                this.raiseError("verifyCurrentNameOrDottedNameSpanText\n" +
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
                this.testData.globalOptions[metadataOptionNames.baselineFile],
                () => {
                    return this.baselineCurrentFileLocations(pos =>
                        this.getNameOrDottedNameSpan(pos));
                });
        }

        public printNameOrDottedNameSpans(pos: number) {
            Harness.IO.log(this.spanInfoToString(this.getNameOrDottedNameSpan(pos), "**"));
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
                    actual.fileNames.map(file => {
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

        public verifyOutliningSpans(spans: TextSpan[]) {
            const actual = this.languageService.getOutliningSpans(this.activeFile.fileName);

            if (actual.length !== spans.length) {
                this.raiseError(`verifyOutliningSpans failed - expected total spans to be ${spans.length}, but was ${actual.length}`);
            }

            ts.zipWith(spans, actual, (expectedSpan, actualSpan, i) => {
                if (expectedSpan.start !== actualSpan.textSpan.start || expectedSpan.end !== ts.textSpanEnd(actualSpan.textSpan)) {
                    this.raiseError(`verifyOutliningSpans failed - span ${(i + 1)} expected: (${expectedSpan.start},${expectedSpan.end}),  actual: (${actualSpan.textSpan.start},${ts.textSpanEnd(actualSpan.textSpan)})`);
                }
            });
        }

        public verifyTodoComments(descriptors: string[], spans: TextSpan[]) {
            const actual = this.languageService.getTodoComments(this.activeFile.fileName,
                descriptors.map(d => { return { text: d, priority: 0 }; }));

            if (actual.length !== spans.length) {
                this.raiseError(`verifyTodoComments failed - expected total spans to be ${spans.length}, but was ${actual.length}`);
            }

            ts.zipWith(spans, actual, (expectedSpan, actualComment, i) => {
                const actualCommentSpan = ts.createTextSpan(actualComment.position, actualComment.message.length);

                if (expectedSpan.start !== actualCommentSpan.start || expectedSpan.end !== ts.textSpanEnd(actualCommentSpan)) {
                    this.raiseError(`verifyOutliningSpans failed - span ${(i + 1)} expected: (${expectedSpan.start},${expectedSpan.end}),  actual: (${actualCommentSpan.start},${ts.textSpanEnd(actualCommentSpan)})`);
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
            this.applyCodeActions(this.getCodeFixActions(fileName, errorCode), index);
        }

        public verifyRangeIs(expectedText: string, includeWhiteSpace?: boolean) {
            const ranges = this.getRanges();
            if (ranges.length !== 1) {
                this.raiseError("Exactly one range should be specified in the testfile.");
            }

            const actualText = this.rangeText(ranges[0]);

            const result = includeWhiteSpace
                ? normalizeNewLines(actualText) === normalizeNewLines(expectedText)
                : this.removeWhitespace(actualText) === this.removeWhitespace(expectedText);

            if (!result) {
                this.raiseError(`Actual text doesn't match expected text. Actual:\n'${actualText}'\nExpected:\n'${expectedText}'`);
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

        /**
         * Applies fixes for the errors in fileName and compares the results to
         * expectedContents after all fixes have been applied.
         *
         * Note: applying one codefix may generate another (eg: remove duplicate implements
         * may generate an extends -> interface conversion fix).
         * @param expectedContents The contents of the file after the fixes are applied.
         * @param fileName The file to check. If not supplied, the current open file is used.
         */
        public verifyFileAfterCodeFix(expectedContents: string, fileName?: string) {
            fileName = fileName ? fileName : this.activeFile.fileName;

            this.applyCodeActions(this.getCodeFixActions(fileName));

            const actualContents: string = this.getFileContent(fileName);
            if (this.removeWhitespace(actualContents) !== this.removeWhitespace(expectedContents)) {
                this.raiseError(`Actual text doesn't match expected text. Actual:\n${actualContents}\n\nExpected:\n${expectedContents}`);
            }
        }

        /**
         * Rerieves a codefix satisfying the parameters, or undefined if no such codefix is found.
         * @param fileName Path to file where error should be retrieved from.
         */
        private getCodeFixActions(fileName: string, errorCode?: number): ts.CodeAction[] {
            const diagnosticsForCodeFix = this.getDiagnostics(fileName).map(diagnostic => {
                return {
                    start: diagnostic.start,
                    length: diagnostic.length,
                    code: diagnostic.code
                };
            });
            const dedupedDiagnositcs = ts.deduplicate(diagnosticsForCodeFix, ts.equalOwnProperties);

            let actions: ts.CodeAction[] = undefined;

            for (const diagnostic of dedupedDiagnositcs) {

                if (errorCode && errorCode !== diagnostic.code) {
                    continue;
                }

                const newActions = this.languageService.getCodeFixesAtPosition(fileName, diagnostic.start, diagnostic.length, [diagnostic.code], this.formatCodeSettings);
                if (newActions && newActions.length) {
                    actions = actions ? actions.concat(newActions) : newActions;
                }
            }
            return actions;
        }

        private applyCodeActions(actions: ts.CodeAction[], index?: number): void {
            if (index === undefined) {
                if (!(actions && actions.length === 1)) {
                    this.raiseError(`Should find exactly one codefix, but ${actions ? actions.length : "none"} found.`);
                }
                index = 0;
            }
            else {
                if (!(actions && actions.length >= index + 1)) {
                    this.raiseError(`Should find at least ${index + 1} codefix(es), but ${actions ? actions.length : "none"} found.`);
                }
            }

            const changes = actions[index].changes;

            for (const change of changes) {
                this.applyEdits(change.fileName, change.textChanges, /*isFormattingEdit*/ false);
            }
        }

        public verifyImportFixAtPosition(expectedTextArray: string[], errorCode?: number) {
            const ranges = this.getRanges();
            if (ranges.length === 0) {
                this.raiseError("At least one range should be specified in the testfile.");
            }

            const codeFixes = this.getCodeFixActions(this.activeFile.fileName, errorCode);

            if (!codeFixes || codeFixes.length === 0) {
                if (expectedTextArray.length !== 0) {
                    this.raiseError("No codefixes returned.");
                }
                return;
            }

            const actualTextArray: string[] = [];
            const scriptInfo = this.languageServiceAdapterHost.getScriptInfo(codeFixes[0].changes[0].fileName);
            const originalContent = scriptInfo.content;
            for (const codeFix of codeFixes) {
                this.applyEdits(codeFix.changes[0].fileName, codeFix.changes[0].textChanges, /*isFormattingEdit*/ false);
                actualTextArray.push(this.normalizeNewlines(this.rangeText(ranges[0])));
                scriptInfo.updateContent(originalContent);
            }
            const sortedExpectedArray = ts.map(expectedTextArray, str => this.normalizeNewlines(str)).sort();
            const sortedActualArray = actualTextArray.sort();
            if (!ts.arrayIsEqualTo(sortedExpectedArray, sortedActualArray)) {
                this.raiseError(
                    `Actual text array doesn't match expected text array. \nActual: \n"${sortedActualArray.join("\n\n")}"\n---\nExpected: \n'${sortedExpectedArray.join("\n\n")}'`);
            }
        }

        public verifyDocCommentTemplate(expected?: ts.TextInsertion) {
            const name = "verifyDocCommentTemplate";
            const actual = this.languageService.getDocCommentTemplateAtPosition(this.activeFile.fileName, this.currentCaretPosition);

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
                    this.raiseError(`${name} failed - expected insertion:\n"${this.clarifyNewlines(expected.newText)}"\nactual insertion:\n"${this.clarifyNewlines(actual.newText)}"`);
                }

                if (actual.caretOffset !== expected.caretOffset) {
                    this.raiseError(`${name} failed - expected caretOffset: ${expected.caretOffset}\nactual caretOffset:${actual.caretOffset}`);
                }
            }
        }

        private clarifyNewlines(str: string) {
            return str.replace(/\r?\n/g, lineEnding => {
                const representation = lineEnding === "\r\n" ? "CRLF" : "LF";
                return "# - " + representation + lineEnding;
            });
        }

        private normalizeNewlines(str: string) {
            return str.replace(/\r?\n/g, "\n");
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
                this.raiseError(`Invalid openingBrace '${openingBrace}' specified.`);
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

        /*
            Check number of navigationItems which match both searchValue and matchKind,
            if a filename is passed in, limit the results to that file.
            Report an error if expected value and actual value do not match.
        */
        public verifyNavigationItemsCount(expected: number, searchValue: string, matchKind?: string, fileName?: string) {
            const items = this.languageService.getNavigateToItems(searchValue, /*maxResultCount*/ undefined, fileName);
            let actual = 0;

            // Count only the match that match the same MatchKind
            for (const item of items) {
                if (!matchKind || item.matchKind === matchKind) {
                    actual++;
                }
            }

            if (expected !== actual) {
                this.raiseError(`verifyNavigationItemsCount failed - found: ${actual} navigation items, expected: ${expected}.`);
            }
        }

        /*
            Verify that returned navigationItems from getNavigateToItems have matched searchValue, matchKind, and kind.
            Report an error if getNavigateToItems does not find any matched searchValue.
        */
        public verifyNavigationItemsListContains(
            name: string,
            kind: string,
            searchValue: string,
            matchKind: string,
            fileName?: string,
            parentName?: string) {
            const items = this.languageService.getNavigateToItems(searchValue);

            if (!items || items.length === 0) {
                this.raiseError("verifyNavigationItemsListContains failed - found 0 navigation items, expected at least one.");
            }

            for (const item of items) {
                if (item && item.name === name && item.kind === kind &&
                    (matchKind === undefined || item.matchKind === matchKind) &&
                    (fileName === undefined || item.fileName === fileName) &&
                    (parentName === undefined || item.containerName === parentName)) {
                    return;
                }
            }

            // if there was an explicit match kind specified, then it should be validated.
            if (matchKind !== undefined) {
                const missingItem = { name: name, kind: kind, searchValue: searchValue, matchKind: matchKind, fileName: fileName, parentName: parentName };
                this.raiseError(`verifyNavigationItemsListContains failed - could not find the item: ${stringify(missingItem)} in the returned list: (${stringify(items)})`);
            }
        }

        public verifyNavigationBar(json: any) {
            const items = this.languageService.getNavigationBarItems(this.activeFile.fileName);
            if (JSON.stringify(items, replacer) !== JSON.stringify(json)) {
                this.raiseError(`verifyNavigationBar failed - expected: ${stringify(json)}, got: ${stringify(items, replacer)}`);
            }

            // Make the data easier to read.
            function replacer(key: string, value: any) {
                switch (key) {
                    case "spans":
                        // We won't ever check this.
                        return undefined;
                    case "childItems":
                        return value.length === 0 ? undefined : value;
                    default:
                        // Omit falsy values, those are presumed to be the default.
                        return value || undefined;
                }
            }
        }

        public verifyNavigationTree(json: any) {
            const tree = this.languageService.getNavigationTree(this.activeFile.fileName);
            if (JSON.stringify(tree, replacer) !== JSON.stringify(json)) {
                this.raiseError(`verifyNavigationTree failed - expected: ${stringify(json)}, got: ${stringify(tree, replacer)}`);
            }

            function replacer(key: string, value: any) {
                // Don't check "spans", and omit falsy values.
                return key === "spans" ? undefined : (value || undefined);
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
                Harness.IO.log(`${repeatString(item.indent, " ")}name: ${item.text}, kind: ${item.kind}, childItems: ${item.childItems.map(child => child.text)}`);
            }
        }

        private getOccurrencesAtCurrentPosition() {
            return this.languageService.getOccurrencesAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        }

        public verifyOccurrencesAtPositionListContains(fileName: string, start: number, end: number, isWriteAccess?: boolean) {
            const occurrences = this.getOccurrencesAtCurrentPosition();

            if (!occurrences || occurrences.length === 0) {
                this.raiseError("verifyOccurrencesAtPositionListContains failed - found 0 references, expected at least one.");
            }

            for (const occurrence of occurrences) {
                if (occurrence && occurrence.fileName === fileName && occurrence.textSpan.start === start && ts.textSpanEnd(occurrence.textSpan) === end) {
                    if (typeof isWriteAccess !== "undefined" && occurrence.isWriteAccess !== isWriteAccess) {
                        this.raiseError(`verifyOccurrencesAtPositionListContains failed - item isWriteAccess value does not match, actual: ${occurrence.isWriteAccess}, expected: ${isWriteAccess}.`);
                    }
                    return;
                }
            }

            const missingItem = { fileName: fileName, start: start, end: end, isWriteAccess: isWriteAccess };
            this.raiseError(`verifyOccurrencesAtPositionListContains failed - could not find the item: ${stringify(missingItem)} in the returned list: (${stringify(occurrences)})`);
        }

        public verifyOccurrencesAtPositionListCount(expectedCount: number) {
            const occurrences = this.getOccurrencesAtCurrentPosition();
            const actualCount = occurrences ? occurrences.length : 0;
            if (expectedCount !== actualCount) {
                this.raiseError(`verifyOccurrencesAtPositionListCount failed - actual: ${actualCount}, expected:${expectedCount}`);
            }
        }

        private getDocumentHighlightsAtCurrentPosition(fileNamesToSearch: string[]) {
            const filesToSearch = fileNamesToSearch.map(name => ts.combinePaths(this.basePath, name));
            return this.languageService.getDocumentHighlights(this.activeFile.fileName, this.currentCaretPosition, filesToSearch);
        }

        public verifyRangesAreOccurrences(isWriteAccess?: boolean) {
            const ranges = this.getRanges();
            for (const r of ranges) {
                this.goToRangeStart(r);
                this.verifyOccurrencesAtPositionListCount(ranges.length);
                for (const range of ranges) {
                    this.verifyOccurrencesAtPositionListContains(range.fileName, range.start, range.end, isWriteAccess);
                }
            }
        }

        public verifyRangesWithSameTextAreRenameLocations() {
            this.rangesByText().forEach(ranges => this.verifyRangesAreRenameLocations(ranges));
        }

        public verifyRangesWithSameTextAreDocumentHighlights() {
            this.rangesByText().forEach(ranges => this.verifyRangesAreDocumentHighlights(ranges));
        }

        public verifyDocumentHighlightsOf(startRange: Range, ranges: Range[]) {
            ts.Debug.assert(ts.contains(ranges, startRange));
            const fileNames = unique(ranges, range => range.fileName);
            this.goToRangeStart(startRange);
            this.verifyDocumentHighlights(ranges, fileNames);
        }

        public verifyRangesAreDocumentHighlights(ranges?: Range[]) {
            ranges = ranges || this.getRanges();
            const fileNames = unique(ranges, range => range.fileName);
            for (const range of ranges) {
                this.goToRangeStart(range);
                this.verifyDocumentHighlights(ranges, fileNames);
            }
        }

        private verifyDocumentHighlights(expectedRanges: Range[], fileNames: string[] = [this.activeFile.fileName]) {
            const documentHighlights = this.getDocumentHighlightsAtCurrentPosition(fileNames) || [];

            for (const dh of documentHighlights) {
                if (fileNames.indexOf(dh.fileName) === -1) {
                    this.raiseError(`verifyDocumentHighlights failed - got highlights in unexpected file name ${dh.fileName}`);
                }
            }

            for (const fileName of fileNames) {
                const expectedRangesInFile = expectedRanges.filter(r => r.fileName === fileName);
                const highlights = ts.find(documentHighlights, dh => dh.fileName === fileName);
                if (!highlights) {
                    this.raiseError(`verifyDocumentHighlights failed - found no highlights in ${fileName}`);
                }
                const spansInFile = highlights.highlightSpans.sort((s1, s2) => s1.textSpan.start - s2.textSpan.start);

                if (expectedRangesInFile.length !== spansInFile.length) {
                    this.raiseError(`verifyDocumentHighlights failed - In ${fileName}, expected ${expectedRangesInFile.length} highlights, got ${spansInFile.length}`);
                }

                ts.zipWith(expectedRangesInFile, spansInFile, (expectedRange, span) => {
                    if (span.textSpan.start !== expectedRange.start || ts.textSpanEnd(span.textSpan) !== expectedRange.end) {
                        this.raiseError(`verifyDocumentHighlights failed - span does not match, actual: ${stringify(span.textSpan)}, expected: ${expectedRange.start}--${expectedRange.end}`);
                    }
                });
            }
        }

        public verifyCodeFixAvailable(negative: boolean) {
            const codeFix = this.getCodeFixActions(this.activeFile.fileName);

            if (negative && codeFix) {
                this.raiseError(`verifyCodeFixAvailable failed - expected no fixes but found one.`);
            }

            if (!(negative || codeFix)) {
                this.raiseError(`verifyCodeFixAvailable failed - expected code fixes but none found.`);
            }
        }

        public verifyApplicableRefactorAvailableAtMarker(negative: boolean, markerName: string) {
            const marker = this.getMarkerByName(markerName);
            const applicableRefactors = this.languageService.getApplicableRefactors(this.activeFile.fileName, marker.position);
            const isAvailable = applicableRefactors && applicableRefactors.length > 0;
            if (negative && isAvailable) {
                this.raiseError(`verifyApplicableRefactorAvailableAtMarker failed - expected no refactor at marker ${markerName} but found some.`);
            }
            if (!negative && !isAvailable) {
                this.raiseError(`verifyApplicableRefactorAvailableAtMarker failed - expected a refactor at marker ${markerName} but found none.`);
            }
        }

        public verifyApplicableRefactorAvailableForRange(negative: boolean) {
            const ranges = this.getRanges();
            if (!(ranges && ranges.length === 1)) {
                throw new Error("Exactly one refactor range is allowed per test.");
            }

            const applicableRefactors = this.languageService.getApplicableRefactors(this.activeFile.fileName, { pos: ranges[0].start, end: ranges[0].end });
            const isAvailable = applicableRefactors && applicableRefactors.length > 0;
            if (negative && isAvailable) {
                this.raiseError(`verifyApplicableRefactorAvailableForRange failed - expected no refactor but found some.`);
            }
            if (!negative && !isAvailable) {
                this.raiseError(`verifyApplicableRefactorAvailableForRange failed - expected a refactor but found none.`);
            }
        }

        public verifyFileAfterApplyingRefactorAtMarker(
            markerName: string,
            expectedContent: string,
            refactorNameToApply: string,
            actionName: string,
            formattingOptions?: ts.FormatCodeSettings) {

            formattingOptions = formattingOptions || this.formatCodeSettings;
            const markerPos = this.getMarkerByName(markerName).position;

            const applicableRefactors = this.languageService.getApplicableRefactors(this.activeFile.fileName, markerPos);
            const applicableRefactorToApply = ts.find(applicableRefactors, refactor => refactor.name === refactorNameToApply);

            if (!applicableRefactorToApply) {
                this.raiseError(`The expected refactor: ${refactorNameToApply} is not available at the marker location.`);
            }

            const editInfo = this.languageService.getEditsForRefactor(this.activeFile.fileName, formattingOptions, markerPos, refactorNameToApply, actionName);

            for (const edit of editInfo.edits) {
                this.applyEdits(edit.fileName, edit.textChanges);
            }
            const actualContent = this.getFileContent(this.activeFile.fileName);

            if (this.normalizeNewlines(actualContent) !== this.normalizeNewlines(expectedContent)) {
                this.raiseError(`verifyFileAfterApplyingRefactors failed: expected:\n${expectedContent}\nactual:\n${actualContent}`);
            }
        }

        public printAvailableCodeFixes() {
            const codeFixes = this.getCodeFixActions(this.activeFile.fileName);
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

        private assertItemInCompletionList(items: ts.CompletionEntry[], name: string, text?: string, documentation?: string, kind?: string, spanIndex?: number) {
            for (const item of items) {
                if (item.name === name) {
                    if (documentation !== undefined || text !== undefined) {
                        const details = this.getCompletionEntryDetails(item.name);

                        if (documentation !== undefined) {
                            assert.equal(ts.displayPartsToString(details.documentation), documentation, this.assertionMessageAtLastKnownMarker("completion item documentation for " + name));
                        }
                        if (text !== undefined) {
                            assert.equal(ts.displayPartsToString(details.displayParts), text, this.assertionMessageAtLastKnownMarker("completion item detail text for " + name));
                        }
                    }

                    if (kind !== undefined) {
                        assert.equal(item.kind, kind, this.assertionMessageAtLastKnownMarker("completion item kind for " + name));
                    }

                    if (spanIndex !== undefined) {
                        const span = this.getTextSpanForRangeAtIndex(spanIndex);
                        assert.isTrue(TestState.textSpansEqual(span, item.replacementSpan), this.assertionMessageAtLastKnownMarker(stringify(span) + " does not equal " + stringify(item.replacementSpan) + " replacement span for " + name));
                    }

                    return;
                }
            }

            const itemsString = items.map(item => stringify({ name: item.name, kind: item.kind })).join(",\n");

            this.raiseError(`Expected "${stringify({ name, text, documentation, kind })}" to be in list [${itemsString}]`);
        }

        private findFile(indexOrName: any) {
            let result: FourSlashFile;
            if (typeof indexOrName === "number") {
                const index = <number>indexOrName;
                if (index >= this.testData.files.length) {
                    throw new Error(`File index (${index}) in openFile was out of range. There are only ${this.testData.files.length} files in this test.`);
                }
                else {
                    result = this.testData.files[index];
                }
            }
            else if (typeof indexOrName === "string") {
                let name = <string>indexOrName;

                // names are stored in the compiler with this relative path, this allows people to use goTo.file on just the fileName
                name = name.indexOf("/") === -1 ? (this.basePath + "/" + name) : name;

                const availableNames: string[] = [];
                result = ts.forEach(this.testData.files, file => {
                    const fn = file.fileName;
                    if (fn) {
                        if (fn === name) {
                            return file;
                        }
                        availableNames.push(fn);
                    }
                });

                if (!result) {
                    throw new Error(`No test file named "${name}" exists. Available file names are: ${availableNames.join(", ")}`);
                }
            }
            else {
                throw new Error("Unknown argument type");
            }

            return result;
        }

        private getLineColStringAtPosition(position: number) {
            const pos = this.languageServiceAdapterHost.positionToLineAndCharacter(this.activeFile.fileName, position);
            return `line ${(pos.line + 1)}, col ${pos.character}`;
        }

        private getTextSpanForRangeAtIndex(index: number): ts.TextSpan {
            const ranges = this.getRanges();
            if (ranges && ranges.length > index) {
                const range = ranges[index];
                return { start: range.start, length: range.end - range.start };
            }
            else {
                this.raiseError("Supplied span index: " + index + " does not exist in range list of size: " + (ranges ? 0 : ranges.length));
            }
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

        private static makeWhitespaceVisible(text: string) {
            return text.replace(/ /g, "\u00B7").replace(/\r/g, "\u00B6").replace(/\n/g, "\u2193\n").replace(/\t/g, "\u2192\   ");
        }

        public setCancelled(numberOfCalls: number): void {
            this.cancellationToken.setCancelled(numberOfCalls);
        }

        public resetCancelled(): void {
            this.cancellationToken.resetCancelled();
        }

        private static textSpansEqual(a: ts.TextSpan, b: ts.TextSpan) {
            return a && b && a.start === b.start && a.length === b.length;
        }
    }

    export function runFourSlashTest(basePath: string, testType: FourSlashTestType, fileName: string) {
        const content = Harness.IO.readFile(fileName);
        runFourSlashTestContent(basePath, testType, content, fileName);
    }

    export function runFourSlashTestContent(basePath: string, testType: FourSlashTestType, content: string, fileName: string): void {
        // Give file paths an absolute path for the virtual file system
        const absoluteBasePath = ts.combinePaths(Harness.virtualFileSystemRoot, basePath);
        const absoluteFileName = ts.combinePaths(Harness.virtualFileSystemRoot, fileName);

        // Parse out the files and their metadata
        const testData = parseTestData(absoluteBasePath, content, absoluteFileName);
        const state = new TestState(absoluteBasePath, testType, testData);
        const output = ts.transpileModule(content, { reportDiagnostics: true });
        if (output.diagnostics.length > 0) {
            throw new Error(`Syntax error in ${absoluteBasePath}: ${output.diagnostics[0].messageText}`);
        }
        runCode(output.outputText, state);
    }

    function runCode(code: string, state: TestState): void {
        // Compile and execute the test
        const wrappedCode =
            `(function(test, goTo, verify, edit, debug, format, cancellation, classification, verifyOperationIsCancelled) {
${code}
})`;
        try {
            const test = new FourSlashInterface.Test(state);
            const goTo = new FourSlashInterface.GoTo(state);
            const verify = new FourSlashInterface.Verify(state);
            const edit = new FourSlashInterface.Edit(state);
            const debug = new FourSlashInterface.Debug(state);
            const format = new FourSlashInterface.Format(state);
            const cancellation = new FourSlashInterface.Cancellation(state);
            const f = eval(wrappedCode);
            f(test, goTo, verify, edit, debug, format, cancellation, FourSlashInterface.Classification, FourSlash.verifyOperationIsCancelled);
        }
        catch (err) {
            // Debugging: FourSlash.currentTestState.printCurrentFileState();
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
        let currentFileContent: string = undefined;
        let currentFileName = fileName;
        let currentFileOptions: { [s: string]: string } = {};

        function resetLocalData() {
            currentFileContent = undefined;
            currentFileOptions = {};
            currentFileName = fileName;
        }

        for (let line of lines) {
            const lineLength = line.length;

            if (lineLength > 0 && line.charAt(lineLength - 1) === "\r") {
                line = line.substr(0, lineLength - 1);
            }

            if (line.substr(0, 4) === "////") {
                // Subfile content line

                // Append to the current subfile content, inserting a newline needed
                if (currentFileContent === undefined) {
                    currentFileContent = "";
                }
                else {
                    // End-of-line
                    currentFileContent = currentFileContent + "\n";
                }

                currentFileContent = currentFileContent + line.substr(4);
            }
            else if (line.substr(0, 2) === "//") {
                // Comment line, check for global/file @options and record them
                const match = optionRegex.exec(line.substr(2));
                if (match) {
                    const [key, value] = match.slice(1);
                    const fileMetadataNamesIndex = fileMetadataNames.indexOf(key);
                    if (fileMetadataNamesIndex === -1) {
                        // Check if the match is already existed in the global options
                        if (globalOptions[key] !== undefined) {
                            throw new Error(`Global option '${key}' already exists`);
                        }
                        globalOptions[key] = value;
                    }
                    else {
                        if (fileMetadataNamesIndex === fileMetadataNames.indexOf(metadataOptionNames.fileName)) {
                            // Found an @FileName directive, if this is not the first then create a new subfile
                            if (currentFileContent) {
                                const file = parseFileContent(currentFileContent, currentFileName, markerPositions, markers, ranges);
                                file.fileOptions = currentFileOptions;

                                // Store result file
                                files.push(file);

                                resetLocalData();
                            }

                            currentFileName = ts.isRootedDiskPath(value) ? value : basePath + "/" + value;
                            currentFileOptions[key] = value;
                        }
                        else {
                            // Add other fileMetadata flag
                            currentFileOptions[key] = value;
                        }
                    }
                }
            }
            else if (line === "" || lineLength === 0) {
                // Previously blank lines between fourslash content caused it to be considered as 2 files,
                // Remove this behavior since it just causes errors now
            }
            else {
                // Empty line or code line, terminate current subfile if there is one
                if (currentFileContent) {
                    const file = parseFileContent(currentFileContent, currentFileName, markerPositions, markers, ranges);
                    file.fileOptions = currentFileOptions;

                    // Store result file
                    files.push(file);

                    resetLocalData();
                }
            }
        }

        // @Filename is the only directive that can be used in a test that contains tsconfig.json file.
        if (containTSConfigJson(files)) {
            let directive = getNonFileNameOptionInFileList(files);
            if (!directive) {
                directive = getNonFileNameOptionInObject(globalOptions);
            }
            if (directive) {
                throw Error("It is not allowed to use tsconfig.json along with directive '" + directive + "'");
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

    function containTSConfigJson(files: FourSlashFile[]): boolean {
        return ts.forEach(files, f => f.fileOptions["Filename"] === "tsconfig.json");
    }

    function getNonFileNameOptionInFileList(files: FourSlashFile[]): string {
        return ts.forEach(files, f => getNonFileNameOptionInObject(f.fileOptions));
    }

    function getNonFileNameOptionInObject(optionObject: { [s: string]: string }): string {
        for (const option in optionObject) {
            if (option !== metadataOptionNames.fileName) {
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

    function recordObjectMarker(fileName: string, location: LocationInformation, text: string, markerMap: ts.Map<Marker>, markers: Marker[]): Marker {
        let markerValue: any = undefined;
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

    function recordMarker(fileName: string, location: LocationInformation, name: string, markerMap: ts.Map<Marker>, markers: Marker[]): Marker {
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
        let openMarker: LocationInformation = undefined;

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

        const flush = (lastSafeCharIndex: number) => {
            if (lastSafeCharIndex === undefined) {
                output = output + content.substr(lastNormalCharPosition);
            }
            else {
                output = output + content.substr(lastNormalCharPosition, lastSafeCharIndex - lastNormalCharPosition);
            }
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
                                fileName: fileName,
                                start: rangeStart.position,
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
                            const objectMarkerNameText = content.substring(openMarker.sourcePosition + 2, i - 1).trim();
                            const marker = recordObjectMarker(fileName, openMarker, objectMarkerNameText, markerMap, markers);

                            if (openRanges.length > 0) {
                                openRanges[openRanges.length - 1].marker = marker;
                            }

                            // Set the current start to point to the end of the current marker to ignore its text
                            lastNormalCharPosition = i + 1;
                            difference += i + 1 - openMarker.sourcePosition;

                            // Reset the state
                            openMarker = undefined;
                            state = State.none;
                        }
                        break;

                    case State.inSlashStarMarker:
                        if (previousChar === "*" && currentChar === "/") {
                            // Record the marker
                            // start + 2 to ignore the */, -1 on the end to ignore the * (/ is next)
                            const markerNameText = content.substring(openMarker.sourcePosition + 2, i - 1).trim();
                            const marker = recordMarker(fileName, openMarker, markerNameText, markerMap, markers);

                            if (openRanges.length > 0) {
                                openRanges[openRanges.length - 1].marker = marker;
                            }

                            // Set the current start to point to the end of the current marker to ignore its text
                            flush(openMarker.sourcePosition);
                            lastNormalCharPosition = i + 1;
                            difference += i + 1 - openMarker.sourcePosition;

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
        localRanges = localRanges.sort((a, b) => a.start < b.start ? -1 : 1);
        localRanges.forEach((r) => { ranges.push(r); });

        return {
            content: output,
            fileOptions: {},
            version: 0,
            fileName: fileName
        };
    }

    function repeatString(count: number, char: string) {
        let result = "";
        for (let i = 0; i < count; i++) {
            result += char;
        }
        return result;
    }

    function stringify(data: any, replacer?: (key: string, value: any) => any): string {
        return JSON.stringify(data, replacer, 2);
    }

    /** Collects an array of unique outputs. */
    function unique<T>(inputs: T[], getOutput: (t: T) => string): string[] {
        const set = ts.createMap<true>();
        for (const input of inputs) {
            const out = getOutput(input);
            set.set(out, true);
        }
        return ts.arrayFrom(set.keys());
    }

    function toArray<T>(x: T | T[]): T[] {
        return ts.isArray(x) ? x : [x];
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

        public marker(name?: string): FourSlash.Marker {
            return this.state.getMarkerByName(name);
        }

        public ranges(): FourSlash.Range[] {
            return this.state.getRanges();
        }

        public rangesByText(): ts.Map<FourSlash.Range[]> {
            return this.state.rangesByText();
        }

        public markerByName(s: string): FourSlash.Marker {
            return this.state.getMarkerByName(s);
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

        public eachMarker(action: () => void) {
            this.state.goToEachMarker(action);
        }

        public rangeStart(range: FourSlash.Range) {
            this.state.goToRangeStart(range);
        }

        public eachRange(action: () => void) {
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

        public position(position: number, fileIndex?: number): void;
        public position(position: number, fileName?: string): void;
        public position(position: number, fileNameOrIndex?: any): void {
            if (fileNameOrIndex !== undefined) {
                this.file(fileNameOrIndex);
            }
            this.state.goToPosition(position);
        }

        // Opens a file, given either its index as it
        // appears in the test source, or its filename
        // as specified in the test metadata
        public file(index: number, content?: string, scriptKindName?: string): void;
        public file(name: string, content?: string, scriptKindName?: string): void;
        public file(indexOrName: any, content?: string, scriptKindName?: string): void {
            this.state.openFile(indexOrName, content, scriptKindName);
        }
    }

    export class VerifyNegatable {
        public not: VerifyNegatable;
        public allowedClassElementKeywords = [
            "public",
            "private",
            "protected",
            "static",
            "abstract",
            "readonly",
            "get",
            "set",
            "constructor",
            "async"
        ];
        public allowedConstructorParameterKeywords = [
            "public",
            "private",
            "protected",
            "readonly",
        ];

        constructor(protected state: FourSlash.TestState, private negative = false) {
            if (!negative) {
                this.not = new VerifyNegatable(state, true);
            }
        }

        public completionListCount(expectedCount: number) {
            this.state.verifyCompletionListCount(expectedCount, this.negative);
        }

        // Verifies the completion list contains the specified symbol. The
        // completion list is brought up if necessary
        public completionListContains(symbol: string, text?: string, documentation?: string, kind?: string, spanIndex?: number) {
            if (this.negative) {
                this.state.verifyCompletionListDoesNotContain(symbol, text, documentation, kind, spanIndex);
            }
            else {
                this.state.verifyCompletionListContains(symbol, text, documentation, kind, spanIndex);
            }
        }

        // Verifies the completion list items count to be greater than the specified amount. The
        // completion list is brought up if necessary
        public completionListItemsCountIsGreaterThan(count: number) {
            this.state.verifyCompletionListItemsCountIsGreaterThan(count, this.negative);
        }

        public assertHasRanges(ranges: FourSlash.Range[]) {
            assert(ranges.length !== 0, "Array of ranges is expected to be non-empty");
        }

        public completionListIsEmpty() {
            this.state.verifyCompletionListIsEmpty(this.negative);
        }

        public completionListContainsClassElementKeywords() {
            for (const keyword of this.allowedClassElementKeywords) {
                this.completionListContains(keyword, keyword, /*documentation*/ undefined, "keyword");
            }
        }

        public completionListContainsConstructorParameterKeywords() {
            for (const keyword of this.allowedConstructorParameterKeywords) {
                this.completionListContains(keyword, keyword, /*documentation*/ undefined, "keyword");
            }
        }

        public completionListIsGlobal(expected: boolean) {
            this.state.verifyCompletionListIsGlobal(expected);
        }

        public completionListAllowsNewIdentifier() {
            this.state.verifyCompletionListAllowsNewIdentifier(this.negative);
        }

        public signatureHelpPresent() {
            this.state.verifySignatureHelpPresent(!this.negative);
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

        public codeFixAvailable() {
            this.state.verifyCodeFixAvailable(this.negative);
        }

        public applicableRefactorAvailableAtMarker(markerName: string) {
            this.state.verifyApplicableRefactorAvailableAtMarker(this.negative, markerName);
        }

        public applicableRefactorAvailableForRange() {
            this.state.verifyApplicableRefactorAvailableForRange(this.negative);
        }
    }

    export class Verify extends VerifyNegatable {
        constructor(state: FourSlash.TestState) {
            super(state);
        }

        public completionsAt(markerName: string, completions: string[]) {
            this.state.verifyCompletionsAt(markerName, completions);
        }

        public quickInfoIs(expectedText: string, expectedDocumentation?: string) {
            this.state.verifyQuickInfoString(expectedText, expectedDocumentation);
        }

        public quickInfoAt(markerName: string, expectedText?: string, expectedDocumentation?: string) {
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

        public goToDefinitionIs(endMarkers: string | string[]) {
            this.state.verifyGoToDefinitionIs(endMarkers);
        }

        public goToDefinition(startMarkerName: string | string[], endMarkerName: string | string[]): void;
        public goToDefinition(startsAndEnds: [string | string[], string | string[]][]): void;
        public goToDefinition(startsAndEnds: { [startMarkerName: string]: string | string[] }): void;
        public goToDefinition(arg0: any, endMarkerName?: string | string[]) {
            this.state.verifyGoToDefinition(arg0, endMarkerName);
        }

        public goToType(startMarkerName: string | string[], endMarkerName: string | string[]): void;
        public goToType(startsAndEnds: [string | string[], string | string[]][]): void;
        public goToType(startsAndEnds: { [startMarkerName: string]: string | string[] }): void;
        public goToType(arg0: any, endMarkerName?: string | string[]) {
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

        public referencesOf(start: FourSlash.Range, references: FourSlash.Range[]) {
            this.state.verifyReferencesOf(start, references);
        }

        public referenceGroups(startRanges: FourSlash.Range[], parts: Array<{ definition: string, ranges: FourSlash.Range[] }>) {
            this.state.verifyReferenceGroups(startRanges, parts);
        }

        public noReferences(markerNameOrRange?: string | FourSlash.Range) {
            this.state.verifyNoReferences(markerNameOrRange);
        }

        public singleReferenceGroup(definition: string, ranges?: FourSlash.Range[]) {
            this.state.verifySingleReferenceGroup(definition, ranges);
        }

        public rangesReferenceEachOther(ranges?: FourSlash.Range[]) {
            this.state.verifyRangesReferenceEachOther(ranges);
        }

        public findReferencesDefinitionDisplayPartsAtCaretAre(expected: ts.SymbolDisplayPart[]) {
            this.state.verifyDisplayPartsOfReferencedSymbol(expected);
        }

        public currentParameterHelpArgumentNameIs(name: string) {
            this.state.verifyCurrentParameterHelpName(name);
        }

        public currentParameterSpanIs(parameter: string) {
            this.state.verifyCurrentParameterSpanIs(parameter);
        }

        public currentParameterHelpArgumentDocCommentIs(docComment: string) {
            this.state.verifyCurrentParameterHelpDocComment(docComment);
        }

        public currentSignatureHelpDocCommentIs(docComment: string) {
            this.state.verifyCurrentSignatureHelpDocComment(docComment);
        }

        public currentSignatureHelpTagsAre(tags: ts.JSDocTagInfo[]) {
            this.state.verifyCurrentSignatureHelpTags(tags);
        }

        public signatureHelpCountIs(expected: number) {
            this.state.verifySignatureHelpCount(expected);
        }

        public signatureHelpCurrentArgumentListIsVariadic(expected: boolean) {
            this.state.verifyCurrentSignatureHelpIsVariadic(expected);
        }

        public signatureHelpArgumentCountIs(expected: number) {
            this.state.verifySignatureHelpArgumentCount(expected);
        }

        public currentSignatureParameterCountIs(expected: number) {
            this.state.verifyCurrentSignatureHelpParameterCount(expected);
        }

        public currentSignatureHelpIs(expected: string) {
            this.state.verifyCurrentSignatureHelpIs(expected);
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

        public baselineGetEmitOutput() {
            this.state.baselineGetEmitOutput();
        }

        public baselineQuickInfo() {
            this.state.baselineQuickInfo();
        }

        public nameOrDottedNameSpanTextIs(text: string) {
            this.state.verifyCurrentNameOrDottedNameSpanText(text);
        }

        public outliningSpansInCurrentFile(spans: FourSlash.TextSpan[]) {
            this.state.verifyOutliningSpans(spans);
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

        public DocCommentTemplate(expectedText: string, expectedOffset: number, empty?: boolean) {
            this.state.verifyDocCommentTemplate(empty ? undefined : { newText: expectedText, caretOffset: expectedOffset });
        }

        public noDocCommentTemplate() {
            this.DocCommentTemplate(/*expectedText*/ undefined, /*expectedOffset*/ undefined, /*empty*/ true);
        }

        public rangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void {
            this.state.verifyRangeAfterCodeFix(expectedText, includeWhiteSpace, errorCode, index);
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

        public importFixAtPosition(expectedTextArray: string[], errorCode?: number): void {
            this.state.verifyImportFixAtPosition(expectedTextArray, errorCode);
        }

        public navigationBar(json: any) {
            this.state.verifyNavigationBar(json);
        }

        public navigationTree(json: any) {
            this.state.verifyNavigationTree(json);
        }

        public navigationItemsListCount(count: number, searchValue: string, matchKind?: string, fileName?: string) {
            this.state.verifyNavigationItemsCount(count, searchValue, matchKind, fileName);
        }

        public navigationItemsListContains(
            name: string,
            kind: string,
            searchValue: string,
            matchKind: string,
            fileName?: string,
            parentName?: string) {
            this.state.verifyNavigationItemsListContains(
                name,
                kind,
                searchValue,
                matchKind,
                fileName,
                parentName);
        }

        public occurrencesAtPositionContains(range: FourSlash.Range, isWriteAccess?: boolean) {
            this.state.verifyOccurrencesAtPositionListContains(range.fileName, range.start, range.end, isWriteAccess);
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

        public rangesAreDocumentHighlights(ranges?: FourSlash.Range[]) {
            this.state.verifyRangesAreDocumentHighlights(ranges);
        }

        public rangesWithSameTextAreDocumentHighlights() {
            this.state.verifyRangesWithSameTextAreDocumentHighlights();
        }

        public documentHighlightsOf(startRange: FourSlash.Range, ranges: FourSlash.Range[]) {
            this.state.verifyDocumentHighlightsOf(startRange, ranges);
        }

        public completionEntryDetailIs(entryName: string, text: string, documentation?: string, kind?: string, tags?: ts.JSDocTagInfo[]) {
            this.state.verifyCompletionEntryDetails(entryName, text, documentation, kind, tags);
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

        public renameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string) {
            this.state.verifyRenameInfoSucceeded(displayName, fullDisplayName, kind, kindModifiers);
        }

        public renameInfoFailed(message?: string) {
            this.state.verifyRenameInfoFailed(message);
        }

        public renameLocations(startRanges: FourSlash.Range | FourSlash.Range[], options: FourSlash.Range[] | { findInStrings?: boolean, findInComments?: boolean, ranges: FourSlash.Range[] }) {
            this.state.verifyRenameLocations(startRanges, options);
        }

        public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: { start: number; length: number; },
            displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]) {
            this.state.verifyQuickInfoDisplayParts(kind, kindModifiers, textSpan, displayParts, documentation, tags);
        }

        public getSyntacticDiagnostics(expected: string) {
            this.state.getSyntacticDiagnostics(expected);
        }

        public getSemanticDiagnostics(expected: string) {
            this.state.getSemanticDiagnostics(expected);
        }

        public ProjectInfo(expected: string[]) {
            this.state.verifyProjectInfo(expected);
        }

        public allRangesAppearInImplementationList(markerName: string) {
            this.state.verifyRangesInImplementationList(markerName);
        }
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
    }

    export class Debug {
        constructor(private state: FourSlash.TestState) {
        }

        public printCurrentParameterHelp() {
            this.state.printCurrentParameterHelp();
        }

        public printCurrentFileState() {
            this.state.printCurrentFileState();
        }

        public printCurrentFileStateWithWhitespace() {
            this.state.printCurrentFileState(/*makeWhitespaceVisible*/ true);
        }

        public printCurrentFileStateWithoutCaret() {
            this.state.printCurrentFileState(/*makeWhitespaceVisible*/ false, /*makeCaretVisible*/ false);
        }

        public printCurrentQuickInfo() {
            this.state.printCurrentQuickInfo();
        }

        public printCurrentSignatureHelp() {
            this.state.printCurrentSignatureHelp();
        }

        public printCompletionListMembers() {
            this.state.printCompletionListMembers();
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
            this.state.formatCodeSettings[name] = value;
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
            return {
                classificationType,
                text: text,
                textSpan: position === undefined ? undefined : { start: position, end: position + text.length }
            };
        }
    }
}
