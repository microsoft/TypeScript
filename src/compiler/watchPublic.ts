import {
    BuilderProgram,
    BuildInfo,
    canJsonReportNoInputFiles,
    changeCompilerHostLikeToUseCache,
    changesAffectModuleResolution,
    cleanExtendedConfigCache,
    clearMap,
    clearSharedExtendedConfigFileWatcher,
    closeFileWatcher,
    closeFileWatcherOf,
    CompilerHost,
    CompilerOptions,
    ConfigFileDiagnosticsReporter,
    createBuilderProgramUsingProgramBuildInfo,
    createCachedDirectoryStructureHost,
    createCompilerDiagnostic,
    createCompilerHostFromProgramHost,
    createCompilerHostWorker,
    createEmitAndSemanticDiagnosticsBuilderProgram,
    createGetCanonicalFileName,
    createResolutionCache,
    CreateSourceFileOptions,
    createWatchCompilerHostOfConfigFile,
    createWatchCompilerHostOfFilesAndCompilerOptions,
    createWatchFactory,
    Debug,
    Diagnostic,
    DiagnosticMessage,
    DiagnosticReporter,
    Diagnostics,
    DirectoryStructureHost,
    DirectoryWatcherCallback,
    EmitAndSemanticDiagnosticsBuilderProgram,
    ExtendedConfigCacheEntry,
    FileExtensionInfo,
    FileReference,
    FileWatcher,
    FileWatcherCallback,
    FileWatcherEventKind,
    getBuildInfo,
    getConfigFileParsingDiagnostics,
    getDirectoryPath,
    getFileNamesFromConfigSpecs,
    getNewLineCharacter,
    getNormalizedAbsolutePath,
    getParsedCommandLineOfConfigFile,
    getSourceFileVersionAsHashFromText,
    getTsBuildInfoEmitOutputFilePath,
    HasInvalidatedLibResolutions,
    HasInvalidatedResolutions,
    isArray,
    isIgnoredFileFromWildCardWatching,
    isProgramUptoDate,
    JSDocParsingMode,
    MapLike,
    maybeBind,
    ModuleResolutionCache,
    noop,
    noopFileWatcher,
    parseConfigHostFromCompilerHostLike,
    ParsedCommandLine,
    Path,
    perfLogger,
    PollingInterval,
    ProgramUpdateLevel,
    ProjectReference,
    ResolutionCache,
    ResolutionCacheHost,
    ResolutionMode,
    ResolvedModule,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedProjectReference,
    ResolvedTypeReferenceDirective,
    ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
    returnFalse,
    returnTrue,
    ScriptTarget,
    setGetSourceFileAsHashVersioned,
    SharedExtendedConfigFileWatcher,
    SourceFile,
    StringLiteralLike,
    sys,
    System,
    toPath,
    toPath as ts_toPath,
    updateErrorForNoInputFiles,
    updateMissingFilePathsWatch,
    updateSharedExtendedConfigFileWatcher,
    updateWatchingWildcardDirectories,
    version,
    WatchDirectoryFlags,
    WatchOptions,
    WatchType,
    WatchTypeRegistry,
    WildcardDirectoryWatcher,
} from "./_namespaces/ts";

export interface ReadBuildProgramHost {
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory(): string;
    readFile(fileName: string): string | undefined;
    /** @internal */
    getBuildInfo?(fileName: string, configFilePath: string | undefined): BuildInfo | undefined;
}
export function readBuilderProgram(compilerOptions: CompilerOptions, host: ReadBuildProgramHost) {
    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(compilerOptions);
    if (!buildInfoPath) return undefined;
    let buildInfo;
    if (host.getBuildInfo) {
        // host provides buildinfo, get it from there. This allows host to cache it
        buildInfo = host.getBuildInfo(buildInfoPath, compilerOptions.configFilePath);
    }
    else {
        const content = host.readFile(buildInfoPath);
        if (!content) return undefined;
        buildInfo = getBuildInfo(buildInfoPath, content);
    }
    if (!buildInfo || buildInfo.version !== version || !buildInfo.program) return undefined;
    return createBuilderProgramUsingProgramBuildInfo(buildInfo, buildInfoPath, host);
}

export function createIncrementalCompilerHost(options: CompilerOptions, system = sys): CompilerHost {
    const host = createCompilerHostWorker(options, /*setParentNodes*/ undefined, system);
    host.createHash = maybeBind(system, system.createHash);
    host.storeFilesChangingSignatureDuringEmit = system.storeFilesChangingSignatureDuringEmit;
    setGetSourceFileAsHashVersioned(host);
    changeCompilerHostLikeToUseCache(host, fileName => toPath(fileName, host.getCurrentDirectory(), host.getCanonicalFileName));
    return host;
}

export interface IncrementalProgramOptions<T extends BuilderProgram> {
    rootNames: readonly string[];
    options: CompilerOptions;
    configFileParsingDiagnostics?: readonly Diagnostic[];
    projectReferences?: readonly ProjectReference[];
    host?: CompilerHost;
    createProgram?: CreateProgram<T>;
}

export function createIncrementalProgram<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>({
    rootNames,
    options,
    configFileParsingDiagnostics,
    projectReferences,
    host,
    createProgram,
}: IncrementalProgramOptions<T>): T {
    host = host || createIncrementalCompilerHost(options);
    createProgram = createProgram || createEmitAndSemanticDiagnosticsBuilderProgram as any as CreateProgram<T>;
    const oldProgram = readBuilderProgram(options, host) as any as T;
    return createProgram(rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences);
}

export type WatchStatusReporter = (diagnostic: Diagnostic, newLine: string, options: CompilerOptions, errorCount?: number) => void;
/** Create the program with rootNames and options, if they are undefined, oldProgram and new configFile diagnostics create new program */
export type CreateProgram<T extends BuilderProgram> = (rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: T, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[] | undefined) => T;

/** Host that has watch functionality used in --watch mode */
export interface WatchHost {
    /** If provided, called with Diagnostic message that informs about change in watch status */
    onWatchStatusChange?(diagnostic: Diagnostic, newLine: string, options: CompilerOptions, errorCount?: number): void;

    /** Used to watch changes in source files, missing files needed to update the program or config file */
    watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
    /** Used to watch resolved module's failed lookup locations, config file specs, type roots where auto type reference directives are added */
    watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
    /** If provided, will be used to set delayed compilation, so that multiple changes in short span are compiled together */
    setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
    /** If provided, will be used to reset existing delayed compilation */
    clearTimeout?(timeoutId: any): void;
}
export interface ProgramHost<T extends BuilderProgram> {
    /**
     * Used to create the program when need for program creation or recreation detected
     */
    createProgram: CreateProgram<T>;

