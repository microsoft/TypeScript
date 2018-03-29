/// <reference path="program.ts" />
/// <reference path="builder.ts" />
/// <reference path="resolutionCache.ts"/>

/*@internal*/
namespace ts {
    const sysFormatDiagnosticsHost: FormatDiagnosticsHost = sys ? {
        getCurrentDirectory: () => sys.getCurrentDirectory(),
        getNewLine: () => sys.newLine,
        getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames)
    } : undefined;

    /**
     * Create a function that reports error by writing to the system and handles the formating of the diagnostic
     */
    export function createDiagnosticReporter(system: System, pretty?: boolean): DiagnosticReporter {
        const host: FormatDiagnosticsHost = system === sys ? sysFormatDiagnosticsHost : {
            getCurrentDirectory: () => system.getCurrentDirectory(),
            getNewLine: () => system.newLine,
            getCanonicalFileName: createGetCanonicalFileName(system.useCaseSensitiveFileNames),
        };
        if (!pretty) {
            return diagnostic => system.write(formatDiagnostic(diagnostic, host));
        }

        const diagnostics: Diagnostic[] = new Array(1);
        return diagnostic => {
            diagnostics[0] = diagnostic;
            system.write(formatDiagnosticsWithColorAndContext(diagnostics, host) + host.getNewLine());
            diagnostics[0] = undefined;
        };
    }

    function clearScreenIfNotWatchingForFileChanges(system: System, diagnostic: Diagnostic, options: CompilerOptions) {
        if (system.clearScreen &&
            !options.preserveWatchOutput &&
            diagnostic.code !== Diagnostics.Compilation_complete_Watching_for_file_changes.code &&
            !options.extendedDiagnostics &&
            !options.diagnostics) {
            system.clearScreen();
        }
    }

    /**
     * Create a function that reports watch status by writing to the system and handles the formating of the diagnostic
     */
    export function createWatchStatusReporter(system: System, pretty?: boolean): WatchStatusReporter {
        return pretty ?
            (diagnostic, newLine, options) => {
                clearScreenIfNotWatchingForFileChanges(system, diagnostic, options);
                let output = `[${formatColorAndReset(new Date().toLocaleTimeString(), ForegroundColorEscapeSequences.Grey)}] `;
                output += `${flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${newLine + newLine + newLine}`;
                system.write(output);
            } :
            (diagnostic, newLine, options) => {
                clearScreenIfNotWatchingForFileChanges(system, diagnostic, options);
                let output = new Date().toLocaleTimeString() + " - ";
                output += `${flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${newLine + newLine + newLine}`;
                system.write(output);
            };
    }

    /**
     * Interface extending ParseConfigHost to support ParseConfigFile that reads config file and reports errors
     */
    export interface ParseConfigFileHost extends ParseConfigHost, ConfigFileDiagnosticsReporter {
        getCurrentDirectory(): string;
    }

    /** Parses config file using System interface */
    export function parseConfigFileWithSystem(configFileName: string, optionsToExtend: CompilerOptions, system: System, reportDiagnostic: DiagnosticReporter) {
        const host: ParseConfigFileHost = <any>system;
        host.onConfigFileDiagnostic = reportDiagnostic;
        host.onUnRecoverableConfigFileDiagnostic = diagnostic => reportUnrecoverableDiagnostic(sys, reportDiagnostic, diagnostic);
        const result = getParsedCommandLineOfConfigFile(configFileName, optionsToExtend, host);
        host.onConfigFileDiagnostic = undefined;
        host.onUnRecoverableConfigFileDiagnostic = undefined;
        return result;
    }

    /**
     * Reads the config file, reports errors if any and exits if the config file cannot be found
     */
    export function getParsedCommandLineOfConfigFile(configFileName: string, optionsToExtend: CompilerOptions, host: ParseConfigFileHost): ParsedCommandLine | undefined {
        let configFileText: string;
        try {
            configFileText = host.readFile(configFileName);
        }
        catch (e) {
            const error = createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, configFileName, e.message);
            host.onUnRecoverableConfigFileDiagnostic(error);
            return undefined;
        }
        if (!configFileText) {
            const error = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
            host.onUnRecoverableConfigFileDiagnostic(error);
            return undefined;
        }

        const result = parseJsonText(configFileName, configFileText);
        result.parseDiagnostics.forEach(diagnostic => host.onConfigFileDiagnostic(diagnostic));

        const cwd = host.getCurrentDirectory();
        const configParseResult = parseJsonSourceFileConfigFileContent(result, host, getNormalizedAbsolutePath(getDirectoryPath(configFileName), cwd), optionsToExtend, getNormalizedAbsolutePath(configFileName, cwd));
        configParseResult.errors.forEach(diagnostic => host.onConfigFileDiagnostic(diagnostic));

        return configParseResult;
    }

    /**
     * Program structure needed to emit the files and report diagnostics
     */
    export interface ProgramToEmitFilesAndReportErrors {
        getCurrentDirectory(): string;
        getCompilerOptions(): CompilerOptions;
        getSourceFiles(): ReadonlyArray<SourceFile>;
        getSyntacticDiagnostics(): ReadonlyArray<Diagnostic>;
        getOptionsDiagnostics(): ReadonlyArray<Diagnostic>;
        getGlobalDiagnostics(): ReadonlyArray<Diagnostic>;
        getSemanticDiagnostics(): ReadonlyArray<Diagnostic>;
        emit(): EmitResult;
    }

    /**
     * Helper that emit files, report diagnostics and lists emitted and/or source files depending on compiler options
     */
    export function emitFilesAndReportErrors(program: ProgramToEmitFilesAndReportErrors, reportDiagnostic: DiagnosticReporter, writeFileName?: (s: string) => void) {
        // First get and report any syntactic errors.
        const diagnostics = program.getSyntacticDiagnostics().slice();
        let reportSemanticDiagnostics = false;

        // If we didn't have any syntactic errors, then also try getting the global and
        // semantic errors.
        if (diagnostics.length === 0) {
            addRange(diagnostics, program.getOptionsDiagnostics());
            addRange(diagnostics, program.getGlobalDiagnostics());

            if (diagnostics.length === 0) {
                reportSemanticDiagnostics = true;
            }
        }

        // Emit and report any errors we ran into.
        const { emittedFiles, emitSkipped, diagnostics: emitDiagnostics } = program.emit();
        addRange(diagnostics, emitDiagnostics);

        if (reportSemanticDiagnostics) {
            addRange(diagnostics, program.getSemanticDiagnostics());
        }

        sortAndDeduplicateDiagnostics(diagnostics).forEach(reportDiagnostic);
        if (writeFileName) {
            const currentDir = program.getCurrentDirectory();
            forEach(emittedFiles, file => {
                const filepath = getNormalizedAbsolutePath(file, currentDir);
                writeFileName(`TSFILE: ${filepath}`);
            });

            if (program.getCompilerOptions().listFiles) {
                forEach(program.getSourceFiles(), file => {
                    writeFileName(file.fileName);
                });
            }
        }

        if (emitSkipped && diagnostics.length > 0) {
            // If the emitter didn't emit anything, then pass that value along.
            return ExitStatus.DiagnosticsPresent_OutputsSkipped;
        }
        else if (diagnostics.length > 0) {
            // The emitter emitted something, inform the caller if that happened in the presence
            // of diagnostics or not.
            return ExitStatus.DiagnosticsPresent_OutputsGenerated;
        }
        return ExitStatus.Success;
    }

    const noopFileWatcher: FileWatcher = { close: noop };

    /**
     * Creates the watch compiler host that can be extended with config file or root file names and options host
     */
    function createWatchCompilerHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system = sys, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter): WatchCompilerHost<T> {
        if (!createProgram) {
            createProgram = createEmitAndSemanticDiagnosticsBuilderProgram as any;
        }

        let host: DirectoryStructureHost = system;
        const useCaseSensitiveFileNames = () => system.useCaseSensitiveFileNames;
        const writeFileName = (s: string) => system.write(s + system.newLine);
        return {
            useCaseSensitiveFileNames,
            getNewLine: () => system.newLine,
            getCurrentDirectory: () => system.getCurrentDirectory(),
            getDefaultLibLocation,
            getDefaultLibFileName: options => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options)),
            fileExists: path => system.fileExists(path),
            readFile: (path, encoding) => system.readFile(path, encoding),
            directoryExists: path => system.directoryExists(path),
            getDirectories: path => system.getDirectories(path),
            readDirectory: (path, extensions, exclude, include, depth) => system.readDirectory(path, extensions, exclude, include, depth),
            realpath: system.realpath && (path => system.realpath(path)),
            getEnvironmentVariable: system.getEnvironmentVariable && (name => system.getEnvironmentVariable(name)),
            watchFile: system.watchFile ? ((path, callback, pollingInterval) => system.watchFile(path, callback, pollingInterval)) : () => noopFileWatcher,
            watchDirectory: system.watchDirectory ? ((path, callback, recursive) => system.watchDirectory(path, callback, recursive)) : () => noopFileWatcher,
            setTimeout: system.setTimeout ? ((callback, ms, ...args: any[]) => system.setTimeout.call(system, callback, ms, ...args)) : noop,
            clearTimeout: system.clearTimeout ? (timeoutId => system.clearTimeout(timeoutId)) : noop,
            trace: s => system.write(s),
            onWatchStatusChange: reportWatchStatus || createWatchStatusReporter(system),
            createDirectory: path => system.createDirectory(path),
            writeFile: (path, data, writeByteOrderMark) => system.writeFile(path, data, writeByteOrderMark),
            onCachedDirectoryStructureHostCreate: cacheHost => host = cacheHost || system,
            createHash: system.createHash && (s => system.createHash(s)),
            createProgram,
            afterProgramCreate: emitFilesAndReportErrorUsingBuilder
        };

        function getDefaultLibLocation() {
            return getDirectoryPath(normalizePath(system.getExecutingFilePath()));
        }

        function emitFilesAndReportErrorUsingBuilder(builderProgram: BuilderProgram) {
            emitFilesAndReportErrors(builderProgram, reportDiagnostic, writeFileName);
        }
    }

    /**
     * Report error and exit
     */
    function reportUnrecoverableDiagnostic(system: System, reportDiagnostic: DiagnosticReporter, diagnostic: Diagnostic) {
        reportDiagnostic(diagnostic);
        system.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
    }

    /**
     * Creates the watch compiler host from system for config file in watch mode
     */
    export function createWatchCompilerHostOfConfigFile<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(configFileName: string, optionsToExtend: CompilerOptions | undefined, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter): WatchCompilerHostOfConfigFile<T> {
        reportDiagnostic = reportDiagnostic || createDiagnosticReporter(system);
        const host = createWatchCompilerHost(system, createProgram, reportDiagnostic, reportWatchStatus) as WatchCompilerHostOfConfigFile<T>;
        host.onConfigFileDiagnostic = reportDiagnostic;
        host.onUnRecoverableConfigFileDiagnostic = diagnostic => reportUnrecoverableDiagnostic(system, reportDiagnostic, diagnostic);
        host.configFileName = configFileName;
        host.optionsToExtend = optionsToExtend;
        return host;
    }

    /**
     * Creates the watch compiler host from system for compiling root files and options in watch mode
     */
    export function createWatchCompilerHostOfFilesAndCompilerOptions<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(rootFiles: string[], options: CompilerOptions, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter): WatchCompilerHostOfFilesAndCompilerOptions<T> {
        const host = createWatchCompilerHost(system, createProgram, reportDiagnostic || createDiagnosticReporter(system), reportWatchStatus) as WatchCompilerHostOfFilesAndCompilerOptions<T>;
        host.rootFiles = rootFiles;
        host.options = options;
        return host;
    }
}

