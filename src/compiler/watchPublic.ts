namespace ts {
export interface ReadBuildProgramHost {
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory(): string;
    readFile(fileName: string): string | undefined;
    /*@internal*/
    getBuildInfo?(fileName: string, configFilePath: string | undefined): ts.BuildInfo | undefined;
}
export function readBuilderProgram(compilerOptions: ts.CompilerOptions, host: ReadBuildProgramHost) {
    const buildInfoPath = ts.getTsBuildInfoEmitOutputFilePath(compilerOptions);
    if (!buildInfoPath) return undefined;
    let buildInfo;
    if (host.getBuildInfo) {
        // host provides buildinfo, get it from there. This allows host to cache it
        buildInfo = host.getBuildInfo(buildInfoPath, compilerOptions.configFilePath);
    }
    else {
        const content = host.readFile(buildInfoPath);
        if (!content) return undefined;
        buildInfo = ts.getBuildInfo(buildInfoPath, content);
    }
    if (!buildInfo || buildInfo.version !== ts.version || !buildInfo.program) return undefined;
    return ts.createBuilderProgramUsingProgramBuildInfo(buildInfo.program, buildInfoPath, host);
}

export function createIncrementalCompilerHost(options: ts.CompilerOptions, system = ts.sys): ts.CompilerHost {
    const host = ts.createCompilerHostWorker(options, /*setParentNodes*/ undefined, system);
    host.createHash = ts.maybeBind(system, system.createHash);
    host.disableUseFileVersionAsSignature = system.disableUseFileVersionAsSignature;
    host.storeFilesChangingSignatureDuringEmit = system.storeFilesChangingSignatureDuringEmit;
    ts.setGetSourceFileAsHashVersioned(host, system);
    ts.changeCompilerHostLikeToUseCache(host, fileName => ts.toPath(fileName, host.getCurrentDirectory(), host.getCanonicalFileName));
    return host;
}

export interface IncrementalProgramOptions<T extends ts.BuilderProgram> {
    rootNames: readonly string[];
    options: ts.CompilerOptions;
    configFileParsingDiagnostics?: readonly ts.Diagnostic[];
    projectReferences?: readonly ts.ProjectReference[];
    host?: ts.CompilerHost;
    createProgram?: CreateProgram<T>;
}

export function createIncrementalProgram<T extends ts.BuilderProgram = ts.EmitAndSemanticDiagnosticsBuilderProgram>({
    rootNames, options, configFileParsingDiagnostics, projectReferences, host, createProgram
}: IncrementalProgramOptions<T>): T {
    host = host || createIncrementalCompilerHost(options);
    createProgram = createProgram || ts.createEmitAndSemanticDiagnosticsBuilderProgram as any as CreateProgram<T>;
    const oldProgram = readBuilderProgram(options, host) as any as T;
    return createProgram(rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences);
}

export type WatchStatusReporter = (diagnostic: ts.Diagnostic, newLine: string, options: ts.CompilerOptions, errorCount?: number) => void;
/** Create the program with rootNames and options, if they are undefined, oldProgram and new configFile diagnostics create new program */
export type CreateProgram<T extends ts.BuilderProgram> = (rootNames: readonly string[] | undefined, options: ts.CompilerOptions | undefined, host?: ts.CompilerHost, oldProgram?: T, configFileParsingDiagnostics?: readonly ts.Diagnostic[], projectReferences?: readonly ts.ProjectReference[] | undefined) => T;

/** Host that has watch functionality used in --watch mode */
export interface WatchHost {
    /** If provided, called with Diagnostic message that informs about change in watch status */
    onWatchStatusChange?(diagnostic: ts.Diagnostic, newLine: string, options: ts.CompilerOptions, errorCount?: number): void;

    /** Used to watch changes in source files, missing files needed to update the program or config file */
    watchFile(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number, options?: ts.WatchOptions): ts.FileWatcher;
    /** Used to watch resolved module's failed lookup locations, config file specs, type roots where auto type reference directives are added */
    watchDirectory(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher;
    /** If provided, will be used to set delayed compilation, so that multiple changes in short span are compiled together */
    setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
    /** If provided, will be used to reset existing delayed compilation */
    clearTimeout?(timeoutId: any): void;
}
export interface ProgramHost<T extends ts.BuilderProgram> {
    /**
     * Used to create the program when need for program creation or recreation detected
     */
    createProgram: CreateProgram<T>;

    // Sub set of compiler host methods to read and generate new program
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    getCurrentDirectory(): string;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
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

    /** If provided, used to resolve the module names, otherwise typescript's default module resolution */
    resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ts.ResolvedProjectReference | undefined, options: ts.CompilerOptions, containingSourceFile?: ts.SourceFile): (ts.ResolvedModule | undefined)[];
    /** If provided, used to resolve type reference directives, otherwise typescript's default resolution */
    resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[] | readonly ts.FileReference[], containingFile: string, redirectedReference: ts.ResolvedProjectReference | undefined, options: ts.CompilerOptions, containingFileMode?: ts.SourceFile["impliedNodeFormat"] | undefined): (ts.ResolvedTypeReferenceDirective | undefined)[];
    /** If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives */
    hasInvalidatedResolutions?(filePath: ts.Path): boolean;
    /**
     * Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it
     */
    getModuleResolutionCache?(): ts.ModuleResolutionCache | undefined;
}
/** Internal interface used to wire emit through same host */

