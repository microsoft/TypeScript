namespace ts {
    const minimumDate = new Date(-8640000000000000);
    const maximumDate = new Date(8640000000000000);

    /**
     * A BuildContext tracks what's going on during the course of a build.
     * The primary thing we track here is which files were written to,
     * but unchanged, because this enables fast downstream updates
     */
    interface BuildContext {
        /**
         * Map from output file name to its pre-build timestamp
         */
        unchangedOutputs: FileMap<Date>;

        /**
         * Map from config file name to up-to-date status
         */
        projectStatus: FileMap<UpToDateStatus>;
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
         * but all of its outputs are actually newer than the previous identical outputs of its inputs.
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
        return opts.rootDir || path.dirname(configFileName);
    }

    function createConfigFileCache(host: CompilerHost) {
        const cache = createFileMap<ParsedCommandLine>();
        const configParseHost = parseConfigHostFromCompilerHost(host);

        // TODO: Cache invalidation!

        function parseConfigFile(configFilePath: string) {
            const sourceFile = host.getSourceFile(configFilePath, ScriptTarget.JSON) as JsonSourceFile;
            const parsed = parseJsonSourceFileConfigFileContent(sourceFile, configParseHost, configFilePath);
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

    function createSolutionBuilder(host: CompilerHost) {
        const configFileCache = createConfigFileCache(host);

        function getUpToDateStatus(project: ParsedCommandLine, context: BuildContext): UpToDateStatus {
            const prior = context.projectStatus.getValueOrUndefined(project.options.configFilePath);
            if (prior !== undefined) {
                return prior;
            }
            const actual = getUpToDateStatusWorker(project, context);
            context.projectStatus.setValue(project.options.configFilePath, actual);
            return actual;
        }

        function getUpToDateStatusWorker(project: ParsedCommandLine, context: BuildContext): UpToDateStatus {
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

                const inputTime = sys.getModifiedTime(inputFile);
                if (inputTime > newestInputFileTime) {
                    newestInputFileName = inputFile;
                    newestInputFileTime = inputTime;
                }
            }

            // Collect the expected outputs of this project
            let outputs: ReadonlyArray<string>;
            if (project.options.outFile) {
                outputs = getOutFileOutputs(project);
            }
            else {
                outputs = [];
                for (const inputFile of project.fileNames) {
                    (outputs as string[]).push(...getOutputFileNames(inputFile, project));
                }
            }

            // Now see if all outputs are newer than the newest input
            let oldestOutputFileName: string = undefined!;
            let oldestOutputFileTime: Date = minimumDate;
            let newestOutputFileTime: Date = maximumDate;
            let newestDeclarationFileContentChangedTime: Date = minimumDate;
            for (const output of outputs) {
                // Output is missing
                if (!host.fileExists(output)) {
                    return {
                        type: UpToDateStatusType.OutputMissing,
                        missingOutputFileName: output
                    };
                }

                const outputTime = sys.getModifiedTime(output);
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
                if (fileExtensionIs(output, ".d.ts")) {
                    const unchangedTime = context.unchangedOutputs.getValueOrUndefined(output);
                    if (unchangedTime !== undefined) {
                        newestDeclarationFileContentChangedTime = newer(unchangedTime, newestDeclarationFileContentChangedTime);
                    }
                    else {
                        newestDeclarationFileContentChangedTime = newer(newestDeclarationFileContentChangedTime, sys.getModifiedTime(output));
                    }
                }
            }

            let pseudoUpToDate = false;
            // By here, we know the project is at least up-to-date with its own inputs.
            // See if any of its upstream projects are newer than it
            for (const ref of project.projectReferences) {
                const refStatus = getUpToDateStatus(configFileCache.parseConfigFile(ref.path), context);

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
                return {
                    type: UpToDateStatusType.OutOfDateWithUpstream,
                    outOfDateOutputFileName: oldestOutputFileName,
                    newerProjectName: ref.path
                };
            }

            // Up to date
            return {
                type: pseudoUpToDate ? UpToDateStatusType.UpToDateWithUpstreamTypes : UpToDateStatusType.UpToDate,
                newestDeclarationFileContentChangedTime,
                newestInputFileTime,
                newestOutputFileTime
            };
        }

        return {
            getUpToDateStatus
        };
    }
}
