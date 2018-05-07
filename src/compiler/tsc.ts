namespace ts {
    interface Statistic {
        name: string;
        value: string;
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

    let reportDiagnostic = createDiagnosticReporter(sys);
    function updateReportDiagnostic(options: CompilerOptions) {
        if (shouldBePretty(options)) {
            reportDiagnostic = createDiagnosticReporter(sys, /*pretty*/ true);
        }
    }

    function shouldBePretty(options: CompilerOptions) {
        if (typeof options.pretty === "undefined") {
            return !!sys.writeOutputIsTTY && sys.writeOutputIsTTY();
        }
        return options.pretty;
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

    export function executeCommandLine(args: string[]): void {
        const commandLine = parseCommandLine(args);

        // Configuration file name (if any)
        let configFileName: string;
        if (commandLine.options.locale) {
            validateLocaleAndSetLanguage(commandLine.options.locale, sys, commandLine.errors);
        }

        // If there are any errors due to command line parsing and/or
        // setting up localization, report them and quit.
        if (commandLine.errors.length > 0) {
            commandLine.errors.forEach(reportDiagnostic);
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
            if (commandLine.fileNames.length !== 0) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line));
                return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            }

            const fileOrDirectory = normalizePath(commandLine.options.project);
            if (!fileOrDirectory /* current directory "." */ || sys.directoryExists(fileOrDirectory)) {
                configFileName = combinePaths(fileOrDirectory, "tsconfig.json");
                if (!sys.fileExists(configFileName)) {
                    reportDiagnostic(createCompilerDiagnostic(Diagnostics.Cannot_find_a_tsconfig_json_file_at_the_specified_directory_Colon_0, commandLine.options.project));
                    return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                }
            }
            else {
                configFileName = fileOrDirectory;
                if (!sys.fileExists(configFileName)) {
                    reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_specified_path_does_not_exist_Colon_0, commandLine.options.project));
                    return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                }
            }
        }
        else if (commandLine.fileNames.length === 0) {
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
            const configParseResult = parseConfigFileWithSystem(configFileName, commandLineOptions, sys, reportDiagnostic);
            updateReportDiagnostic(configParseResult.options);
            if (isWatchSet(configParseResult.options)) {
                reportWatchModeWithoutSysSupport();
                createWatchOfConfigFile(configParseResult, commandLineOptions);
            }
            else {
                performCompilation(configParseResult.fileNames, configParseResult.projectReferences, configParseResult.options, getConfigFileParsingDiagnostics(configParseResult));
            }
        }
        else {
            updateReportDiagnostic(commandLineOptions);
            if (isWatchSet(commandLineOptions)) {
                reportWatchModeWithoutSysSupport();
                createWatchOfFilesAndCompilerOptions(commandLine.fileNames, commandLineOptions);
            }
            else {
                performCompilation(commandLine.fileNames, /*references*/ undefined, commandLineOptions);
            }
        }
    }

    function reportWatchModeWithoutSysSupport() {
        if (!sys.watchFile || !sys.watchDirectory) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"));
            sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }
    }

    function performCompilation(rootNames: string[], projectReferences: ReadonlyArray<ProjectReference> | undefined, options: CompilerOptions, configFileParsingDiagnostics?: ReadonlyArray<Diagnostic>) {
        const host = createCompilerHost(options);
        enableStatistics(options);

        const programOptions: CreateProgramOptions = {
            rootNames,
            options,
            projectReferences,
            host,
            configFileParsingDiagnostics
        };
        const program = createProgram(programOptions);
        const exitStatus = emitFilesAndReportErrors(program, reportDiagnostic, s => sys.write(s + sys.newLine));
        reportStatistics(program);
        return sys.exit(exitStatus);
    }

    function updateWatchCompilationHost(watchCompilerHost: WatchCompilerHost<EmitAndSemanticDiagnosticsBuilderProgram>) {
        const compileUsingBuilder = watchCompilerHost.createProgram;
        watchCompilerHost.createProgram = (rootNames, options, host, oldProgram, configFileParsingDiagnostics) => {
            Debug.assert(rootNames !== undefined || (options === undefined && !!oldProgram));
            if (options !== undefined) {
                enableStatistics(options);
            }
            return compileUsingBuilder(rootNames, options, host, oldProgram, configFileParsingDiagnostics);
        };
        const emitFilesUsingBuilder = watchCompilerHost.afterProgramCreate;
        watchCompilerHost.afterProgramCreate = builderProgram => {
            emitFilesUsingBuilder(builderProgram);
            reportStatistics(builderProgram.getProgram());
        };
    }

    function createWatchStatusReporter(options: CompilerOptions) {
        return ts.createWatchStatusReporter(sys, shouldBePretty(options));
    }

    function createWatchOfConfigFile(configParseResult: ParsedCommandLine, optionsToExtend: CompilerOptions) {
        const watchCompilerHost = createWatchCompilerHostOfConfigFile(configParseResult.options.configFilePath, optionsToExtend, sys, /*createProgram*/ undefined, reportDiagnostic, createWatchStatusReporter(configParseResult.options));
        updateWatchCompilationHost(watchCompilerHost);
        watchCompilerHost.configFileParsingResult = configParseResult;
        createWatchProgram(watchCompilerHost);
    }

    function createWatchOfFilesAndCompilerOptions(rootFiles: string[], options: CompilerOptions) {
        const watchCompilerHost = createWatchCompilerHostOfFilesAndCompilerOptions(rootFiles, options, sys, /*createProgram*/ undefined, reportDiagnostic, createWatchStatusReporter(options));
        updateWatchCompilationHost(watchCompilerHost);
        createWatchProgram(watchCompilerHost);
    }

    function enableStatistics(compilerOptions: CompilerOptions) {
        if (compilerOptions.diagnostics || compilerOptions.extendedDiagnostics) {
            performance.enable();
        }
    }

    function reportStatistics(program: Program) {
        let statistics: Statistic[];
        const compilerOptions = program.getCompilerOptions();
        if (compilerOptions.diagnostics || compilerOptions.extendedDiagnostics) {
            statistics = [];
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
        sys.write(getDiagnosticText(Diagnostics.Version_0, version) + sys.newLine);
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
            sort(optionDeclarations, (a, b) => compareStringsCaseInsensitive(a.name, b.name)) :
            filter(optionDeclarations.slice(), v => v.showInSimplifiedHelpView);

        // We want our descriptions to align at the same column in our output,
        // so we keep track of the longest option usage string.
        marginLength = 0;
        const usageColumn: string[] = []; // Things like "-d, --declaration" go in here.
        const descriptionColumn: string[] = [];

        const optionsDescriptionMap = createMap<string[]>();  // Map between option.description and list of option.type if it is a kind

        for (const option of optsList) {
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
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.A_tsconfig_json_file_is_already_defined_at_Colon_0, file));
        }
        else {
            sys.writeFile(file, generateTSConfig(options, fileNames, sys.newLine));
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Successfully_created_a_tsconfig_json_file));
        }

        return;
    }
}

if (ts.Debug.isDebugging) {
    ts.Debug.enableDebugInfo();
}

if (ts.sys.tryEnableSourceMapsForHost && /^development$/i.test(ts.sys.getEnvironmentVariable("NODE_ENV"))) {
    ts.sys.tryEnableSourceMapsForHost();
}

if (ts.sys.setBlocking) {
    ts.sys.setBlocking();
}

ts.executeCommandLine(ts.sys.args);
