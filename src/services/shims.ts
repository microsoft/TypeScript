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

        /** This call returns the JSON-encoded array of the type: number[] */
        getLineStartPositions(): string;

        /**
         * Returns a JSON-encoded value of the type:
         *   { span: { start: number; length: number }; newLength: number }
         *
         * Or undefined value if there was no change.
         */
        getChangeRange(oldSnapshot: ScriptSnapshotShim): string;
    }

    /** Public interface of the host of a language service shim instance.*/
    export interface LanguageServiceShimHost extends Logger {
        getCompilationSettings(): string;

        /** Returns a JSON-encoded value of the type: string[] */
        getScriptFileNames(): string;
        getScriptVersion(fileName: string): string;
        getScriptIsOpen(fileName: string): boolean;
        getScriptSnapshot(fileName: string): ScriptSnapshotShim;
        getLocalizedDiagnosticMessages(): string;
        getCancellationToken(): CancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFilename(options: string): string;
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

        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): string;
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
         * { fileName: string; textSpan: { start: number; length: number}; isWriteAccess: boolean }[]
         */
        getOccurrencesAtPosition(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { name: string; kind: string; kindModifiers: string; containerName: string; containerKind: string; matchKind: string; fileName: string; textSpan: { start: number; length: number}; } [] = [];
         */
        getNavigateToItems(searchValue: string): string;

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
        getClassificationsForLine(text: string, lexState: EndOfLineState, classifyKeywordsInGenerics?: boolean): string;
    }

    export interface CoreServicesShim extends Shim {
        getPreProcessedFileInfo(fileName: string, sourceText: IScriptSnapshot): string;
        getDefaultCompilationSettings(): string;
    }

    /// TODO: delete this, it is only needed until the VS interface is updated
    export const enum LanguageVersion {
        EcmaScript3 = 0,
        EcmaScript5 = 1,
        EcmaScript6 = 2,
    }

    export const enum ModuleGenTarget {
        Unspecified = 0,
        Synchronous = 1,
        Asynchronous = 2,
    }

    export interface CompilationSettings {
        propagateEnumConstants?: boolean;
        removeComments?: boolean;
        watch?: boolean;
        noResolve?: boolean;
        allowAutomaticSemicolonInsertion?: boolean;
        noImplicitAny?: boolean;
        noLib?: boolean;
        codeGenTarget?: LanguageVersion;
        moduleGenTarget?: ModuleGenTarget;
        outFileOption?: string;
        outDirOption?: string;
        mapSourceFiles?: boolean;
        mapRoot?: string;
        sourceRoot?: string;
        generateDeclarationFiles?: boolean;
        useCaseSensitiveFileResolution?: boolean;
        gatherDiagnostics?: boolean;
        codepage?: number;
        emitBOM?: boolean;

        // Declare indexer signature
        [index: string]: any;
    }

    function languageVersionToScriptTarget(languageVersion: LanguageVersion): ScriptTarget {
        if (typeof languageVersion === "undefined") return undefined;

        switch (languageVersion) {
            case LanguageVersion.EcmaScript3: return ScriptTarget.ES3
            case LanguageVersion.EcmaScript5: return ScriptTarget.ES5;
            case LanguageVersion.EcmaScript6: return ScriptTarget.ES6;
            default: throw Error("unsupported LanguageVersion value: " + languageVersion);
        }
    }

    function moduleGenTargetToModuleKind(moduleGenTarget: ModuleGenTarget): ModuleKind {
        if (typeof moduleGenTarget === "undefined") return undefined;

        switch (moduleGenTarget) {
            case ModuleGenTarget.Asynchronous: return ModuleKind.AMD;
            case ModuleGenTarget.Synchronous: return ModuleKind.CommonJS;
            case ModuleGenTarget.Unspecified: return ModuleKind.None;
            default: throw Error("unsupported ModuleGenTarget value: " + moduleGenTarget);
        }
    }

    function scriptTargetTolanguageVersion(scriptTarget: ScriptTarget): LanguageVersion {
        if (typeof scriptTarget === "undefined") return undefined;

        switch (scriptTarget) {
            case ScriptTarget.ES3: return LanguageVersion.EcmaScript3;
            case ScriptTarget.ES5: return LanguageVersion.EcmaScript5;
            case ScriptTarget.ES6: return LanguageVersion.EcmaScript6;
            default: throw Error("unsupported ScriptTarget value: " + scriptTarget);
        }
    }

    function moduleKindToModuleGenTarget(moduleKind: ModuleKind): ModuleGenTarget {
        if (typeof moduleKind === "undefined") return undefined;

        switch (moduleKind) {
            case ModuleKind.AMD: return ModuleGenTarget.Asynchronous;
            case ModuleKind.CommonJS: return ModuleGenTarget.Synchronous;
            case ModuleKind.None: return ModuleGenTarget.Unspecified;
            default: throw Error("unsupported ModuleKind value: " + moduleKind);
        }
    }

    function compilationSettingsToCompilerOptions(settings: CompilationSettings): CompilerOptions {
        // TODO: we should not be converting, but use options all the way
        var options: CompilerOptions = {};
        //options.propagateEnumConstants = settings.propagateEnumConstants;
        options.removeComments = settings.removeComments;
        options.noResolve = settings.noResolve;
        options.noImplicitAny = settings.noImplicitAny;
        options.noLib = settings.noLib;
        options.target = languageVersionToScriptTarget(settings.codeGenTarget);
        options.module = moduleGenTargetToModuleKind(settings.moduleGenTarget);
        options.out = settings.outFileOption;
        options.outDir = settings.outDirOption;
        options.sourceMap = settings.mapSourceFiles;
        options.mapRoot = settings.mapRoot;
        options.sourceRoot = settings.sourceRoot;
        options.declaration = settings.generateDeclarationFiles;
        //options.useCaseSensitiveFileResolution = settings.useCaseSensitiveFileResolution;
        options.codepage = settings.codepage;
        options.emitBOM = settings.emitBOM;
        return options;
    }

    function compilerOptionsToCompilationSettings(options: CompilerOptions): CompilationSettings {
        var settings: CompilationSettings = {};
        //options.propagateEnumConstants = settings.propagateEnumConstants;
        settings.removeComments = options.removeComments;
        settings.noResolve = options.noResolve;
        settings.noImplicitAny = options.noImplicitAny;
        settings.noLib = options.noLib;
        settings.codeGenTarget = scriptTargetTolanguageVersion(options.target);
        settings.moduleGenTarget = moduleKindToModuleGenTarget(options.module);
        settings.outFileOption = options.out;
        settings.outDirOption = options.outDir;
        settings.mapSourceFiles = options.sourceMap;
        settings.mapRoot = options.mapRoot;
        settings.sourceRoot = options.sourceRoot;
        settings.generateDeclarationFiles = options.declaration;
        // settings.useCaseSensitiveFileResolution = options.useCaseSensitiveFileResolution;
        settings.codepage = options.codepage;
        settings.emitBOM = options.emitBOM;
        return settings;
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

        public getLineStartPositions(): number[] {
            if (this.lineStartPositions == null) {
                this.lineStartPositions = JSON.parse(this.scriptSnapshotShim.getLineStartPositions());
            }

            return this.lineStartPositions;
        }

        public getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange {
            var oldSnapshotShim = <ScriptSnapshotShimAdapter>oldSnapshot;
            var encoded = this.scriptSnapshotShim.getChangeRange(oldSnapshotShim.scriptSnapshotShim);
            if (encoded == null) {
                return null;
            }

            var decoded: { span: { start: number; length: number; }; newLength: number; } = JSON.parse(encoded);
            return new TextChangeRange(
                new TextSpan(decoded.span.start, decoded.span.length), decoded.newLength);
        }
    }

    export class LanguageServiceShimHostAdapter implements LanguageServiceHost {
        constructor(private shimHost: LanguageServiceShimHost) {
        }

        public log(s: string): void {
            this.shimHost.log(s);
        }

        public getCompilationSettings(): CompilerOptions {
            var settingsJson = this.shimHost.getCompilationSettings();
            if (settingsJson == null || settingsJson == "") {
                throw Error("LanguageServiceShimHostAdapter.getCompilationSettings: empty compilationSettings");
                return null;
            }
            var options = compilationSettingsToCompilerOptions(<CompilerOptions>JSON.parse(<any>settingsJson));

            return options;
        }

        public getScriptFileNames(): string[] {
            var encoded = this.shimHost.getScriptFileNames();
            return JSON.parse(encoded);
        }

        public getScriptSnapshot(fileName: string): IScriptSnapshot {
            return new ScriptSnapshotShimAdapter(this.shimHost.getScriptSnapshot(fileName));
        }

        public getScriptVersion(fileName: string): string {
            return this.shimHost.getScriptVersion(fileName);
        }

        public getScriptIsOpen(fileName: string): boolean {
            return this.shimHost.getScriptIsOpen(fileName);
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

        public getCancellationToken(): CancellationToken {
            return this.shimHost.getCancellationToken();
        }

        public getDefaultLibFilename(options: CompilerOptions): string {
            return this.shimHost.getDefaultLibFilename(JSON.stringify(options));
        }

        public getCurrentDirectory(): string {
            return this.shimHost.getCurrentDirectory();
        }
    }

    function simpleForwardCall(logger: Logger, actionDescription: string, action: () => any): any {
        logger.log(actionDescription);
        var start = Date.now();
        var result = action();
        var end = Date.now();
        logger.log(actionDescription + " completed in " + (end - start) + " msec");
        if (typeof (result) === "string") {
            var str = <string>result;
            if (str.length > 128) {
                str = str.substring(0, 128) + "...";
            }
            logger.log("  result.length=" + str.length + ", result='" + JSON.stringify(str) + "'");
        }
        return result;
    }

    function forwardJSONCall(logger: Logger, actionDescription: string, action: () => any): string {
        try {
            var result = simpleForwardCall(logger, actionDescription, action);
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

    class LanguageServiceShimObject extends ShimBase implements LanguageServiceShim {
        private logger: Logger;

        constructor(factory: ShimFactory,
            private host: LanguageServiceShimHost,
            public languageService: LanguageService) {
            super(factory);
            this.logger = this.host;
        }

        public forwardJSONCall(actionDescription: string, action: () => any): string {
            return forwardJSONCall(this.logger, actionDescription, action);
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

        private static realizeDiagnostic(diagnostic: Diagnostic): { message: string; start: number; length: number; category: string; } {
            return {
                message: diagnostic.messageText,
                start: diagnostic.start,
                length: diagnostic.length,
                /// TODO: no need for the tolowerCase call
                category: DiagnosticCategory[diagnostic.category].toLowerCase(),
                code: diagnostic.code
            };
        }

        public getSyntacticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                "getSyntacticClassifications('" + fileName + "', " + start + ", " + length + ")",
                () => {
                    var classifications = this.languageService.getSyntacticClassifications(fileName, new TextSpan(start, length));
                    return classifications;
                });
        }

        public getSemanticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                "getSemanticClassifications('" + fileName + "', " + start + ", " + length + ")",
                () => {
                    var classifications = this.languageService.getSemanticClassifications(fileName, new TextSpan(start, length));
                    return classifications;
                });
        }

        public getSyntacticDiagnostics(fileName: string): string {
            return this.forwardJSONCall(
                "getSyntacticDiagnostics('" + fileName + "')",
                () => {
                    var errors = this.languageService.getSyntacticDiagnostics(fileName);
                    return errors.map(LanguageServiceShimObject.realizeDiagnostic);
                });
        }

        public getSemanticDiagnostics(fileName: string): string {
            return this.forwardJSONCall(
                "getSemanticDiagnostics('" + fileName + "')",
                () => {
                    var errors = this.languageService.getSemanticDiagnostics(fileName);
                    return errors.map(LanguageServiceShimObject.realizeDiagnostic);
                });
        }

        public getCompilerOptionsDiagnostics(): string {
            return this.forwardJSONCall(
                "getCompilerOptionsDiagnostics()",
                () => {
                    var errors = this.languageService.getCompilerOptionsDiagnostics();
                    return errors.map(LanguageServiceShimObject.realizeDiagnostic)
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

        /**
         * Return references to a symbol at the requested position.
         * References are separated by "\n".
         * Each reference is a "fileindex min lim" sub-string.
         */
        public getReferencesAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getReferencesAtPosition('" + fileName + "', " + position + ")",
                () => {
                    return this.languageService.getReferencesAtPosition(fileName, position);
                });
        }

        public getOccurrencesAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getOccurrencesAtPosition('" + fileName + "', " + position + ")",
                () => {
                    return this.languageService.getOccurrencesAtPosition(fileName, position);
                });
        }

        /// COMPLETION LISTS

        /**
         * Get a string based representation of the completions 
         * to provide at the given source position and providing a member completion 
         * list if requested.
         */
        public getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean) {
            return this.forwardJSONCall(
                "getCompletionsAtPosition('" + fileName + "', " + position + ", " + isMemberCompletion + ")",
                () => {
                    var completion = this.languageService.getCompletionsAtPosition(fileName, position, isMemberCompletion);
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

        /// NAVIGATE TO

        /** Return a list of symbols that are interesting to navigate to */
        public getNavigateToItems(searchValue: string): string {
            return this.forwardJSONCall(
                "getNavigateToItems('" + searchValue + "')",
                () => {
                    var items = this.languageService.getNavigateToItems(searchValue);
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
                    return output;
                });
        }
    }

    class ClassifierShimObject extends ShimBase implements ClassifierShim {
        public classifier: Classifier;

        constructor(factory: ShimFactory, public logger: Logger) {
            super(factory);
            this.classifier = createClassifier(this.logger);
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
        constructor(factory: ShimFactory, public logger: Logger) {
            super(factory);
        }

        private forwardJSONCall(actionDescription: string, action: () => any): any {
            return forwardJSONCall(this.logger, actionDescription, action);
        }

        public getPreProcessedFileInfo(fileName: string, sourceTextSnapshot: IScriptSnapshot): string {
            return this.forwardJSONCall(
                "getPreProcessedFileInfo('" + fileName + "')",
                () => {
                    var result = preProcessFile(sourceTextSnapshot.getText(0, sourceTextSnapshot.getLength()));
                    var convertResult = {
                        referencedFiles: <IFileReference[]>[],
                        importedFiles: <IFileReference[]>[],
                        isLibFile: result.isLibFile
                    };

                    forEach(result.referencedFiles, refFile => {
                        convertResult.referencedFiles.push({
                            path: normalizePath(refFile.filename),
                            position: refFile.pos,
                            length: refFile.end - refFile.pos
                        });
                    });

                    forEach(result.importedFiles, importedFile => {
                        convertResult.importedFiles.push({
                            path: normalizeSlashes(importedFile.filename),
                            position: importedFile.pos,
                            length: importedFile.end - importedFile.pos
                        });
                    });
                    return convertResult;
                });
        }

        public getDefaultCompilationSettings(): string {
            return this.forwardJSONCall(
                "getDefaultCompilationSettings()",
                () => {
                    return compilerOptionsToCompilationSettings(getDefaultCompilerOptions());
                });
        }
    }

    export class TypeScriptServicesFactory implements ShimFactory {
        private _shims: Shim[] = [];
        private documentRegistry: DocumentRegistry = createDocumentRegistry();

        public createLanguageServiceShim(host: LanguageServiceShimHost): LanguageServiceShim {
            try {
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
module TypeScript.Services {
    export var TypeScriptServicesFactory = ts.TypeScriptServicesFactory;
}
