/// <reference path="program.ts"/>
/// <reference path="commandLineParser.ts"/>

module ts {
    var version = "1.4.0.0";

    /**
     * Checks to see if the locale is in the appropriate format,
     * and if it is, attempts to set the appropriate language.
     */
    function validateLocaleAndSetLanguage(locale: string, errors: Diagnostic[]): boolean {
        var matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(locale.toLowerCase());

        if (!matchResult) {
            errors.push(createCompilerDiagnostic(Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, 'en', 'ja-jp'));
            return false;
        }

        var language = matchResult[1];
        var territory = matchResult[3];

        // First try the entire locale, then fall back to just language if that's all we have.
        if (!trySetLanguageAndTerritory(language, territory, errors) &&
            !trySetLanguageAndTerritory(language, undefined, errors)) {

            errors.push(createCompilerDiagnostic(Diagnostics.Unsupported_locale_0, locale));
            return false;
        }

        return true;
    }

    function trySetLanguageAndTerritory(language: string, territory: string, errors: Diagnostic[]): boolean {
        var compilerFilePath = normalizePath(sys.getExecutingFilePath());
        var containingDirectoryPath = getDirectoryPath(compilerFilePath);

        var filePath = combinePaths(containingDirectoryPath, language);

        if (territory) {
            filePath = filePath + "-" + territory;
        }

        filePath = sys.resolvePath(combinePaths(filePath, "diagnosticMessages.generated.json"));

        if (!sys.fileExists(filePath)) {
            return false;
        }

        // TODO: Add codePage support for readFile?
        try {
            var fileContents = sys.readFile(filePath);
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
        var count = 0;
        forEach(program.getSourceFiles(), file => {
            count += file.getLineAndCharacterFromPosition(file.end).line;
        });
        return count;
    }

    function getDiagnosticText(message: DiagnosticMessage, ...args: any[]): string {
        var diagnostic: Diagnostic = createCompilerDiagnostic.apply(undefined, arguments);
        return diagnostic.messageText;
    }

    function reportDiagnostic(diagnostic: Diagnostic) {
        var output = "";
        
        if (diagnostic.file) {
            var loc = diagnostic.file.getLineAndCharacterFromPosition(diagnostic.start);

            output += diagnostic.file.filename + "(" + loc.line + "," + loc.character + "): ";
        }

        var category = DiagnosticCategory[diagnostic.category].toLowerCase();
        output += category + " TS" + diagnostic.code + ": " + diagnostic.messageText + sys.newLine;

        sys.write(output);
    }

    function reportDiagnostics(diagnostics: Diagnostic[]) {
        for (var i = 0; i < diagnostics.length; i++) {
            reportDiagnostic(diagnostics[i]);
        }
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

    function findConfigFile(): string {
        var searchPath = normalizePath(sys.getCurrentDirectory());
        var filename = "tsconfig.json";
        while (true) {
            if (sys.fileExists(filename)) {
                return filename;
            }
            var parentPath = getDirectoryPath(searchPath);
            if (parentPath === searchPath) {
                break;
            }
            searchPath = parentPath;
            filename = "../" + filename;
        }
        return undefined;
    }

    export function executeCommandLine(args: string[]): void {
        var commandLine = parseCommandLine(args);
        var existingSourceFiles: SourceFile[];      // Reusable SourceFile objects from last compilation
        var existingFilesByName: Map<SourceFile>;   // SourceFile object lookup
        var configFilename: string;                 // Configuration file name (if any)
        var rootFilenames: string[];                // Root filenames for compilation
        var compilerOptions: CompilerOptions;       // Compiler options for compilation
        var compilerHost: CompilerHost;             // Compiler host
        var hostGetSourceFile: typeof compilerHost.getSourceFile;  // getSourceFile method from default host
        var fileWatchers: FileWatcher[];            // Active file watchers
        var changedFiles: Map<boolean>;             // Map of files for which change notification was received
        var timerStarted: boolean;                  // Flag for 0.25s timer

        if (commandLine.options.locale) {
            if (typeof JSON === "undefined") {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--locale"));
                return sys.exit(1);
            }
            validateLocaleAndSetLanguage(commandLine.options.locale, commandLine.errors);
        }

        // If there are any errors due to command line parsing and/or
        // setting up localization, report them and quit.
        if (commandLine.errors.length > 0) {
            reportDiagnostics(commandLine.errors);
            return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
        }

        if (commandLine.options.version) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Version_0, version));
            return sys.exit(EmitReturnStatus.Succeeded);
        }

