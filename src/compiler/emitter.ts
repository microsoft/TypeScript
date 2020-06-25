namespace ts {
    const brackets = createBracketsMap();
    const syntheticParent: TextRange = { pos: -1, end: -1 };

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

    function rootDirOfOptions(configFile: ParsedCommandLine) {
        return configFile.options.rootDir || getDirectoryPath(Debug.checkDefined(configFile.options.configFilePath));
    }

    function getOutputPathWithoutChangingExt(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean, outputDir: string | undefined) {
        return outputDir ?
            resolvePath(
                outputDir,
                getRelativePathFromDirectory(rootDirOfOptions(configFile), inputFileName, ignoreCase)
            ) :
            inputFileName;
    }

    /* @internal */
    export function getOutputDeclarationFileName(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean) {
        Debug.assert(!fileExtensionIs(inputFileName, Extension.Dts) && !fileExtensionIs(inputFileName, Extension.Json));
        return changeExtension(
            getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.declarationDir || configFile.options.outDir),
            Extension.Dts
        );
    }

    function getOutputJSFileName(inputFileName: string, configFile: ParsedCommandLine, ignoreCase: boolean) {
        if (configFile.options.emitDeclarationOnly) return undefined;
        const isJsonFile = fileExtensionIs(inputFileName, Extension.Json);
        const outputFileName = changeExtension(
            getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.outDir),
            isJsonFile ?
                Extension.Json :
                fileExtensionIs(inputFileName, Extension.Tsx) && configFile.options.jsx === JsxEmit.Preserve ?
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

    function getOwnOutputFileNames(configFile: ParsedCommandLine, inputFileName: string, ignoreCase: boolean, addOutput: ReturnType<typeof createAddOutput>["addOutput"]) {
        if (fileExtensionIs(inputFileName, Extension.Dts)) return;
        const js = getOutputJSFileName(inputFileName, configFile, ignoreCase);
        addOutput(js);
        if (fileExtensionIs(inputFileName, Extension.Json)) return;
        if (js && configFile.options.sourceMap) {
            addOutput(`${js}.map`);
        }
        if (getEmitDeclarations(configFile.options)) {
            const dts = getOutputDeclarationFileName(inputFileName, configFile, ignoreCase);
            addOutput(dts);
            if (configFile.options.declarationMap) {
                addOutput(`${dts}.map`);
            }
        }
    }

    /*@internal*/
    export function getAllProjectOutputs(configFile: ParsedCommandLine, ignoreCase: boolean): readonly string[] {
        const { addOutput, getOutputs } = createAddOutput();
        if (outFile(configFile.options)) {
            getSingleOutputFileNames(configFile, addOutput);
        }
        else {
            for (const inputFileName of configFile.fileNames) {
                getOwnOutputFileNames(configFile, inputFileName, ignoreCase, addOutput);
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

        for (const inputFileName of configFile.fileNames) {
            if (fileExtensionIs(inputFileName, Extension.Dts)) continue;
            const jsFilePath = getOutputJSFileName(inputFileName, configFile, ignoreCase);
            if (jsFilePath) return jsFilePath;
            if (fileExtensionIs(inputFileName, Extension.Json)) continue;
            if (getEmitDeclarations(configFile.options)) {
                return getOutputDeclarationFileName(inputFileName, configFile, ignoreCase);
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
            emitJsFileOrBundle(sourceFileOrBundle, jsFilePath, sourceMapFilePath, relativeToBuildInfo);
            emitDeclarationFileOrBundle(sourceFileOrBundle, declarationFilePath, declarationMapPath, relativeToBuildInfo);
            emitBuildInfo(bundleBuildInfo, buildInfoPath);

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
                        sourceMap: compilerOptions.declarationMap,
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
                    return getRelativePathToDirectoryOrUrl(
                        getDirectoryPath(normalizePath(filePath)), // get the relative sourceMapDir path based on jsFilePath
                        combinePaths(sourceMapDir, sourceMapFile), // this is where user expects to see sourceMap
                        host.getCurrentDirectory(),
                        host.getCanonicalFileName,
                        /*isAbsolutePathAnUrl*/ true);
                }
                else {
                    return combinePaths(sourceMapDir, sourceMapFile);
                }
            }
            return sourceMapFile;
        }
    }

    /*@internal*/
    export function getBuildInfoText(buildInfo: BuildInfo) {
        return JSON.stringify(buildInfo, undefined, 2);
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
            redirectTargetsMap: createMultiMap()
        };
        emitFiles(
            notImplementedResolver,
            emitHost,
            /*targetSourceFile*/ undefined,
            getTransformers(config.options, customTransformers)
        );
        return outputFiles;
    }

    const enum PipelinePhase {
        Notification,
        Substitution,
        Comments,
        SourceMaps,
        Emit
    }

    export function createPrinter(printerOptions: PrinterOptions = {}, handlers: PrintHandlers = {}): Printer {
        const {
            hasGlobalName,
            onEmitNode = noEmitNotification,
            isEmitNotificationEnabled,
            substituteNode = noEmitSubstitution,
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

        // Comments
        let containerPos = -1;
        let containerEnd = -1;
        let declarationListContainerEnd = -1;
        let currentLineMap: readonly number[] | undefined;
        let detachedCommentsInfo: { nodePos: number, detachedCommentEndPos: number}[] | undefined;
        let hasWrittenComment = false;
        let commentsDisabled = !!printerOptions.removeComments;
        let lastNode: Node | undefined;
        let lastSubstitution: Node | undefined;
        const { enter: enterComment, exit: exitComment } = performance.createTimerIf(extendedDiagnostics, "commentTime", "beforeComment", "afterComment");

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
            emitList(syntheticParent, nodes, format);
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

            pipelineEmit(hint, node);
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
            currentSourceFile = undefined!;
            currentLineMap = undefined!;
            detachedCommentsInfo = undefined;
            lastNode = undefined;
            lastSubstitution = undefined;
            setWriter(/*output*/ undefined, /*_sourceMapGenerator*/ undefined);
        }

        function getCurrentLineMap() {
            return currentLineMap || (currentLineMap = getLineStarts(currentSourceFile!));
        }

        function emit(node: Node): Node;
        function emit(node: Node | undefined): Node | undefined;
        function emit(node: Node | undefined) {
            if (node === undefined) return;

            const prevSourceFileTextKind = recordBundleFileInternalSectionStart(node);
            const substitute = pipelineEmit(EmitHint.Unspecified, node);
            recordBundleFileInternalSectionEnd(prevSourceFileTextKind);
            return substitute;
        }

        function emitIdentifierName(node: Identifier): Node;
        function emitIdentifierName(node: Identifier | undefined): Node | undefined;
        function emitIdentifierName(node: Identifier | undefined): Node | undefined {
            if (node === undefined) return;
            return pipelineEmit(EmitHint.IdentifierName, node);
        }

        function emitExpression(node: Expression): Node;
        function emitExpression(node: Expression | undefined): Node | undefined;
        function emitExpression(node: Expression | undefined): Node | undefined {
            if (node === undefined) return;
            return pipelineEmit(EmitHint.Expression, node);
        }

        function emitJsxAttributeValue(node: StringLiteral | JsxExpression): Node {
            return pipelineEmit(isStringLiteral(node) ? EmitHint.JsxAttributeValue : EmitHint.Unspecified, node);
        }

        function pipelineEmit(emitHint: EmitHint, node: Node) {
            const savedLastNode = lastNode;
            const savedLastSubstitution = lastSubstitution;
            const savedPreserveSourceNewlines = preserveSourceNewlines;
            lastNode = node;
            lastSubstitution = undefined;
            if (preserveSourceNewlines && !!(getEmitFlags(node) & EmitFlags.IgnoreSourceNewlines)) {
                preserveSourceNewlines = false;
            }

            const pipelinePhase = getPipelinePhase(PipelinePhase.Notification, emitHint, node);
            pipelinePhase(emitHint, node);

            Debug.assert(lastNode === node);

            const substitute = lastSubstitution;
            lastNode = savedLastNode;
            lastSubstitution = savedLastSubstitution;
            preserveSourceNewlines = savedPreserveSourceNewlines;

            return substitute || node;
        }

        function getPipelinePhase(phase: PipelinePhase, emitHint: EmitHint, node: Node) {
            switch (phase) {
                case PipelinePhase.Notification:
                    if (onEmitNode !== noEmitNotification && (!isEmitNotificationEnabled || isEmitNotificationEnabled(node))) {
                        return pipelineEmitWithNotification;
                    }
                    // falls through

                case PipelinePhase.Substitution:
                    if (substituteNode !== noEmitSubstitution && (lastSubstitution = substituteNode(emitHint, node)) !== node) {
                        return pipelineEmitWithSubstitution;
                    }
                    // falls through

                case PipelinePhase.Comments:
                    if (!commentsDisabled && node.kind !== SyntaxKind.SourceFile) {
                        return pipelineEmitWithComments;
                    }
                    // falls through

                case PipelinePhase.SourceMaps:
                    if (!sourceMapsDisabled && node.kind !== SyntaxKind.SourceFile && !isInJsonFile(node)) {
                        return pipelineEmitWithSourceMap;
                    }
                    // falls through

                case PipelinePhase.Emit:
                    return pipelineEmitWithHint;

                default:
                    return Debug.assertNever(phase);
            }
        }

        function getNextPipelinePhase(currentPhase: PipelinePhase, emitHint: EmitHint, node: Node) {
            return getPipelinePhase(currentPhase + 1, emitHint, node);
        }

        function pipelineEmitWithNotification(hint: EmitHint, node: Node) {
            Debug.assert(lastNode === node);
            const pipelinePhase = getNextPipelinePhase(PipelinePhase.Notification, hint, node);
            onEmitNode(hint, node, pipelinePhase);
            Debug.assert(lastNode === node);
        }

        function pipelineEmitWithHint(hint: EmitHint, node: Node): void {
            Debug.assert(lastNode === node || lastSubstitution === node);
            if (hint === EmitHint.SourceFile) return emitSourceFile(cast(node, isSourceFile));
            if (hint === EmitHint.IdentifierName) return emitIdentifier(cast(node, isIdentifier));
            if (hint === EmitHint.JsxAttributeValue) return emitLiteral(cast(node, isStringLiteral), /*jsxAttributeEscape*/ true);
            if (hint === EmitHint.MappedTypeParameter) return emitMappedTypeParameter(cast(node, isTypeParameterDeclaration));
            if (hint === EmitHint.EmbeddedStatement) {
                Debug.assertNode(node, isEmptyStatement);
                return emitEmptyStatement(/*isEmbeddedStatement*/ true);
            }
            if (hint === EmitHint.Unspecified) {
                if (isKeyword(node.kind)) return writeTokenNode(node, writeKeyword);

                switch (node.kind) {
                    // Pseudo-literals
                    case SyntaxKind.TemplateHead:
                    case SyntaxKind.TemplateMiddle:
                    case SyntaxKind.TemplateTail:
                        return emitLiteral(<LiteralExpression>node, /*jsxAttributeEscape*/ false);

                    case SyntaxKind.UnparsedSource:
                    case SyntaxKind.UnparsedPrepend:
                        return emitUnparsedSourceOrPrepend(<UnparsedSource>node);

                    case SyntaxKind.UnparsedPrologue:
                        return writeUnparsedNode(<UnparsedNode>node);

                    case SyntaxKind.UnparsedText:
                    case SyntaxKind.UnparsedInternalText:
                        return emitUnparsedTextLike(<UnparsedTextLike>node);

                    case SyntaxKind.UnparsedSyntheticReference:
                        return emitUnparsedSyntheticReference(<UnparsedSyntheticReference>node);


                    // Identifiers
                    case SyntaxKind.Identifier:
                        return emitIdentifier(<Identifier>node);

                    // PrivateIdentifiers
                    case SyntaxKind.PrivateIdentifier:
                        return emitPrivateIdentifier(node as PrivateIdentifier);

                    // Parse tree nodes
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
                    case SyntaxKind.JSDocFunctionType:
                        return emitJSDocFunctionType(node as JSDocFunctionType);
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
                    case SyntaxKind.ExpressionWithTypeArguments:
                        return emitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node);
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
                    case SyntaxKind.ImportType:
                        return emitImportTypeNode(<ImportTypeNode>node);
                    case SyntaxKind.JSDocAllType:
                        writePunctuation("*");
                        return;
                    case SyntaxKind.JSDocUnknownType:
                        writePunctuation("?");
                        return;
                    case SyntaxKind.JSDocNullableType:
                        return emitJSDocNullableType(node as JSDocNullableType);
                    case SyntaxKind.JSDocNonNullableType:
                        return emitJSDocNonNullableType(node as JSDocNonNullableType);
                    case SyntaxKind.JSDocOptionalType:
                        return emitJSDocOptionalType(node as JSDocOptionalType);
                    case SyntaxKind.RestType:
                    case SyntaxKind.JSDocVariadicType:
                        return emitRestOrJSDocVariadicType(node as RestTypeNode | JSDocVariadicType);
                    case SyntaxKind.NamedTupleMember:
                        return emitNamedTupleMember(node as NamedTupleMember);

                    // Binding patterns
                    case SyntaxKind.ObjectBindingPattern:
                        return emitObjectBindingPattern(<ObjectBindingPattern>node);
                    case SyntaxKind.ArrayBindingPattern:
                        return emitArrayBindingPattern(<ArrayBindingPattern>node);
                    case SyntaxKind.BindingElement:
                        return emitBindingElement(<BindingElement>node);

                    // Misc
                    case SyntaxKind.TemplateSpan:
                        return emitTemplateSpan(<TemplateSpan>node);
                    case SyntaxKind.SemicolonClassElement:
                        return emitSemicolonClassElement();

                    // Statements
                    case SyntaxKind.Block:
                        return emitBlock(<Block>node);
                    case SyntaxKind.VariableStatement:
                        return emitVariableStatement(<VariableStatement>node);
                    case SyntaxKind.EmptyStatement:
                        return emitEmptyStatement(/*isEmbeddedStatement*/ false);
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
                    case SyntaxKind.NamespaceExport:
                        return emitNamespaceExport(<NamespaceExport>node);
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
                    case SyntaxKind.ExportSpecifier:
                        return emitExportSpecifier(<ExportSpecifier>node);
                    case SyntaxKind.MissingDeclaration:
                        return;

                    // Module references
                    case SyntaxKind.ExternalModuleReference:
                        return emitExternalModuleReference(<ExternalModuleReference>node);

                    // JSX (non-expression)
                    case SyntaxKind.JsxText:
                        return emitJsxText(<JsxText>node);
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

                    // JSDoc nodes (only used in codefixes currently)
                    case SyntaxKind.JSDocParameterTag:
                    case SyntaxKind.JSDocPropertyTag:
                        return emitJSDocPropertyLikeTag(node as JSDocPropertyLikeTag);
                    case SyntaxKind.JSDocReturnTag:
                    case SyntaxKind.JSDocTypeTag:
                    case SyntaxKind.JSDocThisTag:
                    case SyntaxKind.JSDocEnumTag:
                        return emitJSDocSimpleTypedTag(node as JSDocTypeTag);
                    case SyntaxKind.JSDocImplementsTag:
                    case SyntaxKind.JSDocAugmentsTag:
                        return emitJSDocHeritageTag(node as JSDocImplementsTag | JSDocAugmentsTag);
                    case SyntaxKind.JSDocTemplateTag:
                        return emitJSDocTemplateTag(node as JSDocTemplateTag);
                    case SyntaxKind.JSDocTypedefTag:
                        return emitJSDocTypedefTag(node as JSDocTypedefTag);
                    case SyntaxKind.JSDocCallbackTag:
                        return emitJSDocCallbackTag(node as JSDocCallbackTag);
                    case SyntaxKind.JSDocSignature:
                        return emitJSDocSignature(node as JSDocSignature);
                    case SyntaxKind.JSDocTypeLiteral:
                        return emitJSDocTypeLiteral(node as JSDocTypeLiteral);
                    case SyntaxKind.JSDocClassTag:
                    case SyntaxKind.JSDocTag:
                        return emitJSDocSimpleTag(node as JSDocTag);

                    case SyntaxKind.JSDocComment:
                        return emitJSDoc(node as JSDoc);

                    // Transformation nodes (ignored)
                }

                if (isExpression(node)) {
                    hint = EmitHint.Expression;
                    if (substituteNode !== noEmitSubstitution) {
                        lastSubstitution = node = substituteNode(hint, node);
                    }
                }
                else if (isToken(node)) {
                    return writeTokenNode(node, writePunctuation);
                }
            }
            if (hint === EmitHint.Expression) {
                switch (node.kind) {
                    // Literals
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.BigIntLiteral:
                        return emitNumericOrBigIntLiteral(<NumericLiteral | BigIntLiteral>node);

                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.RegularExpressionLiteral:
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                        return emitLiteral(<LiteralExpression>node, /*jsxAttributeEscape*/ false);

                    // Identifiers
                    case SyntaxKind.Identifier:
                        return emitIdentifier(<Identifier>node);

                    // Reserved words
                    case SyntaxKind.FalseKeyword:
                    case SyntaxKind.NullKeyword:
                    case SyntaxKind.SuperKeyword:
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.ThisKeyword:
                    case SyntaxKind.ImportKeyword:
                        writeTokenNode(node, writeKeyword);
                        return;

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
                    case SyntaxKind.AsExpression:
                        return emitAsExpression(<AsExpression>node);
                    case SyntaxKind.NonNullExpression:
                        return emitNonNullExpression(<NonNullExpression>node);
                    case SyntaxKind.MetaProperty:
                        return emitMetaProperty(<MetaProperty>node);

                    // JSX
                    case SyntaxKind.JsxElement:
                        return emitJsxElement(<JsxElement>node);
                    case SyntaxKind.JsxSelfClosingElement:
                        return emitJsxSelfClosingElement(<JsxSelfClosingElement>node);
                    case SyntaxKind.JsxFragment:
                        return emitJsxFragment(<JsxFragment>node);

                    // Transformation nodes
                    case SyntaxKind.PartiallyEmittedExpression:
                        return emitPartiallyEmittedExpression(<PartiallyEmittedExpression>node);

                    case SyntaxKind.CommaListExpression:
                        return emitCommaList(<CommaListExpression>node);
                }
            }
        }

        function emitMappedTypeParameter(node: TypeParameterDeclaration): void {
            emit(node.name);
            writeSpace();
            writeKeyword("in");
            writeSpace();
            emit(node.constraint);
        }

        function pipelineEmitWithSubstitution(hint: EmitHint, node: Node) {
            Debug.assert(lastNode === node || lastSubstitution === node);
            const pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, hint, node);
            pipelinePhase(hint, lastSubstitution!);
            Debug.assert(lastNode === node || lastSubstitution === node);
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
                emitExpression(node);
            }
            else {
                emit(node);
            }
        }

        function emitComputedPropertyName(node: ComputedPropertyName) {
            writePunctuation("[");
            emitExpression(node.expression);
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
            emitExpression(decorator.expression);
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

            pipelineEmit(EmitHint.MappedTypeParameter, node.typeParameter);

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
            emitExpression(node.literal);
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
            emitExpressionList(node, elements, ListFormat.ArrayLiteralExpressionElements | preferNewLine);
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
            const expression = cast(emitExpression(node.expression), isExpression);
            const token = node.questionDotToken || setTextRangePosEnd(factory.createToken(SyntaxKind.DotToken) as DotToken, node.expression.end, node.name.pos);
            const linesBeforeDot = getLinesBetweenNodes(node, node.expression, token);
            const linesAfterDot = getLinesBetweenNodes(node, token, node.name);

            writeLinesAndIndent(linesBeforeDot, /*writeSpaceIfNotIndenting*/ false);

            const shouldEmitDotDot =
                token.kind !== SyntaxKind.QuestionDotToken &&
                mayNeedDotDotForPropertyAccess(expression) &&
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
            emitExpression(node.expression);
            emit(node.questionDotToken);
            emitTokenWithComment(SyntaxKind.OpenBracketToken, node.expression.end, writePunctuation, node);
            emitExpression(node.argumentExpression);
            emitTokenWithComment(SyntaxKind.CloseBracketToken, node.argumentExpression.end, writePunctuation, node);
        }

        function emitCallExpression(node: CallExpression) {
            emitExpression(node.expression);
            emit(node.questionDotToken);
            emitTypeArguments(node, node.typeArguments);
            emitExpressionList(node, node.arguments, ListFormat.CallExpressionArguments);
        }

        function emitNewExpression(node: NewExpression) {
            emitTokenWithComment(SyntaxKind.NewKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitExpression(node.expression);
            emitTypeArguments(node, node.typeArguments);
            emitExpressionList(node, node.arguments, ListFormat.NewExpressionArguments);
        }

        function emitTaggedTemplateExpression(node: TaggedTemplateExpression) {
            emitExpression(node.tag);
            emitTypeArguments(node, node.typeArguments);
            writeSpace();
            emitExpression(node.template);
        }

        function emitTypeAssertionExpression(node: TypeAssertion) {
            writePunctuation("<");
            emit(node.type);
            writePunctuation(">");
            emitExpression(node.expression);
        }

        function emitParenthesizedExpression(node: ParenthesizedExpression) {
            const openParenPos = emitTokenWithComment(SyntaxKind.OpenParenToken, node.pos, writePunctuation, node);
            const indented = writeLineSeparatorsAndIndentBefore(node.expression, node);
            emitExpression(node.expression);
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
            emitExpression(node.expression);
        }

        function emitTypeOfExpression(node: TypeOfExpression) {
            emitTokenWithComment(SyntaxKind.TypeOfKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitExpression(node.expression);
        }

        function emitVoidExpression(node: VoidExpression) {
            emitTokenWithComment(SyntaxKind.VoidKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitExpression(node.expression);
        }

        function emitAwaitExpression(node: AwaitExpression) {
            emitTokenWithComment(SyntaxKind.AwaitKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitExpression(node.expression);
        }

        function emitPrefixUnaryExpression(node: PrefixUnaryExpression) {
            writeTokenText(node.operator, writeOperator);
            if (shouldEmitWhitespaceBeforeOperand(node)) {
                writeSpace();
            }
            emitExpression(node.operand);
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
            emitExpression(node.operand);
            writeTokenText(node.operator, writeOperator);
        }

        const enum EmitBinaryExpressionState {
            EmitLeft,
            EmitRight,
            FinishEmit
        }

        /**
         * emitBinaryExpression includes an embedded work stack to attempt to handle as many nested binary expressions
         * as possible without creating any additional stack frames. This can only be done when the emit pipeline does
         * not require notification/substitution/comment/sourcemap decorations.
         */
        function emitBinaryExpression(node: BinaryExpression) {
            const nodeStack = [node];
            const stateStack = [EmitBinaryExpressionState.EmitLeft];
            let stackIndex = 0;
            while (stackIndex >= 0) {
                node = nodeStack[stackIndex];
                switch (stateStack[stackIndex]) {
                    case EmitBinaryExpressionState.EmitLeft: {
                        maybePipelineEmitExpression(node.left);
                        break;
                    }
                    case EmitBinaryExpressionState.EmitRight: {
                        const isCommaOperator = node.operatorToken.kind !== SyntaxKind.CommaToken;
                        const linesBeforeOperator = getLinesBetweenNodes(node, node.left, node.operatorToken);
                        const linesAfterOperator = getLinesBetweenNodes(node, node.operatorToken, node.right);
                        writeLinesAndIndent(linesBeforeOperator, isCommaOperator);
                        emitLeadingCommentsOfPosition(node.operatorToken.pos);
                        writeTokenNode(node.operatorToken, node.operatorToken.kind === SyntaxKind.InKeyword ? writeKeyword : writeOperator);
                        emitTrailingCommentsOfPosition(node.operatorToken.end, /*prefixSpace*/ true); // Binary operators should have a space before the comment starts
                        writeLinesAndIndent(linesAfterOperator, /*writeSpaceIfNotIndenting*/ true);
                        maybePipelineEmitExpression(node.right);
                        break;
                    }
                    case EmitBinaryExpressionState.FinishEmit: {
                        const linesBeforeOperator = getLinesBetweenNodes(node, node.left, node.operatorToken);
                        const linesAfterOperator = getLinesBetweenNodes(node, node.operatorToken, node.right);
                        decreaseIndentIf(linesBeforeOperator, linesAfterOperator);
                        stackIndex--;
                        break;
                    }
                    default: return Debug.fail(`Invalid state ${stateStack[stackIndex]} for emitBinaryExpressionWorker`);
                }
            }

            function maybePipelineEmitExpression(next: Expression) {
                // Advance the state of this unit of work,
                stateStack[stackIndex]++;

                // Then actually do the work of emitting the node `next` returned by the prior state

                // The following section should be identical to `pipelineEmit` save it assumes EmitHint.Expression and offloads
                // binary expression handling, where possible, to the contained work queue

                // #region trampolinePipelineEmit
                const savedLastNode = lastNode;
                const savedLastSubstitution = lastSubstitution;
                lastNode = next;
                lastSubstitution = undefined;

                const pipelinePhase = getPipelinePhase(PipelinePhase.Notification, EmitHint.Expression, next);
                if (pipelinePhase === pipelineEmitWithHint && isBinaryExpression(next)) {
                    // If the target pipeline phase is emit directly, and the next node's also a binary expression,
                    // skip all the intermediate indirection and push the expression directly onto the work stack
                    stackIndex++;
                    stateStack[stackIndex] = EmitBinaryExpressionState.EmitLeft;
                    nodeStack[stackIndex] = next;
                }
                else {
                    pipelinePhase(EmitHint.Expression, next);
                }

                Debug.assert(lastNode === next);

                lastNode = savedLastNode;
                lastSubstitution = savedLastSubstitution;
                // #endregion trampolinePipelineEmit
            }
        }

        function emitConditionalExpression(node: ConditionalExpression) {
            const linesBeforeQuestion = getLinesBetweenNodes(node, node.condition, node.questionToken);
            const linesAfterQuestion = getLinesBetweenNodes(node, node.questionToken, node.whenTrue);
            const linesBeforeColon = getLinesBetweenNodes(node, node.whenTrue, node.colonToken);
            const linesAfterColon = getLinesBetweenNodes(node, node.colonToken, node.whenFalse);

            emitExpression(node.condition);
            writeLinesAndIndent(linesBeforeQuestion, /*writeSpaceIfNotIndenting*/ true);
            emit(node.questionToken);
            writeLinesAndIndent(linesAfterQuestion, /*writeSpaceIfNotIndenting*/ true);
            emitExpression(node.whenTrue);
            decreaseIndentIf(linesBeforeQuestion, linesAfterQuestion);

            writeLinesAndIndent(linesBeforeColon, /*writeSpaceIfNotIndenting*/ true);
            emit(node.colonToken);
            writeLinesAndIndent(linesAfterColon, /*writeSpaceIfNotIndenting*/ true);
            emitExpression(node.whenFalse);
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
            emitExpression(node.expression);
        }

        function emitClassExpression(node: ClassExpression) {
            generateNameIfNeeded(node.name);
            emitClassDeclarationOrExpression(node);
        }

        function emitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
            emitExpression(node.expression);
            emitTypeArguments(node, node.typeArguments);
        }

        function emitAsExpression(node: AsExpression) {
            emitExpression(node.expression);
            if (node.type) {
                writeSpace();
                writeKeyword("as");
                writeSpace();
                emit(node.type);
            }
        }

        function emitNonNullExpression(node: NonNullExpression) {
            emitExpression(node.expression);
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
            emitExpression(node.expression);
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


        function emitExpressionStatement(node: ExpressionStatement) {
            emitExpression(node.expression);
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
            emitExpression(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
            emitEmbeddedStatement(node, node.thenStatement);
            if (node.elseStatement) {
                writeLineOrSpace(node);
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
            emitExpression(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        }

        function emitDoStatement(node: DoStatement) {
            emitTokenWithComment(SyntaxKind.DoKeyword, node.pos, writeKeyword, node);
            emitEmbeddedStatement(node, node.statement);
            if (isBlock(node.statement)) {
                writeSpace();
            }
            else {
                writeLineOrSpace(node);
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
            emitExpression(node.expression);
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
            emitExpression(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
            emitEmbeddedStatement(node, node.statement);
        }

        function emitForBinding(node: VariableDeclarationList | Expression | undefined) {
            if (node !== undefined) {
                if (node.kind === SyntaxKind.VariableDeclarationList) {
                    emit(node);
                }
                else {
                    emitExpression(node);
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
            if (emitLeadingCommentsOfPosition && isSimilarNode && contextNode.pos !== startPos) {
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
            if (emitTrailingCommentsOfPosition && isSimilarNode && contextNode.end !== pos) {
                emitTrailingCommentsOfPosition(pos, /*prefixSpace*/ true);
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
            emitExpression(node.expression);
            emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
            emitEmbeddedStatement(node, node.statement);
        }

        function emitSwitchStatement(node: SwitchStatement) {
            const openParenPos = emitTokenWithComment(SyntaxKind.SwitchKeyword, node.pos, writeKeyword, node);
            writeSpace();
            emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
            emitExpression(node.expression);
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
                writeLineOrSpace(node);
                emit(node.catchClause);
            }
            if (node.finallyBlock) {
                writeLineOrSpace(node);
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
            emitIdentifierName(node.name);
            emitSignatureAndBody(node, emitSignatureHead);
        }

        function emitBlockCallback(_hint: EmitHint, body: Node): void {
            emitBlockFunctionBody(<Block>body);
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
                    if (onEmitNode) {
                        onEmitNode(EmitHint.Unspecified, body, emitBlockCallback);
                    }
                    else {
                        emitBlockFunctionBody(body);
                    }
                    popNameGenerationScope(node);

                    if (indentedFlag) {
                        decreaseIndent();
                    }
                }
                else {
                    emitSignatureHead(node);
                    writeSpace();
                    emitExpression(body);
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
                emitIdentifierName(node.name);
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
            while (body.kind === SyntaxKind.ModuleDeclaration) {
                writePunctuation(".");
                emit((<ModuleDeclaration>body).name);
                body = (<ModuleDeclaration>body).body!;
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
            emit(node.name);
            writeSpace();
            emitTokenWithComment(SyntaxKind.EqualsToken, node.name.end, writePunctuation, node);
            writeSpace();
            emitModuleReference(node.moduleReference);
            writeTrailingSemicolon();
        }

        function emitModuleReference(node: ModuleReference) {
            if (node.kind === SyntaxKind.Identifier) {
                emitExpression(node);
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
            emitExpression(node.moduleSpecifier);
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
            emitExpression(node.expression);
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
                emitExpression(node.moduleSpecifier);
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
            emitExpression(node.expression);
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

        function emitJsxAttribute(node: JsxAttribute) {
            emit(node.name);
            emitNodeWithPrefix("=", writePunctuation, node.initializer, emitJsxAttributeValue);
        }

        function emitJsxSpreadAttribute(node: JsxSpreadAttribute) {
            writePunctuation("{...");
            emitExpression(node.expression);
            writePunctuation("}");
        }

        function emitJsxExpression(node: JsxExpression) {
            if (node.expression) {
                writePunctuation("{");
                emit(node.dotDotDotToken);
                emitExpression(node.expression);
                writePunctuation("}");
            }
        }

        function emitJsxTagName(node: JsxTagNameExpression) {
            if (node.kind === SyntaxKind.Identifier) {
                emitExpression(node);
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
            emitExpression(node.expression);

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
            if (emitTrailingCommentsOfPosition && (getEmitFlags(initializer) & EmitFlags.NoLeadingComments) === 0) {
                const commentRange = getCommentRange(initializer);
                emitTrailingCommentsOfPosition(commentRange.pos);
            }
            emitExpression(initializer);
        }

        function emitShorthandPropertyAssignment(node: ShorthandPropertyAssignment) {
            emit(node.name);
            if (node.objectAssignmentInitializer) {
                writeSpace();
                writePunctuation("=");
                writeSpace();
                emitExpression(node.objectAssignmentInitializer);
            }
        }

        function emitSpreadAssignment(node: SpreadAssignment) {
            if (node.expression) {
                emitTokenWithComment(SyntaxKind.DotDotDotToken, node.pos, writePunctuation, node);
                emitExpression(node.expression);
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
                const lines = node.comment.split(/\r\n?|\n/g);
                for (const line of lines) {
                    writeLine();
                    writeSpace();
                    writePunctuation("*");
                    writeSpace();
                    write(line);
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

        function emitJSDocComment(comment: string | undefined) {
            if (comment) {
                writeSpace();
                write(comment);
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
            emitExpression(node.expression);
        }

        function emitCommaList(node: CommaListExpression) {
            emitExpressionList(node, node.elements, ListFormat.CommaListElements);
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
                emitExpression(node);
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
                emitExpression(node);
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
                    pipelineEmit(EmitHint.EmbeddedStatement, node);
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

        function emitList(parentNode: TextRange, children: NodeArray<Node> | undefined, format: ListFormat, start?: number, count?: number) {
            emitNodeList(emit, parentNode, children, format, start, count);
        }

        function emitExpressionList(parentNode: TextRange, children: NodeArray<Node> | undefined, format: ListFormat, start?: number, count?: number) {
            emitNodeList(emitExpression as (node: Node) => void, parentNode, children, format, start, count); // TODO: GH#18217
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

        function emitNodeList(emit: (node: Node) => void, parentNode: TextRange, children: NodeArray<Node> | undefined, format: ListFormat, start = 0, count = children ? children.length - start : 0) {
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
                if (isEmpty && !isUndefined) {
                    // TODO: GH#18217
                    emitTrailingCommentsOfPosition(children!.pos, /*prefixSpace*/ true); // Emit comments within empty bracketed lists
                }
            }

            if (onBeforeEmitNodeArray) {
                onBeforeEmitNodeArray(children);
            }

            if (isEmpty) {
                // Write a line terminator if the parent node was multi-line
                if (format & ListFormat.MultiLine && !(preserveSourceNewlines && rangeIsOnSingleLine(parentNode, currentSourceFile!))) {
                    writeLine();
                }
                else if (format & ListFormat.SpaceBetweenBraces && !(format & ListFormat.NoSpaceIfEmpty)) {
                    writeSpace();
                }
            }
            else {
                // Write the opening line terminator or leading whitespace.
                const mayEmitInterveningComments = (format & ListFormat.NoInterveningComments) === 0;
                let shouldEmitInterveningComments = mayEmitInterveningComments;
                const leadingLineTerminatorCount = getLeadingLineTerminatorCount(parentNode, children!, format); // TODO: GH#18217
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
                    const child = children![start + i];

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
                        if (format & ListFormat.DelimitersMask && previousSibling.end !== parentNode.end) {
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

                    emit(child);

                    if (shouldDecreaseIndentAfterEmit) {
                        decreaseIndent();
                        shouldDecreaseIndentAfterEmit = false;
                    }

                    previousSibling = child;
                }

                // Write a trailing comma, if requested.
                const hasTrailingComma = (format & ListFormat.AllowTrailingComma) && children!.hasTrailingComma;
                if (format & ListFormat.CommaDelimited && hasTrailingComma) {
                    writePunctuation(",");
                }


                // Emit any trailing comment of the last element in the list
                // i.e
                //       var array = [...
                //          2
                //          /* end of element 2 */
                //       ];
                if (previousSibling && format & ListFormat.DelimitersMask && previousSibling.end !== parentNode.end && !(getEmitFlags(previousSibling) & EmitFlags.NoTrailingComments)) {
                    emitLeadingCommentsOfPosition(previousSibling.end);
                }

                // Decrease the indent, if requested.
                if (format & ListFormat.Indented) {
                    decreaseIndent();
                }

                recordBundleFileInternalSectionEnd(previousSourceFileTextKind);

                // Write the closing line terminator or closing whitespace.
                const closingLineTerminatorCount = getClosingLineTerminatorCount(parentNode, children!, format);
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
                if (isEmpty && !isUndefined) {
                    // TODO: GH#18217
                    emitLeadingCommentsOfPosition(children!.end); // Emit leading comments within empty lists
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

        function writeLineOrSpace(node: Node) {
            if (getEmitFlags(node) & EmitFlags.SingleLine) {
                writeSpace();
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

        function getLeadingLineTerminatorCount(parentNode: TextRange, children: readonly Node[], format: ListFormat): number {
            if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
                if (format & ListFormat.PreferNewLine) {
                    return 1;
                }

                const firstChild = children[0];
                if (firstChild === undefined) {
                    return rangeIsOnSingleLine(parentNode, currentSourceFile!) ? 0 : 1;
                }
                if (firstChild.kind === SyntaxKind.JsxText) {
                    // JsxText will be written with its leading whitespace, so don't add more manually.
                    return 0;
                }
                if (!positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(firstChild) && (!firstChild.parent || firstChild.parent === parentNode)) {
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
                else if (!nodeIsSynthesized(previousNode) && !nodeIsSynthesized(nextNode) && previousNode.parent === nextNode.parent) {
                    if (preserveSourceNewlines) {
                        return getEffectiveLines(
                            includeComments => getLinesBetweenRangeEndAndRangeStart(
                                previousNode,
                                nextNode,
                                currentSourceFile!,
                                includeComments));
                    }
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

        function getClosingLineTerminatorCount(parentNode: TextRange, children: readonly Node[], format: ListFormat): number {
            if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
                if (format & ListFormat.PreferNewLine) {
                    return 1;
                }

                const lastChild = lastOrUndefined(children);
                if (lastChild === undefined) {
                    return rangeIsOnSingleLine(parentNode, currentSourceFile!) ? 0 : 1;
                }
                if (!positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(lastChild) && (!lastChild.parent || lastChild.parent === parentNode)) {
                    if (preserveSourceNewlines) {
                        return getEffectiveLines(
                            includeComments => getLinesBetweenPositionAndNextNonWhitespaceCharacter(
                                lastChild.end,
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

            return getLiteralText(node, currentSourceFile!, neverAsciiEscape, jsxAttributeEscape);
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

        function pipelineEmitWithComments(hint: EmitHint, node: Node) {
            Debug.assert(lastNode === node || lastSubstitution === node);
            enterComment();
            hasWrittenComment = false;
            const emitFlags = getEmitFlags(node);
            const { pos, end } = getCommentRange(node);
            const isEmittedNode = node.kind !== SyntaxKind.NotEmittedStatement;

            // We have to explicitly check that the node is JsxText because if the compilerOptions.jsx is "preserve" we will not do any transformation.
            // It is expensive to walk entire tree just to set one kind of node to have no comments.
            const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0 || node.kind === SyntaxKind.JsxText;
            const skipTrailingComments = end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0 || node.kind === SyntaxKind.JsxText;

            // Save current container state on the stack.
            const savedContainerPos = containerPos;
            const savedContainerEnd = containerEnd;
            const savedDeclarationListContainerEnd = declarationListContainerEnd;
            if ((pos > 0 || end > 0) && pos !== end) {
                // Emit leading comments if the position is not synthesized and the node
                // has not opted out from emitting leading comments.
                if (!skipLeadingComments) {
                    emitLeadingComments(pos, isEmittedNode);
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

            const pipelinePhase = getNextPipelinePhase(PipelinePhase.Comments, hint, node);
            if (emitFlags & EmitFlags.NoNestedComments) {
                commentsDisabled = true;
                pipelinePhase(hint, node);
                commentsDisabled = false;
            }
            else {
                pipelinePhase(hint, node);
            }

            enterComment();
            forEach(getSyntheticTrailingComments(node), emitTrailingSynthesizedComment);
            if ((pos > 0 || end > 0) && pos !== end) {
                // Restore previous container state.
                containerPos = savedContainerPos;
                containerEnd = savedContainerEnd;
                declarationListContainerEnd = savedDeclarationListContainerEnd;

                // Emit trailing comments if the position is not synthesized and the node
                // has not opted out from emitting leading comments and is an emitted node.
                if (!skipTrailingComments && isEmittedNode) {
                    emitTrailingComments(end);
                }
            }
            exitComment();
            Debug.assert(lastNode === node || lastSubstitution === node);
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

        function emitLeadingComments(pos: number, isEmittedNode: boolean) {
            hasWrittenComment = false;

            if (isEmittedNode) {
                forEachLeadingCommentToEmit(pos, emitLeadingComment);
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

        function emitTrailingCommentsOfPosition(pos: number, prefixSpace?: boolean) {
            if (commentsDisabled) {
                return;
            }
            enterComment();
            forEachTrailingCommentToEmit(pos, prefixSpace ? emitTrailingComment : emitTrailingCommentOfPosition);
            exitComment();
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

        function pipelineEmitWithSourceMap(hint: EmitHint, node: Node) {
            Debug.assert(lastNode === node || lastSubstitution === node);
            const pipelinePhase = getNextPipelinePhase(PipelinePhase.SourceMaps, hint, node);
            if (isUnparsedSource(node) || isUnparsedPrepend(node)) {
                pipelinePhase(hint, node);
            }
            else if (isUnparsedNode(node)) {
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
                pipelinePhase(hint, node);
            }
            else {
                const { pos, end, source = sourceMapSource } = getSourceMapRange(node);
                const emitFlags = getEmitFlags(node);
                if (node.kind !== SyntaxKind.NotEmittedStatement
                    && (emitFlags & EmitFlags.NoLeadingSourceMap) === 0
                    && pos >= 0) {
                    emitSourcePos(source, skipSourceTrivia(source, pos));
                }

                if (emitFlags & EmitFlags.NoNestedSourceMaps) {
                    sourceMapsDisabled = true;
                    pipelinePhase(hint, node);
                    sourceMapsDisabled = false;
                }
                else {
                    pipelinePhase(hint, node);
                }

                if (node.kind !== SyntaxKind.NotEmittedStatement
                    && (emitFlags & EmitFlags.NoTrailingSourceMap) === 0
                    && end >= 0) {
                    emitSourcePos(source, end);
                }
            }
            Debug.assert(lastNode === node || lastSubstitution === node);
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
                setSourceMapSource(source);
                emitPos(pos);
                setSourceMapSource(savedSourceMapSource);
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

            if (isJsonSourceMapSource(source)) {
                return;
            }

            sourceMapSourceIndex = sourceMapGenerator!.addSource(source.fileName);
            if (printerOptions.inlineSources) {
                sourceMapGenerator!.setSourceContent(sourceMapSourceIndex, source.text);
            }
        }

        function isJsonSourceMapSource(sourceFile: SourceMapSource) {
            return fileExtensionIs(sourceFile.fileName, Extension.Json);
        }
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
