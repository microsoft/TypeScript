/// <reference path="types.d.ts" />

namespace ts.server {
    export enum LogLevel {
        terse,
        normal,
        requestTime,
        verbose
    }

    export const emptyArray: ReadonlyArray<any> = [];

    export interface Logger {
        close(): void;
        hasLevel(level: LogLevel): boolean;
        loggingEnabled(): boolean;
        perftrc(s: string): void;
        info(s: string): void;
        startGroup(): void;
        endGroup(): void;
        msg(s: string, type?: Msg.Types): void;
        getLogFileName(): string;
    }

    export namespace Msg {
        export type Err = "Err";
        export const Err: Err = "Err";
        export type Info = "Info";
        export const Info: Info = "Info";
        export type Perf = "Perf";
        export const Perf: Perf = "Perf";
        export type Types = Err | Info | Perf;
    }

    function getProjectRootPath(project: Project): Path {
        switch (project.projectKind) {
            case ProjectKind.Configured:
                return <Path>getDirectoryPath(project.getProjectName());
            case ProjectKind.Inferred:
                // TODO: fixme
                return <Path>"";
            case ProjectKind.External:
                const projectName = normalizeSlashes(project.getProjectName());
                return project.projectService.host.fileExists(projectName) ? <Path>getDirectoryPath(projectName) : <Path>projectName;
        }
    }

    export function createInstallTypingsRequest(project: Project, typingOptions: TypingOptions, unresolvedImports: SortedReadonlyArray<string>, cachePath?: string): DiscoverTypings {
        return {
            projectName: project.getProjectName(),
            fileNames: project.getFileNames(),
            compilerOptions: project.getCompilerOptions(),
            typingOptions,
            unresolvedImports,
            projectRootPath: getProjectRootPath(project),
            cachePath,
            kind: "discover"
        };
    }

    export namespace Errors {
        export function ThrowNoProject(): never {
            throw new Error("No Project.");
        }
        export function ThrowProjectLanguageServiceDisabled(): never {
            throw new Error("The project's language service is disabled.");
        }
        export function ThrowProjectDoesNotContainDocument(fileName: string, project: Project): never {
            throw new Error(`Project '${project.getProjectName()}' does not contain document '${fileName}'`);
        }
    }

    export function getDefaultFormatCodeSettings(host: ServerHost): FormatCodeSettings {
        return {
            indentSize: 4,
            tabSize: 4,
            newLineCharacter: host.newLine || "\n",
            convertTabsToSpaces: true,
            indentStyle: ts.IndentStyle.Smart,
            insertSpaceAfterCommaDelimiter: true,
            insertSpaceAfterSemicolonInForStatements: true,
            insertSpaceBeforeAndAfterBinaryOperators: true,
            insertSpaceAfterKeywordsInControlFlowStatements: true,
            insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
            insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
            insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
            placeOpenBraceOnNewLineForFunctions: false,
            placeOpenBraceOnNewLineForControlBlocks: false,
        };
    }

    export function mergeMaps(target: MapLike<any>, source: MapLike <any>): void {
        for (const key in source) {
            if (hasProperty(source, key)) {
                target[key] = source[key];
            }
        }
    }

    export function removeItemFromSet<T>(items: T[], itemToRemove: T) {
        if (items.length === 0) {
            return;
        }
        const index = items.indexOf(itemToRemove);
        if (index < 0) {
            return;
        }
        if (index ===  items.length - 1) {
            // last item - pop it
            items.pop();
        }
        else {
            // non-last item - replace it with the last one
            items[index] = items.pop();
        }
    }

    export type NormalizedPath = string & { __normalizedPathTag: any };

    export function toNormalizedPath(fileName: string): NormalizedPath {
        return <NormalizedPath>normalizePath(fileName);
    }

    export function normalizedPathToPath(normalizedPath: NormalizedPath, currentDirectory: string, getCanonicalFileName: (f: string) => string): Path {
        const f = isRootedDiskPath(normalizedPath) ? normalizedPath : getNormalizedAbsolutePath(normalizedPath, currentDirectory);
        return <Path>getCanonicalFileName(f);
    }

    export function asNormalizedPath(fileName: string): NormalizedPath {
        return <NormalizedPath>fileName;
    }

    export interface NormalizedPathMap<T> {
        get(path: NormalizedPath): T;
        set(path: NormalizedPath, value: T): void;
        contains(path: NormalizedPath): boolean;
        remove(path: NormalizedPath): void;
    }

    export function createNormalizedPathMap<T>(): NormalizedPathMap<T> {
/* tslint:disable:no-null-keyword */
        const map: Map<T> = Object.create(null);
/* tslint:enable:no-null-keyword */
        return {
            get(path) {
                return map[path];
            },
            set(path, value) {
                map[path] = value;
            },
            contains(path) {
                return hasProperty(map, path);
            },
            remove(path) {
                delete map[path];
            }
        };
    }
    function throwLanguageServiceIsDisabledError(): never {
        throw new Error("LanguageService is disabled");
    }

