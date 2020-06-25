namespace ts {
    const minimumDate = new Date(-8640000000000000);
    const maximumDate = new Date(8640000000000000);

    export interface BuildOptions {
        dry?: boolean;
        force?: boolean;
        verbose?: boolean;

        /*@internal*/ clean?: boolean;
        /*@internal*/ watch?: boolean;
        /*@internal*/ help?: boolean;

        /*@internal*/ preserveWatchOutput?: boolean;
        /*@internal*/ listEmittedFiles?: boolean;
        /*@internal*/ listFiles?: boolean;
        /*@internal*/ pretty?: boolean;
        incremental?: boolean;
        assumeChangesOnlyAffectDirectDependencies?: boolean;

        traceResolution?: boolean;
        /* @internal */ diagnostics?: boolean;
        /* @internal */ extendedDiagnostics?: boolean;
        /* @internal */ locale?: string;
        /* @internal */ generateCpuProfile?: string;

        [option: string]: CompilerOptionsValue | undefined;
    }

    enum BuildResultFlags {
        None = 0,

        /**
         * No errors of any kind occurred during build
         */
        Success = 1 << 0,
        /**
         * None of the .d.ts files emitted by this build were
         * different from the existing files on disk
         */
        DeclarationOutputUnchanged = 1 << 1,

        ConfigFileErrors = 1 << 2,
        SyntaxErrors = 1 << 3,
        TypeErrors = 1 << 4,
        DeclarationEmitErrors = 1 << 5,
        EmitErrors = 1 << 6,

        AnyErrors = ConfigFileErrors | SyntaxErrors | TypeErrors | DeclarationEmitErrors | EmitErrors
    }

    /*@internal*/
    export type ResolvedConfigFilePath = ResolvedConfigFileName & Path;

    function getOrCreateValueFromConfigFileMap<T>(configFileMap: Map<ResolvedConfigFilePath, T>, resolved: ResolvedConfigFilePath, createT: () => T): T {
        const existingValue = configFileMap.get(resolved);
        let newValue: T | undefined;
        if (!existingValue) {
            newValue = createT();
            configFileMap.set(resolved, newValue);
        }
        return existingValue || newValue!;
    }

    function getOrCreateValueMapFromConfigFileMap<T>(configFileMap: Map<ResolvedConfigFilePath, Map<string, T>>, resolved: ResolvedConfigFilePath): Map<string, T> {
        return getOrCreateValueFromConfigFileMap<Map<string, T>>(configFileMap, resolved, () => new Map());
    }

    function newer(date1: Date, date2: Date): Date {
        return date2 > date1 ? date2 : date1;
    }

    function isDeclarationFile(fileName: string) {
        return fileExtensionIs(fileName, Extension.Dts);
    }

    export type ReportEmitErrorSummary = (errorCount: number) => void;

    export interface SolutionBuilderHostBase<T extends BuilderProgram> extends ProgramHost<T> {
        createDirectory?(path: string): void;
        /**
         * Should provide create directory and writeFile if done of invalidatedProjects is not invoked with
         * writeFileCallback
         */
        writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;

        getModifiedTime(fileName: string): Date | undefined;
        setModifiedTime(fileName: string, date: Date): void;
        deleteFile(fileName: string): void;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;

        reportDiagnostic: DiagnosticReporter; // Technically we want to move it out and allow steps of actions on Solution, but for now just merge stuff in build host here
        reportSolutionBuilderStatus: DiagnosticReporter;

        // TODO: To do better with watch mode and normal build mode api that creates program and emits files
        // This currently helps enable --diagnostics and --extendedDiagnostics
        afterProgramEmitAndDiagnostics?(program: T): void;
        /*@internal*/ afterEmitBundle?(config: ParsedCommandLine): void;

        // For testing
        /*@internal*/ now?(): Date;
    }

    export interface SolutionBuilderHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T> {
        reportErrorSummary?: ReportEmitErrorSummary;
    }

    export interface SolutionBuilderWithWatchHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T>, WatchHost {
    }

    /*@internal*/
    export type BuildOrder = readonly ResolvedConfigFileName[];
    /*@internal*/
    export interface CircularBuildOrder {
        buildOrder: BuildOrder;
        circularDiagnostics: readonly Diagnostic[];
    }
    /*@internal*/
    export type AnyBuildOrder = BuildOrder | CircularBuildOrder;

    /*@internal*/
    export function isCircularBuildOrder(buildOrder: AnyBuildOrder): buildOrder is CircularBuildOrder {
        return !!buildOrder && !!(buildOrder as CircularBuildOrder).buildOrder;
    }

    /*@internal*/
    export function getBuildOrderFromAnyBuildOrder(anyBuildOrder: AnyBuildOrder): BuildOrder {
        return isCircularBuildOrder(anyBuildOrder) ? anyBuildOrder.buildOrder : anyBuildOrder;
    }

    export interface SolutionBuilder<T extends BuilderProgram> {
        build(project?: string, cancellationToken?: CancellationToken): ExitStatus;
        clean(project?: string): ExitStatus;
        buildReferences(project: string, cancellationToken?: CancellationToken): ExitStatus;
        cleanReferences(project?: string): ExitStatus;
        getNextInvalidatedProject(cancellationToken?: CancellationToken): InvalidatedProject<T> | undefined;

        // Currently used for testing but can be made public if needed:
        /*@internal*/ getBuildOrder(): AnyBuildOrder;

        // Testing only
        /*@internal*/ getUpToDateStatusOfProject(project: string): UpToDateStatus;
        /*@internal*/ invalidateProject(configFilePath: ResolvedConfigFilePath, reloadLevel?: ConfigFileProgramReloadLevel): void;
        /*@internal*/ buildNextInvalidatedProject(): void;
        /*@internal*/ getAllParsedConfigs(): readonly ParsedCommandLine[];
        /*@internal*/ close(): void;
    }

    /**
     * Create a function that reports watch status by writing to the system and handles the formating of the diagnostic
     */
    export function createBuilderStatusReporter(system: System, pretty?: boolean): DiagnosticReporter {
        return diagnostic => {
            let output = pretty ? `[${formatColorAndReset(getLocaleTimeString(system), ForegroundColorEscapeSequences.Grey)}] ` : `${getLocaleTimeString(system)} - `;
            output += `${flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${system.newLine + system.newLine}`;
            system.write(output);
        };
    }

    function createSolutionBuilderHostBase<T extends BuilderProgram>(system: System, createProgram: CreateProgram<T> | undefined, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter) {
        const host = createProgramHost(system, createProgram) as SolutionBuilderHostBase<T>;
        host.getModifiedTime = system.getModifiedTime ? path => system.getModifiedTime!(path) : returnUndefined;
        host.setModifiedTime = system.setModifiedTime ? (path, date) => system.setModifiedTime!(path, date) : noop;
        host.deleteFile = system.deleteFile ? path => system.deleteFile!(path) : noop;
        host.reportDiagnostic = reportDiagnostic || createDiagnosticReporter(system);
        host.reportSolutionBuilderStatus = reportSolutionBuilderStatus || createBuilderStatusReporter(system);
        host.now = maybeBind(system, system.now); // For testing
        return host;
    }

    export function createSolutionBuilderHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system = sys, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportErrorSummary?: ReportEmitErrorSummary) {
        const host = createSolutionBuilderHostBase(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderHost<T>;
        host.reportErrorSummary = reportErrorSummary;
        return host;
    }

    export function createSolutionBuilderWithWatchHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system = sys, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter) {
        const host = createSolutionBuilderHostBase(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderWithWatchHost<T>;
        const watchHost = createWatchHost(system, reportWatchStatus);
        copyProperties(host, watchHost);
        return host;
    }

    function getCompilerOptionsOfBuildOptions(buildOptions: BuildOptions): CompilerOptions {
        const result = {} as CompilerOptions;
        commonOptionsWithBuild.forEach(option => {
            if (hasProperty(buildOptions, option.name)) result[option.name] = buildOptions[option.name];
        });
        return result;
    }

    export function createSolutionBuilder<T extends BuilderProgram>(host: SolutionBuilderHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilder<T> {
        return createSolutionBuilderWorker(/*watch*/ false, host, rootNames, defaultOptions);
    }

    export function createSolutionBuilderWithWatch<T extends BuilderProgram>(host: SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilder<T> {
        return createSolutionBuilderWorker(/*watch*/ true, host, rootNames, defaultOptions, baseWatchOptions);
    }

    type ConfigFileCacheEntry = ParsedCommandLine | Diagnostic;
    interface SolutionBuilderStateCache {
        originalReadFile: CompilerHost["readFile"];
        originalFileExists: CompilerHost["fileExists"];
        originalDirectoryExists: CompilerHost["directoryExists"];
        originalCreateDirectory: CompilerHost["createDirectory"];
        originalWriteFile: CompilerHost["writeFile"] | undefined;
        originalReadFileWithCache: CompilerHost["readFile"];
        originalGetSourceFile: CompilerHost["getSourceFile"];
    }

    interface SolutionBuilderState<T extends BuilderProgram = BuilderProgram> {
        readonly host: SolutionBuilderHost<T>;
        readonly hostWithWatch: SolutionBuilderWithWatchHost<T>;
        readonly currentDirectory: string;
        readonly getCanonicalFileName: GetCanonicalFileName;
        readonly parseConfigFileHost: ParseConfigFileHost;
        readonly writeFileName: ((s: string) => void) | undefined;

        // State of solution
        readonly options: BuildOptions;
        readonly baseCompilerOptions: CompilerOptions;
        readonly rootNames: readonly string[];
        readonly baseWatchOptions: WatchOptions | undefined;

        readonly resolvedConfigFilePaths: Map<string, ResolvedConfigFilePath>;
        readonly configFileCache: Map<ResolvedConfigFilePath, ConfigFileCacheEntry>;
        /** Map from config file name to up-to-date status */
        readonly projectStatus: Map<ResolvedConfigFilePath, UpToDateStatus>;
        readonly buildInfoChecked: Map<ResolvedConfigFilePath, true>;
        readonly extendedConfigCache: Map<string, ExtendedConfigCacheEntry>;

        readonly builderPrograms: Map<ResolvedConfigFilePath, T>;
        readonly diagnostics: Map<ResolvedConfigFilePath, readonly Diagnostic[]>;
        readonly projectPendingBuild: Map<ResolvedConfigFilePath, ConfigFileProgramReloadLevel>;
        readonly projectErrorsReported: Map<ResolvedConfigFilePath, true>;

        readonly compilerHost: CompilerHost;
        readonly moduleResolutionCache: ModuleResolutionCache | undefined;

        // Mutable state
        buildOrder: AnyBuildOrder | undefined;
        readFileWithCache: (f: string) => string | undefined;
        projectCompilerOptions: CompilerOptions;
        cache: SolutionBuilderStateCache | undefined;
        allProjectBuildPending: boolean;
        needsSummary: boolean;
        watchAllProjectsPending: boolean;
        currentInvalidatedProject: InvalidatedProject<T> | undefined;

        // Watch state
        readonly watch: boolean;
        readonly allWatchedWildcardDirectories: Map<ResolvedConfigFilePath, Map<string, WildcardDirectoryWatcher>>;
        readonly allWatchedInputFiles: Map<ResolvedConfigFilePath, Map<Path, FileWatcher>>;
        readonly allWatchedConfigFiles: Map<ResolvedConfigFilePath, FileWatcher>;

        timerToBuildInvalidatedProject: any;
        reportFileChangeDetected: boolean;
        watchFile: WatchFile<WatchType, ResolvedConfigFileName>;
        watchFilePath: WatchFilePath<WatchType, ResolvedConfigFileName>;
        watchDirectory: WatchDirectory<WatchType, ResolvedConfigFileName>;
        writeLog: (s: string) => void;
    }

    function createSolutionBuilderState<T extends BuilderProgram>(watch: boolean, hostOrHostWithWatch: SolutionBuilderHost<T> | SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], options: BuildOptions, baseWatchOptions: WatchOptions | undefined): SolutionBuilderState<T> {
        const host = hostOrHostWithWatch as SolutionBuilderHost<T>;
        const hostWithWatch = hostOrHostWithWatch as SolutionBuilderWithWatchHost<T>;
        const currentDirectory = host.getCurrentDirectory();
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());

        // State of the solution
        const baseCompilerOptions = getCompilerOptionsOfBuildOptions(options);
        const compilerHost = createCompilerHostFromProgramHost(host, () => state.projectCompilerOptions);
        setGetSourceFileAsHashVersioned(compilerHost, host);
        compilerHost.getParsedCommandLine = fileName => parseConfigFile(state, fileName as ResolvedConfigFileName, toResolvedConfigFilePath(state, fileName as ResolvedConfigFileName));
        compilerHost.resolveModuleNames = maybeBind(host, host.resolveModuleNames);
        compilerHost.resolveTypeReferenceDirectives = maybeBind(host, host.resolveTypeReferenceDirectives);
        const moduleResolutionCache = !compilerHost.resolveModuleNames ? createModuleResolutionCache(currentDirectory, getCanonicalFileName) : undefined;
        if (!compilerHost.resolveModuleNames) {
            const loader = (moduleName: string, containingFile: string, redirectedReference: ResolvedProjectReference | undefined) => resolveModuleName(moduleName, containingFile, state.projectCompilerOptions, compilerHost, moduleResolutionCache, redirectedReference).resolvedModule!;
            compilerHost.resolveModuleNames = (moduleNames, containingFile, _reusedNames, redirectedReference) =>
                loadWithLocalCache<ResolvedModuleFull>(Debug.checkEachDefined(moduleNames), containingFile, redirectedReference, loader);
        }

        const { watchFile, watchFilePath, watchDirectory, writeLog } = createWatchFactory<ResolvedConfigFileName>(hostWithWatch, options);

        const state: SolutionBuilderState<T> = {
            host,
            hostWithWatch,
            currentDirectory,
            getCanonicalFileName,
            parseConfigFileHost: parseConfigHostFromCompilerHostLike(host),
            writeFileName: host.trace ? (s: string) => host.trace!(s) : undefined,

            // State of solution
            options,
            baseCompilerOptions,
            rootNames,
            baseWatchOptions,

            resolvedConfigFilePaths: new Map(),
            configFileCache: new Map(),
            projectStatus: new Map(),
            buildInfoChecked: new Map(),
            extendedConfigCache: new Map(),

            builderPrograms: new Map(),
            diagnostics: new Map(),
            projectPendingBuild: new Map(),
            projectErrorsReported: new Map(),

            compilerHost,
            moduleResolutionCache,

            // Mutable state
            buildOrder: undefined,
            readFileWithCache: f => host.readFile(f),
            projectCompilerOptions: baseCompilerOptions,
            cache: undefined,
            allProjectBuildPending: true,
            needsSummary: true,
            watchAllProjectsPending: watch,
            currentInvalidatedProject: undefined,

            // Watch state
            watch,
            allWatchedWildcardDirectories: new Map(),
            allWatchedInputFiles: new Map(),
            allWatchedConfigFiles: new Map(),

            timerToBuildInvalidatedProject: undefined,
            reportFileChangeDetected: false,
            watchFile,
            watchFilePath,
            watchDirectory,
            writeLog,
        };

        return state;
    }

    function toPath(state: SolutionBuilderState, fileName: string) {
        return ts.toPath(fileName, state.currentDirectory, state.getCanonicalFileName);
    }

    function toResolvedConfigFilePath(state: SolutionBuilderState, fileName: ResolvedConfigFileName): ResolvedConfigFilePath {
        const { resolvedConfigFilePaths } = state;
        const path = resolvedConfigFilePaths.get(fileName);
        if (path !== undefined) return path;

        const resolvedPath = toPath(state, fileName) as ResolvedConfigFilePath;
        resolvedConfigFilePaths.set(fileName, resolvedPath);
        return resolvedPath;
    }

    function isParsedCommandLine(entry: ConfigFileCacheEntry): entry is ParsedCommandLine {
        return !!(entry as ParsedCommandLine).options;
    }

    function parseConfigFile(state: SolutionBuilderState, configFileName: ResolvedConfigFileName, configFilePath: ResolvedConfigFilePath): ParsedCommandLine | undefined {
        const { configFileCache } = state;
        const value = configFileCache.get(configFilePath);
        if (value) {
            return isParsedCommandLine(value) ? value : undefined;
        }

        let diagnostic: Diagnostic | undefined;
        const { parseConfigFileHost, baseCompilerOptions, baseWatchOptions, extendedConfigCache, host } = state;
        let parsed: ParsedCommandLine | undefined;
        if (host.getParsedCommandLine) {
            parsed = host.getParsedCommandLine(configFileName);
            if (!parsed) diagnostic = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
        }
        else {
            parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = d => diagnostic = d;
            parsed = getParsedCommandLineOfConfigFile(configFileName, baseCompilerOptions, parseConfigFileHost, extendedConfigCache, baseWatchOptions);
            parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = noop;
        }
        configFileCache.set(configFilePath, parsed || diagnostic!);
        return parsed;
    }

    function resolveProjectName(state: SolutionBuilderState, name: string): ResolvedConfigFileName {
        return resolveConfigFileProjectName(resolvePath(state.currentDirectory, name));
    }

    function createBuildOrder(state: SolutionBuilderState, roots: readonly ResolvedConfigFileName[]): AnyBuildOrder {
        const temporaryMarks = new Map<ResolvedConfigFilePath, true>();
        const permanentMarks = new Map<ResolvedConfigFilePath, true>();
        const circularityReportStack: string[] = [];
        let buildOrder: ResolvedConfigFileName[] | undefined;
        let circularDiagnostics: Diagnostic[] | undefined;
        for (const root of roots) {
            visit(root);
        }

        return circularDiagnostics ?
            { buildOrder: buildOrder || emptyArray, circularDiagnostics } :
            buildOrder || emptyArray;

        function visit(configFileName: ResolvedConfigFileName, inCircularContext?: boolean) {
            const projPath = toResolvedConfigFilePath(state, configFileName);
            // Already visited
            if (permanentMarks.has(projPath)) return;
            // Circular
            if (temporaryMarks.has(projPath)) {
                if (!inCircularContext) {
                    (circularDiagnostics || (circularDiagnostics = [])).push(
                        createCompilerDiagnostic(
                            Diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0,
                            circularityReportStack.join("\r\n")
                        )
                    );
                }
                return;
            }

            temporaryMarks.set(projPath, true);
            circularityReportStack.push(configFileName);
            const parsed = parseConfigFile(state, configFileName, projPath);
            if (parsed && parsed.projectReferences) {
                for (const ref of parsed.projectReferences) {
                    const resolvedRefPath = resolveProjectName(state, ref.path);
                    visit(resolvedRefPath, inCircularContext || ref.circular);
                }
            }

            circularityReportStack.pop();
            permanentMarks.set(projPath, true);
            (buildOrder || (buildOrder = [])).push(configFileName);
        }
    }

    function getBuildOrder(state: SolutionBuilderState) {
        return state.buildOrder || createStateBuildOrder(state);
    }

    function createStateBuildOrder(state: SolutionBuilderState) {
        const buildOrder = createBuildOrder(state, state.rootNames.map(f => resolveProjectName(state, f)));

        // Clear all to ResolvedConfigFilePaths cache to start fresh
        state.resolvedConfigFilePaths.clear();

        // TODO(rbuckton): Should be a `Set`, but that requires changing the code below that uses `mutateMapSkippingNewValues`
        const currentProjects = new Map(
            getBuildOrderFromAnyBuildOrder(buildOrder).map(
                resolved => [toResolvedConfigFilePath(state, resolved), true as true])
        );

        const noopOnDelete = { onDeleteValue: noop };
        // Config file cache
        mutateMapSkippingNewValues(state.configFileCache, currentProjects, noopOnDelete);
        mutateMapSkippingNewValues(state.projectStatus, currentProjects, noopOnDelete);
        mutateMapSkippingNewValues(state.buildInfoChecked, currentProjects, noopOnDelete);
        mutateMapSkippingNewValues(state.builderPrograms, currentProjects, noopOnDelete);
        mutateMapSkippingNewValues(state.diagnostics, currentProjects, noopOnDelete);
        mutateMapSkippingNewValues(state.projectPendingBuild, currentProjects, noopOnDelete);
        mutateMapSkippingNewValues(state.projectErrorsReported, currentProjects, noopOnDelete);

        // Remove watches for the program no longer in the solution
        if (state.watch) {
            mutateMapSkippingNewValues(
                state.allWatchedConfigFiles,
                currentProjects,
                { onDeleteValue: closeFileWatcher }
            );

            mutateMapSkippingNewValues(
                state.allWatchedWildcardDirectories,
                currentProjects,
                { onDeleteValue: existingMap => existingMap.forEach(closeFileWatcherOf) }
            );

            mutateMapSkippingNewValues(
                state.allWatchedInputFiles,
                currentProjects,
                { onDeleteValue: existingMap => existingMap.forEach(closeFileWatcher) }
            );
        }
        return state.buildOrder = buildOrder;
    }

    function getBuildOrderFor(state: SolutionBuilderState, project: string | undefined, onlyReferences: boolean | undefined): AnyBuildOrder | undefined {
        const resolvedProject = project && resolveProjectName(state, project);
        const buildOrderFromState = getBuildOrder(state);
        if (isCircularBuildOrder(buildOrderFromState)) return buildOrderFromState;
        if (resolvedProject) {
            const projectPath = toResolvedConfigFilePath(state, resolvedProject);
            const projectIndex = findIndex(
                buildOrderFromState,
                configFileName => toResolvedConfigFilePath(state, configFileName) === projectPath
            );
            if (projectIndex === -1) return undefined;
        }
        const buildOrder = resolvedProject ? createBuildOrder(state, [resolvedProject]) as BuildOrder : buildOrderFromState;
        Debug.assert(!isCircularBuildOrder(buildOrder));
        Debug.assert(!onlyReferences || resolvedProject !== undefined);
        Debug.assert(!onlyReferences || buildOrder[buildOrder.length - 1] === resolvedProject);
        return onlyReferences ? buildOrder.slice(0, buildOrder.length - 1) : buildOrder;
    }

    function enableCache(state: SolutionBuilderState) {
        if (state.cache) {
            disableCache(state);
        }

        const { compilerHost, host } = state;

        const originalReadFileWithCache = state.readFileWithCache;
        const originalGetSourceFile = compilerHost.getSourceFile;

        const {
            originalReadFile, originalFileExists, originalDirectoryExists,
            originalCreateDirectory, originalWriteFile,
            getSourceFileWithCache, readFileWithCache
        } = changeCompilerHostLikeToUseCache(
            host,
            fileName => toPath(state, fileName),
            (...args) => originalGetSourceFile.call(compilerHost, ...args)
        );
        state.readFileWithCache = readFileWithCache;
        compilerHost.getSourceFile = getSourceFileWithCache!;

        state.cache = {
            originalReadFile,
            originalFileExists,
            originalDirectoryExists,
            originalCreateDirectory,
            originalWriteFile,
            originalReadFileWithCache,
            originalGetSourceFile,
        };
    }

    function disableCache(state: SolutionBuilderState) {
        if (!state.cache) return;

        const { cache, host, compilerHost, extendedConfigCache, moduleResolutionCache } = state;

        host.readFile = cache.originalReadFile;
        host.fileExists = cache.originalFileExists;
        host.directoryExists = cache.originalDirectoryExists;
        host.createDirectory = cache.originalCreateDirectory;
        host.writeFile = cache.originalWriteFile;
        compilerHost.getSourceFile = cache.originalGetSourceFile;
        state.readFileWithCache = cache.originalReadFileWithCache;
        extendedConfigCache.clear();
        if (moduleResolutionCache) {
            moduleResolutionCache.directoryToModuleNameMap.clear();
            moduleResolutionCache.moduleNameToDirectoryMap.clear();
        }
        state.cache = undefined;
    }

    function clearProjectStatus(state: SolutionBuilderState, resolved: ResolvedConfigFilePath) {
        state.projectStatus.delete(resolved);
        state.diagnostics.delete(resolved);
    }

    function addProjToQueue({ projectPendingBuild }: SolutionBuilderState, proj: ResolvedConfigFilePath, reloadLevel: ConfigFileProgramReloadLevel) {
        const value = projectPendingBuild.get(proj);
        if (value === undefined) {
            projectPendingBuild.set(proj, reloadLevel);
        }
        else if (value < reloadLevel) {
            projectPendingBuild.set(proj, reloadLevel);
        }
    }

    function setupInitialBuild(state: SolutionBuilderState, cancellationToken: CancellationToken | undefined) {
        // Set initial build if not already built
        if (!state.allProjectBuildPending) return;
        state.allProjectBuildPending = false;
        if (state.options.watch) { reportWatchStatus(state, Diagnostics.Starting_compilation_in_watch_mode); }
        enableCache(state);
        const buildOrder = getBuildOrderFromAnyBuildOrder(getBuildOrder(state));
        buildOrder.forEach(configFileName =>
            state.projectPendingBuild.set(
                toResolvedConfigFilePath(state, configFileName),
                ConfigFileProgramReloadLevel.None
            )
        );

        if (cancellationToken) {
            cancellationToken.throwIfCancellationRequested();
        }
    }

    export enum InvalidatedProjectKind {
        Build,
        UpdateBundle,
        UpdateOutputFileStamps
    }

    export interface InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind;
        readonly project: ResolvedConfigFileName;
        /*@internal*/ readonly projectPath: ResolvedConfigFilePath;
        /*@internal*/ readonly buildOrder: readonly ResolvedConfigFileName[];
        /**
         *  To dispose this project and ensure that all the necessary actions are taken and state is updated accordingly
         */
        done(cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, customTransformers?: CustomTransformers): ExitStatus;
        getCompilerOptions(): CompilerOptions;
        getCurrentDirectory(): string;
    }

    export interface UpdateOutputFileStampsProject extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.UpdateOutputFileStamps;
        updateOutputFileStatmps(): void;
    }

    export interface BuildInvalidedProject<T extends BuilderProgram> extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.Build;
        /*
         * Emitting with this builder program without the api provided for this project
         * can result in build system going into invalid state as files written reflect the state of the project
         */
        getBuilderProgram(): T | undefined;
        getProgram(): Program | undefined;
        getSourceFile(fileName: string): SourceFile | undefined;
        getSourceFiles(): readonly SourceFile[];
        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getAllDependencies(sourceFile: SourceFile): readonly string[];
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]>;
        /*
         * Calling emit directly with targetSourceFile and emitOnlyDtsFiles set to true is not advised since
         * emit in build system is responsible in updating status of the project
         * If called with targetSourceFile and emitOnlyDtsFiles set to true, the emit just passes to underlying builder and
         * wont reflect the status of file as being emitted in the builder
         * (if that emit of that source file is required it would be emitted again when making sure invalidated project is completed)
         * This emit is not considered actual emit (and hence uptodate status is not reflected if
         */
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult | undefined;
        // TODO(shkamat):: investigate later if we can emit even when there are declaration diagnostics
        // emitNextAffectedFile(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult>;
    }

    export interface UpdateBundleProject<T extends BuilderProgram> extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.UpdateBundle;
        emit(writeFile?: WriteFileCallback, customTransformers?: CustomTransformers): EmitResult | BuildInvalidedProject<T> | undefined;
    }

    export type InvalidatedProject<T extends BuilderProgram> = UpdateOutputFileStampsProject | BuildInvalidedProject<T> | UpdateBundleProject<T>;

    function doneInvalidatedProject(
        state: SolutionBuilderState,
        projectPath: ResolvedConfigFilePath
    ) {
        state.projectPendingBuild.delete(projectPath);
        state.currentInvalidatedProject = undefined;
        return state.diagnostics.has(projectPath) ?
            ExitStatus.DiagnosticsPresent_OutputsSkipped :
            ExitStatus.Success;
    }

    function createUpdateOutputFileStampsProject(
        state: SolutionBuilderState,
        project: ResolvedConfigFileName,
        projectPath: ResolvedConfigFilePath,
        config: ParsedCommandLine,
        buildOrder: readonly ResolvedConfigFileName[]
    ): UpdateOutputFileStampsProject {
        let updateOutputFileStampsPending = true;
        return {
            kind: InvalidatedProjectKind.UpdateOutputFileStamps,
            project,
            projectPath,
            buildOrder,
            getCompilerOptions: () => config.options,
            getCurrentDirectory: () => state.currentDirectory,
            updateOutputFileStatmps: () => {
                updateOutputTimestamps(state, config, projectPath);
                updateOutputFileStampsPending = false;
            },
            done: () => {
                if (updateOutputFileStampsPending) {
                    updateOutputTimestamps(state, config, projectPath);
                }
                return doneInvalidatedProject(state, projectPath);
            }
        };
    }

    enum BuildStep {
        CreateProgram,
        SyntaxDiagnostics,
        SemanticDiagnostics,
        Emit,
        EmitBundle,
        EmitBuildInfo,
        BuildInvalidatedProjectOfBundle,
        QueueReferencingProjects,
        Done
    }

    function createBuildOrUpdateInvalidedProject<T extends BuilderProgram>(
        kind: InvalidatedProjectKind.Build | InvalidatedProjectKind.UpdateBundle,
        state: SolutionBuilderState<T>,
        project: ResolvedConfigFileName,
        projectPath: ResolvedConfigFilePath,
        projectIndex: number,
        config: ParsedCommandLine,
        buildOrder: readonly ResolvedConfigFileName[],
    ): BuildInvalidedProject<T> | UpdateBundleProject<T> {
        let step = kind === InvalidatedProjectKind.Build ? BuildStep.CreateProgram : BuildStep.EmitBundle;
        let program: T | undefined;
        let buildResult: BuildResultFlags | undefined;
        let invalidatedProjectOfBundle: BuildInvalidedProject<T> | undefined;

        return kind === InvalidatedProjectKind.Build ?
            {
                kind,
                project,
                projectPath,
                buildOrder,
                getCompilerOptions: () => config.options,
                getCurrentDirectory: () => state.currentDirectory,
                getBuilderProgram: () => withProgramOrUndefined(identity),
                getProgram: () =>
                    withProgramOrUndefined(
                        program => program.getProgramOrUndefined()
                    ),
                getSourceFile: fileName =>
                    withProgramOrUndefined(
                        program => program.getSourceFile(fileName)
                    ),
                getSourceFiles: () =>
                    withProgramOrEmptyArray(
                        program => program.getSourceFiles()
                    ),
                getOptionsDiagnostics: cancellationToken =>
                    withProgramOrEmptyArray(
                        program => program.getOptionsDiagnostics(cancellationToken)
                    ),
                getGlobalDiagnostics: cancellationToken =>
                    withProgramOrEmptyArray(
                        program => program.getGlobalDiagnostics(cancellationToken)
                    ),
                getConfigFileParsingDiagnostics: () =>
                    withProgramOrEmptyArray(
                        program => program.getConfigFileParsingDiagnostics()
                    ),
                getSyntacticDiagnostics: (sourceFile, cancellationToken) =>
                    withProgramOrEmptyArray(
                        program => program.getSyntacticDiagnostics(sourceFile, cancellationToken)
                    ),
                getAllDependencies: sourceFile =>
                    withProgramOrEmptyArray(
                        program => program.getAllDependencies(sourceFile)
                    ),
                getSemanticDiagnostics: (sourceFile, cancellationToken) =>
                    withProgramOrEmptyArray(
                        program => program.getSemanticDiagnostics(sourceFile, cancellationToken)
                    ),
                getSemanticDiagnosticsOfNextAffectedFile: (cancellationToken, ignoreSourceFile) =>
                    withProgramOrUndefined(
                        program =>
                            ((program as any as SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile) &&
                            (program as any as SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile(cancellationToken, ignoreSourceFile)
                    ),
                emit: (targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers) => {
                    if (targetSourceFile || emitOnlyDtsFiles) {
                        return withProgramOrUndefined(
                            program => program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers)
                        );
                    }
                    executeSteps(BuildStep.SemanticDiagnostics, cancellationToken);
                    if (step === BuildStep.EmitBuildInfo) {
                        return emitBuildInfo(writeFile, cancellationToken);
                    }
                    if (step !== BuildStep.Emit) return undefined;
                    return emit(writeFile, cancellationToken, customTransformers);
                },
                done
            } :
            {
                kind,
                project,
                projectPath,
                buildOrder,
                getCompilerOptions: () => config.options,
                getCurrentDirectory: () => state.currentDirectory,
                emit: (writeFile: WriteFileCallback | undefined, customTransformers: CustomTransformers | undefined) => {
                    if (step !== BuildStep.EmitBundle) return invalidatedProjectOfBundle;
                    return emitBundle(writeFile, customTransformers);
                },
                done,
            };

        function done(cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, customTransformers?: CustomTransformers) {
            executeSteps(BuildStep.Done, cancellationToken, writeFile, customTransformers);
            return doneInvalidatedProject(state, projectPath);
        }

        function withProgramOrUndefined<U>(action: (program: T) => U | undefined): U | undefined {
            executeSteps(BuildStep.CreateProgram);
            return program && action(program);
        }

        function withProgramOrEmptyArray<U>(action: (program: T) => readonly U[]): readonly U[] {
            return withProgramOrUndefined(action) || emptyArray;
        }

        function createProgram() {
            Debug.assert(program === undefined);

            if (state.options.dry) {
                reportStatus(state, Diagnostics.A_non_dry_build_would_build_project_0, project);
                buildResult = BuildResultFlags.Success;
                step = BuildStep.QueueReferencingProjects;
                return;
            }

            if (state.options.verbose) reportStatus(state, Diagnostics.Building_project_0, project);

            if (config.fileNames.length === 0) {
                reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                // Nothing to build - must be a solution file, basically
                buildResult = BuildResultFlags.None;
                step = BuildStep.QueueReferencingProjects;
                return;
            }

            const { host, compilerHost } = state;
            state.projectCompilerOptions = config.options;
            // Update module resolution cache if needed
            updateModuleResolutionCache(state, project, config);

            // Create program
            program = host.createProgram(
                config.fileNames,
                config.options,
                compilerHost,
                getOldProgram(state, projectPath, config),
                getConfigFileParsingDiagnostics(config),
                config.projectReferences
            );
            if (state.watch) {
                state.builderPrograms.set(projectPath, program);
            }
            step++;
        }

        function handleDiagnostics(diagnostics: readonly Diagnostic[], errorFlags: BuildResultFlags, errorType: string) {
            if (diagnostics.length) {
                ({ buildResult, step } = buildErrors(
                    state,
                    projectPath,
                    program,
                    config,
                    diagnostics,
                    errorFlags,
                    errorType
                ));
            }
            else {
                step++;
            }
        }

        function getSyntaxDiagnostics(cancellationToken?: CancellationToken) {
            Debug.assertIsDefined(program);
            handleDiagnostics(
                [
                    ...program.getConfigFileParsingDiagnostics(),
                    ...program.getOptionsDiagnostics(cancellationToken),
                    ...program.getGlobalDiagnostics(cancellationToken),
                    ...program.getSyntacticDiagnostics(/*sourceFile*/ undefined, cancellationToken)
                ],
                BuildResultFlags.SyntaxErrors,
                "Syntactic"
            );
        }

        function getSemanticDiagnostics(cancellationToken?: CancellationToken) {
            handleDiagnostics(
                Debug.checkDefined(program).getSemanticDiagnostics(/*sourceFile*/ undefined, cancellationToken),
                BuildResultFlags.TypeErrors,
                "Semantic"
            );
        }

        function emit(writeFileCallback?: WriteFileCallback, cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): EmitResult {
            Debug.assertIsDefined(program);
            Debug.assert(step === BuildStep.Emit);
            // Before emitting lets backup state, so we can revert it back if there are declaration errors to handle emit and declaration errors correctly
            program.backupState();
            let declDiagnostics: Diagnostic[] | undefined;
            const reportDeclarationDiagnostics = (d: Diagnostic) => (declDiagnostics || (declDiagnostics = [])).push(d);
            const outputFiles: OutputFile[] = [];
            const { emitResult } = emitFilesAndReportErrors(
                program,
                reportDeclarationDiagnostics,
                /*writeFileName*/ undefined,
                /*reportSummary*/ undefined,
                (name, text, writeByteOrderMark) => outputFiles.push({ name, text, writeByteOrderMark }),
                cancellationToken,
                /*emitOnlyDts*/ false,
                customTransformers
            );
            // Don't emit .d.ts if there are decl file errors
            if (declDiagnostics) {
                program.restoreState();
                ({ buildResult, step } = buildErrors(
                    state,
                    projectPath,
                    program,
                    config,
                    declDiagnostics,
                    BuildResultFlags.DeclarationEmitErrors,
                    "Declaration file"
                ));
                return {
                    emitSkipped: true,
                    diagnostics: emitResult.diagnostics
                };
            }

            // Actual Emit
            const { host, compilerHost } = state;
            let resultFlags = BuildResultFlags.DeclarationOutputUnchanged;
            let newestDeclarationFileContentChangedTime = minimumDate;
            let anyDtsChanged = false;
            const emitterDiagnostics = createDiagnosticCollection();
            const emittedOutputs = new Map<Path, string>();
            outputFiles.forEach(({ name, text, writeByteOrderMark }) => {
                let priorChangeTime: Date | undefined;
                if (!anyDtsChanged && isDeclarationFile(name)) {
                    // Check for unchanged .d.ts files
                    if (host.fileExists(name) && state.readFileWithCache(name) === text) {
                        priorChangeTime = host.getModifiedTime(name);
                    }
                    else {
                        resultFlags &= ~BuildResultFlags.DeclarationOutputUnchanged;
                        anyDtsChanged = true;
                    }
                }

                emittedOutputs.set(toPath(state, name), name);
                writeFile(writeFileCallback ? { writeFile: writeFileCallback } : compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
                if (priorChangeTime !== undefined) {
                    newestDeclarationFileContentChangedTime = newer(priorChangeTime, newestDeclarationFileContentChangedTime);
                }
            });

            finishEmit(
                emitterDiagnostics,
                emittedOutputs,
                newestDeclarationFileContentChangedTime,
                /*newestDeclarationFileContentChangedTimeIsMaximumDate*/ anyDtsChanged,
                outputFiles.length ? outputFiles[0].name : getFirstProjectOutput(config, !host.useCaseSensitiveFileNames()),
                resultFlags
            );
            return emitResult;
        }

        function emitBuildInfo(writeFileCallback?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult {
            Debug.assertIsDefined(program);
            Debug.assert(step === BuildStep.EmitBuildInfo);
            const emitResult = program.emitBuildInfo(writeFileCallback, cancellationToken);
            if (emitResult.diagnostics.length) {
                reportErrors(state, emitResult.diagnostics);
                state.diagnostics.set(projectPath, [...state.diagnostics.get(projectPath)!, ...emitResult.diagnostics]);
                buildResult = BuildResultFlags.EmitErrors & buildResult!;
            }

            if (emitResult.emittedFiles && state.writeFileName) {
                emitResult.emittedFiles.forEach(name => listEmittedFile(state, config, name));
            }
            afterProgramDone(state, program, config);
            step = BuildStep.QueueReferencingProjects;
            return emitResult;
        }

        function finishEmit(
            emitterDiagnostics: DiagnosticCollection,
            emittedOutputs: Map<Path, string>,
            priorNewestUpdateTime: Date,
            newestDeclarationFileContentChangedTimeIsMaximumDate: boolean,
            oldestOutputFileName: string,
            resultFlags: BuildResultFlags
        ) {
            const emitDiagnostics = emitterDiagnostics.getDiagnostics();
            if (emitDiagnostics.length) {
                ({ buildResult, step } = buildErrors(
                    state,
                    projectPath,
                    program,
                    config,
                    emitDiagnostics,
                    BuildResultFlags.EmitErrors,
                    "Emit"
                ));
                return emitDiagnostics;
            }

            if (state.writeFileName) {
                emittedOutputs.forEach(name => listEmittedFile(state, config, name));
            }

            // Update time stamps for rest of the outputs
            const newestDeclarationFileContentChangedTime = updateOutputTimestampsWorker(state, config, priorNewestUpdateTime, Diagnostics.Updating_unchanged_output_timestamps_of_project_0, emittedOutputs);
            state.diagnostics.delete(projectPath);
            state.projectStatus.set(projectPath, {
                type: UpToDateStatusType.UpToDate,
                newestDeclarationFileContentChangedTime: newestDeclarationFileContentChangedTimeIsMaximumDate ?
                    maximumDate :
                    newestDeclarationFileContentChangedTime,
                oldestOutputFileName
            });
            afterProgramDone(state, program, config);
            step = BuildStep.QueueReferencingProjects;
            buildResult = resultFlags;
            return emitDiagnostics;
        }

        function emitBundle(writeFileCallback?: WriteFileCallback, customTransformers?: CustomTransformers): EmitResult | BuildInvalidedProject<T> | undefined {
            Debug.assert(kind === InvalidatedProjectKind.UpdateBundle);
            if (state.options.dry) {
                reportStatus(state, Diagnostics.A_non_dry_build_would_update_output_of_project_0, project);
                buildResult = BuildResultFlags.Success;
                step = BuildStep.QueueReferencingProjects;
                return undefined;
            }

            if (state.options.verbose) reportStatus(state, Diagnostics.Updating_output_of_project_0, project);

            // Update js, and source map
            const { compilerHost } = state;
            state.projectCompilerOptions = config.options;
            const outputFiles = emitUsingBuildInfo(
                config,
                compilerHost,
                ref => {
                    const refName = resolveProjectName(state, ref.path);
                    return parseConfigFile(state, refName, toResolvedConfigFilePath(state, refName));
                },
                customTransformers
            );

            if (isString(outputFiles)) {
                reportStatus(state, Diagnostics.Cannot_update_output_of_project_0_because_there_was_error_reading_file_1, project, relName(state, outputFiles));
                step = BuildStep.BuildInvalidatedProjectOfBundle;
                return invalidatedProjectOfBundle = createBuildOrUpdateInvalidedProject(
                    InvalidatedProjectKind.Build,
                    state,
                    project,
                    projectPath,
                    projectIndex,
                    config,
                    buildOrder
                ) as BuildInvalidedProject<T>;
            }

            // Actual Emit
            Debug.assert(!!outputFiles.length);
            const emitterDiagnostics = createDiagnosticCollection();
            const emittedOutputs = new Map<Path, string>();
            outputFiles.forEach(({ name, text, writeByteOrderMark }) => {
                emittedOutputs.set(toPath(state, name), name);
                writeFile(writeFileCallback ? { writeFile: writeFileCallback } : compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
            });

            const emitDiagnostics = finishEmit(
                emitterDiagnostics,
                emittedOutputs,
                minimumDate,
                /*newestDeclarationFileContentChangedTimeIsMaximumDate*/ false,
                outputFiles[0].name,
                BuildResultFlags.DeclarationOutputUnchanged
            );
            return { emitSkipped: false, diagnostics: emitDiagnostics };
        }

        function executeSteps(till: BuildStep, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, customTransformers?: CustomTransformers) {
            while (step <= till && step < BuildStep.Done) {
                const currentStep = step;
                switch (step) {
                    case BuildStep.CreateProgram:
                        createProgram();
                        break;

                    case BuildStep.SyntaxDiagnostics:
                        getSyntaxDiagnostics(cancellationToken);
                        break;

                    case BuildStep.SemanticDiagnostics:
                        getSemanticDiagnostics(cancellationToken);
                        break;

                    case BuildStep.Emit:
                        emit(writeFile, cancellationToken, customTransformers);
                        break;

                    case BuildStep.EmitBuildInfo:
                        emitBuildInfo(writeFile, cancellationToken);
                        break;

                    case BuildStep.EmitBundle:
                        emitBundle(writeFile, customTransformers);
                        break;

                    case BuildStep.BuildInvalidatedProjectOfBundle:
                        Debug.checkDefined(invalidatedProjectOfBundle).done(cancellationToken);
                        step = BuildStep.Done;
                        break;

                    case BuildStep.QueueReferencingProjects:
                        queueReferencingProjects(state, project, projectPath, projectIndex, config, buildOrder, Debug.checkDefined(buildResult));
                        step++;
                        break;

                    // Should never be done
                    case BuildStep.Done:
                    default:
                        assertType<BuildStep.Done>(step);

                }
                Debug.assert(step > currentStep);
            }
        }
    }

    function needsBuild({ options }: SolutionBuilderState, status: UpToDateStatus, config: ParsedCommandLine) {
        if (status.type !== UpToDateStatusType.OutOfDateWithPrepend || options.force) return true;
        return config.fileNames.length === 0 ||
            !!getConfigFileParsingDiagnostics(config).length ||
            !isIncrementalCompilation(config.options);
    }

    function getNextInvalidatedProject<T extends BuilderProgram>(
        state: SolutionBuilderState<T>,
        buildOrder: AnyBuildOrder,
        reportQueue: boolean
    ): InvalidatedProject<T> | undefined {
        if (!state.projectPendingBuild.size) return undefined;
        if (isCircularBuildOrder(buildOrder)) return undefined;
        if (state.currentInvalidatedProject) {
            // Only if same buildOrder the currentInvalidated project can be sent again
            return arrayIsEqualTo(state.currentInvalidatedProject.buildOrder, buildOrder) ?
                state.currentInvalidatedProject :
                undefined;
        }

        const { options, projectPendingBuild } = state;
        for (let projectIndex = 0; projectIndex < buildOrder.length; projectIndex++) {
            const project = buildOrder[projectIndex];
            const projectPath = toResolvedConfigFilePath(state, project);
            const reloadLevel = state.projectPendingBuild.get(projectPath);
            if (reloadLevel === undefined) continue;

            if (reportQueue) {
                reportQueue = false;
                reportBuildQueue(state, buildOrder);
            }

            const config = parseConfigFile(state, project, projectPath);
            if (!config) {
                reportParseConfigFileDiagnostic(state, projectPath);
                projectPendingBuild.delete(projectPath);
                continue;
            }

            if (reloadLevel === ConfigFileProgramReloadLevel.Full) {
                watchConfigFile(state, project, projectPath, config);
                watchWildCardDirectories(state, project, projectPath, config);
                watchInputFiles(state, project, projectPath, config);
            }
            else if (reloadLevel === ConfigFileProgramReloadLevel.Partial) {
                // Update file names
                const result = getFileNamesFromConfigSpecs(config.configFileSpecs!, getDirectoryPath(project), config.options, state.parseConfigFileHost);
                updateErrorForNoInputFiles(result, project, config.configFileSpecs!, config.errors, canJsonReportNoInputFiles(config.raw));
                config.fileNames = result.fileNames;
                watchInputFiles(state, project, projectPath, config);
            }

            const status = getUpToDateStatus(state, config, projectPath);
            verboseReportProjectStatus(state, project, status);
            if (!options.force) {
                if (status.type === UpToDateStatusType.UpToDate) {
                    reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                    projectPendingBuild.delete(projectPath);
                    // Up to date, skip
                    if (options.dry) {
                        // In a dry build, inform the user of this fact
                        reportStatus(state, Diagnostics.Project_0_is_up_to_date, project);
                    }
                    continue;
                }

                if (status.type === UpToDateStatusType.UpToDateWithUpstreamTypes) {
                    reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                    return createUpdateOutputFileStampsProject(
                        state,
                        project,
                        projectPath,
                        config,
                        buildOrder
                    );
                }
            }

            if (status.type === UpToDateStatusType.UpstreamBlocked) {
                reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                projectPendingBuild.delete(projectPath);
                if (options.verbose) {
                    reportStatus(
                        state,
                        status.upstreamProjectBlocked ?
                            Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_was_not_built :
                            Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors,
                        project,
                        status.upstreamProjectName
                    );
                }
                continue;
            }

            if (status.type === UpToDateStatusType.ContainerOnly) {
                reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                projectPendingBuild.delete(projectPath);
                // Do nothing
                continue;
            }

            return createBuildOrUpdateInvalidedProject(
                needsBuild(state, status, config) ?
                    InvalidatedProjectKind.Build :
                    InvalidatedProjectKind.UpdateBundle,
                state,
                project,
                projectPath,
                projectIndex,
                config,
                buildOrder,
            );
        }

        return undefined;
    }

    function listEmittedFile({ writeFileName }: SolutionBuilderState, proj: ParsedCommandLine, file: string) {
        if (writeFileName && proj.options.listEmittedFiles) {
            writeFileName(`TSFILE: ${file}`);
        }
    }

    function getOldProgram<T extends BuilderProgram>({ options, builderPrograms, compilerHost }: SolutionBuilderState<T>, proj: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
        if (options.force) return undefined;
        const value = builderPrograms.get(proj);
        if (value) return value;
        return readBuilderProgram(parsed.options, compilerHost) as any as T;
    }

    function afterProgramDone<T extends BuilderProgram>(
        state: SolutionBuilderState<T>,
        program: T | undefined,
        config: ParsedCommandLine
    ) {
        if (program) {
            if (program && state.writeFileName) listFiles(program, state.writeFileName);
            if (state.host.afterProgramEmitAndDiagnostics) {
                state.host.afterProgramEmitAndDiagnostics(program);
            }
            program.releaseProgram();
        }
        else if (state.host.afterEmitBundle) {
            state.host.afterEmitBundle(config);
        }
        state.projectCompilerOptions = state.baseCompilerOptions;
    }

    function buildErrors<T extends BuilderProgram>(
        state: SolutionBuilderState<T>,
        resolvedPath: ResolvedConfigFilePath,
        program: T | undefined,
        config: ParsedCommandLine,
        diagnostics: readonly Diagnostic[],
        buildResult: BuildResultFlags,
        errorType: string,
    ) {
        const canEmitBuildInfo = !(buildResult & BuildResultFlags.SyntaxErrors) && program && !outFile(program.getCompilerOptions());

        reportAndStoreErrors(state, resolvedPath, diagnostics);
        // List files if any other build error using program (emit errors already report files)
        state.projectStatus.set(resolvedPath, { type: UpToDateStatusType.Unbuildable, reason: `${errorType} errors` });
        if (canEmitBuildInfo) return { buildResult, step: BuildStep.EmitBuildInfo };
        afterProgramDone(state, program, config);
        return { buildResult, step: BuildStep.QueueReferencingProjects };
    }

    function updateModuleResolutionCache(
        state: SolutionBuilderState,
        proj: ResolvedConfigFileName,
        config: ParsedCommandLine
    ) {
        if (!state.moduleResolutionCache) return;

        // Update module resolution cache if needed
        const { moduleResolutionCache } = state;
        const projPath = toPath(state, proj);
        if (moduleResolutionCache.directoryToModuleNameMap.redirectsMap.size === 0) {
            // The own map will be for projectCompilerOptions
            Debug.assert(moduleResolutionCache.moduleNameToDirectoryMap.redirectsMap.size === 0);
            moduleResolutionCache.directoryToModuleNameMap.redirectsMap.set(projPath, moduleResolutionCache.directoryToModuleNameMap.ownMap);
            moduleResolutionCache.moduleNameToDirectoryMap.redirectsMap.set(projPath, moduleResolutionCache.moduleNameToDirectoryMap.ownMap);
        }
        else {
            // Set correct own map
            Debug.assert(moduleResolutionCache.moduleNameToDirectoryMap.redirectsMap.size > 0);

            const ref: ResolvedProjectReference = {
                sourceFile: config.options.configFile!,
                commandLine: config
            };
            moduleResolutionCache.directoryToModuleNameMap.setOwnMap(moduleResolutionCache.directoryToModuleNameMap.getOrCreateMapOfCacheRedirects(ref));
            moduleResolutionCache.moduleNameToDirectoryMap.setOwnMap(moduleResolutionCache.moduleNameToDirectoryMap.getOrCreateMapOfCacheRedirects(ref));
        }
        moduleResolutionCache.directoryToModuleNameMap.setOwnOptions(config.options);
        moduleResolutionCache.moduleNameToDirectoryMap.setOwnOptions(config.options);
    }

    function checkConfigFileUpToDateStatus(state: SolutionBuilderState, configFile: string, oldestOutputFileTime: Date, oldestOutputFileName: string): Status.OutOfDateWithSelf | undefined {
        // Check tsconfig time
        const tsconfigTime = state.host.getModifiedTime(configFile) || missingFileModifiedTime;
        if (oldestOutputFileTime < tsconfigTime) {
            return {
                type: UpToDateStatusType.OutOfDateWithSelf,
                outOfDateOutputFileName: oldestOutputFileName,
                newerInputFileName: configFile
            };
        }
    }

    function getUpToDateStatusWorker(state: SolutionBuilderState, project: ParsedCommandLine, resolvedPath: ResolvedConfigFilePath): UpToDateStatus {
        let newestInputFileName: string = undefined!;
        let newestInputFileTime = minimumDate;
        const { host } = state;
        // Get timestamps of input files
        for (const inputFile of project.fileNames) {
            if (!host.fileExists(inputFile)) {
                return {
                    type: UpToDateStatusType.Unbuildable,
                    reason: `${inputFile} does not exist`
                };
            }

            const inputTime = host.getModifiedTime(inputFile) || missingFileModifiedTime;
            if (inputTime > newestInputFileTime) {
                newestInputFileName = inputFile;
                newestInputFileTime = inputTime;
            }
        }

        // Container if no files are specified in the project
        if (!project.fileNames.length && !canJsonReportNoInputFiles(project.raw)) {
            return {
                type: UpToDateStatusType.ContainerOnly
            };
        }

        // Collect the expected outputs of this project
        const outputs = getAllProjectOutputs(project, !host.useCaseSensitiveFileNames());

        // Now see if all outputs are newer than the newest input
        let oldestOutputFileName = "(none)";
        let oldestOutputFileTime = maximumDate;
        let newestOutputFileName = "(none)";
        let newestOutputFileTime = minimumDate;
        let missingOutputFileName: string | undefined;
        let newestDeclarationFileContentChangedTime = minimumDate;
        let isOutOfDateWithInputs = false;
        for (const output of outputs) {
            // Output is missing; can stop checking
            // Don't immediately return because we can still be upstream-blocked, which is a higher-priority status
            if (!host.fileExists(output)) {
                missingOutputFileName = output;
                break;
            }

            const outputTime = host.getModifiedTime(output) || missingFileModifiedTime;
            if (outputTime < oldestOutputFileTime) {
                oldestOutputFileTime = outputTime;
                oldestOutputFileName = output;
            }

            // If an output is older than the newest input, we can stop checking
            // Don't immediately return because we can still be upstream-blocked, which is a higher-priority status
            if (outputTime < newestInputFileTime) {
                isOutOfDateWithInputs = true;
                break;
            }

            if (outputTime > newestOutputFileTime) {
                newestOutputFileTime = outputTime;
                newestOutputFileName = output;
            }

            // Keep track of when the most recent time a .d.ts file was changed.
            // In addition to file timestamps, we also keep track of when a .d.ts file
            // had its file touched but not had its contents changed - this allows us
            // to skip a downstream typecheck
            if (isDeclarationFile(output)) {
                const outputModifiedTime = host.getModifiedTime(output) || missingFileModifiedTime;
                newestDeclarationFileContentChangedTime = newer(newestDeclarationFileContentChangedTime, outputModifiedTime);
            }
        }

        let pseudoUpToDate = false;
        let usesPrepend = false;
        let upstreamChangedProject: string | undefined;
        if (project.projectReferences) {
            state.projectStatus.set(resolvedPath, { type: UpToDateStatusType.ComputingUpstream });
            for (const ref of project.projectReferences) {
                usesPrepend = usesPrepend || !!(ref.prepend);
                const resolvedRef = resolveProjectReferencePath(ref);
                const resolvedRefPath = toResolvedConfigFilePath(state, resolvedRef);
                const refStatus = getUpToDateStatus(state, parseConfigFile(state, resolvedRef, resolvedRefPath), resolvedRefPath);

                // Its a circular reference ignore the status of this project
                if (refStatus.type === UpToDateStatusType.ComputingUpstream ||
                    refStatus.type === UpToDateStatusType.ContainerOnly) { // Container only ignore this project
                    continue;
                }

                // An upstream project is blocked
                if (refStatus.type === UpToDateStatusType.Unbuildable ||
                    refStatus.type === UpToDateStatusType.UpstreamBlocked) {
                    return {
                        type: UpToDateStatusType.UpstreamBlocked,
                        upstreamProjectName: ref.path,
                        upstreamProjectBlocked: refStatus.type === UpToDateStatusType.UpstreamBlocked
                    };
                }

                // If the upstream project is out of date, then so are we (someone shouldn't have asked, though?)
                if (refStatus.type !== UpToDateStatusType.UpToDate) {
                    return {
                        type: UpToDateStatusType.UpstreamOutOfDate,
                        upstreamProjectName: ref.path
                    };
                }

                // Check oldest output file name only if there is no missing output file name
                if (!missingOutputFileName) {
                    // If the upstream project's newest file is older than our oldest output, we
                    // can't be out of date because of it
                    if (refStatus.newestInputFileTime && refStatus.newestInputFileTime <= oldestOutputFileTime) {
                        continue;
                    }

                    // If the upstream project has only change .d.ts files, and we've built
                    // *after* those files, then we're "psuedo up to date" and eligible for a fast rebuild
                    if (refStatus.newestDeclarationFileContentChangedTime && refStatus.newestDeclarationFileContentChangedTime <= oldestOutputFileTime) {
                        pseudoUpToDate = true;
                        upstreamChangedProject = ref.path;
                        continue;
                    }

                    // We have an output older than an upstream output - we are out of date
                    Debug.assert(oldestOutputFileName !== undefined, "Should have an oldest output filename here");
                    return {
                        type: UpToDateStatusType.OutOfDateWithUpstream,
                        outOfDateOutputFileName: oldestOutputFileName,
                        newerProjectName: ref.path
                    };
                }
            }
        }

        if (missingOutputFileName !== undefined) {
            return {
                type: UpToDateStatusType.OutputMissing,
                missingOutputFileName
            };
        }

        if (isOutOfDateWithInputs) {
            return {
                type: UpToDateStatusType.OutOfDateWithSelf,
                outOfDateOutputFileName: oldestOutputFileName,
                newerInputFileName: newestInputFileName
            };
        }
        else {
            // Check tsconfig time
            const configStatus = checkConfigFileUpToDateStatus(state, project.options.configFilePath!, oldestOutputFileTime, oldestOutputFileName);
            if (configStatus) return configStatus;

            // Check extended config time
            const extendedConfigStatus = forEach(project.options.configFile!.extendedSourceFiles || emptyArray, configFile => checkConfigFileUpToDateStatus(state, configFile, oldestOutputFileTime, oldestOutputFileName));
            if (extendedConfigStatus) return extendedConfigStatus;
        }

        if (!state.buildInfoChecked.has(resolvedPath)) {
            state.buildInfoChecked.set(resolvedPath, true);
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(project.options);
            if (buildInfoPath) {
                const value = state.readFileWithCache(buildInfoPath);
                const buildInfo = value && getBuildInfo(value);
                if (buildInfo && (buildInfo.bundle || buildInfo.program) && buildInfo.version !== version) {
                    return {
                        type: UpToDateStatusType.TsVersionOutputOfDate,
                        version: buildInfo.version
                    };
                }
            }
        }

        if (usesPrepend && pseudoUpToDate) {
            return {
                type: UpToDateStatusType.OutOfDateWithPrepend,
                outOfDateOutputFileName: oldestOutputFileName,
                newerProjectName: upstreamChangedProject!
            };
        }

        // Up to date
        return {
            type: pseudoUpToDate ? UpToDateStatusType.UpToDateWithUpstreamTypes : UpToDateStatusType.UpToDate,
            newestDeclarationFileContentChangedTime,
            newestInputFileTime,
            newestOutputFileTime,
            newestInputFileName,
            newestOutputFileName,
            oldestOutputFileName
        };
    }

    function getUpToDateStatus(state: SolutionBuilderState, project: ParsedCommandLine | undefined, resolvedPath: ResolvedConfigFilePath): UpToDateStatus {
        if (project === undefined) {
            return { type: UpToDateStatusType.Unbuildable, reason: "File deleted mid-build" };
        }

        const prior = state.projectStatus.get(resolvedPath);
        if (prior !== undefined) {
            return prior;
        }

        const actual = getUpToDateStatusWorker(state, project, resolvedPath);
        state.projectStatus.set(resolvedPath, actual);
        return actual;
    }

    function updateOutputTimestampsWorker(state: SolutionBuilderState, proj: ParsedCommandLine, priorNewestUpdateTime: Date, verboseMessage: DiagnosticMessage, skipOutputs?: Map<Path, string>) {
        const { host } = state;
        const outputs = getAllProjectOutputs(proj, !host.useCaseSensitiveFileNames());
        if (!skipOutputs || outputs.length !== skipOutputs.size) {
            let reportVerbose = !!state.options.verbose;
            const now = host.now ? host.now() : new Date();
            for (const file of outputs) {
                if (skipOutputs && skipOutputs.has(toPath(state, file))) {
                    continue;
                }

                if (reportVerbose) {
                    reportVerbose = false;
                    reportStatus(state, verboseMessage, proj.options.configFilePath!);
                }

                if (isDeclarationFile(file)) {
                    priorNewestUpdateTime = newer(priorNewestUpdateTime, host.getModifiedTime(file) || missingFileModifiedTime);
                }

                host.setModifiedTime(file, now);
            }
        }

        return priorNewestUpdateTime;
    }

    function updateOutputTimestamps(state: SolutionBuilderState, proj: ParsedCommandLine, resolvedPath: ResolvedConfigFilePath) {
        if (state.options.dry) {
            return reportStatus(state, Diagnostics.A_non_dry_build_would_update_timestamps_for_output_of_project_0, proj.options.configFilePath!);
        }
        const priorNewestUpdateTime = updateOutputTimestampsWorker(state, proj, minimumDate, Diagnostics.Updating_output_timestamps_of_project_0);
        state.projectStatus.set(resolvedPath, {
            type: UpToDateStatusType.UpToDate,
            newestDeclarationFileContentChangedTime: priorNewestUpdateTime,
            oldestOutputFileName: getFirstProjectOutput(proj, !state.host.useCaseSensitiveFileNames())
        });
    }

    function queueReferencingProjects(
        state: SolutionBuilderState,
        project: ResolvedConfigFileName,
        projectPath: ResolvedConfigFilePath,
        projectIndex: number,
        config: ParsedCommandLine,
        buildOrder: readonly ResolvedConfigFileName[],
        buildResult: BuildResultFlags
    ) {
        // Queue only if there are no errors
        if (buildResult & BuildResultFlags.AnyErrors) return;
        // Only composite projects can be referenced by other projects
        if (!config.options.composite) return;
        // Always use build order to queue projects
        for (let index = projectIndex + 1; index < buildOrder.length; index++) {
            const nextProject = buildOrder[index];
            const nextProjectPath = toResolvedConfigFilePath(state, nextProject);
            if (state.projectPendingBuild.has(nextProjectPath)) continue;

            const nextProjectConfig = parseConfigFile(state, nextProject, nextProjectPath);
            if (!nextProjectConfig || !nextProjectConfig.projectReferences) continue;
            for (const ref of nextProjectConfig.projectReferences) {
                const resolvedRefPath = resolveProjectName(state, ref.path);
                if (toResolvedConfigFilePath(state, resolvedRefPath) !== projectPath) continue;
                // If the project is referenced with prepend, always build downstream projects,
                // If declaration output is changed, build the project
                // otherwise mark the project UpToDateWithUpstreamTypes so it updates output time stamps
                const status = state.projectStatus.get(nextProjectPath);
                if (status) {
                    switch (status.type) {
                        case UpToDateStatusType.UpToDate:
                            if (buildResult & BuildResultFlags.DeclarationOutputUnchanged) {
                                if (ref.prepend) {
                                    state.projectStatus.set(nextProjectPath, {
                                        type: UpToDateStatusType.OutOfDateWithPrepend,
                                        outOfDateOutputFileName: status.oldestOutputFileName,
                                        newerProjectName: project
                                    });
                                }
                                else {
                                    status.type = UpToDateStatusType.UpToDateWithUpstreamTypes;
                                }
                                break;
                            }
                            // falls through

                        case UpToDateStatusType.UpToDateWithUpstreamTypes:
                        case UpToDateStatusType.OutOfDateWithPrepend:
                            if (!(buildResult & BuildResultFlags.DeclarationOutputUnchanged)) {
                                state.projectStatus.set(nextProjectPath, {
                                    type: UpToDateStatusType.OutOfDateWithUpstream,
                                    outOfDateOutputFileName: status.type === UpToDateStatusType.OutOfDateWithPrepend ? status.outOfDateOutputFileName : status.oldestOutputFileName,
                                    newerProjectName: project
                                });
                            }
                            break;

                        case UpToDateStatusType.UpstreamBlocked:
                            if (toResolvedConfigFilePath(state, resolveProjectName(state, status.upstreamProjectName)) === projectPath) {
                                clearProjectStatus(state, nextProjectPath);
                            }
                            break;
                    }
                }
                addProjToQueue(state, nextProjectPath, ConfigFileProgramReloadLevel.None);
                break;
            }
        }
    }

    function build(state: SolutionBuilderState, project?: string, cancellationToken?: CancellationToken, onlyReferences?: boolean): ExitStatus {
        const buildOrder = getBuildOrderFor(state, project, onlyReferences);
        if (!buildOrder) return ExitStatus.InvalidProject_OutputsSkipped;

        setupInitialBuild(state, cancellationToken);

        let reportQueue = true;
        let successfulProjects = 0;
        while (true) {
            const invalidatedProject = getNextInvalidatedProject(state, buildOrder, reportQueue);
            if (!invalidatedProject) break;
            reportQueue = false;
            invalidatedProject.done(cancellationToken);
            if (!state.diagnostics.has(invalidatedProject.projectPath)) successfulProjects++;
        }

        disableCache(state);
        reportErrorSummary(state, buildOrder);
        startWatching(state, buildOrder);

        return isCircularBuildOrder(buildOrder)
            ? ExitStatus.ProjectReferenceCycle_OutputsSkipped
            : !buildOrder.some(p => state.diagnostics.has(toResolvedConfigFilePath(state, p)))
                ? ExitStatus.Success
                : successfulProjects
                    ? ExitStatus.DiagnosticsPresent_OutputsGenerated
                    : ExitStatus.DiagnosticsPresent_OutputsSkipped;
    }

    function clean(state: SolutionBuilderState, project?: string, onlyReferences?: boolean) {
        const buildOrder = getBuildOrderFor(state, project, onlyReferences);
        if (!buildOrder) return ExitStatus.InvalidProject_OutputsSkipped;

        if (isCircularBuildOrder(buildOrder)) {
            reportErrors(state, buildOrder.circularDiagnostics);
            return ExitStatus.ProjectReferenceCycle_OutputsSkipped;
        }

        const { options, host } = state;
        const filesToDelete = options.dry ? [] as string[] : undefined;
        for (const proj of buildOrder) {
            const resolvedPath = toResolvedConfigFilePath(state, proj);
            const parsed = parseConfigFile(state, proj, resolvedPath);
            if (parsed === undefined) {
                // File has gone missing; fine to ignore here
                reportParseConfigFileDiagnostic(state, resolvedPath);
                continue;
            }
            const outputs = getAllProjectOutputs(parsed, !host.useCaseSensitiveFileNames());
            for (const output of outputs) {
                if (host.fileExists(output)) {
                    if (filesToDelete) {
                        filesToDelete.push(output);
                    }
                    else {
                        host.deleteFile(output);
                        invalidateProject(state, resolvedPath, ConfigFileProgramReloadLevel.None);
                    }
                }
            }
        }

        if (filesToDelete) {
            reportStatus(state, Diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0, filesToDelete.map(f => `\r\n * ${f}`).join(""));
        }

        return ExitStatus.Success;
    }

    function invalidateProject(state: SolutionBuilderState, resolved: ResolvedConfigFilePath, reloadLevel: ConfigFileProgramReloadLevel) {
        // If host implements getParsedCommandLine, we cant get list of files from parseConfigFileHost
        if (state.host.getParsedCommandLine && reloadLevel === ConfigFileProgramReloadLevel.Partial) {
            reloadLevel = ConfigFileProgramReloadLevel.Full;
        }
        if (reloadLevel === ConfigFileProgramReloadLevel.Full) {
            state.configFileCache.delete(resolved);
            state.buildOrder = undefined;
        }
        state.needsSummary = true;
        clearProjectStatus(state, resolved);
        addProjToQueue(state, resolved, reloadLevel);
        enableCache(state);
    }

    function invalidateProjectAndScheduleBuilds(state: SolutionBuilderState, resolvedPath: ResolvedConfigFilePath, reloadLevel: ConfigFileProgramReloadLevel) {
        state.reportFileChangeDetected = true;
        invalidateProject(state, resolvedPath, reloadLevel);
        scheduleBuildInvalidatedProject(state);
    }

    function scheduleBuildInvalidatedProject(state: SolutionBuilderState) {
        const { hostWithWatch } = state;
        if (!hostWithWatch.setTimeout || !hostWithWatch.clearTimeout) {
            return;
        }
        if (state.timerToBuildInvalidatedProject) {
            hostWithWatch.clearTimeout(state.timerToBuildInvalidatedProject);
        }
        state.timerToBuildInvalidatedProject = hostWithWatch.setTimeout(buildNextInvalidatedProject, 250, state);
    }

    function buildNextInvalidatedProject(state: SolutionBuilderState) {
        state.timerToBuildInvalidatedProject = undefined;
        if (state.reportFileChangeDetected) {
            state.reportFileChangeDetected = false;
            state.projectErrorsReported.clear();
            reportWatchStatus(state, Diagnostics.File_change_detected_Starting_incremental_compilation);
        }
        const buildOrder = getBuildOrder(state);
        const invalidatedProject = getNextInvalidatedProject(state, buildOrder, /*reportQueue*/ false);
        if (invalidatedProject) {
            invalidatedProject.done();
            if (state.projectPendingBuild.size) {
                // Schedule next project for build
                if (state.watch && !state.timerToBuildInvalidatedProject) {
                    scheduleBuildInvalidatedProject(state);
                }
                return;
            }
        }
        disableCache(state);
        reportErrorSummary(state, buildOrder);
    }

    function watchConfigFile(state: SolutionBuilderState, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine | undefined) {
        if (!state.watch || state.allWatchedConfigFiles.has(resolvedPath)) return;
        state.allWatchedConfigFiles.set(resolvedPath, state.watchFile(
            state.hostWithWatch,
            resolved,
            () => {
                invalidateProjectAndScheduleBuilds(state, resolvedPath, ConfigFileProgramReloadLevel.Full);
            },
            PollingInterval.High,
            parsed?.watchOptions,
            WatchType.ConfigFile,
            resolved
        ));
    }

    function watchWildCardDirectories(state: SolutionBuilderState, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
        if (!state.watch) return;
        updateWatchingWildcardDirectories(
            getOrCreateValueMapFromConfigFileMap(state.allWatchedWildcardDirectories, resolvedPath),
            new Map(getEntries(parsed.configFileSpecs!.wildcardDirectories)),
            (dir, flags) => state.watchDirectory(
                state.hostWithWatch,
                dir,
                fileOrDirectory => {
                    if (isIgnoredFileFromWildCardWatching({
                        watchedDirPath: toPath(state, dir),
                        fileOrDirectory,
                        fileOrDirectoryPath: toPath(state, fileOrDirectory),
                        configFileName: resolved,
                        configFileSpecs: parsed.configFileSpecs!,
                        currentDirectory: state.currentDirectory,
                        options: parsed.options,
                        program: state.builderPrograms.get(resolvedPath),
                        useCaseSensitiveFileNames: state.parseConfigFileHost.useCaseSensitiveFileNames,
                        writeLog: s => state.writeLog(s)
                    })) return;

                    invalidateProjectAndScheduleBuilds(state, resolvedPath, ConfigFileProgramReloadLevel.Partial);
                },
                flags,
                parsed?.watchOptions,
                WatchType.WildcardDirectory,
                resolved
            )
        );
    }

    function watchInputFiles(state: SolutionBuilderState, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
        if (!state.watch) return;
        mutateMap(
            getOrCreateValueMapFromConfigFileMap(state.allWatchedInputFiles, resolvedPath),
            arrayToMap(parsed.fileNames, fileName => toPath(state, fileName)),
            {
                createNewValue: (path, input) => state.watchFilePath(
                    state.hostWithWatch,
                    input,
                    () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ConfigFileProgramReloadLevel.None),
                    PollingInterval.Low,
                    parsed?.watchOptions,
                    path as Path,
                    WatchType.SourceFile,
                    resolved
                ),
                onDeleteValue: closeFileWatcher,
            }
        );
    }

    function startWatching(state: SolutionBuilderState, buildOrder: AnyBuildOrder) {
        if (!state.watchAllProjectsPending) return;
        state.watchAllProjectsPending = false;
        for (const resolved of getBuildOrderFromAnyBuildOrder(buildOrder)) {
            const resolvedPath = toResolvedConfigFilePath(state, resolved);
            const cfg = parseConfigFile(state, resolved, resolvedPath);
            // Watch this file
            watchConfigFile(state, resolved, resolvedPath, cfg);
            if (cfg) {
                // Update watchers for wildcard directories
                watchWildCardDirectories(state, resolved, resolvedPath, cfg);

                // Watch input files
                watchInputFiles(state, resolved, resolvedPath, cfg);
            }
        }
    }

    function stopWatching(state: SolutionBuilderState) {
        clearMap(state.allWatchedConfigFiles, closeFileWatcher);
        clearMap(state.allWatchedWildcardDirectories, watchedWildcardDirectories => clearMap(watchedWildcardDirectories, closeFileWatcherOf));
        clearMap(state.allWatchedInputFiles, watchedWildcardDirectories => clearMap(watchedWildcardDirectories, closeFileWatcher));
    }

    /**
     * A SolutionBuilder has an immutable set of rootNames that are the "entry point" projects, but
     * can dynamically add/remove other projects based on changes on the rootNames' references
     */
    function createSolutionBuilderWorker<T extends BuilderProgram>(watch: false, host: SolutionBuilderHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilder<T>;
    function createSolutionBuilderWorker<T extends BuilderProgram>(watch: true, host: SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilder<T>;
    function createSolutionBuilderWorker<T extends BuilderProgram>(watch: boolean, hostOrHostWithWatch: SolutionBuilderHost<T> | SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], options: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilder<T> {
        const state = createSolutionBuilderState(watch, hostOrHostWithWatch, rootNames, options, baseWatchOptions);
        return {
            build: (project, cancellationToken) => build(state, project, cancellationToken),
            clean: project => clean(state, project),
            buildReferences: (project, cancellationToken) => build(state, project, cancellationToken, /*onlyReferences*/ true),
            cleanReferences: project => clean(state, project, /*onlyReferences*/ true),
            getNextInvalidatedProject: cancellationToken => {
                setupInitialBuild(state, cancellationToken);
                return getNextInvalidatedProject(state, getBuildOrder(state), /*reportQueue*/ false);
            },
            getBuildOrder: () => getBuildOrder(state),
            getUpToDateStatusOfProject: project => {
                const configFileName = resolveProjectName(state, project);
                const configFilePath = toResolvedConfigFilePath(state, configFileName);
                return getUpToDateStatus(state, parseConfigFile(state, configFileName, configFilePath), configFilePath);
            },
            invalidateProject: (configFilePath, reloadLevel) => invalidateProject(state, configFilePath, reloadLevel || ConfigFileProgramReloadLevel.None),
            buildNextInvalidatedProject: () => buildNextInvalidatedProject(state),
            getAllParsedConfigs: () => arrayFrom(mapDefinedIterator(
                state.configFileCache.values(),
                config => isParsedCommandLine(config) ? config : undefined
            )),
            close: () => stopWatching(state),
        };
    }

    function relName(state: SolutionBuilderState, path: string): string {
        return convertToRelativePath(path, state.currentDirectory, f => state.getCanonicalFileName(f));
    }

    function reportStatus(state: SolutionBuilderState, message: DiagnosticMessage, ...args: string[]) {
        state.host.reportSolutionBuilderStatus(createCompilerDiagnostic(message, ...args));
    }

    function reportWatchStatus(state: SolutionBuilderState, message: DiagnosticMessage, ...args: (string | number | undefined)[]) {
        if (state.hostWithWatch.onWatchStatusChange) {
            state.hostWithWatch.onWatchStatusChange(createCompilerDiagnostic(message, ...args), state.host.getNewLine(), state.baseCompilerOptions);
        }
    }

    function reportErrors({ host }: SolutionBuilderState, errors: readonly Diagnostic[]) {
        errors.forEach(err => host.reportDiagnostic(err));
    }

    function reportAndStoreErrors(state: SolutionBuilderState, proj: ResolvedConfigFilePath, errors: readonly Diagnostic[]) {
        reportErrors(state, errors);
        state.projectErrorsReported.set(proj, true);
        if (errors.length) {
            state.diagnostics.set(proj, errors);
        }
    }

    function reportParseConfigFileDiagnostic(state: SolutionBuilderState, proj: ResolvedConfigFilePath) {
        reportAndStoreErrors(state, proj, [state.configFileCache.get(proj) as Diagnostic]);
    }

    function reportErrorSummary(state: SolutionBuilderState, buildOrder: AnyBuildOrder) {
        if (!state.needsSummary) return;
        state.needsSummary = false;
        const canReportSummary = state.watch || !!state.host.reportErrorSummary;
        const { diagnostics } = state;
        let totalErrors = 0;
        if (isCircularBuildOrder(buildOrder)) {
            reportBuildQueue(state, buildOrder.buildOrder);
            reportErrors(state, buildOrder.circularDiagnostics);
            if (canReportSummary) totalErrors += getErrorCountForSummary(buildOrder.circularDiagnostics);
        }
        else {
            // Report errors from the other projects
            buildOrder.forEach(project => {
                const projectPath = toResolvedConfigFilePath(state, project);
                if (!state.projectErrorsReported.has(projectPath)) {
                    reportErrors(state, diagnostics.get(projectPath) || emptyArray);
                }
            });
            if (canReportSummary) diagnostics.forEach(singleProjectErrors => totalErrors += getErrorCountForSummary(singleProjectErrors));
        }

        if (state.watch) {
            reportWatchStatus(state, getWatchErrorSummaryDiagnosticMessage(totalErrors), totalErrors);
        }
        else if (state.host.reportErrorSummary) {
            state.host.reportErrorSummary(totalErrors);
        }
    }

    /**
     * Report the build ordering inferred from the current project graph if we're in verbose mode
     */
    function reportBuildQueue(state: SolutionBuilderState, buildQueue: readonly ResolvedConfigFileName[]) {
        if (state.options.verbose) {
            reportStatus(state, Diagnostics.Projects_in_this_build_Colon_0, buildQueue.map(s => "\r\n    * " + relName(state, s)).join(""));
        }
    }

    function reportUpToDateStatus(state: SolutionBuilderState, configFileName: string, status: UpToDateStatus) {
        switch (status.type) {
            case UpToDateStatusType.OutOfDateWithSelf:
                return reportStatus(
                    state,
                    Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                    relName(state, configFileName),
                    relName(state, status.outOfDateOutputFileName),
                    relName(state, status.newerInputFileName)
                );
            case UpToDateStatusType.OutOfDateWithUpstream:
                return reportStatus(
                    state,
                    Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                    relName(state, configFileName),
                    relName(state, status.outOfDateOutputFileName),
                    relName(state, status.newerProjectName)
                );
            case UpToDateStatusType.OutputMissing:
                return reportStatus(
                    state,
                    Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                    relName(state, configFileName),
                    relName(state, status.missingOutputFileName)
                );
            case UpToDateStatusType.UpToDate:
                if (status.newestInputFileTime !== undefined) {
                    return reportStatus(
                        state,
                        Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                        relName(state, configFileName),
                        relName(state, status.newestInputFileName || ""),
                        relName(state, status.oldestOutputFileName || "")
                    );
                }
                // Don't report anything for "up to date because it was already built" -- too verbose
                break;
            case UpToDateStatusType.OutOfDateWithPrepend:
                return reportStatus(
                    state,
                    Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed,
                    relName(state, configFileName),
                    relName(state, status.newerProjectName)
                );
            case UpToDateStatusType.UpToDateWithUpstreamTypes:
                return reportStatus(
                    state,
                    Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
                    relName(state, configFileName)
                );
            case UpToDateStatusType.UpstreamOutOfDate:
                return reportStatus(
                    state,
                    Diagnostics.Project_0_is_out_of_date_because_its_dependency_1_is_out_of_date,
                    relName(state, configFileName),
                    relName(state, status.upstreamProjectName)
                );
            case UpToDateStatusType.UpstreamBlocked:
                return reportStatus(
                    state,
                    status.upstreamProjectBlocked ?
                        Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_was_not_built :
                        Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors,
                    relName(state, configFileName),
                    relName(state, status.upstreamProjectName)
                );
            case UpToDateStatusType.Unbuildable:
                return reportStatus(
                    state,
                    Diagnostics.Failed_to_parse_file_0_Colon_1,
                    relName(state, configFileName),
                    status.reason
                );
            case UpToDateStatusType.TsVersionOutputOfDate:
                return reportStatus(
                    state,
                    Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2,
                    relName(state, configFileName),
                    status.version,
                    version
                );
            case UpToDateStatusType.ContainerOnly:
            // Don't report status on "solution" projects
            // falls through
            case UpToDateStatusType.ComputingUpstream:
                // Should never leak from getUptoDateStatusWorker
                break;
            default:
                assertType<never>(status);
        }
    }

    /**
     * Report the up-to-date status of a project if we're in verbose mode
     */
    function verboseReportProjectStatus(state: SolutionBuilderState, configFileName: string, status: UpToDateStatus) {
        if (state.options.verbose) {
            reportUpToDateStatus(state, configFileName, status);
        }
    }
}
