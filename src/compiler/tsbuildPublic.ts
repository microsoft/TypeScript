import * as ts from "./_namespaces/ts";

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
    /*@internal*/ explainFiles?: boolean;
    /*@internal*/ pretty?: boolean;
    incremental?: boolean;
    assumeChangesOnlyAffectDirectDependencies?: boolean;

    traceResolution?: boolean;
    /* @internal */ diagnostics?: boolean;
    /* @internal */ extendedDiagnostics?: boolean;
    /* @internal */ locale?: string;
    /* @internal */ generateCpuProfile?: string;
    /* @internal */ generateTrace?: string;

    [option: string]: ts.CompilerOptionsValue | undefined;
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
export type ResolvedConfigFilePath = ts.ResolvedConfigFileName & ts.Path;

function getOrCreateValueFromConfigFileMap<T>(configFileMap: ts.ESMap<ResolvedConfigFilePath, T>, resolved: ResolvedConfigFilePath, createT: () => T): T {
    const existingValue = configFileMap.get(resolved);
    let newValue: T | undefined;
    if (!existingValue) {
        newValue = createT();
        configFileMap.set(resolved, newValue);
    }
    return existingValue || newValue!;
}

function getOrCreateValueMapFromConfigFileMap<K extends string, V>(configFileMap: ts.ESMap<ResolvedConfigFilePath, ts.ESMap<K, V>>, resolved: ResolvedConfigFilePath): ts.ESMap<K, V> {
    return getOrCreateValueFromConfigFileMap(configFileMap, resolved, () => new ts.Map());
}

/*@internal*/
/** Helper to use now method instead of current date for testing purposes to get consistent baselines */
export function getCurrentTime(host: { now?(): Date; }) {
    return host.now ? host.now() : new Date();
}

export type ReportEmitErrorSummary = (errorCount: number, filesInError: (ReportFileInError | undefined)[]) => void;

export interface ReportFileInError {
    fileName: string;
    line: number;
}

export interface SolutionBuilderHostBase<T extends ts.BuilderProgram> extends ts.ProgramHost<T> {
    createDirectory?(path: string): void;
    /**
     * Should provide create directory and writeFile if done of invalidatedProjects is not invoked with
     * writeFileCallback
     */
    writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
    getCustomTransformers?: (project: string) => ts.CustomTransformers | undefined;

    getModifiedTime(fileName: string): Date | undefined;
    setModifiedTime(fileName: string, date: Date): void;
    deleteFile(fileName: string): void;
    getParsedCommandLine?(fileName: string): ts.ParsedCommandLine | undefined;

    reportDiagnostic: ts.DiagnosticReporter; // Technically we want to move it out and allow steps of actions on Solution, but for now just merge stuff in build host here
    reportSolutionBuilderStatus: ts.DiagnosticReporter;

    // TODO: To do better with watch mode and normal build mode api that creates program and emits files
    // This currently helps enable --diagnostics and --extendedDiagnostics
    afterProgramEmitAndDiagnostics?(program: T): void;
    /*@internal*/ afterEmitBundle?(config: ts.ParsedCommandLine): void;

    // For testing
    /*@internal*/ now?(): Date;
}

export interface SolutionBuilderHost<T extends ts.BuilderProgram> extends SolutionBuilderHostBase<T> {
    reportErrorSummary?: ReportEmitErrorSummary;
}

export interface SolutionBuilderWithWatchHost<T extends ts.BuilderProgram> extends SolutionBuilderHostBase<T>, ts.WatchHost {
}

/*@internal*/
export type BuildOrder = readonly ts.ResolvedConfigFileName[];
/*@internal*/
export interface CircularBuildOrder {
    buildOrder: BuildOrder;
    circularDiagnostics: readonly ts.Diagnostic[];
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

export interface SolutionBuilder<T extends ts.BuilderProgram> {
    build(project?: string, cancellationToken?: ts.CancellationToken, writeFile?: ts.WriteFileCallback, getCustomTransformers?: (project: string) => ts.CustomTransformers): ts.ExitStatus;
    clean(project?: string): ts.ExitStatus;
    buildReferences(project: string, cancellationToken?: ts.CancellationToken, writeFile?: ts.WriteFileCallback, getCustomTransformers?: (project: string) => ts.CustomTransformers): ts.ExitStatus;
    cleanReferences(project?: string): ts.ExitStatus;
    getNextInvalidatedProject(cancellationToken?: ts.CancellationToken): InvalidatedProject<T> | undefined;

    // Currently used for testing but can be made public if needed:
    /*@internal*/ getBuildOrder(): AnyBuildOrder;