    // Sub set of compiler host methods to read and generate new program
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    getCurrentDirectory(): string;
    getDefaultLibFileName(options: CompilerOptions): string;
    getDefaultLibLocation?(): string;
    createHash?(data: string): string;

    /**
     * Use to check file presence for source files and
     * if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well
     */
    fileExists(path: string): boolean;
    /**
     * Use to read file text for source files and
     * if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well
     */
    readFile(path: string, encoding?: string): string | undefined;

    /** If provided, used for module resolution as well as to handle directory structure */
    directoryExists?(path: string): boolean;
    /** If provided, used in resolutions as well as handling directory structure */
    getDirectories?(path: string): string[];
    /** If provided, used to cache and handle directory structure modifications */
    readDirectory?(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];

    /** Symbol links resolution */
    realpath?(path: string): string;
    /** If provided would be used to write log about compilation */
    trace?(s: string): void;
    /** If provided is used to get the environment variable */
    getEnvironmentVariable?(name: string): string | undefined;

    /**
     * @deprecated supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext
     *
     * If provided, used to resolve the module names, otherwise typescript's default module resolution
     */
    resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
    /**
     * @deprecated supply resolveTypeReferenceDirectiveReferences instead for resolution that can handle newer resolution modes like nodenext
     *
     * If provided, used to resolve type reference directives, otherwise typescript's default resolution
     */
    resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[] | readonly FileReference[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingFileMode?: ResolutionMode): (ResolvedTypeReferenceDirective | undefined)[];
    resolveModuleNameLiterals?(
        moduleLiterals: readonly StringLiteralLike[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteralLike[] | undefined,
    ): readonly ResolvedModuleWithFailedLookupLocations[];
    resolveTypeReferenceDirectiveReferences?<T extends FileReference | string>(
        typeDirectiveReferences: readonly T[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile | undefined,
        reusedNames: readonly T[] | undefined,
    ): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    /** @internal */
    resolveLibrary?(
        libraryName: string,
        resolveFrom: string,
        options: CompilerOptions,
        libFileName: string,
    ): ResolvedModuleWithFailedLookupLocations;
    /**
     * If provided along with custom resolveLibrary, used to determine if we should redo library resolutions
     * @internal
     */
    hasInvalidatedLibResolutions?(libFileName: string): boolean;

    /** If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives */
    hasInvalidatedResolutions?(filePath: Path): boolean;
    /**
     * Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it
     */
    getModuleResolutionCache?(): ModuleResolutionCache | undefined;

    jsDocParsingMode?: JSDocParsingMode;
}
/**
 * Internal interface used to wire emit through same host
 *
 * @internal
 */
export interface ProgramHost<T extends BuilderProgram> {
    // TODO: GH#18217 Optional methods are frequently asserted
    createDirectory?(path: string): void;
    writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
    // For testing
    storeFilesChangingSignatureDuringEmit?: boolean;
    now?(): Date;
}

export interface WatchCompilerHost<T extends BuilderProgram> extends ProgramHost<T>, WatchHost {
    /** Instead of using output d.ts file from project reference, use its source file */
    useSourceOfProjectReferenceRedirect?(): boolean;

    /** If provided, use this method to get parsed command lines for referenced projects */
    getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;

    /** If provided, callback to invoke after every new program creation */
    afterProgramCreate?(program: T): void;
}

/**
 * Host to create watch with root files and options
 */
export interface WatchCompilerHostOfFilesAndCompilerOptions<T extends BuilderProgram> extends WatchCompilerHost<T> {
    /** root files to use to generate program */
    rootFiles: string[];

    /** Compiler options */
    options: CompilerOptions;

    watchOptions?: WatchOptions;

    /** Project References */
    projectReferences?: readonly ProjectReference[];
}

/**
 * Host to create watch with config file
 */
export interface WatchCompilerHostOfConfigFile<T extends BuilderProgram> extends WatchCompilerHost<T>, ConfigFileDiagnosticsReporter {
    /** Name of the config file to compile */
    configFileName: string;

    /** Options to extend */
    optionsToExtend?: CompilerOptions;

    watchOptionsToExtend?: WatchOptions;

    extraFileExtensions?: readonly FileExtensionInfo[];

    /**
     * Used to generate source file names from the config file and its include, exclude, files rules
     * and also to cache the directory stucture
     */
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
}

/**
 * Host to create watch with config file that is already parsed (from tsc)
 *
 * @internal
 */
export interface WatchCompilerHostOfConfigFile<T extends BuilderProgram> extends WatchCompilerHost<T> {
    configFileParsingResult?: ParsedCommandLine;
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>;
}

export interface Watch<T> {
    /** Synchronize with host and get updated program */
    getProgram(): T;
    /**
     * Gets the existing program without synchronizing with changes on host
     *
     * @internal
     */
    getCurrentProgram(): T;
    /** Closes the watch */
    close(): void;
    /** @internal */
    getResolutionCache(): ResolutionCache;
}

/**
 * Creates the watch what generates program using the config file
 */
export interface WatchOfConfigFile<T> extends Watch<T> {
}

/**
 * Creates the watch that generates program using the root files and compiler options
 */
export interface WatchOfFilesAndCompilerOptions<T> extends Watch<T> {
    /** Updates the root files in the program, only if this is not config file compilation */
    updateRootFileNames(fileNames: string[]): void;
}

/**
 * Create the watch compiler host for either configFile or fileNames and its options
 */
export function createWatchCompilerHost<T extends BuilderProgram>(configFileName: string, optionsToExtend: CompilerOptions | undefined, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, watchOptionsToExtend?: WatchOptions, extraFileExtensions?: readonly FileExtensionInfo[]): WatchCompilerHostOfConfigFile<T>;
export function createWatchCompilerHost<T extends BuilderProgram>(rootFiles: string[], options: CompilerOptions, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, projectReferences?: readonly ProjectReference[], watchOptions?: WatchOptions): WatchCompilerHostOfFilesAndCompilerOptions<T>;
export function createWatchCompilerHost<T extends BuilderProgram>(rootFilesOrConfigFileName: string | string[], options: CompilerOptions | undefined, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, projectReferencesOrWatchOptionsToExtend?: readonly ProjectReference[] | WatchOptions, watchOptionsOrExtraFileExtensions?: WatchOptions | readonly FileExtensionInfo[]): WatchCompilerHostOfFilesAndCompilerOptions<T> | WatchCompilerHostOfConfigFile<T> {
    if (isArray(rootFilesOrConfigFileName)) {
        return createWatchCompilerHostOfFilesAndCompilerOptions({
            rootFiles: rootFilesOrConfigFileName,
            options: options!,
            watchOptions: watchOptionsOrExtraFileExtensions as WatchOptions,
            projectReferences: projectReferencesOrWatchOptionsToExtend as readonly ProjectReference[],
            system,
            createProgram,
            reportDiagnostic,
            reportWatchStatus,
        });
    }
    else {
        return createWatchCompilerHostOfConfigFile({
            configFileName: rootFilesOrConfigFileName,
            optionsToExtend: options,
            watchOptionsToExtend: projectReferencesOrWatchOptionsToExtend as WatchOptions,
            extraFileExtensions: watchOptionsOrExtraFileExtensions as readonly FileExtensionInfo[],
            system,
            createProgram,
            reportDiagnostic,
            reportWatchStatus,
        });
    }
}

interface ParsedConfig {
    /** ParsedCommandLine for the config file if present */
    parsedCommandLine: ParsedCommandLine | undefined;
    /** File watcher of the config file */
    watcher?: FileWatcher;
    /** Wild card directories watched from this config file */
    watchedDirectories?: Map<string, WildcardDirectoryWatcher>;
    /** Level of program update to be done for this config file */
    updateLevel?: ProgramUpdateLevel.RootNamesAndUpdate | ProgramUpdateLevel.Full;
}

// All of one and partial of the other, or vice versa.
type WatchCompilerHostOfFilesAndCompilerOptionsOrConfigFile<T extends BuilderProgram> =
    | WatchCompilerHostOfFilesAndCompilerOptions<T> & Partial<WatchCompilerHostOfConfigFile<T>>
    | WatchCompilerHostOfConfigFile<T> & Partial<WatchCompilerHostOfFilesAndCompilerOptions<T>>;

/**
 * Creates the watch from the host for root files and compiler options
 */
export function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfFilesAndCompilerOptions<T>): WatchOfFilesAndCompilerOptions<T>;
/**
 * Creates the watch from the host for config file
 */
export function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfConfigFile<T>): WatchOfConfigFile<T>;
export function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfFilesAndCompilerOptionsOrConfigFile<T>): WatchOfFilesAndCompilerOptions<T> | WatchOfConfigFile<T> {
    interface FilePresentOnHost {
        version: string;
        sourceFile: SourceFile;
        fileWatcher: FileWatcher;
    }
    type FileMissingOnHost = false;
    interface FilePresenceUnknownOnHost {
        version: false;
        fileWatcher?: FileWatcher;
    }
    type FileMayBePresentOnHost = FilePresentOnHost | FilePresenceUnknownOnHost;
    type HostFileInfo = FilePresentOnHost | FileMissingOnHost | FilePresenceUnknownOnHost;

    let builderProgram: T;
    let updateLevel: ProgramUpdateLevel; // level to indicate if the program needs to be reloaded from config file/just filenames etc
    let missingFilesMap: Map<Path, FileWatcher>; // Map of file watchers for the missing files
    let watchedWildcardDirectories: Map<string, WildcardDirectoryWatcher>; // map of watchers for the wild card directories in the config file
    let timerToUpdateProgram: any; // timer callback to recompile the program
    let timerToInvalidateFailedLookupResolutions: any; // timer callback to invalidate resolutions for changes in failed lookup locations
    let parsedConfigs: Map<Path, ParsedConfig> | undefined; // Parsed commandline and watching cached for referenced projects
    let sharedExtendedConfigFileWatchers: Map<Path, SharedExtendedConfigFileWatcher<Path>>; // Map of file watchers for extended files, shared between different referenced projects
    let extendedConfigCache = host.extendedConfigCache; // Cache for extended config evaluation
    let reportFileChangeDetectedOnCreateProgram = false; // True if synchronizeProgram should report "File change detected..." when a new program is created

    const sourceFilesCache = new Map<string, HostFileInfo>(); // Cache that stores the source file and version info
    let missingFilePathsRequestedForRelease: Path[] | undefined; // These paths are held temporarily so that we can remove the entry from source file cache if the file is not tracked by missing files
    let hasChangedCompilerOptions = false; // True if the compiler options have changed between compilations

    const useCaseSensitiveFileNames = host.useCaseSensitiveFileNames();
    const currentDirectory = host.getCurrentDirectory();
    const { configFileName, optionsToExtend: optionsToExtendForConfigFile = {}, watchOptionsToExtend, extraFileExtensions, createProgram } = host;
    let { rootFiles: rootFileNames, options: compilerOptions, watchOptions, projectReferences } = host;
    let wildcardDirectories: MapLike<WatchDirectoryFlags> | undefined;
    let configFileParsingDiagnostics: Diagnostic[] | undefined;
    let canConfigFileJsonReportNoInputFiles = false;
    let hasChangedConfigFileParsingErrors = false;

    const cachedDirectoryStructureHost = configFileName === undefined ? undefined : createCachedDirectoryStructureHost(host, currentDirectory, useCaseSensitiveFileNames);
    const directoryStructureHost: DirectoryStructureHost = cachedDirectoryStructureHost || host;
    const parseConfigFileHost = parseConfigHostFromCompilerHostLike(host, directoryStructureHost);

    // From tsc we want to get already parsed result and hence check for rootFileNames
    let newLine = updateNewLine();
    if (configFileName && host.configFileParsingResult) {
        setConfigFileParsingResult(host.configFileParsingResult);
        newLine = updateNewLine();
    }
    reportWatchDiagnostic(Diagnostics.Starting_compilation_in_watch_mode);
    if (configFileName && !host.configFileParsingResult) {
        newLine = getNewLineCharacter(optionsToExtendForConfigFile);
        Debug.assert(!rootFileNames);
        parseConfigFile();
        newLine = updateNewLine();
    }

    Debug.assert(compilerOptions);
    Debug.assert(rootFileNames);

    const { watchFile, watchDirectory, writeLog } = createWatchFactory(host, compilerOptions);
    const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);

    writeLog(`Current directory: ${currentDirectory} CaseSensitiveFileNames: ${useCaseSensitiveFileNames}`);
    let configFileWatcher: FileWatcher | undefined;
    if (configFileName) {
        configFileWatcher = watchFile(configFileName, scheduleProgramReload, PollingInterval.High, watchOptions, WatchType.ConfigFile);
    }

    const compilerHost = createCompilerHostFromProgramHost(host, () => compilerOptions!, directoryStructureHost) as CompilerHost & ResolutionCacheHost;
    setGetSourceFileAsHashVersioned(compilerHost);
    // Members for CompilerHost
    const getNewSourceFile = compilerHost.getSourceFile;
    compilerHost.getSourceFile = (fileName, ...args) => getVersionedSourceFileByPath(fileName, toPath(fileName), ...args);
    compilerHost.getSourceFileByPath = getVersionedSourceFileByPath;
    compilerHost.getNewLine = () => newLine;
    compilerHost.fileExists = fileExists;
    compilerHost.onReleaseOldSourceFile = onReleaseOldSourceFile;
    compilerHost.onReleaseParsedCommandLine = onReleaseParsedCommandLine;
    // Members for ResolutionCacheHost
    compilerHost.toPath = toPath;
    compilerHost.getCompilationSettings = () => compilerOptions!;
    compilerHost.useSourceOfProjectReferenceRedirect = maybeBind(host, host.useSourceOfProjectReferenceRedirect);
    compilerHost.watchDirectoryOfFailedLookupLocation = (dir, cb, flags) => watchDirectory(dir, cb, flags, watchOptions, WatchType.FailedLookupLocations);
    compilerHost.watchAffectingFileLocation = (file, cb) => watchFile(file, cb, PollingInterval.High, watchOptions, WatchType.AffectingFileLocation);
    compilerHost.watchTypeRootsDirectory = (dir, cb, flags) => watchDirectory(dir, cb, flags, watchOptions, WatchType.TypeRoots);
    compilerHost.getCachedDirectoryStructureHost = () => cachedDirectoryStructureHost;
    compilerHost.scheduleInvalidateResolutionsOfFailedLookupLocations = scheduleInvalidateResolutionsOfFailedLookupLocations;
    compilerHost.onInvalidatedResolution = scheduleProgramUpdate;
    compilerHost.onChangedAutomaticTypeDirectiveNames = scheduleProgramUpdate;
    compilerHost.fileIsOpen = returnFalse;
    compilerHost.getCurrentProgram = getCurrentProgram;
    compilerHost.writeLog = writeLog;
    compilerHost.getParsedCommandLine = getParsedCommandLine;

    // Cache for the module resolution
    const resolutionCache = createResolutionCache(
        compilerHost,
        configFileName ?
            getDirectoryPath(getNormalizedAbsolutePath(configFileName, currentDirectory)) :
            currentDirectory,
        /*logChangesWhenResolvingModule*/ false,
    );
    // Resolve module using host module resolution strategy if provided otherwise use resolution cache to resolve module names
    compilerHost.resolveModuleNameLiterals = maybeBind(host, host.resolveModuleNameLiterals);
    compilerHost.resolveModuleNames = maybeBind(host, host.resolveModuleNames);
    if (!compilerHost.resolveModuleNameLiterals && !compilerHost.resolveModuleNames) {
        compilerHost.resolveModuleNameLiterals = resolutionCache.resolveModuleNameLiterals.bind(resolutionCache);
    }
    compilerHost.resolveTypeReferenceDirectiveReferences = maybeBind(host, host.resolveTypeReferenceDirectiveReferences);
    compilerHost.resolveTypeReferenceDirectives = maybeBind(host, host.resolveTypeReferenceDirectives);
    if (!compilerHost.resolveTypeReferenceDirectiveReferences && !compilerHost.resolveTypeReferenceDirectives) {
        compilerHost.resolveTypeReferenceDirectiveReferences = resolutionCache.resolveTypeReferenceDirectiveReferences.bind(resolutionCache);
    }
    compilerHost.resolveLibrary = !host.resolveLibrary ?
        resolutionCache.resolveLibrary.bind(resolutionCache) :
        host.resolveLibrary.bind(host);
    compilerHost.getModuleResolutionCache = host.resolveModuleNameLiterals || host.resolveModuleNames ?
        maybeBind(host, host.getModuleResolutionCache) :
        (() => resolutionCache.getModuleResolutionCache());
    const userProvidedResolution = !!host.resolveModuleNameLiterals || !!host.resolveTypeReferenceDirectiveReferences ||
        !!host.resolveModuleNames || !!host.resolveTypeReferenceDirectives;
    // All resolutions are invalid if user provided resolutions and didnt supply hasInvalidatedResolutions
    const customHasInvalidatedResolutions = userProvidedResolution ?
        maybeBind(host, host.hasInvalidatedResolutions) || returnTrue :
        returnFalse;
    const customHasInvalidLibResolutions = host.resolveLibrary ?
        maybeBind(host, host.hasInvalidatedLibResolutions) || returnTrue :
        returnFalse;

    builderProgram = readBuilderProgram(compilerOptions, compilerHost) as any as T;
    synchronizeProgram();

    // Update the wild card directory watch
    watchConfigFileWildCardDirectories();

    // Update extended config file watch
    if (configFileName) updateExtendedConfigFilesWatches(toPath(configFileName), compilerOptions, watchOptions, WatchType.ExtendedConfigFile);

    return configFileName ?
        { getCurrentProgram: getCurrentBuilderProgram, getProgram: updateProgram, close, getResolutionCache } :
        { getCurrentProgram: getCurrentBuilderProgram, getProgram: updateProgram, updateRootFileNames, close, getResolutionCache };

    function close() {
        clearInvalidateResolutionsOfFailedLookupLocations();
        resolutionCache.clear();
        clearMap(sourceFilesCache, value => {
            if (value && value.fileWatcher) {
                value.fileWatcher.close();
                value.fileWatcher = undefined;
            }
        });
        if (configFileWatcher) {
            configFileWatcher.close();
            configFileWatcher = undefined;
        }
        extendedConfigCache?.clear();
        extendedConfigCache = undefined;
        if (sharedExtendedConfigFileWatchers) {
            clearMap(sharedExtendedConfigFileWatchers, closeFileWatcherOf);
            sharedExtendedConfigFileWatchers = undefined!;
        }
        if (watchedWildcardDirectories) {
            clearMap(watchedWildcardDirectories, closeFileWatcherOf);
            watchedWildcardDirectories = undefined!;
        }
        if (missingFilesMap) {
            clearMap(missingFilesMap, closeFileWatcher);
            missingFilesMap = undefined!;
        }
        if (parsedConfigs) {
            clearMap(parsedConfigs, config => {
                config.watcher?.close();
                config.watcher = undefined;
                if (config.watchedDirectories) clearMap(config.watchedDirectories, closeFileWatcherOf);
                config.watchedDirectories = undefined;
            });
            parsedConfigs = undefined;
        }
    }

    function getResolutionCache() {
        return resolutionCache;
    }

    function getCurrentBuilderProgram() {
        return builderProgram;
    }

    function getCurrentProgram() {
        return builderProgram && builderProgram.getProgramOrUndefined();
    }

    function synchronizeProgram() {
        writeLog(`Synchronizing program`);

        Debug.assert(compilerOptions);
        Debug.assert(rootFileNames);

        clearInvalidateResolutionsOfFailedLookupLocations();

        const program = getCurrentBuilderProgram();
        if (hasChangedCompilerOptions) {
            newLine = updateNewLine();
            if (program && changesAffectModuleResolution(program.getCompilerOptions(), compilerOptions)) {
                resolutionCache.onChangesAffectModuleResolution();
            }
        }

        const { hasInvalidatedResolutions, hasInvalidatedLibResolutions } = resolutionCache.createHasInvalidatedResolutions(customHasInvalidatedResolutions, customHasInvalidLibResolutions);
        const {
            originalReadFile,
            originalFileExists,
            originalDirectoryExists,
            originalCreateDirectory,
            originalWriteFile,
            readFileWithCache,
        } = changeCompilerHostLikeToUseCache(compilerHost, toPath);
        if (isProgramUptoDate(getCurrentProgram(), rootFileNames, compilerOptions, path => getSourceVersion(path, readFileWithCache), fileName => compilerHost.fileExists(fileName), hasInvalidatedResolutions, hasInvalidatedLibResolutions, hasChangedAutomaticTypeDirectiveNames, getParsedCommandLine, projectReferences)) {
            if (hasChangedConfigFileParsingErrors) {
                if (reportFileChangeDetectedOnCreateProgram) {
                    reportWatchDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation);
                }
                builderProgram = createProgram(/*rootNames*/ undefined, /*options*/ undefined, compilerHost, builderProgram, configFileParsingDiagnostics, projectReferences);
                hasChangedConfigFileParsingErrors = false;
            }
        }
        else {
            if (reportFileChangeDetectedOnCreateProgram) {
                reportWatchDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation);
            }
            createNewProgram(hasInvalidatedResolutions, hasInvalidatedLibResolutions);
        }

        reportFileChangeDetectedOnCreateProgram = false;
        if (host.afterProgramCreate && program !== builderProgram) {
            host.afterProgramCreate(builderProgram);
        }

        compilerHost.readFile = originalReadFile;
        compilerHost.fileExists = originalFileExists;
        compilerHost.directoryExists = originalDirectoryExists;
        compilerHost.createDirectory = originalCreateDirectory;
        compilerHost.writeFile = originalWriteFile!;

        return builderProgram;
    }

    function createNewProgram(hasInvalidatedResolutions: HasInvalidatedResolutions, hasInvalidatedLibResolutions: HasInvalidatedLibResolutions) {
        // Compile the program
        writeLog("CreatingProgramWith::");
        writeLog(`  roots: ${JSON.stringify(rootFileNames)}`);
        writeLog(`  options: ${JSON.stringify(compilerOptions)}`);
        if (projectReferences) writeLog(`  projectReferences: ${JSON.stringify(projectReferences)}`);

        const needsUpdateInTypeRootWatch = hasChangedCompilerOptions || !getCurrentProgram();
        hasChangedCompilerOptions = false;
        hasChangedConfigFileParsingErrors = false;
        resolutionCache.startCachingPerDirectoryResolution();
        compilerHost.hasInvalidatedResolutions = hasInvalidatedResolutions;
        compilerHost.hasInvalidatedLibResolutions = hasInvalidatedLibResolutions;
        compilerHost.hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
        const oldProgram = getCurrentProgram();
        builderProgram = createProgram(rootFileNames, compilerOptions, compilerHost, builderProgram, configFileParsingDiagnostics, projectReferences);
        resolutionCache.finishCachingPerDirectoryResolution(builderProgram.getProgram(), oldProgram);

        // Update watches
        updateMissingFilePathsWatch(
            builderProgram.getProgram(),
            missingFilesMap || (missingFilesMap = new Map()),
            watchMissingFilePath,
        );
        if (needsUpdateInTypeRootWatch) {
            resolutionCache.updateTypeRootsWatch();
        }

        if (missingFilePathsRequestedForRelease) {
            // These are the paths that program creater told us as not in use any more but were missing on the disk.
            // We didnt remove the entry for them from sourceFiles cache so that we dont have to do File IO,
            // if there is already watcher for it (for missing files)
            // At this point our watches were updated, hence now we know that these paths are not tracked and need to be removed
            // so that at later time we have correct result of their presence
            for (const missingFilePath of missingFilePathsRequestedForRelease) {
                if (!missingFilesMap.has(missingFilePath)) {
                    sourceFilesCache.delete(missingFilePath);
                }
            }
            missingFilePathsRequestedForRelease = undefined;
        }
    }

    function updateRootFileNames(files: string[]) {
        Debug.assert(!configFileName, "Cannot update root file names with config file watch mode");
        rootFileNames = files;
        scheduleProgramUpdate();
    }

    function updateNewLine() {
        return getNewLineCharacter(compilerOptions || optionsToExtendForConfigFile);
    }

    function toPath(fileName: string) {
        return ts_toPath(fileName, currentDirectory, getCanonicalFileName);
    }

    function isFileMissingOnHost(hostSourceFile: HostFileInfo | undefined): hostSourceFile is FileMissingOnHost {
        return typeof hostSourceFile === "boolean";
    }

    function isFilePresenceUnknownOnHost(hostSourceFile: FileMayBePresentOnHost): hostSourceFile is FilePresenceUnknownOnHost {
        return typeof (hostSourceFile as FilePresenceUnknownOnHost).version === "boolean";
    }

    function fileExists(fileName: string) {
        const path = toPath(fileName);
        // If file is missing on host from cache, we can definitely say file doesnt exist
        // otherwise we need to ensure from the disk
        if (isFileMissingOnHost(sourceFilesCache.get(path))) {
            return false;
        }

        return directoryStructureHost.fileExists(fileName);
    }

    function getVersionedSourceFileByPath(fileName: string, path: Path, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined {
        const hostSourceFile = sourceFilesCache.get(path);
        // No source file on the host
        if (isFileMissingOnHost(hostSourceFile)) {
            return undefined;
        }

        // Create new source file if requested or the versions dont match
        const impliedNodeFormat = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions.impliedNodeFormat : undefined;
        if (hostSourceFile === undefined || shouldCreateNewSourceFile || isFilePresenceUnknownOnHost(hostSourceFile) || hostSourceFile.sourceFile.impliedNodeFormat !== impliedNodeFormat) {
            const sourceFile = getNewSourceFile(fileName, languageVersionOrOptions, onError);
            if (hostSourceFile) {
                if (sourceFile) {
                    // Set the source file and create file watcher now that file was present on the disk
                    (hostSourceFile as FilePresentOnHost).sourceFile = sourceFile;
                    hostSourceFile.version = sourceFile.version;
                    if (!hostSourceFile.fileWatcher) {
                        hostSourceFile.fileWatcher = watchFilePath(path, fileName, onSourceFileChange, PollingInterval.Low, watchOptions, WatchType.SourceFile);
                    }
                }
                else {
                    // There is no source file on host any more, close the watch, missing file paths will track it
                    if (hostSourceFile.fileWatcher) {
                        hostSourceFile.fileWatcher.close();
                    }
                    sourceFilesCache.set(path, false);
                }
            }
            else {
                if (sourceFile) {
                    const fileWatcher = watchFilePath(path, fileName, onSourceFileChange, PollingInterval.Low, watchOptions, WatchType.SourceFile);
                    sourceFilesCache.set(path, { sourceFile, version: sourceFile.version, fileWatcher });
                }
                else {
                    sourceFilesCache.set(path, false);
                }
            }
            return sourceFile;
        }
        return hostSourceFile.sourceFile;
    }

    function nextSourceFileVersion(path: Path) {
        const hostSourceFile = sourceFilesCache.get(path);
        if (hostSourceFile !== undefined) {
            if (isFileMissingOnHost(hostSourceFile)) {
                // The next version, lets set it as presence unknown file
                sourceFilesCache.set(path, { version: false });
            }
            else {
                (hostSourceFile as FilePresenceUnknownOnHost).version = false;
            }
        }
    }

    function getSourceVersion(path: Path, readFileWithCache: (file: string) => string | undefined): string | undefined {
        const hostSourceFile = sourceFilesCache.get(path);
        if (!hostSourceFile) return undefined;
        if (hostSourceFile.version) return hostSourceFile.version;
        // Read file and get new version
        const text = readFileWithCache(path);
        return text !== undefined ? getSourceFileVersionAsHashFromText(compilerHost, text) : undefined;
    }

    function onReleaseOldSourceFile(oldSourceFile: SourceFile, _oldOptions: CompilerOptions, hasSourceFileByPath: boolean) {
        const hostSourceFileInfo = sourceFilesCache.get(oldSourceFile.resolvedPath);
        // If this is the source file thats in the cache and new program doesnt need it,
        // remove the cached entry.
        // Note we arent deleting entry if file became missing in new program or
        // there was version update and new source file was created.
        if (hostSourceFileInfo !== undefined) {
            // record the missing file paths so they can be removed later if watchers arent tracking them
            if (isFileMissingOnHost(hostSourceFileInfo)) {
                (missingFilePathsRequestedForRelease || (missingFilePathsRequestedForRelease = [])).push(oldSourceFile.path);
            }
            else if ((hostSourceFileInfo as FilePresentOnHost).sourceFile === oldSourceFile) {
                if (hostSourceFileInfo.fileWatcher) {
                    hostSourceFileInfo.fileWatcher.close();
                }
                sourceFilesCache.delete(oldSourceFile.resolvedPath);
                if (!hasSourceFileByPath) {
                    resolutionCache.removeResolutionsOfFile(oldSourceFile.path);
                }
            }
        }
    }

    function reportWatchDiagnostic(message: DiagnosticMessage) {
        if (host.onWatchStatusChange) {
            host.onWatchStatusChange(createCompilerDiagnostic(message), newLine, compilerOptions || optionsToExtendForConfigFile);
        }
    }

    function hasChangedAutomaticTypeDirectiveNames() {
        return resolutionCache.hasChangedAutomaticTypeDirectiveNames();
    }

    function clearInvalidateResolutionsOfFailedLookupLocations() {
        if (!timerToInvalidateFailedLookupResolutions) return false;
        host.clearTimeout!(timerToInvalidateFailedLookupResolutions);
        timerToInvalidateFailedLookupResolutions = undefined;
        return true;
    }

    function scheduleInvalidateResolutionsOfFailedLookupLocations() {
        if (!host.setTimeout || !host.clearTimeout) {
            return resolutionCache.invalidateResolutionsOfFailedLookupLocations();
        }
        const pending = clearInvalidateResolutionsOfFailedLookupLocations();
        writeLog(`Scheduling invalidateFailedLookup${pending ? ", Cancelled earlier one" : ""}`);
        timerToInvalidateFailedLookupResolutions = host.setTimeout(invalidateResolutionsOfFailedLookup, 250, "timerToInvalidateFailedLookupResolutions");
    }

    function invalidateResolutionsOfFailedLookup() {
        timerToInvalidateFailedLookupResolutions = undefined;
        if (resolutionCache.invalidateResolutionsOfFailedLookupLocations()) {
            scheduleProgramUpdate();
        }
    }

    // Upon detecting a file change, wait for 250ms and then perform a recompilation. This gives batch
    // operations (such as saving all modified files in an editor) a chance to complete before we kick
    // off a new compilation.
    function scheduleProgramUpdate() {
        if (!host.setTimeout || !host.clearTimeout) {
            return;
        }

        if (timerToUpdateProgram) {
            host.clearTimeout(timerToUpdateProgram);
        }
        writeLog("Scheduling update");
        timerToUpdateProgram = host.setTimeout(updateProgramWithWatchStatus, 250, "timerToUpdateProgram");
    }

    function scheduleProgramReload() {
        Debug.assert(!!configFileName);
        updateLevel = ProgramUpdateLevel.Full;
        scheduleProgramUpdate();
    }

    function updateProgramWithWatchStatus() {
        timerToUpdateProgram = undefined;
        reportFileChangeDetectedOnCreateProgram = true;
        updateProgram();
    }

    function updateProgram() {
        switch (updateLevel) {
            case ProgramUpdateLevel.RootNamesAndUpdate:
                perfLogger?.logStartUpdateProgram("PartialConfigReload");
                reloadFileNamesFromConfigFile();
                break;
            case ProgramUpdateLevel.Full:
                perfLogger?.logStartUpdateProgram("FullConfigReload");
                reloadConfigFile();
                break;
            default:
                perfLogger?.logStartUpdateProgram("SynchronizeProgram");
                synchronizeProgram();
                break;
        }
        perfLogger?.logStopUpdateProgram("Done");
        return getCurrentBuilderProgram();
    }

    function reloadFileNamesFromConfigFile() {
        writeLog("Reloading new file names and options");

        Debug.assert(compilerOptions);
        Debug.assert(configFileName);

        updateLevel = ProgramUpdateLevel.Update;
        rootFileNames = getFileNamesFromConfigSpecs(compilerOptions.configFile!.configFileSpecs!, getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory), compilerOptions, parseConfigFileHost, extraFileExtensions);
        if (updateErrorForNoInputFiles(rootFileNames, getNormalizedAbsolutePath(configFileName, currentDirectory), compilerOptions.configFile!.configFileSpecs!, configFileParsingDiagnostics!, canConfigFileJsonReportNoInputFiles)) {
            hasChangedConfigFileParsingErrors = true;
        }

        // Update the program
        synchronizeProgram();
    }

    function reloadConfigFile() {
        Debug.assert(configFileName);
        writeLog(`Reloading config file: ${configFileName}`);
        updateLevel = ProgramUpdateLevel.Update;

        if (cachedDirectoryStructureHost) {
            cachedDirectoryStructureHost.clearCache();
        }
        parseConfigFile();
        hasChangedCompilerOptions = true;
        synchronizeProgram();

        // Update the wild card directory watch
        watchConfigFileWildCardDirectories();

        // Update extended config file watch
        updateExtendedConfigFilesWatches(toPath(configFileName), compilerOptions, watchOptions, WatchType.ExtendedConfigFile);
    }

    function parseConfigFile() {
        Debug.assert(configFileName);
        setConfigFileParsingResult(
            getParsedCommandLineOfConfigFile(
                configFileName,
                optionsToExtendForConfigFile,
                parseConfigFileHost,
                extendedConfigCache ||= new Map(),
                watchOptionsToExtend,
                extraFileExtensions,
            )!,
        ); // TODO: GH#18217
    }

    function setConfigFileParsingResult(configFileParseResult: ParsedCommandLine) {
        rootFileNames = configFileParseResult.fileNames;
        compilerOptions = configFileParseResult.options;
        watchOptions = configFileParseResult.watchOptions;
        projectReferences = configFileParseResult.projectReferences;
        wildcardDirectories = configFileParseResult.wildcardDirectories;
        configFileParsingDiagnostics = getConfigFileParsingDiagnostics(configFileParseResult).slice();
        canConfigFileJsonReportNoInputFiles = canJsonReportNoInputFiles(configFileParseResult.raw);
        hasChangedConfigFileParsingErrors = true;
    }

    function getParsedCommandLine(configFileName: string): ParsedCommandLine | undefined {
        const configPath = toPath(configFileName);
        let config = parsedConfigs?.get(configPath);
        if (config) {
            if (!config.updateLevel) return config.parsedCommandLine;
            // With host implementing getParsedCommandLine we cant just update file names
            if (config.parsedCommandLine && config.updateLevel === ProgramUpdateLevel.RootNamesAndUpdate && !host.getParsedCommandLine) {
                writeLog("Reloading new file names and options");
                Debug.assert(compilerOptions);
                const fileNames = getFileNamesFromConfigSpecs(
                    config.parsedCommandLine.options.configFile!.configFileSpecs!,
                    getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory),
                    compilerOptions,
                    parseConfigFileHost,
                );
                config.parsedCommandLine = { ...config.parsedCommandLine, fileNames };
                config.updateLevel = undefined;
                return config.parsedCommandLine;
            }
        }

        writeLog(`Loading config file: ${configFileName}`);
        const parsedCommandLine = host.getParsedCommandLine ?
            host.getParsedCommandLine(configFileName) :
            getParsedCommandLineFromConfigFileHost(configFileName);
        if (config) {
            config.parsedCommandLine = parsedCommandLine;
            config.updateLevel = undefined;
        }
        else {
            (parsedConfigs ||= new Map()).set(configPath, config = { parsedCommandLine });
        }
        watchReferencedProject(configFileName, configPath, config);
        return parsedCommandLine;
    }

    function getParsedCommandLineFromConfigFileHost(configFileName: string) {
        // Ignore the file absent errors
        const onUnRecoverableConfigFileDiagnostic = parseConfigFileHost.onUnRecoverableConfigFileDiagnostic;
        parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = noop;
        const parsedCommandLine = getParsedCommandLineOfConfigFile(
            configFileName,
            /*optionsToExtend*/ undefined,
            parseConfigFileHost,
            extendedConfigCache ||= new Map(),
            watchOptionsToExtend,
        );
        parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = onUnRecoverableConfigFileDiagnostic;
        return parsedCommandLine;
    }

    function onReleaseParsedCommandLine(fileName: string) {
        const path = toPath(fileName);
        const config = parsedConfigs?.get(path);
        if (!config) return;

        parsedConfigs!.delete(path);
        if (config.watchedDirectories) clearMap(config.watchedDirectories, closeFileWatcherOf);
        config.watcher?.close();
        clearSharedExtendedConfigFileWatcher(path, sharedExtendedConfigFileWatchers);
    }

    function watchFilePath(
        path: Path,
        file: string,
        callback: (fileName: string, eventKind: FileWatcherEventKind, filePath: Path) => void,
        pollingInterval: PollingInterval,
        options: WatchOptions | undefined,
        watchType: WatchType,
    ): FileWatcher {
        return watchFile(file, (fileName, eventKind) => callback(fileName, eventKind, path), pollingInterval, options, watchType);
    }

    function onSourceFileChange(fileName: string, eventKind: FileWatcherEventKind, path: Path) {
        updateCachedSystemWithFile(fileName, path, eventKind);

        // Update the source file cache
        if (eventKind === FileWatcherEventKind.Deleted && sourceFilesCache.has(path)) {
            resolutionCache.invalidateResolutionOfFile(path);
        }
        nextSourceFileVersion(path);

        // Update the program
        scheduleProgramUpdate();
    }

    function updateCachedSystemWithFile(fileName: string, path: Path, eventKind: FileWatcherEventKind) {
        if (cachedDirectoryStructureHost) {
            cachedDirectoryStructureHost.addOrDeleteFile(fileName, path, eventKind);
        }
    }

    function watchMissingFilePath(missingFilePath: Path, missingFileName: string) {
        // If watching missing referenced config file, we are already watching it so no need for separate watcher
        return parsedConfigs?.has(missingFilePath) ?
            noopFileWatcher :
            watchFilePath(
                missingFilePath,
                missingFileName,
                onMissingFileChange,
                PollingInterval.Medium,
                watchOptions,
                WatchType.MissingFile,
            );
    }

    function onMissingFileChange(fileName: string, eventKind: FileWatcherEventKind, missingFilePath: Path) {
        updateCachedSystemWithFile(fileName, missingFilePath, eventKind);

        if (eventKind === FileWatcherEventKind.Created && missingFilesMap.has(missingFilePath)) {
            missingFilesMap.get(missingFilePath)!.close();
            missingFilesMap.delete(missingFilePath);

            // Delete the entry in the source files cache so that new source file is created
            nextSourceFileVersion(missingFilePath);

            // When a missing file is created, we should update the graph.
            scheduleProgramUpdate();
        }
    }

    function watchConfigFileWildCardDirectories() {
        updateWatchingWildcardDirectories(
            watchedWildcardDirectories || (watchedWildcardDirectories = new Map()),
            wildcardDirectories,
            watchWildcardDirectory,
        );
    }

    function watchWildcardDirectory(directory: string, flags: WatchDirectoryFlags) {
        return watchDirectory(
            directory,
            fileOrDirectory => {
                Debug.assert(configFileName);
                Debug.assert(compilerOptions);

                const fileOrDirectoryPath = toPath(fileOrDirectory);

                // Since the file existence changed, update the sourceFiles cache
                if (cachedDirectoryStructureHost) {
                    cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                }
                nextSourceFileVersion(fileOrDirectoryPath);

                if (
                    isIgnoredFileFromWildCardWatching({
                        watchedDirPath: toPath(directory),
                        fileOrDirectory,
                        fileOrDirectoryPath,
                        configFileName,
                        extraFileExtensions,
                        options: compilerOptions,
                        program: getCurrentBuilderProgram() || rootFileNames,
                        currentDirectory,
                        useCaseSensitiveFileNames,
                        writeLog,
                        toPath,
                    })
                ) return;

                // Reload is pending, do the reload
                if (updateLevel !== ProgramUpdateLevel.Full) {
                    updateLevel = ProgramUpdateLevel.RootNamesAndUpdate;

                    // Schedule Update the program
                    scheduleProgramUpdate();
                }
            },
            flags,
            watchOptions,
            WatchType.WildcardDirectory,
        );
    }

    function updateExtendedConfigFilesWatches(forProjectPath: Path, options: CompilerOptions | undefined, watchOptions: WatchOptions | undefined, watchType: WatchTypeRegistry["ExtendedConfigFile"] | WatchTypeRegistry["ExtendedConfigOfReferencedProject"]) {
        updateSharedExtendedConfigFileWatcher(
            forProjectPath,
            options,
            sharedExtendedConfigFileWatchers ||= new Map(),
            (extendedConfigFileName, extendedConfigFilePath) =>
                watchFile(
                    extendedConfigFileName,
                    (_fileName, eventKind) => {
                        updateCachedSystemWithFile(extendedConfigFileName, extendedConfigFilePath, eventKind);
                        // Update extended config cache
                        if (extendedConfigCache) cleanExtendedConfigCache(extendedConfigCache, extendedConfigFilePath, toPath);
                        // Update projects
                        const projects = sharedExtendedConfigFileWatchers.get(extendedConfigFilePath)?.projects;
                        // If there are no referenced projects this extended config file watcher depend on ignore
                        if (!projects?.size) return;
                        projects.forEach(projectPath => {
                            if (configFileName && toPath(configFileName) === projectPath) {
                                // If this is the config file of the project, reload completely
                                updateLevel = ProgramUpdateLevel.Full;
                            }
                            else {
                                // Reload config for the referenced projects and remove the resolutions from referenced projects since the config file changed
                                const config = parsedConfigs?.get(projectPath);
                                if (config) config.updateLevel = ProgramUpdateLevel.Full;
                                resolutionCache.removeResolutionsFromProjectReferenceRedirects(projectPath);
                            }
                            scheduleProgramUpdate();
                        });
                    },
                    PollingInterval.High,
                    watchOptions,
                    watchType,
                ),
            toPath,
        );
    }

    function watchReferencedProject(configFileName: string, configPath: Path, commandLine: ParsedConfig) {
        // Watch file
        commandLine.watcher ||= watchFile(
            configFileName,
            (_fileName, eventKind) => {
                updateCachedSystemWithFile(configFileName, configPath, eventKind);
                const config = parsedConfigs?.get(configPath);
                if (config) config.updateLevel = ProgramUpdateLevel.Full;
                resolutionCache.removeResolutionsFromProjectReferenceRedirects(configPath);
                scheduleProgramUpdate();
            },
            PollingInterval.High,
            commandLine.parsedCommandLine?.watchOptions || watchOptions,
            WatchType.ConfigFileOfReferencedProject,
        );
        // Watch Wild card
        updateWatchingWildcardDirectories(
            commandLine.watchedDirectories ||= new Map(),
            commandLine.parsedCommandLine?.wildcardDirectories,
            (directory, flags) =>
                watchDirectory(
                    directory,
                    fileOrDirectory => {
                        const fileOrDirectoryPath = toPath(fileOrDirectory);
                        // Since the file existence changed, update the sourceFiles cache
                        if (cachedDirectoryStructureHost) {
                            cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                        }
                        nextSourceFileVersion(fileOrDirectoryPath);

                        const config = parsedConfigs?.get(configPath);
                        if (!config?.parsedCommandLine) return;
                        if (
                            isIgnoredFileFromWildCardWatching({
                                watchedDirPath: toPath(directory),
                                fileOrDirectory,
                                fileOrDirectoryPath,
                                configFileName,
                                options: config.parsedCommandLine.options,
                                program: config.parsedCommandLine.fileNames,
                                currentDirectory,
                                useCaseSensitiveFileNames,
                                writeLog,
                                toPath,
                            })
                        ) return;

                        // Reload is pending, do the reload
                        if (config.updateLevel !== ProgramUpdateLevel.Full) {
                            config.updateLevel = ProgramUpdateLevel.RootNamesAndUpdate;

                            // Schedule Update the program
                            scheduleProgramUpdate();
                        }
                    },
                    flags,
                    commandLine.parsedCommandLine?.watchOptions || watchOptions,
                    WatchType.WildcardDirectoryOfReferencedProject,
                ),
        );
        // Watch extended config files
        updateExtendedConfigFilesWatches(
            configPath,
            commandLine.parsedCommandLine?.options,
            commandLine.parsedCommandLine?.watchOptions || watchOptions,
            WatchType.ExtendedConfigOfReferencedProject,
        );
    }
}
