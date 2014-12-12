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

/// <reference path='..\services\services.ts' />
/// <reference path='harnessLanguageService.ts' />
/// <reference path='harness.ts' />

module FourSlash {
    // Represents a parsed source file with metadata
    export interface FourSlashFile {
        // The contents of the file (with markers, etc stripped out)
        content: string;

        fileName: string;

        // File-specific options (name/value pairs)
        fileOptions: { [index: string]: string; };
    }

    // Represents a set of parsed source files and options
    export interface FourSlashData {
        // Global options (name/value pairs)
        globalOptions: { [index: string]: string; };

        files: FourSlashFile[];

        // A mapping from marker names to name/position pairs
        markerPositions: { [index: string]: Marker; };

        markers: Marker[];

        ranges: Range[];
    }

    export interface TestXmlData {
        invalidReason: string;
        originalName: string;
        actions: string[];
    }

    interface MemberListData {
        result: {
            maybeInaccurate: boolean;
            isMemberCompletion: boolean;
            entries: {
                name: string;
                type: string;
                kind: string;
                kindModifiers: string;
            }[];
        };
    }

    export interface Marker {
        fileName: string;
        position: number;
        data?: any;
    }

    interface MarkerMap {
        [index: string]: Marker;
    }

    export interface Range {
        fileName: string;
        start: number;
        end: number;
        marker?: Marker;
    }

    interface ILocationInformation {
        position: number;
        sourcePosition: number;
        sourceLine: number;
        sourceColumn: number;
    }

    interface IRangeLocationInformation extends ILocationInformation {
        marker?: Marker;
    }

    export interface TextSpan {
        start: number;
        end: number;
    }

    export enum IncrementalEditValidation {
        None,
        SyntacticOnly,
        Complete
    }

    export enum TypingFidelity {
        /// Performs typing and formatting (if formatting is enabled)
        Low,
        /// Performs typing, checks completion lists, signature help, and formatting (if enabled)
        High
    }

    var entityMap: ts.Map<string> = {
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#47;',
        '<': '&lt;',
        '>': '&gt;'
    };