/*@internal*/
export interface ProgramHost<T extends ts.BuilderProgram> {
    // TODO: GH#18217 Optional methods are frequently asserted
    createDirectory?(path: string): void;
    writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
    // For testing
    disableUseFileVersionAsSignature?: boolean;
    storeFilesChangingSignatureDuringEmit?: boolean;
    now?(): Date;
}

export interface WatchCompilerHost<T extends ts.BuilderProgram> extends ProgramHost<T>, WatchHost {
    /** Instead of using output d.ts file from project reference, use its source file */
    useSourceOfProjectReferenceRedirect?(): boolean;

    /** If provided, use this method to get parsed command lines for referenced projects */
    getParsedCommandLine?(fileName: string): ts.ParsedCommandLine | undefined;

    /** If provided, callback to invoke after every new program creation */
    afterProgramCreate?(program: T): void;
}

/**
 * Host to create watch with root files and options
 */
export interface WatchCompilerHostOfFilesAndCompilerOptions<T extends ts.BuilderProgram> extends WatchCompilerHost<T> {
    /** root files to use to generate program */
    rootFiles: string[];

    /** Compiler options */
    options: ts.CompilerOptions;

    watchOptions?: ts.WatchOptions;

    /** Project References */
    projectReferences?: readonly ts.ProjectReference[];
}

/**
 * Host to create watch with config file
 */
export interface WatchCompilerHostOfConfigFile<T extends ts.BuilderProgram> extends WatchCompilerHost<T>, ts.ConfigFileDiagnosticsReporter {
    /** Name of the config file to compile */
    configFileName: string;

    /** Options to extend */
    optionsToExtend?: ts.CompilerOptions;

    watchOptionsToExtend?: ts.WatchOptions;

    extraFileExtensions?: readonly ts.FileExtensionInfo[]

    /**
     * Used to generate source file names from the config file and its include, exclude, files rules
     * and also to cache the directory stucture
     */
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
}

/**
 * Host to create watch with config file that is already parsed (from tsc)
 */
/*@internal*/
export interface WatchCompilerHostOfConfigFile<T extends ts.BuilderProgram> extends WatchCompilerHost<T> {
    configFileParsingResult?: ts.ParsedCommandLine;
    extendedConfigCache?: ts.Map<ts.ExtendedConfigCacheEntry>;
}

