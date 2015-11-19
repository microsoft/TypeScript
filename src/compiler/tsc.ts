/// <reference path="program.ts"/>
/// <reference path="commandLineParser.ts"/>

namespace ts {
    export interface SourceFile {
        fileWatcher?: FileWatcher;
    }

    let reportDiagnostic = reportDiagnosticSimply;

    function reportDiagnostics(diagnostics: Diagnostic[], host: CompilerHost): void {
        for (const diagnostic of diagnostics) {
            reportDiagnostic(diagnostic, host);
        }
    }

    /**
     * Checks to see if the locale is in the appropriate format,
     * and if it is, attempts to set the appropriate language.
     */
    function validateLocaleAndSetLanguage(locale: string, errors: Diagnostic[]): boolean {
        const matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(locale.toLowerCase());

        if (!matchResult) {
            errors.push(createCompilerDiagnostic(Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, "en", "ja-jp"));
            return false;
        }

        const language = matchResult[1];
        const territory = matchResult[3];

        // First try the entire locale, then fall back to just language if that's all we have.
        if (!trySetLanguageAndTerritory(language, territory, errors) &&
            !trySetLanguageAndTerritory(language, undefined, errors)) {

            errors.push(createCompilerDiagnostic(Diagnostics.Unsupported_locale_0, locale));
            return false;
        }

        return true;
    }

    function trySetLanguageAndTerritory(language: string, territory: string, errors: Diagnostic[]): boolean {
        const compilerFilePath = normalizePath(sys.getExecutingFilePath());
        const containingDirectoryPath = getDirectoryPath(compilerFilePath);

        let filePath = combinePaths(containingDirectoryPath, language);

        if (territory) {
            filePath = filePath + "-" + territory;
        }

        filePath = sys.resolvePath(combinePaths(filePath, "diagnosticMessages.generated.json"));

        if (!sys.fileExists(filePath)) {
            return false;
        }

        // TODO: Add codePage support for readFile?
        let fileContents = "";
        try {
            fileContents = sys.readFile(filePath);
        }
        catch (e) {
            errors.push(createCompilerDiagnostic(Diagnostics.Unable_to_open_file_0, filePath));
            return false;
        }
        try {
            ts.localizedDiagnosticMessages = JSON.parse(fileContents);
        }
        catch (e) {
            errors.push(createCompilerDiagnostic(Diagnostics.Corrupted_locale_file_0, filePath));
            return false;
        }

        return true;
    }

    function countLines(program: Program): number {
        let count = 0;
        forEach(program.getSourceFiles(), file => {
            count += getLineStarts(file).length;
        });
        return count;
    }

    function getDiagnosticText(message: DiagnosticMessage, ...args: any[]): string {
        const diagnostic = createCompilerDiagnostic.apply(undefined, arguments);
        return <string>diagnostic.messageText;
    }

