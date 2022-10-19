namespace ts.server {
interface StackTraceError extends Error {
    stack?: string;
}

export interface ServerCancellationToken extends ts.HostCancellationToken {
    setRequest(requestId: number): void;
    resetRequest(requestId: number): void;
}

export const nullCancellationToken: ServerCancellationToken = {
    isCancellationRequested: () => false,
    setRequest: () => void 0,
    resetRequest: () => void 0
};

function hrTimeToMilliseconds(time: number[]): number {
    const seconds = time[0];
    const nanoseconds = time[1];
    return ((1e9 * seconds) + nanoseconds) / 1000000.0;
}

function isDeclarationFileInJSOnlyNonConfiguredProject(project: ts.server.Project, file: ts.server.NormalizedPath) {
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

    if ((ts.server.isInferredProject(project) || ts.server.isExternalProject(project)) &&
        project.isJsOnlyProject()) {
        const scriptInfo = project.getScriptInfoForNormalizedPath(file);
        return scriptInfo && !scriptInfo.isJavaScript();
    }
    return false;
}


function dtsChangeCanAffectEmit(compilationSettings: ts.CompilerOptions) {
    return ts.getEmitDeclarations(compilationSettings) || !!compilationSettings.emitDecoratorMetadata;
}

function formatDiag(fileName: ts.server.NormalizedPath, project: ts.server.Project, diag: ts.Diagnostic): ts.server.protocol.Diagnostic {
    const scriptInfo = project.getScriptInfoForNormalizedPath(fileName)!; // TODO: GH#18217
    return {
        start: scriptInfo.positionToLineOffset(diag.start!),
        end: scriptInfo.positionToLineOffset(diag.start! + diag.length!), // TODO: GH#18217
        text: ts.flattenDiagnosticMessageText(diag.messageText, "\n"),
        code: diag.code,
        category: ts.diagnosticCategoryName(diag),
        reportsUnnecessary: diag.reportsUnnecessary,
        reportsDeprecated: diag.reportsDeprecated,
        source: diag.source,
        relatedInformation: ts.map(diag.relatedInformation, formatRelatedInformation),
    };
}

function formatRelatedInformation(info: ts.DiagnosticRelatedInformation): ts.server.protocol.DiagnosticRelatedInformation {
    if (!info.file) {
        return {
            message: ts.flattenDiagnosticMessageText(info.messageText, "\n"),
            category: ts.diagnosticCategoryName(info),
            code: info.code
        };
    }
    return {
        span: {
            start: convertToLocation(ts.getLineAndCharacterOfPosition(info.file, info.start!)),
            end: convertToLocation(ts.getLineAndCharacterOfPosition(info.file, info.start! + info.length!)), // TODO: GH#18217
            file: info.file.fileName
        },
        message: ts.flattenDiagnosticMessageText(info.messageText, "\n"),
        category: ts.diagnosticCategoryName(info),
        code: info.code
    };
}

function convertToLocation(lineAndCharacter: ts.LineAndCharacter): ts.server.protocol.Location {
    return { line: lineAndCharacter.line + 1, offset: lineAndCharacter.character + 1 };
}

function formatDiagnosticToProtocol(diag: ts.Diagnostic, includeFileName: true): ts.server.protocol.DiagnosticWithFileName;
function formatDiagnosticToProtocol(diag: ts.Diagnostic, includeFileName: false): ts.server.protocol.Diagnostic;
function formatDiagnosticToProtocol(diag: ts.Diagnostic, includeFileName: boolean): ts.server.protocol.Diagnostic | ts.server.protocol.DiagnosticWithFileName {
    const start = (diag.file && convertToLocation(ts.getLineAndCharacterOfPosition(diag.file, diag.start!)))!; // TODO: GH#18217
    const end = (diag.file && convertToLocation(ts.getLineAndCharacterOfPosition(diag.file, diag.start! + diag.length!)))!; // TODO: GH#18217
    const text = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
    const { code, source } = diag;
    const category = ts.diagnosticCategoryName(diag);
    const common = {
        start,
        end,
        text,
        code,
        category,
        reportsUnnecessary: diag.reportsUnnecessary,
        reportsDeprecated: diag.reportsDeprecated,
        source,
        relatedInformation: ts.map(diag.relatedInformation, formatRelatedInformation),
    };
    return includeFileName
        ? { ...common, fileName: diag.file && diag.file.fileName }
        : common;
}

export interface PendingErrorCheck {
    fileName: ts.server.NormalizedPath;
    project: ts.server.Project;
}

function allEditsBeforePos(edits: readonly ts.TextChange[], pos: number): boolean {
    return edits.every(edit => ts.textSpanEnd(edit.span) < pos);
}

// CommandNames used to be exposed before TS 2.4 as a namespace
// In TS 2.4 we switched to an enum, keep this for backward compatibility
// The var assignment ensures that even though CommandTypes are a const enum
// we want to ensure the value is maintained in the out since the file is
// built using --preseveConstEnum.
export type CommandNames = ts.server.protocol.CommandTypes;
export const CommandNames = (ts.server.protocol as any).CommandTypes;

export function formatMessage<T extends ts.server.protocol.Message>(msg: T, logger: ts.server.Logger, byteLength: (s: string, encoding: string) => number, newLine: string): string {
    const verboseLogging = logger.hasLevel(ts.server.LogLevel.verbose);

    const json = JSON.stringify(msg);
    if (verboseLogging) {
        logger.info(`${msg.type}:${ts.server.indent(json)}`);
    }

    const len = byteLength(json, "utf8");
    return `Content-Length: ${1 + len}\r\n\r\n${json}${newLine}`;
}

/**
 * Allows to schedule next step in multistep operation
 */
interface NextStep {
    immediate(action: () => void): void;
    delay(ms: number, action: () => void): void;
}

/**
 * External capabilities used by multistep operation
 */
interface MultistepOperationHost {
    getCurrentRequestId(): number;
    sendRequestCompletedEvent(requestId: number): void;
    getServerHost(): ts.server.ServerHost;
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

    constructor(private readonly operationHost: MultistepOperationHost) { }

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

    public immediate(action: () => void) {
        const requestId = this.requestId!;
        ts.Debug.assert(requestId === this.operationHost.getCurrentRequestId(), "immediate: incorrect request id");
        this.setImmediateId(this.operationHost.getServerHost().setImmediate(() => {
            this.immediateId = undefined;
            this.operationHost.executeWithRequestId(requestId, () => this.executeAction(action));
        }));
    }

    public delay(ms: number, action: () => void) {
        const requestId = this.requestId!;
        ts.Debug.assert(requestId === this.operationHost.getCurrentRequestId(), "delay: incorrect request id");
        this.setTimerHandle(this.operationHost.getServerHost().setTimeout(() => {
            this.timerHandle = undefined;
            this.operationHost.executeWithRequestId(requestId, () => this.executeAction(action));
        }, ms));
    }

    private executeAction(action: (next: NextStep) => void) {
        let stop = false;
        try {
            if (this.operationHost.isCancellationRequested()) {
                stop = true;
                ts.tracing?.instant(ts.tracing.Phase.Session, "stepCanceled", { seq: this.requestId, early: true });
            }
            else {
                ts.tracing?.push(ts.tracing.Phase.Session, "stepAction", { seq: this.requestId });
                action(this);
                ts.tracing?.pop();
            }
        }
        catch (e) {
            // Cancellation or an error may have left incomplete events on the tracing stack.
            ts.tracing?.popAll();

            stop = true;
            // ignore cancellation request
            if (e instanceof ts.OperationCanceledException) {
                ts.tracing?.instant(ts.tracing.Phase.Session, "stepCanceled", { seq: this.requestId });
            }
            else {
                ts.tracing?.instant(ts.tracing.Phase.Session, "stepError", { seq: this.requestId, message: (e as Error).message });
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
export function toEvent(eventName: string, body: object): ts.server.protocol.Event {
    return {
        seq: 0,
        type: "event",
        event: eventName,
        body
    };
}

type Projects = readonly ts.server.Project[] | {
    readonly projects: readonly ts.server.Project[];
    readonly symLinkedProjects: ts.MultiMap<ts.Path, ts.server.Project>;
};

/**
 * This helper function processes a list of projects and return the concatenated, sortd and deduplicated output of processing each project.
 */
function combineProjectOutput<T, U>(
    defaultValue: T,
    getValue: (path: ts.Path) => T,
    projects: Projects,
    action: (project: ts.server.Project, value: T) => readonly U[] | U | undefined,
): U[] {
    const outputs = ts.flatMapToMutable(ts.isArray(projects) ? projects : projects.projects, project => action(project, defaultValue));
    if (!ts.isArray(projects) && projects.symLinkedProjects) {
        projects.symLinkedProjects.forEach((projects, path) => {
            const value = getValue(path);
            outputs.push(...ts.flatMap(projects, project => action(project, value)));
        });
    }
    return ts.deduplicate(outputs, ts.equateValues);
}

interface ProjectNavigateToItems {
    project: ts.server.Project;
    navigateToItems: readonly ts.NavigateToItem[];
}

function createDocumentSpanSet(): ts.Set<ts.DocumentSpan> {
    return ts.createSet(({textSpan}) => textSpan.start + 100003 * textSpan.length, ts.documentSpansEqual);
}

function getRenameLocationsWorker(
    projects: Projects,
    defaultProject: ts.server.Project,
    initialLocation: ts.DocumentPosition,
    findInStrings: boolean,
    findInComments: boolean,
    { providePrefixAndSuffixTextForRename }: ts.UserPreferences
): readonly ts.RenameLocation[] {
    const perProjectResults = getPerProjectReferences(
        projects,
        defaultProject,
        initialLocation,
        /*isForRename*/ true,
        (project, position) => project.getLanguageService().findRenameLocations(position.fileName, position.pos, findInStrings, findInComments, providePrefixAndSuffixTextForRename),
        (renameLocation, cb) => cb(documentSpanLocation(renameLocation)),
    );

    // No filtering or dedup'ing is required if there's exactly one project
    if (ts.isArray(perProjectResults)) {
        return perProjectResults;
    }

    const results: ts.RenameLocation[] = [];
    const seen = createDocumentSpanSet();

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

function getDefinitionLocation(defaultProject: ts.server.Project, initialLocation: ts.DocumentPosition, isForRename: boolean): ts.DocumentPosition | undefined {
    const infos = defaultProject.getLanguageService().getDefinitionAtPosition(initialLocation.fileName, initialLocation.pos, /*searchOtherFilesOnly*/ false, /*stopAtAlias*/ isForRename);
    const info = infos && ts.firstOrUndefined(infos);
    // Note that the value of `isLocal` may depend on whether or not the checker has run on the containing file
    // (implying that FAR cascading behavior may depend on request order)
    return info && !info.isLocal ? { fileName: info.fileName, pos: info.textSpan.start } : undefined;
}

function getReferencesWorker(
    projects: Projects,
    defaultProject: ts.server.Project,
    initialLocation: ts.DocumentPosition,
    logger: ts.server.Logger,
): readonly ts.ReferencedSymbol[] {
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
    if (ts.isArray(perProjectResults)) {
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
        const knownSymbolSpans = createDocumentSpanSet();
        for (const referencedSymbol of defaultProjectResults) {
            for (const ref of referencedSymbol.references) {
                if (ref.isDefinition) {
                    knownSymbolSpans.add(ref);
                    // One is enough - updateIsDefinitionOfReferencedSymbols will fill out the set based on symbols
                    break;
                }
            }
        }

        const updatedProjects = new ts.Set<ts.server.Project>();
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

    const results: ts.ReferencedSymbol[] = [];
    const seenRefs = createDocumentSpanSet(); // It doesn't make sense to have a reference in two definition lists, so we de-dup globally

    // TODO: We might end up with a more logical allocation of refs to defs if we pre-sorted the defs by descending ref-count.
    // Otherwise, it just ends up attached to the first corresponding def we happen to process.  The others may or may not be
    // dropped later when we check for defs with ref-count 0.
    perProjectResults.forEach((projectResults, project) => {
        for (const referencedSymbol of projectResults) {
            const mappedDefinitionFile = getMappedLocationForProject(documentSpanLocation(referencedSymbol.definition), project);
            const definition: ts.ReferencedSymbolDefinitionInfo = mappedDefinitionFile === undefined ?
                referencedSymbol.definition :
                {
                    ...referencedSymbol.definition,
                    textSpan: ts.createTextSpan(mappedDefinitionFile.pos, referencedSymbol.definition.textSpan.length), // Why would the length be the same in the original?
                    fileName: mappedDefinitionFile.fileName,
                    contextSpan: getMappedContextSpanForProject(referencedSymbol.definition, project)
                };

            let symbolToAddTo = ts.find(results, o => ts.documentSpansEqual(o.definition, definition));
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
    readonly project: ts.server.Project;
    readonly location: ts.DocumentPosition;
}

function forEachProjectInProjects(projects: Projects, path: string | undefined, cb: (project: ts.server.Project, path: string | undefined) => void): void {
    for (const project of ts.isArray(projects) ? projects : projects.projects) {
        cb(project, path);
    }
    if (!ts.isArray(projects) && projects.symLinkedProjects) {
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
    defaultProject: ts.server.Project,
    initialLocation: ts.DocumentPosition,
    isForRename: boolean,
    getResultsForPosition: (project: ts.server.Project, location: ts.DocumentPosition) => readonly TResult[] | undefined,
    forPositionInResult: (result: TResult, cb: (location: ts.DocumentPosition) => void) => void,
): readonly TResult[] | ts.ESMap<ts.server.Project, readonly TResult[]> {
    // If `getResultsForPosition` returns results for a project, they go in here
    const resultsMap = new ts.Map<ts.server.Project, readonly TResult[]>();

    const queue = ts.createQueue<ProjectAndLocation>();

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
    const getGeneratedDefinition = ts.memoize(() => defaultProject.isSourceOfProjectReferenceRedirect(defaultDefinition!.fileName) ?
        defaultDefinition :
        defaultProject.getLanguageService().getSourceMapper().tryGetGeneratedPosition(defaultDefinition!));
    const getSourceDefinition = ts.memoize(() => defaultProject.isSourceOfProjectReferenceRedirect(defaultDefinition!.fileName) ?
        defaultDefinition :
        defaultProject.getLanguageService().getSourceMapper().tryGetSourcePosition(defaultDefinition!));

    // The keys of resultsMap allow us to check which projects have already been searched, but we also
    // maintain a set of strings because that's what `loadAncestorProjectTree` wants.
    const searchedProjectKeys = new ts.Set<string>();

    onCancellation:
    while (!queue.isEmpty()) {
        while (!queue.isEmpty()) {
            if (cancellationToken.isCancellationRequested()) break onCancellation;

            const { project, location } = queue.dequeue();

            if (resultsMap.has(project)) continue;
            if (isLocationProjectReferenceRedirect(project, location)) continue;

            const projectResults = searchPosition(project, location);
            resultsMap.set(project, projectResults ?? ts.server.emptyArray);
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
        const it = resultsMap.values().next();
        ts.Debug.assert(!it.done);
        return it.value;
    }

    return resultsMap;

    function searchPosition(project: ts.server.Project, location: ts.DocumentPosition): readonly TResult[] | undefined {
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
    definition: ts.DocumentPosition,
    project: ts.server.Project,
    getGeneratedDefinition: () => ts.DocumentPosition | undefined,
    getSourceDefinition: () => ts.DocumentPosition | undefined
): ts.DocumentPosition | undefined {
    // If the definition is actually from the project, definition is correct as is
    if (project.containsFile(ts.server.toNormalizedPath(definition.fileName)) &&
        !isLocationProjectReferenceRedirect(project, definition)) {
        return definition;
    }
    const generatedDefinition = getGeneratedDefinition();
    if (generatedDefinition && project.containsFile(ts.server.toNormalizedPath(generatedDefinition.fileName))) return generatedDefinition;
    const sourceDefinition = getSourceDefinition();
    return sourceDefinition && project.containsFile(ts.server.toNormalizedPath(sourceDefinition.fileName)) ? sourceDefinition : undefined;
}

function isLocationProjectReferenceRedirect(project: ts.server.Project, location: ts.DocumentPosition | undefined) {
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

function getProjectKey(project: ts.server.Project) {
    return ts.server.isConfiguredProject(project) ? project.canonicalConfigFilePath : project.getProjectName();
}

function documentSpanLocation({ fileName, textSpan }: ts.DocumentSpan): ts.DocumentPosition {
    return { fileName, pos: textSpan.start };
}

function getMappedLocationForProject(location: ts.DocumentPosition, project: ts.server.Project): ts.DocumentPosition | undefined {
    return ts.getMappedLocation(location, project.getSourceMapper(), p => project.projectService.fileExists(p as ts.server.NormalizedPath));
}

function getMappedDocumentSpanForProject(documentSpan: ts.DocumentSpan, project: ts.server.Project): ts.DocumentSpan | undefined {
    return ts.getMappedDocumentSpan(documentSpan, project.getSourceMapper(), p => project.projectService.fileExists(p as ts.server.NormalizedPath));
}

function getMappedContextSpanForProject(documentSpan: ts.DocumentSpan, project: ts.server.Project): ts.TextSpan | undefined {
    return ts.getMappedContextSpan(documentSpan, project.getSourceMapper(), p => project.projectService.fileExists(p as ts.server.NormalizedPath));
}

const invalidPartialSemanticModeCommands: readonly CommandNames[] = [
    CommandNames.OpenExternalProject,
    CommandNames.OpenExternalProjects,
    CommandNames.CloseExternalProject,
    CommandNames.SynchronizeProjectList,
    CommandNames.EmitOutput,
    CommandNames.CompileOnSaveAffectedFileList,
    CommandNames.CompileOnSaveEmitFile,
    CommandNames.CompilerOptionsDiagnosticsFull,
    CommandNames.EncodedSemanticClassificationsFull,
    CommandNames.SemanticDiagnosticsSync,
    CommandNames.SuggestionDiagnosticsSync,
    CommandNames.GeterrForProject,
    CommandNames.Reload,
    CommandNames.ReloadProjects,
    CommandNames.GetCodeFixes,
    CommandNames.GetCodeFixesFull,
    CommandNames.GetCombinedCodeFix,
    CommandNames.GetCombinedCodeFixFull,
    CommandNames.ApplyCodeActionCommand,
    CommandNames.GetSupportedCodeFixes,
    CommandNames.GetApplicableRefactors,
    CommandNames.GetEditsForRefactor,
    CommandNames.GetEditsForRefactorFull,
    CommandNames.OrganizeImports,
    CommandNames.OrganizeImportsFull,
    CommandNames.GetEditsForFileRename,
    CommandNames.GetEditsForFileRenameFull,
    CommandNames.PrepareCallHierarchy,
    CommandNames.ProvideCallHierarchyIncomingCalls,
    CommandNames.ProvideCallHierarchyOutgoingCalls,
];

const invalidSyntacticModeCommands: readonly CommandNames[] = [
    ...invalidPartialSemanticModeCommands,
    CommandNames.Definition,
    CommandNames.DefinitionFull,
    CommandNames.DefinitionAndBoundSpan,
    CommandNames.DefinitionAndBoundSpanFull,
    CommandNames.TypeDefinition,
    CommandNames.Implementation,
    CommandNames.ImplementationFull,
    CommandNames.References,
    CommandNames.ReferencesFull,
    CommandNames.Rename,
    CommandNames.RenameLocationsFull,
    CommandNames.RenameInfoFull,
    CommandNames.Quickinfo,
    CommandNames.QuickinfoFull,
    CommandNames.CompletionInfo,
    CommandNames.Completions,
    CommandNames.CompletionsFull,
    CommandNames.CompletionDetails,
    CommandNames.CompletionDetailsFull,
    CommandNames.SignatureHelp,
    CommandNames.SignatureHelpFull,
    CommandNames.Navto,
    CommandNames.NavtoFull,
    CommandNames.Occurrences,
    CommandNames.DocumentHighlights,
    CommandNames.DocumentHighlightsFull,
];

export interface SessionOptions {
    host: ts.server.ServerHost;
    cancellationToken: ServerCancellationToken;
    useSingleInferredProject: boolean;
    useInferredProjectPerProjectRoot: boolean;
    typingsInstaller: ts.server.ITypingsInstaller;
    byteLength: (buf: string, encoding?: string) => number;
    hrtime: (start?: number[]) => number[];
    logger: ts.server.Logger;
    /**
     * If falsy, all events are suppressed.
     */
    canUseEvents: boolean;
    eventHandler?: ts.server.ProjectServiceEventHandler;
    /** Has no effect if eventHandler is also specified. */
    suppressDiagnosticEvents?: boolean;
    /** @deprecated use serverMode instead */
    syntaxOnly?: boolean;
    serverMode?: ts.LanguageServiceMode;
    throttleWaitMilliseconds?: number;
    noGetErrOnBackgroundUpdate?: boolean;

    globalPlugins?: readonly string[];
    pluginProbeLocations?: readonly string[];
    allowLocalPluginLoads?: boolean;
    typesMapLocation?: string;
}

export class Session<TMessage = string> implements EventSender {
    private readonly gcTimer: ts.server.GcTimer;
    protected projectService: ts.server.ProjectService;
    private changeSeq = 0;

    private performanceData: ts.server.protocol.PerformanceData | undefined;

    private currentRequestId!: number;
    private errorCheck: MultistepOperation;

    protected host: ts.server.ServerHost;
    private readonly cancellationToken: ServerCancellationToken;
    protected readonly typingsInstaller: ts.server.ITypingsInstaller;
    protected byteLength: (buf: string, encoding?: string) => number;
    private hrtime: (start?: number[]) => number[];
    protected logger: ts.server.Logger;

    protected canUseEvents: boolean;
    private suppressDiagnosticEvents?: boolean;
    private eventHandler: ts.server.ProjectServiceEventHandler | undefined;
    private readonly noGetErrOnBackgroundUpdate?: boolean;

    constructor(opts: SessionOptions) {
        this.host = opts.host;
        this.cancellationToken = opts.cancellationToken;
        this.typingsInstaller = opts.typingsInstaller;
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
            isCancellationRequested: () => this.cancellationToken.isCancellationRequested()
        };
        this.errorCheck = new MultistepOperation(multistepOperationHost);
        const settings: ts.server.ProjectServiceOptions = {
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
            syntaxOnly: opts.syntaxOnly,
            serverMode: opts.serverMode,
            session: this
        };
        this.projectService = new ts.server.ProjectService(settings);
        this.projectService.setPerformanceEventHandler(this.performanceEventHandler.bind(this));
        this.gcTimer = new ts.server.GcTimer(this.host, /*delay*/ 7000, this.logger);

        // Make sure to setup handlers to throw error for not allowed commands on syntax server
        switch (this.projectService.serverMode) {
            case ts.LanguageServiceMode.Semantic:
                break;
            case ts.LanguageServiceMode.PartialSemantic:
                invalidPartialSemanticModeCommands.forEach(commandName =>
                    this.handlers.set(commandName, request => {
                        throw new Error(`Request: ${request.command} not allowed in LanguageServiceMode.PartialSemantic`);
                    })
                );
                break;
            case ts.LanguageServiceMode.Syntactic:
                invalidSyntacticModeCommands.forEach(commandName =>
                    this.handlers.set(commandName, request => {
                        throw new Error(`Request: ${request.command} not allowed in LanguageServiceMode.Syntactic`);
                    })
                );
                break;
            default:
                ts.Debug.assertNever(this.projectService.serverMode);
        }
    }

    private sendRequestCompletedEvent(requestId: number): void {
        this.event<ts.server.protocol.RequestCompletedEventBody>({ request_seq: requestId }, "requestCompleted");
    }

    private addPerformanceData(key: keyof ts.server.protocol.PerformanceData, value: number) {
        if (!this.performanceData) {
            this.performanceData = {};
        }
        this.performanceData[key] = (this.performanceData[key] ?? 0) + value;
    }

    private performanceEventHandler(event: ts.PerformanceEvent) {
        switch (event.kind) {
            case "UpdateGraph":
                this.addPerformanceData("updateGraphDurationMs", event.durationMs);
                break;
            case "CreatePackageJsonAutoImportProvider":
                this.addPerformanceData("createAutoImportProviderProgramDurationMs", event.durationMs);
                break;
        }
    }

    private defaultEventHandler(event: ts.server.ProjectServiceEvent) {
        switch (event.eventName) {
            case ts.server.ProjectsUpdatedInBackgroundEvent:
                const { openFiles } = event.data;
                this.projectsUpdatedInBackgroundEvent(openFiles);
                break;
            case ts.server.ProjectLoadingStartEvent:
                const { project, reason } = event.data;
                this.event<ts.server.protocol.ProjectLoadingStartEventBody>(
                    { projectName: project.getProjectName(), reason },
                    ts.server.ProjectLoadingStartEvent);
                break;
            case ts.server.ProjectLoadingFinishEvent:
                const { project: finishProject } = event.data;
                this.event<ts.server.protocol.ProjectLoadingFinishEventBody>({ projectName: finishProject.getProjectName() }, ts.server.ProjectLoadingFinishEvent);
                break;
            case ts.server.LargeFileReferencedEvent:
                const { file, fileSize, maxFileSize } = event.data;
                this.event<ts.server.protocol.LargeFileReferencedEventBody>({ file, fileSize, maxFileSize }, ts.server.LargeFileReferencedEvent);
                break;
            case ts.server.ConfigFileDiagEvent:
                const { triggerFile, configFileName: configFile, diagnostics } = event.data;
                const bakedDiags = ts.map(diagnostics, diagnostic => formatDiagnosticToProtocol(diagnostic, /*includeFileName*/ true));
                this.event<ts.server.protocol.ConfigFileDiagnosticEventBody>({
                    triggerFile,
                    configFile,
                    diagnostics: bakedDiags
                }, ts.server.ConfigFileDiagEvent);
                break;
            case ts.server.ProjectLanguageServiceStateEvent: {
                const eventName: ts.server.protocol.ProjectLanguageServiceStateEventName = ts.server.ProjectLanguageServiceStateEvent;
                this.event<ts.server.protocol.ProjectLanguageServiceStateEventBody>({
                    projectName: event.data.project.getProjectName(),
                    languageServiceEnabled: event.data.languageServiceEnabled
                }, eventName);
                break;
            }
            case ts.server.ProjectInfoTelemetryEvent: {
                const eventName: ts.server.protocol.TelemetryEventName = "telemetry";
                this.event<ts.server.protocol.TelemetryEventBody>({
                    telemetryEventName: event.eventName,
                    payload: event.data,
                }, eventName);
                break;
            }
        }
    }

    private projectsUpdatedInBackgroundEvent(openFiles: string[]): void {
        this.projectService.logger.info(`got projects updated in background, updating diagnostics for ${openFiles}`);
        if (openFiles.length) {
            if (!this.suppressDiagnosticEvents && !this.noGetErrOnBackgroundUpdate) {
                // For now only queue error checking for open files. We can change this to include non open files as well
                this.errorCheck.startNew(next => this.updateErrorCheck(next, openFiles, 100, /*requireOpen*/ true));
            }

            // Send project changed event
            this.event<ts.server.protocol.ProjectsUpdatedInBackgroundEventBody>({
                openFiles
            }, ts.server.ProjectsUpdatedInBackgroundEvent);
        }
    }

    public logError(err: Error, cmd: string): void {
        this.logErrorWorker(err, cmd);
    }

    private logErrorWorker(err: Error & ts.PossibleProgramFileInfo, cmd: string, fileRequest?: ts.server.protocol.FileRequestArgs): void {
        let msg = "Exception on executing command " + cmd;
        if (err.message) {
            msg += ":\n" + ts.server.indent(err.message);
            if ((err as StackTraceError).stack) {
                msg += "\n" + ts.server.indent((err as StackTraceError).stack!);
            }
        }

        if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
            if (fileRequest) {
                try {
                    const { file, project } = this.getFileAndProject(fileRequest);
                    const scriptInfo = project.getScriptInfoForNormalizedPath(file);
                    if (scriptInfo) {
                        const text = ts.getSnapshotText(scriptInfo.getSnapshot());
                        msg += `\n\nFile text of ${fileRequest.file}:${ts.server.indent(text)}\n`;
                    }
                }
                catch { } // eslint-disable-line no-empty
            }


            if (err.ProgramFiles) {
                msg += `\n\nProgram files: ${JSON.stringify(err.ProgramFiles)}\n`;
                msg += `\n\nProjects::\n`;
                let counter = 0;
                const addProjectInfo = (project: ts.server.Project) => {
                    msg += `\nProject '${project.projectName}' (${ts.server.ProjectKind[project.projectKind]}) ${counter}\n`;
                    msg += project.filesToString(/*writeProjectFileNames*/ true);
                    msg += "\n-----------------------------------------------\n";
                    counter++;
                };
                this.projectService.externalProjects.forEach(addProjectInfo);
                this.projectService.configuredProjects.forEach(addProjectInfo);
                this.projectService.inferredProjects.forEach(addProjectInfo);
            }
        }

        this.logger.msg(msg, ts.server.Msg.Err);
    }

    public send(msg: ts.server.protocol.Message) {
        if (msg.type === "event" && !this.canUseEvents) {
            if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                this.logger.info(`Session does not support events: ignored event: ${JSON.stringify(msg)}`);
            }
            return;
        }
        this.writeMessage(msg);
    }

    protected writeMessage(msg: ts.server.protocol.Message) {
        const msgText = formatMessage(msg, this.logger, this.byteLength, this.host.newLine);
        ts.perfLogger.logEvent(`Response message size: ${msgText.length}`);
        this.host.write(msgText);
    }

    public event<T extends object>(body: T, eventName: string): void {
        this.send(toEvent(eventName, body));
    }

    // For backwards-compatibility only.
    /** @deprecated */
    public output(info: any, cmdName: string, reqSeq?: number, errorMsg?: string): void {
        this.doOutput(info, cmdName, reqSeq!, /*success*/ !errorMsg, errorMsg); // TODO: GH#18217
    }

    private doOutput(info: {} | undefined, cmdName: string, reqSeq: number, success: boolean, message?: string): void {
        const res: ts.server.protocol.Response = {
            seq: 0,
            type: "response",
            command: cmdName,
            request_seq: reqSeq,
            success,
            performanceData: this.performanceData
        };

        if (success) {
            let metadata: unknown;
            if (ts.isArray(info)) {
                res.body = info;
                metadata = (info as ts.WithMetadata<readonly any[]>).metadata;
                delete (info as ts.WithMetadata<readonly any[]>).metadata;
            }
            else if (typeof info === "object") {
                if ((info as ts.WithMetadata<{}>).metadata) {
                    const { metadata: infoMetadata, ...body } = (info as ts.WithMetadata<{}>);
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
            ts.Debug.assert(info === undefined);
        }
        if (message) {
            res.message = message;
        }
        this.send(res);
    }

    private semanticCheck(file: ts.server.NormalizedPath, project: ts.server.Project) {
        ts.tracing?.push(ts.tracing.Phase.Session, "semanticCheck", { file, configFilePath: (project as ts.server.ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        const diags = isDeclarationFileInJSOnlyNonConfiguredProject(project, file)
            ? ts.server.emptyArray
            : project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file);
        this.sendDiagnosticsEvent(file, project, diags, "semanticDiag");
        ts.tracing?.pop();
    }

    private syntacticCheck(file: ts.server.NormalizedPath, project: ts.server.Project) {
        ts.tracing?.push(ts.tracing.Phase.Session, "syntacticCheck", { file, configFilePath: (project as ts.server.ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        this.sendDiagnosticsEvent(file, project, project.getLanguageService().getSyntacticDiagnostics(file), "syntaxDiag");
        ts.tracing?.pop();
    }

    private suggestionCheck(file: ts.server.NormalizedPath, project: ts.server.Project) {
        ts.tracing?.push(ts.tracing.Phase.Session, "suggestionCheck", { file, configFilePath: (project as ts.server.ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        this.sendDiagnosticsEvent(file, project, project.getLanguageService().getSuggestionDiagnostics(file), "suggestionDiag");
        ts.tracing?.pop();
    }

    private sendDiagnosticsEvent(file: ts.server.NormalizedPath, project: ts.server.Project, diagnostics: readonly ts.Diagnostic[], kind: ts.server.protocol.DiagnosticEventKind): void {
        try {
            this.event<ts.server.protocol.DiagnosticEventBody>({ file, diagnostics: diagnostics.map(diag => formatDiag(file, project, diag)) }, kind);
        }
        catch (err) {
            this.logError(err, kind);
        }
    }

    /** It is the caller's responsibility to verify that `!this.suppressDiagnosticEvents`. */
    private updateErrorCheck(next: NextStep, checkList: readonly string[] | readonly PendingErrorCheck[], ms: number, requireOpen = true) {
        ts.Debug.assert(!this.suppressDiagnosticEvents); // Caller's responsibility

        const seq = this.changeSeq;
        const followMs = Math.min(ms, 200);

        let index = 0;
        const goNext = () => {
            index++;
            if (checkList.length > index) {
                next.delay(followMs, checkOne);
            }
        };
        const checkOne = () => {
            if (this.changeSeq !== seq) {
                return;
            }

            let item: string | PendingErrorCheck | undefined = checkList[index];
            if (ts.isString(item)) {
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
            ts.server.updateProjectIfDirty(project);
            if (!project.containsFile(fileName, requireOpen)) {
                return;
            }

            this.syntacticCheck(fileName, project);
            if (this.changeSeq !== seq) {
                return;
            }

            // Don't provide semantic diagnostics unless we're in full semantic mode.
            if (project.projectService.serverMode !== ts.LanguageServiceMode.Semantic) {
                goNext();
                return;
            }
            next.immediate(() => {
                this.semanticCheck(fileName, project);
                if (this.changeSeq !== seq) {
                    return;
                }

                if (this.getPreferences(fileName).disableSuggestions) {
                    goNext();
                    return;
                }
                next.immediate(() => {
                    this.suggestionCheck(fileName, project);
                    goNext();
                });
            });
        };

        if (checkList.length > index && this.changeSeq === seq) {
            next.delay(ms, checkOne);
        }
    }

    private cleanProjects(caption: string, projects: ts.server.Project[]) {
        if (!projects) {
            return;
        }
        this.logger.info(`cleaning ${caption}`);
        for (const p of projects) {
            p.getLanguageService(/*ensureSynchronized*/ false).cleanupSemanticCache();
        }
    }

    private cleanup() {
        this.cleanProjects("inferred projects", this.projectService.inferredProjects);
        this.cleanProjects("configured projects", ts.arrayFrom(this.projectService.configuredProjects.values()));
        this.cleanProjects("external projects", this.projectService.externalProjects);
        if (this.host.gc) {
            this.logger.info(`host.gc()`);
            this.host.gc();
        }
    }

    private getEncodedSyntacticClassifications(args: ts.server.protocol.EncodedSyntacticClassificationsRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        return languageService.getEncodedSyntacticClassifications(file, args);
    }

    private getEncodedSemanticClassifications(args: ts.server.protocol.EncodedSemanticClassificationsRequestArgs) {
        const { file, project } = this.getFileAndProject(args);
        const format = args.format === "2020" ? ts.SemanticClassificationFormat.TwentyTwenty : ts.SemanticClassificationFormat.Original;
        return project.getLanguageService().getEncodedSemanticClassifications(file, args, format);
    }

    private getProject(projectFileName: string | undefined): ts.server.Project | undefined {
        return projectFileName === undefined ? undefined : this.projectService.findProject(projectFileName);
    }

    private getConfigFileAndProject(args: ts.server.protocol.FileRequestArgs): { configFile: ts.server.NormalizedPath | undefined, project: ts.server.Project | undefined } {
        const project = this.getProject(args.projectFileName);
        const file = ts.server.toNormalizedPath(args.file);

        return {
            configFile: project && project.hasConfigFile(file) ? file : undefined,
            project
        };
    }

    private getConfigFileDiagnostics(configFile: ts.server.NormalizedPath, project: ts.server.Project, includeLinePosition: boolean) {
        const projectErrors = project.getAllProjectErrors();
        const optionsErrors = project.getLanguageService().getCompilerOptionsDiagnostics();
        const diagnosticsForConfigFile = ts.filter(
            ts.concatenate(projectErrors, optionsErrors),
            diagnostic => !!diagnostic.file && diagnostic.file.fileName === configFile
        );
        return includeLinePosition ?
            this.convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnosticsForConfigFile) :
            ts.map(
                diagnosticsForConfigFile,
                diagnostic => formatDiagnosticToProtocol(diagnostic, /*includeFileName*/ false)
            );
    }

    private convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnostics: readonly ts.Diagnostic[]): ts.server.protocol.DiagnosticWithLinePosition[] {
        return diagnostics.map<ts.server.protocol.DiagnosticWithLinePosition>(d => ({
            message: ts.flattenDiagnosticMessageText(d.messageText, this.host.newLine),
            start: d.start!, // TODO: GH#18217
            length: d.length!, // TODO: GH#18217
            category: ts.diagnosticCategoryName(d),
            code: d.code,
            source: d.source,
            startLocation: (d.file && convertToLocation(ts.getLineAndCharacterOfPosition(d.file, d.start!)))!, // TODO: GH#18217
            endLocation: (d.file && convertToLocation(ts.getLineAndCharacterOfPosition(d.file, d.start! + d.length!)))!, // TODO: GH#18217
            reportsUnnecessary: d.reportsUnnecessary,
            reportsDeprecated: d.reportsDeprecated,
            relatedInformation: ts.map(d.relatedInformation, formatRelatedInformation)
        }));
    }

    private getCompilerOptionsDiagnostics(args: ts.server.protocol.CompilerOptionsDiagnosticsRequestArgs) {
        const project = this.getProject(args.projectFileName)!;
        // Get diagnostics that dont have associated file with them
        // The diagnostics which have file would be in config file and
        // would be reported as part of configFileDiagnostics
        return this.convertToDiagnosticsWithLinePosition(
            ts.filter(
                project.getLanguageService().getCompilerOptionsDiagnostics(),
                diagnostic => !diagnostic.file
            ),
            /*scriptInfo*/ undefined
        );
    }

    private convertToDiagnosticsWithLinePosition(diagnostics: readonly ts.Diagnostic[], scriptInfo: ts.server.ScriptInfo | undefined): ts.server.protocol.DiagnosticWithLinePosition[] {
        return diagnostics.map(d => ({
            message: ts.flattenDiagnosticMessageText(d.messageText, this.host.newLine),
            start: d.start,
            length: d.length,
            category: ts.diagnosticCategoryName(d),
            code: d.code,
            source: d.source,
            startLocation: scriptInfo && scriptInfo.positionToLineOffset(d.start!), // TODO: GH#18217
            endLocation: scriptInfo && scriptInfo.positionToLineOffset(d.start! + d.length!),
            reportsUnnecessary: d.reportsUnnecessary,
            reportsDeprecated: d.reportsDeprecated,
            relatedInformation: ts.map(d.relatedInformation, formatRelatedInformation),
        }) as ts.server.protocol.DiagnosticWithLinePosition);
    }

    private getDiagnosticsWorker(
        args: ts.server.protocol.FileRequestArgs, isSemantic: boolean, selector: (project: ts.server.Project, file: string) => readonly ts.Diagnostic[], includeLinePosition: boolean
    ): readonly ts.server.protocol.DiagnosticWithLinePosition[] | readonly ts.server.protocol.Diagnostic[] {
        const { project, file } = this.getFileAndProject(args);
        if (isSemantic && isDeclarationFileInJSOnlyNonConfiguredProject(project, file)) {
            return ts.server.emptyArray;
        }
        const scriptInfo = project.getScriptInfoForNormalizedPath(file);
        const diagnostics = selector(project, file);
        return includeLinePosition
            ? this.convertToDiagnosticsWithLinePosition(diagnostics, scriptInfo)
            : diagnostics.map(d => formatDiag(file, project, d));
    }

    private getDefinition(args: ts.server.protocol.FileLocationRequestArgs, simplifiedResult: boolean): readonly ts.server.protocol.FileSpanWithContext[] | readonly ts.DefinitionInfo[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const definitions = this.mapDefinitionInfoLocations(project.getLanguageService().getDefinitionAtPosition(file, position) || ts.server.emptyArray, project);
        return simplifiedResult ? this.mapDefinitionInfo(definitions, project) : definitions.map(Session.mapToOriginalLocation);
    }

    private mapDefinitionInfoLocations(definitions: readonly ts.DefinitionInfo[], project: ts.server.Project): readonly ts.DefinitionInfo[] {
        return definitions.map((info): ts.DefinitionInfo => {
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

    private getDefinitionAndBoundSpan(args: ts.server.protocol.FileLocationRequestArgs, simplifiedResult: boolean): ts.server.protocol.DefinitionInfoAndBoundSpan | ts.DefinitionInfoAndBoundSpan {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const scriptInfo = ts.Debug.checkDefined(project.getScriptInfo(file));

        const unmappedDefinitionAndBoundSpan = project.getLanguageService().getDefinitionAndBoundSpan(file, position);

        if (!unmappedDefinitionAndBoundSpan || !unmappedDefinitionAndBoundSpan.definitions) {
            return {
                definitions: ts.server.emptyArray,
                textSpan: undefined! // TODO: GH#18217
            };
        }

        const definitions = this.mapDefinitionInfoLocations(unmappedDefinitionAndBoundSpan.definitions, project);
        const { textSpan } = unmappedDefinitionAndBoundSpan;

        if (simplifiedResult) {
            return {
                definitions: this.mapDefinitionInfo(definitions, project),
                textSpan: toProtocolTextSpan(textSpan, scriptInfo)
            };
        }

        return {
            definitions: definitions.map(Session.mapToOriginalLocation),
            textSpan,
        };
    }

    private findSourceDefinition(args: ts.server.protocol.FileLocationRequestArgs): readonly ts.server.protocol.DefinitionInfo[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const unmappedDefinitions = project.getLanguageService().getDefinitionAtPosition(file, position);
        let definitions: readonly ts.DefinitionInfo[] = this.mapDefinitionInfoLocations(unmappedDefinitions || ts.server.emptyArray, project).slice();
        const needsJsResolution = this.projectService.serverMode === ts.LanguageServiceMode.Semantic && (
            !ts.some(definitions, d => ts.server.toNormalizedPath(d.fileName) !== file && !d.isAmbient) ||
            ts.some(definitions, d => !!d.failedAliasResolution));

        if (needsJsResolution) {
            const definitionSet = ts.createSet<ts.DefinitionInfo>(d => d.textSpan.start, ts.documentSpansEqual);
            definitions?.forEach(d => definitionSet.add(d));
            const noDtsProject = project.getNoDtsResolutionProject([file]);
            const ls = noDtsProject.getLanguageService();
            const jsDefinitions = ls.getDefinitionAtPosition(file, position, /*searchOtherFilesOnly*/ true, /*stopAtAlias*/ false)
                ?.filter(d => ts.server.toNormalizedPath(d.fileName) !== file);
            if (ts.some(jsDefinitions)) {
                for (const jsDefinition of jsDefinitions) {
                    if (jsDefinition.unverified) {
                        const refined = tryRefineDefinition(jsDefinition, project.getLanguageService().getProgram()!, ls.getProgram()!);
                        if (ts.some(refined)) {
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
                const ambientCandidates = definitions.filter(d => ts.server.toNormalizedPath(d.fileName) !== file && d.isAmbient);
                for (const candidate of ts.some(ambientCandidates) ? ambientCandidates : getAmbientCandidatesByClimbingAccessChain()) {
                    const fileNameToSearch = findImplementationFileFromDtsFileName(candidate.fileName, file, noDtsProject);
                    if (!fileNameToSearch || !ensureRoot(noDtsProject, fileNameToSearch)) {
                        continue;
                    }
                    const noDtsProgram = ls.getProgram()!;
                    const fileToSearch = ts.Debug.checkDefined(noDtsProgram.getSourceFile(fileNameToSearch));
                    for (const match of searchForDeclaration(candidate.name, fileToSearch, noDtsProgram)) {
                        definitionSet.add(match);
                    }
                }
            }
            definitions = ts.arrayFrom(definitionSet.values());
        }

        definitions = definitions.filter(d => !d.isAmbient && !d.failedAliasResolution);
        return this.mapDefinitionInfo(definitions, project);

        function findImplementationFileFromDtsFileName(fileName: string, resolveFromFile: string, auxiliaryProject: ts.server.Project) {
            const nodeModulesPathParts = ts.getNodeModulePathParts(fileName);
            if (nodeModulesPathParts && fileName.lastIndexOf(ts.nodeModulesPathPart) === nodeModulesPathParts.topLevelNodeModulesIndex) {
                // Second check ensures the fileName only contains one `/node_modules/`. If there's more than one I give up.
                const packageDirectory = fileName.substring(0, nodeModulesPathParts.packageRootIndex);
                const packageJsonCache = project.getModuleResolutionCache()?.getPackageJsonInfoCache();
                const compilerOptions = project.getCompilationSettings();
                const packageJson = ts.getPackageScopeForPath(ts.getNormalizedAbsolutePath(packageDirectory + "/package.json", project.getCurrentDirectory()), ts.getTemporaryModuleResolutionState(packageJsonCache, project, compilerOptions));
                if (!packageJson) return undefined;
                // Use fake options instead of actual compiler options to avoid following export map if the project uses node16 or nodenext -
                // Mapping from an export map entry across packages is out of scope for now. Returned entrypoints will only be what can be
                // resolved from the package root under --moduleResolution node
                const entrypoints = ts.getEntrypointsFromPackageJsonInfo(
                    packageJson,
                    { moduleResolution: ts.ModuleResolutionKind.NodeJs },
                    project,
                    project.getModuleResolutionCache());
                // This substring is correct only because we checked for a single `/node_modules/` at the top.
                const packageNamePathPart = fileName.substring(
                    nodeModulesPathParts.topLevelPackageNameIndex + 1,
                    nodeModulesPathParts.packageRootIndex);
                const packageName = ts.getPackageNameFromTypesPackageName(ts.unmangleScopedPackageName(packageNamePathPart));
                const path = project.toPath(fileName);
                if (entrypoints && ts.some(entrypoints, e => project.toPath(e) === path)) {
                    // This file was the main entrypoint of a package. Try to resolve that same package name with
                    // the auxiliary project that only resolves to implementation files.
                    const [implementationResolution] = auxiliaryProject.resolveModuleNames([packageName], resolveFromFile);
                    return implementationResolution?.resolvedFileName;
                }
                else {
                    // It wasn't the main entrypoint but we are in node_modules. Try a subpath into the package.
                    const pathToFileInPackage = fileName.substring(nodeModulesPathParts.packageRootIndex + 1);
                    const specifier = `${packageName}/${ts.removeFileExtension(pathToFileInPackage)}`;
                    const [implementationResolution] = auxiliaryProject.resolveModuleNames([specifier], resolveFromFile);
                    return implementationResolution?.resolvedFileName;
                }
            }
            // We're not in node_modules, and we only get to this function if non-dts module resolution failed.
            // I'm not sure what else I can do here that isn't already covered by that module resolution.
            return undefined;
        }

        // In 'foo.bar./**/baz', if we got not results on 'baz', see if we can get an ambient definition
        // for 'bar' or 'foo' (in that order) so we can search for declarations of 'baz' later.
        function getAmbientCandidatesByClimbingAccessChain(): readonly { name: string, fileName: string }[] {
            const ls = project.getLanguageService();
            const program = ls.getProgram()!;
            const initialNode = ts.getTouchingPropertyName(program.getSourceFile(file)!, position);
            if ((ts.isStringLiteralLike(initialNode) || ts.isIdentifier(initialNode)) && ts.isAccessExpression(initialNode.parent)) {
                return ts.forEachNameInAccessChainWalkingLeft(initialNode, nameInChain => {
                    if (nameInChain === initialNode) return undefined;
                    const candidates = ls.getDefinitionAtPosition(file, nameInChain.getStart(), /*searchOtherFilesOnly*/ true, /*stopAtAlias*/ false)
                        ?.filter(d => ts.server.toNormalizedPath(d.fileName) !== file && d.isAmbient)
                        .map(d => ({
                            fileName: d.fileName,
                            name: ts.getTextOfIdentifierOrLiteral(initialNode)
                        }));
                    if (ts.some(candidates)) {
                        return candidates;
                    }
                }) || ts.server.emptyArray;
            }
            return ts.server.emptyArray;
        }

        function tryRefineDefinition(definition: ts.DefinitionInfo, program: ts.Program, noDtsProgram: ts.Program) {
            const fileToSearch = noDtsProgram.getSourceFile(definition.fileName);
            if (!fileToSearch) {
                return undefined;
            }
            const initialNode = ts.getTouchingPropertyName(program.getSourceFile(file)!, position);
            const symbol = program.getTypeChecker().getSymbolAtLocation(initialNode);
            const importSpecifier = symbol && ts.getDeclarationOfKind<ts.ImportSpecifier>(symbol, ts.SyntaxKind.ImportSpecifier);
            if (!importSpecifier) return undefined;

            const nameToSearch = importSpecifier.propertyName?.text || importSpecifier.name.text;
            return searchForDeclaration(nameToSearch, fileToSearch, noDtsProgram);
        }

        function searchForDeclaration(declarationName: string, fileToSearch: ts.SourceFile, noDtsProgram: ts.Program) {
            const matches = ts.FindAllReferences.Core.getTopMostDeclarationNamesInFile(declarationName, fileToSearch);
            return ts.mapDefined(matches, match => {
                const symbol = noDtsProgram.getTypeChecker().getSymbolAtLocation(match);
                const decl = ts.getDeclarationFromName(match);
                if (symbol && decl) {
                    // I think the last argument to this is supposed to be the start node, but it doesn't seem important.
                    // Callers internal to GoToDefinition already get confused about this.
                    return ts.GoToDefinition.createDefinitionInfo(decl, noDtsProgram.getTypeChecker(), symbol, decl, /*unverified*/ true);
                }
            });
        }

        function ensureRoot(project: ts.server.Project, fileName: string) {
            const info = project.getScriptInfo(fileName);
            if (!info) return false;
            if (!project.containsScriptInfo(info)) {
                project.addRoot(info);
                project.updateGraph();
            }
            return true;
        }
    }

    private getEmitOutput(args: ts.server.protocol.EmitOutputRequestArgs): ts.EmitOutput | ts.server.protocol.EmitOutput {
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
                    result.diagnostics.map(d => formatDiagnosticToProtocol(d, /*includeFileName*/ true))
            } :
            result;
    }

    private mapJSDocTagInfo(tags: ts.JSDocTagInfo[] | undefined, project: ts.server.Project, richResponse: boolean): ts.server.protocol.JSDocTagInfo[] {
        return tags ? tags.map(tag => ({
            ...tag,
            text: richResponse ? this.mapDisplayParts(tag.text, project) : tag.text?.map(part => part.text).join("")
        })) : [];
    }

    private mapDisplayParts(parts: ts.SymbolDisplayPart[] | undefined, project: ts.server.Project): ts.server.protocol.SymbolDisplayPart[] {
        if (!parts) {
            return [];
        }
        return parts.map(part => part.kind !== "linkName" ? part : {
            ...part,
            target: this.toFileSpan((part as ts.JSDocLinkDisplayPart).target.fileName, (part as ts.JSDocLinkDisplayPart).target.textSpan, project),
        });
    }

    private mapSignatureHelpItems(items: ts.SignatureHelpItem[], project: ts.server.Project, richResponse: boolean): ts.server.protocol.SignatureHelpItem[] {
        return items.map(item => ({
            ...item,
            documentation: this.mapDisplayParts(item.documentation, project),
            parameters: item.parameters.map(p => ({ ...p, documentation: this.mapDisplayParts(p.documentation, project) })),
            tags: this.mapJSDocTagInfo(item.tags, project, richResponse),
        }));
    }

    private mapDefinitionInfo(definitions: readonly ts.DefinitionInfo[], project: ts.server.Project): readonly ts.server.protocol.DefinitionInfo[] {
        return definitions.map(def => ({ ...this.toFileSpanWithContext(def.fileName, def.textSpan, def.contextSpan, project), ...def.unverified && { unverified: def.unverified } }));
    }

    /*
     * When we map a .d.ts location to .ts, Visual Studio gets confused because there's no associated Roslyn Document in
     * the same project which corresponds to the file. VS Code has no problem with this, and luckily we have two protocols.
     * This retains the existing behavior for the "simplified" (VS Code) protocol but stores the .d.ts location in a
     * set of additional fields, and does the reverse for VS (store the .d.ts location where
     * it used to be and stores the .ts location in the additional fields).
    */
    private static mapToOriginalLocation<T extends ts.DocumentSpan>(def: T): T {
        if (def.originalFileName) {
            ts.Debug.assert(def.originalTextSpan !== undefined, "originalTextSpan should be present if originalFileName is");
            return {
                ...def as any,
                fileName: def.originalFileName,
                textSpan: def.originalTextSpan,
                targetFileName: def.fileName,
                targetTextSpan: def.textSpan,
                contextSpan: def.originalContextSpan,
                targetContextSpan: def.contextSpan
            };
        }
        return def;
    }

    private toFileSpan(fileName: string, textSpan: ts.TextSpan, project: ts.server.Project): ts.server.protocol.FileSpan {
        const ls = project.getLanguageService();
        const start = ls.toLineColumnOffset!(fileName, textSpan.start); // TODO: GH#18217
        const end = ls.toLineColumnOffset!(fileName, ts.textSpanEnd(textSpan));

        return {
            file: fileName,
            start: { line: start.line + 1, offset: start.character + 1 },
            end: { line: end.line + 1, offset: end.character + 1 }
        };
    }

    private toFileSpanWithContext(fileName: string, textSpan: ts.TextSpan, contextSpan: ts.TextSpan | undefined, project: ts.server.Project): ts.server.protocol.FileSpanWithContext {
        const fileSpan = this.toFileSpan(fileName, textSpan, project);
        const context = contextSpan && this.toFileSpan(fileName, contextSpan, project);
        return context ?
            { ...fileSpan, contextStart: context.start, contextEnd: context.end } :
            fileSpan;
    }

    private getTypeDefinition(args: ts.server.protocol.FileLocationRequestArgs): readonly ts.server.protocol.FileSpanWithContext[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);

        const definitions = this.mapDefinitionInfoLocations(project.getLanguageService().getTypeDefinitionAtPosition(file, position) || ts.server.emptyArray, project);
        return this.mapDefinitionInfo(definitions, project);
    }

    private mapImplementationLocations(implementations: readonly ts.ImplementationLocation[], project: ts.server.Project): readonly ts.ImplementationLocation[] {
        return implementations.map((info): ts.ImplementationLocation => {
            const newDocumentSpan = getMappedDocumentSpanForProject(info, project);
            return !newDocumentSpan ? info : {
                ...newDocumentSpan,
                kind: info.kind,
                displayParts: info.displayParts,
            };
        });
    }

    private getImplementation(args: ts.server.protocol.FileLocationRequestArgs, simplifiedResult: boolean): readonly ts.server.protocol.FileSpanWithContext[] | readonly ts.ImplementationLocation[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const implementations = this.mapImplementationLocations(project.getLanguageService().getImplementationAtPosition(file, position) || ts.server.emptyArray, project);
        return simplifiedResult ?
            implementations.map(({ fileName, textSpan, contextSpan }) => this.toFileSpanWithContext(fileName, textSpan, contextSpan, project)) :
            implementations.map(Session.mapToOriginalLocation);
    }

    private getOccurrences(args: ts.server.protocol.FileLocationRequestArgs): readonly ts.server.protocol.OccurrencesResponseItem[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const occurrences = project.getLanguageService().getOccurrencesAtPosition(file, position);
        return occurrences ?
            occurrences.map<ts.server.protocol.OccurrencesResponseItem>(occurrence => {
                const { fileName, isWriteAccess, textSpan, isInString, contextSpan } = occurrence;
                const scriptInfo = project.getScriptInfo(fileName)!;
                return {
                    ...toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo),
                    file: fileName,
                    isWriteAccess,
                    ...(isInString ? { isInString } : undefined)
                };
            }) :
            ts.server.emptyArray;
    }

    private getSyntacticDiagnosticsSync(args: ts.server.protocol.SyntacticDiagnosticsSyncRequestArgs) {
        const { configFile } = this.getConfigFileAndProject(args);
        if (configFile) {
            // all the config file errors are reported as part of semantic check so nothing to report here
            return ts.server.emptyArray;
        }

        return this.getDiagnosticsWorker(args, /*isSemantic*/ false, (project, file) => project.getLanguageService().getSyntacticDiagnostics(file), !!args.includeLinePosition);
    }

    private getSemanticDiagnosticsSync(args: ts.server.protocol.SemanticDiagnosticsSyncRequestArgs) {
        const { configFile, project } = this.getConfigFileAndProject(args);
        if (configFile) {
            return this.getConfigFileDiagnostics(configFile, project!, !!args.includeLinePosition); // TODO: GH#18217
        }
        return this.getDiagnosticsWorker(args, /*isSemantic*/ true, (project, file) => project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file), !!args.includeLinePosition);
    }

    private getSuggestionDiagnosticsSync(args: ts.server.protocol.SuggestionDiagnosticsSyncRequestArgs) {
        const { configFile } = this.getConfigFileAndProject(args);
        if (configFile) {
            // Currently there are no info diagnostics for config files.
            return ts.server.emptyArray;
        }
        // isSemantic because we don't want to info diagnostics in declaration files for JS-only users
        return this.getDiagnosticsWorker(args, /*isSemantic*/ true, (project, file) => project.getLanguageService().getSuggestionDiagnostics(file), !!args.includeLinePosition);
    }

    private getJsxClosingTag(args: ts.server.protocol.JsxClosingTagRequestArgs): ts.TextInsertion | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        const tag = languageService.getJsxClosingTagAtPosition(file, position);
        return tag === undefined ? undefined : { newText: tag.newText, caretOffset: 0 };
    }

    private getDocumentHighlights(args: ts.server.protocol.DocumentHighlightsRequestArgs, simplifiedResult: boolean): readonly ts.server.protocol.DocumentHighlightsItem[] | readonly ts.DocumentHighlights[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const documentHighlights = project.getLanguageService().getDocumentHighlights(file, position, args.filesToSearch);

        if (!documentHighlights) return ts.server.emptyArray;
        if (!simplifiedResult) return documentHighlights;

        return documentHighlights.map<ts.server.protocol.DocumentHighlightsItem>(({ fileName, highlightSpans }) => {
            const scriptInfo = project.getScriptInfo(fileName)!;
            return {
                file: fileName,
                highlightSpans: highlightSpans.map(({ textSpan, kind, contextSpan }) => ({
                    ...toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo),
                    kind
                }))
            };
        });
    }

    private provideInlayHints(args: ts.server.protocol.InlayHintsRequestArgs): readonly ts.server.protocol.InlayHintItem[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const hints = project.getLanguageService().provideInlayHints(file, args, this.getPreferences(file));

        return hints.map(hint => ({
            ...hint,
            position: scriptInfo.positionToLineOffset(hint.position),
        }));
    }

    private setCompilerOptionsForInferredProjects(args: ts.server.protocol.SetCompilerOptionsForInferredProjectsArgs): void {
        this.projectService.setCompilerOptionsForInferredProjects(args.options, args.projectRootPath);
    }

    private getProjectInfo(args: ts.server.protocol.ProjectInfoRequestArgs): ts.server.protocol.ProjectInfo {
        return this.getProjectInfoWorker(args.file, args.projectFileName, args.needFileNameList, /*excludeConfigFiles*/ false);
    }

    private getProjectInfoWorker(uncheckedFileName: string, projectFileName: string | undefined, needFileNameList: boolean, excludeConfigFiles: boolean) {
        const { project } = this.getFileAndProjectWorker(uncheckedFileName, projectFileName);
        ts.server.updateProjectIfDirty(project);
        const projectInfo = {
            configFileName: project.getProjectName(),
            languageServiceDisabled: !project.languageServiceEnabled,
            fileNames: needFileNameList ? project.getFileNames(/*excludeFilesFromExternalLibraries*/ false, excludeConfigFiles) : undefined
        };
        return projectInfo;
    }

    private getRenameInfo(args: ts.server.protocol.FileLocationRequestArgs): ts.RenameInfo {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const preferences = this.getPreferences(file);
        return project.getLanguageService().getRenameInfo(file, position, preferences);
    }

    private getProjects(args: ts.server.protocol.FileRequestArgs, getScriptInfoEnsuringProjectsUptoDate?: boolean, ignoreNoProjectError?: boolean): Projects {
        let projects: readonly ts.server.Project[] | undefined;
        let symLinkedProjects: ts.MultiMap<ts.Path, ts.server.Project> | undefined;
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
                if (ignoreNoProjectError) return ts.server.emptyArray;
                this.projectService.logErrorForScriptInfoNotFound(args.file);
                return ts.server.Errors.ThrowNoProject();
            }
            else if (!getScriptInfoEnsuringProjectsUptoDate) {
                // Ensure there are containing projects are present
                this.projectService.ensureDefaultProjectForFile(scriptInfo);
            }
            projects = scriptInfo.containingProjects;
            symLinkedProjects = this.projectService.getSymlinkedProjects(scriptInfo);
        }
        // filter handles case when 'projects' is undefined
        projects = ts.filter(projects, p => p.languageServiceEnabled && !p.isOrphan());
        if (!ignoreNoProjectError && (!projects || !projects.length) && !symLinkedProjects) {
            this.projectService.logErrorForScriptInfoNotFound(args.file ?? args.projectFileName);
            return ts.server.Errors.ThrowNoProject();
        }
        return symLinkedProjects ? { projects: projects!, symLinkedProjects } : projects!; // TODO: GH#18217
    }

    private getDefaultProject(args: ts.server.protocol.FileRequestArgs) {
        if (args.projectFileName) {
            const project = this.getProject(args.projectFileName);
            if (project) {
                return project;
            }
            if (!args.file) {
                return ts.server.Errors.ThrowNoProject();
            }
        }
        const info = this.projectService.getScriptInfo(args.file)!;
        return info.getDefaultProject();
    }

    private getRenameLocations(args: ts.server.protocol.RenameRequestArgs, simplifiedResult: boolean): ts.server.protocol.RenameResponseBody | readonly ts.RenameLocation[] {
        const file = ts.server.toNormalizedPath(args.file);
        const position = this.getPositionInFile(args, file);
        const projects = this.getProjects(args);
        const defaultProject = this.getDefaultProject(args);
        const preferences = this.getPreferences(file);
        const renameInfo: ts.server.protocol.RenameInfo = this.mapRenameInfo(
            defaultProject.getLanguageService().getRenameInfo(file, position, preferences), ts.Debug.checkDefined(this.projectService.getScriptInfo(file)));

        if (!renameInfo.canRename) return simplifiedResult ? { info: renameInfo, locs: [] } : [];

        const locations = getRenameLocationsWorker(
            projects,
            defaultProject,
            { fileName: args.file, pos: position },
            !!args.findInStrings,
            !!args.findInComments,
            preferences,
        );
        if (!simplifiedResult) return locations;
        return { info: renameInfo, locs: this.toSpanGroups(locations) };
    }

    private mapRenameInfo(info: ts.RenameInfo, scriptInfo: ts.server.ScriptInfo): ts.server.protocol.RenameInfo {
        if (info.canRename) {
            const { canRename, fileToRename, displayName, fullDisplayName, kind, kindModifiers, triggerSpan } = info;
            return ts.identity<ts.server.protocol.RenameInfoSuccess>(
                { canRename, fileToRename, displayName, fullDisplayName, kind, kindModifiers, triggerSpan: toProtocolTextSpan(triggerSpan, scriptInfo) });
        }
        else {
            return info;
        }
    }

    private toSpanGroups(locations: readonly ts.RenameLocation[]): readonly ts.server.protocol.SpanGroup[] {
        const map = new ts.Map<string, ts.server.protocol.SpanGroup>();
        for (const { fileName, textSpan, contextSpan, originalContextSpan: _2, originalTextSpan: _, originalFileName: _1, ...prefixSuffixText } of locations) {
            let group = map.get(fileName);
            if (!group) map.set(fileName, group = { file: fileName, locs: [] });
            const scriptInfo = ts.Debug.checkDefined(this.projectService.getScriptInfo(fileName));
            group.locs.push({ ...toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo), ...prefixSuffixText });
        }
        return ts.arrayFrom(map.values());
    }

    private getReferences(args: ts.server.protocol.FileLocationRequestArgs, simplifiedResult: boolean): ts.server.protocol.ReferencesResponseBody | readonly ts.ReferencedSymbol[] {
        const file = ts.server.toNormalizedPath(args.file);
        const projects = this.getProjects(args);
        const position = this.getPositionInFile(args, file);
        const references = getReferencesWorker(
            projects,
            this.getDefaultProject(args),
            { fileName: args.file, pos: position },
            this.logger,
        );

        if (!simplifiedResult) return references;

        const preferences = this.getPreferences(file);
        const defaultProject = this.getDefaultProject(args);
        const scriptInfo = defaultProject.getScriptInfoForNormalizedPath(file)!;
        const nameInfo = defaultProject.getLanguageService().getQuickInfoAtPosition(file, position);
        const symbolDisplayString = nameInfo ? ts.displayPartsToString(nameInfo.displayParts) : "";
        const nameSpan = nameInfo && nameInfo.textSpan;
        const symbolStartOffset = nameSpan ? scriptInfo.positionToLineOffset(nameSpan.start).offset : 0;
        const symbolName = nameSpan ? scriptInfo.getSnapshot().getText(nameSpan.start, ts.textSpanEnd(nameSpan)) : "";
        const refs: readonly ts.server.protocol.ReferencesResponseItem[] = ts.flatMap(references, referencedSymbol => {
            return referencedSymbol.references.map(entry => referenceEntryToReferencesResponseItem(this.projectService, entry, preferences));
        });
        return { refs, symbolName, symbolStartOffset, symbolDisplayString };
    }

    private getFileReferences(args: ts.server.protocol.FileRequestArgs, simplifiedResult: boolean): ts.server.protocol.FileReferencesResponseBody | readonly ts.ReferenceEntry[] {
        const projects = this.getProjects(args);
        const fileName = args.file;
        const preferences = this.getPreferences(ts.server.toNormalizedPath(fileName));

        const references: ts.ReferenceEntry[] = [];
        const seen = createDocumentSpanSet();

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
            symbolName: `"${args.file}"`
        };
    }

    /**
     * @param fileName is the name of the file to be opened
     * @param fileContent is a version of the file content that is known to be more up to date than the one on disk
     */
    private openClientFile(fileName: ts.server.NormalizedPath, fileContent?: string, scriptKind?: ts.ScriptKind, projectRootPath?: ts.server.NormalizedPath) {
        this.projectService.openClientFileWithNormalizedPath(fileName, fileContent, scriptKind, /*hasMixedContent*/ false, projectRootPath);
    }

    private getPosition(args: ts.server.protocol.Location & { position?: number }, scriptInfo: ts.server.ScriptInfo): number {
        return args.position !== undefined ? args.position : scriptInfo.lineOffsetToPosition(args.line, args.offset);
    }

    private getPositionInFile(args: ts.server.protocol.Location & { position?: number }, file: ts.server.NormalizedPath): number {
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        return this.getPosition(args, scriptInfo);
    }

    private getFileAndProject(args: ts.server.protocol.FileRequestArgs): FileAndProject {
        return this.getFileAndProjectWorker(args.file, args.projectFileName);
    }

    private getFileAndLanguageServiceForSyntacticOperation(args: ts.server.protocol.FileRequestArgs) {
        const { file, project } = this.getFileAndProject(args);
        return {
            file,
            languageService: project.getLanguageService(/*ensureSynchronized*/ false)
        };
    }

    private getFileAndProjectWorker(uncheckedFileName: string, projectFileName: string | undefined): { file: ts.server.NormalizedPath, project: ts.server.Project } {
        const file = ts.server.toNormalizedPath(uncheckedFileName);
        const project = this.getProject(projectFileName) || this.projectService.ensureDefaultProjectForFile(file);
        return { file, project };
    }

    private getOutliningSpans(args: ts.server.protocol.FileRequestArgs, simplifiedResult: boolean): ts.server.protocol.OutliningSpan[] | ts.OutliningSpan[] {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const spans = languageService.getOutliningSpans(file);
        if (simplifiedResult) {
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
            return spans.map(s => ({
                textSpan: toProtocolTextSpan(s.textSpan, scriptInfo),
                hintSpan: toProtocolTextSpan(s.hintSpan, scriptInfo),
                bannerText: s.bannerText,
                autoCollapse: s.autoCollapse,
                kind: s.kind
            }));
        }
        else {
            return spans;
        }
    }

    private getTodoComments(args: ts.server.protocol.TodoCommentRequestArgs) {
        const { file, project } = this.getFileAndProject(args);
        return project.getLanguageService().getTodoComments(file, args.descriptors);
    }

    private getDocCommentTemplate(args: ts.server.protocol.FileLocationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.getDocCommentTemplateAtPosition(file, position, this.getPreferences(file));
    }

    private getSpanOfEnclosingComment(args: ts.server.protocol.SpanOfEnclosingCommentRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const onlyMultiLine = args.onlyMultiLine;
        const position = this.getPositionInFile(args, file);
        return languageService.getSpanOfEnclosingComment(file, position, onlyMultiLine);
    }

    private getIndentation(args: ts.server.protocol.IndentationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        const options = args.options ? ts.server.convertFormatOptions(args.options) : this.getFormatOptions(file);
        const indentation = languageService.getIndentationAtPosition(file, position, options);
        return { position, indentation };
    }

    private getBreakpointStatement(args: ts.server.protocol.FileLocationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.getBreakpointStatementAtPosition(file, position);
    }

    private getNameOrDottedNameSpan(args: ts.server.protocol.FileLocationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.getNameOrDottedNameSpan(file, position, position);
    }

    private isValidBraceCompletion(args: ts.server.protocol.BraceCompletionRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.isValidBraceCompletionAtPosition(file, position, args.openingBrace.charCodeAt(0));
    }

    private getQuickInfoWorker(args: ts.server.protocol.FileLocationRequestArgs, simplifiedResult: boolean): ts.server.protocol.QuickInfoResponseBody | ts.QuickInfo | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file, this.getPosition(args, scriptInfo));
        if (!quickInfo) {
            return undefined;
        }

        const useDisplayParts = !!this.getPreferences(file).displayPartsForJSDoc;
        if (simplifiedResult) {
            const displayString = ts.displayPartsToString(quickInfo.displayParts);
            return {
                kind: quickInfo.kind,
                kindModifiers: quickInfo.kindModifiers,
                start: scriptInfo.positionToLineOffset(quickInfo.textSpan.start),
                end: scriptInfo.positionToLineOffset(ts.textSpanEnd(quickInfo.textSpan)),
                displayString,
                documentation: useDisplayParts ? this.mapDisplayParts(quickInfo.documentation, project) : ts.displayPartsToString(quickInfo.documentation),
                tags: this.mapJSDocTagInfo(quickInfo.tags, project, useDisplayParts),
            };
        }
        else {
            return useDisplayParts ? quickInfo : {
                ...quickInfo,
                tags: this.mapJSDocTagInfo(quickInfo.tags, project, /*useDisplayParts*/ false) as ts.JSDocTagInfo[]
            };
        }
    }

    private getFormattingEditsForRange(args: ts.server.protocol.FormatRequestArgs): ts.server.protocol.CodeEdit[] | undefined {
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

    private getFormattingEditsForRangeFull(args: ts.server.protocol.FormatRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const options = args.options ? ts.server.convertFormatOptions(args.options) : this.getFormatOptions(file);
        return languageService.getFormattingEditsForRange(file, args.position!, args.endPosition!, options); // TODO: GH#18217
    }

    private getFormattingEditsForDocumentFull(args: ts.server.protocol.FormatRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const options = args.options ? ts.server.convertFormatOptions(args.options) : this.getFormatOptions(file);
        return languageService.getFormattingEditsForDocument(file, options);
    }

    private getFormattingEditsAfterKeystrokeFull(args: ts.server.protocol.FormatOnKeyRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const options = args.options ? ts.server.convertFormatOptions(args.options) : this.getFormatOptions(file);
        return languageService.getFormattingEditsAfterKeystroke(file, args.position!, args.key, options); // TODO: GH#18217
    }

    private getFormattingEditsAfterKeystroke(args: ts.server.protocol.FormatOnKeyRequestArgs): ts.server.protocol.CodeEdit[] | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = scriptInfo.lineOffsetToPosition(args.line, args.offset);
        const formatOptions = this.getFormatOptions(file);
        const edits = languageService.getFormattingEditsAfterKeystroke(file, position, args.key,
            formatOptions);
        // Check whether we should auto-indent. This will be when
        // the position is on a line containing only whitespace.
        // This should leave the edits returned from
        // getFormattingEditsAfterKeystroke either empty or pertaining
        // only to the previous line.  If all this is true, then
        // add edits necessary to properly indent the current line.
        if ((args.key === "\n") && ((!edits) || (edits.length === 0) || allEditsBeforePos(edits, position))) {
            const { lineText, absolutePosition } = scriptInfo.getAbsolutePositionAndLineText(args.line);
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
                        span: ts.createTextSpanFromBounds(absolutePosition, firstNoWhiteSpacePosition),
                        newText: ts.formatting.getIndentationString(preferredIndent, formatOptions)
                    });
                }
            }
        }

        if (!edits) {
            return undefined;
        }

        return edits.map((edit) => {
            return {
                start: scriptInfo.positionToLineOffset(edit.span.start),
                end: scriptInfo.positionToLineOffset(ts.textSpanEnd(edit.span)),
                newText: edit.newText ? edit.newText : ""
            };
        });
    }

    private getCompletions(args: ts.server.protocol.CompletionsRequestArgs, kind: ts.server.protocol.CommandTypes.CompletionInfo | ts.server.protocol.CommandTypes.Completions | ts.server.protocol.CommandTypes.CompletionsFull): ts.WithMetadata<readonly ts.server.protocol.CompletionEntry[]> | ts.server.protocol.CompletionInfo | ts.CompletionInfo | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);

        const completions = project.getLanguageService().getCompletionsAtPosition(
            file,
            position,
            {
                ...ts.server.convertUserPreferences(this.getPreferences(file)),
                triggerCharacter: args.triggerCharacter,
                triggerKind: args.triggerKind as ts.CompletionTriggerKind | undefined,
                includeExternalModuleExports: args.includeExternalModuleExports,
                includeInsertTextCompletions: args.includeInsertTextCompletions,
            },
            project.projectService.getFormatCodeOptions(file),
        );
        if (completions === undefined) return undefined;

        if (kind === ts.server.protocol.CommandTypes.CompletionsFull) return completions;

        const prefix = args.prefix || "";
        const entries = ts.mapDefined<ts.CompletionEntry, ts.server.protocol.CompletionEntry>(completions.entries, entry => {
            if (completions.isMemberCompletion || ts.startsWith(entry.name.toLowerCase(), prefix.toLowerCase())) {
                const {
                    name,
                    kind,
                    kindModifiers,
                    sortText,
                    insertText,
                    replacementSpan,
                    hasAction,
                    source,
                    sourceDisplay,
                    labelDetails,
                    isSnippet,
                    isRecommended,
                    isPackageJsonImport,
                    isImportStatementCompletion,
                    data } = entry;
                const convertedSpan = replacementSpan ? toProtocolTextSpan(replacementSpan, scriptInfo) : undefined;
                // Use `hasAction || undefined` to avoid serializing `false`.
                return {
                    name,
                    kind,
                    kindModifiers,
                    sortText,
                    insertText,
                    replacementSpan: convertedSpan,
                    isSnippet,
                    hasAction: hasAction || undefined,
                    source,
                    sourceDisplay,
                    labelDetails,
                    isRecommended,
                    isPackageJsonImport,
                    isImportStatementCompletion,
                    data
                };
            }
        });

        if (kind === ts.server.protocol.CommandTypes.Completions) {
            if (completions.metadata) (entries as ts.WithMetadata<readonly ts.server.protocol.CompletionEntry[]>).metadata = completions.metadata;
            return entries;
        }

        const res: ts.server.protocol.CompletionInfo = {
            ...completions,
            optionalReplacementSpan: completions.optionalReplacementSpan && toProtocolTextSpan(completions.optionalReplacementSpan, scriptInfo),
            entries,
        };
        return res;
    }

    private getCompletionEntryDetails(args: ts.server.protocol.CompletionDetailsRequestArgs, fullResult: boolean): readonly ts.server.protocol.CompletionEntryDetails[] | readonly ts.CompletionEntryDetails[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);
        const formattingOptions = project.projectService.getFormatCodeOptions(file);
        const useDisplayParts = !!this.getPreferences(file).displayPartsForJSDoc;

        const result = ts.mapDefined(args.entryNames, entryName => {
            const { name, source, data } = typeof entryName === "string" ? { name: entryName, source: undefined, data: undefined } : entryName;
            return project.getLanguageService().getCompletionEntryDetails(file, position, name, formattingOptions, source, this.getPreferences(file), data ? ts.cast(data, isCompletionEntryData) : undefined);
        });
        return fullResult
            ? (useDisplayParts ? result : result.map(details => ({ ...details, tags: this.mapJSDocTagInfo(details.tags, project, /*richResponse*/ false) as ts.JSDocTagInfo[] })))
            : result.map(details => ({
                ...details,
                codeActions: ts.map(details.codeActions, action => this.mapCodeAction(action)),
                documentation: this.mapDisplayParts(details.documentation, project),
                tags: this.mapJSDocTagInfo(details.tags, project, useDisplayParts),
            }));
    }

    private getCompileOnSaveAffectedFileList(args: ts.server.protocol.FileRequestArgs): readonly ts.server.protocol.CompileOnSaveAffectedFileListSingleProject[] {
        const projects = this.getProjects(args, /*getScriptInfoEnsuringProjectsUptoDate*/ true, /*ignoreNoProjectError*/ true);
        const info = this.projectService.getScriptInfo(args.file);
        if (!info) {
            return ts.server.emptyArray;
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

                if (!!compilationSettings.noEmit || ts.isDeclarationFileName(info.fileName) && !dtsChangeCanAffectEmit(compilationSettings)) {
                    // avoid triggering emit when a change is made in a .d.ts when declaration emit and decorator metadata emit are disabled
                    return undefined;
                }

                return {
                    projectFileName: project.getProjectName(),
                    fileNames: project.getCompileOnSaveAffectedFileList(info),
                    projectUsesOutFile: !!ts.outFile(compilationSettings)
                };
            }
        );
    }

    private emitFile(args: ts.server.protocol.CompileOnSaveEmitFileRequestArgs): boolean | ts.server.protocol.EmitResult | ts.server.EmitResult {
        const { file, project } = this.getFileAndProject(args);
        if (!project) {
            ts.server.Errors.ThrowNoProject();
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
                    diagnostics.map(d => formatDiagnosticToProtocol(d, /*includeFileName*/ true))
            } :
            !emitSkipped;
    }

    private getSignatureHelpItems(args: ts.server.protocol.SignatureHelpRequestArgs, simplifiedResult: boolean): ts.server.protocol.SignatureHelpItems | ts.SignatureHelpItems | undefined {
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
                    end: scriptInfo.positionToLineOffset(span.start + span.length)
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
                items: helpItems.items.map(item => ({ ...item, tags: this.mapJSDocTagInfo(item.tags, project, /*richResponse*/ false) as ts.JSDocTagInfo[] }))
            };
        }
    }

    private toPendingErrorCheck(uncheckedFileName: string): PendingErrorCheck | undefined {
        const fileName = ts.server.toNormalizedPath(uncheckedFileName);
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

    private change(args: ts.server.protocol.ChangeRequestArgs) {
        const scriptInfo = this.projectService.getScriptInfo(args.file)!;
        ts.Debug.assert(!!scriptInfo);
        const start = scriptInfo.lineOffsetToPosition(args.line, args.offset);
        const end = scriptInfo.lineOffsetToPosition(args.endLine, args.endOffset);
        if (start >= 0) {
            this.changeSeq++;
            this.projectService.applyChangesToFile(scriptInfo, ts.singleIterator({
                span: { start, length: end - start },
                newText: args.insertString! // TODO: GH#18217
            }));
        }
    }

    private reload(args: ts.server.protocol.ReloadRequestArgs, reqSeq: number) {
        const file = ts.server.toNormalizedPath(args.file);
        const tempFileName = args.tmpfile === undefined ? undefined : ts.server.toNormalizedPath(args.tmpfile);
        const info = this.projectService.getScriptInfoForNormalizedPath(file);
        if (info) {
            this.changeSeq++;
            // make sure no changes happen before this one is finished
            if (info.reloadFromFile(tempFileName)) {
                this.doOutput(/*info*/ undefined, CommandNames.Reload, reqSeq, /*success*/ true);
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
        const file = ts.normalizePath(fileName);
        this.projectService.closeClientFile(file);
    }

    private mapLocationNavigationBarItems(items: ts.NavigationBarItem[], scriptInfo: ts.server.ScriptInfo): ts.server.protocol.NavigationBarItem[] {
        return ts.map(items, item => ({
            text: item.text,
            kind: item.kind,
            kindModifiers: item.kindModifiers,
            spans: item.spans.map(span => toProtocolTextSpan(span, scriptInfo)),
            childItems: this.mapLocationNavigationBarItems(item.childItems, scriptInfo),
            indent: item.indent
        }));
    }

    private getNavigationBarItems(args: ts.server.protocol.FileRequestArgs, simplifiedResult: boolean): ts.server.protocol.NavigationBarItem[] | ts.NavigationBarItem[] | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const items = languageService.getNavigationBarItems(file);
        return !items
            ? undefined
            : simplifiedResult
                ? this.mapLocationNavigationBarItems(items, this.projectService.getScriptInfoForNormalizedPath(file)!)
                : items;
    }

    private toLocationNavigationTree(tree: ts.NavigationTree, scriptInfo: ts.server.ScriptInfo): ts.server.protocol.NavigationTree {
        return {
            text: tree.text,
            kind: tree.kind,
            kindModifiers: tree.kindModifiers,
            spans: tree.spans.map(span => toProtocolTextSpan(span, scriptInfo)),
            nameSpan: tree.nameSpan && toProtocolTextSpan(tree.nameSpan, scriptInfo),
            childItems: ts.map(tree.childItems, item => this.toLocationNavigationTree(item, scriptInfo))
        };
    }

    private getNavigationTree(args: ts.server.protocol.FileRequestArgs, simplifiedResult: boolean): ts.server.protocol.NavigationTree | ts.NavigationTree | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const tree = languageService.getNavigationTree(file);
        return !tree
            ? undefined
            : simplifiedResult
                ? this.toLocationNavigationTree(tree, this.projectService.getScriptInfoForNormalizedPath(file)!)
                : tree;
    }

    private getNavigateToItems(args: ts.server.protocol.NavtoRequestArgs, simplifiedResult: boolean): readonly ts.server.protocol.NavtoItem[] | readonly ts.NavigateToItem[] {
        const full = this.getFullNavigateToItems(args);
        return !simplifiedResult ?
            ts.flatMap(full, ({ navigateToItems }) => navigateToItems) :
            ts.flatMap(
                full,
                ({ project, navigateToItems }) => navigateToItems.map(navItem => {
                    const scriptInfo = project.getScriptInfo(navItem.fileName)!;
                    const bakedItem: ts.server.protocol.NavtoItem = {
                        name: navItem.name,
                        kind: navItem.kind,
                        kindModifiers: navItem.kindModifiers,
                        isCaseSensitive: navItem.isCaseSensitive,
                        matchKind: navItem.matchKind,
                        file: navItem.fileName,
                        start: scriptInfo.positionToLineOffset(navItem.textSpan.start),
                        end: scriptInfo.positionToLineOffset(ts.textSpanEnd(navItem.textSpan))
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
                })
            );
    }

    private getFullNavigateToItems(args: ts.server.protocol.NavtoRequestArgs): ProjectNavigateToItems[] {
        const { currentFileOnly, searchValue, maxResultCount, projectFileName } = args;

        if (currentFileOnly) {
            ts.Debug.assertIsDefined(args.file);
            const { file, project } = this.getFileAndProject(args as ts.server.protocol.FileRequestArgs);
            return [{ project, navigateToItems: project.getLanguageService().getNavigateToItems(searchValue, maxResultCount, file) }];
        }

        const outputs: ProjectNavigateToItems[] = [];

        // This is effectively a hashset with `name` as the custom hash and `navigateToItemIsEqualTo` as the custom equals.
        // `name` is a very cheap hash function, but we could incorporate other properties to reduce collisions.
        const seenItems = new ts.Map<string, ts.NavigateToItem[]>(); // name to items with that name

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
            const projects = this.getProjects(args as ts.server.protocol.FileRequestArgs);
            forEachProjectInProjects(projects, /*path*/ undefined, project => addItemsForProject(project));
        }

        return outputs;

        // Mutates `outputs`
        function addItemsForProject(project: ts.server.Project) {
            const projectItems = project.getLanguageService().getNavigateToItems(searchValue, maxResultCount, /*filename*/ undefined, /*excludeDts*/ project.isNonTsProject());
            const unseenItems = ts.filter(projectItems, item => tryAddSeenItem(item) && !getMappedLocationForProject(documentSpanLocation(item), project));
            if (unseenItems.length) {
                outputs.push({ project, navigateToItems: unseenItems });
            }
        }

        // Returns true if the item had not been seen before
        // Mutates `seenItems`
        function tryAddSeenItem(item: ts.NavigateToItem) {
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

        function navigateToItemIsEqualTo(a: ts.NavigateToItem, b: ts.NavigateToItem): boolean {
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

    private getSupportedCodeFixes(): string[] {
        return ts.getSupportedCodeFixes();
    }

    private isLocation(locationOrSpan: ts.server.protocol.FileLocationOrRangeRequestArgs): locationOrSpan is ts.server.protocol.FileLocationRequestArgs {
        return (locationOrSpan as ts.server.protocol.FileLocationRequestArgs).line !== undefined;
    }

    private extractPositionOrRange(args: ts.server.protocol.FileLocationOrRangeRequestArgs, scriptInfo: ts.server.ScriptInfo): number | ts.TextRange {
        let position: number | undefined;
        let textRange: ts.TextRange | undefined;
        if (this.isLocation(args)) {
            position = getPosition(args);
        }
        else {
            textRange = this.getRange(args, scriptInfo);
        }
        return ts.Debug.checkDefined(position === undefined ? textRange : position);

        function getPosition(loc: ts.server.protocol.FileLocationRequestArgs) {
            return loc.position !== undefined ? loc.position : scriptInfo.lineOffsetToPosition(loc.line, loc.offset);
        }
    }

    private getRange(args: ts.server.protocol.FileRangeRequestArgs, scriptInfo: ts.server.ScriptInfo): ts.TextRange {
        const { startPosition, endPosition } = this.getStartAndEndPosition(args, scriptInfo);

        return { pos: startPosition, end: endPosition };
    }

    private getApplicableRefactors(args: ts.server.protocol.GetApplicableRefactorsRequestArgs): ts.server.protocol.ApplicableRefactorInfo[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
        return project.getLanguageService().getApplicableRefactors(file, this.extractPositionOrRange(args, scriptInfo), this.getPreferences(file), args.triggerReason, args.kind);
    }

    private getEditsForRefactor(args: ts.server.protocol.GetEditsForRefactorRequestArgs, simplifiedResult: boolean): ts.RefactorEditInfo | ts.server.protocol.RefactorEditInfo {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
        const result = project.getLanguageService().getEditsForRefactor(
            file,
            this.getFormatOptions(file),
            this.extractPositionOrRange(args, scriptInfo),
            args.refactor,
            args.action,
            this.getPreferences(file),
        );

        if (result === undefined) {
            return {
                edits: []
            };
        }

        if (simplifiedResult) {
            const { renameFilename, renameLocation, edits } = result;
            let mappedRenameLocation: ts.server.protocol.Location | undefined;
            if (renameFilename !== undefined && renameLocation !== undefined) {
                const renameScriptInfo = project.getScriptInfoForNormalizedPath(ts.server.toNormalizedPath(renameFilename))!;
                mappedRenameLocation = getLocationInNewDocument(ts.getSnapshotText(renameScriptInfo.getSnapshot()), renameFilename, renameLocation, edits);
            }
            return { renameLocation: mappedRenameLocation, renameFilename, edits: this.mapTextChangesToCodeEdits(edits) };
        }
        else {
            return result;
        }
    }

    private organizeImports(args: ts.server.protocol.OrganizeImportsRequestArgs, simplifiedResult: boolean): readonly ts.server.protocol.FileCodeEdits[] | readonly ts.FileTextChanges[] {
        ts.Debug.assert(args.scope.type === "file");
        const { file, project } = this.getFileAndProject(args.scope.args);
        const changes = project.getLanguageService().organizeImports(
            {
                fileName: file,
                mode: args.mode as ts.OrganizeImportsMode | undefined ?? (args.skipDestructiveCodeActions ? ts.OrganizeImportsMode.SortAndCombine : undefined),
                type: "file",
            },
            this.getFormatOptions(file),
            this.getPreferences(file)
        );
        if (simplifiedResult) {
            return this.mapTextChangesToCodeEdits(changes);
        }
        else {
            return changes;
        }
    }

    private getEditsForFileRename(args: ts.server.protocol.GetEditsForFileRenameRequestArgs, simplifiedResult: boolean): readonly ts.server.protocol.FileCodeEdits[] | readonly ts.FileTextChanges[] {
        const oldPath = ts.server.toNormalizedPath(args.oldFilePath);
        const newPath = ts.server.toNormalizedPath(args.newFilePath);
        const formatOptions = this.getHostFormatOptions();
        const preferences = this.getHostPreferences();


        const seenFiles = new ts.Set<string>();
        const textChanges: ts.FileTextChanges[] = [];
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

    private getCodeFixes(args: ts.server.protocol.CodeFixRequestArgs, simplifiedResult: boolean): readonly ts.server.protocol.CodeFixAction[] | readonly ts.CodeFixAction[] | undefined {
        const { file, project } = this.getFileAndProject(args);

        const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
        const { startPosition, endPosition } = this.getStartAndEndPosition(args, scriptInfo);

        let codeActions: readonly ts.CodeFixAction[];
        try {
            codeActions = project.getLanguageService().getCodeFixesAtPosition(file, startPosition, endPosition, args.errorCodes, this.getFormatOptions(file), this.getPreferences(file));
        }
        catch(e) {
            const ls = project.getLanguageService();
            const existingDiagCodes = [
                ...ls.getSyntacticDiagnostics(file),
                ...ls.getSemanticDiagnostics(file),
                ...ls.getSuggestionDiagnostics(file)
            ].map(d =>
                ts.decodedTextSpanIntersectsWith(startPosition, endPosition - startPosition, d.start!, d.length!)
                && d.code);
            const badCode = args.errorCodes.find(c => !existingDiagCodes.includes(c));
            if (badCode !== undefined) {
                e.message = `BADCLIENT: Bad error code, ${badCode} not found in range ${startPosition}..${endPosition} (found: ${existingDiagCodes.join(", ")}); could have caused this error:\n${e.message}`;
            }
            throw e;
        }
        return simplifiedResult ? codeActions.map(codeAction => this.mapCodeFixAction(codeAction)) : codeActions;
    }

    private getCombinedCodeFix({ scope, fixId }: ts.server.protocol.GetCombinedCodeFixRequestArgs, simplifiedResult: boolean): ts.server.protocol.CombinedCodeActions | ts.CombinedCodeActions {
        ts.Debug.assert(scope.type === "file");
        const { file, project } = this.getFileAndProject(scope.args);
        const res = project.getLanguageService().getCombinedCodeFix({ type: "file", fileName: file }, fixId, this.getFormatOptions(file), this.getPreferences(file));
        if (simplifiedResult) {
            return { changes: this.mapTextChangesToCodeEdits(res.changes), commands: res.commands };
        }
        else {
            return res;
        }
    }

    private applyCodeActionCommand(args: ts.server.protocol.ApplyCodeActionCommandRequestArgs): {} {
        const commands = args.command as ts.CodeActionCommand | ts.CodeActionCommand[]; // They should be sending back the command we sent them.
        for (const command of ts.toArray(commands)) {
            const { file, project } = this.getFileAndProject(command);
            project.getLanguageService().applyCodeActionCommand(command, this.getFormatOptions(file)).then(
                _result => { /* TODO: GH#20447 report success message? */ },
                _error => { /* TODO: GH#20447 report errors */ });
        }
        return {};
    }

    private getStartAndEndPosition(args: ts.server.protocol.FileRangeRequestArgs, scriptInfo: ts.server.ScriptInfo) {
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

    private mapCodeAction({ description, changes, commands }: ts.CodeAction): ts.server.protocol.CodeAction {
        return { description, changes: this.mapTextChangesToCodeEdits(changes), commands };
    }

    private mapCodeFixAction({ fixName, description, changes, commands, fixId, fixAllDescription }: ts.CodeFixAction): ts.server.protocol.CodeFixAction {
        return { fixName, description, changes: this.mapTextChangesToCodeEdits(changes), commands, fixId, fixAllDescription };
    }

    private mapTextChangesToCodeEdits(textChanges: readonly ts.FileTextChanges[]): ts.server.protocol.FileCodeEdits[] {
        return textChanges.map(change => this.mapTextChangeToCodeEdit(change));
    }

    private mapTextChangeToCodeEdit(textChanges: ts.FileTextChanges): ts.server.protocol.FileCodeEdits {
        const scriptInfo = this.projectService.getScriptInfoOrConfig(textChanges.fileName);
        if (!!textChanges.isNewFile === !!scriptInfo) {
            if (!scriptInfo) { // and !isNewFile
                this.projectService.logErrorForScriptInfoNotFound(textChanges.fileName);
            }
            ts.Debug.fail("Expected isNewFile for (only) new files. " + JSON.stringify({ isNewFile: !!textChanges.isNewFile, hasScriptInfo: !!scriptInfo }));
        }
        return scriptInfo
            ? { fileName: textChanges.fileName, textChanges: textChanges.textChanges.map(textChange => convertTextChangeToCodeEdit(textChange, scriptInfo)) }
            : convertNewFileTextChangeToCodeEdit(textChanges);
    }

    private convertTextChangeToCodeEdit(change: ts.TextChange, scriptInfo: ts.server.ScriptInfo): ts.server.protocol.CodeEdit {
        return {
            start: scriptInfo.positionToLineOffset(change.span.start),
            end: scriptInfo.positionToLineOffset(change.span.start + change.span.length),
            newText: change.newText ? change.newText : ""
        };
    }

    private getBraceMatching(args: ts.server.protocol.FileLocationRequestArgs, simplifiedResult: boolean): ts.server.protocol.TextSpan[] | ts.TextSpan[] | undefined {
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
        const fileNamesInProject = fileNames!.filter(value => !ts.stringContains(value, "lib.d.ts")); // TODO: GH#18217
        if (fileNamesInProject.length === 0) {
            return;
        }

        // Sort the file name list to make the recently touched files come first
        const highPriorityFiles: ts.server.NormalizedPath[] = [];
        const mediumPriorityFiles: ts.server.NormalizedPath[] = [];
        const lowPriorityFiles: ts.server.NormalizedPath[] = [];
        const veryLowPriorityFiles: ts.server.NormalizedPath[] = [];
        const normalizedFileName = ts.server.toNormalizedPath(fileName);
        const project = this.projectService.ensureDefaultProjectForFile(normalizedFileName);
        for (const fileNameInProject of fileNamesInProject) {
            if (this.getCanonicalFileName(fileNameInProject) === this.getCanonicalFileName(fileName)) {
                highPriorityFiles.push(fileNameInProject);
            }
            else {
                const info = this.projectService.getScriptInfo(fileNameInProject)!; // TODO: GH#18217
                if (!info.isScriptOpen()) {
                    if (ts.isDeclarationFileName(fileNameInProject)) {
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

    private configurePlugin(args: ts.server.protocol.ConfigurePluginRequestArguments) {
        this.projectService.configurePlugin(args);
    }

    private getSmartSelectionRange(args: ts.server.protocol.SelectionRangeRequestArgs, simplifiedResult: boolean) {
        const { locations } = args;
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const scriptInfo = ts.Debug.checkDefined(this.projectService.getScriptInfo(file));

        return ts.map(locations, location => {
            const pos = this.getPosition(location, scriptInfo);
            const selectionRange = languageService.getSmartSelectionRange(file, pos);
            return simplifiedResult ? this.mapSelectionRange(selectionRange, scriptInfo) : selectionRange;
        });
    }

    private toggleLineComment(args: ts.server.protocol.FileRangeRequestArgs, simplifiedResult: boolean): ts.TextChange[] | ts.server.protocol.CodeEdit[] {
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

    private toggleMultilineComment(args: ts.server.protocol.FileRangeRequestArgs, simplifiedResult: boolean): ts.TextChange[] | ts.server.protocol.CodeEdit[] {
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

    private commentSelection(args: ts.server.protocol.FileRangeRequestArgs, simplifiedResult: boolean): ts.TextChange[] | ts.server.protocol.CodeEdit[] {
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

    private uncommentSelection(args: ts.server.protocol.FileRangeRequestArgs, simplifiedResult: boolean): ts.TextChange[] | ts.server.protocol.CodeEdit[] {
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

    private mapSelectionRange(selectionRange: ts.SelectionRange, scriptInfo: ts.server.ScriptInfo): ts.server.protocol.SelectionRange {
        const result: ts.server.protocol.SelectionRange = {
            textSpan: toProtocolTextSpan(selectionRange.textSpan, scriptInfo),
        };
        if (selectionRange.parent) {
            result.parent = this.mapSelectionRange(selectionRange.parent, scriptInfo);
        }
        return result;
    }

    private getScriptInfoFromProjectService(file: string) {
        const normalizedFile = ts.server.toNormalizedPath(file);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(normalizedFile);
        if (!scriptInfo) {
            this.projectService.logErrorForScriptInfoNotFound(normalizedFile);
            return ts.server.Errors.ThrowNoProject();
        }
        return scriptInfo;
    }

    private toProtocolCallHierarchyItem(item: ts.CallHierarchyItem): ts.server.protocol.CallHierarchyItem {
        const scriptInfo = this.getScriptInfoFromProjectService(item.file);
        return {
            name: item.name,
            kind: item.kind,
            kindModifiers: item.kindModifiers,
            file: item.file,
            containerName: item.containerName,
            span: toProtocolTextSpan(item.span, scriptInfo),
            selectionSpan: toProtocolTextSpan(item.selectionSpan, scriptInfo)
        };
    }

    private toProtocolCallHierarchyIncomingCall(incomingCall: ts.CallHierarchyIncomingCall): ts.server.protocol.CallHierarchyIncomingCall {
        const scriptInfo = this.getScriptInfoFromProjectService(incomingCall.from.file);
        return {
            from: this.toProtocolCallHierarchyItem(incomingCall.from),
            fromSpans: incomingCall.fromSpans.map(fromSpan => toProtocolTextSpan(fromSpan, scriptInfo))
        };
    }

    private toProtocolCallHierarchyOutgoingCall(outgoingCall: ts.CallHierarchyOutgoingCall, scriptInfo: ts.server.ScriptInfo): ts.server.protocol.CallHierarchyOutgoingCall {
        return {
            to: this.toProtocolCallHierarchyItem(outgoingCall.to),
            fromSpans: outgoingCall.fromSpans.map(fromSpan => toProtocolTextSpan(fromSpan, scriptInfo))
        };
    }

    private prepareCallHierarchy(args: ts.server.protocol.FileLocationRequestArgs): ts.server.protocol.CallHierarchyItem | ts.server.protocol.CallHierarchyItem[] | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file);
        if (scriptInfo) {
            const position = this.getPosition(args, scriptInfo);
            const result = project.getLanguageService().prepareCallHierarchy(file, position);
            return result && ts.mapOneOrMany(result, item => this.toProtocolCallHierarchyItem(item));
        }
        return undefined;
    }

    private provideCallHierarchyIncomingCalls(args: ts.server.protocol.FileLocationRequestArgs): ts.server.protocol.CallHierarchyIncomingCall[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.getScriptInfoFromProjectService(file);
        const incomingCalls = project.getLanguageService().provideCallHierarchyIncomingCalls(file, this.getPosition(args, scriptInfo));
        return incomingCalls.map(call => this.toProtocolCallHierarchyIncomingCall(call));
    }

    private provideCallHierarchyOutgoingCalls(args: ts.server.protocol.FileLocationRequestArgs): ts.server.protocol.CallHierarchyOutgoingCall[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.getScriptInfoFromProjectService(file);
        const outgoingCalls = project.getLanguageService().provideCallHierarchyOutgoingCalls(file, this.getPosition(args, scriptInfo));
        return outgoingCalls.map(call => this.toProtocolCallHierarchyOutgoingCall(call, scriptInfo));
    }

    getCanonicalFileName(fileName: string) {
        const name = this.host.useCaseSensitiveFileNames ? fileName : ts.toFileNameLowerCase(fileName);
        return ts.normalizePath(name);
    }

    exit() { /*overridden*/ }

    private notRequired(): HandlerResponse {
        return { responseRequired: false };
    }

    private requiredResponse(response: {} | undefined): HandlerResponse {
        return { response, responseRequired: true };
    }

    private handlers = new ts.Map(ts.getEntries<(request: ts.server.protocol.Request) => HandlerResponse>({
        [CommandNames.Status]: () => {
            const response: ts.server.protocol.StatusResponseBody = { version: ts.version }; // eslint-disable-line @typescript-eslint/no-unnecessary-qualifier
            return this.requiredResponse(response);
        },
        [CommandNames.OpenExternalProject]: (request: ts.server.protocol.OpenExternalProjectRequest) => {
            this.projectService.openExternalProject(request.arguments);
            // TODO: GH#20447 report errors
            return this.requiredResponse(/*response*/ true);
        },
        [CommandNames.OpenExternalProjects]: (request: ts.server.protocol.OpenExternalProjectsRequest) => {
            this.projectService.openExternalProjects(request.arguments.projects);
            // TODO: GH#20447 report errors
            return this.requiredResponse(/*response*/ true);
        },
        [CommandNames.CloseExternalProject]: (request: ts.server.protocol.CloseExternalProjectRequest) => {
            this.projectService.closeExternalProject(request.arguments.projectFileName);
            // TODO: GH#20447 report errors
            return this.requiredResponse(/*response*/ true);
        },
        [CommandNames.SynchronizeProjectList]: (request: ts.server.protocol.SynchronizeProjectListRequest) => {
            const result = this.projectService.synchronizeProjectList(request.arguments.knownProjects, request.arguments.includeProjectReferenceRedirectInfo);
            if (!result.some(p => p.projectErrors && p.projectErrors.length !== 0)) {
                return this.requiredResponse(result);
            }
            const converted = ts.map(result, p => {
                if (!p.projectErrors || p.projectErrors.length === 0) {
                    return p;
                }
                return {
                    info: p.info,
                    changes: p.changes,
                    files: p.files,
                    projectErrors: this.convertToDiagnosticsWithLinePosition(p.projectErrors, /*scriptInfo*/ undefined)
                };
            });
            return this.requiredResponse(converted);
        },
        [CommandNames.UpdateOpen]: (request: ts.server.protocol.UpdateOpenRequest) => {
            this.changeSeq++;
            this.projectService.applyChangesInOpenFiles(
                request.arguments.openFiles && ts.mapIterator(ts.arrayIterator(request.arguments.openFiles), file => ({
                    fileName: file.file,
                    content: file.fileContent,
                    scriptKind: file.scriptKindName,
                    projectRootPath: file.projectRootPath
                })),
                request.arguments.changedFiles && ts.mapIterator(ts.arrayIterator(request.arguments.changedFiles), file => ({
                    fileName: file.fileName,
                    changes: ts.mapDefinedIterator(ts.arrayReverseIterator(file.textChanges), change => {
                        const scriptInfo = ts.Debug.checkDefined(this.projectService.getScriptInfo(file.fileName));
                        const start = scriptInfo.lineOffsetToPosition(change.start.line, change.start.offset);
                        const end = scriptInfo.lineOffsetToPosition(change.end.line, change.end.offset);
                        return start >= 0 ? { span: { start, length: end - start }, newText: change.newText } : undefined;
                    })
                })),
                request.arguments.closedFiles
            );
            return this.requiredResponse(/*response*/ true);
        },
        [CommandNames.ApplyChangedToOpenFiles]: (request: ts.server.protocol.ApplyChangedToOpenFilesRequest) => {
            this.changeSeq++;
            this.projectService.applyChangesInOpenFiles(
                request.arguments.openFiles && ts.arrayIterator(request.arguments.openFiles),
                request.arguments.changedFiles && ts.mapIterator(ts.arrayIterator(request.arguments.changedFiles), file => ({
                    fileName: file.fileName,
                    // apply changes in reverse order
                    changes: ts.arrayReverseIterator(file.changes)
                })),
                request.arguments.closedFiles
            );
            // TODO: report errors
            return this.requiredResponse(/*response*/ true);
        },
        [CommandNames.Exit]: () => {
            this.exit();
            return this.notRequired();
        },
        [CommandNames.Definition]: (request: ts.server.protocol.DefinitionRequest) => {
            return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.DefinitionFull]: (request: ts.server.protocol.DefinitionRequest) => {
            return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.DefinitionAndBoundSpan]: (request: ts.server.protocol.DefinitionAndBoundSpanRequest) => {
            return this.requiredResponse(this.getDefinitionAndBoundSpan(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.DefinitionAndBoundSpanFull]: (request: ts.server.protocol.DefinitionAndBoundSpanRequest) => {
            return this.requiredResponse(this.getDefinitionAndBoundSpan(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.FindSourceDefinition]: (request: ts.server.protocol.FindSourceDefinitionRequest) => {
            return this.requiredResponse(this.findSourceDefinition(request.arguments));
        },
        [CommandNames.EmitOutput]: (request: ts.server.protocol.EmitOutputRequest) => {
            return this.requiredResponse(this.getEmitOutput(request.arguments));
        },
        [CommandNames.TypeDefinition]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getTypeDefinition(request.arguments));
        },
        [CommandNames.Implementation]: (request: ts.server.protocol.Request) => {
            return this.requiredResponse(this.getImplementation(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.ImplementationFull]: (request: ts.server.protocol.Request) => {
            return this.requiredResponse(this.getImplementation(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.References]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.ReferencesFull]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.Rename]: (request: ts.server.protocol.RenameRequest) => {
            return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.RenameLocationsFull]: (request: ts.server.protocol.RenameFullRequest) => {
            return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.RenameInfoFull]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getRenameInfo(request.arguments));
        },
        [CommandNames.Open]: (request: ts.server.protocol.OpenRequest) => {
            this.openClientFile(
                ts.server.toNormalizedPath(request.arguments.file),
                request.arguments.fileContent,
                ts.server.convertScriptKindName(request.arguments.scriptKindName!), // TODO: GH#18217
                request.arguments.projectRootPath ? ts.server.toNormalizedPath(request.arguments.projectRootPath) : undefined);
            return this.notRequired();
        },
        [CommandNames.Quickinfo]: (request: ts.server.protocol.QuickInfoRequest) => {
            return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.QuickinfoFull]: (request: ts.server.protocol.QuickInfoRequest) => {
            return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.GetOutliningSpans]: (request: ts.server.protocol.FileRequest) => {
            return this.requiredResponse(this.getOutliningSpans(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.GetOutliningSpansFull]: (request: ts.server.protocol.FileRequest) => {
            return this.requiredResponse(this.getOutliningSpans(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.TodoComments]: (request: ts.server.protocol.TodoCommentRequest) => {
            return this.requiredResponse(this.getTodoComments(request.arguments));
        },
        [CommandNames.Indentation]: (request: ts.server.protocol.IndentationRequest) => {
            return this.requiredResponse(this.getIndentation(request.arguments));
        },
        [CommandNames.NameOrDottedNameSpan]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getNameOrDottedNameSpan(request.arguments));
        },
        [CommandNames.BreakpointStatement]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getBreakpointStatement(request.arguments));
        },
        [CommandNames.BraceCompletion]: (request: ts.server.protocol.BraceCompletionRequest) => {
            return this.requiredResponse(this.isValidBraceCompletion(request.arguments));
        },
        [CommandNames.DocCommentTemplate]: (request: ts.server.protocol.DocCommentTemplateRequest) => {
            return this.requiredResponse(this.getDocCommentTemplate(request.arguments));
        },
        [CommandNames.GetSpanOfEnclosingComment]: (request: ts.server.protocol.SpanOfEnclosingCommentRequest) => {
            return this.requiredResponse(this.getSpanOfEnclosingComment(request.arguments));
        },
        [CommandNames.FileReferences]: (request: ts.server.protocol.FileReferencesRequest) => {
            return this.requiredResponse(this.getFileReferences(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.FileReferencesFull]: (request: ts.server.protocol.FileReferencesRequest) => {
            return this.requiredResponse(this.getFileReferences(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.Format]: (request: ts.server.protocol.FormatRequest) => {
            return this.requiredResponse(this.getFormattingEditsForRange(request.arguments));
        },
        [CommandNames.Formatonkey]: (request: ts.server.protocol.FormatOnKeyRequest) => {
            return this.requiredResponse(this.getFormattingEditsAfterKeystroke(request.arguments));
        },
        [CommandNames.FormatFull]: (request: ts.server.protocol.FormatRequest) => {
            return this.requiredResponse(this.getFormattingEditsForDocumentFull(request.arguments));
        },
        [CommandNames.FormatonkeyFull]: (request: ts.server.protocol.FormatOnKeyRequest) => {
            return this.requiredResponse(this.getFormattingEditsAfterKeystrokeFull(request.arguments));
        },
        [CommandNames.FormatRangeFull]: (request: ts.server.protocol.FormatRequest) => {
            return this.requiredResponse(this.getFormattingEditsForRangeFull(request.arguments));
        },
        [CommandNames.CompletionInfo]: (request: ts.server.protocol.CompletionsRequest) => {
            return this.requiredResponse(this.getCompletions(request.arguments, CommandNames.CompletionInfo));
        },
        [CommandNames.Completions]: (request: ts.server.protocol.CompletionsRequest) => {
            return this.requiredResponse(this.getCompletions(request.arguments, CommandNames.Completions));
        },
        [CommandNames.CompletionsFull]: (request: ts.server.protocol.CompletionsRequest) => {
            return this.requiredResponse(this.getCompletions(request.arguments, CommandNames.CompletionsFull));
        },
        [CommandNames.CompletionDetails]: (request: ts.server.protocol.CompletionDetailsRequest) => {
            return this.requiredResponse(this.getCompletionEntryDetails(request.arguments, /*fullResult*/ false));
        },
        [CommandNames.CompletionDetailsFull]: (request: ts.server.protocol.CompletionDetailsRequest) => {
            return this.requiredResponse(this.getCompletionEntryDetails(request.arguments, /*fullResult*/ true));
        },
        [CommandNames.CompileOnSaveAffectedFileList]: (request: ts.server.protocol.CompileOnSaveAffectedFileListRequest) => {
            return this.requiredResponse(this.getCompileOnSaveAffectedFileList(request.arguments));
        },
        [CommandNames.CompileOnSaveEmitFile]: (request: ts.server.protocol.CompileOnSaveEmitFileRequest) => {
            return this.requiredResponse(this.emitFile(request.arguments));
        },
        [CommandNames.SignatureHelp]: (request: ts.server.protocol.SignatureHelpRequest) => {
            return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.SignatureHelpFull]: (request: ts.server.protocol.SignatureHelpRequest) => {
            return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.CompilerOptionsDiagnosticsFull]: (request: ts.server.protocol.CompilerOptionsDiagnosticsRequest) => {
            return this.requiredResponse(this.getCompilerOptionsDiagnostics(request.arguments));
        },
        [CommandNames.EncodedSyntacticClassificationsFull]: (request: ts.server.protocol.EncodedSyntacticClassificationsRequest) => {
            return this.requiredResponse(this.getEncodedSyntacticClassifications(request.arguments));
        },
        [CommandNames.EncodedSemanticClassificationsFull]: (request: ts.server.protocol.EncodedSemanticClassificationsRequest) => {
            return this.requiredResponse(this.getEncodedSemanticClassifications(request.arguments));
        },
        [CommandNames.Cleanup]: () => {
            this.cleanup();
            return this.requiredResponse(/*response*/ true);
        },
        [CommandNames.SemanticDiagnosticsSync]: (request: ts.server.protocol.SemanticDiagnosticsSyncRequest) => {
            return this.requiredResponse(this.getSemanticDiagnosticsSync(request.arguments));
        },
        [CommandNames.SyntacticDiagnosticsSync]: (request: ts.server.protocol.SyntacticDiagnosticsSyncRequest) => {
            return this.requiredResponse(this.getSyntacticDiagnosticsSync(request.arguments));
        },
        [CommandNames.SuggestionDiagnosticsSync]: (request: ts.server.protocol.SuggestionDiagnosticsSyncRequest) => {
            return this.requiredResponse(this.getSuggestionDiagnosticsSync(request.arguments));
        },
        [CommandNames.Geterr]: (request: ts.server.protocol.GeterrRequest) => {
            this.errorCheck.startNew(next => this.getDiagnostics(next, request.arguments.delay, request.arguments.files));
            return this.notRequired();
        },
        [CommandNames.GeterrForProject]: (request: ts.server.protocol.GeterrForProjectRequest) => {
            this.errorCheck.startNew(next => this.getDiagnosticsForProject(next, request.arguments.delay, request.arguments.file));
            return this.notRequired();
        },
        [CommandNames.Change]: (request: ts.server.protocol.ChangeRequest) => {
            this.change(request.arguments);
            return this.notRequired();
        },
        [CommandNames.Configure]: (request: ts.server.protocol.ConfigureRequest) => {
            this.projectService.setHostConfiguration(request.arguments);
            this.doOutput(/*info*/ undefined, CommandNames.Configure, request.seq, /*success*/ true);
            return this.notRequired();
        },
        [CommandNames.Reload]: (request: ts.server.protocol.ReloadRequest) => {
            this.reload(request.arguments, request.seq);
            return this.requiredResponse({ reloadFinished: true });
        },
        [CommandNames.Saveto]: (request: ts.server.protocol.Request) => {
            const savetoArgs = request.arguments as ts.server.protocol.SavetoRequestArgs;
            this.saveToTmp(savetoArgs.file, savetoArgs.tmpfile);
            return this.notRequired();
        },
        [CommandNames.Close]: (request: ts.server.protocol.Request) => {
            const closeArgs = request.arguments as ts.server.protocol.FileRequestArgs;
            this.closeClientFile(closeArgs.file);
            return this.notRequired();
        },
        [CommandNames.Navto]: (request: ts.server.protocol.NavtoRequest) => {
            return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.NavtoFull]: (request: ts.server.protocol.NavtoRequest) => {
            return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.Brace]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.BraceFull]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.NavBar]: (request: ts.server.protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationBarItems(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.NavBarFull]: (request: ts.server.protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationBarItems(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.NavTree]: (request: ts.server.protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationTree(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.NavTreeFull]: (request: ts.server.protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationTree(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.Occurrences]: (request: ts.server.protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getOccurrences(request.arguments));
        },
        [CommandNames.DocumentHighlights]: (request: ts.server.protocol.DocumentHighlightsRequest) => {
            return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.DocumentHighlightsFull]: (request: ts.server.protocol.DocumentHighlightsRequest) => {
            return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.CompilerOptionsForInferredProjects]: (request: ts.server.protocol.SetCompilerOptionsForInferredProjectsRequest) => {
            this.setCompilerOptionsForInferredProjects(request.arguments);
            return this.requiredResponse(/*response*/ true);
        },
        [CommandNames.ProjectInfo]: (request: ts.server.protocol.ProjectInfoRequest) => {
            return this.requiredResponse(this.getProjectInfo(request.arguments));
        },
        [CommandNames.ReloadProjects]: () => {
            this.projectService.reloadProjects();
            return this.notRequired();
        },
        [CommandNames.JsxClosingTag]: (request: ts.server.protocol.JsxClosingTagRequest) => {
            return this.requiredResponse(this.getJsxClosingTag(request.arguments));
        },
        [CommandNames.GetCodeFixes]: (request: ts.server.protocol.CodeFixRequest) => {
            return this.requiredResponse(this.getCodeFixes(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.GetCodeFixesFull]: (request: ts.server.protocol.CodeFixRequest) => {
            return this.requiredResponse(this.getCodeFixes(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.GetCombinedCodeFix]: (request: ts.server.protocol.GetCombinedCodeFixRequest) => {
            return this.requiredResponse(this.getCombinedCodeFix(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.GetCombinedCodeFixFull]: (request: ts.server.protocol.GetCombinedCodeFixRequest) => {
            return this.requiredResponse(this.getCombinedCodeFix(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.ApplyCodeActionCommand]: (request: ts.server.protocol.ApplyCodeActionCommandRequest) => {
            return this.requiredResponse(this.applyCodeActionCommand(request.arguments));
        },
        [CommandNames.GetSupportedCodeFixes]: () => {
            return this.requiredResponse(this.getSupportedCodeFixes());
        },
        [CommandNames.GetApplicableRefactors]: (request: ts.server.protocol.GetApplicableRefactorsRequest) => {
            return this.requiredResponse(this.getApplicableRefactors(request.arguments));
        },
        [CommandNames.GetEditsForRefactor]: (request: ts.server.protocol.GetEditsForRefactorRequest) => {
            return this.requiredResponse(this.getEditsForRefactor(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.GetEditsForRefactorFull]: (request: ts.server.protocol.GetEditsForRefactorRequest) => {
            return this.requiredResponse(this.getEditsForRefactor(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.OrganizeImports]: (request: ts.server.protocol.OrganizeImportsRequest) => {
            return this.requiredResponse(this.organizeImports(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.OrganizeImportsFull]: (request: ts.server.protocol.OrganizeImportsRequest) => {
            return this.requiredResponse(this.organizeImports(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.GetEditsForFileRename]: (request: ts.server.protocol.GetEditsForFileRenameRequest) => {
            return this.requiredResponse(this.getEditsForFileRename(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.GetEditsForFileRenameFull]: (request: ts.server.protocol.GetEditsForFileRenameRequest) => {
            return this.requiredResponse(this.getEditsForFileRename(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.ConfigurePlugin]: (request: ts.server.protocol.ConfigurePluginRequest) => {
            this.configurePlugin(request.arguments);
            this.doOutput(/*info*/ undefined, CommandNames.ConfigurePlugin, request.seq, /*success*/ true);
            return this.notRequired();
        },
        [CommandNames.SelectionRange]: (request: ts.server.protocol.SelectionRangeRequest) => {
            return this.requiredResponse(this.getSmartSelectionRange(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.SelectionRangeFull]: (request: ts.server.protocol.SelectionRangeRequest) => {
            return this.requiredResponse(this.getSmartSelectionRange(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.PrepareCallHierarchy]: (request: ts.server.protocol.PrepareCallHierarchyRequest) => {
            return this.requiredResponse(this.prepareCallHierarchy(request.arguments));
        },
        [CommandNames.ProvideCallHierarchyIncomingCalls]: (request: ts.server.protocol.ProvideCallHierarchyIncomingCallsRequest) => {
            return this.requiredResponse(this.provideCallHierarchyIncomingCalls(request.arguments));
        },
        [CommandNames.ProvideCallHierarchyOutgoingCalls]: (request: ts.server.protocol.ProvideCallHierarchyOutgoingCallsRequest) => {
            return this.requiredResponse(this.provideCallHierarchyOutgoingCalls(request.arguments));
        },
        [CommandNames.ToggleLineComment]: (request: ts.server.protocol.ToggleLineCommentRequest) => {
            return this.requiredResponse(this.toggleLineComment(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.ToggleLineCommentFull]: (request: ts.server.protocol.ToggleLineCommentRequest) => {
            return this.requiredResponse(this.toggleLineComment(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.ToggleMultilineComment]: (request: ts.server.protocol.ToggleMultilineCommentRequest) => {
            return this.requiredResponse(this.toggleMultilineComment(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.ToggleMultilineCommentFull]: (request: ts.server.protocol.ToggleMultilineCommentRequest) => {
            return this.requiredResponse(this.toggleMultilineComment(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.CommentSelection]: (request: ts.server.protocol.CommentSelectionRequest) => {
            return this.requiredResponse(this.commentSelection(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.CommentSelectionFull]: (request: ts.server.protocol.CommentSelectionRequest) => {
            return this.requiredResponse(this.commentSelection(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.UncommentSelection]: (request: ts.server.protocol.UncommentSelectionRequest) => {
            return this.requiredResponse(this.uncommentSelection(request.arguments, /*simplifiedResult*/ true));
        },
        [CommandNames.UncommentSelectionFull]: (request: ts.server.protocol.UncommentSelectionRequest) => {
            return this.requiredResponse(this.uncommentSelection(request.arguments, /*simplifiedResult*/ false));
        },
        [CommandNames.ProvideInlayHints]: (request: ts.server.protocol.InlayHintsRequest) => {
            return this.requiredResponse(this.provideInlayHints(request.arguments));
        }
    }));

    public addProtocolHandler(command: string, handler: (request: ts.server.protocol.Request) => HandlerResponse) {
        if (this.handlers.has(command)) {
            throw new Error(`Protocol handler already exists for command "${command}"`);
        }
        this.handlers.set(command, handler);
    }

    private setCurrentRequest(requestId: number): void {
        ts.Debug.assert(this.currentRequestId === undefined);
        this.currentRequestId = requestId;
        this.cancellationToken.setRequest(requestId);
    }

    private resetCurrentRequest(requestId: number): void {
        ts.Debug.assert(this.currentRequestId === requestId);
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

    public executeCommand(request: ts.server.protocol.Request): HandlerResponse {
        const handler = this.handlers.get(request.command);
        if (handler) {
            const response = this.executeWithRequestId(request.seq, () => handler(request));
            this.projectService.enableRequestedPlugins();
            return response;
        }
        else {
            this.logger.msg(`Unrecognized JSON command:${ts.server.stringifyIndented(request)}`, ts.server.Msg.Err);
            this.doOutput(/*info*/ undefined, CommandNames.Unknown, request.seq, /*success*/ false, `Unrecognized JSON command: ${request.command}`);
            return { responseRequired: false };
        }
    }

    public onMessage(message: TMessage) {
        this.gcTimer.scheduleCollect();

        this.performanceData = undefined;

        let start: number[] | undefined;
        if (this.logger.hasLevel(ts.server.LogLevel.requestTime)) {
            start = this.hrtime();
            if (this.logger.hasLevel(ts.server.LogLevel.verbose)) {
                this.logger.info(`request:${ts.server.indent(this.toStringMessage(message))}`);
            }
        }

        let request: ts.server.protocol.Request | undefined;
        let relevantFile: ts.server.protocol.FileRequestArgs | undefined;
        try {
            request = this.parseMessage(message);
            relevantFile = request.arguments && (request as ts.server.protocol.FileRequest).arguments.file ? (request as ts.server.protocol.FileRequest).arguments : undefined;

            ts.tracing?.instant(ts.tracing.Phase.Session, "request", { seq: request.seq, command: request.command });
            ts.perfLogger.logStartCommand("" + request.command, this.toStringMessage(message).substring(0, 100));

            ts.tracing?.push(ts.tracing.Phase.Session, "executeCommand", { seq: request.seq, command: request.command }, /*separateBeginAndEnd*/ true);
            const { response, responseRequired } = this.executeCommand(request);
            ts.tracing?.pop();

            if (this.logger.hasLevel(ts.server.LogLevel.requestTime)) {
                const elapsedTime = hrTimeToMilliseconds(this.hrtime(start)).toFixed(4);
                if (responseRequired) {
                    this.logger.perftrc(`${request.seq}::${request.command}: elapsed time (in milliseconds) ${elapsedTime}`);
                }
                else {
                    this.logger.perftrc(`${request.seq}::${request.command}: async elapsed time (in milliseconds) ${elapsedTime}`);
                }
            }

            // Note: Log before writing the response, else the editor can complete its activity before the server does
            ts.perfLogger.logStopCommand("" + request.command, "Success");
            ts.tracing?.instant(ts.tracing.Phase.Session, "response", { seq: request.seq, command: request.command, success: !!response });
            if (response) {
                this.doOutput(response, request.command, request.seq, /*success*/ true);
            }
            else if (responseRequired) {
                this.doOutput(/*info*/ undefined, request.command, request.seq, /*success*/ false, "No content available.");
            }
        }
        catch (err) {
            // Cancellation or an error may have left incomplete events on the tracing stack.
            ts.tracing?.popAll();

            if (err instanceof ts.OperationCanceledException) {
                // Handle cancellation exceptions
                ts.perfLogger.logStopCommand("" + (request && request.command), "Canceled: " + err);
                ts.tracing?.instant(ts.tracing.Phase.Session, "commandCanceled", { seq: request?.seq, command: request?.command });
                this.doOutput({ canceled: true }, request!.command, request!.seq, /*success*/ true);
                return;
            }

            this.logErrorWorker(err, this.toStringMessage(message), relevantFile);
            ts.perfLogger.logStopCommand("" + (request && request.command), "Error: " + err);
            ts.tracing?.instant(ts.tracing.Phase.Session, "commandError", { seq: request?.seq, command: request?.command, message: (err as Error).message });

            this.doOutput(
                /*info*/ undefined,
                request ? request.command : CommandNames.Unknown,
                request ? request.seq : 0,
                /*success*/ false,
                "Error processing request. " + (err as StackTraceError).message + "\n" + (err as StackTraceError).stack);
        }
    }

    protected parseMessage(message: TMessage): ts.server.protocol.Request {
        return JSON.parse(message as any as string) as ts.server.protocol.Request;
    }

    protected toStringMessage(message: TMessage): string {
        return message as any as string;
    }

    private getFormatOptions(file: ts.server.NormalizedPath): ts.FormatCodeSettings {
        return this.projectService.getFormatCodeOptions(file);
    }

    private getPreferences(file: ts.server.NormalizedPath): ts.server.protocol.UserPreferences {
        return this.projectService.getPreferences(file);
    }

    private getHostFormatOptions(): ts.FormatCodeSettings {
        return this.projectService.getHostFormatCodeOptions();
    }

    private getHostPreferences(): ts.server.protocol.UserPreferences {
        return this.projectService.getHostPreferences();
    }
}

interface FileAndProject {
    readonly file: ts.server.NormalizedPath;
    readonly project: ts.server.Project;
}

function toProtocolTextSpan(textSpan: ts.TextSpan, scriptInfo: ts.server.ScriptInfo): ts.server.protocol.TextSpan {
    return {
        start: scriptInfo.positionToLineOffset(textSpan.start),
        end: scriptInfo.positionToLineOffset(ts.textSpanEnd(textSpan))
    };
}

function toProtocolTextSpanWithContext(span: ts.TextSpan, contextSpan: ts.TextSpan | undefined, scriptInfo: ts.server.ScriptInfo): ts.server.protocol.TextSpanWithContext {
    const textSpan = toProtocolTextSpan(span, scriptInfo);
    const contextTextSpan = contextSpan && toProtocolTextSpan(contextSpan, scriptInfo);
    return contextTextSpan ?
        { ...textSpan, contextStart: contextTextSpan.start, contextEnd: contextTextSpan.end } :
        textSpan;
}

function convertTextChangeToCodeEdit(change: ts.TextChange, scriptInfo: ts.server.ScriptInfoOrConfig): ts.server.protocol.CodeEdit {
    return { start: positionToLineOffset(scriptInfo, change.span.start), end: positionToLineOffset(scriptInfo, ts.textSpanEnd(change.span)), newText: change.newText };
}

function positionToLineOffset(info: ts.server.ScriptInfoOrConfig, position: number): ts.server.protocol.Location {
    return ts.server.isConfigFile(info) ? locationFromLineAndCharacter(info.getLineAndCharacterOfPosition(position)) : info.positionToLineOffset(position);
}

function locationFromLineAndCharacter(lc: ts.LineAndCharacter): ts.server.protocol.Location {
    return { line: lc.line + 1, offset: lc.character + 1 };
}

function convertNewFileTextChangeToCodeEdit(textChanges: ts.FileTextChanges): ts.server.protocol.FileCodeEdits {
    ts.Debug.assert(textChanges.textChanges.length === 1);
    const change = ts.first(textChanges.textChanges);
    ts.Debug.assert(change.span.start === 0 && change.span.length === 0);
    return { fileName: textChanges.fileName, textChanges: [{ start: { line: 0, offset: 0 }, end: { line: 0, offset: 0 }, newText: change.newText }] };
}

export interface HandlerResponse {
    response?: {};
    responseRequired?: boolean;
}

/* @internal */ // Exported only for tests
export function getLocationInNewDocument(oldText: string, renameFilename: string, renameLocation: number, edits: readonly ts.FileTextChanges[]): ts.server.protocol.Location {
    const newText = applyEdits(oldText, renameFilename, edits);
    const { line, character } = ts.computeLineAndCharacterOfPosition(ts.computeLineStarts(newText), renameLocation);
    return { line: line + 1, offset: character + 1 };
}

function applyEdits(text: string, textFilename: string, edits: readonly ts.FileTextChanges[]): string {
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

function referenceEntryToReferencesResponseItem(projectService: ts.server.ProjectService, { fileName, textSpan, contextSpan, isWriteAccess, isDefinition }: ts.ReferencedSymbolEntry, { disableLineTextInReferences }: ts.server.protocol.UserPreferences): ts.server.protocol.ReferencesResponseItem {
    const scriptInfo = ts.Debug.checkDefined(projectService.getScriptInfo(fileName));
    const span = toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo);
    const lineText = disableLineTextInReferences ? undefined : getLineText(scriptInfo, span);
    return {
        file: fileName,
        ...span,
        lineText,
        isWriteAccess,
        isDefinition
    };
}

function getLineText(scriptInfo: ts.server.ScriptInfo, span: ts.server.protocol.TextSpanWithContext) {
    const lineSpan = scriptInfo.lineToTextSpan(span.start.line - 1);
    return scriptInfo.getSnapshot().getText(lineSpan.start, ts.textSpanEnd(lineSpan)).replace(/\r|\n/g, "");
}

function isCompletionEntryData(data: any): data is ts.CompletionEntryData {
    return data === undefined || data && typeof data === "object"
        && typeof data.exportName === "string"
        && (data.fileName === undefined || typeof data.fileName === "string")
        && (data.ambientModuleName === undefined || typeof data.ambientModuleName === "string"
        && (data.isPackageJsonImport === undefined || typeof data.isPackageJsonImport === "boolean"));
}
}