export interface Watch<T> {
    /** Synchronize with host and get updated program */
    getProgram(): T;
    /** Gets the existing program without synchronizing with changes on host */
    /*@internal*/
    getCurrentProgram(): T;
    /** Closes the watch */
    close(): void;
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
export function createWatchCompilerHost<T extends ts.BuilderProgram>(configFileName: string, optionsToExtend: ts.CompilerOptions | undefined, system: ts.System, createProgram?: CreateProgram<T>, reportDiagnostic?: ts.DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, watchOptionsToExtend?: ts.WatchOptions, extraFileExtensions?: readonly ts.FileExtensionInfo[]): WatchCompilerHostOfConfigFile<T>;
export function createWatchCompilerHost<T extends ts.BuilderProgram>(rootFiles: string[], options: ts.CompilerOptions, system: ts.System, createProgram?: CreateProgram<T>, reportDiagnostic?: ts.DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, projectReferences?: readonly ts.ProjectReference[], watchOptions?: ts.WatchOptions): WatchCompilerHostOfFilesAndCompilerOptions<T>;
export function createWatchCompilerHost<T extends ts.BuilderProgram>(rootFilesOrConfigFileName: string | string[], options: ts.CompilerOptions | undefined, system: ts.System, createProgram?: CreateProgram<T>, reportDiagnostic?: ts.DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, projectReferencesOrWatchOptionsToExtend?: readonly ts.ProjectReference[] | ts.WatchOptions, watchOptionsOrExtraFileExtensions?: ts.WatchOptions | readonly ts.FileExtensionInfo[]): WatchCompilerHostOfFilesAndCompilerOptions<T> | WatchCompilerHostOfConfigFile<T> {
    if (ts.isArray(rootFilesOrConfigFileName)) {
        return ts.createWatchCompilerHostOfFilesAndCompilerOptions({
            rootFiles: rootFilesOrConfigFileName,
            options: options!,
            watchOptions: watchOptionsOrExtraFileExtensions as ts.WatchOptions,
            projectReferences: projectReferencesOrWatchOptionsToExtend as readonly ts.ProjectReference[],
            system,
            createProgram,
            reportDiagnostic,
            reportWatchStatus,
        });
    }
    else {
        return ts.createWatchCompilerHostOfConfigFile({
            configFileName: rootFilesOrConfigFileName,
            optionsToExtend: options,
            watchOptionsToExtend: projectReferencesOrWatchOptionsToExtend as ts.WatchOptions,
            extraFileExtensions: watchOptionsOrExtraFileExtensions as readonly ts.FileExtensionInfo[],
            system,
            createProgram,
            reportDiagnostic,
            reportWatchStatus,
        });
    }
}

interface ParsedConfig {
    /** ParsedCommandLine for the config file if present */
    parsedCommandLine: ts.ParsedCommandLine | undefined;
    /** File watcher of the config file */
    watcher?: ts.FileWatcher;
    /** Wild card directories watched from this config file */
    watchedDirectories?: ts.Map<ts.WildcardDirectoryWatcher>;
    /** Reload to be done for this config file */
    reloadLevel?: ts.ConfigFileProgramReloadLevel.Partial | ts.ConfigFileProgramReloadLevel.Full;
}

/**
 * Creates the watch from the host for root files and compiler options
 */
export function createWatchProgram<T extends ts.BuilderProgram>(host: WatchCompilerHostOfFilesAndCompilerOptions<T>): WatchOfFilesAndCompilerOptions<T>;
/**
 * Creates the watch from the host for config file
 */
export function createWatchProgram<T extends ts.BuilderProgram>(host: WatchCompilerHostOfConfigFile<T>): WatchOfConfigFile<T>;
export function createWatchProgram<T extends ts.BuilderProgram>(host: WatchCompilerHostOfFilesAndCompilerOptions<T> & WatchCompilerHostOfConfigFile<T>): WatchOfFilesAndCompilerOptions<T> | WatchOfConfigFile<T> {
    interface FilePresentOnHost {
        version: string;
        sourceFile: ts.SourceFile;
        fileWatcher: ts.FileWatcher;
    }
    type FileMissingOnHost = false;
    interface FilePresenceUnknownOnHost {
        version: false;
        fileWatcher?: ts.FileWatcher;
    }
    type FileMayBePresentOnHost = FilePresentOnHost | FilePresenceUnknownOnHost;
    type HostFileInfo = FilePresentOnHost | FileMissingOnHost | FilePresenceUnknownOnHost;

    let builderProgram: T;
    let reloadLevel: ts.ConfigFileProgramReloadLevel;                      // level to indicate if the program needs to be reloaded from config file/just filenames etc
    let missingFilesMap: ts.ESMap<ts.Path, ts.FileWatcher>;                       // Map of file watchers for the missing files
    let watchedWildcardDirectories: ts.ESMap<string, ts.WildcardDirectoryWatcher>; // map of watchers for the wild card directories in the config file
    let timerToUpdateProgram: any;                                      // timer callback to recompile the program
    let timerToInvalidateFailedLookupResolutions: any;                  // timer callback to invalidate resolutions for changes in failed lookup locations
    let parsedConfigs: ts.ESMap<ts.Path, ParsedConfig> | undefined;           // Parsed commandline and watching cached for referenced projects
    let sharedExtendedConfigFileWatchers: ts.ESMap<ts.Path, ts.SharedExtendedConfigFileWatcher<ts.Path>>; // Map of file watchers for extended files, shared between different referenced projects
    let extendedConfigCache = host.extendedConfigCache;                 // Cache for extended config evaluation
    let reportFileChangeDetectedOnCreateProgram = false;                // True if synchronizeProgram should report "File change detected..." when a new program is created

    const sourceFilesCache = new ts.Map<string, HostFileInfo>();           // Cache that stores the source file and version info
    let missingFilePathsRequestedForRelease: ts.Path[] | undefined;        // These paths are held temporarily so that we can remove the entry from source file cache if the file is not tracked by missing files
    let hasChangedCompilerOptions = false;                              // True if the compiler options have changed between compilations

    const useCaseSensitiveFileNames = host.useCaseSensitiveFileNames();
    const currentDirectory = host.getCurrentDirectory();
    const { configFileName, optionsToExtend: optionsToExtendForConfigFile = {}, watchOptionsToExtend, extraFileExtensions, createProgram } = host;
    let { rootFiles: rootFileNames, options: compilerOptions, watchOptions, projectReferences } = host;
    let wildcardDirectories: ts.MapLike<ts.WatchDirectoryFlags> | undefined;
    let configFileParsingDiagnostics: ts.Diagnostic[] | undefined;
    let canConfigFileJsonReportNoInputFiles = false;
    let hasChangedConfigFileParsingErrors = false;

    const cachedDirectoryStructureHost = configFileName === undefined ? undefined : ts.createCachedDirectoryStructureHost(host, currentDirectory, useCaseSensitiveFileNames);
    const directoryStructureHost: ts.DirectoryStructureHost = cachedDirectoryStructureHost || host;
    const parseConfigFileHost = ts.parseConfigHostFromCompilerHostLike(host, directoryStructureHost);

    // From tsc we want to get already parsed result and hence check for rootFileNames
    let newLine = updateNewLine();
    if (configFileName && host.configFileParsingResult) {
        setConfigFileParsingResult(host.configFileParsingResult);
        newLine = updateNewLine();
    }
    reportWatchDiagnostic(ts.Diagnostics.Starting_compilation_in_watch_mode);
    if (configFileName && !host.configFileParsingResult) {
        newLine = ts.getNewLineCharacter(optionsToExtendForConfigFile, () => host.getNewLine());
        ts.Debug.assert(!rootFileNames);
        parseConfigFile();
        newLine = updateNewLine();
    }

    const { watchFile, watchDirectory, writeLog } = ts.createWatchFactory(host, compilerOptions);
    const getCanonicalFileName = ts.createGetCanonicalFileName(useCaseSensitiveFileNames);

    writeLog(`Current directory: ${currentDirectory} CaseSensitiveFileNames: ${useCaseSensitiveFileNames}`);
    let configFileWatcher: ts.FileWatcher | undefined;
    if (configFileName) {
        configFileWatcher = watchFile(configFileName, scheduleProgramReload, ts.PollingInterval.High, watchOptions, ts.WatchType.ConfigFile);
    }

    const compilerHost = ts.createCompilerHostFromProgramHost(host, () => compilerOptions, directoryStructureHost) as ts.CompilerHost & ts.ResolutionCacheHost;
    ts.setGetSourceFileAsHashVersioned(compilerHost, host);
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
    compilerHost.getCompilationSettings = () => compilerOptions;
    compilerHost.useSourceOfProjectReferenceRedirect = ts.maybeBind(host, host.useSourceOfProjectReferenceRedirect);
    compilerHost.watchDirectoryOfFailedLookupLocation = (dir, cb, flags) => watchDirectory(dir, cb, flags, watchOptions, ts.WatchType.FailedLookupLocations);
    compilerHost.watchAffectingFileLocation = (file, cb) => watchFile(file, cb, ts.PollingInterval.High, watchOptions, ts.WatchType.AffectingFileLocation);
    compilerHost.watchTypeRootsDirectory = (dir, cb, flags) => watchDirectory(dir, cb, flags, watchOptions, ts.WatchType.TypeRoots);
    compilerHost.getCachedDirectoryStructureHost = () => cachedDirectoryStructureHost;
    compilerHost.scheduleInvalidateResolutionsOfFailedLookupLocations = scheduleInvalidateResolutionsOfFailedLookupLocations;
    compilerHost.onInvalidatedResolution = scheduleProgramUpdate;
    compilerHost.onChangedAutomaticTypeDirectiveNames = scheduleProgramUpdate;
    compilerHost.fileIsOpen = ts.returnFalse;
    compilerHost.getCurrentProgram = getCurrentProgram;
    compilerHost.writeLog = writeLog;
    compilerHost.getParsedCommandLine = getParsedCommandLine;

    // Cache for the module resolution
    const resolutionCache = ts.createResolutionCache(compilerHost,
        configFileName ?
            ts.getDirectoryPath(ts.getNormalizedAbsolutePath(configFileName, currentDirectory)) :
            currentDirectory,
        /*logChangesWhenResolvingModule*/ false
    );
    // Resolve module using host module resolution strategy if provided otherwise use resolution cache to resolve module names
    compilerHost.resolveModuleNames = host.resolveModuleNames ?
        ((...args) => host.resolveModuleNames!(...args)) :
        ((moduleNames, containingFile, reusedNames, redirectedReference, _options, sourceFile) => resolutionCache.resolveModuleNames(moduleNames, containingFile, reusedNames, redirectedReference, sourceFile));
    compilerHost.resolveTypeReferenceDirectives = host.resolveTypeReferenceDirectives ?
        ((...args) => host.resolveTypeReferenceDirectives!(...args)) :
        ((typeDirectiveNames, containingFile, redirectedReference, _options, containingFileMode) => resolutionCache.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile, redirectedReference, containingFileMode));
    compilerHost.getModuleResolutionCache = host.resolveModuleNames ?
        ts.maybeBind(host, host.getModuleResolutionCache) :
        (() => resolutionCache.getModuleResolutionCache());
    const userProvidedResolution = !!host.resolveModuleNames || !!host.resolveTypeReferenceDirectives;
    // All resolutions are invalid if user provided resolutions and didnt supply hasInvalidatedResolutions
    const customHasInvalidatedResolutions = userProvidedResolution ?
        ts.maybeBind(host, host.hasInvalidatedResolutions) || ts.returnTrue :
        ts.returnFalse;

