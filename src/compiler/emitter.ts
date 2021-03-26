namespace ts {
    const brackets = createBracketsMap();

    /*@internal*/
    export function isBuildInfoFile(file: string) {
        return fileExtensionIs(file, Extension.TsBuildInfo);
    }

    /*@internal*/
    /**
     * Iterates over the source files that are expected to have an emit output.
     *
     * @param host An EmitHost.
     * @param action The action to execute.
     * @param sourceFilesOrTargetSourceFile
     *   If an array, the full list of source files to emit.
     *   Else, calls `getSourceFilesToEmit` with the (optional) target source file to determine the list of source files to emit.
     */
    export function forEachEmittedFile<T>(
        host: EmitHost, action: (emitFileNames: EmitFileNames, sourceFileOrBundle: SourceFile | Bundle | undefined) => T,
        sourceFilesOrTargetSourceFile?: readonly SourceFile[] | SourceFile,
        forceDtsEmit = false,
        onlyBuildInfo?: boolean,
        includeBuildInfo?: boolean) {
        const sourceFiles = isArray(sourceFilesOrTargetSourceFile) ? sourceFilesOrTargetSourceFile : getSourceFilesToEmit(host, sourceFilesOrTargetSourceFile, forceDtsEmit);
        const options = host.getCompilerOptions();
        if (outFile(options)) {
            const prepends = host.getPrependNodes();
            if (sourceFiles.length || prepends.length) {
                const bundle = factory.createBundle(sourceFiles, prepends);
                const result = action(getOutputPathsFor(bundle, host, forceDtsEmit), bundle);
                if (result) {
                    return result;
                }
            }
        }
        else {
            if (!onlyBuildInfo) {
                for (const sourceFile of sourceFiles) {
                    const result = action(getOutputPathsFor(sourceFile, host, forceDtsEmit), sourceFile);
                    if (result) {
                        return result;
                    }
                }
            }
            if (includeBuildInfo) {
                const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
                if (buildInfoPath) return action({ buildInfoPath }, /*sourceFileOrBundle*/ undefined);
            }
        }
    }

    export function getTsBuildInfoEmitOutputFilePath(options: CompilerOptions) {
        const configFile = options.configFilePath;
        if (!isIncrementalCompilation(options)) return undefined;
        if (options.tsBuildInfoFile) return options.tsBuildInfoFile;
        const outPath = outFile(options);
        let buildInfoExtensionLess: string;
        if (outPath) {
            buildInfoExtensionLess = removeFileExtension(outPath);
        }
        else {
            if (!configFile) return undefined;
            const configFileExtensionLess = removeFileExtension(configFile);
            buildInfoExtensionLess = options.outDir ?
                options.rootDir ?
                    resolvePath(options.outDir, getRelativePathFromDirectory(options.rootDir, configFileExtensionLess, /*ignoreCase*/ true)) :
                    combinePaths(options.outDir, getBaseFileName(configFileExtensionLess)) :
                configFileExtensionLess;
        }
        return buildInfoExtensionLess + Extension.TsBuildInfo;
    }

    /*@internal*/
    export function getOutputPathsForBundle(options: CompilerOptions, forceDtsPaths: boolean): EmitFileNames {
        const outPath = outFile(options)!;
        const jsFilePath = options.emitDeclarationOnly ? undefined : outPath;
        const sourceMapFilePath = jsFilePath && getSourceMapFilePath(jsFilePath, options);
        const declarationFilePath = (forceDtsPaths || getEmitDeclarations(options)) ? removeFileExtension(outPath) + Extension.Dts : undefined;
        const declarationMapPath = declarationFilePath && getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : undefined;
        const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
        return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath };
    }

    /*@internal*/
    export function getOutputPathsFor(sourceFile: SourceFile | Bundle, host: EmitHost, forceDtsPaths: boolean): EmitFileNames {
        const options = host.getCompilerOptions();
        if (sourceFile.kind === SyntaxKind.Bundle) {
            return getOutputPathsForBundle(options, forceDtsPaths);
        }
        else {
            const ownOutputFilePath = getOwnEmitOutputFilePath(sourceFile.fileName, host, getOutputExtension(sourceFile, options));
            const isJsonFile = isJsonSourceFile(sourceFile);
            // If json file emits to the same location skip writing it, if emitDeclarationOnly skip writing it
            const isJsonEmittedToSameLocation = isJsonFile &&
                comparePaths(sourceFile.fileName, ownOutputFilePath, host.getCurrentDirectory(), !host.useCaseSensitiveFileNames()) === Comparison.EqualTo;
            const jsFilePath = options.emitDeclarationOnly || isJsonEmittedToSameLocation ? undefined : ownOutputFilePath;
            const sourceMapFilePath = !jsFilePath || isJsonSourceFile(sourceFile) ? undefined : getSourceMapFilePath(jsFilePath, options);
            const declarationFilePath = (forceDtsPaths || (getEmitDeclarations(options) && !isJsonFile)) ? getDeclarationEmitOutputFilePath(sourceFile.fileName, host) : undefined;
            const declarationMapPath = declarationFilePath && getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : undefined;
            return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath: undefined };
        }
    }

    function getSourceMapFilePath(jsFilePath: string, options: CompilerOptions) {
        return (options.sourceMap && !options.inlineSourceMap) ? jsFilePath + ".map" : undefined;
    }

    // JavaScript files are always LanguageVariant.JSX, as JSX syntax is allowed in .js files also.
    // So for JavaScript files, '.jsx' is only emitted if the input was '.jsx', and JsxEmit.Preserve.
    // For TypeScript, the only time to emit with a '.jsx' extension, is on JSX input, and JsxEmit.Preserve
    /* @internal */
    export function getOutputExtension(sourceFile: SourceFile, options: CompilerOptions): Extension {
        if (isJsonSourceFile(sourceFile)) {
            return Extension.Json;
        }

        if (options.jsx === JsxEmit.Preserve) {
            if (isSourceFileJS(sourceFile)) {
                if (fileExtensionIs(sourceFile.fileName, Extension.Jsx)) {
                    return Extension.Jsx;
                }
            }
            else if (sourceFile.languageVariant === LanguageVariant.JSX) {
                // TypeScript source file preserving JSX syntax
                return Extension.Jsx;
            }
        }
        return Extension.Js;
    }

    function getOutputPathWithoutChangingExt(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean, outputDir: string | undefined, getCommonSourceDirectory?: () => string) {
        return outputDir ?
            resolvePath(
                outputDir,
                getRelativePathFromDirectory(getCommonSourceDirectory ? getCommonSourceDirectory() : getCommonSourceDirectoryOfConfig(configFile, ignoreCase), inputFileName, ignoreCase)
            ) :
            inputFileName;
    }

    /* @internal */
    export function getOutputDeclarationFileName(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean, getCommonSourceDirectory?: () => string) {
        Debug.assert(!fileExtensionIs(inputFileName, Extension.Dts) && !fileExtensionIs(inputFileName, Extension.Json));
        return changeExtension(
            getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.declarationDir || configFile.options.outDir, getCommonSourceDirectory),
            Extension.Dts
        );
    }

    function getOutputJSFileName(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean, getCommonSourceDirectory?: () => string) {
        if (configFile.options.emitDeclarationOnly) return undefined;
        const isJsonFile = fileExtensionIs(inputFileName, Extension.Json);
        const outputFileName = changeExtension(
            getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.outDir, getCommonSourceDirectory),
            isJsonFile ?
                Extension.Json :
                configFile.options.jsx === JsxEmit.Preserve && (fileExtensionIs(inputFileName, Extension.Tsx) || fileExtensionIs(inputFileName, Extension.Jsx)) ?
                    Extension.Jsx :
                    Extension.Js
        );
        return !isJsonFile || comparePaths(inputFileName, outputFileName, Debug.checkDefined(configFile.options.configFilePath), ignoreCase) !== Comparison.EqualTo ?
            outputFileName :
            undefined;
    }

    function createAddOutput() {
        let outputs: string[] | undefined;
        return { addOutput, getOutputs };
        function addOutput(path: string | undefined) {
            if (path) {
                (outputs || (outputs = [])).push(path);
            }
        }
        function getOutputs(): readonly string[] {
            return outputs || emptyArray;
        }
    }

    function getSingleOutputFileNames(configFile: ParsedCommandLine, addOutput: ReturnType<typeof createAddOutput>["addOutput"]) {
        const { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath } = getOutputPathsForBundle(configFile.options, /*forceDtsPaths*/ false);
        addOutput(jsFilePath);
        addOutput(sourceMapFilePath);
        addOutput(declarationFilePath);
        addOutput(declarationMapPath);
        addOutput(buildInfoPath);
    }

    function getOwnOutputFileNames(configFile: ParsedCommandLine, inputFileName: string, ignoreCase: boolean, addOutput: ReturnType<typeof createAddOutput>["addOutput"], getCommonSourceDirectory?: () => string) {
        if (fileExtensionIs(inputFileName, Extension.Dts)) return;
        const js = getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
        addOutput(js);
        if (fileExtensionIs(inputFileName, Extension.Json)) return;
        if (js && configFile.options.sourceMap) {
            addOutput(`${js}.map`);
        }
        if (getEmitDeclarations(configFile.options)) {
            const dts = getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
            addOutput(dts);
            if (configFile.options.declarationMap) {
                addOutput(`${dts}.map`);
            }
        }
    }

    /*@internal*/
    export function getCommonSourceDirectory(
        options: CompilerOptions,
        emittedFiles: () => readonly string[],
        currentDirectory: string,
        getCanonicalFileName: GetCanonicalFileName,
        checkSourceFilesBelongToPath?: (commonSourceDirectory: string) => void
    ): string {
        let commonSourceDirectory;
        if (options.rootDir) {
            // If a rootDir is specified use it as the commonSourceDirectory
            commonSourceDirectory = getNormalizedAbsolutePath(options.rootDir, currentDirectory);
            checkSourceFilesBelongToPath?.(options.rootDir);
        }
        else if (options.composite && options.configFilePath) {
            // Project compilations never infer their root from the input source paths
            commonSourceDirectory = getDirectoryPath(normalizeSlashes(options.configFilePath));
            checkSourceFilesBelongToPath?.(commonSourceDirectory);
        }
        else {
            commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(emittedFiles(), currentDirectory, getCanonicalFileName);
        }

        if (commonSourceDirectory && commonSourceDirectory[commonSourceDirectory.length - 1] !== directorySeparator) {
            // Make sure directory path ends with directory separator so this string can directly
            // used to replace with "" to get the relative path of the source file and the relative path doesn't
            // start with / making it rooted path
            commonSourceDirectory += directorySeparator;
        }
        return commonSourceDirectory;
    }

    /*@internal*/
    export function getCommonSourceDirectoryOfConfig({ options, fileNames }: ParsedCommandLine, ignoreCase: boolean): string {
        return getCommonSourceDirectory(
            options,
            () => filter(fileNames, file => !(options.noEmitForJsFiles && fileExtensionIsOneOf(file, supportedJSExtensions)) && !fileExtensionIs(file, Extension.Dts)),
            getDirectoryPath(normalizeSlashes(Debug.checkDefined(options.configFilePath))),
            createGetCanonicalFileName(!ignoreCase)
        );
    }

    /*@internal*/
    export function getAllProjectOutputs(configFile: ParsedCommandLine, ignoreCase: boolean): readonly string[] {
        const { addOutput, getOutputs } = createAddOutput();
        if (outFile(configFile.options)) {
            getSingleOutputFileNames(configFile, addOutput);
        }
        else {
            const getCommonSourceDirectory = memoize(() => getCommonSourceDirectoryOfConfig(configFile, ignoreCase));
            for (const inputFileName of configFile.fileNames) {
                getOwnOutputFileNames(configFile, inputFileName, ignoreCase, addOutput, getCommonSourceDirectory);
            }
            addOutput(getTsBuildInfoEmitOutputFilePath(configFile.options));
        }
        return getOutputs();
    }

    export function getOutputFileNames(commandLine: ParsedCommandLine, inputFileName: string, ignoreCase: boolean): readonly string[] {
        inputFileName = normalizePath(inputFileName);
        Debug.assert(contains(commandLine.fileNames, inputFileName), `Expected fileName to be present in command line`);
        const { addOutput, getOutputs } = createAddOutput();
        if (outFile(commandLine.options)) {
            getSingleOutputFileNames(commandLine, addOutput);
        }
        else {
            getOwnOutputFileNames(commandLine, inputFileName, ignoreCase, addOutput);
        }
        return getOutputs();
    }

    /*@internal*/
    export function getFirstProjectOutput(configFile: ParsedCommandLine, ignoreCase: boolean): string {
        if (outFile(configFile.options)) {
            const { jsFilePath } = getOutputPathsForBundle(configFile.options, /*forceDtsPaths*/ false);
            return Debug.checkDefined(jsFilePath, `project ${configFile.options.configFilePath} expected to have at least one output`);
        }

        const getCommonSourceDirectory = memoize(() => getCommonSourceDirectoryOfConfig(configFile, ignoreCase));
        for (const inputFileName of configFile.fileNames) {
            if (fileExtensionIs(inputFileName, Extension.Dts)) continue;
            const jsFilePath = getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
            if (jsFilePath) return jsFilePath;
            if (fileExtensionIs(inputFileName, Extension.Json)) continue;
            if (getEmitDeclarations(configFile.options)) {
                return getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory);
            }
        }
        const buildInfoPath = getTsBuildInfoEmitOutputFilePath(configFile.options);
        if (buildInfoPath) return buildInfoPath;
        return Debug.fail(`project ${configFile.options.configFilePath} expected to have at least one output`);
    }

    /*@internal*/
    // targetSourceFile is when users only want one file in entire project to be emitted. This is used in compileOnSave feature
    export function emitFiles(resolver: EmitResolver, host: EmitHost, targetSourceFile: SourceFile | undefined, { scriptTransformers, declarationTransformers }: EmitTransformers, emitOnlyDtsFiles?: boolean, onlyBuildInfo?: boolean, forceDtsEmit?: boolean): EmitResult {
        const compilerOptions = host.getCompilerOptions();
        const sourceMapDataList: SourceMapEmitResult[] | undefined = (compilerOptions.sourceMap || compilerOptions.inlineSourceMap || getAreDeclarationMapsEnabled(compilerOptions)) ? [] : undefined;
        const emittedFilesList: string[] | undefined = compilerOptions.listEmittedFiles ? [] : undefined;
        const emitterDiagnostics = createDiagnosticCollection();
        const newLine = getNewLineCharacter(compilerOptions, () => host.getNewLine());
        const writer = createTextWriter(newLine);
        const { enter, exit } = performance.createTimer("printTime", "beforePrint", "afterPrint");
        let bundleBuildInfo: BundleBuildInfo | undefined;
        let emitSkipped = false;
        let exportedModulesFromDeclarationEmit: ExportedModulesFromDeclarationEmit | undefined;

        // Emit each output file
        enter();
        forEachEmittedFile(
            host,
            emitSourceFileOrBundle,
            getSourceFilesToEmit(host, targetSourceFile, forceDtsEmit),
            forceDtsEmit,
            onlyBuildInfo,
            !targetSourceFile
        );
        exit();


        return {
            emitSkipped,
            diagnostics: emitterDiagnostics.getDiagnostics(),
            emittedFiles: emittedFilesList,
            sourceMaps: sourceMapDataList,
            exportedModulesFromDeclarationEmit
        };

        function emitSourceFileOrBundle({ jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath }: EmitFileNames, sourceFileOrBundle: SourceFile | Bundle | undefined) {
            let buildInfoDirectory: string | undefined;
            if (buildInfoPath && sourceFileOrBundle && isBundle(sourceFileOrBundle)) {
                buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
                bundleBuildInfo = {
                    commonSourceDirectory: relativeToBuildInfo(host.getCommonSourceDirectory()),
                    sourceFiles: sourceFileOrBundle.sourceFiles.map(file => relativeToBuildInfo(getNormalizedAbsolutePath(file.fileName, host.getCurrentDirectory())))
                };
            }
            tracing?.push(tracing.Phase.Emit, "emitJsFileOrBundle", { jsFilePath });
            emitJsFileOrBundle(sourceFileOrBundle, jsFilePath, sourceMapFilePath, relativeToBuildInfo);
            tracing?.pop();

            tracing?.push(tracing.Phase.Emit, "emitDeclarationFileOrBundle", { declarationFilePath });
            emitDeclarationFileOrBundle(sourceFileOrBundle, declarationFilePath, declarationMapPath, relativeToBuildInfo);
            tracing?.pop();

            tracing?.push(tracing.Phase.Emit, "emitBuildInfo", { buildInfoPath });
            emitBuildInfo(bundleBuildInfo, buildInfoPath);
            tracing?.pop();

            if (!emitSkipped && emittedFilesList) {
                if (!emitOnlyDtsFiles) {
                    if (jsFilePath) {
                        emittedFilesList.push(jsFilePath);
                    }
                    if (sourceMapFilePath) {
                        emittedFilesList.push(sourceMapFilePath);
                    }
                    if (buildInfoPath) {
                        emittedFilesList.push(buildInfoPath);
                    }
                }
                if (declarationFilePath) {
                    emittedFilesList.push(declarationFilePath);
                }
                if (declarationMapPath) {
                    emittedFilesList.push(declarationMapPath);
                }
            }

            function relativeToBuildInfo(path: string) {
                return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory!, path, host.getCanonicalFileName));
            }
        }

        function emitBuildInfo(bundle: BundleBuildInfo | undefined, buildInfoPath: string | undefined) {
            // Write build information if applicable
            if (!buildInfoPath || targetSourceFile || emitSkipped) return;
            const program = host.getProgramBuildInfo();
            if (host.isEmitBlocked(buildInfoPath)) {
                emitSkipped = true;
                return;
            }
            const version = ts.version; // Extracted into a const so the form is stable between namespace and module
            writeFile(host, emitterDiagnostics, buildInfoPath, getBuildInfoText({ bundle, program, version }), /*writeByteOrderMark*/ false);
        }

        function emitJsFileOrBundle(
            sourceFileOrBundle: SourceFile | Bundle | undefined,
            jsFilePath: string | undefined,
            sourceMapFilePath: string | undefined,
            relativeToBuildInfo: (path: string) => string) {
            if (!sourceFileOrBundle || emitOnlyDtsFiles || !jsFilePath) {
                return;
            }

            // Make sure not to write js file and source map file if any of them cannot be written
            if ((jsFilePath && host.isEmitBlocked(jsFilePath)) || compilerOptions.noEmit) {
                emitSkipped = true;
                return;
            }
            // Transform the source files
            const transform = transformNodes(resolver, host, factory, compilerOptions, [sourceFileOrBundle], scriptTransformers, /*allowDtsFiles*/ false);

            const printerOptions: PrinterOptions = {
                removeComments: compilerOptions.removeComments,
                newLine: compilerOptions.newLine,
                noEmitHelpers: compilerOptions.noEmitHelpers,
                module: compilerOptions.module,
                target: compilerOptions.target,
                sourceMap: compilerOptions.sourceMap,
                inlineSourceMap: compilerOptions.inlineSourceMap,
                inlineSources: compilerOptions.inlineSources,
                extendedDiagnostics: compilerOptions.extendedDiagnostics,
                writeBundleFileInfo: !!bundleBuildInfo,
                relativeToBuildInfo
            };

            // Create a printer to print the nodes
            const printer = createPrinter(printerOptions, {
                // resolver hooks
                hasGlobalName: resolver.hasGlobalName,

                // transform hooks
                onEmitNode: transform.emitNodeWithNotification,
                isEmitNotificationEnabled: transform.isEmitNotificationEnabled,
                substituteNode: transform.substituteNode,
            });

            Debug.assert(transform.transformed.length === 1, "Should only see one output from the transform");
            printSourceFileOrBundle(jsFilePath, sourceMapFilePath, transform.transformed[0], printer, compilerOptions);

            // Clean up emit nodes on parse tree
            transform.dispose();
            if (bundleBuildInfo) bundleBuildInfo.js = printer.bundleFileInfo;
        }

        function emitDeclarationFileOrBundle(
            sourceFileOrBundle: SourceFile | Bundle | undefined,
            declarationFilePath: string | undefined,
            declarationMapPath: string | undefined,
            relativeToBuildInfo: (path: string) => string) {
            if (!sourceFileOrBundle) return;
            if (!declarationFilePath) {
                if (emitOnlyDtsFiles || compilerOptions.emitDeclarationOnly) emitSkipped = true;
                return;
            }
            const sourceFiles = isSourceFile(sourceFileOrBundle) ? [sourceFileOrBundle] : sourceFileOrBundle.sourceFiles;
            const filesForEmit = forceDtsEmit ? sourceFiles : filter(sourceFiles, isSourceFileNotJson);
            // Setup and perform the transformation to retrieve declarations from the input files
            const inputListOrBundle = outFile(compilerOptions) ? [factory.createBundle(filesForEmit, !isSourceFile(sourceFileOrBundle) ? sourceFileOrBundle.prepends : undefined)] : filesForEmit;
            if (emitOnlyDtsFiles && !getEmitDeclarations(compilerOptions)) {
                // Checker wont collect the linked aliases since thats only done when declaration is enabled.
                // Do that here when emitting only dts files
                filesForEmit.forEach(collectLinkedAliases);
            }
            const declarationTransform = transformNodes(resolver, host, factory, compilerOptions, inputListOrBundle, declarationTransformers, /*allowDtsFiles*/ false);
            if (length(declarationTransform.diagnostics)) {
                for (const diagnostic of declarationTransform.diagnostics!) {
                    emitterDiagnostics.add(diagnostic);
                }
            }

            const printerOptions: PrinterOptions = {
                removeComments: compilerOptions.removeComments,
                newLine: compilerOptions.newLine,
                noEmitHelpers: true,
                module: compilerOptions.module,
                target: compilerOptions.target,
                sourceMap: compilerOptions.sourceMap,
                inlineSourceMap: compilerOptions.inlineSourceMap,
                extendedDiagnostics: compilerOptions.extendedDiagnostics,
                onlyPrintJsDocStyle: true,
                writeBundleFileInfo: !!bundleBuildInfo,
                recordInternalSection: !!bundleBuildInfo,
                relativeToBuildInfo
            };

            const declarationPrinter = createPrinter(printerOptions, {
                // resolver hooks
                hasGlobalName: resolver.hasGlobalName,

                // transform hooks
                onEmitNode: declarationTransform.emitNodeWithNotification,
                isEmitNotificationEnabled: declarationTransform.isEmitNotificationEnabled,
                substituteNode: declarationTransform.substituteNode,
            });
            const declBlocked = (!!declarationTransform.diagnostics && !!declarationTransform.diagnostics.length) || !!host.isEmitBlocked(declarationFilePath) || !!compilerOptions.noEmit;
            emitSkipped = emitSkipped || declBlocked;
            if (!declBlocked || forceDtsEmit) {
                Debug.assert(declarationTransform.transformed.length === 1, "Should only see one output from the decl transform");
                printSourceFileOrBundle(
                    declarationFilePath,
                    declarationMapPath,
                    declarationTransform.transformed[0],
                    declarationPrinter,
                    {
                        sourceMap: !forceDtsEmit && compilerOptions.declarationMap,
                        sourceRoot: compilerOptions.sourceRoot,
                        mapRoot: compilerOptions.mapRoot,
                        extendedDiagnostics: compilerOptions.extendedDiagnostics,
                        // Explicitly do not passthru either `inline` option
                    }
                );
                if (forceDtsEmit && declarationTransform.transformed[0].kind === SyntaxKind.SourceFile) {
                    const sourceFile = declarationTransform.transformed[0];
                    exportedModulesFromDeclarationEmit = sourceFile.exportedModulesFromDeclarationEmit;
                }
            }
            declarationTransform.dispose();
            if (bundleBuildInfo) bundleBuildInfo.dts = declarationPrinter.bundleFileInfo;
        }

        function collectLinkedAliases(node: Node) {
            if (isExportAssignment(node)) {
                if (node.expression.kind === SyntaxKind.Identifier) {
                    resolver.collectLinkedAliases(node.expression as Identifier, /*setVisibility*/ true);
                }
                return;
            }
            else if (isExportSpecifier(node)) {
                resolver.collectLinkedAliases(node.propertyName || node.name, /*setVisibility*/ true);
                return;
            }
            forEachChild(node, collectLinkedAliases);
        }

        function printSourceFileOrBundle(jsFilePath: string, sourceMapFilePath: string | undefined, sourceFileOrBundle: SourceFile | Bundle, printer: Printer, mapOptions: SourceMapOptions) {
            const bundle = sourceFileOrBundle.kind === SyntaxKind.Bundle ? sourceFileOrBundle : undefined;
            const sourceFile = sourceFileOrBundle.kind === SyntaxKind.SourceFile ? sourceFileOrBundle : undefined;
            const sourceFiles = bundle ? bundle.sourceFiles : [sourceFile!];

            let sourceMapGenerator: SourceMapGenerator | undefined;
            if (shouldEmitSourceMaps(mapOptions, sourceFileOrBundle)) {
                sourceMapGenerator = createSourceMapGenerator(
                    host,
                    getBaseFileName(normalizeSlashes(jsFilePath)),
                    getSourceRoot(mapOptions),
                    getSourceMapDirectory(mapOptions, jsFilePath, sourceFile),
                    mapOptions);
            }

            if (bundle) {
                printer.writeBundle(bundle, writer, sourceMapGenerator);
            }
            else {
                printer.writeFile(sourceFile!, writer, sourceMapGenerator);
            }

            if (sourceMapGenerator) {
                if (sourceMapDataList) {
                    sourceMapDataList.push({
                        inputSourceFileNames: sourceMapGenerator.getSources(),
                        sourceMap: sourceMapGenerator.toJSON()
                    });
                }

                const sourceMappingURL = getSourceMappingURL(
                    mapOptions,
                    sourceMapGenerator,
                    jsFilePath,
                    sourceMapFilePath,
                    sourceFile);

                if (sourceMappingURL) {
                    if (!writer.isAtStartOfLine()) writer.rawWrite(newLine);
                    writer.writeComment(`//# ${"sourceMappingURL"}=${sourceMappingURL}`); // Tools can sometimes see this line as a source mapping url comment
                }

                // Write the source map
                if (sourceMapFilePath) {
                    const sourceMap = sourceMapGenerator.toString();
                    writeFile(host, emitterDiagnostics, sourceMapFilePath, sourceMap, /*writeByteOrderMark*/ false, sourceFiles);
                }
            }
            else {
                writer.writeLine();
            }

            // Write the output file
            writeFile(host, emitterDiagnostics, jsFilePath, writer.getText(), !!compilerOptions.emitBOM, sourceFiles);

            // Reset state
            writer.clear();
        }

        interface SourceMapOptions {
            sourceMap?: boolean;
            inlineSourceMap?: boolean;
            inlineSources?: boolean;
            sourceRoot?: string;
            mapRoot?: string;
            extendedDiagnostics?: boolean;
        }

        function shouldEmitSourceMaps(mapOptions: SourceMapOptions, sourceFileOrBundle: SourceFile | Bundle) {
            return (mapOptions.sourceMap || mapOptions.inlineSourceMap)
                && (sourceFileOrBundle.kind !== SyntaxKind.SourceFile || !fileExtensionIs(sourceFileOrBundle.fileName, Extension.Json));
        }

        function getSourceRoot(mapOptions: SourceMapOptions) {
            // Normalize source root and make sure it has trailing "/" so that it can be used to combine paths with the
            // relative paths of the sources list in the sourcemap
            const sourceRoot = normalizeSlashes(mapOptions.sourceRoot || "");
            return sourceRoot ? ensureTrailingDirectorySeparator(sourceRoot) : sourceRoot;
        }

        function getSourceMapDirectory(mapOptions: SourceMapOptions, filePath: string, sourceFile: SourceFile | undefined) {
            if (mapOptions.sourceRoot) return host.getCommonSourceDirectory();
            if (mapOptions.mapRoot) {
                let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
                if (sourceFile) {
                    // For modules or multiple emit files the mapRoot will have directory structure like the sources
                    // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                    sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
                }
                if (getRootLength(sourceMapDir) === 0) {
                    // The relative paths are relative to the common directory
                    sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                }
                return sourceMapDir;
            }
            return getDirectoryPath(normalizePath(filePath));
        }

        function getSourceMappingURL(mapOptions: SourceMapOptions, sourceMapGenerator: SourceMapGenerator, filePath: string, sourceMapFilePath: string | undefined, sourceFile: SourceFile | undefined) {
            if (mapOptions.inlineSourceMap) {
                // Encode the sourceMap into the sourceMap url
                const sourceMapText = sourceMapGenerator.toString();
                const base64SourceMapText = base64encode(sys, sourceMapText);
                return `data:application/json;base64,${base64SourceMapText}`;
            }

            const sourceMapFile = getBaseFileName(normalizeSlashes(Debug.checkDefined(sourceMapFilePath)));
            if (mapOptions.mapRoot) {
                let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
                if (sourceFile) {
                    // For modules or multiple emit files the mapRoot will have directory structure like the sources
                    // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                    sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
                }
                if (getRootLength(sourceMapDir) === 0) {
                    // The relative paths are relative to the common directory
                    sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                    return encodeURI(
                        getRelativePathToDirectoryOrUrl(
                            getDirectoryPath(normalizePath(filePath)), // get the relative sourceMapDir path based on jsFilePath
                            combinePaths(sourceMapDir, sourceMapFile), // this is where user expects to see sourceMap
                            host.getCurrentDirectory(),
                            host.getCanonicalFileName,
                            /*isAbsolutePathAnUrl*/ true));
                }
                else {
                    return encodeURI(combinePaths(sourceMapDir, sourceMapFile));
                }
            }
            return encodeURI(sourceMapFile);
        }
    }

    /*@internal*/
    export function getBuildInfoText(buildInfo: BuildInfo) {
        return JSON.stringify(buildInfo);
    }

    /*@internal*/
    export function getBuildInfo(buildInfoText: string) {
        return JSON.parse(buildInfoText) as BuildInfo;
    }

    /*@internal*/
    export const notImplementedResolver: EmitResolver = {
        hasGlobalName: notImplemented,
        getReferencedExportContainer: notImplemented,
        getReferencedImportDeclaration: notImplemented,
        getReferencedDeclarationWithCollidingName: notImplemented,
        isDeclarationWithCollidingName: notImplemented,
        isValueAliasDeclaration: notImplemented,
        isReferencedAliasDeclaration: notImplemented,
        isTopLevelValueImportEqualsWithEntityName: notImplemented,
        getNodeCheckFlags: notImplemented,
        isDeclarationVisible: notImplemented,
        isLateBound: (_node): _node is LateBoundDeclaration => false,
        collectLinkedAliases: notImplemented,
        isImplementationOfOverload: notImplemented,
        isRequiredInitializedParameter: notImplemented,
        isOptionalUninitializedParameterProperty: notImplemented,
        isExpandoFunctionDeclaration: notImplemented,
        getPropertiesOfContainerFunction: notImplemented,
        createTypeOfDeclaration: notImplemented,
        createReturnTypeOfSignatureDeclaration: notImplemented,
        createTypeOfExpression: notImplemented,
        createLiteralConstValue: notImplemented,
        isSymbolAccessible: notImplemented,
        isEntityNameVisible: notImplemented,
        // Returns the constant value this property access resolves to: notImplemented, or 'undefined' for a non-constant
        getConstantValue: notImplemented,
        getReferencedValueDeclaration: notImplemented,
        getTypeReferenceSerializationKind: notImplemented,
        isOptionalParameter: notImplemented,
        moduleExportsSomeValue: notImplemented,
        isArgumentsLocalBinding: notImplemented,
        getExternalModuleFileFromDeclaration: notImplemented,
        getTypeReferenceDirectivesForEntityName: notImplemented,
        getTypeReferenceDirectivesForSymbol: notImplemented,
        isLiteralConstDeclaration: notImplemented,
        getJsxFactoryEntity: notImplemented,
        getJsxFragmentFactoryEntity: notImplemented,
        getAllAccessorDeclarations: notImplemented,
        getSymbolOfExternalModuleSpecifier: notImplemented,
        isBindingCapturedByNode: notImplemented,
        getDeclarationStatementsForSourceFile: notImplemented,
        isImportRequiredByAugmentation: notImplemented,
    };

    /*@internal*/
    /** File that isnt present resulting in error or output files */
    export type EmitUsingBuildInfoResult = string | readonly OutputFile[];

    /*@internal*/
    export interface EmitUsingBuildInfoHost extends ModuleResolutionHost {
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
    }

    function createSourceFilesFromBundleBuildInfo(bundle: BundleBuildInfo, buildInfoDirectory: string, host: EmitUsingBuildInfoHost): readonly SourceFile[] {
        const jsBundle = Debug.checkDefined(bundle.js);
        const prologueMap = jsBundle.sources?.prologues && arrayToMap(jsBundle.sources.prologues, prologueInfo => prologueInfo.file);
        return bundle.sourceFiles.map((fileName, index) => {
            const prologueInfo = prologueMap?.get(index);
            const statements = prologueInfo?.directives.map(directive => {
                const literal = setTextRange(factory.createStringLiteral(directive.expression.text), directive.expression);
                const statement = setTextRange(factory.createExpressionStatement(literal), directive);
                setParent(literal, statement);
                return statement;
            });
            const eofToken = factory.createToken(SyntaxKind.EndOfFileToken);
            const sourceFile = factory.createSourceFile(statements ?? [], eofToken, NodeFlags.None);
            sourceFile.fileName = getRelativePathFromDirectory(
                host.getCurrentDirectory(),
                getNormalizedAbsolutePath(fileName, buildInfoDirectory),
                !host.useCaseSensitiveFileNames()
            );
            sourceFile.text = prologueInfo?.text ?? "";
            setTextRangePosWidth(sourceFile, 0, prologueInfo?.text.length ?? 0);
            setEachParent(sourceFile.statements, sourceFile);
            setTextRangePosWidth(eofToken, sourceFile.end, 0);
            setParent(eofToken, sourceFile);
            return sourceFile;
        });
    }

    /*@internal*/
    export function emitUsingBuildInfo(
        config: ParsedCommandLine,
        host: EmitUsingBuildInfoHost,
        getCommandLine: (ref: ProjectReference) => ParsedCommandLine | undefined,
        customTransformers?: CustomTransformers
    ): EmitUsingBuildInfoResult {
        const { buildInfoPath, jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath } = getOutputPathsForBundle(config.options, /*forceDtsPaths*/ false);
        const buildInfoText = host.readFile(Debug.checkDefined(buildInfoPath));
        if (!buildInfoText) return buildInfoPath!;
        const jsFileText = host.readFile(Debug.checkDefined(jsFilePath));
        if (!jsFileText) return jsFilePath!;
        const sourceMapText = sourceMapFilePath && host.readFile(sourceMapFilePath);
        // error if no source map or for now if inline sourcemap
        if ((sourceMapFilePath && !sourceMapText) || config.options.inlineSourceMap) return sourceMapFilePath || "inline sourcemap decoding";
        // read declaration text
        const declarationText = declarationFilePath && host.readFile(declarationFilePath);
        if (declarationFilePath && !declarationText) return declarationFilePath;
        const declarationMapText = declarationMapPath && host.readFile(declarationMapPath);
        // error if no source map or for now if inline sourcemap
        if ((declarationMapPath && !declarationMapText) || config.options.inlineSourceMap) return declarationMapPath || "inline sourcemap decoding";

        const buildInfo = getBuildInfo(buildInfoText);
        if (!buildInfo.bundle || !buildInfo.bundle.js || (declarationText && !buildInfo.bundle.dts)) return buildInfoPath!;
        const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath!, host.getCurrentDirectory()));
        const ownPrependInput = createInputFiles(
            jsFileText,
            declarationText!,
            sourceMapFilePath,
            sourceMapText,
            declarationMapPath,
            declarationMapText,
            jsFilePath,
            declarationFilePath,
            buildInfoPath,
            buildInfo,
            /*onlyOwnText*/ true
        );
        const outputFiles: OutputFile[] = [];
        const prependNodes = createPrependNodes(config.projectReferences, getCommandLine, f => host.readFile(f));
        const sourceFilesForJsEmit = createSourceFilesFromBundleBuildInfo(buildInfo.bundle, buildInfoDirectory, host);
        const emitHost: EmitHost = {
            getPrependNodes: memoize(() => [...prependNodes, ownPrependInput]),
            getCanonicalFileName: host.getCanonicalFileName,
            getCommonSourceDirectory: () => getNormalizedAbsolutePath(buildInfo.bundle!.commonSourceDirectory, buildInfoDirectory),
            getCompilerOptions: () => config.options,
            getCurrentDirectory: () => host.getCurrentDirectory(),
            getNewLine: () => host.getNewLine(),
            getSourceFile: returnUndefined,
            getSourceFileByPath: returnUndefined,
            getSourceFiles: () => sourceFilesForJsEmit,
            getLibFileFromReference: notImplemented,
            isSourceFileFromExternalLibrary: returnFalse,
            getResolvedProjectReferenceToRedirect: returnUndefined,
            getProjectReferenceRedirect: returnUndefined,
            isSourceOfProjectReferenceRedirect: returnFalse,
            writeFile: (name, text, writeByteOrderMark) => {
                switch (name) {
                    case jsFilePath:
                        if (jsFileText === text) return;
                        break;
                    case sourceMapFilePath:
                        if (sourceMapText === text) return;
                        break;
                    case buildInfoPath:
                        const newBuildInfo = getBuildInfo(text);
                        newBuildInfo.program = buildInfo.program;
                        // Update sourceFileInfo
                        const { js, dts, sourceFiles } = buildInfo.bundle!;
                        newBuildInfo.bundle!.js!.sources = js!.sources;
                        if (dts) {
                            newBuildInfo.bundle!.dts!.sources = dts.sources;
                        }
                        newBuildInfo.bundle!.sourceFiles = sourceFiles;
                        outputFiles.push({ name, text: getBuildInfoText(newBuildInfo), writeByteOrderMark });
                        return;
                    case declarationFilePath:
                        if (declarationText === text) return;
                        break;
                    case declarationMapPath:
                        if (declarationMapText === text) return;
                        break;
                    default:
                        Debug.fail(`Unexpected path: ${name}`);
                }
                outputFiles.push({ name, text, writeByteOrderMark });
            },
            isEmitBlocked: returnFalse,
            readFile: f => host.readFile(f),
            fileExists: f => host.fileExists(f),
            useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
            getProgramBuildInfo: returnUndefined,
            getSourceFileFromReference: returnUndefined,
            redirectTargetsMap: createMultiMap(),
            getFileIncludeReasons: notImplemented,
        };
        emitFiles(
            notImplementedResolver,
            emitHost,
            /*targetSourceFile*/ undefined,
            getTransformers(config.options, customTransformers)
        );
        return outputFiles;
    }

    export function createPrinter(printerOptions: PrinterOptions = {}, handlers: PrintHandlers = {}): Printer {
        const {
            hasGlobalName,
            onBeforeEmitNode,
            onAfterEmitNode,
            onBeforeEmitNodeArray,
            onAfterEmitNodeArray,
            onBeforeEmitToken,
            onAfterEmitToken
        } = handlers;

        const extendedDiagnostics = !!printerOptions.extendedDiagnostics;
        const newLine = getNewLineCharacter(printerOptions);
        const moduleKind = getEmitModuleKind(printerOptions);
        const bundledHelpers = new Map<string, boolean>();

        let currentSourceFile: SourceFile | undefined;
        let nodeIdToGeneratedName: string[]; // Map of generated names for specific nodes.
        let autoGeneratedIdToGeneratedName: string[]; // Map of generated names for temp and loop variables.
        let generatedNames: Set<string>; // Set of names generated by the NameGenerator.
        let tempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
        let tempFlags: TempFlags; // TempFlags for the current name generation scope.
        let reservedNamesStack: Set<string>[]; // Stack of TempFlags reserved in enclosing name generation scopes.
        let reservedNames: Set<string>; // TempFlags to reserve in nested name generation scopes.
        let preserveSourceNewlines = printerOptions.preserveSourceNewlines; // Can be overridden inside nodes with the `IgnoreSourceNewlines` emit flag.
        let nextListElementPos: number | undefined; // See comment in `getLeadingLineTerminatorCount`.

        let writer: EmitTextWriter;
        let ownWriter: EmitTextWriter; // Reusable `EmitTextWriter` for basic printing.
        let write = writeBase;
        let isOwnFileEmit: boolean;
        const bundleFileInfo = printerOptions.writeBundleFileInfo ? { sections: [] } as BundleFileInfo : undefined;
        const relativeToBuildInfo = bundleFileInfo ? Debug.checkDefined(printerOptions.relativeToBuildInfo) : undefined;
        const recordInternalSection = printerOptions.recordInternalSection;
        let sourceFileTextPos = 0;
        let sourceFileTextKind: BundleFileTextLikeKind = BundleFileSectionKind.Text;

        // Source Maps
        let sourceMapsDisabled = true;
        let sourceMapGenerator: SourceMapGenerator | undefined;
        let sourceMapSource: SourceMapSource;
        let sourceMapSourceIndex = -1;
        let mostRecentlyAddedSourceMapSource: SourceMapSource;
        let mostRecentlyAddedSourceMapSourceIndex = -1;

        // Comments
        let containerPos = -1;
        let containerEnd = -1;
        let declarationListContainerEnd = -1;
        let currentLineMap: readonly number[] | undefined;
        let detachedCommentsInfo: { nodePos: number, detachedCommentEndPos: number }[] | undefined;
        let hasWrittenComment = false;
        let commentsDisabled = !!printerOptions.removeComments;
        const { enter: enterComment, exit: exitComment } = performance.createTimerIf(extendedDiagnostics, "commentTime", "beforeComment", "afterComment");
        const preprint = createPreprinter(handlers);
        const emitBinaryExpression = createEmitBinaryExpression();

        reset();
        return {
            // public API
            printNode,
            printList,
            printFile,
            printBundle,

            // internal API
            writeNode,
            writeList,
            writeFile,
            writeBundle,
            bundleFileInfo
        };

        function printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string {
            switch (hint) {
                case EmitHint.SourceFile:
                    Debug.assert(isSourceFile(node), "Expected a SourceFile node.");
                    break;
                case EmitHint.IdentifierName:
                    Debug.assert(isIdentifier(node), "Expected an Identifier node.");
                    break;
                case EmitHint.Expression:
                    Debug.assert(isExpression(node), "Expected an Expression node.");
                    break;
            }
            switch (node.kind) {
                case SyntaxKind.SourceFile: return printFile(<SourceFile>node);
                case SyntaxKind.Bundle: return printBundle(<Bundle>node);
                case SyntaxKind.UnparsedSource: return printUnparsedSource(<UnparsedSource>node);
            }
            writeNode(hint, node, sourceFile, beginPrint());
            return endPrint();
        }

        function printList<T extends Node>(format: ListFormat, nodes: NodeArray<T>, sourceFile: SourceFile) {
            writeList(format, nodes, sourceFile, beginPrint());
            return endPrint();
        }

        function printBundle(bundle: Bundle): string {
            writeBundle(bundle, beginPrint(), /*sourceMapEmitter*/ undefined);
            return endPrint();
        }

        function printFile(sourceFile: SourceFile): string {
            writeFile(sourceFile, beginPrint(), /*sourceMapEmitter*/ undefined);
            return endPrint();
        }

        function printUnparsedSource(unparsed: UnparsedSource): string {
            writeUnparsedSource(unparsed, beginPrint());
            return endPrint();
        }

        /**
         * If `sourceFile` is `undefined`, `node` must be a synthesized `TypeNode`.
         */
        function writeNode(hint: EmitHint, node: TypeNode, sourceFile: undefined, output: EmitTextWriter): void;
        function writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile, output: EmitTextWriter): void;
        function writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined, output: EmitTextWriter) {
            const previousWriter = writer;
            setWriter(output, /*_sourceMapGenerator*/ undefined);
            print(hint, node, sourceFile);
            reset();
            writer = previousWriter;
        }

        function writeList<T extends Node>(format: ListFormat, nodes: NodeArray<T>, sourceFile: SourceFile | undefined, output: EmitTextWriter) {
            const previousWriter = writer;
            setWriter(output, /*_sourceMapGenerator*/ undefined);
            if (sourceFile) {
                setSourceFile(sourceFile);
            }
            emitList(/*parentNode*/ undefined, nodes, format);
            reset();
            writer = previousWriter;
        }

        function getTextPosWithWriteLine() {
            return writer.getTextPosWithWriteLine ? writer.getTextPosWithWriteLine() : writer.getTextPos();
        }

        function updateOrPushBundleFileTextLike(pos: number, end: number, kind: BundleFileTextLikeKind) {
            const last = lastOrUndefined(bundleFileInfo!.sections);
            if (last && last.kind === kind) {
                last.end = end;
            }
            else {
                bundleFileInfo!.sections.push({ pos, end, kind });
            }
        }

        function recordBundleFileInternalSectionStart(node: Node) {
            if (recordInternalSection &&
                bundleFileInfo &&
                currentSourceFile &&
                (isDeclaration(node) || isVariableStatement(node)) &&
                isInternalDeclaration(node, currentSourceFile) &&
                sourceFileTextKind !== BundleFileSectionKind.Internal) {
                const prevSourceFileTextKind = sourceFileTextKind;
                recordBundleFileTextLikeSection(writer.getTextPos());
                sourceFileTextPos = getTextPosWithWriteLine();
                sourceFileTextKind = BundleFileSectionKind.Internal;
                return prevSourceFileTextKind;
            }
            return undefined;
        }

        function recordBundleFileInternalSectionEnd(prevSourceFileTextKind: ReturnType<typeof recordBundleFileInternalSectionStart>) {
            if (prevSourceFileTextKind) {
                recordBundleFileTextLikeSection(writer.getTextPos());
                sourceFileTextPos = getTextPosWithWriteLine();
                sourceFileTextKind = prevSourceFileTextKind;
            }
        }

        function recordBundleFileTextLikeSection(end: number) {
            if (sourceFileTextPos < end) {
                updateOrPushBundleFileTextLike(sourceFileTextPos, end, sourceFileTextKind);
                return true;
            }
            return false;
        }

        function writeBundle(bundle: Bundle, output: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined) {
            isOwnFileEmit = false;
            const previousWriter = writer;
            setWriter(output, sourceMapGenerator);
            emitShebangIfNeeded(bundle);
            emitPrologueDirectivesIfNeeded(bundle);
            emitHelpers(bundle);
            emitSyntheticTripleSlashReferencesIfNeeded(bundle);

            for (const prepend of bundle.prepends) {
                writeLine();
                const pos = writer.getTextPos();
                const savedSections = bundleFileInfo && bundleFileInfo.sections;
                if (savedSections) bundleFileInfo!.sections = [];
                print(EmitHint.Unspecified, prepend, /*sourceFile*/ undefined);
                if (bundleFileInfo) {
                    const newSections = bundleFileInfo.sections;
                    bundleFileInfo.sections = savedSections!;
                    if (prepend.oldFileOfCurrentEmit) bundleFileInfo.sections.push(...newSections);
                    else {
                        newSections.forEach(section => Debug.assert(isBundleFileTextLike(section)));
                        bundleFileInfo.sections.push({
                            pos,
                            end: writer.getTextPos(),
                            kind: BundleFileSectionKind.Prepend,
                            data: relativeToBuildInfo!((prepend as UnparsedSource).fileName),
                            texts: newSections as BundleFileTextLike[]
                        });
                    }
                }
            }

            sourceFileTextPos = getTextPosWithWriteLine();
            for (const sourceFile of bundle.sourceFiles) {
                print(EmitHint.SourceFile, sourceFile, sourceFile);
            }
            if (bundleFileInfo && bundle.sourceFiles.length) {
                const end = writer.getTextPos();
                if (recordBundleFileTextLikeSection(end)) {
                    // Store prologues
                    const prologues = getPrologueDirectivesFromBundledSourceFiles(bundle);
                    if (prologues) {
                        if (!bundleFileInfo.sources) bundleFileInfo.sources = {};
                        bundleFileInfo.sources.prologues = prologues;
                    }

                    // Store helpes
                    const helpers = getHelpersFromBundledSourceFiles(bundle);
                    if (helpers) {
                        if (!bundleFileInfo.sources) bundleFileInfo.sources = {};
                        bundleFileInfo.sources.helpers = helpers;
                    }
                }
            }

            reset();
            writer = previousWriter;
        }

        function writeUnparsedSource(unparsed: UnparsedSource, output: EmitTextWriter) {
            const previousWriter = writer;
            setWriter(output, /*_sourceMapGenerator*/ undefined);
            print(EmitHint.Unspecified, unparsed, /*sourceFile*/ undefined);
            reset();
            writer = previousWriter;
        }

        function writeFile(sourceFile: SourceFile, output: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined) {
            isOwnFileEmit = true;
            const previousWriter = writer;
            setWriter(output, sourceMapGenerator);
            emitShebangIfNeeded(sourceFile);
            emitPrologueDirectivesIfNeeded(sourceFile);
            print(EmitHint.SourceFile, sourceFile, sourceFile);
            reset();
            writer = previousWriter;
        }

        function beginPrint() {
            return ownWriter || (ownWriter = createTextWriter(newLine));
        }

        function endPrint() {
            const text = ownWriter.getText();
            ownWriter.clear();
            return text;
        }

        function print(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined) {
            if (sourceFile) {
                setSourceFile(sourceFile);
            }

            emit(preprint(hint, node));
        }

        function setSourceFile(sourceFile: SourceFile | undefined) {
            currentSourceFile = sourceFile;
            currentLineMap = undefined;
            detachedCommentsInfo = undefined;
            if (sourceFile) {
                setSourceMapSource(sourceFile);
            }
        }

        function setWriter(_writer: EmitTextWriter | undefined, _sourceMapGenerator: SourceMapGenerator | undefined) {
            if (_writer && printerOptions.omitTrailingSemicolon) {
                _writer = getTrailingSemicolonDeferringWriter(_writer);
            }

            writer = _writer!; // TODO: GH#18217
            sourceMapGenerator = _sourceMapGenerator;
            sourceMapsDisabled = !writer || !sourceMapGenerator;
        }

        function reset() {
            nodeIdToGeneratedName = [];
            autoGeneratedIdToGeneratedName = [];
            generatedNames = new Set();
            tempFlagsStack = [];
            tempFlags = TempFlags.Auto;
            reservedNamesStack = [];
            currentSourceFile = undefined;
            currentLineMap = undefined;
            detachedCommentsInfo = undefined;
            setWriter(/*output*/ undefined, /*_sourceMapGenerator*/ undefined);
        }

        function getCurrentLineMap() {
            return currentLineMap || (currentLineMap = getLineStarts(currentSourceFile!));
        }

        function emit(node: Node): void;
        function emit(node: Node | undefined): void;
        function emit(node: Node | undefined) {
            if (node === undefined) return;
            const prevSourceFileTextKind = recordBundleFileInternalSectionStart(node);

            emitWithContext(node, emitWorker);

            recordBundleFileInternalSectionEnd(prevSourceFileTextKind);
        }

        function shouldEmitComments(node: Node) {
            return !commentsDisabled && !isSourceFile(node);
        }

        function shouldEmitSourceMaps(node: Node) {
            return !sourceMapsDisabled &&
                !isSourceFile(node) &&
                !isInJsonFile(node) &&
                !isUnparsedSource(node) &&
                !isUnparsedPrepend(node);
        }

        function beforeEmitWithContext(node: Node, shouldEmitComments: boolean, shouldEmitSourceMaps: boolean) {
            onBeforeEmitNode?.(node);

            const emitFlags = getEmitFlags(node);
            const commentRange = shouldEmitComments ? getCommentRange(node) : undefined;
            const sourceMapRange = shouldEmitSourceMaps ? getSourceMapRange(node) : undefined;

            if (preserveSourceNewlines && (emitFlags & EmitFlags.IgnoreSourceNewlines)) {
                preserveSourceNewlines = false;
            }

            // Emit leading comments
            if (commentRange) {
                emitLeadingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end);
                if (emitFlags & EmitFlags.NoNestedComments) {
                    commentsDisabled = true;
                }
            }

            // Emit leading sourcemap
            if (sourceMapRange) {
                if (isUnparsedNode(node)) {
                    Debug.assertIsDefined(node.parent, "UnparsedNodes must have parent pointers");
                    const parsed = getParsedSourceMap(node.parent);
                    if (parsed && sourceMapGenerator) {
                        sourceMapGenerator.appendSourceMap(
                            writer.getLine(),
                            writer.getColumn(),
                            parsed,
                            node.parent.sourceMapPath!,
                            node.parent.getLineAndCharacterOfPosition(node.pos),
                            node.parent.getLineAndCharacterOfPosition(node.end)
                        );
                    }
                }
                else {
                    const source = sourceMapRange.source || sourceMapSource;
                    if (node.kind !== SyntaxKind.NotEmittedStatement
                        && (emitFlags & EmitFlags.NoLeadingSourceMap) === 0
                        && sourceMapRange.pos >= 0) {
                        emitSourcePos(sourceMapRange.source || sourceMapSource, skipSourceTrivia(source, sourceMapRange.pos));
                    }
                    if (emitFlags & EmitFlags.NoNestedSourceMaps) {
                        sourceMapsDisabled = true;
                    }
                }
            }
        }

        function afterEmitWithContext(node: Node, shouldEmitComments: boolean, shouldEmitSourceMaps: boolean, savedContainerPos: number, savedContainerEnd: number, savedDeclarationListContainerEnd: number, savedPreserveSourceNewlines: boolean | undefined) {
            const emitFlags = getEmitFlags(node);
            const commentRange = shouldEmitComments ? getCommentRange(node) : undefined;
            const sourceMapRange = shouldEmitSourceMaps ? getSourceMapRange(node) : undefined;

            // Emit trailing sourcemap
            if (sourceMapRange) {
                if (!isUnparsedNode(node)) {
                    if (emitFlags & EmitFlags.NoNestedSourceMaps) {
                        sourceMapsDisabled = false;
                    }
                    if (node.kind !== SyntaxKind.NotEmittedStatement
                        && (emitFlags & EmitFlags.NoTrailingSourceMap) === 0
                        && sourceMapRange.end >= 0) {
                        emitSourcePos(sourceMapRange.source || sourceMapSource, sourceMapRange.end);
                    }
                }
            }

            // Emit trailing comments
            if (commentRange) {
                if (emitFlags & EmitFlags.NoNestedComments) {
                    commentsDisabled = false;
                }
                emitTrailingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
            }

            preserveSourceNewlines = savedPreserveSourceNewlines;
            onAfterEmitNode?.(node);
        }

        function emitWithContext<T extends Node>(node: T, emitCallback: (node: T) => void) {
            const savedPreserveSourceNewlines = preserveSourceNewlines;
            const savedContainerPos = containerPos;
            const savedContainerEnd = containerEnd;
            const savedDeclarationListContainerEnd = declarationListContainerEnd;
            const emitComments = shouldEmitComments(node);
            const emitSourceMaps = shouldEmitSourceMaps(node);
            beforeEmitWithContext(node, emitComments, emitSourceMaps);
            emitCallback(node);
            afterEmitWithContext(node, emitComments, emitSourceMaps, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd, savedPreserveSourceNewlines);
        }

        function emitWorker(node: Node): void {
            switch (node.kind) {
                // Literals
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.BigIntLiteral:
                    return emitNumericOrBigIntLiteral(<NumericLiteral | BigIntLiteral>node);

                case SyntaxKind.StringLiteral:
                case SyntaxKind.RegularExpressionLiteral:
                case SyntaxKind.NoSubstitutionTemplateLiteral:
                    return emitLiteral(<LiteralExpression>node, /*jsxAttributeEscape*/ false);

                case SyntaxKind.JsxText:
                    return emitJsxText(<JsxText>node);

                // Pseudo-literals
                case SyntaxKind.TemplateHead:
                case SyntaxKind.TemplateMiddle:
                case SyntaxKind.TemplateTail:
                    return emitLiteral(<LiteralExpression>node, /*jsxAttributeEscape*/ false);

                // Identifiers and PrivateIdentifiers
                case SyntaxKind.Identifier:
                    return emitIdentifier(<Identifier>node);
                case SyntaxKind.PrivateIdentifier:
                    return emitPrivateIdentifier(node as PrivateIdentifier);

                // Names
                case SyntaxKind.QualifiedName:
                    return emitQualifiedName(<QualifiedName>node);
                case SyntaxKind.ComputedPropertyName:
                    return emitComputedPropertyName(<ComputedPropertyName>node);

                // Signature elements
                case SyntaxKind.TypeParameter:
                    return emitTypeParameter(<TypeParameterDeclaration>node);
                case SyntaxKind.Parameter:
                    return emitParameter(<ParameterDeclaration>node);
                case SyntaxKind.Decorator:
                    return emitDecorator(<Decorator>node);

                // Type members
                case SyntaxKind.PropertySignature:
                    return emitPropertySignature(<PropertySignature>node);
                case SyntaxKind.PropertyDeclaration:
                    return emitPropertyDeclaration(<PropertyDeclaration>node);
                case SyntaxKind.MethodSignature:
                    return emitMethodSignature(<MethodSignature>node);
                case SyntaxKind.MethodDeclaration:
                    return emitMethodDeclaration(<MethodDeclaration>node);
                case SyntaxKind.Constructor:
                    return emitConstructor(<ConstructorDeclaration>node);
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return emitAccessorDeclaration(<AccessorDeclaration>node);
                case SyntaxKind.CallSignature:
                    return emitCallSignature(<CallSignatureDeclaration>node);
                case SyntaxKind.ConstructSignature:
                    return emitConstructSignature(<ConstructSignatureDeclaration>node);
                case SyntaxKind.IndexSignature:
                    return emitIndexSignature(<IndexSignatureDeclaration>node);

                // Types
                case SyntaxKind.TypePredicate:
                    return emitTypePredicate(<TypePredicateNode>node);
                case SyntaxKind.TypeReference:
                    return emitTypeReference(<TypeReferenceNode>node);
                case SyntaxKind.FunctionType:
                    return emitFunctionType(<FunctionTypeNode>node);
                case SyntaxKind.ConstructorType:
                    return emitConstructorType(<ConstructorTypeNode>node);
                case SyntaxKind.TypeQuery:
                    return emitTypeQuery(<TypeQueryNode>node);
                case SyntaxKind.TypeLiteral:
                    return emitTypeLiteral(<TypeLiteralNode>node);
                case SyntaxKind.ArrayType:
                    return emitArrayType(<ArrayTypeNode>node);
                case SyntaxKind.TupleType:
                    return emitTupleType(<TupleTypeNode>node);
                case SyntaxKind.OptionalType:
                    return emitOptionalType(<OptionalTypeNode>node);
                // SyntaxKind.RestType is handled below
                case SyntaxKind.UnionType:
                    return emitUnionType(<UnionTypeNode>node);
                case SyntaxKind.IntersectionType:
                    return emitIntersectionType(<IntersectionTypeNode>node);
                case SyntaxKind.ConditionalType:
                    return emitConditionalType(<ConditionalTypeNode>node);
                case SyntaxKind.InferType:
                    return emitInferType(<InferTypeNode>node);
                case SyntaxKind.ParenthesizedType:
                    return emitParenthesizedType(<ParenthesizedTypeNode>node);
                case SyntaxKind.ThisType:
                    return emitThisType();
                case SyntaxKind.TypeOperator:
                    return emitTypeOperator(<TypeOperatorNode>node);
                case SyntaxKind.IndexedAccessType:
                    return emitIndexedAccessType(<IndexedAccessTypeNode>node);
                case SyntaxKind.MappedType:
                    return emitMappedType(<MappedTypeNode>node);
                case SyntaxKind.LiteralType:
                    return emitLiteralType(<LiteralTypeNode>node);
                case SyntaxKind.NamedTupleMember:
                    return emitNamedTupleMember(node as NamedTupleMember);
                case SyntaxKind.TemplateLiteralType:
                    return emitTemplateType(<TemplateLiteralTypeNode>node);
                case SyntaxKind.TemplateLiteralTypeSpan:
                    return emitTemplateTypeSpan(<TemplateLiteralTypeSpan>node);
                case SyntaxKind.ImportType:
                    return emitImportTypeNode(<ImportTypeNode>node);

                // Binding patterns
                case SyntaxKind.ObjectBindingPattern:
                    return emitObjectBindingPattern(<ObjectBindingPattern>node);
                case SyntaxKind.ArrayBindingPattern:
                    return emitArrayBindingPattern(<ArrayBindingPattern>node);
                case SyntaxKind.BindingElement:
                    return emitBindingElement(<BindingElement>node);

                // Expressions
                case SyntaxKind.ArrayLiteralExpression:
                    return emitArrayLiteralExpression(<ArrayLiteralExpression>node);
                case SyntaxKind.ObjectLiteralExpression:
                    return emitObjectLiteralExpression(<ObjectLiteralExpression>node);
                case SyntaxKind.PropertyAccessExpression:
                    return emitPropertyAccessExpression(<PropertyAccessExpression>node);
                case SyntaxKind.ElementAccessExpression:
                    return emitElementAccessExpression(<ElementAccessExpression>node);
                case SyntaxKind.CallExpression:
                    return emitCallExpression(<CallExpression>node);
                case SyntaxKind.NewExpression:
                    return emitNewExpression(<NewExpression>node);
                case SyntaxKind.TaggedTemplateExpression:
                    return emitTaggedTemplateExpression(<TaggedTemplateExpression>node);
                case SyntaxKind.TypeAssertionExpression:
                    return emitTypeAssertionExpression(<TypeAssertion>node);
                case SyntaxKind.ParenthesizedExpression:
                    return emitParenthesizedExpression(<ParenthesizedExpression>node);
                case SyntaxKind.FunctionExpression:
                    return emitFunctionExpression(<FunctionExpression>node);
                case SyntaxKind.ArrowFunction:
                    return emitArrowFunction(<ArrowFunction>node);
                case SyntaxKind.DeleteExpression:
                    return emitDeleteExpression(<DeleteExpression>node);
                case SyntaxKind.TypeOfExpression:
                    return emitTypeOfExpression(<TypeOfExpression>node);
                case SyntaxKind.VoidExpression:
                    return emitVoidExpression(<VoidExpression>node);
                case SyntaxKind.AwaitExpression:
                    return emitAwaitExpression(<AwaitExpression>node);
                case SyntaxKind.PrefixUnaryExpression:
                    return emitPrefixUnaryExpression(<PrefixUnaryExpression>node);
                case SyntaxKind.PostfixUnaryExpression:
                    return emitPostfixUnaryExpression(<PostfixUnaryExpression>node);
                case SyntaxKind.BinaryExpression:
                    return emitBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.ConditionalExpression:
                    return emitConditionalExpression(<ConditionalExpression>node);
                case SyntaxKind.TemplateExpression:
                    return emitTemplateExpression(<TemplateExpression>node);
                case SyntaxKind.YieldExpression:
                    return emitYieldExpression(<YieldExpression>node);
                case SyntaxKind.SpreadElement:
                    return emitSpreadExpression(<SpreadElement>node);
                case SyntaxKind.ClassExpression:
                    return emitClassExpression(<ClassExpression>node);
                case SyntaxKind.OmittedExpression:
                    return;
                case SyntaxKind.ExpressionWithTypeArguments:
                    return emitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node);
                case SyntaxKind.AsExpression:
                    return emitAsExpression(<AsExpression>node);
                case SyntaxKind.NonNullExpression:
                    return emitNonNullExpression(<NonNullExpression>node);
                case SyntaxKind.MetaProperty:
                    return emitMetaProperty(<MetaProperty>node);
                case SyntaxKind.SyntheticExpression:
                    Debug.fail("SyntheticExpression should never be printed.");
                    break;

                // Misc
                case SyntaxKind.TemplateSpan:
                    return emitTemplateSpan(<TemplateSpan>node);
                case SyntaxKind.SemicolonClassElement:
                    return emitSemicolonClassElement();

                // Element
                case SyntaxKind.Block:
                    return emitBlock(<Block>node);
                case SyntaxKind.EmptyStatement:
                    return emitEmptyStatement(/*isEmbeddedStatement*/ false);
                case SyntaxKind.VariableStatement:
                    return emitVariableStatement(<VariableStatement>node);
                case SyntaxKind.ExpressionStatement:
                    return emitExpressionStatement(<ExpressionStatement>node);
                case SyntaxKind.IfStatement:
                    return emitIfStatement(<IfStatement>node);
                case SyntaxKind.DoStatement:
                    return emitDoStatement(<DoStatement>node);
                case SyntaxKind.WhileStatement:
                    return emitWhileStatement(<WhileStatement>node);
                case SyntaxKind.ForStatement:
                    return emitForStatement(<ForStatement>node);
                case SyntaxKind.ForInStatement:
                    return emitForInStatement(<ForInStatement>node);
                case SyntaxKind.ForOfStatement:
                    return emitForOfStatement(<ForOfStatement>node);
                case SyntaxKind.ContinueStatement:
                    return emitContinueStatement(<ContinueStatement>node);
                case SyntaxKind.BreakStatement:
                    return emitBreakStatement(<BreakStatement>node);
                case SyntaxKind.ReturnStatement:
                    return emitReturnStatement(<ReturnStatement>node);
                case SyntaxKind.WithStatement:
                    return emitWithStatement(<WithStatement>node);
                case SyntaxKind.SwitchStatement:
                    return emitSwitchStatement(<SwitchStatement>node);
                case SyntaxKind.LabeledStatement:
                    return emitLabeledStatement(<LabeledStatement>node);
                case SyntaxKind.ThrowStatement:
                    return emitThrowStatement(<ThrowStatement>node);
                case SyntaxKind.TryStatement:
                    return emitTryStatement(<TryStatement>node);
                case SyntaxKind.DebuggerStatement:
                    return emitDebuggerStatement(<DebuggerStatement>node);

                // Declarations
                case SyntaxKind.VariableDeclaration:
                    return emitVariableDeclaration(<VariableDeclaration>node);
                case SyntaxKind.VariableDeclarationList:
                    return emitVariableDeclarationList(<VariableDeclarationList>node);
                case SyntaxKind.FunctionDeclaration:
                    return emitFunctionDeclaration(<FunctionDeclaration>node);
                case SyntaxKind.ClassDeclaration:
                    return emitClassDeclaration(<ClassDeclaration>node);
                case SyntaxKind.InterfaceDeclaration:
                    return emitInterfaceDeclaration(<InterfaceDeclaration>node);
                case SyntaxKind.TypeAliasDeclaration:
                    return emitTypeAliasDeclaration(<TypeAliasDeclaration>node);
                case SyntaxKind.EnumDeclaration:
                    return emitEnumDeclaration(<EnumDeclaration>node);
                case SyntaxKind.ModuleDeclaration:
                    return emitModuleDeclaration(<ModuleDeclaration>node);
                case SyntaxKind.ModuleBlock:
                    return emitModuleBlock(<ModuleBlock>node);
                case SyntaxKind.CaseBlock:
                    return emitCaseBlock(<CaseBlock>node);
                case SyntaxKind.NamespaceExportDeclaration:
                    return emitNamespaceExportDeclaration(<NamespaceExportDeclaration>node);
                case SyntaxKind.ImportEqualsDeclaration:
                    return emitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                    return emitImportDeclaration(<ImportDeclaration>node);
                case SyntaxKind.ImportClause:
                    return emitImportClause(<ImportClause>node);
                case SyntaxKind.NamespaceImport:
                    return emitNamespaceImport(<NamespaceImport>node);
                case SyntaxKind.NamedImports:
                    return emitNamedImports(<NamedImports>node);
                case SyntaxKind.ImportSpecifier:
                    return emitImportSpecifier(<ImportSpecifier>node);
                case SyntaxKind.ExportAssignment:
                    return emitExportAssignment(<ExportAssignment>node);
                case SyntaxKind.ExportDeclaration:
                    return emitExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.NamedExports:
                    return emitNamedExports(<NamedExports>node);
                case SyntaxKind.NamespaceExport:
                    return emitNamespaceExport(<NamespaceExport>node);
                case SyntaxKind.ExportSpecifier:
                    return emitExportSpecifier(<ExportSpecifier>node);
                case SyntaxKind.MissingDeclaration:
                    return;

                // Module references
                case SyntaxKind.ExternalModuleReference:
                    return emitExternalModuleReference(<ExternalModuleReference>node);

                // JSX
                case SyntaxKind.JsxElement:
                    return emitJsxElement(<JsxElement>node);
                case SyntaxKind.JsxSelfClosingElement:
                    return emitJsxSelfClosingElement(<JsxSelfClosingElement>node);
                case SyntaxKind.JsxFragment:
                    return emitJsxFragment(<JsxFragment>node);
                case SyntaxKind.JsxOpeningElement:
                case SyntaxKind.JsxOpeningFragment:
                    return emitJsxOpeningElementOrFragment(<JsxOpeningElement>node);
                case SyntaxKind.JsxClosingElement:
                case SyntaxKind.JsxClosingFragment:
                    return emitJsxClosingElementOrFragment(<JsxClosingElement>node);
                case SyntaxKind.JsxAttribute:
                    return emitJsxAttribute(<JsxAttribute>node);
                case SyntaxKind.JsxAttributes:
                    return emitJsxAttributes(<JsxAttributes>node);
                case SyntaxKind.JsxSpreadAttribute:
                    return emitJsxSpreadAttribute(<JsxSpreadAttribute>node);
                case SyntaxKind.JsxExpression:
                    return emitJsxExpression(<JsxExpression>node);

                // Clauses
                case SyntaxKind.CaseClause:
                    return emitCaseClause(<CaseClause>node);
                case SyntaxKind.DefaultClause:
                    return emitDefaultClause(<DefaultClause>node);
                case SyntaxKind.HeritageClause:
                    return emitHeritageClause(<HeritageClause>node);
                case SyntaxKind.CatchClause:
                    return emitCatchClause(<CatchClause>node);

                // Property assignments
                case SyntaxKind.PropertyAssignment:
                    return emitPropertyAssignment(<PropertyAssignment>node);
                case SyntaxKind.ShorthandPropertyAssignment:
                    return emitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node);
                case SyntaxKind.SpreadAssignment:
                    return emitSpreadAssignment(node as SpreadAssignment);

                // Enum
                case SyntaxKind.EnumMember:
                    return emitEnumMember(<EnumMember>node);

                // Unparsed
                case SyntaxKind.UnparsedPrologue:
                    return writeUnparsedNode(<UnparsedNode>node);
                case SyntaxKind.UnparsedSource:
                case SyntaxKind.UnparsedPrepend:
                    return emitUnparsedSourceOrPrepend(<UnparsedSource>node);
                case SyntaxKind.UnparsedText:
                case SyntaxKind.UnparsedInternalText:
                    return emitUnparsedTextLike(<UnparsedTextLike>node);
                case SyntaxKind.UnparsedSyntheticReference:
                    return emitUnparsedSyntheticReference(<UnparsedSyntheticReference>node);

                // Top-level nodes
                case SyntaxKind.SourceFile:
                    return emitSourceFile(<SourceFile>node);
                case SyntaxKind.Bundle:
                    Debug.fail("Bundles should be printed using printBundle");
                    break;
                // SyntaxKind.UnparsedSource (handled above)
                case SyntaxKind.InputFiles:
                    Debug.fail("InputFiles should not be printed");
                    break;

                // JSDoc nodes (only used in codefixes currently)
                case SyntaxKind.JSDocTypeExpression:
                    return emitJSDocTypeExpression(node as JSDocTypeExpression);
                case SyntaxKind.JSDocNameReference:
                    return emitJSDocNameReference(node as JSDocNameReference);
                case SyntaxKind.JSDocAllType:
                    return writePunctuation("*");
                case SyntaxKind.JSDocUnknownType:
                    return writePunctuation("?");
                case SyntaxKind.JSDocNullableType:
                    return emitJSDocNullableType(node as JSDocNullableType);
                case SyntaxKind.JSDocNonNullableType:
                    return emitJSDocNonNullableType(node as JSDocNonNullableType);
                case SyntaxKind.JSDocOptionalType:
                    return emitJSDocOptionalType(node as JSDocOptionalType);
                case SyntaxKind.JSDocFunctionType:
                    return emitJSDocFunctionType(node as JSDocFunctionType);
                case SyntaxKind.RestType:
                case SyntaxKind.JSDocVariadicType:
                    return emitRestOrJSDocVariadicType(node as RestTypeNode | JSDocVariadicType);
                // SyntaxKind.JSDocNamepathType (missing)
                case SyntaxKind.JSDocComment:
                    return emitJSDoc(node as JSDoc);
                case SyntaxKind.JSDocTypeLiteral:
                    return emitJSDocTypeLiteral(node as JSDocTypeLiteral);
                case SyntaxKind.JSDocSignature:
                    return emitJSDocSignature(node as JSDocSignature);
                case SyntaxKind.JSDocTag:
                case SyntaxKind.JSDocClassTag:
                    return emitJSDocSimpleTag(node as JSDocTag);
                case SyntaxKind.JSDocAugmentsTag:
                case SyntaxKind.JSDocImplementsTag:
                    return emitJSDocHeritageTag(node as JSDocImplementsTag | JSDocAugmentsTag);
                // SyntaxKind.JSDocAuthorTag (missing)
                // SyntaxKind.JSDocDeprecatedTag (missing)
                // SyntaxKind.JSDocClassTag (see JSDocTag, above)
                // SyntaxKind.JSDocPublicTag (missing)
                // SyntaxKind.JSDocPrivateTag (missing)
                // SyntaxKind.JSDocProtectedTag (missing)
                // SyntaxKind.JSDocReadonlyTag (missing)
                case SyntaxKind.JSDocCallbackTag:
                    return emitJSDocCallbackTag(node as JSDocCallbackTag);
                // SyntaxKind.JSDocEnumTag (see below)
                case SyntaxKind.JSDocParameterTag:
                case SyntaxKind.JSDocPropertyTag:
                    return emitJSDocPropertyLikeTag(node as JSDocPropertyLikeTag);
                case SyntaxKind.JSDocEnumTag:
                case SyntaxKind.JSDocReturnTag:
                case SyntaxKind.JSDocThisTag:
                case SyntaxKind.JSDocTypeTag:
                    return emitJSDocSimpleTypedTag(node as JSDocTypeTag);
                case SyntaxKind.JSDocTemplateTag:
                    return emitJSDocTemplateTag(node as JSDocTemplateTag);
                case SyntaxKind.JSDocTypedefTag:
                    return emitJSDocTypedefTag(node as JSDocTypedefTag);
                case SyntaxKind.JSDocSeeTag:
                    return emitJSDocSeeTag(node as JSDocSeeTag);
                // SyntaxKind.JSDocPropertyTag (see JSDocParameterTag, above)

                // Synthesized list
                case SyntaxKind.SyntaxList:
                    Debug.fail("SyntaxList should not be printed");
                    break;

                // Transformation nodes
                case SyntaxKind.NotEmittedStatement:
                    break;
                case SyntaxKind.PartiallyEmittedExpression:
                    return emitPartiallyEmittedExpression(<PartiallyEmittedExpression>node);
                case SyntaxKind.CommaListExpression:
                    return emitCommaList(<CommaListExpression>node);
                case SyntaxKind.MergeDeclarationMarker:
                case SyntaxKind.EndOfDeclarationMarker:
                    break;
                case SyntaxKind.SyntheticReferenceExpression:
                    Debug.fail("SyntheticReferenceExpression should not be printed");
            }
            if (isKeyword(node.kind)) return writeTokenNode(node, writeKeyword);
            if (isTokenKind(node.kind)) return writeTokenNode(node, writePunctuation);
        }

        function emitMappedTypeParameter(node: TypeParameterDeclaration): void {
            emit(node.name);
            writeSpace();
            writeKeyword("in");
            writeSpace();
            emit(node.constraint);
        }

        function getHelpersFromBundledSourceFiles(bundle: Bundle): string[] | undefined {
            let result: string[] | undefined;
            if (moduleKind === ModuleKind.None || printerOptions.noEmitHelpers) {
                return undefined;
            }
            const bundledHelpers = new Map<string, boolean>();
            for (const sourceFile of bundle.sourceFiles) {
                const shouldSkip = getExternalHelpersModuleName(sourceFile) !== undefined;
                const helpers = getSortedEmitHelpers(sourceFile);
                if (!helpers) continue;
                for (const helper of helpers) {
                    if (!helper.scoped && !shouldSkip && !bundledHelpers.get(helper.name)) {
                        bundledHelpers.set(helper.name, true);
                        (result || (result = [])).push(helper.name);
                    }
                }
            }

            return result;
        }

        function emitHelpers(node: Node) {
            let helpersEmitted = false;
            const bundle = node.kind === SyntaxKind.Bundle ? <Bundle>node : undefined;
            if (bundle && moduleKind === ModuleKind.None) {
                return;
            }
            const numPrepends = bundle ? bundle.prepends.length : 0;
            const numNodes = bundle ? bundle.sourceFiles.length + numPrepends : 1;
            for (let i = 0; i < numNodes; i++) {
                const currentNode = bundle ? i < numPrepends ? bundle.prepends[i] : bundle.sourceFiles[i - numPrepends] : node;
                const sourceFile = isSourceFile(currentNode) ? currentNode : isUnparsedSource(currentNode) ? undefined : currentSourceFile!;
                const shouldSkip = printerOptions.noEmitHelpers || (!!sourceFile && hasRecordedExternalHelpers(sourceFile));
                const shouldBundle = (isSourceFile(currentNode) || isUnparsedSource(currentNode)) && !isOwnFileEmit;
                const helpers = isUnparsedSource(currentNode) ? currentNode.helpers : getSortedEmitHelpers(currentNode);
                if (helpers) {
                    for (const helper of helpers) {
                        if (!helper.scoped) {
                            // Skip the helper if it can be skipped and the noEmitHelpers compiler
                            // option is set, or if it can be imported and the importHelpers compiler
                            // option is set.
                            if (shouldSkip) continue;

                            // Skip the helper if it can be bundled but hasn't already been emitted and we
                            // are emitting a bundled module.
                            if (shouldBundle) {
                                if (bundledHelpers.get(helper.name)) {
                                    continue;
                                }

                                bundledHelpers.set(helper.name, true);
                            }
                        }
                        else if (bundle) {
                            // Skip the helper if it is scoped and we are emitting bundled helpers
                            continue;
                        }
                        const pos = getTextPosWithWriteLine();
                        if (typeof helper.text === "string") {
                            writeLines(helper.text);
                        }
                        else {
                            writeLines(helper.text(makeFileLevelOptimisticUniqueName));
                        }
                        if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.EmitHelpers, data: helper.name });
                        helpersEmitted = true;
                    }
                }
            }

            return helpersEmitted;
        }

        function getSortedEmitHelpers(node: Node) {
            const helpers = getEmitHelpers(node);
            return helpers && stableSort(helpers, compareEmitHelpers);
        }

        //
        // Literals/Pseudo-literals
        //

        // SyntaxKind.NumericLiteral
        // SyntaxKind.BigIntLiteral
        function emitNumericOrBigIntLiteral(node: NumericLiteral | BigIntLiteral) {
            emitLiteral(node, /*jsxAttributeEscape*/ false);
        }

        // SyntaxKind.StringLiteral
        // SyntaxKind.RegularExpressionLiteral
        // SyntaxKind.NoSubstitutionTemplateLiteral
        // SyntaxKind.TemplateHead
        // SyntaxKind.TemplateMiddle
        // SyntaxKind.TemplateTail
        function emitLiteral(node: LiteralLikeNode, jsxAttributeEscape: boolean) {
            const text = getLiteralTextOfNode(node, printerOptions.neverAsciiEscape, jsxAttributeEscape);
            if ((printerOptions.sourceMap || printerOptions.inlineSourceMap)
                && (node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind))) {
                writeLiteral(text);
            }
            else {
                // Quick info expects all literals to be called with writeStringLiteral, as there's no specific type for numberLiterals
                writeStringLiteral(text);
            }
        }

        function emitStringLiteralWithJsxAttributeEscape(node: StringLiteral) {
            emitLiteral(node, /*jsxAttributeEscape*/ true);
        }

        // SyntaxKind.UnparsedSource
        // SyntaxKind.UnparsedPrepend
        function emitUnparsedSourceOrPrepend(unparsed: UnparsedSource | UnparsedPrepend) {
            for (const text of unparsed.texts) {
                writeLine();
                emit(text);
            }
        }

        // SyntaxKind.UnparsedPrologue
        // SyntaxKind.UnparsedText
        // SyntaxKind.UnparsedInternal
        // SyntaxKind.UnparsedSyntheticReference
        function writeUnparsedNode(unparsed: UnparsedNode) {
            writer.rawWrite(unparsed.parent.text.substring(unparsed.pos, unparsed.end));
        }

        // SyntaxKind.UnparsedText
        // SyntaxKind.UnparsedInternal
        function emitUnparsedTextLike(unparsed: UnparsedTextLike) {
            const pos = getTextPosWithWriteLine();
            writeUnparsedNode(unparsed);
            if (bundleFileInfo) {
                updateOrPushBundleFileTextLike(
                    pos,
                    writer.getTextPos(),
                    unparsed.kind === SyntaxKind.UnparsedText ?
                        BundleFileSectionKind.Text :
                        BundleFileSectionKind.Internal
                );
            }
        }

        // SyntaxKind.UnparsedSyntheticReference
        function emitUnparsedSyntheticReference(unparsed: UnparsedSyntheticReference) {
            const pos = getTextPosWithWriteLine();
            writeUnparsedNode(unparsed);
            if (bundleFileInfo) {
                const section = clone(unparsed.section);
                section.pos = pos;
                section.end = writer.getTextPos();
                bundleFileInfo.sections.push(section);
            }
        }

        //
        // Identifiers
        //

        function emitIdentifier(node: Identifier) {
            const writeText = node.symbol ? writeSymbol : write;
            writeText(getTextOfNode(node, /*includeTrivia*/ false), node.symbol);
            emitList(node, node.typeArguments, ListFormat.TypeParameters); // Call emitList directly since it could be an array of TypeParameterDeclarations _or_ type arguments
        }

        //
        // Names
        //

        function emitPrivateIdentifier(node: PrivateIdentifier) {
            const writeText = node.symbol ? writeSymbol : write;
            writeText(getTextOfNode(node, /*includeTrivia*/ false), node.symbol);
        }


        function emitQualifiedName(node: QualifiedName) {
            emitEntityName(node.left);
            writePunctuation(".");
            emit(node.right);
        }

        function emitEntityName(node: EntityName) {
            if (node.kind === SyntaxKind.Identifier) {
                emit(node);
            }
            else {
                emit(node);
            }
        }

        function emitComputedPropertyName(node: ComputedPropertyName) {
            writePunctuation("[");
            emit(node.expression);
            writePunctuation("]");
        }

        //
        // Signature elements
        //

        function emitTypeParameter(node: TypeParameterDeclaration) {
            emit(node.name);
            if (node.constraint) {
                writeSpace();
                writeKeyword("extends");
                writeSpace();
                emit(node.constraint);
            }
            if (node.default) {
                writeSpace();
                writeOperator("=");
                writeSpace();
                emit(node.default);
            }
        }

        function emitParameter(node: ParameterDeclaration) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            emit(node.dotDotDotToken);
            emitNodeWithWriter(node.name, writeParameter);
            emit(node.questionToken);
            if (node.parent && node.parent.kind === SyntaxKind.JSDocFunctionType && !node.name) {
                emit(node.type);
            }
            else {
                emitTypeAnnotation(node.type);
            }
            // The comment position has to fallback to any present node within the parameterdeclaration because as it turns out, the parser can make parameter declarations with _just_ an initializer.
            emitInitializer(node.initializer, node.type ? node.type.end : node.questionToken ? node.questionToken.end : node.name ? node.name.end : node.modifiers ? node.modifiers.end : node.decorators ? node.decorators.end : node.pos, node);
        }

        function emitDecorator(decorator: Decorator) {
            writePunctuation("@");
            emit(decorator.expression);
        }

        //
        // Type members
        //

        function emitPropertySignature(node: PropertySignature) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            emitNodeWithWriter(node.name, writeProperty);
            emit(node.questionToken);
            emitTypeAnnotation(node.type);
            writeTrailingSemicolon();
        }

        function emitPropertyDeclaration(node: PropertyDeclaration) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            emit(node.name);
            emit(node.questionToken);
            emit(node.exclamationToken);
            emitTypeAnnotation(node.type);
            emitInitializer(node.initializer, node.type ? node.type.end : node.questionToken ? node.questionToken.end : node.name.end, node);
            writeTrailingSemicolon();
        }

        function emitMethodSignature(node: MethodSignature) {
            pushNameGenerationScope(node);
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            emit(node.name);
            emit(node.questionToken);
            emitTypeParameters(node, node.typeParameters);
            emitParameters(node, node.parameters);
            emitTypeAnnotation(node.type);
            writeTrailingSemicolon();
            popNameGenerationScope(node);
        }

        function emitMethodDeclaration(node: MethodDeclaration) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            emit(node.asteriskToken);
            emit(node.name);
            emit(node.questionToken);
            emitSignatureAndBody(node, emitSignatureHead);
        }

        function emitConstructor(node: ConstructorDeclaration) {
            emitModifiers(node, node.modifiers);
            writeKeyword("constructor");
            emitSignatureAndBody(node, emitSignatureHead);
        }

        function emitAccessorDeclaration(node: AccessorDeclaration) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            writeKeyword(node.kind === SyntaxKind.GetAccessor ? "get" : "set");
            writeSpace();
            emit(node.name);
            emitSignatureAndBody(node, emitSignatureHead);
        }

        function emitCallSignature(node: CallSignatureDeclaration) {
            pushNameGenerationScope(node);
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            emitTypeParameters(node, node.typeParameters);
            emitParameters(node, node.parameters);
            emitTypeAnnotation(node.type);
            writeTrailingSemicolon();
            popNameGenerationScope(node);
        }

        function emitConstructSignature(node: ConstructSignatureDeclaration) {
            pushNameGenerationScope(node);
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            writeKeyword("new");
            writeSpace();
            emitTypeParameters(node, node.typeParameters);
            emitParameters(node, node.parameters);
            emitTypeAnnotation(node.type);
            writeTrailingSemicolon();
            popNameGenerationScope(node);
        }

        function emitIndexSignature(node: IndexSignatureDeclaration) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            emitParametersForIndexSignature(node, node.parameters);
            emitTypeAnnotation(node.type);
            writeTrailingSemicolon();
        }

        function emitTemplateTypeSpan(node: TemplateLiteralTypeSpan) {
            emit(node.type);
            emit(node.literal);
        }

        function emitSemicolonClassElement() {
            writeTrailingSemicolon();
        }

        //
        // Types
        //

        function emitTypePredicate(node: TypePredicateNode) {
            if (node.assertsModifier) {
                emit(node.assertsModifier);
                writeSpace();
            }
            emit(node.parameterName);
            if (node.type) {
                writeSpace();
                writeKeyword("is");
                writeSpace();
                emit(node.type);
            }
        }

        function emitTypeReference(node: TypeReferenceNode) {
            emit(node.typeName);
            emitTypeArguments(node, node.typeArguments);
        }

        function emitFunctionType(node: FunctionTypeNode) {
            pushNameGenerationScope(node);
            emitTypeParameters(node, node.typeParameters);
            emitParametersForArrow(node, node.parameters);
            writeSpace();
            writePunctuation("=>");
            writeSpace();
            emit(node.type);
            popNameGenerationScope(node);
        }

        function emitJSDocFunctionType(node: JSDocFunctionType) {
            writeKeyword("function");
            emitParameters(node, node.parameters);
            writePunctuation(":");
            emit(node.type);
        }


        function emitJSDocNullableType(node: JSDocNullableType) {
            writePunctuation("?");
            emit(node.type);
        }

        function emitJSDocNonNullableType(node: JSDocNonNullableType) {
            writePunctuation("!");
            emit(node.type);
        }

        function emitJSDocOptionalType(node: JSDocOptionalType) {
            emit(node.type);
            writePunctuation("=");
        }

        function emitConstructorType(node: ConstructorTypeNode) {
            pushNameGenerationScope(node);
            emitModifiers(node, node.modifiers);
            writeKeyword("new");
            writeSpace();
            emitTypeParameters(node, node.typeParameters);
            emitParameters(node, node.parameters);
            writeSpace();
            writePunctuation("=>");
            writeSpace();
            emit(node.type);
            popNameGenerationScope(node);
        }

        function emitTypeQuery(node: TypeQueryNode) {
            writeKeyword("typeof");
            writeSpace();
            emit(node.exprName);
        }

        function emitTypeLiteral(node: TypeLiteralNode) {
            writePunctuation("{");
            const flags = getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineTypeLiteralMembers : ListFormat.MultiLineTypeLiteralMembers;
            emitList(node, node.members, flags | ListFormat.NoSpaceIfEmpty);
            writePunctuation("}");
        }

        function emitArrayType(node: ArrayTypeNode) {
            emit(node.elementType);
            writePunctuation("[");
            writePunctuation("]");
        }

        function emitRestOrJSDocVariadicType(node: RestTypeNode | JSDocVariadicType) {
            writePunctuation("...");
            emit(node.type);
        }

        function emitTupleType(node: TupleTypeNode) {
            emitTokenWithComment(SyntaxKind.OpenBracketToken, node.pos, writePunctuation, node);
            const flags = getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineTupleTypeElements : ListFormat.MultiLineTupleTypeElements;
            emitList(node, node.elements, flags | ListFormat.NoSpaceIfEmpty);
            emitTokenWithComment(SyntaxKind.CloseBracketToken, node.elements.end, writePunctuation, node);
        }

        function emitNamedTupleMember(node: NamedTupleMember) {
            emit(node.dotDotDotToken);
            emit(node.name);
            emit(node.questionToken);
            emitTokenWithComment(SyntaxKind.ColonToken, node.name.end, writePunctuation, node);
            writeSpace();
            emit(node.type);
        }

        function emitOptionalType(node: OptionalTypeNode) {
            emit(node.type);
            writePunctuation("?");
        }

        function emitUnionType(node: UnionTypeNode) {
            emitList(node, node.types, ListFormat.UnionTypeConstituents);
        }

        function emitIntersectionType(node: IntersectionTypeNode) {
            emitList(node, node.types, ListFormat.IntersectionTypeConstituents);
        }

        function emitConditionalType(node: ConditionalTypeNode) {
            emit(node.checkType);
            writeSpace();
            writeKeyword("extends");
            writeSpace();
            emit(node.extendsType);
            writeSpace();
            writePunctuation("?");
            writeSpace();
            emit(node.trueType);
            writeSpace();
            writePunctuation(":");
            writeSpace();
            emit(node.falseType);
        }

        function emitInferType(node: InferTypeNode) {
            writeKeyword("infer");
            writeSpace();
            emit(node.typeParameter);
        }

        function emitParenthesizedType(node: ParenthesizedTypeNode) {
            writePunctuation("(");
            emit(node.type);
            writePunctuation(")");
        }

        function emitThisType() {
            writeKeyword("this");
        }

        function emitTypeOperator(node: TypeOperatorNode) {
            writeTokenText(node.operator, writeKeyword);
            writeSpace();
            emit(node.type);
        }

        function emitIndexedAccessType(node: IndexedAccessTypeNode) {
            emit(node.objectType);
            writePunctuation("[");
            emit(node.indexType);
            writePunctuation("]");
        }

        function emitMappedType(node: MappedTypeNode) {
            const emitFlags = getEmitFlags(node);
            writePunctuation("{");
            if (emitFlags & EmitFlags.SingleLine) {
                writeSpace();
            }
            else {
                writeLine();
                increaseIndent();
            }
            if (node.readonlyToken) {
                emit(node.readonlyToken);
                if (node.readonlyToken.kind !== SyntaxKind.ReadonlyKeyword) {
                    writeKeyword("readonly");
                }
                writeSpace();
            }
            writePunctuation("[");

            emitWithContext(node.typeParameter, emitMappedTypeParameter);
            if (node.nameType) {
                writeSpace();
                writeKeyword("as");
                writeSpace();
                emit(node.nameType);
            }

            writePunctuation("]");
            if (node.questionToken) {
                emit(node.questionToken);
                if (node.questionToken.kind !== SyntaxKind.QuestionToken) {
                    writePunctuation("?");
                }
            }
            writePunctuation(":");
            writeSpace();
            emit(node.type);
            writeTrailingSemicolon();
            if (emitFlags & EmitFlags.SingleLine) {
                writeSpace();
            }
            else {
                writeLine();
                decreaseIndent();
            }
            writePunctuation("}");
        }

        function emitLiteralType(node: LiteralTypeNode) {
            emit(node.literal);
        }

        function emitTemplateType(node: TemplateLiteralTypeNode) {
            emit(node.head);
            emitList(node, node.templateSpans, ListFormat.TemplateExpressionSpans);
        }

        function emitImportTypeNode(node: ImportTypeNode) {
            if (node.isTypeOf) {
                writeKeyword("typeof");
                writeSpace();
            }
            writeKeyword("import");
            writePunctuation("(");
            emit(node.argument);
            writePunctuation(")");
            if (node.qualifier) {
                writePunctuation(".");
                emit(node.qualifier);
            }
            emitTypeArguments(node, node.typeArguments);
        }

        //
        // Binding patterns
        //

        function emitObjectBindingPattern(node: ObjectBindingPattern) {
            writePunctuation("{");
            emitList(node, node.elements, ListFormat.ObjectBindingPatternElements);
            writePunctuation("}");
        }

        function emitArrayBindingPattern(node: ArrayBindingPattern) {
            writePunctuation("[");
            emitList(node, node.elements, ListFormat.ArrayBindingPatternElements);
            writePunctuation("]");
        }

        function emitBindingElement(node: BindingElement) {
            emit(node.dotDotDotToken);
            if (node.propertyName) {
                emit(node.propertyName);
                writePunctuation(":");
                writeSpace();
            }
            emit(node.name);
            emitInitializer(node.initializer, node.name.end, node);
        }

        //
        // Expressions
        //

        function emitArrayLiteralExpression(node: ArrayLiteralExpression) {
            const elements = node.elements;
            const preferNewLine = node.multiLine ? ListFormat.PreferNewLine : ListFormat.None;
            emitList(node, elements, ListFormat.ArrayLiteralExpressionElements | preferNewLine);
        }

        function emitObjectLiteralExpression(node: ObjectLiteralExpression) {
            forEach(node.properties, generateMemberNames);

            const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
            if (indentedFlag) {
                increaseIndent();
            }

            const preferNewLine = node.multiLine ? ListFormat.PreferNewLine : ListFormat.None;
            const allowTrailingComma = currentSourceFile!.languageVersion >= ScriptTarget.ES5 && !isJsonSourceFile(currentSourceFile!) ? ListFormat.AllowTrailingComma : ListFormat.None;
            emitList(node, node.properties, ListFormat.ObjectLiteralExpressionProperties | allowTrailingComma | preferNewLine);

            if (indentedFlag) {
                decreaseIndent();
            }
        }

        function emitPropertyAccessExpression(node: PropertyAccessExpression) {
            emit(node.expression);
            const token = node.questionDotToken || setTextRangePosEnd(factory.createToken(SyntaxKind.DotToken) as DotToken, node.expression.end, node.name.pos);
            const linesBeforeDot = getLinesBetweenNodes(node, node.expression, token);
            const linesAfterDot = getLinesBetweenNodes(node, token, node.name);

            writeLinesAndIndent(linesBeforeDot, /*writeSpaceIfNotIndenting*/ false);

            const shouldEmitDotDot =
                token.kind !== SyntaxKind.QuestionDotToken &&
                mayNeedDotDotForPropertyAccess(node.expression) &&
                !writer.hasTrailingComment() &&
                !writer.hasTrailingWhitespace();

            if (shouldEmitDotDot) {
                writePunctuation(".");
            }

            if (node.questionDotToken) {
                emit(token);
            }
            else {
                emitTokenWithComment(token.kind, node.expression.end, writePunctuation, node);
            }
            writeLinesAndIndent(linesAfterDot, /*writeSpaceIfNotIndenting*/ false);
            emit(node.name);
            decreaseIndentIf(linesBeforeDot, linesAfterDot);
        }

        // 1..toString is a valid property access, emit a dot after the literal
        // Also emit a dot if expression is a integer const enum value - it will appear in generated code as numeric literal
        function mayNeedDotDotForPropertyAccess(expression: Expression) {
            expression = skipPartiallyEmittedExpressions(expression);
            if (isNumericLiteral(expression)) {
                // check if numeric literal is a decimal literal that was originally written with a dot
                const text = getLiteralTextOfNode(<LiteralExpression>expression, /*neverAsciiEscape*/ true, /*jsxAttributeEscape*/ false);
                // If he number will be printed verbatim and it doesn't already contain a dot, add one
                // if the expression doesn't have any comments that will be emitted.
                return !expression.numericLiteralFlags && !stringContains(text, tokenToString(SyntaxKind.DotToken)!);
            }
            else if (isAccessExpression(expression)) {
                // check if constant enum value is integer
                const constantValue = getConstantValue(expression);
                // isFinite handles cases when constantValue is undefined
                return typeof constantValue === "number" && isFinite(constantValue)
                    && Math.floor(constantValue) === constantValue;
            }
        }

        function emitElementAccessExpression(node: ElementAccessExpression) {
            emit(node.expression);
            emit(node.questionDotToken);
            emitTokenWithComment(SyntaxKind.OpenBracketToken, node.expression.end, writePunctuation, node);
            emit(node.argumentExpression);
            emitTokenWithComment(SyntaxKind.CloseBracketToken, node.argumentExpression.end, writePunctuation, node);
        }

        function emitCallExpression(node: CallExpression) {
            emit(node.expression);
            emit(node.questionDotToken);
            emitTypeArguments(node, node.typeArguments);
            emitList(node, node.arguments, ListFormat.CallExpressionArguments);
        }

        function emitNewExpression(node: NewExpression) {
            emitTokenWithComment(SyntaxKind.NewKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emit(node.expression);
            emitTypeArguments(node, node.typeArguments);
            emitList(node, node.arguments, ListFormat.NewExpressionArguments);
        }

        function emitTaggedTemplateExpression(node: TaggedTemplateExpression) {
            emit(node.tag);
            emitTypeArguments(node, node.typeArguments);
            writeSpace();
            emit(node.template);
        }

        function emitTypeAssertionExpression(node: TypeAssertion) {
            writePunctuation("<");
            emit(node.type);
            writePunctuation(">");
            emit(node.expression);
        }

        function emitParenthesizedExpression(node: ParenthesizedExpression) {
            const openParenPos = emitTokenWithComment(SyntaxKind.OpenParenToken, node.pos, writePunctuation, node);
            const indented = writeLineSeparatorsAndIndentBefore(node.expression, node);
            emit(node.expression);
            writeLineSeparatorsAfter(node.expression, node);
            decreaseIndentIf(indented);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression ? node.expression.end : openParenPos, writePunctuation, node);
        }

        function emitFunctionExpression(node: FunctionExpression) {
            generateNameIfNeeded(node.name);
            emitFunctionDeclarationOrExpression(node);
        }

        function emitArrowFunction(node: ArrowFunction) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            emitSignatureAndBody(node, emitArrowFunctionHead);
        }

        function emitArrowFunctionHead(node: ArrowFunction) {
            emitTypeParameters(node, node.typeParameters);
            emitParametersForArrow(node, node.parameters);
            emitTypeAnnotation(node.type);
            writeSpace();
            emit(node.equalsGreaterThanToken);
        }

        function emitDeleteExpression(node: DeleteExpression) {
            emitTokenWithComment(SyntaxKind.DeleteKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emit(node.expression);
        }

        function emitTypeOfExpression(node: TypeOfExpression) {
            emitTokenWithComment(SyntaxKind.TypeOfKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emit(node.expression);
        }

        function emitVoidExpression(node: VoidExpression) {
            emitTokenWithComment(SyntaxKind.VoidKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emit(node.expression);
        }

        function emitAwaitExpression(node: AwaitExpression) {
            emitTokenWithComment(SyntaxKind.AwaitKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emit(node.expression);
        }

        function emitPrefixUnaryExpression(node: PrefixUnaryExpression) {
            writeTokenText(node.operator, writeOperator);
            if (shouldEmitWhitespaceBeforeOperand(node)) {
                writeSpace();
            }
            emit(node.operand);
        }

        function shouldEmitWhitespaceBeforeOperand(node: PrefixUnaryExpression) {
            // In some cases, we need to emit a space between the operator and the operand. One obvious case
            // is when the operator is an identifier, like delete or typeof. We also need to do this for plus
            // and minus expressions in certain cases. Specifically, consider the following two cases (parens
            // are just for clarity of exposition, and not part of the source code):
            //
            //  (+(+1))
            //  (+(++1))
            //
            // We need to emit a space in both cases. In the first case, the absence of a space will make
            // the resulting expression a prefix increment operation. And in the second, it will make the resulting
            // expression a prefix increment whose operand is a plus expression - (++(+x))
            // The same is true of minus of course.
            const operand = node.operand;
            return operand.kind === SyntaxKind.PrefixUnaryExpression
                && ((node.operator === SyntaxKind.PlusToken && ((<PrefixUnaryExpression>operand).operator === SyntaxKind.PlusToken || (<PrefixUnaryExpression>operand).operator === SyntaxKind.PlusPlusToken))
                    || (node.operator === SyntaxKind.MinusToken && ((<PrefixUnaryExpression>operand).operator === SyntaxKind.MinusToken || (<PrefixUnaryExpression>operand).operator === SyntaxKind.MinusMinusToken)));
        }

        function emitPostfixUnaryExpression(node: PostfixUnaryExpression) {
            emit(node.operand);
            writeTokenText(node.operator, writeOperator);
        }

        function createEmitBinaryExpression() {
            interface WorkArea {
                stackIndex: number;
                preserveSourceNewlinesStack: (boolean | undefined)[];
                containerPosStack: number[];
                containerEndStack: number[];
                declarationListContainerEndStack: number[];
                shouldEmitCommentsStack: boolean[];
                shouldEmitSourceMapsStack: boolean[];
            }

            return createBinaryExpressionTrampoline(onEnter, maybeEmitExpression, onOperator, maybeEmitExpression, onExit, /*foldState*/ undefined);

            function onEnter(node: BinaryExpression, state: WorkArea | undefined) {
                if (state) {
                    state.stackIndex++;
                    state.preserveSourceNewlinesStack[state.stackIndex] = preserveSourceNewlines;
                    state.containerPosStack[state.stackIndex] = containerPos;
                    state.containerEndStack[state.stackIndex] = containerEnd;
                    state.declarationListContainerEndStack[state.stackIndex] = declarationListContainerEnd;
                    const emitComments = state.shouldEmitCommentsStack[state.stackIndex] = shouldEmitComments(node);
                    const emitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex] = shouldEmitSourceMaps(node);
                    beforeEmitWithContext(node, emitComments, emitSourceMaps);
                }
                else {
                    state = {
                        stackIndex: 0,
                        preserveSourceNewlinesStack: [undefined],
                        containerPosStack: [-1],
                        containerEndStack: [-1],
                        declarationListContainerEndStack: [-1],
                        shouldEmitCommentsStack: [false],
                        shouldEmitSourceMapsStack: [false],
                    };
                }
                return state;
            }

            function onOperator(operatorToken: BinaryOperatorToken, _state: WorkArea, node: BinaryExpression) {
                const isCommaOperator = operatorToken.kind !== SyntaxKind.CommaToken;
                const linesBeforeOperator = getLinesBetweenNodes(node, node.left, operatorToken);
                const linesAfterOperator = getLinesBetweenNodes(node, operatorToken, node.right);
                writeLinesAndIndent(linesBeforeOperator, isCommaOperator);
                emitLeadingCommentsOfPosition(operatorToken.pos);
                writeTokenNode(operatorToken, operatorToken.kind === SyntaxKind.InKeyword ? writeKeyword : writeOperator);
                emitTrailingCommentsOfPosition(operatorToken.end, /*prefixSpace*/ true); // Binary operators should have a space before the comment starts
                writeLinesAndIndent(linesAfterOperator, /*writeSpaceIfNotIndenting*/ true);
            }

            function onExit(node: BinaryExpression, state: WorkArea) {
                const linesBeforeOperator = getLinesBetweenNodes(node, node.left, node.operatorToken);
                const linesAfterOperator = getLinesBetweenNodes(node, node.operatorToken, node.right);
                decreaseIndentIf(linesBeforeOperator, linesAfterOperator);
                if (state.stackIndex > 0) {
                    const savedPreserveSourceNewlines = state.preserveSourceNewlinesStack[state.stackIndex];
                    const savedContainerPos = state.containerPosStack[state.stackIndex];
                    const savedContainerEnd = state.containerEndStack[state.stackIndex];
                    const savedDeclarationListContainerEnd = state.declarationListContainerEndStack[state.stackIndex];
                    const shouldEmitComments = state.shouldEmitCommentsStack[state.stackIndex];
                    const shouldEmitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex];
                    afterEmitWithContext(node, shouldEmitComments, shouldEmitSourceMaps, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd, savedPreserveSourceNewlines);
                    state.stackIndex--;
                }
            }

            function maybeEmitExpression(next: Expression) {
                // Push a new frame for binary expressions, otherwise emit all other expressions.
                if (isBinaryExpression(next)) {
                    return next;
                }

                emit(next);
            }
        }

        function emitConditionalExpression(node: ConditionalExpression) {
            const linesBeforeQuestion = getLinesBetweenNodes(node, node.condition, node.questionToken);
            const linesAfterQuestion = getLinesBetweenNodes(node, node.questionToken, node.whenTrue);
            const linesBeforeColon = getLinesBetweenNodes(node, node.whenTrue, node.colonToken);
            const linesAfterColon = getLinesBetweenNodes(node, node.colonToken, node.whenFalse);

            emit(node.condition);
            writeLinesAndIndent(linesBeforeQuestion, /*writeSpaceIfNotIndenting*/ true);
            emit(node.questionToken);
            writeLinesAndIndent(linesAfterQuestion, /*writeSpaceIfNotIndenting*/ true);
            emit(node.whenTrue);
            decreaseIndentIf(linesBeforeQuestion, linesAfterQuestion);

            writeLinesAndIndent(linesBeforeColon, /*writeSpaceIfNotIndenting*/ true);
            emit(node.colonToken);
            writeLinesAndIndent(linesAfterColon, /*writeSpaceIfNotIndenting*/ true);
            emit(node.whenFalse);
            decreaseIndentIf(linesBeforeColon, linesAfterColon);
        }

        function emitTemplateExpression(node: TemplateExpression) {
            emit(node.head);
            emitList(node, node.templateSpans, ListFormat.TemplateExpressionSpans);
        }

        function emitYieldExpression(node: YieldExpression) {
            emitTokenWithComment(SyntaxKind.YieldKeyword, node.pos, writeKeyword, node);
            emit(node.asteriskToken);
            emitExpressionWithLeadingSpace(node.expression);
        }

        function emitSpreadExpression(node: SpreadElement) {
            emitTokenWithComment(SyntaxKind.DotDotDotToken, node.pos, writePunctuation, node);
            emit(node.expression);
        }

        function emitClassExpression(node: ClassExpression) {
            generateNameIfNeeded(node.name);
            emitClassDeclarationOrExpression(node);
        }

        function emitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
            emit(node.expression);
            emitTypeArguments(node, node.typeArguments);
        }

        function emitAsExpression(node: AsExpression) {
            emit(node.expression);
            if (node.type) {
                writeSpace();
                writeKeyword("as");
                writeSpace();
                emit(node.type);
            }
        }

        function emitNonNullExpression(node: NonNullExpression) {
            emit(node.expression);
            writeOperator("!");
        }

        function emitMetaProperty(node: MetaProperty) {
            writeToken(node.keywordToken, node.pos, writePunctuation);
            writePunctuation(".");
            emit(node.name);
        }

        //
        // Misc
        //

        function emitTemplateSpan(node: TemplateSpan) {
            emit(node.expression);
            emit(node.literal);
        }

        //
        // Statements
        //

        function emitBlock(node: Block) {
            emitBlockStatements(node, /*forceSingleLine*/ !node.multiLine && isEmptyBlock(node));
        }

        function emitBlockStatements(node: BlockLike, forceSingleLine: boolean) {
            emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, /*contextNode*/ node);
            const format = forceSingleLine || getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineBlockStatements : ListFormat.MultiLineBlockStatements;
            emitList(node, node.statements, format);
            emitTokenWithComment(SyntaxKind.CloseBraceToken, node.statements.end, writePunctuation, /*contextNode*/ node, /*indentLeading*/ !!(format & ListFormat.MultiLine));
        }

        function emitVariableStatement(node: VariableStatement) {
            emitModifiers(node, node.modifiers);
            emit(node.declarationList);
            writeTrailingSemicolon();
        }

        function emitEmptyStatement(isEmbeddedStatement: boolean) {
            // While most trailing semicolons are possibly insignificant, an embedded "empty"
            // statement is significant and cannot be elided by a trailing-semicolon-omitting writer.
            if (isEmbeddedStatement) {
                writePunctuation(";");
            }
            else {
                writeTrailingSemicolon();
            }
        }

        function emitEmbeddedEmptyStatement(_node: EmptyStatement) {
            emitEmptyStatement(/*isEmbeddedStatement*/ true);
        }

        function emitExpressionStatement(node: ExpressionStatement) {
            emit(node.expression);
            // Emit semicolon in non json files
            // or if json file that created synthesized expression(eg.define expression statement when --out and amd code generation)
            if (!isJsonSourceFile(currentSourceFile!) || nodeIsSynthesized(node.expression)) {
                writeTrailingSemicolon();
            }
        }

        function emitIfStatement(node: IfStatement) {
            const openParenPos = emitTokenWithComment(SyntaxKind.IfKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emit(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
            emitEmbeddedStatement(node, node.thenStatement);
            if (node.elseStatement) {
                writeLineOrSpace(node, node.thenStatement, node.elseStatement);
                emitTokenWithComment(SyntaxKind.ElseKeyword, node.thenStatement.end, writeKeyword, node);
                if (node.elseStatement.kind === SyntaxKind.IfStatement) {
                    writeSpace();
                    emit(node.elseStatement);
                }
                else {
                    emitEmbeddedStatement(node, node.elseStatement);
                }
            }
        }

        function emitWhileClause(node: WhileStatement | DoStatement, startPos: number) {
            const openParenPos = emitTokenWithComment(SyntaxKind.WhileKeyword, startPos, writeKeyword, node);
            writeSpace();
            emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emit(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        }

        function emitDoStatement(node: DoStatement) {
            emitTokenWithComment(SyntaxKind.DoKeyword, node.pos, writeKeyword, node);
            emitEmbeddedStatement(node, node.statement);
            if (isBlock(node.statement) && !preserveSourceNewlines) {
                writeSpace();
            }
            else {
                writeLineOrSpace(node, node.statement, node.expression);
            }

            emitWhileClause(node, node.statement.end);
            writeTrailingSemicolon();
        }

        function emitWhileStatement(node: WhileStatement) {
            emitWhileClause(node, node.pos);
            emitEmbeddedStatement(node, node.statement);
        }

        function emitForStatement(node: ForStatement) {
            const openParenPos = emitTokenWithComment(SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
            writeSpace();
            let pos = emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, /*contextNode*/ node);
            emitForBinding(node.initializer);
            pos = emitTokenWithComment(SyntaxKind.SemicolonToken, node.initializer ? node.initializer.end : pos, writePunctuation, node);
            emitExpressionWithLeadingSpace(node.condition);
            pos = emitTokenWithComment(SyntaxKind.SemicolonToken, node.condition ? node.condition.end : pos, writePunctuation, node);
            emitExpressionWithLeadingSpace(node.incrementor);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.incrementor ? node.incrementor.end : pos, writePunctuation, node);
            emitEmbeddedStatement(node, node.statement);
        }

        function emitForInStatement(node: ForInStatement) {
            const openParenPos = emitTokenWithComment(SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emitForBinding(node.initializer);
            writeSpace();
            emitTokenWithComment(SyntaxKind.InKeyword, node.initializer.end, writeKeyword, node);
            writeSpace();
            emit(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
            emitEmbeddedStatement(node, node.statement);
        }

        function emitForOfStatement(node: ForOfStatement) {
            const openParenPos = emitTokenWithComment(SyntaxKind.ForKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitWithTrailingSpace(node.awaitModifier);
            emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emitForBinding(node.initializer);
            writeSpace();
            emitTokenWithComment(SyntaxKind.OfKeyword, node.initializer.end, writeKeyword, node);
            writeSpace();
            emit(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
            emitEmbeddedStatement(node, node.statement);
        }

        function emitForBinding(node: VariableDeclarationList | Expression | undefined) {
            if (node !== undefined) {
                if (node.kind === SyntaxKind.VariableDeclarationList) {
                    emit(node);
                }
                else {
                    emit(node);
                }
            }
        }

        function emitContinueStatement(node: ContinueStatement) {
            emitTokenWithComment(SyntaxKind.ContinueKeyword, node.pos, writeKeyword, node);
            emitWithLeadingSpace(node.label);
            writeTrailingSemicolon();
        }

        function emitBreakStatement(node: BreakStatement) {
            emitTokenWithComment(SyntaxKind.BreakKeyword, node.pos, writeKeyword, node);
            emitWithLeadingSpace(node.label);
            writeTrailingSemicolon();
        }

        function emitTokenWithComment(token: SyntaxKind, pos: number, writer: (s: string) => void, contextNode: Node, indentLeading?: boolean) {
            const node = getParseTreeNode(contextNode);
            const isSimilarNode = node && node.kind === contextNode.kind;
            const startPos = pos;
            if (isSimilarNode && currentSourceFile) {
                pos = skipTrivia(currentSourceFile.text, pos);
            }
            if (isSimilarNode && contextNode.pos !== startPos) {
                const needsIndent = indentLeading && currentSourceFile && !positionsAreOnSameLine(startPos, pos, currentSourceFile);
                if (needsIndent) {
                    increaseIndent();
                }
                emitLeadingCommentsOfPosition(startPos);
                if (needsIndent) {
                    decreaseIndent();
                }
            }
            pos = writeTokenText(token, writer, pos);
            if (isSimilarNode && contextNode.end !== pos) {
                const isJsxExprContext = contextNode.kind === SyntaxKind.JsxExpression;
                emitTrailingCommentsOfPosition(pos, /*prefixSpace*/ !isJsxExprContext, /*forceNoNewline*/ isJsxExprContext);
            }
            return pos;
        }

        function emitReturnStatement(node: ReturnStatement) {
            emitTokenWithComment(SyntaxKind.ReturnKeyword, node.pos, writeKeyword, /*contextNode*/ node);
            emitExpressionWithLeadingSpace(node.expression);
            writeTrailingSemicolon();
        }

        function emitWithStatement(node: WithStatement) {
            const openParenPos = emitTokenWithComment(SyntaxKind.WithKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emit(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
            emitEmbeddedStatement(node, node.statement);
        }

        function emitSwitchStatement(node: SwitchStatement) {
            const openParenPos = emitTokenWithComment(SyntaxKind.SwitchKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emit(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
            writeSpace();
            emit(node.caseBlock);
        }

        function emitLabeledStatement(node: LabeledStatement) {
            emit(node.label);
            emitTokenWithComment(SyntaxKind.ColonToken, node.label.end, writePunctuation, node);
            writeSpace();
            emit(node.statement);
        }

        function emitThrowStatement(node: ThrowStatement) {
            emitTokenWithComment(SyntaxKind.ThrowKeyword, node.pos, writeKeyword, node);
            emitExpressionWithLeadingSpace(node.expression);
            writeTrailingSemicolon();
        }

        function emitTryStatement(node: TryStatement) {
            emitTokenWithComment(SyntaxKind.TryKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emit(node.tryBlock);
            if (node.catchClause) {
                writeLineOrSpace(node, node.tryBlock, node.catchClause);
                emit(node.catchClause);
            }
            if (node.finallyBlock) {
                writeLineOrSpace(node, node.catchClause || node.tryBlock, node.finallyBlock);
                emitTokenWithComment(SyntaxKind.FinallyKeyword, (node.catchClause || node.tryBlock).end, writeKeyword, node);
                writeSpace();
                emit(node.finallyBlock);
            }
        }

        function emitDebuggerStatement(node: DebuggerStatement) {
            writeToken(SyntaxKind.DebuggerKeyword, node.pos, writeKeyword);
            writeTrailingSemicolon();
        }

        //
        // Declarations
        //

        function emitVariableDeclaration(node: VariableDeclaration) {
            emit(node.name);
            emit(node.exclamationToken);
            emitTypeAnnotation(node.type);
            emitInitializer(node.initializer, node.type ? node.type.end : node.name.end, node);
        }

        function emitVariableDeclarationList(node: VariableDeclarationList) {
            writeKeyword(isLet(node) ? "let" : isVarConst(node) ? "const" : "var");
            writeSpace();
            emitList(node, node.declarations, ListFormat.VariableDeclarationList);
        }

        function emitFunctionDeclaration(node: FunctionDeclaration) {
            emitFunctionDeclarationOrExpression(node);
        }

        function emitFunctionDeclarationOrExpression(node: FunctionDeclaration | FunctionExpression) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            writeKeyword("function");
            emit(node.asteriskToken);
            writeSpace();
            emit(node.name);
            emitSignatureAndBody(node, emitSignatureHead);
        }

        function emitSignatureAndBody(node: FunctionLikeDeclaration, emitSignatureHead: (node: SignatureDeclaration) => void) {
            const body = node.body;
            if (body) {
                if (isBlock(body)) {
                    const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
                    if (indentedFlag) {
                        increaseIndent();
                    }

                    pushNameGenerationScope(node);
                    forEach(node.parameters, generateNames);
                    generateNames(node.body);

                    emitSignatureHead(node);
                    emitBlockFunctionBody(body);
                    popNameGenerationScope(node);

                    if (indentedFlag) {
                        decreaseIndent();
                    }
                }
                else {
                    emitSignatureHead(node);
                    writeSpace();
                    emit(body);
                }
            }
            else {
                emitSignatureHead(node);
                writeTrailingSemicolon();
            }

        }

        function emitSignatureHead(node: FunctionDeclaration | FunctionExpression | MethodDeclaration | AccessorDeclaration | ConstructorDeclaration) {
            emitTypeParameters(node, node.typeParameters);
            emitParameters(node, node.parameters);
            emitTypeAnnotation(node.type);
        }

        function shouldEmitBlockFunctionBodyOnSingleLine(body: Block) {
            // We must emit a function body as a single-line body in the following case:
            // * The body has NodeEmitFlags.SingleLine specified.

            // We must emit a function body as a multi-line body in the following cases:
            // * The body is explicitly marked as multi-line.
            // * A non-synthesized body's start and end position are on different lines.
            // * Any statement in the body starts on a new line.

            if (getEmitFlags(body) & EmitFlags.SingleLine) {
                return true;
            }

            if (body.multiLine) {
                return false;
            }

            if (!nodeIsSynthesized(body) && !rangeIsOnSingleLine(body, currentSourceFile!)) {
                return false;
            }

            if (getLeadingLineTerminatorCount(body, body.statements, ListFormat.PreserveLines)
                || getClosingLineTerminatorCount(body, body.statements, ListFormat.PreserveLines)) {
                return false;
            }

            let previousStatement: Statement | undefined;
            for (const statement of body.statements) {
                if (getSeparatingLineTerminatorCount(previousStatement, statement, ListFormat.PreserveLines) > 0) {
                    return false;
                }

                previousStatement = statement;
            }

            return true;
        }

        function emitBlockFunctionBody(body: Block) {
            onBeforeEmitNode?.(body);
            writeSpace();
            writePunctuation("{");
            increaseIndent();

            const emitBlockFunctionBody = shouldEmitBlockFunctionBodyOnSingleLine(body)
                ? emitBlockFunctionBodyOnSingleLine
                : emitBlockFunctionBodyWorker;

            if (emitBodyWithDetachedComments) {
                emitBodyWithDetachedComments(body, body.statements, emitBlockFunctionBody);
            }
            else {
                emitBlockFunctionBody(body);
            }

            decreaseIndent();
            writeToken(SyntaxKind.CloseBraceToken, body.statements.end, writePunctuation, body);
            onAfterEmitNode?.(body);
        }

        function emitBlockFunctionBodyOnSingleLine(body: Block) {
            emitBlockFunctionBodyWorker(body, /*emitBlockFunctionBodyOnSingleLine*/ true);
        }

        function emitBlockFunctionBodyWorker(body: Block, emitBlockFunctionBodyOnSingleLine?: boolean) {
            // Emit all the prologue directives (like "use strict").
            const statementOffset = emitPrologueDirectives(body.statements);
            const pos = writer.getTextPos();
            emitHelpers(body);
            if (statementOffset === 0 && pos === writer.getTextPos() && emitBlockFunctionBodyOnSingleLine) {
                decreaseIndent();
                emitList(body, body.statements, ListFormat.SingleLineFunctionBodyStatements);
                increaseIndent();
            }
            else {
                emitList(body, body.statements, ListFormat.MultiLineFunctionBodyStatements, statementOffset);
            }
        }

        function emitClassDeclaration(node: ClassDeclaration) {
            emitClassDeclarationOrExpression(node);
        }

        function emitClassDeclarationOrExpression(node: ClassDeclaration | ClassExpression) {
            forEach(node.members, generateMemberNames);

            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            writeKeyword("class");
            if (node.name) {
                writeSpace();
                emit(node.name);
            }

            const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
            if (indentedFlag) {
                increaseIndent();
            }

            emitTypeParameters(node, node.typeParameters);
            emitList(node, node.heritageClauses, ListFormat.ClassHeritageClauses);

            writeSpace();
            writePunctuation("{");
            emitList(node, node.members, ListFormat.ClassMembers);
            writePunctuation("}");

            if (indentedFlag) {
                decreaseIndent();
            }
        }

        function emitInterfaceDeclaration(node: InterfaceDeclaration) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            writeKeyword("interface");
            writeSpace();
            emit(node.name);
            emitTypeParameters(node, node.typeParameters);
            emitList(node, node.heritageClauses, ListFormat.HeritageClauses);
            writeSpace();
            writePunctuation("{");
            emitList(node, node.members, ListFormat.InterfaceMembers);
            writePunctuation("}");
        }

        function emitTypeAliasDeclaration(node: TypeAliasDeclaration) {
            emitDecorators(node, node.decorators);
            emitModifiers(node, node.modifiers);
            writeKeyword("type");
            writeSpace();
            emit(node.name);
            emitTypeParameters(node, node.typeParameters);
            writeSpace();
            writePunctuation("=");
            writeSpace();
            emit(node.type);
            writeTrailingSemicolon();
        }

        function emitEnumDeclaration(node: EnumDeclaration) {
            emitModifiers(node, node.modifiers);
            writeKeyword("enum");
            writeSpace();
            emit(node.name);

            writeSpace();
            writePunctuation("{");
            emitList(node, node.members, ListFormat.EnumMembers);
            writePunctuation("}");
        }

        function emitModuleDeclaration(node: ModuleDeclaration) {
            emitModifiers(node, node.modifiers);
            if (~node.flags & NodeFlags.GlobalAugmentation) {
                writeKeyword(node.flags & NodeFlags.Namespace ? "namespace" : "module");
                writeSpace();
            }
            emit(node.name);

            let body = node.body;
            if (!body) return writeTrailingSemicolon();
            while (body && isModuleDeclaration(body)) {
                writePunctuation(".");
                emit(body.name);
                body = body.body;
            }

            writeSpace();
            emit(body);
        }

        function emitModuleBlock(node: ModuleBlock) {
            pushNameGenerationScope(node);
            forEach(node.statements, generateNames);
            emitBlockStatements(node, /*forceSingleLine*/ isEmptyBlock(node));
            popNameGenerationScope(node);
        }

        function emitCaseBlock(node: CaseBlock) {
            emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, node);
            emitList(node, node.clauses, ListFormat.CaseBlockClauses);
            emitTokenWithComment(SyntaxKind.CloseBraceToken, node.clauses.end, writePunctuation, node, /*indentLeading*/ true);
        }

        function emitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            emitModifiers(node, node.modifiers);
            emitTokenWithComment(SyntaxKind.ImportKeyword, node.modifiers ? node.modifiers.end : node.pos, writeKeyword, node);
            writeSpace();
            if (node.isTypeOnly) {
                emitTokenWithComment(SyntaxKind.TypeKeyword, node.pos, writeKeyword, node);
                writeSpace();
            }
            emit(node.name);
            writeSpace();
            emitTokenWithComment(SyntaxKind.EqualsToken, node.name.end, writePunctuation, node);
            writeSpace();
            emitModuleReference(node.moduleReference);
            writeTrailingSemicolon();
        }

        function emitModuleReference(node: ModuleReference) {
            if (node.kind === SyntaxKind.Identifier) {
                emit(node);
            }
            else {
                emit(node);
            }
        }

        function emitImportDeclaration(node: ImportDeclaration) {
            emitModifiers(node, node.modifiers);
            emitTokenWithComment(SyntaxKind.ImportKeyword, node.modifiers ? node.modifiers.end : node.pos, writeKeyword, node);
            writeSpace();
            if (node.importClause) {
                emit(node.importClause);
                writeSpace();
                emitTokenWithComment(SyntaxKind.FromKeyword, node.importClause.end, writeKeyword, node);
                writeSpace();
            }
            emit(node.moduleSpecifier);
            writeTrailingSemicolon();
        }

        function emitImportClause(node: ImportClause) {
            if (node.isTypeOnly) {
                emitTokenWithComment(SyntaxKind.TypeKeyword, node.pos, writeKeyword, node);
                writeSpace();
            }
            emit(node.name);
            if (node.name && node.namedBindings) {
                emitTokenWithComment(SyntaxKind.CommaToken, node.name.end, writePunctuation, node);
                writeSpace();
            }
            emit(node.namedBindings);
        }

        function emitNamespaceImport(node: NamespaceImport) {
            const asPos = emitTokenWithComment(SyntaxKind.AsteriskToken, node.pos, writePunctuation, node);
            writeSpace();
            emitTokenWithComment(SyntaxKind.AsKeyword, asPos, writeKeyword, node);
            writeSpace();
            emit(node.name);
        }

        function emitNamedImports(node: NamedImports) {
            emitNamedImportsOrExports(node);
        }

        function emitImportSpecifier(node: ImportSpecifier) {
            emitImportOrExportSpecifier(node);
        }

        function emitExportAssignment(node: ExportAssignment) {
            const nextPos = emitTokenWithComment(SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
            writeSpace();
            if (node.isExportEquals) {
                emitTokenWithComment(SyntaxKind.EqualsToken, nextPos, writeOperator, node);
            }
            else {
                emitTokenWithComment(SyntaxKind.DefaultKeyword, nextPos, writeKeyword, node);
            }
            writeSpace();
            emit(node.expression);
            writeTrailingSemicolon();
        }

        function emitExportDeclaration(node: ExportDeclaration) {
            let nextPos = emitTokenWithComment(SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
            writeSpace();
            if (node.isTypeOnly) {
                nextPos = emitTokenWithComment(SyntaxKind.TypeKeyword, nextPos, writeKeyword, node);
                writeSpace();
            }
            if (node.exportClause) {
                emit(node.exportClause);
            }
            else {
                nextPos = emitTokenWithComment(SyntaxKind.AsteriskToken, nextPos, writePunctuation, node);
            }
            if (node.moduleSpecifier) {
                writeSpace();
                const fromPos = node.exportClause ? node.exportClause.end : nextPos;
                emitTokenWithComment(SyntaxKind.FromKeyword, fromPos, writeKeyword, node);
                writeSpace();
                emit(node.moduleSpecifier);
            }
            writeTrailingSemicolon();
        }

        function emitNamespaceExportDeclaration(node: NamespaceExportDeclaration) {
            let nextPos = emitTokenWithComment(SyntaxKind.ExportKeyword, node.pos, writeKeyword, node);
            writeSpace();
            nextPos = emitTokenWithComment(SyntaxKind.AsKeyword, nextPos, writeKeyword, node);
            writeSpace();
            nextPos = emitTokenWithComment(SyntaxKind.NamespaceKeyword, nextPos, writeKeyword, node);
            writeSpace();
            emit(node.name);
            writeTrailingSemicolon();
        }

        function emitNamespaceExport(node: NamespaceExport) {
            const asPos = emitTokenWithComment(SyntaxKind.AsteriskToken, node.pos, writePunctuation, node);
            writeSpace();
            emitTokenWithComment(SyntaxKind.AsKeyword, asPos, writeKeyword, node);
            writeSpace();
            emit(node.name);
        }

        function emitNamedExports(node: NamedExports) {
            emitNamedImportsOrExports(node);
        }

        function emitExportSpecifier(node: ExportSpecifier) {
            emitImportOrExportSpecifier(node);
        }

        function emitNamedImportsOrExports(node: NamedImportsOrExports) {
            writePunctuation("{");
            emitList(node, node.elements, ListFormat.NamedImportsOrExportsElements);
            writePunctuation("}");
        }

        function emitImportOrExportSpecifier(node: ImportOrExportSpecifier) {
            if (node.propertyName) {
                emit(node.propertyName);
                writeSpace();
                emitTokenWithComment(SyntaxKind.AsKeyword, node.propertyName.end, writeKeyword, node);
                writeSpace();
            }

            emit(node.name);
        }

        //
        // Module references
        //

        function emitExternalModuleReference(node: ExternalModuleReference) {
            writeKeyword("require");
            writePunctuation("(");
            emit(node.expression);
            writePunctuation(")");
        }

        //
        // JSX
        //

        function emitJsxElement(node: JsxElement) {
            emit(node.openingElement);
            emitList(node, node.children, ListFormat.JsxElementOrFragmentChildren);
            emit(node.closingElement);
        }

        function emitJsxSelfClosingElement(node: JsxSelfClosingElement) {
            writePunctuation("<");
            emitJsxTagName(node.tagName);
            emitTypeArguments(node, node.typeArguments);
            writeSpace();
            emit(node.attributes);
            writePunctuation("/>");
        }

        function emitJsxFragment(node: JsxFragment) {
            emit(node.openingFragment);
            emitList(node, node.children, ListFormat.JsxElementOrFragmentChildren);
            emit(node.closingFragment);
        }

        function emitJsxOpeningElementOrFragment(node: JsxOpeningElement | JsxOpeningFragment) {
            writePunctuation("<");

            if (isJsxOpeningElement(node)) {
                const indented = writeLineSeparatorsAndIndentBefore(node.tagName, node);
                emitJsxTagName(node.tagName);
                emitTypeArguments(node, node.typeArguments);
                if (node.attributes.properties && node.attributes.properties.length > 0) {
                    writeSpace();
                }
                emit(node.attributes);
                writeLineSeparatorsAfter(node.attributes, node);
                decreaseIndentIf(indented);
            }

            writePunctuation(">");
        }

        function emitJsxText(node: JsxText) {
            writer.writeLiteral(node.text);
        }

        function emitJsxClosingElementOrFragment(node: JsxClosingElement | JsxClosingFragment) {
            writePunctuation("</");
            if (isJsxClosingElement(node)) {
                emitJsxTagName(node.tagName);
            }
            writePunctuation(">");
        }

        function emitJsxAttributes(node: JsxAttributes) {
            emitList(node, node.properties, ListFormat.JsxElementAttributes);
        }

        function emitJsxAttributeValue(node: StringLiteral | JsxExpression): void {
            const emitCallback = isStringLiteral(node) ? emitStringLiteralWithJsxAttributeEscape : emitWorker;
            emitWithContext(node, emitCallback);
        }

        function emitJsxAttribute(node: JsxAttribute) {
            emit(node.name);
            emitNodeWithPrefix("=", writePunctuation, node.initializer, emitJsxAttributeValue);
        }

        function emitJsxSpreadAttribute(node: JsxSpreadAttribute) {
            writePunctuation("{...");
            emit(node.expression);
            writePunctuation("}");
        }

        function hasTrailingCommentsAtPosition(pos: number) {
            let result = false;
            forEachTrailingCommentRange(currentSourceFile?.text || "", pos + 1, () => result = true);
            return result;
        }

        function hasLeadingCommentsAtPosition(pos: number) {
            let result = false;
            forEachLeadingCommentRange(currentSourceFile?.text || "", pos + 1, () => result = true);
            return result;
        }

        function hasCommentsAtPosition(pos: number) {
            return hasTrailingCommentsAtPosition(pos) || hasLeadingCommentsAtPosition(pos);
        }

        function emitJsxExpression(node: JsxExpression) {
            if (node.expression || (!commentsDisabled && !nodeIsSynthesized(node) && hasCommentsAtPosition(node.pos))) { // preserve empty expressions if they contain comments!
                const isMultiline = currentSourceFile && !nodeIsSynthesized(node) && getLineAndCharacterOfPosition(currentSourceFile, node.pos).line !== getLineAndCharacterOfPosition(currentSourceFile, node.end).line;
                if (isMultiline) {
                    writer.increaseIndent();
                }
                const end = emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, node);
                emit(node.dotDotDotToken);
                emit(node.expression);
                emitTokenWithComment(SyntaxKind.CloseBraceToken, node.expression?.end || end, writePunctuation, node);
                if (isMultiline) {
                    writer.decreaseIndent();
                }
            }
        }

        function emitJsxTagName(node: JsxTagNameExpression) {
            if (node.kind === SyntaxKind.Identifier) {
                emit(node);
            }
            else {
                emit(node);
            }
        }

        //
        // Clauses
        //

        function emitCaseClause(node: CaseClause) {
            emitTokenWithComment(SyntaxKind.CaseKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emit(node.expression);

            emitCaseOrDefaultClauseRest(node, node.statements, node.expression.end);
        }

        function emitDefaultClause(node: DefaultClause) {
            const pos = emitTokenWithComment(SyntaxKind.DefaultKeyword, node.pos, writeKeyword, node);
            emitCaseOrDefaultClauseRest(node, node.statements, pos);
        }

        function emitCaseOrDefaultClauseRest(parentNode: Node, statements: NodeArray<Statement>, colonPos: number) {
            const emitAsSingleStatement =
                statements.length === 1 &&
                (
                    // treat synthesized nodes as located on the same line for emit purposes
                    nodeIsSynthesized(parentNode) ||
                    nodeIsSynthesized(statements[0]) ||
                    rangeStartPositionsAreOnSameLine(parentNode, statements[0], currentSourceFile!)
                );

            let format = ListFormat.CaseOrDefaultClauseStatements;
            if (emitAsSingleStatement) {
                writeToken(SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
                writeSpace();
                format &= ~(ListFormat.MultiLine | ListFormat.Indented);
            }
            else {
                emitTokenWithComment(SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
            }
            emitList(parentNode, statements, format);
        }

        function emitHeritageClause(node: HeritageClause) {
            writeSpace();
            writeTokenText(node.token, writeKeyword);
            writeSpace();
            emitList(node, node.types, ListFormat.HeritageClauseTypes);
        }

        function emitCatchClause(node: CatchClause) {
            const openParenPos = emitTokenWithComment(SyntaxKind.CatchKeyword, node.pos, writeKeyword, node);
            writeSpace();
            if (node.variableDeclaration) {
                emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
                emit(node.variableDeclaration);
                emitTokenWithComment(SyntaxKind.CloseParenToken, node.variableDeclaration.end, writePunctuation, node);
                writeSpace();
            }
            emit(node.block);
        }

        //
        // Property assignments
        //

        function emitPropertyAssignment(node: PropertyAssignment) {
            emit(node.name);
            writePunctuation(":");
            writeSpace();
            // This is to ensure that we emit comment in the following case:
            //      For example:
            //          obj = {
            //              id: /*comment1*/ ()=>void
            //          }
            // "comment1" is not considered to be leading comment for node.initializer
            // but rather a trailing comment on the previous node.
            const initializer = node.initializer;
            if ((getEmitFlags(initializer) & EmitFlags.NoLeadingComments) === 0) {
                const commentRange = getCommentRange(initializer);
                emitTrailingCommentsOfPosition(commentRange.pos);
            }
            emit(initializer);
        }

        function emitShorthandPropertyAssignment(node: ShorthandPropertyAssignment) {
            emit(node.name);
            if (node.objectAssignmentInitializer) {
                writeSpace();
                writePunctuation("=");
                writeSpace();
                emit(node.objectAssignmentInitializer);
            }
        }

        function emitSpreadAssignment(node: SpreadAssignment) {
            if (node.expression) {
                emitTokenWithComment(SyntaxKind.DotDotDotToken, node.pos, writePunctuation, node);
                emit(node.expression);
            }
        }

        //
        // Enum
        //

        function emitEnumMember(node: EnumMember) {
            emit(node.name);
            emitInitializer(node.initializer, node.name.end, node);
        }

        //
        // JSDoc
        //
        function emitJSDoc(node: JSDoc) {
            write("/**");
            if (node.comment) {
                const text = getTextOfJSDocComment(node.comment);
                if (text) {
                    const lines = text.split(/\r\n?|\n/g);
                    for (const line of lines) {
                        writeLine();
                        writeSpace();
                        writePunctuation("*");
                        writeSpace();
                        write(line);
                    }
                }
            }
            if (node.tags) {
                if (node.tags.length === 1 && node.tags[0].kind === SyntaxKind.JSDocTypeTag && !node.comment) {
                    writeSpace();
                    emit(node.tags[0]);
                }
                else {
                    emitList(node, node.tags, ListFormat.JSDocComment);
                }
            }
            writeSpace();
            write("*/");
        }

        function emitJSDocSimpleTypedTag(tag: JSDocTypeTag | JSDocThisTag | JSDocEnumTag | JSDocReturnTag) {
            emitJSDocTagName(tag.tagName);
            emitJSDocTypeExpression(tag.typeExpression);
            emitJSDocComment(tag.comment);
        }

        function emitJSDocSeeTag(tag: JSDocSeeTag) {
            emitJSDocTagName(tag.tagName);
            emit(tag.name);
            emitJSDocComment(tag.comment);
        }

        function emitJSDocNameReference(node: JSDocNameReference) {
            writeSpace();
            writePunctuation("{");
            emit(node.name);
            writePunctuation("}");
        }

        function emitJSDocHeritageTag(tag: JSDocImplementsTag | JSDocAugmentsTag) {
            emitJSDocTagName(tag.tagName);
            writeSpace();
            writePunctuation("{");
            emit(tag.class);
            writePunctuation("}");
            emitJSDocComment(tag.comment);
        }

        function emitJSDocTemplateTag(tag: JSDocTemplateTag) {
            emitJSDocTagName(tag.tagName);
            emitJSDocTypeExpression(tag.constraint);
            writeSpace();
            emitList(tag, tag.typeParameters, ListFormat.CommaListElements);
            emitJSDocComment(tag.comment);
        }

        function emitJSDocTypedefTag(tag: JSDocTypedefTag) {
            emitJSDocTagName(tag.tagName);
            if (tag.typeExpression) {
                if (tag.typeExpression.kind === SyntaxKind.JSDocTypeExpression) {
                    emitJSDocTypeExpression(tag.typeExpression);
                }
                else {
                    writeSpace();
                    writePunctuation("{");
                    write("Object");
                    if (tag.typeExpression.isArrayType) {
                        writePunctuation("[");
                        writePunctuation("]");
                    }
                    writePunctuation("}");
                }
            }
            if (tag.fullName) {
                writeSpace();
                emit(tag.fullName);
            }
            emitJSDocComment(tag.comment);
            if (tag.typeExpression && tag.typeExpression.kind === SyntaxKind.JSDocTypeLiteral) {
                emitJSDocTypeLiteral(tag.typeExpression);
            }
        }

        function emitJSDocCallbackTag(tag: JSDocCallbackTag) {
            emitJSDocTagName(tag.tagName);
            if (tag.name) {
                writeSpace();
                emit(tag.name);
            }
            emitJSDocComment(tag.comment);
            emitJSDocSignature(tag.typeExpression);
        }

        function emitJSDocSimpleTag(tag: JSDocTag) {
            emitJSDocTagName(tag.tagName);
            emitJSDocComment(tag.comment);
        }

        function emitJSDocTypeLiteral(lit: JSDocTypeLiteral) {
            emitList(lit, factory.createNodeArray(lit.jsDocPropertyTags), ListFormat.JSDocComment);
        }

        function emitJSDocSignature(sig: JSDocSignature) {
            if (sig.typeParameters) {
                emitList(sig, factory.createNodeArray(sig.typeParameters), ListFormat.JSDocComment);
            }
            if (sig.parameters) {
                emitList(sig, factory.createNodeArray(sig.parameters), ListFormat.JSDocComment);
            }
            if (sig.type) {
                writeLine();
                writeSpace();
                writePunctuation("*");
                writeSpace();
                emit(sig.type);
            }
        }

        function emitJSDocPropertyLikeTag(param: JSDocPropertyLikeTag) {
            emitJSDocTagName(param.tagName);
            emitJSDocTypeExpression(param.typeExpression);
            writeSpace();
            if (param.isBracketed) {
                writePunctuation("[");
            }
            emit(param.name);
            if (param.isBracketed) {
                writePunctuation("]");
            }
            emitJSDocComment(param.comment);
        }

        function emitJSDocTagName(tagName: Identifier) {
            writePunctuation("@");
            emit(tagName);
        }

        function emitJSDocComment(comment: string | NodeArray<JSDocText | JSDocLink> | undefined) {
            const text = getTextOfJSDocComment(comment);
            if (text) {
                writeSpace();
                write(text);
            }
        }

        function emitJSDocTypeExpression(typeExpression: JSDocTypeExpression | undefined) {
            if (typeExpression) {
                writeSpace();
                writePunctuation("{");
                emit(typeExpression.type);
                writePunctuation("}");
            }
        }

        //
        // Top-level nodes
        //

        function emitSourceFile(node: SourceFile) {
            writeLine();
            const statements = node.statements;
            if (emitBodyWithDetachedComments) {
                // Emit detached comment if there are no prologue directives or if the first node is synthesized.
                // The synthesized node will have no leading comment so some comments may be missed.
                const shouldEmitDetachedComment = statements.length === 0 ||
                    !isPrologueDirective(statements[0]) ||
                    nodeIsSynthesized(statements[0]);
                if (shouldEmitDetachedComment) {
                    emitBodyWithDetachedComments(node, statements, emitSourceFileWorker);
                    return;
                }
            }
            emitSourceFileWorker(node);
        }

        function emitSyntheticTripleSlashReferencesIfNeeded(node: Bundle) {
            emitTripleSlashDirectives(!!node.hasNoDefaultLib, node.syntheticFileReferences || [], node.syntheticTypeReferences || [], node.syntheticLibReferences || []);
            for (const prepend of node.prepends) {
                if (isUnparsedSource(prepend) && prepend.syntheticReferences) {
                    for (const ref of prepend.syntheticReferences) {
                        emit(ref);
                        writeLine();
                    }
                }
            }
        }

        function emitTripleSlashDirectivesIfNeeded(node: SourceFile) {
            if (node.isDeclarationFile) emitTripleSlashDirectives(node.hasNoDefaultLib, node.referencedFiles, node.typeReferenceDirectives, node.libReferenceDirectives);
        }

        function emitTripleSlashDirectives(hasNoDefaultLib: boolean, files: readonly FileReference[], types: readonly FileReference[], libs: readonly FileReference[]) {
            if (hasNoDefaultLib) {
                const pos = writer.getTextPos();
                writeComment(`/// <reference no-default-lib="true"/>`);
                if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.NoDefaultLib });
                writeLine();
            }
            if (currentSourceFile && currentSourceFile.moduleName) {
                writeComment(`/// <amd-module name="${currentSourceFile.moduleName}" />`);
                writeLine();
            }
            if (currentSourceFile && currentSourceFile.amdDependencies) {
                for (const dep of currentSourceFile.amdDependencies) {
                    if (dep.name) {
                        writeComment(`/// <amd-dependency name="${dep.name}" path="${dep.path}" />`);
                    }
                    else {
                        writeComment(`/// <amd-dependency path="${dep.path}" />`);
                    }
                    writeLine();
                }
            }
            for (const directive of files) {
                const pos = writer.getTextPos();
                writeComment(`/// <reference path="${directive.fileName}" />`);
                if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Reference, data: directive.fileName });
                writeLine();
            }
            for (const directive of types) {
                const pos = writer.getTextPos();
                writeComment(`/// <reference types="${directive.fileName}" />`);
                if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Type, data: directive.fileName });
                writeLine();
            }
            for (const directive of libs) {
                const pos = writer.getTextPos();
                writeComment(`/// <reference lib="${directive.fileName}" />`);
                if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Lib, data: directive.fileName });
                writeLine();
            }
        }

        function emitSourceFileWorker(node: SourceFile) {
            const statements = node.statements;
            pushNameGenerationScope(node);
            forEach(node.statements, generateNames);
            emitHelpers(node);
            const index = findIndex(statements, statement => !isPrologueDirective(statement));
            emitTripleSlashDirectivesIfNeeded(node);
            emitList(node, statements, ListFormat.MultiLine, index === -1 ? statements.length : index);
            popNameGenerationScope(node);
        }

        // Transformation nodes

        function emitPartiallyEmittedExpression(node: PartiallyEmittedExpression) {
            emit(node.expression);
        }

        function emitCommaList(node: CommaListExpression) {
            emitList(node, node.elements, ListFormat.CommaListElements);
        }

        /**
         * Emits any prologue directives at the start of a Statement list, returning the
         * number of prologue directives written to the output.
         */
        function emitPrologueDirectives(statements: readonly Node[], sourceFile?: SourceFile, seenPrologueDirectives?: Set<string>, recordBundleFileSection?: true): number {
            let needsToSetSourceFile = !!sourceFile;
            for (let i = 0; i < statements.length; i++) {
                const statement = statements[i];
                if (isPrologueDirective(statement)) {
                    const shouldEmitPrologueDirective = seenPrologueDirectives ? !seenPrologueDirectives.has(statement.expression.text) : true;
                    if (shouldEmitPrologueDirective) {
                        if (needsToSetSourceFile) {
                            needsToSetSourceFile = false;
                            setSourceFile(sourceFile);
                        }
                        writeLine();
                        const pos = writer.getTextPos();
                        emit(statement);
                        if (recordBundleFileSection && bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Prologue, data: statement.expression.text });
                        if (seenPrologueDirectives) {
                            seenPrologueDirectives.add(statement.expression.text);
                        }
                    }
                }
                else {
                    // return index of the first non prologue directive
                    return i;
                }
            }

            return statements.length;
        }

        function emitUnparsedPrologues(prologues: readonly UnparsedPrologue[], seenPrologueDirectives: Set<string>) {
            for (const prologue of prologues) {
                if (!seenPrologueDirectives.has(prologue.data)) {
                    writeLine();
                    const pos = writer.getTextPos();
                    emit(prologue);
                    if (bundleFileInfo) bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: BundleFileSectionKind.Prologue, data: prologue.data });
                    if (seenPrologueDirectives) {
                        seenPrologueDirectives.add(prologue.data);
                    }
                }
            }
        }

        function emitPrologueDirectivesIfNeeded(sourceFileOrBundle: Bundle | SourceFile) {
            if (isSourceFile(sourceFileOrBundle)) {
                emitPrologueDirectives(sourceFileOrBundle.statements, sourceFileOrBundle);
            }
            else {
                const seenPrologueDirectives = new Set<string>();
                for (const prepend of sourceFileOrBundle.prepends) {
                    emitUnparsedPrologues((prepend as UnparsedSource).prologues, seenPrologueDirectives);
                }
                for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                    emitPrologueDirectives(sourceFile.statements, sourceFile, seenPrologueDirectives, /*recordBundleFileSection*/ true);
                }
                setSourceFile(undefined);
            }
        }

        function getPrologueDirectivesFromBundledSourceFiles(bundle: Bundle): SourceFilePrologueInfo[] | undefined {
            const seenPrologueDirectives = new Set<string>();
            let prologues: SourceFilePrologueInfo[] | undefined;
            for (let index = 0; index < bundle.sourceFiles.length; index++) {
                const sourceFile = bundle.sourceFiles[index];
                let directives: SourceFilePrologueDirective[] | undefined;
                let end = 0;
                for (const statement of sourceFile.statements) {
                    if (!isPrologueDirective(statement)) break;
                    if (seenPrologueDirectives.has(statement.expression.text)) continue;
                    seenPrologueDirectives.add(statement.expression.text);
                    (directives || (directives = [])).push({
                        pos: statement.pos,
                        end: statement.end,
                        expression: {
                            pos: statement.expression.pos,
                            end: statement.expression.end,
                            text: statement.expression.text
                        }
                    });
                    end = end < statement.end ? statement.end : end;
                }
                if (directives) (prologues || (prologues = [])).push({ file: index, text: sourceFile.text.substring(0, end), directives });
            }
            return prologues;
        }

        function emitShebangIfNeeded(sourceFileOrBundle: Bundle | SourceFile | UnparsedSource) {
            if (isSourceFile(sourceFileOrBundle) || isUnparsedSource(sourceFileOrBundle)) {
                const shebang = getShebang(sourceFileOrBundle.text);
                if (shebang) {
                    writeComment(shebang);
                    writeLine();
                    return true;
                }
            }
            else {
                for (const prepend of sourceFileOrBundle.prepends) {
                    Debug.assertNode(prepend, isUnparsedSource);
                    if (emitShebangIfNeeded(prepend)) {
                        return true;
                    }
                }
                for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                    // Emit only the first encountered shebang
                    if (emitShebangIfNeeded(sourceFile)) {
                        return true;
                    }
                }
            }
        }

        //
        // Helpers
        //

        function emitNodeWithWriter(node: Node | undefined, writer: typeof write) {
            if (!node) return;
            const savedWrite = write;
            write = writer;
            emit(node);
            write = savedWrite;
        }

        function emitModifiers(node: Node, modifiers: NodeArray<Modifier> | undefined) {
            if (modifiers && modifiers.length) {
                emitList(node, modifiers, ListFormat.Modifiers);
                writeSpace();
            }
        }

        function emitTypeAnnotation(node: TypeNode | undefined) {
            if (node) {
                writePunctuation(":");
                writeSpace();
                emit(node);
            }
        }

        function emitInitializer(node: Expression | undefined, equalCommentStartPos: number, container: Node) {
            if (node) {
                writeSpace();
                emitTokenWithComment(SyntaxKind.EqualsToken, equalCommentStartPos, writeOperator, container);
                writeSpace();
                emit(node);
            }
        }

        function emitNodeWithPrefix<T extends Node>(prefix: string, prefixWriter: (s: string) => void, node: T | undefined, emit: (node: T) => void) {
            if (node) {
                prefixWriter(prefix);
                emit(node);
            }
        }

        function emitWithLeadingSpace(node: Node | undefined) {
            if (node) {
                writeSpace();
                emit(node);
            }
        }

        function emitExpressionWithLeadingSpace(node: Expression | undefined) {
            if (node) {
                writeSpace();
                emit(node);
            }
        }

        function emitWithTrailingSpace(node: Node | undefined) {
            if (node) {
                emit(node);
                writeSpace();
            }
        }

        function emitEmbeddedStatement(parent: Node, node: Statement) {
            if (isBlock(node) || getEmitFlags(parent) & EmitFlags.SingleLine) {
                writeSpace();
                emit(node);
            }
            else {
                writeLine();
                increaseIndent();
                if (isEmptyStatement(node)) {
                    emitWithContext(node, emitEmbeddedEmptyStatement);
                }
                else {
                    emit(node);
                }
                decreaseIndent();
            }
        }

        function emitDecorators(parentNode: Node, decorators: NodeArray<Decorator> | undefined) {
            emitList(parentNode, decorators, ListFormat.Decorators);
        }

        function emitTypeArguments(parentNode: Node, typeArguments: NodeArray<TypeNode> | undefined) {
            emitList(parentNode, typeArguments, ListFormat.TypeArguments);
        }

        function emitTypeParameters(parentNode: SignatureDeclaration | InterfaceDeclaration | TypeAliasDeclaration | ClassDeclaration | ClassExpression, typeParameters: NodeArray<TypeParameterDeclaration> | undefined) {
            if (isFunctionLike(parentNode) && parentNode.typeArguments) { // Quick info uses type arguments in place of type parameters on instantiated signatures
                return emitTypeArguments(parentNode, parentNode.typeArguments);
            }
            emitList(parentNode, typeParameters, ListFormat.TypeParameters);
        }

        function emitParameters(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
            emitList(parentNode, parameters, ListFormat.Parameters);
        }

        function canEmitSimpleArrowHead(parentNode: FunctionTypeNode | ArrowFunction, parameters: NodeArray<ParameterDeclaration>) {
            const parameter = singleOrUndefined(parameters);
            return parameter
                && parameter.pos === parentNode.pos // may not have parsed tokens between parent and parameter
                && isArrowFunction(parentNode)      // only arrow functions may have simple arrow head
                && !parentNode.type                 // arrow function may not have return type annotation
                && !some(parentNode.decorators)     // parent may not have decorators
                && !some(parentNode.modifiers)      // parent may not have modifiers
                && !some(parentNode.typeParameters) // parent may not have type parameters
                && !some(parameter.decorators)      // parameter may not have decorators
                && !some(parameter.modifiers)       // parameter may not have modifiers
                && !parameter.dotDotDotToken        // parameter may not be rest
                && !parameter.questionToken         // parameter may not be optional
                && !parameter.type                  // parameter may not have a type annotation
                && !parameter.initializer           // parameter may not have an initializer
                && isIdentifier(parameter.name);    // parameter name must be identifier
        }

        function emitParametersForArrow(parentNode: FunctionTypeNode | ArrowFunction, parameters: NodeArray<ParameterDeclaration>) {
            if (canEmitSimpleArrowHead(parentNode, parameters)) {
                emitList(parentNode, parameters, ListFormat.Parameters & ~ListFormat.Parenthesis);
            }
            else {
                emitParameters(parentNode, parameters);
            }
        }

        function emitParametersForIndexSignature(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
            emitList(parentNode, parameters, ListFormat.IndexSignatureParameters);
        }

        function writeDelimiter(format: ListFormat) {
            switch (format & ListFormat.DelimitersMask) {
                case ListFormat.None:
                    break;
                case ListFormat.CommaDelimited:
                    writePunctuation(",");
                    break;
                case ListFormat.BarDelimited:
                    writeSpace();
                    writePunctuation("|");
                    break;
                case ListFormat.AsteriskDelimited:
                    writeSpace();
                    writePunctuation("*");
                    writeSpace();
                    break;
                case ListFormat.AmpersandDelimited:
                    writeSpace();
                    writePunctuation("&");
                    break;
            }
        }

        function emitList(parentNode: Node | undefined, children: NodeArray<Node> | undefined, format: ListFormat, start = 0, count = children ? children.length - start : 0) {
            const isUndefined = children === undefined;
            if (isUndefined && format & ListFormat.OptionalIfUndefined) {
                return;
            }

            const isEmpty = children === undefined || start >= children.length || count === 0;
            if (isEmpty && format & ListFormat.OptionalIfEmpty) {
                if (onBeforeEmitNodeArray) {
                    onBeforeEmitNodeArray(children);
                }
                if (onAfterEmitNodeArray) {
                    onAfterEmitNodeArray(children);
                }
                return;
            }

            if (format & ListFormat.BracketsMask) {
                writePunctuation(getOpeningBracket(format));
                if (isEmpty && children) {
                    emitTrailingCommentsOfPosition(children.pos, /*prefixSpace*/ true); // Emit comments within empty bracketed lists
                }
            }

            if (onBeforeEmitNodeArray) {
                onBeforeEmitNodeArray(children);
            }

            if (isEmpty) {
                // Write a line terminator if the parent node was multi-line
                if (format & ListFormat.MultiLine && !(preserveSourceNewlines && (!parentNode || rangeIsOnSingleLine(parentNode, currentSourceFile!)))) {
                    writeLine();
                }
                else if (format & ListFormat.SpaceBetweenBraces && !(format & ListFormat.NoSpaceIfEmpty)) {
                    writeSpace();
                }
            }
            else {
                Debug.type<NodeArray<Node>>(children);
                // Write the opening line terminator or leading whitespace.
                const mayEmitInterveningComments = (format & ListFormat.NoInterveningComments) === 0;
                let shouldEmitInterveningComments = mayEmitInterveningComments;
                const leadingLineTerminatorCount = getLeadingLineTerminatorCount(parentNode, children, format); // TODO: GH#18217
                if (leadingLineTerminatorCount) {
                    writeLine(leadingLineTerminatorCount);
                    shouldEmitInterveningComments = false;
                }
                else if (format & ListFormat.SpaceBetweenBraces) {
                    writeSpace();
                }

                // Increase the indent, if requested.
                if (format & ListFormat.Indented) {
                    increaseIndent();
                }

                // Emit each child.
                let previousSibling: Node | undefined;
                let previousSourceFileTextKind: ReturnType<typeof recordBundleFileInternalSectionStart>;
                let shouldDecreaseIndentAfterEmit = false;
                for (let i = 0; i < count; i++) {
                    const child = children[start + i];

                    // Write the delimiter if this is not the first node.
                    if (format & ListFormat.AsteriskDelimited) {
                        // always write JSDoc in the format "\n *"
                        writeLine();
                        writeDelimiter(format);
                    }
                    else if (previousSibling) {
                        // i.e
                        //      function commentedParameters(
                        //          /* Parameter a */
                        //          a
                        //          /* End of parameter a */ -> this comment isn't considered to be trailing comment of parameter "a" due to newline
                        //          ,
                        if (format & ListFormat.DelimitersMask && previousSibling.end !== (parentNode ? parentNode.end : -1)) {
                            emitLeadingCommentsOfPosition(previousSibling.end);
                        }
                        writeDelimiter(format);
                        recordBundleFileInternalSectionEnd(previousSourceFileTextKind);

                        // Write either a line terminator or whitespace to separate the elements.
                        const separatingLineTerminatorCount = getSeparatingLineTerminatorCount(previousSibling, child, format);
                        if (separatingLineTerminatorCount > 0) {
                            // If a synthesized node in a single-line list starts on a new
                            // line, we should increase the indent.
                            if ((format & (ListFormat.LinesMask | ListFormat.Indented)) === ListFormat.SingleLine) {
                                increaseIndent();
                                shouldDecreaseIndentAfterEmit = true;
                            }

                            writeLine(separatingLineTerminatorCount);
                            shouldEmitInterveningComments = false;
                        }
                        else if (previousSibling && format & ListFormat.SpaceBetweenSiblings) {
                            writeSpace();
                        }
                    }

                    // Emit this child.
                    previousSourceFileTextKind = recordBundleFileInternalSectionStart(child);
                    if (shouldEmitInterveningComments) {
                        if (emitTrailingCommentsOfPosition) {
                            const commentRange = getCommentRange(child);
                            emitTrailingCommentsOfPosition(commentRange.pos);
                        }
                    }
                    else {
                        shouldEmitInterveningComments = mayEmitInterveningComments;
                    }

                    nextListElementPos = child.pos;
                    emit(child);

                    if (shouldDecreaseIndentAfterEmit) {
                        decreaseIndent();
                        shouldDecreaseIndentAfterEmit = false;
                    }

                    previousSibling = child;
                }

                // Write a trailing comma, if requested.
                const emitFlags = previousSibling ? getEmitFlags(previousSibling) : 0;
                const skipTrailingComments = commentsDisabled || !!(emitFlags & EmitFlags.NoTrailingComments);
                const hasTrailingComma = children?.hasTrailingComma && (format & ListFormat.AllowTrailingComma) && (format & ListFormat.CommaDelimited);
                if (hasTrailingComma) {
                    if (previousSibling && !skipTrailingComments) {
                        emitTokenWithComment(SyntaxKind.CommaToken, previousSibling.end, writePunctuation, previousSibling);
                    }
                    else {
                        writePunctuation(",");
                    }
                }

                // Emit any trailing comment of the last element in the list
                // i.e
                //       var array = [...
                //          2
                //          /* end of element 2 */
                //       ];
                if (previousSibling && (parentNode ? parentNode.end : -1) !== previousSibling.end && (format & ListFormat.DelimitersMask) && !skipTrailingComments) {
                    emitLeadingCommentsOfPosition(hasTrailingComma && children?.end ? children.end : previousSibling.end);
                }

                // Decrease the indent, if requested.
                if (format & ListFormat.Indented) {
                    decreaseIndent();
                }

                recordBundleFileInternalSectionEnd(previousSourceFileTextKind);

                // Write the closing line terminator or closing whitespace.
                const closingLineTerminatorCount = getClosingLineTerminatorCount(parentNode, children, format);
                if (closingLineTerminatorCount) {
                    writeLine(closingLineTerminatorCount);
                }
                else if (format & (ListFormat.SpaceAfterList | ListFormat.SpaceBetweenBraces)) {
                    writeSpace();
                }
            }

            if (onAfterEmitNodeArray) {
                onAfterEmitNodeArray(children);
            }

            if (format & ListFormat.BracketsMask) {
                if (isEmpty && children) {
                    emitLeadingCommentsOfPosition(children.end); // Emit leading comments within empty lists
                }
                writePunctuation(getClosingBracket(format));
            }
        }

        // Writers

        function writeLiteral(s: string) {
            writer.writeLiteral(s);
        }

        function writeStringLiteral(s: string) {
            writer.writeStringLiteral(s);
        }

        function writeBase(s: string) {
            writer.write(s);
        }

        function writeSymbol(s: string, sym: Symbol) {
            writer.writeSymbol(s, sym);
        }

        function writePunctuation(s: string) {
            writer.writePunctuation(s);
        }

        function writeTrailingSemicolon() {
            writer.writeTrailingSemicolon(";");
        }

        function writeKeyword(s: string) {
            writer.writeKeyword(s);
        }

        function writeOperator(s: string) {
            writer.writeOperator(s);
        }

        function writeParameter(s: string) {
            writer.writeParameter(s);
        }

        function writeComment(s: string) {
            writer.writeComment(s);
        }

        function writeSpace() {
            writer.writeSpace(" ");
        }

        function writeProperty(s: string) {
            writer.writeProperty(s);
        }

        function writeLine(count = 1) {
            for (let i = 0; i < count; i++) {
                writer.writeLine(i > 0);
            }
        }

        function increaseIndent() {
            writer.increaseIndent();
        }

        function decreaseIndent() {
            writer.decreaseIndent();
        }

        function writeToken(token: SyntaxKind, pos: number, writer: (s: string) => void, contextNode?: Node) {
            return !sourceMapsDisabled
                ? emitTokenWithSourceMap(contextNode, token, writer, pos, writeTokenText)
                : writeTokenText(token, writer, pos);
        }

        function writeTokenNode(node: Node, writer: (s: string) => void) {
            if (onBeforeEmitToken) {
                onBeforeEmitToken(node);
            }
            writer(tokenToString(node.kind)!);
            if (onAfterEmitToken) {
                onAfterEmitToken(node);
            }
        }

        function writeTokenText(token: SyntaxKind, writer: (s: string) => void): void;
        function writeTokenText(token: SyntaxKind, writer: (s: string) => void, pos: number): number;
        function writeTokenText(token: SyntaxKind, writer: (s: string) => void, pos?: number): number {
            const tokenString = tokenToString(token)!;
            writer(tokenString);
            return pos! < 0 ? pos! : pos! + tokenString.length;
        }

        function writeLineOrSpace(parentNode: Node, prevChildNode: Node, nextChildNode: Node) {
            if (getEmitFlags(parentNode) & EmitFlags.SingleLine) {
                writeSpace();
            }
            else if (preserveSourceNewlines) {
                const lines = getLinesBetweenNodes(parentNode, prevChildNode, nextChildNode);
                if (lines) {
                    writeLine(lines);
                }
                else {
                    writeSpace();
                }
            }
            else {
                writeLine();
            }
        }

        function writeLines(text: string): void {
            const lines = text.split(/\r\n?|\n/g);
            const indentation = guessIndentation(lines);
            for (const lineText of lines) {
                const line = indentation ? lineText.slice(indentation) : lineText;
                if (line.length) {
                    writeLine();
                    write(line);
                }
            }
        }

        function writeLinesAndIndent(lineCount: number, writeSpaceIfNotIndenting: boolean) {
            if (lineCount) {
                increaseIndent();
                writeLine(lineCount);
            }
            else if (writeSpaceIfNotIndenting) {
                writeSpace();
            }
        }

        // Helper function to decrease the indent if we previously indented.  Allows multiple
        // previous indent values to be considered at a time.  This also allows caller to just
        // call this once, passing in all their appropriate indent values, instead of needing
        // to call this helper function multiple times.
        function decreaseIndentIf(value1: boolean | number | undefined, value2?: boolean | number) {
            if (value1) {
                decreaseIndent();
            }
            if (value2) {
                decreaseIndent();
            }
        }

        function getLeadingLineTerminatorCount(parentNode: Node | undefined, children: readonly Node[], format: ListFormat): number {
            if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
                if (format & ListFormat.PreferNewLine) {
                    return 1;
                }

                const firstChild = children[0];
                if (firstChild === undefined) {
                    return !parentNode || rangeIsOnSingleLine(parentNode, currentSourceFile!) ? 0 : 1;
                }
                if (firstChild.pos === nextListElementPos) {
                    // If this child starts at the beginning of a list item in a parent list, its leading
                    // line terminators have already been written as the separating line terminators of the
                    // parent list. Example:
                    //
                    // class Foo {
                    //   constructor() {}
                    //   public foo() {}
                    // }
                    //
                    // The outer list is the list of class members, with one line terminator between the
                    // constructor and the method. The constructor is written, the separating line terminator
                    // is written, and then we start emitting the method. Its modifiers ([public]) constitute an inner
                    // list, so we look for its leading line terminators. If we didn't know that we had already
                    // written a newline as part of the parent list, it would appear that we need to write a
                    // leading newline to start the modifiers.
                    return 0;
                }
                if (firstChild.kind === SyntaxKind.JsxText) {
                    // JsxText will be written with its leading whitespace, so don't add more manually.
                    return 0;
                }
                if (parentNode &&
                    !positionIsSynthesized(parentNode.pos) &&
                    !nodeIsSynthesized(firstChild) &&
                    (!firstChild.parent || getOriginalNode(firstChild.parent) === getOriginalNode(parentNode))
                ) {
                    if (preserveSourceNewlines) {
                        return getEffectiveLines(
                            includeComments => getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(
                                firstChild.pos,
                                parentNode.pos,
                                currentSourceFile!,
                                includeComments));
                    }
                    return rangeStartPositionsAreOnSameLine(parentNode, firstChild, currentSourceFile!) ? 0 : 1;
                }
                if (synthesizedNodeStartsOnNewLine(firstChild, format)) {
                    return 1;
                }
            }
            return format & ListFormat.MultiLine ? 1 : 0;
        }

        function getSeparatingLineTerminatorCount(previousNode: Node | undefined, nextNode: Node, format: ListFormat): number {
            if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
                if (previousNode === undefined || nextNode === undefined) {
                    return 0;
                }
                if (nextNode.kind === SyntaxKind.JsxText) {
                    // JsxText will be written with its leading whitespace, so don't add more manually.
                    return 0;
                }
                else if (preserveSourceNewlines && siblingNodePositionsAreComparable(previousNode, nextNode)) {
                    return getEffectiveLines(
                        includeComments => getLinesBetweenRangeEndAndRangeStart(
                            previousNode,
                            nextNode,
                            currentSourceFile!,
                            includeComments));
                }
                else if (!preserveSourceNewlines && !nodeIsSynthesized(previousNode) && !nodeIsSynthesized(nextNode)) {
                    return rangeEndIsOnSameLineAsRangeStart(previousNode, nextNode, currentSourceFile!) ? 0 : 1;
                }
                else if (synthesizedNodeStartsOnNewLine(previousNode, format) || synthesizedNodeStartsOnNewLine(nextNode, format)) {
                    return 1;
                }
            }
            else if (getStartsOnNewLine(nextNode)) {
                return 1;
            }
            return format & ListFormat.MultiLine ? 1 : 0;
        }

        function getClosingLineTerminatorCount(parentNode: Node | undefined, children: readonly Node[], format: ListFormat): number {
            if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
                if (format & ListFormat.PreferNewLine) {
                    return 1;
                }

                const lastChild = lastOrUndefined(children);
                if (lastChild === undefined) {
                    return !parentNode || rangeIsOnSingleLine(parentNode, currentSourceFile!) ? 0 : 1;
                }
                if (parentNode && !positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(lastChild) && (!lastChild.parent || lastChild.parent === parentNode)) {
                    if (preserveSourceNewlines) {
                        const end = isNodeArray(children) && !positionIsSynthesized(children.end) ? children.end : lastChild.end;
                        return getEffectiveLines(
                            includeComments => getLinesBetweenPositionAndNextNonWhitespaceCharacter(
                                end,
                                parentNode.end,
                                currentSourceFile!,
                                includeComments));
                    }
                    return rangeEndPositionsAreOnSameLine(parentNode, lastChild, currentSourceFile!) ? 0 : 1;
                }
                if (synthesizedNodeStartsOnNewLine(lastChild, format)) {
                    return 1;
                }
            }
            if (format & ListFormat.MultiLine && !(format & ListFormat.NoTrailingNewLine)) {
                return 1;
            }
            return 0;
        }

        function getEffectiveLines(getLineDifference: (includeComments: boolean) => number) {
            // If 'preserveSourceNewlines' is disabled, we should never call this function
            // because it could be more expensive than alternative approximations.
            Debug.assert(!!preserveSourceNewlines);
            // We start by measuring the line difference from a position to its adjacent comments,
            // so that this is counted as a one-line difference, not two:
            //
            //   node1;
            //   // NODE2 COMMENT
            //   node2;
            const lines = getLineDifference(/*includeComments*/ true);
            if (lines === 0) {
                // However, if the line difference considering comments was 0, we might have this:
                //
                //   node1; // NODE2 COMMENT
                //   node2;
                //
                // in which case we should be ignoring node2's comment, so this too is counted as
                // a one-line difference, not zero.
                return getLineDifference(/*includeComments*/ false);
            }
            return lines;
        }

        function writeLineSeparatorsAndIndentBefore(node: Node, parent: Node): boolean {
            const leadingNewlines = preserveSourceNewlines && getLeadingLineTerminatorCount(parent, [node], ListFormat.None);
            if (leadingNewlines) {
                writeLinesAndIndent(leadingNewlines, /*writeLinesIfNotIndenting*/ false);
            }
            return !!leadingNewlines;
        }

        function writeLineSeparatorsAfter(node: Node, parent: Node) {
            const trailingNewlines = preserveSourceNewlines && getClosingLineTerminatorCount(parent, [node], ListFormat.None);
            if (trailingNewlines) {
                writeLine(trailingNewlines);
            }
        }

        function synthesizedNodeStartsOnNewLine(node: Node, format: ListFormat) {
            if (nodeIsSynthesized(node)) {
                const startsOnNewLine = getStartsOnNewLine(node);
                if (startsOnNewLine === undefined) {
                    return (format & ListFormat.PreferNewLine) !== 0;
                }

                return startsOnNewLine;
            }

            return (format & ListFormat.PreferNewLine) !== 0;
        }

        function getLinesBetweenNodes(parent: Node, node1: Node, node2: Node): number {
            if (getEmitFlags(parent) & EmitFlags.NoIndentation) {
                return 0;
            }

            parent = skipSynthesizedParentheses(parent);
            node1 = skipSynthesizedParentheses(node1);
            node2 = skipSynthesizedParentheses(node2);

            // Always use a newline for synthesized code if the synthesizer desires it.
            if (getStartsOnNewLine(node2)) {
                return 1;
            }

            if (!nodeIsSynthesized(parent) && !nodeIsSynthesized(node1) && !nodeIsSynthesized(node2)) {
                if (preserveSourceNewlines) {
                    return getEffectiveLines(
                        includeComments => getLinesBetweenRangeEndAndRangeStart(
                            node1,
                            node2,
                            currentSourceFile!,
                            includeComments));
                }
                return rangeEndIsOnSameLineAsRangeStart(node1, node2, currentSourceFile!) ? 0 : 1;
            }

            return 0;
        }

        function isEmptyBlock(block: BlockLike) {
            return block.statements.length === 0
                && rangeEndIsOnSameLineAsRangeStart(block, block, currentSourceFile!);
        }

        function skipSynthesizedParentheses(node: Node) {
            while (node.kind === SyntaxKind.ParenthesizedExpression && nodeIsSynthesized(node)) {
                node = (<ParenthesizedExpression>node).expression;
            }

            return node;
        }

        function getTextOfNode(node: Node, includeTrivia?: boolean): string {
            if (isGeneratedIdentifier(node)) {
                return generateName(node);
            }
            else if ((isIdentifier(node) || isPrivateIdentifier(node)) && (nodeIsSynthesized(node) || !node.parent || !currentSourceFile || (node.parent && currentSourceFile && getSourceFileOfNode(node) !== getOriginalNode(currentSourceFile)))) {
                return idText(node);
            }
            else if (node.kind === SyntaxKind.StringLiteral && (<StringLiteral>node).textSourceNode) {
                return getTextOfNode((<StringLiteral>node).textSourceNode!, includeTrivia);
            }
            else if (isLiteralExpression(node) && (nodeIsSynthesized(node) || !node.parent)) {
                return node.text;
            }

            return getSourceTextOfNodeFromSourceFile(currentSourceFile!, node, includeTrivia);
        }

        function getLiteralTextOfNode(node: LiteralLikeNode, neverAsciiEscape: boolean | undefined, jsxAttributeEscape: boolean): string {
            if (node.kind === SyntaxKind.StringLiteral && (<StringLiteral>node).textSourceNode) {
                const textSourceNode = (<StringLiteral>node).textSourceNode!;
                if (isIdentifier(textSourceNode) || isNumericLiteral(textSourceNode)) {
                    const text = isNumericLiteral(textSourceNode) ? textSourceNode.text : getTextOfNode(textSourceNode);
                    return jsxAttributeEscape ? `"${escapeJsxAttributeString(text)}"` :
                        neverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? `"${escapeString(text)}"` :
                        `"${escapeNonAsciiString(text)}"`;
                }
                else {
                    return getLiteralTextOfNode(textSourceNode, neverAsciiEscape, jsxAttributeEscape);
                }
            }

            const flags = (neverAsciiEscape ? GetLiteralTextFlags.NeverAsciiEscape : 0)
                | (jsxAttributeEscape ? GetLiteralTextFlags.JsxAttributeEscape : 0)
                | (printerOptions.terminateUnterminatedLiterals ? GetLiteralTextFlags.TerminateUnterminatedLiterals : 0)
                | (printerOptions.target && printerOptions.target === ScriptTarget.ESNext ? GetLiteralTextFlags.AllowNumericSeparator : 0);

            return getLiteralText(node, currentSourceFile!, flags);
        }

        /**
         * Push a new name generation scope.
         */
        function pushNameGenerationScope(node: Node | undefined) {
            if (node && getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
                return;
            }
            tempFlagsStack.push(tempFlags);
            tempFlags = 0;
            reservedNamesStack.push(reservedNames);
        }

        /**
         * Pop the current name generation scope.
         */
        function popNameGenerationScope(node: Node | undefined) {
            if (node && getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
                return;
            }
            tempFlags = tempFlagsStack.pop()!;
            reservedNames = reservedNamesStack.pop()!;
        }

        function reserveNameInNestedScopes(name: string) {
            if (!reservedNames || reservedNames === lastOrUndefined(reservedNamesStack)) {
                reservedNames = new Set();
            }
            reservedNames.add(name);
        }

        function generateNames(node: Node | undefined) {
            if (!node) return;
            switch (node.kind) {
                case SyntaxKind.Block:
                    forEach((<Block>node).statements, generateNames);
                    break;
                case SyntaxKind.LabeledStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                    generateNames((<LabeledStatement | WithStatement | DoStatement | WhileStatement>node).statement);
                    break;
                case SyntaxKind.IfStatement:
                    generateNames((<IfStatement>node).thenStatement);
                    generateNames((<IfStatement>node).elseStatement);
                    break;
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.ForInStatement:
                    generateNames((<ForStatement | ForInOrOfStatement>node).initializer);
                    generateNames((<ForStatement | ForInOrOfStatement>node).statement);
                    break;
                case SyntaxKind.SwitchStatement:
                    generateNames((<SwitchStatement>node).caseBlock);
                    break;
                case SyntaxKind.CaseBlock:
                    forEach((<CaseBlock>node).clauses, generateNames);
                    break;
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    forEach((<CaseOrDefaultClause>node).statements, generateNames);
                    break;
                case SyntaxKind.TryStatement:
                    generateNames((<TryStatement>node).tryBlock);
                    generateNames((<TryStatement>node).catchClause);
                    generateNames((<TryStatement>node).finallyBlock);
                    break;
                case SyntaxKind.CatchClause:
                    generateNames((<CatchClause>node).variableDeclaration);
                    generateNames((<CatchClause>node).block);
                    break;
                case SyntaxKind.VariableStatement:
                    generateNames((<VariableStatement>node).declarationList);
                    break;
                case SyntaxKind.VariableDeclarationList:
                    forEach((<VariableDeclarationList>node).declarations, generateNames);
                    break;
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.Parameter:
                case SyntaxKind.BindingElement:
                case SyntaxKind.ClassDeclaration:
                    generateNameIfNeeded((<NamedDeclaration>node).name);
                    break;
                case SyntaxKind.FunctionDeclaration:
                    generateNameIfNeeded((<FunctionDeclaration>node).name);
                    if (getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
                        forEach((<FunctionDeclaration>node).parameters, generateNames);
                        generateNames((<FunctionDeclaration>node).body);
                    }
                    break;
                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.ArrayBindingPattern:
                    forEach((<BindingPattern>node).elements, generateNames);
                    break;
                case SyntaxKind.ImportDeclaration:
                    generateNames((<ImportDeclaration>node).importClause);
                    break;
                case SyntaxKind.ImportClause:
                    generateNameIfNeeded((<ImportClause>node).name);
                    generateNames((<ImportClause>node).namedBindings);
                    break;
                case SyntaxKind.NamespaceImport:
                    generateNameIfNeeded((<NamespaceImport>node).name);
                    break;
                case SyntaxKind.NamespaceExport:
                    generateNameIfNeeded((<NamespaceExport>node).name);
                    break;
                case SyntaxKind.NamedImports:
                    forEach((<NamedImports>node).elements, generateNames);
                    break;
                case SyntaxKind.ImportSpecifier:
                    generateNameIfNeeded((<ImportSpecifier>node).propertyName || (<ImportSpecifier>node).name);
                    break;
            }
        }

        function generateMemberNames(node: Node | undefined) {
            if (!node) return;
            switch (node.kind) {
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.ShorthandPropertyAssignment:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    generateNameIfNeeded((<NamedDeclaration>node).name);
                    break;
            }
        }

        function generateNameIfNeeded(name: DeclarationName | undefined) {
            if (name) {
                if (isGeneratedIdentifier(name)) {
                    generateName(name);
                }
                else if (isBindingPattern(name)) {
                    generateNames(name);
                }
            }
        }

        /**
         * Generate the text for a generated identifier.
         */
        function generateName(name: GeneratedIdentifier) {
            if ((name.autoGenerateFlags & GeneratedIdentifierFlags.KindMask) === GeneratedIdentifierFlags.Node) {
                // Node names generate unique names based on their original node
                // and are cached based on that node's id.
                return generateNameCached(getNodeForGeneratedName(name), name.autoGenerateFlags);
            }
            else {
                // Auto, Loop, and Unique names are cached based on their unique
                // autoGenerateId.
                const autoGenerateId = name.autoGenerateId!;
                return autoGeneratedIdToGeneratedName[autoGenerateId] || (autoGeneratedIdToGeneratedName[autoGenerateId] = makeName(name));
            }
        }

        function generateNameCached(node: Node, flags?: GeneratedIdentifierFlags) {
            const nodeId = getNodeId(node);
            return nodeIdToGeneratedName[nodeId] || (nodeIdToGeneratedName[nodeId] = generateNameForNode(node, flags));
        }

        /**
         * Returns a value indicating whether a name is unique globally, within the current file,
         * or within the NameGenerator.
         */
        function isUniqueName(name: string): boolean {
            return isFileLevelUniqueName(name)
                && !generatedNames.has(name)
                && !(reservedNames && reservedNames.has(name));
        }

        /**
         * Returns a value indicating whether a name is unique globally or within the current file.
         */
        function isFileLevelUniqueName(name: string) {
            return currentSourceFile ? ts.isFileLevelUniqueName(currentSourceFile, name, hasGlobalName) : true;
        }

        /**
         * Returns a value indicating whether a name is unique within a container.
         */
        function isUniqueLocalName(name: string, container: Node): boolean {
            for (let node = container; isNodeDescendantOf(node, container); node = node.nextContainer!) {
                if (node.locals) {
                    const local = node.locals.get(escapeLeadingUnderscores(name));
                    // We conservatively include alias symbols to cover cases where they're emitted as locals
                    if (local && local.flags & (SymbolFlags.Value | SymbolFlags.ExportValue | SymbolFlags.Alias)) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * Return the next available name in the pattern _a ... _z, _0, _1, ...
         * TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
         * Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
         */
        function makeTempVariableName(flags: TempFlags, reservedInNestedScopes?: boolean): string {
            if (flags && !(tempFlags & flags)) {
                const name = flags === TempFlags._i ? "_i" : "_n";
                if (isUniqueName(name)) {
                    tempFlags |= flags;
                    if (reservedInNestedScopes) {
                        reserveNameInNestedScopes(name);
                    }
                    return name;
                }
            }
            while (true) {
                const count = tempFlags & TempFlags.CountMask;
                tempFlags++;
                // Skip over 'i' and 'n'
                if (count !== 8 && count !== 13) {
                    const name = count < 26
                        ? "_" + String.fromCharCode(CharacterCodes.a + count)
                        : "_" + (count - 26);
                    if (isUniqueName(name)) {
                        if (reservedInNestedScopes) {
                            reserveNameInNestedScopes(name);
                        }
                        return name;
                    }
                }
            }
        }

        /**
         * Generate a name that is unique within the current file and doesn't conflict with any names
         * in global scope. The name is formed by adding an '_n' suffix to the specified base name,
         * where n is a positive integer. Note that names generated by makeTempVariableName and
         * makeUniqueName are guaranteed to never conflict.
         * If `optimistic` is set, the first instance will use 'baseName' verbatim instead of 'baseName_1'
         */
        function makeUniqueName(baseName: string, checkFn: (name: string) => boolean = isUniqueName, optimistic?: boolean, scoped?: boolean): string {
            if (optimistic) {
                if (checkFn(baseName)) {
                    if (scoped) {
                        reserveNameInNestedScopes(baseName);
                    }
                    else {
                        generatedNames.add(baseName);
                    }
                    return baseName;
                }
            }
            // Find the first unique 'name_n', where n is a positive number
            if (baseName.charCodeAt(baseName.length - 1) !== CharacterCodes._) {
                baseName += "_";
            }
            let i = 1;
            while (true) {
                const generatedName = baseName + i;
                if (checkFn(generatedName)) {
                    if (scoped) {
                        reserveNameInNestedScopes(generatedName);
                    }
                    else {
                        generatedNames.add(generatedName);
                    }
                    return generatedName;
                }
                i++;
            }
        }

        function makeFileLevelOptimisticUniqueName(name: string) {
            return makeUniqueName(name, isFileLevelUniqueName, /*optimistic*/ true);
        }

        /**
         * Generates a unique name for a ModuleDeclaration or EnumDeclaration.
         */
        function generateNameForModuleOrEnum(node: ModuleDeclaration | EnumDeclaration) {
            const name = getTextOfNode(node.name);
            // Use module/enum name itself if it is unique, otherwise make a unique variation
            return isUniqueLocalName(name, node) ? name : makeUniqueName(name);
        }

        /**
         * Generates a unique name for an ImportDeclaration or ExportDeclaration.
         */
        function generateNameForImportOrExportDeclaration(node: ImportDeclaration | ExportDeclaration) {
            const expr = getExternalModuleName(node)!; // TODO: GH#18217
            const baseName = isStringLiteral(expr) ?
                makeIdentifierFromModuleName(expr.text) : "module";
            return makeUniqueName(baseName);
        }

        /**
         * Generates a unique name for a default export.
         */
        function generateNameForExportDefault() {
            return makeUniqueName("default");
        }

        /**
         * Generates a unique name for a class expression.
         */
        function generateNameForClassExpression() {
            return makeUniqueName("class");
        }

        function generateNameForMethodOrAccessor(node: MethodDeclaration | AccessorDeclaration) {
            if (isIdentifier(node.name)) {
                return generateNameCached(node.name);
            }
            return makeTempVariableName(TempFlags.Auto);
        }

        /**
         * Generates a unique name from a node.
         */
        function generateNameForNode(node: Node, flags?: GeneratedIdentifierFlags): string {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return makeUniqueName(
                        getTextOfNode(node),
                        isUniqueName,
                        !!(flags! & GeneratedIdentifierFlags.Optimistic),
                        !!(flags! & GeneratedIdentifierFlags.ReservedInNestedScopes)
                    );
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return generateNameForModuleOrEnum(<ModuleDeclaration | EnumDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ExportDeclaration:
                    return generateNameForImportOrExportDeclaration(<ImportDeclaration | ExportDeclaration>node);
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ExportAssignment:
                    return generateNameForExportDefault();
                case SyntaxKind.ClassExpression:
                    return generateNameForClassExpression();
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return generateNameForMethodOrAccessor(<MethodDeclaration | AccessorDeclaration>node);
                case SyntaxKind.ComputedPropertyName:
                    return makeTempVariableName(TempFlags.Auto, /*reserveInNestedScopes*/ true);
                default:
                    return makeTempVariableName(TempFlags.Auto);
            }
        }

        /**
         * Generates a unique identifier for a node.
         */
        function makeName(name: GeneratedIdentifier) {
            switch (name.autoGenerateFlags & GeneratedIdentifierFlags.KindMask) {
                case GeneratedIdentifierFlags.Auto:
                    return makeTempVariableName(TempFlags.Auto, !!(name.autoGenerateFlags & GeneratedIdentifierFlags.ReservedInNestedScopes));
                case GeneratedIdentifierFlags.Loop:
                    return makeTempVariableName(TempFlags._i, !!(name.autoGenerateFlags & GeneratedIdentifierFlags.ReservedInNestedScopes));
                case GeneratedIdentifierFlags.Unique:
                    return makeUniqueName(
                        idText(name),
                        (name.autoGenerateFlags & GeneratedIdentifierFlags.FileLevel) ? isFileLevelUniqueName : isUniqueName,
                        !!(name.autoGenerateFlags & GeneratedIdentifierFlags.Optimistic),
                        !!(name.autoGenerateFlags & GeneratedIdentifierFlags.ReservedInNestedScopes)
                    );
            }

            return Debug.fail("Unsupported GeneratedIdentifierKind.");
        }

        /**
         * Gets the node from which a name should be generated.
         */
        function getNodeForGeneratedName(name: GeneratedIdentifier) {
            const autoGenerateId = name.autoGenerateId;
            let node = name as Node;
            let original = node.original;
            while (original) {
                node = original;

                // if "node" is a different generated name (having a different
                // "autoGenerateId"), use it and stop traversing.
                if (isIdentifier(node)
                    && !!(node.autoGenerateFlags! & GeneratedIdentifierFlags.Node)
                    && node.autoGenerateId !== autoGenerateId) {
                    break;
                }

                original = node.original;
            }

            // otherwise, return the original node for the source;
            return node;
        }

        // Comments

        function emitLeadingCommentsOfNode(node: Node, emitFlags: EmitFlags, pos: number, end: number) {
            enterComment();
            hasWrittenComment = false;

            // We have to explicitly check that the node is JsxText because if the compilerOptions.jsx is "preserve" we will not do any transformation.
            // It is expensive to walk entire tree just to set one kind of node to have no comments.
            const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0 || node.kind === SyntaxKind.JsxText;
            const skipTrailingComments = end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0 || node.kind === SyntaxKind.JsxText;

            // Save current container state on the stack.
            if ((pos > 0 || end > 0) && pos !== end) {
                // Emit leading comments if the position is not synthesized and the node
                // has not opted out from emitting leading comments.
                if (!skipLeadingComments) {
                    emitLeadingComments(pos, /*isEmittedNode*/ node.kind !== SyntaxKind.NotEmittedStatement);
                }

                if (!skipLeadingComments || (pos >= 0 && (emitFlags & EmitFlags.NoLeadingComments) !== 0)) {
                    // Advance the container position if comments get emitted or if they've been disabled explicitly using NoLeadingComments.
                    containerPos = pos;
                }

                if (!skipTrailingComments || (end >= 0 && (emitFlags & EmitFlags.NoTrailingComments) !== 0)) {
                    // As above.
                    containerEnd = end;

                    // To avoid invalid comment emit in a down-level binding pattern, we
                    // keep track of the last declaration list container's end
                    if (node.kind === SyntaxKind.VariableDeclarationList) {
                        declarationListContainerEnd = end;
                    }
                }
            }
            forEach(getSyntheticLeadingComments(node), emitLeadingSynthesizedComment);
            exitComment();
        }

        function emitTrailingCommentsOfNode(node: Node, emitFlags: EmitFlags, pos: number, end: number, savedContainerPos: number, savedContainerEnd: number, savedDeclarationListContainerEnd: number) {
            enterComment();
            const skipTrailingComments = end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0 || node.kind === SyntaxKind.JsxText;
            forEach(getSyntheticTrailingComments(node), emitTrailingSynthesizedComment);
            if ((pos > 0 || end > 0) && pos !== end) {
                // Restore previous container state.
                containerPos = savedContainerPos;
                containerEnd = savedContainerEnd;
                declarationListContainerEnd = savedDeclarationListContainerEnd;

                // Emit trailing comments if the position is not synthesized and the node
                // has not opted out from emitting leading comments and is an emitted node.
                if (!skipTrailingComments && node.kind !== SyntaxKind.NotEmittedStatement) {
                    emitTrailingComments(end);
                }
            }
            exitComment();
        }

        function emitLeadingSynthesizedComment(comment: SynthesizedComment) {
            if (comment.hasLeadingNewline || comment.kind === SyntaxKind.SingleLineCommentTrivia) {
                writer.writeLine();
            }
            writeSynthesizedComment(comment);
            if (comment.hasTrailingNewLine || comment.kind === SyntaxKind.SingleLineCommentTrivia) {
                writer.writeLine();
            }
            else {
                writer.writeSpace(" ");
            }
        }

        function emitTrailingSynthesizedComment(comment: SynthesizedComment) {
            if (!writer.isAtStartOfLine()) {
                writer.writeSpace(" ");
            }
            writeSynthesizedComment(comment);
            if (comment.hasTrailingNewLine) {
                writer.writeLine();
            }
        }

        function writeSynthesizedComment(comment: SynthesizedComment) {
            const text = formatSynthesizedComment(comment);
            const lineMap = comment.kind === SyntaxKind.MultiLineCommentTrivia ? computeLineStarts(text) : undefined;
            writeCommentRange(text, lineMap!, writer, 0, text.length, newLine);
        }

        function formatSynthesizedComment(comment: SynthesizedComment) {
            return comment.kind === SyntaxKind.MultiLineCommentTrivia
                ? `/*${comment.text}*/`
                : `//${comment.text}`;
        }

        function emitBodyWithDetachedComments(node: Node, detachedRange: TextRange, emitCallback: (node: Node) => void) {
            enterComment();
            const { pos, end } = detachedRange;
            const emitFlags = getEmitFlags(node);
            const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0;
            const skipTrailingComments = commentsDisabled || end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0;
            if (!skipLeadingComments) {
                emitDetachedCommentsAndUpdateCommentsInfo(detachedRange);
            }

            exitComment();
            if (emitFlags & EmitFlags.NoNestedComments && !commentsDisabled) {
                commentsDisabled = true;
                emitCallback(node);
                commentsDisabled = false;
            }
            else {
                emitCallback(node);
            }

            enterComment();
            if (!skipTrailingComments) {
                emitLeadingComments(detachedRange.end, /*isEmittedNode*/ true);
                if (hasWrittenComment && !writer.isAtStartOfLine()) {
                    writer.writeLine();
                }
            }
            exitComment();

        }

        function siblingNodePositionsAreComparable(previousNode: Node, nextNode: Node) {
            if (nodeIsSynthesized(previousNode) || nodeIsSynthesized(nextNode)) {
                return false;
            }

            if (nextNode.pos < previousNode.end) {
                return false;
            }

            previousNode = getOriginalNode(previousNode);
            nextNode = getOriginalNode(nextNode);
            const parent = previousNode.parent;
            if (!parent || parent !== nextNode.parent) {
                return false;
            }

            const parentNodeArray = getContainingNodeArray(previousNode);
            const prevNodeIndex = parentNodeArray?.indexOf(previousNode);
            return prevNodeIndex !== undefined && prevNodeIndex > -1 && parentNodeArray!.indexOf(nextNode) === prevNodeIndex + 1;
        }

        function emitLeadingComments(pos: number, isEmittedNode: boolean) {
            hasWrittenComment = false;

            if (isEmittedNode) {
                if (pos === 0 && currentSourceFile?.isDeclarationFile) {
                    forEachLeadingCommentToEmit(pos, emitNonTripleSlashLeadingComment);
                }
                else {
                    forEachLeadingCommentToEmit(pos, emitLeadingComment);
                }
            }
            else if (pos === 0) {
                // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
                // unless it is a triple slash comment at the top of the file.
                // For Example:
                //      /// <reference-path ...>
                //      declare var x;
                //      /// <reference-path ...>
                //      interface F {}
                //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
                forEachLeadingCommentToEmit(pos, emitTripleSlashLeadingComment);
            }
        }

        function emitTripleSlashLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
            if (isTripleSlashComment(commentPos, commentEnd)) {
                emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos);
            }
        }

        function emitNonTripleSlashLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
            if (!isTripleSlashComment(commentPos, commentEnd)) {
                emitLeadingComment(commentPos, commentEnd, kind, hasTrailingNewLine, rangePos);
            }
        }

        function shouldWriteComment(text: string, pos: number) {
            if (printerOptions.onlyPrintJsDocStyle) {
                return (isJSDocLikeText(text, pos) || isPinnedComment(text, pos));
            }
            return true;
        }

        function emitLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
            if (!shouldWriteComment(currentSourceFile!.text, commentPos)) return;
            if (!hasWrittenComment) {
                emitNewLineBeforeLeadingCommentOfPosition(getCurrentLineMap(), writer, rangePos, commentPos);
                hasWrittenComment = true;
            }

            // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
            emitPos(commentPos);
            writeCommentRange(currentSourceFile!.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
            emitPos(commentEnd);

            if (hasTrailingNewLine) {
                writer.writeLine();
            }
            else if (kind === SyntaxKind.MultiLineCommentTrivia) {
                writer.writeSpace(" ");
            }
        }

        function emitLeadingCommentsOfPosition(pos: number) {
            if (commentsDisabled || pos === -1) {
                return;
            }

            emitLeadingComments(pos, /*isEmittedNode*/ true);
        }

        function emitTrailingComments(pos: number) {
            forEachTrailingCommentToEmit(pos, emitTrailingComment);
        }

        function emitTrailingComment(commentPos: number, commentEnd: number, _kind: SyntaxKind, hasTrailingNewLine: boolean) {
            if (!shouldWriteComment(currentSourceFile!.text, commentPos)) return;
            // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment2*/
            if (!writer.isAtStartOfLine()) {
                writer.writeSpace(" ");
            }

            emitPos(commentPos);
            writeCommentRange(currentSourceFile!.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
            emitPos(commentEnd);

            if (hasTrailingNewLine) {
                writer.writeLine();
            }
        }

        function emitTrailingCommentsOfPosition(pos: number, prefixSpace?: boolean, forceNoNewline?: boolean) {
            if (commentsDisabled) {
                return;
            }
            enterComment();
            forEachTrailingCommentToEmit(pos, prefixSpace ? emitTrailingComment : forceNoNewline ? emitTrailingCommentOfPositionNoNewline : emitTrailingCommentOfPosition);
            exitComment();
        }

        function emitTrailingCommentOfPositionNoNewline(commentPos: number, commentEnd: number, kind: SyntaxKind) {
            // trailing comments of a position are emitted at /*trailing comment1 */space/*trailing comment*/space

            emitPos(commentPos);
            writeCommentRange(currentSourceFile!.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
            emitPos(commentEnd);

            if (kind === SyntaxKind.SingleLineCommentTrivia) {
                writer.writeLine(); // still write a newline for single-line comments, so closing tokens aren't written on the same line
            }
        }

        function emitTrailingCommentOfPosition(commentPos: number, commentEnd: number, _kind: SyntaxKind, hasTrailingNewLine: boolean) {
            // trailing comments of a position are emitted at /*trailing comment1 */space/*trailing comment*/space

            emitPos(commentPos);
            writeCommentRange(currentSourceFile!.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
            emitPos(commentEnd);

            if (hasTrailingNewLine) {
                writer.writeLine();
            }
            else {
                writer.writeSpace(" ");
            }
        }

        function forEachLeadingCommentToEmit(pos: number, cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
            // Emit the leading comments only if the container's pos doesn't match because the container should take care of emitting these comments
            if (currentSourceFile && (containerPos === -1 || pos !== containerPos)) {
                if (hasDetachedComments(pos)) {
                    forEachLeadingCommentWithoutDetachedComments(cb);
                }
                else {
                    forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
                }
            }
        }

        function forEachTrailingCommentToEmit(end: number, cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean) => void) {
            // Emit the trailing comments only if the container's end doesn't match because the container should take care of emitting these comments
            if (currentSourceFile && (containerEnd === -1 || (end !== containerEnd && end !== declarationListContainerEnd))) {
                forEachTrailingCommentRange(currentSourceFile.text, end, cb);
            }
        }

        function hasDetachedComments(pos: number) {
            return detachedCommentsInfo !== undefined && last(detachedCommentsInfo).nodePos === pos;
        }

        function forEachLeadingCommentWithoutDetachedComments(cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
            // get the leading comments from detachedPos
            const pos = last(detachedCommentsInfo!).detachedCommentEndPos;
            if (detachedCommentsInfo!.length - 1) {
                detachedCommentsInfo!.pop();
            }
            else {
                detachedCommentsInfo = undefined;
            }

            forEachLeadingCommentRange(currentSourceFile!.text, pos, cb, /*state*/ pos);
        }

        function emitDetachedCommentsAndUpdateCommentsInfo(range: TextRange) {
            const currentDetachedCommentInfo = emitDetachedComments(currentSourceFile!.text, getCurrentLineMap(), writer, emitComment, range, newLine, commentsDisabled);
            if (currentDetachedCommentInfo) {
                if (detachedCommentsInfo) {
                    detachedCommentsInfo.push(currentDetachedCommentInfo);
                }
                else {
                    detachedCommentsInfo = [currentDetachedCommentInfo];
                }
            }
        }

        function emitComment(text: string, lineMap: number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
            if (!shouldWriteComment(currentSourceFile!.text, commentPos)) return;
            emitPos(commentPos);
            writeCommentRange(text, lineMap, writer, commentPos, commentEnd, newLine);
            emitPos(commentEnd);
        }

        /**
         * Determine if the given comment is a triple-slash
         *
         * @return true if the comment is a triple-slash comment else false
         */
        function isTripleSlashComment(commentPos: number, commentEnd: number) {
            return isRecognizedTripleSlashComment(currentSourceFile!.text, commentPos, commentEnd);
        }

        // Source Maps

        function getParsedSourceMap(node: UnparsedSource) {
            if (node.parsedSourceMap === undefined && node.sourceMapText !== undefined) {
                node.parsedSourceMap = tryParseRawSourceMap(node.sourceMapText) || false;
            }
            return node.parsedSourceMap || undefined;
        }

        /**
         * Skips trivia such as comments and white-space that can be optionally overridden by the source-map source
         */
        function skipSourceTrivia(source: SourceMapSource, pos: number): number {
            return source.skipTrivia ? source.skipTrivia(pos) : skipTrivia(source.text, pos);
        }

        /**
         * Emits a mapping.
         *
         * If the position is synthetic (undefined or a negative value), no mapping will be
         * created.
         *
         * @param pos The position.
         */
        function emitPos(pos: number) {
            if (sourceMapsDisabled || positionIsSynthesized(pos) || isJsonSourceMapSource(sourceMapSource)) {
                return;
            }

            const { line: sourceLine, character: sourceCharacter } = getLineAndCharacterOfPosition(sourceMapSource, pos);
            sourceMapGenerator!.addMapping(
                writer.getLine(),
                writer.getColumn(),
                sourceMapSourceIndex,
                sourceLine,
                sourceCharacter,
                /*nameIndex*/ undefined);
        }

        function emitSourcePos(source: SourceMapSource, pos: number) {
            if (source !== sourceMapSource) {
                const savedSourceMapSource = sourceMapSource;
                const savedSourceMapSourceIndex = sourceMapSourceIndex;
                setSourceMapSource(source);
                emitPos(pos);
                resetSourceMapSource(savedSourceMapSource, savedSourceMapSourceIndex);
            }
            else {
                emitPos(pos);
            }
        }

        /**
         * Emits a token of a node with possible leading and trailing source maps.
         *
         * @param node The node containing the token.
         * @param token The token to emit.
         * @param tokenStartPos The start pos of the token.
         * @param emitCallback The callback used to emit the token.
         */
        function emitTokenWithSourceMap(node: Node | undefined, token: SyntaxKind, writer: (s: string) => void, tokenPos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, tokenStartPos: number) => number) {
            if (sourceMapsDisabled || node && isInJsonFile(node)) {
                return emitCallback(token, writer, tokenPos);
            }

            const emitNode = node && node.emitNode;
            const emitFlags = emitNode && emitNode.flags || EmitFlags.None;
            const range = emitNode && emitNode.tokenSourceMapRanges && emitNode.tokenSourceMapRanges[token];
            const source = range && range.source || sourceMapSource;

            tokenPos = skipSourceTrivia(source, range ? range.pos : tokenPos);
            if ((emitFlags & EmitFlags.NoTokenLeadingSourceMaps) === 0 && tokenPos >= 0) {
                emitSourcePos(source, tokenPos);
            }

            tokenPos = emitCallback(token, writer, tokenPos);

            if (range) tokenPos = range.end;
            if ((emitFlags & EmitFlags.NoTokenTrailingSourceMaps) === 0 && tokenPos >= 0) {
                emitSourcePos(source, tokenPos);
            }

            return tokenPos;
        }

        function setSourceMapSource(source: SourceMapSource) {
            if (sourceMapsDisabled) {
                return;
            }

            sourceMapSource = source;

            if (source === mostRecentlyAddedSourceMapSource) {
                // Fast path for when the new source map is the most recently added, in which case
                // we use its captured index without going through the source map generator.
                sourceMapSourceIndex = mostRecentlyAddedSourceMapSourceIndex;
                return;
            }

            if (isJsonSourceMapSource(source)) {
                return;
            }

            sourceMapSourceIndex = sourceMapGenerator!.addSource(source.fileName);
            if (printerOptions.inlineSources) {
                sourceMapGenerator!.setSourceContent(sourceMapSourceIndex, source.text);
            }

            mostRecentlyAddedSourceMapSource = source;
            mostRecentlyAddedSourceMapSourceIndex = sourceMapSourceIndex;
        }

        function resetSourceMapSource(source: SourceMapSource, sourceIndex: number) {
            sourceMapSource = source;
            sourceMapSourceIndex = sourceIndex;
        }

        function isJsonSourceMapSource(sourceFile: SourceMapSource) {
            return fileExtensionIs(sourceFile.fileName, Extension.Json);
        }
    }

    const enum PreprintPipelinePhase {
        Notification,
        Substitution,
        Visit
    }

    function createPreprinter(handlers: PrintHandlers) {
        const {
            substituteNode = noEmitSubstitution,
            onEmitNode = noEmitNotification,
            isEmitNotificationEnabled
        } = handlers;

        let pipelineResult: Node | undefined;

        // Outer visitors
        //
        //   These visitors are invoked by inner visitors to re-enter the pipeline
        //   for notification and substitution.

        const visit = makeVisitor(pipelineVisitorForUnspecified);
        const visitSourceFile = makeVisitor(pipelineVisitorForSourceFile, isSourceFile);
        const visitIdentifierName = makeVisitor(pipelineVisitorForIdentifierName, isIdentifier);
        const visitModuleName = makeVisitor(pipelineVisitorForIdentifierNameOrUnspecified, isModuleName);
        const visitPropertyName = makeVisitor(pipelineVisitorForIdentifierNameOrUnspecified, isPropertyName);
        const visitMemberName = makeVisitor(pipelineVisitorForIdentifierNameOrUnspecified, isMemberName);
        const visitBindingName = makeVisitor(pipelineVisitorForIdentifierNameOrUnspecified, isBindingName);
        const visitEntityName = makeVisitor(pipelineVisitorForIdentifierReferenceOrUnspecified, isEntityName);
        const visitExpression = makeVisitor(pipelineVisitorForExpression, isExpression);
        const visitForInitializer = makeVisitor(pipelineVisitorForForInitializer, isForInitializer);
        const visitTypeNode = makeVisitor(pipelineVisitorForUnspecified, isTypeNode);
        const visitEmbeddedStatement = makeVisitor(pipelineVisitorForEmbeddedStatement, isStatement, factory.liftToBlock);
        const visitJsxAttributeValue = makeVisitor(pipelineVisitorForJsxAttributeValue, isStringLiteralOrJsxExpression);
        const visitMappedTypeParameter = makeVisitor(pipelineVisitorForMappedTypeParameter, isTypeParameterDeclaration);
        const visitConciseBody = makeVisitor(pipelineVisitorForConciseBody, isConciseBody);
        const visitFunctionBody = makeVisitor(pipelineVisitorForUnspecified, isFunctionBody);
        const visitList = makeListVisitor(pipelineVisitorForUnspecified);
        const visitTypeNodeList = makeListVisitor(pipelineVisitorForUnspecified, isTypeNode);
        const visitExpressionList = makeListVisitor(pipelineVisitorForExpression, isExpression);
        const visitParameterList = makeListVisitor(pipelineVisitorForUnspecified, isParameter);

        function makeVisitor<T extends Node>(outerVisitor: (node: Node) => Node | undefined, defaultTest?: (node: Node) => node is T, lift?: (nodes: readonly Node[]) => Node) {
            function visit<U extends T>(node: T, test: (node: Node) => node is U): U;
            function visit<U extends T>(node: T | undefined, test: (node: Node) => node is U): U | undefined;
            function visit(node: T, test?: (node: Node) => node is T): T;
            function visit(node: T | undefined, test?: (node: Node) => node is T): T | undefined;
            function visit(node: Node | undefined, test?: (node: Node) => node is T): Node | undefined {
                return visitNode(node, outerVisitor, test || defaultTest, lift);
            }
            return visit;
        }

        function makeListVisitor<T extends Node>(outerVisitor: (node: Node) => Node | undefined, defaultTest?: (node: Node) => node is T) {
            function visitList<U extends T>(nodes: NodeArray<T>, test: (node: Node) => node is U): NodeArray<U>;
            function visitList<U extends T>(nodes: NodeArray<T> | undefined, test: (node: Node) => node is U): NodeArray<U> | undefined;
            function visitList(nodes: NodeArray<T>, test?: (node: Node) => boolean): NodeArray<T>;
            function visitList(nodes: NodeArray<T> | undefined, test?: (node: Node) => boolean): NodeArray<T> | undefined;
            function visitList(nodes: NodeArray<T> | undefined, test: (node: Node) => boolean = defaultTest || returnTrue): NodeArray<T> | undefined {
                return visitNodes(nodes, outerVisitor, test);
            }
            return visitList;
        }

        // Pipeline Visitors
        //
        //   These visitors execute our existing pipeline logic for notification and substitution,
        //   but adapted to our visitor pattern. In some cases, we refine the `EmitHint` we pass
        //   to the `onEmitNode` and `substituteNode` APIs to ensure they receive the appropriate
        //   context.
        //
        //   For example, the ConciseBody of an arrow function could be an Identifier, in which
        //   case we would want to use `EmitHint.Expression` to ensure we treat the identifier
        //   as an expression during substitution.

        function pipelineVisitorForSourceFile(node: SourceFile) { return pipelineVisitorWorker(EmitHint.SourceFile, node); }
        function pipelineVisitorForExpression(node: Expression) { return pipelineVisitorWorker(EmitHint.Expression, node); }
        function pipelineVisitorForIdentifierName(node: Identifier) { return pipelineVisitorWorker(EmitHint.IdentifierName, node); }
        function pipelineVisitorForIdentifierNameOrUnspecified(node: Node) { return pipelineVisitorWorker(isIdentifier(node) ? EmitHint.IdentifierName : EmitHint.Unspecified, node); }
        function pipelineVisitorForIdentifierReferenceOrUnspecified(node: Node) { return pipelineVisitorWorker(isIdentifier(node) ? EmitHint.Expression : EmitHint.Unspecified, node); }
        function pipelineVisitorForForInitializer(node: ForInitializer) { return pipelineVisitorWorker(isVariableDeclarationList(node) ? EmitHint.Unspecified : EmitHint.Expression, node); }
        function pipelineVisitorForMappedTypeParameter(node: TypeParameterDeclaration) { return pipelineVisitorWorker(EmitHint.MappedTypeParameter, node); }
        function pipelineVisitorForEmbeddedStatement(node: Statement) { return pipelineVisitorWorker(isEmptyStatement(node) ? EmitHint.EmbeddedStatement : EmitHint.Unspecified, node); }
        function pipelineVisitorForJsxAttributeValue(node: StringLiteral | JsxExpression) { return pipelineVisitorWorker(isStringLiteral(node) ? EmitHint.JsxAttributeValue : EmitHint.Unspecified, node); }
        function pipelineVisitorForConciseBody(node: ConciseBody) { return pipelineVisitorWorker(isBlock(node) ? EmitHint.Unspecified : EmitHint.Expression, node); }
        function pipelineVisitorForUnspecified(node: Node) { return pipelineVisitorWorker(EmitHint.Unspecified, node); }

        /**
         * Adapts the emit pipeline API to work with the visitor API
         */
        function pipelineVisitorWorker(hint: EmitHint, node: Node) {
            resetPipelineResult();
            // Get the first supported pipeline phase for this node and evaluate it. We can skip several stack
            // frames if we aren't doing emit notification, so we check for substitution and direct callbacks
            // and execute those immediately.
            const pipelinePhase = getPipelinePhase(PreprintPipelinePhase.Notification, node);
            if (pipelinePhase === pipelineVisitDirect) {
                return visitor(hint, node);
            }

            if (pipelinePhase === pipelineVisitWithSubstitution) {
                // The next phase after substitution is always direct visitation, so we can reduce the call stack
                // depth by calling the visitor directly.
                return visitor(hint, substituteNode(hint, node));
            }

            pipelinePhase(hint, node);
            Debug.assertIsDefined(pipelineResult);
            const result = pipelineResult;
            resetPipelineResult();
            return result;
        }

        function resetPipelineResult() {
            pipelineResult = undefined;
        }

        /**
         * Gets the pipeline callback to pass to the relevant API (i.e., `substituteNode` or `onEmitNode`)
         */
        function getPipelinePhase(phase: PreprintPipelinePhase, node: Node) {
            switch (phase) {
                case PreprintPipelinePhase.Notification:
                    if (onEmitNode !== noEmitNotification && (!isEmitNotificationEnabled || isEmitNotificationEnabled(node))) {
                        return pipelineVisitWithNotification;
                    }
                    // falls through
                case PreprintPipelinePhase.Substitution:
                    if (substituteNode !== noEmitSubstitution) {
                        return pipelineVisitWithSubstitution;
                    }
                    // falls through
                default:
                    return pipelineVisitDirect;
            }
        }

        /**
         * A callback that can be evaluated to trigger emit notification as part of the emit pipeline.
         */
        function pipelineVisitWithNotification(hint: EmitHint, node: Node) {
            onEmitNode(hint, node, getPipelinePhase(PreprintPipelinePhase.Substitution, node));
        }

        /**
         * A callback that can be evaluated to trigger JIT substitution as part of the emit pipeline.
         */
        function pipelineVisitWithSubstitution(hint: EmitHint, node: Node) {
            // Next phase is always direct visitation, so we can reduce the call stack
            // depth by calling the visitor directly.
            pipelineResult = visitor(hint, substituteNode(hint, node));
        }

        /**
         * A callback that can be evaluated to visit the subtree of a node.
         */
        function pipelineVisitDirect(hint: EmitHint, node: Node) {
            pipelineResult = visitor(hint, node);
        }

        /**
         * Re-enters the visitor pattern from the pipeline pattern to perform
         * tree updates and trigger parenthesization rules.
         */
        function visitor(hint: EmitHint, node: Node): Node {
            // This should align with the assertions in `pipelineEmitWithHint`.
            if (hint === EmitHint.SourceFile) return preprintSourceFile(cast(node, isSourceFile));
            if (hint === EmitHint.IdentifierName) return preprintIdentifier(cast(node, isIdentifier));
            if (hint === EmitHint.JsxAttributeValue) return cast(node, isStringLiteral);
            if (hint === EmitHint.MappedTypeParameter) return preprintTypeParameterDeclaration(cast(node, isTypeParameterDeclaration));
            if (hint === EmitHint.EmbeddedStatement) return cast(node, isEmptyStatement);

            const kind = node.kind;
            // No need to visit nodes without children.
            if ((kind > SyntaxKind.FirstToken && kind <= SyntaxKind.LastToken) || kind === SyntaxKind.ThisType) {
                return node;
            }

            if (hint === EmitHint.Unspecified) {
                if (isKeyword(node.kind)) return node;

                switch (node.kind) {
                    // Identifiers
                    case SyntaxKind.Identifier:
                        return preprintIdentifier(node as Identifier);

                    // Names
                    case SyntaxKind.QualifiedName:
                        Debug.type<QualifiedName>(node);
                        return factory.updateQualifiedName(node,
                            visitEntityName(node.left),
                            visitIdentifierName(node.right));

                    case SyntaxKind.ComputedPropertyName:
                        Debug.type<ComputedPropertyName>(node);
                        return factory.updateComputedPropertyName(node,
                            visitExpression(node.expression));

                    // Signature elements
                    case SyntaxKind.TypeParameter:
                        return preprintTypeParameterDeclaration(node as TypeParameterDeclaration);

                    case SyntaxKind.Parameter:
                        Debug.type<ParameterDeclaration>(node);
                        return factory.updateParameterDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visit(node.dotDotDotToken, isDotDotDotToken),
                            visitBindingName(node.name),
                            visit(node.questionToken, isQuestionToken),
                            visitTypeNode(node.type),
                            visitExpression(node.initializer));

                    case SyntaxKind.Decorator:
                        Debug.type<Decorator>(node);
                        return factory.updateDecorator(node,
                            visitExpression(node.expression));

                    // Type members
                    case SyntaxKind.PropertySignature:
                        Debug.type<PropertySignature>(node);
                        return factory.updatePropertySignature(node,
                            visitList(node.modifiers, isModifier),
                            visitPropertyName(node.name),
                            visit(node.questionToken, isQuestionToken),
                            visitTypeNode(node.type));

                    case SyntaxKind.PropertyDeclaration:
                        Debug.type<PropertyDeclaration>(node);
                        return factory.updatePropertyDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitPropertyName(node.name),
                            visit(node.questionToken || node.exclamationToken, isQuestionOrExclamationToken),
                            visitTypeNode(node.type),
                            visitExpression(node.initializer));

                    case SyntaxKind.MethodSignature:
                        Debug.type<MethodSignature>(node);
                        return factory.updateMethodSignature(node,
                            visitList(node.modifiers, isModifier),
                            visitPropertyName(node.name),
                            visit(node.questionToken, isQuestionToken),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type));

                    case SyntaxKind.MethodDeclaration:
                        Debug.type<MethodDeclaration>(node);
                        return factory.updateMethodDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visit(node.asteriskToken, isAsteriskToken),
                            visitPropertyName(node.name),
                            visit(node.questionToken, isQuestionToken),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type),
                            visitFunctionBody(node.body));

                    case SyntaxKind.Constructor:
                        Debug.type<ConstructorDeclaration>(node);
                        return factory.updateConstructorDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitParameterList(node.parameters),
                            visitFunctionBody(node.body));

                    case SyntaxKind.GetAccessor:
                        Debug.type<GetAccessorDeclaration>(node);
                        return factory.updateGetAccessorDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitPropertyName(node.name),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type),
                            visitFunctionBody(node.body));

                    case SyntaxKind.SetAccessor:
                        Debug.type<SetAccessorDeclaration>(node);
                        return factory.updateSetAccessorDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitPropertyName(node.name),
                            visitParameterList(node.parameters),
                            visitFunctionBody(node.body));

                    case SyntaxKind.CallSignature:
                        Debug.type<CallSignatureDeclaration>(node);
                        return factory.updateCallSignature(node,
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type));

                    case SyntaxKind.ConstructSignature:
                        Debug.type<ConstructSignatureDeclaration>(node);
                        return factory.updateConstructSignature(node,
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type));

                    case SyntaxKind.IndexSignature:
                        Debug.type<IndexSignatureDeclaration>(node);
                        return factory.updateIndexSignature(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type));

                    // Types
                    case SyntaxKind.TypePredicate:
                        Debug.type<TypePredicateNode>(node);
                        return factory.updateTypePredicateNode(node,
                            visit(node.assertsModifier, isAssertsKeyword),
                            visit(node.parameterName, isIdentifierOrThisTypeNode),
                            visitTypeNode(node.type));

                    case SyntaxKind.TypeReference:
                        Debug.type<TypeReferenceNode>(node);
                        return factory.updateTypeReferenceNode(node,
                            visitEntityName(node.typeName),
                            visitTypeNodeList(node.typeArguments));

                    case SyntaxKind.FunctionType:
                        Debug.type<FunctionTypeNode>(node);
                        return factory.updateFunctionTypeNode(node,
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitNodes(node.parameters, pipelineVisitorForUnspecified, isParameterDeclaration),
                            visitTypeNode(node.type));

                    case SyntaxKind.ConstructorType:
                        Debug.type<ConstructorTypeNode>(node);
                        return factory.updateConstructorTypeNode(node,
                            visitNodes(node.modifiers, pipelineVisitorForUnspecified, isModifier),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type));

                    case SyntaxKind.TypeQuery:
                        Debug.type<TypeQueryNode>(node);
                        return factory.updateTypeQueryNode(node,
                            visitEntityName(node.exprName));

                    case SyntaxKind.TypeLiteral:
                        Debug.type<TypeLiteralNode>(node);
                        return factory.updateTypeLiteralNode(node,
                            visitList(node.members, isTypeElement));

                    case SyntaxKind.ArrayType:
                        Debug.type<ArrayTypeNode>(node);
                        return factory.updateArrayTypeNode(node,
                            visitTypeNode(node.elementType));

                    case SyntaxKind.TupleType:
                        Debug.type<TupleTypeNode>(node);
                        return factory.updateTupleTypeNode(node,
                            visitTypeNodeList(node.elements));

                    case SyntaxKind.OptionalType:
                        Debug.type<OptionalTypeNode>(node);
                        return factory.updateOptionalTypeNode(node,
                            visitTypeNode(node.type));

                    case SyntaxKind.RestType:
                        Debug.type<RestTypeNode>(node);
                        return factory.updateRestTypeNode(node,
                            visitTypeNode(node.type));

                    case SyntaxKind.UnionType:
                        Debug.type<UnionTypeNode>(node);
                        return factory.updateUnionTypeNode(node,
                            visitTypeNodeList(node.types));

                    case SyntaxKind.IntersectionType:
                        Debug.type<IntersectionTypeNode>(node);
                        return factory.updateIntersectionTypeNode(node,
                            visitTypeNodeList(node.types));

                    case SyntaxKind.ConditionalType:
                        Debug.type<ConditionalTypeNode>(node);
                        return factory.updateConditionalTypeNode(node,
                            visitTypeNode(node.checkType),
                            visitTypeNode(node.extendsType),
                            visitTypeNode(node.trueType),
                            visitTypeNode(node.falseType));

                    case SyntaxKind.InferType:
                        Debug.type<InferTypeNode>(node);
                        return factory.updateInferTypeNode(node,
                            visit(node.typeParameter, isTypeParameterDeclaration));

                    case SyntaxKind.ImportType:
                        Debug.type<ImportTypeNode>(node);
                        return factory.updateImportTypeNode(node,
                            visitTypeNode(node.argument),
                            visitEntityName(node.qualifier),
                            visitTypeNodeList(node.typeArguments),
                            node.isTypeOf
                        );

                    case SyntaxKind.NamedTupleMember:
                        Debug.type<NamedTupleMember>(node);
                        return factory.updateNamedTupleMember(node,
                            visit(node.dotDotDotToken, isDotDotDotToken),
                            visitIdentifierName(node.name),
                            visit(node.questionToken, isQuestionToken),
                            visitTypeNode(node.type),
                        );

                    case SyntaxKind.ParenthesizedType:
                        Debug.type<ParenthesizedTypeNode>(node);
                        return factory.updateParenthesizedType(node,
                            visitTypeNode(node.type));

                    case SyntaxKind.ExpressionWithTypeArguments:
                        Debug.type<ExpressionWithTypeArguments>(node);
                        return factory.updateExpressionWithTypeArguments(node,
                            visitExpression(node.expression),
                            visitTypeNodeList(node.typeArguments));

                    case SyntaxKind.TypeOperator:
                        Debug.type<TypeOperatorNode>(node);
                        return factory.updateTypeOperatorNode(node,
                            visitTypeNode(node.type));

                    case SyntaxKind.IndexedAccessType:
                        Debug.type<IndexedAccessTypeNode>(node);
                        return factory.updateIndexedAccessTypeNode(node,
                            visitTypeNode(node.objectType),
                            visitTypeNode(node.indexType));

                    case SyntaxKind.MappedType:
                        Debug.type<MappedTypeNode>(node);
                        return factory.updateMappedTypeNode(node,
                            visit(node.readonlyToken, isReadonlyKeywordOrPlusOrMinusToken),
                            visitMappedTypeParameter(node.typeParameter),
                            visitTypeNode(node.nameType),
                            visit(node.questionToken, isQuestionOrPlusOrMinusToken),
                            visitTypeNode(node.type));

                    case SyntaxKind.LiteralType:
                        Debug.type<LiteralTypeNode>(node);
                        return factory.updateLiteralTypeNode(node,
                            visitExpression(node.literal, isLiteralTypeLikeExpression));

                    case SyntaxKind.TemplateLiteralType:
                        Debug.type<TemplateLiteralTypeNode>(node);
                        return factory.updateTemplateLiteralType(node,
                            visit(node.head, isTemplateHead),
                            visitList(node.templateSpans, isTemplateLiteralTypeSpan));

                    case SyntaxKind.TemplateLiteralTypeSpan:
                        Debug.type<TemplateLiteralTypeSpan>(node);
                        return factory.updateTemplateLiteralTypeSpan(node,
                            visitTypeNode(node.type),
                            visit(node.literal, isTemplateMiddleOrTemplateTail));

                    // Binding patterns
                    case SyntaxKind.ObjectBindingPattern:
                        Debug.type<ObjectBindingPattern>(node);
                        return factory.updateObjectBindingPattern(node,
                            visitList(node.elements, isBindingElement));

                    case SyntaxKind.ArrayBindingPattern:
                        Debug.type<ArrayBindingPattern>(node);
                        return factory.updateArrayBindingPattern(node,
                            visitList(node.elements, isArrayBindingElement));

                    case SyntaxKind.BindingElement:
                        Debug.type<BindingElement>(node);
                        return factory.updateBindingElement(node,
                            visit(node.dotDotDotToken, isDotDotDotToken),
                            visitPropertyName(node.propertyName),
                            visitBindingName(node.name),
                            visitExpression(node.initializer));

                    // Misc
                    case SyntaxKind.TemplateSpan:
                        Debug.type<TemplateSpan>(node);
                        return factory.updateTemplateSpan(node,
                            visitExpression(node.expression),
                            visit(node.literal, isTemplateMiddleOrTemplateTail));

                    // Element
                    case SyntaxKind.Block:
                        Debug.type<Block>(node);
                        return factory.updateBlock(node,
                            visitList(node.statements, isStatement));

                    case SyntaxKind.VariableStatement:
                        Debug.type<VariableStatement>(node);
                        return factory.updateVariableStatement(node,
                            visitList(node.modifiers, isModifier),
                            visit(node.declarationList, isVariableDeclarationList));

                    case SyntaxKind.ExpressionStatement:
                        Debug.type<ExpressionStatement>(node);
                        return factory.updateExpressionStatement(node,
                            visitExpression(node.expression));

                    case SyntaxKind.IfStatement:
                        Debug.type<IfStatement>(node);
                        return factory.updateIfStatement(node,
                            visitExpression(node.expression),
                            visitEmbeddedStatement(node.thenStatement),
                            visitEmbeddedStatement(node.elseStatement));

                    case SyntaxKind.DoStatement:
                        Debug.type<DoStatement>(node);
                        return factory.updateDoStatement(node,
                            visitEmbeddedStatement(node.statement),
                            visitExpression(node.expression));

                    case SyntaxKind.WhileStatement:
                        Debug.type<WhileStatement>(node);
                        return factory.updateWhileStatement(node,
                            visitExpression(node.expression),
                            visitEmbeddedStatement(node.statement));

                    case SyntaxKind.ForStatement:
                        Debug.type<ForStatement>(node);
                        return factory.updateForStatement(node,
                            visitForInitializer(node.initializer),
                            visitExpression(node.condition),
                            visitExpression(node.incrementor),
                            visitEmbeddedStatement(node.statement));

                    case SyntaxKind.ForInStatement:
                        Debug.type<ForInStatement>(node);
                        return factory.updateForInStatement(node,
                            visitForInitializer(node.initializer),
                            visitExpression(node.expression),
                            visitEmbeddedStatement(node.statement));

                    case SyntaxKind.ForOfStatement:
                        Debug.type<ForOfStatement>(node);
                        return factory.updateForOfStatement(node,
                            visit(node.awaitModifier, isAwaitKeyword),
                            visitForInitializer(node.initializer),
                            visitExpression(node.expression),
                            visitEmbeddedStatement(node.statement));

                    case SyntaxKind.ContinueStatement:
                        Debug.type<ContinueStatement>(node);
                        return factory.updateContinueStatement(node,
                            visitIdentifierName(node.label));

                    case SyntaxKind.BreakStatement:
                        Debug.type<BreakStatement>(node);
                        return factory.updateBreakStatement(node,
                            visitIdentifierName(node.label));

                    case SyntaxKind.ReturnStatement:
                        Debug.type<ReturnStatement>(node);
                        return factory.updateReturnStatement(node,
                            visitExpression(node.expression));

                    case SyntaxKind.WithStatement:
                        Debug.type<WithStatement>(node);
                        return factory.updateWithStatement(node,
                            visitExpression(node.expression),
                            visitEmbeddedStatement(node.statement));

                    case SyntaxKind.SwitchStatement:
                        Debug.type<SwitchStatement>(node);
                        return factory.updateSwitchStatement(node,
                            visitExpression(node.expression),
                            visit(node.caseBlock, isCaseBlock));

                    case SyntaxKind.LabeledStatement:
                        Debug.type<LabeledStatement>(node);
                        return factory.updateLabeledStatement(node,
                            visitIdentifierName(node.label),
                            visitEmbeddedStatement(node.statement));

                    case SyntaxKind.ThrowStatement:
                        Debug.type<ThrowStatement>(node);
                        return factory.updateThrowStatement(node,
                            visitExpression(node.expression));

                    case SyntaxKind.TryStatement:
                        Debug.type<TryStatement>(node);
                        return factory.updateTryStatement(node,
                            visit(node.tryBlock, isBlock),
                            visit(node.catchClause, isCatchClause),
                            visit(node.finallyBlock, isBlock));

                    // Declarations
                    case SyntaxKind.VariableDeclaration:
                        Debug.type<VariableDeclaration>(node);
                        return factory.updateVariableDeclaration(node,
                            visitBindingName(node.name),
                            visit(node.exclamationToken, isExclamationToken),
                            visitTypeNode(node.type),
                            visitExpression(node.initializer));

                    case SyntaxKind.VariableDeclarationList:
                        Debug.type<VariableDeclarationList>(node);
                        return factory.updateVariableDeclarationList(node,
                            visitList(node.declarations, isVariableDeclaration));

                    case SyntaxKind.FunctionDeclaration:
                        Debug.type<FunctionDeclaration>(node);
                        return factory.updateFunctionDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visit(node.asteriskToken, isAsteriskToken),
                            visitIdentifierName(node.name),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type),
                            visitFunctionBody(node.body));

                    case SyntaxKind.ClassDeclaration:
                        Debug.type<ClassDeclaration>(node);
                        return factory.updateClassDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitIdentifierName(node.name),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitList(node.heritageClauses, isHeritageClause),
                            visitList(node.members, isClassElement));

                    case SyntaxKind.InterfaceDeclaration:
                        Debug.type<InterfaceDeclaration>(node);
                        return factory.updateInterfaceDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitIdentifierName(node.name),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitList(node.heritageClauses, isHeritageClause),
                            visitList(node.members, isTypeElement));

                    case SyntaxKind.TypeAliasDeclaration:
                        Debug.type<TypeAliasDeclaration>(node);
                        return factory.updateTypeAliasDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitIdentifierName(node.name),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitTypeNode(node.type));

                    case SyntaxKind.EnumDeclaration:
                        Debug.type<EnumDeclaration>(node);
                        return factory.updateEnumDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitIdentifierName(node.name),
                            visitList(node.members, isEnumMember));

                    case SyntaxKind.ModuleDeclaration:
                        Debug.type<ModuleDeclaration>(node);
                        return factory.updateModuleDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitModuleName(node.name),
                            visit(node.body, isModuleBody));

                    case SyntaxKind.ModuleBlock:
                        Debug.type<ModuleBlock>(node);
                        return factory.updateModuleBlock(node,
                            visitList(node.statements, isStatement));

                    case SyntaxKind.CaseBlock:
                        Debug.type<CaseBlock>(node);
                        return factory.updateCaseBlock(node,
                            visitList(node.clauses, isCaseOrDefaultClause));

                    case SyntaxKind.NamespaceExportDeclaration:
                        Debug.type<NamespaceExportDeclaration>(node);
                        return factory.updateNamespaceExportDeclaration(node,
                            visitIdentifierName(node.name));

                    case SyntaxKind.ImportEqualsDeclaration:
                        Debug.type<ImportEqualsDeclaration>(node);
                        return factory.updateImportEqualsDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            node.isTypeOnly,
                            visitIdentifierName(node.name),
                            visit(node.moduleReference, isModuleReference));

                    case SyntaxKind.ImportDeclaration:
                        Debug.type<ImportDeclaration>(node);
                        return factory.updateImportDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visit(node.importClause, isImportClause),
                            visitExpression(node.moduleSpecifier));

                    case SyntaxKind.ImportClause:
                        Debug.type<ImportClause>(node);
                        return factory.updateImportClause(node,
                            node.isTypeOnly,
                            visitIdentifierName(node.name),
                            visit(node.namedBindings, isNamedImportBindings));

                    case SyntaxKind.NamespaceImport:
                        Debug.type<NamespaceImport>(node);
                        return factory.updateNamespaceImport(node,
                            visitIdentifierName(node.name));

                    case SyntaxKind.NamespaceExport:
                        Debug.type<NamespaceExport>(node);
                        return factory.updateNamespaceExport(node,
                            visitIdentifierName(node.name));

                    case SyntaxKind.NamedImports:
                        Debug.type<NamedImports>(node);
                        return factory.updateNamedImports(node,
                            visitList(node.elements, isImportSpecifier));

                    case SyntaxKind.ImportSpecifier:
                        Debug.type<ImportSpecifier>(node);
                        return factory.updateImportSpecifier(node,
                            visitIdentifierName(node.propertyName),
                            visitIdentifierName(node.name));

                    case SyntaxKind.ExportAssignment:
                        Debug.type<ExportAssignment>(node);
                        return factory.updateExportAssignment(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitExpression(node.expression));

                    case SyntaxKind.ExportDeclaration:
                        Debug.type<ExportDeclaration>(node);
                        return factory.updateExportDeclaration(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            node.isTypeOnly,
                            visit(node.exportClause, isNamedExportBindings),
                            visitExpression(node.moduleSpecifier));

                    case SyntaxKind.NamedExports:
                        Debug.type<NamedExports>(node);
                        return factory.updateNamedExports(node,
                            visitList(node.elements, isExportSpecifier));

                    case SyntaxKind.ExportSpecifier:
                        Debug.type<ExportSpecifier>(node);
                        return factory.updateExportSpecifier(node,
                            visitIdentifierName(node.propertyName),
                            visitIdentifierName(node.name));

                    case SyntaxKind.MissingDeclaration:
                        return node;

                    // Module references
                    case SyntaxKind.ExternalModuleReference:
                        Debug.type<ExternalModuleReference>(node);
                        return factory.updateExternalModuleReference(node,
                            visitExpression(node.expression));

                    // JSX (non-expression)
                    case SyntaxKind.JsxOpeningElement:
                        Debug.type<JsxOpeningElement>(node);
                        return factory.updateJsxOpeningElement(node,
                            visitExpression(node.tagName, isJsxTagNameExpression),
                            visitList(node.typeArguments, isTypeNode),
                            visit(node.attributes, isJsxAttributes));

                    case SyntaxKind.JsxClosingElement:
                        Debug.type<JsxClosingElement>(node);
                        return factory.updateJsxClosingElement(node,
                            visitExpression(node.tagName, isJsxTagNameExpression));

                    case SyntaxKind.JsxAttribute:
                        Debug.type<JsxAttribute>(node);
                        return factory.updateJsxAttribute(node,
                            visitIdentifierName(node.name),
                            visitJsxAttributeValue(node.initializer));

                    case SyntaxKind.JsxAttributes:
                        Debug.type<JsxAttributes>(node);
                        return factory.updateJsxAttributes(node,
                            visitList(node.properties, isJsxAttributeLike));

                    case SyntaxKind.JsxSpreadAttribute:
                        Debug.type<JsxSpreadAttribute>(node);
                        return factory.updateJsxSpreadAttribute(node,
                            visitExpression(node.expression));

                    case SyntaxKind.JsxExpression:
                        Debug.type<JsxExpression>(node);
                        return factory.updateJsxExpression(node,
                            visitExpression(node.expression));

                    // Clauses
                    case SyntaxKind.CaseClause:
                        Debug.type<CaseClause>(node);
                        return factory.updateCaseClause(node,
                            visitExpression(node.expression),
                            visitList(node.statements, isStatement));

                    case SyntaxKind.DefaultClause:
                        Debug.type<DefaultClause>(node);
                        return factory.updateDefaultClause(node,
                            visitList(node.statements, isStatement));

                    case SyntaxKind.HeritageClause:
                        Debug.type<HeritageClause>(node);
                        return factory.updateHeritageClause(node,
                            visitList(node.types, isExpressionWithTypeArguments));

                    case SyntaxKind.CatchClause:
                        Debug.type<CatchClause>(node);
                        return factory.updateCatchClause(node,
                            visit(node.variableDeclaration, isVariableDeclaration),
                            visit(node.block, isBlock));

                    // Property assignments
                    case SyntaxKind.PropertyAssignment:
                        Debug.type<PropertyAssignment>(node);
                        return factory.updatePropertyAssignment(node,
                            visitPropertyName(node.name),
                            visitExpression(node.initializer));

                    case SyntaxKind.ShorthandPropertyAssignment:
                        Debug.type<ShorthandPropertyAssignment>(node);
                        return factory.updateShorthandPropertyAssignment(node,
                            visitIdentifierName(node.name, isIdentifier),
                            visitExpression(node.objectAssignmentInitializer));

                    case SyntaxKind.SpreadAssignment:
                        Debug.type<SpreadAssignment>(node);
                        return factory.updateSpreadAssignment(node,
                            visitExpression(node.expression));

                    // Enum
                    case SyntaxKind.EnumMember:
                        Debug.type<EnumMember>(node);
                        return factory.updateEnumMember(node,
                            visitPropertyName(node.name),
                            visitExpression(node.initializer));

                    // JSDoc nodes (only used in codefixes currently)
                    case SyntaxKind.JSDocTypeExpression:
                    case SyntaxKind.JSDocNameReference:
                    case SyntaxKind.JSDocAllType:
                    case SyntaxKind.JSDocUnknownType:
                    case SyntaxKind.JSDocNullableType:
                    case SyntaxKind.JSDocNonNullableType:
                    case SyntaxKind.JSDocOptionalType:
                    case SyntaxKind.JSDocFunctionType:
                    case SyntaxKind.JSDocVariadicType:
                    case SyntaxKind.JSDocNamepathType:
                    case SyntaxKind.JSDocComment:
                    case SyntaxKind.JSDocTypeLiteral:
                    case SyntaxKind.JSDocSignature:
                    case SyntaxKind.JSDocTag:
                    case SyntaxKind.JSDocAugmentsTag:
                    case SyntaxKind.JSDocImplementsTag:
                    case SyntaxKind.JSDocAuthorTag:
                    case SyntaxKind.JSDocDeprecatedTag:
                    case SyntaxKind.JSDocClassTag:
                    case SyntaxKind.JSDocPublicTag:
                    case SyntaxKind.JSDocPrivateTag:
                    case SyntaxKind.JSDocProtectedTag:
                    case SyntaxKind.JSDocReadonlyTag:
                    case SyntaxKind.JSDocCallbackTag:
                    case SyntaxKind.JSDocEnumTag:
                    case SyntaxKind.JSDocParameterTag:
                    case SyntaxKind.JSDocPropertyTag:
                    case SyntaxKind.JSDocReturnTag:
                    case SyntaxKind.JSDocThisTag:
                    case SyntaxKind.JSDocTypeTag:
                    case SyntaxKind.JSDocTemplateTag:
                    case SyntaxKind.JSDocTypedefTag:
                    case SyntaxKind.JSDocSeeTag:
                        return node;

                    // Transformation nodes (ignored)
                }

                if (isExpression(node)) {
                    // If this was an expression that was originally in an `Unspecified` hint,
                    // re-trigger substitution using the correct hint.
                    hint = EmitHint.Expression;
                    if (substituteNode !== noEmitSubstitution) {
                        node = substituteNode(hint, node);
                    }
                }
                else if (isSourceFile(node)) {
                    return preprintSourceFile(node);
                }
            }

            if (hint === EmitHint.Expression) {
                switch (node.kind) {
                    // Identifiers
                    case SyntaxKind.Identifier:
                        return preprintIdentifier(node as Identifier);

                    // Expression
                    case SyntaxKind.ArrayLiteralExpression:
                        Debug.type<ArrayLiteralExpression>(node);
                        return factory.updateArrayLiteralExpression(node,
                            visitExpressionList(node.elements));

                    case SyntaxKind.ObjectLiteralExpression:
                        Debug.type<ObjectLiteralExpression>(node);
                        return factory.updateObjectLiteralExpression(node,
                            visitList(node.properties, isObjectLiteralElementLike));

                    case SyntaxKind.PropertyAccessExpression:
                        if (node.flags & NodeFlags.OptionalChain) {
                            Debug.type<PropertyAccessChain>(node);
                            return factory.updatePropertyAccessChain(node,
                                visitExpression(node.expression),
                                visit(node.questionDotToken, isQuestionDotToken),
                                visitMemberName(node.name));
                        }
                        Debug.type<PropertyAccessExpression>(node);
                        return factory.updatePropertyAccessExpression(node,
                            visitExpression(node.expression),
                            visitMemberName(node.name));

                    case SyntaxKind.ElementAccessExpression:
                        if (node.flags & NodeFlags.OptionalChain) {
                            Debug.type<ElementAccessChain>(node);
                            return factory.updateElementAccessChain(node,
                                visitExpression(node.expression),
                                visit(node.questionDotToken, isQuestionDotToken),
                                visitExpression(node.argumentExpression));
                        }
                        Debug.type<ElementAccessExpression>(node);
                        return factory.updateElementAccessExpression(node,
                            visitExpression(node.expression),
                            visitExpression(node.argumentExpression));

                    case SyntaxKind.CallExpression:
                        if (node.flags & NodeFlags.OptionalChain) {
                            Debug.type<CallChain>(node);
                            return factory.updateCallChain(node,
                                visitExpression(node.expression),
                                visit(node.questionDotToken, isQuestionDotToken),
                                visitTypeNodeList(node.typeArguments),
                                visitExpressionList(node.arguments));
                        }
                        Debug.type<CallExpression>(node);
                        return factory.updateCallExpression(node,
                            visitExpression(node.expression),
                            visitTypeNodeList(node.typeArguments),
                            visitExpressionList(node.arguments));

                    case SyntaxKind.NewExpression:
                        Debug.type<NewExpression>(node);
                        return factory.updateNewExpression(node,
                            visitExpression(node.expression),
                            visitTypeNodeList(node.typeArguments),
                            visitExpressionList(node.arguments));

                    case SyntaxKind.TaggedTemplateExpression:
                        Debug.type<TaggedTemplateExpression>(node);
                        return factory.updateTaggedTemplateExpression(node,
                            visitExpression(node.tag),
                            visitTypeNodeList(node.typeArguments),
                            visitExpression(node.template, isTemplateLiteral));

                    case SyntaxKind.TypeAssertionExpression:
                        Debug.type<TypeAssertion>(node);
                        return factory.updateTypeAssertion(node,
                            visitTypeNode(node.type),
                            visitExpression(node.expression));

                    case SyntaxKind.ParenthesizedExpression:
                        Debug.type<ParenthesizedExpression>(node);
                        return factory.updateParenthesizedExpression(node,
                            visitExpression(node.expression));

                    case SyntaxKind.FunctionExpression:
                        Debug.type<FunctionExpression>(node);
                        return factory.updateFunctionExpression(node,
                            visitList(node.modifiers, isModifier),
                            visit(node.asteriskToken, isAsteriskToken),
                            visitIdentifierName(node.name),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type),
                            visitFunctionBody(node.body));

                    case SyntaxKind.ArrowFunction:
                        Debug.type<ArrowFunction>(node);
                        return factory.updateArrowFunction(node,
                            visitList(node.modifiers, isModifier),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitParameterList(node.parameters),
                            visitTypeNode(node.type),
                            visit(node.equalsGreaterThanToken, isEqualsGreaterThanToken),
                            visitConciseBody(node.body));

                    case SyntaxKind.DeleteExpression:
                        Debug.type<DeleteExpression>(node);
                        return factory.updateDeleteExpression(node,
                            visitExpression(node.expression));

                    case SyntaxKind.TypeOfExpression:
                        Debug.type<TypeOfExpression>(node);
                        return factory.updateTypeOfExpression(node,
                            visitExpression(node.expression));

                    case SyntaxKind.VoidExpression:
                        Debug.type<VoidExpression>(node);
                        return factory.updateVoidExpression(node,
                            visitExpression(node.expression));

                    case SyntaxKind.AwaitExpression:
                        Debug.type<AwaitExpression>(node);
                        return factory.updateAwaitExpression(node,
                            visitExpression(node.expression));

                    case SyntaxKind.PrefixUnaryExpression:
                        Debug.type<PrefixUnaryExpression>(node);
                        return factory.updatePrefixUnaryExpression(node,
                            visitExpression(node.operand));

                    case SyntaxKind.PostfixUnaryExpression:
                        Debug.type<PostfixUnaryExpression>(node);
                        return factory.updatePostfixUnaryExpression(node,
                            visitExpression(node.operand));

                    case SyntaxKind.BinaryExpression:
                        return preprintBinaryExpression(node as BinaryExpression);

                    case SyntaxKind.ConditionalExpression:
                        Debug.type<ConditionalExpression>(node);
                        return factory.updateConditionalExpression(node,
                            visitExpression(node.condition),
                            visit(node.questionToken, isQuestionToken),
                            visitExpression(node.whenTrue),
                            visit(node.colonToken, isColonToken),
                            visitExpression(node.whenFalse));

                    case SyntaxKind.TemplateExpression:
                        Debug.type<TemplateExpression>(node);
                        return factory.updateTemplateExpression(node,
                            visit(node.head, isTemplateHead),
                            visitList(node.templateSpans, isTemplateSpan));

                    case SyntaxKind.YieldExpression:
                        Debug.type<YieldExpression>(node);
                        return factory.updateYieldExpression(node,
                            visit(node.asteriskToken, isAsteriskToken),
                            visitExpression(node.expression));

                    case SyntaxKind.SpreadElement:
                        Debug.type<SpreadElement>(node);
                        return factory.updateSpreadElement(node,
                            visitExpression(node.expression));

                    case SyntaxKind.ClassExpression:
                        Debug.type<ClassExpression>(node);
                        return factory.updateClassExpression(node,
                            visitList(node.decorators, isDecorator),
                            visitList(node.modifiers, isModifier),
                            visitIdentifierName(node.name),
                            visitList(node.typeParameters, isTypeParameterDeclaration),
                            visitList(node.heritageClauses, isHeritageClause),
                            visitList(node.members, isClassElement));

                    case SyntaxKind.AsExpression:
                        Debug.type<AsExpression>(node);
                        return factory.updateAsExpression(node,
                            visitExpression(node.expression),
                            visitTypeNode(node.type));

                    case SyntaxKind.NonNullExpression:
                        if (node.flags & NodeFlags.OptionalChain) {
                            Debug.type<NonNullChain>(node);
                            return factory.updateNonNullChain(node,
                                visitExpression(node.expression));
                        }
                        Debug.type<NonNullExpression>(node);
                        return factory.updateNonNullExpression(node,
                            visitExpression(node.expression));

                    case SyntaxKind.MetaProperty:
                        Debug.type<MetaProperty>(node);
                        return factory.updateMetaProperty(node,
                            visitIdentifierName(node.name));


                    // JSX (expression only)
                    case SyntaxKind.JsxElement:
                        Debug.type<JsxElement>(node);
                        return factory.updateJsxElement(node,
                            visit(node.openingElement, isJsxOpeningElement),
                            visitList(node.children, isJsxChild),
                            visit(node.closingElement, isJsxClosingElement));

                    case SyntaxKind.JsxSelfClosingElement:
                        Debug.type<JsxSelfClosingElement>(node);
                        return factory.updateJsxSelfClosingElement(node,
                            visitExpression(node.tagName, isJsxTagNameExpression),
                            visitList(node.typeArguments, isTypeNode),
                            visit(node.attributes, isJsxAttributes));

                    case SyntaxKind.JsxFragment:
                        Debug.type<JsxFragment>(node);
                        return factory.updateJsxFragment(node,
                            visit(node.openingFragment, isJsxOpeningFragment),
                            visitList(node.children, isJsxChild),
                            visit(node.closingFragment, isJsxClosingFragment));

                    // Transformation nodes
                    case SyntaxKind.PartiallyEmittedExpression:
                        Debug.type<PartiallyEmittedExpression>(node);
                        return factory.updatePartiallyEmittedExpression(node,
                            visitExpression(node.expression));

                    case SyntaxKind.CommaListExpression:
                        Debug.type<CommaListExpression>(node);
                        return factory.updateCommaListExpression(node,
                            visitExpressionList(node.elements, isExpression));
                }
            }

            if (Debug.shouldAssert(AssertionLevel.Normal)) {
                // Any other node should not have children or this list isn't up to date.
                Debug.assertMissingNode(forEachChild(node, identity), `Expected ${Debug.formatSyntaxKind(node.kind)} to contain no children.`);
            }

            // No need to visit nodes with no children.
            return node;
        }

        function preprintSourceFile(node: SourceFile) {
            return factory.updateSourceFile(node,
                visitList(node.statements, isStatement));
        }

        function preprintIdentifier(node: Identifier) {
            return factory.updateIdentifier(node,
                visitList(node.typeArguments, isTypeNodeOrTypeParameterDeclaration));
        }

        function preprintTypeParameterDeclaration(node: TypeParameterDeclaration) {
            return factory.updateTypeParameterDeclaration(node,
                visitIdentifierName(node.name),
                visitTypeNode(node.constraint),
                visitTypeNode(node.default));
        }

        function createPreprintBinaryExpression() {
            interface WorkArea {
                stackIndex: number;
                leftStack: Expression[];
                operatorStack: BinaryOperatorToken[];
                rightStack: Expression[];
            }

            return createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, foldState);

            function onEnter(node: BinaryExpression, state: WorkArea | undefined) {
                if (state) {
                    state.stackIndex++;
                    state.leftStack[state.stackIndex] = node.left;
                    state.operatorStack[state.stackIndex] = node.operatorToken;
                    state.rightStack[state.stackIndex] = node.right;
                }
                else {
                    state = {
                        stackIndex: 0,
                        leftStack: [node.left],
                        operatorStack: [node.operatorToken],
                        rightStack: [node.right],
                    };
                }
                return state;
            }

            function onLeft(left: Expression, state: WorkArea, _node: BinaryExpression) {
                return maybeVisitExpression(left, state, "left");
            }

            function onOperator(operator: BinaryOperatorToken, state: WorkArea, _node: BinaryExpression) {
                state.operatorStack[state.stackIndex] = visit(operator, isBinaryOperatorToken);
            }

            function onRight(right: Expression, state: WorkArea, _node: BinaryExpression) {
                return maybeVisitExpression(right, state, "right");
            }

            function onExit(node: BinaryExpression, state: WorkArea) {
                const left = state.leftStack[state.stackIndex];
                const operator = state.operatorStack[state.stackIndex];
                const right = state.rightStack[state.stackIndex];
                if (state.stackIndex > 0) {
                    state.stackIndex--;
                }
                return factory.updateBinaryExpression(node, left, operator, right);
            }

            function foldState(state: WorkArea, result: BinaryExpression, side: "left" | "right") {
                (side === "left" ? state.leftStack : state.rightStack)[state.stackIndex] = result;
                return state;
            }

            function maybeVisitExpression(node: Expression, state: WorkArea, side: "left" | "right") {
                // Get the first supported pipeline phase for this node. We can skip several stack
                // frames if we aren't doing emit notification, so we check for substitution and
                // direct callbacks and execute those immediately.
                let pipelinePhase = getPipelinePhase(PreprintPipelinePhase.Notification, node);
                if (pipelinePhase === pipelineVisitWithSubstitution) {
                    // The next phase after substitution is always direct visitation, so we can reduce the call stack
                    // depth by proceding to the direct visitor.
                    node = cast(substituteNode(EmitHint.Expression, node), isExpression);
                    pipelinePhase = pipelineVisitDirect;
                }
                if (pipelinePhase === pipelineVisitDirect && isBinaryExpression(node)) {
                    // If we are visiting directly and the next node is a BinaryExpression, we can
                    // add it to the stack and continue the trampoline.
                    return node;
                }
                else {
                    // Visit the expression and store the result on whichever side we are currently visiting.
                    (side === "left" ? state.leftStack : state.rightStack)[state.stackIndex] = visitExpression(node, isExpression);
                }
            }
        }

        const preprintBinaryExpression = createPreprintBinaryExpression();

        function preprint(hint: EmitHint, node: Node) {
            // If we're not performing substitution or notification, we have no work to do here.
            if (substituteNode === noEmitSubstitution &&
                onEmitNode === noEmitNotification) {
                return node;
            }
            switch (hint) {
                case EmitHint.SourceFile: return visitSourceFile(cast(node, isSourceFile));
                case EmitHint.Expression: return visitExpression(cast(node, isExpression));
                case EmitHint.IdentifierName: return visitIdentifierName(cast(node, isIdentifier));
                case EmitHint.MappedTypeParameter: return visitMappedTypeParameter(cast(node, isTypeParameterDeclaration));
                case EmitHint.EmbeddedStatement: return visitEmbeddedStatement(cast(node, isStatement));
                case EmitHint.JsxAttributeValue: return visitJsxAttributeValue(cast(node, isStringLiteralOrJsxExpression));
                default: return visit(node);
            }
        }

        return preprint;
    }

    function createBracketsMap() {
        const brackets: string[][] = [];
        brackets[ListFormat.Braces] = ["{", "}"];
        brackets[ListFormat.Parenthesis] = ["(", ")"];
        brackets[ListFormat.AngleBrackets] = ["<", ">"];
        brackets[ListFormat.SquareBrackets] = ["[", "]"];
        return brackets;
    }

    function getOpeningBracket(format: ListFormat) {
        return brackets[format & ListFormat.BracketsMask][0];
    }

    function getClosingBracket(format: ListFormat) {
        return brackets[format & ListFormat.BracketsMask][1];
    }

    // Flags enum to track count of temp variables and a few dedicated names
    const enum TempFlags {
        Auto = 0x00000000,  // No preferred name
        CountMask = 0x0FFFFFFF,  // Temp variable counter
        _i = 0x10000000,  // Use/preference flag for '_i'
    }
}
