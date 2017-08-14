/// <reference path="program.ts" />
/// <reference path="builder.ts" />
/// <reference path="resolutionCache.ts"/>

namespace ts {
    export type DiagnosticReporter = (diagnostic: Diagnostic) => void;
    export type DiagnosticWorker = (diagnostic: Diagnostic, host: FormatDiagnosticsHost, system: System) => void;
    export type ParseConfigFile = (configFileName: string, optionsToExtend: CompilerOptions, system: System, reportDiagnostic: DiagnosticReporter, reportWatchDiagnostic: DiagnosticReporter) => ParsedCommandLine;
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
        afterCompile(host: System, program: Program, builder: Builder): void;
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

    export function parseConfigFile(configFileName: string, optionsToExtend: CompilerOptions, system: System, reportDiagnostic: DiagnosticReporter, reportWatchDiagnostic: DiagnosticReporter): ParsedCommandLine {
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

    function reportEmittedFiles(files: string[], system: System): void {
        if (!files || files.length === 0) {
            return;
        }
        const currentDir = system.getCurrentDirectory();
        for (const file of files) {
            const filepath = getNormalizedAbsolutePath(file, currentDir);
            system.write(`TSFILE: ${filepath}${system.newLine}`);
        }
    }

    export function handleEmitOutputAndReportErrors(system: System, program: Program,
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

        function compileWatchedProgram(host: System, program: Program, builder: Builder) {
            // First get and report any syntactic errors.
            let diagnostics = program.getSyntacticDiagnostics();
            let reportSemanticDiagnostics = false;

            // If we didn't have any syntactic errors, then also try getting the global and
            // semantic errors.
            if (diagnostics.length === 0) {
                diagnostics = program.getOptionsDiagnostics().concat(program.getGlobalDiagnostics());

                if (diagnostics.length === 0) {
                    reportSemanticDiagnostics = true;
                }
            }

            // Emit and report any errors we ran into.
            const emittedFiles: string[] = program.getCompilerOptions().listEmittedFiles ? [] : undefined;
            let sourceMaps: SourceMapData[];
            let emitSkipped: boolean;

            const result = builder.emitChangedFiles(program);
            if (result.length === 0) {
                emitSkipped = true;
            }
            else {
                for (const emitOutput of result) {
                    if (emitOutput.emitSkipped) {
                        emitSkipped = true;
                    }
                    diagnostics = concatenate(diagnostics, emitOutput.diagnostics);
                    sourceMaps = concatenate(sourceMaps, emitOutput.sourceMaps);
                    writeOutputFiles(emitOutput.outputFiles);
                }
            }

            if (reportSemanticDiagnostics) {
                diagnostics = diagnostics.concat(builder.getSemanticDiagnostics(program));
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

            function writeFile(fileName: string, data: string, writeByteOrderMark: boolean) {
                try {
                    performance.mark("beforeIOWrite");
                    ensureDirectoriesExist(getDirectoryPath(normalizePath(fileName)));

                    host.writeFile(fileName, data, writeByteOrderMark);

                    performance.mark("afterIOWrite");
                    performance.measure("I/O Write", "beforeIOWrite", "afterIOWrite");
                }
                catch (e) {
                    return createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, fileName, e);
                }
            }

            function writeOutputFiles(outputFiles: OutputFile[]) {
                if (outputFiles) {
                    for (const outputFile of outputFiles) {
                        const error = writeFile(outputFile.name, outputFile.text, outputFile.writeByteOrderMark);
                        if (error) {
                            diagnostics.push(error);
                        }
                        if (emittedFiles) {
                            emittedFiles.push(outputFile.name);
                        }
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
        let configFileWatcher: FileWatcher;                                 // watcher for the config file
        let watchedWildcardDirectories: Map<WildcardDirectoryWatcher>;     // map of watchers for the wild card directories in the config file
        let timerToUpdateProgram: any;                                      // timer callback to recompile the program

        const sourceFilesCache = createMap<HostFileInfo | string>();        // Cache that stores the source file and version info
        let missingFilePathsRequestedForRelease: Path[];                    // These paths are held temparirly so that we can remove the entry from source file cache if the file is not tracked by missing files
        let hasInvalidatedResolution: HasInvalidatedResolution;             // Passed along to see if source file has invalidated resolutions
        let hasChangedCompilerOptions = false;                              // True if the compiler options have changed between compilations

        watchingHost = watchingHost || createWatchingSystemHost(compilerOptions.pretty);
        const { system, parseConfigFile, reportDiagnostic, reportWatchDiagnostic, beforeCompile, afterCompile } = watchingHost;

        let host: System;
        if (configFileName) {
            host = createCachedSystem(system);
            configFileWatcher = system.watchFile(configFileName, onConfigFileChanged);
        }
        else {
            host = system;
        }
        const currentDirectory = host.getCurrentDirectory();
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames);

        // Cache for the module resolution
        const resolutionCache = createResolutionCache(
            fileName => toPath(fileName),
            () => compilerOptions,
            watchFailedLookupLocation,
            s => writeLog(s)
        );

        // There is no extra check needed since we can just rely on the program to decide emit
        const builder = createBuilder(getCanonicalFileName, getFileEmitOutput, computeHash, _sourceFile => true);

        synchronizeProgram();

        // Update the wild card directory watch
        watchConfigFileWildCardDirectories();

        return () => program;

        function synchronizeProgram() {
            writeLog(`Synchronizing program`);

            hasInvalidatedResolution = resolutionCache.createHasInvalidatedResolution();
            if (isProgramUptoDate(program, rootFileNames, compilerOptions, getSourceVersion, fileExists, hasInvalidatedResolution)) {
                return;
            }

            // Create the compiler host
            const compilerHost = createWatchedCompilerHost(compilerOptions);
            resolutionCache.setModuleResolutionHost(compilerHost);
            if (hasChangedCompilerOptions && changesAffectModuleResolution(program && program.getCompilerOptions(), compilerOptions)) {
                resolutionCache.clear();
            }
            hasChangedCompilerOptions = false;
            beforeCompile(compilerOptions);

            // Compile the program
            program = createProgram(rootFileNames, compilerOptions, compilerHost, program);
            builder.onProgramUpdateGraph(program, hasInvalidatedResolution);

            // Update watches
            updateMissingFilePathsWatch(program, missingFilesMap || (missingFilesMap = createMap()), watchMissingFilePath, closeMissingFilePathWatcher);
            if (missingFilePathsRequestedForRelease) {
                // These are the paths that program creater told us as not in use any more but were missing on the disk.
                // We didnt remove the entry for them from sourceFiles cache so that we dont have to do File IO,
                // if there is already watcher for it (for missing files)
                // At that point our watches were updated, hence now we know that these paths are not tracked and need to be removed
                // so that at later time we have correct result of their presence
                for (const missingFilePath of missingFilePathsRequestedForRelease) {
                    if (!missingFilesMap.has(missingFilePath)) {
                        sourceFilesCache.delete(missingFilePath);
                    }
                }
                missingFilePathsRequestedForRelease = undefined;
            }

            afterCompile(host, program, builder);
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes));
        }

        function createWatchedCompilerHost(options: CompilerOptions): CompilerHost {
            const newLine = getNewLineCharacter(options, system);
            const realpath = host.realpath && ((path: string) => host.realpath(path));

            return {
                getSourceFile: getVersionedSourceFile,
                getSourceFileByPath: getVersionedSourceFileByPath,
                getDefaultLibLocation,
                getDefaultLibFileName: options => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options)),
                writeFile: (_fileName, _data, _writeByteOrderMark, _onError?, _sourceFiles?) => { },
                getCurrentDirectory: memoize(() => host.getCurrentDirectory()),
                useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames,
                getCanonicalFileName,
                getNewLine: () => newLine,
                fileExists,
                readFile: fileName => host.readFile(fileName),
                trace: (s: string) => host.write(s + newLine),
                directoryExists: directoryName => host.directoryExists(directoryName),
                getEnvironmentVariable: name => host.getEnvironmentVariable ? host.getEnvironmentVariable(name) : "",
                getDirectories: (path: string) => host.getDirectories(path),
                realpath,
                resolveTypeReferenceDirectives: (typeDirectiveNames, containingFile) => resolutionCache.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile),
                resolveModuleNames: (moduleNames, containingFile) => resolutionCache.resolveModuleNames(moduleNames, containingFile, /*logChanges*/ false),
                onReleaseOldSourceFile,
                hasInvalidatedResolution
            };
        }

