// Currently we do not want to expose API for build, we should work out the API, and then expose it just like we did for builder/watch
/*@internal*/
namespace ts {
    const minimumDate = new Date(-8640000000000000);
    const maximumDate = new Date(8640000000000000);

    export interface BuildHost {
        verbose(diag: DiagnosticMessage, ...args: string[]): void;
        error(diag: DiagnosticMessage, ...args: string[]): void;
        errorDiagnostic(diag: Diagnostic): void;
        message(diag: DiagnosticMessage, ...args: string[]): void;
    }

    interface DependencyGraph {
        buildQueue: ResolvedConfigFileName[];
        /** value in config File map is true if project is referenced using prepend */
        referencingProjectsMap: ConfigFileMap<ConfigFileMap<boolean>>;
    }

    export interface BuildOptions extends OptionsBase {
        dry?: boolean;
        force?: boolean;
        verbose?: boolean;

        /*@internal*/ clean?: boolean;
        /*@internal*/ watch?: boolean;
        /*@internal*/ help?: boolean;

        preserveWatchOutput?: boolean;
        listEmittedFiles?: boolean;
        listFiles?: boolean;
        pretty?: boolean;
        incremental?: boolean;

        traceResolution?: boolean;
        /* @internal */ diagnostics?: boolean;
        /* @internal */ extendedDiagnostics?: boolean;
    }

    enum BuildResultFlags {
        None = 0,

        /**
         * No errors of any kind occurred during build
         */
        Success = 1 << 0,
        /**
         * None of the .d.ts files emitted by this build were
         * different from the existing files on disk
         */
        DeclarationOutputUnchanged = 1 << 1,

        ConfigFileErrors = 1 << 2,
        SyntaxErrors = 1 << 3,
        TypeErrors = 1 << 4,
        DeclarationEmitErrors = 1 << 5,
        EmitErrors = 1 << 6,

        AnyErrors = ConfigFileErrors | SyntaxErrors | TypeErrors | DeclarationEmitErrors | EmitErrors
    }

    export enum UpToDateStatusType {
        Unbuildable,
        UpToDate,
        /**
         * The project appears out of date because its upstream inputs are newer than its outputs,
         * but all of its outputs are actually newer than the previous identical outputs of its (.d.ts) inputs.
         * This means we can Pseudo-build (just touch timestamps), as if we had actually built this project.
         */
        UpToDateWithUpstreamTypes,
        /**
         * The project appears out of date because its upstream inputs are newer than its outputs,
         * but all of its outputs are actually newer than the previous identical outputs of its (.d.ts) inputs.
         * This means we can Pseudo-build (just manipulate outputs), as if we had actually built this project.
         */
        OutOfDateWithPrepend,
        OutputMissing,
        OutOfDateWithSelf,
        OutOfDateWithUpstream,
        UpstreamOutOfDate,
        UpstreamBlocked,
        ComputingUpstream,
        TsVersionOutputOfDate,

        /**
         * Projects with no outputs (i.e. "solution" files)
         */
        ContainerOnly
    }

    export type UpToDateStatus =
        | Status.Unbuildable
        | Status.UpToDate
        | Status.OutOfDateWithPrepend
        | Status.OutputMissing
        | Status.OutOfDateWithSelf
        | Status.OutOfDateWithUpstream
        | Status.UpstreamOutOfDate
        | Status.UpstreamBlocked
        | Status.ComputingUpstream
        | Status.TsVersionOutOfDate
        | Status.ContainerOnly;

    export namespace Status {
        /**
         * The project can't be built at all in its current state. For example,
         * its config file cannot be parsed, or it has a syntax error or missing file
         */
        export interface Unbuildable {
            type: UpToDateStatusType.Unbuildable;
            reason: string;
        }

        /**
         * This project doesn't have any outputs, so "is it up to date" is a meaningless question.
         */
        export interface ContainerOnly {
            type: UpToDateStatusType.ContainerOnly;
        }

        /**
         * The project is up to date with respect to its inputs.
         * We track what the newest input file is.
         */
        export interface UpToDate {
            type: UpToDateStatusType.UpToDate | UpToDateStatusType.UpToDateWithUpstreamTypes;
            newestInputFileTime?: Date;
            newestInputFileName?: string;
            newestDeclarationFileContentChangedTime?: Date;
            newestOutputFileTime?: Date;
            newestOutputFileName?: string;
            oldestOutputFileName: string;
        }

        /**
         * The project is up to date with respect to its inputs except for prepend output changed (no declaration file change in prepend).
         */
        export interface OutOfDateWithPrepend {
            type: UpToDateStatusType.OutOfDateWithPrepend;
            outOfDateOutputFileName: string;
            newerProjectName: string;
        }

        /**
         * One or more of the outputs of the project does not exist.
         */
        export interface OutputMissing {
            type: UpToDateStatusType.OutputMissing;
            /**
             * The name of the first output file that didn't exist
             */
            missingOutputFileName: string;
        }

        /**
         * One or more of the project's outputs is older than its newest input.
         */
        export interface OutOfDateWithSelf {
            type: UpToDateStatusType.OutOfDateWithSelf;
            outOfDateOutputFileName: string;
            newerInputFileName: string;
        }

        /**
         * This project depends on an out-of-date project, so shouldn't be built yet
         */
        export interface UpstreamOutOfDate {
            type: UpToDateStatusType.UpstreamOutOfDate;
            upstreamProjectName: string;
        }

        /**
         * This project depends an upstream project with build errors
         */
        export interface UpstreamBlocked {
            type: UpToDateStatusType.UpstreamBlocked;
            upstreamProjectName: string;
        }

        /**
         *  Computing status of upstream projects referenced
         */
        export interface ComputingUpstream {
            type: UpToDateStatusType.ComputingUpstream;
        }

        export interface TsVersionOutOfDate {
            type: UpToDateStatusType.TsVersionOutputOfDate;
            version: string;
        }

        /**
         * One or more of the project's outputs is older than the newest output of
         * an upstream project.
         */
        export interface OutOfDateWithUpstream {
            type: UpToDateStatusType.OutOfDateWithUpstream;
            outOfDateOutputFileName: string;
            newerProjectName: string;
        }
    }

    interface FileMap<T, U extends string = string, V extends Path = Path> {
        setValue(fileName: U, value: T): void;
        getValue(fileName: U): T | undefined;
        hasKey(fileName: U): boolean;
        removeKey(fileName: U): void;
        forEach(action: (value: T, key: V) => void): void;
        getSize(): number;
        clear(): void;
    }

    type ResolvedConfigFilePath = ResolvedConfigFileName & Path;
    type ConfigFileMap<T> = FileMap<T, ResolvedConfigFileName, ResolvedConfigFilePath>;
    type ToResolvedConfigFilePath = (fileName: ResolvedConfigFileName) => ResolvedConfigFilePath;
    type ToPath = (fileName: string) => Path;

    /**
     * A FileMap maintains a normalized-key to value relationship
     */
    function createFileMap<T>(toPath: ToResolvedConfigFilePath): ConfigFileMap<T>;
    function createFileMap<T, U extends string = string, V extends Path = Path>(toPath: ToPath): FileMap<T, U, V>;
    function createFileMap<T, U extends string = string, V extends Path = Path>(toPath: (fileName: U) => V): FileMap<T, U, V> {
        // tslint:disable-next-line:no-null-keyword
        const lookup = createMap<T>();

        return {
            setValue,
            getValue,
            removeKey,
            forEach,
            hasKey,
            getSize,
            clear
        };

        function forEach(action: (value: T, key: V) => void) {
            lookup.forEach(action);
        }

        function hasKey(fileName: U) {
            return lookup.has(toPath(fileName));
        }

        function removeKey(fileName: U) {
            lookup.delete(toPath(fileName));
        }

        function setValue(fileName: U, value: T) {
            lookup.set(toPath(fileName), value);
        }

        function getValue(fileName: U): T | undefined {
            return lookup.get(toPath(fileName));
        }

        function getSize() {
            return lookup.size;
        }

        function clear() {
            lookup.clear();
        }
    }

