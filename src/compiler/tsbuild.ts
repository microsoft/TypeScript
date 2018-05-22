namespace ts {
    const minimumDate = new Date(-8640000000000000);
    const maximumDate = new Date(8640000000000000);

    /**
     * A BuildContext tracks what's going on during the course of a build.
     * The primary thing we track here is which files were written to,
     * but unchanged, because this enables fast downstream updates
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

        verbose(diag: DiagnosticMessage, ...args: any[]): void;
    }

    type Mapper = ReturnType<typeof createDependencyMapper>;
    interface DependencyGraph {
        buildQueue: string[][];
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

    enum UpToDateStatusType {
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
        UpstreamOutOfDate
    }

    type UpToDateStatus =
        | StatusUnbuildable
        | StatusUpToDate
        | StatusOutputMissing
        | StatusOutOfDateWithSelf
        | StatusOutOfDateWithUpstream
        | StatusUpstreamOutOfDate;

    /**
     * The project can't be built at all in its current state. For example,
     * its config file cannot be parsed, or it has a syntax error or missing file
     */
    interface StatusUnbuildable {
        type: UpToDateStatusType.Unbuildable;
        reason: string;
    }

    /**
     * The project is up to date with respect to its inputs.
     * We track what the newest input file is.
     */
    interface StatusUpToDate {
        type: UpToDateStatusType.UpToDate | UpToDateStatusType.UpToDateWithUpstreamTypes;
        newestInputFileTime: Date;
        newestDeclarationFileContentChangedTime: Date;
        newestOutputFileTime: Date;
    }

    /**
     * One or more of the outputs of the project does not exist.
     */
    interface StatusOutputMissing {
        type: UpToDateStatusType.OutputMissing;
        /**
         * The name of the first output file that didn't exist
         */
        missingOutputFileName: string;
    }

    /**
     * One or more of the project's outputs is older than its newest input.
     */
    interface StatusOutOfDateWithSelf {
        type: UpToDateStatusType.OutOfDateWithSelf;
        outOfDateOutputFileName: string;
        newerInputFileName: string;
    }

    /**
     * This project depends on an out-of-date project, so shouldn't be built yet
     */
    interface StatusUpstreamOutOfDate {
        type: UpToDateStatusType.UpstreamOutOfDate;
        upstreamProjectName: string;
    }

    /**
     * One or more of the project's outputs is older than the newest output of
     * an upstream project.
     */
    interface StatusOutOfDateWithUpstream {
        type: UpToDateStatusType.OutOfDateWithUpstream;
        outOfDateOutputFileName: string;
        newerProjectName: string;
    }

    interface FileMap<T> {
        setValue(fileName: string, value: T): void;
        getValue(fileName: string): T | never;
        getValueOrUndefined(fileName: string): T | undefined;
        getValueOrDefault(fileName: string, defaultValue: T): T;
        tryGetValue(fileName: string): [false, undefined] | [true, T];
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
            getValueOrDefault,
            tryGetValue
        };

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

        function getValueOrDefault(fileName: string, defaultValue: T): T {
            const f = normalizePath(fileName);
            if (f in lookup) {
                return lookup[f];
            }
            else {
                return defaultValue;
            }
        }

        function tryGetValue(fileName: string): [false, undefined] | [true, T] {
            const f = normalizePath(fileName);
            if (f in lookup) {
                return [true as true, lookup[f]];
            }
            else {
                return [false as false, undefined];
            }
        }
    }

    export function createDependencyMapper() {
        const childToParents: { [key: string]: string[] } = {};
        const parentToChildren: { [key: string]: string[] } = {};
        const allKeys: string[] = [];

        function addReference(childConfigFileName: string, parentConfigFileName: string): void {
            addEntry(childToParents, childConfigFileName, parentConfigFileName);
            addEntry(parentToChildren, parentConfigFileName, childConfigFileName);
        }

        function getReferencesTo(parentConfigFileName: string): string[] {
            return parentToChildren[normalizePath(parentConfigFileName)] || [];
        }

        function getReferencesOf(childConfigFileName: string): string[] {
            return childToParents[normalizePath(childConfigFileName)] || [];
        }

        function getKeys(): ReadonlyArray<string> {
            return allKeys;
        }

        function addEntry(mapToAddTo: typeof childToParents | typeof parentToChildren, key: string, element: string) {
            key = normalizePath(key);
            element = normalizePath(element);
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
        const relativePath = getRelativePathFromDirectory(rootDirOfOptions(configFile.options, configFile.options.configFilePath), inputFileName, /*ignoreCase*/ true);
        const outputPath = resolvePath(configFile.options.declarationDir || configFile.options.outDir || getDirectoryPath(configFile.options.configFilePath), relativePath);
        return changeExtension(outputPath, ".d.ts");
    }

    function getOutputJavaScriptFileName(inputFileName: string, configFile: ParsedCommandLine) {
        // TODO handle JSX: Preserve
        const relativePath = getRelativePathFromDirectory(rootDirOfOptions(configFile.options, configFile.options.configFilePath), inputFileName, /*ignoreCase*/ true);
        const outputPath = resolvePath(configFile.options.outDir || getDirectoryPath(configFile.options.configFilePath), relativePath);
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
        Debug.assert(!!project.options.outFile, "outFile must be set");
        const outputs: string[] = [];
        outputs.push(project.options.outFile);
        if (project.options.declaration) {
            const dts = outputs.push(changeExtension(project.options.outFile, ".d.ts"));
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

        // TODO: Cache invalidation under --watch!

        function parseConfigFile(configFilePath: string) {
            const sourceFile = host.getSourceFile(configFilePath, ScriptTarget.JSON) as JsonSourceFile;
            if (sourceFile === undefined) {
                return undefined;
            }
            const parsed = parseJsonSourceFileConfigFileContent(sourceFile, configParseHost, getDirectoryPath(configFilePath));
            parsed.options.configFilePath = configFilePath;
            cache.setValue(configFilePath, parsed);
            return parsed;
        }

        return {
            parseConfigFile
        };
    }

    function newer(date1: Date, date2: Date): Date {
        return date2 > date1 ? date2 : date1;
    }

    function older(date1: Date, date2: Date): Date {
        return date2 < date1 ? date2 : date1;
    }

    function isDeclarationFile(fileName: string) {
        return fileExtensionIs(fileName, ".d.ts");
    }

    export function createBuildContext(options: BuildOptions): BuildContext {
        const verboseDiag = options.verbose && createDiagnosticReporter(sys, /*pretty*/ false);
        return {
            options,
            projectStatus: createFileMap(),
            unchangedOutputs: createFileMap(),
            verbose: options.verbose ? (diag, ...args) => {
                verboseDiag(createCompilerDiagnostic(diag, ...args));
            } : () => undefined
        };
    }

    export function performBuild(host: CompilerHost, reportDiagnostic: DiagnosticReporter, args: string[]) {
        let verbose = false;
        let dry = false;
        let force = false;
        let clean = false;

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
            }
            // Not a flag, parse as filename
            addProject(arg);
        }

        if (projects.length === 0) {
            // tsc -b invoked with no extra arguments; act as if invoked with "tsc -b ."
            addProject(".");
        }

        const context = createBuildContext({ verbose, dry, force });
        const builder = createSolutionBuilder(host, reportDiagnostic, context);
        if (clean) {
            builder.cleanProjects(projects);
        }
        else {
            builder.buildProjects(projects);
        }

        function addProject(projectSpecification: string) {
            const fileName = resolvePath(host.getCurrentDirectory(), projectSpecification);
            const refPath = resolveProjectReferencePath(host, { path: fileName });
            if (!host.fileExists(refPath)) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.File_0_does_not_exist, fileName));
            }
            projects.push(refPath);

        }
    }

    export function createSolutionBuilder(host: CompilerHost, reportDiagnostic: DiagnosticReporter, context: BuildContext) {
        const configFileCache = createConfigFileCache(host);

        return {
            getUpToDateStatus,
            buildProjects,
            cleanProjects
        };

        function getUpToDateStatus(project: ParsedCommandLine, context: BuildContext): UpToDateStatus {
            const prior = context.projectStatus.getValueOrUndefined(project.options.configFilePath);
            if (prior !== undefined) {
                return prior;
            }
            const actual = getUpToDateStatusWorker(project);
            context.projectStatus.setValue(project.options.configFilePath, actual);
            return actual;
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

                const inputTime = host.getModifiedTime(inputFile);
                if (inputTime > newestInputFileTime) {
                    newestInputFileName = inputFile;
                    newestInputFileTime = inputTime;
                }
            }

            // Collect the expected outputs of this project
            const outputs = getAllProjectOutputs(project);

            // Now see if all outputs are newer than the newest input
            let oldestOutputFileName: string = undefined!;
            let oldestOutputFileTime: Date = maximumDate;
            let newestOutputFileTime: Date = minimumDate;
            let newestDeclarationFileContentChangedTime: Date = minimumDate;
            for (const output of outputs) {
                // Output is missing
                if (!host.fileExists(output)) {
                    return {
                        type: UpToDateStatusType.OutputMissing,
                        missingOutputFileName: output
                    };
                }

                const outputTime = host.getModifiedTime(output);
                // If an output is older than the newest input, we can stop checking
                if (outputTime < newestInputFileTime) {
                    return {
                        type: UpToDateStatusType.OutOfDateWithSelf,
                        outOfDateOutputFileName: output,
                        newerInputFileName: newestInputFileName
                    };
                }

                if (outputTime < oldestOutputFileTime) {
                    oldestOutputFileTime = outputTime;
                    oldestOutputFileName = output;
                }
                newestOutputFileTime = older(newestOutputFileTime, outputTime);

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
                        newestDeclarationFileContentChangedTime = newer(newestDeclarationFileContentChangedTime, host.getModifiedTime(output));
                    }
                }
            }

            let pseudoUpToDate = false;
            // By here, we know the project is at least up-to-date with its own inputs.
            // See if any of its upstream projects are newer than it
            if (project.projectReferences) {
                for (const ref of project.projectReferences) {
                    const resolvedRef = resolveProjectReferencePath(host, ref);
                    const refStatus = getUpToDateStatus(configFileCache.parseConfigFile(resolvedRef), context);

                    // If the upstream project is out of date, then so are we (someone shouldn't have asked, though?)
                    if (refStatus.type !== UpToDateStatusType.UpToDate) {
                        return {
                            type: UpToDateStatusType.UpstreamOutOfDate,
                            upstreamProjectName: ref.path
                        };
                    }

                    // If the upstream project's newest file is older than our oldest output, we
                    // can't be out of date because of it
                    if (refStatus.newestInputFileTime < oldestOutputFileTime) {
                        continue;
                    }

                    // If the upstream project has only change .d.ts files, and we've built
                    // *after* those files, then we're "psuedo up to date" and eligible for a fast rebuild
                    if (refStatus.newestDeclarationFileContentChangedTime < oldestOutputFileTime) {
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

            // Up to date
            return {
                type: pseudoUpToDate ? UpToDateStatusType.UpToDateWithUpstreamTypes : UpToDateStatusType.UpToDate,
                newestDeclarationFileContentChangedTime,
                newestInputFileTime,
                newestOutputFileTime
            };
        }

        // TODO: Use the better algorithm
        function createDependencyGraph(roots: string[]): DependencyGraph {
            // This is a list of list of projects that need to be built.
            // The ordering here is "backwards", i.e. the first entry in the array is the last set of projects that need to be built;
            //   and the last entry is the first set of projects to be built.
            // Each subarray is effectively unordered.
            // We traverse the reference graph from each root, then "clean" the list by removing
            //   any entry that is duplicated to its right.
            const buildQueue: string[][] = [];
            const dependencyMap = createDependencyMapper();
            let buildQueuePosition = 0;
            for (const root of roots) {
                const config = configFileCache.parseConfigFile(root);
                if (config === undefined) {
                    reportDiagnostic(createCompilerDiagnostic(Diagnostics.File_0_does_not_exist, root));
                    continue;
                }
                enumerateReferences(normalizePath(root), config);
            }
            removeDuplicatesFromBuildQueue(buildQueue);

            return {
                buildQueue,
                dependencyMap
            };

            function enumerateReferences(fileName: string, root: ParsedCommandLine): void {
                const myBuildLevel = buildQueue[buildQueuePosition] = buildQueue[buildQueuePosition] || [];
                if (myBuildLevel.indexOf(fileName) < 0) {
                    myBuildLevel.push(fileName);
                }

                const refs = root.projectReferences;
                if (refs === undefined) return;
                buildQueuePosition++;
                for (const ref of refs) {
                    const actualPath = resolveProjectReferencePath(host, ref);
                    dependencyMap.addReference(fileName, actualPath);
                    const resolvedRef = configFileCache.parseConfigFile(actualPath);
                    if (resolvedRef === undefined) continue;
                    enumerateReferences(normalizePath(actualPath), resolvedRef);
                }
                buildQueuePosition--;
            }

            /**
             * Removes entries from arrays which appear in later arrays.
             * TODO: Use a lookup object to optimize this a bit?
             */
            function removeDuplicatesFromBuildQueue(queue: string[][]): void {
                // No need to check the last array
                for (let i = 0; i < queue.length - 1; i++) {
                    queue[i] = queue[i].filter(fn => !occursAfter(fn, i + 1));
                }

                function occursAfter(s: string, start: number) {
                    for (let i = start; i < queue.length; i++) {
                        if (queue[i].indexOf(s) >= 0) return true;
                    }
                    return false;
                }
            }
        }

        // TODO Accept parsedCommandLine
        function buildSingleProject(proj: string) {
            if (context.options.dry) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Would_build_project_0, proj));
            }

            context.verbose(Diagnostics.Building_project_0, proj);

            let resultFlags = BuildResultFlags.None;
            resultFlags |= BuildResultFlags.DeclarationOutputUnchanged;

            const configFile = configFileCache.parseConfigFile(proj);
            if (!configFile) {
                // Failed to read the config file
                resultFlags |= BuildResultFlags.ConfigFileErrors;
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
                    return resultFlags;
                }
            }

            const semanticDiagnostics = [...program.getSemanticDiagnostics()];
            if (semanticDiagnostics.length) {
                resultFlags |= BuildResultFlags.TypeErrors;
                for (const diag of semanticDiagnostics) {
                    reportDiagnostic(diag);
                }
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
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Would_build_project_0, proj.options.configFilePath));
                return;
            }

            context.verbose(Diagnostics.Updating_output_timestamps_of_project_0, proj.options.configFilePath);
            const now = new Date();
            const outputs = getAllProjectOutputs(proj);
            let priorNewestUpdateTime = minimumDate;
            for (const file of outputs) {
                if (isDeclarationFile(file)) {
                    priorNewestUpdateTime = newer(priorNewestUpdateTime, host.getModifiedTime(file));
                }
                host.setModifiedTime(file, now);
            }

            context.projectStatus.setValue(proj.options.configFilePath, { type: UpToDateStatusType.UpToDate, newestDeclarationFileContentChangedTime: priorNewestUpdateTime } as UpToDateStatus);
        }

        function cleanProjects(configFileNames: string[]) {
            // Get the same graph for cleaning we'd use for building
            const graph = createDependencyGraph(configFileNames);

            const fileReport: string[] = [];
            for (const level of graph.buildQueue) {
                for (const proj of level) {
                    const parsed = configFileCache.parseConfigFile(proj);
                    const outputs = getAllProjectOutputs(parsed);
                    for (const output of outputs) {
                        if (host.fileExists(output)) {
                            if (context.options.dry) {
                                fileReport.push(output);
                            }
                            else {
                                host.deleteFile(output);
                            }
                        }
                    }
                }
            }

            if (context.options.dry) {
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.Would_delete_the_following_files_Colon_0, fileReport.map(f => `\r\n * ${f}`).join("")));
            }
        }

        function buildProjects(configFileNames: string[]) {
            const resolvedNames: string[] = [];
            for (const name of configFileNames) {
                let fullPath = resolvePath(host.getCurrentDirectory(), name);
                if (host.fileExists(fullPath)) {
                    resolvedNames.push(fullPath);
                    continue;
                }
                fullPath = combinePaths(fullPath, "tsconfig.json");
                if (host.fileExists(fullPath)) {
                    resolvedNames.push(fullPath);
                    continue;
                }
                reportDiagnostic(createCompilerDiagnostic(Diagnostics.File_0_not_found, fullPath));
                return;
            }

            // Establish what needs to be built
            const graph = createDependencyGraph(resolvedNames);

            const queue = graph.buildQueue;
            reportBuildQueue(graph);

            let next: string;
            while (next = getNext()) {
                const proj = configFileCache.parseConfigFile(next);
                const status = getUpToDateStatus(proj, context);
                reportProjectStatus(next, status);

                if (status.type === UpToDateStatusType.UpToDate && !context.options.force) {
                    // Up to date, skip
                    continue;
                }

                if (status.type === UpToDateStatusType.UpToDateWithUpstreamTypes && !context.options.force) {
                    // Fake build
                    updateOutputTimestamps(proj);
                    continue;
                }

                const result = buildSingleProject(next);
                if (result & BuildResultFlags.AnyErrors) {
                    break;
                }
            }

            function getNext(): string | undefined {
                if (queue.length === 0) {
                    return undefined;
                }
                while (queue.length > 0) {
                    const last = queue[queue.length - 1];
                    if (last.length === 0) {
                        queue.pop();
                        continue;
                    }
                    return last.pop()!;
                }
                return undefined;
            }
        }

        function reportBuildQueue(graph: DependencyGraph) {
            if (!context.options.verbose) return;

            const names: string[] = [];
            for (const level of graph.buildQueue) {
                for (const el of level) {
                    names.push(el);
                }
            }
            names.reverse();
            context.verbose(Diagnostics.Sorted_list_of_input_projects_Colon_0, names.map(s => "\r\n    * " + s).join(""));
        }

        function reportProjectStatus(configFileName: string, status: UpToDateStatus) {
            if (!context.options.verbose) return;
            switch (status.type) {
                case UpToDateStatusType.OutOfDateWithSelf:
                    context.verbose(Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, configFileName, status.outOfDateOutputFileName, status.newerInputFileName);
                    return;
                case UpToDateStatusType.OutOfDateWithUpstream:
                    context.verbose(Diagnostics.Project_0_is_out_of_date_because_oldest_output_1_is_older_than_newest_input_2, configFileName, status.outOfDateOutputFileName, status.newerProjectName);
                    return;
                case UpToDateStatusType.OutputMissing:
                    context.verbose(Diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, configFileName, status.missingOutputFileName);
                    return;
                case UpToDateStatusType.UpToDate:
                    context.verbose(Diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_oldest_output_2, configFileName, status.newestDeclarationFileContentChangedTime as any, status.newestOutputFileTime);
                    return;
                case UpToDateStatusType.UpToDateWithUpstreamTypes:
                    context.verbose(Diagnostics.Project_0_is_up_to_date_with_its_upstream_types, configFileName);
                    return;
                    case UpToDateStatusType.UpstreamOutOfDate:
                    context.verbose(Diagnostics.Project_0_is_up_to_date_with_its_upstream_types, configFileName);
                    return;
                default:
                    throw new Error(`Invalid build status - ${UpToDateStatusType[status.type]}`);
            }
        }
    }
}
