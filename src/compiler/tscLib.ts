/// <reference path="program.ts"/>
/// <reference path="commandLineParser.ts"/>

namespace ts {
    export interface CompilerHost {
        /** If this is the emit based on the graph builder, use it to emit */
        emitWithBuilder?(program: Program): EmitResult;
    }

    interface Statistic {
        name: string;
        value: string;
    }

    export interface FormatDiagnosticsHostWithWrite extends FormatDiagnosticsHost {
        write?(s: string): void;
    }

    const defaultFormatDiagnosticsHost: FormatDiagnosticsHostWithWrite = sys ? {
        getCurrentDirectory: () => sys.getCurrentDirectory(),
        getNewLine: () => sys.newLine,
        getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames),
        write: s => sys.write(s)
    } : undefined;

    function getDefaultFormatDiagnosticsHost(system: System): FormatDiagnosticsHostWithWrite {
        return system === sys ? defaultFormatDiagnosticsHost : {
            getCurrentDirectory: () => system.getCurrentDirectory(),
            getNewLine: () => system.newLine,
            getCanonicalFileName: createGetCanonicalFileName(system.useCaseSensitiveFileNames),
            write: s => system.write(s)
        };
    }

    let reportDiagnosticWorker = reportDiagnosticSimply;

    function reportDiagnostic(diagnostic: Diagnostic, host: FormatDiagnosticsHostWithWrite) {
        reportDiagnosticWorker(diagnostic, host || defaultFormatDiagnosticsHost);
    }

    function reportDiagnostics(diagnostics: Diagnostic[], host: FormatDiagnosticsHostWithWrite): void {
        for (const diagnostic of diagnostics) {
            reportDiagnostic(diagnostic, host);
        }
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

    function countLines(program: Program): number {
        let count = 0;
        forEach(program.getSourceFiles(), file => {
            count += getLineStarts(file).length;
        });
        return count;
    }

    function getDiagnosticText(_message: DiagnosticMessage, ..._args: any[]): string {
        const diagnostic = createCompilerDiagnostic.apply(undefined, arguments);
        return <string>diagnostic.messageText;
    }

    function reportDiagnosticSimply(diagnostic: Diagnostic, host: FormatDiagnosticsHostWithWrite): void {
        host.write(ts.formatDiagnostics([diagnostic], host));
    }

    function reportDiagnosticWithColorAndContext(diagnostic: Diagnostic, host: FormatDiagnosticsHostWithWrite): void {
        host.write(ts.formatDiagnosticsWithColorAndContext([diagnostic], host) + host.getNewLine());
    }

    function reportWatchDiagnostic(diagnostic: Diagnostic, system: System) {
        let output = new Date().toLocaleTimeString() + " - ";

        if (diagnostic.file) {
            const loc = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
            output += `${ diagnostic.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `;
        }

        output += `${ flattenDiagnosticMessageText(diagnostic.messageText, system.newLine) }${ system.newLine + system.newLine + system.newLine }`;

        system.write(output);
    }

    function padLeft(s: string, length: number) {
        while (s.length < length) {
            s = " " + s;
        }
        return s;
    }

    function padRight(s: string, length: number) {
        while (s.length < length) {
            s = s + " ";
        }

        return s;
    }

    function isJSONSupported() {
        return typeof JSON === "object" && typeof JSON.parse === "function";
    }

    export function executeCommandLine(args: string[]): void {
        const commandLine = parseCommandLine(args);

        // Configuration file name (if any)
        let configFileName: string;
        if (commandLine.options.locale) {
            if (!isJSONSupported()) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--locale"), /* host */ undefined);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
            validateLocaleAndSetLanguage(commandLine.options.locale, sys, commandLine.errors);
        }

        // If there are any errors due to command line parsing and/or
        // setting up localization, report them and quit.
        if (commandLine.errors.length > 0) {
            reportDiagnostics(commandLine.errors, /*host*/ undefined);
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        if (commandLine.options.init) {
            writeConfigFile(commandLine.options, commandLine.fileNames);
            return sys.exit(ExitStatus.Success);
        }

        if (commandLine.options.version) {
            printVersion();
            return sys.exit(ExitStatus.Success);
        }

        if (commandLine.options.help || commandLine.options.all) {
            printVersion();
            printHelp(commandLine.options.all);
            return sys.exit(ExitStatus.Success);
        }

        if (commandLine.options.project) {
            if (!isJSONSupported()) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--project"), /* host */ undefined);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
            if (commandLine.fileNames.length !== 0) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line), /* host */ undefined);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }

            const fileOrDirectory = normalizePath(commandLine.options.project);
            if (!fileOrDirectory /* current directory "." */ || sys.directoryExists(fileOrDirectory)) {
                configFileName = combinePaths(fileOrDirectory, "tsconfig.json");
                if (!sys.fileExists(configFileName)) {
                    reportDiagnostic(createCompilerDiagnostic(Diagnostics.Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0, commandLine.options.project), /* host */ undefined);
                    return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                }
            }
            else {
                configFileName = fileOrDirectory;
                if (!sys.fileExists(configFileName)) {
                    reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_specified_path_does_not_exist_Colon_0, commandLine.options.project), /* host */ undefined);
                    return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                }
            }
        }
        else if (commandLine.fileNames.length === 0 && isJSONSupported()) {
            const searchPath = normalizePath(sys.getCurrentDirectory());
            configFileName = findConfigFile(searchPath, sys.fileExists);
        }

        if (commandLine.fileNames.length === 0 && !configFileName) {
            printVersion();
            printHelp(commandLine.options.all);
            return sys.exit(ExitStatus.Success);
        }

        const commandLineOptions = commandLine.options;
        if (configFileName) {
            const configParseResult = parseConfigFile(configFileName, commandLineOptions, sys);
            if (isWatchSet(configParseResult.options)) {
                reportWatchModeWithoutSysSupport();
                createWatchModeWithConfigFile(configParseResult, commandLineOptions, sys);
            }
            else {
                performCompilation(configParseResult.fileNames, configParseResult.options);
            }
        }
        else {
            if (isWatchSet(commandLine.options)) {
                reportWatchModeWithoutSysSupport();
                createWatchModeWithoutConfigFile(commandLine.fileNames, commandLineOptions, sys);
            }
            else {
                performCompilation(commandLine.fileNames, commandLineOptions);
            }
        }

        function reportWatchModeWithoutSysSupport() {
            if (!sys.watchFile || !sys.watchDirectory) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"), /* host */ undefined);
                sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
        }

        function performCompilation(rootFileNames: string[], compilerOptions: CompilerOptions) {
            if (compilerOptions.pretty) {
                reportDiagnosticWorker = reportDiagnosticWithColorAndContext;
            }

            const compilerHost = createCompilerHost(compilerOptions);
            const compileResult = compile(rootFileNames, compilerOptions, compilerHost, sys);
            return sys.exit(compileResult.exitStatus);
        }
    }

    interface HostFileInfo {
        version: number;
        sourceFile: SourceFile;
        fileWatcher: FileWatcher;
    }

    /* @internal */
    export function createWatchModeWithConfigFile(configParseResult: ParsedCommandLine, optionsToExtend: CompilerOptions, system: System) {
        return createWatchMode(configParseResult.fileNames, configParseResult.options, system, configParseResult.options.configFilePath, configParseResult.configFileSpecs, configParseResult.wildcardDirectories, optionsToExtend);
    }

    /* @internal */
    export function createWatchModeWithoutConfigFile(rootFileNames: string[], compilerOptions: CompilerOptions, system: System) {
        return createWatchMode(rootFileNames, compilerOptions, system);
    }

    function createWatchMode(rootFileNames: string[], compilerOptions: CompilerOptions, system: System, configFileName?: string, configFileSpecs?: ConfigFileSpecs, configFileWildCardDirectories?: MapLike<WatchDirectoryFlags>, optionsToExtendForConfigFile?: CompilerOptions) {
        let program: Program;
        let needsReload: boolean;                                           // true if the config file changed and needs to reload it from the disk
        let missingFilesMap: Map<FileWatcher>;                              // Map of file watchers for the missing files
        let configFileWatcher: FileWatcher;                                 // watcher for the config file
        let watchedWildCardDirectories: Map<WildCardDirectoryWatchers>;     // map of watchers for the wild card directories in the config file
        let timerToUpdateProgram: any;                                      // timer callback to recompile the program

        const sourceFilesCache = createMap<HostFileInfo | string>();        // Cache that stores the source file and version info

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

        // There is no extra check needed since we can just rely on the program to decide emit
        const builder = createBuilder(getCanonicalFileName, getFileEmitOutput, computeHash, _sourceFile => true);

        if (compilerOptions.pretty) {
            reportDiagnosticWorker = reportDiagnosticWithColorAndContext;
        }

        synchronizeProgram();

        // Update the wild card directory watch
        watchConfigFileWildCardDirectories();

        return () => program;

        function synchronizeProgram() {
            writeLog(`Synchronizing program`);

            if (isProgramUptoDate(program, rootFileNames, compilerOptions, getSourceVersion, fileExists)) {
                return;
            }

            // Create the compiler host
            const compilerHost = createWatchedCompilerHost(compilerOptions);
            program = compile(rootFileNames, compilerOptions, compilerHost, system, program).program;

            // Update watches
            missingFilesMap = updateMissingFilePathsWatch(program, missingFilesMap, watchMissingFilePath, closeMissingFilePathWatcher);

            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes), system);
        }

        function createWatchedCompilerHost(options: CompilerOptions): CompilerHost {
            const newLine = getNewLineCharacter(options);
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
                onReleaseOldSourceFile,
                emitWithBuilder
            };

            // TODO: cache module resolution
            // if (host.resolveModuleNames) {
            //     compilerHost.resolveModuleNames = (moduleNames, containingFile) => host.resolveModuleNames(moduleNames, containingFile);
            // }
            // if (host.resolveTypeReferenceDirectives) {
            //     compilerHost.resolveTypeReferenceDirectives = (typeReferenceDirectiveNames, containingFile) => {
            //         return host.resolveTypeReferenceDirectives(typeReferenceDirectiveNames, containingFile);
            //     };
            // }

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

            function emitWithBuilder(program: Program): EmitResult {
                builder.onProgramUpdateGraph(program);
                const emittedFiles: string[] = program.getCompilerOptions().listEmittedFiles ? [] : undefined;
                let sourceMaps: SourceMapData[];
                let emitSkipped: boolean;
                let diagnostics: Diagnostic[];

                const result = builder.emitChangedFiles(program);
                switch (result.length) {
                    case 0:
                        emitSkipped = true;
                        break;
                    case 1:
                        const emitOutput = result[0];
                        ({ diagnostics, sourceMaps, emitSkipped } = emitOutput);
                        writeOutputFiles(emitOutput.outputFiles);
                        break;
                    default:
                        for (const emitOutput of result) {
                            if (emitOutput.emitSkipped) {
                                emitSkipped = true;
                            }
                            diagnostics = concatenate(diagnostics, emitOutput.diagnostics);
                            sourceMaps = concatenate(sourceMaps, emitOutput.sourceMaps);
                            writeOutputFiles(emitOutput.outputFiles);
                        }
                }

                return { emitSkipped, diagnostics: diagnostics || [], emittedFiles, sourceMaps };

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

        function fileExists(fileName: string) {
            const path = toPath(fileName, currentDirectory, getCanonicalFileName);
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
            return getVersionedSourceFileByPath(fileName, toPath(fileName, currentDirectory, getCanonicalFileName), languageVersion, onError, shouldCreateNewSourceFile);
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
            if (hostSourceFileInfo && !isString(hostSourceFileInfo) && hostSourceFileInfo.sourceFile === oldSourceFile) {
                sourceFilesCache.delete(oldSourceFile.path);
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
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation), system);

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
            const configParseResult = parseConfigFile(configFileName, optionsToExtendForConfigFile, cachedHost);
            rootFileNames = configParseResult.fileNames;
            compilerOptions = configParseResult.options;
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

            updateCachedSystem(fileName, path);
            const hostSourceFile = sourceFilesCache.get(path);
            if (hostSourceFile) {
                // Update the cache
                if (eventKind === FileWatcherEventKind.Deleted) {
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

        function updateCachedSystem(fileName: string, path: Path) {
            if (configFileName) {
                const absoluteNormalizedPath = getNormalizedAbsolutePath(fileName, getDirectoryPath(path));
                (host as CachedSystem).addOrDeleteFileOrFolder(normalizePath(absoluteNormalizedPath));
            }
        }

        function watchMissingFilePath(missingFilePath: Path) {
            return host.watchFile(missingFilePath, (fileName, eventKind) => onMissingFileChange(fileName, missingFilePath, eventKind));
        }

        function closeMissingFilePathWatcher(_missingFilePath: Path, fileWatcher: FileWatcher) {
            fileWatcher.close();
        }

        function onMissingFileChange(filename: string, missingFilePath: Path, eventKind: FileWatcherEventKind) {
            writeLog(`Missing file path : ${missingFilePath} changed: ${FileWatcherEventKind[eventKind]}, fileName: ${filename}`);
            if (eventKind === FileWatcherEventKind.Created && missingFilesMap.has(missingFilePath)) {
                closeMissingFilePathWatcher(missingFilePath, missingFilesMap.get(missingFilePath));
                missingFilesMap.delete(missingFilePath);

                updateCachedSystem(filename, missingFilePath);

                // Delete the entry in the source files cache so that new source file is created
                removeSourceFile(missingFilePath);

                // When a missing file is created, we should update the graph.
                scheduleProgramUpdate();
            }
        }

        function watchConfigFileWildCardDirectories() {
            const wildcards = createMapFromTemplate(configFileWildCardDirectories);
            watchedWildCardDirectories = updateWatchingWildcardDirectories(
                watchedWildCardDirectories, wildcards,
                watchWildCardDirectory, stopWatchingWildCardDirectory
            );
        }

        function watchWildCardDirectory(directory: string, recursive: boolean) {
            return host.watchDirectory(directory, fileName =>
                onFileAddOrRemoveInWatchedDirectory(getNormalizedAbsolutePath(fileName, directory)),
                recursive);
        }

        function stopWatchingWildCardDirectory(_directory: string, fileWatcher: FileWatcher, _recursive: boolean, _recursiveChanged: boolean) {
            fileWatcher.close();
        }

        function onFileAddOrRemoveInWatchedDirectory(fileName: string) {
            Debug.assert(!!configFileName);

            const path = toPath(fileName, currentDirectory, getCanonicalFileName);

            // Since the file existance changed, update the sourceFiles cache
            updateCachedSystem(fileName, path);
            removeSourceFile(path);

            // If a change was made inside "folder/file", node will trigger the callback twice:
            // one with the fileName being "folder/file", and the other one with "folder".
            // We don't respond to the second one.
            if (fileName && !isSupportedSourceFileName(fileName, compilerOptions)) {
                writeLog(`Project: ${configFileName} Detected file add/remove of non supported extension: ${fileName}`);
                return;
            }

            writeLog(`Project: ${configFileName} Detected file add/remove of supported extension: ${fileName}`);

            // Reload is pending, do the reload
            if (!needsReload) {
                const result = getFileNamesFromConfigSpecs(configFileSpecs, getDirectoryPath(configFileName), compilerOptions, host, /*extraFileExtensions*/ []);
                if (!configFileSpecs.filesSpecs) {
                    reportDiagnostics([getErrorForNoInputFiles(configFileSpecs, configFileName)], getDefaultFormatDiagnosticsHost(system));
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

    interface CachedSystem extends System {
        addOrDeleteFileOrFolder(fileOrFolder: string): void;
        clearCache(): void;
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

        const cachedHost = createCachedHost(host);
        return {
            args: host.args,
            newLine: host.newLine,
            useCaseSensitiveFileNames: host.useCaseSensitiveFileNames,
            write: s => host.write(s),
            readFile: (path, encoding?) => host.readFile(path, encoding),
            getFileSize,
            writeFile: (fileName, data, writeByteOrderMark?) => cachedHost.writeFile(fileName, data, writeByteOrderMark),
            watchFile,
            watchDirectory,
            resolvePath: path => host.resolvePath(path),
            fileExists: fileName => cachedHost.fileExists(fileName),
            directoryExists: dir => cachedHost.directoryExists(dir),
            createDirectory: dir => cachedHost.createDirectory(dir),
            getExecutingFilePath: () => host.getExecutingFilePath(),
            getCurrentDirectory: () => cachedHost.getCurrentDirectory(),
            getDirectories: dir => cachedHost.getDirectories(dir),
            readDirectory: (path, extensions, excludes, includes, depth) => cachedHost.readDirectory(path, extensions, excludes, includes, depth),
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
            addOrDeleteFileOrFolder: fileOrFolder => cachedHost.addOrDeleteFileOrFolder(fileOrFolder),
            clearCache: () => cachedHost.clearCache()
        };
    }

    /* @internal */
    export function parseConfigFile(configFileName: string, optionsToExtend: CompilerOptions, system: System): ParsedCommandLine {
        let configFileText: string;
        try {
            configFileText = system.readFile(configFileName);
        }
        catch (e) {
            const error = createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, configFileName, e.message);
            reportWatchDiagnostic(error, system);
            system.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            return;
        }
        if (!configFileText) {
            const error = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
            reportDiagnostics([error], getDefaultFormatDiagnosticsHost(system));
            system.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            return;
        }

        const result = parseJsonText(configFileName, configFileText);
        reportDiagnostics(result.parseDiagnostics, getDefaultFormatDiagnosticsHost(system));

        const cwd = system.getCurrentDirectory();
        const configParseResult = parseJsonSourceFileConfigFileContent(result, system, getNormalizedAbsolutePath(getDirectoryPath(configFileName), cwd), optionsToExtend, getNormalizedAbsolutePath(configFileName, cwd));
        reportDiagnostics(configParseResult.errors, getDefaultFormatDiagnosticsHost(system));

        return configParseResult;
    }

    function compile(fileNames: string[], compilerOptions: CompilerOptions, compilerHost: CompilerHost, system: System, oldProgram?: Program) {
        const hasDiagnostics = compilerOptions.diagnostics || compilerOptions.extendedDiagnostics;
        let statistics: Statistic[];
        if (hasDiagnostics) {
            performance.enable();
            statistics = [];
        }

        const program = createProgram(fileNames, compilerOptions, compilerHost, oldProgram);
        const exitStatus = compileProgram();

        if (compilerOptions.listFiles) {
            forEach(program.getSourceFiles(), file => {
                system.write(file.fileName + system.newLine);
            });
        }

        if (hasDiagnostics) {
            const memoryUsed = system.getMemoryUsage ? system.getMemoryUsage() : -1;
            reportCountStatistic("Files", program.getSourceFiles().length);
            reportCountStatistic("Lines", countLines(program));
            reportCountStatistic("Nodes", program.getNodeCount());
            reportCountStatistic("Identifiers", program.getIdentifierCount());
            reportCountStatistic("Symbols", program.getSymbolCount());
            reportCountStatistic("Types", program.getTypeCount());

            if (memoryUsed >= 0) {
                reportStatisticalValue("Memory used", Math.round(memoryUsed / 1000) + "K");
            }

            const programTime = performance.getDuration("Program");
            const bindTime = performance.getDuration("Bind");
            const checkTime = performance.getDuration("Check");
            const emitTime = performance.getDuration("Emit");
            if (compilerOptions.extendedDiagnostics) {
                performance.forEachMeasure((name, duration) => reportTimeStatistic(`${name} time`, duration));
            }
            else {
                // Individual component times.
                // Note: To match the behavior of previous versions of the compiler, the reported parse time includes
                // I/O read time and processing time for triple-slash references and module imports, and the reported
                // emit time includes I/O write time. We preserve this behavior so we can accurately compare times.
                reportTimeStatistic("I/O read", performance.getDuration("I/O Read"));
                reportTimeStatistic("I/O write", performance.getDuration("I/O Write"));
                reportTimeStatistic("Parse time", programTime);
                reportTimeStatistic("Bind time", bindTime);
                reportTimeStatistic("Check time", checkTime);
                reportTimeStatistic("Emit time", emitTime);
            }
            reportTimeStatistic("Total time", programTime + bindTime + checkTime + emitTime);
            reportStatistics();

            performance.disable();
        }

        return { program, exitStatus };

        function compileProgram(): ExitStatus {
            let diagnostics: Diagnostic[];

            // First get and report any syntactic errors.
            diagnostics = program.getSyntacticDiagnostics();

            // If we didn't have any syntactic errors, then also try getting the global and
            // semantic errors.
            if (diagnostics.length === 0) {
                diagnostics = program.getOptionsDiagnostics().concat(program.getGlobalDiagnostics());

                if (diagnostics.length === 0) {
                    diagnostics = program.getSemanticDiagnostics();
                }
            }

            // Emit and report any errors we ran into.
            let emitOutput: EmitResult;
            if (compilerHost.emitWithBuilder) {
                emitOutput = compilerHost.emitWithBuilder(program);
            }
            else {
                // Emit whole program
                emitOutput = program.emit();
            }
            diagnostics = diagnostics.concat(emitOutput.diagnostics);

            reportDiagnostics(sortAndDeduplicateDiagnostics(diagnostics), getDefaultFormatDiagnosticsHost(system));

            reportEmittedFiles(emitOutput.emittedFiles, system);
            if (emitOutput.emitSkipped && diagnostics.length > 0) {
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

        function reportStatistics() {
            let nameSize = 0;
            let valueSize = 0;
            for (const { name, value } of statistics) {
                if (name.length > nameSize) {
                    nameSize = name.length;
                }

                if (value.length > valueSize) {
                    valueSize = value.length;
                }
            }

            for (const { name, value } of statistics) {
                system.write(padRight(name + ":", nameSize + 2) + padLeft(value.toString(), valueSize) + system.newLine);
            }
        }

        function reportStatisticalValue(name: string, value: string) {
            statistics.push({ name, value });
        }

        function reportCountStatistic(name: string, count: number) {
            reportStatisticalValue(name, "" + count);
        }

        function reportTimeStatistic(name: string, time: number) {
            reportStatisticalValue(name, (time / 1000).toFixed(2) + "s");
        }
    }

    function printVersion() {
        sys.write(getDiagnosticText(Diagnostics.Version_0, ts.version) + sys.newLine);
    }

    function printHelp(showAllOptions: boolean) {
        const output: string[] = [];

        // We want to align our "syntax" and "examples" commands to a certain margin.
        const syntaxLength = getDiagnosticText(Diagnostics.Syntax_Colon_0, "").length;
        const examplesLength = getDiagnosticText(Diagnostics.Examples_Colon_0, "").length;
        let marginLength = Math.max(syntaxLength, examplesLength);

        // Build up the syntactic skeleton.
        let syntax = makePadding(marginLength - syntaxLength);
        syntax += "tsc [" + getDiagnosticText(Diagnostics.options) + "] [" + getDiagnosticText(Diagnostics.file) + " ...]";

        output.push(getDiagnosticText(Diagnostics.Syntax_Colon_0, syntax));
        output.push(sys.newLine + sys.newLine);

        // Build up the list of examples.
        const padding = makePadding(marginLength);
        output.push(getDiagnosticText(Diagnostics.Examples_Colon_0, makePadding(marginLength - examplesLength) + "tsc hello.ts") + sys.newLine);
        output.push(padding + "tsc --outFile file.js file.ts" + sys.newLine);
        output.push(padding + "tsc @args.txt" + sys.newLine);
        output.push(sys.newLine);

        output.push(getDiagnosticText(Diagnostics.Options_Colon) + sys.newLine);

        // Sort our options by their names, (e.g. "--noImplicitAny" comes before "--watch")
        const optsList = showAllOptions ?
            optionDeclarations.slice().sort((a, b) => compareValues<string>(a.name.toLowerCase(), b.name.toLowerCase())) :
            filter(optionDeclarations.slice(), v => v.showInSimplifiedHelpView);

        // We want our descriptions to align at the same column in our output,
        // so we keep track of the longest option usage string.
        marginLength = 0;
        const usageColumn: string[] = []; // Things like "-d, --declaration" go in here.
        const descriptionColumn: string[] = [];

        const optionsDescriptionMap = createMap<string[]>();  // Map between option.description and list of option.type if it is a kind

        for (let i = 0; i < optsList.length; i++) {
            const option = optsList[i];

            // If an option lacks a description,
            // it is not officially supported.
            if (!option.description) {
                continue;
            }

            let usageText = " ";
            if (option.shortName) {
                usageText += "-" + option.shortName;
                usageText += getParamType(option);
                usageText += ", ";
            }

            usageText += "--" + option.name;
            usageText += getParamType(option);

            usageColumn.push(usageText);
            let description: string;

            if (option.name === "lib") {
                description = getDiagnosticText(option.description);
                const element = (<CommandLineOptionOfListType>option).element;
                const typeMap = <Map<number | string>>element.type;
                optionsDescriptionMap.set(description, arrayFrom(typeMap.keys()).map(key => `'${key}'`));
            }
            else {
                description = getDiagnosticText(option.description);
            }

            descriptionColumn.push(description);

            // Set the new margin for the description column if necessary.
            marginLength = Math.max(usageText.length, marginLength);
        }

        // Special case that can't fit in the loop.
        const usageText = " @<" + getDiagnosticText(Diagnostics.file) + ">";
        usageColumn.push(usageText);
        descriptionColumn.push(getDiagnosticText(Diagnostics.Insert_command_line_options_and_files_from_a_file));
        marginLength = Math.max(usageText.length, marginLength);

        // Print out each row, aligning all the descriptions on the same column.
        for (let i = 0; i < usageColumn.length; i++) {
            const usage = usageColumn[i];
            const description = descriptionColumn[i];
            const kindsList = optionsDescriptionMap.get(description);
            output.push(usage + makePadding(marginLength - usage.length + 2) + description + sys.newLine);

            if (kindsList) {
                output.push(makePadding(marginLength + 4));
                for (const kind of kindsList) {
                    output.push(kind + " ");
                }
                output.push(sys.newLine);
            }
        }

        for (const line of output) {
            sys.write(line);
        }
        return;

        function getParamType(option: CommandLineOption) {
            if (option.paramType !== undefined) {
                return " " + getDiagnosticText(option.paramType);
            }
            return "";
        }

        function makePadding(paddingLength: number): string {
            return Array(paddingLength + 1).join(" ");
        }
    }

    function writeConfigFile(options: CompilerOptions, fileNames: string[]) {
        const currentDirectory = sys.getCurrentDirectory();
        const file = normalizePath(combinePaths(currentDirectory, "tsconfig.json"));
        if (sys.fileExists(file)) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.A_tsconfig_json_file_is_already_defined_at_Colon_0, file), /* host */ undefined);
        }
        else {
            sys.writeFile(file, generateTSConfig(options, fileNames, sys.newLine));
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Successfully_created_a_tsconfig_json_file), /* host */ undefined);
        }

        return;
    }
}

if (ts.Debug.isDebugging) {
    ts.Debug.enableDebugInfo();
}