    export function escapeXmlAttributeValue(s: string) {
        return s.replace(/[&<>"'\/]/g, ch => entityMap[ch]);
    }

    // Name of testcase metadata including ts.CompilerOptions properties that will be used by globalOptions
    // To add additional option, add property into the testOptMetadataNames, refer the property in either globalMetadataNames or fileMetadataNames
    // Add cases into convertGlobalOptionsToCompilationsSettings function for the compiler to acknowledge such option from meta data
    var testOptMetadataNames = {
       baselineFile: 'BaselineFile',  
       declaration: 'declaration',
       emitThisFile: 'emitThisFile',  // This flag is used for testing getEmitOutput feature. It allows test-cases to indicate what file to be output in multiple files project
       filename: 'Filename',
       mapRoot: 'mapRoot',
       module: 'module',
       out: 'out',
       outDir: 'outDir',
       sourceMap: 'sourceMap',
       sourceRoot: 'sourceRoot',
       resolveReference: 'ResolveReference',  // This flag is used to specify entry file for resolve file references. The flag is only allow once per test file
    };

    // List of allowed metadata names
    var fileMetadataNames = [testOptMetadataNames.filename, testOptMetadataNames.emitThisFile, testOptMetadataNames.resolveReference];
    var globalMetadataNames = [testOptMetadataNames.baselineFile,  testOptMetadataNames.declaration,
        testOptMetadataNames.mapRoot, testOptMetadataNames.module, testOptMetadataNames.out,
        testOptMetadataNames.outDir, testOptMetadataNames.sourceMap, testOptMetadataNames.sourceRoot]

    function convertGlobalOptionsToCompilerOptions(globalOptions: { [idx: string]: string }): ts.CompilerOptions {
        var settings: ts.CompilerOptions = {};
        // Convert all property in globalOptions into ts.CompilationSettings
        for (var prop in globalOptions) {
            if (globalOptions.hasOwnProperty(prop)) {
                switch (prop) {
                    case testOptMetadataNames.declaration:
                        settings.declaration = true;
                        break;
                    case testOptMetadataNames.mapRoot:
                        settings.mapRoot = globalOptions[prop];
                        break;
                    case testOptMetadataNames.module:
                        // create appropriate external module target for CompilationSettings
                        switch (globalOptions[prop]) {
                          case "AMD":
                            settings.module = ts.ModuleKind.AMD;
                            break;
                          case "CommonJS":
                            settings.module = ts.ModuleKind.CommonJS;
                            break;
                          default:
                            ts.Debug.assert(globalOptions[prop] === undefined || globalOptions[prop] === "None");
                            settings.module = ts.ModuleKind.None;
                            break;
                        }
                        break;
                    case testOptMetadataNames.out:
                        settings.out = globalOptions[prop];
                        break;
                    case testOptMetadataNames.outDir:
                        settings.outDir = globalOptions[prop];
                        break;
                    case testOptMetadataNames.sourceMap:
                        settings.sourceMap = true;
                        break;
                    case testOptMetadataNames.sourceRoot:
                        settings.sourceRoot = globalOptions[prop];
                        break;
                }
            }
        }
        return settings;
    }

    export var currentTestState: TestState = null;
    function assertionMessage(msg: string) {
        return "\nMarker: " + currentTestState.lastKnownMarker + "\nChecking: " + msg + "\n\n";
    }

    export class TestCancellationToken implements ts.CancellationToken {
        // 0 - cancelled
        // >0 - not cancelled 
        // <0 - not cancelled and value denotes number of isCancellationRequested after which token become cancelled
        private static NotCancelled: number = -1;
        private numberOfCallsBeforeCancellation: number = TestCancellationToken.NotCancelled;
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

        public setCancelled(numberOfCalls: number = 0): void {
            ts.Debug.assert(numberOfCalls >= 0);
            this.numberOfCallsBeforeCancellation = numberOfCalls;
        }

        public resetCancelled(): void {
            this.numberOfCallsBeforeCancellation = TestCancellationToken.NotCancelled;
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
            getText: (start: number, end: number) => {
                return sourceText.substr(start, end - start);
            },
            getLength: () => {
                return sourceText.length;
            },
            getLineStartPositions: () => {
                return <number[]>[];
            },
            getChangeRange: (oldSnapshot: ts.IScriptSnapshot) => {
                return <ts.TextChangeRange>undefined;
            }
        };
    }

    export class TestState {
        // Language service instance
        public languageServiceShimHost: Harness.LanguageService.TypeScriptLS;
        private languageService: ts.LanguageService;

        // A reference to the language service's compiler state's compiler instance
        private compiler: () => { getSyntaxTree(fileName: string): ts.SourceFile };

        // The current caret position in the active file
        public currentCaretPosition = 0;
        public lastKnownMarker: string = "";

        // The file that's currently 'opened'
        public activeFile: FourSlashFile = null;

        // Whether or not we should format on keystrokes
        public enableFormatting = true;

        public formatCodeOptions: ts.FormatCodeOptions;

        public cancellationToken: TestCancellationToken;

        public editValidation = IncrementalEditValidation.Complete;
        public typingFidelity = TypingFidelity.Low;

        private scenarioActions: string[] = [];
        private taoInvalidReason: string = null;

        private inputFiles: ts.Map<string> = {};  // Map between inputFile's filename and its content for easily looking up when resolving references
        
        // Add input file which has matched file name with the given reference-file path.
        // This is necessary when resolveReference flag is specified
        private addMatchedInputFile(referenceFilePath: string) {
            var inputFile = this.inputFiles[referenceFilePath];
            if (inputFile && !Harness.isLibraryFile(referenceFilePath)) {
                this.languageServiceShimHost.addScript(referenceFilePath, inputFile);
            }
        }

        constructor(public testData: FourSlashData) {
            // Initialize the language service with all the scripts
            this.cancellationToken = new TestCancellationToken();
            this.languageServiceShimHost = new Harness.LanguageService.TypeScriptLS(this.cancellationToken);

            var compilationSettings = convertGlobalOptionsToCompilerOptions(this.testData.globalOptions);
            this.languageServiceShimHost.setCompilationSettings(compilationSettings);

            var startResolveFileRef: FourSlashFile = undefined;

            ts.forEach(testData.files, file => {
                // Create map between fileName and its content for easily looking up when resolveReference flag is specified
                this.inputFiles[file.fileName] = file.content;
                if (!startResolveFileRef && file.fileOptions[testOptMetadataNames.resolveReference]) {
                    startResolveFileRef = file;
                } else if (startResolveFileRef) {
                    // If entry point for resolving file references is already specified, report duplication error
                    throw new Error("There exists a Fourslash file which has resolveReference flag specified; remove duplicated resolveReference flag");
                }
            });

            if (startResolveFileRef) {
                // Add the entry-point file itself into the languageServiceShimHost
                this.languageServiceShimHost.addScript(startResolveFileRef.fileName, startResolveFileRef.content);

                var jsonResolvedResult = JSON.parse(this.languageServiceShimHost.getCoreService().getPreProcessedFileInfo(startResolveFileRef.fileName,
                    createScriptSnapShot(startResolveFileRef.content)));
                var resolvedResult = jsonResolvedResult.result;
                var referencedFiles: ts.IFileReference[] = resolvedResult.referencedFiles;
                var importedFiles: ts.IFileReference[] = resolvedResult.importedFiles;

                // Add triple reference files into language-service host
                ts.forEach(referencedFiles, referenceFile => {
                    // Fourslash insert tests/cases/fourslash into inputFile.unitName so we will properly append the same base directory to refFile path
                    var referenceFilePath = "tests/cases/fourslash/" + referenceFile.path;
                    this.addMatchedInputFile(referenceFilePath);
                });

                // Add import files into language-service host
                ts.forEach(importedFiles, importedFile => {
                    // Fourslash insert tests/cases/fourslash into inputFile.unitName and import statement doesn't require ".ts"
                    // so convert them before making appropriate comparison
                    var importedFilePath = "tests/cases/fourslash/" + importedFile.path + ".ts";
                    this.addMatchedInputFile(importedFilePath);
                });

                // Check if no-default-lib flag is false and if so add default library
                if (!resolvedResult.isLibFile) {
                    this.languageServiceShimHost.addDefaultLibrary();
                }
            } else {
                // resolveReference file-option is not specified then do not resolve any files and include all inputFiles
                ts.forEachKey(this.inputFiles, fileName => {
                    if (!Harness.isLibraryFile(fileName)) {
                        this.languageServiceShimHost.addScript(fileName, this.inputFiles[fileName]);
                    }
                });
                this.languageServiceShimHost.addDefaultLibrary();
            }

            // Sneak into the language service and get its compiler so we can examine the syntax trees
            this.languageService = this.languageServiceShimHost.getLanguageService().languageService;
            var compilerState = (<any>this.languageService).compiler;
            this.compiler = () => compilerState.compiler;

            this.formatCodeOptions = {
                IndentSize: 4,
                TabSize: 4,
                NewLineCharacter: ts.sys.newLine,
                ConvertTabsToSpaces: true,
                InsertSpaceAfterCommaDelimiter: true,
                InsertSpaceAfterSemicolonInForStatements: true,
                InsertSpaceBeforeAndAfterBinaryOperators: true,
                InsertSpaceAfterKeywordsInControlFlowStatements: true,
                InsertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
                InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
                PlaceOpenBraceOnNewLineForFunctions: false,
                PlaceOpenBraceOnNewLineForControlBlocks: false,
            };

            this.testData.files.forEach(file => {
                var filename = file.fileName.replace(Harness.IO.directoryName(file.fileName), '').substr(1);
                var filenameWithoutExtension = filename.substr(0, filename.lastIndexOf("."));
                this.scenarioActions.push('<CreateFileOnDisk FileId="' + filename + '" FileNameWithoutExtension="' + filenameWithoutExtension + '" FileExtension=".ts"><![CDATA[' + file.content + ']]></CreateFileOnDisk>');
            });

            // Open the first file by default
            this.openFile(0);
        }

        // Entry points from fourslash.ts
        public goToMarker(name = '') {
            var marker = this.getMarkerByName(name);
            if (this.activeFile.fileName !== marker.fileName) {
                this.openFile(marker.fileName);
            }

            var scriptSnapshot = this.languageServiceShimHost.getScriptSnapshot(marker.fileName);
            if (marker.position === -1 || marker.position > scriptSnapshot.getLength()) {
                throw new Error('Marker "' + name + '" has been invalidated by unrecoverable edits to the file.');
            }
            this.lastKnownMarker = name;
            this.goToPosition(marker.position);
        }

        public goToPosition(pos: number) {
            this.currentCaretPosition = pos;

            var lineStarts = ts.computeLineStarts(this.getCurrentFileContent());
            var lineCharPos = ts.getLineAndCharacterOfPosition(lineStarts, pos);
            this.scenarioActions.push('<MoveCaretToLineAndChar LineNumber="' + lineCharPos.line + '" CharNumber="' + lineCharPos.character + '" />');
        }

        public moveCaretRight(count = 1) {
            this.currentCaretPosition += count;
            this.currentCaretPosition = Math.min(this.currentCaretPosition, this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName).getLength());
            if (count > 0) {
                this.scenarioActions.push('<MoveCaretRight NumberOfChars="' + count + '" />');
            } else {
                this.scenarioActions.push('<MoveCaretLeft NumberOfChars="' + (-count) + '" />');
            }
        }

        // Opens a file given its 0-based index or fileName
        public openFile(index: number): void;
        public openFile(name: string): void;
        public openFile(indexOrName: any) {
            var fileToOpen: FourSlashFile = this.findFile(indexOrName);
            fileToOpen.fileName = ts.normalizeSlashes(fileToOpen.fileName);
            this.activeFile = fileToOpen;
            var filename = fileToOpen.fileName.replace(Harness.IO.directoryName(fileToOpen.fileName), '').substr(1);
            this.scenarioActions.push('<OpenFile FileName="" SrcFileId="' + filename + '" FileId="' + filename + '" />');
        }

        public verifyErrorExistsBetweenMarkers(startMarkerName: string, endMarkerName: string, negative: boolean) {
            var startMarker = this.getMarkerByName(startMarkerName);
            var endMarker = this.getMarkerByName(endMarkerName);
            var predicate = function (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) {
                return ((errorMinChar === startPos) && (errorLimChar === endPos)) ? true : false;
            };

            var exists = this.anyErrorInRange(predicate, startMarker, endMarker);

            this.taoInvalidReason = 'verifyErrorExistsBetweenMarkers NYI';

            if (exists !== negative) {
                this.printErrorLog(negative, this.getAllDiagnostics());
                throw new Error("Failure between markers: " + startMarkerName + ", " + endMarkerName);
            }
        }

        private raiseError(message: string) {
            message = this.messageAtLastKnownMarker(message);
            throw new Error(message);
        }

        private messageAtLastKnownMarker(message: string) {
            return "Marker: " + currentTestState.lastKnownMarker + "\n" + message;
        }

        private getDiagnostics(fileName: string): ts.Diagnostic[] {
            var syntacticErrors = this.languageService.getSyntacticDiagnostics(fileName);
            var semanticErrors = this.languageService.getSemanticDiagnostics(fileName);

            var diagnostics: ts.Diagnostic[] = [];
            diagnostics.push.apply(diagnostics, syntacticErrors);
            diagnostics.push.apply(diagnostics, semanticErrors);

            return diagnostics;
        }

        private getAllDiagnostics(): ts.Diagnostic[] {
            var diagnostics: ts.Diagnostic[] = [];

            var fileNames = JSON.parse(this.languageServiceShimHost.getScriptFileNames());
            for (var i = 0, n = fileNames.length; i < n; i++) {
                diagnostics.push.apply(this.getDiagnostics(fileNames[i]));
            }

            return diagnostics;
        }

        public verifyErrorExistsAfterMarker(markerName: string, negative: boolean, after: boolean) {
            var marker: Marker = this.getMarkerByName(markerName);
            var predicate: (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) => boolean;

            if (after) {
                predicate = function (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) {
                    return ((errorMinChar >= startPos) && (errorLimChar >= startPos)) ? true : false;
                };
            } else {
                predicate = function (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) {
                    return ((errorMinChar <= startPos) && (errorLimChar <= startPos)) ? true : false;
                };
            }

            this.taoInvalidReason = 'verifyErrorExistsAfterMarker NYI';

            var exists = this.anyErrorInRange(predicate, marker);
            var diagnostics = this.getAllDiagnostics();

            if (exists !== negative) {
                this.printErrorLog(negative, diagnostics);
                throw new Error("Failure at marker: " + markerName);
            }
        }

        private anyErrorInRange(predicate: (errorMinChar: number, errorLimChar: number, startPos: number, endPos: number) => boolean, startMarker: Marker, endMarker?: Marker) {

            var errors = this.getDiagnostics(startMarker.fileName);
            var exists = false;

            var startPos = startMarker.position;
            if (endMarker !== undefined) {
                var endPos = endMarker.position;
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
            } else {
                Harness.IO.log("Unexpected error(s) found.  Error list is:");
            }

            errors.forEach(function (error: ts.Diagnostic) {
                Harness.IO.log("  minChar: " + error.start + ", limChar: " + (error.start + error.length) + ", message: " + error.messageText + "\n");
            });
        }

        public verifyNumberOfErrorsInCurrentFile(expected: number) {
            var errors = this.getDiagnostics(this.activeFile.fileName);
            var actual = errors.length;

            this.scenarioActions.push('<CheckErrorList ExpectedNumOfErrors="' + expected + '" />');

            if (actual !== expected) {
                this.printErrorLog(false, errors);
                var errorMsg = "Actual number of errors (" + actual + ") does not match expected number (" + expected + ")";
                Harness.IO.log(errorMsg);
                this.raiseError(errorMsg);
            }
        }

        public verifyEval(expr: string, value: any) {
            var emit = this.languageService.getEmitOutput(this.activeFile.fileName);
            if (emit.outputFiles.length !== 1) {
                throw new Error("Expected exactly one output from emit of " + this.activeFile.fileName);
            }

            this.taoInvalidReason = 'verifyEval impossible';

            var evaluation = new Function(emit.outputFiles[0].text + ';\r\nreturn (' + expr + ');')();
            if (evaluation !== value) {
                this.raiseError('Expected evaluation of expression "' + expr + '" to equal "' + value + '", but got "' + evaluation + '"');
            }
        }

        public verifyMemberListContains(symbol: string, text?: string, documentation?: string, kind?: string) {
            this.scenarioActions.push('<ShowCompletionList />');
            this.scenarioActions.push('<VerifyCompletionContainsItem ItemName="' + symbol + '"/>');

            if (text || documentation || kind) {
                this.taoInvalidReason = 'verifyMemberListContains only supports the "symbol" parameter';
            }

            var members = this.getMemberListAtCaret();
            if (members) {
                this.assertItemInCompletionList(members.entries, symbol, text, documentation, kind);
            }
            else {
                this.raiseError("Expected a member list, but none was provided");
            }
        }

        public verifyMemberListCount(expectedCount: number, negative: boolean) {
            if (expectedCount === 0) {
                if (negative) {
                    this.verifyMemberListIsEmpty(false);
                    return;
                } else {
                    this.scenarioActions.push('<ShowCompletionList />');
                }
            } else {
                this.scenarioActions.push('<ShowCompletionList />');
                this.scenarioActions.push('<VerifyCompletionItemsCount Count="' + expectedCount + '" ' + (negative ? 'ExpectsFailure="true"' : '') + ' />');
            }

            var members = this.getMemberListAtCaret();

            if (members) {
                var match = members.entries.length === expectedCount;

                if ((!match && !negative) || (match && negative)) {
                    this.raiseError("Member list count was " + members.entries.length + ". Expected " + expectedCount);
                }
            }
            else if (expectedCount) {
                this.raiseError("Member list count was 0. Expected " + expectedCount);
            }
        }

        public verifyMemberListDoesNotContain(symbol: string) {
            this.scenarioActions.push('<ShowCompletionList />');
            this.scenarioActions.push('<VerifyCompletionDoesNotContainItem ItemName="' + escapeXmlAttributeValue(symbol) + '" />');

            var members = this.getMemberListAtCaret();
            if (members.entries.filter(e => e.name === symbol).length !== 0) {
                this.raiseError('Member list did contain ' + symbol);
            }
        }

        public verifyCompletionListItemsCountIsGreaterThan(count: number) {
            this.taoInvalidReason = 'verifyCompletionListItemsCountIsGreaterThan NYI';

            var completions = this.getCompletionListAtCaret();
            var itemsCount = completions.entries.length;

            if (itemsCount <= count) {
                this.raiseError('Expected completion list items count to be greater than ' + count + ', but is actually ' + itemsCount);
            }
        }

        public verifyMemberListIsEmpty(negative: boolean) {
            if (negative) {
                this.scenarioActions.push('<ShowCompletionList />');
            } else {
                this.scenarioActions.push('<ShowCompletionList ExpectsFailure="true" />');
            }

            var members = this.getMemberListAtCaret();
            if ((!members || members.entries.length === 0) && negative) {
                this.raiseError("Member list is empty at Caret");
            } else if ((members && members.entries.length !== 0) && !negative) {

                var errorMsg = "\n" + "Member List contains: [" + members.entries[0].name;
                for (var i = 1; i < members.entries.length; i++) {
                    errorMsg += ", " + members.entries[i].name;
                }
                errorMsg += "]\n";

                Harness.IO.log(errorMsg);
                this.raiseError("Member list is not empty at Caret");

            }
        }

        public verifyCompletionListIsEmpty(negative: boolean) {
            this.scenarioActions.push('<ShowCompletionList ExpectsFailure="true" />');

            var completions = this.getCompletionListAtCaret();
            if ((!completions || completions.entries.length === 0) && negative) {
                this.raiseError("Completion list is empty at Caret");
            } else if ((completions && completions.entries.length !== 0) && !negative) {

                var errorMsg = "\n" + "Completion List contains: [" + completions.entries[0].name;
                for (var i = 1; i < completions.entries.length; i++) {
                    errorMsg += ", " + completions.entries[i].name;
                }
                errorMsg += "]\n";

                Harness.IO.log(errorMsg);
                this.raiseError("Completion list is not empty at Caret");

            }
        }

        public verifyCompletionListContains(symbol: string, text?: string, documentation?: string, kind?: string) {
            var completions = this.getCompletionListAtCaret();
            this.assertItemInCompletionList(completions.entries, symbol, text, documentation, kind);
        }

        public verifyCompletionListDoesNotContain(symbol: string) {
            this.scenarioActions.push('<ShowCompletionList />');
            this.scenarioActions.push('<VerifyCompletionDoesNotContainItem ItemName="' + escapeXmlAttributeValue(symbol) + '" />');

            var completions = this.getCompletionListAtCaret();
            if (completions && completions.entries && completions.entries.filter(e => e.name === symbol).length !== 0) {
                this.raiseError('Completion list did contain ' + symbol);
            }
        }

        public verifyCompletionEntryDetails(entryName: string, expectedText: string, expectedDocumentation?: string, kind?: string) {
            this.taoInvalidReason = 'verifyCompletionEntryDetails NYI';

            var details = this.getCompletionEntryDetails(entryName);

            assert.equal(ts.displayPartsToString(details.displayParts), expectedText, assertionMessage("completion entry details text"));

            if (expectedDocumentation !== undefined) {
                assert.equal(ts.displayPartsToString(details.documentation), expectedDocumentation, assertionMessage("completion entry documentation"));
            }

            if (kind !== undefined) {
                assert.equal(details.kind, kind, assertionMessage("completion entry kind"));
            }
        }

        public verifyReferencesAtPositionListContains(fileName: string, start: number, end: number, isWriteAccess?: boolean) {
            this.taoInvalidReason = 'verifyReferencesAtPositionListContains NYI';

            var references = this.getReferencesAtCaret();

            if (!references || references.length === 0) {
                this.raiseError('verifyReferencesAtPositionListContains failed - found 0 references, expected at least one.');
            }

            for (var i = 0; i < references.length; i++) {
                var reference = references[i];
                if (reference && reference.fileName === fileName && reference.textSpan.start() === start && reference.textSpan.end() === end) {
                    if (typeof isWriteAccess !== "undefined" && reference.isWriteAccess !== isWriteAccess) {
                        this.raiseError('verifyReferencesAtPositionListContains failed - item isWriteAccess value doe not match, actual: ' + reference.isWriteAccess + ', expected: ' + isWriteAccess + '.');
                    }
                    return;
                }
            }

            var missingItem = { fileName: fileName, start: start, end: end, isWriteAccess: isWriteAccess };
            this.raiseError('verifyReferencesAtPositionListContains failed - could not find the item: ' + JSON.stringify(missingItem) + ' in the returned list: (' + JSON.stringify(references) + ')');
        }

        public verifyReferencesCountIs(count: number, localFilesOnly: boolean = true) {
            this.taoInvalidReason = 'verifyReferences NYI';

            var references = this.getReferencesAtCaret();
            var referencesCount = 0;

            if (localFilesOnly) {
                var localFiles = this.testData.files.map<string>(file => file.fileName);
                // Count only the references in local files. Filter the ones in lib and other files.
                ts.forEach(references, entry => {
                    if (localFiles.some((filename) => filename === entry.fileName)) {
                        ++referencesCount;
                    }
                });
            }
            else {
                referencesCount = references && references.length || 0;
            }

            if (referencesCount !== count) {
                var condition = localFilesOnly ? "excluding libs" : "including libs";
                this.raiseError("Expected references count (" + condition + ") to be " + count + ", but is actually " + referencesCount);
            }
        }

        private getMemberListAtCaret() {
            return this.languageService.getCompletionsAtPosition(this.activeFile.fileName, this.currentCaretPosition);
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

        private assertionMessage(name: string, actualValue: any, expectedValue: any) {
            return "\nActual " + name + ":\n\t" + actualValue + "\nExpected value:\n\t" + expectedValue;
        }

        public verifyQuickInfoString(negative: boolean, expectedText?: string, expectedDocumentation?: string) {
        [expectedText, expectedDocumentation].forEach(str => {
                if (str) {
                    this.scenarioActions.push('<ShowQuickInfo />');
                    this.scenarioActions.push('<VerifyQuickInfoTextContains IgnoreSpacing="true" Text="' + escapeXmlAttributeValue(str) + '" ' + (negative ? 'ExpectsFailure="true"' : '') + ' />');
                }
            });

            var actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            var actualQuickInfoText = actualQuickInfo ? ts.displayPartsToString(actualQuickInfo.displayParts) : "";
            var actualQuickInfoDocumentation = actualQuickInfo ? ts.displayPartsToString(actualQuickInfo.documentation) : "";

            if (negative) {
                if (expectedText !== undefined) {
                    assert.notEqual(actualQuickInfoText, expectedText, this.messageAtLastKnownMarker("quick info text"));
                }
                if (expectedDocumentation != undefined) {
                    assert.notEqual(actualQuickInfoDocumentation, expectedDocumentation, this.messageAtLastKnownMarker("quick info doc comment"));
                }
            } else {
                if (expectedText !== undefined) {
                    assert.equal(actualQuickInfoText, expectedText, this.messageAtLastKnownMarker("quick info text"));
                }
                if (expectedDocumentation != undefined) {
                    assert.equal(actualQuickInfoDocumentation, expectedDocumentation, assertionMessage("quick info doc"));
                }
            }
        }


        public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: { start: number; length: number; },
            displayParts: ts.SymbolDisplayPart[],
            documentation: ts.SymbolDisplayPart[]) {
            this.scenarioActions.push('<ShowQuickInfo />');
            this.scenarioActions.push('<Verify return values of quickInfo="' + JSON.stringify(displayParts) + '"/>');

            function getDisplayPartsJson(displayParts: ts.SymbolDisplayPart[]) {
                var result = "";
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

            var actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            assert.equal(actualQuickInfo.kind, kind, this.messageAtLastKnownMarker("QuickInfo kind"));
            assert.equal(actualQuickInfo.kindModifiers, kindModifiers, this.messageAtLastKnownMarker("QuickInfo kindModifiers"));
            assert.equal(JSON.stringify(actualQuickInfo.textSpan), JSON.stringify(textSpan), this.messageAtLastKnownMarker("QuickInfo textSpan"));
            assert.equal(getDisplayPartsJson(actualQuickInfo.displayParts), getDisplayPartsJson(displayParts), this.messageAtLastKnownMarker("QuickInfo displayParts"));
            assert.equal(getDisplayPartsJson(actualQuickInfo.documentation), getDisplayPartsJson(documentation), this.messageAtLastKnownMarker("QuickInfo documentation"));
        }

        public verifyRenameLocations(findInStrings: boolean, findInComments: boolean) {
            var renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
            if (renameInfo.canRename) {
                var references = this.languageService.findRenameLocations(
                    this.activeFile.fileName, this.currentCaretPosition, findInStrings, findInComments);

                var ranges = this.getRanges();
                if (ranges.length !== references.length) {
                    this.raiseError(this.assertionMessage("Rename locations", references.length, ranges.length));
                }

                ranges = ranges.sort((r1, r2) => r1.start - r2.start);
                references = references.sort((r1, r2) => r1.textSpan.start() - r2.textSpan.start());

                for (var i = 0, n = ranges.length; i < n; i++) {
                    var reference = references[i];
                    var range = ranges[i];

                    if (reference.textSpan.start() !== range.start ||
                        reference.textSpan.end() !== range.end) {

                        this.raiseError(this.assertionMessage("Rename location",
                            "[" + reference.textSpan.start() + "," + reference.textSpan.end() + ")",
                            "[" + range.start + "," + range.end + ")"));
                    }
                }
            }
            else {
                this.raiseError("Expected rename to succeed, but it actually failed.");
            }
        }

        public verifyQuickInfoExists(negative: boolean) {
            this.taoInvalidReason = 'verifyQuickInfoExists NYI';

            var actualQuickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (negative) {
                if (actualQuickInfo) {
                    this.raiseError('verifyQuickInfoExists failed. Expected quick info NOT to exist');
                }
            }
            else {
                if (!actualQuickInfo) {
                    this.raiseError('verifyQuickInfoExists failed. Expected quick info to exist');
                }
            }
        }

        public verifyCurrentSignatureHelpIs(expected: string) {
            this.taoInvalidReason = 'verifyCurrentSignatureHelpIs NYI';

            var help = this.getActiveSignatureHelpItem();
            assert.equal(
                ts.displayPartsToString(help.prefixDisplayParts) + 
                help.parameters.map(p => ts.displayPartsToString(p.displayParts)).join(ts.displayPartsToString(help.separatorDisplayParts)) + 
                ts.displayPartsToString(help.suffixDisplayParts), expected);
        }

        public verifyCurrentParameterIsVariable(isVariable: boolean) {
            this.taoInvalidReason = 'verifyCurrentParameterIsVariable NYI';

            var signature = this.getActiveSignatureHelpItem();
            assert.isNotNull(signature);
            assert.equal(isVariable, signature.isVariadic);
        }

        public verifyCurrentParameterHelpName(name: string) {
            this.taoInvalidReason = 'verifyCurrentParameterHelpName NYI';

            var activeParameter = this.getActiveParameter();
            var activeParameterName = activeParameter.name;
            assert.equal(activeParameterName, name);
        }

        public verifyCurrentParameterSpanIs(parameter: string) {
            this.taoInvalidReason = 'verifyCurrentParameterSpanIs NYI';

            var activeSignature = this.getActiveSignatureHelpItem();
            var activeParameter = this.getActiveParameter();
            assert.equal(ts.displayPartsToString(activeParameter.displayParts), parameter);
        }

        public verifyCurrentParameterHelpDocComment(docComment: string) {
            this.taoInvalidReason = 'verifyCurrentParameterHelpDocComment NYI';

            var activeParameter = this.getActiveParameter();
            var activeParameterDocComment = activeParameter.documentation;
            assert.equal(ts.displayPartsToString(activeParameterDocComment), docComment, assertionMessage("current parameter Help DocComment"));
        }

        public verifyCurrentSignatureHelpParameterCount(expectedCount: number) {
            this.taoInvalidReason = 'verifyCurrentSignatureHelpParameterCount NYI';

            assert.equal(this.getActiveSignatureHelpItem().parameters.length, expectedCount);
        }

        public verifyCurrentSignatureHelpTypeParameterCount(expectedCount: number) {
            this.taoInvalidReason = 'verifyCurrentSignatureHelpTypeParameterCount NYI';

            // assert.equal(this.getActiveSignatureHelpItem().typeParameters.length, expectedCount);
        }

        public verifyCurrentSignatureHelpDocComment(docComment: string) {
            this.taoInvalidReason = 'verifyCurrentSignatureHelpDocComment NYI';

            var actualDocComment = this.getActiveSignatureHelpItem().documentation;
            assert.equal(ts.displayPartsToString(actualDocComment), docComment, assertionMessage("current signature help doc comment"));
        }

        public verifySignatureHelpCount(expected: number) {
            this.scenarioActions.push('<InvokeSignatureHelp />');
            this.scenarioActions.push('<VerifySignatureHelpOverloadCountEquals Count="' + expected + '" />');

            var help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            var actual = help && help.items ? help.items.length : 0;
            assert.equal(actual, expected);
        }

        public verifySignatureHelpArgumentCount(expected: number) {
            this.taoInvalidReason = 'verifySignatureHelpArgumentCount NYI';
            var signatureHelpItems = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            var actual = signatureHelpItems.argumentCount;
            assert.equal(actual, expected);
        }

        public verifySignatureHelpPresent(shouldBePresent = true) {
            this.taoInvalidReason = 'verifySignatureHelpPresent NYI';

            var actual = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            if (shouldBePresent) {
                if (!actual) {
                    this.raiseError("Expected signature help to be present, but it wasn't");
                }
            } else {
                if (actual) {
                    this.raiseError("Expected no signature help, but got '" + JSON.stringify(actual) + "'");
                }
            }
        }

        private validate(name: string, expected: string, actual: string) {
            if (expected && expected !== actual) {
                this.raiseError("Expected " + name + " '" + expected + "'.  Got '" + actual + "' instead.");
            }
        }

        public verifyRenameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string) {
            var renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
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

            var expectedRange = this.getRanges()[0];
            if (renameInfo.triggerSpan.start() !== expectedRange.start ||
                renameInfo.triggerSpan.end() !== expectedRange.end) {
                this.raiseError("Expected triggerSpan [" + expectedRange.start + "," + expectedRange.end + ").  Got [" +
                    renameInfo.triggerSpan.start() + "," + renameInfo.triggerSpan.end() + ") instead.");
            }
        }

        public verifyRenameInfoFailed(message?: string) {
            var renameInfo = this.languageService.getRenameInfo(this.activeFile.fileName, this.currentCaretPosition);
            if (renameInfo.canRename) {
                this.raiseError("Rename was expected to fail");
            }

            this.validate("error", message, renameInfo.localizedErrorMessage);
        }

        private getActiveSignatureHelpItem() {
            var help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            var index = help.selectedItemIndex;
            return help.items[index];
        }

        private getActiveParameter(): ts.SignatureHelpParameter {
            var help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            var item = help.items[help.selectedItemIndex];
            var currentParam = help.argumentIndex;
            return item.parameters[currentParam];
        }

        private alignmentForExtraInfo = 50;

        private spanInfoToString(pos: number, spanInfo: ts.TextSpan, prefixString: string) {
            var resultString = "SpanInfo: " + JSON.stringify(spanInfo);
            if (spanInfo) {
                var spanString = this.activeFile.content.substr(spanInfo.start(), spanInfo.length());
                var spanLineMap = ts.computeLineStarts(spanString);
                for (var i = 0; i < spanLineMap.length; i++) {
                    if (!i) {
                        resultString += "\n";
                    }
                    resultString += prefixString + spanString.substring(spanLineMap[i], spanLineMap[i + 1]);
                }
                resultString += "\n" + prefixString + ":=> (" + this.getLineColStringAtPosition(spanInfo.start()) + ") to (" + this.getLineColStringAtPosition(spanInfo.end()) + ")";
            }

            return resultString;
        }

        private baselineCurrentFileLocations(getSpanAtPos: (pos: number) => ts.TextSpan): string {
            var fileLineMap = ts.computeLineStarts(this.activeFile.content);
            var nextLine = 0;
            var resultString = "";
            var currentLine: string;
            var previousSpanInfo: string;
            var startColumn: number;
            var length: number;
            var prefixString = "    >";

            var addSpanInfoString = () => {
                if (previousSpanInfo) {
                    resultString += currentLine;
                    var thisLineMarker = repeatString(startColumn, " ") + repeatString(length, "~");
                    thisLineMarker += repeatString(this.alignmentForExtraInfo - thisLineMarker.length - prefixString.length + 1, " ");
                    resultString += thisLineMarker;
                    resultString += "=> Pos: (" + (pos - length) + " to " + (pos - 1) + ") ";
                    resultString += " " + previousSpanInfo;
                    previousSpanInfo = undefined;
                }
            };

            for (var pos = 0; pos < this.activeFile.content.length; pos++) {
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
                var spanInfo = this.spanInfoToString(pos, getSpanAtPos(pos), prefixString);
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

            function repeatString(count: number, char: string) {
                var result = "";
                for (var i = 0; i < count; i++) {
                    result += char;
                }
                return result;
            }
        }

        public getBreakpointStatementLocation(pos: number) {
            this.taoInvalidReason = 'getBreakpointStatementLocation NYI';
            return this.languageService.getBreakpointStatementAtPosition(this.activeFile.fileName, pos);
        }

        public baselineCurrentFileBreakpointLocations() {
            this.taoInvalidReason = 'baselineCurrentFileBreakpointLocations impossible';

            Harness.Baseline.runBaseline(
                "Breakpoint Locations for " + this.activeFile.fileName,
                this.testData.globalOptions[testOptMetadataNames.baselineFile],
                () => {
                    return this.baselineCurrentFileLocations(pos => this.getBreakpointStatementLocation(pos));
                },
                true /* run immediately */);
        }

        public baselineGetEmitOutput() {
            this.taoInvalidReason = 'baselineGetEmitOutput impossible';
            // Find file to be emitted
            var emitFiles: FourSlashFile[] = [];  // List of FourSlashFile that has emitThisFile flag on

            var allFourSlashFiles = this.testData.files;
            for (var idx = 0; idx < allFourSlashFiles.length; ++idx) {
                var file = allFourSlashFiles[idx];
                if (file.fileOptions[testOptMetadataNames.emitThisFile]) {
                    // Find a file with the flag emitThisFile turned on
                    emitFiles.push(file);
                }
            }

            // If there is not emiThisFile flag specified in the test file, throw an error
            if (emitFiles.length === 0) {
                this.raiseError("No emitThisFile is specified in the test file");
            }

            Harness.Baseline.runBaseline(
                "Generate getEmitOutput baseline : " + emitFiles.join(" "),
                this.testData.globalOptions[testOptMetadataNames.baselineFile],
                () => {
                    var resultString = "";
                    // Loop through all the emittedFiles and emit them one by one
                    emitFiles.forEach(emitFile => {
                        var emitOutput = this.languageService.getEmitOutput(emitFile.fileName);
                        var emitOutputStatus = emitOutput.emitOutputStatus;
                        // Print emitOutputStatus in readable format
                        resultString += "EmitOutputStatus : " + ts.EmitReturnStatus[emitOutputStatus];
                        resultString += "\n";
                        emitOutput.outputFiles.forEach((outputFile, idx, array) => {
                            var filename = "Filename : " + outputFile.name + "\n";
                            resultString = resultString + filename + outputFile.text;
                        });
                        resultString += "\n";
                    });
                    return resultString;
                },
                true /* run immediately */);
        }

        public printBreakpointLocation(pos: number) {
            Harness.IO.log("\n**Pos: " + pos + " " + this.spanInfoToString(pos, this.getBreakpointStatementLocation(pos), "  "));
        }

        public printBreakpointAtCurrentLocation() {
            this.printBreakpointLocation(this.currentCaretPosition);
        }

        public printCurrentParameterHelp() {
            var help = this.languageService.getSignatureHelpItems(this.activeFile.fileName, this.currentCaretPosition);
            Harness.IO.log(JSON.stringify(help));
        }

        public printCurrentQuickInfo() {
            var quickInfo = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            Harness.IO.log(JSON.stringify(quickInfo));
        }

        public printErrorList() {
            var syntacticErrors = this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
            var semanticErrors = this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
            var errorList = syntacticErrors.concat(semanticErrors);
            Harness.IO.log('Error list (' + errorList.length + ' errors)');

            if (errorList.length) {
                errorList.forEach(err => {
                    Harness.IO.log("start: " + err.start + ", length: " + err.length + ", message: " + err.messageText);
                });
            }
        }

        public printCurrentFileState(makeWhitespaceVisible = false, makeCaretVisible = true) {
            for (var i = 0; i < this.testData.files.length; i++) {
                var file = this.testData.files[i];
                var active = (this.activeFile === file);
                Harness.IO.log('=== Script (' + file.fileName + ') ' + (active ? '(active, cursor at |)' : '') + ' ===');
                var snapshot = this.languageServiceShimHost.getScriptSnapshot(file.fileName);
                var content = snapshot.getText(0, snapshot.getLength());
                if (active) {
                    content = content.substr(0, this.currentCaretPosition) + (makeCaretVisible ? '|' : "") + content.substr(this.currentCaretPosition);
                }
                if (makeWhitespaceVisible) {
                    content = TestState.makeWhitespaceVisible(content);
                }
                Harness.IO.log(content);
            }
        }

        public printCurrentSignatureHelp() {
            var sigHelp = this.getActiveSignatureHelpItem();
            Harness.IO.log(JSON.stringify(sigHelp));
        }

        public printMemberListMembers() {
            var members = this.getMemberListAtCaret();
            Harness.IO.log(JSON.stringify(members));
        }

        public printCompletionListMembers() {
            var completions = this.getCompletionListAtCaret();
            Harness.IO.log(JSON.stringify(completions));
        }

        public printReferences() {
            var references = this.getReferencesAtCaret();
            ts.forEach(references, entry => {
                Harness.IO.log(JSON.stringify(entry));
            });
        }

        public printContext() {
            var fileNames: string[] = JSON.parse(this.languageServiceShimHost.getScriptFileNames());
            ts.forEach(fileNames, Harness.IO.log);
        }

        private editCheckpoint(filename: string) {
            // TODO: What's this for? It is being called by deleteChar
            // this.languageService.getScriptLexicalStructure(filename);
        }

        public deleteChar(count = 1) {
            this.scenarioActions.push('<DeleteCharNext Count="' + count + '" />');

            var offset = this.currentCaretPosition;
            var ch = "";

            for (var i = 0; i < count; i++) {
                // Make the edit
                this.languageServiceShimHost.editScript(this.activeFile.fileName, offset, offset + 1, ch);
                this.updateMarkersForEdit(this.activeFile.fileName, offset, offset + 1, ch);
                this.editCheckpoint(this.activeFile.fileName);

                // Handle post-keystroke formatting
                if (this.enableFormatting) {
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeOptions);
                    offset += this.applyEdits(this.activeFile.fileName, edits, true);
                }
            }

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;

            this.fixCaretPosition();
            this.checkPostEditInvariants();
        }

        public replace(start: number, length: number, text: string) {
            this.taoInvalidReason = 'replace NYI';

            this.languageServiceShimHost.editScript(this.activeFile.fileName, start, start + length, text);
            this.updateMarkersForEdit(this.activeFile.fileName, start, start + length, text);
            this.editCheckpoint(this.activeFile.fileName);

            this.checkPostEditInvariants();
        }

        public deleteCharBehindMarker(count = 1) {
            this.scenarioActions.push('<DeleteCharPrevious Count="' + count + '" />');

            var offset = this.currentCaretPosition;
            var ch = "";

            for (var i = 0; i < count; i++) {
                offset--;
                // Make the edit
                this.languageServiceShimHost.editScript(this.activeFile.fileName, offset, offset + 1, ch);
                this.updateMarkersForEdit(this.activeFile.fileName, offset, offset + 1, ch);
                this.editCheckpoint(this.activeFile.fileName);

                // Handle post-keystroke formatting
                if (this.enableFormatting) {
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeOptions);
                    offset += this.applyEdits(this.activeFile.fileName, edits, true);
                    this.editCheckpoint(this.activeFile.fileName);
                }
            }

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;

            this.fixCaretPosition();

            this.checkPostEditInvariants();
        }

        // Enters lines of text at the current caret position
        public type(text: string) {
            if (text === '') {
                this.taoInvalidReason = 'Test used empty-insert workaround.';
            } else {
                this.scenarioActions.push('<InsertText><![CDATA[' + text + ']]></InsertText>');
            }

            if (this.typingFidelity === TypingFidelity.Low) {
                return this.typeLowFidelity(text);
            } else {
                return this.typeHighFidelity(text);
            }
        }

        private typeLowFidelity(text: string) {
            var offset = this.currentCaretPosition;
            for (var i = 0; i < text.length; i++) {
                // Make the edit
                var ch = text.charAt(i);
                this.languageServiceShimHost.editScript(this.activeFile.fileName, offset, offset, ch);
                this.updateMarkersForEdit(this.activeFile.fileName, offset, offset, ch);
                this.editCheckpoint(this.activeFile.fileName);
                offset++;

                // Handle post-keystroke formatting
                if (this.enableFormatting) {
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeOptions);
                    offset += this.applyEdits(this.activeFile.fileName, edits, true);
                    this.editCheckpoint(this.activeFile.fileName);
                }
            }

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;

            this.fixCaretPosition();

            this.checkPostEditInvariants();
        }

