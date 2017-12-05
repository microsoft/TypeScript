/// <reference path="program.ts" />
/// <reference path="builder.ts" />
/// <reference path="resolutionCache.ts"/>

namespace ts {
    export type DiagnosticReporter = (diagnostic: Diagnostic) => void;

    const sysFormatDiagnosticsHost: FormatDiagnosticsHost = sys ? {
        getCurrentDirectory: () => sys.getCurrentDirectory(),
        getNewLine: () => sys.newLine,
        getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames)
    } : undefined;

    /**
     * Create a function that reports error by writing to the system and handles the formating of the diagnostic
     */
    /*@internal*/
    export function createDiagnosticReporter(system = sys, pretty?: boolean): DiagnosticReporter {
        const host: FormatDiagnosticsHost = system === sys ? sysFormatDiagnosticsHost : {
            getCurrentDirectory: () => system.getCurrentDirectory(),
            getNewLine: () => system.newLine,
            getCanonicalFileName: createGetCanonicalFileName(system.useCaseSensitiveFileNames),
        };
        if (!pretty) {
            return diagnostic => system.write(ts.formatDiagnostic(diagnostic, host));
        }

        const diagnostics: Diagnostic[] = new Array(1);
        return diagnostic => {
            diagnostics[0] = diagnostic;
            system.write(formatDiagnosticsWithColorAndContext(diagnostics, host) + host.getNewLine());
            diagnostics[0] = undefined;
        };
    }

    /**
     * Reads the config file, reports errors if any and exits if the config file cannot be found
     */
    /*@internal*/
    export function parseConfigFile(configFileName: string, optionsToExtend: CompilerOptions, system: DirectoryStructureHost, reportDiagnostic: DiagnosticReporter): ParsedCommandLine {
        let configFileText: string;
        try {
            configFileText = system.readFile(configFileName);
        }
        catch (e) {
            const error = createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, configFileName, e.message);
            reportDiagnostic(error);
            system.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            return;
        }
        if (!configFileText) {
            const error = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
            reportDiagnostic(error);
            system.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            return;
        }

        const result = parseJsonText(configFileName, configFileText);
        result.parseDiagnostics.forEach(reportDiagnostic);

        const cwd = system.getCurrentDirectory();
        const configParseResult = parseJsonSourceFileConfigFileContent(result, system, getNormalizedAbsolutePath(getDirectoryPath(configFileName), cwd), optionsToExtend, getNormalizedAbsolutePath(configFileName, cwd));
        configParseResult.errors.forEach(reportDiagnostic);

        return configParseResult;
    }

    /**
     * Writes emitted files, source files depending on options
     */
    /*@internal*/
    export function writeFileAndEmittedFileList(system: System, program: Program, emittedFiles: string[]) {
        const currentDir = system.getCurrentDirectory();
        forEach(emittedFiles, file => {
            const filepath = getNormalizedAbsolutePath(file, currentDir);
            system.write(`TSFILE: ${filepath}${system.newLine}`);
        });

        if (program.getCompilerOptions().listFiles) {
            forEach(program.getSourceFiles(), file => {
                system.write(file.fileName + system.newLine);
            });
        }
    }

    /**
     * Creates the function that compiles the program by maintaining the builder for the program and reports the errors and emits files
     */
    export function createProgramCompilerWithBuilderState(system = sys, reportDiagnostic?: DiagnosticReporter) {
        reportDiagnostic = reportDiagnostic || createDiagnosticReporter(system);
        const builder = createEmitAndSemanticDiagnosticsBuilder({
            getCanonicalFileName: createGetCanonicalFileName(system.useCaseSensitiveFileNames),
            computeHash: system.createHash ? system.createHash.bind(system) : identity
        });

        return (host: DirectoryStructureHost, program: Program) => {
            builder.updateProgram(program);

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
            const emittedFiles: string[] = program.getCompilerOptions().listEmittedFiles ? [] : undefined;
            let sourceMaps: SourceMapData[];
            let emitSkipped: boolean;

            let affectedEmitResult: AffectedFileResult<EmitResult>;
            while (affectedEmitResult = builder.emitNextAffectedFile(program, writeFile)) {
                emitSkipped = emitSkipped || affectedEmitResult.result.emitSkipped;
                addRange(diagnostics, affectedEmitResult.result.diagnostics);
                sourceMaps = addRange(sourceMaps, affectedEmitResult.result.sourceMaps);
            }

            if (reportSemanticDiagnostics) {
                addRange(diagnostics, builder.getSemanticDiagnostics(program));
            }

            sortAndDeduplicateDiagnostics(diagnostics).forEach(reportDiagnostic);
            writeFileAndEmittedFileList(system, program, emittedFiles);

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

                    if (emittedFiles) {
                        emittedFiles.push(fileName);
                    }
                }
                catch (e) {
                    if (onError) {
                        onError(e.message);
                    }
                }
            }
        };
    }

    export interface WatchCompilerHost {
        /** FS system to use */
        system: System;

        /** If provided, callback to invoke before each program creation */
        beforeProgramCreate?(compilerOptions: CompilerOptions): void;
        /** If provided, callback to invoke after every new program creation */
        afterProgramCreate?(host: DirectoryStructureHost, program: Program): void;

        // Sub set of compiler host methods to read and generate new program
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;

        /** If provided this function would be used to resolve the module names, otherwise typescript's default module resolution */
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames?: string[]): ResolvedModule[];
    }

    /**
     * Host to create watch with root files and options
     */
    export interface WatchCompilerHostOfFilesAndCompilerOptions extends WatchCompilerHost {
        /** root files to use to generate program */
        rootFiles: string[];

        /** Compiler options */
        options: CompilerOptions;
    }

    /**
     * Host to create watch with config file
     */
    export interface WatchCompilerHostOfConfigFile extends WatchCompilerHost {
        /** Name of the config file to compile */
        configFileName: string;

        /** Options to extend */
        optionsToExtend?: CompilerOptions;

        // Reports errors in the config file
        onConfigFileDiagnostic(diagnostic: Diagnostic): void;
    }

    /**
     * Host to create watch with config file that is already parsed (from tsc)
     */
    /*@internal*/
    export interface WatchCompilerHostOfConfigFile extends WatchCompilerHost {
        rootFiles?: string[];
        options?: CompilerOptions;
        optionsToExtend?: CompilerOptions;
        configFileSpecs?: ConfigFileSpecs;
        configFileWildCardDirectories?: MapLike<WatchDirectoryFlags>;
    }

    export interface Watch {
        /** Synchronize with host and get updated program */
        getProgram(): Program;
        /** Gets the existing program without synchronizing with changes on host */
        /*@internal*/
        getExistingProgram(): Program;
    }

    /**
     * Creates the watch what generates program using the config file
     */
    export interface WatchOfConfigFile extends Watch {
    }

    /**
     * Creates the watch that generates program using the root files and compiler options
     */
    export interface WatchOfFilesAndCompilerOptions extends Watch {
        /** Updates the root files in the program, only if this is not config file compilation */
        updateRootFileNames(fileNames: string[]): void;
    }

    /**
     * Creates the watch compiler host that can be extended with config file or root file names and options host
     */
    /*@internal*/
    export function createWatchCompilerHost(system = sys, reportDiagnostic?: DiagnosticReporter): WatchCompilerHost {
        return {
            useCaseSensitiveFileNames: () => system.useCaseSensitiveFileNames,
            getNewLine: () => system.newLine,
            system,
            afterProgramCreate: createProgramCompilerWithBuilderState(system, reportDiagnostic)
        };
    }

    /**
     * Create the watched program for config file
     */
    export function createWatchOfConfigFile(configFileName: string, optionsToExtend?: CompilerOptions, system?: System, reportDiagnostic?: DiagnosticReporter): WatchOfConfigFile {
        const host = createWatchCompilerHost(system) as WatchCompilerHostOfConfigFile;
        host.onConfigFileDiagnostic = reportDiagnostic || createDiagnosticReporter(system);
        host.configFileName = configFileName;
        host.optionsToExtend = optionsToExtend;
        return createWatch(host);
    }

    /**
     * Create the watched program for root files and compiler options
     */
    export function createWatchOfFilesAndCompilerOptions(rootFiles: string[], options: CompilerOptions, system = sys, reportDiagnostic?: DiagnosticReporter): WatchOfFilesAndCompilerOptions {
        const host = createWatchCompilerHost(system, reportDiagnostic) as WatchCompilerHostOfFilesAndCompilerOptions;
        host.rootFiles = rootFiles;
        host.options = options;
        return createWatch(host);
    }

    /**
     * Creates the watch from the host for root files and compiler options
     */
    export function createWatch(host: WatchCompilerHostOfFilesAndCompilerOptions): WatchOfFilesAndCompilerOptions;
    /**
     * Creates the watch from the host for config file
     */
    export function createWatch(host: WatchCompilerHostOfConfigFile): WatchOfConfigFile;
    export function createWatch(host: WatchCompilerHostOfFilesAndCompilerOptions | WatchCompilerHostOfConfigFile): WatchOfFilesAndCompilerOptions | WatchOfConfigFile {
        interface HostFileInfo {
            version: number;
            sourceFile: SourceFile;
            fileWatcher: FileWatcher;
        }

        let program: Program;
        let reloadLevel: ConfigFileProgramReloadLevel;                      // level to indicate if the program needs to be reloaded from config file/just filenames etc
        let missingFilesMap: Map<FileWatcher>;                              // Map of file watchers for the missing files
        let watchedWildcardDirectories: Map<WildcardDirectoryWatcher>;      // map of watchers for the wild card directories in the config file
        let timerToUpdateProgram: any;                                      // timer callback to recompile the program

        const sourceFilesCache = createMap<HostFileInfo | string>();        // Cache that stores the source file and version info
        let missingFilePathsRequestedForRelease: Path[];                    // These paths are held temparirly so that we can remove the entry from source file cache if the file is not tracked by missing files
        let hasChangedCompilerOptions = false;                              // True if the compiler options have changed between compilations
        let hasChangedAutomaticTypeDirectiveNames = false;                  // True if the automatic type directives have changed

        const { system, configFileName, onConfigFileDiagnostic, optionsToExtend: optionsToExtendForConfigFile = {} } = host as WatchCompilerHostOfConfigFile;
        const beforeProgramCreate: WatchCompilerHost["beforeProgramCreate"] = host.beforeProgramCreate ? host.beforeProgramCreate.bind(host) : noop;
        const afterProgramCreate: WatchCompilerHost["afterProgramCreate"] = host.afterProgramCreate ? host.afterProgramCreate.bind(host) : noop;
        let { rootFiles: rootFileNames, options: compilerOptions, configFileSpecs, configFileWildCardDirectories } = host as WatchCompilerHostOfConfigFile;

        // From tsc we want to get already parsed result and hence check for rootFileNames
        const directoryStructureHost = configFileName ? createCachedDirectoryStructureHost(system) : system;
        if (configFileName && !rootFileNames) {
            parseConfigFile();
        }

        const loggingEnabled = compilerOptions.diagnostics || compilerOptions.extendedDiagnostics;
        const writeLog: (s: string) => void = loggingEnabled ? s => { system.write(s); system.write(newLine); } : noop;
        const watchFile = compilerOptions.extendedDiagnostics ? ts.addFileWatcherWithLogging : loggingEnabled ? ts.addFileWatcherWithOnlyTriggerLogging : ts.addFileWatcher;
        const watchFilePath = compilerOptions.extendedDiagnostics ? ts.addFilePathWatcherWithLogging : ts.addFilePathWatcher;
        const watchDirectoryWorker = compilerOptions.extendedDiagnostics ? ts.addDirectoryWatcherWithLogging : ts.addDirectoryWatcher;

        if (configFileName) {
            watchFile(system, configFileName, scheduleProgramReload, writeLog);
        }

        const getCurrentDirectory = memoize(() => directoryStructureHost.getCurrentDirectory());
        const realpath = system.realpath && ((path: string) => system.realpath(path));
        const getCachedDirectoryStructureHost = configFileName && (() => directoryStructureHost as CachedDirectoryStructureHost);
        const useCaseSensitiveFileNames = memoize(() => host.useCaseSensitiveFileNames());
        const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames());
        let newLine = updateNewLine();

        const compilerHost: CompilerHost & ResolutionCacheHost = {
            // Members for CompilerHost
            getSourceFile: (fileName, languageVersion, onError?, shouldCreateNewSourceFile?) => getVersionedSourceFileByPath(fileName, toPath(fileName), languageVersion, onError, shouldCreateNewSourceFile),
            getSourceFileByPath: getVersionedSourceFileByPath,
            getDefaultLibLocation,
            getDefaultLibFileName: options => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options)),
            writeFile: notImplemented,
            getCurrentDirectory,
            useCaseSensitiveFileNames,
            getCanonicalFileName,
            getNewLine: () => newLine,
            fileExists,
            readFile: fileName => system.readFile(fileName),
            trace: s => system.write(s + newLine),
            directoryExists: directoryName => directoryStructureHost.directoryExists(directoryName),
            getEnvironmentVariable: name => system.getEnvironmentVariable ? system.getEnvironmentVariable(name) : "",
            getDirectories: path => directoryStructureHost.getDirectories(path),
            realpath,
            onReleaseOldSourceFile,
            // Members for ResolutionCacheHost
            toPath,
            getCompilationSettings: () => compilerOptions,
            watchDirectoryOfFailedLookupLocation: watchDirectory,
            watchTypeRootsDirectory: watchDirectory,
            getCachedDirectoryStructureHost,
            onInvalidatedResolution: scheduleProgramUpdate,
            onChangedAutomaticTypeDirectiveNames: () => {
                hasChangedAutomaticTypeDirectiveNames = true;
                scheduleProgramUpdate();
            },
            writeLog,
        };
        // Cache for the module resolution
        const resolutionCache = createResolutionCache(compilerHost, configFileName ?
            getDirectoryPath(getNormalizedAbsolutePath(configFileName, getCurrentDirectory())) :
            getCurrentDirectory(),
            /*logChangesWhenResolvingModule*/ false
        );
        // Resolve module using host module resolution strategy if provided otherwise use resolution cache to resolve module names
        compilerHost.resolveModuleNames = host.resolveModuleNames ?
            host.resolveModuleNames.bind(host) :
            resolutionCache.resolveModuleNames.bind(resolutionCache);
        compilerHost.resolveTypeReferenceDirectives = resolutionCache.resolveTypeReferenceDirectives.bind(resolutionCache);

        clearHostScreen();
        reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.Starting_compilation_in_watch_mode));
        synchronizeProgram();

        // Update the wild card directory watch
        watchConfigFileWildCardDirectories();

        return configFileName ?
            { getExistingProgram: () => program, getProgram: synchronizeProgram } :
            { getExistingProgram: () => program, getProgram: synchronizeProgram, updateRootFileNames };

        function synchronizeProgram(): Program {
            writeLog(`Synchronizing program`);

            if (hasChangedCompilerOptions) {
                newLine = updateNewLine();
                if (program && changesAffectModuleResolution(program.getCompilerOptions(), compilerOptions)) {
                    resolutionCache.clear();
                }
            }

            const hasInvalidatedResolution = resolutionCache.createHasInvalidatedResolution();
            if (isProgramUptoDate(program, rootFileNames, compilerOptions, getSourceVersion, fileExists, hasInvalidatedResolution, hasChangedAutomaticTypeDirectiveNames)) {
                return program;
            }

            beforeProgramCreate(compilerOptions);

            // Compile the program
            const needsUpdateInTypeRootWatch = hasChangedCompilerOptions || !program;
            hasChangedCompilerOptions = false;
            resolutionCache.startCachingPerDirectoryResolution();
            compilerHost.hasInvalidatedResolution = hasInvalidatedResolution;
            compilerHost.hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
            program = createProgram(rootFileNames, compilerOptions, compilerHost, program);
            resolutionCache.finishCachingPerDirectoryResolution();

            // Update watches
            updateMissingFilePathsWatch(program, missingFilesMap || (missingFilesMap = createMap()), watchMissingFilePath);
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

            afterProgramCreate(directoryStructureHost, program);
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes));
            return program;
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
            return ts.toPath(fileName, getCurrentDirectory(), getCanonicalFileName);
        }

        function fileExists(fileName: string) {
            const path = toPath(fileName);
            const hostSourceFileInfo = sourceFilesCache.get(path);
            if (hostSourceFileInfo !== undefined) {
                return !isString(hostSourceFileInfo);
            }

            return directoryStructureHost.fileExists(fileName);
        }

        function getDefaultLibLocation(): string {
            return getDirectoryPath(normalizePath(system.getExecutingFilePath()));
        }

        function getVersionedSourceFileByPath(fileName: string, path: Path, languageVersion: ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile {
            const hostSourceFile = sourceFilesCache.get(path);
            // No source file on the host
            if (isString(hostSourceFile)) {
                return undefined;
            }

            // Create new source file if requested or the versions dont match
            if (!hostSourceFile || shouldCreateNewSourceFile || hostSourceFile.version.toString() !== hostSourceFile.sourceFile.version) {
                const sourceFile = getNewSourceFile();
                if (hostSourceFile) {
                    if (shouldCreateNewSourceFile) {
                        hostSourceFile.version++;
                    }
                    if (sourceFile) {
                        hostSourceFile.sourceFile = sourceFile;
                        sourceFile.version = hostSourceFile.version.toString();
                        if (!hostSourceFile.fileWatcher) {
                            hostSourceFile.fileWatcher = watchFilePath(system, fileName, onSourceFileChange, path, writeLog);
                        }
                    }
                    else {
                        // There is no source file on host any more, close the watch, missing file paths will track it
                        hostSourceFile.fileWatcher.close();
                        sourceFilesCache.set(path, hostSourceFile.version.toString());
                    }
                }
                else {
                    let fileWatcher: FileWatcher;
                    if (sourceFile) {
                        sourceFile.version = "1";
                        fileWatcher = watchFilePath(system, fileName, onSourceFileChange, path, writeLog);
                        sourceFilesCache.set(path, { sourceFile, version: 1, fileWatcher });
                    }
                    else {
                        sourceFilesCache.set(path, "0");
                    }
                }
                return sourceFile;
            }
            return hostSourceFile.sourceFile;

            function getNewSourceFile() {
                let text: string;
                try {
                    performance.mark("beforeIORead");
                    text = system.readFile(fileName, compilerOptions.charset);
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

        function removeSourceFile(path: Path) {
            const hostSourceFile = sourceFilesCache.get(path);
            if (hostSourceFile !== undefined) {
                if (!isString(hostSourceFile)) {
                    hostSourceFile.fileWatcher.close();
                    resolutionCache.invalidateResolutionOfFile(path);
                }
                sourceFilesCache.delete(path);
            }
        }

        function getSourceVersion(path: Path): string {
            const hostSourceFile = sourceFilesCache.get(path);
            return !hostSourceFile || isString(hostSourceFile) ? undefined : hostSourceFile.version.toString();
        }

        function onReleaseOldSourceFile(oldSourceFile: SourceFile, _oldOptions: CompilerOptions) {
            const hostSourceFileInfo = sourceFilesCache.get(oldSourceFile.path);
            // If this is the source file thats in the cache and new program doesnt need it,
            // remove the cached entry.
            // Note we arent deleting entry if file became missing in new program or
            // there was version update and new source file was created.
            if (hostSourceFileInfo) {
                // record the missing file paths so they can be removed later if watchers arent tracking them
                if (isString(hostSourceFileInfo)) {
                    (missingFilePathsRequestedForRelease || (missingFilePathsRequestedForRelease = [])).push(oldSourceFile.path);
                }
                else if (hostSourceFileInfo.sourceFile === oldSourceFile) {
                    sourceFilesCache.delete(oldSourceFile.path);
                    resolutionCache.removeResolutionsOfFile(oldSourceFile.path);
                }
            }
        }

        function reportWatchDiagnostic(diagnostic: Diagnostic) {
            system.write(`${new Date().toLocaleTimeString()} - ${flattenDiagnosticMessageText(diagnostic.messageText, newLine)}${newLine + newLine + newLine}`);
        }

        // Upon detecting a file change, wait for 250ms and then perform a recompilation. This gives batch
        // operations (such as saving all modified files in an editor) a chance to complete before we kick
        // off a new compilation.
        function scheduleProgramUpdate() {
            if (!system.setTimeout || !system.clearTimeout) {
                return;
            }

            if (timerToUpdateProgram) {
                system.clearTimeout(timerToUpdateProgram);
            }
            timerToUpdateProgram = system.setTimeout(updateProgram, 250);
        }

        function scheduleProgramReload() {
            Debug.assert(!!configFileName);
            reloadLevel = ConfigFileProgramReloadLevel.Full;
            scheduleProgramUpdate();
        }

        function clearHostScreen() {
            if (system.clearScreen) {
                system.clearScreen();
            }
        }

        function updateProgram() {
            clearHostScreen();

            timerToUpdateProgram = undefined;
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation));

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
            const result = getFileNamesFromConfigSpecs(configFileSpecs, getDirectoryPath(configFileName), compilerOptions, directoryStructureHost);
            if (!configFileSpecs.filesSpecs && result.fileNames.length === 0) {
                onConfigFileDiagnostic(getErrorForNoInputFiles(configFileSpecs, configFileName));
            }
            rootFileNames = result.fileNames;

            // Update the program
            synchronizeProgram();
        }

        function reloadConfigFile() {
            writeLog(`Reloading config file: ${configFileName}`);
            reloadLevel = ConfigFileProgramReloadLevel.None;

            const cachedHost = directoryStructureHost as CachedDirectoryStructureHost;
            cachedHost.clearCache();
            parseConfigFile();
            hasChangedCompilerOptions = true;
            synchronizeProgram();

            // Update the wild card directory watch
            watchConfigFileWildCardDirectories();
        }

        function parseConfigFile() {
            const configParseResult = ts.parseConfigFile(configFileName, optionsToExtendForConfigFile, directoryStructureHost as CachedDirectoryStructureHost, onConfigFileDiagnostic);
            rootFileNames = configParseResult.fileNames;
            compilerOptions = configParseResult.options;
            configFileSpecs = configParseResult.configFileSpecs;
            configFileWildCardDirectories = configParseResult.wildcardDirectories;
        }

        function onSourceFileChange(fileName: string, eventKind: FileWatcherEventKind, path: Path) {
            updateCachedSystemWithFile(fileName, path, eventKind);
            const hostSourceFile = sourceFilesCache.get(path);
            if (hostSourceFile) {
                // Update the cache
                if (eventKind === FileWatcherEventKind.Deleted) {
                    resolutionCache.invalidateResolutionOfFile(path);
                    if (!isString(hostSourceFile)) {
                        hostSourceFile.fileWatcher.close();
                        sourceFilesCache.set(path, (++hostSourceFile.version).toString());
                    }
                }
                else {
                    // Deleted file created
                    if (isString(hostSourceFile)) {
                        sourceFilesCache.delete(path);
                    }
                    else {
                        // file changed - just update the version
                        hostSourceFile.version++;
                    }
                }
            }

            // Update the program
            scheduleProgramUpdate();
        }

        function updateCachedSystemWithFile(fileName: string, path: Path, eventKind: FileWatcherEventKind) {
            if (configFileName) {
                (directoryStructureHost as CachedDirectoryStructureHost).addOrDeleteFile(fileName, path, eventKind);
            }
        }

        function watchDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags) {
            return watchDirectoryWorker(system, directory, cb, flags, writeLog);
        }

        function watchMissingFilePath(missingFilePath: Path) {
            return watchFilePath(system, missingFilePath, onMissingFileChange, missingFilePath, writeLog);
        }

        function onMissingFileChange(fileName: string, eventKind: FileWatcherEventKind, missingFilePath: Path) {
            updateCachedSystemWithFile(fileName, missingFilePath, eventKind);

            if (eventKind === FileWatcherEventKind.Created && missingFilesMap.has(missingFilePath)) {
                missingFilesMap.get(missingFilePath).close();
                missingFilesMap.delete(missingFilePath);

                // Delete the entry in the source files cache so that new source file is created
                removeSourceFile(missingFilePath);

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
                    const result = (directoryStructureHost as CachedDirectoryStructureHost).addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);

                    // Instead of deleting the file, mark it as changed instead
                    // Many times node calls add/remove/file when watching directories recursively
                    const hostSourceFile = sourceFilesCache.get(fileOrDirectoryPath);
                    if (hostSourceFile && !isString(hostSourceFile) && (result ? result.fileExists : directoryStructureHost.fileExists(fileOrDirectory))) {
                        hostSourceFile.version++;
                    }
                    else {
                        removeSourceFile(fileOrDirectoryPath);
                    }

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
    }
}
