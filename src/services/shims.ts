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

/// <reference path='services.ts' />

/* @internal */
var debugObjectHost = (<any>this);

/* @internal */
namespace ts {
    export interface ScriptSnapshotShim {
        /** Gets a portion of the script snapshot specified by [start, end). */
        getText(start: number, end: number): string;

        /** Gets the length of this script snapshot. */
        getLength(): number;

        /**
         * Returns a JSON-encoded value of the type:
         *   { span: { start: number; length: number }; newLength: number }
         *
         * Or undefined value if there was no change.
         */
        getChangeRange(oldSnapshot: ScriptSnapshotShim): string;

        /** Releases all resources held by this script snapshot */
        dispose?(): void;
    }

    export interface Logger {
        log(s: string): void;
        trace(s: string): void;
        error(s: string): void;
    }

    /** Public interface of the host of a language service shim instance.*/
    export interface LanguageServiceShimHost extends Logger {
        getCompilationSettings(): string;

        /** Returns a JSON-encoded value of the type: string[] */
        getScriptFileNames(): string;
        getScriptVersion(fileName: string): string;
        getScriptSnapshot(fileName: string): ScriptSnapshotShim;
        getLocalizedDiagnosticMessages(): string;
        getCancellationToken(): HostCancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFileName(options: string): string;
        getNewLine?(): string;
        getProjectVersion?(): string;
        useCaseSensitiveFileNames?(): boolean;
        
        getModuleResolutionsForFile?(fileName: string): string;
    }

    /** Public interface of the the of a config service shim instance.*/
    export interface CoreServicesShimHost extends Logger, ModuleResolutionHost {
        /**
         * Returns a JSON-encoded value of the type: string[]
         *
         * @param exclude A JSON encoded string[] containing the paths to exclude
         *  when enumerating the directory.
         */
        readDirectory(rootDir: string, extension: string, exclude?: string): string;
    }

    ///
    /// Pre-processing
    ///
    // Note: This is being using by the host (VS) and is marshaled back and forth.
    // When changing this make sure the changes are reflected in the managed side as well
    export interface IFileReference {
        path: string;
        position: number;
        length: number;
    }

    /** Public interface of a language service instance shim. */
    export interface ShimFactory {
        registerShim(shim: Shim): void;
        unregisterShim(shim: Shim): void;
    }

    export interface Shim {
        dispose(dummy: any): void;
    }

    export interface LanguageServiceShim extends Shim {
        languageService: LanguageService;

        dispose(dummy: any): void;

        refresh(throwOnError: boolean): void;

        cleanupSemanticCache(): void;

        getSyntacticDiagnostics(fileName: string): string;
        getSemanticDiagnostics(fileName: string): string;
        getCompilerOptionsDiagnostics(): string;

        getSyntacticClassifications(fileName: string, start: number, length: number): string;
        getSemanticClassifications(fileName: string, start: number, length: number): string;
        getEncodedSyntacticClassifications(fileName: string, start: number, length: number): string;
        getEncodedSemanticClassifications(fileName: string, start: number, length: number): string;

        getCompletionsAtPosition(fileName: string, position: number): string;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): string;

        getQuickInfoAtPosition(fileName: string, position: number): string;

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string;
        getBreakpointStatementAtPosition(fileName: string, position: number): string;