        // Enters lines of text at the current caret position, invoking
        // language service APIs to mimic Visual Studio's behavior
        // as much as possible
        private typeHighFidelity(text: string, errorCadence = 5) {
            var offset = this.currentCaretPosition;
            var prevChar = ' ';
            for (var i = 0; i < text.length; i++) {
                // Make the edit
                var ch = text.charAt(i);
                this.languageServiceShimHost.editScript(this.activeFile.fileName, offset, offset, ch);
                this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, offset);

                this.updateMarkersForEdit(this.activeFile.fileName, offset, offset, ch);
                this.editCheckpoint(this.activeFile.fileName);
                offset++;

                if (ch === '(' || ch === ',') {
                    /* Signature help*/
                    this.languageService.getSignatureHelpItems(this.activeFile.fileName, offset);
                } else if (prevChar === ' ' && /A-Za-z_/.test(ch)) {
                    /* Completions */
                    this.languageService.getCompletionsAtPosition(this.activeFile.fileName, offset);
                }

                if (i % errorCadence === 0) {
                    this.languageService.getSyntacticDiagnostics(this.activeFile.fileName);
                    this.languageService.getSemanticDiagnostics(this.activeFile.fileName);
                }

                // Handle post-keystroke formatting
                if (this.enableFormatting) {
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(this.activeFile.fileName, offset, ch, this.formatCodeOptions);
                    offset += this.applyEdits(this.activeFile.fileName, edits, true);
                    this.editCheckpoint(this.activeFile.fileName);
                }
            }

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;