    // Testing only
    /*@internal*/ getUpToDateStatusOfProject(project: string): ts.UpToDateStatus;
    /*@internal*/ invalidateProject(configFilePath: ResolvedConfigFilePath, reloadLevel?: ts.ConfigFileProgramReloadLevel): void;
    /*@internal*/ close(): void;
}

/**
 * Create a function that reports watch status by writing to the system and handles the formating of the diagnostic
 */
export function createBuilderStatusReporter(system: ts.System, pretty?: boolean): ts.DiagnosticReporter {
    return diagnostic => {
        let output = pretty ? `[${ts.formatColorAndReset(ts.getLocaleTimeString(system), ts.ForegroundColorEscapeSequences.Grey)}] ` : `${ts.getLocaleTimeString(system)} - `;
        output += `${ts.flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${system.newLine + system.newLine}`;
        system.write(output);
    };
}

function createSolutionBuilderHostBase<T extends ts.BuilderProgram>(system: ts.System, createProgram: ts.CreateProgram<T> | undefined, reportDiagnostic?: ts.DiagnosticReporter, reportSolutionBuilderStatus?: ts.DiagnosticReporter) {
    const host = ts.createProgramHost(system, createProgram) as SolutionBuilderHostBase<T>;
    host.getModifiedTime = system.getModifiedTime ? path => system.getModifiedTime!(path) : ts.returnUndefined;
    host.setModifiedTime = system.setModifiedTime ? (path, date) => system.setModifiedTime!(path, date) : ts.noop;
    host.deleteFile = system.deleteFile ? path => system.deleteFile!(path) : ts.noop;
    host.reportDiagnostic = reportDiagnostic || ts.createDiagnosticReporter(system);
    host.reportSolutionBuilderStatus = reportSolutionBuilderStatus || createBuilderStatusReporter(system);
    host.now = ts.maybeBind(system, system.now); // For testing
    return host;
}

export function createSolutionBuilderHost<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(system = ts.sys, createProgram?: ts.CreateProgram<T>, reportDiagnostic?: ts.DiagnosticReporter, reportSolutionBuilderStatus?: ts.DiagnosticReporter, reportErrorSummary?: ReportEmitErrorSummary) {
    const host = createSolutionBuilderHostBase(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderHost<T>;
    host.reportErrorSummary = reportErrorSummary;
    return host;
}

export function createSolutionBuilderWithWatchHost<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>(system = ts.sys, createProgram?: ts.CreateProgram<T>, reportDiagnostic?: ts.DiagnosticReporter, reportSolutionBuilderStatus?: ts.DiagnosticReporter, reportWatchStatus?: ts.WatchStatusReporter) {
    const host = createSolutionBuilderHostBase(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderWithWatchHost<T>;
    const watchHost = ts.createWatchHost(system, reportWatchStatus);
    ts.copyProperties(host, watchHost);
    return host;
}

function getCompilerOptionsOfBuildOptions(buildOptions: BuildOptions): ts.CompilerOptions {
    const result = {} as ts.CompilerOptions;
    ts.commonOptionsWithBuild.forEach(option => {
        if (ts.hasProperty(buildOptions, option.name)) result[option.name] = buildOptions[option.name];
    });
    return result;
}

export function createSolutionBuilder<T extends ts.BuilderProgram>(host: SolutionBuilderHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilder<T> {
    return createSolutionBuilderWorker(/*watch*/ false, host, rootNames, defaultOptions);
}

export function createSolutionBuilderWithWatch<T extends ts.BuilderProgram>(host: SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: ts.WatchOptions): SolutionBuilder<T> {
    return createSolutionBuilderWorker(/*watch*/ true, host, rootNames, defaultOptions, baseWatchOptions);
}

type ConfigFileCacheEntry = ts.ParsedCommandLine | ts.Diagnostic;
interface SolutionBuilderStateCache {
    originalReadFile: ts.CompilerHost["readFile"];
    originalFileExists: ts.CompilerHost["fileExists"];
    originalDirectoryExists: ts.CompilerHost["directoryExists"];
    originalCreateDirectory: ts.CompilerHost["createDirectory"];
    originalWriteFile: ts.CompilerHost["writeFile"] | undefined;
    originalReadFileWithCache: ts.CompilerHost["readFile"];
    originalGetSourceFile: ts.CompilerHost["getSourceFile"];
}

interface FileWatcherWithModifiedTime {
    callbacks: ts.FileWatcherCallback[];
    watcher: ts.FileWatcher;
    // modified time can be undefined if it was not queried
    // Eg. if input file timestamp was not queried because tsbuildinfo was missing but watcher for that file is created
    modifiedTime: Date | undefined;
}

interface BuildInfoCacheEntry {
    path: ts.Path;
    buildInfo: ts.BuildInfo | false;
    modifiedTime: Date;
    latestChangedDtsTime?: Date | false;
}

interface SolutionBuilderState<T extends ts.BuilderProgram = ts.BuilderProgram> extends ts.WatchFactory<ts.WatchType, ts.ResolvedConfigFileName> {
    readonly host: SolutionBuilderHost<T>;
    readonly hostWithWatch: SolutionBuilderWithWatchHost<T>;
    readonly currentDirectory: string;
    readonly getCanonicalFileName: ts.GetCanonicalFileName;
    readonly parseConfigFileHost: ts.ParseConfigFileHost;
    readonly write: ((s: string) => void) | undefined;

    // State of solution
    readonly options: BuildOptions;
    readonly baseCompilerOptions: ts.CompilerOptions;
    readonly rootNames: readonly string[];
    readonly baseWatchOptions: ts.WatchOptions | undefined;

    readonly resolvedConfigFilePaths: ts.ESMap<string, ResolvedConfigFilePath>;
    readonly configFileCache: ts.ESMap<ResolvedConfigFilePath, ConfigFileCacheEntry>;
    /** Map from config file name to up-to-date status */
    readonly projectStatus: ts.ESMap<ResolvedConfigFilePath, ts.UpToDateStatus>;
    readonly extendedConfigCache: ts.ESMap<string, ts.ExtendedConfigCacheEntry>;
    readonly buildInfoCache: ts.ESMap<ResolvedConfigFilePath, BuildInfoCacheEntry>;

    readonly builderPrograms: ts.ESMap<ResolvedConfigFilePath, T>;
    readonly diagnostics: ts.ESMap<ResolvedConfigFilePath, readonly ts.Diagnostic[]>;
    readonly projectPendingBuild: ts.ESMap<ResolvedConfigFilePath, ts.ConfigFileProgramReloadLevel>;
    readonly projectErrorsReported: ts.ESMap<ResolvedConfigFilePath, true>;

    readonly compilerHost: ts.CompilerHost;
    readonly moduleResolutionCache: ts.ModuleResolutionCache | undefined;
    readonly typeReferenceDirectiveResolutionCache: ts.TypeReferenceDirectiveResolutionCache | undefined;

    // Mutable state
    buildOrder: AnyBuildOrder | undefined;
    readFileWithCache: (f: string) => string | undefined;
    projectCompilerOptions: ts.CompilerOptions;
    cache: SolutionBuilderStateCache | undefined;
    allProjectBuildPending: boolean;
    needsSummary: boolean;
    watchAllProjectsPending: boolean;

    // Watch state
    readonly watch: boolean;
    readonly allWatchedWildcardDirectories: ts.ESMap<ResolvedConfigFilePath, ts.ESMap<string, ts.WildcardDirectoryWatcher>>;
    readonly allWatchedInputFiles: ts.ESMap<ResolvedConfigFilePath, ts.ESMap<ts.Path, ts.FileWatcher>>;
    readonly allWatchedConfigFiles: ts.ESMap<ResolvedConfigFilePath, ts.FileWatcher>;
    readonly allWatchedExtendedConfigFiles: ts.ESMap<ts.Path, ts.SharedExtendedConfigFileWatcher<ResolvedConfigFilePath>>;
    readonly allWatchedPackageJsonFiles: ts.ESMap<ResolvedConfigFilePath, ts.ESMap<ts.Path, ts.FileWatcher>>;
    readonly filesWatched: ts.ESMap<ts.Path, FileWatcherWithModifiedTime | Date>;
    readonly outputTimeStamps: ts.ESMap<ResolvedConfigFilePath, ts.ESMap<ts.Path, Date>>;

    readonly lastCachedPackageJsonLookups: ts.ESMap<ResolvedConfigFilePath, readonly (readonly [ts.Path, object | boolean])[] | undefined>;

    timerToBuildInvalidatedProject: any;
    reportFileChangeDetected: boolean;
    writeLog: (s: string) => void;
}

function createSolutionBuilderState<T extends ts.BuilderProgram>(watch: boolean, hostOrHostWithWatch: SolutionBuilderHost<T> | SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], options: BuildOptions, baseWatchOptions: ts.WatchOptions | undefined): SolutionBuilderState<T> {
    const host = hostOrHostWithWatch as SolutionBuilderHost<T>;
    const hostWithWatch = hostOrHostWithWatch as SolutionBuilderWithWatchHost<T>;
    const currentDirectory = host.getCurrentDirectory();
    const getCanonicalFileName = ts.createGetCanonicalFileName(host.useCaseSensitiveFileNames());

    // State of the solution
    const baseCompilerOptions = getCompilerOptionsOfBuildOptions(options);
    const compilerHost = ts.createCompilerHostFromProgramHost(host, () => state.projectCompilerOptions) as ts.CompilerHost & ts.ReadBuildProgramHost;
    ts.setGetSourceFileAsHashVersioned(compilerHost, host);
    compilerHost.getParsedCommandLine = fileName => parseConfigFile(state, fileName as ts.ResolvedConfigFileName, toResolvedConfigFilePath(state, fileName as ts.ResolvedConfigFileName));
    compilerHost.resolveModuleNames = ts.maybeBind(host, host.resolveModuleNames);
    compilerHost.resolveTypeReferenceDirectives = ts.maybeBind(host, host.resolveTypeReferenceDirectives);
    compilerHost.getModuleResolutionCache = ts.maybeBind(host, host.getModuleResolutionCache);
    const moduleResolutionCache = !compilerHost.resolveModuleNames ? ts.createModuleResolutionCache(currentDirectory, getCanonicalFileName) : undefined;
    const typeReferenceDirectiveResolutionCache = !compilerHost.resolveTypeReferenceDirectives ? ts.createTypeReferenceDirectiveResolutionCache(currentDirectory, getCanonicalFileName, /*options*/ undefined, moduleResolutionCache?.getPackageJsonInfoCache()) : undefined;
    if (!compilerHost.resolveModuleNames) {
        const loader = (moduleName: string, resolverMode: ts.ModuleKind.CommonJS | ts.ModuleKind.ESNext | undefined, containingFile: string, redirectedReference: ts.ResolvedProjectReference | undefined) => ts.resolveModuleName(moduleName, containingFile, state.projectCompilerOptions, compilerHost, moduleResolutionCache, redirectedReference, resolverMode).resolvedModule!;
        compilerHost.resolveModuleNames = (moduleNames, containingFile, _reusedNames, redirectedReference, _options, containingSourceFile) =>
            ts.loadWithModeAwareCache<ts.ResolvedModuleFull>(ts.Debug.checkEachDefined(moduleNames), ts.Debug.checkDefined(containingSourceFile), containingFile, redirectedReference, loader);
        compilerHost.getModuleResolutionCache = () => moduleResolutionCache;
    }
    if (!compilerHost.resolveTypeReferenceDirectives) {
        const loader = (moduleName: string, containingFile: string, redirectedReference: ts.ResolvedProjectReference | undefined, containingFileMode: ts.SourceFile["impliedNodeFormat"] | undefined) => ts.resolveTypeReferenceDirective(moduleName, containingFile, state.projectCompilerOptions, compilerHost, redirectedReference, state.typeReferenceDirectiveResolutionCache, containingFileMode).resolvedTypeReferenceDirective!;
        compilerHost.resolveTypeReferenceDirectives = (typeReferenceDirectiveNames, containingFile, redirectedReference, _options, containingFileMode) =>
            ts.loadWithTypeDirectiveCache<ts.ResolvedTypeReferenceDirective>(ts.Debug.checkEachDefined(typeReferenceDirectiveNames), containingFile, redirectedReference, containingFileMode, loader);
    }
    compilerHost.getBuildInfo = (fileName, configFilePath) => getBuildInfo(state, fileName, toResolvedConfigFilePath(state, configFilePath as ts.ResolvedConfigFileName), /*modifiedTime*/ undefined);

    const { watchFile, watchDirectory, writeLog } = ts.createWatchFactory<ts.ResolvedConfigFileName>(hostWithWatch, options);

    const state: SolutionBuilderState<T> = {
        host,
        hostWithWatch,
        currentDirectory,
        getCanonicalFileName,
        parseConfigFileHost: ts.parseConfigHostFromCompilerHostLike(host),
        write: ts.maybeBind(host, host.trace),

        // State of solution
        options,
        baseCompilerOptions,
        rootNames,
        baseWatchOptions,

        resolvedConfigFilePaths: new ts.Map(),
        configFileCache: new ts.Map(),
        projectStatus: new ts.Map(),
        extendedConfigCache: new ts.Map(),
        buildInfoCache: new ts.Map(),
        outputTimeStamps: new ts.Map(),

        builderPrograms: new ts.Map(),
        diagnostics: new ts.Map(),
        projectPendingBuild: new ts.Map(),
        projectErrorsReported: new ts.Map(),

        compilerHost,
        moduleResolutionCache,
        typeReferenceDirectiveResolutionCache,

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
        allWatchedWildcardDirectories: new ts.Map(),
        allWatchedInputFiles: new ts.Map(),
        allWatchedConfigFiles: new ts.Map(),
        allWatchedExtendedConfigFiles: new ts.Map(),
        allWatchedPackageJsonFiles: new ts.Map(),
        filesWatched: new ts.Map(),

        lastCachedPackageJsonLookups: new ts.Map(),

        timerToBuildInvalidatedProject: undefined,
        reportFileChangeDetected: false,
        watchFile,
        watchDirectory,
        writeLog,
    };

    return state;
}

function toPath(state: SolutionBuilderState, fileName: string) {
    return ts.toPath(fileName, state.currentDirectory, state.getCanonicalFileName);
}

function toResolvedConfigFilePath(state: SolutionBuilderState, fileName: ts.ResolvedConfigFileName): ResolvedConfigFilePath {
    const { resolvedConfigFilePaths } = state;
    const path = resolvedConfigFilePaths.get(fileName);
    if (path !== undefined) return path;

    const resolvedPath = toPath(state, fileName) as ResolvedConfigFilePath;
    resolvedConfigFilePaths.set(fileName, resolvedPath);
    return resolvedPath;
}

function isParsedCommandLine(entry: ConfigFileCacheEntry): entry is ts.ParsedCommandLine {
    return !!(entry as ts.ParsedCommandLine).options;
}

function getCachedParsedConfigFile(state: SolutionBuilderState, configFilePath: ResolvedConfigFilePath): ts.ParsedCommandLine | undefined {
    const value = state.configFileCache.get(configFilePath);
    return value && isParsedCommandLine(value) ? value : undefined;
}

function parseConfigFile(state: SolutionBuilderState, configFileName: ts.ResolvedConfigFileName, configFilePath: ResolvedConfigFilePath): ts.ParsedCommandLine | undefined {
    const { configFileCache } = state;
    const value = configFileCache.get(configFilePath);
    if (value) {
        return isParsedCommandLine(value) ? value : undefined;
    }

    ts.performance.mark("SolutionBuilder::beforeConfigFileParsing");
    let diagnostic: ts.Diagnostic | undefined;
    const { parseConfigFileHost, baseCompilerOptions, baseWatchOptions, extendedConfigCache, host } = state;
    let parsed: ts.ParsedCommandLine | undefined;
    if (host.getParsedCommandLine) {
        parsed = host.getParsedCommandLine(configFileName);
        if (!parsed) diagnostic = ts.createCompilerDiagnostic(ts.Diagnostics.File_0_not_found, configFileName);
    }
    else {
        parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = d => diagnostic = d;
        parsed = ts.getParsedCommandLineOfConfigFile(configFileName, baseCompilerOptions, parseConfigFileHost, extendedConfigCache, baseWatchOptions);
        parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = ts.noop;
    }
    configFileCache.set(configFilePath, parsed || diagnostic!);
    ts.performance.mark("SolutionBuilder::afterConfigFileParsing");
    ts.performance.measure("SolutionBuilder::Config file parsing", "SolutionBuilder::beforeConfigFileParsing", "SolutionBuilder::afterConfigFileParsing");
    return parsed;
}

function resolveProjectName(state: SolutionBuilderState, name: string): ts.ResolvedConfigFileName {
    return ts.resolveConfigFileProjectName(ts.resolvePath(state.currentDirectory, name));
}

function createBuildOrder(state: SolutionBuilderState, roots: readonly ts.ResolvedConfigFileName[]): AnyBuildOrder {
    const temporaryMarks = new ts.Map<ResolvedConfigFilePath, true>();
    const permanentMarks = new ts.Map<ResolvedConfigFilePath, true>();
    const circularityReportStack: string[] = [];
    let buildOrder: ts.ResolvedConfigFileName[] | undefined;
    let circularDiagnostics: ts.Diagnostic[] | undefined;
    for (const root of roots) {
        visit(root);
    }

    return circularDiagnostics ?
        { buildOrder: buildOrder || ts.emptyArray, circularDiagnostics } :
        buildOrder || ts.emptyArray;

    function visit(configFileName: ts.ResolvedConfigFileName, inCircularContext?: boolean) {
        const projPath = toResolvedConfigFilePath(state, configFileName);
        // Already visited
        if (permanentMarks.has(projPath)) return;
        // Circular
        if (temporaryMarks.has(projPath)) {
            if (!inCircularContext) {
                (circularDiagnostics || (circularDiagnostics = [])).push(
                    ts.createCompilerDiagnostic(
                        ts.Diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0,
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
    const currentProjects = new ts.Map(
        getBuildOrderFromAnyBuildOrder(buildOrder).map(
            resolved => [toResolvedConfigFilePath(state, resolved), true as const])
    );

    const noopOnDelete = { onDeleteValue: ts.noop };
    // Config file cache
    ts.mutateMapSkippingNewValues(state.configFileCache, currentProjects, noopOnDelete);
    ts.mutateMapSkippingNewValues(state.projectStatus, currentProjects, noopOnDelete);
    ts.mutateMapSkippingNewValues(state.builderPrograms, currentProjects, noopOnDelete);
    ts.mutateMapSkippingNewValues(state.diagnostics, currentProjects, noopOnDelete);
    ts.mutateMapSkippingNewValues(state.projectPendingBuild, currentProjects, noopOnDelete);
    ts.mutateMapSkippingNewValues(state.projectErrorsReported, currentProjects, noopOnDelete);
    ts.mutateMapSkippingNewValues(state.buildInfoCache, currentProjects, noopOnDelete);
    ts.mutateMapSkippingNewValues(state.outputTimeStamps, currentProjects, noopOnDelete);

    // Remove watches for the program no longer in the solution
    if (state.watch) {
        ts.mutateMapSkippingNewValues(
            state.allWatchedConfigFiles,
            currentProjects,
            { onDeleteValue: ts.closeFileWatcher }
        );

        state.allWatchedExtendedConfigFiles.forEach(watcher => {
            watcher.projects.forEach(project => {
                if (!currentProjects.has(project)) {
                    watcher.projects.delete(project);
                }
            });
            watcher.close();
        });

        ts.mutateMapSkippingNewValues(
            state.allWatchedWildcardDirectories,
            currentProjects,
            { onDeleteValue: existingMap => existingMap.forEach(ts.closeFileWatcherOf) }
        );

        ts.mutateMapSkippingNewValues(
            state.allWatchedInputFiles,
            currentProjects,
            { onDeleteValue: existingMap => existingMap.forEach(ts.closeFileWatcher) }
        );

        ts.mutateMapSkippingNewValues(
            state.allWatchedPackageJsonFiles,
            currentProjects,
            { onDeleteValue: existingMap => existingMap.forEach(ts.closeFileWatcher) }
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
        const projectIndex = ts.findIndex(
            buildOrderFromState,
            configFileName => toResolvedConfigFilePath(state, configFileName) === projectPath
        );
        if (projectIndex === -1) return undefined;
    }
    const buildOrder = resolvedProject ? createBuildOrder(state, [resolvedProject]) as BuildOrder : buildOrderFromState;
    ts.Debug.assert(!isCircularBuildOrder(buildOrder));
    ts.Debug.assert(!onlyReferences || resolvedProject !== undefined);
    ts.Debug.assert(!onlyReferences || buildOrder[buildOrder.length - 1] === resolvedProject);
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
    } = ts.changeCompilerHostLikeToUseCache(
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

function clearProjectStatus(state: SolutionBuilderState, resolved: ResolvedConfigFilePath) {
    state.projectStatus.delete(resolved);
    state.diagnostics.delete(resolved);
}

function addProjToQueue({ projectPendingBuild }: SolutionBuilderState, proj: ResolvedConfigFilePath, reloadLevel: ts.ConfigFileProgramReloadLevel) {
    const value = projectPendingBuild.get(proj);
    if (value === undefined) {
        projectPendingBuild.set(proj, reloadLevel);
    }
    else if (value < reloadLevel) {
        projectPendingBuild.set(proj, reloadLevel);
    }
}

function setupInitialBuild(state: SolutionBuilderState, cancellationToken: ts.CancellationToken | undefined) {
    // Set initial build if not already built
    if (!state.allProjectBuildPending) return;
    state.allProjectBuildPending = false;
    if (state.options.watch) reportWatchStatus(state, ts.Diagnostics.Starting_compilation_in_watch_mode);
    enableCache(state);
    const buildOrder = getBuildOrderFromAnyBuildOrder(getBuildOrder(state));
    buildOrder.forEach(configFileName =>
        state.projectPendingBuild.set(
            toResolvedConfigFilePath(state, configFileName),
            ts.ConfigFileProgramReloadLevel.None
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
    readonly project: ts.ResolvedConfigFileName;
    /*@internal*/ readonly projectPath: ResolvedConfigFilePath;
    /*@internal*/ readonly buildOrder: readonly ts.ResolvedConfigFileName[];
    /**
     *  To dispose this project and ensure that all the necessary actions are taken and state is updated accordingly
     */
    done(cancellationToken?: ts.CancellationToken, writeFile?: ts.WriteFileCallback, customTransformers?: ts.CustomTransformers): ts.ExitStatus;
    getCompilerOptions(): ts.CompilerOptions;
    getCurrentDirectory(): string;
}

export interface UpdateOutputFileStampsProject extends InvalidatedProjectBase {
    readonly kind: InvalidatedProjectKind.UpdateOutputFileStamps;
    updateOutputFileStatmps(): void;
}

export interface BuildInvalidedProject<T extends ts.BuilderProgram> extends InvalidatedProjectBase {
    readonly kind: InvalidatedProjectKind.Build;
    /*
     * Emitting with this builder program without the api provided for this project
     * can result in build system going into invalid state as files written reflect the state of the project
     */
    getBuilderProgram(): T | undefined;
    getProgram(): ts.Program | undefined;
    getSourceFile(fileName: string): ts.SourceFile | undefined;
    getSourceFiles(): readonly ts.SourceFile[];
    getOptionsDiagnostics(cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
    getGlobalDiagnostics(cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
    getConfigFileParsingDiagnostics(): readonly ts.Diagnostic[];
    getSyntacticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
    getAllDependencies(sourceFile: ts.SourceFile): readonly string[];
    getSemanticDiagnostics(sourceFile?: ts.SourceFile, cancellationToken?: ts.CancellationToken): readonly ts.Diagnostic[];
    getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: ts.CancellationToken, ignoreSourceFile?: (sourceFile: ts.SourceFile) => boolean): ts.AffectedFileResult<readonly ts.Diagnostic[]>;
    /*
     * Calling emit directly with targetSourceFile and emitOnlyDtsFiles set to true is not advised since
     * emit in build system is responsible in updating status of the project
     * If called with targetSourceFile and emitOnlyDtsFiles set to true, the emit just passes to underlying builder and
     * wont reflect the status of file as being emitted in the builder
     * (if that emit of that source file is required it would be emitted again when making sure invalidated project is completed)
     * This emit is not considered actual emit (and hence uptodate status is not reflected if
     */
    emit(targetSourceFile?: ts.SourceFile, writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: ts.CustomTransformers): ts.EmitResult | undefined;
    // TODO(shkamat):: investigate later if we can emit even when there are declaration diagnostics
    // emitNextAffectedFile(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult>;
}

export interface UpdateBundleProject<T extends ts.BuilderProgram> extends InvalidatedProjectBase {
    readonly kind: InvalidatedProjectKind.UpdateBundle;
    emit(writeFile?: ts.WriteFileCallback, customTransformers?: ts.CustomTransformers): ts.EmitResult | BuildInvalidedProject<T> | undefined;
}

export type InvalidatedProject<T extends ts.BuilderProgram> = UpdateOutputFileStampsProject | BuildInvalidedProject<T> | UpdateBundleProject<T>;

function doneInvalidatedProject(
    state: SolutionBuilderState,
    projectPath: ResolvedConfigFilePath
) {
    state.projectPendingBuild.delete(projectPath);
    return state.diagnostics.has(projectPath) ?
        ts.ExitStatus.DiagnosticsPresent_OutputsSkipped :
        ts.ExitStatus.Success;
}

function createUpdateOutputFileStampsProject(
    state: SolutionBuilderState,
    project: ts.ResolvedConfigFileName,
    projectPath: ResolvedConfigFilePath,
    config: ts.ParsedCommandLine,
    buildOrder: readonly ts.ResolvedConfigFileName[]
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
            ts.performance.mark("SolutionBuilder::Timestamps only updates");
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

function createBuildOrUpdateInvalidedProject<T extends ts.BuilderProgram>(
    kind: InvalidatedProjectKind.Build | InvalidatedProjectKind.UpdateBundle,
    state: SolutionBuilderState<T>,
    project: ts.ResolvedConfigFileName,
    projectPath: ResolvedConfigFilePath,
    projectIndex: number,
    config: ts.ParsedCommandLine,
    buildOrder: readonly ts.ResolvedConfigFileName[],
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
            getBuilderProgram: () => withProgramOrUndefined(ts.identity),
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
                        ((program as any as ts.SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile) &&
                        (program as any as ts.SemanticDiagnosticsBuilderProgram).getSemanticDiagnosticsOfNextAffectedFile(cancellationToken, ignoreSourceFile)
                ),
            emit: (targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers) => {
                if (targetSourceFile || emitOnlyDtsFiles) {
                    return withProgramOrUndefined(
                        program => program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers || state.host.getCustomTransformers?.(project))
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
            emit: (writeFile: ts.WriteFileCallback | undefined, customTransformers: ts.CustomTransformers | undefined) => {
                if (step !== BuildStep.EmitBundle) return invalidatedProjectOfBundle;
                return emitBundle(writeFile, customTransformers);
            },
            done,
        };

    function done(cancellationToken?: ts.CancellationToken, writeFile?: ts.WriteFileCallback, customTransformers?: ts.CustomTransformers) {
        executeSteps(BuildStep.Done, cancellationToken, writeFile, customTransformers);
        if (kind === InvalidatedProjectKind.Build) ts.performance.mark("SolutionBuilder::Projects built");
        else ts.performance.mark("SolutionBuilder::Bundles updated");
        return doneInvalidatedProject(state, projectPath);
    }

    function withProgramOrUndefined<U>(action: (program: T) => U | undefined): U | undefined {
        executeSteps(BuildStep.CreateProgram);
        return program && action(program);
    }

    function withProgramOrEmptyArray<U>(action: (program: T) => readonly U[]): readonly U[] {
        return withProgramOrUndefined(action) || ts.emptyArray;
    }

    function createProgram() {
        ts.Debug.assert(program === undefined);

        if (state.options.dry) {
            reportStatus(state, ts.Diagnostics.A_non_dry_build_would_build_project_0, project);
            buildResult = BuildResultFlags.Success;
            step = BuildStep.QueueReferencingProjects;
            return;
        }

        if (state.options.verbose) reportStatus(state, ts.Diagnostics.Building_project_0, project);

        if (config.fileNames.length === 0) {
            reportAndStoreErrors(state, projectPath, ts.getConfigFileParsingDiagnostics(config));
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
            ts.getConfigFileParsingDiagnostics(config),
            config.projectReferences
        );
        if (state.watch) {
            state.lastCachedPackageJsonLookups.set(projectPath, state.moduleResolutionCache && ts.map(
                state.moduleResolutionCache.getPackageJsonInfoCache().entries(),
                ([path, data]) => ([state.host.realpath && data ? toPath(state, state.host.realpath(path)) : path, data] as const)
            ));

            state.builderPrograms.set(projectPath, program);
        }
        step++;
    }

    function handleDiagnostics(diagnostics: readonly ts.Diagnostic[], errorFlags: BuildResultFlags, errorType: string) {
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

    function getSyntaxDiagnostics(cancellationToken?: ts.CancellationToken) {
        ts.Debug.assertIsDefined(program);
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

    function getSemanticDiagnostics(cancellationToken?: ts.CancellationToken) {
        handleDiagnostics(
            ts.Debug.checkDefined(program).getSemanticDiagnostics(/*sourceFile*/ undefined, cancellationToken),
            BuildResultFlags.TypeErrors,
            "Semantic"
        );
    }

    function emit(writeFileCallback?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, customTransformers?: ts.CustomTransformers): ts.EmitResult {
        ts.Debug.assertIsDefined(program);
        ts.Debug.assert(step === BuildStep.Emit);
        // Before emitting lets backup state, so we can revert it back if there are declaration errors to handle emit and declaration errors correctly
        const saved = program.saveEmitState();
        let declDiagnostics: ts.Diagnostic[] | undefined;
        const reportDeclarationDiagnostics = (d: ts.Diagnostic) => (declDiagnostics || (declDiagnostics = [])).push(d);
        const outputFiles: ts.OutputFile[] = [];
        const { emitResult } = ts.emitFilesAndReportErrors(
            program,
            reportDeclarationDiagnostics,
            /*write*/ undefined,
            /*reportSummary*/ undefined,
            (name, text, writeByteOrderMark, _onError, _sourceFiles, data) => outputFiles.push({ name, text, writeByteOrderMark, buildInfo: data?.buildInfo }),
            cancellationToken,
            /*emitOnlyDts*/ false,
            customTransformers || state.host.getCustomTransformers?.(project)
        );
        // Don't emit .d.ts if there are decl file errors
        if (declDiagnostics) {
            program.restoreEmitState(saved);
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
        const resultFlags = program.hasChangedEmitSignature?.() ? BuildResultFlags.None : BuildResultFlags.DeclarationOutputUnchanged;
        const emitterDiagnostics = ts.createDiagnosticCollection();
        const emittedOutputs = new ts.Map<ts.Path, string>();
        const options = program.getCompilerOptions();
        const isIncremental = ts.isIncrementalCompilation(options);
        let outputTimeStampMap: ts.ESMap<ts.Path, Date> | undefined;
        let now: Date | undefined;
        outputFiles.forEach(({ name, text, writeByteOrderMark, buildInfo }) => {
            const path = toPath(state, name);
            emittedOutputs.set(toPath(state, name), name);
            if (buildInfo) setBuildInfo(state, buildInfo, projectPath, options, resultFlags);
            ts.writeFile(writeFileCallback ? { writeFile: writeFileCallback } : compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
            if (!isIncremental && state.watch) {
                (outputTimeStampMap ||= getOutputTimeStampMap(state, projectPath)!).set(path, now ||= getCurrentTime(state.host));
            }
        });

        finishEmit(
            emitterDiagnostics,
            emittedOutputs,
            outputFiles.length ? outputFiles[0].name : ts.getFirstProjectOutput(config, !host.useCaseSensitiveFileNames()),
            resultFlags
        );
        return emitResult;
    }

    function emitBuildInfo(writeFileCallback?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken): ts.EmitResult {
        ts.Debug.assertIsDefined(program);
        ts.Debug.assert(step === BuildStep.EmitBuildInfo);
        const emitResult = program.emitBuildInfo((name, text, writeByteOrderMark, onError, sourceFiles, data) => {
            if (data?.buildInfo) setBuildInfo(state, data.buildInfo, projectPath, program!.getCompilerOptions(), BuildResultFlags.DeclarationOutputUnchanged);
            if (writeFileCallback) writeFileCallback(name, text, writeByteOrderMark, onError, sourceFiles, data);
            else state.compilerHost.writeFile(name, text, writeByteOrderMark, onError, sourceFiles, data);
        }, cancellationToken);
        if (emitResult.diagnostics.length) {
            reportErrors(state, emitResult.diagnostics);
            state.diagnostics.set(projectPath, [...state.diagnostics.get(projectPath)!, ...emitResult.diagnostics]);
            buildResult = BuildResultFlags.EmitErrors & buildResult!;
        }

        if (emitResult.emittedFiles && state.write) {
            emitResult.emittedFiles.forEach(name => listEmittedFile(state, config, name));
        }
        afterProgramDone(state, program, config);
        step = BuildStep.QueueReferencingProjects;
        return emitResult;
    }

    function finishEmit(
        emitterDiagnostics: ts.DiagnosticCollection,
        emittedOutputs: ts.ESMap<ts.Path, string>,
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

        if (state.write) {
            emittedOutputs.forEach(name => listEmittedFile(state, config, name));
        }

        // Update time stamps for rest of the outputs
        updateOutputTimestampsWorker(state, config, projectPath, ts.Diagnostics.Updating_unchanged_output_timestamps_of_project_0, emittedOutputs);
        state.diagnostics.delete(projectPath);
        state.projectStatus.set(projectPath, {
            type: ts.UpToDateStatusType.UpToDate,
            oldestOutputFileName
        });
        afterProgramDone(state, program, config);
        step = BuildStep.QueueReferencingProjects;
        buildResult = resultFlags;
        return emitDiagnostics;
    }

    function emitBundle(writeFileCallback?: ts.WriteFileCallback, customTransformers?: ts.CustomTransformers): ts.EmitResult | BuildInvalidedProject<T> | undefined {
        ts.Debug.assert(kind === InvalidatedProjectKind.UpdateBundle);
        if (state.options.dry) {
            reportStatus(state, ts.Diagnostics.A_non_dry_build_would_update_output_of_project_0, project);
            buildResult = BuildResultFlags.Success;
            step = BuildStep.QueueReferencingProjects;
            return undefined;
        }

        if (state.options.verbose) reportStatus(state, ts.Diagnostics.Updating_output_of_project_0, project);

        // Update js, and source map
        const { compilerHost } = state;
        state.projectCompilerOptions = config.options;
        const outputFiles = ts.emitUsingBuildInfo(
            config,
            compilerHost,
            ref => {
                const refName = resolveProjectName(state, ref.path);
                return parseConfigFile(state, refName, toResolvedConfigFilePath(state, refName));
            },
            customTransformers || state.host.getCustomTransformers?.(project)
        );

        if (ts.isString(outputFiles)) {
            reportStatus(state, ts.Diagnostics.Cannot_update_output_of_project_0_because_there_was_error_reading_file_1, project, relName(state, outputFiles));
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
        ts.Debug.assert(!!outputFiles.length);
        const emitterDiagnostics = ts.createDiagnosticCollection();
        const emittedOutputs = new ts.Map<ts.Path, string>();
        let resultFlags = BuildResultFlags.DeclarationOutputUnchanged;
        const existingBuildInfo = state.buildInfoCache.get(projectPath)!.buildInfo || undefined;
        outputFiles.forEach(({ name, text, writeByteOrderMark, buildInfo }) => {
            emittedOutputs.set(toPath(state, name), name);
            if (buildInfo) {
                if ((buildInfo.program as ts.ProgramBundleEmitBuildInfo)?.outSignature !== (existingBuildInfo?.program as ts.ProgramBundleEmitBuildInfo)?.outSignature) {
                    resultFlags &= ~BuildResultFlags.DeclarationOutputUnchanged;
                }
                setBuildInfo(state, buildInfo, projectPath, config.options, resultFlags);
            }
            ts.writeFile(writeFileCallback ? { writeFile: writeFileCallback } : compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
        });

        const emitDiagnostics = finishEmit(
            emitterDiagnostics,
            emittedOutputs,
            outputFiles[0].name,
            resultFlags
        );
        return { emitSkipped: false, diagnostics: emitDiagnostics };
    }

    function executeSteps(till: BuildStep, cancellationToken?: ts.CancellationToken, writeFile?: ts.WriteFileCallback, customTransformers?: ts.CustomTransformers) {
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
                    ts.Debug.checkDefined(invalidatedProjectOfBundle).done(cancellationToken, writeFile, customTransformers);
                    step = BuildStep.Done;
                    break;

                case BuildStep.QueueReferencingProjects:
                    queueReferencingProjects(state, project, projectPath, projectIndex, config, buildOrder, ts.Debug.checkDefined(buildResult));
                    step++;
                    break;

                // Should never be done
                case BuildStep.Done:
                default:
                    ts.assertType<BuildStep.Done>(step);

            }
            ts.Debug.assert(step > currentStep);
        }
    }
}

function needsBuild({ options }: SolutionBuilderState, status: ts.UpToDateStatus, config: ts.ParsedCommandLine) {
    if (status.type !== ts.UpToDateStatusType.OutOfDateWithPrepend || options.force) return true;
    return config.fileNames.length === 0 ||
        !!ts.getConfigFileParsingDiagnostics(config).length ||
        !ts.isIncrementalCompilation(config.options);
}

interface InvalidateProjectCreateInfo {
    kind: InvalidatedProjectKind;
    status: ts.UpToDateStatus;
    project: ts.ResolvedConfigFileName;
    projectPath: ResolvedConfigFilePath;
    projectIndex: number;
    config: ts.ParsedCommandLine;
}

function getNextInvalidatedProjectCreateInfo<T extends ts.BuilderProgram>(
    state: SolutionBuilderState<T>,
    buildOrder: AnyBuildOrder,
    reportQueue: boolean
): InvalidateProjectCreateInfo | undefined {
    if (!state.projectPendingBuild.size) return undefined;
    if (isCircularBuildOrder(buildOrder)) return undefined;

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

        if (reloadLevel === ts.ConfigFileProgramReloadLevel.Full) {
            watchConfigFile(state, project, projectPath, config);
            watchExtendedConfigFiles(state, projectPath, config);
            watchWildCardDirectories(state, project, projectPath, config);
            watchInputFiles(state, project, projectPath, config);
            watchPackageJsonFiles(state, project, projectPath, config);
        }
        else if (reloadLevel === ts.ConfigFileProgramReloadLevel.Partial) {
            // Update file names
            config.fileNames = ts.getFileNamesFromConfigSpecs(config.options.configFile!.configFileSpecs!, ts.getDirectoryPath(project), config.options, state.parseConfigFileHost);
            ts.updateErrorForNoInputFiles(config.fileNames, project, config.options.configFile!.configFileSpecs!, config.errors, ts.canJsonReportNoInputFiles(config.raw));
            watchInputFiles(state, project, projectPath, config);
            watchPackageJsonFiles(state, project, projectPath, config);
        }

        const status = getUpToDateStatus(state, config, projectPath);
        if (!options.force) {
            if (status.type === ts.UpToDateStatusType.UpToDate) {
                verboseReportProjectStatus(state, project, status);
                reportAndStoreErrors(state, projectPath, ts.getConfigFileParsingDiagnostics(config));
                projectPendingBuild.delete(projectPath);
                // Up to date, skip
                if (options.dry) {
                    // In a dry build, inform the user of this fact
                    reportStatus(state, ts.Diagnostics.Project_0_is_up_to_date, project);
                }
                continue;
            }

            if (status.type === ts.UpToDateStatusType.UpToDateWithUpstreamTypes || status.type === ts.UpToDateStatusType.UpToDateWithInputFileText) {
                reportAndStoreErrors(state, projectPath, ts.getConfigFileParsingDiagnostics(config));
                return {
                    kind: InvalidatedProjectKind.UpdateOutputFileStamps,
                    status,
                    project,
                    projectPath,
                    projectIndex,
                    config
                };
            }
        }

        if (status.type === ts.UpToDateStatusType.UpstreamBlocked) {
            verboseReportProjectStatus(state, project, status);
            reportAndStoreErrors(state, projectPath, ts.getConfigFileParsingDiagnostics(config));
            projectPendingBuild.delete(projectPath);
            if (options.verbose) {
                reportStatus(
                    state,
                    status.upstreamProjectBlocked ?
                        ts.Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_was_not_built :
                        ts.Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors,
                    project,
                    status.upstreamProjectName
                );
            }
            continue;
        }

        if (status.type === ts.UpToDateStatusType.ContainerOnly) {
            verboseReportProjectStatus(state, project, status);
            reportAndStoreErrors(state, projectPath, ts.getConfigFileParsingDiagnostics(config));
            projectPendingBuild.delete(projectPath);
            // Do nothing
            continue;
        }

        return {
            kind: needsBuild(state, status, config) ?
                InvalidatedProjectKind.Build :
                InvalidatedProjectKind.UpdateBundle,
            status,
            project,
            projectPath,
            projectIndex,
            config,
        };
    }

    return undefined;
}

function createInvalidatedProjectWithInfo<T extends ts.BuilderProgram>(
    state: SolutionBuilderState<T>,
    info: InvalidateProjectCreateInfo,
    buildOrder: AnyBuildOrder,
) {
    verboseReportProjectStatus(state, info.project, info.status);
    return info.kind !== InvalidatedProjectKind.UpdateOutputFileStamps ?
        createBuildOrUpdateInvalidedProject(
            info.kind,
            state,
            info.project,
            info.projectPath,
            info.projectIndex,
            info.config,
            buildOrder as BuildOrder,
        ) :
        createUpdateOutputFileStampsProject(
            state,
            info.project,
            info.projectPath,
            info.config,
            buildOrder as BuildOrder
        );
}

function getNextInvalidatedProject<T extends ts.BuilderProgram>(
    state: SolutionBuilderState<T>,
    buildOrder: AnyBuildOrder,
    reportQueue: boolean
): InvalidatedProject<T> | undefined {
    const info = getNextInvalidatedProjectCreateInfo(state, buildOrder, reportQueue);
    if (!info) return info;
    return createInvalidatedProjectWithInfo(state, info, buildOrder);
}

function listEmittedFile({ write }: SolutionBuilderState, proj: ts.ParsedCommandLine, file: string) {
    if (write && proj.options.listEmittedFiles) {
        write(`TSFILE: ${file}`);
    }
}

function getOldProgram<T extends ts.BuilderProgram>({ options, builderPrograms, compilerHost }: SolutionBuilderState<T>, proj: ResolvedConfigFilePath, parsed: ts.ParsedCommandLine) {
    if (options.force) return undefined;
    const value = builderPrograms.get(proj);
    if (value) return value;
    return ts.readBuilderProgram(parsed.options, compilerHost) as any as T;
}

function afterProgramDone<T extends ts.BuilderProgram>(
    state: SolutionBuilderState<T>,
    program: T | undefined,
    config: ts.ParsedCommandLine
) {
    if (program) {
        if (state.write) ts.listFiles(program, state.write);
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

function buildErrors<T extends ts.BuilderProgram>(
    state: SolutionBuilderState<T>,
    resolvedPath: ResolvedConfigFilePath,
    program: T | undefined,
    config: ts.ParsedCommandLine,
    diagnostics: readonly ts.Diagnostic[],
    buildResult: BuildResultFlags,
    errorType: string,
) {
    // Since buildinfo has changeset and diagnostics when doing multi file emit, only --out cannot emit buildinfo if it has errors
    const canEmitBuildInfo = program && !ts.outFile(program.getCompilerOptions());

    reportAndStoreErrors(state, resolvedPath, diagnostics);
    state.projectStatus.set(resolvedPath, { type: ts.UpToDateStatusType.Unbuildable, reason: `${errorType} errors` });
    if (canEmitBuildInfo) return { buildResult, step: BuildStep.EmitBuildInfo };
    afterProgramDone(state, program, config);
    return { buildResult, step: BuildStep.QueueReferencingProjects };
}

function isFileWatcherWithModifiedTime(value: FileWatcherWithModifiedTime | Date): value is FileWatcherWithModifiedTime {
    return !!(value as FileWatcherWithModifiedTime).watcher;
}

function getModifiedTime(state: SolutionBuilderState, fileName: string): Date {
    const path = toPath(state, fileName);
    const existing = state.filesWatched.get(path);
    if (state.watch && !!existing) {
        if (!isFileWatcherWithModifiedTime(existing)) return existing;
        if (existing.modifiedTime) return existing.modifiedTime;
    }
    // In watch mode we store the modified times in the cache
    // This is either Date | FileWatcherWithModifiedTime because we query modified times first and
    // then after complete compilation of the project, watch the files so we dont want to loose these modified times.
    const result = ts.getModifiedTime(state.host, fileName);
    if (state.watch) {
        if (existing) (existing as FileWatcherWithModifiedTime).modifiedTime = result;
        else state.filesWatched.set(path, result);
    }
    return result;
}

function watchFile(state: SolutionBuilderState, file: string, callback: ts.FileWatcherCallback, pollingInterval: ts.PollingInterval, options: ts.WatchOptions | undefined, watchType: ts.WatchType, project?: ts.ResolvedConfigFileName): ts.FileWatcher {
    const path = toPath(state, file);
    const existing = state.filesWatched.get(path);
    if (existing && isFileWatcherWithModifiedTime(existing)) {
        existing.callbacks.push(callback);
    }
    else {
        const watcher = state.watchFile(
            file,
            (fileName, eventKind, modifiedTime) => {
                const existing = ts.Debug.checkDefined(state.filesWatched.get(path));
                ts.Debug.assert(isFileWatcherWithModifiedTime(existing));
                existing.modifiedTime = modifiedTime;
                existing.callbacks.forEach(cb => cb(fileName, eventKind, modifiedTime));
            },
            pollingInterval,
            options,
            watchType,
            project
        );
        state.filesWatched.set(path, { callbacks: [callback], watcher, modifiedTime: existing });
    }

    return {
        close: () => {
            const existing = ts.Debug.checkDefined(state.filesWatched.get(path));
            ts.Debug.assert(isFileWatcherWithModifiedTime(existing));
            if (existing.callbacks.length === 1) {
                state.filesWatched.delete(path);
                ts.closeFileWatcherOf(existing);
            }
            else {
                ts.unorderedRemoveItem(existing.callbacks, callback);
            }
        }
    };
}

function getOutputTimeStampMap(state: SolutionBuilderState, resolvedConfigFilePath: ResolvedConfigFilePath) {
    // Output timestamps are stored only in watch mode
    if (!state.watch) return undefined;
    let result = state.outputTimeStamps.get(resolvedConfigFilePath);
    if (!result) state.outputTimeStamps.set(resolvedConfigFilePath, result = new ts.Map());
    return result;
}

function setBuildInfo(
    state: SolutionBuilderState,
    buildInfo: ts.BuildInfo,
    resolvedConfigPath: ResolvedConfigFilePath,
    options: ts.CompilerOptions,
    resultFlags: BuildResultFlags,
) {
    const buildInfoPath = ts.getTsBuildInfoEmitOutputFilePath(options)!;
    const existing = getBuildInfoCacheEntry(state, buildInfoPath, resolvedConfigPath);
    const modifiedTime = getCurrentTime(state.host);
    if (existing) {
        existing.buildInfo = buildInfo;
        existing.modifiedTime = modifiedTime;
        if (!(resultFlags & BuildResultFlags.DeclarationOutputUnchanged)) existing.latestChangedDtsTime = modifiedTime;
    }
    else {
        state.buildInfoCache.set(resolvedConfigPath, {
            path: toPath(state, buildInfoPath),
            buildInfo,
            modifiedTime,
            latestChangedDtsTime: resultFlags & BuildResultFlags.DeclarationOutputUnchanged ? undefined : modifiedTime,
        });
    }
}

function getBuildInfoCacheEntry(state: SolutionBuilderState, buildInfoPath: string, resolvedConfigPath: ResolvedConfigFilePath) {
    const path = toPath(state, buildInfoPath);
    const existing = state.buildInfoCache.get(resolvedConfigPath);
    return existing?.path === path ? existing : undefined;
}

function getBuildInfo(state: SolutionBuilderState, buildInfoPath: string, resolvedConfigPath: ResolvedConfigFilePath, modifiedTime: Date | undefined): ts.BuildInfo | undefined {
    const path = toPath(state, buildInfoPath);
    const existing = state.buildInfoCache.get(resolvedConfigPath);
    if (existing !== undefined && existing.path === path) {
        return existing.buildInfo || undefined;
    }
    const value = state.readFileWithCache(buildInfoPath);
    const buildInfo = value ? ts.getBuildInfo(buildInfoPath, value) : undefined;
    state.buildInfoCache.set(resolvedConfigPath, { path, buildInfo: buildInfo || false, modifiedTime: modifiedTime || ts.missingFileModifiedTime });
    return buildInfo;
}

function checkConfigFileUpToDateStatus(state: SolutionBuilderState, configFile: string, oldestOutputFileTime: Date, oldestOutputFileName: string): ts.Status.OutOfDateWithSelf | undefined {
    // Check tsconfig time
    const tsconfigTime = getModifiedTime(state, configFile);
    if (oldestOutputFileTime < tsconfigTime) {
        return {
            type: ts.UpToDateStatusType.OutOfDateWithSelf,
            outOfDateOutputFileName: oldestOutputFileName,
            newerInputFileName: configFile
        };
    }
}

function getUpToDateStatusWorker(state: SolutionBuilderState, project: ts.ParsedCommandLine, resolvedPath: ResolvedConfigFilePath): ts.UpToDateStatus {
    // Container if no files are specified in the project
    if (!project.fileNames.length && !ts.canJsonReportNoInputFiles(project.raw)) {
        return {
            type: ts.UpToDateStatusType.ContainerOnly
        };
    }

    // Fast check to see if reference projects are upto date and error free
    let referenceStatuses;
    const force = !!state.options.force;
    if (project.projectReferences) {
        state.projectStatus.set(resolvedPath, { type: ts.UpToDateStatusType.ComputingUpstream });
        for (const ref of project.projectReferences) {
            const resolvedRef = ts.resolveProjectReferencePath(ref);
            const resolvedRefPath = toResolvedConfigFilePath(state, resolvedRef);
            const resolvedConfig = parseConfigFile(state, resolvedRef, resolvedRefPath)!;
            const refStatus = getUpToDateStatus(state, resolvedConfig, resolvedRefPath);

            // Its a circular reference ignore the status of this project
            if (refStatus.type === ts.UpToDateStatusType.ComputingUpstream ||
                refStatus.type === ts.UpToDateStatusType.ContainerOnly) { // Container only ignore this project
                continue;
            }

            // An upstream project is blocked
            if (refStatus.type === ts.UpToDateStatusType.Unbuildable ||
                refStatus.type === ts.UpToDateStatusType.UpstreamBlocked) {
                return {
                    type: ts.UpToDateStatusType.UpstreamBlocked,
                    upstreamProjectName: ref.path,
                    upstreamProjectBlocked: refStatus.type === ts.UpToDateStatusType.UpstreamBlocked
                };
            }

            // If the upstream project is out of date, then so are we (someone shouldn't have asked, though?)
            if (refStatus.type !== ts.UpToDateStatusType.UpToDate) {
                return {
                    type: ts.UpToDateStatusType.UpstreamOutOfDate,
                    upstreamProjectName: ref.path
                };
            }

            if (!force) (referenceStatuses ||= []).push({ ref, refStatus, resolvedRefPath, resolvedConfig });
        }
    }
    if (force) return { type: ts.UpToDateStatusType.ForceBuild };

    // Check buildinfo first
    const { host } = state;
    const buildInfoPath = ts.getTsBuildInfoEmitOutputFilePath(project.options);
    let oldestOutputFileName: string | undefined;
    let oldestOutputFileTime = maximumDate;
    let buildInfoTime: Date | undefined;
    let buildInfoProgram: ts.ProgramBuildInfo | undefined;
    let buildInfoVersionMap: ts.ESMap<ts.Path, string> | undefined;
    if (buildInfoPath) {
        const buildInfoCacheEntry = getBuildInfoCacheEntry(state, buildInfoPath, resolvedPath);
        buildInfoTime = buildInfoCacheEntry?.modifiedTime || ts.getModifiedTime(host, buildInfoPath);
        if (buildInfoTime === ts.missingFileModifiedTime) {
            if (!buildInfoCacheEntry) {
                state.buildInfoCache.set(resolvedPath, {
                    path: toPath(state, buildInfoPath),
                    buildInfo: false,
                    modifiedTime: buildInfoTime
                });
            }
            return {
                type: ts.UpToDateStatusType.OutputMissing,
                missingOutputFileName: buildInfoPath
            };
        }

        const buildInfo = getBuildInfo(state, buildInfoPath, resolvedPath, buildInfoTime);
        if (!buildInfo) {
            // Error reading buildInfo
            return {
                type: ts.UpToDateStatusType.ErrorReadingFile,
                fileName: buildInfoPath
            };
        }
        if ((buildInfo.bundle || buildInfo.program) && buildInfo.version !== ts.version) {
            return {
                type: ts.UpToDateStatusType.TsVersionOutputOfDate,
                version: buildInfo.version
            };
        }

        if (buildInfo.program) {
            // If there are pending changes that are not emitted, project is out of date
            // When there are syntax errors, changeFileSet will have list of files changed (irrespective of noEmit)
            // But in case of semantic error we need special treatment.
            // Checking presence of affectedFilesPendingEmit list is fast and good way to tell if there were semantic errors and file emit was blocked
            // But if noEmit is true, affectedFilesPendingEmit will have file list even if there are no semantic errors to preserve list of files to be emitted when running with noEmit false
            // So with noEmit set to true, check on semantic diagnostics needs to be explicit as oppose to when it is false when only files pending emit is sufficient
            if ((buildInfo.program as ts.ProgramMultiFileEmitBuildInfo).changeFileSet?.length ||
                (!project.options.noEmit ?
                    (buildInfo.program as ts.ProgramMultiFileEmitBuildInfo).affectedFilesPendingEmit?.length :
                    ts.some((buildInfo.program as ts.ProgramMultiFileEmitBuildInfo).semanticDiagnosticsPerFile, ts.isArray))
            ) {
                return {
                    type: ts.UpToDateStatusType.OutOfDateBuildInfo,
                    buildInfoFile: buildInfoPath
                };
            }
            buildInfoProgram = buildInfo.program;
        }

        oldestOutputFileTime = buildInfoTime;
        oldestOutputFileName = buildInfoPath;
    }

    // Check input files
    let newestInputFileName: string = undefined!;
    let newestInputFileTime = minimumDate;
    /** True if input file has changed timestamp but text is not changed, we can then do only timestamp updates on output to make it look up-to-date later */
    let pseudoInputUpToDate = false;
    // Get timestamps of input files
    for (const inputFile of project.fileNames) {
        const inputTime = getModifiedTime(state, inputFile);
        if (inputTime === ts.missingFileModifiedTime) {
            return {
                type: ts.UpToDateStatusType.Unbuildable,
                reason: `${inputFile} does not exist`
            };
        }

        // If an buildInfo is older than the newest input, we can stop checking
        if (buildInfoTime && buildInfoTime < inputTime) {
            let version: string | undefined;
            let currentVersion: string | undefined;
            if (buildInfoProgram) {
                // Read files and see if they are same, read is anyways cached
                if (!buildInfoVersionMap) buildInfoVersionMap = ts.getBuildInfoFileVersionMap(buildInfoProgram, buildInfoPath!, host);
                version = buildInfoVersionMap.get(toPath(state, inputFile));
                const text = version ? state.readFileWithCache(inputFile) : undefined;
                currentVersion = text && (host.createHash || ts.generateDjb2Hash)(text);
                if (version && version === currentVersion) pseudoInputUpToDate = true;
            }

            if (!version || version !== currentVersion) {
                return {
                    type: ts.UpToDateStatusType.OutOfDateWithSelf,
                    outOfDateOutputFileName: buildInfoPath!,
                    newerInputFileName: inputFile
                };
            }
        }

        if (inputTime > newestInputFileTime) {
            newestInputFileName = inputFile;
            newestInputFileTime = inputTime;
        }
    }

    // Now see if all outputs are newer than the newest input
    // Dont check output timestamps if we have buildinfo telling us output is uptodate
    if (!buildInfoPath) {
        // Collect the expected outputs of this project
        const outputs = ts.getAllProjectOutputs(project, !host.useCaseSensitiveFileNames());
        const outputTimeStampMap = getOutputTimeStampMap(state, resolvedPath);
        for (const output of outputs) {
            const path = toPath(state, output);
            // Output is missing; can stop checking
            let outputTime = outputTimeStampMap?.get(path);
            if (!outputTime) {
                outputTime = ts.getModifiedTime(state.host, output);
                outputTimeStampMap?.set(path, outputTime);
            }

            if (outputTime === ts.missingFileModifiedTime) {
                return {
                    type: ts.UpToDateStatusType.OutputMissing,
                    missingOutputFileName: output
                };
            }

            // If an output is older than the newest input, we can stop checking
            if (outputTime < newestInputFileTime) {
                return {
                    type: ts.UpToDateStatusType.OutOfDateWithSelf,
                    outOfDateOutputFileName: output,
                    newerInputFileName: newestInputFileName
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

    const buildInfoCacheEntry = state.buildInfoCache.get(resolvedPath);
    /** Inputs are up-to-date, just need either timestamp update or bundle prepend manipulation to make it look up-to-date */
    let pseudoUpToDate = false;
    let usesPrepend = false;
    let upstreamChangedProject: string | undefined;
    if (referenceStatuses) {
        for (const { ref, refStatus, resolvedConfig, resolvedRefPath } of referenceStatuses) {
            usesPrepend = usesPrepend || !!(ref.prepend);
            // If the upstream project's newest file is older than our oldest output, we
            // can't be out of date because of it
            if (refStatus.newestInputFileTime && refStatus.newestInputFileTime <= oldestOutputFileTime) {
                continue;
            }

            // Check if tsbuildinfo path is shared, then we need to rebuild
            if (buildInfoCacheEntry && hasSameBuildInfo(state, buildInfoCacheEntry, resolvedRefPath)) {
                return {
                    type: ts.UpToDateStatusType.OutOfDateWithUpstream,
                    outOfDateOutputFileName: buildInfoPath!,
                    newerProjectName: ref.path
                };
            }

            // If the upstream project has only change .d.ts files, and we've built
            // *after* those files, then we're "psuedo up to date" and eligible for a fast rebuild
            const newestDeclarationFileContentChangedTime = getLatestChangedDtsTime(state, resolvedConfig.options, resolvedRefPath);
            if (newestDeclarationFileContentChangedTime && newestDeclarationFileContentChangedTime <= oldestOutputFileTime) {
                pseudoUpToDate = true;
                upstreamChangedProject = ref.path;
                continue;
            }

            // We have an output older than an upstream output - we are out of date
            ts.Debug.assert(oldestOutputFileName !== undefined, "Should have an oldest output filename here");
            return {
                type: ts.UpToDateStatusType.OutOfDateWithUpstream,
                outOfDateOutputFileName: oldestOutputFileName,
                newerProjectName: ref.path
            };
        }
    }

    // Check tsconfig time
    const configStatus = checkConfigFileUpToDateStatus(state, project.options.configFilePath!, oldestOutputFileTime, oldestOutputFileName!);
    if (configStatus) return configStatus;

    // Check extended config time
    const extendedConfigStatus = ts.forEach(project.options.configFile!.extendedSourceFiles || ts.emptyArray, configFile => checkConfigFileUpToDateStatus(state, configFile, oldestOutputFileTime, oldestOutputFileName!));
    if (extendedConfigStatus) return extendedConfigStatus;

    // Check package file time
    const dependentPackageFileStatus = ts.forEach(
        state.lastCachedPackageJsonLookups.get(resolvedPath) || ts.emptyArray,
        ([path]) => checkConfigFileUpToDateStatus(state, path, oldestOutputFileTime, oldestOutputFileName!)
    );
    if (dependentPackageFileStatus) return dependentPackageFileStatus;

    if (usesPrepend && pseudoUpToDate) {
        return {
            type: ts.UpToDateStatusType.OutOfDateWithPrepend,
            outOfDateOutputFileName: oldestOutputFileName!,
            newerProjectName: upstreamChangedProject!
        };
    }

    // Up to date
    return {
        type: pseudoUpToDate ?
            ts.UpToDateStatusType.UpToDateWithUpstreamTypes :
            pseudoInputUpToDate ?
                ts.UpToDateStatusType.UpToDateWithInputFileText :
                ts.UpToDateStatusType.UpToDate,
        newestInputFileTime,
        newestInputFileName,
        oldestOutputFileName: oldestOutputFileName!
    };
}

function hasSameBuildInfo(state: SolutionBuilderState, buildInfoCacheEntry: BuildInfoCacheEntry, resolvedRefPath: ResolvedConfigFilePath) {
    const refBuildInfo = state.buildInfoCache.get(resolvedRefPath)!;
    return refBuildInfo.path === buildInfoCacheEntry.path;
}

function getUpToDateStatus(state: SolutionBuilderState, project: ts.ParsedCommandLine | undefined, resolvedPath: ResolvedConfigFilePath): ts.UpToDateStatus {
    if (project === undefined) {
        return { type: ts.UpToDateStatusType.Unbuildable, reason: "File deleted mid-build" };
    }

    const prior = state.projectStatus.get(resolvedPath);
    if (prior !== undefined) {
        return prior;
    }

    ts.performance.mark("SolutionBuilder::beforeUpToDateCheck");
    const actual = getUpToDateStatusWorker(state, project, resolvedPath);
    ts.performance.mark("SolutionBuilder::afterUpToDateCheck");
    ts.performance.measure("SolutionBuilder::Up-to-date check", "SolutionBuilder::beforeUpToDateCheck", "SolutionBuilder::afterUpToDateCheck");
    state.projectStatus.set(resolvedPath, actual);
    return actual;
}

function updateOutputTimestampsWorker(
    state: SolutionBuilderState,
    proj: ts.ParsedCommandLine,
    projectPath: ResolvedConfigFilePath,
    verboseMessage: ts.DiagnosticMessage,
    skipOutputs?: ts.ESMap<ts.Path, string>
) {
    if (proj.options.noEmit) return;
    let now: Date | undefined;
    const buildInfoPath = ts.getTsBuildInfoEmitOutputFilePath(proj.options);
    if (buildInfoPath) {
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
    const outputs = ts.getAllProjectOutputs(proj, !host.useCaseSensitiveFileNames());
    const outputTimeStampMap = getOutputTimeStampMap(state, projectPath);
    const modifiedOutputs = outputTimeStampMap ? new ts.Set<ts.Path>() : undefined;
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
            // Store output timestamps in a map because non incremental build will need to check them to determine up-to-dateness
            if (outputTimeStampMap) {
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

function getLatestChangedDtsTime(state: SolutionBuilderState, options: ts.CompilerOptions, resolvedConfigPath: ResolvedConfigFilePath) {
    if (!options.composite) return undefined;
    const entry = ts.Debug.checkDefined(state.buildInfoCache.get(resolvedConfigPath));
    if (entry.latestChangedDtsTime !== undefined) return entry.latestChangedDtsTime || undefined;
    const latestChangedDtsTime = entry.buildInfo && entry.buildInfo.program && entry.buildInfo.program.latestChangedDtsFile ?
        state.host.getModifiedTime(ts.getNormalizedAbsolutePath(entry.buildInfo.program.latestChangedDtsFile, ts.getDirectoryPath(entry.path))) :
        undefined;
    entry.latestChangedDtsTime = latestChangedDtsTime || false;
    return latestChangedDtsTime;
}

function updateOutputTimestamps(state: SolutionBuilderState, proj: ts.ParsedCommandLine, resolvedPath: ResolvedConfigFilePath) {
    if (state.options.dry) {
        return reportStatus(state, ts.Diagnostics.A_non_dry_build_would_update_timestamps_for_output_of_project_0, proj.options.configFilePath!);
    }
    updateOutputTimestampsWorker(state, proj, resolvedPath, ts.Diagnostics.Updating_output_timestamps_of_project_0);
    state.projectStatus.set(resolvedPath, {
        type: ts.UpToDateStatusType.UpToDate,
        oldestOutputFileName: ts.getFirstProjectOutput(proj, !state.host.useCaseSensitiveFileNames())
    });
}

function queueReferencingProjects(
    state: SolutionBuilderState,
    project: ts.ResolvedConfigFileName,
    projectPath: ResolvedConfigFilePath,
    projectIndex: number,
    config: ts.ParsedCommandLine,
    buildOrder: readonly ts.ResolvedConfigFileName[],
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
                    case ts.UpToDateStatusType.UpToDate:
                        if (buildResult & BuildResultFlags.DeclarationOutputUnchanged) {
                            if (ref.prepend) {
                                state.projectStatus.set(nextProjectPath, {
                                    type: ts.UpToDateStatusType.OutOfDateWithPrepend,
                                    outOfDateOutputFileName: status.oldestOutputFileName,
                                    newerProjectName: project
                                });
                            }
                            else {
                                status.type = ts.UpToDateStatusType.UpToDateWithUpstreamTypes;
                            }
                            break;
                        }
                        // falls through

                    case ts.UpToDateStatusType.UpToDateWithInputFileText:
                    case ts.UpToDateStatusType.UpToDateWithUpstreamTypes:
                    case ts.UpToDateStatusType.OutOfDateWithPrepend:
                        if (!(buildResult & BuildResultFlags.DeclarationOutputUnchanged)) {
                            state.projectStatus.set(nextProjectPath, {
                                type: ts.UpToDateStatusType.OutOfDateWithUpstream,
                                outOfDateOutputFileName: status.type === ts.UpToDateStatusType.OutOfDateWithPrepend ? status.outOfDateOutputFileName : status.oldestOutputFileName,
                                newerProjectName: project
                            });
                        }
                        break;

                    case ts.UpToDateStatusType.UpstreamBlocked:
                        if (toResolvedConfigFilePath(state, resolveProjectName(state, status.upstreamProjectName)) === projectPath) {
                            clearProjectStatus(state, nextProjectPath);
                        }
                        break;
                }
            }
            addProjToQueue(state, nextProjectPath, ts.ConfigFileProgramReloadLevel.None);
            break;
        }
    }
}

function build(state: SolutionBuilderState, project?: string, cancellationToken?: ts.CancellationToken, writeFile?: ts.WriteFileCallback, getCustomTransformers?: (project: string) => ts.CustomTransformers, onlyReferences?: boolean): ts.ExitStatus {
    ts.performance.mark("SolutionBuilder::beforeBuild");
    const result = buildWorker(state, project, cancellationToken, writeFile, getCustomTransformers, onlyReferences);
    ts.performance.mark("SolutionBuilder::afterBuild");
    ts.performance.measure("SolutionBuilder::Build", "SolutionBuilder::beforeBuild", "SolutionBuilder::afterBuild");
    return result;
}

function buildWorker(state: SolutionBuilderState, project: string | undefined, cancellationToken: ts.CancellationToken | undefined, writeFile: ts.WriteFileCallback | undefined, getCustomTransformers: ((project: string) => ts.CustomTransformers) | undefined, onlyReferences: boolean | undefined): ts.ExitStatus {
    const buildOrder = getBuildOrderFor(state, project, onlyReferences);
    if (!buildOrder) return ts.ExitStatus.InvalidProject_OutputsSkipped;

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
        ? ts.ExitStatus.ProjectReferenceCycle_OutputsSkipped
        : !buildOrder.some(p => state.diagnostics.has(toResolvedConfigFilePath(state, p)))
            ? ts.ExitStatus.Success
            : successfulProjects
                ? ts.ExitStatus.DiagnosticsPresent_OutputsGenerated
                : ts.ExitStatus.DiagnosticsPresent_OutputsSkipped;
}

function clean(state: SolutionBuilderState, project?: string, onlyReferences?: boolean): ts.ExitStatus {
    ts.performance.mark("SolutionBuilder::beforeClean");
    const result = cleanWorker(state, project, onlyReferences);
    ts.performance.mark("SolutionBuilder::afterClean");
    ts.performance.measure("SolutionBuilder::Clean", "SolutionBuilder::beforeClean", "SolutionBuilder::afterClean");
    return result;
}

function cleanWorker(state: SolutionBuilderState, project: string | undefined, onlyReferences: boolean | undefined) {
    const buildOrder = getBuildOrderFor(state, project, onlyReferences);
    if (!buildOrder) return ts.ExitStatus.InvalidProject_OutputsSkipped;

    if (isCircularBuildOrder(buildOrder)) {
        reportErrors(state, buildOrder.circularDiagnostics);
        return ts.ExitStatus.ProjectReferenceCycle_OutputsSkipped;
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
        const outputs = ts.getAllProjectOutputs(parsed, !host.useCaseSensitiveFileNames());
        if (!outputs.length) continue;
        const inputFileNames = new ts.Set(parsed.fileNames.map(f => toPath(state, f)));
        for (const output of outputs) {
            // If output name is same as input file name, do not delete and ignore the error
            if (inputFileNames.has(toPath(state, output))) continue;
            if (host.fileExists(output)) {
                if (filesToDelete) {
                    filesToDelete.push(output);
                }
                else {
                    host.deleteFile(output);
                    invalidateProject(state, resolvedPath, ts.ConfigFileProgramReloadLevel.None);
                }
            }
        }
    }

    if (filesToDelete) {
        reportStatus(state, ts.Diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0, filesToDelete.map(f => `\r\n * ${f}`).join(""));
    }

    return ts.ExitStatus.Success;
}

function invalidateProject(state: SolutionBuilderState, resolved: ResolvedConfigFilePath, reloadLevel: ts.ConfigFileProgramReloadLevel) {
    // If host implements getParsedCommandLine, we cant get list of files from parseConfigFileHost
    if (state.host.getParsedCommandLine && reloadLevel === ts.ConfigFileProgramReloadLevel.Partial) {
        reloadLevel = ts.ConfigFileProgramReloadLevel.Full;
    }
    if (reloadLevel === ts.ConfigFileProgramReloadLevel.Full) {
        state.configFileCache.delete(resolved);
        state.buildOrder = undefined;
    }
    state.needsSummary = true;
    clearProjectStatus(state, resolved);
    addProjToQueue(state, resolved, reloadLevel);
    enableCache(state);
}

function invalidateProjectAndScheduleBuilds(state: SolutionBuilderState, resolvedPath: ResolvedConfigFilePath, reloadLevel: ts.ConfigFileProgramReloadLevel) {
    state.reportFileChangeDetected = true;
    invalidateProject(state, resolvedPath, reloadLevel);
    scheduleBuildInvalidatedProject(state, 250, /*changeDetected*/ true);
}

function scheduleBuildInvalidatedProject(state: SolutionBuilderState, time: number, changeDetected: boolean) {
    const { hostWithWatch } = state;
    if (!hostWithWatch.setTimeout || !hostWithWatch.clearTimeout) {
        return;
    }
    if (state.timerToBuildInvalidatedProject) {
        hostWithWatch.clearTimeout(state.timerToBuildInvalidatedProject);
    }
    state.timerToBuildInvalidatedProject = hostWithWatch.setTimeout(buildNextInvalidatedProject, time, state, changeDetected);
}

function buildNextInvalidatedProject(state: SolutionBuilderState, changeDetected: boolean) {
    ts.performance.mark("SolutionBuilder::beforeBuild");
    const buildOrder = buildNextInvalidatedProjectWorker(state, changeDetected);
    ts.performance.mark("SolutionBuilder::afterBuild");
    ts.performance.measure("SolutionBuilder::Build", "SolutionBuilder::beforeBuild", "SolutionBuilder::afterBuild");
    if (buildOrder) reportErrorSummary(state, buildOrder);
}

function buildNextInvalidatedProjectWorker(state: SolutionBuilderState, changeDetected: boolean) {
    state.timerToBuildInvalidatedProject = undefined;
    if (state.reportFileChangeDetected) {
        state.reportFileChangeDetected = false;
        state.projectErrorsReported.clear();
        reportWatchStatus(state, ts.Diagnostics.File_change_detected_Starting_incremental_compilation);
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

function watchConfigFile(state: SolutionBuilderState, resolved: ts.ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ts.ParsedCommandLine | undefined) {
    if (!state.watch || state.allWatchedConfigFiles.has(resolvedPath)) return;
    state.allWatchedConfigFiles.set(resolvedPath, watchFile(
        state,
        resolved,
        () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ts.ConfigFileProgramReloadLevel.Full),
        ts.PollingInterval.High,
        parsed?.watchOptions,
        ts.WatchType.ConfigFile,
        resolved
    ));
}

function watchExtendedConfigFiles(state: SolutionBuilderState, resolvedPath: ResolvedConfigFilePath, parsed: ts.ParsedCommandLine | undefined) {
    ts.updateSharedExtendedConfigFileWatcher(
        resolvedPath,
        parsed?.options,
        state.allWatchedExtendedConfigFiles,
        (extendedConfigFileName, extendedConfigFilePath) => watchFile(
            state,
            extendedConfigFileName,
            () => state.allWatchedExtendedConfigFiles.get(extendedConfigFilePath)?.projects.forEach(projectConfigFilePath =>
                    invalidateProjectAndScheduleBuilds(state, projectConfigFilePath, ts.ConfigFileProgramReloadLevel.Full)),
            ts.PollingInterval.High,
            parsed?.watchOptions,
            ts.WatchType.ExtendedConfigFile,
        ),
        fileName => toPath(state, fileName),
    );
}

function watchWildCardDirectories(state: SolutionBuilderState, resolved: ts.ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ts.ParsedCommandLine) {
    if (!state.watch) return;
    ts.updateWatchingWildcardDirectories(
        getOrCreateValueMapFromConfigFileMap(state.allWatchedWildcardDirectories, resolvedPath),
        new ts.Map(ts.getEntries(parsed.wildcardDirectories!)),
        (dir, flags) => state.watchDirectory(
            dir,
            fileOrDirectory => {
                if (ts.isIgnoredFileFromWildCardWatching({
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

                invalidateProjectAndScheduleBuilds(state, resolvedPath, ts.ConfigFileProgramReloadLevel.Partial);
            },
            flags,
            parsed?.watchOptions,
            ts.WatchType.WildcardDirectory,
            resolved
        )
    );
}

function watchInputFiles(state: SolutionBuilderState, resolved: ts.ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ts.ParsedCommandLine) {
    if (!state.watch) return;
    ts.mutateMap(
        getOrCreateValueMapFromConfigFileMap(state.allWatchedInputFiles, resolvedPath),
        ts.arrayToMap(parsed.fileNames, fileName => toPath(state, fileName)),
        {
            createNewValue: (_path, input) => watchFile(
                state,
                input,
                () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ts.ConfigFileProgramReloadLevel.None),
                ts.PollingInterval.Low,
                parsed?.watchOptions,
                ts.WatchType.SourceFile,
                resolved
            ),
            onDeleteValue: ts.closeFileWatcher,
        }
    );
}

function watchPackageJsonFiles(state: SolutionBuilderState, resolved: ts.ResolvedConfigFileName, resolvedPath: ResolvedConfigFilePath, parsed: ts.ParsedCommandLine) {
    if (!state.watch || !state.lastCachedPackageJsonLookups) return;
    ts.mutateMap(
        getOrCreateValueMapFromConfigFileMap(state.allWatchedPackageJsonFiles, resolvedPath),
        new ts.Map(state.lastCachedPackageJsonLookups.get(resolvedPath)),
        {
            createNewValue: (path, _input) => watchFile(
                state,
                path,
                () => invalidateProjectAndScheduleBuilds(state, resolvedPath, ts.ConfigFileProgramReloadLevel.None),
                ts.PollingInterval.High,
                parsed?.watchOptions,
                ts.WatchType.PackageJson,
                resolved
            ),
            onDeleteValue: ts.closeFileWatcher,
        }
    );
}

function startWatching(state: SolutionBuilderState, buildOrder: AnyBuildOrder) {
    if (!state.watchAllProjectsPending) return;
    ts.performance.mark("SolutionBuilder::beforeWatcherCreation");
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
    ts.performance.mark("SolutionBuilder::afterWatcherCreation");
    ts.performance.measure("SolutionBuilder::Watcher creation", "SolutionBuilder::beforeWatcherCreation", "SolutionBuilder::afterWatcherCreation");
}

function stopWatching(state: SolutionBuilderState) {
    ts.clearMap(state.allWatchedConfigFiles, ts.closeFileWatcher);
    ts.clearMap(state.allWatchedExtendedConfigFiles, ts.closeFileWatcherOf);
    ts.clearMap(state.allWatchedWildcardDirectories, watchedWildcardDirectories => ts.clearMap(watchedWildcardDirectories, ts.closeFileWatcherOf));
    ts.clearMap(state.allWatchedInputFiles, watchedWildcardDirectories => ts.clearMap(watchedWildcardDirectories, ts.closeFileWatcher));
    ts.clearMap(state.allWatchedPackageJsonFiles, watchedPacageJsonFiles => ts.clearMap(watchedPacageJsonFiles, ts.closeFileWatcher));
}

/**
 * A SolutionBuilder has an immutable set of rootNames that are the "entry point" projects, but
 * can dynamically add/remove other projects based on changes on the rootNames' references
 */
function createSolutionBuilderWorker<T extends ts.BuilderProgram>(watch: false, host: SolutionBuilderHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilder<T>;
function createSolutionBuilderWorker<T extends ts.BuilderProgram>(watch: true, host: SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: ts.WatchOptions): SolutionBuilder<T>;
function createSolutionBuilderWorker<T extends ts.BuilderProgram>(watch: boolean, hostOrHostWithWatch: SolutionBuilderHost<T> | SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], options: BuildOptions, baseWatchOptions?: ts.WatchOptions): SolutionBuilder<T> {
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
        invalidateProject: (configFilePath, reloadLevel) => invalidateProject(state, configFilePath, reloadLevel || ts.ConfigFileProgramReloadLevel.None),
        close: () => stopWatching(state),
    };
}

function relName(state: SolutionBuilderState, path: string): string {
    return ts.convertToRelativePath(path, state.currentDirectory, f => state.getCanonicalFileName(f));
}

function reportStatus(state: SolutionBuilderState, message: ts.DiagnosticMessage, ...args: string[]) {
    state.host.reportSolutionBuilderStatus(ts.createCompilerDiagnostic(message, ...args));
}

function reportWatchStatus(state: SolutionBuilderState, message: ts.DiagnosticMessage, ...args: (string | number | undefined)[]) {
    state.hostWithWatch.onWatchStatusChange?.(ts.createCompilerDiagnostic(message, ...args), state.host.getNewLine(), state.baseCompilerOptions);
}

function reportErrors({ host }: SolutionBuilderState, errors: readonly ts.Diagnostic[]) {
    errors.forEach(err => host.reportDiagnostic(err));
}

function reportAndStoreErrors(state: SolutionBuilderState, proj: ResolvedConfigFilePath, errors: readonly ts.Diagnostic[]) {
    reportErrors(state, errors);
    state.projectErrorsReported.set(proj, true);
    if (errors.length) {
        state.diagnostics.set(proj, errors);
    }
}

function reportParseConfigFileDiagnostic(state: SolutionBuilderState, proj: ResolvedConfigFilePath) {
    reportAndStoreErrors(state, proj, [state.configFileCache.get(proj) as ts.Diagnostic]);
}

function reportErrorSummary(state: SolutionBuilderState, buildOrder: AnyBuildOrder) {
    if (!state.needsSummary) return;
    state.needsSummary = false;
    const canReportSummary = state.watch || !!state.host.reportErrorSummary;
    const { diagnostics } = state;
    let totalErrors = 0;
    let filesInError: (ReportFileInError | undefined)[] = [];
    if (isCircularBuildOrder(buildOrder)) {
        reportBuildQueue(state, buildOrder.buildOrder);
        reportErrors(state, buildOrder.circularDiagnostics);
        if (canReportSummary) totalErrors += ts.getErrorCountForSummary(buildOrder.circularDiagnostics);
        if (canReportSummary) filesInError = [...filesInError, ...ts.getFilesInErrorForSummary(buildOrder.circularDiagnostics)];
    }
    else {
        // Report errors from the other projects
        buildOrder.forEach(project => {
            const projectPath = toResolvedConfigFilePath(state, project);
            if (!state.projectErrorsReported.has(projectPath)) {
                reportErrors(state, diagnostics.get(projectPath) || ts.emptyArray);
            }
        });
        if (canReportSummary) diagnostics.forEach(singleProjectErrors => totalErrors += ts.getErrorCountForSummary(singleProjectErrors));
        if (canReportSummary) diagnostics.forEach(singleProjectErrors => [...filesInError, ...ts.getFilesInErrorForSummary(singleProjectErrors)]);
    }

    if (state.watch) {
        reportWatchStatus(state, ts.getWatchErrorSummaryDiagnosticMessage(totalErrors), totalErrors);
    }
    else if (state.host.reportErrorSummary) {
        state.host.reportErrorSummary(totalErrors, filesInError);
    }
}

/**
 * Report the build ordering inferred from the current project graph if we're in verbose mode
 */
function reportBuildQueue(state: SolutionBuilderState, buildQueue: readonly ts.ResolvedConfigFileName[]) {
    if (state.options.verbose) {
        reportStatus(state, ts.Diagnostics.Projects_in_this_build_Colon_0, buildQueue.map(s => "\r\n    * " + relName(state, s)).join(""));
    }
}

function reportUpToDateStatus(state: SolutionBuilderState, configFileName: string, status: ts.UpToDateStatus) {
    switch (status.type) {
        case ts.UpToDateStatusType.OutOfDateWithSelf:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2,
                relName(state, configFileName),
                relName(state, status.outOfDateOutputFileName),
                relName(state, status.newerInputFileName)
            );
        case ts.UpToDateStatusType.OutOfDateWithUpstream:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2,
                relName(state, configFileName),
                relName(state, status.outOfDateOutputFileName),
                relName(state, status.newerProjectName)
            );
        case ts.UpToDateStatusType.OutputMissing:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                relName(state, configFileName),
                relName(state, status.missingOutputFileName)
            );
        case ts.UpToDateStatusType.ErrorReadingFile:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_out_of_date_because_there_was_error_reading_file_1,
                relName(state, configFileName),
                relName(state, status.fileName)
            );
        case ts.UpToDateStatusType.OutOfDateBuildInfo:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_some_of_the_changes_were_not_emitted,
                relName(state, configFileName),
                relName(state, status.buildInfoFile)
            );
        case ts.UpToDateStatusType.UpToDate:
            if (status.newestInputFileTime !== undefined) {
                return reportStatus(
                    state,
                    ts.Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_output_2,
                    relName(state, configFileName),
                    relName(state, status.newestInputFileName || ""),
                    relName(state, status.oldestOutputFileName || "")
                );
            }
            // Don't report anything for "up to date because it was already built" -- too verbose
            break;
        case ts.UpToDateStatusType.OutOfDateWithPrepend:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed,
                relName(state, configFileName),
                relName(state, status.newerProjectName)
            );
        case ts.UpToDateStatusType.UpToDateWithUpstreamTypes:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
                relName(state, configFileName)
            );
        case ts.UpToDateStatusType.UpToDateWithInputFileText:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_up_to_date_but_needs_to_update_timestamps_of_output_files_that_are_older_than_input_files,
                relName(state, configFileName)
            );
        case ts.UpToDateStatusType.UpstreamOutOfDate:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_out_of_date_because_its_dependency_1_is_out_of_date,
                relName(state, configFileName),
                relName(state, status.upstreamProjectName)
            );
        case ts.UpToDateStatusType.UpstreamBlocked:
            return reportStatus(
                state,
                status.upstreamProjectBlocked ?
                    ts.Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_was_not_built :
                    ts.Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors,
                relName(state, configFileName),
                relName(state, status.upstreamProjectName)
            );
        case ts.UpToDateStatusType.Unbuildable:
            return reportStatus(
                state,
                ts.Diagnostics.Failed_to_parse_file_0_Colon_1,
                relName(state, configFileName),
                status.reason
            );
        case ts.UpToDateStatusType.TsVersionOutputOfDate:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2,
                relName(state, configFileName),
                status.version,
                ts.version
            );
        case ts.UpToDateStatusType.ForceBuild:
            return reportStatus(
                state,
                ts.Diagnostics.Project_0_is_being_forcibly_rebuilt,
                relName(state, configFileName)
            );
        case ts.UpToDateStatusType.ContainerOnly:
        // Don't report status on "solution" projects
        // falls through
        case ts.UpToDateStatusType.ComputingUpstream:
            // Should never leak from getUptoDateStatusWorker
            break;
        default:
            ts.assertType<never>(status);
    }
}

/**
 * Report the up-to-date status of a project if we're in verbose mode
 */
function verboseReportProjectStatus(state: SolutionBuilderState, configFileName: string, status: ts.UpToDateStatus) {
    if (state.options.verbose) {
        reportUpToDateStatus(state, configFileName, status);
    }
}