    export const nullLanguageService: LanguageService = {
        cleanupSemanticCache: throwLanguageServiceIsDisabledError,
        getSyntacticDiagnostics: throwLanguageServiceIsDisabledError,
        getSemanticDiagnostics: throwLanguageServiceIsDisabledError,
        getCompilerOptionsDiagnostics: throwLanguageServiceIsDisabledError,
        getSyntacticClassifications: throwLanguageServiceIsDisabledError,
        getEncodedSyntacticClassifications: throwLanguageServiceIsDisabledError,
        getSemanticClassifications: throwLanguageServiceIsDisabledError,
        getEncodedSemanticClassifications: throwLanguageServiceIsDisabledError,
        getCompletionsAtPosition:  throwLanguageServiceIsDisabledError,
        findReferences: throwLanguageServiceIsDisabledError,
        getCompletionEntryDetails: throwLanguageServiceIsDisabledError,
        getQuickInfoAtPosition: throwLanguageServiceIsDisabledError,
        findRenameLocations: throwLanguageServiceIsDisabledError,
        getNameOrDottedNameSpan: throwLanguageServiceIsDisabledError,
        getBreakpointStatementAtPosition: throwLanguageServiceIsDisabledError,
        getBraceMatchingAtPosition: throwLanguageServiceIsDisabledError,
        getSignatureHelpItems: throwLanguageServiceIsDisabledError,
        getDefinitionAtPosition: throwLanguageServiceIsDisabledError,
        getRenameInfo: throwLanguageServiceIsDisabledError,
        getTypeDefinitionAtPosition: throwLanguageServiceIsDisabledError,
        getReferencesAtPosition: throwLanguageServiceIsDisabledError,
        getDocumentHighlights: throwLanguageServiceIsDisabledError,
        getOccurrencesAtPosition: throwLanguageServiceIsDisabledError,
        getNavigateToItems: throwLanguageServiceIsDisabledError,
        getNavigationBarItems: throwLanguageServiceIsDisabledError,
        getNavigationTree: throwLanguageServiceIsDisabledError,
        getOutliningSpans: throwLanguageServiceIsDisabledError,
        getTodoComments: throwLanguageServiceIsDisabledError,
        getIndentationAtPosition: throwLanguageServiceIsDisabledError,
        getFormattingEditsForRange: throwLanguageServiceIsDisabledError,
        getFormattingEditsForDocument: throwLanguageServiceIsDisabledError,
        getFormattingEditsAfterKeystroke: throwLanguageServiceIsDisabledError,
        getDocCommentTemplateAtPosition: throwLanguageServiceIsDisabledError,
        isValidBraceCompletionAtPosition: throwLanguageServiceIsDisabledError,
        getEmitOutput: throwLanguageServiceIsDisabledError,
        getProgram: throwLanguageServiceIsDisabledError,
        getNonBoundSourceFile: throwLanguageServiceIsDisabledError,
        dispose: throwLanguageServiceIsDisabledError,
        getCompletionEntrySymbol: throwLanguageServiceIsDisabledError,
        getImplementationAtPosition: throwLanguageServiceIsDisabledError,
        getSourceFile: throwLanguageServiceIsDisabledError,
        getCodeFixesAtPosition: throwLanguageServiceIsDisabledError
    };

    export interface ServerLanguageServiceHost {
        setCompilationSettings(options: CompilerOptions): void;
        notifyFileRemoved(info: ScriptInfo): void;
        startRecordingFilesWithChangedResolutions(): void;
        finishRecordingFilesWithChangedResolutions(): Path[];
    }

    export const nullLanguageServiceHost: ServerLanguageServiceHost = {
        setCompilationSettings: () => undefined,
        notifyFileRemoved: () => undefined,
        startRecordingFilesWithChangedResolutions: () => undefined,
        finishRecordingFilesWithChangedResolutions: () => undefined
    };

    export interface ProjectOptions {
        /**
         * true if config file explicitly listed files
         **/
        configHasFilesProperty?: boolean;
        /**
         * these fields can be present in the project file
         **/
        files?: string[];
        wildcardDirectories?: Map<WatchDirectoryFlags>;
        compilerOptions?: CompilerOptions;
        typingOptions?: TypingOptions;
        compileOnSave?: boolean;
    }

    export function isInferredProjectName(name: string) {
        // POSIX defines /dev/null as a device - there should be no file with this prefix
        return /dev\/null\/inferredProject\d+\*/.test(name);
    }

    export function makeInferredProjectName(counter: number) {
        return `/dev/null/inferredProject${counter}*`;
    }

    export function toSortedReadonlyArray(arr: string[]): SortedReadonlyArray<string> {
        arr.sort();
        return <any>arr;
    }

    export class ThrottledOperations {
        private pendingTimeouts: Map<any> = createMap<any>();
        constructor(private readonly host: ServerHost) {
        }

        public schedule(operationId: string, delay: number, cb: () => void) {
            if (hasProperty(this.pendingTimeouts, operationId)) {
                // another operation was already scheduled for this id - cancel it
                this.host.clearTimeout(this.pendingTimeouts[operationId]);
            }
            // schedule new operation, pass arguments
            this.pendingTimeouts[operationId] = this.host.setTimeout(ThrottledOperations.run, delay, this, operationId, cb);
        }

        private static run(self: ThrottledOperations, operationId: string, cb: () => void) {
            delete self.pendingTimeouts[operationId];
            cb();
        }
    }

    export class GcTimer {
        private timerId: any;
        constructor(private readonly host: ServerHost, private readonly delay: number, private readonly logger: Logger) {
        }

        public scheduleCollect() {
            if (!this.host.gc || this.timerId != undefined) {
                // no global.gc or collection was already scheduled - skip this request
                return;
            }
            this.timerId = this.host.setTimeout(GcTimer.run, this.delay, this);
        }

        private static run(self: GcTimer) {
            self.timerId = undefined;

            const log = self.logger.hasLevel(LogLevel.requestTime);
            const before = log && self.host.getMemoryUsage();

            self.host.gc();
            if (log) {
                const after = self.host.getMemoryUsage();
                self.logger.perftrc(`GC::before ${before}, after ${after}`);
            }
        }
    }
}