        getSignatureHelpItems(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { canRename: boolean, localizedErrorMessage: string, displayName: string, fullDisplayName: string, kind: string, kindModifiers: string, triggerSpan: { start; length } }
         */
        getRenameInfo(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string, textSpan: { start: number, length: number } }[]
         */
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; kind: string; name: string; containerKind: string; containerName: string }
         *
         * Or undefined value if no definition can be found.
         */
        getDefinitionAtPosition(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; kind: string; name: string; containerKind: string; containerName: string }
         *
         * Or undefined value if no definition can be found.
         */
        getTypeDefinitionAtPosition(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; isWriteAccess: boolean }[]
         */
        getReferencesAtPosition(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { definition: <encoded>; references: <encoded>[] }[]
         */
        findReferences(fileName: string, position: number): string;

        /**
         * @deprecated
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; isWriteAccess: boolean }[]
         */
        getOccurrencesAtPosition(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; highlights: { start: number; length: number, isDefinition: boolean }[] }[]
         *
         * @param fileToSearch A JSON encoded string[] containing the file names that should be
         *  considered when searching.
         */
        getDocumentHighlights(fileName: string, position: number, filesToSearch: string): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { name: string; kind: string; kindModifiers: string; containerName: string; containerKind: string; matchKind: string; fileName: string; textSpan: { start: number; length: number}; } [] = [];
         */
        getNavigateToItems(searchValue: string, maxResultCount?: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { text: string; kind: string; kindModifiers: string; bolded: boolean; grayed: boolean; indent: number; spans: { start: number; length: number; }[]; childItems: <recursive use of this type>[] } [] = [];
         */
        getNavigationBarItems(fileName: string): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { textSpan: { start: number, length: number }; hintSpan: { start: number, length: number }; bannerText: string; autoCollapse: boolean } [] = [];
         */
        getOutliningSpans(fileName: string): string;

        getTodoComments(fileName: string, todoCommentDescriptors: string): string;

        getBraceMatchingAtPosition(fileName: string, position: number): string;
        getIndentationAtPosition(fileName: string, position: number, options: string/*Services.EditorOptions*/): string;

        getFormattingEditsForRange(fileName: string, start: number, end: number, options: string/*Services.FormatCodeOptions*/): string;
        getFormattingEditsForDocument(fileName: string, options: string/*Services.FormatCodeOptions*/): string;
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string/*Services.FormatCodeOptions*/): string;

        /**
         * Returns JSON-encoded value of the type TextInsertion.
         */
        getDocCommentTemplateAtPosition(fileName: string, position: number): string;

        getEmitOutput(fileName: string): string;
    }

    export interface ClassifierShim extends Shim {
        getEncodedLexicalClassifications(text: string, lexState: EndOfLineState, syntacticClassifierAbsent?: boolean): string;
        getClassificationsForLine(text: string, lexState: EndOfLineState, syntacticClassifierAbsent?: boolean): string;
    }

    export interface CoreServicesShim extends Shim {
        getPreProcessedFileInfo(fileName: string, sourceText: IScriptSnapshot): string;
        getTSConfigFileInfo(fileName: string, sourceText: IScriptSnapshot): string;
        getDefaultCompilationSettings(): string;
    }

    function logInternalError(logger: Logger, err: Error) {
        if (logger) {
            logger.log("*INTERNAL ERROR* - Exception in typescript services: " + err.message);
        }
    }

    class ScriptSnapshotShimAdapter implements IScriptSnapshot {
        private lineStartPositions: number[] = null;

        constructor(private scriptSnapshotShim: ScriptSnapshotShim) {
        }

        public getText(start: number, end: number): string {
            return this.scriptSnapshotShim.getText(start, end);
        }

        public getLength(): number {
            return this.scriptSnapshotShim.getLength();
        }

        public getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange {
            var oldSnapshotShim = <ScriptSnapshotShimAdapter>oldSnapshot;
            var encoded = this.scriptSnapshotShim.getChangeRange(oldSnapshotShim.scriptSnapshotShim);
            // TODO: should this be '==='?
            if (encoded == null) {
                return null;
            }

            var decoded: { span: { start: number; length: number; }; newLength: number; } = JSON.parse(encoded);
            return createTextChangeRange(
                createTextSpan(decoded.span.start, decoded.span.length), decoded.newLength);
        }

        public dispose(): void {
            // if scriptSnapshotShim is a COM object then property check becomes method call with no arguments
            // 'in' does not have this effect
            if ("dispose" in this.scriptSnapshotShim) {
                this.scriptSnapshotShim.dispose();
            }
        }
    }

    export class LanguageServiceShimHostAdapter implements LanguageServiceHost {
        private files: string[];
        private loggingEnabled = false;
        private tracingEnabled = false;
        
        public resolveModuleNames: (moduleName: string[], containingFile: string) => ResolvedModule[];
        
