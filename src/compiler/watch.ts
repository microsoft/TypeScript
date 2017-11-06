/// <reference path="program.ts" />
/// <reference path="builder.ts" />
/// <reference path="resolutionCache.ts"/>

/* @internal */
namespace ts {
    export type DiagnosticReporter = (diagnostic: Diagnostic) => void;
    export type ParseConfigFile = (configFileName: string, optionsToExtend: CompilerOptions, system: DirectoryStructureHost, reportDiagnostic: DiagnosticReporter, reportWatchDiagnostic: DiagnosticReporter) => ParsedCommandLine;
    export interface WatchingSystemHost {
        // FS system to use
        system: System;

        // parse config file
        parseConfigFile: ParseConfigFile;

        // Reporting errors
        reportDiagnostic: DiagnosticReporter;
        reportWatchDiagnostic: DiagnosticReporter;

        // Callbacks to do custom action before creating program and after creating program
        beforeCompile(compilerOptions: CompilerOptions): void;
        afterCompile(host: DirectoryStructureHost, program: Program, builder: Builder): void;
    }

    const defaultFormatDiagnosticsHost: FormatDiagnosticsHost = sys ? {
        getCurrentDirectory: () => sys.getCurrentDirectory(),
        getNewLine: () => sys.newLine,
        getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames)
    } : undefined;

    export function createDiagnosticReporter(system = sys, worker = reportDiagnosticSimply, formatDiagnosticsHost?: FormatDiagnosticsHost): DiagnosticReporter {
        return diagnostic => worker(diagnostic, getFormatDiagnosticsHost(), system);

        function getFormatDiagnosticsHost() {
            return formatDiagnosticsHost || (formatDiagnosticsHost = system === sys ? defaultFormatDiagnosticsHost : {
                getCurrentDirectory: () => system.getCurrentDirectory(),
                getNewLine: () => system.newLine,
                getCanonicalFileName: createGetCanonicalFileName(system.useCaseSensitiveFileNames),
            });
        }
    }

    export function createWatchDiagnosticReporter(system = sys): DiagnosticReporter {
        return diagnostic => {
            let output = new Date().toLocaleTimeString() + " - ";
            output += `${flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${system.newLine + system.newLine + system.newLine}`;
            system.write(output);
        };
    }

    export function reportDiagnostics(diagnostics: Diagnostic[], reportDiagnostic: DiagnosticReporter): void {
        for (const diagnostic of diagnostics) {
            reportDiagnostic(diagnostic);
        }
    }

    export function reportDiagnosticSimply(diagnostic: Diagnostic, host: FormatDiagnosticsHost, system: System): void {
        system.write(ts.formatDiagnostic(diagnostic, host));
    }

    export function reportDiagnosticWithColorAndContext(diagnostic: Diagnostic, host: FormatDiagnosticsHost, system: System): void {
        system.write(ts.formatDiagnosticsWithColorAndContext([diagnostic], host) + host.getNewLine());
    }

    export function parseConfigFile(configFileName: string, optionsToExtend: CompilerOptions, system: DirectoryStructureHost, reportDiagnostic: DiagnosticReporter, reportWatchDiagnostic: DiagnosticReporter): ParsedCommandLine {
        let configFileText: string;
        try {
            configFileText = system.readFile(configFileName);
        }
        catch (e) {
            const error = createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, configFileName, e.message);
            reportWatchDiagnostic(error);
            system.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            return;
        }
        if (!configFileText) {
            const error = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
            reportDiagnostics([error], reportDiagnostic);
            system.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            return;
        }

        const result = parseJsonText(configFileName, configFileText);
        reportDiagnostics(result.parseDiagnostics, reportDiagnostic);

        const cwd = system.getCurrentDirectory();
        const configParseResult = parseJsonSourceFileConfigFileContent(result, system, getNormalizedAbsolutePath(getDirectoryPath(configFileName), cwd), optionsToExtend, getNormalizedAbsolutePath(configFileName, cwd));
        reportDiagnostics(configParseResult.errors, reportDiagnostic);

        return configParseResult;
    }

    function reportEmittedFiles(files: string[], system: DirectoryStructureHost): void {
        if (!files || files.length === 0) {
            return;
        }
        const currentDir = system.getCurrentDirectory();
        for (const file of files) {
            const filepath = getNormalizedAbsolutePath(file, currentDir);
            system.write(`TSFILE: ${filepath}${system.newLine}`);
        }
    }

    export function handleEmitOutputAndReportErrors(system: DirectoryStructureHost, program: Program,
        emittedFiles: string[], emitSkipped: boolean,
        diagnostics: Diagnostic[], reportDiagnostic: DiagnosticReporter
    ): ExitStatus {
        reportDiagnostics(sortAndDeduplicateDiagnostics(diagnostics), reportDiagnostic);
        reportEmittedFiles(emittedFiles, system);

        if (program.getCompilerOptions().listFiles) {
            forEach(program.getSourceFiles(), file => {
                system.write(file.fileName + system.newLine);
            });
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

    export function createWatchingSystemHost(pretty?: DiagnosticStyle, system = sys,
        parseConfigFile?: ParseConfigFile, reportDiagnostic?: DiagnosticReporter,
        reportWatchDiagnostic?: DiagnosticReporter
    ): WatchingSystemHost {
        reportDiagnostic = reportDiagnostic || createDiagnosticReporter(system, pretty ? reportDiagnosticWithColorAndContext : reportDiagnosticSimply);
        reportWatchDiagnostic = reportWatchDiagnostic || createWatchDiagnosticReporter(system);
        parseConfigFile = parseConfigFile || ts.parseConfigFile;
        return {
            system,
            parseConfigFile,
            reportDiagnostic,
            reportWatchDiagnostic,
            beforeCompile: noop,
            afterCompile: compileWatchedProgram,
        };

        function compileWatchedProgram(host: DirectoryStructureHost, program: Program, builder: Builder) {
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

            const result = builder.emitChangedFiles(program, writeFile);
            if (result.length === 0) {
                emitSkipped = true;
            }
            else {
                for (const emitOutput of result) {
                    if (emitOutput.emitSkipped) {
                        emitSkipped = true;
                    }
                    addRange(diagnostics, emitOutput.diagnostics);
                    sourceMaps = concatenate(sourceMaps, emitOutput.sourceMaps);
                }
            }

            if (reportSemanticDiagnostics) {
                addRange(diagnostics, builder.getSemanticDiagnostics(program));
            }
            return handleEmitOutputAndReportErrors(host, program, emittedFiles, emitSkipped,
                diagnostics, reportDiagnostic);

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
        }
    }

    export function createWatchModeWithConfigFile(configParseResult: ParsedCommandLine, optionsToExtend: CompilerOptions = {}, watchingHost?: WatchingSystemHost) {
        return createWatchMode(configParseResult.fileNames, configParseResult.options, watchingHost, configParseResult.options.configFilePath, configParseResult.configFileSpecs, configParseResult.wildcardDirectories, optionsToExtend);
    }

    export function createWatchModeWithoutConfigFile(rootFileNames: string[], compilerOptions: CompilerOptions, watchingHost?: WatchingSystemHost) {
        return createWatchMode(rootFileNames, compilerOptions, watchingHost);
    }

    interface HostFileInfo {
        version: number;
        sourceFile: SourceFile;
        fileWatcher: FileWatcher;
    }

    function createWatchMode(rootFileNames: string[], compilerOptions: CompilerOptions, watchingHost?: WatchingSystemHost, configFileName?: string, configFileSpecs?: ConfigFileSpecs, configFileWildCardDirectories?: MapLike<WatchDirectoryFlags>, optionsToExtendForConfigFile?: CompilerOptions) {
        let program: Program;
        let needsReload: boolean;                                           // true if the config file changed and needs to reload it from the disk
        let missingFilesMap: Map<FileWatcher>;                              // Map of file watchers for the missing files
        let watchedWildcardDirectories: Map<WildcardDirectoryWatcher>;      // map of watchers for the wild card directories in the config file
        let timerToUpdateProgram: any;                                      // timer callback to recompile the program

        const sourceFilesCache = createMap<HostFileInfo | string>();        // Cache that stores the source file and version info
        let missingFilePathsRequestedForRelease: Path[];                    // These paths are held temparirly so that we can remove the entry from source file cache if the file is not tracked by missing files
        let hasChangedCompilerOptions = false;                              // True if the compiler options have changed between compilations
        let hasChangedAutomaticTypeDirectiveNames = false;                  // True if the automatic type directives have changed

        const loggingEnabled = compilerOptions.diagnostics || compilerOptions.extendedDiagnostics;
        const writeLog: (s: string) => void = loggingEnabled ? s => { system.write(s); system.write(system.newLine); } : noop;
        const watchFile = compilerOptions.extendedDiagnostics ? ts.addFileWatcherWithLogging : loggingEnabled ? ts.addFileWatcherWithOnlyTriggerLogging : ts.addFileWatcher;
        const watchFilePath = compilerOptions.extendedDiagnostics ? ts.addFilePathWatcherWithLogging : ts.addFilePathWatcher;
        const watchDirectoryWorker = compilerOptions.extendedDiagnostics ? ts.addDirectoryWatcherWithLogging : ts.addDirectoryWatcher;

        watchingHost = watchingHost || createWatchingSystemHost(compilerOptions.pretty);
        const { system, parseConfigFile, reportDiagnostic, reportWatchDiagnostic, beforeCompile, afterCompile } = watchingHost;

        const directoryStructureHost = configFileName ? createCachedDirectoryStructureHost(system) : system;
        if (configFileName) {
            watchFile(system, configFileName, scheduleProgramReload, writeLog);
        }

        const getCurrentDirectory = memoize(() => directoryStructureHost.getCurrentDirectory());
        const realpath = system.realpath && ((path: string) => system.realpath(path));
        const getCachedDirectoryStructureHost = configFileName && (() => directoryStructureHost as CachedDirectoryStructureHost);
        const getCanonicalFileName = createGetCanonicalFileName(system.useCaseSensitiveFileNames);
        let newLine = getNewLineCharacter(compilerOptions, system);

        const compilerHost: CompilerHost & ResolutionCacheHost = {
            // Members for CompilerHost
            getSourceFile: (fileName, languageVersion, onError?, shouldCreateNewSourceFile?) => getVersionedSourceFileByPath(fileName, toPath(fileName), languageVersion, onError, shouldCreateNewSourceFile),
            getSourceFileByPath: getVersionedSourceFileByPath,
            getDefaultLibLocation,
            getDefaultLibFileName: options => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options)),
            writeFile: notImplemented,
            getCurrentDirectory,
            useCaseSensitiveFileNames: () => system.useCaseSensitiveFileNames,
            getCanonicalFileName,
            getNewLine: () => newLine,
            fileExists,
            readFile: fileName => system.readFile(fileName),
            trace: s => system.write(s + newLine),
            directoryExists: directoryName => directoryStructureHost.directoryExists(directoryName),
            getEnvironmentVariable: name => system.getEnvironmentVariable ? system.getEnvironmentVariable(name) : "",
            getDirectories: path => directoryStructureHost.getDirectories(path),
            realpath,
            resolveTypeReferenceDirectives: (typeDirectiveNames, containingFile) => resolutionCache.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile),
            resolveModuleNames: (moduleNames, containingFile, reusedNames?) => resolutionCache.resolveModuleNames(moduleNames, containingFile, reusedNames, /*logChanges*/ false),
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
            writeLog
        };
        // Cache for the module resolution
        const resolutionCache = createResolutionCache(compilerHost, configFileName ?
            getDirectoryPath(getNormalizedAbsolutePath(configFileName, getCurrentDirectory())) :
            getCurrentDirectory()
        );
        // There is no extra check needed since we can just rely on the program to decide emit
        const builder = createBuilder({ getCanonicalFileName, computeHash });

        synchronizeProgram();

        // Update the wild card directory watch
        watchConfigFileWildCardDirectories();

        return () => program;

        function synchronizeProgram() {
            writeLog(`Synchronizing program`);

            if (hasChangedCompilerOptions) {
                newLine = getNewLineCharacter(compilerOptions, system);
                if (program && changesAffectModuleResolution(program.getCompilerOptions(), compilerOptions)) {
                    resolutionCache.clear();
                }
            }

            const hasInvalidatedResolution = resolutionCache.createHasInvalidatedResolution();
            if (isProgramUptoDate(program, rootFileNames, compilerOptions, getSourceVersion, fileExists, hasInvalidatedResolution, hasChangedAutomaticTypeDirectiveNames)) {
                return;
            }

            beforeCompile(compilerOptions);

            // Compile the program
            const needsUpdateInTypeRootWatch = hasChangedCompilerOptions || !program;
            hasChangedCompilerOptions = false;
            resolutionCache.startCachingPerDirectoryResolution();
            compilerHost.hasInvalidatedResolution = hasInvalidatedResolution;
            compilerHost.hasChangedAutomaticTypeDirectiveNames = hasChangedAutomaticTypeDirectiveNames;
            program = createProgram(rootFileNames, compilerOptions, compilerHost, program);
            resolutionCache.finishCachingPerDirectoryResolution();
            builder.updateProgram(program);

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

            afterCompile(directoryStructureHost, program, builder);
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes));
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
                        sourceFile.version = "0";
                        fileWatcher = watchFilePath(system, fileName, onSourceFileChange, path, writeLog);
                        sourceFilesCache.set(path, { sourceFile, version: 0, fileWatcher });
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
            needsReload = true;
            scheduleProgramUpdate();
        }

        function updateProgram() {
            timerToUpdateProgram = undefined;
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation));

            if (needsReload) {
                reloadConfigFile();
            }
            else {
                synchronizeProgram();
            }
        }

        function reloadConfigFile() {
            writeLog(`Reloading config file: ${configFileName}`);
            needsReload = false;

            const cachedHost = directoryStructureHost as CachedDirectoryStructureHost;
            cachedHost.clearCache();
            const configParseResult = parseConfigFile(configFileName, optionsToExtendForConfigFile, cachedHost, reportDiagnostic, reportWatchDiagnostic);
            rootFileNames = configParseResult.fileNames;
            compilerOptions = configParseResult.options;
            hasChangedCompilerOptions = true;
            configFileSpecs = configParseResult.configFileSpecs;
            configFileWildCardDirectories = configParseResult.wildcardDirectories;

            synchronizeProgram();

            // Update the wild card directory watch
            watchConfigFileWildCardDirectories();
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
                        sourceFilesCache.set(path, (hostSourceFile.version++).toString());
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
            updateWatchingWildcardDirectories(
                watchedWildcardDirectories || (watchedWildcardDirectories = createMap()),
                createMapFromTemplate(configFileWildCardDirectories),
                watchWildcardDirectory
            );
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
                    if (fileOrDirectoryPath !== directory && !isSupportedSourceFileName(fileOrDirectory, compilerOptions)) {
                        writeLog(`Project: ${configFileName} Detected file add/remove of non supported extension: ${fileOrDirectory}`);
                        return;
                    }

                    // Reload is pending, do the reload
                    if (!needsReload) {
                        const result = getFileNamesFromConfigSpecs(configFileSpecs, getDirectoryPath(configFileName), compilerOptions, directoryStructureHost);
                        if (!configFileSpecs.filesSpecs && result.fileNames.length === 0) {
                            reportDiagnostic(getErrorForNoInputFiles(configFileSpecs, configFileName));
                        }
                        rootFileNames = result.fileNames;

                        // Schedule Update the program
                        scheduleProgramUpdate();
                    }
                },
                flags
            );
        }

        function computeHash(data: string) {
            return system.createHash ? system.createHash(data) : data;
        }
    }
}
