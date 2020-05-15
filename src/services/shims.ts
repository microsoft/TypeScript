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

/* @internal */
let debugObjectHost: { CollectGarbage(): void } = (function (this: any) { return this; })(); // eslint-disable-line prefer-const

// We need to use 'null' to interface with the managed side.
/* eslint-disable no-in-operator */

/* @internal */
namespace ts {
    interface DiscoverTypingsInfo {
        fileNames: string[];                            // The file names that belong to the same project.
        projectRootPath: string;                        // The path to the project root directory
        safeListPath: string;                           // The path used to retrieve the safe list
        packageNameToTypingLocation: Map<JsTyping.CachedTyping>;       // The map of package names to their cached typing locations and installed versions
        typeAcquisition: TypeAcquisition;               // Used to customize the type acquisition process
        compilerOptions: CompilerOptions;               // Used as a source for typing inference
        unresolvedImports: readonly string[];       // List of unresolved module ids from imports
        typesRegistry: ReadonlyMap<MapLike<string>>;    // The map of available typings in npm to maps of TS versions to their latest supported versions
    }

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
        getChangeRange(oldSnapshot: ScriptSnapshotShim): string | undefined;

        /** Releases all resources held by this script snapshot */
        dispose?(): void;
    }

    export interface Logger {
        log(s: string): void;
        trace(s: string): void;
        error(s: string): void;
    }

    /** Public interface of the host of a language service shim instance. */
    export interface LanguageServiceShimHost extends Logger {
        getCompilationSettings(): string;

        /** Returns a JSON-encoded value of the type: string[] */
        getScriptFileNames(): string;
        getScriptKind?(fileName: string): ScriptKind;
        getScriptVersion(fileName: string): string;
        getScriptSnapshot(fileName: string): ScriptSnapshotShim;
        getLocalizedDiagnosticMessages(): string;
        getCancellationToken(): HostCancellationToken;
        getCurrentDirectory(): string;
        getDirectories(path: string): string;
        getDefaultLibFileName(options: string): string;
        getNewLine?(): string;
        getProjectVersion?(): string;
        useCaseSensitiveFileNames?(): boolean;

        getTypeRootsVersion?(): number;
        readDirectory(rootDir: string, extension: string, basePaths?: string, excludeEx?: string, includeFileEx?: string, includeDirEx?: string, depth?: number): string;
        readFile(path: string, encoding?: string): string | undefined;
        fileExists(path: string): boolean;

        getModuleResolutionsForFile?(fileName: string): string;
        getTypeReferenceDirectiveResolutionsForFile?(fileName: string): string;
        directoryExists(directoryName: string): boolean;
    }

    /** Public interface of the core-services host instance used in managed side */
    export interface CoreServicesShimHost extends Logger {
        directoryExists(directoryName: string): boolean;
        fileExists(fileName: string): boolean;
        getCurrentDirectory(): string;
        getDirectories(path: string): string;

        /**
         * Returns a JSON-encoded value of the type: string[]
         *
         * @param exclude A JSON encoded string[] containing the paths to exclude
         *  when enumerating the directory.
         */
        readDirectory(rootDir: string, extension: string, basePaths?: string, excludeEx?: string, includeFileEx?: string, includeDirEx?: string, depth?: number): string;

        /**
         * Read arbitrary text files on disk, i.e. when resolution procedure needs the content of 'package.json' to determine location of bundled typings for node modules
         */
        readFile(fileName: string): string | undefined;
        realpath?(path: string): string;
        trace(s: string): void;
        useCaseSensitiveFileNames?(): boolean;
    }

    ///
    /// Pre-processing
    ///
    // Note: This is being using by the host (VS) and is marshaled back and forth.
    // When changing this make sure the changes are reflected in the managed side as well
    export interface ShimsFileReference {
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
        dispose(_dummy: {}): void;
    }

    export interface LanguageServiceShim extends Shim {
        languageService: LanguageService;

        dispose(_dummy: {}): void;

        refresh(throwOnError: boolean): void;

        cleanupSemanticCache(): void;

        getSyntacticDiagnostics(fileName: string): string;
        getSemanticDiagnostics(fileName: string): string;
        getSuggestionDiagnostics(fileName: string): string;
        getCompilerOptionsDiagnostics(): string;

        getSyntacticClassifications(fileName: string, start: number, length: number): string;
        getSemanticClassifications(fileName: string, start: number, length: number): string;
        getEncodedSyntacticClassifications(fileName: string, start: number, length: number): string;
        getEncodedSemanticClassifications(fileName: string, start: number, length: number): string;

        getCompletionsAtPosition(fileName: string, position: number, preferences: UserPreferences | undefined): string;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: string/*Services.FormatCodeOptions*/ | undefined, source: string | undefined, preferences: UserPreferences | undefined): string;

        getQuickInfoAtPosition(fileName: string, position: number): string;

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string;
        getBreakpointStatementAtPosition(fileName: string, position: number): string;

        getSignatureHelpItems(fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { canRename: boolean, localizedErrorMessage: string, displayName: string, fullDisplayName: string, kind: string, kindModifiers: string, triggerSpan: { start; length } }
         */
        getRenameInfo(fileName: string, position: number, options?: RenameInfoOptions): string;
        getSmartSelectionRange(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string, textSpan: { start: number, length: number } }[]
         */
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; kind: string; name: string; containerKind: string; containerName: string }
         *
         * Or undefined value if no definition can be found.
         */
        getDefinitionAtPosition(fileName: string, position: number): string;

        getDefinitionAndBoundSpan(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; kind: string; name: string; containerKind: string; containerName: string }
         *
         * Or undefined value if no definition can be found.
         */
        getTypeDefinitionAtPosition(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; }[]
         */
        getImplementationAtPosition(fileName: string, position: number): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { fileName: string; textSpan: { start: number; length: number}; isWriteAccess: boolean, isDefinition?: boolean }[]
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
        getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string): string;

        /**
         * Returns a JSON-encoded value of the type:
         * { text: string; kind: string; kindModifiers: string; bolded: boolean; grayed: boolean; indent: number; spans: { start: number; length: number; }[]; childItems: <recursive use of this type>[] } [] = [];
         */
        getNavigationBarItems(fileName: string): string;

        /** Returns a JSON-encoded value of the type ts.NavigationTree. */
        getNavigationTree(fileName: string): string;

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

        /**
         * Returns JSON-encoded boolean to indicate whether we should support brace location
         * at the current position.
         * E.g. we don't want brace completion inside string-literals, comments, etc.
         */
        isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): string;

        /**
         * Returns a JSON-encoded TextSpan | undefined indicating the range of the enclosing comment, if it exists.
         */
        getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): string;

        prepareCallHierarchy(fileName: string, position: number): string;
        provideCallHierarchyIncomingCalls(fileName: string, position: number): string;
        provideCallHierarchyOutgoingCalls(fileName: string, position: number): string;

        getEmitOutput(fileName: string): string;
        getEmitOutputObject(fileName: string): EmitOutput;
    }

    export interface ClassifierShim extends Shim {
        getEncodedLexicalClassifications(text: string, lexState: EndOfLineState, syntacticClassifierAbsent?: boolean): string;
        getClassificationsForLine(text: string, lexState: EndOfLineState, syntacticClassifierAbsent?: boolean): string;
    }

    export interface CoreServicesShim extends Shim {
        getAutomaticTypeDirectiveNames(compilerOptionsJson: string): string;
        getPreProcessedFileInfo(fileName: string, sourceText: IScriptSnapshot): string;
        getTSConfigFileInfo(fileName: string, sourceText: IScriptSnapshot): string;
        getDefaultCompilationSettings(): string;
        discoverTypings(discoverTypingsJson: string): string;
    }

    function logInternalError(logger: Logger, err: Error) {
        if (logger) {
            logger.log("*INTERNAL ERROR* - Exception in typescript services: " + err.message);
        }
    }

    class ScriptSnapshotShimAdapter implements IScriptSnapshot {
        constructor(private scriptSnapshotShim: ScriptSnapshotShim) {
        }

        public getText(start: number, end: number): string {
            return this.scriptSnapshotShim.getText(start, end);
        }

        public getLength(): number {
            return this.scriptSnapshotShim.getLength();
        }

        public getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange | undefined {
            const oldSnapshotShim = <ScriptSnapshotShimAdapter>oldSnapshot;
            const encoded = this.scriptSnapshotShim.getChangeRange(oldSnapshotShim.scriptSnapshotShim);
            /* eslint-disable no-null/no-null */
            if (encoded === null) {
                return null!; // TODO: GH#18217
            }
            /* eslint-enable no-null/no-null */

            const decoded: { span: { start: number; length: number; }; newLength: number; } = JSON.parse(encoded!); // TODO: GH#18217
            return createTextChangeRange(
                createTextSpan(decoded.span.start, decoded.span.length), decoded.newLength);
        }

        public dispose(): void {
            // if scriptSnapshotShim is a COM object then property check becomes method call with no arguments
            // 'in' does not have this effect
            if ("dispose" in this.scriptSnapshotShim) {
                this.scriptSnapshotShim.dispose!(); // TODO: GH#18217 Can we just use `if (this.scriptSnapshotShim.dispose)`?
            }
        }
    }

    export class LanguageServiceShimHostAdapter implements LanguageServiceHost {
        private loggingEnabled = false;
        private tracingEnabled = false;

        public resolveModuleNames: ((moduleName: string[], containingFile: string) => (ResolvedModuleFull | undefined)[]) | undefined;
        public resolveTypeReferenceDirectives: ((typeDirectiveNames: string[], containingFile: string) => (ResolvedTypeReferenceDirective | undefined)[]) | undefined;
        public directoryExists: ((directoryName: string) => boolean) | undefined;

        constructor(private shimHost: LanguageServiceShimHost) {
            // if shimHost is a COM object then property check will become method call with no arguments.
            // 'in' does not have this effect.
            if ("getModuleResolutionsForFile" in this.shimHost) {
                this.resolveModuleNames = (moduleNames, containingFile) => {
                    const resolutionsInFile = <MapLike<string>>JSON.parse(this.shimHost.getModuleResolutionsForFile!(containingFile)); // TODO: GH#18217
                    return map(moduleNames, name => {
                        const result = getProperty(resolutionsInFile, name);
                        return result ? { resolvedFileName: result, extension: extensionFromPath(result), isExternalLibraryImport: false } : undefined;
                    });
                };
            }
            if ("directoryExists" in this.shimHost) {
                this.directoryExists = directoryName => this.shimHost.directoryExists(directoryName);
            }
            if ("getTypeReferenceDirectiveResolutionsForFile" in this.shimHost) {
                this.resolveTypeReferenceDirectives = (typeDirectiveNames, containingFile) => {
                    const typeDirectivesForFile = <MapLike<ResolvedTypeReferenceDirective>>JSON.parse(this.shimHost.getTypeReferenceDirectiveResolutionsForFile!(containingFile)); // TODO: GH#18217
                    return map(typeDirectiveNames, name => getProperty(typeDirectivesForFile, name));
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
                return undefined!; // TODO: GH#18217
            }

            return this.shimHost.getProjectVersion();
        }

        public getTypeRootsVersion(): number {
            if (!this.shimHost.getTypeRootsVersion) {
                return 0;
            }
            return this.shimHost.getTypeRootsVersion();
        }

        public useCaseSensitiveFileNames(): boolean {
            return this.shimHost.useCaseSensitiveFileNames ? this.shimHost.useCaseSensitiveFileNames() : false;
        }

        public getCompilationSettings(): CompilerOptions {
            const settingsJson = this.shimHost.getCompilationSettings();
            // eslint-disable-next-line no-null/no-null
            if (settingsJson === null || settingsJson === "") {
                throw Error("LanguageServiceShimHostAdapter.getCompilationSettings: empty compilationSettings");
            }
            const compilerOptions = <CompilerOptions>JSON.parse(settingsJson);
            // permit language service to handle all files (filtering should be performed on the host side)
            compilerOptions.allowNonTsExtensions = true;
            return compilerOptions;
        }

        public getScriptFileNames(): string[] {
            const encoded = this.shimHost.getScriptFileNames();
            return JSON.parse(encoded);
        }

        public getScriptSnapshot(fileName: string): IScriptSnapshot | undefined {
            const scriptSnapshot = this.shimHost.getScriptSnapshot(fileName);
            return scriptSnapshot && new ScriptSnapshotShimAdapter(scriptSnapshot);
        }

        public getScriptKind(fileName: string): ScriptKind {
            if ("getScriptKind" in this.shimHost) {
                return this.shimHost.getScriptKind!(fileName); // TODO: GH#18217
            }
            else {
                return ScriptKind.Unknown;
            }
        }

        public getScriptVersion(fileName: string): string {
            return this.shimHost.getScriptVersion(fileName);
        }

        public getLocalizedDiagnosticMessages() {
            /* eslint-disable no-null/no-null */
            const diagnosticMessagesJson = this.shimHost.getLocalizedDiagnosticMessages();
            if (diagnosticMessagesJson === null || diagnosticMessagesJson === "") {
                return null;
            }

            try {
                return JSON.parse(diagnosticMessagesJson);
            }
            catch (e) {
                this.log(e.description || "diagnosticMessages.generated.json has invalid JSON format");
                return null;
            }
            /* eslint-enable no-null/no-null */
        }

        public getCancellationToken(): HostCancellationToken {
            const hostCancellationToken = this.shimHost.getCancellationToken();
            return new ThrottledCancellationToken(hostCancellationToken);
        }

        public getCurrentDirectory(): string {
            return this.shimHost.getCurrentDirectory();
        }

        public getDirectories(path: string): string[] {
            return JSON.parse(this.shimHost.getDirectories(path));
        }

        public getDefaultLibFileName(options: CompilerOptions): string {
            return this.shimHost.getDefaultLibFileName(JSON.stringify(options));
        }

        public readDirectory(path: string, extensions?: readonly string[], exclude?: string[], include?: string[], depth?: number): string[] {
            const pattern = getFileMatcherPatterns(path, exclude, include,
                this.shimHost.useCaseSensitiveFileNames!(), this.shimHost.getCurrentDirectory()); // TODO: GH#18217
            return JSON.parse(this.shimHost.readDirectory(
                path,
                JSON.stringify(extensions),
                JSON.stringify(pattern.basePaths),
                pattern.excludePattern,
                pattern.includeFilePattern,
                pattern.includeDirectoryPattern,
                depth
            ));
        }

        public readFile(path: string, encoding?: string): string | undefined {
            return this.shimHost.readFile(path, encoding);
        }

        public fileExists(path: string): boolean {
            return this.shimHost.fileExists(path);
        }
    }

    export class CoreServicesShimHostAdapter implements ParseConfigHost, ModuleResolutionHost, JsTyping.TypingResolutionHost {

        public directoryExists: (directoryName: string) => boolean;
        public realpath: (path: string) => string;
        public useCaseSensitiveFileNames: boolean;

        constructor(private shimHost: CoreServicesShimHost) {
            this.useCaseSensitiveFileNames = this.shimHost.useCaseSensitiveFileNames ? this.shimHost.useCaseSensitiveFileNames() : false;
            if ("directoryExists" in this.shimHost) {
                this.directoryExists = directoryName => this.shimHost.directoryExists(directoryName);
            }
            else {
                this.directoryExists = undefined!; // TODO: GH#18217
            }
            if ("realpath" in this.shimHost) {
                this.realpath = path => this.shimHost.realpath!(path); // TODO: GH#18217
            }
            else {
                this.realpath = undefined!; // TODO: GH#18217
            }
        }

        public readDirectory(rootDir: string, extensions: readonly string[], exclude: readonly string[], include: readonly string[], depth?: number): string[] {
            const pattern = getFileMatcherPatterns(rootDir, exclude, include,
                this.shimHost.useCaseSensitiveFileNames!(), this.shimHost.getCurrentDirectory()); // TODO: GH#18217
            return JSON.parse(this.shimHost.readDirectory(
                rootDir,
                JSON.stringify(extensions),
                JSON.stringify(pattern.basePaths),
                pattern.excludePattern,
                pattern.includeFilePattern,
                pattern.includeDirectoryPattern,
                depth
            ));
        }

        public fileExists(fileName: string): boolean {
            return this.shimHost.fileExists(fileName);
        }

        public readFile(fileName: string): string | undefined {
            return this.shimHost.readFile(fileName);
        }

        public getDirectories(path: string): string[] {
            return JSON.parse(this.shimHost.getDirectories(path));
        }
    }

    function simpleForwardCall(logger: Logger, actionDescription: string, action: () => {}, logPerformance: boolean): {} {
        let start: number | undefined;
        if (logPerformance) {
            logger.log(actionDescription);
            start = timestamp();
        }

        const result = action();

        if (logPerformance) {
            const end = timestamp();
            logger.log(`${actionDescription} completed in ${end - start!} msec`);
            if (isString(result)) {
                let str = result;
                if (str.length > 128) {
                    str = str.substring(0, 128) + "...";
                }
                logger.log(`  result.length=${str.length}, result='${JSON.stringify(str)}'`);
            }
        }

        return result;
    }

    function forwardJSONCall(logger: Logger, actionDescription: string, action: () => {} | null | undefined, logPerformance: boolean): string {
        return <string>forwardCall(logger, actionDescription, /*returnJson*/ true, action, logPerformance);
    }

    function forwardCall<T>(logger: Logger, actionDescription: string, returnJson: boolean, action: () => T, logPerformance: boolean): T | string {
        try {
            const result = simpleForwardCall(logger, actionDescription, action, logPerformance);
            return returnJson ? JSON.stringify({ result }) : result as T;
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
        public dispose(_dummy: {}): void {
            this.factory.unregisterShim(this);
        }
    }

    export interface RealizedDiagnostic {
        message: string;
        start: number;
        length: number;
        category: string;
        code: number;
        reportsUnnecessary?: {};
    }
    export function realizeDiagnostics(diagnostics: readonly Diagnostic[], newLine: string): RealizedDiagnostic[] {
        return diagnostics.map(d => realizeDiagnostic(d, newLine));
    }

    function realizeDiagnostic(diagnostic: Diagnostic, newLine: string): RealizedDiagnostic {
        return {
            message: flattenDiagnosticMessageText(diagnostic.messageText, newLine),
            start: diagnostic.start!, // TODO: GH#18217
            length: diagnostic.length!, // TODO: GH#18217
            category: diagnosticCategoryName(diagnostic),
            code: diagnostic.code,
            reportsUnnecessary: diagnostic.reportsUnnecessary,
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

        public forwardJSONCall(actionDescription: string, action: () => {} | null | undefined): string {
            return forwardJSONCall(this.logger, actionDescription, action, this.logPerformance);
        }

        /// DISPOSE

        /**
         * Ensure (almost) deterministic release of internal Javascript resources when
         * some external native objects holds onto us (e.g. Com/Interop).
         */
        public dispose(dummy: {}): void {
            this.logger.log("dispose()");
            this.languageService.dispose();
            this.languageService = null!; // eslint-disable-line no-null/no-null

            // force a GC
            if (debugObjectHost && debugObjectHost.CollectGarbage) {
                debugObjectHost.CollectGarbage();
                this.logger.log("CollectGarbage()");
            }

            this.logger = null!; // eslint-disable-line no-null/no-null

            super.dispose(dummy);
        }

        /// REFRESH

        /**
         * Update the list of scripts known to the compiler
         */
        public refresh(throwOnError: boolean): void {
            this.forwardJSONCall(
                `refresh(${throwOnError})`,
                () => null // eslint-disable-line no-null/no-null
            );
        }

        public cleanupSemanticCache(): void {
            this.forwardJSONCall(
                "cleanupSemanticCache()",
                () => {
                    this.languageService.cleanupSemanticCache();
                    return null; // eslint-disable-line no-null/no-null
                });
        }

        private realizeDiagnostics(diagnostics: readonly Diagnostic[]): { message: string; start: number; length: number; category: string; }[] {
            const newLine = getNewLineOrDefaultFromHost(this.host);
            return realizeDiagnostics(diagnostics, newLine);
        }

        public getSyntacticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                `getSyntacticClassifications('${fileName}', ${start}, ${length})`,
                () => this.languageService.getSyntacticClassifications(fileName, createTextSpan(start, length))
            );
        }

        public getSemanticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                `getSemanticClassifications('${fileName}', ${start}, ${length})`,
                () => this.languageService.getSemanticClassifications(fileName, createTextSpan(start, length))
            );
        }

        public getEncodedSyntacticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                `getEncodedSyntacticClassifications('${fileName}', ${start}, ${length})`,
                // directly serialize the spans out to a string.  This is much faster to decode
                // on the managed side versus a full JSON array.
                () => convertClassifications(this.languageService.getEncodedSyntacticClassifications(fileName, createTextSpan(start, length)))
            );
        }

        public getEncodedSemanticClassifications(fileName: string, start: number, length: number): string {
            return this.forwardJSONCall(
                `getEncodedSemanticClassifications('${fileName}', ${start}, ${length})`,
                // directly serialize the spans out to a string.  This is much faster to decode
                // on the managed side versus a full JSON array.
                () => convertClassifications(this.languageService.getEncodedSemanticClassifications(fileName, createTextSpan(start, length)))
            );
        }

        public getSyntacticDiagnostics(fileName: string): string {
            return this.forwardJSONCall(
                `getSyntacticDiagnostics('${fileName}')`,
                () => {
                    const diagnostics = this.languageService.getSyntacticDiagnostics(fileName);
                    return this.realizeDiagnostics(diagnostics);
                });
        }

        public getSemanticDiagnostics(fileName: string): string {
            return this.forwardJSONCall(
                `getSemanticDiagnostics('${fileName}')`,
                () => {
                    const diagnostics = this.languageService.getSemanticDiagnostics(fileName);
                    return this.realizeDiagnostics(diagnostics);
                });
        }

        public getSuggestionDiagnostics(fileName: string): string {
            return this.forwardJSONCall(`getSuggestionDiagnostics('${fileName}')`, () => this.realizeDiagnostics(this.languageService.getSuggestionDiagnostics(fileName)));
        }

        public getCompilerOptionsDiagnostics(): string {
            return this.forwardJSONCall(
                "getCompilerOptionsDiagnostics()",
                () => {
                    const diagnostics = this.languageService.getCompilerOptionsDiagnostics();
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
                `getQuickInfoAtPosition('${fileName}', ${position})`,
                () => this.languageService.getQuickInfoAtPosition(fileName, position)
            );
        }


        /// NAMEORDOTTEDNAMESPAN

        /**
         * Computes span information of the name or dotted name at the requested position
         * in the active file.
         */
        public getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string {
            return this.forwardJSONCall(
                `getNameOrDottedNameSpan('${fileName}', ${startPos}, ${endPos})`,
                () => this.languageService.getNameOrDottedNameSpan(fileName, startPos, endPos)
            );
        }

        /**
         * STATEMENTSPAN
         * Computes span information of statement at the requested position in the active file.
         */
        public getBreakpointStatementAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getBreakpointStatementAtPosition('${fileName}', ${position})`,
                () => this.languageService.getBreakpointStatementAtPosition(fileName, position)
            );
        }

        /// SIGNATUREHELP

        public getSignatureHelpItems(fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): string {
            return this.forwardJSONCall(
                `getSignatureHelpItems('${fileName}', ${position})`,
                () => this.languageService.getSignatureHelpItems(fileName, position, options)
            );
        }

        /// GOTO DEFINITION

        /**
         * Computes the definition location and file for the symbol
         * at the requested position.
         */
        public getDefinitionAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getDefinitionAtPosition('${fileName}', ${position})`,
                () => this.languageService.getDefinitionAtPosition(fileName, position)
            );
        }

        /**
         * Computes the definition location and file for the symbol
         * at the requested position.
         */
        public getDefinitionAndBoundSpan(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getDefinitionAndBoundSpan('${fileName}', ${position})`,
                () => this.languageService.getDefinitionAndBoundSpan(fileName, position)
            );
        }

        /// GOTO Type

        /**
         * Computes the definition location of the type of the symbol
         * at the requested position.
         */
        public getTypeDefinitionAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getTypeDefinitionAtPosition('${fileName}', ${position})`,
                () => this.languageService.getTypeDefinitionAtPosition(fileName, position)
            );
        }

        /// GOTO Implementation

        /**
         * Computes the implementation location of the symbol
         * at the requested position.
         */
        public getImplementationAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getImplementationAtPosition('${fileName}', ${position})`,
                () => this.languageService.getImplementationAtPosition(fileName, position)
            );
        }

        public getRenameInfo(fileName: string, position: number, options?: RenameInfoOptions): string {
            return this.forwardJSONCall(
                `getRenameInfo('${fileName}', ${position})`,
                () => this.languageService.getRenameInfo(fileName, position, options)
            );
        }

        public getSmartSelectionRange(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getSmartSelectionRange('${fileName}', ${position})`,
                () => this.languageService.getSmartSelectionRange(fileName, position)
            );
        }

        public findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): string {
            return this.forwardJSONCall(
                `findRenameLocations('${fileName}', ${position}, ${findInStrings}, ${findInComments}, ${providePrefixAndSuffixTextForRename})`,
                () => this.languageService.findRenameLocations(fileName, position, findInStrings, findInComments, providePrefixAndSuffixTextForRename)
            );
        }

        /// GET BRACE MATCHING
        public getBraceMatchingAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getBraceMatchingAtPosition('${fileName}', ${position})`,
                () => this.languageService.getBraceMatchingAtPosition(fileName, position)
            );
        }

        public isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): string {
            return this.forwardJSONCall(
                `isValidBraceCompletionAtPosition('${fileName}', ${position}, ${openingBrace})`,
                () => this.languageService.isValidBraceCompletionAtPosition(fileName, position, openingBrace)
            );
        }

        public getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): string {
            return this.forwardJSONCall(
                `getSpanOfEnclosingComment('${fileName}', ${position})`,
                () => this.languageService.getSpanOfEnclosingComment(fileName, position, onlyMultiLine)
            );
        }

        /// GET SMART INDENT
        public getIndentationAtPosition(fileName: string, position: number, options: string /*Services.EditorOptions*/): string {
            return this.forwardJSONCall(
                `getIndentationAtPosition('${fileName}', ${position})`,
                () => {
                    const localOptions: EditorOptions = JSON.parse(options);
                    return this.languageService.getIndentationAtPosition(fileName, position, localOptions);
                });
        }

        /// GET REFERENCES

        public getReferencesAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getReferencesAtPosition('${fileName}', ${position})`,
                () => this.languageService.getReferencesAtPosition(fileName, position)
            );
        }

        public findReferences(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `findReferences('${fileName}', ${position})`,
                () => this.languageService.findReferences(fileName, position)
            );
        }

        public getOccurrencesAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getOccurrencesAtPosition('${fileName}', ${position})`,
                () => this.languageService.getOccurrencesAtPosition(fileName, position)
            );
        }

        public getDocumentHighlights(fileName: string, position: number, filesToSearch: string): string {
            return this.forwardJSONCall(
                `getDocumentHighlights('${fileName}', ${position})`,
                () => {
                    const results = this.languageService.getDocumentHighlights(fileName, position, JSON.parse(filesToSearch));
                    // workaround for VS document highlighting issue - keep only items from the initial file
                    const normalizedName = toFileNameLowerCase(normalizeSlashes(fileName));
                    return filter(results, r => toFileNameLowerCase(normalizeSlashes(r.fileName)) === normalizedName);
                });
        }

        /// COMPLETION LISTS

        /**
         * Get a string based representation of the completions
         * to provide at the given source position and providing a member completion
         * list if requested.
         */
        public getCompletionsAtPosition(fileName: string, position: number, preferences: GetCompletionsAtPositionOptions | undefined) {
            return this.forwardJSONCall(
                `getCompletionsAtPosition('${fileName}', ${position}, ${preferences})`,
                () => this.languageService.getCompletionsAtPosition(fileName, position, preferences)
            );
        }

        /** Get a string based representation of a completion list entry details */
        public getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: string/*Services.FormatCodeOptions*/ | undefined, source: string | undefined, preferences: UserPreferences | undefined) {
            return this.forwardJSONCall(
                `getCompletionEntryDetails('${fileName}', ${position}, '${entryName}')`,
                () => {
                    const localOptions: FormatCodeOptions = formatOptions === undefined ? undefined : JSON.parse(formatOptions);
                    return this.languageService.getCompletionEntryDetails(fileName, position, entryName, localOptions, source, preferences);
                }
            );
        }

        public getFormattingEditsForRange(fileName: string, start: number, end: number, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                `getFormattingEditsForRange('${fileName}', ${start}, ${end})`,
                () => {
                    const localOptions: FormatCodeOptions = JSON.parse(options);
                    return this.languageService.getFormattingEditsForRange(fileName, start, end, localOptions);
                });
        }

        public getFormattingEditsForDocument(fileName: string, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                `getFormattingEditsForDocument('${fileName}')`,
                () => {
                    const localOptions: FormatCodeOptions = JSON.parse(options);
                    return this.languageService.getFormattingEditsForDocument(fileName, localOptions);
                });
        }

        public getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                `getFormattingEditsAfterKeystroke('${fileName}', ${position}, '${key}')`,
                () => {
                    const localOptions: FormatCodeOptions = JSON.parse(options);
                    return this.languageService.getFormattingEditsAfterKeystroke(fileName, position, key, localOptions);
                });
        }

        public getDocCommentTemplateAtPosition(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `getDocCommentTemplateAtPosition('${fileName}', ${position})`,
                () => this.languageService.getDocCommentTemplateAtPosition(fileName, position)
            );
        }

        /// NAVIGATE TO

        /** Return a list of symbols that are interesting to navigate to */
        public getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string): string {
            return this.forwardJSONCall(
                `getNavigateToItems('${searchValue}', ${maxResultCount}, ${fileName})`,
                () => this.languageService.getNavigateToItems(searchValue, maxResultCount, fileName)
            );
        }

        public getNavigationBarItems(fileName: string): string {
            return this.forwardJSONCall(
                `getNavigationBarItems('${fileName}')`,
                () => this.languageService.getNavigationBarItems(fileName)
            );
        }

        public getNavigationTree(fileName: string): string {
            return this.forwardJSONCall(
                `getNavigationTree('${fileName}')`,
                () => this.languageService.getNavigationTree(fileName)
            );
        }

        public getOutliningSpans(fileName: string): string {
            return this.forwardJSONCall(
                `getOutliningSpans('${fileName}')`,
                () => this.languageService.getOutliningSpans(fileName)
            );
        }

        public getTodoComments(fileName: string, descriptors: string): string {
            return this.forwardJSONCall(
                `getTodoComments('${fileName}')`,
                () => this.languageService.getTodoComments(fileName, JSON.parse(descriptors))
            );
        }

        /// CALL HIERARCHY

        public prepareCallHierarchy(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `prepareCallHierarchy('${fileName}', ${position})`,
                () => this.languageService.prepareCallHierarchy(fileName, position)
            );
        }

        public provideCallHierarchyIncomingCalls(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `provideCallHierarchyIncomingCalls('${fileName}', ${position})`,
                () => this.languageService.provideCallHierarchyIncomingCalls(fileName, position)
            );
        }

        public provideCallHierarchyOutgoingCalls(fileName: string, position: number): string {
            return this.forwardJSONCall(
                `provideCallHierarchyOutgoingCalls('${fileName}', ${position})`,
                () => this.languageService.provideCallHierarchyOutgoingCalls(fileName, position)
            );
        }

        /// Emit
        public getEmitOutput(fileName: string): string {
            return this.forwardJSONCall(
                `getEmitOutput('${fileName}')`,
                () => {
                    const { diagnostics, ...rest } = this.languageService.getEmitOutput(fileName);
                    return { ...rest, diagnostics: this.realizeDiagnostics(diagnostics) };
                }
            );
        }

        public getEmitOutputObject(fileName: string): EmitOutput {
            return forwardCall(
                this.logger,
                `getEmitOutput('${fileName}')`,
                /*returnJson*/ false,
                () => this.languageService.getEmitOutput(fileName),
                this.logPerformance) as EmitOutput;
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

        public getEncodedLexicalClassifications(text: string, lexState: EndOfLineState, syntacticClassifierAbsent = false): string {
            return forwardJSONCall(this.logger, "getEncodedLexicalClassifications",
                () => convertClassifications(this.classifier.getEncodedLexicalClassifications(text, lexState, syntacticClassifierAbsent)),
                this.logPerformance);
        }

        /// COLORIZATION
        public getClassificationsForLine(text: string, lexState: EndOfLineState, classifyKeywordsInGenerics = false): string {
            const classification = this.classifier.getClassificationsForLine(text, lexState, classifyKeywordsInGenerics);
            let result = "";
            for (const item of classification.entries) {
                result += item.length + "\n";
                result += item.classification + "\n";
            }
            result += classification.finalLexState;
            return result;
        }
    }

    class CoreServicesShimObject extends ShimBase implements CoreServicesShim {
        private logPerformance = false;
        private safeList: JsTyping.SafeList | undefined;

        constructor(factory: ShimFactory, public readonly logger: Logger, private readonly host: CoreServicesShimHostAdapter) {
            super(factory);
        }

        private forwardJSONCall(actionDescription: string, action: () => {}): string {
            return forwardJSONCall(this.logger, actionDescription, action, this.logPerformance);
        }

        public resolveModuleName(fileName: string, moduleName: string, compilerOptionsJson: string): string {
            return this.forwardJSONCall(`resolveModuleName('${fileName}')`, () => {
                const compilerOptions = <CompilerOptions>JSON.parse(compilerOptionsJson);
                const result = resolveModuleName(moduleName, normalizeSlashes(fileName), compilerOptions, this.host);
                let resolvedFileName = result.resolvedModule ? result.resolvedModule.resolvedFileName : undefined;
                if (result.resolvedModule && result.resolvedModule.extension !== Extension.Ts && result.resolvedModule.extension !== Extension.Tsx && result.resolvedModule.extension !== Extension.Dts) {
                    resolvedFileName = undefined;
                }

                return {
                    resolvedFileName,
                    failedLookupLocations: result.failedLookupLocations
                };
            });
        }

        public resolveTypeReferenceDirective(fileName: string, typeReferenceDirective: string, compilerOptionsJson: string): string {
            return this.forwardJSONCall(`resolveTypeReferenceDirective(${fileName})`, () => {
                const compilerOptions = <CompilerOptions>JSON.parse(compilerOptionsJson);
                const result = resolveTypeReferenceDirective(typeReferenceDirective, normalizeSlashes(fileName), compilerOptions, this.host);
                return {
                    resolvedFileName: result.resolvedTypeReferenceDirective ? result.resolvedTypeReferenceDirective.resolvedFileName : undefined,
                    primary: result.resolvedTypeReferenceDirective ? result.resolvedTypeReferenceDirective.primary : true,
                    failedLookupLocations: result.failedLookupLocations
                };
            });
        }

        public getPreProcessedFileInfo(fileName: string, sourceTextSnapshot: IScriptSnapshot): string {
            return this.forwardJSONCall(
                `getPreProcessedFileInfo('${fileName}')`,
                () => {
                    // for now treat files as JavaScript
                    const result = preProcessFile(getSnapshotText(sourceTextSnapshot), /* readImportFiles */ true, /* detectJavaScriptImports */ true);
                    return {
                        referencedFiles: this.convertFileReferences(result.referencedFiles),
                        importedFiles: this.convertFileReferences(result.importedFiles),
                        ambientExternalModules: result.ambientExternalModules,
                        isLibFile: result.isLibFile,
                        typeReferenceDirectives: this.convertFileReferences(result.typeReferenceDirectives),
                        libReferenceDirectives: this.convertFileReferences(result.libReferenceDirectives)
                    };
                });
        }

        public getAutomaticTypeDirectiveNames(compilerOptionsJson: string): string {
            return this.forwardJSONCall(
                `getAutomaticTypeDirectiveNames('${compilerOptionsJson}')`,
                () => {
                    const compilerOptions = <CompilerOptions>JSON.parse(compilerOptionsJson);
                    return getAutomaticTypeDirectiveNames(compilerOptions, this.host);
                }
            );
        }

        private convertFileReferences(refs: FileReference[]): ShimsFileReference[] | undefined {
            if (!refs) {
                return undefined;
            }
            const result: ShimsFileReference[] = [];
            for (const ref of refs) {
                result.push({
                    path: normalizeSlashes(ref.fileName),
                    position: ref.pos,
                    length: ref.end - ref.pos
                });
            }
            return result;
        }

        public getTSConfigFileInfo(fileName: string, sourceTextSnapshot: IScriptSnapshot): string {
            return this.forwardJSONCall(
                `getTSConfigFileInfo('${fileName}')`,
                () => {
                    const result = parseJsonText(fileName, getSnapshotText(sourceTextSnapshot));
                    const normalizedFileName = normalizeSlashes(fileName);
                    const configFile = parseJsonSourceFileConfigFileContent(result, this.host, getDirectoryPath(normalizedFileName), /*existingOptions*/ {}, normalizedFileName);

                    return {
                        options: configFile.options,
                        typeAcquisition: configFile.typeAcquisition,
                        files: configFile.fileNames,
                        raw: configFile.raw,
                        errors: realizeDiagnostics([...result.parseDiagnostics, ...configFile.errors], "\r\n")
                    };
                });
        }

        public getDefaultCompilationSettings(): string {
            return this.forwardJSONCall(
                "getDefaultCompilationSettings()",
                () => getDefaultCompilerOptions()
            );
        }

        public discoverTypings(discoverTypingsJson: string): string {
            const getCanonicalFileName = createGetCanonicalFileName(/*useCaseSensitivefileNames:*/ false);
            return this.forwardJSONCall("discoverTypings()", () => {
                const info = <DiscoverTypingsInfo>JSON.parse(discoverTypingsJson);
                if (this.safeList === undefined) {
                    this.safeList = JsTyping.loadSafeList(this.host, toPath(info.safeListPath, info.safeListPath, getCanonicalFileName));
                }
                return JsTyping.discoverTypings(
                    this.host,
                    msg => this.logger.log(msg),
                    info.fileNames,
                    toPath(info.projectRootPath, info.projectRootPath, getCanonicalFileName),
                    this.safeList,
                    info.packageNameToTypingLocation,
                    info.typeAcquisition,
                    info.unresolvedImports,
                    info.typesRegistry);
            });
        }
    }

    export class TypeScriptServicesFactory implements ShimFactory {
        private _shims: Shim[] = [];
        private documentRegistry: DocumentRegistry | undefined;

        /*
         * Returns script API version.
         */
        public getServicesVersion(): string {
            return servicesVersion;
        }

        public createLanguageServiceShim(host: LanguageServiceShimHost): LanguageServiceShim {
            try {
                if (this.documentRegistry === undefined) {
                    this.documentRegistry = createDocumentRegistry(host.useCaseSensitiveFileNames && host.useCaseSensitiveFileNames(), host.getCurrentDirectory());
                }
                const hostAdapter = new LanguageServiceShimHostAdapter(host);
                const languageService = createLanguageService(hostAdapter, this.documentRegistry, /*syntaxOnly*/ false);
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
                const adapter = new CoreServicesShimHostAdapter(host);
                return new CoreServicesShimObject(this, <Logger>host, adapter);
            }
            catch (err) {
                logInternalError(<Logger>host, err);
                throw err;
            }
        }

        public close(): void {
            // Forget all the registered shims
            clear(this._shims);
            this.documentRegistry = undefined!;
        }

        public registerShim(shim: Shim): void {
            this._shims.push(shim);
        }

        public unregisterShim(shim: Shim): void {
            for (let i = 0; i < this._shims.length; i++) {
                if (this._shims[i] === shim) {
                    delete this._shims[i];
                    return;
                }
            }

            throw new Error("Invalid operation");
        }
    }
}

/* eslint-enable no-in-operator */
