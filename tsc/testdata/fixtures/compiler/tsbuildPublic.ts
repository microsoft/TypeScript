import {
    AffectedFileResult,
    arrayFrom,
    assertType,
    BuilderProgram,
    BuildInfo,
    BuildInfoFileVersionMap,
    CancellationToken,
    canJsonReportNoInputFiles,
    changeCompilerHostLikeToUseCache,
    clearMap,
    closeFileWatcher,
    closeFileWatcherOf,
    combinePaths,
    commonOptionsWithBuild,
    CompilerHost,
    CompilerOptions,
    CompilerOptionsValue,
    convertToRelativePath,
    copyProperties,
    createCompilerDiagnostic,
    createCompilerHostFromProgramHost,
    createDiagnosticReporter,
    createModuleResolutionCache,
    createModuleResolutionLoader,
    CreateProgram,
    createProgramHost,
    createTypeReferenceDirectiveResolutionCache,
    createTypeReferenceResolutionLoader,
    createWatchFactory,
    createWatchHost,
    CustomTransformers,
    Debug,
    Diagnostic,
    DiagnosticArguments,
    DiagnosticMessage,
    DiagnosticReporter,
    Diagnostics,
    EmitAndSemanticDiagnosticsBuilderProgram,
    emitFilesAndReportErrors,
    EmitResult,
    emptyArray,
    ExitStatus,
    ExtendedConfigCacheEntry,
    FileWatcher,
    FileWatcherCallback,
    findIndex,
    firstOrUndefinedIterator,
    flattenDiagnosticMessageText,
    forEach,
    forEachEntry,
    forEachKey,
    ForegroundColorEscapeSequences,
    formatColorAndReset,
    getAllProjectOutputs,
    getBuildInfo as ts_getBuildInfo,
    getBuildInfoFileVersionMap,
    getConfigFileParsingDiagnostics,
    getDirectoryPath,
    getEmitDeclarations,
    getErrorCountForSummary,
    getFileNamesFromConfigSpecs,
    getFilesInErrorForSummary,
    getFirstProjectOutput,
    getLocaleTimeString,
    getModifiedTime as ts_getModifiedTime,
    getNonIncrementalBuildInfoRoots,
    getNormalizedAbsolutePath,
    getParsedCommandLineOfConfigFile,
    getPendingEmitKindWithSeen,
    getSourceFileVersionAsHashFromText,
    getTsBuildInfoEmitOutputFilePath,
    getWatchErrorSummaryDiagnosticMessage,
    hasProperty,
    identity,
    IncrementalBuildInfo,
    IncrementalBundleEmitBuildInfo,
    IncrementalMultiFileEmitBuildInfo,
    isIgnoredFileFromWildCardWatching,
    isIncrementalBuildInfo,
    isIncrementalCompilation,
    isPackageJsonInfo,
    isSolutionConfig,
    loadWithModeAwareCache,
    maybeBind,
    missingFileModifiedTime,
    ModuleResolutionCache,
    mutateMap,
    mutateMapSkippingNewValues,
    NonIncrementalBuildInfo,
    noop,
    ParseConfigFileHost,
    parseConfigHostFromCompilerHostLike,
    ParsedCommandLine,
    Path,
    PollingInterval,
    Program,
    ProgramHost,
    ProgramUpdateLevel,
    readBuilderProgram,
    ReadBuildProgramHost,
    resolveConfigFileProjectName,
    ResolvedConfigFileName,
    resolveLibrary,
    resolvePath,
    resolveProjectReferencePath,
    returnUndefined,
    SemanticDiagnosticsBuilderProgram,
    setGetSourceFileAsHashVersioned,
    SharedExtendedConfigFileWatcher,
    SourceFile,
    Status,
    sys,
    System,
    toPath as ts_toPath,
    TypeReferenceDirectiveResolutionCache,
    unorderedRemoveItem,
    updateErrorForNoInputFiles,
    updateSharedExtendedConfigFileWatcher,
    updateWatchingWildcardDirectories,
    UpToDateStatus,
    UpToDateStatusType,
    version,
    WatchFactory,
    WatchHost,
    WatchOptions,
    WatchStatusReporter,
    WatchType,
    WildcardDirectoryWatcher,
    WriteFileCallback,
} from "./_namespaces/ts.js";
import * as performance from "./_namespaces/ts.performance.js";

const minimumDate = new Date(-8640000000000000);

export interface BuildOptions {
    dry?: boolean;
    force?: boolean;
    verbose?: boolean;
    stopBuildOnErrors?: boolean;

    /** @internal */ clean?: boolean;
    /** @internal */ watch?: boolean;
    /** @internal */ help?: boolean;

    /** @internal */ preserveWatchOutput?: boolean;
    /** @internal */ listEmittedFiles?: boolean;
    /** @internal */ listFiles?: boolean;
    /** @internal */ explainFiles?: boolean;
    /** @internal */ pretty?: boolean;
    incremental?: boolean;
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    declaration?: boolean;
    declarationMap?: boolean;
    emitDeclarationOnly?: boolean;
    sourceMap?: boolean;
    inlineSourceMap?: boolean;

    traceResolution?: boolean;
    /** @internal */ diagnostics?: boolean;
    /** @internal */ extendedDiagnostics?: boolean;
    /** @internal */ locale?: string;
    /** @internal */ generateCpuProfile?: string;
    /** @internal */ generateTrace?: string;

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
    /** Errors in the build */
    AnyErrors = 1 << 2,
}

/** @internal */
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

function getOrCreateValueMapFromConfigFileMap<K extends string, V>(configFileMap: Map<ResolvedConfigFilePath, Map<K, V>>, resolved: ResolvedConfigFilePath): Map<K, V> {
    return getOrCreateValueFromConfigFileMap(configFileMap, resolved, () => new Map());
}

/**
 * Helper to use now method instead of current date for testing purposes to get consistent baselines
 */
function getCurrentTime(host: { now?(): Date; }) {
    return host.now ? host.now() : new Date();
}

export type ReportEmitErrorSummary = (errorCount: number, filesInError: (ReportFileInError | undefined)[]) => void;

export interface ReportFileInError {
    fileName: string;
    line: number;
}

export interface SolutionBuilderHostBase<T extends BuilderProgram> extends ProgramHost<T> {
    createDirectory?(path: string): void;
    /**
     * Should provide create directory and writeFile if done of invalidatedProjects is not invoked with
     * writeFileCallback
     */
    writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
    getCustomTransformers?: (project: string) => CustomTransformers | undefined;

    getModifiedTime(fileName: string): Date | undefined;
    setModifiedTime(fileName: string, date: Date): void;
    deleteFile(fileName: string): void;
    getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;

    reportDiagnostic: DiagnosticReporter; // Technically we want to move it out and allow steps of actions on Solution, but for now just merge stuff in build host here
    reportSolutionBuilderStatus: DiagnosticReporter;

    // TODO: To do better with watch mode and normal build mode api that creates program and emits files
    // This currently helps enable --diagnostics and --extendedDiagnostics
    afterProgramEmitAndDiagnostics?(program: T): void;

    // For testing
    /** @internal */ now?(): Date;
}

export interface SolutionBuilderHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T> {
    reportErrorSummary?: ReportEmitErrorSummary;
}

export interface SolutionBuilderWithWatchHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T>, WatchHost {
}

/** @internal */
export type BuildOrder = readonly ResolvedConfigFileName[];
/** @internal */
export interface CircularBuildOrder {
    buildOrder: BuildOrder;
    circularDiagnostics: readonly Diagnostic[];
}
/** @internal */
export type AnyBuildOrder = BuildOrder | CircularBuildOrder;

/** @internal */
export function isCircularBuildOrder(buildOrder: AnyBuildOrder): buildOrder is CircularBuildOrder {
    return !!buildOrder && !!(buildOrder as CircularBuildOrder).buildOrder;
}

/** @internal */
export function getBuildOrderFromAnyBuildOrder(anyBuildOrder: AnyBuildOrder): BuildOrder {
    return isCircularBuildOrder(anyBuildOrder) ? anyBuildOrder.buildOrder : anyBuildOrder;
}

export interface SolutionBuilder<T extends BuilderProgram> {
    build(project?: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformers?: (project: string) => CustomTransformers): ExitStatus;
    clean(project?: string): ExitStatus;
    buildReferences(project: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformers?: (project: string) => CustomTransformers): ExitStatus;
    cleanReferences(project?: string): ExitStatus;
    getNextInvalidatedProject(cancellationToken?: CancellationToken): InvalidatedProject<T> | undefined;

    // Currently used for testing but can be made public if needed:
    /** @internal */ getBuildOrder(): AnyBuildOrder;