    function getOrCreateValueFromConfigFileMap<T>(configFileMap: ConfigFileMap<T>, resolved: ResolvedConfigFileName, createT: () => T): T {
        const existingValue = configFileMap.getValue(resolved);
        let newValue: T | undefined;
        if (!existingValue) {
            newValue = createT();
            configFileMap.setValue(resolved, newValue);
        }
        return existingValue || newValue!;
    }

    function getOrCreateValueMapFromConfigFileMap<T>(configFileMap: ConfigFileMap<Map<T>>, resolved: ResolvedConfigFileName): Map<T> {
        return getOrCreateValueFromConfigFileMap<Map<T>>(configFileMap, resolved, createMap);
    }

    function newer(date1: Date, date2: Date): Date {
        return date2 > date1 ? date2 : date1;
    }

    function isDeclarationFile(fileName: string) {
        return fileExtensionIs(fileName, Extension.Dts);
    }

    export interface SolutionBuilderHostBase<T extends BuilderProgram> extends ProgramHost<T> {
        getModifiedTime(fileName: string): Date | undefined;
        setModifiedTime(fileName: string, date: Date): void;
        deleteFile(fileName: string): void;

        reportDiagnostic: DiagnosticReporter; // Technically we want to move it out and allow steps of actions on Solution, but for now just merge stuff in build host here
        reportSolutionBuilderStatus: DiagnosticReporter;

        // TODO: To do better with watch mode and normal build mode api that creates program and emits files
        // This currently helps enable --diagnostics and --extendedDiagnostics
        afterProgramEmitAndDiagnostics?(program: T): void;

        // For testing
        now?(): Date;
    }

    export interface SolutionBuilderHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T> {
        reportErrorSummary?: ReportEmitErrorSummary;
    }

    export interface SolutionBuilderWithWatchHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T>, WatchHost {
    }

    export interface SolutionBuilder {
        buildAllProjects(): ExitStatus;
        cleanAllProjects(): ExitStatus;

        // TODO:: All the below ones should technically only be in watch mode. but thats for later time
        /*@internal*/ resolveProjectName(name: string): ResolvedConfigFileName;
        /*@internal*/ getUpToDateStatusOfFile(configFileName: ResolvedConfigFileName): UpToDateStatus;
        /*@internal*/ getBuildGraph(configFileNames: ReadonlyArray<string>): DependencyGraph;

        /*@internal*/ invalidateProject(configFileName: string, reloadLevel?: ConfigFileProgramReloadLevel): void;
        /*@internal*/ buildInvalidatedProject(): void;

        /*@internal*/ resetBuildContext(opts?: BuildOptions): void;
    }

    export interface SolutionBuilderWithWatch extends SolutionBuilder {
        /*@internal*/ startWatching(): void;
    }

    /**
     * Create a function that reports watch status by writing to the system and handles the formating of the diagnostic
     */
    export function createBuilderStatusReporter(system: System, pretty?: boolean): DiagnosticReporter {
        return diagnostic => {
            let output = pretty ? `[${formatColorAndReset(new Date().toLocaleTimeString(), ForegroundColorEscapeSequences.Grey)}] ` : `${new Date().toLocaleTimeString()} - `;
            output += `${flattenDiagnosticMessageText(diagnostic.messageText, system.newLine)}${system.newLine + system.newLine}`;
            system.write(output);
        };
    }

    function createSolutionBuilderHostBase<T extends BuilderProgram>(system: System, createProgram: CreateProgram<T> | undefined, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter) {
        const host = createProgramHost(system, createProgram) as SolutionBuilderHostBase<T>;
        host.getModifiedTime = system.getModifiedTime ? path => system.getModifiedTime!(path) : returnUndefined;
        host.setModifiedTime = system.setModifiedTime ? (path, date) => system.setModifiedTime!(path, date) : noop;
        host.deleteFile = system.deleteFile ? path => system.deleteFile!(path) : noop;
        host.reportDiagnostic = reportDiagnostic || createDiagnosticReporter(system);
        host.reportSolutionBuilderStatus = reportSolutionBuilderStatus || createBuilderStatusReporter(system);
        return host;
    }

