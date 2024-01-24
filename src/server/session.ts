import {
    arrayFrom,
    arrayReverseIterator,
    BufferEncoding,
    CallHierarchyIncomingCall,
    CallHierarchyItem,
    CallHierarchyOutgoingCall,
    cast,
    CodeAction,
    CodeActionCommand,
    CodeFixAction,
    CombinedCodeActions,
    CompilerOptions,
    CompletionEntry,
    CompletionEntryData,
    CompletionEntryDetails,
    CompletionInfo,
    CompletionTriggerKind,
    computeLineAndCharacterOfPosition,
    computeLineStarts,
    concatenate,
    createQueue,
    createSet,
    createTextSpan,
    createTextSpanFromBounds,
    Debug,
    decodedTextSpanIntersectsWith,
    deduplicate,
    DefinitionInfo,
    DefinitionInfoAndBoundSpan,
    Diagnostic,
    diagnosticCategoryName,
    DiagnosticRelatedInformation,
    displayPartsToString,
    DocumentHighlights,
    DocumentPosition,
    DocumentSpan,
    documentSpansEqual,
    EmitOutput,
    equateValues,
    FileTextChanges,
    filter,
    find,
    FindAllReferences,
    first,
    firstIterator,
    firstOrUndefined,
    flatMap,
    flatMapToMutable,
    flattenDiagnosticMessageText,
    forEachNameInAccessChainWalkingLeft,
    FormatCodeSettings,
    formatting,
    getDeclarationFromName,
    getDeclarationOfKind,
    getDocumentSpansEqualityComparer,
    getEmitDeclarations,
    getEntrypointsFromPackageJsonInfo,
    getLineAndCharacterOfPosition,
    getMappedContextSpan,
    getMappedDocumentSpan,
    getMappedLocation,
    getNodeModulePathParts,
    getNormalizedAbsolutePath,
    getPackageNameFromTypesPackageName,
    getPackageScopeForPath,
    getSnapshotText,
    getSupportedCodeFixes,
    getTemporaryModuleResolutionState,
    getTextOfIdentifierOrLiteral,
    getTouchingPropertyName,
    GoToDefinition,
    HostCancellationToken,
    identity,
    ImplementationLocation,
    ImportSpecifier,
    isAccessExpression,
    isArray,
    isDeclarationFileName,
    isIdentifier,
    isString,
    isStringLiteralLike,
    JSDocLinkDisplayPart,
    JSDocTagInfo,
    LanguageServiceMode,
    LineAndCharacter,
    LinkedEditingInfo,
    map,
    mapDefined,
    mapDefinedIterator,
    mapIterator,
    mapOneOrMany,
    memoize,
    ModuleResolutionKind,
    MultiMap,
    NavigateToItem,
    NavigationBarItem,
    NavigationTree,
    nodeModulesPathPart,
    normalizePath,
    OperationCanceledException,
    OrganizeImportsMode,
    outFile,
    OutliningSpan,
    Path,
    perfLogger,
    PerformanceEvent,
    PossibleProgramFileInfo,
    Program,
    QuickInfo,
    RefactorEditInfo,
    ReferencedSymbol,
    ReferencedSymbolDefinitionInfo,
    ReferencedSymbolEntry,
    ReferenceEntry,
    removeFileExtension,
    RenameInfo,
    RenameLocation,
    ScriptKind,
    SelectionRange,
    SemanticClassificationFormat,
    SignatureHelpItem,
    SignatureHelpItems,
    singleIterator,
    some,
    SourceFile,
    startsWith,
    SymbolDisplayPart,
    SyntaxKind,
    TextChange,
    TextInsertion,
    TextRange,
    TextSpan,
    textSpanEnd,
    toArray,
    toFileNameLowerCase,
    tracing,
    unmangleScopedPackageName,
    version,
    WithMetadata,
} from "./_namespaces/ts";
import {
    AuxiliaryProject,
    CloseFileWatcherEvent,
    ConfigFileDiagEvent,
    ConfiguredProject,
    convertFormatOptions,
    convertScriptKindName,
    convertUserPreferences,
    CreateDirectoryWatcherEvent,
    CreateFileWatcherEvent,
    EmitResult,
    emptyArray,
    Errors,
    GcTimer,
    indent,
    isConfigFile,
    isConfiguredProject,
    isExternalProject,
    isInferredProject,
    ITypingsInstaller,
    LargeFileReferencedEvent,
    Logger,
    LogLevel,
    Msg,
    NormalizedPath,
    nullTypingsInstaller,
    Project,
    ProjectInfoTelemetryEvent,
    ProjectKind,
    ProjectLanguageServiceStateEvent,
    ProjectLoadingFinishEvent,
    ProjectLoadingStartEvent,
    ProjectService,
    ProjectServiceEvent,
    ProjectServiceEventHandler,
    ProjectServiceOptions,
    ProjectsUpdatedInBackgroundEvent,
    ScriptInfo,
    ScriptInfoOrConfig,
    ServerHost,
    stringifyIndented,
    toNormalizedPath,
    updateProjectIfDirty,
} from "./_namespaces/ts.server";
import * as protocol from "./protocol";

interface StackTraceError extends Error {
    stack?: string;
}

export interface ServerCancellationToken extends HostCancellationToken {
    setRequest(requestId: number): void;
    resetRequest(requestId: number): void;
}

export const nullCancellationToken: ServerCancellationToken = {
    isCancellationRequested: () => false,
    setRequest: () => void 0,
    resetRequest: () => void 0,
};

function hrTimeToMilliseconds(time: [number, number]): number {
    const seconds = time[0];
    const nanoseconds = time[1];
    return ((1e9 * seconds) + nanoseconds) / 1000000.0;
}

function isDeclarationFileInJSOnlyNonConfiguredProject(project: Project, file: NormalizedPath) {
    // Checking for semantic diagnostics is an expensive process. We want to avoid it if we
    // know for sure it is not needed.
    // For instance, .d.ts files injected by ATA automatically do not produce any relevant
    // errors to a JS- only project.
    //
    // Note that configured projects can set skipLibCheck (on by default in jsconfig.json) to
    // disable checking for declaration files. We only need to verify for inferred projects (e.g.
    // miscellaneous context in VS) and external projects(e.g.VS.csproj project) with only JS
    // files.
    //
    // We still want to check .js files in a JS-only inferred or external project (e.g. if the
    // file has '// @ts-check').

    if (
        (isInferredProject(project) || isExternalProject(project)) &&
        project.isJsOnlyProject()
    ) {
        const scriptInfo = project.getScriptInfoForNormalizedPath(file);
        return scriptInfo && !scriptInfo.isJavaScript();
    }
    return false;
}

function dtsChangeCanAffectEmit(compilationSettings: CompilerOptions) {
    return getEmitDeclarations(compilationSettings) || !!compilationSettings.emitDecoratorMetadata;
}

function formatDiag(fileName: NormalizedPath, project: Project, diag: Diagnostic): protocol.Diagnostic {
    const scriptInfo = project.getScriptInfoForNormalizedPath(fileName)!; // TODO: GH#18217
    return {
        start: scriptInfo.positionToLineOffset(diag.start!),
        end: scriptInfo.positionToLineOffset(diag.start! + diag.length!), // TODO: GH#18217
        text: flattenDiagnosticMessageText(diag.messageText, "\n"),
        code: diag.code,
        category: diagnosticCategoryName(diag),
        reportsUnnecessary: diag.reportsUnnecessary,
        reportsDeprecated: diag.reportsDeprecated,
        source: diag.source,
        relatedInformation: map(diag.relatedInformation, formatRelatedInformation),
    };
}

function formatRelatedInformation(info: DiagnosticRelatedInformation): protocol.DiagnosticRelatedInformation {
    if (!info.file) {
        return {
            message: flattenDiagnosticMessageText(info.messageText, "\n"),
            category: diagnosticCategoryName(info),
            code: info.code,
        };
    }
    return {
        span: {
            start: convertToLocation(getLineAndCharacterOfPosition(info.file, info.start!)),
            end: convertToLocation(getLineAndCharacterOfPosition(info.file, info.start! + info.length!)), // TODO: GH#18217
            file: info.file.fileName,
        },
        message: flattenDiagnosticMessageText(info.messageText, "\n"),
        category: diagnosticCategoryName(info),
        code: info.code,
    };
}

function convertToLocation(lineAndCharacter: LineAndCharacter): protocol.Location {
    return { line: lineAndCharacter.line + 1, offset: lineAndCharacter.character + 1 };
}

/** @internal */
export function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: true): protocol.DiagnosticWithFileName;
/** @internal */
export function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: false): protocol.Diagnostic;
/** @internal */
export function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: boolean): protocol.Diagnostic | protocol.DiagnosticWithFileName {
    const start = (diag.file && convertToLocation(getLineAndCharacterOfPosition(diag.file, diag.start!)))!; // TODO: GH#18217
    const end = (diag.file && convertToLocation(getLineAndCharacterOfPosition(diag.file, diag.start! + diag.length!)))!; // TODO: GH#18217
    const text = flattenDiagnosticMessageText(diag.messageText, "\n");
    const { code, source } = diag;
    const category = diagnosticCategoryName(diag);
    const common = {
        start,
        end,
        text,
        code,
        category,
        reportsUnnecessary: diag.reportsUnnecessary,
        reportsDeprecated: diag.reportsDeprecated,
        source,
        relatedInformation: map(diag.relatedInformation, formatRelatedInformation),
    };
    return includeFileName
        ? { ...common, fileName: diag.file && diag.file.fileName }
        : common;
}

export interface PendingErrorCheck {
    fileName: NormalizedPath;
    project: Project;
}

function allEditsBeforePos(edits: readonly TextChange[], pos: number): boolean {
    return edits.every(edit => textSpanEnd(edit.span) < pos);
}

// CommandNames used to be exposed before TS 2.4 as a namespace
// In TS 2.4 we switched to an enum, keep this for backward compatibility
// The var assignment ensures that even though CommandTypes are a const enum
// we want to ensure the value is maintained in the out since the file is
// built using --preseveConstEnum.
/** @deprecated use ts.server.protocol.CommandTypes */
export type CommandNames = protocol.CommandTypes;
/** @deprecated use ts.server.protocol.CommandTypes */
export const CommandNames = (protocol as any).CommandTypes;

export function formatMessage<T extends protocol.Message>(msg: T, logger: Logger, byteLength: (s: string, encoding: BufferEncoding) => number, newLine: string): string {
    const verboseLogging = logger.hasLevel(LogLevel.verbose);

    const json = JSON.stringify(msg);
    if (verboseLogging) {
        logger.info(`${msg.type}:${stringifyIndented(msg)}`);
    }

    const len = byteLength(json, "utf8");
    return `Content-Length: ${1 + len}\r\n\r\n${json}${newLine}`;
}

/**
 * Allows to schedule next step in multistep operation
 */
interface NextStep {
    immediate(actionType: string, action: () => void): void;
    delay(actionType: string, ms: number, action: () => void): void;
}

/**
 * External capabilities used by multistep operation
 */
interface MultistepOperationHost {
    getCurrentRequestId(): number;
    sendRequestCompletedEvent(requestId: number): void;
    getServerHost(): ServerHost;
    isCancellationRequested(): boolean;
    executeWithRequestId(requestId: number, action: () => void): void;
    logError(error: Error, message: string): void;
}

/**
 * Represents operation that can schedule its next step to be executed later.
 * Scheduling is done via instance of NextStep. If on current step subsequent step was not scheduled - operation is assumed to be completed.
 */
class MultistepOperation implements NextStep {
    private requestId: number | undefined;
    private timerHandle: any;
    private immediateId: number | undefined;

    constructor(private readonly operationHost: MultistepOperationHost) {}

    public startNew(action: (next: NextStep) => void) {
        this.complete();
        this.requestId = this.operationHost.getCurrentRequestId();
        this.executeAction(action);
    }

    private complete() {
        if (this.requestId !== undefined) {
            this.operationHost.sendRequestCompletedEvent(this.requestId);
            this.requestId = undefined;
        }
        this.setTimerHandle(undefined);
        this.setImmediateId(undefined);
    }

    public immediate(actionType: string, action: () => void) {
        const requestId = this.requestId!;
        Debug.assert(requestId === this.operationHost.getCurrentRequestId(), "immediate: incorrect request id");
        this.setImmediateId(
            this.operationHost.getServerHost().setImmediate(() => {
                this.immediateId = undefined;
                this.operationHost.executeWithRequestId(requestId, () => this.executeAction(action));
            }, actionType),
        );
    }

    public delay(actionType: string, ms: number, action: () => void) {
        const requestId = this.requestId!;
        Debug.assert(requestId === this.operationHost.getCurrentRequestId(), "delay: incorrect request id");
        this.setTimerHandle(
            this.operationHost.getServerHost().setTimeout(
                () => {
                    this.timerHandle = undefined;
                    this.operationHost.executeWithRequestId(requestId, () => this.executeAction(action));
                },
                ms,
                actionType,
            ),
        );
    }

    private executeAction(action: (next: NextStep) => void) {
        let stop = false;
        try {
            if (this.operationHost.isCancellationRequested()) {
                stop = true;
                tracing?.instant(tracing.Phase.Session, "stepCanceled", { seq: this.requestId, early: true });
            }
            else {
                tracing?.push(tracing.Phase.Session, "stepAction", { seq: this.requestId });
                action(this);
                tracing?.pop();
            }
        }
        catch (e) {
            // Cancellation or an error may have left incomplete events on the tracing stack.
            tracing?.popAll();

            stop = true;
            // ignore cancellation request
            if (e instanceof OperationCanceledException) {
                tracing?.instant(tracing.Phase.Session, "stepCanceled", { seq: this.requestId });
            }
            else {
                tracing?.instant(tracing.Phase.Session, "stepError", { seq: this.requestId, message: (e as Error).message });
                this.operationHost.logError(e, `delayed processing of request ${this.requestId}`);
            }
        }
        if (stop || !this.hasPendingWork()) {
            this.complete();
        }
    }

    private setTimerHandle(timerHandle: any) {
        if (this.timerHandle !== undefined) {
            this.operationHost.getServerHost().clearTimeout(this.timerHandle);
        }
        this.timerHandle = timerHandle;
    }

    private setImmediateId(immediateId: number | undefined) {
        if (this.immediateId !== undefined) {
            this.operationHost.getServerHost().clearImmediate(this.immediateId);
        }
        this.immediateId = immediateId;
    }

    private hasPendingWork() {
        return !!this.timerHandle || !!this.immediateId;
    }
}

export type Event = <T extends object>(body: T, eventName: string) => void;

export interface EventSender {
    event: Event;
}

/** @internal */
export function toEvent(eventName: string, body: object): protocol.Event {
    return {
        seq: 0,
        type: "event",
        event: eventName,
        body,
    };
}

type Projects = readonly Project[] | {
    readonly projects: readonly Project[];
    readonly symLinkedProjects: MultiMap<Path, Project>;
};

/**
 * This helper function processes a list of projects and return the concatenated, sortd and deduplicated output of processing each project.
 */
function combineProjectOutput<T, U>(
    defaultValue: T,
    getValue: (path: Path) => T,
    projects: Projects,
    action: (project: Project, value: T) => readonly U[] | U | undefined,
): U[] {
    const outputs = flatMapToMutable(isArray(projects) ? projects : projects.projects, project => action(project, defaultValue));
    if (!isArray(projects) && projects.symLinkedProjects) {
        projects.symLinkedProjects.forEach((projects, path) => {
            const value = getValue(path);
            outputs.push(...flatMap(projects, project => action(project, value)));
        });
    }
    return deduplicate(outputs, equateValues);
}

interface ProjectNavigateToItems {
    project: Project;
    navigateToItems: readonly NavigateToItem[];
}

function createDocumentSpanSet(useCaseSensitiveFileNames: boolean): Set<DocumentSpan> {
    return createSet(({ textSpan }) => textSpan.start + 100003 * textSpan.length, getDocumentSpansEqualityComparer(useCaseSensitiveFileNames));
}

function getRenameLocationsWorker(
    projects: Projects,
    defaultProject: Project,
    initialLocation: DocumentPosition,
    findInStrings: boolean,
    findInComments: boolean,
    preferences: protocol.UserPreferences,
    useCaseSensitiveFileNames: boolean,
): readonly RenameLocation[] {
    const perProjectResults = getPerProjectReferences(
        projects,
        defaultProject,
        initialLocation,
        /*isForRename*/ true,
        (project, position) => project.getLanguageService().findRenameLocations(position.fileName, position.pos, findInStrings, findInComments, preferences),
        (renameLocation, cb) => cb(documentSpanLocation(renameLocation)),
    );

    // No filtering or dedup'ing is required if there's exactly one project
    if (isArray(perProjectResults)) {
        return perProjectResults;
    }

    const results: RenameLocation[] = [];
    const seen = createDocumentSpanSet(useCaseSensitiveFileNames);

    perProjectResults.forEach((projectResults, project) => {
        for (const result of projectResults) {
            // If there's a mapped location, it'll appear in the results for another project
            if (!seen.has(result) && !getMappedLocationForProject(documentSpanLocation(result), project)) {
                results.push(result);
                seen.add(result);
            }
        }
    });

    return results;
}

function getDefinitionLocation(defaultProject: Project, initialLocation: DocumentPosition, isForRename: boolean): DocumentPosition | undefined {
    const infos = defaultProject.getLanguageService().getDefinitionAtPosition(initialLocation.fileName, initialLocation.pos, /*searchOtherFilesOnly*/ false, /*stopAtAlias*/ isForRename);
    const info = infos && firstOrUndefined(infos);
    // Note that the value of `isLocal` may depend on whether or not the checker has run on the containing file
    // (implying that FAR cascading behavior may depend on request order)
    return info && !info.isLocal ? { fileName: info.fileName, pos: info.textSpan.start } : undefined;
}