    // Testing only
    /** @internal */ getUpToDateStatusOfProject(project: string): UpToDateStatus;
    /** @internal */ invalidateProject(configFilePath: ResolvedConfigFilePath, updateLevel?: ProgramUpdateLevel): void;
    /** @internal */ close(): void;
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

export function createSolutionBuilderHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(
    system: System = sys,
    createProgram?: CreateProgram<T>,
    reportDiagnostic?: DiagnosticReporter,
    reportSolutionBuilderStatus?: DiagnosticReporter,
    reportErrorSummary?: ReportEmitErrorSummary,
): SolutionBuilderHost<T> {
    const host = createSolutionBuilderHostBase(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderHost<T>;
    host.reportErrorSummary = reportErrorSummary;
    return host;
}

export function createSolutionBuilderWithWatchHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(
    system: System = sys,
    createProgram?: CreateProgram<T>,
    reportDiagnostic?: DiagnosticReporter,
    reportSolutionBuilderStatus?: DiagnosticReporter,
    reportWatchStatus?: WatchStatusReporter,
): SolutionBuilderWithWatchHost<T> {
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
    result.tscBuild = true;
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

interface FileWatcherWithModifiedTime {
    callbacks: FileWatcherCallback[];
    watcher: FileWatcher;
    // modified time can be undefined if it was not queried
    // Eg. if input file timestamp was not queried because tsbuildinfo was missing but watcher for that file is created
    modifiedTime: Date | undefined;
}

interface BuildInfoCacheEntry {
    path: Path;
    buildInfo: BuildInfo | false;
    modifiedTime: Date;
    latestChangedDtsTime?: Date | false;
}

interface SolutionBuilderState<T extends BuilderProgram> extends WatchFactory<WatchType, ResolvedConfigFileName> {
    readonly host: SolutionBuilderHost<T>;
    readonly hostWithWatch: SolutionBuilderWithWatchHost<T>;
    readonly parseConfigFileHost: ParseConfigFileHost;
    readonly write: ((s: string) => void) | undefined;

    // State of solution
    readonly options: BuildOptions;
    readonly baseCompilerOptions: CompilerOptions;
    readonly rootNames: readonly string[];
    readonly baseWatchOptions: WatchOptions | undefined;

    readonly resolvedConfigFilePaths: Map<string, ResolvedConfigFilePath>;
    readonly configFileCache: Map<ResolvedConfigFilePath, ConfigFileCacheEntry>;
    /** Map from config file name to up-to-date status */
    readonly projectStatus: Map<ResolvedConfigFilePath, UpToDateStatus>;
    readonly extendedConfigCache: Map<string, ExtendedConfigCacheEntry>;
    readonly buildInfoCache: Map<ResolvedConfigFilePath, BuildInfoCacheEntry>;

    readonly builderPrograms: Map<ResolvedConfigFilePath, T>;
    readonly diagnostics: Map<ResolvedConfigFilePath, readonly Diagnostic[]>;
    readonly projectPendingBuild: Map<ResolvedConfigFilePath, ProgramUpdateLevel>;
    readonly projectErrorsReported: Map<ResolvedConfigFilePath, true>;

    readonly compilerHost: CompilerHost & ReadBuildProgramHost;
    readonly moduleResolutionCache: ModuleResolutionCache | undefined;
    readonly typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache | undefined;
    readonly libraryResolutionCache: ModuleResolutionCache | undefined;

    // Mutable state
    buildOrder: AnyBuildOrder | undefined;
    readFileWithCache: (f: string) => string | undefined;
    projectCompilerOptions: CompilerOptions;
    cache: SolutionBuilderStateCache | undefined;
    allProjectBuildPending: boolean;
    needsSummary: boolean;
    watchAllProjectsPending: boolean;

    // Watch state
    readonly watch: boolean;
    readonly allWatchedWildcardDirectories: Map<ResolvedConfigFilePath, Map<string, WildcardDirectoryWatcher>>;
    readonly allWatchedInputFiles: Map<ResolvedConfigFilePath, Map<string, FileWatcher>>;
    readonly allWatchedConfigFiles: Map<ResolvedConfigFilePath, FileWatcher>;
    readonly allWatchedExtendedConfigFiles: Map<Path, SharedExtendedConfigFileWatcher<ResolvedConfigFilePath>>;
    readonly allWatchedPackageJsonFiles: Map<ResolvedConfigFilePath, Map<Path, FileWatcher>>;
    readonly filesWatched: Map<Path, FileWatcherWithModifiedTime | Date>;
    readonly outputTimeStamps: Map<ResolvedConfigFilePath, Map<Path, Date>>;

    readonly lastCachedPackageJsonLookups: Map<ResolvedConfigFilePath, Set<string> | undefined>;

    timerToBuildInvalidatedProject: any;
    reportFileChangeDetected: boolean;
    writeLog: (s: string) => void;
}

function createSolutionBuilderState<T extends BuilderProgram>(watch: boolean, hostOrHostWithWatch: SolutionBuilderHost<T> | SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], options: BuildOptions, baseWatchOptions: WatchOptions | undefined): SolutionBuilderState<T> {
    const host = hostOrHostWithWatch as SolutionBuilderHost<T>;
    const hostWithWatch = hostOrHostWithWatch as SolutionBuilderWithWatchHost<T>;

    // State of the solution
    const baseCompilerOptions = getCompilerOptionsOfBuildOptions(options);
    const compilerHost = createCompilerHostFromProgramHost(host, () => state.projectCompilerOptions) as CompilerHost & ReadBuildProgramHost;
    setGetSourceFileAsHashVersioned(compilerHost);
    compilerHost.getParsedCommandLine = fileName => parseConfigFile(state, fileName as ResolvedConfigFileName, toResolvedConfigFilePath(state, fileName as ResolvedConfigFileName));
    compilerHost.resolveModuleNameLiterals = maybeBind(host, host.resolveModuleNameLiterals);
    compilerHost.resolveTypeReferenceDirectiveReferences = maybeBind(host, host.resolveTypeReferenceDirectiveReferences);
    compilerHost.resolveLibrary = maybeBind(host, host.resolveLibrary);
    compilerHost.resolveModuleNames = maybeBind(host, host.resolveModuleNames);
    compilerHost.resolveTypeReferenceDirectives = maybeBind(host, host.resolveTypeReferenceDirectives);
    compilerHost.getModuleResolutionCache = maybeBind(host, host.getModuleResolutionCache);
    let moduleResolutionCache: ModuleResolutionCache | undefined, typeReferenceDirectiveResolutionCache: TypeReferenceDirectiveResolutionCache | undefined;
    if (!compilerHost.resolveModuleNameLiterals && !compilerHost.resolveModuleNames) {
        moduleResolutionCache = createModuleResolutionCache(compilerHost.getCurrentDirectory(), compilerHost.getCanonicalFileName);
        compilerHost.resolveModuleNameLiterals = (moduleNames, containingFile, redirectedReference, options, containingSourceFile) =>
            loadWithModeAwareCache(
                moduleNames,
                containingFile,
                redirectedReference,
                options,
                containingSourceFile,
                host,
                moduleResolutionCache,
                createModuleResolutionLoader,
            );
        compilerHost.getModuleResolutionCache = () => moduleResolutionCache;
    }
    if (!compilerHost.resolveTypeReferenceDirectiveReferences && !compilerHost.resolveTypeReferenceDirectives) {
        typeReferenceDirectiveResolutionCache = createTypeReferenceDirectiveResolutionCache(
            compilerHost.getCurrentDirectory(),
            compilerHost.getCanonicalFileName,
            /*options*/ undefined,
            moduleResolutionCache?.getPackageJsonInfoCache(),
            moduleResolutionCache?.optionsToRedirectsKey,
        );
        compilerHost.resolveTypeReferenceDirectiveReferences = (typeDirectiveNames, containingFile, redirectedReference, options, containingSourceFile) =>
            loadWithModeAwareCache(
                typeDirectiveNames,
                containingFile,
                redirectedReference,
                options,
                containingSourceFile,
                host,
                typeReferenceDirectiveResolutionCache,
                createTypeReferenceResolutionLoader,
            );
    }
    let libraryResolutionCache: ModuleResolutionCache | undefined;
    if (!compilerHost.resolveLibrary) {
        libraryResolutionCache = createModuleResolutionCache(compilerHost.getCurrentDirectory(), compilerHost.getCanonicalFileName, /*options*/ undefined, moduleResolutionCache?.getPackageJsonInfoCache());
        compilerHost.resolveLibrary = (libraryName, resolveFrom, options) =>
            resolveLibrary(
                libraryName,
                resolveFrom,
                options,
                host,
                libraryResolutionCache,
            );
    }
    compilerHost.getBuildInfo = (fileName, configFilePath) => getBuildInfo(state, fileName, toResolvedConfigFilePath(state, configFilePath as ResolvedConfigFileName), /*modifiedTime*/ undefined);

    const { watchFile, watchDirectory, writeLog } = createWatchFactory<ResolvedConfigFileName>(hostWithWatch, options);

    const state: SolutionBuilderState<T> = {
        host,
        hostWithWatch,
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
        extendedConfigCache: new Map(),
        buildInfoCache: new Map(),
        outputTimeStamps: new Map(),

        builderPrograms: new Map(),
        diagnostics: new Map(),
        projectPendingBuild: new Map(),
        projectErrorsReported: new Map(),

        compilerHost,
        moduleResolutionCache,
        typeReferenceDirectiveResolutionCache,
        libraryResolutionCache,

        // Mutable state
        buildOrder: undefined,
        readFileWithCache: f => host.readFile(f),
        projectCompilerOptions: baseCompilerOptions,
        cache: undefined,
        allProjectBuildPending: true,
        needsSummary: true,
        watchAllProjectsPending: watch,

        // Watch state
        watch,
        allWatchedWildcardDirectories: new Map(),
        allWatchedInputFiles: new Map(),
        allWatchedConfigFiles: new Map(),
        allWatchedExtendedConfigFiles: new Map(),
        allWatchedPackageJsonFiles: new Map(),
        filesWatched: new Map(),

        lastCachedPackageJsonLookups: new Map(),

        timerToBuildInvalidatedProject: undefined,
        reportFileChangeDetected: false,
        watchFile,
        watchDirectory,
        writeLog,
    };

    return state;
}

function toPath<T extends BuilderProgram>(state: SolutionBuilderState<T>, fileName: string) {
    return ts_toPath(fileName, state.compilerHost.getCurrentDirectory(), state.compilerHost.getCanonicalFileName);
}

function toResolvedConfigFilePath<T extends BuilderProgram>(state: SolutionBuilderState<T>, fileName: ResolvedConfigFileName): ResolvedConfigFilePath {
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

function getCachedParsedConfigFile<T extends BuilderProgram>(state: SolutionBuilderState<T>, configFilePath: ResolvedConfigFilePath): ParsedCommandLine | undefined {
    const value = state.configFileCache.get(configFilePath);
    return value && isParsedCommandLine(value) ? value : undefined;
}

function parseConfigFile<T extends BuilderProgram>(state: SolutionBuilderState<T>, configFileName: ResolvedConfigFileName, configFilePath: ResolvedConfigFilePath): ParsedCommandLine | undefined {
    const { configFileCache } = state;
    const value = configFileCache.get(configFilePath);
    if (value) {
        return isParsedCommandLine(value) ? value : undefined;
    }

    performance.mark("SolutionBuilder::beforeConfigFileParsing");
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
    performance.mark("SolutionBuilder::afterConfigFileParsing");
    performance.measure("SolutionBuilder::Config file parsing", "SolutionBuilder::beforeConfigFileParsing", "SolutionBuilder::afterConfigFileParsing");
    return parsed;
}

function resolveProjectName<T extends BuilderProgram>(state: SolutionBuilderState<T>, name: string): ResolvedConfigFileName {
    return resolveConfigFileProjectName(resolvePath(state.compilerHost.getCurrentDirectory(), name));
}

function createBuildOrder<T extends BuilderProgram>(state: SolutionBuilderState<T>, roots: readonly ResolvedConfigFileName[]): AnyBuildOrder {
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
                        circularityReportStack.join("\r\n"),
                    ),
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

function getBuildOrder<T extends BuilderProgram>(state: SolutionBuilderState<T>) {
    return state.buildOrder || createStateBuildOrder(state);
}

function createStateBuildOrder<T extends BuilderProgram>(state: SolutionBuilderState<T>) {
    const buildOrder = createBuildOrder(state, state.rootNames.map(f => resolveProjectName(state, f)));

    // Clear all to ResolvedConfigFilePaths cache to start fresh
    state.resolvedConfigFilePaths.clear();

    // TODO(rbuckton): Should be a `Set`, but that requires changing the code below that uses `mutateMapSkippingNewValues`
    const currentProjects = new Set(
        getBuildOrderFromAnyBuildOrder(buildOrder).map(
            resolved => toResolvedConfigFilePath(state, resolved),
        ),
    );

    const noopOnDelete = { onDeleteValue: noop };
    // Config file cache
    mutateMapSkippingNewValues(state.configFileCache, currentProjects, noopOnDelete);
    mutateMapSkippingNewValues(state.projectStatus, currentProjects, noopOnDelete);
    mutateMapSkippingNewValues(state.builderPrograms, currentProjects, noopOnDelete);
    mutateMapSkippingNewValues(state.diagnostics, currentProjects, noopOnDelete);
    mutateMapSkippingNewValues(state.projectPendingBuild, currentProjects, noopOnDelete);
    mutateMapSkippingNewValues(state.projectErrorsReported, currentProjects, noopOnDelete);
    mutateMapSkippingNewValues(state.buildInfoCache, currentProjects, noopOnDelete);
    mutateMapSkippingNewValues(state.outputTimeStamps, currentProjects, noopOnDelete);
    mutateMapSkippingNewValues(state.lastCachedPackageJsonLookups, currentProjects, noopOnDelete);

    // Remove watches for the program no longer in the solution
    if (state.watch) {
        mutateMapSkippingNewValues(
            state.allWatchedConfigFiles,
            currentProjects,
            { onDeleteValue: closeFileWatcher },
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
            { onDeleteValue: existingMap => existingMap.forEach(closeFileWatcherOf) },
        );

        mutateMapSkippingNewValues(
            state.allWatchedInputFiles,
            currentProjects,
            { onDeleteValue: existingMap => existingMap.forEach(closeFileWatcher) },
        );

        mutateMapSkippingNewValues(
            state.allWatchedPackageJsonFiles,
            currentProjects,
            { onDeleteValue: existingMap => existingMap.forEach(closeFileWatcher) },
        );
    }
    return state.buildOrder = buildOrder;
}

function getBuildOrderFor<T extends BuilderProgram>(state: SolutionBuilderState<T>, project: string | undefined, onlyReferences: boolean | undefined): AnyBuildOrder | undefined {
    const resolvedProject = project && resolveProjectName(state, project);
    const buildOrderFromState = getBuildOrder(state);
    if (isCircularBuildOrder(buildOrderFromState)) return buildOrderFromState;
    if (resolvedProject) {
        const projectPath = toResolvedConfigFilePath(state, resolvedProject);
        const projectIndex = findIndex(
            buildOrderFromState,
            configFileName => toResolvedConfigFilePath(state, configFileName) === projectPath,
        );
        if (projectIndex === -1) return undefined;
    }
    const buildOrder = resolvedProject ? createBuildOrder(state, [resolvedProject]) as BuildOrder : buildOrderFromState;
    Debug.assert(!isCircularBuildOrder(buildOrder));
    Debug.assert(!onlyReferences || resolvedProject !== undefined);
    Debug.assert(!onlyReferences || buildOrder[buildOrder.length - 1] === resolvedProject);
    return onlyReferences ? buildOrder.slice(0, buildOrder.length - 1) : buildOrder;
}

function enableCache<T extends BuilderProgram>(state: SolutionBuilderState<T>) {
    if (state.cache) {
        disableCache(state);
    }

    const { compilerHost, host } = state;

    const originalReadFileWithCache = state.readFileWithCache;
    const originalGetSourceFile = compilerHost.getSourceFile;

    const {
        originalReadFile,
        originalFileExists,
        originalDirectoryExists,
        originalCreateDirectory,
        originalWriteFile,
        getSourceFileWithCache,
        readFileWithCache,
    } = changeCompilerHostLikeToUseCache(
        host,
        fileName => toPath(state, fileName),
        (...args) => originalGetSourceFile.call(compilerHost, ...args),
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

function disableCache<T extends BuilderProgram>(state: SolutionBuilderState<T>) {
    if (!state.cache) return;

    const { cache, host, compilerHost, extendedConfigCache, moduleResolutionCache, typeReferenceDirectiveResolutionCache, libraryResolutionCache } = state;

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
    libraryResolutionCache?.clear();
    state.cache = undefined;
}

function clearProjectStatus<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolved: ResolvedConfigFilePath) {
    state.projectStatus.delete(resolved);
    state.diagnostics.delete(resolved);
}

function addProjToQueue<T extends BuilderProgram>({ projectPendingBuild }: SolutionBuilderState<T>, proj: ResolvedConfigFilePath, updateLevel: ProgramUpdateLevel) {
    const value = projectPendingBuild.get(proj);
    if (value === undefined) {
        projectPendingBuild.set(proj, updateLevel);
    }
    else if (value < updateLevel) {
        projectPendingBuild.set(proj, updateLevel);
    }
}

function setupInitialBuild<T extends BuilderProgram>(state: SolutionBuilderState<T>, cancellationToken: CancellationToken | undefined) {
    // Set initial build if not already built
    if (!state.allProjectBuildPending) return;
    state.allProjectBuildPending = false;
    if (state.options.watch) reportWatchStatus(state, Diagnostics.Starting_compilation_in_watch_mode);
    enableCache(state);
    const buildOrder = getBuildOrderFromAnyBuildOrder(getBuildOrder(state));
    buildOrder.forEach(configFileName =>
        state.projectPendingBuild.set(
            toResolvedConfigFilePath(state, configFileName),
            ProgramUpdateLevel.Update,
        )
    );

    if (cancellationToken) {
        cancellationToken.throwIfCancellationRequested();
    }
}

export enum InvalidatedProjectKind {
    Build,
    UpdateOutputFileStamps,
}

export interface InvalidatedProjectBase {
    readonly kind: InvalidatedProjectKind;
    readonly project: ResolvedConfigFileName;
    /** @internal */ readonly projectPath: ResolvedConfigFilePath;
    /** @internal */ readonly buildOrder: readonly ResolvedConfigFileName[];
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

export type InvalidatedProject<T extends BuilderProgram> = UpdateOutputFileStampsProject | BuildInvalidedProject<T>;

function doneInvalidatedProject<T extends BuilderProgram>(
    state: SolutionBuilderState<T>,
    projectPath: ResolvedConfigFilePath,
) {
    state.projectPendingBuild.delete(projectPath);
    return state.diagnostics.has(projectPath) ?
        ExitStatus.DiagnosticsPresent_OutputsSkipped :
        ExitStatus.Success;
}

function createUpdateOutputFileStampsProject<T extends BuilderProgram>(
    state: SolutionBuilderState<T>,
    project: ResolvedConfigFileName,
    projectPath: ResolvedConfigFilePath,
    config: ParsedCommandLine,
    buildOrder: readonly ResolvedConfigFileName[],
): UpdateOutputFileStampsProject {
    let updateOutputFileStampsPending = true;
    return {
        kind: InvalidatedProjectKind.UpdateOutputFileStamps,
        project,
        projectPath,
        buildOrder,
        getCompilerOptions: () => config.options,
        getCurrentDirectory: () => state.compilerHost.getCurrentDirectory(),
        updateOutputFileStatmps: () => {
            updateOutputTimestamps(state, config, projectPath);
            updateOutputFileStampsPending = false;
        },
        done: () => {
            if (updateOutputFileStampsPending) {
                updateOutputTimestamps(state, config, projectPath);
            }
            performance.mark("SolutionBuilder::Timestamps only updates");
            return doneInvalidatedProject(state, projectPath);
        },
    };
}

enum BuildStep {
    CreateProgram,
    Emit,
    QueueReferencingProjects,
    Done,
}

function createBuildOrUpdateInvalidedProject<T extends BuilderProgram>(
    state: SolutionBuilderState<T>,
    project: ResolvedConfigFileName,
    projectPath: ResolvedConfigFilePath,
    projectIndex: number,
    config: ParsedCommandLine,
    status: UpToDateStatus,
    buildOrder: readonly ResolvedConfigFileName[],
): BuildInvalidedProject<T> {
    let step = BuildStep.CreateProgram;
    let program: T | undefined;
    let buildResult: BuildResultFlags | undefined;

    return {
        kind: InvalidatedProjectKind.Build,
        project,
        projectPath,
        buildOrder,
        getCompilerOptions: () => config.options,
        getCurrentDirectory: () => state.compilerHost.getCurrentDirectory(),
        getBuilderProgram: () => withProgramOrUndefined(identity),
        getProgram: () =>
            withProgramOrUndefined(
                program => program.getProgramOrUndefined(),
            ),
        getSourceFile: fileName =>
            withProgramOrUndefined(
                program => program.getSourceFile(fileName),
            ),
        getSourceFiles: () =>
            withProgramOrEmptyArray(
                program => program.getSourceFiles(),
            ),
        getOptionsDiagnostics: cancellationToken =>
            withProgramOrEmptyArray(
                program => program.getOptionsDiagnostics(cancellationToken),
            ),
        getGlobalDiagnostics: cancellationToken =>
            withProgramOrEmptyArray(
                program => program.getGlobalDiagnostics(cancellationToken),
            ),
        getConfigFileParsingDiagnostics: () =>
            withProgramOrEmptyArray(
                program => program.getConfigFileParsingDiagnostics(),
            ),
        getSyntacticDiagnostics: (sourceFile, cancellationToken) =>
            withProgramOrEmptyArray(
                program => program.getSyntacticDiagnostics(sourceFile, cancellationToken),
            ),
        getAllDependencies: sourceFile =>
            withProgramOrEmptyArray(
                program => program.getAllDependencies(sourceFile),
            ),
        getSemanticDiagnostics: (sourceFile, cancellationToken) =>
            withProgramOrEmptyArray(
                program => program.getSemanticDiagnostics(sourceFile, cancellationToken),
            ),
        getSemanticDiagnosticsOfNextAffectedFile: (cancellationToken, ignoreSourceFile) =>
            withProgramOrUndefined(
                program =>
                    ((program as any as SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile) &&
                    (program as any as SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile(cancellationToken, ignoreSourceFile),
            ),
        emit: (targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers) => {
            if (targetSourceFile || emitOnlyDtsFiles) {
                return withProgramOrUndefined(
                    program => program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers || state.host.getCustomTransformers?.(project)),
                );
            }
            executeSteps(BuildStep.CreateProgram, cancellationToken);
            return emit(writeFile, cancellationToken, customTransformers);
        },
        done,
    };

    function done(cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, customTransformers?: CustomTransformers) {
        executeSteps(BuildStep.Done, cancellationToken, writeFile, customTransformers);
        performance.mark("SolutionBuilder::Projects built");
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
        state.moduleResolutionCache?.update(config.options);
        state.typeReferenceDirectiveResolutionCache?.update(config.options);

        // Create program
        program = host.createProgram(
            config.fileNames,
            config.options,
            compilerHost,
            getOldProgram(state, projectPath, config),
            getConfigFileParsingDiagnostics(config),
            config.projectReferences,
        );
        if (state.watch) {
            const internalMap = state.moduleResolutionCache?.getPackageJsonInfoCache().getInternalMap();
            state.lastCachedPackageJsonLookups.set(
                projectPath,
                internalMap && new Set(arrayFrom(
                    internalMap.values(),
                    data =>
                        state.host.realpath && (isPackageJsonInfo(data) || data.directoryExists) ?
                            state.host.realpath(combinePaths(data.packageDirectory, "package.json")) :
                            combinePaths(data.packageDirectory, "package.json"),
                )),
            );
            state.builderPrograms.set(projectPath, program);
        }
        step++;
    }

    function emit(
        writeFileCallback?: WriteFileCallback,
        cancellationToken?: CancellationToken,
        customTransformers?: CustomTransformers,
    ): EmitResult {
        Debug.assertIsDefined(program);
        Debug.assert(step === BuildStep.Emit);

        // Actual Emit
        const { host, compilerHost } = state;
        const emittedOutputs = new Map<Path, string>();
        const options = program.getCompilerOptions();
        const isIncremental = isIncrementalCompilation(options);
        let outputTimeStampMap: Map<Path, Date> | undefined;
        let now: Date | undefined;
        const { emitResult, diagnostics } = emitFilesAndReportErrors(
            program,
            d => host.reportDiagnostic(d),
            state.write,
            /*reportSummary*/ undefined,
            (name, text, writeByteOrderMark, onError, sourceFiles, data) => {
                const path = toPath(state, name);
                emittedOutputs.set(toPath(state, name), name);
                if (data?.buildInfo) {
                    // Update buildInfo cache
                    now ||= getCurrentTime(state.host);
                    const isChangedSignature = program!.hasChangedEmitSignature?.();
                    const existing = getBuildInfoCacheEntry(state, name, projectPath);
                    if (existing) {
                        existing.buildInfo = data.buildInfo;
                        existing.modifiedTime = now;
                        if (isChangedSignature) existing.latestChangedDtsTime = now;
                    }
                    else {
                        state.buildInfoCache.set(projectPath, {
                            path: toPath(state, name),
                            buildInfo: data.buildInfo,
                            modifiedTime: now,
                            latestChangedDtsTime: isChangedSignature ? now : undefined,
                        });
                    }
                }
                const modifiedTime = data?.differsOnlyInMap ? ts_getModifiedTime(state.host, name) : undefined;
                (writeFileCallback || compilerHost.writeFile)(
                    name,
                    text,
                    writeByteOrderMark,
                    onError,
                    sourceFiles,
                    data,
                );
                // Revert the timestamp for the d.ts that is same but differs only in d.ts map URL
                if (data?.differsOnlyInMap) state.host.setModifiedTime(name, modifiedTime!);
                else if (!isIncremental && state.watch) {
                    (outputTimeStampMap ||= getOutputTimeStampMap(state, projectPath)!).set(path, now ||= getCurrentTime(state.host));
                }
            },
            cancellationToken,
            /*emitOnlyDtsFiles*/ undefined,
            customTransformers || state.host.getCustomTransformers?.(project),
        );

        if (
            (!options.noEmitOnError || !diagnostics.length) &&
            (emittedOutputs.size || status.type !== UpToDateStatusType.OutOfDateBuildInfoWithErrors)
        ) {
            // Update time stamps for rest of the outputs
            updateOutputTimestampsWorker(state, config, projectPath, Diagnostics.Updating_unchanged_output_timestamps_of_project_0, emittedOutputs);
        }
        state.projectErrorsReported.set(projectPath, true);
        buildResult = program.hasChangedEmitSignature?.() ? BuildResultFlags.None : BuildResultFlags.DeclarationOutputUnchanged;
        if (!diagnostics.length) {
            state.diagnostics.delete(projectPath);
            state.projectStatus.set(projectPath, {
                type: UpToDateStatusType.UpToDate,
                oldestOutputFileName: firstOrUndefinedIterator(emittedOutputs.values()) ?? getFirstProjectOutput(config, !host.useCaseSensitiveFileNames()),
            });
        }
        else {
            state.diagnostics.set(projectPath, diagnostics);
            state.projectStatus.set(projectPath, { type: UpToDateStatusType.Unbuildable, reason: `it had errors` });
            buildResult |= BuildResultFlags.AnyErrors;
        }
        afterProgramDone(state, program);
        step = BuildStep.QueueReferencingProjects;
        return emitResult;
    }

    function executeSteps(
        till: BuildStep,
        cancellationToken?: CancellationToken,
        writeFile?: WriteFileCallback,
        customTransformers?: CustomTransformers,
    ) {
        while (step <= till && step < BuildStep.Done) {
            const currentStep = step;
            switch (step) {
                case BuildStep.CreateProgram:
                    createProgram();
                    break;

                case BuildStep.Emit:
                    emit(writeFile, cancellationToken, customTransformers);
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

interface InvalidateProjectCreateInfo {
    kind: InvalidatedProjectKind;
    status: UpToDateStatus;
    project: ResolvedConfigFileName;
    projectPath: ResolvedConfigFilePath;
    projectIndex: number;
    config: ParsedCommandLine;
}

function getNextInvalidatedProjectCreateInfo<T extends BuilderProgram>(
    state: SolutionBuilderState<T>,
    buildOrder: AnyBuildOrder,
    reportQueue: boolean,
): InvalidateProjectCreateInfo | undefined {
    if (!state.projectPendingBuild.size) return undefined;
    if (isCircularBuildOrder(buildOrder)) return undefined;

    const { options, projectPendingBuild } = state;
    for (let projectIndex = 0; projectIndex < buildOrder.length; projectIndex++) {
        const project = buildOrder[projectIndex];
        const projectPath = toResolvedConfigFilePath(state, project);
        const updateLevel = state.projectPendingBuild.get(projectPath);
        if (updateLevel === undefined) continue;

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

        if (updateLevel === ProgramUpdateLevel.Full) {
            watchConfigFile(state, project, projectPath, config);
            watchExtendedConfigFiles(state, projectPath, config);
            watchWildCardDirectories(state, project, projectPath, config);
            watchInputFiles(state, project, projectPath, config);
            watchPackageJsonFiles(state, project, projectPath, config);
        }
        else if (updateLevel === ProgramUpdateLevel.RootNamesAndUpdate) {
            // Update file names
            config.fileNames = getFileNamesFromConfigSpecs(config.options.configFile!.configFileSpecs!, getDirectoryPath(project), config.options, state.parseConfigFileHost);
            updateErrorForNoInputFiles(
                config.fileNames,
                project,
                config.options.configFile!.configFileSpecs!,
                config.errors,
                canJsonReportNoInputFiles(config.raw),
            );
            watchInputFiles(state, project, projectPath, config);
            watchPackageJsonFiles(state, project, projectPath, config);
        }

        const status = getUpToDateStatus(state, config, projectPath);
        if (!options.force) {
            if (status.type === UpToDateStatusType.UpToDate) {
                verboseReportProjectStatus(state, project, status);
                reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                projectPendingBuild.delete(projectPath);
                // Up to date, skip
                if (options.dry) {
                    // In a dry build, inform the user of this fact
                    reportStatus(state, Diagnostics.Project_0_is_up_to_date, project);
                }
                continue;
            }

            if (status.type === UpToDateStatusType.UpToDateWithUpstreamTypes || status.type === UpToDateStatusType.UpToDateWithInputFileText) {
                reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
                return {
                    kind: InvalidatedProjectKind.UpdateOutputFileStamps,
                    status,
                    project,
                    projectPath,
                    projectIndex,
                    config,
                };
            }
        }

        if (status.type === UpToDateStatusType.UpstreamBlocked) {
            verboseReportProjectStatus(state, project, status);
            reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
            projectPendingBuild.delete(projectPath);
            if (options.verbose) {
                reportStatus(
                    state,
                    status.upstreamProjectBlocked ?
                        Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_was_not_built :
                        Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors,
                    project,
                    status.upstreamProjectName,
                );
            }
            continue;
        }

        if (status.type === UpToDateStatusType.ContainerOnly) {
            verboseReportProjectStatus(state, project, status);
            reportAndStoreErrors(state, projectPath, getConfigFileParsingDiagnostics(config));
            projectPendingBuild.delete(projectPath);
            // Do nothing
            continue;
        }

        return {
            kind: InvalidatedProjectKind.Build,
            status,
            project,
            projectPath,
            projectIndex,
            config,
        };
    }

    return undefined;
}

function createInvalidatedProjectWithInfo<T extends BuilderProgram>(
    state: SolutionBuilderState<T>,
    info: InvalidateProjectCreateInfo,
    buildOrder: AnyBuildOrder,
) {
    verboseReportProjectStatus(state, info.project, info.status);
    return info.kind !== InvalidatedProjectKind.UpdateOutputFileStamps ?
        createBuildOrUpdateInvalidedProject(
            state,
            info.project,
            info.projectPath,
            info.projectIndex,
            info.config,
            info.status,
            buildOrder as BuildOrder,
        ) :
        createUpdateOutputFileStampsProject(
            state,
            info.project,
            info.projectPath,
            info.config,
            buildOrder as BuildOrder,
        );
}

function getNextInvalidatedProject<T extends BuilderProgram>(
    state: SolutionBuilderState<T>,
    buildOrder: AnyBuildOrder,
    reportQueue: boolean,
): InvalidatedProject<T> | undefined {
    const info = getNextInvalidatedProjectCreateInfo(state, buildOrder, reportQueue);
    if (!info) return info;
    return createInvalidatedProjectWithInfo(state, info, buildOrder);
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
) {
    if (program) {
        if (state.host.afterProgramEmitAndDiagnostics) {
            state.host.afterProgramEmitAndDiagnostics(program);
        }
        program.releaseProgram();
    }
    state.projectCompilerOptions = state.baseCompilerOptions;
}

function isFileWatcherWithModifiedTime(value: FileWatcherWithModifiedTime | Date): value is FileWatcherWithModifiedTime {
    return !!(value as FileWatcherWithModifiedTime).watcher;
}

function getModifiedTime<T extends BuilderProgram>(state: SolutionBuilderState<T>, fileName: string): Date {
    const path = toPath(state, fileName);
    const existing = state.filesWatched.get(path);
    if (state.watch && !!existing) {
        if (!isFileWatcherWithModifiedTime(existing)) return existing;
        if (existing.modifiedTime) return existing.modifiedTime;
    }
    // In watch mode we store the modified times in the cache
    // This is either Date | FileWatcherWithModifiedTime because we query modified times first and
    // then after complete compilation of the project, watch the files so we dont want to loose these modified times.
    const result = ts_getModifiedTime(state.host, fileName);
    if (state.watch) {
        if (existing) (existing as FileWatcherWithModifiedTime).modifiedTime = result;
        else state.filesWatched.set(path, result);
    }
    return result;
}

function watchFile<T extends BuilderProgram>(state: SolutionBuilderState<T>, file: string, callback: FileWatcherCallback, pollingInterval: PollingInterval, options: WatchOptions | undefined, watchType: WatchType, project?: ResolvedConfigFileName): FileWatcher {
    const path = toPath(state, file);
    const existing = state.filesWatched.get(path);
    if (existing && isFileWatcherWithModifiedTime(existing)) {
        existing.callbacks.push(callback);
    }
    else {
        const watcher = state.watchFile(
            file,
            (fileName, eventKind, modifiedTime) => {
                const existing = Debug.checkDefined(state.filesWatched.get(path));
                Debug.assert(isFileWatcherWithModifiedTime(existing));
                existing.modifiedTime = modifiedTime;
                existing.callbacks.forEach(cb => cb(fileName, eventKind, modifiedTime));
            },
            pollingInterval,
            options,
            watchType,
            project,
        );
        state.filesWatched.set(path, { callbacks: [callback], watcher, modifiedTime: existing });
    }

    return {
        close: () => {
            const existing = Debug.checkDefined(state.filesWatched.get(path));
            Debug.assert(isFileWatcherWithModifiedTime(existing));
            if (existing.callbacks.length === 1) {
                state.filesWatched.delete(path);
                closeFileWatcherOf(existing);
            }
            else {
                unorderedRemoveItem(existing.callbacks, callback);
            }
        },
    };
}

function getOutputTimeStampMap<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolvedConfigFilePath: ResolvedConfigFilePath) {
    // Output timestamps are stored only in watch mode
    if (!state.watch) return undefined;
    let result = state.outputTimeStamps.get(resolvedConfigFilePath);
    if (!result) state.outputTimeStamps.set(resolvedConfigFilePath, result = new Map());
    return result;
}

function getBuildInfoCacheEntry<T extends BuilderProgram>(state: SolutionBuilderState<T>, buildInfoPath: string, resolvedConfigPath: ResolvedConfigFilePath) {
    const path = toPath(state, buildInfoPath);
    const existing = state.buildInfoCache.get(resolvedConfigPath);
    return existing?.path === path ? existing : undefined;
}

function getBuildInfo<T extends BuilderProgram>(state: SolutionBuilderState<T>, buildInfoPath: string, resolvedConfigPath: ResolvedConfigFilePath, modifiedTime: Date | undefined): BuildInfo | undefined {
    const path = toPath(state, buildInfoPath);
    const existing = state.buildInfoCache.get(resolvedConfigPath);
    if (existing !== undefined && existing.path === path) {
        return existing.buildInfo || undefined;
    }
    const value = state.readFileWithCache(buildInfoPath);
    const buildInfo = value ? ts_getBuildInfo(buildInfoPath, value) : undefined;
    state.buildInfoCache.set(resolvedConfigPath, { path, buildInfo: buildInfo || false, modifiedTime: modifiedTime || missingFileModifiedTime });
    return buildInfo;
}

function checkConfigFileUpToDateStatus<T extends BuilderProgram>(state: SolutionBuilderState<T>, configFile: string, oldestOutputFileTime: Date, oldestOutputFileName: string): Status.OutOfDateWithSelf | undefined {
    // Check tsconfig time
    const tsconfigTime = getModifiedTime(state, configFile);
    if (oldestOutputFileTime < tsconfigTime) {
        return {
            type: UpToDateStatusType.OutOfDateWithSelf,
            outOfDateOutputFileName: oldestOutputFileName,
            newerInputFileName: configFile,
        };
    }
}

function getUpToDateStatusWorker<T extends BuilderProgram>(state: SolutionBuilderState<T>, project: ParsedCommandLine, resolvedPath: ResolvedConfigFilePath): UpToDateStatus {
    // Container if no files are specified in the project
    if (isSolutionConfig(project)) return { type: UpToDateStatusType.ContainerOnly };

    // Fast check to see if reference projects are upto date and error free
    let referenceStatuses;
    const force = !!state.options.force;
    if (project.projectReferences) {
        state.projectStatus.set(resolvedPath, { type: UpToDateStatusType.ComputingUpstream });
        for (const ref of project.projectReferences) {
            const resolvedRef = resolveProjectReferencePath(ref);
            const resolvedRefPath = toResolvedConfigFilePath(state, resolvedRef);
            const resolvedConfig = parseConfigFile(state, resolvedRef, resolvedRefPath)!;
            const refStatus = getUpToDateStatus(state, resolvedConfig, resolvedRefPath);

            // Its a circular reference ignore the status of this project
            if (
                refStatus.type === UpToDateStatusType.ComputingUpstream ||
                refStatus.type === UpToDateStatusType.ContainerOnly
            ) { // Container only ignore this project
                continue;
            }

            // An upstream project is blocked
            if (
                state.options.stopBuildOnErrors && (
                    refStatus.type === UpToDateStatusType.Unbuildable ||
                    refStatus.type === UpToDateStatusType.UpstreamBlocked
                )
            ) {
                return {
                    type: UpToDateStatusType.UpstreamBlocked,
                    upstreamProjectName: ref.path,
                    upstreamProjectBlocked: refStatus.type === UpToDateStatusType.UpstreamBlocked,
                };
            }

            if (!force) (referenceStatuses ||= []).push({ ref, refStatus, resolvedRefPath, resolvedConfig });
        }
    }
    if (force) return { type: UpToDateStatusType.ForceBuild };

    // Check buildinfo first
    const { host } = state;
    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(project.options)!;
    const isIncremental = isIncrementalCompilation(project.options);
    let buildInfoCacheEntry = getBuildInfoCacheEntry(state, buildInfoPath, resolvedPath);
    const buildInfoTime = buildInfoCacheEntry?.modifiedTime || ts_getModifiedTime(host, buildInfoPath);
    if (buildInfoTime === missingFileModifiedTime) {
        if (!buildInfoCacheEntry) {
            state.buildInfoCache.set(resolvedPath, {
                path: toPath(state, buildInfoPath),
                buildInfo: false,
                modifiedTime: buildInfoTime,
            });
        }
        return {
            type: UpToDateStatusType.OutputMissing,
            missingOutputFileName: buildInfoPath,
        };
    }

    const buildInfo = getBuildInfo(state, buildInfoPath, resolvedPath, buildInfoTime);
    if (!buildInfo) {
        // Error reading buildInfo
        return {
            type: UpToDateStatusType.ErrorReadingFile,
            fileName: buildInfoPath,
        };
    }
    const incrementalBuildInfo = isIncremental && isIncrementalBuildInfo(buildInfo) ? buildInfo : undefined;
    if ((incrementalBuildInfo || !isIncremental) && buildInfo.version !== version) {
        return {
            type: UpToDateStatusType.TsVersionOutputOfDate,
            version: buildInfo.version,
        };
    }

    if (
        !project.options.noCheck &&
        ((buildInfo as IncrementalBuildInfo | NonIncrementalBuildInfo).errors || // TODO: syntax errors????
            (buildInfo as IncrementalBuildInfo | NonIncrementalBuildInfo).checkPending)
    ) {
        return {
            type: UpToDateStatusType.OutOfDateBuildInfoWithErrors,
            buildInfoFile: buildInfoPath,
        };
    }

    if (incrementalBuildInfo) {
        // If there are errors, we need to build project again to report it
        if (
            !project.options.noCheck &&
            (
                incrementalBuildInfo.changeFileSet?.length ||
                incrementalBuildInfo.semanticDiagnosticsPerFile?.length ||
                (
                    getEmitDeclarations(project.options) &&
                    incrementalBuildInfo.emitDiagnosticsPerFile?.length
                )
            )
        ) {
            return {
                type: UpToDateStatusType.OutOfDateBuildInfoWithErrors,
                buildInfoFile: buildInfoPath,
            };
        }

        // If there are pending changes that are not emitted, project is out of date
        if (
            !project.options.noEmit &&
            (
                incrementalBuildInfo.changeFileSet?.length ||
                (incrementalBuildInfo as IncrementalMultiFileEmitBuildInfo).affectedFilesPendingEmit?.length ||
                (incrementalBuildInfo as IncrementalBundleEmitBuildInfo).pendingEmit !== undefined
            )
        ) {
            return {
                type: UpToDateStatusType.OutOfDateBuildInfoWithPendingEmit,
                buildInfoFile: buildInfoPath,
            };
        }

        // Has not emitted some of the files, project is out of date
        if (
            (
                !project.options.noEmit ||
                (project.options.noEmit && getEmitDeclarations(project.options))
            ) &&
            getPendingEmitKindWithSeen(
                project.options,
                incrementalBuildInfo.options || {},
                /*emitOnlyDtsFiles*/ undefined,
                !!project.options.noEmit,
            )
        ) {
            return {
                type: UpToDateStatusType.OutOfDateOptions,
                buildInfoFile: buildInfoPath,
            };
        }
    }

    // Check input files
    let oldestOutputFileTime = buildInfoTime;
    let oldestOutputFileName = buildInfoPath;
    let newestInputFileName: string = undefined!;
    let newestInputFileTime = minimumDate;
    /** True if input file has changed timestamp but text is not changed, we can then do only timestamp updates on output to make it look up-to-date later */
    let pseudoInputUpToDate = false;
    const seenRoots = new Set<Path>();
    let buildInfoVersionMap: BuildInfoFileVersionMap | undefined;
    // Get timestamps of input files
    for (const inputFile of project.fileNames) {
        const inputTime = getModifiedTime(state, inputFile);
        if (inputTime === missingFileModifiedTime) {
            return {
                type: UpToDateStatusType.Unbuildable,
                reason: `${inputFile} does not exist`,
            };
        }

        const inputPath = toPath(state, inputFile);
        // If an buildInfo is older than the newest input, we can stop checking
        if (buildInfoTime < inputTime) {
            let version: string | undefined;
            let currentVersion: string | undefined;
            if (incrementalBuildInfo) {
                // Read files and see if they are same, read is anyways cached
                if (!buildInfoVersionMap) buildInfoVersionMap = getBuildInfoFileVersionMap(incrementalBuildInfo, buildInfoPath, host);
                const resolvedInputPath = buildInfoVersionMap.roots.get(inputPath);
                version = buildInfoVersionMap.fileInfos.get(resolvedInputPath ?? inputPath);
                const text = version ? state.readFileWithCache(resolvedInputPath ?? inputFile) : undefined;
                currentVersion = text !== undefined ? getSourceFileVersionAsHashFromText(host, text) : undefined;
                if (version && version === currentVersion) pseudoInputUpToDate = true;
            }

            if (!version || version !== currentVersion) {
                return {
                    type: UpToDateStatusType.OutOfDateWithSelf,
                    outOfDateOutputFileName: buildInfoPath,
                    newerInputFileName: inputFile,
                };
            }
        }

        if (inputTime > newestInputFileTime) {
            newestInputFileName = inputFile;
            newestInputFileTime = inputTime;
        }

        seenRoots.add(inputPath);
    }

    let existingRoot;
    if (incrementalBuildInfo) {
        if (!buildInfoVersionMap) buildInfoVersionMap = getBuildInfoFileVersionMap(incrementalBuildInfo, buildInfoPath, host);
        existingRoot = forEachEntry(
            buildInfoVersionMap.roots,
            // File was root file when project was built but its not any more
            (_resolved, existingRoot) => !seenRoots.has(existingRoot) ? existingRoot : undefined,
        );
    }
    else {
        existingRoot = forEach(
            getNonIncrementalBuildInfoRoots(buildInfo, buildInfoPath, host),
            root => !seenRoots.has(root) ? root : undefined,
        );
    }
    if (existingRoot) {
        return {
            type: UpToDateStatusType.OutOfDateRoots,
            buildInfoFile: buildInfoPath,
            inputFile: existingRoot,
        };
    }

    // Now see if all outputs are newer than the newest input
    // Dont check output timestamps if we have buildinfo telling us output is uptodate
    if (!isIncremental) {
        // Collect the expected outputs of this project
        const outputs = getAllProjectOutputs(project, !host.useCaseSensitiveFileNames());
        const outputTimeStampMap = getOutputTimeStampMap(state, resolvedPath);
        for (const output of outputs) {
            if (output === buildInfoPath) continue;
            const path = toPath(state, output);
            // Output is missing; can stop checking
            let outputTime = outputTimeStampMap?.get(path);
            if (!outputTime) {
                outputTime = ts_getModifiedTime(state.host, output);
                outputTimeStampMap?.set(path, outputTime);
            }

            if (outputTime === missingFileModifiedTime) {
                return {
                    type: UpToDateStatusType.OutputMissing,
                    missingOutputFileName: output,
                };
            }

            // If an output is older than the newest input, we can stop checking
            if (outputTime < newestInputFileTime) {
                return {
                    type: UpToDateStatusType.OutOfDateWithSelf,
                    outOfDateOutputFileName: output,
                    newerInputFileName: newestInputFileName,
                };
            }

            // No need to get newestDeclarationFileContentChangedTime since thats needed only for composite projects
            // And composite projects are the only ones that can be referenced
            if (outputTime < oldestOutputFileTime) {
                oldestOutputFileTime = outputTime;
                oldestOutputFileName = output;
            }
        }
    }

    /** Inputs are up-to-date, just need either timestamp update to make it look up-to-date */
    let pseudoUpToDate = false;
    if (referenceStatuses) {
        for (const { ref, refStatus, resolvedConfig, resolvedRefPath } of referenceStatuses) {
            // If the upstream project's newest file is older than our oldest output, we
            // can't be out of date because of it
            if ((refStatus as Status.UpToDate).newestInputFileTime && (refStatus as Status.UpToDate).newestInputFileTime! <= oldestOutputFileTime) {
                continue;
            }

            // Check if tsbuildinfo path is shared, then we need to rebuild
            if (hasSameBuildInfo(state, buildInfoCacheEntry ??= state.buildInfoCache.get(resolvedPath)!, resolvedRefPath)) {
                return {
                    type: UpToDateStatusType.OutOfDateWithUpstream,
                    outOfDateOutputFileName: buildInfoPath,
                    newerProjectName: ref.path,
                };
            }

            // If the upstream project has only change .d.ts files, and we've built
            // *after* those files, then we're "psuedo up to date" and eligible for a fast rebuild
            const newestDeclarationFileContentChangedTime = getLatestChangedDtsTime(state, resolvedConfig.options, resolvedRefPath);
            if (newestDeclarationFileContentChangedTime && newestDeclarationFileContentChangedTime <= oldestOutputFileTime) {
                pseudoUpToDate = true;
                continue;
            }

            // We have an output older than an upstream output - we are out of date
            Debug.assert(oldestOutputFileName !== undefined, "Should have an oldest output filename here");
            return {
                type: UpToDateStatusType.OutOfDateWithUpstream,
                outOfDateOutputFileName: oldestOutputFileName,
                newerProjectName: ref.path,
            };
        }
    }

    // Check tsconfig time
    const configStatus = checkConfigFileUpToDateStatus(state, project.options.configFilePath!, oldestOutputFileTime, oldestOutputFileName);
    if (configStatus) return configStatus;

    // Check extended config time
    const extendedConfigStatus = forEach(project.options.configFile!.extendedSourceFiles || emptyArray, configFile => checkConfigFileUpToDateStatus(state, configFile, oldestOutputFileTime, oldestOutputFileName));
    if (extendedConfigStatus) return extendedConfigStatus;

    // Check package file time
    const packageJsonLookups = state.lastCachedPackageJsonLookups.get(resolvedPath);
    const dependentPackageFileStatus = packageJsonLookups && forEachKey(
        packageJsonLookups,
        path => checkConfigFileUpToDateStatus(state, path, oldestOutputFileTime, oldestOutputFileName),
    );
    if (dependentPackageFileStatus) return dependentPackageFileStatus;

    // Up to date
    return {
        type: pseudoUpToDate ?
            UpToDateStatusType.UpToDateWithUpstreamTypes :
            pseudoInputUpToDate ?
            UpToDateStatusType.UpToDateWithInputFileText :
            UpToDateStatusType.UpToDate,
        newestInputFileTime,
        newestInputFileName,
        oldestOutputFileName,
    };
}

function hasSameBuildInfo<T extends BuilderProgram>(state: SolutionBuilderState<T>, buildInfoCacheEntry: BuildInfoCacheEntry, resolvedRefPath: ResolvedConfigFilePath) {
    const refBuildInfo = state.buildInfoCache.get(resolvedRefPath)!;
    return refBuildInfo.path === buildInfoCacheEntry.path;
}

function getUpToDateStatus<T extends BuilderProgram>(state: SolutionBuilderState<T>, project: ParsedCommandLine | undefined, resolvedPath: ResolvedConfigFilePath): UpToDateStatus {
    if (project === undefined) {
        return { type: UpToDateStatusType.Unbuildable, reason: "config file deleted mid-build" };
    }

    const prior = state.projectStatus.get(resolvedPath);
    if (prior !== undefined) {
        return prior;
    }

    performance.mark("SolutionBuilder::beforeUpToDateCheck");
    const actual = getUpToDateStatusWorker(state, project, resolvedPath);
    performance.mark("SolutionBuilder::afterUpToDateCheck");
    performance.measure("SolutionBuilder::Up-to-date check", "SolutionBuilder::beforeUpToDateCheck", "SolutionBuilder::afterUpToDateCheck");
    state.projectStatus.set(resolvedPath, actual);
    return actual;
}

function updateOutputTimestampsWorker<T extends BuilderProgram>(
    state: SolutionBuilderState<T>,
    proj: ParsedCommandLine,
    projectPath: ResolvedConfigFilePath,
    verboseMessage: DiagnosticMessage,
    skipOutputs?: Map<Path, string>,
) {
    if (proj.options.noEmit) return;
    let now: Date | undefined;
    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(proj.options)!;
    const isIncremental = isIncrementalCompilation(proj.options);
    if (buildInfoPath && isIncremental) {
        // For incremental projects, only buildinfo needs to be upto date with timestamp check
        // as we dont check output files for up-to-date ness
        if (!skipOutputs?.has(toPath(state, buildInfoPath))) {
            if (!!state.options.verbose) reportStatus(state, verboseMessage, proj.options.configFilePath!);
            state.host.setModifiedTime(buildInfoPath, now = getCurrentTime(state.host));
            getBuildInfoCacheEntry(state, buildInfoPath, projectPath)!.modifiedTime = now;
        }
        state.outputTimeStamps.delete(projectPath);
        return;
    }

    const { host } = state;
    const outputs = getAllProjectOutputs(proj, !host.useCaseSensitiveFileNames());
    const outputTimeStampMap = getOutputTimeStampMap(state, projectPath);
    const modifiedOutputs = outputTimeStampMap ? new Set<Path>() : undefined;
    if (!skipOutputs || outputs.length !== skipOutputs.size) {
        let reportVerbose = !!state.options.verbose;
        for (const file of outputs) {
            const path = toPath(state, file);
            if (skipOutputs?.has(path)) continue;
            if (reportVerbose) {
                reportVerbose = false;
                reportStatus(state, verboseMessage, proj.options.configFilePath!);
            }
            host.setModifiedTime(file, now ||= getCurrentTime(state.host));
            if (file === buildInfoPath) getBuildInfoCacheEntry(state, buildInfoPath, projectPath)!.modifiedTime = now;
            // Store output timestamps in a map because non incremental build will need to check them to determine up-to-dateness
            else if (outputTimeStampMap) {
                outputTimeStampMap.set(path, now);
                modifiedOutputs!.add(path);
            }
        }
    }

    // Clear out timestamps not in output list any more
    outputTimeStampMap?.forEach((_value, key) => {
        if (!skipOutputs?.has(key) && !modifiedOutputs!.has(key)) outputTimeStampMap.delete(key);
    });
}

function getLatestChangedDtsTime<T extends BuilderProgram>(state: SolutionBuilderState<T>, options: CompilerOptions, resolvedConfigPath: ResolvedConfigFilePath) {
    if (!options.composite) return undefined;
    const entry = Debug.checkDefined(state.buildInfoCache.get(resolvedConfigPath));
    if (entry.latestChangedDtsTime !== undefined) return entry.latestChangedDtsTime || undefined;
    const latestChangedDtsTime = entry.buildInfo && isIncrementalBuildInfo(entry.buildInfo) && entry.buildInfo.latestChangedDtsFile ?
        state.host.getModifiedTime(getNormalizedAbsolutePath(entry.buildInfo.latestChangedDtsFile, getDirectoryPath(entry.path))) :
        undefined;
    entry.latestChangedDtsTime = latestChangedDtsTime || false;
    return latestChangedDtsTime;
}

function updateOutputTimestamps<T extends BuilderProgram>(state: SolutionBuilderState<T>, proj: ParsedCommandLine, resolvedPath: ResolvedConfigFilePath) {
    if (state.options.dry) {
        return reportStatus(state, Diagnostics.A_non_dry_build_would_update_timestamps_for_output_of_project_0, proj.options.configFilePath!);
    }
    updateOutputTimestampsWorker(state, proj, resolvedPath, Diagnostics.Updating_output_timestamps_of_project_0);
    state.projectStatus.set(resolvedPath, {
        type: UpToDateStatusType.UpToDate,
        oldestOutputFileName: getFirstProjectOutput(proj, !state.host.useCaseSensitiveFileNames()),
    });
}

function queueReferencingProjects<T extends BuilderProgram>(
    state: SolutionBuilderState<T>,
    project: ResolvedConfigFileName,
    projectPath: ResolvedConfigFilePath,
    projectIndex: number,
    config: ParsedCommandLine,
    buildOrder: readonly ResolvedConfigFileName[],
    buildResult: BuildResultFlags,
) {
    // Queue only if there are no errors
    if (state.options.stopBuildOnErrors && (buildResult & BuildResultFlags.AnyErrors)) return;
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
            // If declaration output is changed, build the project
            // otherwise mark the project UpToDateWithUpstreamTypes so it updates output time stamps
            const status = state.projectStatus.get(nextProjectPath);
            if (status) {
                switch (status.type) {
                    case UpToDateStatusType.UpToDate:
                        if (buildResult & BuildResultFlags.DeclarationOutputUnchanged) {
                            status.type = UpToDateStatusType.UpToDateWithUpstreamTypes;
                            break;
                        }
                    // falls through

                    case UpToDateStatusType.UpToDateWithInputFileText:
                    case UpToDateStatusType.UpToDateWithUpstreamTypes:
                        if (!(buildResult & BuildResultFlags.DeclarationOutputUnchanged)) {
                            state.projectStatus.set(nextProjectPath, {
                                type: UpToDateStatusType.OutOfDateWithUpstream,
                                outOfDateOutputFileName: status.oldestOutputFileName,
                                newerProjectName: project,
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
            addProjToQueue(state, nextProjectPath, ProgramUpdateLevel.Update);
            break;
        }
    }
}

function build<T extends BuilderProgram>(state: SolutionBuilderState<T>, project?: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformers?: (project: string) => CustomTransformers, onlyReferences?: boolean): ExitStatus {
    performance.mark("SolutionBuilder::beforeBuild");
    const result = buildWorker(state, project, cancellationToken, writeFile, getCustomTransformers, onlyReferences);
    performance.mark("SolutionBuilder::afterBuild");
    performance.measure("SolutionBuilder::Build", "SolutionBuilder::beforeBuild", "SolutionBuilder::afterBuild");
    return result;
}

function buildWorker<T extends BuilderProgram>(state: SolutionBuilderState<T>, project: string | undefined, cancellationToken: CancellationToken | undefined, writeFile: WriteFileCallback | undefined, getCustomTransformers: ((project: string) => CustomTransformers) | undefined, onlyReferences: boolean | undefined): ExitStatus {
    const buildOrder = getBuildOrderFor(state, project, onlyReferences);
    if (!buildOrder) return ExitStatus.InvalidProject_OutputsSkipped;

    setupInitialBuild(state, cancellationToken);

    let reportQueue = true;
    let successfulProjects = 0;
    while (true) {
        const invalidatedProject = getNextInvalidatedProject(state, buildOrder, reportQueue);
        if (!invalidatedProject) break;
        reportQueue = false;
        invalidatedProject.done(cancellationToken, writeFile, getCustomTransformers?.(invalidatedProject.project));
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

function clean<T extends BuilderProgram>(state: SolutionBuilderState<T>, project?: string, onlyReferences?: boolean): ExitStatus {
    performance.mark("SolutionBuilder::beforeClean");
    const result = cleanWorker(state, project, onlyReferences);
    performance.mark("SolutionBuilder::afterClean");
    performance.measure("SolutionBuilder::Clean", "SolutionBuilder::beforeClean", "SolutionBuilder::afterClean");
    return result;
}

function cleanWorker<T extends BuilderProgram>(state: SolutionBuilderState<T>, project: string | undefined, onlyReferences: boolean | undefined) {
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
                    invalidateProject(state, resolvedPath, ProgramUpdateLevel.Update);
                }
            }
        }
    }

    if (filesToDelete) {
        reportStatus(state, Diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0, filesToDelete.map(f => `\r\n * ${f}`).join(""));
    }

    return ExitStatus.Success;
}

function invalidateProject<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolved: ResolvedConfigFilePath, updateLevel: ProgramUpdateLevel) {
    // If host implements getParsedCommandLine, we cant get list of files from parseConfigFileHost
    if (state.host.getParsedCommandLine && updateLevel === ProgramUpdateLevel.RootNamesAndUpdate) {
        updateLevel = ProgramUpdateLevel.Full;
    }
    if (updateLevel === ProgramUpdateLevel.Full) {
        state.configFileCache.delete(resolved);
        state.buildOrder = undefined;
    }
    state.needsSummary = true;
    clearProjectStatus(state, resolved);
    addProjToQueue(state, resolved, updateLevel);
    enableCache(state);
}

function invalidateProjectAndScheduleBuilds<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolvedPath: ResolvedConfigFilePath, updateLevel: ProgramUpdateLevel) {
    state.reportFileChangeDetected = true;
    invalidateProject(state, resolvedPath, updateLevel);
    scheduleBuildInvalidatedProject(state, 250, /*changeDetected*/ true);
}

function scheduleBuildInvalidatedProject<T extends BuilderProgram>(state: SolutionBuilderState<T>, time: number, changeDetected: boolean) {
    const { hostWithWatch } = state;
    if (!hostWithWatch.setTimeout || !hostWithWatch.clearTimeout) {
        return;
    }
    if (state.timerToBuildInvalidatedProject) {
        hostWithWatch.clearTimeout(state.timerToBuildInvalidatedProject);
    }
    state.timerToBuildInvalidatedProject = hostWithWatch.setTimeout(buildNextInvalidatedProject, time, "timerToBuildInvalidatedProject", state, changeDetected);
}

function buildNextInvalidatedProject<T extends BuilderProgram>(_timeoutType: string, state: SolutionBuilderState<T>, changeDetected: boolean) {
    performance.mark("SolutionBuilder::beforeBuild");
    const buildOrder = buildNextInvalidatedProjectWorker(state, changeDetected);
    performance.mark("SolutionBuilder::afterBuild");
    performance.measure("SolutionBuilder::Build", "SolutionBuilder::beforeBuild", "SolutionBuilder::afterBuild");
    if (buildOrder) reportErrorSummary(state, buildOrder);
}

function buildNextInvalidatedProjectWorker<T extends BuilderProgram>(state: SolutionBuilderState<T>, changeDetected: boolean) {
    state.timerToBuildInvalidatedProject = undefined;
    if (state.reportFileChangeDetected) {
        state.reportFileChangeDetected = false;
        state.projectErrorsReported.clear();
        reportWatchStatus(state, Diagnostics.File_change_detected_Starting_incremental_compilation);
    }
    let projectsBuilt = 0;
    const buildOrder = getBuildOrder(state);
    const invalidatedProject = getNextInvalidatedProject(state, buildOrder, /*reportQueue*/ false);
    if (invalidatedProject) {
        invalidatedProject.done();
        projectsBuilt++;
        while (state.projectPendingBuild.size) {
            // If already scheduled, skip
            if (state.timerToBuildInvalidatedProject) return;
            // Before scheduling check if the next project needs build
            const info = getNextInvalidatedProjectCreateInfo(state, buildOrder, /*reportQueue*/ false);
            if (!info) break; // Nothing to build any more
            if (info.kind !== InvalidatedProjectKind.UpdateOutputFileStamps && (changeDetected || projectsBuilt === 5)) {
                // Schedule next project for build
                scheduleBuildInvalidatedProject(state, 100, /*changeDetected*/ false);
                return;
            }
            const project = createInvalidatedProjectWithInfo(state, info, buildOrder);
            project.done();
            if (info.kind !== InvalidatedProjectKind.UpdateOutputFileStamps) projectsBuilt++;
        }
    }
    disableCache(state);
    return buildOrder;
}

function watchConfigFile<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine | undefined) {
    if (!state.watch || state.allWatchedConfigFiles.has(resolvedPath)) return;
    state.allWatchedConfigFiles.set(
        resolvedPath,
        watchFile(
            state,
            resolved,
            () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ProgramUpdateLevel.Full),
            PollingInterval.High,
            parsed?.watchOptions,
            WatchType.ConfigFile,
            resolved,
        ),
    );
}

function watchExtendedConfigFiles<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine | undefined) {
    updateSharedExtendedConfigFileWatcher(
        resolvedPath,
        parsed?.options,
        state.allWatchedExtendedConfigFiles,
        (extendedConfigFileName, extendedConfigFilePath) =>
            watchFile(
                state,
                extendedConfigFileName,
                () => state.allWatchedExtendedConfigFiles.get(extendedConfigFilePath)?.projects.forEach(projectConfigFilePath => invalidateProjectAndScheduleBuilds(state, projectConfigFilePath, ProgramUpdateLevel.Full)),
                PollingInterval.High,
                parsed?.watchOptions,
                WatchType.ExtendedConfigFile,
            ),
        fileName => toPath(state, fileName),
    );
}

function watchWildCardDirectories<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
    if (!state.watch) return;
    updateWatchingWildcardDirectories(
        getOrCreateValueMapFromConfigFileMap(state.allWatchedWildcardDirectories, resolvedPath),
        parsed.wildcardDirectories,
        (dir, flags) =>
            state.watchDirectory(
                dir,
                fileOrDirectory => {
                    if (
                        isIgnoredFileFromWildCardWatching({
                            watchedDirPath: toPath(state, dir),
                            fileOrDirectory,
                            fileOrDirectoryPath: toPath(state, fileOrDirectory),
                            configFileName: resolved,
                            currentDirectory: state.compilerHost.getCurrentDirectory(),
                            options: parsed.options,
                            program: state.builderPrograms.get(resolvedPath) || getCachedParsedConfigFile(state, resolvedPath)?.fileNames,
                            useCaseSensitiveFileNames: state.parseConfigFileHost.useCaseSensitiveFileNames,
                            writeLog: s => state.writeLog(s),
                            toPath: fileName => toPath(state, fileName),
                        })
                    ) return;

                    invalidateProjectAndScheduleBuilds(state, resolvedPath, ProgramUpdateLevel.RootNamesAndUpdate);
                },
                flags,
                parsed?.watchOptions,
                WatchType.WildcardDirectory,
                resolved,
            ),
    );
}

function watchInputFiles<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
    if (!state.watch) return;
    mutateMap(
        getOrCreateValueMapFromConfigFileMap(state.allWatchedInputFiles, resolvedPath),
        new Set(parsed.fileNames),
        {
            createNewValue: input =>
                watchFile(
                    state,
                    input,
                    () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ProgramUpdateLevel.Update),
                    PollingInterval.Low,
                    parsed?.watchOptions,
                    WatchType.SourceFile,
                    resolved,
                ),
            onDeleteValue: closeFileWatcher,
        },
    );
}

function watchPackageJsonFiles<T extends BuilderProgram>(state: SolutionBuilderState<T>, resolved: ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ParsedCommandLine) {
    if (!state.watch || !state.lastCachedPackageJsonLookups) return;
    mutateMap(
        getOrCreateValueMapFromConfigFileMap(state.allWatchedPackageJsonFiles, resolvedPath),
        state.lastCachedPackageJsonLookups.get(resolvedPath),
        {
            createNewValue: input =>
                watchFile(
                    state,
                    input,
                    () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ProgramUpdateLevel.Update),
                    PollingInterval.High,
                    parsed?.watchOptions,
                    WatchType.PackageJson,
                    resolved,
                ),
            onDeleteValue: closeFileWatcher,
        },
    );
}

function startWatching<T extends BuilderProgram>(state: SolutionBuilderState<T>, buildOrder: AnyBuildOrder) {
    if (!state.watchAllProjectsPending) return;
    performance.mark("SolutionBuilder::beforeWatcherCreation");
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
    performance.mark("SolutionBuilder::afterWatcherCreation");
    performance.measure("SolutionBuilder::Watcher creation", "SolutionBuilder::beforeWatcherCreation", "SolutionBuilder::afterWatcherCreation");
}

function stopWatching<T extends BuilderProgram>(state: SolutionBuilderState<T>) {
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
function createSolutionBuilderWorker<T extends BuilderProgram>(watch: false, host: SolutionBuilderHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilder<T>;
function createSolutionBuilderWorker<T extends BuilderProgram>(watch: true, host: SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilder<T>;
function createSolutionBuilderWorker<T extends BuilderProgram>(watch: boolean, hostOrHostWithWatch: SolutionBuilderHost<T> | SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], options: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilder<T> {
    const state = createSolutionBuilderState(watch, hostOrHostWithWatch, rootNames, options, baseWatchOptions);
    return {
        build: (project, cancellationToken, writeFile, getCustomTransformers) => build(state, project, cancellationToken, writeFile, getCustomTransformers),
        clean: project => clean(state, project),
        buildReferences: (project, cancellationToken, writeFile, getCustomTransformers) => build(state, project, cancellationToken, writeFile, getCustomTransformers, /*onlyReferences*/ true),
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
        invalidateProject: (configFilePath, updateLevel) => invalidateProject(state, configFilePath, updateLevel || ProgramUpdateLevel.Update),
        close: () => stopWatching(state),
    };
}

function relName<T extends BuilderProgram>(state: SolutionBuilderState<T>, path: string): string {
    return convertToRelativePath(path, state.compilerHost.getCurrentDirectory(), state.compilerHost.getCanonicalFileName);
}

function reportStatus<T extends BuilderProgram>(state: SolutionBuilderState<T>, message: DiagnosticMessage, ...args: DiagnosticArguments) {
    state.host.reportSolutionBuilderStatus(createCompilerDiagnostic(message, ...args));
}

function reportWatchStatus<T extends BuilderProgram>(state: SolutionBuilderState<T>, message: DiagnosticMessage, ...args: DiagnosticArguments) {
    state.hostWithWatch.onWatchStatusChange?.(createCompilerDiagnostic(message, ...args), state.host.getNewLine(), state.baseCompilerOptions);
}

function reportErrors<T extends BuilderProgram>({ host }: SolutionBuilderState<T>, errors: readonly Diagnostic[]) {
    errors.forEach(err => host.reportDiagnostic(err));
}

function reportAndStoreErrors<T extends BuilderProgram>(state: SolutionBuilderState<T>, proj: ResolvedConfigFilePath, errors: readonly Diagnostic[]) {
    reportErrors(state, errors);
    state.projectErrorsReported.set(proj, true);
    if (errors.length) {
        state.diagnostics.set(proj, errors);
    }
}

function reportParseConfigFileDiagnostic<T extends BuilderProgram>(state: SolutionBuilderState<T>, proj: ResolvedConfigFilePath) {
    reportAndStoreErrors(state, proj, [state.configFileCache.get(proj) as Diagnostic]);
}

function reportErrorSummary<T extends BuilderProgram>(state: SolutionBuilderState<T>, buildOrder: AnyBuildOrder) {
    if (!state.needsSummary) return;
    state.needsSummary = false;
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
}

/**
 * Report the build ordering inferred from the current project graph if we're in verbose mode
 */
function reportBuildQueue<T extends BuilderProgram>(state: SolutionBuilderState<T>, buildQueue: readonly ResolvedConfigFileName[]) {
    if (state.options.verbose) {
        reportStatus(state, Diagnostics.Projects_in_this_build_Colon_0, buildQueue.map(s => "\r\n    * " + relName(state, s)).join(""));
    }
}

function reportUpToDateStatus<T extends BuilderProgram>(state: SolutionBuilderState<T>, configFileName: string, status: UpToDateStatus) {
    switch (status.type) {
        case UpToDateStatusType.OutOfDateWithSelf:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2,
                relName(state, configFileName),
                relName(state, status.outOfDateOutputFileName),
                relName(state, status.newerInputFileName),
            );
        case UpToDateStatusType.OutOfDateWithUpstream:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2,
                relName(state, configFileName),
                relName(state, status.outOfDateOutputFileName),
                relName(state, status.newerProjectName),
            );
        case UpToDateStatusType.OutputMissing:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                relName(state, configFileName),
                relName(state, status.missingOutputFileName),
            );
        case UpToDateStatusType.ErrorReadingFile:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_there_was_error_reading_file_1,
                relName(state, configFileName),
                relName(state, status.fileName),
            );
        case UpToDateStatusType.OutOfDateBuildInfoWithPendingEmit:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_some_of_the_changes_were_not_emitted,
                relName(state, configFileName),
                relName(state, status.buildInfoFile),
            );
        case UpToDateStatusType.OutOfDateBuildInfoWithErrors:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_program_needs_to_report_errors,
                relName(state, configFileName),
                relName(state, status.buildInfoFile),
            );
        case UpToDateStatusType.OutOfDateOptions:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_there_is_change_in_compilerOptions,
                relName(state, configFileName),
                relName(state, status.buildInfoFile),
            );
        case UpToDateStatusType.OutOfDateRoots:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_file_2_was_root_file_of_compilation_but_not_any_more,
                relName(state, configFileName),
                relName(state, status.buildInfoFile),
                relName(state, status.inputFile),
            );
        case UpToDateStatusType.UpToDate:
            if (status.newestInputFileTime !== undefined) {
                return reportStatus(
                    state,
                    Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_output_2,
                    relName(state, configFileName),
                    relName(state, status.newestInputFileName || ""),
                    relName(state, status.oldestOutputFileName || ""),
                );
            }
            // Don't report anything for "up to date because it was already built" -- too verbose
            break;
        case UpToDateStatusType.UpToDateWithUpstreamTypes:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
                relName(state, configFileName),
            );
        case UpToDateStatusType.UpToDateWithInputFileText:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_up_to_date_but_needs_to_update_timestamps_of_output_files_that_are_older_than_input_files,
                relName(state, configFileName),
            );
        case UpToDateStatusType.UpstreamOutOfDate:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_its_dependency_1_is_out_of_date,
                relName(state, configFileName),
                relName(state, status.upstreamProjectName),
            );
        case UpToDateStatusType.UpstreamBlocked:
            return reportStatus(
                state,
                status.upstreamProjectBlocked ?
                    Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_was_not_built :
                    Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors,
                relName(state, configFileName),
                relName(state, status.upstreamProjectName),
            );
        case UpToDateStatusType.Unbuildable:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_1,
                relName(state, configFileName),
                status.reason,
            );
        case UpToDateStatusType.TsVersionOutputOfDate:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2,
                relName(state, configFileName),
                status.version,
                version,
            );
        case UpToDateStatusType.ForceBuild:
            return reportStatus(
                state,
                Diagnostics.Project_0_is_being_forcibly_rebuilt,
                relName(state, configFileName),
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
function verboseReportProjectStatus<T extends BuilderProgram>(state: SolutionBuilderState<T>, configFileName: string, status: UpToDateStatus) {
    if (state.options.verbose) {
        reportUpToDateStatus(state, configFileName, status);
    }
}