    export function createSolutionBuilderHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system = sys, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportErrorSummary?: ReportEmitErrorSummary) {
        const host = createSolutionBuilderHostBase(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderHost<T>;
        host.reportErrorSummary = reportErrorSummary;
        return host;
    }

    export function createSolutionBuilderWithWatchHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system = sys, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter) {
        const host = createSolutionBuilderHostBase(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderWithWatchHost<T>;
        const watchHost = createWatchHost(system, reportWatchStatus);
        copyProperties(host, watchHost);
        return host;
    }

    function getCompilerOptionsOfBuildOptions(buildOptions: BuildOptions): CompilerOptions {
        const result = {} as CompilerOptions;
        commonOptionsWithBuild.forEach(option => {
            if (hasProperty(buildOptions, option.name)) result[option.name] = buildOptions[option.name];
        });
        return result;
    }

    /**
     * A SolutionBuilder has an immutable set of rootNames that are the "entry point" projects, but
     * can dynamically add/remove other projects based on changes on the rootNames' references
     * TODO: use SolutionBuilderWithWatchHost => watchedSolution
     *  use SolutionBuilderHost => Solution
     */
    export function createSolutionBuilder<T extends BuilderProgram>(host: SolutionBuilderHost<T>, rootNames: ReadonlyArray<string>, defaultOptions: BuildOptions): SolutionBuilder;
    export function createSolutionBuilder<T extends BuilderProgram>(host: SolutionBuilderWithWatchHost<T>, rootNames: ReadonlyArray<string>, defaultOptions: BuildOptions): SolutionBuilderWithWatch;
    export function createSolutionBuilder<T extends BuilderProgram>(host: SolutionBuilderHost<T> | SolutionBuilderWithWatchHost<T>, rootNames: ReadonlyArray<string>, defaultOptions: BuildOptions): SolutionBuilderWithWatch {
        const hostWithWatch = host as SolutionBuilderWithWatchHost<T>;
        const currentDirectory = host.getCurrentDirectory();
        const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
        const parseConfigFileHost = parseConfigHostFromCompilerHostLike(host);

        // State of the solution
        let options = defaultOptions;
        let baseCompilerOptions = getCompilerOptionsOfBuildOptions(options);
        type ConfigFileCacheEntry = ParsedCommandLine | Diagnostic;
        const configFileCache = createFileMap<ConfigFileCacheEntry>(toPath);
        /** Map from output file name to its pre-build timestamp */
        const unchangedOutputs = createFileMap<Date>(toPath as ToPath);
        /** Map from config file name to up-to-date status */
        const projectStatus = createFileMap<UpToDateStatus>(toPath);
        const missingRoots = createMap<true>();
        let globalDependencyGraph: DependencyGraph | undefined;
        const writeFileName = host.trace ? (s: string) => host.trace!(s) : undefined;
        let readFileWithCache = (f: string) => host.readFile(f);
        let projectCompilerOptions = baseCompilerOptions;
        const compilerHost = createCompilerHostFromProgramHost(host, () => projectCompilerOptions);
        setGetSourceFileAsHashVersioned(compilerHost, host);

        const buildInfoChecked = createFileMap<true>(toPath);

        // Watch state
        const builderPrograms = createFileMap<T>(toPath);
        const diagnostics = createFileMap<ReadonlyArray<Diagnostic>>(toPath);
        const projectPendingBuild = createFileMap<ConfigFileProgramReloadLevel>(toPath);
        const projectErrorsReported = createFileMap<true>(toPath);
        const invalidatedProjectQueue = [] as ResolvedConfigFileName[];
        let nextProjectToBuild = 0;
        let timerToBuildInvalidatedProject: any;
        let reportFileChangeDetected = false;
        const { watchFile, watchFilePath, watchDirectory, writeLog } = createWatchFactory<ResolvedConfigFileName>(host, options);

        // Watches for the solution
        const allWatchedWildcardDirectories = createFileMap<Map<WildcardDirectoryWatcher>>(toPath);
        const allWatchedInputFiles = createFileMap<Map<FileWatcher>>(toPath);
        const allWatchedConfigFiles = createFileMap<FileWatcher>(toPath);

        return {
            buildAllProjects,
            getUpToDateStatusOfFile,
            cleanAllProjects,
            resetBuildContext,
            getBuildGraph,

            invalidateProject,
            buildInvalidatedProject,

            resolveProjectName,

            startWatching
        };

        function toPath(fileName: ResolvedConfigFileName): ResolvedConfigFilePath;
        function toPath(fileName: string): Path;
        function toPath(fileName: string) {
            return ts.toPath(fileName, currentDirectory, getCanonicalFileName);
        }

        function resetBuildContext(opts = defaultOptions) {
            options = opts;
            baseCompilerOptions = getCompilerOptionsOfBuildOptions(options);
            configFileCache.clear();
            unchangedOutputs.clear();
            projectStatus.clear();
            missingRoots.clear();
            globalDependencyGraph = undefined;
            buildInfoChecked.clear();

            diagnostics.clear();
            projectPendingBuild.clear();
            projectErrorsReported.clear();
            invalidatedProjectQueue.length = 0;
            nextProjectToBuild = 0;
            if (timerToBuildInvalidatedProject) {
                clearTimeout(timerToBuildInvalidatedProject);
                timerToBuildInvalidatedProject = undefined;
            }
            reportFileChangeDetected = false;
            clearMap(allWatchedWildcardDirectories, wildCardWatches => clearMap(wildCardWatches, closeFileWatcherOf));
            clearMap(allWatchedInputFiles, inputFileWatches => clearMap(inputFileWatches, closeFileWatcher));
            clearMap(allWatchedConfigFiles, closeFileWatcher);
            builderPrograms.clear();
        }

        function isParsedCommandLine(entry: ConfigFileCacheEntry): entry is ParsedCommandLine {
            return !!(entry as ParsedCommandLine).options;
        }

        function parseConfigFile(configFilePath: ResolvedConfigFileName): ParsedCommandLine | undefined {
            const value = configFileCache.getValue(configFilePath);
            if (value) {
                return isParsedCommandLine(value) ? value : undefined;
            }

            let diagnostic: Diagnostic | undefined;
            parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = d => diagnostic = d;
            const parsed = getParsedCommandLineOfConfigFile(configFilePath, baseCompilerOptions, parseConfigFileHost);
            parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = noop;
            configFileCache.setValue(configFilePath, parsed || diagnostic!);
            return parsed;
        }

        function reportStatus(message: DiagnosticMessage, ...args: string[]) {
            host.reportSolutionBuilderStatus(createCompilerDiagnostic(message, ...args));
        }

        function reportWatchStatus(message: DiagnosticMessage, ...args: (string | number | undefined)[]) {
            if (hostWithWatch.onWatchStatusChange) {
                hostWithWatch.onWatchStatusChange(createCompilerDiagnostic(message, ...args), host.getNewLine(), baseCompilerOptions);
            }
        }

        function startWatching() {
            const graph = getGlobalDependencyGraph();
            for (const resolved of graph.buildQueue) {
                // Watch this file
                watchConfigFile(resolved);

                const cfg = parseConfigFile(resolved);
                if (cfg) {
                    // Update watchers for wildcard directories
                    watchWildCardDirectories(resolved, cfg);

                    // Watch input files
                    watchInputFiles(resolved, cfg);
                }
            }

        }

        function watchConfigFile(resolved: ResolvedConfigFileName) {
            if (options.watch && !allWatchedConfigFiles.hasKey(resolved)) {
                allWatchedConfigFiles.setValue(resolved, watchFile(
                    hostWithWatch,
                    resolved,
                    () => {
                        invalidateProjectAndScheduleBuilds(resolved, ConfigFileProgramReloadLevel.Full);
                    },
                    PollingInterval.High,
                    WatchType.ConfigFile,
                    resolved
                ));
            }
        }

        function watchWildCardDirectories(resolved: ResolvedConfigFileName, parsed: ParsedCommandLine) {
            if (!options.watch) return;
            updateWatchingWildcardDirectories(
                getOrCreateValueMapFromConfigFileMap(allWatchedWildcardDirectories, resolved),
                createMapFromTemplate(parsed.configFileSpecs!.wildcardDirectories),
                (dir, flags) => {
                    return watchDirectory(
                        hostWithWatch,
                        dir,
                        fileOrDirectory => {
                            const fileOrDirectoryPath = toPath(fileOrDirectory);
                            if (fileOrDirectoryPath !== toPath(dir) && hasExtension(fileOrDirectoryPath) && !isSupportedSourceFileName(fileOrDirectory, parsed.options)) {
                                writeLog(`Project: ${resolved} Detected file add/remove of non supported extension: ${fileOrDirectory}`);
                                return;
                            }

                            if (isOutputFile(fileOrDirectory, parsed)) {
                                writeLog(`${fileOrDirectory} is output file`);
                                return;
                            }

                            invalidateProjectAndScheduleBuilds(resolved, ConfigFileProgramReloadLevel.Partial);
                        },
                        flags,
                        WatchType.WildcardDirectory,
                        resolved
                    );
                }
            );
        }

        function watchInputFiles(resolved: ResolvedConfigFileName, parsed: ParsedCommandLine) {
            if (!options.watch) return;
            mutateMap(
                getOrCreateValueMapFromConfigFileMap(allWatchedInputFiles, resolved),
                arrayToMap(parsed.fileNames, toPath),
                {
                    createNewValue: (path, input) => watchFilePath(
                        hostWithWatch,
                        input,
                        () => invalidateProjectAndScheduleBuilds(resolved, ConfigFileProgramReloadLevel.None),
                        PollingInterval.Low,
                        path as Path,
                        WatchType.SourceFile,
                        resolved
                    ),
                    onDeleteValue: closeFileWatcher,
                }
            );
        }

        function isOutputFile(fileName: string, configFile: ParsedCommandLine) {
            if (configFile.options.noEmit) return false;

            // ts or tsx files are not output
            if (!fileExtensionIs(fileName, Extension.Dts) &&
                (fileExtensionIs(fileName, Extension.Ts) || fileExtensionIs(fileName, Extension.Tsx))) {
                return false;
            }

            // If options have --outFile or --out, check if its that
            const out = configFile.options.outFile || configFile.options.out;
            if (out && (isSameFile(fileName, out) || isSameFile(fileName, removeFileExtension(out) + Extension.Dts))) {
                return true;
            }

            // If declarationDir is specified, return if its a file in that directory
            if (configFile.options.declarationDir && containsPath(configFile.options.declarationDir, fileName, currentDirectory, !host.useCaseSensitiveFileNames())) {
                return true;
            }

            // If --outDir, check if file is in that directory
            if (configFile.options.outDir && containsPath(configFile.options.outDir, fileName, currentDirectory, !host.useCaseSensitiveFileNames())) {
                return true;
            }

            return !forEach(configFile.fileNames, inputFile => isSameFile(fileName, inputFile));
        }

        function isSameFile(file1: string, file2: string) {
            return comparePaths(file1, file2, currentDirectory, !host.useCaseSensitiveFileNames()) === Comparison.EqualTo;
        }

        function invalidateProjectAndScheduleBuilds(resolved: ResolvedConfigFileName, reloadLevel: ConfigFileProgramReloadLevel) {
            reportFileChangeDetected = true;
            invalidateResolvedProject(resolved, reloadLevel);
            scheduleBuildInvalidatedProject();
        }

        function getUpToDateStatusOfFile(configFileName: ResolvedConfigFileName): UpToDateStatus {
            return getUpToDateStatus(parseConfigFile(configFileName));
        }

        function getBuildGraph(configFileNames: ReadonlyArray<string>) {
            return createDependencyGraph(resolveProjectNames(configFileNames));
        }

        function getGlobalDependencyGraph() {
            return globalDependencyGraph || (globalDependencyGraph = getBuildGraph(rootNames));
        }

        function getUpToDateStatus(project: ParsedCommandLine | undefined): UpToDateStatus {
            if (project === undefined) {
                return { type: UpToDateStatusType.Unbuildable, reason: "File deleted mid-build" };
            }

            const prior = projectStatus.getValue(project.options.configFilePath as ResolvedConfigFilePath);
            if (prior !== undefined) {
                return prior;
            }

            const actual = getUpToDateStatusWorker(project);
            projectStatus.setValue(project.options.configFilePath as ResolvedConfigFilePath, actual);
            return actual;
        }

        function getUpToDateStatusWorker(project: ParsedCommandLine): UpToDateStatus {
            let newestInputFileName: string = undefined!;
            let newestInputFileTime = minimumDate;
            // Get timestamps of input files
            for (const inputFile of project.fileNames) {
                if (!host.fileExists(inputFile)) {
                    return {
                        type: UpToDateStatusType.Unbuildable,
                        reason: `${inputFile} does not exist`
                    };
                }

                const inputTime = host.getModifiedTime(inputFile) || missingFileModifiedTime;
                if (inputTime > newestInputFileTime) {
                    newestInputFileName = inputFile;
                    newestInputFileTime = inputTime;
                }
            }

            // Container if no files are specified in the project
            if (!project.fileNames.length && !canJsonReportNoInutFiles(project.raw)) {
                return {
                    type: UpToDateStatusType.ContainerOnly
                };
            }

            // Collect the expected outputs of this project
            const outputs = getAllProjectOutputs(project, !host.useCaseSensitiveFileNames());

            // Now see if all outputs are newer than the newest input
            let oldestOutputFileName = "(none)";
            let oldestOutputFileTime = maximumDate;
            let newestOutputFileName = "(none)";
            let newestOutputFileTime = minimumDate;
            let missingOutputFileName: string | undefined;
            let newestDeclarationFileContentChangedTime = minimumDate;
            let isOutOfDateWithInputs = false;
            for (const output of outputs) {
                // Output is missing; can stop checking
                // Don't immediately return because we can still be upstream-blocked, which is a higher-priority status
                if (!host.fileExists(output)) {
                    missingOutputFileName = output;
                    break;
                }

                const outputTime = host.getModifiedTime(output) || missingFileModifiedTime;
                if (outputTime < oldestOutputFileTime) {
                    oldestOutputFileTime = outputTime;
                    oldestOutputFileName = output;
                }

                // If an output is older than the newest input, we can stop checking
                // Don't immediately return because we can still be upstream-blocked, which is a higher-priority status
                if (outputTime < newestInputFileTime) {
                    isOutOfDateWithInputs = true;
                    break;
                }

                if (outputTime > newestOutputFileTime) {
                    newestOutputFileTime = outputTime;
                    newestOutputFileName = output;
                }

                // Keep track of when the most recent time a .d.ts file was changed.
                // In addition to file timestamps, we also keep track of when a .d.ts file
                // had its file touched but not had its contents changed - this allows us
                // to skip a downstream typecheck
                if (isDeclarationFile(output)) {
                    const unchangedTime = unchangedOutputs.getValue(output);
                    if (unchangedTime !== undefined) {
                        newestDeclarationFileContentChangedTime = newer(unchangedTime, newestDeclarationFileContentChangedTime);
                    }
                    else {
                        const outputModifiedTime = host.getModifiedTime(output) || missingFileModifiedTime;
                        newestDeclarationFileContentChangedTime = newer(newestDeclarationFileContentChangedTime, outputModifiedTime);
                    }
                }
            }

            let pseudoUpToDate = false;
            let usesPrepend = false;
            let upstreamChangedProject: string | undefined;
            if (project.projectReferences) {
                projectStatus.setValue(project.options.configFilePath as ResolvedConfigFileName, { type: UpToDateStatusType.ComputingUpstream });
                for (const ref of project.projectReferences) {
                    usesPrepend = usesPrepend || !!(ref.prepend);
                    const resolvedRef = resolveProjectReferencePath(ref);
                    const refStatus = getUpToDateStatus(parseConfigFile(resolvedRef));

                    // Its a circular reference ignore the status of this project
                    if (refStatus.type === UpToDateStatusType.ComputingUpstream) {
                        continue;
                    }

                    // An upstream project is blocked
                    if (refStatus.type === UpToDateStatusType.Unbuildable) {
                        return {
                            type: UpToDateStatusType.UpstreamBlocked,
                            upstreamProjectName: ref.path
                        };
                    }

                    // If the upstream project is out of date, then so are we (someone shouldn't have asked, though?)
                    if (refStatus.type !== UpToDateStatusType.UpToDate) {
                        return {
                            type: UpToDateStatusType.UpstreamOutOfDate,
                            upstreamProjectName: ref.path
                        };
                    }

                    // Check oldest output file name only if there is no missing output file name
                    if (!missingOutputFileName) {
                        // If the upstream project's newest file is older than our oldest output, we
                        // can't be out of date because of it
                        if (refStatus.newestInputFileTime && refStatus.newestInputFileTime <= oldestOutputFileTime) {
                            continue;
                        }

                        // If the upstream project has only change .d.ts files, and we've built
                        // *after* those files, then we're "psuedo up to date" and eligible for a fast rebuild
                        if (refStatus.newestDeclarationFileContentChangedTime && refStatus.newestDeclarationFileContentChangedTime <= oldestOutputFileTime) {
                            pseudoUpToDate = true;
                            upstreamChangedProject = ref.path;
                            continue;
                        }

                        // We have an output older than an upstream output - we are out of date
                        Debug.assert(oldestOutputFileName !== undefined, "Should have an oldest output filename here");
                        return {
                            type: UpToDateStatusType.OutOfDateWithUpstream,
                            outOfDateOutputFileName: oldestOutputFileName,
                            newerProjectName: ref.path
                        };
                    }
                }
            }

            if (missingOutputFileName !== undefined) {
                return {
                    type: UpToDateStatusType.OutputMissing,
                    missingOutputFileName
                };
            }

            if (isOutOfDateWithInputs) {
                return {
                    type: UpToDateStatusType.OutOfDateWithSelf,
                    outOfDateOutputFileName: oldestOutputFileName,
                    newerInputFileName: newestInputFileName
                };
            }
            else {
                // Check tsconfig time
                const configStatus = checkConfigFileUpToDateStatus(project.options.configFilePath!, oldestOutputFileTime, oldestOutputFileName);
                if (configStatus) return configStatus;

                // Check extended config time
                const extendedConfigStatus = forEach(project.options.configFile!.extendedSourceFiles || emptyArray, configFile => checkConfigFileUpToDateStatus(configFile, oldestOutputFileTime, oldestOutputFileName));
                if (extendedConfigStatus) return extendedConfigStatus;
            }

            if (!buildInfoChecked.hasKey(project.options.configFilePath as ResolvedConfigFileName)) {
                buildInfoChecked.setValue(project.options.configFilePath as ResolvedConfigFileName, true);
                const buildInfoPath = getOutputPathForBuildInfo(project.options);
                if (buildInfoPath) {
                    const value = readFileWithCache(buildInfoPath);
                    const buildInfo = value && getBuildInfo(value);
                    if (buildInfo && buildInfo.version !== version) {
                        return {
                            type: UpToDateStatusType.TsVersionOutputOfDate,
                            version: buildInfo.version
                        };
                    }
                }
            }

            if (usesPrepend && pseudoUpToDate) {
                return {
                    type: UpToDateStatusType.OutOfDateWithPrepend,
                    outOfDateOutputFileName: oldestOutputFileName,
                    newerProjectName: upstreamChangedProject!
                };
            }

            // Up to date
            return {
                type: pseudoUpToDate ? UpToDateStatusType.UpToDateWithUpstreamTypes : UpToDateStatusType.UpToDate,
                newestDeclarationFileContentChangedTime,
                newestInputFileTime,
                newestOutputFileTime,
                newestInputFileName,
                newestOutputFileName,
                oldestOutputFileName
            };
        }

        function checkConfigFileUpToDateStatus(configFile: string, oldestOutputFileTime: Date, oldestOutputFileName: string): Status.OutOfDateWithSelf | undefined {
            // Check tsconfig time
            const tsconfigTime = host.getModifiedTime(configFile) || missingFileModifiedTime;
            if (oldestOutputFileTime < tsconfigTime) {
                return {
                    type: UpToDateStatusType.OutOfDateWithSelf,
                    outOfDateOutputFileName: oldestOutputFileName,
                    newerInputFileName: configFile
                };
            }
        }

        function invalidateProject(configFileName: string, reloadLevel?: ConfigFileProgramReloadLevel) {
            invalidateResolvedProject(resolveProjectName(configFileName), reloadLevel);
        }

        function invalidateResolvedProject(resolved: ResolvedConfigFileName, reloadLevel?: ConfigFileProgramReloadLevel) {
            if (reloadLevel === ConfigFileProgramReloadLevel.Full) {
                configFileCache.removeKey(resolved);
                globalDependencyGraph = undefined;
            }
            projectStatus.removeKey(resolved);
            diagnostics.removeKey(resolved);

            addProjToQueue(resolved, reloadLevel);
        }

        /**
         * return true if new addition
         */
        function addProjToQueue(proj: ResolvedConfigFileName, reloadLevel?: ConfigFileProgramReloadLevel) {
            const value = projectPendingBuild.getValue(proj);
            if (value === undefined) {
                projectPendingBuild.setValue(proj, reloadLevel || ConfigFileProgramReloadLevel.None);
                invalidatedProjectQueue.push(proj);
            }
            else if (value < (reloadLevel || ConfigFileProgramReloadLevel.None)) {
                projectPendingBuild.setValue(proj, reloadLevel || ConfigFileProgramReloadLevel.None);
            }
        }

        function getNextInvalidatedProject() {
            if (nextProjectToBuild < invalidatedProjectQueue.length) {
                const project = invalidatedProjectQueue[nextProjectToBuild];
                nextProjectToBuild++;
                const reloadLevel = projectPendingBuild.getValue(project)!;
                projectPendingBuild.removeKey(project);
                if (!projectPendingBuild.getSize()) {
                    invalidatedProjectQueue.length = 0;
                    nextProjectToBuild = 0;
                }
                return { project, reloadLevel };
            }
        }

        function hasPendingInvalidatedProjects() {
            return !!projectPendingBuild.getSize();
        }

        function scheduleBuildInvalidatedProject() {
            if (!hostWithWatch.setTimeout || !hostWithWatch.clearTimeout) {
                return;
            }
            if (timerToBuildInvalidatedProject) {
                hostWithWatch.clearTimeout(timerToBuildInvalidatedProject);
            }
            timerToBuildInvalidatedProject = hostWithWatch.setTimeout(buildInvalidatedProject, 250);
        }

        function buildInvalidatedProject() {
            timerToBuildInvalidatedProject = undefined;
            if (reportFileChangeDetected) {
                reportFileChangeDetected = false;
                projectErrorsReported.clear();
                reportWatchStatus(Diagnostics.File_change_detected_Starting_incremental_compilation);
            }
            const buildProject = getNextInvalidatedProject();
            if (buildProject) {
                buildSingleInvalidatedProject(buildProject.project, buildProject.reloadLevel);
                if (hasPendingInvalidatedProjects()) {
                    if (options.watch && !timerToBuildInvalidatedProject) {
                        scheduleBuildInvalidatedProject();
                    }
                }
                else {
                    reportErrorSummary();
                }
            }
        }

        function reportErrorSummary() {
            if (options.watch || (host as SolutionBuilderHost<T>).reportErrorSummary) {
                // Report errors from the other projects
                getGlobalDependencyGraph().buildQueue.forEach(project => {
                    if (!projectErrorsReported.hasKey(project)) {
                        reportErrors(diagnostics.getValue(project) || emptyArray);
                    }
                });
                let totalErrors = 0;
                diagnostics.forEach(singleProjectErrors => totalErrors += getErrorCountForSummary(singleProjectErrors));
                if (options.watch) {
                    reportWatchStatus(getWatchErrorSummaryDiagnosticMessage(totalErrors), totalErrors);
                }
                else {
                    (host as SolutionBuilderHost<T>).reportErrorSummary!(totalErrors);
                }
            }
        }

        function buildSingleInvalidatedProject(resolved: ResolvedConfigFileName, reloadLevel: ConfigFileProgramReloadLevel) {
            const proj = parseConfigFile(resolved);
            if (!proj) {
                reportParseConfigFileDiagnostic(resolved);
                return;
            }

            if (reloadLevel === ConfigFileProgramReloadLevel.Full) {
                watchConfigFile(resolved);
                watchWildCardDirectories(resolved, proj);
                watchInputFiles(resolved, proj);
            }
            else if (reloadLevel === ConfigFileProgramReloadLevel.Partial) {
                // Update file names
                const result = getFileNamesFromConfigSpecs(proj.configFileSpecs!, getDirectoryPath(resolved), proj.options, parseConfigFileHost);
                updateErrorForNoInputFiles(result, resolved, proj.configFileSpecs!, proj.errors, canJsonReportNoInutFiles(proj.raw));
                proj.fileNames = result.fileNames;
                watchInputFiles(resolved, proj);
            }

            const status = getUpToDateStatus(proj);
            verboseReportProjectStatus(resolved, status);

            if (status.type === UpToDateStatusType.UpstreamBlocked) {
                if (options.verbose) reportStatus(Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors, resolved, status.upstreamProjectName);
                return;
            }

            if (status.type === UpToDateStatusType.UpToDateWithUpstreamTypes) {
                // Fake that files have been built by updating output file stamps
                updateOutputTimestamps(proj);
                return;
            }

            const buildResult = needsBuild(status, resolved) ?
                buildSingleProject(resolved) : // Actual build
                updateBundle(resolved); // Fake that files have been built by manipulating prepend and existing output
            if (buildResult & BuildResultFlags.AnyErrors) return;

            const { referencingProjectsMap, buildQueue } = getGlobalDependencyGraph();
            const referencingProjects = referencingProjectsMap.getValue(resolved);
            if (!referencingProjects) return;

            // Always use build order to queue projects
            for (let index = buildQueue.indexOf(resolved) + 1; index < buildQueue.length; index++) {
                const project = buildQueue[index];
                const prepend = referencingProjects.getValue(project);
                if (prepend !== undefined) {
                    // If the project is referenced with prepend, always build downstream projects,
                    // If declaration output is changed, build the project
                    // otherwise mark the project UpToDateWithUpstreamTypes so it updates output time stamps
                    const status = projectStatus.getValue(project);
                    if (!(buildResult & BuildResultFlags.DeclarationOutputUnchanged)) {
                        if (status && (status.type === UpToDateStatusType.UpToDate || status.type === UpToDateStatusType.UpToDateWithUpstreamTypes || status.type === UpToDateStatusType.OutOfDateWithPrepend)) {
                            projectStatus.setValue(project, {
                                type: UpToDateStatusType.OutOfDateWithUpstream,
                                outOfDateOutputFileName: status.type === UpToDateStatusType.OutOfDateWithPrepend ? status.outOfDateOutputFileName : status.oldestOutputFileName,
                                newerProjectName: resolved
                            });
                        }
                    }
                    else if (status && status.type === UpToDateStatusType.UpToDate) {
                        if (prepend) {
                            projectStatus.setValue(project, {
                                type: UpToDateStatusType.OutOfDateWithPrepend,
                                outOfDateOutputFileName: status.oldestOutputFileName,
                                newerProjectName: resolved
                            });
                        }
                        else {
                            status.type = UpToDateStatusType.UpToDateWithUpstreamTypes;
                        }
                    }
                    addProjToQueue(project);
                }
            }
        }

        function createDependencyGraph(roots: ResolvedConfigFileName[]): DependencyGraph {
            const temporaryMarks = createFileMap<true>(toPath);
            const permanentMarks = createFileMap<true>(toPath);
            const circularityReportStack: string[] = [];
            const buildOrder: ResolvedConfigFileName[] = [];
            const referencingProjectsMap = createFileMap<ConfigFileMap<boolean>>(toPath);
            for (const root of roots) {
                visit(root);
            }

            return {
                buildQueue: buildOrder,
                referencingProjectsMap
            };

            function visit(projPath: ResolvedConfigFileName, inCircularContext?: boolean) {
                // Already visited
                if (permanentMarks.hasKey(projPath)) return;
                // Circular
                if (temporaryMarks.hasKey(projPath)) {
                    if (!inCircularContext) {
                        // TODO:: Do we report this as error?
                        reportStatus(Diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0, circularityReportStack.join("\r\n"));
                    }
                    return;
                }

                temporaryMarks.setValue(projPath, true);
                circularityReportStack.push(projPath);
                const parsed = parseConfigFile(projPath);
                if (parsed && parsed.projectReferences) {
                    for (const ref of parsed.projectReferences) {
                        const resolvedRefPath = resolveProjectName(ref.path);
                        visit(resolvedRefPath, inCircularContext || ref.circular);
                        // Get projects referencing resolvedRefPath and add projPath to it
                        const referencingProjects = getOrCreateValueFromConfigFileMap(referencingProjectsMap, resolvedRefPath, () => createFileMap(toPath));
                        referencingProjects.setValue(projPath, !!ref.prepend);
                    }
                }

                circularityReportStack.pop();
                permanentMarks.setValue(projPath, true);
                buildOrder.push(projPath);
            }
        }

        function buildSingleProject(proj: ResolvedConfigFileName): BuildResultFlags {
            if (options.dry) {
                reportStatus(Diagnostics.A_non_dry_build_would_build_project_0, proj);
                return BuildResultFlags.Success;
            }

            if (options.verbose) reportStatus(Diagnostics.Building_project_0, proj);

            let resultFlags = BuildResultFlags.DeclarationOutputUnchanged;

            const configFile = parseConfigFile(proj);
            if (!configFile) {
                // Failed to read the config file
                resultFlags |= BuildResultFlags.ConfigFileErrors;
                reportParseConfigFileDiagnostic(proj);
                projectStatus.setValue(proj, { type: UpToDateStatusType.Unbuildable, reason: "Config file errors" });
                return resultFlags;
            }
            if (configFile.fileNames.length === 0) {
                reportAndStoreErrors(proj, configFile.errors);
                // Nothing to build - must be a solution file, basically
                return BuildResultFlags.None;
            }

            // TODO: handle resolve module name to cache result in project reference redirect
            projectCompilerOptions = configFile.options;
            const program = host.createProgram(
                configFile.fileNames,
                configFile.options,
                compilerHost,
                getOldProgram(proj, configFile),
                configFile.errors,
                configFile.projectReferences
            );

            // Don't emit anything in the presence of syntactic errors or options diagnostics
            const syntaxDiagnostics = [
                ...program.getConfigFileParsingDiagnostics(),
                ...program.getOptionsDiagnostics(),
                ...program.getGlobalDiagnostics(),
                ...program.getSyntacticDiagnostics()];
            if (syntaxDiagnostics.length) {
                return buildErrors(syntaxDiagnostics, BuildResultFlags.SyntaxErrors, "Syntactic");
            }

            // Same as above but now for semantic diagnostics
            const semanticDiagnostics = program.getSemanticDiagnostics();
            if (semanticDiagnostics.length) {
                return buildErrors(semanticDiagnostics, BuildResultFlags.TypeErrors, "Semantic");
            }

            // Before emitting lets backup state, so we can revert it back if there are declaration errors to handle emit and declaration errors correctly
            program.backupState();
            let newestDeclarationFileContentChangedTime = minimumDate;
            let anyDtsChanged = false;
            let declDiagnostics: Diagnostic[] | undefined;
            const reportDeclarationDiagnostics = (d: Diagnostic) => (declDiagnostics || (declDiagnostics = [])).push(d);
            const outputFiles: OutputFile[] = [];
            emitFilesAndReportErrors(program, reportDeclarationDiagnostics, /*writeFileName*/ undefined, /*reportSummary*/ undefined, (name, text, writeByteOrderMark) => outputFiles.push({ name, text, writeByteOrderMark }));
            // Don't emit .d.ts if there are decl file errors
            if (declDiagnostics) {
                program.restoreState();
                return buildErrors(declDiagnostics, BuildResultFlags.DeclarationEmitErrors, "Declaration file");
            }

            // Actual Emit
            const emitterDiagnostics = createDiagnosticCollection();
            const emittedOutputs = createFileMap<string>(toPath as ToPath);
            outputFiles.forEach(({ name, text, writeByteOrderMark }) => {
                let priorChangeTime: Date | undefined;
                if (!anyDtsChanged && isDeclarationFile(name)) {
                    // Check for unchanged .d.ts files
                    if (host.fileExists(name) && readFileWithCache(name) === text) {
                        priorChangeTime = host.getModifiedTime(name);
                    }
                    else {
                        resultFlags &= ~BuildResultFlags.DeclarationOutputUnchanged;
                        anyDtsChanged = true;
                    }
                }

                emittedOutputs.setValue(name, name);
                writeFile(compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
                if (priorChangeTime !== undefined) {
                    newestDeclarationFileContentChangedTime = newer(priorChangeTime, newestDeclarationFileContentChangedTime);
                    unchangedOutputs.setValue(name, priorChangeTime);
                }
            });

            const emitDiagnostics = emitterDiagnostics.getDiagnostics();
            if (emitDiagnostics.length) {
                return buildErrors(emitDiagnostics, BuildResultFlags.EmitErrors, "Emit");
            }

            if (writeFileName) {
                emittedOutputs.forEach(name => listEmittedFile(configFile, name));
                listFiles(program, writeFileName);
            }

            // Update time stamps for rest of the outputs
            newestDeclarationFileContentChangedTime = updateOutputTimestampsWorker(configFile, newestDeclarationFileContentChangedTime, Diagnostics.Updating_unchanged_output_timestamps_of_project_0, emittedOutputs);

            const status: Status.UpToDate = {
                type: UpToDateStatusType.UpToDate,
                newestDeclarationFileContentChangedTime: anyDtsChanged ? maximumDate : newestDeclarationFileContentChangedTime,
                oldestOutputFileName: outputFiles.length ? outputFiles[0].name : getFirstProjectOutput(configFile, !host.useCaseSensitiveFileNames())
            };
            diagnostics.removeKey(proj);
            projectStatus.setValue(proj, status);
            afterProgramCreate(proj, program);
            projectCompilerOptions = baseCompilerOptions;
            return resultFlags;

            function buildErrors(diagnostics: ReadonlyArray<Diagnostic>, errorFlags: BuildResultFlags, errorType: string) {
                resultFlags |= errorFlags;
                reportAndStoreErrors(proj, diagnostics);
                // List files if any other build error using program (emit errors already report files)
                if (writeFileName) listFiles(program, writeFileName);
                projectStatus.setValue(proj, { type: UpToDateStatusType.Unbuildable, reason: `${errorType} errors` });
                afterProgramCreate(proj, program);
                projectCompilerOptions = baseCompilerOptions;
                return resultFlags;
            }
        }

        function listEmittedFile(proj: ParsedCommandLine, file: string) {
            if (writeFileName && proj.options.listEmittedFiles) {
                writeFileName(`TSFILE: ${file}`);
            }
        }

        function afterProgramCreate(proj: ResolvedConfigFileName, program: T) {
            if (host.afterProgramEmitAndDiagnostics) {
                host.afterProgramEmitAndDiagnostics(program);
            }
            if (options.watch) {
                program.releaseProgram();
                builderPrograms.setValue(proj, program);
            }
        }

        function getOldProgram(proj: ResolvedConfigFileName, parsed: ParsedCommandLine) {
            if (options.force) return undefined;
            const value = builderPrograms.getValue(proj);
            if (value) return value;
            return readBuilderProgram(parsed.options, readFileWithCache) as any as T;
        }

        function updateBundle(proj: ResolvedConfigFileName): BuildResultFlags {
            if (options.dry) {
                reportStatus(Diagnostics.A_non_dry_build_would_update_output_of_project_0, proj);
                return BuildResultFlags.Success;
            }

            if (options.verbose) reportStatus(Diagnostics.Updating_output_of_project_0, proj);

            // Update js, and source map
            const config = Debug.assertDefined(parseConfigFile(proj));
            projectCompilerOptions = config.options;
            const outputFiles = emitUsingBuildInfo(
                config,
                compilerHost,
                ref => parseConfigFile(resolveProjectName(ref.path)));
            if (isString(outputFiles)) {
                reportStatus(Diagnostics.Cannot_update_output_of_project_0_because_there_was_error_reading_file_1, proj, relName(outputFiles));
                return buildSingleProject(proj);
            }

            // Actual Emit
            Debug.assert(!!outputFiles.length);
            const emitterDiagnostics = createDiagnosticCollection();
            const emittedOutputs = createFileMap<string>(toPath as ToPath);
            outputFiles.forEach(({ name, text, writeByteOrderMark }) => {
                emittedOutputs.setValue(name, name);
                writeFile(compilerHost, emitterDiagnostics, name, text, writeByteOrderMark);
            });
            const emitDiagnostics = emitterDiagnostics.getDiagnostics();
            if (emitDiagnostics.length) {
                reportAndStoreErrors(proj, emitDiagnostics);
                projectStatus.setValue(proj, { type: UpToDateStatusType.Unbuildable, reason: "Emit errors" });
                projectCompilerOptions = baseCompilerOptions;
                return BuildResultFlags.DeclarationOutputUnchanged | BuildResultFlags.EmitErrors;
            }

            if (writeFileName) {
                emittedOutputs.forEach(name => listEmittedFile(config, name));
            }

            // Update timestamps for dts
            const newestDeclarationFileContentChangedTime = updateOutputTimestampsWorker(config, minimumDate, Diagnostics.Updating_unchanged_output_timestamps_of_project_0, emittedOutputs);

            const status: Status.UpToDate = {
                type: UpToDateStatusType.UpToDate,
                newestDeclarationFileContentChangedTime,
                oldestOutputFileName: outputFiles[0].name
            };

            diagnostics.removeKey(proj);
            projectStatus.setValue(proj, status);
            projectCompilerOptions = baseCompilerOptions;
            return BuildResultFlags.DeclarationOutputUnchanged;
        }

        function updateOutputTimestamps(proj: ParsedCommandLine) {
            if (options.dry) {
                return reportStatus(Diagnostics.A_non_dry_build_would_update_timestamps_for_output_of_project_0, proj.options.configFilePath!);
            }
            const priorNewestUpdateTime = updateOutputTimestampsWorker(proj, minimumDate, Diagnostics.Updating_output_timestamps_of_project_0);
            const status: Status.UpToDate = {
                type: UpToDateStatusType.UpToDate,
                newestDeclarationFileContentChangedTime: priorNewestUpdateTime,
                oldestOutputFileName: getFirstProjectOutput(proj, !host.useCaseSensitiveFileNames())
            };
            projectStatus.setValue(proj.options.configFilePath as ResolvedConfigFilePath, status);
        }

        function updateOutputTimestampsWorker(proj: ParsedCommandLine, priorNewestUpdateTime: Date, verboseMessage: DiagnosticMessage, skipOutputs?: FileMap<string>) {
            const outputs = getAllProjectOutputs(proj, !host.useCaseSensitiveFileNames());
            if (!skipOutputs || outputs.length !== skipOutputs.getSize()) {
                if (options.verbose) {
                    reportStatus(verboseMessage, proj.options.configFilePath!);
                }
                const now = host.now ? host.now() : new Date();
                for (const file of outputs) {
                    if (skipOutputs && skipOutputs.hasKey(file)) {
                        continue;
                    }

                    if (isDeclarationFile(file)) {
                        priorNewestUpdateTime = newer(priorNewestUpdateTime, host.getModifiedTime(file) || missingFileModifiedTime);
                    }

                    host.setModifiedTime(file, now);
                    listEmittedFile(proj, file);
                }
            }

            return priorNewestUpdateTime;
        }

        function getFilesToClean(): string[] {
            // Get the same graph for cleaning we'd use for building
            const graph = getGlobalDependencyGraph();
            const filesToDelete: string[] = [];
            for (const proj of graph.buildQueue) {
                const parsed = parseConfigFile(proj);
                if (parsed === undefined) {
                    // File has gone missing; fine to ignore here
                    reportParseConfigFileDiagnostic(proj);
                    continue;
                }
                const outputs = getAllProjectOutputs(parsed, !host.useCaseSensitiveFileNames());
                for (const output of outputs) {
                    if (host.fileExists(output)) {
                        filesToDelete.push(output);
                    }
                }
            }
            return filesToDelete;
        }

        function cleanAllProjects() {
            const filesToDelete = getFilesToClean();
            if (options.dry) {
                reportStatus(Diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0, filesToDelete.map(f => `\r\n * ${f}`).join(""));
                return ExitStatus.Success;
            }

            for (const output of filesToDelete) {
                host.deleteFile(output);
            }

            return ExitStatus.Success;
        }

        function resolveProjectName(name: string): ResolvedConfigFileName {
            return resolveConfigFileProjectName(resolvePath(host.getCurrentDirectory(), name));
        }

        function resolveProjectNames(configFileNames: ReadonlyArray<string>): ResolvedConfigFileName[] {
            return configFileNames.map(resolveProjectName);
        }

        function buildAllProjects(): ExitStatus {
            if (options.watch) { reportWatchStatus(Diagnostics.Starting_compilation_in_watch_mode); }
            // TODO:: In watch mode as well to use caches for incremental build once we can invalidate caches correctly and have right api
            // Override readFile for json files and output .d.ts to cache the text
            const savedReadFileWithCache = readFileWithCache;
            const savedGetSourceFile = compilerHost.getSourceFile;

            const { originalReadFile, originalFileExists, originalDirectoryExists,
                originalCreateDirectory, originalWriteFile, getSourceFileWithCache,
                readFileWithCache: newReadFileWithCache
            } = changeCompilerHostLikeToUseCache(host, toPath, (...args) => savedGetSourceFile.call(compilerHost, ...args));
            readFileWithCache = newReadFileWithCache;
            compilerHost.getSourceFile = getSourceFileWithCache!;

            const graph = getGlobalDependencyGraph();
            reportBuildQueue(graph);
            let anyFailed = false;
            for (const next of graph.buildQueue) {
                const proj = parseConfigFile(next);
                if (proj === undefined) {
                    reportParseConfigFileDiagnostic(next);
                    anyFailed = true;
                    break;
                }

                // report errors early when using continue or break statements
                const errors = proj.errors;
                const status = getUpToDateStatus(proj);
                verboseReportProjectStatus(next, status);

                const projName = proj.options.configFilePath!;
                if (status.type === UpToDateStatusType.UpToDate && !options.force) {
                    reportAndStoreErrors(next, errors);
                    // Up to date, skip
                    if (defaultOptions.dry) {
                        // In a dry build, inform the user of this fact
                        reportStatus(Diagnostics.Project_0_is_up_to_date, projName);
                    }
                    continue;
                }

                if (status.type === UpToDateStatusType.UpToDateWithUpstreamTypes && !options.force) {
                    reportAndStoreErrors(next, errors);
                    // Fake build
                    updateOutputTimestamps(proj);
                    continue;
                }

                if (status.type === UpToDateStatusType.UpstreamBlocked) {
                    reportAndStoreErrors(next, errors);
                    if (options.verbose) reportStatus(Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors, projName, status.upstreamProjectName);
                    continue;
                }

                if (status.type === UpToDateStatusType.ContainerOnly) {
                    reportAndStoreErrors(next, errors);
                    // Do nothing
                    continue;
                }

                const buildResult = needsBuild(status, next) ?
                    buildSingleProject(next) : // Actual build
                    updateBundle(next); // Fake that files have been built by manipulating prepend and existing output

                anyFailed = anyFailed || !!(buildResult & BuildResultFlags.AnyErrors);
            }
            reportErrorSummary();
            host.readFile = originalReadFile;
            host.fileExists = originalFileExists;
            host.directoryExists = originalDirectoryExists;
            host.createDirectory = originalCreateDirectory;
            host.writeFile = originalWriteFile;
            compilerHost.getSourceFile = savedGetSourceFile;
            readFileWithCache = savedReadFileWithCache;
            return anyFailed ? ExitStatus.DiagnosticsPresent_OutputsSkipped : ExitStatus.Success;
        }

        function needsBuild(status: UpToDateStatus, configFile: ResolvedConfigFileName) {
            if (status.type !== UpToDateStatusType.OutOfDateWithPrepend || options.force) return true;
            const config = parseConfigFile(configFile);
            return !config ||
                config.fileNames.length === 0 ||
                !!config.errors.length ||
                !isIncrementalCompilation(config.options);
        }

        function reportParseConfigFileDiagnostic(proj: ResolvedConfigFileName) {
            reportAndStoreErrors(proj, [configFileCache.getValue(proj) as Diagnostic]);
        }

        function reportAndStoreErrors(proj: ResolvedConfigFileName, errors: ReadonlyArray<Diagnostic>) {
            reportErrors(errors);
            projectErrorsReported.setValue(proj, true);
            diagnostics.setValue(proj, errors);
        }

        function reportErrors(errors: ReadonlyArray<Diagnostic>) {
            errors.forEach(err => host.reportDiagnostic(err));
        }

        /**
         * Report the build ordering inferred from the current project graph if we're in verbose mode
         */
        function reportBuildQueue(graph: DependencyGraph) {
            if (options.verbose) {
                reportStatus(Diagnostics.Projects_in_this_build_Colon_0, graph.buildQueue.map(s => "\r\n    * " + relName(s)).join(""));
            }
        }

        function relName(path: string): string {
            return convertToRelativePath(path, host.getCurrentDirectory(), f => compilerHost.getCanonicalFileName(f));
        }

        /**
         * Report the up-to-date status of a project if we're in verbose mode
         */
        function verboseReportProjectStatus(configFileName: string, status: UpToDateStatus) {
            if (!options.verbose) return;
            return formatUpToDateStatus(configFileName, status, relName, reportStatus);
        }
    }

    export function resolveConfigFileProjectName(project: string): ResolvedConfigFileName {
        if (fileExtensionIs(project, Extension.Json)) {
            return project as ResolvedConfigFileName;
        }

        return combinePaths(project, "tsconfig.json") as ResolvedConfigFileName;
    }

    export function formatUpToDateStatus<T>(configFileName: string, status: UpToDateStatus, relName: (fileName: string) => string, formatMessage: (message: DiagnosticMessage, ...args: string[]) => T) {
        switch (status.type) {
            case UpToDateStatusType.OutOfDateWithSelf:
                return formatMessage(Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                    relName(configFileName),
                    relName(status.outOfDateOutputFileName),
                    relName(status.newerInputFileName));
            case UpToDateStatusType.OutOfDateWithUpstream:
                return formatMessage(Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                    relName(configFileName),
                    relName(status.outOfDateOutputFileName),
                    relName(status.newerProjectName));
            case UpToDateStatusType.OutputMissing:
                return formatMessage(Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                    relName(configFileName),
                    relName(status.missingOutputFileName));
            case UpToDateStatusType.UpToDate:
                if (status.newestInputFileTime !== undefined) {
                    return formatMessage(Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                        relName(configFileName),
                        relName(status.newestInputFileName || ""),
                        relName(status.oldestOutputFileName || ""));
                }
                // Don't report anything for "up to date because it was already built" -- too verbose
                break;
            case UpToDateStatusType.OutOfDateWithPrepend:
                return formatMessage(Diagnostics.Project_0_is_out_of_date_because_output_of_its_dependency_1_has_changed,
                    relName(configFileName),
                    relName(status.newerProjectName));
            case UpToDateStatusType.UpToDateWithUpstreamTypes:
                return formatMessage(Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
                    relName(configFileName));
            case UpToDateStatusType.UpstreamOutOfDate:
                return formatMessage(Diagnostics.Project_0_is_out_of_date_because_its_dependency_1_is_out_of_date,
                    relName(configFileName),
                    relName(status.upstreamProjectName));
            case UpToDateStatusType.UpstreamBlocked:
                return formatMessage(Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors,
                    relName(configFileName),
                    relName(status.upstreamProjectName));
            case UpToDateStatusType.Unbuildable:
                return formatMessage(Diagnostics.Failed_to_parse_file_0_Colon_1,
                    relName(configFileName),
                    status.reason);
            case UpToDateStatusType.TsVersionOutputOfDate:
                return formatMessage(Diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2,
                    relName(configFileName),
                    status.version,
                    version);
            case UpToDateStatusType.ContainerOnly:
                // Don't report status on "solution" projects
            case UpToDateStatusType.ComputingUpstream:
                // Should never leak from getUptoDateStatusWorker
                break;
            default:
                assertType<never>(status);
        }
    }
}