function getReferencesWorker(
    projects: Projects,
    defaultProject: Project,
    initialLocation: DocumentPosition,
    useCaseSensitiveFileNames: boolean,
    logger: Logger,
): readonly ReferencedSymbol[] {
    const perProjectResults = getPerProjectReferences(
        projects,
        defaultProject,
        initialLocation,
        /*isForRename*/ false,
        (project, position) => {
            logger.info(`Finding references to ${position.fileName} position ${position.pos} in project ${project.getProjectName()}`);
            return project.getLanguageService().findReferences(position.fileName, position.pos);
        },
        (referencedSymbol, cb) => {
            cb(documentSpanLocation(referencedSymbol.definition));
            for (const ref of referencedSymbol.references) {
                cb(documentSpanLocation(ref));
            }
        },
    );

    // No re-mapping or isDefinition updatses are required if there's exactly one project
    if (isArray(perProjectResults)) {
        return perProjectResults;
    }

    // `isDefinition` is only (definitely) correct in `defaultProject` because we might
    // have started the other project searches from related symbols.  Propagate the
    // correct results to all other projects.

    const defaultProjectResults = perProjectResults.get(defaultProject);
    if (defaultProjectResults?.[0]?.references[0]?.isDefinition === undefined) {
        // Clear all isDefinition properties
        perProjectResults.forEach(projectResults => {
            for (const referencedSymbol of projectResults) {
                for (const ref of referencedSymbol.references) {
                    delete ref.isDefinition;
                }
            }
        });
    }
    else {
        // Correct isDefinition properties from projects other than defaultProject
        const knownSymbolSpans = createDocumentSpanSet(useCaseSensitiveFileNames);
        for (const referencedSymbol of defaultProjectResults) {
            for (const ref of referencedSymbol.references) {
                if (ref.isDefinition) {
                    knownSymbolSpans.add(ref);
                    // One is enough - updateIsDefinitionOfReferencedSymbols will fill out the set based on symbols
                    break;
                }
            }
        }

        const updatedProjects = new Set<Project>();
        while (true) {
            let progress = false;
            perProjectResults.forEach((referencedSymbols, project) => {
                if (updatedProjects.has(project)) return;
                const updated = project.getLanguageService().updateIsDefinitionOfReferencedSymbols(referencedSymbols, knownSymbolSpans);
                if (updated) {
                    updatedProjects.add(project);
                    progress = true;
                }
            });
            if (!progress) break;
        }

        perProjectResults.forEach((referencedSymbols, project) => {
            if (updatedProjects.has(project)) return;
            for (const referencedSymbol of referencedSymbols) {
                for (const ref of referencedSymbol.references) {
                    ref.isDefinition = false;
                }
            }
        });
    }

    // We need to de-duplicate and aggregate the results by choosing an authoritative version
    // of each definition and merging references from all the projects where they appear.

    const results: ReferencedSymbol[] = [];
    const seenRefs = createDocumentSpanSet(useCaseSensitiveFileNames); // It doesn't make sense to have a reference in two definition lists, so we de-dup globally

    // TODO: We might end up with a more logical allocation of refs to defs if we pre-sorted the defs by descending ref-count.
    // Otherwise, it just ends up attached to the first corresponding def we happen to process.  The others may or may not be
    // dropped later when we check for defs with ref-count 0.
    perProjectResults.forEach((projectResults, project) => {
        for (const referencedSymbol of projectResults) {
            const mappedDefinitionFile = getMappedLocationForProject(documentSpanLocation(referencedSymbol.definition), project);
            const definition: ReferencedSymbolDefinitionInfo = mappedDefinitionFile === undefined ?
                referencedSymbol.definition :
                {
                    ...referencedSymbol.definition,
                    textSpan: createTextSpan(mappedDefinitionFile.pos, referencedSymbol.definition.textSpan.length), // Why would the length be the same in the original?
                    fileName: mappedDefinitionFile.fileName,
                    contextSpan: getMappedContextSpanForProject(referencedSymbol.definition, project),
                };

            let symbolToAddTo = find(results, o => documentSpansEqual(o.definition, definition, useCaseSensitiveFileNames));
            if (!symbolToAddTo) {
                symbolToAddTo = { definition, references: [] };
                results.push(symbolToAddTo);
            }

            for (const ref of referencedSymbol.references) {
                if (!seenRefs.has(ref) && !getMappedLocationForProject(documentSpanLocation(ref), project)) {
                    seenRefs.add(ref);
                    symbolToAddTo.references.push(ref);
                }
            }
        }
    });

    return results.filter(o => o.references.length !== 0);
}

interface ProjectAndLocation {
    readonly project: Project;
    readonly location: DocumentPosition;
}

function forEachProjectInProjects(projects: Projects, path: string | undefined, cb: (project: Project, path: string | undefined) => void): void {
    for (const project of isArray(projects) ? projects : projects.projects) {
        cb(project, path);
    }
    if (!isArray(projects) && projects.symLinkedProjects) {
        projects.symLinkedProjects.forEach((symlinkedProjects, symlinkedPath) => {
            for (const project of symlinkedProjects) {
                cb(project, symlinkedPath);
            }
        });
    }
}

/**
 * @param projects Projects initially known to contain {@link initialLocation}
 * @param defaultProject The default project containing {@link initialLocation}
 * @param initialLocation Where the search operation was triggered
 * @param getResultsForPosition This is where you plug in `findReferences`, `renameLocation`, etc
 * @param forPositionInResult Given an item returned by {@link getResultsForPosition} enumerate the positions referred to by that result
 * @returns In the common case where there's only one project, returns an array of results from {@link getResultsForPosition}.
 * If multiple projects were searched - even if they didn't return results - the result will be a map from project to per-project results.
 */
function getPerProjectReferences<TResult>(
    projects: Projects,
    defaultProject: Project,
    initialLocation: DocumentPosition,
    isForRename: boolean,
    getResultsForPosition: (project: Project, location: DocumentPosition) => readonly TResult[] | undefined,
    forPositionInResult: (result: TResult, cb: (location: DocumentPosition) => void) => void,
): readonly TResult[] | Map<Project, readonly TResult[]> {
    // If `getResultsForPosition` returns results for a project, they go in here
    const resultsMap = new Map<Project, readonly TResult[]>();

    const queue = createQueue<ProjectAndLocation>();

    // In order to get accurate isDefinition values for `defaultProject`,
    // we need to ensure that it is searched from `initialLocation`.
    // The easiest way to do this is to search it first.
    queue.enqueue({ project: defaultProject, location: initialLocation });

    // This will queue `defaultProject` a second time, but it will be dropped
    // as a dup when it is dequeued.
    forEachProjectInProjects(projects, initialLocation.fileName, (project, path) => {
        const location = { fileName: path!, pos: initialLocation.pos };
        queue.enqueue({ project, location });
    });

    const projectService = defaultProject.projectService;
    const cancellationToken = defaultProject.getCancellationToken();

    const defaultDefinition = getDefinitionLocation(defaultProject, initialLocation, isForRename);

    // Don't call these unless !!defaultDefinition
    const getGeneratedDefinition = memoize(() =>
        defaultProject.isSourceOfProjectReferenceRedirect(defaultDefinition!.fileName) ?
            defaultDefinition :
            defaultProject.getLanguageService().getSourceMapper().tryGetGeneratedPosition(defaultDefinition!)
    );
    const getSourceDefinition = memoize(() =>
        defaultProject.isSourceOfProjectReferenceRedirect(defaultDefinition!.fileName) ?
            defaultDefinition :
            defaultProject.getLanguageService().getSourceMapper().tryGetSourcePosition(defaultDefinition!)
    );

    // The keys of resultsMap allow us to check which projects have already been searched, but we also
    // maintain a set of strings because that's what `loadAncestorProjectTree` wants.
    const searchedProjectKeys = new Set<string>();

    onCancellation:
    while (!queue.isEmpty()) {
        while (!queue.isEmpty()) {
            if (cancellationToken.isCancellationRequested()) break onCancellation;

            const { project, location } = queue.dequeue();

            if (resultsMap.has(project)) continue;
            if (isLocationProjectReferenceRedirect(project, location)) continue;

            // The project could be dirty and could no longer contain the location's file after it's updated,
            // so we need to update the project and check if it still contains the file.
            updateProjectIfDirty(project);
            if (!project.containsFile(toNormalizedPath(location.fileName))) {
                continue;
            }
            const projectResults = searchPosition(project, location);
            resultsMap.set(project, projectResults ?? emptyArray);
            searchedProjectKeys.add(getProjectKey(project));
        }

        // At this point, we know about all projects passed in as arguments and any projects in which
        // `getResultsForPosition` has returned results.  We expand that set to include any projects
        // downstream from any of these and then queue new initial-position searches for any new project
        // containing `initialLocation`.
        if (defaultDefinition) {
            // This seems to mean "load all projects downstream from any member of `seenProjects`".
            projectService.loadAncestorProjectTree(searchedProjectKeys);
            projectService.forEachEnabledProject(project => {
                if (cancellationToken.isCancellationRequested()) return; // There's no mechanism for skipping the remaining projects
                if (resultsMap.has(project)) return; // Can loop forever without this (enqueue here, dequeue above, repeat)
                const location = mapDefinitionInProject(defaultDefinition, project, getGeneratedDefinition, getSourceDefinition);
                if (location) {
                    queue.enqueue({ project, location });
                }
            });
        }
    }

    // In the common case where there's only one project, return a simpler result to make
    // it easier for the caller to skip post-processing.
    if (resultsMap.size === 1) {
        return firstIterator(resultsMap.values());
    }

    return resultsMap;

    function searchPosition(project: Project, location: DocumentPosition): readonly TResult[] | undefined {
        const projectResults = getResultsForPosition(project, location);
        if (!projectResults) return undefined;

        for (const result of projectResults) {
            forPositionInResult(result, position => {
                // This may trigger a search for a tsconfig, but there are several layers of caching that make it inexpensive
                const originalLocation = projectService.getOriginalLocationEnsuringConfiguredProject(project, position);
                if (!originalLocation) return;

                const originalScriptInfo = projectService.getScriptInfo(originalLocation.fileName)!;

                for (const project of originalScriptInfo.containingProjects) {
                    if (!project.isOrphan() && !resultsMap.has(project)) { // Optimization: don't enqueue if will be discarded
                        queue.enqueue({ project, location: originalLocation });
                    }
                }

                const symlinkedProjectsMap = projectService.getSymlinkedProjects(originalScriptInfo);
                if (symlinkedProjectsMap) {
                    symlinkedProjectsMap.forEach((symlinkedProjects, symlinkedPath) => {
                        for (const symlinkedProject of symlinkedProjects) {
                            if (!symlinkedProject.isOrphan() && !resultsMap.has(symlinkedProject)) { // Optimization: don't enqueue if will be discarded
                                queue.enqueue({ project: symlinkedProject, location: { fileName: symlinkedPath as string, pos: originalLocation.pos } });
                            }
                        }
                    });
                }
            });
        }

        return projectResults;
    }
}

function mapDefinitionInProject(
    definition: DocumentPosition,
    project: Project,
    getGeneratedDefinition: () => DocumentPosition | undefined,
    getSourceDefinition: () => DocumentPosition | undefined,
): DocumentPosition | undefined {
    // If the definition is actually from the project, definition is correct as is
    if (
        project.containsFile(toNormalizedPath(definition.fileName)) &&
        !isLocationProjectReferenceRedirect(project, definition)
    ) {
        return definition;
    }
    const generatedDefinition = getGeneratedDefinition();
    if (generatedDefinition && project.containsFile(toNormalizedPath(generatedDefinition.fileName))) return generatedDefinition;
    const sourceDefinition = getSourceDefinition();
    return sourceDefinition && project.containsFile(toNormalizedPath(sourceDefinition.fileName)) ? sourceDefinition : undefined;
}

function isLocationProjectReferenceRedirect(project: Project, location: DocumentPosition | undefined) {
    if (!location) return false;
    const program = project.getLanguageService().getProgram();
    if (!program) return false;
    const sourceFile = program.getSourceFile(location.fileName);

    // It is possible that location is attached to project but
    // the program actually includes its redirect instead.
    // This happens when rootFile in project is one of the file from referenced project
    // Thus root is attached but program doesnt have the actual .ts file but .d.ts
    // If this is not the file we were actually looking, return rest of the toDo
    return !!sourceFile &&
        sourceFile.resolvedPath !== sourceFile.path &&
        sourceFile.resolvedPath !== project.toPath(location.fileName);
}

function getProjectKey(project: Project) {
    return isConfiguredProject(project) ? project.canonicalConfigFilePath : project.getProjectName();
}

function documentSpanLocation({ fileName, textSpan }: DocumentSpan): DocumentPosition {
    return { fileName, pos: textSpan.start };
}

function getMappedLocationForProject(location: DocumentPosition, project: Project): DocumentPosition | undefined {
    return getMappedLocation(location, project.getSourceMapper(), p => project.projectService.fileExists(p as NormalizedPath));
}

function getMappedDocumentSpanForProject(documentSpan: DocumentSpan, project: Project): DocumentSpan | undefined {
    return getMappedDocumentSpan(documentSpan, project.getSourceMapper(), p => project.projectService.fileExists(p as NormalizedPath));
}

function getMappedContextSpanForProject(documentSpan: DocumentSpan, project: Project): TextSpan | undefined {
    return getMappedContextSpan(documentSpan, project.getSourceMapper(), p => project.projectService.fileExists(p as NormalizedPath));
}

const invalidPartialSemanticModeCommands: readonly protocol.CommandTypes[] = [
    protocol.CommandTypes.OpenExternalProject,
    protocol.CommandTypes.OpenExternalProjects,
    protocol.CommandTypes.CloseExternalProject,
    protocol.CommandTypes.SynchronizeProjectList,
    protocol.CommandTypes.EmitOutput,
    protocol.CommandTypes.CompileOnSaveAffectedFileList,
    protocol.CommandTypes.CompileOnSaveEmitFile,
    protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
    protocol.CommandTypes.EncodedSemanticClassificationsFull,
    protocol.CommandTypes.SemanticDiagnosticsSync,
    protocol.CommandTypes.SuggestionDiagnosticsSync,
    protocol.CommandTypes.GeterrForProject,
    protocol.CommandTypes.Reload,
    protocol.CommandTypes.ReloadProjects,
    protocol.CommandTypes.GetCodeFixes,
    protocol.CommandTypes.GetCodeFixesFull,
    protocol.CommandTypes.GetCombinedCodeFix,
    protocol.CommandTypes.GetCombinedCodeFixFull,
    protocol.CommandTypes.ApplyCodeActionCommand,
    protocol.CommandTypes.GetSupportedCodeFixes,
    protocol.CommandTypes.GetApplicableRefactors,
    protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
    protocol.CommandTypes.GetEditsForRefactor,
    protocol.CommandTypes.GetEditsForRefactorFull,
    protocol.CommandTypes.OrganizeImports,
    protocol.CommandTypes.OrganizeImportsFull,
    protocol.CommandTypes.GetEditsForFileRename,
    protocol.CommandTypes.GetEditsForFileRenameFull,
    protocol.CommandTypes.PrepareCallHierarchy,
    protocol.CommandTypes.ProvideCallHierarchyIncomingCalls,
    protocol.CommandTypes.ProvideCallHierarchyOutgoingCalls,
];

const invalidSyntacticModeCommands: readonly protocol.CommandTypes[] = [
    ...invalidPartialSemanticModeCommands,
    protocol.CommandTypes.Definition,
    protocol.CommandTypes.DefinitionFull,
    protocol.CommandTypes.DefinitionAndBoundSpan,
    protocol.CommandTypes.DefinitionAndBoundSpanFull,
    protocol.CommandTypes.TypeDefinition,
    protocol.CommandTypes.Implementation,
    protocol.CommandTypes.ImplementationFull,
    protocol.CommandTypes.References,
    protocol.CommandTypes.ReferencesFull,
    protocol.CommandTypes.Rename,
    protocol.CommandTypes.RenameLocationsFull,
    protocol.CommandTypes.RenameInfoFull,
    protocol.CommandTypes.Quickinfo,
    protocol.CommandTypes.QuickinfoFull,
    protocol.CommandTypes.CompletionInfo,
    protocol.CommandTypes.Completions,
    protocol.CommandTypes.CompletionsFull,
    protocol.CommandTypes.CompletionDetails,
    protocol.CommandTypes.CompletionDetailsFull,
    protocol.CommandTypes.SignatureHelp,
    protocol.CommandTypes.SignatureHelpFull,
    protocol.CommandTypes.Navto,
    protocol.CommandTypes.NavtoFull,
    protocol.CommandTypes.DocumentHighlights,
    protocol.CommandTypes.DocumentHighlightsFull,
];

export interface SessionOptions {
    host: ServerHost;
    cancellationToken: ServerCancellationToken;
    useSingleInferredProject: boolean;
    useInferredProjectPerProjectRoot: boolean;
    typingsInstaller?: ITypingsInstaller;
    byteLength: (buf: string, encoding?: BufferEncoding) => number;
    hrtime: (start?: [number, number]) => [number, number];
    logger: Logger;
    /**
     * If falsy, all events are suppressed.
     */
    canUseEvents: boolean;
    canUseWatchEvents?: boolean;
    eventHandler?: ProjectServiceEventHandler;
    /** Has no effect if eventHandler is also specified. */
    suppressDiagnosticEvents?: boolean;
    serverMode?: LanguageServiceMode;
    throttleWaitMilliseconds?: number;
    noGetErrOnBackgroundUpdate?: boolean;

    globalPlugins?: readonly string[];
    pluginProbeLocations?: readonly string[];
    allowLocalPluginLoads?: boolean;
    typesMapLocation?: string;
    /** @internal */ incrementalVerifier?: (service: ProjectService) => void;
}

export class Session<TMessage = string> implements EventSender {
    private readonly gcTimer: GcTimer;
    protected projectService: ProjectService;
    private changeSeq = 0;

    private performanceData: protocol.PerformanceData | undefined;

    private currentRequestId!: number;
    private errorCheck: MultistepOperation;

    protected host: ServerHost;
    private readonly cancellationToken: ServerCancellationToken;
    protected readonly typingsInstaller: ITypingsInstaller;
    protected byteLength: (buf: string, encoding?: BufferEncoding) => number;
    private hrtime: (start?: [number, number]) => [number, number];
    protected logger: Logger;

    protected canUseEvents: boolean;
    private suppressDiagnosticEvents?: boolean;
    private eventHandler: ProjectServiceEventHandler | undefined;
    private readonly noGetErrOnBackgroundUpdate?: boolean;

    constructor(opts: SessionOptions) {
        this.host = opts.host;
        this.cancellationToken = opts.cancellationToken;
        this.typingsInstaller = opts.typingsInstaller || nullTypingsInstaller;
        this.byteLength = opts.byteLength;
        this.hrtime = opts.hrtime;
        this.logger = opts.logger;
        this.canUseEvents = opts.canUseEvents;
        this.suppressDiagnosticEvents = opts.suppressDiagnosticEvents;
        this.noGetErrOnBackgroundUpdate = opts.noGetErrOnBackgroundUpdate;

        const { throttleWaitMilliseconds } = opts;

        this.eventHandler = this.canUseEvents
            ? opts.eventHandler || (event => this.defaultEventHandler(event))
            : undefined;
        const multistepOperationHost: MultistepOperationHost = {
            executeWithRequestId: (requestId, action) => this.executeWithRequestId(requestId, action),
            getCurrentRequestId: () => this.currentRequestId,
            getServerHost: () => this.host,
            logError: (err, cmd) => this.logError(err, cmd),
            sendRequestCompletedEvent: requestId => this.sendRequestCompletedEvent(requestId),
            isCancellationRequested: () => this.cancellationToken.isCancellationRequested(),
        };
        this.errorCheck = new MultistepOperation(multistepOperationHost);
        const settings: ProjectServiceOptions = {
            host: this.host,
            logger: this.logger,
            cancellationToken: this.cancellationToken,
            useSingleInferredProject: opts.useSingleInferredProject,
            useInferredProjectPerProjectRoot: opts.useInferredProjectPerProjectRoot,
            typingsInstaller: this.typingsInstaller,
            throttleWaitMilliseconds,
            eventHandler: this.eventHandler,
            suppressDiagnosticEvents: this.suppressDiagnosticEvents,
            globalPlugins: opts.globalPlugins,
            pluginProbeLocations: opts.pluginProbeLocations,
            allowLocalPluginLoads: opts.allowLocalPluginLoads,
            typesMapLocation: opts.typesMapLocation,
            serverMode: opts.serverMode,
            session: this,
            canUseWatchEvents: opts.canUseWatchEvents,
            incrementalVerifier: opts.incrementalVerifier,
        };
        this.projectService = new ProjectService(settings);
        this.projectService.setPerformanceEventHandler(this.performanceEventHandler.bind(this));
        this.gcTimer = new GcTimer(this.host, /*delay*/ 7000, this.logger);

        // Make sure to setup handlers to throw error for not allowed commands on syntax server
        switch (this.projectService.serverMode) {
            case LanguageServiceMode.Semantic:
                break;
            case LanguageServiceMode.PartialSemantic:
                invalidPartialSemanticModeCommands.forEach(commandName =>
                    this.handlers.set(commandName, request => {
                        throw new Error(`Request: ${request.command} not allowed in LanguageServiceMode.PartialSemantic`);
                    })
                );
                break;
            case LanguageServiceMode.Syntactic:
                invalidSyntacticModeCommands.forEach(commandName =>
                    this.handlers.set(commandName, request => {
                        throw new Error(`Request: ${request.command} not allowed in LanguageServiceMode.Syntactic`);
                    })
                );
                break;
            default:
                Debug.assertNever(this.projectService.serverMode);
        }
    }