            this.fixCaretPosition();

            this.checkPostEditInvariants();
        }

        // Enters text as if the user had pasted it
        public paste(text: string) {
            this.scenarioActions.push('<InsertText><![CDATA[' + text + ']]></InsertText>');

            var start = this.currentCaretPosition;
            var offset = this.currentCaretPosition;
            this.languageServiceShimHost.editScript(this.activeFile.fileName, offset, offset, text);
            this.updateMarkersForEdit(this.activeFile.fileName, offset, offset, text);
            this.editCheckpoint(this.activeFile.fileName);
            offset += text.length;

            // Handle formatting
            if (this.enableFormatting) {
                var edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, offset, this.formatCodeOptions);
                offset += this.applyEdits(this.activeFile.fileName, edits, true);
                this.editCheckpoint(this.activeFile.fileName);
            }

            // Move the caret to wherever we ended up
            this.currentCaretPosition = offset;
            this.fixCaretPosition();

            this.checkPostEditInvariants();
        }

        private checkPostEditInvariants() {
            return;

            /// TODO: reimplement this section
            //if (this.editValidation === IncrementalEditValidation.None) {
            //    return;
            //}

            //// Get syntactic errors (to force a refresh)
            //var incrSyntaxErrs = JSON.stringify(this.languageService.getSyntacticDiagnostics(this.activeFile.fileName));

            //// Check syntactic structure
            //var snapshot = this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName);
            //var content = snapshot.getText(0, snapshot.getLength());
            //var refSyntaxTree = TypeScript.Parser.parse(this.activeFile.fileName, TypeScript.SimpleText.fromString(content), ts.ScriptTarget.ES5, TypeScript.isDTSFile(this.activeFile.fileName));
            //var fullSyntaxErrs = JSON.stringify(refSyntaxTree.diagnostics());

            //if (incrSyntaxErrs !== fullSyntaxErrs) {
            //    this.raiseError('Mismatched incremental/full syntactic errors for file ' + this.activeFile.fileName + '.\n=== Incremental errors ===\n' + incrSyntaxErrs + '\n=== Full Errors ===\n' + fullSyntaxErrs);
            //}

            // if (this.editValidation !== IncrementalEditValidation.SyntacticOnly) {
            //    var compiler = new TypeScript.TypeScriptCompiler();
            //    for (var i = 0; i < this.testData.files.length; i++) {
            //        snapshot = this.languageServiceShimHost.getScriptSnapshot(this.testData.files[i].fileName);
            //        compiler.addFile(this.testData.files[i].fileName, TypeScript.ScriptSnapshot.fromString(snapshot.getText(0, snapshot.getLength())), ts.ByteOrderMark.None, 0, true);
            //    }

            //    compiler.addFile('lib.d.ts', TypeScript.ScriptSnapshot.fromString(Harness.Compiler.libTextMinimal), ts.ByteOrderMark.None, 0, true);

            //    for (var i = 0; i < this.testData.files.length; i++) {
            //        var refSemanticErrs = JSON.stringify(compiler.getSemanticDiagnostics(this.testData.files[i].fileName));
            //        var incrSemanticErrs = JSON.stringify(this.languageService.getSemanticDiagnostics(this.testData.files[i].fileName));

            //        if (incrSemanticErrs !== refSemanticErrs) {
            //            this.raiseError('Mismatched incremental/full semantic errors for file ' + this.testData.files[i].fileName + '\n=== Incremental errors ===\n' + incrSemanticErrs + '\n=== Full Errors ===\n' + refSemanticErrs);
            //        }
            //    }
            // }
        }

        private fixCaretPosition() {
            // The caret can potentially end up between the \r and \n, which is confusing. If
            // that happens, move it back one character
            if (this.currentCaretPosition > 0) {
                var ch = this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName).getText(this.currentCaretPosition - 1, this.currentCaretPosition);
                if (ch === '\r') {
                    this.currentCaretPosition--;
                }
            };
        }

        private applyEdits(fileName: string, edits: ts.TextChange[], isFormattingEdit = false): number {
            // We get back a set of edits, but langSvc.editScript only accepts one at a time. Use this to keep track
            // of the incremental offset from each edit to the next. Assumption is that these edit ranges don't overlap
            var runningOffset = 0;
            edits = edits.sort((a, b) => a.span.start() - b.span.start());
            // Get a snapshot of the content of the file so we can make sure any formatting edits didn't destroy non-whitespace characters
            var snapshot = this.languageServiceShimHost.getScriptSnapshot(fileName);
            var oldContent = snapshot.getText(0, snapshot.getLength());
            for (var j = 0; j < edits.length; j++) {
                this.languageServiceShimHost.editScript(fileName, edits[j].span.start() + runningOffset, edits[j].span.end() + runningOffset, edits[j].newText);
                this.updateMarkersForEdit(fileName, edits[j].span.start() + runningOffset, edits[j].span.end() + runningOffset, edits[j].newText);
                var change = (edits[j].span.start() - edits[j].span.end()) + edits[j].newText.length;
                runningOffset += change;
                // TODO: Consider doing this at least some of the time for higher fidelity. Currently causes a failure (bug 707150)
                // this.languageService.getScriptLexicalStructure(fileName);
            }

            if (isFormattingEdit) {
                snapshot = this.languageServiceShimHost.getScriptSnapshot(fileName);
                var newContent = snapshot.getText(0, snapshot.getLength());

                if (newContent.replace(/\s/g, '') !== oldContent.replace(/\s/g, '')) {
                    this.raiseError('Formatting operation destroyed non-whitespace content');
                }
            }
            return runningOffset;
        }

        public formatDocument() {
            this.scenarioActions.push('<FormatDocument />');

            var edits = this.languageService.getFormattingEditsForDocument(this.activeFile.fileName, this.formatCodeOptions);
            this.currentCaretPosition += this.applyEdits(this.activeFile.fileName, edits, true);
            this.fixCaretPosition();
        }

        public formatSelection(start: number, end: number) {
            this.taoInvalidReason = 'formatSelection NYI';

            var edits = this.languageService.getFormattingEditsForRange(this.activeFile.fileName, start, end, this.formatCodeOptions);
            this.currentCaretPosition += this.applyEdits(this.activeFile.fileName, edits, true);
            this.fixCaretPosition();
        }

        private updateMarkersForEdit(fileName: string, minChar: number, limChar: number, text: string) {
            for (var i = 0; i < this.testData.markers.length; i++) {
                var marker = this.testData.markers[i];
                if (marker.fileName === fileName) {
                    if (marker.position > minChar) {
                        if (marker.position < limChar) {
                            // Marker is inside the edit - mark it as invalidated (?)
                            marker.position = -1;
                        } else {
                            // Move marker back/forward by the appropriate amount
                            marker.position += (minChar - limChar) + text.length;
                        }
                    }
                }
            }
        }

        public goToBOF() {
            this.goToPosition(0);
        }

        public goToEOF() {
            var len = this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName).getLength();
            this.goToPosition(len);
        }

        public goToDefinition(definitionIndex: number) {
            if (definitionIndex === 0) {
                this.scenarioActions.push('<GoToDefinition />');
            } else {
                this.taoInvalidReason = 'GoToDefinition not supported for non-zero definition indices';
            }

            var definitions = this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            if (!definitions || !definitions.length) {
                this.raiseError('goToDefinition failed - expected to at least one definition location but got 0');
            }

            if (definitionIndex >= definitions.length) {
                this.raiseError('goToDefinition failed - definitionIndex value (' + definitionIndex + ') exceeds definition list size (' + definitions.length + ')');
            }

            var definition = definitions[definitionIndex];
            this.openFile(definition.fileName);
            this.currentCaretPosition = definition.textSpan.start();
        }

        public verifyDefinitionLocationExists(negative: boolean) {
            this.taoInvalidReason = 'verifyDefinitionLocationExists NYI';

            var definitions = this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);

            var foundDefinitions = definitions && definitions.length;

            if (foundDefinitions && negative) {
                this.raiseError('goToDefinition - expected to 0 definition locations but got ' + definitions.length);
            }
            else if (!foundDefinitions && !negative) {
                this.raiseError('goToDefinition - expected to at least one definition location but got 0');
            }
        }

        public verifyDefinitionsName(negative: boolean, expectedName: string, expectedContainerName: string) {
            this.taoInvalidReason = 'verifyDefinititionsInfo NYI';

            var definitions = this.languageService.getDefinitionAtPosition(this.activeFile.fileName, this.currentCaretPosition);
            var actualDefinitionName = definitions && definitions.length ? definitions[0].name : "";
            var actualDefinitionContainerName = definitions && definitions.length ? definitions[0].containerName : "";
            if (negative) {
                assert.notEqual(actualDefinitionName, expectedName, this.messageAtLastKnownMarker("Definition Info Name"));
                assert.notEqual(actualDefinitionName, expectedName, this.messageAtLastKnownMarker("Definition Info Container Name"));
            } else {
                assert.equal(actualDefinitionName, expectedName, this.messageAtLastKnownMarker("Definition Info Name"));
                assert.equal(actualDefinitionName, expectedName, this.messageAtLastKnownMarker("Definition Info Container Name"));
            }
        }

        public getMarkers(): Marker[] {
            //  Return a copy of the list
            return this.testData.markers.slice(0);
        }

        public getRanges(): Range[] {
            //  Return a copy of the list
            return this.testData.ranges.slice(0);
        }

        public verifyCaretAtMarker(markerName = '') {
            this.taoInvalidReason = 'verifyCaretAtMarker NYI';

            var pos = this.getMarkerByName(markerName);
            if (pos.fileName !== this.activeFile.fileName) {
                throw new Error('verifyCaretAtMarker failed - expected to be in file "' + pos.fileName + '", but was in file "' + this.activeFile.fileName + '"');
            }
            if (pos.position !== this.currentCaretPosition) {
                throw new Error('verifyCaretAtMarker failed - expected to be at marker "/*' + markerName + '*/, but was at position ' + this.currentCaretPosition + '(' + this.getLineColStringAtPosition(this.currentCaretPosition) + ')');
            }
        }

        private getIndentation(fileName: string, position: number): number {
            return this.languageService.getIndentationAtPosition(fileName, position, this.formatCodeOptions);
        }

        public verifyIndentationAtCurrentPosition(numberOfSpaces: number) {
            this.taoInvalidReason = 'verifyIndentationAtCurrentPosition NYI';

            var actual = this.getIndentation(this.activeFile.fileName, this.currentCaretPosition);
            if (actual != numberOfSpaces) {
                this.raiseError('verifyIndentationAtCurrentPosition failed - expected: ' + numberOfSpaces + ', actual: ' + actual);
            }
        }

        public verifyIndentationAtPosition(fileName: string, position: number, numberOfSpaces: number) {
            this.taoInvalidReason = 'verifyIndentationAtPosition NYI';

            var actual = this.getIndentation(fileName, position);
            if (actual !== numberOfSpaces) {
                this.raiseError('verifyIndentationAtPosition failed - expected: ' + numberOfSpaces + ', actual: ' + actual);
            }
        }

        public verifyCurrentLineContent(text: string) {
            this.taoInvalidReason = 'verifyCurrentLineContent NYI';

            var actual = this.getCurrentLineContent();
            if (actual !== text) {
                throw new Error('verifyCurrentLineContent\n' +
                    '\tExpected: "' + text + '"\n' +
                    '\t  Actual: "' + actual + '"');
            }
        }

        public verifyCurrentFileContent(text: string) {
            this.taoInvalidReason = 'verifyCurrentFileContent NYI';

            var actual = this.getCurrentFileContent();
            var replaceNewlines = (str: string) => str.replace(/\r\n/g, "\n");
            if (replaceNewlines(actual) !== replaceNewlines(text)) {
                throw new Error('verifyCurrentFileContent\n' +
                    '\tExpected: "' + text + '"\n' +
                    '\t  Actual: "' + actual + '"');
            }
        }

        public verifyTextAtCaretIs(text: string) {
            this.taoInvalidReason = 'verifyCurrentFileContent NYI';

            var actual = this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName).getText(this.currentCaretPosition, this.currentCaretPosition + text.length);
            if (actual !== text) {
                throw new Error('verifyTextAtCaretIs\n' +
                    '\tExpected: "' + text + '"\n' +
                    '\t  Actual: "' + actual + '"');
            }
        }

        public verifyCurrentNameOrDottedNameSpanText(text: string) {
            this.taoInvalidReason = 'verifyCurrentNameOrDottedNameSpanText NYI';

            var span = this.languageService.getNameOrDottedNameSpan(this.activeFile.fileName, this.currentCaretPosition, this.currentCaretPosition);
            if (!span) {
                this.raiseError('verifyCurrentNameOrDottedNameSpanText\n' +
                    '\tExpected: "' + text + '"\n' +
                    '\t  Actual: undefined');
            }

            var actual = this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName).getText(span.start(), span.end());
            if (actual !== text) {
                this.raiseError('verifyCurrentNameOrDottedNameSpanText\n' +
                    '\tExpected: "' + text + '"\n' +
                    '\t  Actual: "' + actual + '"');
            }
        }

        private getNameOrDottedNameSpan(pos: number) {
            this.taoInvalidReason = 'getNameOrDottedNameSpan NYI';
            return this.languageService.getNameOrDottedNameSpan(this.activeFile.fileName, pos, pos);
        }

        public baselineCurrentFileNameOrDottedNameSpans() {
            this.taoInvalidReason = 'baselineCurrentFileNameOrDottedNameSpans impossible';

            Harness.Baseline.runBaseline(
                "Name OrDottedNameSpans for " + this.activeFile.fileName,
                this.testData.globalOptions[testOptMetadataNames.baselineFile],
                () => {
                    return this.baselineCurrentFileLocations(pos =>
                        this.getNameOrDottedNameSpan(pos));
                },
                true /* run immediately */);
        }

        public printNameOrDottedNameSpans(pos: number) {
            Harness.IO.log(this.spanInfoToString(pos, this.getNameOrDottedNameSpan(pos), "**"));
        }

        private verifyClassifications(expected: { classificationType: string; text: string; textSpan?: TextSpan }[], actual: ts.ClassifiedSpan[]) {
            if (actual.length !== expected.length) {
                this.raiseError('verifyClassifications failed - expected total classifications to be ' + expected.length +
                                ', but was ' + actual.length +
                                jsonMismatchString());
            }

            for (var i = 0; i < expected.length; i++) {
                var expectedClassification = expected[i];
                var actualClassification = actual[i];

                var expectedType: string = (<any>ts.ClassificationTypeNames)[expectedClassification.classificationType];
                if (expectedType !== actualClassification.classificationType) {
                    this.raiseError('verifyClassifications failed - expected classifications type to be ' +
                        expectedType + ', but was ' +
                        actualClassification.classificationType +
                        jsonMismatchString());
                }

                var expectedSpan = expectedClassification.textSpan;
                var actualSpan = actualClassification.textSpan;

                if (expectedSpan) {
                    var expectedLength = expectedSpan.end - expectedSpan.start;

                    if (expectedSpan.start !== actualSpan.start() || expectedLength !== actualSpan.length()) {
                        this.raiseError("verifyClassifications failed - expected span of text to be " +
                            "{start=" + expectedSpan.start + ", length=" + expectedLength + "}, but was " +
                            "{start=" + actualSpan.start() + ", length=" + actualSpan.length() + "}" +
                            jsonMismatchString());
                    }
                }

                var actualText = this.activeFile.content.substr(actualSpan.start(), actualSpan.length());
                if (expectedClassification.text !== actualText) {
                    this.raiseError('verifyClassifications failed - expected classified text to be ' +
                        expectedClassification.text + ', but was ' +
                        actualText +
                        jsonMismatchString());
                }
            }

            function jsonMismatchString() {
                return ts.sys.newLine +
                    "expected: '" + ts.sys.newLine + JSON.stringify(expected, (k,v) => v, 2) + "'" + ts.sys.newLine +
                    "actual:   '" + ts.sys.newLine + JSON.stringify(actual, (k, v) => v, 2) + "'";
            }
        }

        public verifySemanticClassifications(expected: { classificationType: string; text: string }[]) {
            var actual = this.languageService.getSemanticClassifications(this.activeFile.fileName,
                ts.createTextSpan(0, this.activeFile.content.length));

            this.verifyClassifications(expected, actual);
        }

        public verifySyntacticClassifications(expected: { classificationType: string; text: string }[]) {
            var actual = this.languageService.getSyntacticClassifications(this.activeFile.fileName, 
                ts.createTextSpan(0, this.activeFile.content.length));

            this.verifyClassifications(expected, actual);
        }

        public verifyOutliningSpans(spans: TextSpan[]) {
            this.taoInvalidReason = 'verifyOutliningSpans NYI';

            var actual = this.languageService.getOutliningSpans(this.activeFile.fileName);

            if (actual.length !== spans.length) {
                this.raiseError('verifyOutliningSpans failed - expected total spans to be ' + spans.length + ', but was ' + actual.length);
            }

            for (var i = 0; i < spans.length; i++) {
                var expectedSpan = spans[i];
                var actualSpan = actual[i];
                if (expectedSpan.start !== actualSpan.textSpan.start() || expectedSpan.end !== actualSpan.textSpan.end()) {
                    this.raiseError('verifyOutliningSpans failed - span ' + (i + 1) + ' expected: (' + expectedSpan.start + ',' + expectedSpan.end + '),  actual: (' + actualSpan.textSpan.start() + ',' + actualSpan.textSpan.end() + ')');
                }
            }
        }

        public verifyTodoComments(descriptors: string[], spans: TextSpan[]) {
            var actual = this.languageService.getTodoComments(this.activeFile.fileName,
                descriptors.map(d => { return { text: d, priority: 0 }; }));

            if (actual.length !== spans.length) {
                this.raiseError('verifyTodoComments failed - expected total spans to be ' + spans.length + ', but was ' + actual.length);
            }

            for (var i = 0; i < spans.length; i++) {
                var expectedSpan = spans[i];
                var actualComment = actual[i];
                var actualCommentSpan = ts.createTextSpan(actualComment.position, actualComment.message.length);

                if (expectedSpan.start !== actualCommentSpan.start() || expectedSpan.end !== actualCommentSpan.end()) {
                    this.raiseError('verifyOutliningSpans failed - span ' + (i + 1) + ' expected: (' + expectedSpan.start + ',' + expectedSpan.end + '),  actual: (' + actualCommentSpan.start() + ',' + actualCommentSpan.end() + ')');
                }
            }
        }

        public verifyMatchingBracePosition(bracePosition: number, expectedMatchPosition: number) {
            this.taoInvalidReason = 'verifyMatchingBracePosition NYI';

            var actual = this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, bracePosition);

            if (actual.length !== 2) {
                this.raiseError('verifyMatchingBracePosition failed - expected result to contain 2 spans, but it had ' + actual.length);
            }

            var actualMatchPosition = -1;
            if (bracePosition === actual[0].start()) {
                actualMatchPosition = actual[1].start();
            } else if (bracePosition === actual[1].start()) {
                actualMatchPosition = actual[0].start();
            } else {
                this.raiseError('verifyMatchingBracePosition failed - could not find the brace position: ' + bracePosition + ' in the returned list: (' + actual[0].start() + ',' + actual[0].end() + ') and (' + actual[1].start() + ',' + actual[1].end() + ')');
            }

            if (actualMatchPosition !== expectedMatchPosition) {
                this.raiseError('verifyMatchingBracePosition failed - expected: ' + actualMatchPosition + ',  actual: ' + expectedMatchPosition);
            }
        }

        public verifyNoMatchingBracePosition(bracePosition: number) {
            this.taoInvalidReason = 'verifyNoMatchingBracePosition NYI';

            var actual = this.languageService.getBraceMatchingAtPosition(this.activeFile.fileName, bracePosition);

            if (actual.length !== 0) {
                this.raiseError('verifyNoMatchingBracePosition failed - expected: 0 spans, actual: ' + actual.length);
            }
        }

        public verifyTypesAgainstFullCheckAtPositions(positions: number[]) {
            this.taoInvalidReason = 'verifyTypesAgainstFullCheckAtPositions impossible';

            // Create a from-scratch LS to check against
            var referenceLanguageServiceShimHost = new Harness.LanguageService.TypeScriptLS();
            var referenceLanguageServiceShim = referenceLanguageServiceShimHost.getLanguageService();
            var referenceLanguageService = referenceLanguageServiceShim.languageService;

            // Add lib.d.ts to the reference language service
            referenceLanguageServiceShimHost.addDefaultLibrary();

            for (var i = 0; i < this.testData.files.length; i++) {
                var file = this.testData.files[i];

                var snapshot = this.languageServiceShimHost.getScriptSnapshot(file.fileName);
                var content = snapshot.getText(0, snapshot.getLength());
                referenceLanguageServiceShimHost.addScript(this.testData.files[i].fileName, content);
            }

            for (i = 0; i < positions.length; i++) {
                var nameOf = (type: ts.QuickInfo) => type ? ts.displayPartsToString(type.displayParts) : '(none)';

                var pullName: string, refName: string;
                var anyFailed = false;

                var errMsg = '';

                try {
                    var pullType = this.languageService.getQuickInfoAtPosition(this.activeFile.fileName, positions[i]);
                    pullName = nameOf(pullType);
                } catch (err1) {
                    errMsg = 'Failed to get pull type check. Exception: ' + err1 + '\r\n';
                    if (err1.stack) errMsg = errMsg + err1.stack;
                    pullName = '(failed)';
                    anyFailed = true;
                }

                try {
                    var referenceType = referenceLanguageService.getQuickInfoAtPosition(this.activeFile.fileName, positions[i]);
                    refName = nameOf(referenceType);
                } catch (err2) {
                    errMsg = 'Failed to get full type check. Exception: ' + err2 + '\r\n';
                    if (err2.stack) errMsg = errMsg + err2.stack;
                    refName = '(failed)';
                    anyFailed = true;
                }

                var failure = anyFailed || (refName !== pullName);
                if (failure) {
                    snapshot = this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName);
                    content = snapshot.getText(0, snapshot.getLength());
                    var textAtPosition = content.substr(positions[i], 10);
                    var positionDescription = 'Position ' + positions[i] + ' ("' + textAtPosition + '"...)';

                    if (anyFailed) {
                        throw new Error('Exception thrown in language service for ' + positionDescription + '\r\n' + errMsg);
                    } else if (refName !== pullName) {
                        throw new Error('Pull/Full disagreement failed at ' + positionDescription + ' - expected full typecheck type "' + refName + '" to equal pull type "' + pullName + '".');
                    }
                }
            }
        }

        /*
            Check number of navigationItems which match both searchValue and matchKind.
            Report an error if expected value and actual value do not match.
        */
        public verifyNavigationItemsCount(expected: number, searchValue: string, matchKind?: string) {
            this.taoInvalidReason = 'verifyNavigationItemsCount NYI';

            var items = this.languageService.getNavigateToItems(searchValue);
            var actual = 0;
            var item: ts.NavigateToItem = null;

            // Count only the match that match the same MatchKind
            for (var i = 0; i < items.length; ++i) {
                item = items[i];
                if (!matchKind || item.matchKind === matchKind) {
                    actual++;
                }
            }

            if (expected != actual) {
                this.raiseError('verifyNavigationItemsCount failed - found: ' + actual + ' navigation items, expected: ' + expected + '.');
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
            this.taoInvalidReason = 'verifyNavigationItemsListContains NYI';

            var items = this.languageService.getNavigateToItems(searchValue);

            if (!items || items.length === 0) {
                this.raiseError('verifyNavigationItemsListContains failed - found 0 navigation items, expected at least one.');
            }

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item && item.name === name && item.kind === kind &&
                    (matchKind === undefined || item.matchKind === matchKind) &&
                    (fileName === undefined || item.fileName === fileName) &&
                    (parentName === undefined || item.containerName === parentName)) {
                    return;
                }
            }

            // if there was an explicit match kind specified, then it should be validated.
            if (matchKind !== undefined) {
                var missingItem = { name: name, kind: kind, searchValue: searchValue, matchKind: matchKind, fileName: fileName, parentName: parentName };
                this.raiseError('verifyNavigationItemsListContains failed - could not find the item: ' + JSON.stringify(missingItem) + ' in the returned list: (' + JSON.stringify(items) + ')');
            }
        }

        public verifyGetScriptLexicalStructureListCount(expected: number) {
            this.taoInvalidReason = 'verifyNavigationItemsListContains impossible';

            var items = this.languageService.getNavigationBarItems(this.activeFile.fileName);
            var actual = this.getNavigationBarItemsCount(items);

            if (expected != actual) {
                this.raiseError('verifyGetScriptLexicalStructureListCount failed - found: ' + actual + ' navigation items, expected: ' + expected + '.');
            }
        }

        private getNavigationBarItemsCount(items: ts.NavigationBarItem[]) {
            var result = 0;
            if (items) {
                for (var i = 0, n = items.length; i < n; i++) {
                    result++;
                    result += this.getNavigationBarItemsCount(items[i].childItems);
                }
            }

            return result;
        }

        public verifGetScriptLexicalStructureListContains(
            name: string,
            kind: string,
            markerPosition?: number) {
            this.taoInvalidReason = 'verifGetScriptLexicalStructureListContains impossible';

            var items = this.languageService.getNavigationBarItems(this.activeFile.fileName);

            if (!items || items.length === 0) {
                this.raiseError('verifyGetScriptLexicalStructureListContains failed - found 0 navigation items, expected at least one.');
            }

            if (this.navigationBarItemsContains(items, name, kind)) {
                return;
            }

            var missingItem = { name: name, kind: kind };
            this.raiseError('verifyGetScriptLexicalStructureListContains failed - could not find the item: ' + JSON.stringify(missingItem) + ' in the returned list: (' + JSON.stringify(items) + ')');
        }

        private navigationBarItemsContains(items: ts.NavigationBarItem[], name: string, kind: string) {
            if (items) {
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item && item.text === name && item.kind === kind) {
                        return true;
                    }

                    if (this.navigationBarItemsContains(item.childItems, name, kind)) {
                        return true;
                    }
                }
            }

            return false;
        }

        public printNavigationItems(searchValue: string) {
            var items = this.languageService.getNavigateToItems(searchValue);
            var length = items && items.length;

            Harness.IO.log('NavigationItems list (' + length + ' items)');

            for (var i = 0; i < length; i++) {
                var item = items[i];
                Harness.IO.log('name: ' + item.name + ', kind: ' + item.kind + ', parentName: ' + item.containerName + ', fileName: ' + item.fileName);
            }
        }

        public printScriptLexicalStructureItems() {
            var items = this.languageService.getNavigationBarItems(this.activeFile.fileName);
            var length = items && items.length;

            Harness.IO.log('NavigationItems list (' + length + ' items)');

            for (var i = 0; i < length; i++) {
                var item = items[i];
                Harness.IO.log('name: ' + item.text + ', kind: ' + item.kind);
            }
        }

        private getOccurancesAtCurrentPosition() {
            return this.languageService.getOccurrencesAtPosition(this.activeFile.fileName, this.currentCaretPosition);
        }

        public verifyOccurrencesAtPositionListContains(fileName: string, start: number, end: number, isWriteAccess?: boolean) {
            this.taoInvalidReason = 'verifyOccurrencesAtPositionListContains NYI';

            var occurances = this.getOccurancesAtCurrentPosition();

            if (!occurances || occurances.length === 0) {
                this.raiseError('verifyOccurancesAtPositionListContains failed - found 0 references, expected at least one.');
            }

            for (var i = 0; i < occurances.length; i++) {
                var occurance = occurances[i];
                if (occurance && occurance.fileName === fileName && occurance.textSpan.start() === start && occurance.textSpan.end() === end) {
                    if (typeof isWriteAccess !== "undefined" && occurance.isWriteAccess !== isWriteAccess) {
                        this.raiseError('verifyOccurancesAtPositionListContains failed - item isWriteAccess value doe not match, actual: ' + occurance.isWriteAccess + ', expected: ' + isWriteAccess + '.');
                    }
                    return;
                }
            }

            var missingItem = { fileName: fileName, start: start, end: end, isWriteAccess: isWriteAccess };
            this.raiseError('verifyOccurancesAtPositionListContains failed - could not find the item: ' + JSON.stringify(missingItem) + ' in the returned list: (' + JSON.stringify(occurances) + ')');
        }

        public verifyOccurrencesAtPositionListCount(expectedCount: number) {
            this.taoInvalidReason = 'verifyOccurrencesAtPositionListCount NYI';

            var occurances = this.getOccurancesAtCurrentPosition();
            var actualCount = occurances ? occurances.length : 0;
            if (expectedCount !== actualCount) {
                this.raiseError('verifyOccurrencesAtPositionListCount failed - actual: ' + actualCount + ', expected:' + expectedCount);
            }
        }

        // Get the text of the entire line the caret is currently at
        private getCurrentLineContent() {
            // The current caret position (in line/col terms)
            var line = this.getCurrentCaretFilePosition().line;
            // The line/col of the start of this line
            var pos = this.languageServiceShimHost.lineColToPosition(this.activeFile.fileName, line, 1);
            // The index of the current file

            // The text from the start of the line to the end of the file
            var snapshot = this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName);
            var text = snapshot.getText(pos, snapshot.getLength());

            // Truncate to the first newline
            var newlinePos = text.indexOf('\n');
            if (newlinePos === -1) {
                return text;
            }
            else {
                if (text.charAt(newlinePos - 1) === '\r') {
                    newlinePos--;
                }
                return text.substr(0, newlinePos);
            }
        }

        private getCurrentFileContent() {
            var snapshot = this.languageServiceShimHost.getScriptSnapshot(this.activeFile.fileName);
            return snapshot.getText(0, snapshot.getLength());
        }

        private getCurrentCaretFilePosition() {
            var result = this.languageServiceShimHost.positionToZeroBasedLineCol(this.activeFile.fileName, this.currentCaretPosition);
            if (result.line >= 0) {
                result.line++;
            }

            if (result.character >= 0) {
                result.character++;
            }

            return result;
        }

        private assertItemInCompletionList(items: ts.CompletionEntry[], name: string, text?: string, documentation?: string, kind?: string) {
            this.scenarioActions.push('<ShowCompletionList />');
            this.scenarioActions.push('<VerifyCompletionContainsItem ItemName="' + name + '"/>');

            if (text || documentation || kind) {
                this.taoInvalidReason = 'assertItemInCompletionList only supports the "name" parameter';
            }

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.name === name) {
                    if (documentation != undefined || text !== undefined) {
                        var details = this.getCompletionEntryDetails(item.name);

                        if (documentation !== undefined) {
                            assert.equal(ts.displayPartsToString(details.documentation), documentation, assertionMessage("completion item documentation"));
                        }
                        if (text !== undefined) {
                            assert.equal(ts.displayPartsToString(details.displayParts), text, assertionMessage("completion item detail text"));
                        }
                    }

                    if (kind !== undefined) {
                        assert.equal(item.kind, kind, assertionMessage("completion item kind"));
                    }

                    return;
                }
            }

            var itemsString = items.map((item) => JSON.stringify({ name: item.name, kind: item.kind })).join(",\n");

            this.raiseError('Expected "' + JSON.stringify({ name: name, text: text, documentation: documentation, kind: kind }) + '" to be in list [' + itemsString + ']');
        }

        private findFile(indexOrName: any) {
            var result: FourSlashFile = null;
            if (typeof indexOrName === 'number') {
                var index = <number>indexOrName;
                if (index >= this.testData.files.length) {
                    throw new Error('File index (' + index + ') in openFile was out of range. There are only ' + this.testData.files.length + ' files in this test.');
                } else {
                    result = this.testData.files[index];
                }
            } else if (typeof indexOrName === 'string') {
                var name = <string>indexOrName;
                // names are stored in the compiler with this relative path, this allows people to use goTo.file on just the filename
                name = name.indexOf('/') === -1 ? 'tests/cases/fourslash/' + name : name;
                var availableNames: string[] = [];
                var foundIt = false;
                for (var i = 0; i < this.testData.files.length; i++) {
                    var fn = this.testData.files[i].fileName;
                    if (fn) {
                        if (fn === name) {
                            result = this.testData.files[i];
                            foundIt = true;
                            break;
                        }
                        availableNames.push(fn);
                    }
                }

                if (!foundIt) {
                    throw new Error('No test file named "' + name + '" exists. Available file names are:' + availableNames.join(', '));
                }
            } else {
                throw new Error('Unknown argument type');
            }

            return result;
        }

        private getLineColStringAtPosition(position: number) {
            var pos = this.languageServiceShimHost.positionToZeroBasedLineCol(this.activeFile.fileName, position);
            return 'line ' + (pos.line + 1) + ', col ' + pos.character;
        }

        private getMarkerByName(markerName: string) {
            var markerPos = this.testData.markerPositions[markerName];
            if (markerPos === undefined) {
                var markerNames: string[] = [];
                for (var m in this.testData.markerPositions) markerNames.push(m);
                throw new Error('Unknown marker "' + markerName + '" Available markers: ' + markerNames.map(m => '"' + m + '"').join(', '));
            } else {
                return markerPos;
            }
        }

        private static makeWhitespaceVisible(text: string) {
            return text.replace(/ /g, '\u00B7').replace(/\r/g, '\u00B6').replace(/\n/g, '\u2193\n').replace(/\t/g, '\u2192\   ');
        }

        public getTestXmlData(): TestXmlData {
            return {
                actions: this.scenarioActions,
                invalidReason: this.taoInvalidReason,
                originalName: ''
            };
        }
    }

    // TOOD: should these just use the Harness's stdout/stderr?
    var fsOutput = new Harness.Compiler.WriterAggregator();
    var fsErrors = new Harness.Compiler.WriterAggregator();
    export var xmlData: TestXmlData[] = [];
    export function runFourSlashTest(fileName: string) {
        var content = Harness.IO.readFile(fileName);
        var xml = runFourSlashTestContent(content, fileName);
        xmlData.push(xml);
    }

    export function runFourSlashTestContent(content: string, fileName: string): TestXmlData {
        // Parse out the files and their metadata
        var testData = parseTestData(content, fileName);

        currentTestState = new TestState(testData);

        var result = '';
        var host = Harness.Compiler.createCompilerHost([{ unitName: Harness.Compiler.fourslashFilename, content: undefined },
            { unitName: fileName, content: content }],
            (fn, contents) => result = contents,
            ts.ScriptTarget.Latest,
            ts.sys.useCaseSensitiveFileNames);
        // TODO (drosen): We need to enforce checking on these tests.
        var program = ts.createProgram([Harness.Compiler.fourslashFilename, fileName], { out: "fourslashTestOutput.js", noResolve: true, target: ts.ScriptTarget.ES3 }, host);
        var checker = ts.createTypeChecker(program, /*fullTypeCheckMode*/ true);

        var errors = program.getDiagnostics().concat(checker.getDiagnostics());
        if (errors.length > 0) {
            throw new Error('Error compiling ' + fileName + ': ' + errors.map(e => e.messageText).join('\r\n'));
        }
        checker.emitFiles();
        result = result || ''; // Might have an empty fourslash file

        // Compile and execute the test
        try {
            eval(result);
        } catch (err) {
            // Debugging: FourSlash.currentTestState.printCurrentFileState();
            throw err;
        }

        var xmlData = currentTestState.getTestXmlData();
        xmlData.originalName = fileName;
        return xmlData;
    }

    function chompLeadingSpace(content: string) {
        var lines = content.split("\n");
        for (var i = 0; i < lines.length; i++) {
            if ((lines[i].length !== 0) && (lines[i].charAt(0) !== ' ')) {
                return content;
            }
        }

        return lines.map(s => s.substr(1)).join('\n');
    }

    function parseTestData(contents: string, fileName: string): FourSlashData {
        // Regex for parsing options in the format "@Alpha: Value of any sort"
        var optionRegex = /^\s*@(\w+): (.*)\s*/;

        // List of all the subfiles we've parsed out
        var files: FourSlashFile[] = [];
        // Global options
        var globalOptions: { [s: string]: string; } = {};
        // Marker positions

        // Split up the input file by line
        // Note: IE JS engine incorrectly handles consecutive delimiters here when using RegExp split, so
        // we have to string-based splitting instead and try to figure out the delimiting chars
        var lines = contents.split('\n');

        var markerPositions: MarkerMap = {};
        var markers: Marker[] = [];
        var ranges: Range[] = [];

        // Stuff related to the subfile we're parsing
        var currentFileContent: string = null;
        var currentFileName = fileName;
        var currentFileOptions: { [s: string]: string } = {};

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var lineLength = line.length;

            if (lineLength > 0 && line.charAt(lineLength - 1) === '\r') {
                line = line.substr(0, lineLength - 1);
            }

            if (line.substr(0, 4) === '////') {
                // Subfile content line

                // Append to the current subfile content, inserting a newline needed
                if (currentFileContent === null) {
                    currentFileContent = '';
                } else {
                    // End-of-line
                    currentFileContent = currentFileContent + '\n';
                }

                currentFileContent = currentFileContent + line.substr(4);
            } else if (line.substr(0, 2) === '//') {
                // Comment line, check for global/file @options and record them
                var match = optionRegex.exec(line.substr(2));
                if (match) {
                    var globalMetadataNamesIndex = globalMetadataNames.indexOf(match[1]);
                    var fileMetadataNamesIndex = fileMetadataNames.indexOf(match[1]);
                    if (globalMetadataNamesIndex === -1) {
                        if (fileMetadataNamesIndex === -1) {
                            throw new Error('Unrecognized metadata name "' + match[1] + '". Available global metadata names are: ' + globalMetadataNames.join(', ') + '; file metadata names are: ' + fileMetadataNames.join(', '));
                        } else if (fileMetadataNamesIndex === fileMetadataNames.indexOf(testOptMetadataNames.filename)) {
                            // Found an @Filename directive, if this is not the first then create a new subfile
                            if (currentFileContent) {
                                var file = parseFileContent(currentFileContent, currentFileName, markerPositions, markers, ranges);
                                file.fileOptions = currentFileOptions;

                                // Store result file
                                files.push(file);

                                // Reset local data
                                currentFileContent = null;
                                currentFileOptions = {};
                                currentFileName = fileName;
                            }

                            currentFileName = 'tests/cases/fourslash/' + match[2];
                            currentFileOptions[match[1]] = match[2];
                        } else {
                            // Add other fileMetadata flag
                            currentFileOptions[match[1]] = match[2];
                        }
                    } else {
                        // Check if the match is already existed in the global options
                        if (globalOptions[match[1]] !== undefined) {
                            throw new Error("Global Option : '" + match[1] + "' is already existed");
                        }
                        globalOptions[match[1]] = match[2];
                    }
                }
            } else if (line == '' || lineLength === 0) {
                // Previously blank lines between fourslash content caused it to be considered as 2 files,
                // Remove this behavior since it just causes errors now
            } else {
                // Empty line or code line, terminate current subfile if there is one
                if (currentFileContent) {
                    var file = parseFileContent(currentFileContent, currentFileName, markerPositions, markers, ranges);
                    file.fileOptions = currentFileOptions;

                    // Store result file
                    files.push(file);

                    // Reset local data
                    currentFileContent = null;
                    currentFileOptions = {};
                    currentFileName = fileName;
                }
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

    const enum State {
        none,
        inSlashStarMarker,
        inObjectMarker
    }

    function reportError(fileName: string, line: number, col: number, message: string) {
        var errorMessage = fileName + "(" + line + "," + col + "): " + message;
        throw new Error(errorMessage);
    }

    function recordObjectMarker(fileName: string, location: ILocationInformation, text: string, markerMap: MarkerMap, markers: Marker[]): Marker {
        var markerValue: any = undefined;
        try {
            // Attempt to parse the marker value as JSON
            markerValue = JSON.parse("{ " + text + " }");
        } catch (e) {
            reportError(fileName, location.sourceLine, location.sourceColumn, "Unable to parse marker text " + e.message);
        }

        if (markerValue === undefined) {
            reportError(fileName, location.sourceLine, location.sourceColumn, "Object markers can not be empty");
            return null;
        }

        var marker: Marker = {
            fileName: fileName,
            position: location.position,
            data: markerValue
        };

        // Object markers can be anonymous
        if (markerValue.name) {
            markerMap[markerValue.name] = marker;
        }

        markers.push(marker);

        return marker;
    }

    function recordMarker(fileName: string, location: ILocationInformation, name: string, markerMap: MarkerMap, markers: Marker[]): Marker {
        var marker: Marker = {
            fileName: fileName,
            position: location.position
        };

        // Verify markers for uniqueness
        if (markerMap[name] !== undefined) {
            var message = "Marker '" + name + "' is duplicated in the source file contents.";
            reportError(marker.fileName, location.sourceLine, location.sourceColumn, message);
            return null;
        } else {
            markerMap[name] = marker;
            markers.push(marker);
            return marker;
        }
    }

    function parseFileContent(content: string, fileName: string, markerMap: MarkerMap, markers: Marker[], ranges: Range[]): FourSlashFile {
        content = chompLeadingSpace(content);

        // Any slash-star comment with a character not in this string is not a marker.
        var validMarkerChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$1234567890_';

        /// The file content (minus metacharacters) so far
        var output: string = "";

        /// The current marker (or maybe multi-line comment?) we're parsing, possibly
        var openMarker: ILocationInformation = null;

        /// A stack of the open range markers that are still unclosed
        var openRanges: IRangeLocationInformation[] = [];

        /// A list of ranges we've collected so far */
        var localRanges: Range[] = [];

        /// The latest position of the start of an unflushed plain text area
        var lastNormalCharPosition: number = 0;

        /// The total number of metacharacters removed from the file (so far)
        var difference: number = 0;

        /// The fourslash file state object we are generating
        var state: State = State.none;

        /// Current position data
        var line: number = 1;
        var column: number = 1;

        var flush = (lastSafeCharIndex: number) => {
            if (lastSafeCharIndex === undefined) {
                output = output + content.substr(lastNormalCharPosition);
            } else {
                output = output + content.substr(lastNormalCharPosition, lastSafeCharIndex - lastNormalCharPosition);
            }
        };

        if (content.length > 0) {
            var previousChar = content.charAt(0);
            for (var i = 1; i < content.length; i++) {
                var currentChar = content.charAt(i);
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
                        } else if (previousChar === "|" && currentChar === "]") {
                            // found a range end
                            var rangeStart = openRanges.pop();
                            if (!rangeStart) {
                                reportError(fileName, line, column, "Found range end with no matching start.");
                            }

                            var range: Range = {
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
                        } else if (previousChar === "/" && currentChar === "*") {
                            // found a possible marker start
                            state = State.inSlashStarMarker;
                            openMarker = {
                                position: (i - 1) - difference,
                                sourcePosition: i - 1,
                                sourceLine: line,
                                sourceColumn: column,
                            };
                        } else if (previousChar === "{" && currentChar === "|") {
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
                            var objectMarkerNameText = content.substring(openMarker.sourcePosition + 2, i - 1).trim();
                            var marker = recordObjectMarker(fileName, openMarker, objectMarkerNameText, markerMap, markers);

                            if (openRanges.length > 0) {
                                openRanges[openRanges.length - 1].marker = marker;
                            }

                            // Set the current start to point to the end of the current marker to ignore its text
                            lastNormalCharPosition = i + 1;
                            difference += i + 1 - openMarker.sourcePosition;

                            // Reset the state
                            openMarker = null;
                            state = State.none;
                        }
                        break;

                    case State.inSlashStarMarker:
                        if (previousChar === "*" && currentChar === "/") {
                            // Record the marker
                            // start + 2 to ignore the */, -1 on the end to ignore the * (/ is next)
                            var markerNameText = content.substring(openMarker.sourcePosition + 2, i - 1).trim();
                            var marker = recordMarker(fileName, openMarker, markerNameText, markerMap, markers);

                            if (openRanges.length > 0) {
                                openRanges[openRanges.length - 1].marker = marker;
                            }

                            // Set the current start to point to the end of the current marker to ignore its text
                            flush(openMarker.sourcePosition);
                            lastNormalCharPosition = i + 1;
                            difference += i + 1 - openMarker.sourcePosition;

                            // Reset the state
                            openMarker = null;
                            state = State.none;
                        } else if (validMarkerChars.indexOf(currentChar) < 0) {
                            if (currentChar === '*' && i < content.length - 1 && content.charAt(i + 1) === '/') {
                                // The marker is about to be closed, ignore the 'invalid' char
                            } else {
                                // We've hit a non-valid marker character, so we were actually in a block comment
                                // Bail out the text we've gathered so far back into the output
                                flush(i);
                                lastNormalCharPosition = i;
                                openMarker = null;

                                state = State.none;
                            }
                        }
                        break;
                }

                if (currentChar === '\n' && previousChar === '\r') {
                    // Ignore trailing \n after a \r
                    continue;
                } else if (currentChar === '\n' || currentChar === '\r') {
                    line++;
                    column = 1;
                    continue;
                }

                column++;
                previousChar = currentChar;
            }
        }

        // Add the remaining text
        flush(undefined);

        if (openRanges.length > 0) {
            var openRange = openRanges[0];
            reportError(fileName, openRange.sourceLine, openRange.sourceColumn, "Unterminated range.");
        }

        if (openMarker !== null) {
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
}
