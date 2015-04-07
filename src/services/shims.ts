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

var debugObjectHost = (<any>this);

module ts {
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
        getCancellationToken(): CancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFileName(options: string): string;
        getNewLine?(): string;
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
        logger: Logger;
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
         * { fileName: string; textSpan: { start: number; length: number}; isWriteAccess: boolean }[]
         */
        getReferencesAtPosition(fileName: string, position: number): string;
        
        /**
         * Returns a JSON-encoded value of the type:
         * { definition: <encoded>; references: <encoded>[] }[]
         */
        findReferences(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; isWriteAccess: boolean }[]
         */
        getOccurrencesAtPosition(fileName: string, position: number): string;

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

        getEmitOutput(fileName: string): string;
    }

    export interface ClassifierShim extends Shim {
        getClassificationsForLine(text: string, lexState: EndOfLineState, syntacticClassifierAbsent?: boolean): string;
    }

    export interface CoreServicesShim extends Shim {
        getPreProcessedFileInfo(fileName: string, sourceText: IScriptSnapshot): string;
        getDefaultCompilationSettings(): string;
    }

    function logInternalError(logger: Logger, err: Error) {
        logger.log("*INTERNAL ERROR* - Exception in typescript services: " + err.message);
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
            let oldSnapshotShim = <ScriptSnapshotShimAdapter>oldSnapshot;
            let encoded = this.scriptSnapshotShim.getChangeRange(oldSnapshotShim.scriptSnapshotShim);
            if (encoded == null) {
                return null;
            }

            let decoded: { span: { start: number; length: number; }; newLength: number; } = JSON.parse(encoded);
            return createTextChangeRange(
                createTextSpan(decoded.span.start, decoded.span.length), decoded.newLength);
        }
    }

    export class LanguageServiceShimHostAdapter implements LanguageServiceHost {
        private files: string[];

        constructor(private shimHost: LanguageServiceShimHost) {
        }

        public log(s: string): void {
            this.shimHost.log(s);
        }

        public trace(s: string): void {
            this.shimHost.trace(s);
        }

        public error(s: string): void {
            this.shimHost.error(s);
        }

        public getCompilationSettings(): CompilerOptions {
            let settingsJson = this.shimHost.getCompilationSettings();
            if (settingsJson == null || settingsJson == "") {
                throw Error("LanguageServiceShimHostAdapter.getCompilationSettings: empty compilationSettings");
                return null;
            }
            return <CompilerOptions>JSON.parse(settingsJson);
        }

        public getScriptFileNames(): string[] {
            let encoded = this.shimHost.getScriptFileNames();
            return this.files = JSON.parse(encoded);
        }

        public getScriptSnapshot(fileName: string): IScriptSnapshot {
            // Shim the API changes for 1.5 release. This should be removed once
            // TypeScript 1.5 has shipped.
            if (this.files && this.files.indexOf(fileName) < 0) {
                return undefined;
            }
            let scriptSnapshot = this.shimHost.getScriptSnapshot(fileName);
            return scriptSnapshot && new ScriptSnapshotShimAdapter(scriptSnapshot);
        }

        public getScriptVersion(fileName: string): string {
            return this.shimHost.getScriptVersion(fileName);
        }

        public getLocalizedDiagnosticMessages(): any {
            let diagnosticMessagesJson = this.shimHost.getLocalizedDiagnosticMessages();
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

        public getCancellationToken(): CancellationToken {
            return this.shimHost.getCancellationToken();
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

    function simpleForwardCall(logger: Logger, actionDescription: string, action: () => any): any {
        logger.log(actionDescription);
        let start = Date.now();
        let result = action();
        let end = Date.now();
        logger.log(actionDescription + " completed in " + (end - start) + " msec");
        if (typeof (result) === "string") {
            let str = <string>result;
            if (str.length > 128) {
                str = str.substring(0, 128) + "...";
            }
            logger.log("  result.length=" + str.length + ", result='" + JSON.stringify(str) + "'");
        }
        return result;
    }

    function forwardJSONCall(logger: Logger, actionDescription: string, action: () => any): string {
        try {
            let result = simpleForwardCall(logger, actionDescription, action);
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

    function serializeResultAsJson(target: Shim, key: string | symbol, descriptor: PropertyDescriptor) {
        let action = descriptor.value;
        descriptor.value = function () {
            let _arguments = arguments;
            return forwardJSONCall((<Shim>this).logger,
                <string>key + "(" + JSON.stringify(Array.prototype.join.call(_arguments, ", ")) + ")",
                () => action.apply(this, _arguments));
        };
        return descriptor;
    }

    class ShimBase implements Shim {
        constructor(private factory: ShimFactory, public logger: Logger) {
            factory.registerShim(this);
        }
        public dispose(dummy: any): void {
            this.factory.unregisterShim(this);
        }
    }

    /* @internal */
    export function realizeDiagnostics(diagnostics: Diagnostic[], newLine: string): { message: string; start: number; length: number; category: string; }[] {
        return diagnostics.map(d => realizeDiagnostic(d, newLine));
    }

    function realizeDiagnostic(diagnostic: Diagnostic, newLine: string): { message: string; start: number; length: number; category: string; } {
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
        constructor(factory: ShimFactory,
            private host: LanguageServiceShimHost,
            public languageService: LanguageService) {
            super(factory, host);
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
        @serializeResultAsJson
        public refresh(throwOnError: boolean): void {
            return <any>null;
        }

        @serializeResultAsJson
        public cleanupSemanticCache(): void {
            this.languageService.cleanupSemanticCache();
            return <any>null;
        }

        private realizeDiagnostics(diagnostics: Diagnostic[]): { message: string; start: number; length: number; category: string; }[] {
            return ts.realizeDiagnostics(diagnostics, this.getNewLine());
        }

        @serializeResultAsJson
        public getSyntacticClassifications(fileName: string, start: number, length: number): any {
            return this.languageService.getSyntacticClassifications(fileName, createTextSpan(start, length));
        }

        @serializeResultAsJson

        public getSemanticClassifications(fileName: string, start: number, length: number): any {
            return this.languageService.getSemanticClassifications(fileName, createTextSpan(start, length));
        }

        private getNewLine(): string {
            return this.host.getNewLine ? this.host.getNewLine() : "\r\n";
        }

        @serializeResultAsJson
        public getSyntacticDiagnostics(fileName: string): any {
            let diagnostics = this.languageService.getSyntacticDiagnostics(fileName);
            return this.realizeDiagnostics(diagnostics);
        }

        @serializeResultAsJson
        public getSemanticDiagnostics(fileName: string): any {
            let diagnostics = this.languageService.getSemanticDiagnostics(fileName);
            return this.realizeDiagnostics(diagnostics);
        }

        @serializeResultAsJson
        public getCompilerOptionsDiagnostics(): any {
            let diagnostics = this.languageService.getCompilerOptionsDiagnostics();
            return this.realizeDiagnostics(diagnostics);
        }

        /// QUICKINFO

        /**
         * Computes a string representation of the type at the requested position
         * in the active file.
         */
        @serializeResultAsJson
        public getQuickInfoAtPosition(fileName: string, position: number): any {
            return this.languageService.getQuickInfoAtPosition(fileName, position);
        }

        /// NAMEORDOTTEDNAMESPAN

        /**
         * Computes span information of the name or dotted name at the requested position
         * in the active file.
         */
        @serializeResultAsJson
        public getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): any {
            return this.languageService.getNameOrDottedNameSpan(fileName, startPos, endPos);
        }

        /**
         * STATEMENTSPAN
         * Computes span information of statement at the requested position in the active file.
         */
        @serializeResultAsJson
        public getBreakpointStatementAtPosition(fileName: string, position: number): any {
            return this.languageService.getBreakpointStatementAtPosition(fileName, position);
        }

        /// SIGNATUREHELP

        @serializeResultAsJson
        public getSignatureHelpItems(fileName: string, position: number): any {
            return this.languageService.getSignatureHelpItems(fileName, position);
        }

        /// GOTO DEFINITION

        /**
         * Computes the definition location and file for the symbol
         * at the requested position. 
         */
        @serializeResultAsJson
        public getDefinitionAtPosition(fileName: string, position: number): any {
            return this.languageService.getDefinitionAtPosition(fileName, position);
        }

        @serializeResultAsJson
        public getRenameInfo(fileName: string, position: number): any {
            return this.languageService.getRenameInfo(fileName, position);
        }

        @serializeResultAsJson
        public findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): any {
            return this.languageService.findRenameLocations(fileName, position, findInStrings, findInComments);
        }

        /// GET BRACE MATCHING
        @serializeResultAsJson
        public getBraceMatchingAtPosition(fileName: string, position: number): any {
            return this.languageService.getBraceMatchingAtPosition(fileName, position);
        }

        /// GET SMART INDENT
        @serializeResultAsJson
        public getIndentationAtPosition(fileName: string, position: number, options: string /*Services.EditorOptions*/): any {
            return this.languageService.getIndentationAtPosition(fileName, position, <EditorOptions>JSON.parse(options));
        }

        /// GET REFERENCES
        @serializeResultAsJson
        public getReferencesAtPosition(fileName: string, position: number): any {
            return this.languageService.getReferencesAtPosition(fileName, position);
        }

        @serializeResultAsJson
        public findReferences(fileName: string, position: number): any {
            return this.languageService.findReferences(fileName, position);
        }

        @serializeResultAsJson
        public getOccurrencesAtPosition(fileName: string, position: number): any {
            return this.languageService.getOccurrencesAtPosition(fileName, position);
        }

        /// COMPLETION LISTS

        /**
         * Get a string based representation of the completions 
         * to provide at the given source position and providing a member completion 
         * list if requested.
         */
        @serializeResultAsJson
        public getCompletionsAtPosition(fileName: string, position: number): any {
            return this.languageService.getCompletionsAtPosition(fileName, position);
        }

        /** Get a string based representation of a completion list entry details */
        @serializeResultAsJson
        public getCompletionEntryDetails(fileName: string, position: number, entryName: string): any {
            return this.languageService.getCompletionEntryDetails(fileName, position, entryName);
        }

        @serializeResultAsJson
        public getFormattingEditsForRange(fileName: string, start: number, end: number, options: string/*Services.FormatCodeOptions*/): any {
            let localOptions: ts.FormatCodeOptions = JSON.parse(options);
            return this.languageService.getFormattingEditsForRange(fileName, start, end, localOptions);
        }

        @serializeResultAsJson
        public getFormattingEditsForDocument(fileName: string, options: string/*Services.FormatCodeOptions*/): any {
            let localOptions: ts.FormatCodeOptions = JSON.parse(options);
            return this.languageService.getFormattingEditsForDocument(fileName, localOptions);
        }

        @serializeResultAsJson
        public getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string/*Services.FormatCodeOptions*/): any {
            let localOptions: ts.FormatCodeOptions = JSON.parse(options);
            return this.languageService.getFormattingEditsAfterKeystroke(fileName, position, key, localOptions);
        }

        /// NAVIGATE TO

        /** Return a list of symbols that are interesting to navigate to */
        @serializeResultAsJson
        public getNavigateToItems(searchValue: string, maxResultCount?: number): any {
            return this.languageService.getNavigateToItems(searchValue, maxResultCount);
        }

        @serializeResultAsJson
        public getNavigationBarItems(fileName: string): any {
            return this.languageService.getNavigationBarItems(fileName);
        }

        @serializeResultAsJson
        public getOutliningSpans(fileName: string): any {
            return this.languageService.getOutliningSpans(fileName);
        }

        @serializeResultAsJson
        public getTodoComments(fileName: string, descriptors: string): any {
            return this.languageService.getTodoComments(fileName, JSON.parse(descriptors));
        }

        /// Emit
        @serializeResultAsJson
        public getEmitOutput(fileName: string): any {
            let output = this.languageService.getEmitOutput(fileName);
            // Shim the API changes for 1.5 release. This should be removed once
            // TypeScript 1.5 has shipped.
            (<any>output).emitOutputStatus = output.emitSkipped ? 1 : 0;
            return output;
        }
    }

    class ClassifierShimObject extends ShimBase implements ClassifierShim {
        public classifier: Classifier;

        constructor(factory: ShimFactory, logger: Logger) {
            super(factory, logger);
            this.classifier = createClassifier();
        }

        /// COLORIZATION
        public getClassificationsForLine(text: string, lexState: EndOfLineState, classifyKeywordsInGenerics?: boolean): string {
            let classification = this.classifier.getClassificationsForLine(text, lexState, classifyKeywordsInGenerics);
            let items = classification.entries;
            let result = "";
            for (let i = 0; i < items.length; i++) {
                result += items[i].length + "\n";
                result += items[i].classification + "\n";
            }
            result += classification.finalLexState;
            return result;
        }
    }

    class CoreServicesShimObject extends ShimBase implements CoreServicesShim {
        constructor(factory: ShimFactory, logger: Logger) {
            super(factory, logger);
        }

        @serializeResultAsJson
        public getPreProcessedFileInfo(fileName: string, sourceTextSnapshot: IScriptSnapshot): any {
            let result = preProcessFile(sourceTextSnapshot.getText(0, sourceTextSnapshot.getLength()));
            let convertResult = {
                referencedFiles: <IFileReference[]>[],
                importedFiles: <IFileReference[]>[],
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
        }

        @serializeResultAsJson
        public getDefaultCompilationSettings(): any {
            return getDefaultCompilerOptions();
        }
    }

    export class TypeScriptServicesFactory implements ShimFactory {
        private _shims: Shim[] = [];
        private documentRegistry: DocumentRegistry = createDocumentRegistry();

        /*
         * Returns script API version.
         */
        public getServicesVersion(): string {
            return servicesVersion;
        }

        public createLanguageServiceShim(host: LanguageServiceShimHost): LanguageServiceShim {
            try {
                let hostAdapter = new LanguageServiceShimHostAdapter(host);
                let languageService = createLanguageService(hostAdapter, this.documentRegistry);
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

        public createCoreServicesShim(logger: Logger): CoreServicesShim {
            try {
                return new CoreServicesShimObject(this, logger);
            }
            catch (err) {
                logInternalError(logger, err);
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
            for (let i = 0, n = this._shims.length; i < n; i++) {
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
    declare let module: any;
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ts;
    }
}


/// TODO: this is used by VS, clean this up on both sides of the interface
module TypeScript.Services {
    export var TypeScriptServicesFactory = ts.TypeScriptServicesFactory;
}

let toolsVersion = "1.4";