    private sendRequestCompletedEvent(requestId: number): void {
        this.event<protocol.RequestCompletedEventBody>({ request_seq: requestId }, "requestCompleted");
    }

    private addPerformanceData(key: keyof protocol.PerformanceData, value: number) {
        if (!this.performanceData) {
            this.performanceData = {};
        }
        this.performanceData[key] = (this.performanceData[key] ?? 0) + value;
    }

    private performanceEventHandler(event: PerformanceEvent) {
        switch (event.kind) {
            case "UpdateGraph":
                this.addPerformanceData("updateGraphDurationMs", event.durationMs);
                break;
            case "CreatePackageJsonAutoImportProvider":
                this.addPerformanceData("createAutoImportProviderProgramDurationMs", event.durationMs);
                break;
        }
    }

    private defaultEventHandler(event: ProjectServiceEvent) {
        switch (event.eventName) {
            case ProjectsUpdatedInBackgroundEvent:
                this.projectsUpdatedInBackgroundEvent(event.data.openFiles);
                break;
            case ProjectLoadingStartEvent:
                this.event<protocol.ProjectLoadingStartEventBody>({
                    projectName: event.data.project.getProjectName(),
                    reason: event.data.reason,
                }, event.eventName);
                break;
            case ProjectLoadingFinishEvent:
                this.event<protocol.ProjectLoadingFinishEventBody>({
                    projectName: event.data.project.getProjectName(),
                }, event.eventName);
                break;
            case LargeFileReferencedEvent:
            case CreateFileWatcherEvent:
            case CreateDirectoryWatcherEvent:
            case CloseFileWatcherEvent:
                this.event(event.data, event.eventName);
                break;
            case ConfigFileDiagEvent:
                this.event<protocol.ConfigFileDiagnosticEventBody>({
                    triggerFile: event.data.triggerFile,
                    configFile: event.data.configFileName,
                    diagnostics: map(event.data.diagnostics, diagnostic => formatDiagnosticToProtocol(diagnostic, /*includeFileName*/ true)),
                }, event.eventName);
                break;
            case ProjectLanguageServiceStateEvent: {
                this.event<protocol.ProjectLanguageServiceStateEventBody>({
                    projectName: event.data.project.getProjectName(),
                    languageServiceEnabled: event.data.languageServiceEnabled,
                }, event.eventName);
                break;
            }
            case ProjectInfoTelemetryEvent: {
                const eventName: protocol.TelemetryEventName = "telemetry";
                this.event<protocol.TelemetryEventBody>({
                    telemetryEventName: event.eventName,
                    payload: event.data,
                }, eventName);
                break;
            }
        }
    }

    private projectsUpdatedInBackgroundEvent(openFiles: string[]): void {
        this.projectService.logger.info(`got projects updated in background ${openFiles}`);
        if (openFiles.length) {
            if (!this.suppressDiagnosticEvents && !this.noGetErrOnBackgroundUpdate) {
                this.projectService.logger.info(`Queueing diagnostics update for ${openFiles}`);
                // For now only queue error checking for open files. We can change this to include non open files as well
                this.errorCheck.startNew(next => this.updateErrorCheck(next, openFiles, 100, /*requireOpen*/ true));
            }

            // Send project changed event
            this.event<protocol.ProjectsUpdatedInBackgroundEventBody>({
                openFiles,
            }, ProjectsUpdatedInBackgroundEvent);
        }
    }

    public logError(err: Error, cmd: string): void {
        this.logErrorWorker(err, cmd);
    }

    private logErrorWorker(err: Error & PossibleProgramFileInfo, cmd: string, fileRequest?: protocol.FileRequestArgs): void {
        let msg = "Exception on executing command " + cmd;
        if (err.message) {
            msg += ":\n" + indent(err.message);
            if ((err as StackTraceError).stack) {
                msg += "\n" + indent((err as StackTraceError).stack!);
            }
        }

        if (this.logger.hasLevel(LogLevel.verbose)) {
            if (fileRequest) {
                try {
                    const { file, project } = this.getFileAndProject(fileRequest);
                    const scriptInfo = project.getScriptInfoForNormalizedPath(file);
                    if (scriptInfo) {
                        const text = getSnapshotText(scriptInfo.getSnapshot());
                        msg += `\n\nFile text of ${fileRequest.file}:${indent(text)}\n`;
                    }
                }
                catch {} // eslint-disable-line no-empty
            }

            if (err.ProgramFiles) {
                msg += `\n\nProgram files: ${JSON.stringify(err.ProgramFiles)}\n`;
                msg += `\n\nProjects::\n`;
                let counter = 0;
                const addProjectInfo = (project: Project) => {
                    msg += `\nProject '${project.projectName}' (${ProjectKind[project.projectKind]}) ${counter}\n`;
                    msg += project.filesToString(/*writeProjectFileNames*/ true);
                    msg += "\n-----------------------------------------------\n";
                    counter++;
                };
                this.projectService.externalProjects.forEach(addProjectInfo);
                this.projectService.configuredProjects.forEach(addProjectInfo);
                this.projectService.inferredProjects.forEach(addProjectInfo);
            }
        }

        this.logger.msg(msg, Msg.Err);
    }

