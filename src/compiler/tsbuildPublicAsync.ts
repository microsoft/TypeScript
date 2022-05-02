namespace ts {
    const minimumDate = new Date(-8640000000000000);
    const maximumDate = new Date(8640000000000000);

    // export interface BuildOptions {
    //     dry?: boolean;
    //     force?: boolean;
    //     verbose?: boolean;

    //     /*@internal*/ clean?: boolean;
    //     /*@internal*/ watch?: boolean;
    //     /*@internal*/ help?: boolean;

    //     /*@internal*/ preserveWatchOutput?: boolean;
    //     /*@internal*/ listEmittedFiles?: boolean;
    //     /*@internal*/ listFiles?: boolean;
    //     /*@internal*/ explainFiles?: boolean;
    //     /*@internal*/ pretty?: boolean;
    //     incremental?: boolean;
    //     assumeChangesOnlyAffectDirectDependencies?: boolean;

    //     traceResolution?: boolean;
    //     /* @internal */ diagnostics?: boolean;
    //     /* @internal */ extendedDiagnostics?: boolean;
    //     /* @internal */ locale?: string;
    //     /* @internal */ generateCpuProfile?: string;
    //     /* @internal */ generateTrace?: string;

    //     [option: string]: CompilerOptionsValue | undefined;
    // }

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

    /*@ internal*/
    // export type ResolvedConfigFilePath = ResolvedConfigFileName & Path;

    function getOrCreateValueFromConfigFileMap<T>(configFileMap: ESMap<ResolvedConfigFilePath, T>, resolved: ResolvedConfigFilePath, createT: () => T): T {
        const existingValue = configFileMap.get(resolved);
        let newValue: T | undefined;
        if (!existingValue) {
            newValue = createT();
            configFileMap.set(resolved, newValue);
        }
        return existingValue || newValue!;
    }

    function getOrCreateValueMapFromConfigFileMap<T>(configFileMap: ESMap<ResolvedConfigFilePath, ESMap<string, T>>, resolved: ResolvedConfigFilePath): ESMap<string, T> {
        return getOrCreateValueFromConfigFileMap<ESMap<string, T>>(configFileMap, resolved, () => new Map());
    }

    function newer(date1: Date, date2: Date): Date {
        return date2 > date1 ? date2 : date1;
    }
    export type GetCustomTransformersAsync = (project: string,program?: Program) => Promise<CustomTransformers | undefined>;

    // export type ReportEmitErrorSummary = (errorCount: number, filesInError: (ReportFileInError | undefined)[]) => void;

    // export interface ReportFileInError {
    //     fileName: string;
    //     line: number;
    // }
    //type SolutionBuilderHostBase<T extends BuilderProgram> = never & T;
    export interface SolutionBuilderHostBaseAsync<T extends BuilderProgram> extends ProgramHost<T> {
        /**
         * CreateProgramHookAsync is just an async wrapper whichs call inner non-async CreateProgram<T>.
         * The purpose is to allow an async hook which can be used to call async user functions before or after non-async CreateProgram
         * The user can override createProgramHookAsync like this:
         * ```
         * host.createProgramHookAsync = async (...args: Parameters<CreateProgram<T>>) => {
         *    // optional user functions here
         *    const p = host.createProgram(...args)
         *    // optional user functions here
         *    return p;
         * }
         * ```
         * Note that this hook is not intended for transforms unless the entire "emit" is handled by the user.
         * Generally a "getCustomTransformsAsync" hook (member or passed parameter) should be used for transforms.
         * @param ...args: Parameters<CreateProgram<T>>
         * @returns Promise<T>
         */
        createProgramHookAsync(...args: Parameters<CreateProgram<T>>): Promise<T>
        createDirectory?(path: string): void;
        /**
         * Should provide create directory and writeFile if done of invalidatedProjects is not invoked with
         * writeFileCallback
         */
        writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
        // There is one line of code where getCustomTransformersAsync is possibly called with program === undefined
        // ---> async function emitBundleAsync
        getCustomTransformersAsync?: (project: string, program?: Program) => Promise<CustomTransformers | undefined>;

        getModifiedTime(fileName: string): Date | undefined;
        setModifiedTime(fileName: string, date: Date): void;
        deleteFile(fileName: string): void;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;

        reportDiagnostic: DiagnosticReporter;
        /**
         * In the non-Async type of host SolutionBuilderHostBaseAsync, reportSolutionBuilderStatus could be used to
         * build an ad-hoc synchronous hook to alert when the project was "settled".
         * In this Async type of host "solutionSettledAsync" can be used for that purpose.
         */
        reportSolutionBuilderStatus: DiagnosticReporter;

        /**
         * afterProgramEmitAndDiagnosticsAsync / afterEmitBundleAsync
         * are optional hooks called after emit (including transforms) are complete.
         */
        afterProgramEmitAndDiagnosticsAsync?(program: T): Promise<void>;
        afterEmitBundleAsync?(config: ParsedCommandLine): Promise<void>;
        // For testing
        /*@internal*/ now?(): Date;
    }
    // type SolutionBuilderHost<T extends BuilderProgram> = never & T;
    export interface SolutionBuilderHostAsync<T extends BuilderProgram> extends SolutionBuilderHostBaseAsync<T> {
        reportErrorSummary?: ReportEmitErrorSummary;
    }
    // type SolutionBuilderWithWatchHost<T extends BuilderProgram> = never & T;
    export interface SolutionBuilderWithWatchHostAsync<T extends BuilderProgram> extends SolutionBuilderHostBaseAsync<T>, WatchHost {
        /**
         * optional solutionSettled callback will be called when the solition has no more projectes to make, just before waiting for watch events.
         * @param totalErrors
         */
        solutionSettledAsync? (totalErrors: number): Promise<void>;
    }

    export interface SolutionBuilderAsync {
        buildAsync(project?: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync): Promise<ExitStatus | undefined>;
        clean(project?: string): ExitStatus;
        buildReferencesAsync(project: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync): Promise<ExitStatus | undefined>;
        cleanReferences(project?: string): ExitStatus;
        /**
         * closeRequest:
         *   - request that async buildAsync/buildReferencesAsync processing terminate, and wathces cleared, after any project currently being built is finished.
         *   - In case of non-watch host, this call is a noop.
         */
        closeRequest(): void;
        /**
         * getNextInvalidatedProject
         * Probably doesn't make sense with asyncInterface
         */
        //getNextInvalidatedProject(cancellationToken?: CancellationToken): InvalidatedProjectAsync<T> | undefined;


        // Testing only
        /**
         * buildInvalidatedProjectsRequest would only need to be made public if invalidateProject were made public;
         */
        /*@internal*/ getBuildOrder(): AnyBuildOrder;
        /*@internal*/ buildInvalidatedProjectsRequest(): void;
        /*@internal*/ getUpToDateStatusOfProject(project: string): UpToDateStatus;
        /*@internal*/ invalidateProject(configFilePath: ResolvedConfigFilePath, reloadLevel?: ConfigFileProgramReloadLevel): void;
        ///*@internal*/ buildNextInvalidatedProjectAsync(): Promise<void>;
        /*@internal*/ getAllParsedConfigs(): readonly ParsedCommandLine[];
        /*@internal*/ close(): void;
    }

    function createSolutionBuilderHostBaseAsync<T extends BuilderProgram>(system: System, createProgram: CreateProgram<T> | undefined, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter) {
        const host = createProgramHost(system, createProgram) as SolutionBuilderHostBaseAsync<T>; // createProgramHost doesn't include member "createProgramHookAsync"
        host.createProgramHookAsync = async (...args: Parameters<CreateProgram<T>>) => host.createProgram(...args);
        host.getModifiedTime = system.getModifiedTime ? path => system.getModifiedTime!(path) : returnUndefined;
        host.setModifiedTime = system.setModifiedTime ? (path, date) => system.setModifiedTime!(path, date) : noop;
        host.deleteFile = system.deleteFile ? path => system.deleteFile!(path) : noop;
        host.reportDiagnostic = reportDiagnostic || createDiagnosticReporter(system);
        host.reportSolutionBuilderStatus = reportSolutionBuilderStatus || createBuilderStatusReporter(system);
        host.now = maybeBind(system, system.now); // For testing
        return host;
    }

    export function createSolutionBuilderHostAsync<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system = sys, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportErrorSummary?: ReportEmitErrorSummary) {
        const host = createSolutionBuilderHostBaseAsync(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderHostAsync<T>;
        host.reportErrorSummary = reportErrorSummary;
        return host;
    }

    export function createSolutionBuilderWithWatchHostAsync<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system = sys, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter) {
        const host = createSolutionBuilderHostBaseAsync(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderWithWatchHostAsync<T>;
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

    export function createSolutionBuilderAsync<T extends BuilderProgram>(host: SolutionBuilderHostAsync<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilderAsync {
        return createSolutionBuilderWorkerAsync(/*watch*/ false, host, rootNames, defaultOptions);
    }

    export function createSolutionBuilderWithWatchAsync<T extends BuilderProgram>(host: SolutionBuilderWithWatchHostAsync<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilderAsync {
        return createSolutionBuilderWorkerAsync(/*watch*/ true, host, rootNames, defaultOptions, baseWatchOptions);
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
    interface DeferredPromise {
        waitable: Promise<void>;
        resolve: () => void;
    };
    function createDeferredPromise(): DeferredPromise{
        const dp: Partial<DeferredPromise>={};
        dp.waitable = new Promise(resolve=>{
            dp.resolve=resolve;
        });
        return dp as DeferredPromise;
    }
    interface SolutionBuilderStateAsync<T extends BuilderProgram = BuilderProgram> extends WatchFactory<WatchType, ResolvedConfigFileName> {
        readonly host: SolutionBuilderHostAsync<T>;
        readonly hostWithWatch: SolutionBuilderWithWatchHostAsync<T>;
        readonly currentDirectory: string;
        readonly getCanonicalFileName: GetCanonicalFileName;
        readonly parseConfigFileHost: ParseConfigFileHost;
        readonly write: ((s: string) => void) | undefined;

        // State of solution
        readonly options: BuildOptions;
        readonly baseCompilerOptions: CompilerOptions;
        readonly rootNames: readonly string[];
        readonly baseWatchOptions: WatchOptions | undefined;

        readonly resolvedConfigFilePaths: ESMap<string, ResolvedConfigFilePath>;
        readonly configFileCache: ESMap<ResolvedConfigFilePath, ConfigFileCacheEntry>;
        /** Map from config file name to up-to-date status */
        readonly projectStatus: ESMap<ResolvedConfigFilePath, UpToDateStatus>;
        readonly buildInfoChecked: ESMap<ResolvedConfigFilePath, true>;
        readonly extendedConfigCache: ESMap<string, ExtendedConfigCacheEntry>;

        readonly builderPrograms: ESMap<ResolvedConfigFilePath, T>;
        readonly diagnostics: ESMap<ResolvedConfigFilePath, readonly Diagnostic[]>;
        readonly projectPendingBuild: ESMap<ResolvedConfigFilePath, ConfigFileProgramReloadLevel>;
        readonly projectErrorsReported: ESMap<ResolvedConfigFilePath, true>;

        readonly compilerHost: CompilerHost;
        readonly moduleResolutionCache: ModuleResolutionCache | undefined;
        readonly typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache | undefined;

        // Mutable state
        buildOrder: AnyBuildOrder | undefined;
        readFileWithCache: (f: string) => string | undefined;
        projectCompilerOptions: CompilerOptions;
        cache: SolutionBuilderStateCache | undefined;
        allProjectBuildPending: boolean;
        //needsSummary: boolean;
        watchAllProjectsPending: boolean;
        currentInvalidatedProject: InvalidatedProjectAsync<T> | undefined;

        // Watch state
        readonly watch: boolean;
        readonly allWatchedWildcardDirectories: ESMap<ResolvedConfigFilePath, ESMap<string, WildcardDirectoryWatcher>>;
        readonly allWatchedInputFiles: ESMap<ResolvedConfigFilePath, ESMap<Path, FileWatcher>>;
        readonly allWatchedConfigFiles: ESMap<ResolvedConfigFilePath, FileWatcher>;
        readonly allWatchedExtendedConfigFiles: ESMap<Path, SharedExtendedConfigFileWatcher<ResolvedConfigFilePath>>;
        readonly allWatchedPackageJsonFiles: ESMap<ResolvedConfigFilePath, ESMap<Path, FileWatcher>>;
        readonly lastCachedPackageJsonLookups: ESMap<ResolvedConfigFilePath, readonly (readonly [Path, object | boolean])[] | undefined>;

        timerToBuildInvalidatedProject: any;
        reportFileChangeDetected: boolean;
        writeLog: (s: string) => void;

        // added for async
        closeRequested: boolean;
        deferredPromise: DeferredPromise | undefined;
    }

    function createSolutionBuilderStateAsync<T extends BuilderProgram>(watch: boolean, hostOrHostWithWatch: SolutionBuilderHostAsync<T> | SolutionBuilderWithWatchHostAsync<T>, rootNames: readonly string[], options: BuildOptions, baseWatchOptions: WatchOptions | undefined): SolutionBuilderStateAsync<T> {
        const host = hostOrHostWithWatch; // as SolutionBuilderHostAsync<T>;
        const hostWithWatch = hostOrHostWithWatch as SolutionBuilderWithWatchHostAsync<T>;
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
        const typeReferenceDirectiveResolutionCache = !compilerHost.resolveTypeReferenceDirectives ? createTypeReferenceDirectiveResolutionCache(currentDirectory, getCanonicalFileName, /*options*/ undefined, moduleResolutionCache?.getPackageJsonInfoCache()) : undefined;
        if (!compilerHost.resolveModuleNames) {
            const loader = (moduleName: string, resolverMode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined, containingFile: string, redirectedReference: ResolvedProjectReference | undefined) => resolveModuleName(moduleName, containingFile, state.projectCompilerOptions, compilerHost, moduleResolutionCache, redirectedReference, resolverMode).resolvedModule!;
            compilerHost.resolveModuleNames = (moduleNames, containingFile, _reusedNames, redirectedReference, _options, containingSourceFile) =>
                loadWithModeAwareCache<ResolvedModuleFull>(Debug.checkEachDefined(moduleNames), Debug.checkDefined(containingSourceFile), containingFile, redirectedReference, loader);
            compilerHost.getModuleResolutionCache = () => moduleResolutionCache;
        }
        if (!compilerHost.resolveTypeReferenceDirectives) {
            const loader = (moduleName: string, containingFile: string, redirectedReference: ResolvedProjectReference | undefined, containingFileMode: SourceFile["impliedNodeFormat"] | undefined) => resolveTypeReferenceDirective(moduleName, containingFile, state.projectCompilerOptions, compilerHost, redirectedReference, state.typeReferenceDirectiveResolutionCache, containingFileMode).resolvedTypeReferenceDirective!;
            compilerHost.resolveTypeReferenceDirectives = (typeReferenceDirectiveNames, containingFile, redirectedReference, _options, containingFileMode) =>
                loadWithTypeDirectiveCache<ResolvedTypeReferenceDirective>(Debug.checkEachDefined(typeReferenceDirectiveNames), containingFile, redirectedReference, containingFileMode, loader);
        }

        const { watchFile, watchDirectory, writeLog } = createWatchFactory<ResolvedConfigFileName>(hostWithWatch, options);

        const state: SolutionBuilderStateAsync<T> = {
            host,
            hostWithWatch,
            currentDirectory,
            getCanonicalFileName,
            parseConfigFileHost: parseConfigHostFromCompilerHostLike(host),
            write: maybeBind(host, host.trace),

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
            typeReferenceDirectiveResolutionCache,

            // Mutable state
            buildOrder: undefined,
            readFileWithCache: f => host.readFile(f),
            projectCompilerOptions: baseCompilerOptions,
            cache: undefined,
            allProjectBuildPending: true,
            //needsSummary: true,
            watchAllProjectsPending: watch,
            currentInvalidatedProject: undefined,

            // Watch state
            watch,
            allWatchedWildcardDirectories: new Map(),
            allWatchedInputFiles: new Map(),
            allWatchedConfigFiles: new Map(),
            allWatchedExtendedConfigFiles: new Map(),
            allWatchedPackageJsonFiles: new Map(),
            lastCachedPackageJsonLookups: new Map(),

            timerToBuildInvalidatedProject: undefined,
            reportFileChangeDetected: false,
            watchFile,
            watchDirectory,
            writeLog,

            deferredPromise: createDeferredPromise(),
            closeRequested:false
        };

        return state;
    }

    function toPath(state: SolutionBuilderStateAsync, fileName: string) {
        return ts.toPath(fileName, state.currentDirectory, state.getCanonicalFileName);
    }

    function toResolvedConfigFilePath(state: SolutionBuilderStateAsync, fileName: ResolvedConfigFileName): ResolvedConfigFilePath {
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

    function getCachedParsedConfigFile(state: SolutionBuilderStateAsync, configFilePath: ResolvedConfigFilePath): ParsedCommandLine | undefined {
        const value = state.configFileCache.get(configFilePath);
        return value && isParsedCommandLine(value) ? value : undefined;
    }

    function parseConfigFile(state: SolutionBuilderStateAsync, configFileName: ResolvedConfigFileName, configFilePath: ResolvedConfigFilePath): ParsedCommandLine | undefined {
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

    function resolveProjectName(state: SolutionBuilderStateAsync, name: string): ResolvedConfigFileName {
        return resolveConfigFileProjectName(resolvePath(state.currentDirectory, name));
    }

    function createBuildOrder(state: SolutionBuilderStateAsync, roots: readonly ResolvedConfigFileName[]): AnyBuildOrder {
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

    function getBuildOrder(state: SolutionBuilderStateAsync) {
        return state.buildOrder || createStateBuildOrder(state);
    }

    function createStateBuildOrder(state: SolutionBuilderStateAsync) {
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

            state.allWatchedExtendedConfigFiles.forEach(watcher => {
                watcher.projects.forEach(project => {
                    if (!currentProjects.has(project)) {
                        watcher.projects.delete(project);
                    }
                });
                watcher.close();
            });

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

            mutateMapSkippingNewValues(
                state.allWatchedPackageJsonFiles,
                currentProjects,
                { onDeleteValue: existingMap => existingMap.forEach(closeFileWatcher) }
            );
        }
        return state.buildOrder = buildOrder;
    }

    function getBuildOrderFor(state: SolutionBuilderStateAsync, project: string | undefined, onlyReferences: boolean | undefined): AnyBuildOrder | undefined {
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

    function enableCache(state: SolutionBuilderStateAsync) {
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

    function disableCache(state: SolutionBuilderStateAsync) {
        if (!state.cache) return;

        const { cache, host, compilerHost, extendedConfigCache, moduleResolutionCache, typeReferenceDirectiveResolutionCache } = state;

        host.readFile = cache.originalReadFile;
        host.fileExists = cache.originalFileExists;
        host.directoryExists = cache.originalDirectoryExists;
        host.createDirectory = cache.originalCreateDirectory;
        host.writeFile = cache.originalWriteFile;
        compilerHost.getSourceFile = cache.originalGetSourceFile;
        state.readFileWithCache = cache.originalReadFileWithCache;
        extendedConfigCache.clear();
        moduleResolutionCache?.clear();
        typeReferenceDirectiveResolutionCache?.clear();
        state.cache = undefined;
    }

    function clearProjectStatus(state: SolutionBuilderStateAsync, resolved: ResolvedConfigFilePath) {
        state.projectStatus.delete(resolved);
        state.diagnostics.delete(resolved);
    }

    function addProjToQueue({ projectPendingBuild }: SolutionBuilderStateAsync, proj: ResolvedConfigFilePath, reloadLevel: ConfigFileProgramReloadLevel) {
        const value = projectPendingBuild.get(proj);
        if (value === undefined) {
            projectPendingBuild.set(proj, reloadLevel);
        }
        else if (value < reloadLevel) {
            projectPendingBuild.set(proj, reloadLevel);
        }
    }

    function setupInitialBuild(state: SolutionBuilderStateAsync, cancellationToken: CancellationToken | undefined) {
        // Set initial build if not already built
        if (!state.allProjectBuildPending) return;
        state.allProjectBuildPending = false;
        if (state.options.watch) reportWatchStatus(state, Diagnostics.Starting_compilation_in_watch_mode);
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

    // export enum InvalidatedProjectKind {
    //     Build,
    //     UpdateBundle,
    //     UpdateOutputFileStamps
    // }
    //type InvalidatedProjectBase = never;
    export interface InvalidatedProjectBaseAsync {
        readonly kind: InvalidatedProjectKind;
        readonly project: ResolvedConfigFileName;
        /*@internal*/ readonly projectPath: ResolvedConfigFilePath;
        /*@internal*/ readonly buildOrder: readonly ResolvedConfigFileName[];
        /**
         *  To dispose this project and ensure that all the necessary actions are taken and state is updated accordingly
         */
        doneAsync(cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync): Promise<ExitStatus>;
        getCompilerOptions(): CompilerOptions;
        getCurrentDirectory(): string;
    }
    //type UpdateOutputFileStampsProject = never;
    export interface UpdateOutputFileStampsProjectAsync extends InvalidatedProjectBaseAsync {
        readonly kind: InvalidatedProjectKind.UpdateOutputFileStamps;
        updateOutputFileStatmps(): void;
    }
    // type BuildInvalidedProject<T extends BuilderProgram> = never & T;
    export interface BuildInvalidedProjectAsync<T extends BuilderProgram> extends InvalidatedProjectBaseAsync {
        readonly kind: InvalidatedProjectKind.Build;
        /*
         * Emitting with this builder program without the api provided for this project
         * can result in build system going into invalid state as files written reflect the state of the project
         */
        getBuilderProgramAsync(): Promise<T | undefined>;
        getProgramAsync(): Promise<Program | undefined>;
        getSourceFileAsync(fileName: string): Promise<SourceFile | undefined>;
        getSourceFilesAsync(): Promise<readonly SourceFile[]>;
        getOptionsDiagnosticsAsync(cancellationToken?: CancellationToken): Promise<readonly Diagnostic[]>;
        getGlobalDiagnosticsAsync(cancellationToken?: CancellationToken): Promise<readonly Diagnostic[]>;
        getConfigFileParsingDiagnosticsAsync(): Promise<readonly Diagnostic[]>;
        getSyntacticDiagnosticsAsync(sourceFile?: SourceFile, cancellationToken?: CancellationToken): Promise<readonly Diagnostic[]>;
        getAllDependenciesAsync(sourceFile: SourceFile): Promise<readonly string[]>;
        getSemanticDiagnosticsAsync(sourceFile?: SourceFile, cancellationToken?: CancellationToken): Promise<readonly Diagnostic[]>;
        getSemanticDiagnosticsOfNextAffectedFileAsync(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): Promise<AffectedFileResult<readonly Diagnostic[]>>;
        /*
         * Calling emit directly with targetSourceFile and emitOnlyDtsFiles set to true is not advised since
         * emit in build system is responsible in updating status of the project
         * If called with targetSourceFile and emitOnlyDtsFiles set to true, the emit just passes to underlying builder and
         * wont reflect the status of file as being emitted in the builder
         * (if that emit of that source file is required it would be emitted again when making sure invalidated project is completed)
         * This emit is not considered actual emit (and hence uptodate status is not reflected if
         */
        emitAsync(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, getCustomTransformersAsync?: GetCustomTransformersAsync): Promise<EmitResult | undefined>;
        // TODO(shkamat):: investigate later if we can emit even when there are declaration diagnostics
        // emitNextAffectedFile(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult>;
    }

    // type UpdateBundleProject<T extends BuilderProgram> = never & T;
    export interface UpdateBundleProjectAsync<T extends BuilderProgram> extends InvalidatedProjectBaseAsync {
        readonly kind: InvalidatedProjectKind.UpdateBundle;
        emitAsync(writeFile?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync): Promise<EmitResult | BuildInvalidedProjectAsync<T> | undefined>;
    }
    //type InvalidatedProject<T extends BuilderProgram> = never & T;
    export type InvalidatedProjectAsync<T extends BuilderProgram> = UpdateOutputFileStampsProjectAsync | BuildInvalidedProjectAsync<T> | UpdateBundleProjectAsync<T>;

    function doneInvalidatedProject(
        state: SolutionBuilderStateAsync,
        projectPath: ResolvedConfigFilePath
    ) {
        state.projectPendingBuild.delete(projectPath);
        state.currentInvalidatedProject = undefined;
        return state.diagnostics.has(projectPath) ?
            ExitStatus.DiagnosticsPresent_OutputsSkipped :
            ExitStatus.Success;
    }

    function createUpdateOutputFileStampsProjectAsync(
        state: SolutionBuilderStateAsync,
        project: ResolvedConfigFileName,
        projectPath: ResolvedConfigFilePath,
        config: ParsedCommandLine,
        buildOrder: readonly ResolvedConfigFileName[]
    ): UpdateOutputFileStampsProjectAsync {
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
            doneAsync: async () => {
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
        state: SolutionBuilderStateAsync<T>,
        project: ResolvedConfigFileName,
        projectPath: ResolvedConfigFilePath,
        projectIndex: number,
        config: ParsedCommandLine,
        buildOrder: readonly ResolvedConfigFileName[],
    ): BuildInvalidedProjectAsync<T> | UpdateBundleProjectAsync<T> {
        let step = kind === InvalidatedProjectKind.Build ? BuildStep.CreateProgram : BuildStep.EmitBundle;
        let program: T | undefined;
        let buildResult: BuildResultFlags | undefined;
        let invalidatedProjectOfBundle: BuildInvalidedProjectAsync<T> | undefined;

        if (kind === InvalidatedProjectKind.Build) {
            return {
                kind,
                project,
                projectPath,
                buildOrder,
                getCompilerOptions: () => config.options,
                getCurrentDirectory: () => state.currentDirectory,
                getBuilderProgramAsync: async () => withProgramOrUndefinedAsync(identity),
                getProgramAsync: async () =>
                    withProgramOrUndefinedAsync(
                        program => program.getProgramOrUndefined()
                    ),
                getSourceFileAsync: async fileName =>
                    withProgramOrUndefinedAsync(
                        program => program.getSourceFile(fileName)
                    ),
                getSourceFilesAsync: async () =>
                    withProgramOrEmptyArrayAsync(
                        program => program.getSourceFiles()
                    ),
                getOptionsDiagnosticsAsync: async cancellationToken =>
                    withProgramOrEmptyArrayAsync(
                        program => program.getOptionsDiagnostics(cancellationToken)
                    ),
                getGlobalDiagnosticsAsync: async cancellationToken =>
                    withProgramOrEmptyArrayAsync(
                        program => program.getGlobalDiagnostics(cancellationToken)
                    ),
                getConfigFileParsingDiagnosticsAsync: async () =>
                    withProgramOrEmptyArrayAsync(
                        program => program.getConfigFileParsingDiagnostics()
                    ),
                getSyntacticDiagnosticsAsync: async (sourceFile, cancellationToken) =>
                    withProgramOrEmptyArrayAsync(
                        program => program.getSyntacticDiagnostics(sourceFile, cancellationToken)
                    ),
                getAllDependenciesAsync: async sourceFile =>
                    withProgramOrEmptyArrayAsync(
                        program => program.getAllDependencies(sourceFile)
                    ),
                getSemanticDiagnosticsAsync: async (sourceFile, cancellationToken) =>
                    withProgramOrEmptyArrayAsync(
                        program => program.getSemanticDiagnostics(sourceFile, cancellationToken)
                    ),
                getSemanticDiagnosticsOfNextAffectedFileAsync: async (cancellationToken, ignoreSourceFile) =>
                    withProgramOrUndefinedAsync(
                        program =>
                            ((program as any as SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile) &&
                            (program as any as SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile(cancellationToken, ignoreSourceFile)
                    ),
                emitAsync: async (targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, getCustomTransformersAsync) => {
                    if (targetSourceFile || emitOnlyDtsFiles) {
                        await executeStepsAsync(BuildStep.CreateProgram);
                        const customTransformers = await (async () => {
                            if (getCustomTransformersAsync) return /* await */ getCustomTransformersAsync(project,program?.getProgram());
                            else if (state.host.getCustomTransformersAsync) return /* await */ state.host.getCustomTransformersAsync(project,program?.getProgram());
                        })();
                        return program && program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
                    }
                    await executeStepsAsync(BuildStep.SemanticDiagnostics, cancellationToken);
                    if (step === BuildStep.EmitBuildInfo) {
                        return /* await */ emitBuildInfoAsync(writeFile, cancellationToken);
                    }
                    if (step !== BuildStep.Emit) return undefined;
                    return /* await */ emitAsync(writeFile, cancellationToken, getCustomTransformersAsync);
                },
                doneAsync
            };
        }
        else {
            return {
                kind,
                project,
                projectPath,
                buildOrder,
                getCompilerOptions: () => config.options,
                getCurrentDirectory: () => state.currentDirectory,
                emitAsync: async (writeFile: WriteFileCallback | undefined, getCustomTransformersAsync: GetCustomTransformersAsync | undefined) => {
                    if (step !== BuildStep.EmitBundle) return invalidatedProjectOfBundle;
                    return /* await */ emitBundleAsync(writeFile, getCustomTransformersAsync);
                },
                doneAsync,
            };
        }

        async function doneAsync(cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync) {
            await executeStepsAsync(BuildStep.Done, cancellationToken, writeFile, getCustomTransformersAsync);
            return doneInvalidatedProject(state, projectPath);
        }

        async function withProgramOrUndefinedAsync<U>(action: (program: T) => U | undefined): Promise<U | undefined> {
            await executeStepsAsync(BuildStep.CreateProgram);
            return program && action(program);
        }

        async function withProgramOrEmptyArrayAsync<U>(action: (program: T) => readonly U[]): Promise<readonly U[]> {
            return (await withProgramOrUndefinedAsync(action)) || emptyArray;
        }

        async function createProgramAsync() {
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
            state.moduleResolutionCache?.update(config.options);
            state.typeReferenceDirectiveResolutionCache?.update(config.options);

            // Create program
            program = await host.createProgramHookAsync(
                config.fileNames,
                config.options,
                compilerHost,
                getOldProgram(state, projectPath, config),
                getConfigFileParsingDiagnostics(config),
                config.projectReferences
            );
            if (state.watch) {
                state.lastCachedPackageJsonLookups.set(projectPath, state.moduleResolutionCache && map(
                    state.moduleResolutionCache.getPackageJsonInfoCache().entries(),
                    ([path, data]) => ([state.host.realpath && data ? toPath(state, state.host.realpath(path)) : path, data] as const)
                ));

                state.builderPrograms.set(projectPath, program);
            }
            step++;
        }

        async function handleDiagnosticsAsync(diagnostics: readonly Diagnostic[], errorFlags: BuildResultFlags, errorType: string) {
            if (diagnostics.length) {
                ({ buildResult, step } = await buildErrorsAsync(
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

        async function getSyntaxDiagnosticsAsync(cancellationToken?: CancellationToken) {
            Debug.assertIsDefined(program);
            await handleDiagnosticsAsync(
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

        async function getSemanticDiagnosticsAsync(cancellationToken?: CancellationToken) {
            await handleDiagnosticsAsync(
                Debug.checkDefined(program).getSemanticDiagnostics(/*sourceFile*/ undefined, cancellationToken),
                BuildResultFlags.TypeErrors,
                "Semantic"
            );
        }

        async function emitAsync(writeFileCallback?: WriteFileCallback, cancellationToken?: CancellationToken, getCustomTransformersAsync?: GetCustomTransformersAsync): Promise<EmitResult> {
            Debug.assertIsDefined(program);
            Debug.assert(step === BuildStep.Emit);
            // Before emitting lets backup state, so we can revert it back if there are declaration errors to handle emit and declaration errors correctly
            program.backupState();
            let declDiagnostics: Diagnostic[] | undefined;
            const reportDeclarationDiagnostics = (d: Diagnostic) => (declDiagnostics || (declDiagnostics = [])).push(d);
            const outputFiles: OutputFile[] = [];
            const customTransformers = await (async () => {
                if (getCustomTransformersAsync) return /* await */ getCustomTransformersAsync(project,program?.getProgram());
                else if (state.host.getCustomTransformersAsync) return /* await */ state.host.getCustomTransformersAsync(project,program?.getProgram());
            })();
            const { emitResult } = emitFilesAndReportErrors(
                program,
                reportDeclarationDiagnostics,
                /*write*/ undefined,
                /*reportSummary*/ undefined,
                (name, text, writeByteOrderMark) => outputFiles.push({ name, text, writeByteOrderMark }),
                cancellationToken,
                /*emitOnlyDts*/ false,
                customTransformers
            );
            // Don't emit .d.ts if there are decl file errors
            if (declDiagnostics) {
                program.restoreState();
                ({ buildResult, step } = await buildErrorsAsync(
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
                if (!anyDtsChanged && isDeclarationFileName(name)) {
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

            await finishEmitAsync(
                emitterDiagnostics,
                emittedOutputs,
                newestDeclarationFileContentChangedTime,
                /*newestDeclarationFileContentChangedTimeIsMaximumDate*/ anyDtsChanged,
                outputFiles.length ? outputFiles[0].name : getFirstProjectOutput(config, !host.useCaseSensitiveFileNames()),
                resultFlags
            );
            return emitResult;
        }

        async function emitBuildInfoAsync(writeFileCallback?: WriteFileCallback, cancellationToken?: CancellationToken): Promise<EmitResult> {
            Debug.assertIsDefined(program);
            Debug.assert(step === BuildStep.EmitBuildInfo);
            const emitResult = program.emitBuildInfo(writeFileCallback, cancellationToken);
            if (emitResult.diagnostics.length) {
                reportErrors(state, emitResult.diagnostics);
                state.diagnostics.set(projectPath, [...state.diagnostics.get(projectPath)!, ...emitResult.diagnostics]);
                buildResult = BuildResultFlags.EmitErrors & buildResult!;
            }

            if (emitResult.emittedFiles && state.write) {
                emitResult.emittedFiles.forEach(name => listEmittedFile(state, config, name));
            }
            await afterProgramDoneAsync(state, program, config);
            step = BuildStep.QueueReferencingProjects;
            return emitResult;
        }

        async function finishEmitAsync(
            emitterDiagnostics: DiagnosticCollection,
            emittedOutputs: ESMap<Path, string>,
            priorNewestUpdateTime: Date,
            newestDeclarationFileContentChangedTimeIsMaximumDate: boolean,
            oldestOutputFileName: string,
            resultFlags: BuildResultFlags
        ): Promise<Diagnostic[]> {
            const emitDiagnostics = emitterDiagnostics.getDiagnostics();
            if (emitDiagnostics.length) {
                ({ buildResult, step } = await buildErrorsAsync(
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

            if (state.write) {
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
            await afterProgramDoneAsync(state, program, config); // never called if emitDiagnostics.length>0
            step = BuildStep.QueueReferencingProjects;
            buildResult = resultFlags;
            return emitDiagnostics; // This appears to only return an empty array.
        }

        async function emitBundleAsync(writeFileCallback?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync): Promise<EmitResult | BuildInvalidedProjectAsync<T> | undefined> {
            Debug.assert(kind === InvalidatedProjectKind.UpdateBundle);
            if (state.options.dry) {
                reportStatus(state, Diagnostics.A_non_dry_build_would_update_output_of_project_0, project);
                buildResult = BuildResultFlags.Success;
                step = BuildStep.QueueReferencingProjects;
                return undefined;
            }

            if (state.options.verbose) reportStatus(state, Diagnostics.Updating_output_of_project_0, project);
            const customTransformers = await (async () => {
                if (getCustomTransformersAsync) return /* await */ getCustomTransformersAsync(project,program?.getProgram());
                else if (state.host.getCustomTransformersAsync) return /* await */ state.host.getCustomTransformersAsync(project,program?.getProgram());
            })();
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
                ) as BuildInvalidedProjectAsync<T>;
            }

            // Actual Emit
            Debug.assert(!!outputFiles.length);
            const emitterDiagnostics = createDiagnosticCollection();
            const emittedOutputs = new Map<Path, string>();
            outputFiles.forEach(({ name, text, writeByteOrderMark }) => {
                emittedOutputs.set(toPath(state, name), name);
                writeFile(writeFileCallback ? { writeFile: writeFileCallback } : compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
            });

            const emitDiagnostics = await finishEmitAsync(
                emitterDiagnostics,
                emittedOutputs,
                minimumDate,
                /*newestDeclarationFileContentChangedTimeIsMaximumDate*/ false,
                outputFiles[0].name,
                BuildResultFlags.DeclarationOutputUnchanged
            );
            return { emitSkipped: false, diagnostics: emitDiagnostics };
        }

        async function executeStepsAsync(till: BuildStep, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync): Promise<void> {
            while (step <= till && step < BuildStep.Done) {
                const currentStep = step;
                switch (step) {
                    case BuildStep.CreateProgram:
                        await createProgramAsync();
                        break;

                    case BuildStep.SyntaxDiagnostics:
                        await getSyntaxDiagnosticsAsync(cancellationToken);
                        break;

                    case BuildStep.SemanticDiagnostics:
                        await getSemanticDiagnosticsAsync(cancellationToken);
                        break;

                    case BuildStep.Emit:
                        await emitAsync(writeFile, cancellationToken, getCustomTransformersAsync);
                        break;

                    case BuildStep.EmitBuildInfo:
                        await emitBuildInfoAsync(writeFile, cancellationToken);
                        break;

                    case BuildStep.EmitBundle:
                        await emitBundleAsync(writeFile, getCustomTransformersAsync);
                        break;

                    case BuildStep.BuildInvalidatedProjectOfBundle:
                        Debug.checkDefined(invalidatedProjectOfBundle);
                        if (invalidatedProjectOfBundle) {
                            invalidatedProjectOfBundle.doneAsync(cancellationToken, writeFile, getCustomTransformersAsync);
                        }
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

    function needsBuild({ options }: SolutionBuilderStateAsync, status: UpToDateStatus, config: ParsedCommandLine) {
        if (status.type !== UpToDateStatusType.OutOfDateWithPrepend || options.force) return true;
        return config.fileNames.length === 0 ||
            !!getConfigFileParsingDiagnostics(config).length ||
            !isIncrementalCompilation(config.options);
    }

    function getNextInvalidatedProject<T extends BuilderProgram>(
        state: SolutionBuilderStateAsync<T>,
        buildOrder: AnyBuildOrder,
        reportQueue: boolean
    ): InvalidatedProjectAsync<T> | undefined {
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
                watchExtendedConfigFiles(state, projectPath, config);
                watchWildCardDirectories(state, project, projectPath, config);
                watchInputFiles(state, project, projectPath, config);
                watchPackageJsonFiles(state, project, projectPath, config);
            }
            else if (reloadLevel === ConfigFileProgramReloadLevel.Partial) {
                // Update file names
                config.fileNames = getFileNamesFromConfigSpecs(config.options.configFile!.configFileSpecs!, getDirectoryPath(project), config.options, state.parseConfigFileHost);
                updateErrorForNoInputFiles(config.fileNames, project, config.options.configFile!.configFileSpecs!, config.errors, canJsonReportNoInputFiles(config.raw));
                watchInputFiles(state, project, projectPath, config);
                watchPackageJsonFiles(state, project, projectPath, config);
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
                    return createUpdateOutputFileStampsProjectAsync(
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

    function listEmittedFile({ write }: SolutionBuilderStateAsync, proj: ParsedCommandLine, file: string) {
        if (write && proj.options.listEmittedFiles) {
            write(`TSFILE: ${file}`);
        }
    }

    function getOldProgram<T extends BuilderProgram>({ options, builderPrograms, compilerHost }: SolutionBuilderStateAsync<T>, proj: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
        if (options.force) return undefined;
        const value = builderPrograms.get(proj);
        if (value) return value;
        return readBuilderProgram(parsed.options, compilerHost) as any as T;
    }

    async function afterProgramDoneAsync<T extends BuilderProgram>(
        state: SolutionBuilderStateAsync<T>,
        program: T | undefined,
        config: ParsedCommandLine
    ): Promise<void> {
        if (program) {
            if (program && state.write) listFiles(program, state.write);
            if (state.host.afterProgramEmitAndDiagnosticsAsync) {
                await state.host.afterProgramEmitAndDiagnosticsAsync(program);
            }
            program.releaseProgram();
        }
        else if (state.host.afterEmitBundleAsync) {
            await state.host.afterEmitBundleAsync(config);
        }
        state.projectCompilerOptions = state.baseCompilerOptions;
    }

    async function buildErrorsAsync<T extends BuilderProgram>(
        state: SolutionBuilderStateAsync<T>,
        resolvedPath: ResolvedConfigFilePath,
        program: T | undefined,
        config: ParsedCommandLine,
        diagnostics: readonly Diagnostic[],
        buildResult: BuildResultFlags,
        errorType: string,
    ) {
        const canEmitBuildInfo = !(buildResult & BuildResultFlags.SyntaxErrors) && program && !outFile(program.getCompilerOptions());

        reportAndStoreErrors(state, resolvedPath, diagnostics);
        state.projectStatus.set(resolvedPath, { type: UpToDateStatusType.Unbuildable, reason: `${errorType} errors` });
        if (canEmitBuildInfo) return { buildResult, step: BuildStep.EmitBuildInfo };
        await afterProgramDoneAsync(state, program, config);
        return { buildResult, step: BuildStep.QueueReferencingProjects };
    }

    function checkConfigFileUpToDateStatus(state: SolutionBuilderStateAsync, configFile: string, oldestOutputFileTime: Date, oldestOutputFileName: string): Status.OutOfDateWithSelf | undefined {
        // Check tsconfig time
        const tsconfigTime = getModifiedTime(state.host, configFile);
        if (oldestOutputFileTime < tsconfigTime) {
            return {
                type: UpToDateStatusType.OutOfDateWithSelf,
                outOfDateOutputFileName: oldestOutputFileName,
                newerInputFileName: configFile
            };
        }
    }

    function getUpToDateStatusWorker(state: SolutionBuilderStateAsync, project: ParsedCommandLine, resolvedPath: ResolvedConfigFilePath): UpToDateStatus {
        const force = !!state.options.force;
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

            if (!force) {
                const inputTime = getModifiedTime(host, inputFile);
                if (inputTime > newestInputFileTime) {
                    newestInputFileName = inputFile;
                    newestInputFileTime = inputTime;
                }
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
        if (!force) {
            for (const output of outputs) {
                // Output is missing; can stop checking
                // Don't immediately return because we can still be upstream-blocked, which is a higher-priority status
                if (!host.fileExists(output)) {
                    missingOutputFileName = output;
                    break;
                }

                const outputTime = getModifiedTime(host, output);
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
                if (isDeclarationFileName(output)) {
                    const outputModifiedTime = getModifiedTime(host, output);
                    newestDeclarationFileContentChangedTime = newer(newestDeclarationFileContentChangedTime, outputModifiedTime);
                }
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
                // (a check we will have skipped if this is a forced build)
                if (!force && !missingOutputFileName) {
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

            // Check package file time
            const dependentPackageFileStatus = forEach(
                state.lastCachedPackageJsonLookups.get(resolvedPath) || emptyArray,
                ([path]) => checkConfigFileUpToDateStatus(state, path, oldestOutputFileTime, oldestOutputFileName)
            );
            if (dependentPackageFileStatus) return dependentPackageFileStatus;
        }

        if (!force && !state.buildInfoChecked.has(resolvedPath)) {
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

    function getUpToDateStatus(state: SolutionBuilderStateAsync, project: ParsedCommandLine | undefined, resolvedPath: ResolvedConfigFilePath): UpToDateStatus {
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

    function updateOutputTimestampsWorker(state: SolutionBuilderStateAsync, proj: ParsedCommandLine, priorNewestUpdateTime: Date, verboseMessage: DiagnosticMessage, skipOutputs?: ESMap<Path, string>) {
        if (proj.options.noEmit) return priorNewestUpdateTime;
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

                if (isDeclarationFileName(file)) {
                    priorNewestUpdateTime = newer(priorNewestUpdateTime, getModifiedTime(host, file));
                }

                host.setModifiedTime(file, now);
            }
        }

        return priorNewestUpdateTime;
    }

    function updateOutputTimestamps(state: SolutionBuilderStateAsync, proj: ParsedCommandLine, resolvedPath: ResolvedConfigFilePath) {
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
        state: SolutionBuilderStateAsync,
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
    function closeRequest(state: SolutionBuilderStateAsync){
        state.closeRequested = true;
        if (state.deferredPromise) state.deferredPromise.resolve();
    }
    /**
     * Only returns ExitStatus when NOT a watch host.  Otherwise returns undefined;
     * However, the optional callback solutionSettled will be called with argument "totalErrors" whenever
     * the solution is about to wait for the next watch.
     * @param state
     * @param project
     * @param cancellationToken
     * @param writeFile
     * @param getCustomTransformersAsync
     * @param onlyReferences
     * @returns
     */
    async function buildUntilFinishedAsync(state: SolutionBuilderStateAsync, project?: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync, onlyReferences?: boolean): Promise<ExitStatus | undefined> {

        async function local_buildNextInvalidatedProjectAsync(state: SolutionBuilderStateAsync, buildOrder: AnyBuildOrder): Promise<ExitStatus | undefined> {
            state.timerToBuildInvalidatedProject = undefined;
            if (state.reportFileChangeDetected) {
                state.reportFileChangeDetected = false;
                state.projectErrorsReported.clear();
                reportWatchStatus(state, Diagnostics.File_change_detected_Starting_incremental_compilation);
            }
            //const buildOrder = getBuildOrder(state);
            // getNextInvalidatedProject also detes from build queue
            const invalidatedProject = getNextInvalidatedProject(state, buildOrder, /*reportQueue*/ false);
            if (invalidatedProject) {
                return /* await */ invalidatedProject.doneAsync();
                // if (state.projectPendingBuild.size) {
                //     // Schedule next project for build
                //     if (state.watch && !state.timerToBuildInvalidatedProject) {
                //         scheduleBuildInvalidatedProject(state);
                //     }
                //     return;
                // }
            }
            // disableCache(state);
            // reportErrorSummary(state, buildOrder);
        }
        let totalErrors;
        const initialBuildOrder = getBuildOrderFor(state, project, onlyReferences);
        {
            if (!initialBuildOrder) return ExitStatus.InvalidProject_OutputsSkipped;

            setupInitialBuild(state, cancellationToken);

            let reportQueue = true;
            let successfulProjects = 0;
            while (true) {
                const invalidatedProject = getNextInvalidatedProject(state, initialBuildOrder, reportQueue);
                if (!invalidatedProject) break;
                reportQueue = false;
                await invalidatedProject.doneAsync(cancellationToken, writeFile, getCustomTransformersAsync);
                if (!state.diagnostics.has(invalidatedProject.projectPath)) successfulProjects++;
            }
            disableCache(state);
            totalErrors = reportErrorSummary(state, initialBuildOrder); // Report results of initial (no waits involved) solution build
            if (!state.watch){
                return isCircularBuildOrder(initialBuildOrder)
                ? ExitStatus.ProjectReferenceCycle_OutputsSkipped
                : !initialBuildOrder.some(p => state.diagnostics.has(toResolvedConfigFilePath(state, p)))
                    ? ExitStatus.Success
                    : successfulProjects
                        ? ExitStatus.DiagnosticsPresent_OutputsGenerated
                        : ExitStatus.DiagnosticsPresent_OutputsSkipped;
            }
        }
        startWatching(state, initialBuildOrder);
        let local_needsSummary = false;
        while (true) {
            if (state.closeRequested || cancellationToken?.isCancellationRequested()) break;
            const buildOrder = getBuildOrder(state);
            const r = await local_buildNextInvalidatedProjectAsync(state, buildOrder);
            if (r===undefined){
                disableCache(state);
                state.deferredPromise = createDeferredPromise();
                if (local_needsSummary) {
                    totalErrors = reportErrorSummary(state, buildOrder);
                }
                if (state.hostWithWatch.solutionSettledAsync){
                    await state.hostWithWatch.solutionSettledAsync(totalErrors);
                }
                // sys.write("buildUntilFinishedAsync:: beginning await state.deferredPromise.waitable"+sys.newLine);
                await state.deferredPromise.waitable;
                // sys.write("buildUntilFinishedAsync:: finished await state.deferredPromise.waitable"+sys.newLine);
                // any state.deferredPromise.resolved() called on this state.deferredPromise called after this are just ignored.
            }
            else {
                local_needsSummary = true;
            }
        }
        // sys.write("buildUntilFinishedAsync:: exit (not error)"+sys.newLine);
    }

    // async function buildAsync(state: SolutionBuilderStateAsync, project?: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformersAsync?: GetCustomTransformersAsync, onlyReferences?: boolean): Promise<ExitStatus> {
    //     const buildOrder = getBuildOrderFor(state, project, onlyReferences);
    //     if (!buildOrder) return ExitStatus.InvalidProject_OutputsSkipped;

    //     setupInitialBuild(state, cancellationToken);

    //     let reportQueue = true;
    //     let successfulProjects = 0;
    //     while (true) {
    //         const invalidatedProject = getNextInvalidatedProject(state, buildOrder, reportQueue);
    //         if (!invalidatedProject) break;
    //         reportQueue = false;
    //         await invalidatedProject.doneAsync(cancellationToken, writeFile, getCustomTransformersAsync);
    //         if (!state.diagnostics.has(invalidatedProject.projectPath)) successfulProjects++;
    //     }

    //     disableCache(state);
    //     reportErrorSummary(state, buildOrder); // Report results of initial (no waits involved) solution build
    //     startWatching(state, buildOrder);

    //     return isCircularBuildOrder(buildOrder)
    //         ? ExitStatus.ProjectReferenceCycle_OutputsSkipped
    //         : !buildOrder.some(p => state.diagnostics.has(toResolvedConfigFilePath(state, p)))
    //             ? ExitStatus.Success
    //             : successfulProjects
    //                 ? ExitStatus.DiagnosticsPresent_OutputsGenerated
    //                 : ExitStatus.DiagnosticsPresent_OutputsSkipped;
    // }

    function clean(state: SolutionBuilderStateAsync, project?: string, onlyReferences?: boolean) {
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
            if (!outputs.length) continue;
            const inputFileNames = new Set(parsed.fileNames.map(f => toPath(state, f)));
            for (const output of outputs) {
                // If output name is same as input file name, do not delete and ignore the error
                if (inputFileNames.has(toPath(state, output))) continue;
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

    /**
     * invalidateProject is called from clean, from invalidateProjectAndScheduleBuilds, and from the outer invalidateProject exposed to users.
     * Note that queueReferencingProjects does NOT call invalidate project, instead it calls addProjToQueue directly, because ???.
     * @param state
     * @param resolved
     * @param reloadLevel
     */
    function invalidateProject(state: SolutionBuilderStateAsync, resolved: ResolvedConfigFilePath, reloadLevel: ConfigFileProgramReloadLevel) {
        // If host implements getParsedCommandLine, we cant get list of files from parseConfigFileHost
        if (state.host.getParsedCommandLine && reloadLevel === ConfigFileProgramReloadLevel.Partial) {
            reloadLevel = ConfigFileProgramReloadLevel.Full;
        }
        if (reloadLevel === ConfigFileProgramReloadLevel.Full) {
            state.configFileCache.delete(resolved);
            state.buildOrder = undefined;
        }
        //state.needsSummary = true;
        clearProjectStatus(state, resolved);
        addProjToQueue(state, resolved, reloadLevel);
        enableCache(state);
    }

    /**
     * invalidateProjectAndScheduleBuilds is called only in watch callbacks.
     * The reason for using a timeout delay to calll buildInvalidatedProjectsRequest
     * is prevent thrashing in case multiple files are are changed at once, e.g., in a global replace.
     * @param state
     * @param resolvedPath
     * @param reloadLevel
     */
    function invalidateProjectAndScheduleBuilds(state: SolutionBuilderStateAsync, resolvedPath: ResolvedConfigFilePath, reloadLevel: ConfigFileProgramReloadLevel) {
        state.reportFileChangeDetected = true;
        invalidateProject(state, resolvedPath, reloadLevel);
        // scheduleBuildInvalidatedProject(state, 250);
        const { hostWithWatch } = state;
        if (!hostWithWatch.setTimeout || !hostWithWatch.clearTimeout) {
            return;
        }
        if (state.timerToBuildInvalidatedProject) {
            hostWithWatch.clearTimeout(state.timerToBuildInvalidatedProject);
        }
        state.timerToBuildInvalidatedProject = hostWithWatch.setTimeout(buildInvalidatedProjectsRequest, 250, state);

    }
    // /**
    //  * scheduleBuildInvalidatedProject is only called from invalidateProjectAndScheduleBuilds .
    //  * @param state
    //  * @returns
    //  */
    // function scheduleBuildInvalidatedProject(state: SolutionBuilderStateAsync, waitMs: number) {
    //     const { hostWithWatch } = state;
    //     if (!hostWithWatch.setTimeout || !hostWithWatch.clearTimeout) {
    //         return;
    //     }
    //     if (state.timerToBuildInvalidatedProject) {
    //         hostWithWatch.clearTimeout(state.timerToBuildInvalidatedProject);
    //     }
    //     state.timerToBuildInvalidatedProject = hostWithWatch.setTimeout(buildInvalidatedProjectsRequest, waitMs, state);
    // }

    /**
     * TODO: Change name to "buildInvalidatedProjectsRequest" and make it NOT async
     * buildNextInvalidatedProjectAsync is passed as the callback to setTimeout in scheduleBuildInvalidatedProject,
     * and is also exposed to user from SolutionBuilderAsync
     * @param state
     * @returns
     */
    function buildInvalidatedProjectsRequest(state: SolutionBuilderStateAsync) {
        if (state.deferredPromise) state.deferredPromise.resolve();
        // state.timerToBuildInvalidatedProject = undefined;
        // if (state.reportFileChangeDetected) {
        //     state.reportFileChangeDetected = false;
        //     state.projectErrorsReported.clear();
        //     reportWatchStatus(state, Diagnostics.File_change_detected_Starting_incremental_compilation);
        // }
        // const buildOrder = getBuildOrder(state);
        // const invalidatedProject = getNextInvalidatedProject(state, buildOrder, /*reportQueue*/ false);
        // if (invalidatedProject) {
        //     await invalidatedProject.doneAsync();
        //     if (state.projectPendingBuild.size) {
        //         // Schedule next project for build
        //         if (state.watch && !state.timerToBuildInvalidatedProject) {
        //             scheduleBuildInvalidatedProject(state);
        //         }
        //         return;
        //     }
        // }
        // disableCache(state);
        // reportErrorSummary(state, buildOrder); // Project is "settled"
    }

    function watchConfigFile(state: SolutionBuilderStateAsync, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine | undefined) {
        if (!state.watch || state.allWatchedConfigFiles.has(resolvedPath)) return;
        state.allWatchedConfigFiles.set(resolvedPath, state.watchFile(
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

    function watchExtendedConfigFiles(state: SolutionBuilderStateAsync, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine | undefined) {
        updateSharedExtendedConfigFileWatcher(
            resolvedPath,
            parsed?.options,
            state.allWatchedExtendedConfigFiles,
            (extendedConfigFileName, extendedConfigFilePath) => state.watchFile(
                extendedConfigFileName,
                () => state.allWatchedExtendedConfigFiles.get(extendedConfigFilePath)?.projects.forEach(projectConfigFilePath =>
                    invalidateProjectAndScheduleBuilds(state, projectConfigFilePath, ConfigFileProgramReloadLevel.Full)
                ),
                PollingInterval.High,
                parsed?.watchOptions,
                WatchType.ExtendedConfigFile,
            ),
            fileName => toPath(state, fileName),
        );
    }

    function watchWildCardDirectories(state: SolutionBuilderStateAsync, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
        if (!state.watch) return;
        updateWatchingWildcardDirectories(
            getOrCreateValueMapFromConfigFileMap(state.allWatchedWildcardDirectories, resolvedPath),
            new Map(getEntries(parsed.wildcardDirectories!)),
            (dir, flags) => state.watchDirectory(
                dir,
                fileOrDirectory => {
                    if (isIgnoredFileFromWildCardWatching({
                        watchedDirPath: toPath(state, dir),
                        fileOrDirectory,
                        fileOrDirectoryPath: toPath(state, fileOrDirectory),
                        configFileName: resolved,
                        currentDirectory: state.currentDirectory,
                        options: parsed.options,
                        program: state.builderPrograms.get(resolvedPath) || getCachedParsedConfigFile(state, resolvedPath)?.fileNames,
                        useCaseSensitiveFileNames: state.parseConfigFileHost.useCaseSensitiveFileNames,
                        writeLog: s => state.writeLog(s),
                        toPath: fileName => toPath(state, fileName)
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

    function watchInputFiles(state: SolutionBuilderStateAsync, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
        if (!state.watch) return;
        mutateMap(
            getOrCreateValueMapFromConfigFileMap(state.allWatchedInputFiles, resolvedPath),
            arrayToMap(parsed.fileNames, fileName => toPath(state, fileName)),
            {
                createNewValue: (_path, input) => state.watchFile(
                    input,
                    () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ConfigFileProgramReloadLevel.None),
                    PollingInterval.Low,
                    parsed?.watchOptions,
                    WatchType.SourceFile,
                    resolved
                ),
                onDeleteValue: closeFileWatcher,
            }
        );
    }

    function watchPackageJsonFiles(state: SolutionBuilderStateAsync, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
        if (!state.watch || !state.lastCachedPackageJsonLookups) return;
        mutateMap(
            getOrCreateValueMapFromConfigFileMap(state.allWatchedPackageJsonFiles, resolvedPath),
            new Map(state.lastCachedPackageJsonLookups.get(resolvedPath)),
            {
                createNewValue: (path, _input) => state.watchFile(
                    path,
                    () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ConfigFileProgramReloadLevel.None),
                    PollingInterval.High,
                    parsed?.watchOptions,
                    WatchType.PackageJson,
                    resolved
                ),
                onDeleteValue: closeFileWatcher,
            }
        );
    }

    function startWatching(state: SolutionBuilderStateAsync, buildOrder: AnyBuildOrder) {
        if (!state.watchAllProjectsPending) return;
        state.watchAllProjectsPending = false;
        for (const resolved of getBuildOrderFromAnyBuildOrder(buildOrder)) {
            const resolvedPath = toResolvedConfigFilePath(state, resolved);
            const cfg = parseConfigFile(state, resolved, resolvedPath);
            // Watch this file
            watchConfigFile(state, resolved, resolvedPath, cfg);
            watchExtendedConfigFiles(state, resolvedPath, cfg);
            if (cfg) {
                // Update watchers for wildcard directories
                watchWildCardDirectories(state, resolved, resolvedPath, cfg);

                // Watch input files
                watchInputFiles(state, resolved, resolvedPath, cfg);

                // Watch package json files
                watchPackageJsonFiles(state, resolved, resolvedPath, cfg);
            }
        }
    }

    function stopWatching(state: SolutionBuilderStateAsync) {
        clearMap(state.allWatchedConfigFiles, closeFileWatcher);
        clearMap(state.allWatchedExtendedConfigFiles, closeFileWatcherOf);
        clearMap(state.allWatchedWildcardDirectories, watchedWildcardDirectories => clearMap(watchedWildcardDirectories, closeFileWatcherOf));
        clearMap(state.allWatchedInputFiles, watchedWildcardDirectories => clearMap(watchedWildcardDirectories, closeFileWatcher));
        clearMap(state.allWatchedPackageJsonFiles, watchedPacageJsonFiles => clearMap(watchedPacageJsonFiles, closeFileWatcher));
    }

    /**
     * A SolutionBuilder has an immutable set of rootNames that are the "entry point" projects, but
     * can dynamically add/remove other projects based on changes on the rootNames' references
     */
    function createSolutionBuilderWorkerAsync<T extends BuilderProgram>(watch: false, host: SolutionBuilderHostAsync<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilderAsync;
    function createSolutionBuilderWorkerAsync<T extends BuilderProgram>(watch: true, host: SolutionBuilderWithWatchHostAsync<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilderAsync;
    function createSolutionBuilderWorkerAsync<T extends BuilderProgram>(watch: boolean, hostOrHostWithWatch: SolutionBuilderHostAsync<T> | SolutionBuilderWithWatchHostAsync<T>, rootNames: readonly string[], options: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilderAsync {
        const state = createSolutionBuilderStateAsync<T>(watch, hostOrHostWithWatch, rootNames, options, baseWatchOptions);
        const builder: SolutionBuilderAsync = {
            buildAsync: (project, cancellationToken, writeFile, getCustomTransformersAsync) => buildUntilFinishedAsync(state, project, cancellationToken, writeFile, getCustomTransformersAsync),
            clean: project => clean(state, project),
            buildReferencesAsync: (project, cancellationToken, writeFile, getCustomTransformersAsync) => buildUntilFinishedAsync(state, project, cancellationToken, writeFile, getCustomTransformersAsync, /*onlyReferences*/ true),
            cleanReferences: project => clean(state, project, /*onlyReferences*/ true),
            //getNextInvalidatedProject(cancellationToken?: CancellationToken): InvalidatedProject<T> | undefined;
            // getNextInvalidatedProject: (cancellationToken?: CancellationToken) => {
            //     setupInitialBuild(state, cancellationToken);
            //     return getNextInvalidatedProject<T>(state, getBuildOrder(state), /*reportQueue*/ false);
            // },
            getBuildOrder: () => getBuildOrder(state),
            getUpToDateStatusOfProject: project => {
                const configFileName = resolveProjectName(state, project);
                const configFilePath = toResolvedConfigFilePath(state, configFileName);
                return getUpToDateStatus(state, parseConfigFile(state, configFileName, configFilePath), configFilePath);
            },
            invalidateProject: (configFilePath, reloadLevel) => invalidateProject(state, configFilePath, reloadLevel || ConfigFileProgramReloadLevel.None),
            buildInvalidatedProjectsRequest: () => buildInvalidatedProjectsRequest(state),
            getAllParsedConfigs: () => arrayFrom(mapDefinedIterator(
                state.configFileCache.values(),
                config => isParsedCommandLine(config) ? config : undefined
            )),
            close: () => stopWatching(state), // NOT public
            closeRequest: ()=>closeRequest(state)
        };
        return builder;
    }


    function relName(state: SolutionBuilderStateAsync, path: string): string {
        return convertToRelativePath(path, state.currentDirectory, f => state.getCanonicalFileName(f));
    }

    function reportStatus(state: SolutionBuilderStateAsync, message: DiagnosticMessage, ...args: string[]) {
        state.host.reportSolutionBuilderStatus(createCompilerDiagnostic(message, ...args));
    }

    function reportWatchStatus(state: SolutionBuilderStateAsync, message: DiagnosticMessage, ...args: (string | number | undefined)[]) {
        state.hostWithWatch.onWatchStatusChange?.(createCompilerDiagnostic(message, ...args), state.host.getNewLine(), state.baseCompilerOptions);
    }

    function reportErrors({ host }: SolutionBuilderStateAsync, errors: readonly Diagnostic[]) {
        errors.forEach(err => host.reportDiagnostic(err));
    }

    function reportAndStoreErrors(state: SolutionBuilderStateAsync, proj: ResolvedConfigFilePath, errors: readonly Diagnostic[]) {
        reportErrors(state, errors);
        state.projectErrorsReported.set(proj, true);
        if (errors.length) {
            state.diagnostics.set(proj, errors);
        }
    }

    function reportParseConfigFileDiagnostic(state: SolutionBuilderStateAsync, proj: ResolvedConfigFilePath) {
        reportAndStoreErrors(state, proj, [state.configFileCache.get(proj) as Diagnostic]);
    }

    function reportErrorSummary(state: SolutionBuilderStateAsync, buildOrder: AnyBuildOrder): number {
        // if (!state.needsSummary) return;
        // state.needsSummary = false;
        const canReportSummary = state.watch || !!state.host.reportErrorSummary;
        const { diagnostics } = state;
        let totalErrors = 0;
        let filesInError: (ReportFileInError | undefined)[] = [];
        if (isCircularBuildOrder(buildOrder)) {
            reportBuildQueue(state, buildOrder.buildOrder);
            reportErrors(state, buildOrder.circularDiagnostics);
            if (canReportSummary) totalErrors += getErrorCountForSummary(buildOrder.circularDiagnostics);
            if (canReportSummary) filesInError = [...filesInError, ...getFilesInErrorForSummary(buildOrder.circularDiagnostics)];
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
            if (canReportSummary) diagnostics.forEach(singleProjectErrors => [...filesInError, ...getFilesInErrorForSummary(singleProjectErrors)]);
        }

        if (state.watch) {
            reportWatchStatus(state, getWatchErrorSummaryDiagnosticMessage(totalErrors), totalErrors);
        }
        else if (state.host.reportErrorSummary) {
            state.host.reportErrorSummary(totalErrors, filesInError);
        }
        return totalErrors;
    }

    /**
     * Report the build ordering inferred from the current project graph if we're in verbose mode
     */
    function reportBuildQueue(state: SolutionBuilderStateAsync, buildQueue: readonly ResolvedConfigFileName[]) {
        if (state.options.verbose) {
            reportStatus(state, Diagnostics.Projects_in_this_build_Colon_0, buildQueue.map(s => "\r\n    * " + relName(state, s)).join(""));
        }
    }

    function reportUpToDateStatus(state: SolutionBuilderStateAsync, configFileName: string, status: UpToDateStatus) {
        if (state.options.force && (status.type === UpToDateStatusType.UpToDate || status.type === UpToDateStatusType.UpToDateWithUpstreamTypes)) {
            return reportStatus(
                state,
                Diagnostics.Project_0_is_being_forcibly_rebuilt,
                relName(state, configFileName)
            );
        }

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
    function verboseReportProjectStatus(state: SolutionBuilderStateAsync, configFileName: string, status: UpToDateStatus) {
        if (state.options.verbose) {
            reportUpToDateStatus(state, configFileName, status);
        }
    }
}