namespace ts {
    export type DiagnosticReporter = (diagnostic: Diagnostic) => void;
    export type WatchStatusReporter = (diagnostic: Diagnostic, newLine: string, options: CompilerOptions) => void;
    export type CreateProgram<T extends BuilderProgram> = (rootNames: ReadonlyArray<string>, options: CompilerOptions, host?: CompilerHost, oldProgram?: T) => T;
    export interface WatchCompilerHost<T extends BuilderProgram> {
        /**
         * Used to create the program when need for program creation or recreation detected
         */
        createProgram: CreateProgram<T>;
        /** If provided, callback to invoke after every new program creation */
        afterProgramCreate?(program: T): void;
        /** If provided, called with Diagnostic message that informs about change in watch status */
        onWatchStatusChange?(diagnostic: Diagnostic, newLine: string, options: CompilerOptions): void;

        // Only for testing
        /*@internal*/
        maxNumberOfFilesToIterateForInvalidation?: number;

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
        readDirectory?(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];

        /** Symbol links resolution */
        realpath?(path: string): string;
        /** If provided would be used to write log about compilation */
        trace?(s: string): void;
        /** If provided is used to get the environment variable */
        getEnvironmentVariable?(name: string): string;

        /** If provided, used to resolve the module names, otherwise typescript's default module resolution */
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames?: string[]): ResolvedModule[];
        /** If provided, used to resolve type reference directives, otherwise typescript's default resolution */
        resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[], containingFile: string): (ResolvedTypeReferenceDirective | undefined)[];

        /** Used to watch changes in source files, missing files needed to update the program or config file */
        watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher;
        /** Used to watch resolved module's failed lookup locations, config file specs, type roots where auto type reference directives are added */
        watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
        /** If provided, will be used to set delayed compilation, so that multiple changes in short span are compiled together */
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        /** If provided, will be used to reset existing delayed compilation */
        clearTimeout?(timeoutId: any): void;
    }

    /** Internal interface used to wire emit through same host */
    /*@internal*/
    export interface WatchCompilerHost<T extends BuilderProgram> {
        createDirectory?(path: string): void;
        writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
        onCachedDirectoryStructureHostCreate?(host: CachedDirectoryStructureHost): void;
    }

    /**
     * Host to create watch with root files and options
     */
    export interface WatchCompilerHostOfFilesAndCompilerOptions<T extends BuilderProgram> extends WatchCompilerHost<T> {
        /** root files to use to generate program */
        rootFiles: string[];

        /** Compiler options */
        options: CompilerOptions;
    }

    /**
     * Reports config file diagnostics
     */
    export interface ConfigFileDiagnosticsReporter {
        /**
         * Reports the diagnostics in reading/writing or parsing of the config file
         */
        onConfigFileDiagnostic: DiagnosticReporter;

        /**
         * Reports unrecoverable error when parsing config file
         */
        onUnRecoverableConfigFileDiagnostic: DiagnosticReporter;
    }

    /**
     * Host to create watch with config file
     */
    export interface WatchCompilerHostOfConfigFile<T extends BuilderProgram> extends WatchCompilerHost<T>, ConfigFileDiagnosticsReporter {
        /** Name of the config file to compile */
        configFileName: string;

        /** Options to extend */
        optionsToExtend?: CompilerOptions;

        /**
         * Used to generate source file names from the config file and its include, exclude, files rules
         * and also to cache the directory stucture
         */
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
    }

    /**
     * Host to create watch with config file that is already parsed (from tsc)
     */
    /*@internal*/
    export interface WatchCompilerHostOfConfigFile<T extends BuilderProgram> extends WatchCompilerHost<T> {
        rootFiles?: string[];
        options?: CompilerOptions;
        optionsToExtend?: CompilerOptions;
        configFileSpecs?: ConfigFileSpecs;
        configFileWildCardDirectories?: MapLike<WatchDirectoryFlags>;
    }

    export interface Watch<T> {
        /** Synchronize with host and get updated program */
        getProgram(): T;
        /** Gets the existing program without synchronizing with changes on host */
        /*@internal*/
        getCurrentProgram(): T;
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
    export function createWatchCompilerHost<T extends BuilderProgram>(rootFiles: string[], options: CompilerOptions, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter): WatchCompilerHostOfFilesAndCompilerOptions<T>;
    export function createWatchCompilerHost<T extends BuilderProgram>(configFileName: string, optionsToExtend: CompilerOptions | undefined, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter): WatchCompilerHostOfConfigFile<T>;
    export function createWatchCompilerHost<T extends BuilderProgram>(rootFilesOrConfigFileName: string | string[], options: CompilerOptions | undefined, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter): WatchCompilerHostOfFilesAndCompilerOptions<T> | WatchCompilerHostOfConfigFile<T> {
        if (isArray(rootFilesOrConfigFileName)) {
            return createWatchCompilerHostOfFilesAndCompilerOptions(rootFilesOrConfigFileName, options, system, createProgram, reportDiagnostic, reportWatchStatus);
        }
        else {
            return createWatchCompilerHostOfConfigFile(rootFilesOrConfigFileName, options, system, createProgram, reportDiagnostic, reportWatchStatus);
        }
    }

    const initialVersion = 1;

    /**
     * Creates the watch from the host for root files and compiler options
     */
    export function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfFilesAndCompilerOptions<T>): WatchOfFilesAndCompilerOptions<T>;
    /**
     * Creates the watch from the host for config file
     */
    export function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfConfigFile<T>): WatchOfConfigFile<T>;
    export function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfFilesAndCompilerOptions<T> & WatchCompilerHostOfConfigFile<T>): WatchOfFilesAndCompilerOptions<T> | WatchOfConfigFile<T> {
        interface FilePresentOnHost {
            version: number;
            sourceFile: SourceFile;
            fileWatcher: FileWatcher;
        }
        type FileMissingOnHost = number;
        interface FilePresenceUnknownOnHost {
            version: number;
        }
        type FileMayBePresentOnHost = FilePresentOnHost | FilePresenceUnknownOnHost;
        type HostFileInfo = FilePresentOnHost | FileMissingOnHost | FilePresenceUnknownOnHost;

        let builderProgram: T;
        let reloadLevel: ConfigFileProgramReloadLevel;                      // level to indicate if the program needs to be reloaded from config file/just filenames etc
        let missingFilesMap: Map<FileWatcher>;                              // Map of file watchers for the missing files
        let watchedWildcardDirectories: Map<WildcardDirectoryWatcher>;      // map of watchers for the wild card directories in the config file
        let timerToUpdateProgram: any;                                      // timer callback to recompile the program

        const sourceFilesCache = createMap<HostFileInfo>();                 // Cache that stores the source file and version info
        let missingFilePathsRequestedForRelease: Path[];                    // These paths are held temparirly so that we can remove the entry from source file cache if the file is not tracked by missing files
        let hasChangedCompilerOptions = false;                              // True if the compiler options have changed between compilations
        let hasChangedAutomaticTypeDirectiveNames = false;                  // True if the automatic type directives have changed

        const useCaseSensitiveFileNames = host.useCaseSensitiveFileNames();
        const currentDirectory = host.getCurrentDirectory();
        const getCurrentDirectory = () => currentDirectory;
        const readFile: (path: string, encoding?: string) => string | undefined = (path, encoding) => host.readFile(path, encoding);
        const { configFileName, optionsToExtend: optionsToExtendForConfigFile = {}, createProgram } = host;
        let { rootFiles: rootFileNames, options: compilerOptions, configFileSpecs, configFileWildCardDirectories } = host;

        const cachedDirectoryStructureHost = configFileName && createCachedDirectoryStructureHost(host, currentDirectory, useCaseSensitiveFileNames);
        if (cachedDirectoryStructureHost && host.onCachedDirectoryStructureHostCreate) {
            host.onCachedDirectoryStructureHostCreate(cachedDirectoryStructureHost);
        }
        const directoryStructureHost: DirectoryStructureHost = cachedDirectoryStructureHost || host;
        const parseConfigFileHost: ParseConfigFileHost = {
            useCaseSensitiveFileNames,
            readDirectory: (path, extensions, exclude, include, depth) => directoryStructureHost.readDirectory(path, extensions, exclude, include, depth),
            fileExists: path => host.fileExists(path),
            readFile,
            getCurrentDirectory,
            onConfigFileDiagnostic: host.onConfigFileDiagnostic,
            onUnRecoverableConfigFileDiagnostic: host.onUnRecoverableConfigFileDiagnostic
        };

        // From tsc we want to get already parsed result and hence check for rootFileNames
        if (configFileName && !rootFileNames) {
            parseConfigFile();
        }

        const trace = host.trace && ((s: string) => { host.trace(s + newLine); });
        const watchLogLevel = trace ? compilerOptions.extendedDiagnostics ? WatchLogLevel.Verbose :
            compilerOptions.diagnostis ? WatchLogLevel.TriggerOnly : WatchLogLevel.None : WatchLogLevel.None;
        const writeLog: (s: string) => void = watchLogLevel !== WatchLogLevel.None ? trace : noop;
        const { watchFile, watchFilePath, watchDirectory: watchDirectoryWorker } = getWatchFactory(watchLogLevel, writeLog);

        const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
        let newLine = updateNewLine();

        writeLog(`Current directory: ${currentDirectory} CaseSensitiveFileNames: ${useCaseSensitiveFileNames}`);
        if (configFileName) {
            watchFile(host, configFileName, scheduleProgramReload, PollingInterval.High);
        }

        const compilerHost: CompilerHost & ResolutionCacheHost = {
            // Members for CompilerHost
            getSourceFile: (fileName, languageVersion, onError?, shouldCreateNewSourceFile?) => getVersionedSourceFileByPath(fileName, toPath(fileName), languageVersion, onError, shouldCreateNewSourceFile),
            getSourceFileByPath: getVersionedSourceFileByPath,
            getDefaultLibLocation: host.getDefaultLibLocation && (() => host.getDefaultLibLocation()),
            getDefaultLibFileName: options => host.getDefaultLibFileName(options),
            writeFile,
            getCurrentDirectory,
            useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
            getCanonicalFileName,
            getNewLine: () => newLine,
            fileExists,
            readFile,
            trace,
            directoryExists: directoryStructureHost.directoryExists && (path => directoryStructureHost.directoryExists(path)),
            getDirectories: directoryStructureHost.getDirectories && (path => directoryStructureHost.getDirectories(path)),
            realpath: host.realpath && (s => host.realpath(s)),
            getEnvironmentVariable: host.getEnvironmentVariable ? (name => host.getEnvironmentVariable(name)) : (() => ""),
            onReleaseOldSourceFile,
            createHash: host.createHash && (data => host.createHash(data)),
            // Members for ResolutionCacheHost
            toPath,
            getCompilationSettings: () => compilerOptions,
            watchDirectoryOfFailedLookupLocation: watchDirectory,
            watchTypeRootsDirectory: watchDirectory,
            getCachedDirectoryStructureHost: () => cachedDirectoryStructureHost,
            onInvalidatedResolution: scheduleProgramUpdate,
            onChangedAutomaticTypeDirectiveNames: () => {
                hasChangedAutomaticTypeDirectiveNames = true;
                scheduleProgramUpdate();
            },
            maxNumberOfFilesToIterateForInvalidation: host.maxNumberOfFilesToIterateForInvalidation,
            getCurrentProgram,
            writeLog
        };
        // Cache for the module resolution
        const resolutionCache = createResolutionCache(compilerHost, configFileName ?
            getDirectoryPath(getNormalizedAbsolutePath(configFileName, currentDirectory)) :
            currentDirectory,
            /*logChangesWhenResolvingModule*/ false
        );
        // Resolve module using host module resolution strategy if provided otherwise use resolution cache to resolve module names
        compilerHost.resolveModuleNames = host.resolveModuleNames ?
            ((moduleNames, containingFile, reusedNames) => host.resolveModuleNames(moduleNames, containingFile, reusedNames)) :
            ((moduleNames, containingFile, reusedNames) => resolutionCache.resolveModuleNames(moduleNames, containingFile, reusedNames));
        compilerHost.resolveTypeReferenceDirectives = host.resolveTypeReferenceDirectives ?
            ((typeDirectiveNames, containingFile) => host.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile)) :
            ((typeDirectiveNames, containingFile) => resolutionCache.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile));
        const userProvidedResolution = !!host.resolveModuleNames || !!host.resolveTypeReferenceDirectives;

        reportWatchDiagnostic(Diagnostics.Starting_compilation_in_watch_mode);
        synchronizeProgram();

        // Update the wild card directory watch
        watchConfigFileWildCardDirectories();

        return configFileName ?
            { getCurrentProgram: getCurrentBuilderProgram, getProgram: synchronizeProgram } :
            { getCurrentProgram: getCurrentBuilderProgram, getProgram: synchronizeProgram, updateRootFileNames };

        function getCurrentBuilderProgram() {
            return builderProgram;
        }

        function getCurrentProgram() {
            return builderProgram && builderProgram.getProgram();
        }

        function synchronizeProgram() {
            writeLog(`Synchronizing program`);

            const program = getCurrentProgram();
            if (hasChangedCompilerOptions) {
                newLine = updateNewLine();
                if (program && changesAffectModuleResolution(program.getCompilerOptions(), compilerOptions)) {
                    resolutionCache.clear();
                }
            }

            // All resolutions are invalid if user provided resolutions
            const hasInvalidatedResolution = resolutionCache.createHasInvalidatedResolution(userProvidedResolution);
            if (isProgramUptoDate(getCurrentProgram(), rootFileNames, compilerOptions, getSourceVersion, fileExists, hasInvalidatedResolution, hasChangedAutomaticTypeDirectiveNames)) {
                return builderProgram;
            }

            // Compile the program
            if (watchLogLevel !== WatchLogLevel.None) {
                writeLog("CreatingProgramWith::");
                writeLog(`  roots: ${JSON.stringify(rootFileNames)}`);
                writeLog(`  options: ${JSON.stringify(compilerOptions)}`);
            }

            const needsUpdateInTypeRootWatch = hasChangedCompilerOptions || !program;
            hasChangedCompilerOptions = false;
            resolutionCache.startCachingPerDirectoryResolution();
            compilerHost.hasInvalidatedResolution = hasInvalidatedResolution;
            compilerHost.hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
            builderProgram = createProgram(rootFileNames, compilerOptions, compilerHost, builderProgram);
            resolutionCache.finishCachingPerDirectoryResolution();

            // Update watches
            updateMissingFilePathsWatch(builderProgram.getProgram(), missingFilesMap || (missingFilesMap = createMap()), watchMissingFilePath);
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

            if (host.afterProgramCreate) {
                host.afterProgramCreate(builderProgram);
            }
            reportWatchDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes);
            return builderProgram;
        }

        function updateRootFileNames(files: string[]) {
            Debug.assert(!configFileName, "Cannot update root file names with config file watch mode");
            rootFileNames = files;
            scheduleProgramUpdate();
        }

        function updateNewLine() {
            return getNewLineCharacter(compilerOptions, () => host.getNewLine());
        }

        function toPath(fileName: string) {
            return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        }

        function isFileMissingOnHost(hostSourceFile: HostFileInfo): hostSourceFile is FileMissingOnHost {
            return typeof hostSourceFile === "number";
        }

        function isFilePresentOnHost(hostSourceFile: FileMayBePresentOnHost): hostSourceFile is FilePresentOnHost {
            return !!(hostSourceFile as FilePresentOnHost).sourceFile;
        }

        function fileExists(fileName: string) {
            const path = toPath(fileName);
            // If file is missing on host from cache, we can definitely say file doesnt exist
            // otherwise we need to ensure from the disk
            if (isFileMissingOnHost(sourceFilesCache.get(path))) {
                return true;
            }

            return directoryStructureHost.fileExists(fileName);
        }

        function getVersionedSourceFileByPath(fileName: string, path: Path, languageVersion: ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile {
            const hostSourceFile = sourceFilesCache.get(path);
            // No source file on the host
            if (isFileMissingOnHost(hostSourceFile)) {
                return undefined;
            }

            // Create new source file if requested or the versions dont match
            if (!hostSourceFile || shouldCreateNewSourceFile || !isFilePresentOnHost(hostSourceFile) || hostSourceFile.version.toString() !== hostSourceFile.sourceFile.version) {
                const sourceFile = getNewSourceFile();
                if (hostSourceFile) {
                    if (shouldCreateNewSourceFile) {
                        hostSourceFile.version++;
                    }

                    if (sourceFile) {
                        // Set the source file and create file watcher now that file was present on the disk
                        (hostSourceFile as FilePresentOnHost).sourceFile = sourceFile;
                        sourceFile.version = hostSourceFile.version.toString();
                        if (!(hostSourceFile as FilePresentOnHost).fileWatcher) {
                            (hostSourceFile as FilePresentOnHost).fileWatcher = watchFilePath(host, fileName, onSourceFileChange, PollingInterval.Low, path);
                        }
                    }
                    else {
                        // There is no source file on host any more, close the watch, missing file paths will track it
                        if (isFilePresentOnHost(hostSourceFile)) {
                            hostSourceFile.fileWatcher.close();
                        }
                        sourceFilesCache.set(path, hostSourceFile.version);
                    }
                }
                else {
                    if (sourceFile) {
                        sourceFile.version = initialVersion.toString();
                        const fileWatcher = watchFilePath(host, fileName, onSourceFileChange, PollingInterval.Low, path);
                        sourceFilesCache.set(path, { sourceFile, version: initialVersion, fileWatcher });
                    }
                    else {
                        sourceFilesCache.set(path, initialVersion);
                    }
                }
                return sourceFile;
            }
            return hostSourceFile.sourceFile;

            function getNewSourceFile() {
                let text: string;
                try {
                    performance.mark("beforeIORead");
                    text = host.readFile(fileName, compilerOptions.charset);
                    performance.mark("afterIORead");
                    performance.measure("I/O Read", "beforeIORead", "afterIORead");
                }
                catch (e) {
                    if (onError) {
                        onError(e.message);
                    }
                }

                return text !== undefined ? createSourceFile(fileName, text, languageVersion) : undefined;
            }
        }

        function nextSourceFileVersion(path: Path) {
            const hostSourceFile = sourceFilesCache.get(path);
            if (hostSourceFile !== undefined) {
                if (isFileMissingOnHost(hostSourceFile)) {
                    // The next version, lets set it as presence unknown file
                    sourceFilesCache.set(path, { version: Number(hostSourceFile) + 1 });
                }
                else {
                    hostSourceFile.version++;
                }
            }
        }

        function getSourceVersion(path: Path): string {
            const hostSourceFile = sourceFilesCache.get(path);
            return !hostSourceFile || isFileMissingOnHost(hostSourceFile) ? undefined : hostSourceFile.version.toString();
        }

        function onReleaseOldSourceFile(oldSourceFile: SourceFile, _oldOptions: CompilerOptions) {
            const hostSourceFileInfo = sourceFilesCache.get(oldSourceFile.path);
            // If this is the source file thats in the cache and new program doesnt need it,
            // remove the cached entry.
            // Note we arent deleting entry if file became missing in new program or
            // there was version update and new source file was created.
            if (hostSourceFileInfo) {
                // record the missing file paths so they can be removed later if watchers arent tracking them
                if (isFileMissingOnHost(hostSourceFileInfo)) {
                    (missingFilePathsRequestedForRelease || (missingFilePathsRequestedForRelease = [])).push(oldSourceFile.path);
                }
                else if ((hostSourceFileInfo as FilePresentOnHost).sourceFile === oldSourceFile) {
                    if ((hostSourceFileInfo as FilePresentOnHost).fileWatcher) {
                        (hostSourceFileInfo as FilePresentOnHost).fileWatcher.close();
                    }
                    sourceFilesCache.delete(oldSourceFile.path);
                    resolutionCache.removeResolutionsOfFile(oldSourceFile.path);
                }
            }
        }

        function reportWatchDiagnostic(message: DiagnosticMessage) {
            if (host.onWatchStatusChange) {
                host.onWatchStatusChange(createCompilerDiagnostic(message), newLine, compilerOptions);
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
            timerToUpdateProgram = host.setTimeout(updateProgram, 250);
        }

        function scheduleProgramReload() {
            Debug.assert(!!configFileName);
            reloadLevel = ConfigFileProgramReloadLevel.Full;
            scheduleProgramUpdate();
        }

        function updateProgram() {
            timerToUpdateProgram = undefined;
            reportWatchDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation);

            switch (reloadLevel) {
                case ConfigFileProgramReloadLevel.Partial:
                    return reloadFileNamesFromConfigFile();
                case ConfigFileProgramReloadLevel.Full:
                    return reloadConfigFile();
                default:
                    synchronizeProgram();
                    return;
            }
        }

        function reloadFileNamesFromConfigFile() {
            const result = getFileNamesFromConfigSpecs(configFileSpecs, getDirectoryPath(configFileName), compilerOptions, parseConfigFileHost);
            if (!configFileSpecs.filesSpecs && result.fileNames.length === 0) {
                host.onConfigFileDiagnostic(getErrorForNoInputFiles(configFileSpecs, configFileName));
            }
            rootFileNames = result.fileNames;

            // Update the program
            synchronizeProgram();
        }

        function reloadConfigFile() {
            writeLog(`Reloading config file: ${configFileName}`);
            reloadLevel = ConfigFileProgramReloadLevel.None;

            if (cachedDirectoryStructureHost) {
                cachedDirectoryStructureHost.clearCache();
            }
            parseConfigFile();
            hasChangedCompilerOptions = true;
            synchronizeProgram();

            // Update the wild card directory watch
            watchConfigFileWildCardDirectories();
        }

        function parseConfigFile() {
            const configParseResult = getParsedCommandLineOfConfigFile(configFileName, optionsToExtendForConfigFile, parseConfigFileHost);
            rootFileNames = configParseResult.fileNames;
            compilerOptions = configParseResult.options;
            configFileSpecs = configParseResult.configFileSpecs;
            configFileWildCardDirectories = configParseResult.wildcardDirectories;
        }

        function onSourceFileChange(fileName: string, eventKind: FileWatcherEventKind, path: Path) {
            updateCachedSystemWithFile(fileName, path, eventKind);

            // Update the source file cache
            if (eventKind === FileWatcherEventKind.Deleted && sourceFilesCache.get(path)) {
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

        function watchDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags) {
            return watchDirectoryWorker(host, directory, cb, flags);
        }

        function watchMissingFilePath(missingFilePath: Path) {
            return watchFilePath(host, missingFilePath, onMissingFileChange, PollingInterval.Medium, missingFilePath);
        }

        function onMissingFileChange(fileName: string, eventKind: FileWatcherEventKind, missingFilePath: Path) {
            updateCachedSystemWithFile(fileName, missingFilePath, eventKind);

            if (eventKind === FileWatcherEventKind.Created && missingFilesMap.has(missingFilePath)) {
                missingFilesMap.get(missingFilePath).close();
                missingFilesMap.delete(missingFilePath);

                // Delete the entry in the source files cache so that new source file is created
                nextSourceFileVersion(missingFilePath);

                // When a missing file is created, we should update the graph.
                scheduleProgramUpdate();
            }
        }

        function watchConfigFileWildCardDirectories() {
            if (configFileWildCardDirectories) {
                updateWatchingWildcardDirectories(
                    watchedWildcardDirectories || (watchedWildcardDirectories = createMap()),
                    createMapFromTemplate(configFileWildCardDirectories),
                    watchWildcardDirectory
                );
            }
            else if (watchedWildcardDirectories) {
                clearMap(watchedWildcardDirectories, closeFileWatcherOf);
            }
        }

        function watchWildcardDirectory(directory: string, flags: WatchDirectoryFlags) {
            return watchDirectory(
                directory,
                fileOrDirectory => {
                    Debug.assert(!!configFileName);

                    const fileOrDirectoryPath = toPath(fileOrDirectory);

                    // Since the file existance changed, update the sourceFiles cache
                    if (cachedDirectoryStructureHost) {
                        cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                    }
                    nextSourceFileVersion(fileOrDirectoryPath);

                    // If the the added or created file or directory is not supported file name, ignore the file
                    // But when watched directory is added/removed, we need to reload the file list
                    if (fileOrDirectoryPath !== directory && hasExtension(fileOrDirectoryPath) && !isSupportedSourceFileName(fileOrDirectory, compilerOptions)) {
                        writeLog(`Project: ${configFileName} Detected file add/remove of non supported extension: ${fileOrDirectory}`);
                        return;
                    }

                    // Reload is pending, do the reload
                    if (reloadLevel !== ConfigFileProgramReloadLevel.Full) {
                        reloadLevel = ConfigFileProgramReloadLevel.Partial;

                        // Schedule Update the program
                        scheduleProgramUpdate();
                    }
                },
                flags
            );
        }

        function ensureDirectoriesExist(directoryPath: string) {
            if (directoryPath.length > getRootLength(directoryPath) && !host.directoryExists(directoryPath)) {
                const parentDirectory = getDirectoryPath(directoryPath);
                ensureDirectoriesExist(parentDirectory);
                host.createDirectory(directoryPath);
            }
        }

        function writeFile(fileName: string, text: string, writeByteOrderMark: boolean, onError: (message: string) => void) {
            try {
                performance.mark("beforeIOWrite");
                ensureDirectoriesExist(getDirectoryPath(normalizePath(fileName)));

                host.writeFile(fileName, text, writeByteOrderMark);

                performance.mark("afterIOWrite");
                performance.measure("I/O Write", "beforeIOWrite", "afterIOWrite");
            }
            catch (e) {
                if (onError) {
                    onError(e.message);
                }
            }
        }
    }
}