    builderProgram = readBuilderProgram(compilerOptions, compilerHost) as any as T;
    synchronizeProgram();

    // Update the wild card directory watch
    watchConfigFileWildCardDirectories();

    // Update extended config file watch
    if (configFileName) updateExtendedConfigFilesWatches(toPath(configFileName), compilerOptions, watchOptions, ts.WatchType.ExtendedConfigFile);

    return configFileName ?
        { getCurrentProgram: getCurrentBuilderProgram, getProgram: updateProgram, close } :
        { getCurrentProgram: getCurrentBuilderProgram, getProgram: updateProgram, updateRootFileNames, close };

    function close() {
        clearInvalidateResolutionsOfFailedLookupLocations();
        resolutionCache.clear();
        ts.clearMap(sourceFilesCache, value => {
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
            ts.clearMap(sharedExtendedConfigFileWatchers, ts.closeFileWatcherOf);
            sharedExtendedConfigFileWatchers = undefined!;
        }
        if (watchedWildcardDirectories) {
            ts.clearMap(watchedWildcardDirectories, ts.closeFileWatcherOf);
            watchedWildcardDirectories = undefined!;
        }
        if (missingFilesMap) {
            ts.clearMap(missingFilesMap, ts.closeFileWatcher);
            missingFilesMap = undefined!;
        }
        if (parsedConfigs) {
            ts.clearMap(parsedConfigs, config => {
                config.watcher?.close();
                config.watcher = undefined;
                if (config.watchedDirectories) ts.clearMap(config.watchedDirectories, ts.closeFileWatcherOf);
                config.watchedDirectories = undefined;
            });
            parsedConfigs = undefined;
        }
    }

    function getCurrentBuilderProgram() {
        return builderProgram;
    }

    function getCurrentProgram() {
        return builderProgram && builderProgram.getProgramOrUndefined();
    }

    function synchronizeProgram() {
        writeLog(`Synchronizing program`);
        clearInvalidateResolutionsOfFailedLookupLocations();

        const program = getCurrentBuilderProgram();
        if (hasChangedCompilerOptions) {
            newLine = updateNewLine();
            if (program && ts.changesAffectModuleResolution(program.getCompilerOptions(), compilerOptions)) {
                resolutionCache.clear();
            }
        }

        const hasInvalidatedResolutions = resolutionCache.createHasInvalidatedResolutions(customHasInvalidatedResolutions);
        const {
            originalReadFile, originalFileExists, originalDirectoryExists,
            originalCreateDirectory, originalWriteFile,
        } = ts.changeCompilerHostLikeToUseCache(compilerHost, toPath);
        if (ts.isProgramUptoDate(getCurrentProgram(), rootFileNames, compilerOptions, getSourceVersion, fileName => compilerHost.fileExists(fileName), hasInvalidatedResolutions, hasChangedAutomaticTypeDirectiveNames, getParsedCommandLine, projectReferences)) {
            if (hasChangedConfigFileParsingErrors) {
                if (reportFileChangeDetectedOnCreateProgram) {
                    reportWatchDiagnostic(ts.Diagnostics.File_change_detected_Starting_incremental_compilation);
                }
                builderProgram = createProgram(/*rootNames*/ undefined, /*options*/ undefined, compilerHost, builderProgram, configFileParsingDiagnostics, projectReferences);
                hasChangedConfigFileParsingErrors = false;
            }
        }
        else {
            if (reportFileChangeDetectedOnCreateProgram) {
                reportWatchDiagnostic(ts.Diagnostics.File_change_detected_Starting_incremental_compilation);
            }
            createNewProgram(hasInvalidatedResolutions);
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

    function createNewProgram(hasInvalidatedResolutions: ts.HasInvalidatedResolutions) {
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
        compilerHost.hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
        const oldProgram = getCurrentProgram();
        builderProgram = createProgram(rootFileNames, compilerOptions, compilerHost, builderProgram, configFileParsingDiagnostics, projectReferences);
        resolutionCache.finishCachingPerDirectoryResolution(builderProgram.getProgram(), oldProgram);

        // Update watches
        ts.updateMissingFilePathsWatch(builderProgram.getProgram(), missingFilesMap || (missingFilesMap = new ts.Map()), watchMissingFilePath);
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
        ts.Debug.assert(!configFileName, "Cannot update root file names with config file watch mode");
        rootFileNames = files;
        scheduleProgramUpdate();
    }

    function updateNewLine() {
        return ts.getNewLineCharacter(compilerOptions || optionsToExtendForConfigFile, () => host.getNewLine());
    }

    function toPath(fileName: string) {
        return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
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

    function getVersionedSourceFileByPath(fileName: string, path: ts.Path, languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined {
        const hostSourceFile = sourceFilesCache.get(path);
        // No source file on the host
        if (isFileMissingOnHost(hostSourceFile)) {
            return undefined;
        }

        // Create new source file if requested or the versions dont match
        if (hostSourceFile === undefined || shouldCreateNewSourceFile || isFilePresenceUnknownOnHost(hostSourceFile)) {
            const sourceFile = getNewSourceFile(fileName, languageVersionOrOptions, onError);
            if (hostSourceFile) {
                if (sourceFile) {
                    // Set the source file and create file watcher now that file was present on the disk
                    (hostSourceFile as FilePresentOnHost).sourceFile = sourceFile;
                    hostSourceFile.version = sourceFile.version;
                    if (!hostSourceFile.fileWatcher) {
                        hostSourceFile.fileWatcher = watchFilePath(path, fileName, onSourceFileChange, ts.PollingInterval.Low, watchOptions, ts.WatchType.SourceFile);
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
                    const fileWatcher = watchFilePath(path, fileName, onSourceFileChange, ts.PollingInterval.Low, watchOptions, ts.WatchType.SourceFile);
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

    function nextSourceFileVersion(path: ts.Path) {
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

    function getSourceVersion(path: ts.Path): string | undefined {
        const hostSourceFile = sourceFilesCache.get(path);
        return !hostSourceFile || !hostSourceFile.version ? undefined : hostSourceFile.version;
    }

    function onReleaseOldSourceFile(oldSourceFile: ts.SourceFile, _oldOptions: ts.CompilerOptions, hasSourceFileByPath: boolean) {
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

    function reportWatchDiagnostic(message: ts.DiagnosticMessage) {
        if (host.onWatchStatusChange) {
            host.onWatchStatusChange(ts.createCompilerDiagnostic(message), newLine, compilerOptions || optionsToExtendForConfigFile);
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
        timerToInvalidateFailedLookupResolutions = host.setTimeout(invalidateResolutionsOfFailedLookup, 250);
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
        timerToUpdateProgram = host.setTimeout(updateProgramWithWatchStatus, 250);
    }

    function scheduleProgramReload() {
        ts.Debug.assert(!!configFileName);
        reloadLevel = ts.ConfigFileProgramReloadLevel.Full;
        scheduleProgramUpdate();
    }

    function updateProgramWithWatchStatus() {
        timerToUpdateProgram = undefined;
        reportFileChangeDetectedOnCreateProgram = true;
        updateProgram();
    }

    function updateProgram() {
        switch (reloadLevel) {
            case ts.ConfigFileProgramReloadLevel.Partial:
                ts.perfLogger.logStartUpdateProgram("PartialConfigReload");
                reloadFileNamesFromConfigFile();
                break;
            case ts.ConfigFileProgramReloadLevel.Full:
                ts.perfLogger.logStartUpdateProgram("FullConfigReload");
                reloadConfigFile();
                break;
            default:
                ts.perfLogger.logStartUpdateProgram("SynchronizeProgram");
                synchronizeProgram();
                break;
        }
        ts.perfLogger.logStopUpdateProgram("Done");
        return getCurrentBuilderProgram();
    }

    function reloadFileNamesFromConfigFile() {
        writeLog("Reloading new file names and options");
        reloadLevel = ts.ConfigFileProgramReloadLevel.None;
        rootFileNames = ts.getFileNamesFromConfigSpecs(compilerOptions.configFile!.configFileSpecs!, ts.getNormalizedAbsolutePath(ts.getDirectoryPath(configFileName), currentDirectory), compilerOptions, parseConfigFileHost, extraFileExtensions);
        if (ts.updateErrorForNoInputFiles(rootFileNames, ts.getNormalizedAbsolutePath(configFileName, currentDirectory), compilerOptions.configFile!.configFileSpecs!, configFileParsingDiagnostics!, canConfigFileJsonReportNoInputFiles)) {
            hasChangedConfigFileParsingErrors = true;
        }

        // Update the program
        synchronizeProgram();
    }

    function reloadConfigFile() {
        writeLog(`Reloading config file: ${configFileName}`);
        reloadLevel = ts.ConfigFileProgramReloadLevel.None;

        if (cachedDirectoryStructureHost) {
            cachedDirectoryStructureHost.clearCache();
        }
        parseConfigFile();
        hasChangedCompilerOptions = true;
        synchronizeProgram();

        // Update the wild card directory watch
        watchConfigFileWildCardDirectories();

        // Update extended config file watch
        updateExtendedConfigFilesWatches(toPath(configFileName), compilerOptions, watchOptions, ts.WatchType.ExtendedConfigFile);
    }

    function parseConfigFile() {
        setConfigFileParsingResult(ts.getParsedCommandLineOfConfigFile(
            configFileName,
            optionsToExtendForConfigFile,
            parseConfigFileHost,
            extendedConfigCache ||= new ts.Map(),
            watchOptionsToExtend,
            extraFileExtensions
        )!); // TODO: GH#18217
    }

    function setConfigFileParsingResult(configFileParseResult: ts.ParsedCommandLine) {
        rootFileNames = configFileParseResult.fileNames;
        compilerOptions = configFileParseResult.options;
        watchOptions = configFileParseResult.watchOptions;
        projectReferences = configFileParseResult.projectReferences;
        wildcardDirectories = configFileParseResult.wildcardDirectories;
        configFileParsingDiagnostics = ts.getConfigFileParsingDiagnostics(configFileParseResult).slice();
        canConfigFileJsonReportNoInputFiles = ts.canJsonReportNoInputFiles(configFileParseResult.raw);
        hasChangedConfigFileParsingErrors = true;
    }

    function getParsedCommandLine(configFileName: string): ts.ParsedCommandLine | undefined {
        const configPath = toPath(configFileName);
        let config = parsedConfigs?.get(configPath);
        if (config) {
            if (!config.reloadLevel) return config.parsedCommandLine;
            // With host implementing getParsedCommandLine we cant just update file names
            if (config.parsedCommandLine && config.reloadLevel === ts.ConfigFileProgramReloadLevel.Partial && !host.getParsedCommandLine) {
                writeLog("Reloading new file names and options");
                const fileNames = ts.getFileNamesFromConfigSpecs(
                    config.parsedCommandLine.options.configFile!.configFileSpecs!,
                    ts.getNormalizedAbsolutePath(ts.getDirectoryPath(configFileName), currentDirectory),
                    compilerOptions,
                    parseConfigFileHost,
                );
                config.parsedCommandLine = { ...config.parsedCommandLine, fileNames };
                config.reloadLevel = undefined;
                return config.parsedCommandLine;
            }
        }

        writeLog(`Loading config file: ${configFileName}`);
        const parsedCommandLine = host.getParsedCommandLine ?
            host.getParsedCommandLine(configFileName) :
            getParsedCommandLineFromConfigFileHost(configFileName);
        if (config) {
            config.parsedCommandLine = parsedCommandLine;
            config.reloadLevel = undefined;
        }
        else {
            (parsedConfigs ||= new ts.Map()).set(configPath, config = { parsedCommandLine });
        }
        watchReferencedProject(configFileName, configPath, config);
        return parsedCommandLine;
    }

    function getParsedCommandLineFromConfigFileHost(configFileName: string) {
        // Ignore the file absent errors
        const onUnRecoverableConfigFileDiagnostic = parseConfigFileHost.onUnRecoverableConfigFileDiagnostic;
        parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = ts.noop;
        const parsedCommandLine = ts.getParsedCommandLineOfConfigFile(
            configFileName,
            /*optionsToExtend*/ undefined,
            parseConfigFileHost,
            extendedConfigCache ||= new ts.Map(),
            watchOptionsToExtend
        );
        parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = onUnRecoverableConfigFileDiagnostic;
        return parsedCommandLine;
    }

    function onReleaseParsedCommandLine(fileName: string) {
        const path = toPath(fileName);
        const config = parsedConfigs?.get(path);
        if (!config) return;

        parsedConfigs!.delete(path);
        if (config.watchedDirectories) ts.clearMap(config.watchedDirectories, ts.closeFileWatcherOf);
        config.watcher?.close();
        ts.clearSharedExtendedConfigFileWatcher(path, sharedExtendedConfigFileWatchers);
    }

    function watchFilePath(
        path: ts.Path,
        file: string,
        callback: (fileName: string, eventKind: ts.FileWatcherEventKind, filePath: ts.Path) => void,
        pollingInterval: ts.PollingInterval,
        options: ts.WatchOptions | undefined,
        watchType: ts.WatchType
    ): ts.FileWatcher {
        return watchFile(file, (fileName, eventKind) => callback(fileName, eventKind, path), pollingInterval, options, watchType);
    }

    function onSourceFileChange(fileName: string, eventKind: ts.FileWatcherEventKind, path: ts.Path) {
        updateCachedSystemWithFile(fileName, path, eventKind);

        // Update the source file cache
        if (eventKind === ts.FileWatcherEventKind.Deleted && sourceFilesCache.has(path)) {
            resolutionCache.invalidateResolutionOfFile(path);
        }
        nextSourceFileVersion(path);

        // Update the program
        scheduleProgramUpdate();
    }

    function updateCachedSystemWithFile(fileName: string, path: ts.Path, eventKind: ts.FileWatcherEventKind) {
        if (cachedDirectoryStructureHost) {
            cachedDirectoryStructureHost.addOrDeleteFile(fileName, path, eventKind);
        }
    }

    function watchMissingFilePath(missingFilePath: ts.Path) {
        // If watching missing referenced config file, we are already watching it so no need for separate watcher
        return parsedConfigs?.has(missingFilePath) ?
            ts.noopFileWatcher :
            watchFilePath(missingFilePath, missingFilePath, onMissingFileChange, ts.PollingInterval.Medium, watchOptions, ts.WatchType.MissingFile);
    }

    function onMissingFileChange(fileName: string, eventKind: ts.FileWatcherEventKind, missingFilePath: ts.Path) {
        updateCachedSystemWithFile(fileName, missingFilePath, eventKind);

        if (eventKind === ts.FileWatcherEventKind.Created && missingFilesMap.has(missingFilePath)) {
            missingFilesMap.get(missingFilePath)!.close();
            missingFilesMap.delete(missingFilePath);

            // Delete the entry in the source files cache so that new source file is created
            nextSourceFileVersion(missingFilePath);

            // When a missing file is created, we should update the graph.
            scheduleProgramUpdate();
        }
    }

    function watchConfigFileWildCardDirectories() {
        if (wildcardDirectories) {
            ts.updateWatchingWildcardDirectories(
                watchedWildcardDirectories || (watchedWildcardDirectories = new ts.Map()),
                new ts.Map(ts.getEntries(wildcardDirectories)),
                watchWildcardDirectory
            );
        }
        else if (watchedWildcardDirectories) {
            ts.clearMap(watchedWildcardDirectories, ts.closeFileWatcherOf);
        }
    }

    function watchWildcardDirectory(directory: string, flags: ts.WatchDirectoryFlags) {
        return watchDirectory(
            directory,
            fileOrDirectory => {
                ts.Debug.assert(!!configFileName);

                const fileOrDirectoryPath = toPath(fileOrDirectory);

                // Since the file existence changed, update the sourceFiles cache
                if (cachedDirectoryStructureHost) {
                    cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                }
                nextSourceFileVersion(fileOrDirectoryPath);

                if (ts.isIgnoredFileFromWildCardWatching({
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
                })) return;

                // Reload is pending, do the reload
                if (reloadLevel !== ts.ConfigFileProgramReloadLevel.Full) {
                    reloadLevel = ts.ConfigFileProgramReloadLevel.Partial;

                    // Schedule Update the program
                    scheduleProgramUpdate();
                }
            },
            flags,
            watchOptions,
            ts.WatchType.WildcardDirectory
        );
    }

    function updateExtendedConfigFilesWatches(forProjectPath: ts.Path, options: ts.CompilerOptions | undefined, watchOptions: ts.WatchOptions | undefined, watchType: ts.WatchTypeRegistry["ExtendedConfigFile"] | ts.WatchTypeRegistry["ExtendedConfigOfReferencedProject"]) {
        ts.updateSharedExtendedConfigFileWatcher(
            forProjectPath,
            options,
            sharedExtendedConfigFileWatchers ||= new ts.Map(),
            (extendedConfigFileName, extendedConfigFilePath) => watchFile(
                extendedConfigFileName,
                (_fileName, eventKind) => {
                    updateCachedSystemWithFile(extendedConfigFileName, extendedConfigFilePath, eventKind);
                    // Update extended config cache
                    if (extendedConfigCache) ts.cleanExtendedConfigCache(extendedConfigCache, extendedConfigFilePath, toPath);
                    // Update projects
                    const projects = sharedExtendedConfigFileWatchers.get(extendedConfigFilePath)?.projects;
                    // If there are no referenced projects this extended config file watcher depend on ignore
                    if (!projects?.size) return;
                    projects.forEach(projectPath => {
                        if (toPath(configFileName) === projectPath) {
                            // If this is the config file of the project, reload completely
                            reloadLevel = ts.ConfigFileProgramReloadLevel.Full;
                        }
                        else {
                            // Reload config for the referenced projects and remove the resolutions from referenced projects since the config file changed
                            const config = parsedConfigs?.get(projectPath);
                            if (config) config.reloadLevel = ts.ConfigFileProgramReloadLevel.Full;
                            resolutionCache.removeResolutionsFromProjectReferenceRedirects(projectPath);
                        }
                        scheduleProgramUpdate();
                    });
                },
                ts.PollingInterval.High,
                watchOptions,
                watchType
            ),
            toPath,
        );
    }

    function watchReferencedProject(configFileName: string, configPath: ts.Path, commandLine: ParsedConfig) {
        // Watch file
        commandLine.watcher ||= watchFile(
            configFileName,
            (_fileName, eventKind) => {
                updateCachedSystemWithFile(configFileName, configPath, eventKind);
                const config = parsedConfigs?.get(configPath);
                if (config) config.reloadLevel = ts.ConfigFileProgramReloadLevel.Full;
                resolutionCache.removeResolutionsFromProjectReferenceRedirects(configPath);
                scheduleProgramUpdate();
            },
            ts.PollingInterval.High,
            commandLine.parsedCommandLine?.watchOptions || watchOptions,
            ts.WatchType.ConfigFileOfReferencedProject
        );
        // Watch Wild card
        if (commandLine.parsedCommandLine?.wildcardDirectories) {
            ts.updateWatchingWildcardDirectories(
                commandLine.watchedDirectories ||= new ts.Map(),
                new ts.Map(ts.getEntries(commandLine.parsedCommandLine?.wildcardDirectories)),
                (directory, flags) => watchDirectory(
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
                        if (ts.isIgnoredFileFromWildCardWatching({
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
                        })) return;

                        // Reload is pending, do the reload
                        if (config.reloadLevel !== ts.ConfigFileProgramReloadLevel.Full) {
                            config.reloadLevel = ts.ConfigFileProgramReloadLevel.Partial;

                            // Schedule Update the program
                            scheduleProgramUpdate();
                        }
                    },
                    flags,
                    commandLine.parsedCommandLine?.watchOptions || watchOptions,
                    ts.WatchType.WildcardDirectoryOfReferencedProject
                )
            );
        }
        else if (commandLine.watchedDirectories) {
            ts.clearMap(commandLine.watchedDirectories, ts.closeFileWatcherOf);
            commandLine.watchedDirectories = undefined;
        }
        // Watch extended config files
        updateExtendedConfigFilesWatches(
            configPath,
            commandLine.parsedCommandLine?.options,
            commandLine.parsedCommandLine?.watchOptions || watchOptions,
            ts.WatchType.ExtendedConfigOfReferencedProject
        );
    }
}
}