    function getRelativeFileName(fileName: string, host: CompilerHost): string {
        return host ? convertToRelativePath(fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName)) : fileName;
    }

    function reportDiagnosticSimply(diagnostic: Diagnostic, host: CompilerHost): void {
        let output = "";

        if (diagnostic.file) {
            const { line, character } = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
            const relativeFileName = getRelativeFileName(diagnostic.file.fileName, host);
            output += `${ relativeFileName }(${ line + 1 },${ character + 1 }): `;
        }

        const category = DiagnosticCategory[diagnostic.category].toLowerCase();
        output += `${ category } TS${ diagnostic.code }: ${ flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine) }${ sys.newLine }`;

        sys.write(output);
    }


    const redForegroundEscapeSequence = "\u001b[91m";
    const yellowForegroundEscapeSequence = "\u001b[93m";
    const blueForegroundEscapeSequence = "\u001b[93m";
    const gutterStyleSequence = "\u001b[100;30m";
    const gutterSeparator = " ";
    const resetEscapeSequence = "\u001b[0m";
    const elipsis = "...";
    const categoryFormatMap: Map<string> = {
        [DiagnosticCategory.Warning]: yellowForegroundEscapeSequence,
        [DiagnosticCategory.Error]: redForegroundEscapeSequence,
        [DiagnosticCategory.Message]: blueForegroundEscapeSequence,
    };

    function formatAndReset(text: string, formatStyle: string) {
        return formatStyle + text + resetEscapeSequence;
    }

    function reportDiagnosticWithColorAndContext(diagnostic: Diagnostic, host: CompilerHost): void {
        let output = "";

        if (diagnostic.file) {
            const { start, length, file } = diagnostic;
            const { line: firstLine, character: firstLineChar } = getLineAndCharacterOfPosition(file, start);
            const { line: lastLine, character: lastLineChar } = getLineAndCharacterOfPosition(file, start + length);
            const lastLineInFile = getLineAndCharacterOfPosition(file, file.text.length).line;
            const relativeFileName = getRelativeFileName(file.fileName, host);

            const hasMoreThanFiveLines = (lastLine - firstLine) >= 4;
            let gutterWidth = (lastLine + 1 + "").length;
            if (hasMoreThanFiveLines) {
                gutterWidth = Math.max(elipsis.length, gutterWidth);
            }

            output += sys.newLine;
            for (let i = firstLine; i <= lastLine; i++) {
                // If the error spans over 5 lines, we'll only show the first 2 and last 2 lines,
                // so we'll skip ahead to the second-to-last line.
                if (hasMoreThanFiveLines && firstLine + 1 < i && i < lastLine - 1) {
                    output += formatAndReset(padLeft(elipsis, gutterWidth), gutterStyleSequence) + gutterSeparator + sys.newLine;
                    i = lastLine - 1;
                }

                const lineStart = getPositionOfLineAndCharacter(file, i, 0);
                const lineEnd = i < lastLineInFile ? getPositionOfLineAndCharacter(file, i + 1, 0) : file.text.length;
                let lineContent = file.text.slice(lineStart, lineEnd);
                lineContent = lineContent.replace(/\s+$/g, "");  // trim from end
                lineContent = lineContent.replace("\t", " ");    // convert tabs to single spaces

                // Output the gutter and the actual contents of the line.
                output += formatAndReset(padLeft(i + 1 + "", gutterWidth), gutterStyleSequence) + gutterSeparator;
                output += lineContent + sys.newLine;

                // Output the gutter and the error span for the line using tildes.
                output += formatAndReset(padLeft("", gutterWidth), gutterStyleSequence) + gutterSeparator;
                output += redForegroundEscapeSequence;
                if (i === firstLine) {
                    // If we're on the last line, then limit it to the last character of the last line.
                    // Otherwise, we'll just squiggle the rest of the line, giving 'slice' no end position.
                    const lastCharForLine = i === lastLine ? lastLineChar : undefined;

                    output += lineContent.slice(0, firstLineChar).replace(/\S/g, " ");
                    output += lineContent.slice(firstLineChar, lastCharForLine).replace(/./g, "~");
                }
                else if (i === lastLine) {
                    output += lineContent.slice(0, lastLineChar).replace(/./g, "~");
                }
                else {
                    // Squiggle the entire line.
                    output += lineContent.replace(/./g, "~");
                }
                output += resetEscapeSequence;

                output += sys.newLine;
            }

            output += sys.newLine;
            output += `${ relativeFileName }(${ firstLine + 1 },${ firstLineChar + 1 }): `;
        }

        const categoryColor = categoryFormatMap[diagnostic.category];
        const category = DiagnosticCategory[diagnostic.category].toLowerCase();
        output += `${ formatAndReset(category, categoryColor) } TS${ diagnostic.code }: ${ flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine) }`;
        output += sys.newLine + sys.newLine;

        sys.write(output);
    }

    function reportWatchDiagnostic(diagnostic: Diagnostic) {
        let output = new Date().toLocaleTimeString() + " - ";

        if (diagnostic.file) {
            const loc = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
            output += `${ diagnostic.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `;
        }

        output += `${ flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine) }${ sys.newLine }`;

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

    function reportStatisticalValue(name: string, value: string) {
        sys.write(padRight(name + ":", 12) + padLeft(value.toString(), 10) + sys.newLine);
    }

    function reportCountStatistic(name: string, count: number) {
        reportStatisticalValue(name, "" + count);
    }

    function reportTimeStatistic(name: string, time: number) {
        reportStatisticalValue(name, (time / 1000).toFixed(2) + "s");
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
        let timerHandleForRecompilation: number;                    // Handle for 0.25s wait timer to trigger recompilation
        let timerHandleForDirectoryChanges: number;                 // Handle for 0.25s wait timer to trigger directory change handler

        // This map stores and reuses results of fileExists check that happen inside 'createProgram'
        // This allows to save time in module resolution heavy scenarios when existence of the same file might be checked multiple times.
        let cachedExistingFiles: Map<boolean>;
        let hostFileExists: typeof compilerHost.fileExists;

        if (commandLine.options.locale) {
            if (!isJSONSupported()) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--locale"), /* compilerHost */ undefined);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
            validateLocaleAndSetLanguage(commandLine.options.locale, commandLine.errors);
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
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Version_0, ts.version), /* compilerHost */ undefined);
            return sys.exit(ExitStatus.Success);
        }

        if (commandLine.options.help) {
            printVersion();
            printHelp();
            return sys.exit(ExitStatus.Success);
        }

        if (commandLine.options.project) {
            if (!isJSONSupported()) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--project"), /* compilerHost */ undefined);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
            configFileName = normalizePath(combinePaths(commandLine.options.project, "tsconfig.json"));
            if (commandLine.fileNames.length !== 0) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line), /* compilerHost */ undefined);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
        }
        else if (commandLine.fileNames.length === 0 && isJSONSupported()) {
            const searchPath = normalizePath(sys.getCurrentDirectory());
            configFileName = findConfigFile(searchPath);
        }

        if (commandLine.fileNames.length === 0 && !configFileName) {
            printVersion();
            printHelp();
            return sys.exit(ExitStatus.Success);
        }

        // Firefox has Object.prototype.watch
        if (commandLine.options.watch && commandLine.options.hasOwnProperty("watch")) {
            if (!sys.watchFile) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"), /* compilerHost */ undefined);
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }
            if (configFileName) {
                configFileWatcher = sys.watchFile(configFileName, configFileChanged);
            }
            if (sys.watchDirectory && configFileName) {
                const directory = ts.getDirectoryPath(configFileName);
                directoryWatcher = sys.watchDirectory(
                    // When the configFileName is just "tsconfig.json", the watched directory should be 
                    // the current direcotry; if there is a given "project" parameter, then the configFileName
                    // is an absolute file name.
                    directory == "" ? "." : directory,
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

            const result = parseConfigFileTextToJson(configFileName, cachedConfigFileText);
            const configObject = result.config;
            if (!configObject) {
                reportDiagnostics([result.error], /* compilerHost */ undefined);
                sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                return;
            }
            const configParseResult = parseJsonConfigFileContent(configObject, sys, getNormalizedAbsolutePath(getDirectoryPath(configFileName), sys.getCurrentDirectory()));
            if (configParseResult.errors.length > 0) {
                reportDiagnostics(configParseResult.errors, /* compilerHost */ undefined);
                sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                return;
            }
            return configParseResult;
        }

        // Invoked to perform initial compilation or re-compilation in watch mode
        function performCompilation() {

            if (!cachedProgram) {
                if (configFileName) {
                    const configParseResult = parseConfigFile();
                    rootFileNames = configParseResult.fileNames;
                    compilerOptions = extend(commandLine.options, configParseResult.options);
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
                reportDiagnostic = reportDiagnosticWithColorAndContext;
            }

            // reset the cache of existing files
            cachedExistingFiles = {};

            const compileResult = compile(rootFileNames, compilerOptions, compilerHost);

            if (!compilerOptions.watch) {
                return sys.exit(compileResult.exitStatus);
            }

            setCachedProgram(compileResult.program);
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes));
        }

        function cachedFileExists(fileName: string): boolean {
            if (hasProperty(cachedExistingFiles, fileName)) {
                return cachedExistingFiles[fileName];
            }
            return cachedExistingFiles[fileName] = hostFileExists(fileName);
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
            if (sourceFile && compilerOptions.watch) {
                // Attach a file watcher
                sourceFile.fileWatcher = sys.watchFile(sourceFile.fileName, (fileName: string, removed?: boolean) => sourceFileChanged(sourceFile, removed));
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
        function sourceFileChanged(sourceFile: SourceFile, removed?: boolean) {
            sourceFile.fileWatcher.close();
            sourceFile.fileWatcher = undefined;
            if (removed) {
                const index = rootFileNames.indexOf(sourceFile.fileName);
                if (index >= 0) {
                    rootFileNames.splice(index, 1);
                }
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
            if (fileName && !ts.isSupportedSourceFileName(fileName)) {
                return;
            }

            startTimerForHandlingDirectoryChanges();
        }

        function startTimerForHandlingDirectoryChanges() {
            if (timerHandleForDirectoryChanges) {
                clearTimeout(timerHandleForDirectoryChanges);
            }
            timerHandleForDirectoryChanges = setTimeout(directoryChangeHandler, 250);
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
            if (timerHandleForRecompilation) {
                clearTimeout(timerHandleForRecompilation);
            }
            timerHandleForRecompilation = setTimeout(recompile, 250);
        }

        function recompile() {
            timerHandleForRecompilation = undefined;
            reportWatchDiagnostic(createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation));
            performCompilation();
        }
    }

    function compile(fileNames: string[], compilerOptions: CompilerOptions, compilerHost: CompilerHost) {
        ioReadTime = 0;
        ioWriteTime = 0;
        programTime = 0;
        bindTime = 0;
        checkTime = 0;
        emitTime = 0;

        const program = createProgram(fileNames, compilerOptions, compilerHost);
        const exitStatus = compileProgram();

        if (compilerOptions.listFiles) {
            forEach(program.getSourceFiles(), file => {
                sys.write(file.fileName + sys.newLine);
            });
        }

        if (compilerOptions.diagnostics) {
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

            // Individual component times.
            // Note: To match the behavior of previous versions of the compiler, the reported parse time includes
            // I/O read time and processing time for triple-slash references and module imports, and the reported
            // emit time includes I/O write time. We preserve this behavior so we can accurately compare times.
            reportTimeStatistic("I/O read", ioReadTime);
            reportTimeStatistic("I/O write", ioWriteTime);
            reportTimeStatistic("Parse time", programTime);
            reportTimeStatistic("Bind time", bindTime);
            reportTimeStatistic("Check time", checkTime);
            reportTimeStatistic("Emit time", emitTime);
            reportTimeStatistic("Total time", programTime + bindTime + checkTime + emitTime);
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

            reportDiagnostics(diagnostics, compilerHost);

            // If the user doesn't want us to emit, then we're done at this point.
            if (compilerOptions.noEmit) {
                return diagnostics.length
                    ? ExitStatus.DiagnosticsPresent_OutputsSkipped
                    : ExitStatus.Success;
            }

            // Otherwise, emit and report any errors we ran into.
            const emitOutput = program.emit();
            reportDiagnostics(emitOutput.diagnostics, compilerHost);

            // If the emitter didn't emit anything, then pass that value along.
            if (emitOutput.emitSkipped) {
                return ExitStatus.DiagnosticsPresent_OutputsSkipped;
            }

            // The emitter emitted something, inform the caller if that happened in the presence
            // of diagnostics or not.
            if (diagnostics.length > 0 || emitOutput.diagnostics.length > 0) {
                return ExitStatus.DiagnosticsPresent_OutputsGenerated;
            }

            return ExitStatus.Success;
        }
    }

    function printVersion() {
        sys.write(getDiagnosticText(Diagnostics.Version_0, ts.version) + sys.newLine);
    }

    function printHelp() {
        let output = "";

        // We want to align our "syntax" and "examples" commands to a certain margin.
        const syntaxLength = getDiagnosticText(Diagnostics.Syntax_Colon_0, "").length;
        const examplesLength = getDiagnosticText(Diagnostics.Examples_Colon_0, "").length;
        let marginLength = Math.max(syntaxLength, examplesLength);

        // Build up the syntactic skeleton.
        let syntax = makePadding(marginLength - syntaxLength);
        syntax += "tsc [" + getDiagnosticText(Diagnostics.options) + "] [" + getDiagnosticText(Diagnostics.file) + " ...]";

        output += getDiagnosticText(Diagnostics.Syntax_Colon_0, syntax);
        output += sys.newLine + sys.newLine;

        // Build up the list of examples.
        const padding = makePadding(marginLength);
        output += getDiagnosticText(Diagnostics.Examples_Colon_0, makePadding(marginLength - examplesLength) + "tsc hello.ts") + sys.newLine;
        output += padding + "tsc --out file.js file.ts" + sys.newLine;
        output += padding + "tsc @args.txt" + sys.newLine;
        output += sys.newLine;

        output += getDiagnosticText(Diagnostics.Options_Colon) + sys.newLine;

        // Sort our options by their names, (e.g. "--noImplicitAny" comes before "--watch")
        const optsList = filter(optionDeclarations.slice(), v => !v.experimental);
        optsList.sort((a, b) => compareValues<string>(a.name.toLowerCase(), b.name.toLowerCase()));

        // We want our descriptions to align at the same column in our output,
        // so we keep track of the longest option usage string.
        marginLength = 0;
        const usageColumn: string[] = []; // Things like "-d, --declaration" go in here.
        const descriptionColumn: string[] = [];

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
            descriptionColumn.push(getDiagnosticText(option.description));

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
            output += usage + makePadding(marginLength - usage.length + 2) + description + sys.newLine;
        }

        sys.write(output);
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
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.A_tsconfig_json_file_is_already_defined_at_Colon_0, file), /* compilerHost */ undefined);
        }
        else {
            const compilerOptions = extend(options, defaultInitCompilerOptions);
            const configurations: any = {
                compilerOptions: serializeCompilerOptions(compilerOptions),
                exclude: ["node_modules"]
            };

            if (fileNames && fileNames.length) {
                // only set the files property if we have at least one file
                configurations.files = fileNames;
            }

            sys.writeFile(file, JSON.stringify(configurations, undefined, 4));
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Successfully_created_a_tsconfig_json_file), /* compilerHost */ undefined);
        }

        return;

        function serializeCompilerOptions(options: CompilerOptions): Map<string | number | boolean> {
            const result: Map<string | number | boolean> = {};
            const optionsNameMap = getOptionNameMap().optionNameMap;

            for (const name in options) {
                if (hasProperty(options, name)) {
                    // tsconfig only options cannot be specified via command line,
                    // so we can assume that only types that can appear here string | number | boolean
                    const value = <string | number | boolean>options[name];
                    switch (name) {
                        case "init":
                        case "watch":
                        case "version":
                        case "help":
                        case "project":
                            break;
                        default:
                            let optionDefinition = optionsNameMap[name.toLowerCase()];
                            if (optionDefinition) {
                                if (typeof optionDefinition.type === "string") {
                                    // string, number or boolean
                                    result[name] = value;
                                }
                                else {
                                    // Enum
                                    const typeMap = <Map<number>>optionDefinition.type;
                                    for (const key in typeMap) {
                                        if (hasProperty(typeMap, key)) {
                                            if (typeMap[key] === value)
                                                result[name] = key;
                                        }
                                    }
                                }
                            }
                            break;
                    }
                }
            }
            return result;
        }
    }
}

ts.executeCommandLine(ts.sys.args);