        function toPath(fileName: string) {
            return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        }

        function fileExists(fileName: string) {
            const path = toPath(fileName);
            const hostSourceFileInfo = sourceFilesCache.get(path);
            if (hostSourceFileInfo !== undefined) {
                return !isString(hostSourceFileInfo);
            }

            return host.fileExists(fileName);
        }

        function getDefaultLibLocation(): string {
            return getDirectoryPath(normalizePath(host.getExecutingFilePath()));
        }

        function getVersionedSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile {
            return getVersionedSourceFileByPath(fileName, toPath(fileName), languageVersion, onError, shouldCreateNewSourceFile);
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
                            hostSourceFile.fileWatcher = watchSourceFileForChanges(path);
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
                        fileWatcher = watchSourceFileForChanges(path);
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

        function removeSourceFile(path: Path) {
            const hostSourceFile = sourceFilesCache.get(path);
            if (hostSourceFile !== undefined) {
                if (!isString(hostSourceFile)) {
                    hostSourceFile.fileWatcher.close();
                    resolutionCache.invalidateResolutionOfDeletedFile(path);
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

            const cachedHost = host as CachedSystem;
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

        function watchSourceFileForChanges(path: Path) {
            return host.watchFile(path, (fileName, eventKind) => onSourceFileChange(fileName, path, eventKind));
        }

        function onSourceFileChange(fileName: string, path: Path, eventKind: FileWatcherEventKind) {
            writeLog(`Source file path : ${path} changed: ${FileWatcherEventKind[eventKind]}, fileName: ${fileName}`);

            updateCachedSystemWithFile(fileName, path, eventKind);
            const hostSourceFile = sourceFilesCache.get(path);
            if (hostSourceFile) {
                // Update the cache
                if (eventKind === FileWatcherEventKind.Deleted) {
                    resolutionCache.invalidateResolutionOfDeletedFile(path);
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
                (host as CachedSystem).addOrDeleteFile(fileName, path, eventKind);
            }
        }

        function watchFailedLookupLocation(failedLookupLocation: string, failedLookupLocationPath: Path, containingFile: string, name: string) {
            return host.watchFile(failedLookupLocation, (fileName, eventKind) => onFailedLookupLocationChange(fileName, eventKind, failedLookupLocation, failedLookupLocationPath, containingFile, name));
        }

        function onFailedLookupLocationChange(fileName: string, eventKind: FileWatcherEventKind, failedLookupLocation: string, failedLookupLocationPath: Path, containingFile: string, name: string) {
            writeLog(`Failed lookup location : ${failedLookupLocation} changed: ${FileWatcherEventKind[eventKind]}, fileName: ${fileName} containingFile: ${containingFile}, name: ${name}`);
            updateCachedSystemWithFile(fileName, failedLookupLocationPath, eventKind);
            resolutionCache.invalidateResolutionOfChangedFailedLookupLocation(failedLookupLocation);
            scheduleProgramUpdate();
        }

        function watchMissingFilePath(missingFilePath: Path) {
            return host.watchFile(missingFilePath, (fileName, eventKind) => onMissingFileChange(fileName, missingFilePath, eventKind));
        }

        function closeMissingFilePathWatcher(_missingFilePath: Path, fileWatcher: FileWatcher) {
            fileWatcher.close();
        }

        function onMissingFileChange(fileName: string, missingFilePath: Path, eventKind: FileWatcherEventKind) {
            writeLog(`Missing file path : ${missingFilePath} changed: ${FileWatcherEventKind[eventKind]}, fileName: ${fileName}`);
            updateCachedSystemWithFile(fileName, missingFilePath, eventKind);

            if (eventKind === FileWatcherEventKind.Created && missingFilesMap.has(missingFilePath)) {
                closeMissingFilePathWatcher(missingFilePath, missingFilesMap.get(missingFilePath));
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
                watchWildCardDirectory,
                stopWatchingWildCardDirectory
            );
        }

        function watchWildCardDirectory(directory: string, flags: WatchDirectoryFlags) {
            return host.watchDirectory(directory, fileOrFolder =>
                onFileAddOrRemoveInWatchedDirectory(getNormalizedAbsolutePath(fileOrFolder, directory)),
                (flags & WatchDirectoryFlags.Recursive) !== 0);
        }

        function stopWatchingWildCardDirectory(_directory: string, { watcher }: WildcardDirectoryWatcher, _recursiveChanged: boolean) {
            watcher.close();
        }

        function onFileAddOrRemoveInWatchedDirectory(fileOrFolder: string) {
            Debug.assert(!!configFileName);

            const fileOrFolderPath = toPath(fileOrFolder);

            // Since the file existance changed, update the sourceFiles cache
            (host as CachedSystem).addOrDeleteFileOrFolder(fileOrFolder, fileOrFolderPath);
            removeSourceFile(fileOrFolderPath);

            // If a change was made inside "folder/file", node will trigger the callback twice:
            // one with the fileName being "folder/file", and the other one with "folder".
            // We don't respond to the second one.
            if (fileOrFolder && !isSupportedSourceFileName(fileOrFolder, compilerOptions)) {
                writeLog(`Project: ${configFileName} Detected file add/remove of non supported extension: ${fileOrFolder}`);
                return;
            }

            writeLog(`Project: ${configFileName} Detected file add/remove of supported extension: ${fileOrFolder}`);

            // Reload is pending, do the reload
            if (!needsReload) {
                const result = getFileNamesFromConfigSpecs(configFileSpecs, getDirectoryPath(configFileName), compilerOptions, host);
                if (!configFileSpecs.filesSpecs) {
                    reportDiagnostic(getErrorForNoInputFiles(configFileSpecs, configFileName));
                }
                rootFileNames = result.fileNames;

                // Schedule Update the program
                scheduleProgramUpdate();
            }
        }

        function onConfigFileChanged(fileName: string, eventKind: FileWatcherEventKind) {
            writeLog(`Config file : ${configFileName} changed: ${FileWatcherEventKind[eventKind]}, fileName: ${fileName}`);
            scheduleProgramReload();
        }

        function writeLog(s: string) {
            const hasDiagnostics = compilerOptions.diagnostics || compilerOptions.extendedDiagnostics;
            if (hasDiagnostics) {
                host.write(s);
            }
        }

        function computeHash(data: string) {
            return system.createHash ? system.createHash(data) : data;
        }
    }

    interface CachedSystem extends System, CachedHost {
    }

    function createCachedSystem(host: System): CachedSystem {
        const getFileSize = host.getFileSize ? (path: string) => host.getFileSize(path) : undefined;
        const watchFile = host.watchFile ? (path: string, callback: FileWatcherCallback, pollingInterval?: number) => host.watchFile(path, callback, pollingInterval) : undefined;
        const watchDirectory = host.watchDirectory ? (path: string, callback: DirectoryWatcherCallback, recursive?: boolean) => host.watchDirectory(path, callback, recursive) : undefined;
        const getModifiedTime = host.getModifiedTime ? (path: string) => host.getModifiedTime(path) : undefined;
        const createHash = host.createHash ? (data: string) => host.createHash(data) : undefined;
        const getMemoryUsage = host.getMemoryUsage ? () => host.getMemoryUsage() : undefined;
        const realpath = host.realpath ? (path: string) => host.realpath(path) : undefined;
        const tryEnableSourceMapsForHost = host.tryEnableSourceMapsForHost ? () => host.tryEnableSourceMapsForHost() : undefined;
        const setTimeout = host.setTimeout ? (callback: (...args: any[]) => void, ms: number, ...args: any[]) => host.setTimeout(callback, ms, ...args) : undefined;
        const clearTimeout = host.clearTimeout ? (timeoutId: any) => host.clearTimeout(timeoutId) : undefined;

        const cachedPartialSystem = createCachedPartialSystem(host);
        return {
            args: host.args,
            newLine: host.newLine,
            useCaseSensitiveFileNames: host.useCaseSensitiveFileNames,
            write: s => host.write(s),
            readFile: (path, encoding?) => host.readFile(path, encoding),
            getFileSize,
            writeFile: (fileName, data, writeByteOrderMark?) => cachedPartialSystem.writeFile(fileName, data, writeByteOrderMark),
            watchFile,
            watchDirectory,
            resolvePath: path => host.resolvePath(path),
            fileExists: fileName => cachedPartialSystem.fileExists(fileName),
            directoryExists: dir => cachedPartialSystem.directoryExists(dir),
            createDirectory: dir => cachedPartialSystem.createDirectory(dir),
            getExecutingFilePath: () => host.getExecutingFilePath(),
            getCurrentDirectory: () => cachedPartialSystem.getCurrentDirectory(),
            getDirectories: dir => cachedPartialSystem.getDirectories(dir),
            readDirectory: (path, extensions, excludes, includes, depth) => cachedPartialSystem.readDirectory(path, extensions, excludes, includes, depth),
            getModifiedTime,
            createHash,
            getMemoryUsage,
            exit: exitCode => host.exit(exitCode),
            realpath,
            getEnvironmentVariable: name => host.getEnvironmentVariable(name),
            tryEnableSourceMapsForHost,
            debugMode: host.debugMode,
            setTimeout,
            clearTimeout,
            addOrDeleteFileOrFolder: (fileOrFolder, fileOrFolderPath) => cachedPartialSystem.addOrDeleteFileOrFolder(fileOrFolder, fileOrFolderPath),
            addOrDeleteFile: (file, filePath, eventKind) => cachedPartialSystem.addOrDeleteFile(file, filePath, eventKind),
            clearCache: () => cachedPartialSystem.clearCache()
        };
    }
}
