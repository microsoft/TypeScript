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

///<reference path='typescriptServices.ts' />
var debugObjectHost = (<any>this);
module TypeScript.Services {
    export interface IScriptSnapshotShim {
        // Get's a portion of the script snapshot specified by [start, end).  
        getText(start: number, end: number): string;

        // Get's the length of this script snapshot.
        getLength(): number;

        // This call returns the JSON encoded array of the type:
        //  number[]
        getLineStartPositions(): string;

        // Returns a JSON encoded value of the type:
        //  { span: { start: number; length: number }; newLength: number }
        //
        // Or null value if there was no change.
        getTextChangeRangeSinceVersion(scriptVersion: number): string;
    }

    //
    // Public interface of the host of a language service shim instance.
    //
    export interface LanguageServiceShimHost extends TypeScript.Logger {
        getCompilationSettings(): string;

        // Returns a JSON encoded value of the type:
        // string[]
        getScriptFileNames(): string;
        getScriptVersion(fileName: string): number;
        getScriptIsOpen(fileName: string): boolean;
        getScriptByteOrderMark(fileName: string): number;
        getScriptSnapshot(fileName: string): IScriptSnapshotShim;
        resolveRelativePath(path: string, directory: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        getParentDirectory(path: string): string;
        getLocalizedDiagnosticMessages(): string;
        getCancellationToken(): ts.CancellationToken;
    }

    //
    // Public interface of of a language service instance shim.
    //
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

        getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean): string;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): string;

        getTypeAtPosition(fileName: string, position: number): string;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string;
        getBreakpointStatementAtPosition(fileName: string, position: number): string;
        getSignatureAtPosition(fileName: string, position: number): string;

        // Returns a JSON encoded value of the type:
        // { fileName: string; minChar: number; limChar: number; kind: string; name: string; containerKind: string; containerName: string }
        //
        // Or null value if no definition can be found.
        getDefinitionAtPosition(fileName: string, position: number): string;

        // Returns a JSON encoded value of the type:
        // { fileName: string; minChar: number; limChar: number; isWriteAccess: boolean }[]
        getReferencesAtPosition(fileName: string, position: number): string;

        // Returns a JSON encoded value of the type:
        // { fileName: string; minChar: number; limChar: number; isWriteAccess: boolean }[]
        getOccurrencesAtPosition(fileName: string, position: number): string;

        // Returns a JSON encoded value of the type:
        // { fileName: string; minChar: number; limChar: number; isWriteAccess: boolean }[]
        getImplementorsAtPosition(fileName: string, position: number): string;

        // Returns a JSON encoded value of the type:
        // { name: string; kind: string; kindModifiers: string; containerName: string; containerKind: string; matchKind: string; fileName: string; minChar: number; limChar: number; } [] = [];
        getNavigateToItems(searchValue: string): string;

        // Returns a JSON encoded value of the type:
        // { name: string; kind: string; kindModifiers: string; containerName: string; containerKind: string; matchKind: string; fileName: string; minChar: number; limChar: number; } [] = [];
        getScriptLexicalStructure(fileName: string): string;

        // Returns a JSON encoded value of the type:
        // { name: string; kind: string; kindModifiers: string; containerName: string; containerKind: string; matchKind: string; fileName: string; minChar: number; limChar: number; } [] = [];
        getOutliningRegions(fileName: string): string;

        getBraceMatchingAtPosition(fileName: string, position: number): string;
        getIndentationAtPosition(fileName: string, position: number, options: string/*Services.EditorOptions*/): string;

        getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: string/*Services.FormatCodeOptions*/): string;
        getFormattingEditsForDocument(fileName: string, minChar: number, limChar: number, options: string/*Services.FormatCodeOptions*/): string;
        getFormattingEditsOnPaste(fileName: string, minChar: number, limChar: number, options: string/*Services.FormatCodeOptions*/): string;
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string/*Services.FormatCodeOptions*/): string;

        getEmitOutput(fileName: string): string;
    }

    export interface ClassifierShim extends Shim {
        getClassificationsForLine(text: string, lexState: EndOfLineState): string;
    }

    export interface CoreServicesShim extends Shim {
        getPreProcessedFileInfo(fileName: string, sourceText: TypeScript.IScriptSnapshot): string;
        getDefaultCompilationSettings(): string;
    }

    /// TODO: delete this, it is only needed untill the VS interface is updated
    enum LanguageVersion {
        EcmaScript3 = 0,
        EcmaScript5 = 1,
    }

    enum ModuleGenTarget {
        Unspecified = 0,
        Synchronous = 1,
        Asynchronous = 2,
    }

    interface CompilationSettings {
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
    }

    function languageVersionToScriptTarget(languageVersion: LanguageVersion): ts.ScriptTarget {
        switch (languageVersion) {
            case LanguageVersion.EcmaScript3: return ts.ScriptTarget.ES3;
            case LanguageVersion.EcmaScript5: return ts.ScriptTarget.ES5;
            default: throw Error("unsuported LanguageVersion value: " + languageVersion);
        }
    }

    function moduleGenTargetToModuleKind(moduleGenTarget: ModuleGenTarget): ts.ModuleKind {
        switch (moduleGenTarget) {
            case ModuleGenTarget.Asynchronous: return ts.ModuleKind.AMD;
            case ModuleGenTarget.Synchronous: return ts.ModuleKind.CommonJS;
            case ModuleGenTarget.Unspecified: return ts.ModuleKind.None;
            default: throw Error("unsuported ModuleGenTarget value: " + moduleGenTarget);
        }
    }

    function scriptTargetTolanguageVersion(scriptTarget: ts.ScriptTarget): LanguageVersion {
        switch (scriptTarget) {
            case ts.ScriptTarget.ES3: return LanguageVersion.EcmaScript3;
            case ts.ScriptTarget.ES5: return LanguageVersion.EcmaScript5;
            default: throw Error("unsuported ScriptTarget value: " + scriptTarget);
        }
    }

    function moduleKindToModuleGenTarget(moduleKind: ts.ModuleKind): ModuleGenTarget {
        switch (moduleKind) {
            case ts.ModuleKind.AMD: return ModuleGenTarget.Asynchronous;
            case ts.ModuleKind.CommonJS: return ModuleGenTarget.Synchronous;
            case ts.ModuleKind.None: return ModuleGenTarget.Unspecified;
            default: throw Error("unsuported ModuleKind value: " + moduleKind);
        }
    }

    function compilationSettingsToCompilerOptions(settings: CompilationSettings): ts.CompilerOptions {
        // TODO: we should not be converting, but use options all the way
        var options: ts.CompilerOptions = {};
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
        return options;
    }

    function compilerOptionsToCompilationSettings(options: ts.CompilerOptions): CompilationSettings {
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
        return settings;
    }

    class ScriptSnapshotShimAdapter implements TypeScript.IScriptSnapshot {
        private lineStartPositions: number[] = null;

        constructor(private scriptSnapshotShim: IScriptSnapshotShim) {
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

        public getTextChangeRangeSinceVersion(scriptVersion: number): TypeScript.TextChangeRange {
            var encoded = this.scriptSnapshotShim.getTextChangeRangeSinceVersion(scriptVersion);
            if (encoded == null) {
                return null;
            }

            var decoded: { span: { start: number; length: number; }; newLength: number; } = JSON.parse(encoded);
            return new TypeScript.TextChangeRange(
                new TypeScript.TextSpan(decoded.span.start, decoded.span.length), decoded.newLength);
        }
    }

    class LanguageServiceShimHostAdapter implements LanguageServiceHost {
        constructor(private shimHost: LanguageServiceShimHost) {
        }

        public information(): boolean {
            return this.shimHost.information();
        }

        public debug(): boolean {
            return this.shimHost.debug();
        }

        public warning(): boolean {
            return this.shimHost.warning();
        }

        public error(): boolean {
            return this.shimHost.error();
        }

        public fatal(): boolean {
            return this.shimHost.fatal();
        }

        public log(s: string): void {
            this.shimHost.log(s);
        }

        public getCompilationSettings(): ts.CompilerOptions {
            var settingsJson = this.shimHost.getCompilationSettings();
            if (settingsJson == null || settingsJson == "") {
                throw Error("LanguageServiceShimHostAdapter.getCompilationSettings: empty compilationSettings");
                return null;
            }
            var options = compilationSettingsToCompilerOptions(<ts.CompilerOptions>JSON.parse(<any>settingsJson));

            /// TODO: this should be pushed into VS.
            /// We can not ask the LS instance to resolve, as this will lead to asking the host about files it does not know about,
            /// something it is not desinged to handle. for now make sure we never get a noresolve=true.
            /// This value should not matter, as the host runs resolution logic independentlly
            options.noResolve = true;

            return options;
        }

        public getScriptFileNames(): string[] {
            var encoded = this.shimHost.getScriptFileNames();
            return JSON.parse(encoded);
        }

        public getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot {
            return new ScriptSnapshotShimAdapter(this.shimHost.getScriptSnapshot(fileName));
        }

        public getScriptVersion(fileName: string): number {
            return this.shimHost.getScriptVersion(fileName);
        }

        public getScriptIsOpen(fileName: string): boolean {
            return this.shimHost.getScriptIsOpen(fileName);
        }

        public getScriptByteOrderMark(fileName: string): ts.ByteOrderMark {
            return this.shimHost.getScriptByteOrderMark(fileName);
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

        public getCancellationToken(): ts.CancellationToken {
            return this.shimHost.getCancellationToken();
        }

        // IReferenceResolverHost methods
        public resolveRelativePath(path: string, directory: string): string {
            return this.shimHost.resolveRelativePath(path, directory);
        }

        public fileExists(path: string): boolean {
            return this.shimHost.fileExists(path);
        }

        public directoryExists(path: string): boolean {
            return this.shimHost.directoryExists(path);
        }

        public getParentDirectory(path: string): string {
            return this.shimHost.getParentDirectory(path);
        }
    }

    function simpleForwardCall(logger: TypeScript.Logger, actionDescription: string, action: () => any): any {
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

    function forwardJSONCall(logger: TypeScript.Logger, actionDescription: string, action: () => any): string {
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
        private logger: TypeScript.Logger;

        constructor(factory: ShimFactory,
            private host: LanguageServiceShimHost,
            public languageService: LanguageService) {
            super(factory);
            this.logger = this.host;
        }

        public forwardJSONCall(actionDescription: string, action: () => any): string {
            return forwardJSONCall(this.logger, actionDescription, action);
        }

        // DISPOSE
        // Ensure (almost) determinstic release of internal Javascript resources when 
        // some external native objects holds onto us (e.g. Com/Interop).
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

        // REFRESH
        // Update the list of scripts known to the compiler
        public refresh(throwOnError: boolean): void {
            this.forwardJSONCall(
                "refresh(" + throwOnError + ")",
                () => {
                    this.languageService.refresh();
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
        /// SQUIGGLES
        ///

        private static realizeDiagnostic(diagnostic: ts.Diagnostic): { message: string; start: number; length: number; category: string; } {
            return {
                message: diagnostic.messageText,
                start: diagnostic.start,
                length: diagnostic.length,
                /// TODO: no need for the tolowerCase call
                category: ts.DiagnosticCategory[diagnostic.category].toLowerCase()
            };
        }

        private realizeDiagnosticWithFileName(diagnostic: ts.Diagnostic): { fileName: string; message: string; start: number; length: number; category: string; } {
            return {
                fileName: diagnostic.file.filename,
                message: diagnostic.messageText,
                start: diagnostic.start,
                length: diagnostic.length,
                /// TODO: no need for the tolowerCase call
                category: ts.DiagnosticCategory[diagnostic.category].toLowerCase()
            };
        }

        public getSyntacticDiagnostics(fileName: string): string {
            return this.forwardJSONCall(
                "getSyntacticDiagnostics(\"" + fileName + "\")",
                () => {
                    var errors = this.languageService.getSyntacticDiagnostics(fileName);
                    return errors.map(LanguageServiceShimObject.realizeDiagnostic);
                });
        }

        public getSemanticDiagnostics(fileName: string): string {
            return this.forwardJSONCall(
                "getSemanticDiagnostics(\"" + fileName + "\")",
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
                    return errors.map(d => this.realizeDiagnosticWithFileName(d))
                });
        }

        /// QUICKINFO
        /// Computes a string representation of the type at the requested position
        /// in the active file.
        public getTypeAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getTypeAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    var typeInfo = this.languageService.getTypeAtPosition(fileName, position);
                    return typeInfo;
                });
        }

        /// NAMEORDOTTEDNAMESPAN
        /// Computes span information of the name or dotted name at the requested position
        // in the active file.
        public getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string {
            return this.forwardJSONCall(
                "getNameOrDottedNameSpan(\"" + fileName + "\", " + startPos + ", " + endPos + ")",
                () => {
                    var spanInfo = this.languageService.getNameOrDottedNameSpan(fileName, startPos, endPos);
                    return spanInfo;
                });
        }

        /// STATEMENTSPAN
        /// Computes span information of statement at the requested position in the active file.
        public getBreakpointStatementAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getBreakpointStatementAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    var spanInfo = this.languageService.getBreakpointStatementAtPosition(fileName, position);
                    return spanInfo;
                });
        }

        /// SIGNATUREHELP
        /// Computes a string representation of the signatures at the requested position
        /// in the active file.
        public getSignatureAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getSignatureAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    var signatureInfo = this.languageService.getSignatureAtPosition(fileName, position);
                    return signatureInfo;
                });
        }

        /// GOTO DEFINITION
        /// Computes the definition location and file for the symbol
        /// at the requested position. 
        public getDefinitionAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getDefinitionAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    return this.languageService.getDefinitionAtPosition(fileName, position);
                });
        }

        /// GET BRACE MATCHING
        public getBraceMatchingAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getBraceMatchingAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    var textRanges = this.languageService.getBraceMatchingAtPosition(fileName, position);
                    return textRanges;
                });
        }

        /// GET SMART INDENT
        public getIndentationAtPosition(fileName: string, position: number, options: string /*Services.EditorOptions*/): string {
            return this.forwardJSONCall(
                "getIndentationAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    var localOptions: EditorOptions = JSON.parse(options);
                    var columnOffset = this.languageService.getIndentationAtPosition(fileName, position, localOptions);
                    return { value: columnOffset };
                });
        }

        /// GET REFERENCES
        ///  Return references to a symbol at the requested position.
        ///  References are separated by "\n".
        ///  Each reference is a "fileindex min lim" sub-string.
        public getReferencesAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getReferencesAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    return this.languageService.getReferencesAtPosition(fileName, position);
                });
        }

        public getOccurrencesAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getOccurrencesAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    return this.languageService.getOccurrencesAtPosition(fileName, position);
                });
        }

        /// GET IMPLEMENTORS
        public getImplementorsAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                "getImplementorsAtPosition(\"" + fileName + "\", " + position + ")",
                () => {
                    return this.languageService.getImplementorsAtPosition(fileName, position);
                });
        }


        /// COMPLETION LISTS
        /// Get a string based representation of the completions 
        /// to provide at the given source position and providing a member completion 
        /// list if requested.
        public getCompletionsAtPosition(fileName: string, position: number, isMemberCompletion: boolean) {
            return this.forwardJSONCall(
                "getCompletionsAtPosition(\"" + fileName + "\", " + position + ", " + isMemberCompletion + ")",
                () => {
                    var completion = this.languageService.getCompletionsAtPosition(fileName, position, isMemberCompletion);
                    return completion;
                });
        }

        /// Get a string based representation of a completion list entry details
        public getCompletionEntryDetails(fileName: string, position: number, entryName: string) {
            return this.forwardJSONCall(
                "getCompletionEntryDetails(\"" + fileName + "\", " + position + ", " + entryName + ")",
                () => {
                    var details = this.languageService.getCompletionEntryDetails(fileName, position, entryName);
                    return details;
                });
        }

        /// FORMAT SELECTION
        public getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsForRange(\"" + fileName + "\", " + minChar + ", " + limChar + ")",
                () => {
                    var localOptions: FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsForRange(fileName, minChar, limChar, localOptions);
                    return edits;
                });
        }

        /// FORMAT DOCUMENT
        public getFormattingEditsForDocument(fileName: string, minChar: number, limChar: number, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsForDocument(\"" + fileName + "\", " + minChar + ", " + limChar + ")",
                () => {
                    var localOptions: FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsForDocument(fileName, minChar, limChar, localOptions);
                    return edits;
                });
        }

        /// FORMAT ON PASTE
        public getFormattingEditsOnPaste(fileName: string, minChar: number, limChar: number, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsOnPaste(\"" + fileName + "\", " + minChar + ", " + limChar + ")",
                () => {
                    var localOptions: FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsOnPaste(fileName, minChar, limChar, localOptions);
                    return edits;
                });
        }

        /// FORMAT
        public getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsAfterKeystroke(\"" + fileName + "\", " + position + ", \"" + key + "\")",
                () => {
                    var localOptions: FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(fileName, position, key, localOptions);
                    return edits;
                });
        }

        /// NAVIGATE TO
        ///  Return a list of symbols that are interesting to navigate to
        public getNavigateToItems(searchValue: string): string {
            return this.forwardJSONCall(
                "getNavigateToItems(\"" + searchValue + "\")",
                () => {
                    var items = this.languageService.getNavigateToItems(searchValue);
                    var result = this._navigateToItemsToString(items);
                    return result;
                });
        }

        // GET SCRIPT LEXICAL STRUCTURE
        //
        public getScriptLexicalStructure(fileName: string): string {
            return this.forwardJSONCall(
                "getScriptLexicalStructure(\"" + fileName + "\")",
                () => {
                    var items = this.languageService.getScriptLexicalStructure(fileName);
                    var result = this._navigateToItemsToString(items);
                    return result;
                });
        }

        // GET OUTLINING REGIONS
        //
        public getOutliningRegions(fileName: string): string {
            return this.forwardJSONCall(
                "getOutliningRegions(\"" + fileName + "\")",
                () => {
                    var items = this.languageService.getOutliningRegions(fileName);
                    return items;
                });
        }

        /// Emit
        public getEmitOutput(fileName: string): string {
            return this.forwardJSONCall(
                "getEmitOutput(\"" + fileName + "\")",
                () => {
                    var output = this.languageService.getEmitOutput(fileName);
                    return output;
                });
        }

        private _navigateToItemsToString(items: NavigateToItem[]): any {
            var result: {
                name: string;
                kind: string;
                kindModifiers: string;
                containerName: string;
                containerKind: string;
                matchKind: string;
                fileName: string;
                minChar: number;
                limChar: number;
                additionalSpans?: { start: number; end: number; }[];
            }[] = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                result.push({
                    name: item.name,
                    kind: item.kind,
                    kindModifiers: item.kindModifiers,
                    containerName: item.containerName,
                    containerKind: item.containerKind,
                    matchKind: item.matchKind,
                    fileName: item.fileName,
                    minChar: item.minChar,
                    limChar: item.limChar,
                    additionalSpans: item.additionalSpans ? item.additionalSpans.map(i => { return { start: i.minChar, end: i.limChar }; }) : undefined
                });
            }

            return result;
        }
    }

    class ClassifierShimObject extends ShimBase implements ClassifierShim {
        public classifier: Classifier;

        constructor(factory: ShimFactory, public host: Logger) {
            super(factory);
            this.classifier = createClassifier(this.host);
        }

        /// COLORIZATION
        public getClassificationsForLine(text: string, lexState: EndOfLineState): string {
            var classification = this.classifier.getClassificationsForLine(text, lexState);
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
        constructor(factory: ShimFactory, public host: Logger) {
            super(factory);
        }

        private forwardJSONCall(actionDescription: string, action: () => any): any {
            return forwardJSONCall(this.host, actionDescription, action);
        }

        ///
        /// getPreProcessedFileInfo
        ///
        public getPreProcessedFileInfo(fileName: string, sourceText: TypeScript.IScriptSnapshot): string {
            return this.forwardJSONCall(
                "getPreProcessedFileInfo(\"" + fileName + "\")",
                () => {
                    var result = TypeScript.preProcessFile(fileName, sourceText);
                    return result;
                });
        }

        ///
        /// getDefaultCompilationSettings
        ///
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
        private documentRegistry: DocumentRegistry = new DocumentRegistry();

        public createLanguageServiceShim(host: LanguageServiceShimHost): LanguageServiceShim {
            try {
                var hostAdapter = new LanguageServiceShimHostAdapter(host);
                var pullLanguageService = createLanguageService(hostAdapter, this.documentRegistry);
                return new LanguageServiceShimObject(this, host, pullLanguageService);
            }
            catch (err) {
                logInternalError(host, err);
                throw err;
            }
        }

        public createClassifierShim(host: Logger): ClassifierShim {
            try {
                return new ClassifierShimObject(this, host);
            }
            catch (err) {
                logInternalError(host, err);
                throw err;
            }
        }

        public createCoreServicesShim(host: Logger): CoreServicesShim {
            try {
                return new CoreServicesShimObject(this, host);
            }
            catch (err) {
                logInternalError(host, err);
                throw err;
            }
        }

        public close(): void {
            // Forget all the registered shims
            this._shims = [];
            this.documentRegistry = new DocumentRegistry();
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

            throw TypeScript.Errors.invalidOperation();
        }
    }
}


/// TODO: this is used by VS, clean this up on both sides of the interfrace
module Services {
    export var TypeScriptServicesFactory = TypeScriptServicesFactory;
}