    public send(msg: protocol.Message) {
        if (msg.type === "event" && !this.canUseEvents) {
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`Session does not support events: ignored event: ${stringifyIndented(msg)}`);
            }
            return;
        }
        this.writeMessage(msg);
    }

    protected writeMessage(msg: protocol.Message) {
        const msgText = formatMessage(msg, this.logger, this.byteLength, this.host.newLine);
        perfLogger?.logEvent(`Response message size: ${msgText.length}`);
        this.host.write(msgText);
    }

    public event<T extends object>(body: T, eventName: string): void {
        this.send(toEvent(eventName, body));
    }

    /** @internal */
    doOutput(info: {} | undefined, cmdName: string, reqSeq: number, success: boolean, message?: string): void {
        const res: protocol.Response = {
            seq: 0,
            type: "response",
            command: cmdName,
            request_seq: reqSeq,
            success,
            performanceData: this.performanceData,
        };

        if (success) {
            let metadata: unknown;
            if (isArray(info)) {
                res.body = info;
                metadata = (info as WithMetadata<readonly any[]>).metadata;
                delete (info as WithMetadata<readonly any[]>).metadata;
            }
            else if (typeof info === "object") {
                if ((info as WithMetadata<{}>).metadata) {
                    const { metadata: infoMetadata, ...body } = info as WithMetadata<{}>;
                    res.body = body;
                    metadata = infoMetadata;
                }
                else {
                    res.body = info;
                }
            }
            else {
                res.body = info;
            }
            if (metadata) res.metadata = metadata;
        }
        else {
            Debug.assert(info === undefined);
        }
        if (message) {
            res.message = message;
        }
        this.send(res);
    }

    private semanticCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "semanticCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        const diags = isDeclarationFileInJSOnlyNonConfiguredProject(project, file)
            ? emptyArray
            : project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file);
        this.sendDiagnosticsEvent(file, project, diags, "semanticDiag");
        tracing?.pop();
    }

    private syntacticCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "syntacticCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        this.sendDiagnosticsEvent(file, project, project.getLanguageService().getSyntacticDiagnostics(file), "syntaxDiag");
        tracing?.pop();
    }

    private suggestionCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "suggestionCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        this.sendDiagnosticsEvent(file, project, project.getLanguageService().getSuggestionDiagnostics(file), "suggestionDiag");
        tracing?.pop();
    }

    private sendDiagnosticsEvent(file: NormalizedPath, project: Project, diagnostics: readonly Diagnostic[], kind: protocol.DiagnosticEventKind): void {
        try {
            this.event<protocol.DiagnosticEventBody>({ file, diagnostics: diagnostics.map(diag => formatDiag(file, project, diag)) }, kind);
        }
        catch (err) {
            this.logError(err, kind);
        }
    }

    /** It is the caller's responsibility to verify that `!this.suppressDiagnosticEvents`. */
    private updateErrorCheck(next: NextStep, checkList: readonly string[] | readonly PendingErrorCheck[], ms: number, requireOpen = true) {
        Debug.assert(!this.suppressDiagnosticEvents); // Caller's responsibility

        const seq = this.changeSeq;
        const followMs = Math.min(ms, 200);

        let index = 0;
        const goNext = () => {
            index++;
            if (checkList.length > index) {
                next.delay("checkOne", followMs, checkOne);
            }
        };
        const checkOne = () => {
            if (this.changeSeq !== seq) {
                return;
            }

            let item: string | PendingErrorCheck | undefined = checkList[index];
            if (isString(item)) {
                // Find out project for the file name
                item = this.toPendingErrorCheck(item);
                if (!item) {
                    // Ignore file if there is no project for the file
                    goNext();
                    return;
                }
            }

            const { fileName, project } = item;

            // Ensure the project is up to date before checking if this file is present in the project.
            updateProjectIfDirty(project);
            if (!project.containsFile(fileName, requireOpen)) {
                return;
            }

            this.syntacticCheck(fileName, project);
            if (this.changeSeq !== seq) {
                return;
            }

            // Don't provide semantic diagnostics unless we're in full semantic mode.
            if (project.projectService.serverMode !== LanguageServiceMode.Semantic) {
                goNext();
                return;
            }
            next.immediate("semanticCheck", () => {
                this.semanticCheck(fileName, project);
                if (this.changeSeq !== seq) {
                    return;
                }

                if (this.getPreferences(fileName).disableSuggestions) {
                    goNext();
                    return;
                }
                next.immediate("suggestionCheck", () => {
                    this.suggestionCheck(fileName, project);
                    goNext();
                });
            });
        };

        if (checkList.length > index && this.changeSeq === seq) {
            next.delay("checkOne", ms, checkOne);
        }
    }

    private cleanProjects(caption: string, projects: Project[]) {
        if (!projects) {
            return;
        }
        this.logger.info(`cleaning ${caption}`);
        for (const p of projects) {
            p.getLanguageService(/*ensureSynchronized*/ false).cleanupSemanticCache();
            p.cleanupProgram();
        }
    }

    private cleanup() {
        this.cleanProjects("inferred projects", this.projectService.inferredProjects);
        this.cleanProjects("configured projects", arrayFrom(this.projectService.configuredProjects.values()));
        this.cleanProjects("external projects", this.projectService.externalProjects);
        if (this.host.gc) {
            this.logger.info(`host.gc()`);
            this.host.gc();
        }
    }

    private getEncodedSyntacticClassifications(args: protocol.EncodedSyntacticClassificationsRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        return languageService.getEncodedSyntacticClassifications(file, args);
    }

    private getEncodedSemanticClassifications(args: protocol.EncodedSemanticClassificationsRequestArgs) {
        const { file, project } = this.getFileAndProject(args);
        const format = args.format === "2020" ? SemanticClassificationFormat.TwentyTwenty : SemanticClassificationFormat.Original;
        return project.getLanguageService().getEncodedSemanticClassifications(file, args, format);
    }

    private getProject(projectFileName: string | undefined): Project | undefined {
        return projectFileName === undefined ? undefined : this.projectService.findProject(projectFileName);
    }

    private getConfigFileAndProject(args: protocol.FileRequestArgs): { configFile: NormalizedPath | undefined; project: Project | undefined; } {
        const project = this.getProject(args.projectFileName);
        const file = toNormalizedPath(args.file);

        return {
            configFile: project && project.hasConfigFile(file) ? file : undefined,
            project,
        };
    }

    private getConfigFileDiagnostics(configFile: NormalizedPath, project: Project, includeLinePosition: boolean) {
        const projectErrors = project.getAllProjectErrors();
        const optionsErrors = project.getLanguageService().getCompilerOptionsDiagnostics();
        const diagnosticsForConfigFile = filter(
            concatenate(projectErrors, optionsErrors),
            diagnostic => !!diagnostic.file && diagnostic.file.fileName === configFile,
        );
        return includeLinePosition ?
            this.convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnosticsForConfigFile) :
            map(
                diagnosticsForConfigFile,
                diagnostic => formatDiagnosticToProtocol(diagnostic, /*includeFileName*/ false),
            );
    }

    private convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnostics: readonly Diagnostic[]): protocol.DiagnosticWithLinePosition[] {
        return diagnostics.map<protocol.DiagnosticWithLinePosition>(d => ({
            message: flattenDiagnosticMessageText(d.messageText, this.host.newLine),
            start: d.start!, // TODO: GH#18217
            length: d.length!, // TODO: GH#18217
            category: diagnosticCategoryName(d),
            code: d.code,
            source: d.source,
            startLocation: (d.file && convertToLocation(getLineAndCharacterOfPosition(d.file, d.start!)))!, // TODO: GH#18217
            endLocation: (d.file && convertToLocation(getLineAndCharacterOfPosition(d.file, d.start! + d.length!)))!, // TODO: GH#18217
            reportsUnnecessary: d.reportsUnnecessary,
            reportsDeprecated: d.reportsDeprecated,
            relatedInformation: map(d.relatedInformation, formatRelatedInformation),
        }));
    }

    private getCompilerOptionsDiagnostics(args: protocol.CompilerOptionsDiagnosticsRequestArgs) {
        const project = this.getProject(args.projectFileName)!;
        // Get diagnostics that dont have associated file with them
        // The diagnostics which have file would be in config file and
        // would be reported as part of configFileDiagnostics
        return this.convertToDiagnosticsWithLinePosition(
            filter(
                project.getLanguageService().getCompilerOptionsDiagnostics(),
                diagnostic => !diagnostic.file,
            ),
            /*scriptInfo*/ undefined,
        );
    }

    private convertToDiagnosticsWithLinePosition(diagnostics: readonly Diagnostic[], scriptInfo: ScriptInfo | undefined): protocol.DiagnosticWithLinePosition[] {
        return diagnostics.map(d =>
            ({
                message: flattenDiagnosticMessageText(d.messageText, this.host.newLine),
                start: d.start,
                length: d.length,
                category: diagnosticCategoryName(d),
                code: d.code,
                source: d.source,
                startLocation: scriptInfo && scriptInfo.positionToLineOffset(d.start!), // TODO: GH#18217
                endLocation: scriptInfo && scriptInfo.positionToLineOffset(d.start! + d.length!),
                reportsUnnecessary: d.reportsUnnecessary,
                reportsDeprecated: d.reportsDeprecated,
                relatedInformation: map(d.relatedInformation, formatRelatedInformation),
            }) as protocol.DiagnosticWithLinePosition
        );
    }

    private getDiagnosticsWorker(
        args: protocol.FileRequestArgs,
        isSemantic: boolean,
        selector: (project: Project, file: string) => readonly Diagnostic[],
        includeLinePosition: boolean,
    ): readonly protocol.DiagnosticWithLinePosition[] | readonly protocol.Diagnostic[] {
        const { project, file } = this.getFileAndProject(args);
        if (isSemantic && isDeclarationFileInJSOnlyNonConfiguredProject(project, file)) {
            return emptyArray;
        }
        const scriptInfo = project.getScriptInfoForNormalizedPath(file);
        const diagnostics = selector(project, file);
        return includeLinePosition
            ? this.convertToDiagnosticsWithLinePosition(diagnostics, scriptInfo)
            : diagnostics.map(d => formatDiag(file, project, d));
    }

    private getDefinition(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): readonly protocol.FileSpanWithContext[] | readonly DefinitionInfo[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const definitions = this.mapDefinitionInfoLocations(project.getLanguageService().getDefinitionAtPosition(file, position) || emptyArray, project);
        return simplifiedResult ? this.mapDefinitionInfo(definitions, project) : definitions.map(Session.mapToOriginalLocation);
    }

    private mapDefinitionInfoLocations(definitions: readonly DefinitionInfo[], project: Project): readonly DefinitionInfo[] {
        return definitions.map((info): DefinitionInfo => {
            const newDocumentSpan = getMappedDocumentSpanForProject(info, project);
            return !newDocumentSpan ? info : {
                ...newDocumentSpan,
                containerKind: info.containerKind,
                containerName: info.containerName,
                kind: info.kind,
                name: info.name,
                failedAliasResolution: info.failedAliasResolution,
                ...info.unverified && { unverified: info.unverified },
            };
        });
    }

    private getDefinitionAndBoundSpan(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.DefinitionInfoAndBoundSpan | DefinitionInfoAndBoundSpan {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const scriptInfo = Debug.checkDefined(project.getScriptInfo(file));

        const unmappedDefinitionAndBoundSpan = project.getLanguageService().getDefinitionAndBoundSpan(file, position);

        if (!unmappedDefinitionAndBoundSpan || !unmappedDefinitionAndBoundSpan.definitions) {
            return {
                definitions: emptyArray,
                textSpan: undefined!, // TODO: GH#18217
            };
        }

        const definitions = this.mapDefinitionInfoLocations(unmappedDefinitionAndBoundSpan.definitions, project);
        const { textSpan } = unmappedDefinitionAndBoundSpan;

        if (simplifiedResult) {
            return {
                definitions: this.mapDefinitionInfo(definitions, project),
                textSpan: toProtocolTextSpan(textSpan, scriptInfo),
            };
        }

        return {
            definitions: definitions.map(Session.mapToOriginalLocation),
            textSpan,
        };
    }

    private findSourceDefinition(args: protocol.FileLocationRequestArgs): readonly protocol.DefinitionInfo[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const unmappedDefinitions = project.getLanguageService().getDefinitionAtPosition(file, position);
        let definitions: readonly DefinitionInfo[] = this.mapDefinitionInfoLocations(unmappedDefinitions || emptyArray, project).slice();
        const needsJsResolution = this.projectService.serverMode === LanguageServiceMode.Semantic && (
            !some(definitions, d => toNormalizedPath(d.fileName) !== file && !d.isAmbient) ||
            some(definitions, d => !!d.failedAliasResolution)
        );

        if (needsJsResolution) {
            const definitionSet = createSet<DefinitionInfo>(
                d => d.textSpan.start,
                getDocumentSpansEqualityComparer(this.host.useCaseSensitiveFileNames),
            );
            definitions?.forEach(d => definitionSet.add(d));
            const noDtsProject = project.getNoDtsResolutionProject(file);
            const ls = noDtsProject.getLanguageService();
            const jsDefinitions = ls.getDefinitionAtPosition(file, position, /*searchOtherFilesOnly*/ true, /*stopAtAlias*/ false)
                ?.filter(d => toNormalizedPath(d.fileName) !== file);
            if (some(jsDefinitions)) {
                for (const jsDefinition of jsDefinitions) {
                    if (jsDefinition.unverified) {
                        const refined = tryRefineDefinition(jsDefinition, project.getLanguageService().getProgram()!, ls.getProgram()!);
                        if (some(refined)) {
                            for (const def of refined) {
                                definitionSet.add(def);
                            }
                            continue;
                        }
                    }
                    definitionSet.add(jsDefinition);
                }
            }
            else {
                const ambientCandidates = definitions.filter(d => toNormalizedPath(d.fileName) !== file && d.isAmbient);
                for (const candidate of some(ambientCandidates) ? ambientCandidates : getAmbientCandidatesByClimbingAccessChain()) {
                    const fileNameToSearch = findImplementationFileFromDtsFileName(candidate.fileName, file, noDtsProject);
                    if (!fileNameToSearch) continue;
                    const info = this.projectService.getOrCreateScriptInfoNotOpenedByClient(
                        fileNameToSearch,
                        noDtsProject.currentDirectory,
                        noDtsProject.directoryStructureHost,
                    );
                    if (!info) continue;
                    if (!noDtsProject.containsScriptInfo(info)) {
                        noDtsProject.addRoot(info);
                        noDtsProject.updateGraph();
                    }
                    const noDtsProgram = ls.getProgram()!;
                    const fileToSearch = Debug.checkDefined(noDtsProgram.getSourceFile(fileNameToSearch));
                    for (const match of searchForDeclaration(candidate.name, fileToSearch, noDtsProgram)) {
                        definitionSet.add(match);
                    }
                }
            }
            definitions = arrayFrom(definitionSet.values());
        }

        definitions = definitions.filter(d => !d.isAmbient && !d.failedAliasResolution);
        return this.mapDefinitionInfo(definitions, project);

        function findImplementationFileFromDtsFileName(fileName: string, resolveFromFile: string, auxiliaryProject: AuxiliaryProject) {
            const nodeModulesPathParts = getNodeModulePathParts(fileName);
            if (nodeModulesPathParts && fileName.lastIndexOf(nodeModulesPathPart) === nodeModulesPathParts.topLevelNodeModulesIndex) {
                // Second check ensures the fileName only contains one `/node_modules/`. If there's more than one I give up.
                const packageDirectory = fileName.substring(0, nodeModulesPathParts.packageRootIndex);
                const packageJsonCache = project.getModuleResolutionCache()?.getPackageJsonInfoCache();
                const compilerOptions = project.getCompilationSettings();
                const packageJson = getPackageScopeForPath(getNormalizedAbsolutePath(packageDirectory + "/package.json", project.getCurrentDirectory()), getTemporaryModuleResolutionState(packageJsonCache, project, compilerOptions));
                if (!packageJson) return undefined;
                // Use fake options instead of actual compiler options to avoid following export map if the project uses node16 or nodenext -
                // Mapping from an export map entry across packages is out of scope for now. Returned entrypoints will only be what can be
                // resolved from the package root under --moduleResolution node
                const entrypoints = getEntrypointsFromPackageJsonInfo(
                    packageJson,
                    { moduleResolution: ModuleResolutionKind.Node10 },
                    project,
                    project.getModuleResolutionCache(),
                );
                // This substring is correct only because we checked for a single `/node_modules/` at the top.
                const packageNamePathPart = fileName.substring(
                    nodeModulesPathParts.topLevelPackageNameIndex + 1,
                    nodeModulesPathParts.packageRootIndex,
                );
                const packageName = getPackageNameFromTypesPackageName(unmangleScopedPackageName(packageNamePathPart));
                const path = project.toPath(fileName);
                if (entrypoints && some(entrypoints, e => project.toPath(e) === path)) {
                    // This file was the main entrypoint of a package. Try to resolve that same package name with
                    // the auxiliary project that only resolves to implementation files.
                    return auxiliaryProject.resolutionCache.resolveSingleModuleNameWithoutWatching(packageName, resolveFromFile).resolvedModule?.resolvedFileName;
                }
                else {
                    // It wasn't the main entrypoint but we are in node_modules. Try a subpath into the package.
                    const pathToFileInPackage = fileName.substring(nodeModulesPathParts.packageRootIndex + 1);
                    const specifier = `${packageName}/${removeFileExtension(pathToFileInPackage)}`;
                    return auxiliaryProject.resolutionCache.resolveSingleModuleNameWithoutWatching(specifier, resolveFromFile).resolvedModule?.resolvedFileName;
                }
            }
            // We're not in node_modules, and we only get to this function if non-dts module resolution failed.
            // I'm not sure what else I can do here that isn't already covered by that module resolution.
            return undefined;
        }

        // In 'foo.bar./**/baz', if we got not results on 'baz', see if we can get an ambient definition
        // for 'bar' or 'foo' (in that order) so we can search for declarations of 'baz' later.
        function getAmbientCandidatesByClimbingAccessChain(): readonly { name: string; fileName: string; }[] {
            const ls = project.getLanguageService();
            const program = ls.getProgram()!;
            const initialNode = getTouchingPropertyName(program.getSourceFile(file)!, position);
            if ((isStringLiteralLike(initialNode) || isIdentifier(initialNode)) && isAccessExpression(initialNode.parent)) {
                return forEachNameInAccessChainWalkingLeft(initialNode, nameInChain => {
                    if (nameInChain === initialNode) return undefined;
                    const candidates = ls.getDefinitionAtPosition(file, nameInChain.getStart(), /*searchOtherFilesOnly*/ true, /*stopAtAlias*/ false)
                        ?.filter(d => toNormalizedPath(d.fileName) !== file && d.isAmbient)
                        .map(d => ({
                            fileName: d.fileName,
                            name: getTextOfIdentifierOrLiteral(initialNode),
                        }));
                    if (some(candidates)) {
                        return candidates;
                    }
                }) || emptyArray;
            }
            return emptyArray;
        }

        function tryRefineDefinition(definition: DefinitionInfo, program: Program, noDtsProgram: Program) {
            const fileToSearch = noDtsProgram.getSourceFile(definition.fileName);
            if (!fileToSearch) {
                return undefined;
            }
            const initialNode = getTouchingPropertyName(program.getSourceFile(file)!, position);
            const symbol = program.getTypeChecker().getSymbolAtLocation(initialNode);
            const importSpecifier = symbol && getDeclarationOfKind<ImportSpecifier>(symbol, SyntaxKind.ImportSpecifier);
            if (!importSpecifier) return undefined;

            const nameToSearch = importSpecifier.propertyName?.text || importSpecifier.name.text;
            return searchForDeclaration(nameToSearch, fileToSearch, noDtsProgram);
        }

        function searchForDeclaration(declarationName: string, fileToSearch: SourceFile, noDtsProgram: Program) {
            const matches = FindAllReferences.Core.getTopMostDeclarationNamesInFile(declarationName, fileToSearch);
            return mapDefined(matches, match => {
                const symbol = noDtsProgram.getTypeChecker().getSymbolAtLocation(match);
                const decl = getDeclarationFromName(match);
                if (symbol && decl) {
                    // I think the last argument to this is supposed to be the start node, but it doesn't seem important.
                    // Callers internal to GoToDefinition already get confused about this.
                    return GoToDefinition.createDefinitionInfo(decl, noDtsProgram.getTypeChecker(), symbol, decl, /*unverified*/ true);
                }
            });
        }
    }

    private getEmitOutput(args: protocol.EmitOutputRequestArgs): EmitOutput | protocol.EmitOutput {
        const { file, project } = this.getFileAndProject(args);
        if (!project.shouldEmitFile(project.getScriptInfo(file))) {
            return { emitSkipped: true, outputFiles: [], diagnostics: [] };
        }
        const result = project.getLanguageService().getEmitOutput(file);
        return args.richResponse ?
            {
                ...result,
                diagnostics: args.includeLinePosition ?
                    this.convertToDiagnosticsWithLinePositionFromDiagnosticFile(result.diagnostics) :
                    result.diagnostics.map(d => formatDiagnosticToProtocol(d, /*includeFileName*/ true)),
            } :
            result;
    }

    private mapJSDocTagInfo(tags: JSDocTagInfo[] | undefined, project: Project, richResponse: boolean): protocol.JSDocTagInfo[] {
        return tags ? tags.map(tag => ({
            ...tag,
            text: richResponse ? this.mapDisplayParts(tag.text, project) : tag.text?.map(part => part.text).join(""),
        })) : [];
    }

    private mapDisplayParts(parts: SymbolDisplayPart[] | undefined, project: Project): protocol.SymbolDisplayPart[] {
        if (!parts) {
            return [];
        }
        return parts.map(part =>
            part.kind !== "linkName" ? part : {
                ...part,
                target: this.toFileSpan((part as JSDocLinkDisplayPart).target.fileName, (part as JSDocLinkDisplayPart).target.textSpan, project),
            }
        );
    }

    private mapSignatureHelpItems(items: SignatureHelpItem[], project: Project, richResponse: boolean): protocol.SignatureHelpItem[] {
        return items.map(item => ({
            ...item,
            documentation: this.mapDisplayParts(item.documentation, project),
            parameters: item.parameters.map(p => ({ ...p, documentation: this.mapDisplayParts(p.documentation, project) })),
            tags: this.mapJSDocTagInfo(item.tags, project, richResponse),
        }));
    }

    private mapDefinitionInfo(definitions: readonly DefinitionInfo[], project: Project): readonly protocol.DefinitionInfo[] {
        return definitions.map(def => ({ ...this.toFileSpanWithContext(def.fileName, def.textSpan, def.contextSpan, project), ...def.unverified && { unverified: def.unverified } }));
    }

    /*
     * When we map a .d.ts location to .ts, Visual Studio gets confused because there's no associated Roslyn Document in
     * the same project which corresponds to the file. VS Code has no problem with this, and luckily we have two protocols.
     * This retains the existing behavior for the "simplified" (VS Code) protocol but stores the .d.ts location in a
     * set of additional fields, and does the reverse for VS (store the .d.ts location where
     * it used to be and stores the .ts location in the additional fields).
     */
    private static mapToOriginalLocation<T extends DocumentSpan>(def: T): T {
        if (def.originalFileName) {
            Debug.assert(def.originalTextSpan !== undefined, "originalTextSpan should be present if originalFileName is");
            return {
                ...def as any,
                fileName: def.originalFileName,
                textSpan: def.originalTextSpan,
                targetFileName: def.fileName,
                targetTextSpan: def.textSpan,
                contextSpan: def.originalContextSpan,
                targetContextSpan: def.contextSpan,
            };
        }
        return def;
    }

    private toFileSpan(fileName: string, textSpan: TextSpan, project: Project): protocol.FileSpan {
        const ls = project.getLanguageService();
        const start = ls.toLineColumnOffset!(fileName, textSpan.start); // TODO: GH#18217
        const end = ls.toLineColumnOffset!(fileName, textSpanEnd(textSpan));

        return {
            file: fileName,
            start: { line: start.line + 1, offset: start.character + 1 },
            end: { line: end.line + 1, offset: end.character + 1 },
        };
    }

    private toFileSpanWithContext(fileName: string, textSpan: TextSpan, contextSpan: TextSpan | undefined, project: Project): protocol.FileSpanWithContext {
        const fileSpan = this.toFileSpan(fileName, textSpan, project);
        const context = contextSpan && this.toFileSpan(fileName, contextSpan, project);
        return context ?
            { ...fileSpan, contextStart: context.start, contextEnd: context.end } :
            fileSpan;
    }

    private getTypeDefinition(args: protocol.FileLocationRequestArgs): readonly protocol.FileSpanWithContext[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);

        const definitions = this.mapDefinitionInfoLocations(project.getLanguageService().getTypeDefinitionAtPosition(file, position) || emptyArray, project);
        return this.mapDefinitionInfo(definitions, project);
    }

    private mapImplementationLocations(implementations: readonly ImplementationLocation[], project: Project): readonly ImplementationLocation[] {
        return implementations.map((info): ImplementationLocation => {
            const newDocumentSpan = getMappedDocumentSpanForProject(info, project);
            return !newDocumentSpan ? info : {
                ...newDocumentSpan,
                kind: info.kind,
                displayParts: info.displayParts,
            };
        });
    }

    private getImplementation(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): readonly protocol.FileSpanWithContext[] | readonly ImplementationLocation[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const implementations = this.mapImplementationLocations(project.getLanguageService().getImplementationAtPosition(file, position) || emptyArray, project);
        return simplifiedResult ?
            implementations.map(({ fileName, textSpan, contextSpan }) => this.toFileSpanWithContext(fileName, textSpan, contextSpan, project)) :
            implementations.map(Session.mapToOriginalLocation);
    }

    private getSyntacticDiagnosticsSync(args: protocol.SyntacticDiagnosticsSyncRequestArgs) {
        const { configFile } = this.getConfigFileAndProject(args);
        if (configFile) {
            // all the config file errors are reported as part of semantic check so nothing to report here
            return emptyArray;
        }

        return this.getDiagnosticsWorker(args, /*isSemantic*/ false, (project, file) => project.getLanguageService().getSyntacticDiagnostics(file), !!args.includeLinePosition);
    }

    private getSemanticDiagnosticsSync(args: protocol.SemanticDiagnosticsSyncRequestArgs) {
        const { configFile, project } = this.getConfigFileAndProject(args);
        if (configFile) {
            return this.getConfigFileDiagnostics(configFile, project!, !!args.includeLinePosition); // TODO: GH#18217
        }
        return this.getDiagnosticsWorker(args, /*isSemantic*/ true, (project, file) => project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file), !!args.includeLinePosition);
    }

    private getSuggestionDiagnosticsSync(args: protocol.SuggestionDiagnosticsSyncRequestArgs) {
        const { configFile } = this.getConfigFileAndProject(args);
        if (configFile) {
            // Currently there are no info diagnostics for config files.
            return emptyArray;
        }
        // isSemantic because we don't want to info diagnostics in declaration files for JS-only users
        return this.getDiagnosticsWorker(args, /*isSemantic*/ true, (project, file) => project.getLanguageService().getSuggestionDiagnostics(file), !!args.includeLinePosition);
    }

    private getJsxClosingTag(args: protocol.JsxClosingTagRequestArgs): TextInsertion | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        const tag = languageService.getJsxClosingTagAtPosition(file, position);
        return tag === undefined ? undefined : { newText: tag.newText, caretOffset: 0 };
    }

    private getLinkedEditingRange(args: protocol.FileLocationRequestArgs): protocol.LinkedEditingRangesBody | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        const linkedEditInfo = languageService.getLinkedEditingRangeAtPosition(file, position);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file);
        if (scriptInfo === undefined || linkedEditInfo === undefined) return undefined;
        return convertLinkedEditInfoToRanges(linkedEditInfo, scriptInfo);
    }

    private getDocumentHighlights(args: protocol.DocumentHighlightsRequestArgs, simplifiedResult: boolean): readonly protocol.DocumentHighlightsItem[] | readonly DocumentHighlights[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const documentHighlights = project.getLanguageService().getDocumentHighlights(file, position, args.filesToSearch);

        if (!documentHighlights) return emptyArray;
        if (!simplifiedResult) return documentHighlights;

        return documentHighlights.map<protocol.DocumentHighlightsItem>(({ fileName, highlightSpans }) => {
            const scriptInfo = project.getScriptInfo(fileName)!;
            return {
                file: fileName,
                highlightSpans: highlightSpans.map(({ textSpan, kind, contextSpan }) => ({
                    ...toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo),
                    kind,
                })),
            };
        });
    }

    private provideInlayHints(args: protocol.InlayHintsRequestArgs): readonly protocol.InlayHintItem[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const hints = project.getLanguageService().provideInlayHints(file, args, this.getPreferences(file));

        return hints.map(hint => {
            const { position, displayParts } = hint;

            return {
                ...hint,
                position: scriptInfo.positionToLineOffset(position),
                displayParts: displayParts?.map(({ text, span, file }) => {
                    if (span) {
                        Debug.assertIsDefined(file, "Target file should be defined together with its span.");
                        const scriptInfo = this.projectService.getScriptInfo(file)!;

                        return {
                            text,
                            span: {
                                start: scriptInfo.positionToLineOffset(span.start),
                                end: scriptInfo.positionToLineOffset(span.start + span.length),
                                file,
                            },
                        };
                    }
                    else {
                        return { text };
                    }
                }),
            };
        });
    }

    private setCompilerOptionsForInferredProjects(args: protocol.SetCompilerOptionsForInferredProjectsArgs): void {
        this.projectService.setCompilerOptionsForInferredProjects(args.options, args.projectRootPath);
    }

    private getProjectInfo(args: protocol.ProjectInfoRequestArgs): protocol.ProjectInfo {
        return this.getProjectInfoWorker(args.file, args.projectFileName, args.needFileNameList, /*excludeConfigFiles*/ false);
    }

    private getProjectInfoWorker(uncheckedFileName: string, projectFileName: string | undefined, needFileNameList: boolean, excludeConfigFiles: boolean) {
        const { project } = this.getFileAndProjectWorker(uncheckedFileName, projectFileName);
        updateProjectIfDirty(project);
        const projectInfo = {
            configFileName: project.getProjectName(),
            languageServiceDisabled: !project.languageServiceEnabled,
            fileNames: needFileNameList ? project.getFileNames(/*excludeFilesFromExternalLibraries*/ false, excludeConfigFiles) : undefined,
        };
        return projectInfo;
    }

    private getRenameInfo(args: protocol.FileLocationRequestArgs): RenameInfo {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const preferences = this.getPreferences(file);
        return project.getLanguageService().getRenameInfo(file, position, preferences);
    }

    private getProjects(args: protocol.FileRequestArgs, getScriptInfoEnsuringProjectsUptoDate?: boolean, ignoreNoProjectError?: boolean): Projects {
        let projects: readonly Project[] | undefined;
        let symLinkedProjects: MultiMap<Path, Project> | undefined;
        if (args.projectFileName) {
            const project = this.getProject(args.projectFileName);
            if (project) {
                projects = [project];
            }
        }
        else {
            const scriptInfo = getScriptInfoEnsuringProjectsUptoDate ?
                this.projectService.getScriptInfoEnsuringProjectsUptoDate(args.file) :
                this.projectService.getScriptInfo(args.file);
            if (!scriptInfo) {
                if (ignoreNoProjectError) return emptyArray;
                this.projectService.logErrorForScriptInfoNotFound(args.file);
                return Errors.ThrowNoProject();
            }
            else if (!getScriptInfoEnsuringProjectsUptoDate) {
                // Ensure there are containing projects are present
                this.projectService.ensureDefaultProjectForFile(scriptInfo);
            }
            projects = scriptInfo.containingProjects;
            symLinkedProjects = this.projectService.getSymlinkedProjects(scriptInfo);
        }
        // filter handles case when 'projects' is undefined
        projects = filter(projects, p => p.languageServiceEnabled && !p.isOrphan());
        if (!ignoreNoProjectError && (!projects || !projects.length) && !symLinkedProjects) {
            this.projectService.logErrorForScriptInfoNotFound(args.file ?? args.projectFileName);
            return Errors.ThrowNoProject();
        }
        return symLinkedProjects ? { projects: projects!, symLinkedProjects } : projects!; // TODO: GH#18217
    }

    private getDefaultProject(args: protocol.FileRequestArgs) {
        if (args.projectFileName) {
            const project = this.getProject(args.projectFileName);
            if (project) {
                return project;
            }
            if (!args.file) {
                return Errors.ThrowNoProject();
            }
        }
        const info = this.projectService.getScriptInfo(args.file)!;
        return info.getDefaultProject();
    }

    private getRenameLocations(args: protocol.RenameRequestArgs, simplifiedResult: boolean): protocol.RenameResponseBody | readonly RenameLocation[] {
        const file = toNormalizedPath(args.file);
        const position = this.getPositionInFile(args, file);
        const projects = this.getProjects(args);
        const defaultProject = this.getDefaultProject(args);
        const preferences = this.getPreferences(file);
        const renameInfo: protocol.RenameInfo = this.mapRenameInfo(
            defaultProject.getLanguageService().getRenameInfo(file, position, preferences),
            Debug.checkDefined(this.projectService.getScriptInfo(file)),
        );

        if (!renameInfo.canRename) return simplifiedResult ? { info: renameInfo, locs: [] } : [];

        const locations = getRenameLocationsWorker(
            projects,
            defaultProject,
            { fileName: args.file, pos: position },
            !!args.findInStrings,
            !!args.findInComments,
            preferences,
            this.host.useCaseSensitiveFileNames,
        );
        if (!simplifiedResult) return locations;
        return { info: renameInfo, locs: this.toSpanGroups(locations) };
    }

    private mapRenameInfo(info: RenameInfo, scriptInfo: ScriptInfo): protocol.RenameInfo {
        if (info.canRename) {
            const { canRename, fileToRename, displayName, fullDisplayName, kind, kindModifiers, triggerSpan } = info;
            return identity<protocol.RenameInfoSuccess>(
                { canRename, fileToRename, displayName, fullDisplayName, kind, kindModifiers, triggerSpan: toProtocolTextSpan(triggerSpan, scriptInfo) },
            );
        }
        else {
            return info;
        }
    }

    private toSpanGroups(locations: readonly RenameLocation[]): readonly protocol.SpanGroup[] {
        const map = new Map<string, protocol.SpanGroup>();
        for (const { fileName, textSpan, contextSpan, originalContextSpan: _2, originalTextSpan: _, originalFileName: _1, ...prefixSuffixText } of locations) {
            let group = map.get(fileName);
            if (!group) map.set(fileName, group = { file: fileName, locs: [] });
            const scriptInfo = Debug.checkDefined(this.projectService.getScriptInfo(fileName));
            group.locs.push({ ...toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo), ...prefixSuffixText });
        }
        return arrayFrom(map.values());
    }

    private getReferences(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.ReferencesResponseBody | readonly ReferencedSymbol[] {
        const file = toNormalizedPath(args.file);
        const projects = this.getProjects(args);
        const position = this.getPositionInFile(args, file);
        const references = getReferencesWorker(
            projects,
            this.getDefaultProject(args),
            { fileName: args.file, pos: position },
            this.host.useCaseSensitiveFileNames,
            this.logger,
        );

        if (!simplifiedResult) return references;

        const preferences = this.getPreferences(file);
        const defaultProject = this.getDefaultProject(args);
        const scriptInfo = defaultProject.getScriptInfoForNormalizedPath(file)!;
        const nameInfo = defaultProject.getLanguageService().getQuickInfoAtPosition(file, position);
        const symbolDisplayString = nameInfo ? displayPartsToString(nameInfo.displayParts) : "";
        const nameSpan = nameInfo && nameInfo.textSpan;
        const symbolStartOffset = nameSpan ? scriptInfo.positionToLineOffset(nameSpan.start).offset : 0;
        const symbolName = nameSpan ? scriptInfo.getSnapshot().getText(nameSpan.start, textSpanEnd(nameSpan)) : "";
        const refs: readonly protocol.ReferencesResponseItem[] = flatMap(references, referencedSymbol => {
            return referencedSymbol.references.map(entry => referenceEntryToReferencesResponseItem(this.projectService, entry, preferences));
        });
        return { refs, symbolName, symbolStartOffset, symbolDisplayString };
    }

    private getFileReferences(args: protocol.FileRequestArgs, simplifiedResult: boolean): protocol.FileReferencesResponseBody | readonly ReferenceEntry[] {
        const projects = this.getProjects(args);
        const fileName = args.file;
        const preferences = this.getPreferences(toNormalizedPath(fileName));

        const references: ReferenceEntry[] = [];
        const seen = createDocumentSpanSet(this.host.useCaseSensitiveFileNames);

        forEachProjectInProjects(projects, /*path*/ undefined, project => {
            if (project.getCancellationToken().isCancellationRequested()) return;

            const projectOutputs = project.getLanguageService().getFileReferences(fileName);
            if (projectOutputs) {
                for (const referenceEntry of projectOutputs) {
                    if (!seen.has(referenceEntry)) {
                        references.push(referenceEntry);
                        seen.add(referenceEntry);
                    }
                }
            }
        });

        if (!simplifiedResult) return references;
        const refs = references.map(entry => referenceEntryToReferencesResponseItem(this.projectService, entry, preferences));
        return {
            refs,
            symbolName: `"${args.file}"`,
        };
    }

    /**
     * @param fileName is the name of the file to be opened
     * @param fileContent is a version of the file content that is known to be more up to date than the one on disk
     */
    private openClientFile(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, projectRootPath?: NormalizedPath) {
        this.projectService.openClientFileWithNormalizedPath(fileName, fileContent, scriptKind, /*hasMixedContent*/ false, projectRootPath);
    }

    private getPosition(args: protocol.Location & { position?: number; }, scriptInfo: ScriptInfo): number {
        return args.position !== undefined ? args.position : scriptInfo.lineOffsetToPosition(args.line, args.offset);
    }

    private getPositionInFile(args: protocol.Location & { position?: number; }, file: NormalizedPath): number {
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        return this.getPosition(args, scriptInfo);
    }

    private getFileAndProject(args: protocol.FileRequestArgs): FileAndProject {
        return this.getFileAndProjectWorker(args.file, args.projectFileName);
    }

    private getFileAndLanguageServiceForSyntacticOperation(args: protocol.FileRequestArgs) {
        const { file, project } = this.getFileAndProject(args);
        return {
            file,
            languageService: project.getLanguageService(/*ensureSynchronized*/ false),
        };
    }

    private getFileAndProjectWorker(uncheckedFileName: string, projectFileName: string | undefined): { file: NormalizedPath; project: Project; } {
        const file = toNormalizedPath(uncheckedFileName);
        const project = this.getProject(projectFileName) || this.projectService.ensureDefaultProjectForFile(file);
        return { file, project };
    }

    private getOutliningSpans(args: protocol.FileRequestArgs, simplifiedResult: boolean): protocol.OutliningSpan[] | OutliningSpan[] {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const spans = languageService.getOutliningSpans(file);
        if (simplifiedResult) {
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
            return spans.map(s => ({
                textSpan: toProtocolTextSpan(s.textSpan, scriptInfo),
                hintSpan: toProtocolTextSpan(s.hintSpan, scriptInfo),
                bannerText: s.bannerText,
                autoCollapse: s.autoCollapse,
                kind: s.kind,
            }));
        }
        else {
            return spans;
        }
    }

    private getTodoComments(args: protocol.TodoCommentRequestArgs) {
        const { file, project } = this.getFileAndProject(args);
        return project.getLanguageService().getTodoComments(file, args.descriptors);
    }

    private getDocCommentTemplate(args: protocol.FileLocationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.getDocCommentTemplateAtPosition(file, position, this.getPreferences(file), this.getFormatOptions(file));
    }

    private getSpanOfEnclosingComment(args: protocol.SpanOfEnclosingCommentRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const onlyMultiLine = args.onlyMultiLine;
        const position = this.getPositionInFile(args, file);
        return languageService.getSpanOfEnclosingComment(file, position, onlyMultiLine);
    }

    private getIndentation(args: protocol.IndentationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        const options = args.options ? convertFormatOptions(args.options) : this.getFormatOptions(file);
        const indentation = languageService.getIndentationAtPosition(file, position, options);
        return { position, indentation };
    }

    private getBreakpointStatement(args: protocol.FileLocationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.getBreakpointStatementAtPosition(file, position);
    }

    private getNameOrDottedNameSpan(args: protocol.FileLocationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.getNameOrDottedNameSpan(file, position, position);
    }

    private isValidBraceCompletion(args: protocol.BraceCompletionRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.isValidBraceCompletionAtPosition(file, position, args.openingBrace.charCodeAt(0));
    }

    private getQuickInfoWorker(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.QuickInfoResponseBody | QuickInfo | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file, this.getPosition(args, scriptInfo));
        if (!quickInfo) {
            return undefined;
        }

        const useDisplayParts = !!this.getPreferences(file).displayPartsForJSDoc;
        if (simplifiedResult) {
            const displayString = displayPartsToString(quickInfo.displayParts);
            return {
                kind: quickInfo.kind,
                kindModifiers: quickInfo.kindModifiers,
                start: scriptInfo.positionToLineOffset(quickInfo.textSpan.start),
                end: scriptInfo.positionToLineOffset(textSpanEnd(quickInfo.textSpan)),
                displayString,
                documentation: useDisplayParts ? this.mapDisplayParts(quickInfo.documentation, project) : displayPartsToString(quickInfo.documentation),
                tags: this.mapJSDocTagInfo(quickInfo.tags, project, useDisplayParts),
            };
        }
        else {
            return useDisplayParts ? quickInfo : {
                ...quickInfo,
                tags: this.mapJSDocTagInfo(quickInfo.tags, project, /*richResponse*/ false) as JSDocTagInfo[],
            };
        }
    }

    private getFormattingEditsForRange(args: protocol.FormatRequestArgs): protocol.CodeEdit[] | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;

        const startPosition = scriptInfo.lineOffsetToPosition(args.line, args.offset);
        const endPosition = scriptInfo.lineOffsetToPosition(args.endLine, args.endOffset);

        // TODO: avoid duplicate code (with formatonkey)
        const edits = languageService.getFormattingEditsForRange(file, startPosition, endPosition, this.getFormatOptions(file));
        if (!edits) {
            return undefined;
        }

        return edits.map(edit => this.convertTextChangeToCodeEdit(edit, scriptInfo));
    }

    private getFormattingEditsForRangeFull(args: protocol.FormatRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const options = args.options ? convertFormatOptions(args.options) : this.getFormatOptions(file);
        return languageService.getFormattingEditsForRange(file, args.position!, args.endPosition!, options); // TODO: GH#18217
    }

    private getFormattingEditsForDocumentFull(args: protocol.FormatRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const options = args.options ? convertFormatOptions(args.options) : this.getFormatOptions(file);
        return languageService.getFormattingEditsForDocument(file, options);
    }

    private getFormattingEditsAfterKeystrokeFull(args: protocol.FormatOnKeyRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const options = args.options ? convertFormatOptions(args.options) : this.getFormatOptions(file);
        return languageService.getFormattingEditsAfterKeystroke(file, args.position!, args.key, options); // TODO: GH#18217
    }

    private getFormattingEditsAfterKeystroke(args: protocol.FormatOnKeyRequestArgs): protocol.CodeEdit[] | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = scriptInfo.lineOffsetToPosition(args.line, args.offset);
        const formatOptions = this.getFormatOptions(file);
        const edits = languageService.getFormattingEditsAfterKeystroke(file, position, args.key, formatOptions);
        // Check whether we should auto-indent. This will be when
        // the position is on a line containing only whitespace.
        // This should leave the edits returned from
        // getFormattingEditsAfterKeystroke either empty or pertaining
        // only to the previous line.  If all this is true, then
        // add edits necessary to properly indent the current line.
        if ((args.key === "\n") && ((!edits) || (edits.length === 0) || allEditsBeforePos(edits, position))) {
            const { lineText, absolutePosition } = scriptInfo.textStorage.getAbsolutePositionAndLineText(args.line);
            if (lineText && lineText.search("\\S") < 0) {
                const preferredIndent = languageService.getIndentationAtPosition(file, position, formatOptions);
                let hasIndent = 0;
                let i: number, len: number;
                for (i = 0, len = lineText.length; i < len; i++) {
                    if (lineText.charAt(i) === " ") {
                        hasIndent++;
                    }
                    else if (lineText.charAt(i) === "\t") {
                        hasIndent += formatOptions.tabSize!; // TODO: GH#18217
                    }
                    else {
                        break;
                    }
                }
                // i points to the first non whitespace character
                if (preferredIndent !== hasIndent) {
                    const firstNoWhiteSpacePosition = absolutePosition + i;
                    edits.push({
                        span: createTextSpanFromBounds(absolutePosition, firstNoWhiteSpacePosition),
                        newText: formatting.getIndentationString(preferredIndent, formatOptions),
                    });
                }
            }
        }

        if (!edits) {
            return undefined;
        }

        return edits.map(edit => {
            return {
                start: scriptInfo.positionToLineOffset(edit.span.start),
                end: scriptInfo.positionToLineOffset(textSpanEnd(edit.span)),
                newText: edit.newText ? edit.newText : "",
            };
        });
    }

    private getCompletions(args: protocol.CompletionsRequestArgs, kind: protocol.CommandTypes.CompletionInfo | protocol.CommandTypes.Completions | protocol.CommandTypes.CompletionsFull): WithMetadata<readonly protocol.CompletionEntry[]> | protocol.CompletionInfo | CompletionInfo | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);

        const completions = project.getLanguageService().getCompletionsAtPosition(
            file,
            position,
            {
                ...convertUserPreferences(this.getPreferences(file)),
                triggerCharacter: args.triggerCharacter,
                triggerKind: args.triggerKind as CompletionTriggerKind | undefined,
                includeExternalModuleExports: args.includeExternalModuleExports,
                includeInsertTextCompletions: args.includeInsertTextCompletions,
            },
            project.projectService.getFormatCodeOptions(file),
        );
        if (completions === undefined) return undefined;

        if (kind === protocol.CommandTypes.CompletionsFull) return completions;

        const prefix = args.prefix || "";
        const entries = mapDefined<CompletionEntry, protocol.CompletionEntry>(completions.entries, entry => {
            if (completions.isMemberCompletion || startsWith(entry.name.toLowerCase(), prefix.toLowerCase())) {
                const {
                    name,
                    kind,
                    kindModifiers,
                    sortText,
                    insertText,
                    filterText,
                    replacementSpan,
                    hasAction,
                    source,
                    sourceDisplay,
                    labelDetails,
                    isSnippet,
                    isRecommended,
                    isPackageJsonImport,
                    isImportStatementCompletion,
                    data,
                } = entry;
                const convertedSpan = replacementSpan ? toProtocolTextSpan(replacementSpan, scriptInfo) : undefined;
                // Use `hasAction || undefined` to avoid serializing `false`.
                return {
                    name,
                    kind,
                    kindModifiers,
                    sortText,
                    insertText,
                    filterText,
                    replacementSpan: convertedSpan,
                    isSnippet,
                    hasAction: hasAction || undefined,
                    source,
                    sourceDisplay,
                    labelDetails,
                    isRecommended,
                    isPackageJsonImport,
                    isImportStatementCompletion,
                    data,
                };
            }
        });

        if (kind === protocol.CommandTypes.Completions) {
            if (completions.metadata) (entries as WithMetadata<readonly protocol.CompletionEntry[]>).metadata = completions.metadata;
            return entries;
        }

        const res: protocol.CompletionInfo = {
            ...completions,
            optionalReplacementSpan: completions.optionalReplacementSpan && toProtocolTextSpan(completions.optionalReplacementSpan, scriptInfo),
            entries,
        };
        return res;
    }

    private getCompletionEntryDetails(args: protocol.CompletionDetailsRequestArgs, fullResult: boolean): readonly protocol.CompletionEntryDetails[] | readonly CompletionEntryDetails[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);
        const formattingOptions = project.projectService.getFormatCodeOptions(file);
        const useDisplayParts = !!this.getPreferences(file).displayPartsForJSDoc;

        const result = mapDefined(args.entryNames, entryName => {
            const { name, source, data } = typeof entryName === "string" ? { name: entryName, source: undefined, data: undefined } : entryName;
            return project.getLanguageService().getCompletionEntryDetails(file, position, name, formattingOptions, source, this.getPreferences(file), data ? cast(data, isCompletionEntryData) : undefined);
        });
        return fullResult
            ? (useDisplayParts ? result : result.map(details => ({ ...details, tags: this.mapJSDocTagInfo(details.tags, project, /*richResponse*/ false) as JSDocTagInfo[] })))
            : result.map(details => ({
                ...details,
                codeActions: map(details.codeActions, action => this.mapCodeAction(action)),
                documentation: this.mapDisplayParts(details.documentation, project),
                tags: this.mapJSDocTagInfo(details.tags, project, useDisplayParts),
            }));
    }

    private getCompileOnSaveAffectedFileList(args: protocol.FileRequestArgs): readonly protocol.CompileOnSaveAffectedFileListSingleProject[] {
        const projects = this.getProjects(args, /*getScriptInfoEnsuringProjectsUptoDate*/ true, /*ignoreNoProjectError*/ true);
        const info = this.projectService.getScriptInfo(args.file);
        if (!info) {
            return emptyArray;
        }

        return combineProjectOutput(
            info,
            path => this.projectService.getScriptInfoForPath(path)!,
            projects,
            (project, info) => {
                if (!project.compileOnSaveEnabled || !project.languageServiceEnabled || project.isOrphan()) {
                    return undefined;
                }

                const compilationSettings = project.getCompilationSettings();

                if (!!compilationSettings.noEmit || isDeclarationFileName(info.fileName) && !dtsChangeCanAffectEmit(compilationSettings)) {
                    // avoid triggering emit when a change is made in a .d.ts when declaration emit and decorator metadata emit are disabled
                    return undefined;
                }

                return {
                    projectFileName: project.getProjectName(),
                    fileNames: project.getCompileOnSaveAffectedFileList(info),
                    projectUsesOutFile: !!outFile(compilationSettings),
                };
            },
        );
    }

    private emitFile(args: protocol.CompileOnSaveEmitFileRequestArgs): boolean | protocol.EmitResult | EmitResult {
        const { file, project } = this.getFileAndProject(args);
        if (!project) {
            Errors.ThrowNoProject();
        }
        if (!project.languageServiceEnabled) {
            return args.richResponse ? { emitSkipped: true, diagnostics: [] } : false;
        }
        const scriptInfo = project.getScriptInfo(file)!;
        const { emitSkipped, diagnostics } = project.emitFile(scriptInfo, (path, data, writeByteOrderMark) => this.host.writeFile(path, data, writeByteOrderMark));
        return args.richResponse ?
            {
                emitSkipped,
                diagnostics: args.includeLinePosition ?
                    this.convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnostics) :
                    diagnostics.map(d => formatDiagnosticToProtocol(d, /*includeFileName*/ true)),
            } :
            !emitSkipped;
    }

    private getSignatureHelpItems(args: protocol.SignatureHelpRequestArgs, simplifiedResult: boolean): protocol.SignatureHelpItems | SignatureHelpItems | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);
        const helpItems = project.getLanguageService().getSignatureHelpItems(file, position, args);
        const useDisplayParts = !!this.getPreferences(file).displayPartsForJSDoc;
        if (helpItems && simplifiedResult) {
            const span = helpItems.applicableSpan;
            return {
                ...helpItems,
                applicableSpan: {
                    start: scriptInfo.positionToLineOffset(span.start),
                    end: scriptInfo.positionToLineOffset(span.start + span.length),
                },
                items: this.mapSignatureHelpItems(helpItems.items, project, useDisplayParts),
            };
        }
        else if (useDisplayParts || !helpItems) {
            return helpItems;
        }
        else {
            return {
                ...helpItems,
                items: helpItems.items.map(item => ({ ...item, tags: this.mapJSDocTagInfo(item.tags, project, /*richResponse*/ false) as JSDocTagInfo[] })),
            };
        }
    }

    private toPendingErrorCheck(uncheckedFileName: string): PendingErrorCheck | undefined {
        const fileName = toNormalizedPath(uncheckedFileName);
        const project = this.projectService.tryGetDefaultProjectForFile(fileName);
        return project && { fileName, project };
    }

    private getDiagnostics(next: NextStep, delay: number, fileNames: string[]): void {
        if (this.suppressDiagnosticEvents) {
            return;
        }

        if (fileNames.length > 0) {
            this.updateErrorCheck(next, fileNames, delay);
        }
    }

    private change(args: protocol.ChangeRequestArgs) {
        const scriptInfo = this.projectService.getScriptInfo(args.file)!;
        Debug.assert(!!scriptInfo);
        // Because we are going to apply edits, its better to switch to svc now instead of computing line map
        scriptInfo.textStorage.switchToScriptVersionCache();
        const start = scriptInfo.lineOffsetToPosition(args.line, args.offset);
        const end = scriptInfo.lineOffsetToPosition(args.endLine, args.endOffset);
        if (start >= 0) {
            this.changeSeq++;
            this.projectService.applyChangesToFile(
                scriptInfo,
                singleIterator({
                    span: { start, length: end - start },
                    newText: args.insertString!, // TODO: GH#18217
                }),
            );
        }
    }

    private reload(args: protocol.ReloadRequestArgs, reqSeq: number) {
        const file = toNormalizedPath(args.file);
        const tempFileName = args.tmpfile === undefined ? undefined : toNormalizedPath(args.tmpfile);
        const info = this.projectService.getScriptInfoForNormalizedPath(file);
        if (info) {
            this.changeSeq++;
            // make sure no changes happen before this one is finished
            if (info.reloadFromFile(tempFileName)) {
                this.doOutput(/*info*/ undefined, protocol.CommandTypes.Reload, reqSeq, /*success*/ true);
            }
        }
    }

    private saveToTmp(fileName: string, tempFileName: string) {
        const scriptInfo = this.projectService.getScriptInfo(fileName);
        if (scriptInfo) {
            scriptInfo.saveTo(tempFileName);
        }
    }

    private closeClientFile(fileName: string) {
        if (!fileName) {
            return;
        }
        const file = normalizePath(fileName);
        this.projectService.closeClientFile(file);
    }

    private mapLocationNavigationBarItems(items: NavigationBarItem[], scriptInfo: ScriptInfo): protocol.NavigationBarItem[] {
        return map(items, item => ({
            text: item.text,
            kind: item.kind,
            kindModifiers: item.kindModifiers,
            spans: item.spans.map(span => toProtocolTextSpan(span, scriptInfo)),
            childItems: this.mapLocationNavigationBarItems(item.childItems, scriptInfo),
            indent: item.indent,
        }));
    }

    private getNavigationBarItems(args: protocol.FileRequestArgs, simplifiedResult: boolean): protocol.NavigationBarItem[] | NavigationBarItem[] | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const items = languageService.getNavigationBarItems(file);
        return !items
            ? undefined
            : simplifiedResult
            ? this.mapLocationNavigationBarItems(items, this.projectService.getScriptInfoForNormalizedPath(file)!)
            : items;
    }

    private toLocationNavigationTree(tree: NavigationTree, scriptInfo: ScriptInfo): protocol.NavigationTree {
        return {
            text: tree.text,
            kind: tree.kind,
            kindModifiers: tree.kindModifiers,
            spans: tree.spans.map(span => toProtocolTextSpan(span, scriptInfo)),
            nameSpan: tree.nameSpan && toProtocolTextSpan(tree.nameSpan, scriptInfo),
            childItems: map(tree.childItems, item => this.toLocationNavigationTree(item, scriptInfo)),
        };
    }

    private getNavigationTree(args: protocol.FileRequestArgs, simplifiedResult: boolean): protocol.NavigationTree | NavigationTree | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const tree = languageService.getNavigationTree(file);
        return !tree
            ? undefined
            : simplifiedResult
            ? this.toLocationNavigationTree(tree, this.projectService.getScriptInfoForNormalizedPath(file)!)
            : tree;
    }

    private getNavigateToItems(args: protocol.NavtoRequestArgs, simplifiedResult: boolean): readonly protocol.NavtoItem[] | readonly NavigateToItem[] {
        const full = this.getFullNavigateToItems(args);
        return !simplifiedResult ?
            flatMap(full, ({ navigateToItems }) => navigateToItems) :
            flatMap(
                full,
                ({ project, navigateToItems }) =>
                    navigateToItems.map(navItem => {
                        const scriptInfo = project.getScriptInfo(navItem.fileName)!;
                        const bakedItem: protocol.NavtoItem = {
                            name: navItem.name,
                            kind: navItem.kind,
                            kindModifiers: navItem.kindModifiers,
                            isCaseSensitive: navItem.isCaseSensitive,
                            matchKind: navItem.matchKind,
                            file: navItem.fileName,
                            start: scriptInfo.positionToLineOffset(navItem.textSpan.start),
                            end: scriptInfo.positionToLineOffset(textSpanEnd(navItem.textSpan)),
                        };
                        if (navItem.kindModifiers && (navItem.kindModifiers !== "")) {
                            bakedItem.kindModifiers = navItem.kindModifiers;
                        }
                        if (navItem.containerName && (navItem.containerName.length > 0)) {
                            bakedItem.containerName = navItem.containerName;
                        }
                        if (navItem.containerKind && (navItem.containerKind.length > 0)) {
                            bakedItem.containerKind = navItem.containerKind;
                        }
                        return bakedItem;
                    }),
            );
    }

    private getFullNavigateToItems(args: protocol.NavtoRequestArgs): ProjectNavigateToItems[] {
        const { currentFileOnly, searchValue, maxResultCount, projectFileName } = args;

        if (currentFileOnly) {
            Debug.assertIsDefined(args.file);
            const { file, project } = this.getFileAndProject(args as protocol.FileRequestArgs);
            return [{ project, navigateToItems: project.getLanguageService().getNavigateToItems(searchValue, maxResultCount, file) }];
        }
        const preferences = this.getHostPreferences();

        const outputs: ProjectNavigateToItems[] = [];

        // This is effectively a hashset with `name` as the custom hash and `navigateToItemIsEqualTo` as the custom equals.
        // `name` is a very cheap hash function, but we could incorporate other properties to reduce collisions.
        const seenItems = new Map<string, NavigateToItem[]>(); // name to items with that name

        if (!args.file && !projectFileName) {
            // VS Code's `Go to symbol in workspaces` sends request like this by default.
            // There's a setting to have it send a file name (reverting to older behavior).

            // TODO (https://github.com/microsoft/TypeScript/issues/47839)
            // This appears to have been intended to search all projects but, in practice, it seems to only search
            // those that are downstream from already-loaded projects.
            // Filtering by !isSourceOfProjectReferenceRedirect is new, but seems appropriate and consistent with
            // the case below.
            this.projectService.loadAncestorProjectTree();
            this.projectService.forEachEnabledProject(project => addItemsForProject(project));
        }
        else {
            // VS's `Go to symbol` sends requests with just a project and doesn't want cascading since it will
            // send a separate request for each project of interest

            // TODO (https://github.com/microsoft/TypeScript/issues/47839)
            // This doesn't really make sense unless it's a single project matching `projectFileName`
            const projects = this.getProjects(args as protocol.FileRequestArgs);
            forEachProjectInProjects(projects, /*path*/ undefined, project => addItemsForProject(project));
        }

        return outputs;

        // Mutates `outputs`
        function addItemsForProject(project: Project) {
            const projectItems = project.getLanguageService().getNavigateToItems(
                searchValue,
                maxResultCount,
                /*fileName*/ undefined,
                /*excludeDts*/ project.isNonTsProject(),
                /*excludeLibFiles*/ preferences.excludeLibrarySymbolsInNavTo,
            );
            const unseenItems = filter(projectItems, item => tryAddSeenItem(item) && !getMappedLocationForProject(documentSpanLocation(item), project));
            if (unseenItems.length) {
                outputs.push({ project, navigateToItems: unseenItems });
            }
        }

        // Returns true if the item had not been seen before
        // Mutates `seenItems`
        function tryAddSeenItem(item: NavigateToItem) {
            const name = item.name;
            if (!seenItems.has(name)) {
                seenItems.set(name, [item]);
                return true;
            }

            const seen = seenItems.get(name)!;
            for (const seenItem of seen) {
                if (navigateToItemIsEqualTo(seenItem, item)) {
                    return false;
                }
            }

            seen.push(item);
            return true;
        }

        function navigateToItemIsEqualTo(a: NavigateToItem, b: NavigateToItem): boolean {
            if (a === b) {
                return true;
            }
            if (!a || !b) {
                return false;
            }
            return a.containerKind === b.containerKind &&
                a.containerName === b.containerName &&
                a.fileName === b.fileName &&
                a.isCaseSensitive === b.isCaseSensitive &&
                a.kind === b.kind &&
                a.kindModifiers === b.kindModifiers &&
                a.matchKind === b.matchKind &&
                a.name === b.name &&
                a.textSpan.start === b.textSpan.start &&
                a.textSpan.length === b.textSpan.length;
        }
    }

    private getSupportedCodeFixes(args: Partial<protocol.FileRequestArgs> | undefined): readonly string[] {
        if (!args) return getSupportedCodeFixes(); // Compatibility
        if (args.file) {
            const { file, project } = this.getFileAndProject(args as protocol.FileRequestArgs);
            return project.getLanguageService().getSupportedCodeFixes(file);
        }
        const project = this.getProject(args.projectFileName);
        if (!project) Errors.ThrowNoProject();
        return project.getLanguageService().getSupportedCodeFixes();
    }

    private isLocation(locationOrSpan: protocol.FileLocationOrRangeRequestArgs): locationOrSpan is protocol.FileLocationRequestArgs {
        return (locationOrSpan as protocol.FileLocationRequestArgs).line !== undefined;
    }

    private extractPositionOrRange(args: protocol.FileLocationOrRangeRequestArgs, scriptInfo: ScriptInfo): number | TextRange {
        let position: number | undefined;
        let textRange: TextRange | undefined;
        if (this.isLocation(args)) {
            position = getPosition(args);
        }
        else {
            textRange = this.getRange(args, scriptInfo);
        }
        return Debug.checkDefined(position === undefined ? textRange : position);

        function getPosition(loc: protocol.FileLocationRequestArgs) {
            return loc.position !== undefined ? loc.position : scriptInfo.lineOffsetToPosition(loc.line, loc.offset);
        }
    }

    private getRange(args: protocol.FileRangeRequestArgs, scriptInfo: ScriptInfo): TextRange {
        const { startPosition, endPosition } = this.getStartAndEndPosition(args, scriptInfo);

        return { pos: startPosition, end: endPosition };
    }

    private getApplicableRefactors(args: protocol.GetApplicableRefactorsRequestArgs): protocol.ApplicableRefactorInfo[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
        return project.getLanguageService().getApplicableRefactors(file, this.extractPositionOrRange(args, scriptInfo), this.getPreferences(file), args.triggerReason, args.kind, args.includeInteractiveActions);
    }

    private getEditsForRefactor(args: protocol.GetEditsForRefactorRequestArgs, simplifiedResult: boolean): RefactorEditInfo | protocol.RefactorEditInfo {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
        const result = project.getLanguageService().getEditsForRefactor(
            file,
            this.getFormatOptions(file),
            this.extractPositionOrRange(args, scriptInfo),
            args.refactor,
            args.action,
            this.getPreferences(file),
            args.interactiveRefactorArguments,
        );

        if (result === undefined) {
            return {
                edits: [],
            };
        }

        if (simplifiedResult) {
            const { renameFilename, renameLocation, edits } = result;
            let mappedRenameLocation: protocol.Location | undefined;
            if (renameFilename !== undefined && renameLocation !== undefined) {
                const renameScriptInfo = project.getScriptInfoForNormalizedPath(toNormalizedPath(renameFilename))!;
                mappedRenameLocation = getLocationInNewDocument(getSnapshotText(renameScriptInfo.getSnapshot()), renameFilename, renameLocation, edits);
            }
            return {
                renameLocation: mappedRenameLocation,
                renameFilename,
                edits: this.mapTextChangesToCodeEdits(edits),
                notApplicableReason: result.notApplicableReason,
            };
        }
        return result;
    }

    private getMoveToRefactoringFileSuggestions(args: protocol.GetMoveToRefactoringFileSuggestionsRequestArgs): { newFileName: string; files: string[]; } {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
        return project.getLanguageService().getMoveToRefactoringFileSuggestions(file, this.extractPositionOrRange(args, scriptInfo), this.getPreferences(file));
    }

    private organizeImports(args: protocol.OrganizeImportsRequestArgs, simplifiedResult: boolean): readonly protocol.FileCodeEdits[] | readonly FileTextChanges[] {
        Debug.assert(args.scope.type === "file");
        const { file, project } = this.getFileAndProject(args.scope.args);
        const changes = project.getLanguageService().organizeImports(
            {
                fileName: file,
                mode: args.mode as OrganizeImportsMode | undefined ?? (args.skipDestructiveCodeActions ? OrganizeImportsMode.SortAndCombine : undefined),
                type: "file",
            },
            this.getFormatOptions(file),
            this.getPreferences(file),
        );
        if (simplifiedResult) {
            return this.mapTextChangesToCodeEdits(changes);
        }
        else {
            return changes;
        }
    }

    private getEditsForFileRename(args: protocol.GetEditsForFileRenameRequestArgs, simplifiedResult: boolean): readonly protocol.FileCodeEdits[] | readonly FileTextChanges[] {
        const oldPath = toNormalizedPath(args.oldFilePath);
        const newPath = toNormalizedPath(args.newFilePath);
        const formatOptions = this.getHostFormatOptions();
        const preferences = this.getHostPreferences();

        const seenFiles = new Set<string>();
        const textChanges: FileTextChanges[] = [];
        // TODO (https://github.com/microsoft/TypeScript/issues/47839)
        // This appears to have been intended to search all projects but, in practice, it seems to only search
        // those that are downstream from already-loaded projects.
        this.projectService.loadAncestorProjectTree();
        this.projectService.forEachEnabledProject(project => {
            const projectTextChanges = project.getLanguageService().getEditsForFileRename(oldPath, newPath, formatOptions, preferences);
            const projectFiles: string[] = [];
            for (const textChange of projectTextChanges) {
                if (!seenFiles.has(textChange.fileName)) {
                    textChanges.push(textChange);
                    projectFiles.push(textChange.fileName);
                }
            }
            for (const file of projectFiles) {
                seenFiles.add(file);
            }
        });

        return simplifiedResult ? textChanges.map(c => this.mapTextChangeToCodeEdit(c)) : textChanges;
    }

    private getCodeFixes(args: protocol.CodeFixRequestArgs, simplifiedResult: boolean): readonly protocol.CodeFixAction[] | readonly CodeFixAction[] | undefined {
        const { file, project } = this.getFileAndProject(args);

        const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
        const { startPosition, endPosition } = this.getStartAndEndPosition(args, scriptInfo);

        let codeActions: readonly CodeFixAction[];
        try {
            codeActions = project.getLanguageService().getCodeFixesAtPosition(file, startPosition, endPosition, args.errorCodes, this.getFormatOptions(file), this.getPreferences(file));
        }
        catch (e) {
            const ls = project.getLanguageService();
            const existingDiagCodes = [
                ...ls.getSyntacticDiagnostics(file),
                ...ls.getSemanticDiagnostics(file),
                ...ls.getSuggestionDiagnostics(file),
            ].map(d =>
                decodedTextSpanIntersectsWith(startPosition, endPosition - startPosition, d.start!, d.length!)
                && d.code
            );
            const badCode = args.errorCodes.find(c => !existingDiagCodes.includes(c));
            if (badCode !== undefined) {
                e.message = `BADCLIENT: Bad error code, ${badCode} not found in range ${startPosition}..${endPosition} (found: ${existingDiagCodes.join(", ")}); could have caused this error:\n${e.message}`;
            }
            throw e;
        }
        return simplifiedResult ? codeActions.map(codeAction => this.mapCodeFixAction(codeAction)) : codeActions;
    }

    private getCombinedCodeFix({ scope, fixId }: protocol.GetCombinedCodeFixRequestArgs, simplifiedResult: boolean): protocol.CombinedCodeActions | CombinedCodeActions {
        Debug.assert(scope.type === "file");
        const { file, project } = this.getFileAndProject(scope.args);
        const res = project.getLanguageService().getCombinedCodeFix({ type: "file", fileName: file }, fixId, this.getFormatOptions(file), this.getPreferences(file));
        if (simplifiedResult) {
            return { changes: this.mapTextChangesToCodeEdits(res.changes), commands: res.commands };
        }
        else {
            return res;
        }
    }

    private applyCodeActionCommand(args: protocol.ApplyCodeActionCommandRequestArgs): {} {
        const commands = args.command as CodeActionCommand | CodeActionCommand[]; // They should be sending back the command we sent them.
        for (const command of toArray(commands)) {
            const { file, project } = this.getFileAndProject(command);
            project.getLanguageService().applyCodeActionCommand(command, this.getFormatOptions(file)).then(
                _result => {/* TODO: GH#20447 report success message? */},
                _error => {/* TODO: GH#20447 report errors */},
            );
        }
        return {};
    }

    private getStartAndEndPosition(args: protocol.FileRangeRequestArgs, scriptInfo: ScriptInfo) {
        let startPosition: number | undefined, endPosition: number | undefined;
        if (args.startPosition !== undefined) {
            startPosition = args.startPosition;
        }
        else {
            startPosition = scriptInfo.lineOffsetToPosition(args.startLine, args.startOffset);
            // save the result so we don't always recompute
            args.startPosition = startPosition;
        }

        if (args.endPosition !== undefined) {
            endPosition = args.endPosition;
        }
        else {
            endPosition = scriptInfo.lineOffsetToPosition(args.endLine, args.endOffset);
            args.endPosition = endPosition;
        }

        return { startPosition, endPosition };
    }

    private mapCodeAction({ description, changes, commands }: CodeAction): protocol.CodeAction {
        return { description, changes: this.mapTextChangesToCodeEdits(changes), commands };
    }

    private mapCodeFixAction({ fixName, description, changes, commands, fixId, fixAllDescription }: CodeFixAction): protocol.CodeFixAction {
        return { fixName, description, changes: this.mapTextChangesToCodeEdits(changes), commands, fixId, fixAllDescription };
    }

    private mapTextChangesToCodeEdits(textChanges: readonly FileTextChanges[]): protocol.FileCodeEdits[] {
        return textChanges.map(change => this.mapTextChangeToCodeEdit(change));
    }

    private mapTextChangeToCodeEdit(textChanges: FileTextChanges): protocol.FileCodeEdits {
        const scriptInfo = this.projectService.getScriptInfoOrConfig(textChanges.fileName);
        if (!!textChanges.isNewFile === !!scriptInfo) {
            if (!scriptInfo) { // and !isNewFile
                this.projectService.logErrorForScriptInfoNotFound(textChanges.fileName);
            }
            Debug.fail("Expected isNewFile for (only) new files. " + JSON.stringify({ isNewFile: !!textChanges.isNewFile, hasScriptInfo: !!scriptInfo }));
        }
        return scriptInfo
            ? { fileName: textChanges.fileName, textChanges: textChanges.textChanges.map(textChange => convertTextChangeToCodeEdit(textChange, scriptInfo)) }
            : convertNewFileTextChangeToCodeEdit(textChanges);
    }

    private convertTextChangeToCodeEdit(change: TextChange, scriptInfo: ScriptInfo): protocol.CodeEdit {
        return {
            start: scriptInfo.positionToLineOffset(change.span.start),
            end: scriptInfo.positionToLineOffset(change.span.start + change.span.length),
            newText: change.newText ? change.newText : "",
        };
    }

    private getBraceMatching(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.TextSpan[] | TextSpan[] | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);

        const spans = languageService.getBraceMatchingAtPosition(file, position);
        return !spans
            ? undefined
            : simplifiedResult
            ? spans.map(span => toProtocolTextSpan(span, scriptInfo))
            : spans;
    }

    private getDiagnosticsForProject(next: NextStep, delay: number, fileName: string): void {
        if (this.suppressDiagnosticEvents) {
            return;
        }

        const { fileNames, languageServiceDisabled } = this.getProjectInfoWorker(fileName, /*projectFileName*/ undefined, /*needFileNameList*/ true, /*excludeConfigFiles*/ true);
        if (languageServiceDisabled) {
            return;
        }

        // No need to analyze lib.d.ts
        const fileNamesInProject = fileNames!.filter(value => !value.includes("lib.d.ts")); // TODO: GH#18217
        if (fileNamesInProject.length === 0) {
            return;
        }

        // Sort the file name list to make the recently touched files come first
        const highPriorityFiles: NormalizedPath[] = [];
        const mediumPriorityFiles: NormalizedPath[] = [];
        const lowPriorityFiles: NormalizedPath[] = [];
        const veryLowPriorityFiles: NormalizedPath[] = [];
        const normalizedFileName = toNormalizedPath(fileName);
        const project = this.projectService.ensureDefaultProjectForFile(normalizedFileName);
        for (const fileNameInProject of fileNamesInProject) {
            if (this.getCanonicalFileName(fileNameInProject) === this.getCanonicalFileName(fileName)) {
                highPriorityFiles.push(fileNameInProject);
            }
            else {
                const info = this.projectService.getScriptInfo(fileNameInProject)!; // TODO: GH#18217
                if (!info.isScriptOpen()) {
                    if (isDeclarationFileName(fileNameInProject)) {
                        veryLowPriorityFiles.push(fileNameInProject);
                    }
                    else {
                        lowPriorityFiles.push(fileNameInProject);
                    }
                }
                else {
                    mediumPriorityFiles.push(fileNameInProject);
                }
            }
        }

        const sortedFiles = [...highPriorityFiles, ...mediumPriorityFiles, ...lowPriorityFiles, ...veryLowPriorityFiles];
        const checkList = sortedFiles.map(fileName => ({ fileName, project }));
        // Project level error analysis runs on background files too, therefore
        // doesn't require the file to be opened
        this.updateErrorCheck(next, checkList, delay, /*requireOpen*/ false);
    }

    private configurePlugin(args: protocol.ConfigurePluginRequestArguments) {
        this.projectService.configurePlugin(args);
    }

    private getSmartSelectionRange(args: protocol.SelectionRangeRequestArgs, simplifiedResult: boolean) {
        const { locations } = args;
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = Debug.checkDefined(this.projectService.getScriptInfo(file));

        return map(locations, location => {
            const pos = this.getPosition(location, scriptInfo);
            const selectionRange = languageService.getSmartSelectionRange(file, pos);
            return simplifiedResult ? this.mapSelectionRange(selectionRange, scriptInfo) : selectionRange;
        });
    }

    private toggleLineComment(args: protocol.FileRangeRequestArgs, simplifiedResult: boolean): TextChange[] | protocol.CodeEdit[] {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = this.projectService.getScriptInfo(file)!;
        const textRange = this.getRange(args, scriptInfo);

        const textChanges = languageService.toggleLineComment(file, textRange);

        if (simplifiedResult) {
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;

            return textChanges.map(textChange => this.convertTextChangeToCodeEdit(textChange, scriptInfo));
        }

        return textChanges;
    }

    private toggleMultilineComment(args: protocol.FileRangeRequestArgs, simplifiedResult: boolean): TextChange[] | protocol.CodeEdit[] {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const textRange = this.getRange(args, scriptInfo);

        const textChanges = languageService.toggleMultilineComment(file, textRange);

        if (simplifiedResult) {
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;

            return textChanges.map(textChange => this.convertTextChangeToCodeEdit(textChange, scriptInfo));
        }

        return textChanges;
    }

    private commentSelection(args: protocol.FileRangeRequestArgs, simplifiedResult: boolean): TextChange[] | protocol.CodeEdit[] {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const textRange = this.getRange(args, scriptInfo);

        const textChanges = languageService.commentSelection(file, textRange);

        if (simplifiedResult) {
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;

            return textChanges.map(textChange => this.convertTextChangeToCodeEdit(textChange, scriptInfo));
        }

        return textChanges;
    }

    private uncommentSelection(args: protocol.FileRangeRequestArgs, simplifiedResult: boolean): TextChange[] | protocol.CodeEdit[] {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const textRange = this.getRange(args, scriptInfo);

        const textChanges = languageService.uncommentSelection(file, textRange);

        if (simplifiedResult) {
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;

            return textChanges.map(textChange => this.convertTextChangeToCodeEdit(textChange, scriptInfo));
        }

        return textChanges;
    }

    private mapSelectionRange(selectionRange: SelectionRange, scriptInfo: ScriptInfo): protocol.SelectionRange {
        const result: protocol.SelectionRange = {
            textSpan: toProtocolTextSpan(selectionRange.textSpan, scriptInfo),
        };
        if (selectionRange.parent) {
            result.parent = this.mapSelectionRange(selectionRange.parent, scriptInfo);
        }
        return result;
    }

    private getScriptInfoFromProjectService(file: string) {
        const normalizedFile = toNormalizedPath(file);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(normalizedFile);
        if (!scriptInfo) {
            this.projectService.logErrorForScriptInfoNotFound(normalizedFile);
            return Errors.ThrowNoProject();
        }
        return scriptInfo;
    }

    private toProtocolCallHierarchyItem(item: CallHierarchyItem): protocol.CallHierarchyItem {
        const scriptInfo = this.getScriptInfoFromProjectService(item.file);
        return {
            name: item.name,
            kind: item.kind,
            kindModifiers: item.kindModifiers,
            file: item.file,
            containerName: item.containerName,
            span: toProtocolTextSpan(item.span, scriptInfo),
            selectionSpan: toProtocolTextSpan(item.selectionSpan, scriptInfo),
        };
    }

    private toProtocolCallHierarchyIncomingCall(incomingCall: CallHierarchyIncomingCall): protocol.CallHierarchyIncomingCall {
        const scriptInfo = this.getScriptInfoFromProjectService(incomingCall.from.file);
        return {
            from: this.toProtocolCallHierarchyItem(incomingCall.from),
            fromSpans: incomingCall.fromSpans.map(fromSpan => toProtocolTextSpan(fromSpan, scriptInfo)),
        };
    }

    private toProtocolCallHierarchyOutgoingCall(outgoingCall: CallHierarchyOutgoingCall, scriptInfo: ScriptInfo): protocol.CallHierarchyOutgoingCall {
        return {
            to: this.toProtocolCallHierarchyItem(outgoingCall.to),
            fromSpans: outgoingCall.fromSpans.map(fromSpan => toProtocolTextSpan(fromSpan, scriptInfo)),
        };
    }

    private prepareCallHierarchy(args: protocol.FileLocationRequestArgs): protocol.CallHierarchyItem | protocol.CallHierarchyItem[] | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file);
        if (scriptInfo) {
            const position = this.getPosition(args, scriptInfo);
            const result = project.getLanguageService().prepareCallHierarchy(file, position);
            return result && mapOneOrMany(result, item => this.toProtocolCallHierarchyItem(item));
        }
        return undefined;
    }

    private provideCallHierarchyIncomingCalls(args: protocol.FileLocationRequestArgs): protocol.CallHierarchyIncomingCall[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.getScriptInfoFromProjectService(file);
        const incomingCalls = project.getLanguageService().provideCallHierarchyIncomingCalls(file, this.getPosition(args, scriptInfo));
        return incomingCalls.map(call => this.toProtocolCallHierarchyIncomingCall(call));
    }

    private provideCallHierarchyOutgoingCalls(args: protocol.FileLocationRequestArgs): protocol.CallHierarchyOutgoingCall[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.getScriptInfoFromProjectService(file);
        const outgoingCalls = project.getLanguageService().provideCallHierarchyOutgoingCalls(file, this.getPosition(args, scriptInfo));
        return outgoingCalls.map(call => this.toProtocolCallHierarchyOutgoingCall(call, scriptInfo));
    }

    getCanonicalFileName(fileName: string) {
        const name = this.host.useCaseSensitiveFileNames ? fileName : toFileNameLowerCase(fileName);
        return normalizePath(name);
    }

    exit() {/*overridden*/}

    private notRequired(): HandlerResponse {
        return { responseRequired: false };
    }

    private requiredResponse(response: {} | undefined): HandlerResponse {
        return { response, responseRequired: true };
    }

    private handlers = new Map(Object.entries<(request: any) => HandlerResponse>({ // TODO(jakebailey): correctly type the handlers
        [protocol.CommandTypes.Status]: () => {
            const response: protocol.StatusResponseBody = { version };
            return this.requiredResponse(response);
        },
        [protocol.CommandTypes.OpenExternalProject]: (request: protocol.OpenExternalProjectRequest) => {
            this.projectService.openExternalProject(request.arguments);
            // TODO: GH#20447 report errors
            return this.requiredResponse(/*response*/ true);
        },
        [protocol.CommandTypes.OpenExternalProjects]: (request: protocol.OpenExternalProjectsRequest) => {
            this.projectService.openExternalProjects(request.arguments.projects);
            // TODO: GH#20447 report errors
            return this.requiredResponse(/*response*/ true);
        },
        [protocol.CommandTypes.CloseExternalProject]: (request: protocol.CloseExternalProjectRequest) => {
            this.projectService.closeExternalProject(request.arguments.projectFileName);
            // TODO: GH#20447 report errors
            return this.requiredResponse(/*response*/ true);
        },
        [protocol.CommandTypes.SynchronizeProjectList]: (request: protocol.SynchronizeProjectListRequest) => {
            const result = this.projectService.synchronizeProjectList(request.arguments.knownProjects, request.arguments.includeProjectReferenceRedirectInfo);
            if (!result.some(p => p.projectErrors && p.projectErrors.length !== 0)) {
                return this.requiredResponse(result);
            }
            const converted = map(result, p => {
                if (!p.projectErrors || p.projectErrors.length === 0) {
                    return p;
                }
                return {
                    info: p.info,
                    changes: p.changes,
                    files: p.files,
                    projectErrors: this.convertToDiagnosticsWithLinePosition(p.projectErrors, /*scriptInfo*/ undefined),
                };
            });
            return this.requiredResponse(converted);
        },
        [protocol.CommandTypes.UpdateOpen]: (request: protocol.UpdateOpenRequest) => {
            this.changeSeq++;
            this.projectService.applyChangesInOpenFiles(
                request.arguments.openFiles && mapIterator(request.arguments.openFiles, file => ({
                    fileName: file.file,
                    content: file.fileContent,
                    scriptKind: file.scriptKindName,
                    projectRootPath: file.projectRootPath,
                })),
                request.arguments.changedFiles && mapIterator(request.arguments.changedFiles, file => ({
                    fileName: file.fileName,
                    changes: mapDefinedIterator(arrayReverseIterator(file.textChanges), change => {
                        const scriptInfo = Debug.checkDefined(this.projectService.getScriptInfo(file.fileName));
                        const start = scriptInfo.lineOffsetToPosition(change.start.line, change.start.offset);
                        const end = scriptInfo.lineOffsetToPosition(change.end.line, change.end.offset);
                        return start >= 0 ? { span: { start, length: end - start }, newText: change.newText } : undefined;
                    }),
                })),
                request.arguments.closedFiles,
            );
            return this.requiredResponse(/*response*/ true);
        },
        [protocol.CommandTypes.ApplyChangedToOpenFiles]: (request: protocol.ApplyChangedToOpenFilesRequest) => {
            this.changeSeq++;
            this.projectService.applyChangesInOpenFiles(
                request.arguments.openFiles,
                request.arguments.changedFiles && mapIterator(request.arguments.changedFiles, file => ({
                    fileName: file.fileName,
                    // apply changes in reverse order
                    changes: arrayReverseIterator(file.changes),
                })),
                request.arguments.closedFiles,
            );
            // TODO: report errors
            return this.requiredResponse(/*response*/ true);
        },
        [protocol.CommandTypes.Exit]: () => {
            this.exit();
            return this.notRequired();
        },
        [protocol.CommandTypes.Definition]: (request: protocol.DefinitionRequest) => {
            return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.DefinitionFull]: (request: protocol.DefinitionRequest) => {
            return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.DefinitionAndBoundSpan]: (request: protocol.DefinitionAndBoundSpanRequest) => {
            return this.requiredResponse(this.getDefinitionAndBoundSpan(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.DefinitionAndBoundSpanFull]: (request: protocol.DefinitionAndBoundSpanRequest) => {
            return this.requiredResponse(this.getDefinitionAndBoundSpan(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.FindSourceDefinition]: (request: protocol.FindSourceDefinitionRequest) => {
            return this.requiredResponse(this.findSourceDefinition(request.arguments));
        },
        [protocol.CommandTypes.EmitOutput]: (request: protocol.EmitOutputRequest) => {
            return this.requiredResponse(this.getEmitOutput(request.arguments));
        },
        [protocol.CommandTypes.TypeDefinition]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getTypeDefinition(request.arguments));
        },
        [protocol.CommandTypes.Implementation]: (request: protocol.Request) => {
            return this.requiredResponse(this.getImplementation(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.ImplementationFull]: (request: protocol.Request) => {
            return this.requiredResponse(this.getImplementation(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.References]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.ReferencesFull]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.Rename]: (request: protocol.RenameRequest) => {
            return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.RenameLocationsFull]: (request: protocol.RenameFullRequest) => {
            return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.RenameInfoFull]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getRenameInfo(request.arguments));
        },
        [protocol.CommandTypes.Open]: (request: protocol.OpenRequest) => {
            this.openClientFile(
                toNormalizedPath(request.arguments.file),
                request.arguments.fileContent,
                convertScriptKindName(request.arguments.scriptKindName!), // TODO: GH#18217
                request.arguments.projectRootPath ? toNormalizedPath(request.arguments.projectRootPath) : undefined,
            );
            return this.notRequired();
        },
        [protocol.CommandTypes.Quickinfo]: (request: protocol.QuickInfoRequest) => {
            return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.QuickinfoFull]: (request: protocol.QuickInfoRequest) => {
            return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.GetOutliningSpans]: (request: protocol.FileRequest) => {
            return this.requiredResponse(this.getOutliningSpans(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.GetOutliningSpansFull]: (request: protocol.FileRequest) => {
            return this.requiredResponse(this.getOutliningSpans(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.TodoComments]: (request: protocol.TodoCommentRequest) => {
            return this.requiredResponse(this.getTodoComments(request.arguments));
        },
        [protocol.CommandTypes.Indentation]: (request: protocol.IndentationRequest) => {
            return this.requiredResponse(this.getIndentation(request.arguments));
        },
        [protocol.CommandTypes.NameOrDottedNameSpan]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getNameOrDottedNameSpan(request.arguments));
        },
        [protocol.CommandTypes.BreakpointStatement]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getBreakpointStatement(request.arguments));
        },
        [protocol.CommandTypes.BraceCompletion]: (request: protocol.BraceCompletionRequest) => {
            return this.requiredResponse(this.isValidBraceCompletion(request.arguments));
        },
        [protocol.CommandTypes.DocCommentTemplate]: (request: protocol.DocCommentTemplateRequest) => {
            return this.requiredResponse(this.getDocCommentTemplate(request.arguments));
        },
        [protocol.CommandTypes.GetSpanOfEnclosingComment]: (request: protocol.SpanOfEnclosingCommentRequest) => {
            return this.requiredResponse(this.getSpanOfEnclosingComment(request.arguments));
        },
        [protocol.CommandTypes.FileReferences]: (request: protocol.FileReferencesRequest) => {
            return this.requiredResponse(this.getFileReferences(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.FileReferencesFull]: (request: protocol.FileReferencesRequest) => {
            return this.requiredResponse(this.getFileReferences(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.Format]: (request: protocol.FormatRequest) => {
            return this.requiredResponse(this.getFormattingEditsForRange(request.arguments));
        },
        [protocol.CommandTypes.Formatonkey]: (request: protocol.FormatOnKeyRequest) => {
            return this.requiredResponse(this.getFormattingEditsAfterKeystroke(request.arguments));
        },
        [protocol.CommandTypes.FormatFull]: (request: protocol.FormatRequest) => {
            return this.requiredResponse(this.getFormattingEditsForDocumentFull(request.arguments));
        },
        [protocol.CommandTypes.FormatonkeyFull]: (request: protocol.FormatOnKeyRequest) => {
            return this.requiredResponse(this.getFormattingEditsAfterKeystrokeFull(request.arguments));
        },
        [protocol.CommandTypes.FormatRangeFull]: (request: protocol.FormatRequest) => {
            return this.requiredResponse(this.getFormattingEditsForRangeFull(request.arguments));
        },
        [protocol.CommandTypes.CompletionInfo]: (request: protocol.CompletionsRequest) => {
            return this.requiredResponse(this.getCompletions(request.arguments, protocol.CommandTypes.CompletionInfo));
        },
        [protocol.CommandTypes.Completions]: (request: protocol.CompletionsRequest) => {
            return this.requiredResponse(this.getCompletions(request.arguments, protocol.CommandTypes.Completions));
        },
        [protocol.CommandTypes.CompletionsFull]: (request: protocol.CompletionsRequest) => {
            return this.requiredResponse(this.getCompletions(request.arguments, protocol.CommandTypes.CompletionsFull));
        },
        [protocol.CommandTypes.CompletionDetails]: (request: protocol.CompletionDetailsRequest) => {
            return this.requiredResponse(this.getCompletionEntryDetails(request.arguments, /*fullResult*/ false));
        },
        [protocol.CommandTypes.CompletionDetailsFull]: (request: protocol.CompletionDetailsRequest) => {
            return this.requiredResponse(this.getCompletionEntryDetails(request.arguments, /*fullResult*/ true));
        },
        [protocol.CommandTypes.CompileOnSaveAffectedFileList]: (request: protocol.CompileOnSaveAffectedFileListRequest) => {
            return this.requiredResponse(this.getCompileOnSaveAffectedFileList(request.arguments));
        },
        [protocol.CommandTypes.CompileOnSaveEmitFile]: (request: protocol.CompileOnSaveEmitFileRequest) => {
            return this.requiredResponse(this.emitFile(request.arguments));
        },
        [protocol.CommandTypes.SignatureHelp]: (request: protocol.SignatureHelpRequest) => {
            return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.SignatureHelpFull]: (request: protocol.SignatureHelpRequest) => {
            return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.CompilerOptionsDiagnosticsFull]: (request: protocol.CompilerOptionsDiagnosticsRequest) => {
            return this.requiredResponse(this.getCompilerOptionsDiagnostics(request.arguments));
        },
        [protocol.CommandTypes.EncodedSyntacticClassificationsFull]: (request: protocol.EncodedSyntacticClassificationsRequest) => {
            return this.requiredResponse(this.getEncodedSyntacticClassifications(request.arguments));
        },
        [protocol.CommandTypes.EncodedSemanticClassificationsFull]: (request: protocol.EncodedSemanticClassificationsRequest) => {
            return this.requiredResponse(this.getEncodedSemanticClassifications(request.arguments));
        },
        [protocol.CommandTypes.Cleanup]: () => {
            this.cleanup();
            return this.requiredResponse(/*response*/ true);
        },
        [protocol.CommandTypes.SemanticDiagnosticsSync]: (request: protocol.SemanticDiagnosticsSyncRequest) => {
            return this.requiredResponse(this.getSemanticDiagnosticsSync(request.arguments));
        },
        [protocol.CommandTypes.SyntacticDiagnosticsSync]: (request: protocol.SyntacticDiagnosticsSyncRequest) => {
            return this.requiredResponse(this.getSyntacticDiagnosticsSync(request.arguments));
        },
        [protocol.CommandTypes.SuggestionDiagnosticsSync]: (request: protocol.SuggestionDiagnosticsSyncRequest) => {
            return this.requiredResponse(this.getSuggestionDiagnosticsSync(request.arguments));
        },
        [protocol.CommandTypes.Geterr]: (request: protocol.GeterrRequest) => {
            this.errorCheck.startNew(next => this.getDiagnostics(next, request.arguments.delay, request.arguments.files));
            return this.notRequired();
        },
        [protocol.CommandTypes.GeterrForProject]: (request: protocol.GeterrForProjectRequest) => {
            this.errorCheck.startNew(next => this.getDiagnosticsForProject(next, request.arguments.delay, request.arguments.file));
            return this.notRequired();
        },
        [protocol.CommandTypes.Change]: (request: protocol.ChangeRequest) => {
            this.change(request.arguments);
            return this.notRequired();
        },
        [protocol.CommandTypes.Configure]: (request: protocol.ConfigureRequest) => {
            this.projectService.setHostConfiguration(request.arguments);
            this.doOutput(/*info*/ undefined, protocol.CommandTypes.Configure, request.seq, /*success*/ true);
            return this.notRequired();
        },
        [protocol.CommandTypes.Reload]: (request: protocol.ReloadRequest) => {
            this.reload(request.arguments, request.seq);
            return this.requiredResponse({ reloadFinished: true });
        },
        [protocol.CommandTypes.Saveto]: (request: protocol.Request) => {
            const savetoArgs = request.arguments as protocol.SavetoRequestArgs;
            this.saveToTmp(savetoArgs.file, savetoArgs.tmpfile);
            return this.notRequired();
        },
        [protocol.CommandTypes.Close]: (request: protocol.Request) => {
            const closeArgs = request.arguments as protocol.FileRequestArgs;
            this.closeClientFile(closeArgs.file);
            return this.notRequired();
        },
        [protocol.CommandTypes.Navto]: (request: protocol.NavtoRequest) => {
            return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.NavtoFull]: (request: protocol.NavtoRequest) => {
            return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.Brace]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.BraceFull]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.NavBar]: (request: protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationBarItems(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.NavBarFull]: (request: protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationBarItems(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.NavTree]: (request: protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationTree(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.NavTreeFull]: (request: protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationTree(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.DocumentHighlights]: (request: protocol.DocumentHighlightsRequest) => {
            return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.DocumentHighlightsFull]: (request: protocol.DocumentHighlightsRequest) => {
            return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.CompilerOptionsForInferredProjects]: (request: protocol.SetCompilerOptionsForInferredProjectsRequest) => {
            this.setCompilerOptionsForInferredProjects(request.arguments);
            return this.requiredResponse(/*response*/ true);
        },
        [protocol.CommandTypes.ProjectInfo]: (request: protocol.ProjectInfoRequest) => {
            return this.requiredResponse(this.getProjectInfo(request.arguments));
        },
        [protocol.CommandTypes.ReloadProjects]: () => {
            this.projectService.reloadProjects();
            return this.notRequired();
        },
        [protocol.CommandTypes.JsxClosingTag]: (request: protocol.JsxClosingTagRequest) => {
            return this.requiredResponse(this.getJsxClosingTag(request.arguments));
        },
        [protocol.CommandTypes.LinkedEditingRange]: (request: protocol.LinkedEditingRangeRequest) => {
            return this.requiredResponse(this.getLinkedEditingRange(request.arguments));
        },
        [protocol.CommandTypes.GetCodeFixes]: (request: protocol.CodeFixRequest) => {
            return this.requiredResponse(this.getCodeFixes(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.GetCodeFixesFull]: (request: protocol.CodeFixRequest) => {
            return this.requiredResponse(this.getCodeFixes(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.GetCombinedCodeFix]: (request: protocol.GetCombinedCodeFixRequest) => {
            return this.requiredResponse(this.getCombinedCodeFix(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.GetCombinedCodeFixFull]: (request: protocol.GetCombinedCodeFixRequest) => {
            return this.requiredResponse(this.getCombinedCodeFix(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.ApplyCodeActionCommand]: (request: protocol.ApplyCodeActionCommandRequest) => {
            return this.requiredResponse(this.applyCodeActionCommand(request.arguments));
        },
        [protocol.CommandTypes.GetSupportedCodeFixes]: (request: protocol.GetSupportedCodeFixesRequest) => {
            return this.requiredResponse(this.getSupportedCodeFixes(request.arguments));
        },
        [protocol.CommandTypes.GetApplicableRefactors]: (request: protocol.GetApplicableRefactorsRequest) => {
            return this.requiredResponse(this.getApplicableRefactors(request.arguments));
        },
        [protocol.CommandTypes.GetEditsForRefactor]: (request: protocol.GetEditsForRefactorRequest) => {
            return this.requiredResponse(this.getEditsForRefactor(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.GetMoveToRefactoringFileSuggestions]: (request: protocol.GetMoveToRefactoringFileSuggestionsRequest) => {
            return this.requiredResponse(this.getMoveToRefactoringFileSuggestions(request.arguments));
        },
        [protocol.CommandTypes.GetEditsForRefactorFull]: (request: protocol.GetEditsForRefactorRequest) => {
            return this.requiredResponse(this.getEditsForRefactor(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.OrganizeImports]: (request: protocol.OrganizeImportsRequest) => {
            return this.requiredResponse(this.organizeImports(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.OrganizeImportsFull]: (request: protocol.OrganizeImportsRequest) => {
            return this.requiredResponse(this.organizeImports(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.GetEditsForFileRename]: (request: protocol.GetEditsForFileRenameRequest) => {
            return this.requiredResponse(this.getEditsForFileRename(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.GetEditsForFileRenameFull]: (request: protocol.GetEditsForFileRenameRequest) => {
            return this.requiredResponse(this.getEditsForFileRename(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.ConfigurePlugin]: (request: protocol.ConfigurePluginRequest) => {
            this.configurePlugin(request.arguments);
            this.doOutput(/*info*/ undefined, protocol.CommandTypes.ConfigurePlugin, request.seq, /*success*/ true);
            return this.notRequired();
        },
        [protocol.CommandTypes.SelectionRange]: (request: protocol.SelectionRangeRequest) => {
            return this.requiredResponse(this.getSmartSelectionRange(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.SelectionRangeFull]: (request: protocol.SelectionRangeRequest) => {
            return this.requiredResponse(this.getSmartSelectionRange(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.PrepareCallHierarchy]: (request: protocol.PrepareCallHierarchyRequest) => {
            return this.requiredResponse(this.prepareCallHierarchy(request.arguments));
        },
        [protocol.CommandTypes.ProvideCallHierarchyIncomingCalls]: (request: protocol.ProvideCallHierarchyIncomingCallsRequest) => {
            return this.requiredResponse(this.provideCallHierarchyIncomingCalls(request.arguments));
        },
        [protocol.CommandTypes.ProvideCallHierarchyOutgoingCalls]: (request: protocol.ProvideCallHierarchyOutgoingCallsRequest) => {
            return this.requiredResponse(this.provideCallHierarchyOutgoingCalls(request.arguments));
        },
        [protocol.CommandTypes.ToggleLineComment]: (request: protocol.ToggleLineCommentRequest) => {
            return this.requiredResponse(this.toggleLineComment(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.ToggleLineCommentFull]: (request: protocol.ToggleLineCommentRequest) => {
            return this.requiredResponse(this.toggleLineComment(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.ToggleMultilineComment]: (request: protocol.ToggleMultilineCommentRequest) => {
            return this.requiredResponse(this.toggleMultilineComment(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.ToggleMultilineCommentFull]: (request: protocol.ToggleMultilineCommentRequest) => {
            return this.requiredResponse(this.toggleMultilineComment(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.CommentSelection]: (request: protocol.CommentSelectionRequest) => {
            return this.requiredResponse(this.commentSelection(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.CommentSelectionFull]: (request: protocol.CommentSelectionRequest) => {
            return this.requiredResponse(this.commentSelection(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.UncommentSelection]: (request: protocol.UncommentSelectionRequest) => {
            return this.requiredResponse(this.uncommentSelection(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.UncommentSelectionFull]: (request: protocol.UncommentSelectionRequest) => {
            return this.requiredResponse(this.uncommentSelection(request.arguments, /*simplifiedResult*/ false));
        },
        [protocol.CommandTypes.ProvideInlayHints]: (request: protocol.InlayHintsRequest) => {
            return this.requiredResponse(this.provideInlayHints(request.arguments));
        },
    }));

    public addProtocolHandler(command: string, handler: (request: protocol.Request) => HandlerResponse) {
        if (this.handlers.has(command)) {
            throw new Error(`Protocol handler already exists for command "${command}"`);
        }
        this.handlers.set(command, handler);
    }

    private setCurrentRequest(requestId: number): void {
        Debug.assert(this.currentRequestId === undefined);
        this.currentRequestId = requestId;
        this.cancellationToken.setRequest(requestId);
    }

    private resetCurrentRequest(requestId: number): void {
        Debug.assert(this.currentRequestId === requestId);
        this.currentRequestId = undefined!; // TODO: GH#18217
        this.cancellationToken.resetRequest(requestId);
    }

    public executeWithRequestId<T>(requestId: number, f: () => T) {
        try {
            this.setCurrentRequest(requestId);
            return f();
        }
        finally {
            this.resetCurrentRequest(requestId);
        }
    }

    public executeCommand(request: protocol.Request): HandlerResponse {
        const handler = this.handlers.get(request.command);
        if (handler) {
            const response = this.executeWithRequestId(request.seq, () => handler(request));
            this.projectService.enableRequestedPlugins();
            return response;
        }
        else {
            this.logger.msg(`Unrecognized JSON command:${stringifyIndented(request)}`, Msg.Err);
            this.doOutput(/*info*/ undefined, protocol.CommandTypes.Unknown, request.seq, /*success*/ false, `Unrecognized JSON command: ${request.command}`);
            return { responseRequired: false };
        }
    }

    public onMessage(message: TMessage) {
        this.gcTimer.scheduleCollect();

        this.performanceData = undefined;

        let start: [number, number] | undefined;
        if (this.logger.hasLevel(LogLevel.requestTime)) {
            start = this.hrtime();
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`request:${indent(this.toStringMessage(message))}`);
            }
        }

        let request: protocol.Request | undefined;
        let relevantFile: protocol.FileRequestArgs | undefined;
        try {
            request = this.parseMessage(message);
            relevantFile = request.arguments && (request as protocol.FileRequest).arguments.file ? (request as protocol.FileRequest).arguments : undefined;

            tracing?.instant(tracing.Phase.Session, "request", { seq: request.seq, command: request.command });
            perfLogger?.logStartCommand("" + request.command, this.toStringMessage(message).substring(0, 100));

            tracing?.push(tracing.Phase.Session, "executeCommand", { seq: request.seq, command: request.command }, /*separateBeginAndEnd*/ true);
            const { response, responseRequired } = this.executeCommand(request);
            tracing?.pop();

            if (this.logger.hasLevel(LogLevel.requestTime)) {
                const elapsedTime = hrTimeToMilliseconds(this.hrtime(start)).toFixed(4);
                if (responseRequired) {
                    this.logger.perftrc(`${request.seq}::${request.command}: elapsed time (in milliseconds) ${elapsedTime}`);
                }
                else {
                    this.logger.perftrc(`${request.seq}::${request.command}: async elapsed time (in milliseconds) ${elapsedTime}`);
                }
            }

            // Note: Log before writing the response, else the editor can complete its activity before the server does
            perfLogger?.logStopCommand("" + request.command, "Success");
            tracing?.instant(tracing.Phase.Session, "response", { seq: request.seq, command: request.command, success: !!response });
            if (response) {
                this.doOutput(response, request.command, request.seq, /*success*/ true);
            }
            else if (responseRequired) {
                this.doOutput(/*info*/ undefined, request.command, request.seq, /*success*/ false, "No content available.");
            }
        }
        catch (err) {
            // Cancellation or an error may have left incomplete events on the tracing stack.
            tracing?.popAll();

            if (err instanceof OperationCanceledException) {
                // Handle cancellation exceptions
                perfLogger?.logStopCommand("" + (request && request.command), "Canceled: " + err);
                tracing?.instant(tracing.Phase.Session, "commandCanceled", { seq: request?.seq, command: request?.command });
                this.doOutput({ canceled: true }, request!.command, request!.seq, /*success*/ true);
                return;
            }

            this.logErrorWorker(err, this.toStringMessage(message), relevantFile);
            perfLogger?.logStopCommand("" + (request && request.command), "Error: " + err);
            tracing?.instant(tracing.Phase.Session, "commandError", { seq: request?.seq, command: request?.command, message: (err as Error).message });

            this.doOutput(
                /*info*/ undefined,
                request ? request.command : protocol.CommandTypes.Unknown,
                request ? request.seq : 0,
                /*success*/ false,
                "Error processing request. " + (err as StackTraceError).message + "\n" + (err as StackTraceError).stack,
            );
        }
    }

    protected parseMessage(message: TMessage): protocol.Request {
        return JSON.parse(message as any as string) as protocol.Request;
    }

    protected toStringMessage(message: TMessage): string {
        return message as any as string;
    }

    private getFormatOptions(file: NormalizedPath): FormatCodeSettings {
        return this.projectService.getFormatCodeOptions(file);
    }

    private getPreferences(file: NormalizedPath): protocol.UserPreferences {
        return this.projectService.getPreferences(file);
    }

    private getHostFormatOptions(): FormatCodeSettings {
        return this.projectService.getHostFormatCodeOptions();
    }

    private getHostPreferences(): protocol.UserPreferences {
        return this.projectService.getHostPreferences();
    }
}

interface FileAndProject {
    readonly file: NormalizedPath;
    readonly project: Project;
}

function toProtocolTextSpan(textSpan: TextSpan, scriptInfo: ScriptInfo): protocol.TextSpan {
    return {
        start: scriptInfo.positionToLineOffset(textSpan.start),
        end: scriptInfo.positionToLineOffset(textSpanEnd(textSpan)),
    };
}

function toProtocolTextSpanWithContext(span: TextSpan, contextSpan: TextSpan | undefined, scriptInfo: ScriptInfo): protocol.TextSpanWithContext {
    const textSpan = toProtocolTextSpan(span, scriptInfo);
    const contextTextSpan = contextSpan && toProtocolTextSpan(contextSpan, scriptInfo);
    return contextTextSpan ?
        { ...textSpan, contextStart: contextTextSpan.start, contextEnd: contextTextSpan.end } :
        textSpan;
}

function convertTextChangeToCodeEdit(change: TextChange, scriptInfo: ScriptInfoOrConfig): protocol.CodeEdit {
    return { start: positionToLineOffset(scriptInfo, change.span.start), end: positionToLineOffset(scriptInfo, textSpanEnd(change.span)), newText: change.newText };
}

function positionToLineOffset(info: ScriptInfoOrConfig, position: number): protocol.Location {
    return isConfigFile(info) ? locationFromLineAndCharacter(info.getLineAndCharacterOfPosition(position)) : info.positionToLineOffset(position);
}

function convertLinkedEditInfoToRanges(linkedEdit: LinkedEditingInfo, scriptInfo: ScriptInfo): protocol.LinkedEditingRangesBody {
    const ranges = linkedEdit.ranges.map(
        r => {
            return {
                start: scriptInfo.positionToLineOffset(r.start),
                end: scriptInfo.positionToLineOffset(r.start + r.length),
            };
        },
    );
    if (!linkedEdit.wordPattern) return { ranges };
    return { ranges, wordPattern: linkedEdit.wordPattern };
}

function locationFromLineAndCharacter(lc: LineAndCharacter): protocol.Location {
    return { line: lc.line + 1, offset: lc.character + 1 };
}

function convertNewFileTextChangeToCodeEdit(textChanges: FileTextChanges): protocol.FileCodeEdits {
    Debug.assert(textChanges.textChanges.length === 1);
    const change = first(textChanges.textChanges);
    Debug.assert(change.span.start === 0 && change.span.length === 0);
    return { fileName: textChanges.fileName, textChanges: [{ start: { line: 0, offset: 0 }, end: { line: 0, offset: 0 }, newText: change.newText }] };
}

export interface HandlerResponse {
    response?: {};
    responseRequired?: boolean;
}

/** @internal */
// Exported only for tests
export function getLocationInNewDocument(oldText: string, renameFilename: string, renameLocation: number, edits: readonly FileTextChanges[]): protocol.Location {
    const newText = applyEdits(oldText, renameFilename, edits);
    const { line, character } = computeLineAndCharacterOfPosition(computeLineStarts(newText), renameLocation);
    return { line: line + 1, offset: character + 1 };
}

function applyEdits(text: string, textFilename: string, edits: readonly FileTextChanges[]): string {
    for (const { fileName, textChanges } of edits) {
        if (fileName !== textFilename) {
            continue;
        }

        for (let i = textChanges.length - 1; i >= 0; i--) {
            const { newText, span: { start, length } } = textChanges[i];
            text = text.slice(0, start) + newText + text.slice(start + length);
        }
    }

    return text;
}

function referenceEntryToReferencesResponseItem(projectService: ProjectService, { fileName, textSpan, contextSpan, isWriteAccess, isDefinition }: ReferencedSymbolEntry, { disableLineTextInReferences }: protocol.UserPreferences): protocol.ReferencesResponseItem {
    const scriptInfo = Debug.checkDefined(projectService.getScriptInfo(fileName));
    const span = toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo);
    const lineText = disableLineTextInReferences ? undefined : getLineText(scriptInfo, span);
    return {
        file: fileName,
        ...span,
        lineText,
        isWriteAccess,
        isDefinition,
    };
}

function getLineText(scriptInfo: ScriptInfo, span: protocol.TextSpanWithContext) {
    const lineSpan = scriptInfo.lineToTextSpan(span.start.line - 1);
    return scriptInfo.getSnapshot().getText(lineSpan.start, textSpanEnd(lineSpan)).replace(/\r|\n/g, "");
}

function isCompletionEntryData(data: any): data is CompletionEntryData {
    return data === undefined || data && typeof data === "object"
            && typeof data.exportName === "string"
            && (data.fileName === undefined || typeof data.fileName === "string")
            && (data.ambientModuleName === undefined || typeof data.ambientModuleName === "string"
                    && (data.isPackageJsonImport === undefined || typeof data.isPackageJsonImport === "boolean"));
}
