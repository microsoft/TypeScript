namespace ts {
    interface Statistic {
        name: string;
        value: string;
    }

    function countLines(program: Program): Map<number> {
        const counts = getCountsMap();
        forEach(program.getSourceFiles(), file => {
            const key = getCountKey(program, file);
            const lineCount = getLineStarts(file).length;
            counts.set(key, counts.get(key)! + lineCount);
        });
        return counts;
    }

    function countNodes(program: Program): Map<number> {
        const counts = getCountsMap();
        forEach(program.getSourceFiles(), file => {
            const key = getCountKey(program, file);
            counts.set(key, counts.get(key)! + file.nodeCount);
        });
        return counts;
    }

    function getCountsMap() {
        const counts = createMap<number>();
        counts.set("Library", 0);
        counts.set("Definitions", 0);
        counts.set("TypeScript", 0);
        counts.set("JavaScript", 0);
        counts.set("JSON", 0);
        counts.set("Other", 0);
        return counts;
    }

    function getCountKey(program: Program, file: SourceFile) {
        if (program.isSourceFileDefaultLibrary(file)) {
            return "Library";
        }
        else if (file.isDeclarationFile) {
            return "Definitions";
        }

        const path = file.path;
        if (fileExtensionIsOneOf(path, supportedTSExtensions)) {
            return "TypeScript";
        }
        else if (fileExtensionIsOneOf(path, supportedJSExtensions)) {
            return "JavaScript";
        }
        else if (fileExtensionIs(path, Extension.Json)) {
            return "JSON";
        }
        else {
            return "Other";
        }
    }

    function updateReportDiagnostic(
        sys: System,
        existing: DiagnosticReporter,
        options: CompilerOptions | BuildOptions
    ): DiagnosticReporter {
        return shouldBePretty(sys, options) ?
            createDiagnosticReporter(sys, /*pretty*/ true) :
            existing;
    }

    function defaultIsPretty(sys: System) {
        return !!sys.writeOutputIsTTY && sys.writeOutputIsTTY();
    }

    function shouldBePretty(sys: System, options: CompilerOptions | BuildOptions) {
        if (!options || typeof options.pretty === "undefined") {
            return defaultIsPretty(sys);
        }
        return options.pretty;
    }

    function getOptionsForHelp(commandLine: ParsedCommandLine) {
        // Sort our options by their names, (e.g. "--noImplicitAny" comes before "--watch")
        return !!commandLine.options.all ?
            sort(optionDeclarations, (a, b) => compareStringsCaseInsensitive(a.name, b.name)) :
            filter(optionDeclarations.slice(), v => !!v.showInSimplifiedHelpView);
    }

    function printVersion(sys: System) {
        sys.write(getDiagnosticText(Diagnostics.Version_0, version) + sys.newLine);
    }

    function printHelp(sys: System, optionsList: readonly CommandLineOption[], syntaxPrefix = "") {
        const output: string[] = [];

        // We want to align our "syntax" and "examples" commands to a certain margin.
        const syntaxLength = getDiagnosticText(Diagnostics.Syntax_Colon_0, "").length;
        const examplesLength = getDiagnosticText(Diagnostics.Examples_Colon_0, "").length;
        let marginLength = Math.max(syntaxLength, examplesLength);

        // Build up the syntactic skeleton.
        let syntax = makePadding(marginLength - syntaxLength);
        syntax += `tsc ${syntaxPrefix}[${getDiagnosticText(Diagnostics.options)}] [${getDiagnosticText(Diagnostics.file)}...]`;

        output.push(getDiagnosticText(Diagnostics.Syntax_Colon_0, syntax));
        output.push(sys.newLine + sys.newLine);

        // Build up the list of examples.
        const padding = makePadding(marginLength);
        output.push(getDiagnosticText(Diagnostics.Examples_Colon_0, makePadding(marginLength - examplesLength) + "tsc hello.ts") + sys.newLine);
        output.push(padding + "tsc --outFile file.js file.ts" + sys.newLine);
        output.push(padding + "tsc @args.txt" + sys.newLine);
        output.push(padding + "tsc --build tsconfig.json" + sys.newLine);
        output.push(sys.newLine);

        output.push(getDiagnosticText(Diagnostics.Options_Colon) + sys.newLine);

        // We want our descriptions to align at the same column in our output,
        // so we keep track of the longest option usage string.
        marginLength = 0;
        const usageColumn: string[] = []; // Things like "-d, --declaration" go in here.
        const descriptionColumn: string[] = [];

        const optionsDescriptionMap = new Map<string, string[]>();  // Map between option.description and list of option.type if it is a kind

        for (const option of optionsList) {
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
                const typeMap = <ESMap<string, number | string>>element.type;
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

    function executeCommandLineWorker(
        sys: System,
        cb: ExecuteCommandLineCallbacks,
        commandLine: ParsedCommandLine,
    ) {
        let reportDiagnostic = createDiagnosticReporter(sys);
        if (commandLine.options.build) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_build_must_be_the_first_command_line_argument));
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        // Configuration file name (if any)
        let configFileName: string | undefined;
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
            writeConfigFile(sys, reportDiagnostic, commandLine.options, commandLine.fileNames);
            return sys.exit(ExitStatus.Success);
        }

        if (commandLine.options.version) {
            printVersion(sys);
            return sys.exit(ExitStatus.Success);
        }

        if (commandLine.options.help || commandLine.options.all) {
            printVersion(sys);
            printHelp(sys, getOptionsForHelp(commandLine));
            return sys.exit(ExitStatus.Success);
        }

        if (commandLine.options.watch && commandLine.options.listFilesOnly) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "watch", "listFilesOnly"));
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
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
            configFileName = findConfigFile(searchPath, fileName => sys.fileExists(fileName));
        }

        if (commandLine.fileNames.length === 0 && !configFileName) {
            if (commandLine.options.showConfig) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0, normalizePath(sys.getCurrentDirectory())));
            }
            else {
                printVersion(sys);
                printHelp(sys, getOptionsForHelp(commandLine));
            }
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        const currentDirectory = sys.getCurrentDirectory();
        const commandLineOptions = convertToOptionsWithAbsolutePaths(
            commandLine.options,
            fileName => getNormalizedAbsolutePath(fileName, currentDirectory)
        );
        if (configFileName) {
            const configParseResult = parseConfigFileWithSystem(configFileName, commandLineOptions, commandLine.watchOptions, sys, reportDiagnostic)!; // TODO: GH#18217
            if (commandLineOptions.showConfig) {
                if (configParseResult.errors.length !== 0) {
                    reportDiagnostic = updateReportDiagnostic(
                        sys,
                        reportDiagnostic,
                        configParseResult.options
                    );
                    configParseResult.errors.forEach(reportDiagnostic);
                    return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
                }
                // eslint-disable-next-line no-null/no-null
                sys.write(JSON.stringify(convertToTSConfig(configParseResult, configFileName, sys), null, 4) + sys.newLine);
                return sys.exit(ExitStatus.Success);
            }
            reportDiagnostic = updateReportDiagnostic(
                sys,
                reportDiagnostic,
                configParseResult.options
            );
            if (isWatchSet(configParseResult.options)) {
                if (reportWatchModeWithoutSysSupport(sys, reportDiagnostic)) return;
                return createWatchOfConfigFile(
                    sys,
                    cb,
                    reportDiagnostic,
                    configParseResult,
                    commandLineOptions,
                    commandLine.watchOptions,
                );
            }
            else if (isIncrementalCompilation(configParseResult.options)) {
                performIncrementalCompilation(
                    sys,
                    cb,
                    reportDiagnostic,
                    configParseResult
                );
            }
            else {
                performCompilation(
                    sys,
                    cb,
                    reportDiagnostic,
                    configParseResult
                );
            }
        }
        else {
            if (commandLineOptions.showConfig) {
                // eslint-disable-next-line no-null/no-null
                sys.write(JSON.stringify(convertToTSConfig(commandLine, combinePaths(currentDirectory, "tsconfig.json"), sys), null, 4) + sys.newLine);
                return sys.exit(ExitStatus.Success);
            }
            reportDiagnostic = updateReportDiagnostic(
                sys,
                reportDiagnostic,
                commandLineOptions
            );
            if (isWatchSet(commandLineOptions)) {
                if (reportWatchModeWithoutSysSupport(sys, reportDiagnostic)) return;
                return createWatchOfFilesAndCompilerOptions(
                    sys,
                    cb,
                    reportDiagnostic,
                    commandLine.fileNames,
                    commandLineOptions,
                    commandLine.watchOptions,
                );
            }
            else if (isIncrementalCompilation(commandLineOptions)) {
                performIncrementalCompilation(
                    sys,
                    cb,
                    reportDiagnostic,
                    { ...commandLine, options: commandLineOptions }
                );
            }
            else {
                performCompilation(
                    sys,
                    cb,
                    reportDiagnostic,
                    { ...commandLine, options: commandLineOptions }
                );
            }
        }
    }

    export function isBuild(commandLineArgs: readonly string[]) {
        if (commandLineArgs.length > 0 && commandLineArgs[0].charCodeAt(0) === CharacterCodes.minus) {
            const firstOption = commandLineArgs[0].slice(commandLineArgs[0].charCodeAt(1) === CharacterCodes.minus ? 2 : 1).toLowerCase();
            return firstOption === "build" || firstOption === "b";
        }
        return false;
    }

    export type ExecuteCommandLineCallbacks = (program: Program | EmitAndSemanticDiagnosticsBuilderProgram | ParsedCommandLine) => void;
    export function executeCommandLine(
        system: System,
        cb: ExecuteCommandLineCallbacks,
        commandLineArgs: readonly string[],
    ) {
        if (isBuild(commandLineArgs)) {
            const { buildOptions, watchOptions, projects, errors } = parseBuildCommand(commandLineArgs.slice(1));
            if (buildOptions.generateCpuProfile && system.enableCPUProfiler) {
                system.enableCPUProfiler(buildOptions.generateCpuProfile, () => performBuild(
                    system,
                    cb,
                    buildOptions,
                    watchOptions,
                    projects,
                    errors
                ));
            }
            else {
                return performBuild(
                    system,
                    cb,
                    buildOptions,
                    watchOptions,
                    projects,
                    errors
                );
            }
        }

        const commandLine = parseCommandLine(commandLineArgs, path => system.readFile(path));
        if (commandLine.options.generateCpuProfile && system.enableCPUProfiler) {
            system.enableCPUProfiler(commandLine.options.generateCpuProfile, () => executeCommandLineWorker(
                system,
                cb,
                commandLine,
            ));
        }
        else {
            return executeCommandLineWorker(system, cb, commandLine);
        }
    }

    function reportWatchModeWithoutSysSupport(sys: System, reportDiagnostic: DiagnosticReporter) {
        if (!sys.watchFile || !sys.watchDirectory) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--watch"));
            sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
            return true;
        }
        return false;
    }

    function performBuild(
        sys: System,
        cb: ExecuteCommandLineCallbacks,
        buildOptions: BuildOptions,
        watchOptions: WatchOptions | undefined,
        projects: string[],
        errors: Diagnostic[]
    ) {
        // Update to pretty if host supports it
        const reportDiagnostic = updateReportDiagnostic(
            sys,
            createDiagnosticReporter(sys),
            buildOptions
        );

        if (buildOptions.locale) {
            validateLocaleAndSetLanguage(buildOptions.locale, sys, errors);
        }

        if (errors.length > 0) {
            errors.forEach(reportDiagnostic);
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        if (buildOptions.help) {
            printVersion(sys);
            printHelp(sys, buildOpts, "--build ");
            return sys.exit(ExitStatus.Success);
        }

        if (projects.length === 0) {
            printVersion(sys);
            printHelp(sys, buildOpts, "--build ");
            return sys.exit(ExitStatus.Success);
        }

        if (!sys.getModifiedTime || !sys.setModifiedTime || (buildOptions.clean && !sys.deleteFile)) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.The_current_host_does_not_support_the_0_option, "--build"));
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        if (buildOptions.watch) {
            if (reportWatchModeWithoutSysSupport(sys, reportDiagnostic)) return;
            const buildHost = createSolutionBuilderWithWatchHost(
                sys,
                /*createProgram*/ undefined,
                reportDiagnostic,
                createBuilderStatusReporter(sys, shouldBePretty(sys, buildOptions)),
                createWatchStatusReporter(sys, buildOptions)
            );
            updateSolutionBuilderHost(sys, cb, buildHost);
            const builder = createSolutionBuilderWithWatch(buildHost, projects, buildOptions, watchOptions);
            builder.build();
            return builder;
        }

        const buildHost = createSolutionBuilderHost(
            sys,
            /*createProgram*/ undefined,
            reportDiagnostic,
            createBuilderStatusReporter(sys, shouldBePretty(sys, buildOptions)),
            createReportErrorSummary(sys, buildOptions)
        );
        updateSolutionBuilderHost(sys, cb, buildHost);
        const builder = createSolutionBuilder(buildHost, projects, buildOptions);
        const exitStatus = buildOptions.clean ? builder.clean() : builder.build();
        tracing.dumpLegend();
        return sys.exit(exitStatus);
    }

    function createReportErrorSummary(sys: System, options: CompilerOptions | BuildOptions): ReportEmitErrorSummary | undefined {
        return shouldBePretty(sys, options) ?
            errorCount => sys.write(getErrorSummaryText(errorCount, sys.newLine)) :
            undefined;
    }

    function performCompilation(
        sys: System,
        cb: ExecuteCommandLineCallbacks,
        reportDiagnostic: DiagnosticReporter,
        config: ParsedCommandLine
    ) {
        const { fileNames, options, projectReferences } = config;
        const host = createCompilerHostWorker(options, /*setParentPos*/ undefined, sys);
        const currentDirectory = host.getCurrentDirectory();
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
        changeCompilerHostLikeToUseCache(host, fileName => toPath(fileName, currentDirectory, getCanonicalFileName));
        enableStatisticsAndTracing(sys, options, /*isBuildMode*/ false);

        const programOptions: CreateProgramOptions = {
            rootNames: fileNames,
            options,
            projectReferences,
            host,
            configFileParsingDiagnostics: getConfigFileParsingDiagnostics(config)
        };
        const program = createProgram(programOptions);
        const exitStatus = emitFilesAndReportErrorsAndGetExitStatus(
            program,
            reportDiagnostic,
            s => sys.write(s + sys.newLine),
            createReportErrorSummary(sys, options)
        );
        reportStatistics(sys, program);
        cb(program);
        return sys.exit(exitStatus);
    }

    function performIncrementalCompilation(
        sys: System,
        cb: ExecuteCommandLineCallbacks,
        reportDiagnostic: DiagnosticReporter,
        config: ParsedCommandLine
    ) {
        const { options, fileNames, projectReferences } = config;
        enableStatisticsAndTracing(sys, options, /*isBuildMode*/ false);
        const host = createIncrementalCompilerHost(options, sys);
        const exitStatus = ts.performIncrementalCompilation({
            host,
            system: sys,
            rootNames: fileNames,
            options,
            configFileParsingDiagnostics: getConfigFileParsingDiagnostics(config),
            projectReferences,
            reportDiagnostic,
            reportErrorSummary: createReportErrorSummary(sys, options),
            afterProgramEmitAndDiagnostics: builderProgram => {
                reportStatistics(sys, builderProgram.getProgram());
                cb(builderProgram);
            }
        });
        return sys.exit(exitStatus);
    }

    function updateSolutionBuilderHost(
        sys: System,
        cb: ExecuteCommandLineCallbacks,
        buildHost: SolutionBuilderHostBase<EmitAndSemanticDiagnosticsBuilderProgram>
    ) {
        updateCreateProgram(sys, buildHost);
        buildHost.afterProgramEmitAndDiagnostics = program => {
            reportStatistics(sys, program.getProgram());
            cb(program);
        };
        buildHost.afterEmitBundle = cb;
    }

    function updateCreateProgram<T extends BuilderProgram>(sys: System, host: { createProgram: CreateProgram<T>; }) {
        const compileUsingBuilder = host.createProgram;
        host.createProgram = (rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences) => {
            Debug.assert(rootNames !== undefined || (options === undefined && !!oldProgram));
            if (options !== undefined) {
                enableStatisticsAndTracing(sys, options, /*isBuildMode*/ true);
            }
            return compileUsingBuilder(rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences);
        };
    }

    function updateWatchCompilationHost(
        sys: System,
        cb: ExecuteCommandLineCallbacks,
        watchCompilerHost: WatchCompilerHost<EmitAndSemanticDiagnosticsBuilderProgram>,
    ) {
        updateCreateProgram(sys, watchCompilerHost);
        const emitFilesUsingBuilder = watchCompilerHost.afterProgramCreate!; // TODO: GH#18217
        watchCompilerHost.afterProgramCreate = builderProgram => {
            emitFilesUsingBuilder(builderProgram);
            reportStatistics(sys, builderProgram.getProgram());
            cb(builderProgram);
        };
    }

    function createWatchStatusReporter(sys: System, options: CompilerOptions | BuildOptions) {
        return ts.createWatchStatusReporter(sys, shouldBePretty(sys, options));
    }

    function createWatchOfConfigFile(
        system: System,
        cb: ExecuteCommandLineCallbacks,
        reportDiagnostic: DiagnosticReporter,
        configParseResult: ParsedCommandLine,
        optionsToExtend: CompilerOptions,
        watchOptionsToExtend: WatchOptions | undefined,
    ) {
        const watchCompilerHost = createWatchCompilerHostOfConfigFile({
            configFileName: configParseResult.options.configFilePath!,
            optionsToExtend,
            watchOptionsToExtend,
            system,
            reportDiagnostic,
            reportWatchStatus: createWatchStatusReporter(system, configParseResult.options)
        });
        updateWatchCompilationHost(system, cb, watchCompilerHost);
        watchCompilerHost.configFileParsingResult = configParseResult;
        return createWatchProgram(watchCompilerHost);
    }

    function createWatchOfFilesAndCompilerOptions(
        system: System,
        cb: ExecuteCommandLineCallbacks,
        reportDiagnostic: DiagnosticReporter,
        rootFiles: string[],
        options: CompilerOptions,
        watchOptions: WatchOptions | undefined,
    ) {
        const watchCompilerHost = createWatchCompilerHostOfFilesAndCompilerOptions({
            rootFiles,
            options,
            watchOptions,
            system,
            reportDiagnostic,
            reportWatchStatus: createWatchStatusReporter(system, options)
        });
        updateWatchCompilationHost(system, cb, watchCompilerHost);
        return createWatchProgram(watchCompilerHost);
    }

    function canReportDiagnostics(system: System, compilerOptions: CompilerOptions) {
        return system === sys && (compilerOptions.diagnostics || compilerOptions.extendedDiagnostics);
    }

    function canTrace(system: System, compilerOptions: CompilerOptions) {
        return system === sys && compilerOptions.generateTrace;
    }

    function enableStatisticsAndTracing(system: System, compilerOptions: CompilerOptions, isBuildMode: boolean) {
        if (canReportDiagnostics(system, compilerOptions)) {
            performance.enable();
        }

        if (canTrace(system, compilerOptions)) {
            tracing.startTracing(isBuildMode ? tracing.Mode.Build : tracing.Mode.Project, compilerOptions.generateTrace!, compilerOptions.configFilePath);
        }
    }

    function reportStatistics(sys: System, program: Program) {
        const compilerOptions = program.getCompilerOptions();

        if (canTrace(sys, compilerOptions)) {
            tracing.stopTracing(program.getTypeCatalog());
        }

        let statistics: Statistic[];
        if (canReportDiagnostics(sys, compilerOptions)) {
            statistics = [];
            const memoryUsed = sys.getMemoryUsage ? sys.getMemoryUsage() : -1;
            reportCountStatistic("Files", program.getSourceFiles().length);

            const lineCounts = countLines(program);
            const nodeCounts = countNodes(program);
            if (compilerOptions.extendedDiagnostics) {
                for (const key of arrayFrom(lineCounts.keys())) {
                    reportCountStatistic("Lines of " + key, lineCounts.get(key)!);
                }
                for (const key of arrayFrom(nodeCounts.keys())) {
                    reportCountStatistic("Nodes of " + key, nodeCounts.get(key)!);
                }
            }
            else {
                reportCountStatistic("Lines", reduceLeftIterator(lineCounts.values(), (sum, count) => sum + count, 0));
                reportCountStatistic("Nodes", reduceLeftIterator(nodeCounts.values(), (sum, count) => sum + count, 0));
            }

            reportCountStatistic("Identifiers", program.getIdentifierCount());
            reportCountStatistic("Symbols", program.getSymbolCount());
            reportCountStatistic("Types", program.getTypeCount());
            reportCountStatistic("Instantiations", program.getInstantiationCount());

            if (memoryUsed >= 0) {
                reportStatisticalValue("Memory used", Math.round(memoryUsed / 1000) + "K");
            }

            const isPerformanceEnabled = performance.isEnabled();
            const programTime = isPerformanceEnabled ? performance.getDuration("Program") : 0;
            const bindTime = isPerformanceEnabled ? performance.getDuration("Bind") : 0;
            const checkTime = isPerformanceEnabled ? performance.getDuration("Check") : 0;
            const emitTime = isPerformanceEnabled ? performance.getDuration("Emit") : 0;
            if (compilerOptions.extendedDiagnostics) {
                const caches = program.getRelationCacheSizes();
                reportCountStatistic("Assignability cache size", caches.assignable);
                reportCountStatistic("Identity cache size", caches.identity);
                reportCountStatistic("Subtype cache size", caches.subtype);
                reportCountStatistic("Strict subtype cache size", caches.strictSubtype);
                if (isPerformanceEnabled) {
                    performance.forEachMeasure((name, duration) => reportTimeStatistic(`${name} time`, duration));
                }
            }
            else if (isPerformanceEnabled) {
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
            if (isPerformanceEnabled) {
                reportTimeStatistic("Total time", programTime + bindTime + checkTime + emitTime);
            }
            reportStatistics();
            if (!isPerformanceEnabled) {
                sys.write(Diagnostics.Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_native_implementation_of_the_Web_Performance_API_could_not_be_found.message + "\n");
            }
            else {
                performance.disable();
            }
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

    function writeConfigFile(
        sys: System,
        reportDiagnostic: DiagnosticReporter,
        options: CompilerOptions,
        fileNames: string[]
    ) {
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