        constructor(private shimHost: LanguageServiceShimHost) {
            // if shimHost is a COM object then property check will become method call with no arguments.
            // 'in' does not have this effect. 
            if ("getModuleResolutionsForFile" in this.shimHost) {
                this.resolveModuleNames = (moduleNames: string[], containingFile: string) => {
                    let resolutionsInFile = <Map<string>>JSON.parse(this.shimHost.getModuleResolutionsForFile(containingFile));
                    return map(moduleNames, name => {
                        const result = lookUp(resolutionsInFile, name);
                        return result ? { resolvedFileName: result } : undefined;
                    });
                };
            }
        }

        public log(s: string): void {
            if (this.loggingEnabled) {
                this.shimHost.log(s);
            }
        }

        public trace(s: string): void {
            if (this.tracingEnabled) {
                this.shimHost.trace(s);
            }
        }

        public error(s: string): void {
            this.shimHost.error(s);
        }

        public getProjectVersion(): string {
            if (!this.shimHost.getProjectVersion) {
                // shimmed host does not support getProjectVersion
                return undefined;
            }

            return this.shimHost.getProjectVersion();
        }

        public useCaseSensitiveFileNames(): boolean {
            return this.shimHost.useCaseSensitiveFileNames ? this.shimHost.useCaseSensitiveFileNames() : false;
        }

        public getCompilationSettings(): CompilerOptions {
            var settingsJson = this.shimHost.getCompilationSettings();
            // TODO: should this be '==='?
            if (settingsJson == null || settingsJson == "") {
                throw Error("LanguageServiceShimHostAdapter.getCompilationSettings: empty compilationSettings");
                return null;
            }
            return <CompilerOptions>JSON.parse(settingsJson);
        }

        public getScriptFileNames(): string[] {
            var encoded = this.shimHost.getScriptFileNames();
            return this.files = JSON.parse(encoded);
        }

        public getScriptSnapshot(fileName: string): IScriptSnapshot {
            // Shim the API changes for 1.5 release. This should be removed once
            // TypeScript 1.5 has shipped.
            if (this.files && this.files.indexOf(fileName) < 0) {
                return undefined;
            }
            var scriptSnapshot = this.shimHost.getScriptSnapshot(fileName);
            return scriptSnapshot && new ScriptSnapshotShimAdapter(scriptSnapshot);
        }

        public getScriptVersion(fileName: string): string {
            return this.shimHost.getScriptVersion(fileName);
        }

        public getLocalizedDiagnosticMessages(): any {
            var diagnosticMessagesJson = this.shimHost.getLocalizedDiagnosticMessages();
            if (diagnosticMessagesJson == null || diagnosticMessagesJson == "") {
                return null;
            }

            try {
                return JSON.parse(diagnosticMessagesJson);
            }
            catch (e) {
                this.log(e.description || "diagnosticMessages.generated.json has invalid JSON format");
                return null;
            }
        }

        public getCancellationToken(): HostCancellationToken {
            var hostCancellationToken = this.shimHost.getCancellationToken();
            return new ThrottledCancellationToken(hostCancellationToken);
        }

        public getCurrentDirectory(): string {
            return this.shimHost.getCurrentDirectory();
        }

        public getDefaultLibFileName(options: CompilerOptions): string {
            // Wrap the API changes for 1.5 release. This try/catch
            // should be removed once TypeScript 1.5 has shipped.
            try {
                return this.shimHost.getDefaultLibFileName(JSON.stringify(options));
            }
            catch (e) {
                return "";
            }
        }
    }

    /** A cancellation that throttles calls to the host */
    class ThrottledCancellationToken implements HostCancellationToken {
        // Store when we last tried to cancel.  Checking cancellation can be expensive (as we have
        // to marshall over to the host layer).  So we only bother actually checking once enough
        // time has passed.
        private lastCancellationCheckTime = 0;

        constructor(private hostCancellationToken: HostCancellationToken) {
        }

        public isCancellationRequested(): boolean {
            var time = Date.now();
            var duration = Math.abs(time - this.lastCancellationCheckTime);
            if (duration > 10) {
                // Check no more than once every 10 ms.
                this.lastCancellationCheckTime = time;
                return this.hostCancellationToken.isCancellationRequested();
            }

            return false;
        }
    }

    export class CoreServicesShimHostAdapter implements ParseConfigHost {

        constructor(private shimHost: CoreServicesShimHost) {
        }

