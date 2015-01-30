/// <reference path="program.ts"/>
/// <reference path="commandLineParser.ts"/>

module ts {
    var version = "1.5.0.0";

    export interface SourceFile {
        fileWatcher: FileWatcher;
    }

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

    function isJSONSupported() {
        return typeof JSON === "object" && typeof JSON.parse === "function";
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
        var configFilename: string;                 // Configuration file name (if any)
        var configFileWatcher: FileWatcher;         // Configuration file watcher
        var cachedProgram: Program;                 // Program cached from last compilation
        var rootFilenames: string[];                // Root filenames for compilation
        var compilerOptions: CompilerOptions;       // Compiler options for compilation
        var compilerHost: CompilerHost;             // Compiler host
        var hostGetSourceFile: typeof compilerHost.getSourceFile;  // getSourceFile method from default host
        var timerHandle: number;                    // Handle for 0.25s wait timer

        if (commandLine.options.locale) {
            if (!isJSONSupported()) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--locale"));
                return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
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
            if (!isJSONSupported()) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--project"));
                return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
            }
            configFilename = normalizePath(combinePaths(commandLine.options.project, "tsconfig.json"));
            if (commandLine.filenames.length !== 0) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line));
                return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
            }
        }
        else if (commandLine.filenames.length === 0 && isJSONSupported()) {
            configFilename = findConfigFile();
        }

        if (commandLine.filenames.length === 0 && !configFilename) {
            printVersion();
            printHelp();
            return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
        }

        if (commandLine.options.watch) {
            if (!sys.watchFile) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"));
                return sys.exit(EmitReturnStatus.CompilerOptionsErrors);
            }
            if (configFilename) {
                configFileWatcher = sys.watchFile(configFilename, configFileChanged);
            }
        }

        performCompilation();

        // Invoked to perform initial compilation or re-compilation in watch mode
        function performCompilation() {

            if (!cachedProgram) {
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

            var compileResult = compile(rootFilenames, compilerOptions, compilerHost);

            if (!commandLine.options.watch) {
                return sys.exit(compileResult.exitStatus);
            }

            setCachedProgram(compileResult.program);
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Compilation_complete_Watching_for_file_changes));
        }

        function getSourceFile(filename: string, languageVersion: ScriptTarget, onError ?: (message: string) => void) {
            // Return existing SourceFile object if one is available
            if (cachedProgram) {
                var sourceFile = cachedProgram.getSourceFile(filename);
                // A modified source file has no watcher and should not be reused
                if (sourceFile && sourceFile.fileWatcher) {
                    return sourceFile;
                }
            }
            // Use default host function
            var sourceFile = hostGetSourceFile(filename, languageVersion, onError);
            if (sourceFile && commandLine.options.watch) {
                // Attach a file watcher
                sourceFile.fileWatcher = sys.watchFile(sourceFile.filename, () => sourceFileChanged(sourceFile));
            }
            return sourceFile;
        }

        // Change cached program to the given program
        function setCachedProgram(program: Program) {
            if (cachedProgram) {
                var newSourceFiles = program ? program.getSourceFiles() : undefined;
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
        function sourceFileChanged(sourceFile: SourceFile) {
            sourceFile.fileWatcher = undefined;
            startTimer();
        }

        // If the configuration file changes, forget cached program and start the recompilation timer
        function configFileChanged() {
            setCachedProgram(undefined);
            startTimer();
        }

        // Upon detecting a file change, wait for 250ms and then perform a recompilation. This gives batch
        // operations (such as saving all modified files in an editor) a chance to complete before we kick
        // off a new compilation.
        function startTimer() {
            if (timerHandle) {
                clearTimeout(timerHandle);
            }
            timerHandle = setTimeout(recompile, 250);
        }

        function recompile() {
            timerHandle = undefined;
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