        if (commandLine.options.help) {
            printVersion();
            printHelp();
            return sys.exit(EmitReturnStatus.Succeeded);
        }

        if (commandLine.options.project) {
            configFilename = normalizePath(combinePaths(commandLine.options.project, "tsconfig.json"));
            if (commandLine.filenames.length !== 0) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line));
                return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
            }
        }
        else if (commandLine.filenames.length === 0) {
            configFilename = findConfigFile();
        }

        if (commandLine.filenames.length === 0 && !configFilename) {
            printVersion();
            printHelp();
            return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
        }

        if (commandLine.options.watch && !sys.watchFile) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"));
            return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
        }

        performCompilation();

        // Invoked to perform initial compilation or re-compilation in watch mode
        function performCompilation() {

            if (!existingSourceFiles) {
                if (configFilename) {
                    var configObject = readConfigFile(configFilename);
                    if (!configObject) {
                        reportDiagnostic(createCompilerDiagnostic(Diagnostics.Unable_to_open_file_0, configFilename));
                        return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
                    }
                    var configParseResult = parseConfigFile(configObject, getDirectoryPath(configFilename));
                    if (configParseResult.errors.length > 0) {
                        reportDiagnostics(configParseResult.errors);
                        return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
                    }
                    rootFilenames = configParseResult.filenames;
                    compilerOptions = extend(commandLine.options, configParseResult.options);
                }
                else {
                    rootFilenames = commandLine.filenames;
                    compilerOptions = commandLine.options;
                }
                compilerHost = createCompilerHost(compilerOptions);
                hostGetSourceFile = compilerHost.getSourceFile;
                compilerHost.getSourceFile = getSourceFile;
            }
            else {
                // We have reusable SourceFile objects from the previous compilation
                existingFilesByName = arrayToMap(existingSourceFiles, f => compilerHost.getCanonicalFileName(f.filename));
            }

            var compileResult = compile(rootFilenames, compilerOptions, compilerHost);

            if (!commandLine.options.watch) {
                return sys.exit(compileResult.exitStatus);
            }

            existingSourceFiles = compileResult.program.getSourceFiles();
            existingFilesByName = undefined;
            fileWatchers = map(existingSourceFiles, f => sys.watchFile(f.filename, sourceFileChanged));
            if (configFilename) {
                fileWatchers.push(sys.watchFile(configFilename, configFileChanged));
            }
            changedFiles = {};
            timerStarted = false;

            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes));
        }

        function getSourceFile(filename: string, languageVersion: ScriptTarget, onError ?: (message: string) => void) {
            // Return existing SourceFile object if one is available
            if (existingFilesByName) {
                var canonicalName = compilerHost.getCanonicalFileName(filename);
                if (hasProperty(existingFilesByName, canonicalName)) {
                    return existingFilesByName[canonicalName];
                }
            }
            // Use default host function
            return hostGetSourceFile(filename, languageVersion, onError);
        }

        function sourceFileChanged(filename: string) {
            startTimer();
            changedFiles[filename] = true;
        }

        function configFileChanged(filename: string) {
            startTimer();
            existingSourceFiles = undefined;
        }

        // Upon detecting a file change, queue up file modification events for the next 250ms and then
        // perform a recompilation. The reasoning is that in some cases an editor can save all files at once,
        // and we'd like to just perform a single recompilation.
        function startTimer() {
            if (!timerStarted) {
                timerStarted = true;
                setTimeout(recompile, 250);
            }
        }

        function recompile() {
            forEach(fileWatchers, watcher => {
                watcher.close();
            });
            if (existingSourceFiles) {
                existingSourceFiles = filter(existingSourceFiles, f => !hasProperty(changedFiles, f.filename));
            }
            fileWatchers = undefined;
            changedFiles = undefined;
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation));
            performCompilation();
        }
    }

    function compile(filenames: string[], compilerOptions: CompilerOptions, compilerHost: CompilerHost) {
        var parseStart = new Date().getTime();
        var program = createProgram(filenames, compilerOptions, compilerHost);

        var bindStart = new Date().getTime();
        var errors: Diagnostic[] = program.getDiagnostics();
        var exitStatus: EmitReturnStatus;

        if (errors.length) {
            var checkStart = bindStart;
            var emitStart = bindStart;
            var reportStart = bindStart;
            exitStatus = EmitReturnStatus.AllOutputGenerationSkipped;
        }
        else {
            var checker = program.getTypeChecker(/*fullTypeCheckMode*/ true);
            var checkStart = new Date().getTime();
            errors = checker.getDiagnostics();
            if (program.isEmitBlocked()) {
                exitStatus = EmitReturnStatus.AllOutputGenerationSkipped;
            }
            else if (compilerOptions.noEmit) {
                exitStatus = EmitReturnStatus.Succeeded;
            }
            else {
                var emitStart = new Date().getTime();
                var emitOutput = program.emitFiles();
                var emitErrors = emitOutput.diagnostics;
                exitStatus = emitOutput.emitResultStatus;
                var reportStart = new Date().getTime();
                errors = concatenate(errors, emitErrors);
            }
        }

        reportDiagnostics(errors);

        if (compilerOptions.listFiles) {
            forEach(program.getSourceFiles(), file => {
                sys.write(file.filename + sys.newLine);
            });
        }

        if (compilerOptions.diagnostics) {
            var memoryUsed = sys.getMemoryUsage ? sys.getMemoryUsage() : -1;
            reportCountStatistic("Files", program.getSourceFiles().length);
            reportCountStatistic("Lines", countLines(program));
            reportCountStatistic("Nodes", checker ? checker.getNodeCount() : 0);
            reportCountStatistic("Identifiers", checker ? checker.getIdentifierCount() : 0);
            reportCountStatistic("Symbols", checker ? checker.getSymbolCount() : 0);
            reportCountStatistic("Types", checker ? checker.getTypeCount() : 0);
            if (memoryUsed >= 0) {
                reportStatisticalValue("Memory used", Math.round(memoryUsed / 1000) + "K");
            }
            reportTimeStatistic("Parse time", bindStart - parseStart);
            reportTimeStatistic("Bind time", checkStart - bindStart);
            reportTimeStatistic("Check time", emitStart - checkStart);
            reportTimeStatistic("Emit time", reportStart - emitStart);
            reportTimeStatistic("Total time", reportStart - parseStart);
        }

        return { program, exitStatus };
    }

    function printVersion() {
        sys.write(getDiagnosticText(Diagnostics.Version_0, version) + sys.newLine);
    }

    function printHelp() {
        var output = "";

        // We want to align our "syntax" and "examples" commands to a certain margin.
        var syntaxLength = getDiagnosticText(Diagnostics.Syntax_Colon_0, "").length;
        var examplesLength = getDiagnosticText(Diagnostics.Examples_Colon_0, "").length;
        var marginLength = Math.max(syntaxLength, examplesLength);

        // Build up the syntactic skeleton.
        var syntax = makePadding(marginLength - syntaxLength);
        syntax += "tsc [" + getDiagnosticText(Diagnostics.options) + "] [" + getDiagnosticText(Diagnostics.file) + " ...]";

        output += getDiagnosticText(Diagnostics.Syntax_Colon_0, syntax);
        output += sys.newLine + sys.newLine;

        // Build up the list of examples.
        var padding = makePadding(marginLength);
        output += getDiagnosticText(Diagnostics.Examples_Colon_0, makePadding(marginLength - examplesLength) + "tsc hello.ts") + sys.newLine;
        output += padding + "tsc --out file.js file.ts" + sys.newLine;
        output += padding + "tsc @args.txt" + sys.newLine;
        output += sys.newLine;

        output += getDiagnosticText(Diagnostics.Options_Colon) + sys.newLine;

        // Sort our options by their names, (e.g. "--noImplicitAny" comes before "--watch")
        var optsList = optionDeclarations.slice();
        optsList.sort((a, b) => compareValues<string>(a.name.toLowerCase(), b.name.toLowerCase()));

        // We want our descriptions to align at the same column in our output,
        // so we keep track of the longest option usage string.
        var marginLength = 0;
        var usageColumn: string[] = []; // Things like "-d, --declaration" go in here.
        var descriptionColumn: string[] = [];

        for (var i = 0; i < optsList.length; i++) {
            var option = optsList[i];

            // If an option lacks a description,
            // it is not officially supported.
            if (!option.description) {
                continue;
            }

            var usageText = " ";
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
        var usageText = " @<" + getDiagnosticText(Diagnostics.file) + ">";
        usageColumn.push(usageText);
        descriptionColumn.push(getDiagnosticText(Diagnostics.Insert_command_line_options_and_files_from_a_file));
        marginLength = Math.max(usageText.length, marginLength);

        // Print out each row, aligning all the descriptions on the same column.
        for (var i = 0; i < usageColumn.length; i++) {
            var usage = usageColumn[i];
            var description = descriptionColumn[i];
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
}

ts.executeCommandLine(ts.sys.args);