        public readDirectory(rootDir: string, extension: string, exclude: string[]): string[] {
            // Wrap the API changes for 1.5 release. This try/catch
            // should be removed once TypeScript 1.5 has shipped.
            // Also consider removing the optional designation for
            // the exclude param at this time.
            var encoded: string;
            try {
                encoded = this.shimHost.readDirectory(rootDir, extension, JSON.stringify(exclude));
            }
            catch (e) {
                encoded = this.shimHost.readDirectory(rootDir, extension);
            }
            return JSON.parse(encoded);
        }
        
        public fileExists(fileName: string): boolean {
            return this.shimHost.fileExists(fileName);
        }
        
        public readFile(fileName: string): string {
            return this.shimHost.readFile(fileName);
        }
    }

    function simpleForwardCall(logger: Logger, actionDescription: string, action: () => any, logPerformance: boolean): any {
        if (logPerformance) {
            logger.log(actionDescription);
            var start = Date.now();
        }

        var result = action();

        if (logPerformance) {
            var end = Date.now();
            logger.log(actionDescription + " completed in " + (end - start) + " msec");
            if (typeof (result) === "string") {
                var str = <string>result;
                if (str.length > 128) {
                    str = str.substring(0, 128) + "...";
                }
                logger.log("  result.length=" + str.length + ", result='" + JSON.stringify(str) + "'");
            }
        }

        return result;
    }

    function forwardJSONCall(logger: Logger, actionDescription: string, action: () => any, logPerformance: boolean): string {
        try {
            var result = simpleForwardCall(logger, actionDescription, action, logPerformance);
            return JSON.stringify({ result: result });
        }
        catch (err) {
            if (err instanceof OperationCanceledException) {
                return JSON.stringify({ canceled: true });
            }
            logInternalError(logger, err);
            err.description = actionDescription;
            return JSON.stringify({ error: err });
        }
    }

    class ShimBase implements Shim {
        constructor(private factory: ShimFactory) {
            factory.registerShim(this);
        }
        public dispose(dummy: any): void {
            this.factory.unregisterShim(this);
        }
    }

    export function realizeDiagnostics(diagnostics: Diagnostic[], newLine: string): { message: string; start: number; length: number; category: string; code: number; } []{
        return diagnostics.map(d => realizeDiagnostic(d, newLine));
    }

    function realizeDiagnostic(diagnostic: Diagnostic, newLine: string): { message: string; start: number; length: number; category: string; code: number; } {
        return {
            message: flattenDiagnosticMessageText(diagnostic.messageText, newLine),
            start: diagnostic.start,
            length: diagnostic.length,
            /// TODO: no need for the tolowerCase call
            category: DiagnosticCategory[diagnostic.category].toLowerCase(),
            code: diagnostic.code
        };
    }

    class LanguageServiceShimObject extends ShimBase implements LanguageServiceShim {
        private logger: Logger;
        private logPerformance = false;

        constructor(factory: ShimFactory,
            private host: LanguageServiceShimHost,
            public languageService: LanguageService) {
            super(factory);
            this.logger = this.host;
        }

        public forwardJSONCall(actionDescription: string, action: () => any): string {
            return forwardJSONCall(this.logger, actionDescription, action, this.logPerformance);
        }

        /// DISPOSE

        /**
         * Ensure (almost) deterministic release of internal Javascript resources when
         * some external native objects holds onto us (e.g. Com/Interop).
         */
        public dispose(dummy: any): void {
            this.logger.log("dispose()");
            this.languageService.dispose();
            this.languageService = null;

            // force a GC
            if (debugObjectHost && debugObjectHost.CollectGarbage) {
                debugObjectHost.CollectGarbage();
                this.logger.log("CollectGarbage()");
            }

            this.logger = null;

            super.dispose(dummy);
        }

        /// REFRESH

        /**
         * Update the list of scripts known to the compiler
         */
        public refresh(throwOnError: boolean): void {
            this.forwardJSONCall(
                "refresh(" + throwOnError + ")",
                () => {
                    return <any>null;
                });
        }

        public cleanupSemanticCache(): void {
            this.forwardJSONCall(
                "cleanupSemanticCache()",
                () => {
                    this.languageService.cleanupSemanticCache();
                    return <any>null;
                });
        }

