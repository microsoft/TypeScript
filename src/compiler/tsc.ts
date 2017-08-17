/// <reference path="program.ts"/>
/// <reference path="commandLineParser.ts"/>

namespace ts {
    export interface SourceFile {
        fileWatcher?: FileWatcher;
    }

    interface Statistic {
        name: string;
        value: string;
    }

    const defaultFormatDiagnosticsHost: FormatDiagnosticsHost = {
        getCurrentDirectory: () => sys.getCurrentDirectory(),
        getNewLine: () => sys.newLine,
        getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames)
    };

    let reportDiagnosticWorker = reportDiagnosticSimply;

    function reportDiagnostic(diagnostic: Diagnostic, host: FormatDiagnosticsHost) {
        reportDiagnosticWorker(diagnostic, host || defaultFormatDiagnosticsHost);
    }

    function reportDiagnostics(diagnostics: Diagnostic[], host: FormatDiagnosticsHost): void {
        for (const diagnostic of diagnostics) {
            reportDiagnostic(diagnostic, host);
        }
    }

    function reportEmittedFiles(files: string[]): void {
        if (!files || files.length === 0) {
            return;
        }

        const currentDir = sys.getCurrentDirectory();

        for (const file of files) {
            const filepath = getNormalizedAbsolutePath(file, currentDir);

            sys.write(`TSFILE: ${filepath}${sys.newLine}`);
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

    function reportDiagnosticSimply(diagnostic: Diagnostic, host: FormatDiagnosticsHost): void {
        sys.write(ts.formatDiagnostics([diagnostic], host));
    }

    function reportDiagnosticWithColorAndContext(diagnostic: Diagnostic, host: FormatDiagnosticsHost): void {
        sys.write(ts.formatDiagnosticsWithColorAndContext([diagnostic], host) + sys.newLine);
    }

    function reportWatchDiagnostic(diagnostic: Diagnostic) {
        let output = new Date().toLocaleTimeString() + " - ";

        if (diagnostic.file) {
            const loc = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
            output += `${ diagnostic.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `;
        }

        output += `${ flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine) }${ sys.newLine + sys.newLine + sys.newLine }`;

        sys.write(output);
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
        let configFileName: string;                                 // Configuration file name (if any)
        let cachedConfigFileText: string;                           // Cached configuration file text, used for reparsing (if any)
        let configFileWatcher: FileWatcher;                         // Configuration file watcher
        let directoryWatcher: FileWatcher;                          // Directory watcher to monitor source file addition/removal
        let cachedProgram: Program;                                 // Program cached from last compilation
        let rootFileNames: string[];                                // Root fileNames for compilation
        let compilerOptions: CompilerOptions;                       // Compiler options for compilation
        let compilerHost: CompilerHost;                             // Compiler host
        let hostGetSourceFile: typeof compilerHost.getSourceFile;   // getSourceFile method from default host
        let timerHandleForRecompilation: any;                    // Handle for 0.25s wait timer to trigger recompilation
        let timerHandleForDirectoryChanges: any;                 // Handle for 0.25s wait timer to trigger directory change handler

        // This map stores and reuses results of fileExists check that happen inside 'createProgram'
        // This allows to save time in module resolution heavy scenarios when existence of the same file might be checked multiple times.
        let cachedExistingFiles: Map<boolean>;
        let hostFileExists: typeof compilerHost.fileExists;

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
            reportDiagnostics(commandLine.errors, compilerHost);
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

        if (isWatchSet(commandLine.options)) {
            if (!sys.watchFile) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"), /* host */ undefined);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
            if (configFileName) {
                configFileWatcher = sys.watchFile(configFileName, configFileChanged);
            }
            if (sys.watchDirectory && configFileName) {
                const directory = ts.getDirectoryPath(configFileName);
                directoryWatcher = sys.watchDirectory(
                    // When the configFileName is just "tsconfig.json", the watched directory should be
                    // the current directory; if there is a given "project" parameter, then the configFileName
                    // is an absolute file name.
                    directory === "" ? "." : directory,
                    watchedDirectoryChanged, /*recursive*/ true);
            }
        }

        performCompilation();

        function parseConfigFile(): ParsedCommandLine {
            if (!cachedConfigFileText) {
                try {
                    cachedConfigFileText = sys.readFile(configFileName);
                }
                catch (e) {
                    const error = createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, configFileName, e.message);
                    reportWatchDiagnostic(error);
                    sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                    return;
                }
            }
            if (!cachedConfigFileText) {
                const error = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
                reportDiagnostics([error], /* compilerHost */ undefined);
                sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                return;
            }

            const result = parseJsonText(configFileName, cachedConfigFileText);
            reportDiagnostics(result.parseDiagnostics, /* compilerHost */ undefined);

            const cwd = sys.getCurrentDirectory();
            const configParseResult = parseJsonSourceFileConfigFileContent(result, sys, getNormalizedAbsolutePath(getDirectoryPath(configFileName), cwd), commandLine.options, getNormalizedAbsolutePath(configFileName, cwd));
            reportDiagnostics(configParseResult.errors, /* compilerHost */ undefined);

            if (isWatchSet(configParseResult.options)) {
                if (!sys.watchFile) {
                    reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"), /* host */ undefined);
                    sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                }

                if (!directoryWatcher && sys.watchDirectory && configFileName) {
                    const directory = ts.getDirectoryPath(configFileName);
                    directoryWatcher = sys.watchDirectory(
                        // When the configFileName is just "tsconfig.json", the watched directory should be
                        // the current directory; if there is a given "project" parameter, then the configFileName
                        // is an absolute file name.
                        directory === "" ? "." : directory,
                        watchedDirectoryChanged, /*recursive*/ true);
                }
            }
            return configParseResult;
        }

        // Invoked to perform initial compilation or re-compilation in watch mode
        function performCompilation() {

            if (!cachedProgram) {
                if (configFileName) {
                    const configParseResult = parseConfigFile();
                    rootFileNames = configParseResult.fileNames;
                    compilerOptions = configParseResult.options;
                }
                else {
                    rootFileNames = commandLine.fileNames;
                    compilerOptions = commandLine.options;
                }
                compilerHost = createCompilerHost(compilerOptions);
                hostGetSourceFile = compilerHost.getSourceFile;
                compilerHost.getSourceFile = getSourceFile;

                hostFileExists = compilerHost.fileExists;
                compilerHost.fileExists = cachedFileExists;
            }

            if (compilerOptions.pretty) {
                reportDiagnosticWorker = reportDiagnosticWithColorAndContext;
            }

            // reset the cache of existing files
            cachedExistingFiles = createMap<boolean>();

            const compileResult = compile(rootFileNames, compilerOptions, compilerHost);

            if (!isWatchSet(compilerOptions)) {
                return sys.exit(compileResult.exitStatus);
            }

            setCachedProgram(compileResult.program);
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes));

            const missingPaths = compileResult.program.getMissingFilePaths();
            missingPaths.forEach(path => {
                const fileWatcher = sys.watchFile(path, (_fileName, eventKind) => {
                    if (eventKind === FileWatcherEventKind.Created) {
                        fileWatcher.close();
                        startTimerForRecompilation();
                    }
                });
            });
        }

        function cachedFileExists(fileName: string): boolean {
            let fileExists = cachedExistingFiles.get(fileName);
            if (fileExists === undefined) {
                cachedExistingFiles.set(fileName, fileExists = hostFileExists(fileName));
            }
            return fileExists;
        }

        function getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void) {
            // Return existing SourceFile object if one is available
            if (cachedProgram) {
                const sourceFile = cachedProgram.getSourceFile(fileName);
                // A modified source file has no watcher and should not be reused
                if (sourceFile && sourceFile.fileWatcher) {
                    return sourceFile;
                }
            }
            // Use default host function
            const sourceFile = hostGetSourceFile(fileName, languageVersion, onError);
            if (sourceFile && isWatchSet(compilerOptions) && sys.watchFile) {
                // Attach a file watcher
                sourceFile.fileWatcher = sys.watchFile(sourceFile.fileName, (_fileName, eventKind) => sourceFileChanged(sourceFile, eventKind));
            }
            return sourceFile;
        }

        // Change cached program to the given program
        function setCachedProgram(program: Program) {
            if (cachedProgram) {
                const newSourceFiles = program ? program.getSourceFiles() : undefined;
                forEach(cachedProgram.getSourceFiles(), sourceFile => {
                    if (!(newSourceFiles && contains(newSourceFiles, sourceFile))) {
                        if (sourceFile.fileWatcher) {
                            sourceFile.fileWatcher.close();
                            sourceFile.fileWatcher = undefined;
                        }
                    }
                });
            }
            cachedProgram = program;
        }

        // If a source file changes, mark it as unwatched and start the recompilation timer
        function sourceFileChanged(sourceFile: SourceFile, eventKind: FileWatcherEventKind) {
            sourceFile.fileWatcher.close();
            sourceFile.fileWatcher = undefined;
            if (eventKind === FileWatcherEventKind.Deleted) {
                unorderedRemoveItem(rootFileNames, sourceFile.fileName);
            }
            startTimerForRecompilation();
        }

        // If the configuration file changes, forget cached program and start the recompilation timer
        function configFileChanged() {
            setCachedProgram(undefined);
            cachedConfigFileText = undefined;
            startTimerForRecompilation();
        }

        function watchedDirectoryChanged(fileName: string) {
            if (fileName && !ts.isSupportedSourceFileName(fileName, compilerOptions)) {
                return;
            }

            startTimerForHandlingDirectoryChanges();
        }

        function startTimerForHandlingDirectoryChanges() {
            if (!sys.setTimeout || !sys.clearTimeout) {
                return;
            }

            if (timerHandleForDirectoryChanges) {
                sys.clearTimeout(timerHandleForDirectoryChanges);
            }
            timerHandleForDirectoryChanges = sys.setTimeout(directoryChangeHandler, 250);
        }

        function directoryChangeHandler() {
            const parsedCommandLine = parseConfigFile();
            const newFileNames = ts.map(parsedCommandLine.fileNames, compilerHost.getCanonicalFileName);
            const canonicalRootFileNames = ts.map(rootFileNames, compilerHost.getCanonicalFileName);

            // We check if the project file list has changed. If so, we just throw away the old program and start fresh.
            if (!arrayIsEqualTo(newFileNames && newFileNames.sort(), canonicalRootFileNames && canonicalRootFileNames.sort())) {
                setCachedProgram(undefined);
                startTimerForRecompilation();
            }
        }

        // Upon detecting a file change, wait for 250ms and then perform a recompilation. This gives batch
        // operations (such as saving all modified files in an editor) a chance to complete before we kick
        // off a new compilation.
        function startTimerForRecompilation() {
            if (!sys.setTimeout || !sys.clearTimeout) {
                return;
            }

            if (timerHandleForRecompilation) {
                sys.clearTimeout(timerHandleForRecompilation);
            }
            timerHandleForRecompilation = sys.setTimeout(recompile, 250);
        }

        function recompile() {
            timerHandleForRecompilation = undefined;
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation));
            performCompilation();
        }
    }

    function compile(fileNames: string[], compilerOptions: CompilerOptions, compilerHost: CompilerHost) {
        const hasDiagnostics = compilerOptions.diagnostics || compilerOptions.extendedDiagnostics;
        let statistics: Statistic[];
        if (hasDiagnostics) {
            performance.enable();
            statistics = [];
        }

        const program = createProgram(fileNames, compilerOptions, compilerHost);
        const exitStatus = compileProgram();

        if (compilerOptions.listFiles) {
            forEach(program.getSourceFiles(), file => {
                sys.write(file.fileName + sys.newLine);
            });
        }

        if (hasDiagnostics) {
            const memoryUsed = sys.getMemoryUsage ? sys.getMemoryUsage() : -1;
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

            // Otherwise, emit and report any errors we ran into.
            const emitOutput = program.emit();
            diagnostics = diagnostics.concat(emitOutput.diagnostics);

            reportDiagnostics(sortAndDeduplicateDiagnostics(diagnostics), compilerHost);

            reportEmittedFiles(emitOutput.emittedFiles);

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
                sys.write(padRight(name + ":", nameSize + 2) + padLeft(value.toString(), valueSize) + sys.newLine);
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

ts.setStackTraceLimit();

if (ts.Debug.isDebugging) {
    ts.Debug.enableDebugInfo();
}

if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
    ts.sys.tryEnableSourceMapsForHost();
}

ts.executeCommandLine(ts.sys.args);
