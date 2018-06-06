namespace ts {
    /**
     * Branded string for keeping track of when we've turned an ambiguous path
     * specified like "./blah" to an absolute path to an actual
     * tsconfig file, e.g. "/root/blah/tsconfig.json"
     */
    export type ResolvedConfigFileName = string & { _isResolvedConfigFileName: never };

    const minimumDate = new Date(-8640000000000000);
    const maximumDate = new Date(8640000000000000);

    /**
     * A BuildContext tracks what's going on during the course of a build.
     *
     * Callers may invoke any number of build requests within the same context;
     * until the context is reset, each project will only be built at most once.
     *
     * Example: In a standard setup where project B depends on project A, and both are out of date,
     * a failed build of A will result in A remaining out of date. When we try to build
     * B, we should immediately bail instead of recomputing A's up-to-date status again.
     *
     * This also matters for performing fast (i.e. fake) downstream builds of projects
     * when their upstream .d.ts files haven't changed content (but have newer timestamps)
     */
    export interface BuildContext {
        options: BuildOptions;
        /**
         * Map from output file name to its pre-build timestamp
         */
        unchangedOutputs: FileMap<Date>;

        /**
         * Map from config file name to up-to-date status
         */
        projectStatus: FileMap<UpToDateStatus>;

        /**
         * Issue a verbose diagnostic message. No-ops when options.verbose is false.
         */
        verbose(diag: DiagnosticMessage, ...args: any[]): void;

        invalidatedProjects: FileMap<true>;
        queuedProjects: FileMap<true>;
        missingRoots: Map<true>;
    }

    type Mapper = ReturnType<typeof createDependencyMapper>;
    interface DependencyGraph {
        buildQueue: ResolvedConfigFileName[];
        dependencyMap: Mapper;
    }

    interface BuildOptions {
        dry: boolean;
        force: boolean;
        verbose: boolean;
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

        AnyErrors = ConfigFileErrors | SyntaxErrors | TypeErrors | DeclarationEmitErrors
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
        OutputMissing,
        OutOfDateWithSelf,
        OutOfDateWithUpstream,
        UpstreamOutOfDate,
        UpstreamBlocked,

        /**
         * Projects with no outputs (i.e. "solution" files)
         */
        ContainerOnly
    }

    export type UpToDateStatus =
        | Status.Unbuildable
        | Status.UpToDate
        | Status.OutputMissing
        | Status.OutOfDateWithSelf
        | Status.OutOfDateWithUpstream
        | Status.UpstreamOutOfDate
        | Status.UpstreamBlocked
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
            newestInputFileTime: Date;
            newestInputFileName: string;
            newestDeclarationFileContentChangedTime: Date;
            newestOutputFileTime: Date;
            newestOutputFileName: string;
            oldestOutputFileName: string;
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
         * One or more of the project's outputs is older than the newest output of
         * an upstream project.
         */
        export interface OutOfDateWithUpstream {
            type: UpToDateStatusType.OutOfDateWithUpstream;
            outOfDateOutputFileName: string;
            newerProjectName: string;
        }
    }

    interface FileMap<T> {
        setValue(fileName: string, value: T): void;
        getValue(fileName: string): T | never;
        getValueOrUndefined(fileName: string): T | undefined;
        hasKey(fileName: string): boolean;
        removeKey(fileName: string): void;
        getKeys(): string[];
    }

    /**
     * A FileMap maintains a normalized-key to value relationship
     */
    function createFileMap<T>(): FileMap<T> {
        // tslint:disable-next-line:no-null-keyword
        const lookup: { [key: string]: T } = Object.create(/*prototype*/ null);

        return {
            setValue,
            getValue,
            getValueOrUndefined,
            removeKey,
            getKeys,
            hasKey
        };

        function getKeys(): string[] {
            return Object.keys(lookup);
        }

        function hasKey(fileName: string) {
            return normalizePath(fileName) in lookup;
        }

        function removeKey(fileName: string) {
            delete lookup[fileName];
        }

        function setValue(fileName: string, value: T) {
            lookup[normalizePath(fileName)] = value;
        }

        function getValue(fileName: string): T | never {
            const f = normalizePath(fileName);
            if (f in lookup) {
                return lookup[f];
            }
            else {
                throw new Error(`No value corresponding to ${fileName} exists in this map`);
            }
        }

        function getValueOrUndefined(fileName: string): T | undefined {
            const f = normalizePath(fileName);
            if (f in lookup) {
                return lookup[f];
            }
            else {
                return undefined;
            }
        }
    }

    export function createDependencyMapper() {
        const childToParents: { [key: string]: ResolvedConfigFileName[] } = {};
        const parentToChildren: { [key: string]: ResolvedConfigFileName[] } = {};
        const allKeys: ResolvedConfigFileName[] = [];

        function addReference(childConfigFileName: ResolvedConfigFileName, parentConfigFileName: ResolvedConfigFileName): void {
            addEntry(childToParents, childConfigFileName, parentConfigFileName);
            addEntry(parentToChildren, parentConfigFileName, childConfigFileName);
        }

        function getReferencesTo(parentConfigFileName: ResolvedConfigFileName): ResolvedConfigFileName[] {
            return parentToChildren[normalizePath(parentConfigFileName)] || [];
        }

        function getReferencesOf(childConfigFileName: ResolvedConfigFileName): ResolvedConfigFileName[] {
            return childToParents[normalizePath(childConfigFileName)] || [];
        }

        function getKeys(): ReadonlyArray<ResolvedConfigFileName> {
            return allKeys;
        }

        function addEntry(mapToAddTo: typeof childToParents | typeof parentToChildren, key: ResolvedConfigFileName, element: ResolvedConfigFileName) {
            key = normalizePath(key) as ResolvedConfigFileName;
            element = normalizePath(element) as ResolvedConfigFileName;
            const arr = (mapToAddTo[key] = mapToAddTo[key] || []);
            if (arr.indexOf(element) < 0) {
                arr.push(element);
            }
            if (allKeys.indexOf(key) < 0) allKeys.push(key);
            if (allKeys.indexOf(element) < 0) allKeys.push(element);
        }

        return {
            addReference,
            getReferencesTo,
            getReferencesOf,
            getKeys
        };
    }

    function getOutputDeclarationFileName(inputFileName: string, configFile: ParsedCommandLine) {
        const relativePath = getRelativePathFromDirectory(rootDirOfOptions(configFile.options, configFile.options.configFilePath!), inputFileName, /*ignoreCase*/ true);
        const outputPath = resolvePath(configFile.options.declarationDir || configFile.options.outDir || getDirectoryPath(configFile.options.configFilePath!), relativePath);
        return changeExtension(outputPath, ".d.ts");
    }

    function getOutputJavaScriptFileName(inputFileName: string, configFile: ParsedCommandLine) {
        const relativePath = getRelativePathFromDirectory(rootDirOfOptions(configFile.options, configFile.options.configFilePath!), inputFileName, /*ignoreCase*/ true);
        const outputPath = resolvePath(configFile.options.outDir || getDirectoryPath(configFile.options.configFilePath!), relativePath);
        return changeExtension(outputPath, (fileExtensionIs(inputFileName, ".tsx") && configFile.options.jsx === JsxEmit.Preserve) ? ".jsx" : ".js");
    }

    function getOutputFileNames(inputFileName: string, configFile: ParsedCommandLine): ReadonlyArray<string> {
        if (configFile.options.outFile) {
            return emptyArray;
        }

        const outputs: string[] = [];
        outputs.push(getOutputJavaScriptFileName(inputFileName, configFile));
        if (configFile.options.declaration) {
            const dts = outputs.push(getOutputDeclarationFileName(inputFileName, configFile));
            if (configFile.options.declarationMap) {
                outputs.push(dts + ".map");
            }
        }
        return outputs;
    }

    function getOutFileOutputs(project: ParsedCommandLine): ReadonlyArray<string> {
        if (!project.options.outFile) {
            throw new Error("Assert - outFile must be set");
        }
        const outputs: string[] = [];
        outputs.push(project.options.outFile);
        if (project.options.declaration) {
            const dts = changeExtension(project.options.outFile, ".d.ts");
            outputs.push(dts);
            if (project.options.declarationMap) {
                outputs.push(dts + ".map");
            }
        }
        return outputs;
    }

    function rootDirOfOptions(opts: CompilerOptions, configFileName: string) {
        return opts.rootDir || getDirectoryPath(configFileName);
    }

    function createConfigFileCache(host: CompilerHost) {
        const cache = createFileMap<ParsedCommandLine>();
        const configParseHost = parseConfigHostFromCompilerHost(host);

        // TODO: Cache invalidation under --watch

        function parseConfigFile(configFilePath: ResolvedConfigFileName) {
            const sourceFile = host.getSourceFile(configFilePath, ScriptTarget.JSON) as JsonSourceFile;
            if (sourceFile === undefined) {
                return undefined;
            }

            const parsed = parseJsonSourceFileConfigFileContent(sourceFile, configParseHost, getDirectoryPath(configFilePath));
            parsed.options.configFilePath = configFilePath;
            cache.setValue(configFilePath, parsed);
            return parsed;
        }

        function removeKey(configFilePath: ResolvedConfigFileName) {
            cache.removeKey(configFilePath);
        }

        return {
            parseConfigFile,
            removeKey
        };
    }

    function newer(date1: Date, date2: Date): Date {
        return date2 > date1 ? date2 : date1;
    }

    function isDeclarationFile(fileName: string) {
        return fileExtensionIs(fileName, ".d.ts");
    }

    export function createBuildContext(options: BuildOptions, reportDiagnostic: DiagnosticReporter): BuildContext {
        const verboseDiag = options.verbose && reportDiagnostic;

        const invalidatedProjects = createFileMap<true>();
        const queuedProjects = createFileMap<true>();
        const missingRoots = createMap<true>();

        return {
            options,
            projectStatus: createFileMap(),
            unchangedOutputs: createFileMap(),
            verbose: verboseDiag ? (diag, ...args) => verboseDiag(createCompilerDiagnostic(diag, ...args)) : () => undefined,
            invalidatedProjects,
            missingRoots,
            queuedProjects
        };
    }

    const buildOpts: CommandLineOption[] = [
        {
            name: "verbose",
            shortName: "v",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Enable_verbose_logging,
            type: "boolean"
        },
        {
            name: "dry",
            shortName: "d",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Show_what_would_be_built_or_deleted_if_specified_with_clean,
            type: "boolean"
        },
        {
            name: "force",
            shortName: "f",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Build_all_projects_including_those_that_appear_to_be_up_to_date,
            type: "boolean"
        },
        {
            name: "clean",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Delete_the_outputs_of_all_projects,
            type: "boolean"
        },
        {
            name: "watch",
            category: Diagnostics.Command_line_Options,
            description: Diagnostics.Watch_input_files,
            type: "boolean"
        }
    ];

    export function performBuild(host: CompilerHost, reportDiagnostic: DiagnosticReporter, args: string[], system?: System) {
        let verbose = false;
        let dry = false;
        let force = false;
        let clean = false;
        let watch = false;

        const projects: string[] = [];
        for (const arg of args) {
            switch (arg.toLowerCase()) {
                case "-v":
                case "--verbose":
                    verbose = true;
                    continue;
                case "-d":
                case "--dry":
                    dry = true;
                    continue;
                case "-f":
                case "--force":
                    force = true;
                    continue;
                case "--clean":
                    clean = true;
                    continue;
                case "--watch":
                case "-w":
                    watch = true;
                    continue;

                case "--?":
                case "-?":
                case "--help":
                    return printHelp(buildOpts, "--build ");
            }
            // Not a flag, parse as filename
            addProject(arg);
        }

        // Nonsensical combinations
        if (clean && force) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "force"));
            return;
        }
        if (clean && verbose) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "verbose"));
            return;
        }
        if (clean && watch) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "clean", "watch"));
            return;
        }
        if (watch && dry) {
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.Options_0_and_1_cannot_be_combined, "watch", "dry"));
            return;
        }

        if (projects.length === 0) {
            // tsc -b invoked with no extra arguments; act as if invoked with "tsc -b ."
            addProject(".");
        }

        const builder = createSolutionBuilder(host, projects, reportDiagnostic, { verbose, dry, force }, system);
        if (clean) {
            builder.cleanAllProjects();
        }
        else {
            builder.buildAllProjects();
        }

        if (watch) {
            return builder.startWatching();
        }

        function addProject(projectSpecification: string) {
            const fileName = resolvePath(host.getCurrentDirectory(), projectSpecification);
            const refPath = resolveProjectReferencePath(host, { path: fileName });
            if (!refPath) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.File_0_does_not_exist, projectSpecification));
                return;
            }

            if (!host.fileExists(refPath)) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.File_0_does_not_exist, fileName));
            }
            projects.push(refPath);

        }
    }

    /**
     * A SolutionBuilder has an immutable set of rootNames that are the "entry point" projects, but
     * can dynamically add/remove other projects based on changes on the rootNames' references
     */
    export function createSolutionBuilder(host: CompilerHost, rootNames: ReadonlyArray<string>, reportDiagnostic: DiagnosticReporter, defaultOptions: BuildOptions, system?: System) {
        if (!host.getModifiedTime || !host.setModifiedTime) {
            throw new Error("Host must support timestamp APIs");
        }

        const configFileCache = createConfigFileCache(host);
        let context = createBuildContext(defaultOptions, reportDiagnostic);

        return {
            buildAllProjects,
            getUpToDateStatus,
            getUpToDateStatusOfFile,
            cleanAllProjects,
            resetBuildContext,
            getBuildGraph,

            invalidateProject,
            buildInvalidatedProjects,
            buildDependentInvalidatedProjects,

            resolveProjectName,

            startWatching
        };

        function startWatching() {
            if (!system) throw new Error("System host must be provided if using --watch");
            if (!system.watchFile || !system.watchDirectory || !system.setTimeout) throw new Error("System host must support watchFile / watchDirectory / setTimeout if using --watch");

            const graph = getGlobalDependencyGraph()!;
            for (const resolved of graph.buildQueue) {
                const cfg = configFileCache.parseConfigFile(resolved);
                if (cfg) {
                    for (const input of cfg.fileNames) {
                        system.watchFile(input, () => {
                            invalidateProject(resolved);
                            system.setTimeout!(buildInvalidatedProjects, 100);
                            system.setTimeout!(buildDependentInvalidatedProjects, 3000);
                        });
                    }
                }
            }
        }

        function resetBuildContext(opts = defaultOptions) {
            context = createBuildContext(opts, reportDiagnostic);
        }

        function getUpToDateStatusOfFile(configFileName: ResolvedConfigFileName): UpToDateStatus {
            return getUpToDateStatus(configFileCache.parseConfigFile(configFileName));
        }

        function getBuildGraph(configFileNames: ReadonlyArray<string>) {
            const resolvedNames: ResolvedConfigFileName[] | undefined = resolveProjectNames(configFileNames);
            if (resolvedNames === undefined) return undefined;

            return createDependencyGraph(resolvedNames);
        }

        function getGlobalDependencyGraph() {
            return getBuildGraph(rootNames);
        }

        function getUpToDateStatus(project: ParsedCommandLine | undefined): UpToDateStatus {
            if (project === undefined) {
                return { type: UpToDateStatusType.Unbuildable, reason: "File deleted mid-build" };
            }

            const prior = context.projectStatus.getValueOrUndefined(project.options.configFilePath!);
            if (prior !== undefined) {
                return prior;
            }
            const actual = getUpToDateStatusWorker(project);
            context.projectStatus.setValue(project.options.configFilePath!, actual);
            return actual;
        }

        function invalidateProject(configFileName: string) {
            const resolved = resolveProjectName(configFileName);
            if (resolved === undefined) {
                // If this was a rootName, we need to track it as missing.
                // Otherwise we can just ignore it and have it possibly surface as an error in any downstream projects,
                // if they exist

                // TODO: do those things
                return;
            }

            configFileCache.removeKey(resolved);
            context.invalidatedProjects.setValue(resolved, true);
            context.projectStatus.removeKey(resolved);

            const graph = getGlobalDependencyGraph()!;
            if (graph) {
                queueBuildForDownstreamReferences(resolved);
            }

            // Mark all downstream projects of this one needing to be built "later"
            function queueBuildForDownstreamReferences(root: ResolvedConfigFileName) {
                debugger;
                const deps = graph.dependencyMap.getReferencesTo(root);
                for (const ref of deps) {
                    // Can skip circular references
                    if (!context.queuedProjects.hasKey(ref)) {
                        context.queuedProjects.setValue(ref, true);
                        queueBuildForDownstreamReferences(ref);
                    }
                }
            }
        }

        function buildInvalidatedProjects() {
            buildSomeProjects(p => context.invalidatedProjects.hasKey(p));
        }

        function buildDependentInvalidatedProjects() {
            buildSomeProjects(p => context.queuedProjects.hasKey(p));
        }

        function buildSomeProjects(predicate: (projName: ResolvedConfigFileName) => boolean) {
            const resolvedNames: ResolvedConfigFileName[] | undefined = resolveProjectNames(rootNames);
            if (resolvedNames === undefined) return;

            const graph = createDependencyGraph(resolvedNames)!;
            for (const next of graph.buildQueue) {
                if (!predicate(next)) continue;

                const resolved = resolveProjectName(next);
                if (!resolved) continue; // ??
                const proj = configFileCache.parseConfigFile(resolved);
                if (!proj) continue; // ?

                const status = getUpToDateStatus(proj);
                reportProjectStatus(next, status);

                if (status.type === UpToDateStatusType.UpstreamBlocked) {
                    context.verbose(Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors, resolved, status.upstreamProjectName);
                    continue;
                }

                buildSingleProject(next);
            }
        }

        function getAllProjectOutputs(project: ParsedCommandLine): ReadonlyArray<string> {
            if (project.options.outFile) {
                return getOutFileOutputs(project);
            }
            else {
                const outputs: string[] = [];
                for (const inputFile of project.fileNames) {
                    outputs.push(...getOutputFileNames(inputFile, project));
                }
                return outputs;
            }
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

                const inputTime = host.getModifiedTime!(inputFile);
                if (inputTime > newestInputFileTime) {
                    newestInputFileName = inputFile;
                    newestInputFileTime = inputTime;
                }
            }

            // Collect the expected outputs of this project
            const outputs = getAllProjectOutputs(project);

            if (outputs.length === 0) {
                return {
                    type: UpToDateStatusType.ContainerOnly
                };
            }

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

                const outputTime = host.getModifiedTime!(output);
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
                    const unchangedTime = context.unchangedOutputs.getValueOrUndefined(output);
                    if (unchangedTime !== undefined) {
                        newestDeclarationFileContentChangedTime = newer(unchangedTime, newestDeclarationFileContentChangedTime);
                    }
                    else {
                        newestDeclarationFileContentChangedTime = newer(newestDeclarationFileContentChangedTime, host.getModifiedTime!(output));
                    }
                }
            }

            let pseudoUpToDate = false;
            if (project.projectReferences) {
                for (const ref of project.projectReferences) {
                    const resolvedRef = resolveProjectReferencePath(host, ref) as ResolvedConfigFileName;
                    const refStatus = getUpToDateStatus(configFileCache.parseConfigFile(resolvedRef));

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

                    // If the upstream project's newest file is older than our oldest output, we
                    // can't be out of date because of it
                    if (refStatus.newestInputFileTime <= oldestOutputFileTime) {
                        continue;
                    }

                    // If the upstream project has only change .d.ts files, and we've built
                    // *after* those files, then we're "psuedo up to date" and eligible for a fast rebuild
                    if (refStatus.newestDeclarationFileContentChangedTime <= oldestOutputFileTime) {
                        pseudoUpToDate = true;
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

        function createDependencyGraph(roots: ResolvedConfigFileName[]): DependencyGraph | undefined {
            const temporaryMarks: { [path: string]: true } = {};
            const permanentMarks: { [path: string]: true } = {};
            const circularityReportStack: string[] = [];
            const buildOrder: ResolvedConfigFileName[] = [];
            const graph = createDependencyMapper();

            let hadError = false;

            for (const root of roots) {
                visit(root);
            }

            if (hadError) {
                return undefined;
            }

            return {
                buildQueue: buildOrder,
                dependencyMap: graph
            };

            function visit(projPath: ResolvedConfigFileName, inCircularContext = false) {
                // Already visited
                if (permanentMarks[projPath]) return;
                // Circular
                if (temporaryMarks[projPath]) {
                    if (!inCircularContext) {
                        hadError = true;
                        reportDiagnostic(createCompilerDiagnostic(Diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0, circularityReportStack.join("\r\n")));
                        return;
                    }
                }

                temporaryMarks[projPath] = true;
                circularityReportStack.push(projPath);
                const parsed = configFileCache.parseConfigFile(projPath);
                if (parsed === undefined) {
                    hadError = true;
                    return;
                }
                if (parsed.projectReferences) {
                    for (const ref of parsed.projectReferences) {
                        const resolvedRefPath = resolveProjectName(ref.path);
                        if (resolvedRefPath === undefined) {
                            hadError = true;
                            break;
                        }
                        visit(resolvedRefPath, inCircularContext || ref.circular);
                        graph.addReference(projPath, resolvedRefPath);
                    }
                }

                circularityReportStack.pop();
                permanentMarks[projPath] = true;
                buildOrder.push(projPath);
            }
        }

        function buildSingleProject(proj: ResolvedConfigFileName): BuildResultFlags {
            if (context.options.dry) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.A_non_dry_build_would_build_project_0, proj));
                return BuildResultFlags.Success;
            }

            context.verbose(Diagnostics.Building_project_0, proj);

            let resultFlags = BuildResultFlags.None;
            resultFlags |= BuildResultFlags.DeclarationOutputUnchanged;

            const configFile = configFileCache.parseConfigFile(proj);
            if (!configFile) {
                // Failed to read the config file
                resultFlags |= BuildResultFlags.ConfigFileErrors;
                context.projectStatus.setValue(proj, { type: UpToDateStatusType.Unbuildable, reason: "Config file errors" });
                return resultFlags;
            }

            if (configFile.fileNames.length === 0) {
                // Nothing to build - must be a solution file, basically
                return BuildResultFlags.None;
            }

            const programOptions: CreateProgramOptions = {
                projectReferences: configFile.projectReferences,
                host,
                rootNames: configFile.fileNames,
                options: configFile.options
            };
            const program = createProgram(programOptions);

            // Don't emit anything in the presence of syntactic errors or options diagnostics
            const syntaxDiagnostics = [...program.getOptionsDiagnostics(), ...program.getSyntacticDiagnostics()];
            if (syntaxDiagnostics.length) {
                resultFlags |= BuildResultFlags.SyntaxErrors;
                for (const diag of syntaxDiagnostics) {
                    reportDiagnostic(diag);
                }
                context.projectStatus.setValue(proj, { type: UpToDateStatusType.Unbuildable, reason: "Syntactic errors" });
                return resultFlags;
            }

            // Don't emit .d.ts if there are decl file errors
            if (program.getCompilerOptions().declaration) {
                const declDiagnostics = program.getDeclarationDiagnostics();
                if (declDiagnostics.length) {
                    resultFlags |= BuildResultFlags.DeclarationEmitErrors;
                    for (const diag of declDiagnostics) {
                        reportDiagnostic(diag);
                    }
                    context.projectStatus.setValue(proj, { type: UpToDateStatusType.Unbuildable, reason: "Declaration file errors" });
                    return resultFlags;
                }
            }

            const semanticDiagnostics = [...program.getSemanticDiagnostics()];
            if (semanticDiagnostics.length) {
                resultFlags |= BuildResultFlags.TypeErrors;
                for (const diag of semanticDiagnostics) {
                    reportDiagnostic(diag);
                }
                context.projectStatus.setValue(proj, { type: UpToDateStatusType.Unbuildable, reason: "Semantic errors" });
                return resultFlags;
            }

            let newestDeclarationFileContentChangedTime = minimumDate;
            program.emit(/*targetSourceFile*/ undefined, (fileName, content, writeBom, onError) => {
                let priorChangeTime: Date | undefined;

                if (isDeclarationFile(fileName) && host.fileExists(fileName)) {
                    if (host.readFile(fileName) === content) {
                        // Check for unchanged .d.ts files
                        resultFlags &= ~BuildResultFlags.DeclarationOutputUnchanged;
                        priorChangeTime = host.getModifiedTime && host.getModifiedTime(fileName);
                    }
                }

                host.writeFile(fileName, content, writeBom, onError, emptyArray);
                if (priorChangeTime !== undefined) {
                    newestDeclarationFileContentChangedTime = newer(priorChangeTime, newestDeclarationFileContentChangedTime);
                    context.unchangedOutputs.setValue(fileName, priorChangeTime);
                }
            });

            context.projectStatus.setValue(proj, { type: UpToDateStatusType.UpToDate, newestDeclarationFileContentChangedTime } as UpToDateStatus);
            return resultFlags;
        }

        function updateOutputTimestamps(proj: ParsedCommandLine) {
            if (context.options.dry) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.A_non_dry_build_would_build_project_0, proj.options.configFilePath));
                return;
            }

            context.verbose(Diagnostics.Updating_output_timestamps_of_project_0, proj.options.configFilePath);
            const now = new Date();
            const outputs = getAllProjectOutputs(proj);
            let priorNewestUpdateTime = minimumDate;
            for (const file of outputs) {
                if (isDeclarationFile(file)) {
                    priorNewestUpdateTime = newer(priorNewestUpdateTime, host.getModifiedTime!(file));
                }
                host.setModifiedTime!(file, now);
            }

            context.projectStatus.setValue(proj.options.configFilePath!, { type: UpToDateStatusType.UpToDate, newestDeclarationFileContentChangedTime: priorNewestUpdateTime } as UpToDateStatus);
        }

        function getFilesToClean(configFileNames: ReadonlyArray<ResolvedConfigFileName>): string[] | undefined {
            const resolvedNames: ResolvedConfigFileName[] | undefined = resolveProjectNames(configFileNames);
            if (resolvedNames === undefined) return undefined;

            // Get the same graph for cleaning we'd use for building
            const graph = createDependencyGraph(resolvedNames);
            if (graph === undefined) return undefined;

            const filesToDelete: string[] = [];
            for (const proj of graph.buildQueue) {
                const parsed = configFileCache.parseConfigFile(proj);
                if (parsed === undefined) {
                    // File has gone missing; fine to ignore here
                    continue;
                }
                const outputs = getAllProjectOutputs(parsed);
                for (const output of outputs) {
                    if (host.fileExists(output)) {
                        filesToDelete.push(output);
                    }
                }
            }
            return filesToDelete;
        }

        function getAllProjectsInScope(): ReadonlyArray<ResolvedConfigFileName> | undefined {
            const resolvedNames = resolveProjectNames(rootNames);
            if (resolvedNames === undefined) return undefined;
            const graph = createDependencyGraph(resolvedNames);
            if (graph === undefined) return undefined;
            return graph.buildQueue;
        }

        function cleanAllProjects() {
            const resolvedNames: ReadonlyArray<ResolvedConfigFileName> | undefined = getAllProjectsInScope();
            if (resolvedNames === undefined) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Skipping_clean_because_not_all_projects_could_be_located));
                return;
            }

            const filesToDelete = getFilesToClean(resolvedNames);
            if (filesToDelete === undefined) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Skipping_clean_because_not_all_projects_could_be_located));
                return;
            }

            if (context.options.dry) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0, filesToDelete.map(f => `\r\n * ${f}`).join("")));
            }
            else {
                if (!host.deleteFile) {
                    throw new Error("Host does not support deleting files");
                }

                for (const output of filesToDelete) {
                    host.deleteFile(output);
                }
            }
        }

        function resolveProjectName(name: string): ResolvedConfigFileName | undefined {
            let fullPath = resolvePath(host.getCurrentDirectory(), name);
            if (host.fileExists(fullPath)) {
                return fullPath as ResolvedConfigFileName;
            }
            fullPath = combinePaths(fullPath, "tsconfig.json");
            if (host.fileExists(fullPath)) {
                return fullPath as ResolvedConfigFileName;
            }
            reportDiagnostic(createCompilerDiagnostic(Diagnostics.File_0_not_found, fullPath));
            return undefined;
        }

        function resolveProjectNames(configFileNames: ReadonlyArray<string>): ResolvedConfigFileName[] | undefined {
            const resolvedNames: ResolvedConfigFileName[] = [];
            for (const name of configFileNames) {
                const resolved = resolveProjectName(name);
                if (resolved === undefined) {
                    return undefined;
                }
                resolvedNames.push(resolved);
            }
            return resolvedNames;
        }

        function buildAllProjects() {
            const graph = getGlobalDependencyGraph();
            if (graph === undefined) return;

            const queue = graph.buildQueue;
            reportBuildQueue(graph);

            for (const next of queue) {
                const proj = configFileCache.parseConfigFile(next);
                if (proj === undefined) {
                    break;
                }
                const status = getUpToDateStatus(proj);
                reportProjectStatus(next, status);

                const projName = proj.options.configFilePath;
                if (status.type === UpToDateStatusType.UpToDate && !context.options.force) {
                    // Up to date, skip
                    if (defaultOptions.dry) {
                        // In a dry build, inform the user of this fact
                        reportDiagnostic(createCompilerDiagnostic(Diagnostics.Project_0_is_up_to_date, projName));
                    }
                    continue;
                }

                if (status.type === UpToDateStatusType.UpToDateWithUpstreamTypes && !context.options.force) {
                    // Fake build
                    updateOutputTimestamps(proj);
                    continue;
                }

                if (status.type === UpToDateStatusType.UpstreamBlocked) {
                    context.verbose(Diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors, projName, status.upstreamProjectName);
                    continue;
                }

                if (status.type === UpToDateStatusType.ContainerOnly) {
                    // Do nothing
                    continue;
                }

                buildSingleProject(next);
            }
        }

        /**
         * Report the build ordering inferred from the current project graph if we're in verbose mode
         */
        function reportBuildQueue(graph: DependencyGraph) {
            if (!context.options.verbose) return;

            const names: string[] = [];
            for (const name of graph.buildQueue) {
                names.push(name);
            }
            context.verbose(Diagnostics.Projects_in_this_build_Colon_0, names.map(s => "\r\n    * " + relName(s)).join(""));
        }

        function relName(path: string): string {
            return convertToRelativePath(path, host.getCurrentDirectory(), f => host.getCanonicalFileName(f));
        }

        /**
         * Report the up-to-date status of a project if we're in verbose mode
         */
        function reportProjectStatus(configFileName: string, status: UpToDateStatus) {
            if (!context.options.verbose) return;
            switch (status.type) {
                case UpToDateStatusType.OutOfDateWithSelf:
                    return context.verbose(Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                        relName(configFileName),
                        relName(status.outOfDateOutputFileName),
                        relName(status.newerInputFileName));
                case UpToDateStatusType.OutOfDateWithUpstream:
                    return context.verbose(Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2,
                        relName(configFileName),
                        relName(status.outOfDateOutputFileName),
                        relName(status.newerProjectName));
                case UpToDateStatusType.OutputMissing:
                    return context.verbose(Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist,
                        relName(configFileName),
                        relName(status.missingOutputFileName));
                case UpToDateStatusType.UpToDate:
                    if (status.newestInputFileTime !== undefined) {
                        return context.verbose(Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2,
                            relName(configFileName),
                            relName(status.newestInputFileName),
                            relName(status.oldestOutputFileName));
                    }
                    // Don't report anything for "up to date because it was already built" -- too verbose
                    break;
                case UpToDateStatusType.UpToDateWithUpstreamTypes:
                    return context.verbose(Diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies,
                        relName(configFileName));
                case UpToDateStatusType.UpstreamOutOfDate:
                    return context.verbose(Diagnostics.Project_0_is_out_of_date_because_its_dependency_1_is_out_of_date,
                        relName(configFileName),
                        relName(status.upstreamProjectName));
                case UpToDateStatusType.UpstreamBlocked:
                    return context.verbose(Diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors,
                        relName(configFileName),
                        relName(status.upstreamProjectName));
                case UpToDateStatusType.Unbuildable:
                    return context.verbose(Diagnostics.Failed_to_parse_file_0_Colon_1,
                        relName(configFileName),
                        status.reason);
                case UpToDateStatusType.ContainerOnly:
                    // Don't report status on "solution" projects
                    break;
                default:
                    assertTypeIsNever(status);
            }
        }
    }
}