        private realizeDiagnostics(diagnostics: Diagnostic[]): { message: string; start: number; length: number; category: string; }[]{
            var newLine = getNewLineOrDefaultFromHost(this.host);
            return ts.realizeDiagnostics(diagnostics, newLine);
        }

        public getSyntacticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                "getSyntacticClassifications('" + fileName + "', " + start + ", " + length + ")",
                () => {
                    var classifications = this.languageService.getSyntacticClassifications(fileName, createTextSpan(start, length));
                    return classifications;
                });
        }

        public getSemanticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                "getSemanticClassifications('" + fileName + "', " + start + ", " + length + ")",
                () => {
                    var classifications = this.languageService.getSemanticClassifications(fileName, createTextSpan(start, length));
                    return classifications;
                });
        }

        public getEncodedSyntacticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                "getEncodedSyntacticClassifications('" + fileName + "', " + start + ", " + length + ")",
                () => {
                    // directly serialize the spans out to a string.  This is much faster to decode
                    // on the managed side versus a full JSON array.
                    return convertClassifications(this.languageService.getEncodedSyntacticClassifications(fileName, createTextSpan(start, length)));
                });
        }

        public getEncodedSemanticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                "getEncodedSemanticClassifications('" + fileName + "', " + start + ", " + length + ")",
                () => {
                    // directly serialize the spans out to a string.  This is much faster to decode
                    // on the managed side versus a full JSON array.
                    return convertClassifications(this.languageService.getEncodedSemanticClassifications(fileName, createTextSpan(start, length)));
                });
        }

        public getSyntacticDiagnostics(fileName: string): string {
            return this.forwardJSONCall(
                "getSyntacticDiagnostics('" + fileName + "')",
                () => {
                    var diagnostics = this.languageService.getSyntacticDiagnostics(fileName);
                    return this.realizeDiagnostics(diagnostics);
                });
        }

        public getSemanticDiagnostics(fileName: string): string {
            return this.forwardJSONCall(
                "getSemanticDiagnostics('" + fileName + "')",
                () => {
                    var diagnostics = this.languageService.getSemanticDiagnostics(fileName);
                    return this.realizeDiagnostics(diagnostics);
                });
        }

        public getCompilerOptionsDiagnostics(): string {
            return this.forwardJSONCall(
                "getCompilerOptionsDiagnostics()",
                () => {
                    var diagnostics = this.languageService.getCompilerOptionsDiagnostics();
                    return this.realizeDiagnostics(diagnostics);
                });
        }

        /// QUICKINFO

        /**
         * Computes a string representation of the type at the requested position
         * in the active file.
         */
        public getQuickInfoAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getQuickInfoAtPosition('" + fileName + "', " + position + ")",
                () => {
                    var quickInfo = this.languageService.getQuickInfoAtPosition(fileName, position);
                    return quickInfo;
                });
        }


        /// NAMEORDOTTEDNAMESPAN

        /**
         * Computes span information of the name or dotted name at the requested position
         * in the active file.
         */
        public getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string {
            return this.forwardJSONCall(
                "getNameOrDottedNameSpan('" + fileName + "', " + startPos + ", " + endPos + ")",
                () => {
                    var spanInfo = this.languageService.getNameOrDottedNameSpan(fileName, startPos, endPos);
                    return spanInfo;
                });
        }

        /**
         * STATEMENTSPAN
         * Computes span information of statement at the requested position in the active file.
         */
        public getBreakpointStatementAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getBreakpointStatementAtPosition('" + fileName + "', " + position + ")",
                () => {
                    var spanInfo = this.languageService.getBreakpointStatementAtPosition(fileName, position);
                    return spanInfo;
                });
        }

        /// SIGNATUREHELP

        public getSignatureHelpItems(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getSignatureHelpItems('" + fileName + "', " + position + ")",
                () => {
                    var signatureInfo = this.languageService.getSignatureHelpItems(fileName, position);
                    return signatureInfo;
                });
        }

        /// GOTO DEFINITION

        /**
         * Computes the definition location and file for the symbol
         * at the requested position.
         */
        public getDefinitionAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getDefinitionAtPosition('" + fileName + "', " + position + ")",
                () => {
                    return this.languageService.getDefinitionAtPosition(fileName, position);
                });
        }

        /// GOTO Type

        /**
         * Computes the definition location of the type of the symbol
         * at the requested position.
         */
        public getTypeDefinitionAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getTypeDefinitionAtPosition('" + fileName + "', " + position + ")",
                () => {
                    return this.languageService.getTypeDefinitionAtPosition(fileName, position);
                });
        }

        public getRenameInfo(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getRenameInfo('" + fileName + "', " + position + ")",
                () => {
                    return this.languageService.getRenameInfo(fileName, position);
                });
        }

        public findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): string {
            return this.forwardJSONCall(
                "findRenameLocations('" + fileName + "', " + position + ", " + findInStrings + ", " + findInComments + ")",
                () => {
                    return this.languageService.findRenameLocations(fileName, position, findInStrings, findInComments);
                });
        }

        /// GET BRACE MATCHING
        public getBraceMatchingAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getBraceMatchingAtPosition('" + fileName + "', " + position + ")",
                () => {
                    var textRanges = this.languageService.getBraceMatchingAtPosition(fileName, position);
                    return textRanges;
                });
        }

        /// GET SMART INDENT
        public getIndentationAtPosition(fileName: string, position: number, options: string /*Services.EditorOptions*/): string {
            return this.forwardJSONCall(
                "getIndentationAtPosition('" + fileName + "', " + position + ")",
                () => {
                    var localOptions: EditorOptions = JSON.parse(options);
                    return this.languageService.getIndentationAtPosition(fileName, position, localOptions);
                });
        }

        /// GET REFERENCES

        public getReferencesAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getReferencesAtPosition('" + fileName + "', " + position + ")",
                () => {
                    return this.languageService.getReferencesAtPosition(fileName, position);
                });
        }

        public findReferences(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "findReferences('" + fileName + "', " + position + ")",
                () => {
                    return this.languageService.findReferences(fileName, position);
                });
        }

        public getOccurrencesAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getOccurrencesAtPosition('" + fileName + "', " + position + ")",
                () => {
                    return this.languageService.getOccurrencesAtPosition(fileName, position);
                });
        }

        public getDocumentHighlights(fileName: string, position: number, filesToSearch: string): string {
            return this.forwardJSONCall(
                "getDocumentHighlights('" + fileName + "', " + position + ")",
                () => {
                    var results = this.languageService.getDocumentHighlights(fileName, position, JSON.parse(filesToSearch));
                    // workaround for VS document higlighting issue - keep only items from the initial file
                    let normalizedName = normalizeSlashes(fileName).toLowerCase();
                    return filter(results, r => normalizeSlashes(r.fileName).toLowerCase() === normalizedName);
                });
        }

        /// COMPLETION LISTS

        /**
         * Get a string based representation of the completions
         * to provide at the given source position and providing a member completion
         * list if requested.
         */
        public getCompletionsAtPosition(fileName: string, position: number) {
            return this.forwardJSONCall(
                "getCompletionsAtPosition('" + fileName + "', " + position + ")",
                () => {
                    var completion = this.languageService.getCompletionsAtPosition(fileName, position);
                    return completion;
                });
        }

        /** Get a string based representation of a completion list entry details */
        public getCompletionEntryDetails(fileName: string, position: number, entryName: string) {
            return this.forwardJSONCall(
                "getCompletionEntryDetails('" + fileName + "', " + position + ", " + entryName + ")",
                () => {
                    var details = this.languageService.getCompletionEntryDetails(fileName, position, entryName);
                    return details;
                });
        }

        public getFormattingEditsForRange(fileName: string, start: number, end: number, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsForRange('" + fileName + "', " + start + ", " + end + ")",
                () => {
                    var localOptions: ts.FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsForRange(fileName, start, end, localOptions);
                    return edits;
                });
        }

        public getFormattingEditsForDocument(fileName: string, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsForDocument('" + fileName + "')",
                () => {
                    var localOptions: ts.FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsForDocument(fileName, localOptions);
                    return edits;
                });
        }

        public getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsAfterKeystroke('" + fileName + "', " + position + ", '" + key + "')",
                () => {
                    var localOptions: ts.FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(fileName, position, key, localOptions);
                    return edits;
                });
        }

        public getDocCommentTemplateAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getDocCommentTemplateAtPosition('" + fileName + "', " + position + ")",
                () => this.languageService.getDocCommentTemplateAtPosition(fileName, position)
            );
        }

        /// NAVIGATE TO

        /** Return a list of symbols that are interesting to navigate to */
        public getNavigateToItems(searchValue: string, maxResultCount?: number): string {
            return this.forwardJSONCall(
                "getNavigateToItems('" + searchValue + "', " + maxResultCount+ ")",
                () => {
                    var items = this.languageService.getNavigateToItems(searchValue, maxResultCount);
                    return items;
                });
        }

        public getNavigationBarItems(fileName: string): string {
            return this.forwardJSONCall(
                "getNavigationBarItems('" + fileName + "')",
                () => {
                    var items = this.languageService.getNavigationBarItems(fileName);
                    return items;
                });
        }

        public getOutliningSpans(fileName: string): string {
            return this.forwardJSONCall(
                "getOutliningSpans('" + fileName + "')",
                () => {
                    var items = this.languageService.getOutliningSpans(fileName);
                    return items;
                });
        }

        public getTodoComments(fileName: string, descriptors: string): string {
            return this.forwardJSONCall(
                "getTodoComments('" + fileName + "')",
                () => {
                    var items = this.languageService.getTodoComments(fileName, JSON.parse(descriptors));
                    return items;
                });
        }

        /// Emit
        public getEmitOutput(fileName: string): string {
            return this.forwardJSONCall(
                "getEmitOutput('" + fileName + "')",
                () => {
                    var output = this.languageService.getEmitOutput(fileName);
                    // Shim the API changes for 1.5 release. This should be removed once
                    // TypeScript 1.5 has shipped.
                    (<any>output).emitOutputStatus = output.emitSkipped ? 1 : 0;
                    return output;
                });
        }
    }

    function convertClassifications(classifications: Classifications): { spans: string, endOfLineState: EndOfLineState } {
        return { spans: classifications.spans.join(","), endOfLineState: classifications.endOfLineState };
    }

    class ClassifierShimObject extends ShimBase implements ClassifierShim {
        public classifier: Classifier;
        private logPerformance = false;

        constructor(factory: ShimFactory, private logger: Logger) {
            super(factory);
            this.classifier = createClassifier();
        }

        public getEncodedLexicalClassifications(text: string, lexState: EndOfLineState, syntacticClassifierAbsent?: boolean): string {
            return forwardJSONCall(this.logger, "getEncodedLexicalClassifications",
                () => convertClassifications(this.classifier.getEncodedLexicalClassifications(text, lexState, syntacticClassifierAbsent)),
                this.logPerformance);
        }

        /// COLORIZATION
        public getClassificationsForLine(text: string, lexState: EndOfLineState, classifyKeywordsInGenerics?: boolean): string {
            var classification = this.classifier.getClassificationsForLine(text, lexState, classifyKeywordsInGenerics);
            var items = classification.entries;
            var result = "";
            for (var i = 0; i < items.length; i++) {
                result += items[i].length + "\n";
                result += items[i].classification + "\n";
            }
            result += classification.finalLexState;
            return result;
        }
    }

    class CoreServicesShimObject extends ShimBase implements CoreServicesShim {
        private logPerformance = false;

        constructor(factory: ShimFactory, public logger: Logger, private host: CoreServicesShimHostAdapter) {
            super(factory);
        }

        private forwardJSONCall(actionDescription: string, action: () => any): any {
            return forwardJSONCall(this.logger, actionDescription, action, this.logPerformance);
        }
        
        public resolveModuleName(fileName: string, moduleName: string, compilerOptionsJson: string): string {
            return this.forwardJSONCall(`resolveModuleName('${fileName}')`, () => {
                let compilerOptions = <CompilerOptions>JSON.parse(compilerOptionsJson);
                const result = resolveModuleName(moduleName, normalizeSlashes(fileName), compilerOptions, this.host);
                return {
                    resolvedFileName: result.resolvedModule ? result.resolvedModule.resolvedFileName: undefined,
                    failedLookupLocations: result.failedLookupLocations
                };
            }); 
        }

        public getPreProcessedFileInfo(fileName: string, sourceTextSnapshot: IScriptSnapshot): string {
            return this.forwardJSONCall(
                "getPreProcessedFileInfo('" + fileName + "')",
                () => {
                    var result = preProcessFile(sourceTextSnapshot.getText(0, sourceTextSnapshot.getLength()));
                    var convertResult = {
                        referencedFiles: <IFileReference[]>[],
                        importedFiles: <IFileReference[]>[],
                        ambientExternalModules: result.ambientExternalModules,
                        isLibFile: result.isLibFile
                    };

                    forEach(result.referencedFiles, refFile => {
                        convertResult.referencedFiles.push({
                            path: normalizePath(refFile.fileName),
                            position: refFile.pos,
                            length: refFile.end - refFile.pos
                        });
                    });

                    forEach(result.importedFiles, importedFile => {
                        convertResult.importedFiles.push({
                            path: normalizeSlashes(importedFile.fileName),
                            position: importedFile.pos,
                            length: importedFile.end - importedFile.pos
                        });
                    });
                    return convertResult;
                });
        }

        public getTSConfigFileInfo(fileName: string, sourceTextSnapshot: IScriptSnapshot): string {
            return this.forwardJSONCall(
                "getTSConfigFileInfo('" + fileName + "')",
                () => {
                    let text = sourceTextSnapshot.getText(0, sourceTextSnapshot.getLength());

                    let result = parseConfigFileText(fileName, text);

                    if (result.error) {
                        return {
                            options: {},
                            files: [],
                            errors: [realizeDiagnostic(result.error, '\r\n')]
                        };
                    }

                    var configFile = parseConfigFile(result.config, this.host, getDirectoryPath(normalizeSlashes(fileName)));

                    return {
                        options: configFile.options,
                        files: configFile.fileNames,
                        errors: realizeDiagnostics(configFile.errors, '\r\n')
                    };
                });
        }

        public getDefaultCompilationSettings(): string {
            return this.forwardJSONCall(
                "getDefaultCompilationSettings()",
                () => {
                    return getDefaultCompilerOptions();
                });
        }
    }

    export class TypeScriptServicesFactory implements ShimFactory {
        private _shims: Shim[] = [];
        private documentRegistry: DocumentRegistry;

        /*
         * Returns script API version.
         */
        public getServicesVersion(): string {
            return servicesVersion;
        }

        public createLanguageServiceShim(host: LanguageServiceShimHost): LanguageServiceShim {
            try {
                if (this.documentRegistry === undefined) {
                    this.documentRegistry = createDocumentRegistry(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames());
                }
                var hostAdapter = new LanguageServiceShimHostAdapter(host);
                var languageService = createLanguageService(hostAdapter, this.documentRegistry);
                return new LanguageServiceShimObject(this, host, languageService);
            }
            catch (err) {
                logInternalError(host, err);
                throw err;
            }
        }

        public createClassifierShim(logger: Logger): ClassifierShim {
            try {
                return new ClassifierShimObject(this, logger);
            }
            catch (err) {
                logInternalError(logger, err);
                throw err;
            }
        }

        public createCoreServicesShim(host: CoreServicesShimHost): CoreServicesShim {
            try {
                var adapter = new CoreServicesShimHostAdapter(host);
                return new CoreServicesShimObject(this, <Logger>host, adapter);
            }
            catch (err) {
                logInternalError(<Logger>host, err);
                throw err;
            }
        }

        public close(): void {
            // Forget all the registered shims
            this._shims = [];
            this.documentRegistry = createDocumentRegistry();
        }

        public registerShim(shim: Shim): void {
            this._shims.push(shim);
        }

        public unregisterShim(shim: Shim): void {
            for (var i = 0, n = this._shims.length; i < n; i++) {
                if (this._shims[i] === shim) {
                    delete this._shims[i];
                    return;
                }
            }

            throw new Error("Invalid operation");
        }
    }

    // Here we expose the TypeScript services as an external module
    // so that it may be consumed easily like a node module.
    declare var module: any;
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ts;
    }
}


/// TODO: this is used by VS, clean this up on both sides of the interface
/* @internal */
module TypeScript.Services {
    export var TypeScriptServicesFactory = ts.TypeScriptServicesFactory;
}

/* @internal */
const toolsVersion = "1.6";
