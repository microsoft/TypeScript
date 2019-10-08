namespace ts {
    export type TscCompileSystem = fakes.System & {
        writtenFiles: Map<true>;
        baseLine(): void;
    };
    function executeCommandLine(sys: TscCompileSystem, commandLineArgs: readonly string[]) {
        if (isBuild(commandLineArgs)) {
            return performBuild(sys, commandLineArgs.slice(1));
        }

        const reportDiagnostic = createDiagnosticReporter(sys);
        const commandLine = parseCommandLine(commandLineArgs, path => sys.readFile(path));
        if (commandLine.options.build) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Option_build_must_be_the_first_command_line_argument));
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        if (commandLine.errors.length > 0) {
            commandLine.errors.forEach(reportDiagnostic);
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        let configFileName: string | undefined;
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

        Debug.assert(commandLine.fileNames.length !== 0 || !!configFileName);

        if (configFileName) {
            const configParseResult = Debug.assertDefined(parseConfigFileWithSystem(configFileName, commandLine.options, sys, reportDiagnostic));
            if (isIncrementalCompilation(configParseResult.options)) {
                performIncrementalCompilation(sys, configParseResult);
            }
            else {
                performCompilation(sys, configParseResult);
            }
        }
        else {
            if (isIncrementalCompilation(commandLine.options)) {
                performIncrementalCompilation(sys, commandLine);
            }
            else {
                performCompilation(sys, commandLine);
            }
        }
    }

    function createReportErrorSummary(sys: TscCompileSystem, options: CompilerOptions): ReportEmitErrorSummary | undefined {
        return options.pretty ?
            errorCount => sys.write(getErrorSummaryText(errorCount, sys.newLine)) :
            undefined;
    }

    function performCompilation(sys: TscCompileSystem, config: ParsedCommandLine) {
        const { fileNames, options, projectReferences } = config;
        const reportDiagnostic = createDiagnosticReporter(sys, options.pretty);
        const host = createCompilerHostWorker(options, /*setParentPos*/ undefined, sys);
        const currentDirectory = host.getCurrentDirectory();
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
        changeCompilerHostLikeToUseCache(host, fileName => toPath(fileName, currentDirectory, getCanonicalFileName));
        const program = createProgram({
            rootNames: fileNames,
            options,
            projectReferences,
            host,
            configFileParsingDiagnostics: getConfigFileParsingDiagnostics(config)
        });
        const exitStatus = emitFilesAndReportErrorsAndGetExitStatus(
            program,
            reportDiagnostic,
            s => sys.write(s + sys.newLine),
            createReportErrorSummary(sys, options)
        );
        baselineBuildInfo([config], sys.vfs, sys.writtenFiles);
        return sys.exit(exitStatus);
    }

    function performIncrementalCompilation(sys: TscCompileSystem, config: ParsedCommandLine) {
        const reportDiagnostic = createDiagnosticReporter(sys, config.options.pretty);
        const { options, fileNames, projectReferences } = config;
        const exitCode = ts.performIncrementalCompilation({
            system: sys,
            rootNames: fileNames,
            options,
            configFileParsingDiagnostics: getConfigFileParsingDiagnostics(config),
            projectReferences,
            reportDiagnostic,
            reportErrorSummary: createReportErrorSummary(sys, options),
        });
        baselineBuildInfo([config], sys.vfs, sys.writtenFiles);
        return sys.exit(exitCode);
    }

    function performBuild(sys: TscCompileSystem, args: string[]) {
        const { buildOptions, projects, errors } = parseBuildCommand(args);
        const reportDiagnostic = createDiagnosticReporter(sys, buildOptions.pretty);

        if (errors.length > 0) {
            errors.forEach(reportDiagnostic);
            return sys.exit(ExitStatus.DiagnosticsPresent_OutputsSkipped);
        }

        Debug.assert(projects.length !== 0);

        const buildHost = createSolutionBuilderHost(
            sys,
            /*createProgram*/ undefined,
            reportDiagnostic,
            createBuilderStatusReporter(sys, buildOptions.pretty),
            createReportErrorSummary(sys, buildOptions)
        );
        fakes.patchSolutionBuilderHost(buildHost, sys);
        const builder = createSolutionBuilder(buildHost, projects, buildOptions);
        const exitCode = buildOptions.clean ? builder.clean() : builder.build();
        baselineBuildInfo(builder.getAllParsedConfigs(), sys.vfs, sys.writtenFiles);
        return sys.exit(exitCode);
    }

    function isBuild(commandLineArgs: readonly string[]) {
        if (commandLineArgs.length > 0 && commandLineArgs[0].charCodeAt(0) === CharacterCodes.minus) {
            const firstOption = commandLineArgs[0].slice(commandLineArgs[0].charCodeAt(1) === CharacterCodes.minus ? 2 : 1).toLowerCase();
            return firstOption === "build" || firstOption === "b";
        }
        return false;
    }

    export enum BuildKind {
        Initial = "initial-build",
        IncrementalDtsChange = "incremental-declaration-changes",
        IncrementalDtsUnchanged = "incremental-declaration-doesnt-change",
        IncrementalHeadersChange = "incremental-headers-change-without-dts-changes"
    }

    export interface TscCompile {
        scenario: string;
        subScenario: string;
        buildKind?: BuildKind; // Should be defined for tsc --b
        fs: () => vfs.FileSystem;
        commandLineArgs: readonly string[];

        modifyFs?: (fs: vfs.FileSystem) => void;
        baselineSourceMap?: boolean;
        baselineReadFileCalls?: boolean;
    }

    export function tscCompile(input: TscCompile) {
        const baseFs = input.fs();
        const fs = baseFs.shadow();
        const {
            scenario, subScenario, buildKind,
            commandLineArgs, modifyFs,
            baselineSourceMap, baselineReadFileCalls
        } = input;
        if (modifyFs) modifyFs(fs);

        // Create system
        const sys = new fakes.System(fs, { executingFilePath: "/lib/tsc" }) as TscCompileSystem;
        const writtenFiles = sys.writtenFiles = createMap<true>();
        const originalWriteFile = sys.writeFile;
        sys.writeFile = (fileName, content, writeByteOrderMark) => {
            assert.isFalse(writtenFiles.has(fileName));
            writtenFiles.set(fileName, true);
            return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
        };
        const actualReadFileMap: MapLike<number> = {};
        const originalReadFile = sys.readFile;
        sys.readFile = path => {
            // Dont record libs
            if (path.startsWith("/src/")) {
                actualReadFileMap[path] = (getProperty(actualReadFileMap, path) || 0) + 1;
            }
            return originalReadFile.call(sys, path);
        };

        sys.write(`${sys.getExecutingFilePath()} ${commandLineArgs.join(" ")}\n`);
        sys.exit = exitCode => sys.exitCode = exitCode;
        executeCommandLine(sys, commandLineArgs);
        sys.write(`exitCode:: ${sys.exitCode}\n`);
        if (baselineReadFileCalls) {
            sys.write(`readFiles:: ${JSON.stringify(actualReadFileMap, /*replacer*/ undefined, " ")} `);
        }
        if (baselineSourceMap) generateSourceMapBaselineFiles(fs, mapDefinedIterator(writtenFiles.keys(), f => f.endsWith(".map") ? f : undefined));

        // Baseline the errors
        fs.writeFileSync(`/lib/${buildKind || BuildKind.Initial}Output.txt`, sys.output.join(""));
        fs.makeReadonly();

        sys.baseLine = () => {
            const patch = fs.diff(baseFs, { includeChangedFileWithSameContent: true });
            // eslint-disable-next-line no-null/no-null
            Harness.Baseline.runBaseline(`${isBuild(commandLineArgs) ? "tsbuild" : "tsc"}/${scenario}/${buildKind || BuildKind.Initial}/${subScenario.split(" ").join("-")}.js`, patch ? vfs.formatPatch(patch) : null);
        };
        return sys;
    }

    export function verifyTscBaseline(sys: () => TscCompileSystem) {
        it(`Generates files matching the baseline`, () => {
            sys().baseLine();
        });
    }

    export function verifyTsc(input: TscCompile) {
        describe(input.scenario, () => {
            describe(input.subScenario, () => {
                let sys: TscCompileSystem;
                before(() => {
                    sys = tscCompile({
                        ...input,
                        fs: () => getFsWithTime(input.fs()).fs.makeReadonly()
                    });
                });
                after(() => {
                    sys = undefined!;
                });
                verifyTscBaseline(() => sys);
            });
        });
    }
}
