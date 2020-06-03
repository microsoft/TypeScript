namespace ts.server {
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
        resetRequest: () => void 0
    };

    function hrTimeToMilliseconds(time: number[]): number {
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

        if ((isInferredProject(project) || isExternalProject(project)) &&
            project.isJsOnlyProject()) {
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
            source: diag.source,
            relatedInformation: map(diag.relatedInformation, formatRelatedInformation),
        };
    }

    function formatRelatedInformation(info: DiagnosticRelatedInformation): protocol.DiagnosticRelatedInformation {
        if (!info.file) {
            return {
                message: flattenDiagnosticMessageText(info.messageText, "\n"),
                category: diagnosticCategoryName(info),
                code: info.code
            };
        }
        return {
            span: {
                start: convertToLocation(getLineAndCharacterOfPosition(info.file, info.start!)),
                end: convertToLocation(getLineAndCharacterOfPosition(info.file, info.start! + info.length!)), // TODO: GH#18217
                file: info.file.fileName
            },
            message: flattenDiagnosticMessageText(info.messageText, "\n"),
            category: diagnosticCategoryName(info),
            code: info.code
        };
    }

    function convertToLocation(lineAndCharacter: LineAndCharacter): protocol.Location {
        return { line: lineAndCharacter.line + 1, offset: lineAndCharacter.character + 1 };
    }

    function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: true): protocol.DiagnosticWithFileName;
    function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: false): protocol.Diagnostic;
    function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: boolean): protocol.Diagnostic | protocol.DiagnosticWithFileName {
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
    export type CommandNames = protocol.CommandTypes;
    export const CommandNames = (<any>protocol).CommandTypes;

    export function formatMessage<T extends protocol.Message>(msg: T, logger: Logger, byteLength: (s: string, encoding: string) => number, newLine: string): string {
        const verboseLogging = logger.hasLevel(LogLevel.verbose);

        const json = JSON.stringify(msg);
        if (verboseLogging) {
            logger.info(`${msg.type}:${indent(json)}`);
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
            Debug.assert(requestId === this.operationHost.getCurrentRequestId(), "immediate: incorrect request id");
            this.setImmediateId(this.operationHost.getServerHost().setImmediate(() => {
                this.immediateId = undefined;
                this.operationHost.executeWithRequestId(requestId, () => this.executeAction(action));
            }));
        }

        public delay(ms: number, action: () => void) {
            const requestId = this.requestId!;
            Debug.assert(requestId === this.operationHost.getCurrentRequestId(), "delay: incorrect request id");
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
                }
                else {
                    action(this);
                }
            }
            catch (e) {
                stop = true;
                // ignore cancellation request
                if (!(e instanceof OperationCanceledException)) {
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
            body
        };
    }

    type Projects = readonly Project[] | {
        readonly projects: readonly Project[];
        readonly symLinkedProjects: MultiMap<Project>;
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
                const value = getValue(path as Path);
                outputs.push(...flatMap(projects, project => action(project, value)));
            });
        }
        return deduplicate(outputs, equateValues);
    }

    function combineProjectOutputFromEveryProject<T>(projectService: ProjectService, action: (project: Project) => readonly T[], areEqual: (a: T, b: T) => boolean) {
        const outputs: T[] = [];
        projectService.loadAncestorProjectTree();
        projectService.forEachEnabledProject(project => {
            const theseOutputs = action(project);
            outputs.push(...theseOutputs.filter(output => !outputs.some(o => areEqual(o, output))));
        });
        return outputs;
    }

    function combineProjectOutputWhileOpeningReferencedProjects<T>(
        projects: Projects,
        defaultProject: Project,
        action: (project: Project) => readonly T[],
        getLocation: (t: T) => DocumentPosition,
        resultsEqual: (a: T, b: T) => boolean,
    ): T[] {
        const outputs: T[] = [];
        combineProjectOutputWorker(
            projects,
            defaultProject,
            /*initialLocation*/ undefined,
            (project, _, tryAddToTodo) => {
                for (const output of action(project)) {
                    if (!contains(outputs, output, resultsEqual) && !tryAddToTodo(project, getLocation(output))) {
                        outputs.push(output);
                    }
                }
            },
        );
        return outputs;
    }

    function combineProjectOutputForRenameLocations(
        projects: Projects,
        defaultProject: Project,
        initialLocation: DocumentPosition,
        findInStrings: boolean,
        findInComments: boolean,
        hostPreferences: UserPreferences
    ): readonly RenameLocation[] {
        const outputs: RenameLocation[] = [];

        combineProjectOutputWorker(
            projects,
            defaultProject,
            initialLocation,
            (project, location, tryAddToTodo) => {
                for (const output of project.getLanguageService().findRenameLocations(location.fileName, location.pos, findInStrings, findInComments, hostPreferences.providePrefixAndSuffixTextForRename) || emptyArray) {
                    if (!contains(outputs, output, documentSpansEqual) && !tryAddToTodo(project, documentSpanLocation(output))) {
                        outputs.push(output);
                    }
                }
            },
        );

        return outputs;
    }

    function getDefinitionLocation(defaultProject: Project, initialLocation: DocumentPosition): DocumentPosition | undefined {
        const infos = defaultProject.getLanguageService().getDefinitionAtPosition(initialLocation.fileName, initialLocation.pos);
        const info = infos && firstOrUndefined(infos);
        return info && !info.isLocal ? { fileName: info.fileName, pos: info.textSpan.start } : undefined;
    }

    function combineProjectOutputForReferences(
        projects: Projects,
        defaultProject: Project,
        initialLocation: DocumentPosition
    ): readonly ReferencedSymbol[] {
        const outputs: ReferencedSymbol[] = [];

        combineProjectOutputWorker(
            projects,
            defaultProject,
            initialLocation,
            (project, location, getMappedLocation) => {
                for (const outputReferencedSymbol of project.getLanguageService().findReferences(location.fileName, location.pos) || emptyArray) {
                    const mappedDefinitionFile = getMappedLocation(project, documentSpanLocation(outputReferencedSymbol.definition));
                    const definition: ReferencedSymbolDefinitionInfo = mappedDefinitionFile === undefined ?
                        outputReferencedSymbol.definition :
                        {
                            ...outputReferencedSymbol.definition,
                            textSpan: createTextSpan(mappedDefinitionFile.pos, outputReferencedSymbol.definition.textSpan.length),
                            fileName: mappedDefinitionFile.fileName,
                            contextSpan: getMappedContextSpan(outputReferencedSymbol.definition, project)
                        };

                    let symbolToAddTo = find(outputs, o => documentSpansEqual(o.definition, definition));
                    if (!symbolToAddTo) {
                        symbolToAddTo = { definition, references: [] };
                        outputs.push(symbolToAddTo);
                    }

                    for (const ref of outputReferencedSymbol.references) {
                        // If it's in a mapped file, that is added to the todo list by `getMappedLocation`.
                        if (!contains(symbolToAddTo.references, ref, documentSpansEqual) && !getMappedLocation(project, documentSpanLocation(ref))) {
                            symbolToAddTo.references.push(ref);
                        }
                    }
                }
            },
        );

        return outputs.filter(o => o.references.length !== 0);
    }

    interface ProjectAndLocation<TLocation extends DocumentPosition | undefined> {
        readonly project: Project;
        readonly location: TLocation;
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

    type CombineProjectOutputCallback<TLocation extends DocumentPosition | undefined> = (
        project: Project,
        location: TLocation,
        getMappedLocation: (project: Project, location: DocumentPosition) => DocumentPosition | undefined,
    ) => void;

    function combineProjectOutputWorker<TLocation extends DocumentPosition | undefined>(
        projects: Projects,
        defaultProject: Project,
        initialLocation: TLocation,
        cb: CombineProjectOutputCallback<TLocation>
    ): void {
        const projectService = defaultProject.projectService;
        let toDo: ProjectAndLocation<TLocation>[] | undefined;
        const seenProjects = createMap<true>();
        forEachProjectInProjects(projects, initialLocation && initialLocation.fileName, (project, path) => {
            // TLocation should be either `DocumentPosition` or `undefined`. Since `initialLocation` is `TLocation` this cast should be valid.
            const location = (initialLocation ? { fileName: path, pos: initialLocation.pos } : undefined) as TLocation;
            toDo = callbackProjectAndLocation(project, location, projectService, toDo, seenProjects, cb);
        });

        // After initial references are collected, go over every other project and see if it has a reference for the symbol definition.
        if (initialLocation) {
            const defaultDefinition = getDefinitionLocation(defaultProject, initialLocation!);
            if (defaultDefinition) {
                const getGeneratedDefinition = memoize(() => defaultProject.isSourceOfProjectReferenceRedirect(defaultDefinition.fileName) ?
                    defaultDefinition :
                    defaultProject.getLanguageService().getSourceMapper().tryGetGeneratedPosition(defaultDefinition));
                const getSourceDefinition = memoize(() => defaultProject.isSourceOfProjectReferenceRedirect(defaultDefinition.fileName) ?
                    defaultDefinition :
                    defaultProject.getLanguageService().getSourceMapper().tryGetSourcePosition(defaultDefinition));
                projectService.loadAncestorProjectTree(seenProjects);
                projectService.forEachEnabledProject(project => {
                    if (!addToSeen(seenProjects, project)) return;
                    const definition = mapDefinitionInProject(defaultDefinition, project, getGeneratedDefinition, getSourceDefinition);
                    if (definition) {
                        toDo = callbackProjectAndLocation<TLocation>(project, definition as TLocation, projectService, toDo, seenProjects, cb);
                    }
                });
            }
        }

        while (toDo && toDo.length) {
            const next = toDo.pop();
            Debug.assertIsDefined(next);
            toDo = callbackProjectAndLocation(next.project, next.location, projectService, toDo, seenProjects, cb);
        }
    }

    function mapDefinitionInProject(
        definition: DocumentPosition,
        project: Project,
        getGeneratedDefinition: () => DocumentPosition | undefined,
        getSourceDefinition: () => DocumentPosition | undefined
    ): DocumentPosition | undefined {
        // If the definition is actually from the project, definition is correct as is
        if (project.containsFile(toNormalizedPath(definition.fileName)) &&
            !isLocationProjectReferenceRedirect(project, definition)) {
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

    function callbackProjectAndLocation<TLocation extends DocumentPosition | undefined>(
        project: Project,
        location: TLocation,
        projectService: ProjectService,
        toDo: ProjectAndLocation<TLocation>[] | undefined,
        seenProjects: Map<true>,
        cb: CombineProjectOutputCallback<TLocation>,
    ): ProjectAndLocation<TLocation>[] | undefined {
        if (project.getCancellationToken().isCancellationRequested()) return undefined; // Skip rest of toDo if cancelled
        // If this is not the file we were actually looking, return rest of the toDo
        if (isLocationProjectReferenceRedirect(project, location)) return toDo;
        cb(project, location, (innerProject, location) => {
            addToSeen(seenProjects, project);
            const originalLocation = projectService.getOriginalLocationEnsuringConfiguredProject(innerProject, location);
            if (!originalLocation) return undefined;

            const originalScriptInfo = projectService.getScriptInfo(originalLocation.fileName)!;
            toDo = toDo || [];

            for (const project of originalScriptInfo.containingProjects) {
                addToTodo(project, originalLocation as TLocation, toDo, seenProjects);
            }
            const symlinkedProjectsMap = projectService.getSymlinkedProjects(originalScriptInfo);
            if (symlinkedProjectsMap) {
                symlinkedProjectsMap.forEach((symlinkedProjects, symlinkedPath) => {
                    for (const symlinkedProject of symlinkedProjects) {
                        addToTodo(symlinkedProject, { fileName: symlinkedPath, pos: originalLocation.pos } as TLocation, toDo!, seenProjects);
                    }
                });
            }
            return originalLocation === location ? undefined : originalLocation;
        });
        return toDo;
    }

    function addToTodo<TLocation extends DocumentPosition | undefined>(project: Project, location: TLocation, toDo: Push<ProjectAndLocation<TLocation>>, seenProjects: Map<true>): void {
        if (addToSeen(seenProjects, project)) toDo.push({ project, location });
    }

    function addToSeen(seenProjects: Map<true>, project: Project) {
        return ts.addToSeen(seenProjects, getProjectKey(project));
    }

    function getProjectKey(project: Project) {
        return isConfiguredProject(project) ? project.canonicalConfigFilePath : project.getProjectName();
    }

    function documentSpanLocation({ fileName, textSpan }: DocumentSpan): DocumentPosition {
        return { fileName, pos: textSpan.start };
    }

    function getMappedLocation(location: DocumentPosition, project: Project): DocumentPosition | undefined {
        const mapsTo = project.getSourceMapper().tryGetSourcePosition(location);
        return mapsTo && project.projectService.fileExists(toNormalizedPath(mapsTo.fileName)) ? mapsTo : undefined;
    }

    function getMappedDocumentSpan(documentSpan: DocumentSpan, project: Project): DocumentSpan | undefined {
        const newPosition = getMappedLocation(documentSpanLocation(documentSpan), project);
        if (!newPosition) return undefined;
        return {
            fileName: newPosition.fileName,
            textSpan: {
                start: newPosition.pos,
                length: documentSpan.textSpan.length
            },
            originalFileName: documentSpan.fileName,
            originalTextSpan: documentSpan.textSpan,
            contextSpan: getMappedContextSpan(documentSpan, project),
            originalContextSpan: documentSpan.contextSpan
        };
    }

    function getMappedContextSpan(documentSpan: DocumentSpan, project: Project): TextSpan | undefined {
        const contextSpanStart = documentSpan.contextSpan && getMappedLocation(
            { fileName: documentSpan.fileName, pos: documentSpan.contextSpan.start },
            project
        );
        const contextSpanEnd = documentSpan.contextSpan && getMappedLocation(
            { fileName: documentSpan.fileName, pos: documentSpan.contextSpan.start + documentSpan.contextSpan.length },
            project
        );
        return contextSpanStart && contextSpanEnd ?
            { start: contextSpanStart.pos, length: contextSpanEnd.pos - contextSpanStart.pos } :
            undefined;
    }

    export interface SessionOptions {
        host: ServerHost;
        cancellationToken: ServerCancellationToken;
        useSingleInferredProject: boolean;
        useInferredProjectPerProjectRoot: boolean;
        typingsInstaller: ITypingsInstaller;
        byteLength: (buf: string, encoding?: string) => number;
        hrtime: (start?: number[]) => number[];
        logger: Logger;
        /**
         * If falsy, all events are suppressed.
         */
        canUseEvents: boolean;
        eventHandler?: ProjectServiceEventHandler;
        /** Has no effect if eventHandler is also specified. */
        suppressDiagnosticEvents?: boolean;
        syntaxOnly?: boolean;
        throttleWaitMilliseconds?: number;
        noGetErrOnBackgroundUpdate?: boolean;

        globalPlugins?: readonly string[];
        pluginProbeLocations?: readonly string[];
        allowLocalPluginLoads?: boolean;
        typesMapLocation?: string;
    }

    export class Session implements EventSender {
        private readonly gcTimer: GcTimer;
        protected projectService: ProjectService;
        private changeSeq = 0;

        private updateGraphDurationMs: number | undefined;

        private currentRequestId!: number;
        private errorCheck: MultistepOperation;

        protected host: ServerHost;
        private readonly cancellationToken: ServerCancellationToken;
        protected readonly typingsInstaller: ITypingsInstaller;
        protected byteLength: (buf: string, encoding?: string) => number;
        private hrtime: (start?: number[]) => number[];
        protected logger: Logger;

        protected canUseEvents: boolean;
        private suppressDiagnosticEvents?: boolean;
        private eventHandler: ProjectServiceEventHandler | undefined;
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
                syntaxOnly: opts.syntaxOnly,
            };
            this.projectService = new ProjectService(settings);
            this.projectService.setPerformanceEventHandler(this.performanceEventHandler.bind(this));
            this.gcTimer = new GcTimer(this.host, /*delay*/ 7000, this.logger);
        }

        private sendRequestCompletedEvent(requestId: number): void {
            this.event<protocol.RequestCompletedEventBody>({ request_seq: requestId }, "requestCompleted");
        }

        private performanceEventHandler(event: PerformanceEvent) {
            switch (event.kind) {
                case "UpdateGraph": {
                    this.updateGraphDurationMs = (this.updateGraphDurationMs || 0) + event.durationMs;
                    break;
                }
            }
        }

        private defaultEventHandler(event: ProjectServiceEvent) {
            switch (event.eventName) {
                case ProjectsUpdatedInBackgroundEvent:
                    const { openFiles } = event.data;
                    this.projectsUpdatedInBackgroundEvent(openFiles);
                    break;
                case ProjectLoadingStartEvent:
                    const { project, reason } = event.data;
                    this.event<protocol.ProjectLoadingStartEventBody>(
                        { projectName: project.getProjectName(), reason },
                        ProjectLoadingStartEvent);
                    break;
                case ProjectLoadingFinishEvent:
                    const { project: finishProject } = event.data;
                    this.event<protocol.ProjectLoadingFinishEventBody>({ projectName: finishProject.getProjectName() }, ProjectLoadingFinishEvent);
                    break;
                case LargeFileReferencedEvent:
                    const { file, fileSize, maxFileSize } = event.data;
                    this.event<protocol.LargeFileReferencedEventBody>({ file, fileSize, maxFileSize }, LargeFileReferencedEvent);
                    break;
                case ConfigFileDiagEvent:
                    const { triggerFile, configFileName: configFile, diagnostics } = event.data;
                    const bakedDiags = map(diagnostics, diagnostic => formatDiagnosticToProtocol(diagnostic, /*includeFileName*/ true));
                    this.event<protocol.ConfigFileDiagnosticEventBody>({
                        triggerFile,
                        configFile,
                        diagnostics: bakedDiags
                    }, ConfigFileDiagEvent);
                    break;
                case ProjectLanguageServiceStateEvent: {
                    const eventName: protocol.ProjectLanguageServiceStateEventName = ProjectLanguageServiceStateEvent;
                    this.event<protocol.ProjectLanguageServiceStateEventBody>({
                        projectName: event.data.project.getProjectName(),
                        languageServiceEnabled: event.data.languageServiceEnabled
                    }, eventName);
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
            this.projectService.logger.info(`got projects updated in background, updating diagnostics for ${openFiles}`);
            if (openFiles.length) {
                if (!this.suppressDiagnosticEvents && !this.noGetErrOnBackgroundUpdate) {
                    // For now only queue error checking for open files. We can change this to include non open files as well
                    this.errorCheck.startNew(next => this.updateErrorCheck(next, openFiles, 100, /*requireOpen*/ true));
                }

                // Send project changed event
                this.event<protocol.ProjectsUpdatedInBackgroundEventBody>({
                    openFiles
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
                if ((<StackTraceError>err).stack) {
                    msg += "\n" + indent((<StackTraceError>err).stack!);
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
                    catch { } // eslint-disable-line no-empty
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
                    this.logger.info(`Session does not support events: ignored event: ${JSON.stringify(msg)}`);
                }
                return;
            }
            const msgText = formatMessage(msg, this.logger, this.byteLength, this.host.newLine);
            perfLogger.logEvent(`Response message size: ${msgText.length}`);
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
            const res: protocol.Response = {
                seq: 0,
                type: "response",
                command: cmdName,
                request_seq: reqSeq,
                success,
                performanceData: !this.updateGraphDurationMs
                    ? undefined
                    : {
                        updateGraphDurationMs: this.updateGraphDurationMs,
                    },
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
                        const { metadata: infoMetadata, ...body } = (info as WithMetadata<{}>);
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
            const diags = isDeclarationFileInJSOnlyNonConfiguredProject(project, file)
                ? emptyArray
                : project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file);
            this.sendDiagnosticsEvent(file, project, diags, "semanticDiag");
        }

        private syntacticCheck(file: NormalizedPath, project: Project) {
            this.sendDiagnosticsEvent(file, project, project.getLanguageService().getSyntacticDiagnostics(file), "syntaxDiag");
        }

        private suggestionCheck(file: NormalizedPath, project: Project) {
            this.sendDiagnosticsEvent(file, project, project.getLanguageService().getSuggestionDiagnostics(file), "suggestionDiag");
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
                    next.delay(followMs, checkOne);
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

                // Ensure the project is upto date before checking if this file is present in the project
                updateProjectIfDirty(project);
                if (!project.containsFile(fileName, requireOpen)) {
                    return;
                }

                this.syntacticCheck(fileName, project);
                if (this.changeSeq !== seq) {
                    return;
                }

                next.immediate(() => {
                    this.semanticCheck(fileName, project);
                    if (this.changeSeq !== seq) {
                        return;
                    }

                    if (this.getPreferences(fileName).disableSuggestions) {
                        goNext();
                    }
                    else {
                        next.immediate(() => {
                            this.suggestionCheck(fileName, project);
                            goNext();
                        });
                    }
                });
            };

            if (checkList.length > index && this.changeSeq === seq) {
                next.delay(ms, checkOne);
            }
        }

        private cleanProjects(caption: string, projects: Project[]) {
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
            return project.getLanguageService().getEncodedSemanticClassifications(file, args);
        }

        private getProject(projectFileName: string | undefined): Project | undefined {
            return projectFileName === undefined ? undefined : this.projectService.findProject(projectFileName);
        }

        private getConfigFileAndProject(args: protocol.FileRequestArgs): { configFile: NormalizedPath | undefined, project: Project | undefined } {
            const project = this.getProject(args.projectFileName);
            const file = toNormalizedPath(args.file);

            return {
                configFile: project && project.hasConfigFile(file) ? file : undefined,
                project
            };
        }

        private getConfigFileDiagnostics(configFile: NormalizedPath, project: Project, includeLinePosition: boolean) {
            const projectErrors = project.getAllProjectErrors();
            const optionsErrors = project.getLanguageService().getCompilerOptionsDiagnostics();
            const diagnosticsForConfigFile = filter(
                concatenate(projectErrors, optionsErrors),
                diagnostic => !!diagnostic.file && diagnostic.file.fileName === configFile
            );
            return includeLinePosition ?
                this.convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnosticsForConfigFile) :
                map(
                    diagnosticsForConfigFile,
                    diagnostic => formatDiagnosticToProtocol(diagnostic, /*includeFileName*/ false)
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
                relatedInformation: map(d.relatedInformation, formatRelatedInformation)
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
                    diagnostic => !diagnostic.file
                ),
                /*scriptInfo*/ undefined
            );
        }

        private convertToDiagnosticsWithLinePosition(diagnostics: readonly Diagnostic[], scriptInfo: ScriptInfo | undefined): protocol.DiagnosticWithLinePosition[] {
            return diagnostics.map(d => <protocol.DiagnosticWithLinePosition>{
                message: flattenDiagnosticMessageText(d.messageText, this.host.newLine),
                start: d.start,
                length: d.length,
                category: diagnosticCategoryName(d),
                code: d.code,
                source: d.source,
                startLocation: scriptInfo && scriptInfo.positionToLineOffset(d.start!), // TODO: GH#18217
                endLocation: scriptInfo && scriptInfo.positionToLineOffset(d.start! + d.length!),
                reportsUnnecessary: d.reportsUnnecessary,
                relatedInformation: map(d.relatedInformation, formatRelatedInformation),
            });
        }

        private getDiagnosticsWorker(
            args: protocol.FileRequestArgs, isSemantic: boolean, selector: (project: Project, file: string) => readonly Diagnostic[], includeLinePosition: boolean
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
                const newDocumentSpan = getMappedDocumentSpan(info, project);
                return !newDocumentSpan ? info : {
                    ...newDocumentSpan,
                    containerKind: info.containerKind,
                    containerName: info.containerName,
                    kind: info.kind,
                    name: info.name,
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
                        result.diagnostics.map(d => formatDiagnosticToProtocol(d, /*includeFileName*/ true))
                } :
                result;
        }

        private mapDefinitionInfo(definitions: readonly DefinitionInfo[], project: Project): readonly protocol.FileSpanWithContext[] {
            return definitions.map(def => this.toFileSpanWithContext(def.fileName, def.textSpan, def.contextSpan, project));
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
                    ...<any>def,
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

        private toFileSpan(fileName: string, textSpan: TextSpan, project: Project): protocol.FileSpan {
            const ls = project.getLanguageService();
            const start = ls.toLineColumnOffset!(fileName, textSpan.start); // TODO: GH#18217
            const end = ls.toLineColumnOffset!(fileName, textSpanEnd(textSpan));

            return {
                file: fileName,
                start: { line: start.line + 1, offset: start.character + 1 },
                end: { line: end.line + 1, offset: end.character + 1 }
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
                const newDocumentSpan = getMappedDocumentSpan(info, project);
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

        private getOccurrences(args: protocol.FileLocationRequestArgs): readonly protocol.OccurrencesResponseItem[] {
            const { file, project } = this.getFileAndProject(args);
            const position = this.getPositionInFile(args, file);
            const occurrences = project.getLanguageService().getOccurrencesAtPosition(file, position);
            return occurrences ?
                occurrences.map<protocol.OccurrencesResponseItem>(occurrence => {
                    const { fileName, isWriteAccess, textSpan, isInString, contextSpan } = occurrence;
                    const scriptInfo = project.getScriptInfo(fileName)!;
                    return {
                        ...toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo),
                        file: fileName,
                        isWriteAccess,
                        ...(isInString ? { isInString } : undefined)
                    };
                }) :
                emptyArray;
        }

        private getSyntacticDiagnosticsSync(args: protocol.SyntacticDiagnosticsSyncRequestArgs): readonly protocol.Diagnostic[] | readonly protocol.DiagnosticWithLinePosition[] {
            const { configFile } = this.getConfigFileAndProject(args);
            if (configFile) {
                // all the config file errors are reported as part of semantic check so nothing to report here
                return emptyArray;
            }

            return this.getDiagnosticsWorker(args, /*isSemantic*/ false, (project, file) => project.getLanguageService().getSyntacticDiagnostics(file), !!args.includeLinePosition);
        }

        private getSemanticDiagnosticsSync(args: protocol.SemanticDiagnosticsSyncRequestArgs): readonly protocol.Diagnostic[] | readonly protocol.DiagnosticWithLinePosition[] {
            const { configFile, project } = this.getConfigFileAndProject(args);
            if (configFile) {
                return this.getConfigFileDiagnostics(configFile, project!, !!args.includeLinePosition); // TODO: GH#18217
            }
            return this.getDiagnosticsWorker(args, /*isSemantic*/ true, (project, file) => project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file), !!args.includeLinePosition);
        }

        private getSuggestionDiagnosticsSync(args: protocol.SuggestionDiagnosticsSyncRequestArgs): readonly protocol.Diagnostic[] | readonly protocol.DiagnosticWithLinePosition[] {
            const { configFile } = this.getConfigFileAndProject(args);
            if (configFile) {
                // Currently there are no info diagnostics for config files.
                return emptyArray;
            }
            // isSemantic because we don't want to info diagnostics in declaration files for JS-only users
            return this.getDiagnosticsWorker(args, /*isSemantic*/ true, (project, file) => project.getLanguageService().getSuggestionDiagnostics(file), !!args.includeLinePosition);
        }

        private getJsxClosingTag(args: protocol.JsxClosingTagRequestArgs): TextInsertion | undefined {
            const { file, project } = this.getFileAndProject(args);
            const position = this.getPositionInFile(args, file);
            const tag = project.getLanguageService().getJsxClosingTagAtPosition(file, position);
            return tag === undefined ? undefined : { newText: tag.newText, caretOffset: 0 };
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
                        kind
                    }))
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
                fileNames: needFileNameList ? project.getFileNames(/*excludeFilesFromExternalLibraries*/ false, excludeConfigFiles) : undefined
            };
            return projectInfo;
        }

        private getRenameInfo(args: protocol.FileLocationRequestArgs): RenameInfo {
            const { file, project } = this.getFileAndProject(args);
            const position = this.getPositionInFile(args, file);
            return project.getLanguageService().getRenameInfo(file, position, { allowRenameOfImportPath: this.getPreferences(file).allowRenameOfImportPath });
        }

        private getProjects(args: protocol.FileRequestArgs, getScriptInfoEnsuringProjectsUptoDate?: boolean, ignoreNoProjectError?: boolean): Projects {
            let projects: readonly Project[] | undefined;
            let symLinkedProjects: MultiMap<Project> | undefined;
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

            const locations = combineProjectOutputForRenameLocations(
                projects,
                this.getDefaultProject(args),
                { fileName: args.file, pos: position },
                !!args.findInStrings,
                !!args.findInComments,
                this.getPreferences(file)
            );
            if (!simplifiedResult) return locations;

            const defaultProject = this.getDefaultProject(args);
            const renameInfo: protocol.RenameInfo = this.mapRenameInfo(defaultProject.getLanguageService().getRenameInfo(file, position, { allowRenameOfImportPath: this.getPreferences(file).allowRenameOfImportPath }), Debug.checkDefined(this.projectService.getScriptInfo(file)));
            return { info: renameInfo, locs: this.toSpanGroups(locations) };
        }

        private mapRenameInfo(info: RenameInfo, scriptInfo: ScriptInfo): protocol.RenameInfo {
            if (info.canRename) {
                const { canRename, fileToRename, displayName, fullDisplayName, kind, kindModifiers, triggerSpan } = info;
                return identity<protocol.RenameInfoSuccess>(
                    { canRename, fileToRename, displayName, fullDisplayName, kind, kindModifiers, triggerSpan: toProtocolTextSpan(triggerSpan, scriptInfo) });
            }
            else {
                return info;
            }
        }

        private toSpanGroups(locations: readonly RenameLocation[]): readonly protocol.SpanGroup[] {
            const map = createMap<protocol.SpanGroup>();
            for (const { fileName, textSpan, contextSpan, originalContextSpan: _2, originalTextSpan: _, originalFileName: _1, ...prefixSuffixText } of locations) {
                let group = map.get(fileName);
                if (!group) map.set(fileName, group = { file: fileName, locs: [] });
                const scriptInfo = Debug.checkDefined(this.projectService.getScriptInfo(fileName));
                group.locs.push({ ...toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo), ...prefixSuffixText });
            }
            return arrayFrom(map.values());
        }

        private getReferences(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.ReferencesResponseBody | undefined | readonly ReferencedSymbol[] {
            const file = toNormalizedPath(args.file);
            const projects = this.getProjects(args);
            const position = this.getPositionInFile(args, file);
            const references = combineProjectOutputForReferences(
                projects,
                this.getDefaultProject(args),
                { fileName: args.file, pos: position },
            );

            if (!simplifiedResult) return references;

            const defaultProject = this.getDefaultProject(args);
            const scriptInfo = defaultProject.getScriptInfoForNormalizedPath(file)!;
            const nameInfo = defaultProject.getLanguageService().getQuickInfoAtPosition(file, position);
            const symbolDisplayString = nameInfo ? displayPartsToString(nameInfo.displayParts) : "";
            const nameSpan = nameInfo && nameInfo.textSpan;
            const symbolStartOffset = nameSpan ? scriptInfo.positionToLineOffset(nameSpan.start).offset : 0;
            const symbolName = nameSpan ? scriptInfo.getSnapshot().getText(nameSpan.start, textSpanEnd(nameSpan)) : "";
            const refs: readonly protocol.ReferencesResponseItem[] = flatMap(references, referencedSymbol =>
                referencedSymbol.references.map(({ fileName, textSpan, contextSpan, isWriteAccess, isDefinition }): protocol.ReferencesResponseItem => {
                    const scriptInfo = Debug.checkDefined(this.projectService.getScriptInfo(fileName));
                    const span = toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo);
                    const lineSpan = scriptInfo.lineToTextSpan(span.start.line - 1);
                    const lineText = scriptInfo.getSnapshot().getText(lineSpan.start, textSpanEnd(lineSpan)).replace(/\r|\n/g, "");
                    return {
                        file: fileName,
                        ...span,
                        lineText,
                        isWriteAccess,
                        isDefinition
                    };
                }));
            return { refs, symbolName, symbolStartOffset, symbolDisplayString };
        }
        /**
         * @param fileName is the name of the file to be opened
         * @param fileContent is a version of the file content that is known to be more up to date than the one on disk
         */
        private openClientFile(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, projectRootPath?: NormalizedPath) {
            this.projectService.openClientFileWithNormalizedPath(fileName, fileContent, scriptKind, /*hasMixedContent*/ false, projectRootPath);
        }

        private getPosition(args: protocol.Location & { position?: number }, scriptInfo: ScriptInfo): number {
            return args.position !== undefined ? args.position : scriptInfo.lineOffsetToPosition(args.line, args.offset);
        }

        private getPositionInFile(args: protocol.Location & { position?: number }, file: NormalizedPath): number {
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
            return this.getPosition(args, scriptInfo);
        }

        private getFileAndProject(args: protocol.FileRequestArgs): FileAndProject {
            return this.getFileAndProjectWorker(args.file, args.projectFileName);
        }

        private getFileAndLanguageServiceForSyntacticOperation(args: protocol.FileRequestArgs) {
            // Since this is syntactic operation, there should always be project for the file
            // we wouldnt have to ensure project but rather throw if we dont get project
            const file = toNormalizedPath(args.file);
            const project = this.getProject(args.projectFileName) || this.projectService.tryGetDefaultProjectForFile(file);
            if (!project) {
                return Errors.ThrowNoProject();
            }
            return {
                file,
                languageService: project.getLanguageService(/*ensureSynchronized*/ false)
            };
        }

        private getFileAndProjectWorker(uncheckedFileName: string, projectFileName: string | undefined): { file: NormalizedPath, project: Project } {
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
                    kind: s.kind
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
            return languageService.getDocCommentTemplateAtPosition(file, position);
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

            if (simplifiedResult) {
                const displayString = displayPartsToString(quickInfo.displayParts);
                const docString = displayPartsToString(quickInfo.documentation);

                return {
                    kind: quickInfo.kind,
                    kindModifiers: quickInfo.kindModifiers,
                    start: scriptInfo.positionToLineOffset(quickInfo.textSpan.start),
                    end: scriptInfo.positionToLineOffset(textSpanEnd(quickInfo.textSpan)),
                    displayString,
                    documentation: docString,
                    tags: quickInfo.tags || []
                };
            }
            else {
                return quickInfo;
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
                            span: createTextSpanFromBounds(absolutePosition, firstNoWhiteSpacePosition),
                            newText: formatting.getIndentationString(preferredIndent, formatOptions)
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
                    end: scriptInfo.positionToLineOffset(textSpanEnd(edit.span)),
                    newText: edit.newText ? edit.newText : ""
                };
            });
        }

        private getCompletions(args: protocol.CompletionsRequestArgs, kind: protocol.CommandTypes.CompletionInfo | protocol.CommandTypes.Completions | protocol.CommandTypes.CompletionsFull): WithMetadata<readonly protocol.CompletionEntry[]> | protocol.CompletionInfo | CompletionInfo | undefined {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
            const position = this.getPosition(args, scriptInfo);

            const completions = project.getLanguageService().getCompletionsAtPosition(file, position, {
                ...convertUserPreferences(this.getPreferences(file)),
                triggerCharacter: args.triggerCharacter,
                includeExternalModuleExports: args.includeExternalModuleExports,
                includeInsertTextCompletions: args.includeInsertTextCompletions
            });
            if (completions === undefined) return undefined;

            if (kind === protocol.CommandTypes.CompletionsFull) return completions;

            const prefix = args.prefix || "";
            const entries = mapDefined<CompletionEntry, protocol.CompletionEntry>(completions.entries, entry => {
                if (completions.isMemberCompletion || startsWith(entry.name.toLowerCase(), prefix.toLowerCase())) {
                    const { name, kind, kindModifiers, sortText, insertText, replacementSpan, hasAction, source, isRecommended } = entry;
                    const convertedSpan = replacementSpan ? toProtocolTextSpan(replacementSpan, scriptInfo) : undefined;
                    // Use `hasAction || undefined` to avoid serializing `false`.
                    return { name, kind, kindModifiers, sortText, insertText, replacementSpan: convertedSpan, hasAction: hasAction || undefined, source, isRecommended };
                }
            }).sort((a, b) => compareStringsCaseSensitiveUI(a.name, b.name));

            if (kind === protocol.CommandTypes.Completions) {
                if (completions.metadata) (entries as WithMetadata<readonly protocol.CompletionEntry[]>).metadata = completions.metadata;
                return entries;
            }

            const res: protocol.CompletionInfo = {
                ...completions,
                entries,
            };
            return res;
        }

        private getCompletionEntryDetails(args: protocol.CompletionDetailsRequestArgs, simplifiedResult: boolean): readonly protocol.CompletionEntryDetails[] | readonly CompletionEntryDetails[] {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
            const position = this.getPosition(args, scriptInfo);
            const formattingOptions = project.projectService.getFormatCodeOptions(file);

            const result = mapDefined(args.entryNames, entryName => {
                const { name, source } = typeof entryName === "string" ? { name: entryName, source: undefined } : entryName;
                return project.getLanguageService().getCompletionEntryDetails(file, position, name, formattingOptions, source, this.getPreferences(file));
            });
            return simplifiedResult
                ? result.map(details => ({ ...details, codeActions: map(details.codeActions, action => this.mapCodeAction(action)) }))
                : result;
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

                    if (!!compilationSettings.noEmit || fileExtensionIs(info.fileName, Extension.Dts) && !dtsChangeCanAffectEmit(compilationSettings)) {
                        // avoid triggering emit when a change is made in a .d.ts when declaration emit and decorator metadata emit are disabled
                        return undefined;
                    }

                    return {
                        projectFileName: project.getProjectName(),
                        fileNames: project.getCompileOnSaveAffectedFileList(info),
                        projectUsesOutFile: !!outFile(compilationSettings)
                    };
                }
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
                        diagnostics.map(d => formatDiagnosticToProtocol(d, /*includeFileName*/ true))
                } :
                !emitSkipped;
        }

        private getSignatureHelpItems(args: protocol.SignatureHelpRequestArgs, simplifiedResult: boolean): protocol.SignatureHelpItems | SignatureHelpItems | undefined {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
            const position = this.getPosition(args, scriptInfo);
            const helpItems = project.getLanguageService().getSignatureHelpItems(file, position, args);
            if (!helpItems) {
                return undefined;
            }

            if (simplifiedResult) {
                const span = helpItems.applicableSpan;
                return {
                    items: helpItems.items,
                    applicableSpan: {
                        start: scriptInfo.positionToLineOffset(span.start),
                        end: scriptInfo.positionToLineOffset(span.start + span.length)
                    },
                    selectedItemIndex: helpItems.selectedItemIndex,
                    argumentIndex: helpItems.argumentIndex,
                    argumentCount: helpItems.argumentCount,
                };
            }
            else {
                return helpItems;
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
            const start = scriptInfo.lineOffsetToPosition(args.line, args.offset);
            const end = scriptInfo.lineOffsetToPosition(args.endLine, args.endOffset);
            if (start >= 0) {
                this.changeSeq++;
                this.projectService.applyChangesToFile(scriptInfo, singleIterator({
                    span: { start, length: end - start },
                    newText: args.insertString! // TODO: GH#18217
                }));
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
                indent: item.indent
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
                childItems: map(tree.childItems, item => this.toLocationNavigationTree(item, scriptInfo))
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
            return !simplifiedResult ? full : full.map((navItem) => {
                const { file, project } = this.getFileAndProject({ file: navItem.fileName });
                const scriptInfo = project.getScriptInfo(file)!;
                const bakedItem: protocol.NavtoItem = {
                    name: navItem.name,
                    kind: navItem.kind,
                    isCaseSensitive: navItem.isCaseSensitive,
                    matchKind: navItem.matchKind,
                    file: navItem.fileName,
                    start: scriptInfo.positionToLineOffset(navItem.textSpan.start),
                    end: scriptInfo.positionToLineOffset(textSpanEnd(navItem.textSpan))
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
            });
        }

        private getFullNavigateToItems(args: protocol.NavtoRequestArgs): readonly NavigateToItem[] {
            const { currentFileOnly, searchValue, maxResultCount, projectFileName } = args;
            if (currentFileOnly) {
                Debug.assertDefined(args.file);
                const { file, project } = this.getFileAndProject(args as protocol.FileRequestArgs);
                return project.getLanguageService().getNavigateToItems(searchValue, maxResultCount, file);
            }
            else if (!args.file && !projectFileName) {
                return combineProjectOutputFromEveryProject(
                    this.projectService,
                    project => project.getLanguageService().getNavigateToItems(searchValue, maxResultCount, /*filename*/ undefined, /*excludeDts*/ project.isNonTsProject()),
                    navigateToItemIsEqualTo);
            }
            const fileArgs = args as protocol.FileRequestArgs;
            return combineProjectOutputWhileOpeningReferencedProjects<NavigateToItem>(
                this.getProjects(fileArgs),
                this.getDefaultProject(fileArgs),
                project => project.getLanguageService().getNavigateToItems(searchValue, maxResultCount, /*fileName*/ undefined, /*excludeDts*/ project.isNonTsProject()),
                documentSpanLocation,
                navigateToItemIsEqualTo);

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

        private getSupportedCodeFixes(): string[] {
            return getSupportedCodeFixes();
        }

        private isLocation(locationOrSpan: protocol.FileLocationOrRangeRequestArgs): locationOrSpan is protocol.FileLocationRequestArgs {
            return (<protocol.FileLocationRequestArgs>locationOrSpan).line !== undefined;
        }

        private extractPositionOrRange(args: protocol.FileLocationOrRangeRequestArgs, scriptInfo: ScriptInfo): number | TextRange {
            let position: number | undefined;
            let textRange: TextRange | undefined;
            if (this.isLocation(args)) {
                position = getPosition(args);
            }
            else {
                const { startPosition, endPosition } = this.getStartAndEndPosition(args, scriptInfo);
                textRange = { pos: startPosition, end: endPosition };
            }
            return Debug.checkDefined(position === undefined ? textRange : position);

            function getPosition(loc: protocol.FileLocationRequestArgs) {
                return loc.position !== undefined ? loc.position : scriptInfo.lineOffsetToPosition(loc.line, loc.offset);
            }
        }

        private getApplicableRefactors(args: protocol.GetApplicableRefactorsRequestArgs): protocol.ApplicableRefactorInfo[] {
            const { file, project } = this.getFileAndProject(args);
            const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
            return project.getLanguageService().getApplicableRefactors(file, this.extractPositionOrRange(args, scriptInfo), this.getPreferences(file), args.triggerReason);
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
            );

            if (result === undefined) {
                return {
                    edits: []
                };
            }

            if (simplifiedResult) {
                const { renameFilename, renameLocation, edits } = result;
                let mappedRenameLocation: protocol.Location | undefined;
                if (renameFilename !== undefined && renameLocation !== undefined) {
                    const renameScriptInfo = project.getScriptInfoForNormalizedPath(toNormalizedPath(renameFilename))!;
                    mappedRenameLocation = getLocationInNewDocument(getSnapshotText(renameScriptInfo.getSnapshot()), renameFilename, renameLocation, edits);
                }
                return { renameLocation: mappedRenameLocation, renameFilename, edits: this.mapTextChangesToCodeEdits(edits) };
            }
            else {
                return result;
            }
        }

        private organizeImports({ scope }: protocol.OrganizeImportsRequestArgs, simplifiedResult: boolean): readonly protocol.FileCodeEdits[] | readonly FileTextChanges[] {
            Debug.assert(scope.type === "file");
            const { file, project } = this.getFileAndProject(scope.args);
            const changes = project.getLanguageService().organizeImports({ type: "file", fileName: file }, this.getFormatOptions(file), this.getPreferences(file));
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
            const changes = combineProjectOutputFromEveryProject(
                this.projectService,
                project => project.getLanguageService().getEditsForFileRename(oldPath, newPath, formatOptions, preferences),
                (a, b) => a.fileName === b.fileName);
            return simplifiedResult ? changes.map(c => this.mapTextChangeToCodeEdit(c)) : changes;
        }

        private getCodeFixes(args: protocol.CodeFixRequestArgs, simplifiedResult: boolean): readonly protocol.CodeFixAction[] | readonly CodeFixAction[] | undefined {
            const { file, project } = this.getFileAndProject(args);

            const scriptInfo = project.getScriptInfoForNormalizedPath(file)!;
            const { startPosition, endPosition } = this.getStartAndEndPosition(args, scriptInfo);

            const codeActions = project.getLanguageService().getCodeFixesAtPosition(file, startPosition, endPosition, args.errorCodes, this.getFormatOptions(file), this.getPreferences(file));
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
                    _result => { /* TODO: GH#20447 report success message? */ },
                    _error => { /* TODO: GH#20447 report errors */ });
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
                newText: change.newText ? change.newText : ""
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
            const fileNamesInProject = fileNames!.filter(value => !stringContains(value, "lib.d.ts")); // TODO: GH#18217
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
                        if (fileExtensionIs(fileNameInProject, Extension.Dts)) {
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
                file: item.file,
                span: toProtocolTextSpan(item.span, scriptInfo),
                selectionSpan: toProtocolTextSpan(item.selectionSpan, scriptInfo)
            };
        }

        private toProtocolCallHierarchyIncomingCall(incomingCall: CallHierarchyIncomingCall): protocol.CallHierarchyIncomingCall {
            const scriptInfo = this.getScriptInfoFromProjectService(incomingCall.from.file);
            return {
                from: this.toProtocolCallHierarchyItem(incomingCall.from),
                fromSpans: incomingCall.fromSpans.map(fromSpan => toProtocolTextSpan(fromSpan, scriptInfo))
            };
        }

        private toProtocolCallHierarchyOutgoingCall(outgoingCall: CallHierarchyOutgoingCall, scriptInfo: ScriptInfo): protocol.CallHierarchyOutgoingCall {
            return {
                to: this.toProtocolCallHierarchyItem(outgoingCall.to),
                fromSpans: outgoingCall.fromSpans.map(fromSpan => toProtocolTextSpan(fromSpan, scriptInfo))
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

        exit() { /*overridden*/ }

        private notRequired(): HandlerResponse {
            return { responseRequired: false };
        }

        private requiredResponse(response: {} | undefined): HandlerResponse {
            return { response, responseRequired: true };
        }

        private handlers = createMapFromTemplate<(request: protocol.Request) => HandlerResponse>({
            [CommandNames.Status]: () => {
                const response: protocol.StatusResponseBody = { version: ts.version }; // eslint-disable-line @typescript-eslint/no-unnecessary-qualifier
                return this.requiredResponse(response);
            },
            [CommandNames.OpenExternalProject]: (request: protocol.OpenExternalProjectRequest) => {
                this.projectService.openExternalProject(request.arguments);
                // TODO: GH#20447 report errors
                return this.requiredResponse(/*response*/ true);
            },
            [CommandNames.OpenExternalProjects]: (request: protocol.OpenExternalProjectsRequest) => {
                this.projectService.openExternalProjects(request.arguments.projects);
                // TODO: GH#20447 report errors
                return this.requiredResponse(/*response*/ true);
            },
            [CommandNames.CloseExternalProject]: (request: protocol.CloseExternalProjectRequest) => {
                this.projectService.closeExternalProject(request.arguments.projectFileName);
                // TODO: GH#20447 report errors
                return this.requiredResponse(/*response*/ true);
            },
            [CommandNames.SynchronizeProjectList]: (request: protocol.SynchronizeProjectListRequest) => {
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
                        projectErrors: this.convertToDiagnosticsWithLinePosition(p.projectErrors, /*scriptInfo*/ undefined)
                    };
                });
                return this.requiredResponse(converted);
            },
            [CommandNames.UpdateOpen]: (request: protocol.UpdateOpenRequest) => {
                this.changeSeq++;
                this.projectService.applyChangesInOpenFiles(
                    request.arguments.openFiles && mapIterator(arrayIterator(request.arguments.openFiles), file => ({
                        fileName: file.file,
                        content: file.fileContent,
                        scriptKind: file.scriptKindName,
                        projectRootPath: file.projectRootPath
                    })),
                    request.arguments.changedFiles && mapIterator(arrayIterator(request.arguments.changedFiles), file => ({
                        fileName: file.fileName,
                        changes: mapDefinedIterator(arrayReverseIterator(file.textChanges), change => {
                            const scriptInfo = Debug.checkDefined(this.projectService.getScriptInfo(file.fileName));
                            const start = scriptInfo.lineOffsetToPosition(change.start.line, change.start.offset);
                            const end = scriptInfo.lineOffsetToPosition(change.end.line, change.end.offset);
                            return start >= 0 ? { span: { start, length: end - start }, newText: change.newText } : undefined;
                        })
                    })),
                    request.arguments.closedFiles
                );
                return this.requiredResponse(/*response*/ true);
            },
            [CommandNames.ApplyChangedToOpenFiles]: (request: protocol.ApplyChangedToOpenFilesRequest) => {
                this.changeSeq++;
                this.projectService.applyChangesInOpenFiles(
                    request.arguments.openFiles && arrayIterator(request.arguments.openFiles),
                    request.arguments.changedFiles && mapIterator(arrayIterator(request.arguments.changedFiles), file => ({
                        fileName: file.fileName,
                        // apply changes in reverse order
                        changes: arrayReverseIterator(file.changes)
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
            [CommandNames.Definition]: (request: protocol.DefinitionRequest) => {
                return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.DefinitionFull]: (request: protocol.DefinitionRequest) => {
                return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.DefinitionAndBoundSpan]: (request: protocol.DefinitionRequest) => {
                return this.requiredResponse(this.getDefinitionAndBoundSpan(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.DefinitionAndBoundSpanFull]: (request: protocol.DefinitionRequest) => {
                return this.requiredResponse(this.getDefinitionAndBoundSpan(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.EmitOutput]: (request: protocol.EmitOutputRequest) => {
                return this.requiredResponse(this.getEmitOutput(request.arguments));
            },
            [CommandNames.TypeDefinition]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getTypeDefinition(request.arguments));
            },
            [CommandNames.Implementation]: (request: protocol.Request) => {
                return this.requiredResponse(this.getImplementation(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.ImplementationFull]: (request: protocol.Request) => {
                return this.requiredResponse(this.getImplementation(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.References]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.ReferencesFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.Rename]: (request: protocol.RenameRequest) => {
                return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.RenameLocationsFull]: (request: protocol.RenameFullRequest) => {
                return this.requiredResponse(this.getRenameLocations(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.RenameInfoFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getRenameInfo(request.arguments));
            },
            [CommandNames.Open]: (request: protocol.OpenRequest) => {
                this.openClientFile(
                    toNormalizedPath(request.arguments.file),
                    request.arguments.fileContent,
                    convertScriptKindName(request.arguments.scriptKindName!), // TODO: GH#18217
                    request.arguments.projectRootPath ? toNormalizedPath(request.arguments.projectRootPath) : undefined);
                return this.notRequired();
            },
            [CommandNames.Quickinfo]: (request: protocol.QuickInfoRequest) => {
                return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.QuickinfoFull]: (request: protocol.QuickInfoRequest) => {
                return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.GetOutliningSpans]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getOutliningSpans(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.GetOutliningSpansFull]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getOutliningSpans(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.TodoComments]: (request: protocol.TodoCommentRequest) => {
                return this.requiredResponse(this.getTodoComments(request.arguments));
            },
            [CommandNames.Indentation]: (request: protocol.IndentationRequest) => {
                return this.requiredResponse(this.getIndentation(request.arguments));
            },
            [CommandNames.NameOrDottedNameSpan]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getNameOrDottedNameSpan(request.arguments));
            },
            [CommandNames.BreakpointStatement]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBreakpointStatement(request.arguments));
            },
            [CommandNames.BraceCompletion]: (request: protocol.BraceCompletionRequest) => {
                return this.requiredResponse(this.isValidBraceCompletion(request.arguments));
            },
            [CommandNames.DocCommentTemplate]: (request: protocol.DocCommentTemplateRequest) => {
                return this.requiredResponse(this.getDocCommentTemplate(request.arguments));
            },
            [CommandNames.GetSpanOfEnclosingComment]: (request: protocol.SpanOfEnclosingCommentRequest) => {
                return this.requiredResponse(this.getSpanOfEnclosingComment(request.arguments));
            },
            [CommandNames.Format]: (request: protocol.FormatRequest) => {
                return this.requiredResponse(this.getFormattingEditsForRange(request.arguments));
            },
            [CommandNames.Formatonkey]: (request: protocol.FormatOnKeyRequest) => {
                return this.requiredResponse(this.getFormattingEditsAfterKeystroke(request.arguments));
            },
            [CommandNames.FormatFull]: (request: protocol.FormatRequest) => {
                return this.requiredResponse(this.getFormattingEditsForDocumentFull(request.arguments));
            },
            [CommandNames.FormatonkeyFull]: (request: protocol.FormatOnKeyRequest) => {
                return this.requiredResponse(this.getFormattingEditsAfterKeystrokeFull(request.arguments));
            },
            [CommandNames.FormatRangeFull]: (request: protocol.FormatRequest) => {
                return this.requiredResponse(this.getFormattingEditsForRangeFull(request.arguments));
            },
            [CommandNames.CompletionInfo]: (request: protocol.CompletionsRequest) => {
                return this.requiredResponse(this.getCompletions(request.arguments, CommandNames.CompletionInfo));
            },
            [CommandNames.Completions]: (request: protocol.CompletionsRequest) => {
                return this.requiredResponse(this.getCompletions(request.arguments, CommandNames.Completions));
            },
            [CommandNames.CompletionsFull]: (request: protocol.CompletionsRequest) => {
                return this.requiredResponse(this.getCompletions(request.arguments, CommandNames.CompletionsFull));
            },
            [CommandNames.CompletionDetails]: (request: protocol.CompletionDetailsRequest) => {
                return this.requiredResponse(this.getCompletionEntryDetails(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.CompletionDetailsFull]: (request: protocol.CompletionDetailsRequest) => {
                return this.requiredResponse(this.getCompletionEntryDetails(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.CompileOnSaveAffectedFileList]: (request: protocol.CompileOnSaveAffectedFileListRequest) => {
                return this.requiredResponse(this.getCompileOnSaveAffectedFileList(request.arguments));
            },
            [CommandNames.CompileOnSaveEmitFile]: (request: protocol.CompileOnSaveEmitFileRequest) => {
                return this.requiredResponse(this.emitFile(request.arguments));
            },
            [CommandNames.SignatureHelp]: (request: protocol.SignatureHelpRequest) => {
                return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.SignatureHelpFull]: (request: protocol.SignatureHelpRequest) => {
                return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.CompilerOptionsDiagnosticsFull]: (request: protocol.CompilerOptionsDiagnosticsRequest) => {
                return this.requiredResponse(this.getCompilerOptionsDiagnostics(request.arguments));
            },
            [CommandNames.EncodedSyntacticClassificationsFull]: (request: protocol.EncodedSyntacticClassificationsRequest) => {
                return this.requiredResponse(this.getEncodedSyntacticClassifications(request.arguments));
            },
            [CommandNames.EncodedSemanticClassificationsFull]: (request: protocol.EncodedSemanticClassificationsRequest) => {
                return this.requiredResponse(this.getEncodedSemanticClassifications(request.arguments));
            },
            [CommandNames.Cleanup]: () => {
                this.cleanup();
                return this.requiredResponse(/*response*/ true);
            },
            [CommandNames.SemanticDiagnosticsSync]: (request: protocol.SemanticDiagnosticsSyncRequest) => {
                return this.requiredResponse(this.getSemanticDiagnosticsSync(request.arguments));
            },
            [CommandNames.SyntacticDiagnosticsSync]: (request: protocol.SyntacticDiagnosticsSyncRequest) => {
                return this.requiredResponse(this.getSyntacticDiagnosticsSync(request.arguments));
            },
            [CommandNames.SuggestionDiagnosticsSync]: (request: protocol.SuggestionDiagnosticsSyncRequest) => {
                return this.requiredResponse(this.getSuggestionDiagnosticsSync(request.arguments));
            },
            [CommandNames.Geterr]: (request: protocol.GeterrRequest) => {
                this.errorCheck.startNew(next => this.getDiagnostics(next, request.arguments.delay, request.arguments.files));
                return this.notRequired();
            },
            [CommandNames.GeterrForProject]: (request: protocol.GeterrForProjectRequest) => {
                this.errorCheck.startNew(next => this.getDiagnosticsForProject(next, request.arguments.delay, request.arguments.file));
                return this.notRequired();
            },
            [CommandNames.Change]: (request: protocol.ChangeRequest) => {
                this.change(request.arguments);
                return this.notRequired();
            },
            [CommandNames.Configure]: (request: protocol.ConfigureRequest) => {
                this.projectService.setHostConfiguration(request.arguments);
                this.doOutput(/*info*/ undefined, CommandNames.Configure, request.seq, /*success*/ true);
                return this.notRequired();
            },
            [CommandNames.Reload]: (request: protocol.ReloadRequest) => {
                this.reload(request.arguments, request.seq);
                return this.requiredResponse({ reloadFinished: true });
            },
            [CommandNames.Saveto]: (request: protocol.Request) => {
                const savetoArgs = <protocol.SavetoRequestArgs>request.arguments;
                this.saveToTmp(savetoArgs.file, savetoArgs.tmpfile);
                return this.notRequired();
            },
            [CommandNames.Close]: (request: protocol.Request) => {
                const closeArgs = <protocol.FileRequestArgs>request.arguments;
                this.closeClientFile(closeArgs.file);
                return this.notRequired();
            },
            [CommandNames.Navto]: (request: protocol.NavtoRequest) => {
                return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.NavtoFull]: (request: protocol.NavtoRequest) => {
                return this.requiredResponse(this.getNavigateToItems(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.Brace]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.BraceFull]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getBraceMatching(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.NavBar]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getNavigationBarItems(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.NavBarFull]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getNavigationBarItems(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.NavTree]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getNavigationTree(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.NavTreeFull]: (request: protocol.FileRequest) => {
                return this.requiredResponse(this.getNavigationTree(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.Occurrences]: (request: protocol.FileLocationRequest) => {
                return this.requiredResponse(this.getOccurrences(request.arguments));
            },
            [CommandNames.DocumentHighlights]: (request: protocol.DocumentHighlightsRequest) => {
                return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.DocumentHighlightsFull]: (request: protocol.DocumentHighlightsRequest) => {
                return this.requiredResponse(this.getDocumentHighlights(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.CompilerOptionsForInferredProjects]: (request: protocol.SetCompilerOptionsForInferredProjectsRequest) => {
                this.setCompilerOptionsForInferredProjects(request.arguments);
                return this.requiredResponse(/*response*/ true);
            },
            [CommandNames.ProjectInfo]: (request: protocol.ProjectInfoRequest) => {
                return this.requiredResponse(this.getProjectInfo(request.arguments));
            },
            [CommandNames.ReloadProjects]: () => {
                this.projectService.reloadProjects();
                return this.notRequired();
            },
            [CommandNames.JsxClosingTag]: (request: protocol.JsxClosingTagRequest) => {
                return this.requiredResponse(this.getJsxClosingTag(request.arguments));
            },
            [CommandNames.GetCodeFixes]: (request: protocol.CodeFixRequest) => {
                return this.requiredResponse(this.getCodeFixes(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.GetCodeFixesFull]: (request: protocol.CodeFixRequest) => {
                return this.requiredResponse(this.getCodeFixes(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.GetCombinedCodeFix]: (request: protocol.GetCombinedCodeFixRequest) => {
                return this.requiredResponse(this.getCombinedCodeFix(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.GetCombinedCodeFixFull]: (request: protocol.GetCombinedCodeFixRequest) => {
                return this.requiredResponse(this.getCombinedCodeFix(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.ApplyCodeActionCommand]: (request: protocol.ApplyCodeActionCommandRequest) => {
                return this.requiredResponse(this.applyCodeActionCommand(request.arguments));
            },
            [CommandNames.GetSupportedCodeFixes]: () => {
                return this.requiredResponse(this.getSupportedCodeFixes());
            },
            [CommandNames.GetApplicableRefactors]: (request: protocol.GetApplicableRefactorsRequest) => {
                return this.requiredResponse(this.getApplicableRefactors(request.arguments));
            },
            [CommandNames.GetEditsForRefactor]: (request: protocol.GetEditsForRefactorRequest) => {
                return this.requiredResponse(this.getEditsForRefactor(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.GetEditsForRefactorFull]: (request: protocol.GetEditsForRefactorRequest) => {
                return this.requiredResponse(this.getEditsForRefactor(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.OrganizeImports]: (request: protocol.OrganizeImportsRequest) => {
                return this.requiredResponse(this.organizeImports(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.OrganizeImportsFull]: (request: protocol.OrganizeImportsRequest) => {
                return this.requiredResponse(this.organizeImports(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.GetEditsForFileRename]: (request: protocol.GetEditsForFileRenameRequest) => {
                return this.requiredResponse(this.getEditsForFileRename(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.GetEditsForFileRenameFull]: (request: protocol.GetEditsForFileRenameRequest) => {
                return this.requiredResponse(this.getEditsForFileRename(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.ConfigurePlugin]: (request: protocol.ConfigurePluginRequest) => {
                this.configurePlugin(request.arguments);
                this.doOutput(/*info*/ undefined, CommandNames.ConfigurePlugin, request.seq, /*success*/ true);
                return this.notRequired();
            },
            [CommandNames.SelectionRange]: (request: protocol.SelectionRangeRequest) => {
                return this.requiredResponse(this.getSmartSelectionRange(request.arguments, /*simplifiedResult*/ true));
            },
            [CommandNames.SelectionRangeFull]: (request: protocol.SelectionRangeRequest) => {
                return this.requiredResponse(this.getSmartSelectionRange(request.arguments, /*simplifiedResult*/ false));
            },
            [CommandNames.PrepareCallHierarchy]: (request: protocol.PrepareCallHierarchyRequest) => {
                return this.requiredResponse(this.prepareCallHierarchy(request.arguments));
            },
            [CommandNames.ProvideCallHierarchyIncomingCalls]: (request: protocol.ProvideCallHierarchyIncomingCallsRequest) => {
                return this.requiredResponse(this.provideCallHierarchyIncomingCalls(request.arguments));
            },
            [CommandNames.ProvideCallHierarchyOutgoingCalls]: (request: protocol.ProvideCallHierarchyOutgoingCallsRequest) => {
                return this.requiredResponse(this.provideCallHierarchyOutgoingCalls(request.arguments));
            },
        });

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
                return this.executeWithRequestId(request.seq, () => handler(request));
            }
            else {
                this.logger.msg(`Unrecognized JSON command:${stringifyIndented(request)}`, Msg.Err);
                this.doOutput(/*info*/ undefined, CommandNames.Unknown, request.seq, /*success*/ false, `Unrecognized JSON command: ${request.command}`);
                return { responseRequired: false };
            }
        }

        public onMessage(message: string) {
            this.gcTimer.scheduleCollect();

            this.updateGraphDurationMs = undefined;

            let start: number[] | undefined;
            if (this.logger.hasLevel(LogLevel.requestTime)) {
                start = this.hrtime();
                if (this.logger.hasLevel(LogLevel.verbose)) {
                    this.logger.info(`request:${indent(message)}`);
                }
            }

            let request: protocol.Request | undefined;
            let relevantFile: protocol.FileRequestArgs | undefined;
            try {
                request = <protocol.Request>JSON.parse(message);
                relevantFile = request.arguments && (request as protocol.FileRequest).arguments.file ? (request as protocol.FileRequest).arguments : undefined;

                perfLogger.logStartCommand("" + request.command, message.substring(0, 100));
                const { response, responseRequired } = this.executeCommand(request);

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
                perfLogger.logStopCommand("" + request.command, "Success");
                if (response) {
                    this.doOutput(response, request.command, request.seq, /*success*/ true);
                }
                else if (responseRequired) {
                    this.doOutput(/*info*/ undefined, request.command, request.seq, /*success*/ false, "No content available.");
                }
            }
            catch (err) {
                if (err instanceof OperationCanceledException) {
                    // Handle cancellation exceptions
                    perfLogger.logStopCommand("" + (request && request.command), "Canceled: " + err);
                    this.doOutput({ canceled: true }, request!.command, request!.seq, /*success*/ true);
                    return;
                }

                this.logErrorWorker(err, message, relevantFile);
                perfLogger.logStopCommand("" + (request && request.command), "Error: " + err);

                this.doOutput(
                    /*info*/ undefined,
                    request ? request.command : CommandNames.Unknown,
                    request ? request.seq : 0,
                    /*success*/ false,
                    "Error processing request. " + (<StackTraceError>err).message + "\n" + (<StackTraceError>err).stack);
            }
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
            end: scriptInfo.positionToLineOffset(textSpanEnd(textSpan))
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

    /* @internal */ // Exported only for tests
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
}
